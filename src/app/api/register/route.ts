import { NextRequest, NextResponse } from 'next/server'
import {
  sendWelcomeEmail,
  getOfferDetails,
  sendPreRegistrationAlert,
} from '@/lib/email/index'
import { liffioMarketingFetch, getLiffioMarketingUrl } from '@/lib/liffio-api'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, device, source } = body

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
    }

    const { ok, status, data } = await liffioMarketingFetch<{
      success?: boolean
      id?: string
      spotNumber?: number
      tier?: 'tier1' | 'tier2' | 'tier3'
      discount?: number
      discountCode?: string | null
      totalClaimed?: number
      tier1Remaining?: number
      tier2Remaining?: number
      error?: string
      alreadyRegistered?: boolean
    }>('/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, device, source }),
    })

    if (!ok) {
      return NextResponse.json(
        {
          error: data.error || 'Failed to process registration',
          alreadyRegistered: data.alreadyRegistered,
        },
        { status },
      )
    }

    const spotNumber = data.spotNumber ?? 0
    const tier = data.tier ?? 'tier3'
    const offerDetails = getOfferDetails(tier)
    const discountCode = data.discountCode ?? null

    const emailResult = await sendWelcomeEmail({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      discountCode,
      spotNumber,
      tier,
    })

    await sendPreRegistrationAlert({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      spotNumber,
      tier,
    })

    if (emailResult.success && data.id) {
      await fetch(getLiffioMarketingUrl(`/pre-registrations/${data.id}/email-sent`), {
        method: 'PATCH',
      }).catch(() => {})
    }

    return NextResponse.json({
      success: true,
      spotNumber,
      tier,
      discount: data.discount ?? offerDetails.discount,
      totalClaimed: data.totalClaimed,
      tier1Remaining: data.tier1Remaining,
      tier2Remaining: data.tier2Remaining,
      emailSent: emailResult.success,
    })
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json({ error: 'Failed to process registration' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const { ok, data } = await liffioMarketingFetch<Record<string, unknown>>('/register')
    if (!ok) {
      return NextResponse.json({ error: 'Failed to get count' }, { status: 500 })
    }
    return NextResponse.json(data)
  } catch (error) {
    console.error('Failed to get registration count:', error)
    return NextResponse.json({ error: 'Failed to get count' }, { status: 500 })
  }
}

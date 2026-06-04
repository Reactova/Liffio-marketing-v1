import { NextRequest, NextResponse } from 'next/server'
import { sendCreatorApplicationAlert, sendCreatorsEmail } from '@/lib/email/index'
import { liffioMarketingFetch, getLiffioMarketingUrl } from '@/lib/liffio-api'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { ok, status, data } = await liffioMarketingFetch<{
      success?: boolean
      id?: string
      applicationNumber?: number
      spotsRemaining?: number
      spotsCap?: number
      error?: string
      alreadyApplied?: boolean
    }>('/creators', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    if (!ok) {
      return NextResponse.json(
        {
          error: data.error || 'Failed to submit application',
          alreadyApplied: data.alreadyApplied,
        },
        { status },
      )
    }

    const emailResult = await sendCreatorsEmail({
      name: body.name,
      email: body.email,
      instagramUsername: body.instagramUsername,
    })

    await sendCreatorApplicationAlert({
      name: body.name,
      email: body.email,
      instagramUsername: body.instagramUsername,
      followerRange: body.followerRange,
      contentNiche:
        body.contentNiche === 'other' && body.otherNiche ? body.otherNiche : body.contentNiche,
    })

    if (emailResult.success && data.id) {
      await fetch(getLiffioMarketingUrl(`/creator-applications/${data.id}/email-sent`), {
        method: 'PATCH',
      }).catch(() => {})
    }

    return NextResponse.json({
      success: true,
      applicationNumber: data.applicationNumber,
      emailSent: emailResult.success,
      spotsRemaining: data.spotsRemaining,
      spotsCap: data.spotsCap,
    })
  } catch (error) {
    console.error('Creator application error:', error)
    return NextResponse.json(
      { error: 'Failed to submit application. Please try again.' },
      { status: 500 },
    )
  }
}

export async function GET() {
  try {
    const { ok, data } = await liffioMarketingFetch<Record<string, unknown>>('/creators')
    if (!ok) {
      return NextResponse.json({ error: 'Failed to get stats' }, { status: 500 })
    }
    return NextResponse.json(data)
  } catch (error) {
    console.error('Failed to get creator stats:', error)
    return NextResponse.json({ error: 'Failed to get stats' }, { status: 500 })
  }
}

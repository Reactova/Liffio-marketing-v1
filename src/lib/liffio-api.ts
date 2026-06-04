const DEFAULT_DEV_API = 'http://127.0.0.1:3001'

function getApiBaseUrl(): string {
  const base = process.env.LIFFIO_API_URL?.trim() || process.env.NEXT_PUBLIC_LIFFIO_API_URL?.trim()
  if (!base) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('LIFFIO_API_URL (or NEXT_PUBLIC_LIFFIO_API_URL) is required in production')
    }
    return DEFAULT_DEV_API
  }
  return base.replace(/\/$/, '')
}

export function getLiffioMarketingUrl(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${getApiBaseUrl()}/api/v1/marketing${normalized}`
}

export async function liffioMarketingFetch<T>(
  path: string,
  init?: RequestInit,
): Promise<{ ok: boolean; status: number; data: T }> {
  const res = await fetch(getLiffioMarketingUrl(path), {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
    cache: init?.cache ?? 'no-store',
  })

  const data = (await res.json().catch(() => ({}))) as T
  return { ok: res.ok, status: res.status, data }
}

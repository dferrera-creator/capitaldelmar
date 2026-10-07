export async function verifyTurnstile(token: string, ip?: string): Promise<boolean> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY
  if (!secretKey) {
    // Dev mode — skip verification
    console.warn('[Turnstile] TURNSTILE_SECRET_KEY not set — skipping verification')
    return true
  }

  try {
    const body = new URLSearchParams({
      secret: secretKey,
      response: token,
    })
    if (ip) body.set('remoteip', ip)

    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    })

    if (!res.ok) {
      console.error('[Turnstile] HTTP error:', res.status)
      return false
    }

    const outcome = (await res.json()) as { success: boolean }
    return outcome.success === true
  } catch (err) {
    console.error('[Turnstile] Error:', err)
    return false
  }
}

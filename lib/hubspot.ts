export interface LeadData {
  name: string
  email: string
  phone?: string
  projectSlug?: string
  amountApprox?: number
  termMonths?: number
  leadScore?: number
}

export async function createContact(data: LeadData): Promise<string | null> {
  const apiKey = process.env.HUBSPOT_API_KEY
  if (!apiKey) {
    console.warn('[HubSpot] HUBSPOT_API_KEY not set — skipping contact creation')
    return null
  }

  const [firstname, ...rest] = data.name.trim().split(' ')
  const lastname = rest.join(' ')

  const properties: Record<string, string> = {
    email: data.email,
    firstname: firstname ?? '',
    lastname: lastname ?? '',
  }

  if (data.phone) properties.phone = data.phone
  if (data.projectSlug) properties.hs_lead_status = data.projectSlug
  if (data.amountApprox) properties.hs_analytics_revenue = String(data.amountApprox)
  if (data.leadScore) properties.hubspotscore = String(data.leadScore)

  try {
    const res = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ properties }),
    })

    if (res.status === 409) {
      // Contact already exists — try to update
      const existing = await res.json()
      const existingId = existing?.message?.match(/ID: (\d+)/)?.[1]
      if (existingId) {
        await fetch(`https://api.hubapi.com/crm/v3/objects/contacts/${existingId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({ properties }),
        })
        return existingId
      }
    }

    if (!res.ok) {
      const body = await res.text()
      console.error('[HubSpot] Error creating contact:', res.status, body)
      return null
    }

    const created = await res.json()
    return created?.id ?? null
  } catch (err) {
    console.error('[HubSpot] Unexpected error:', err)
    return null
  }
}

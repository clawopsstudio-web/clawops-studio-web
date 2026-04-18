import { NextRequest, NextResponse } from 'next/server'

const INSFORGE_BASE = process.env.NEXT_PUBLIC_INSFORGE_BASE_URL!
const INSFORGE_KEY = process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY!

export async function POST(req: NextRequest) {
  const event = await req.json()
  const eventType = event.event_type

  try {
    switch (eventType) {
      case 'BILLING_SUBSCRIPTION_ACTIVATED':
      case 'BILLING.SUBSCRIPTION.ACTIVATED': {
        const customerId = event.resource?.id
        if (!customerId) break

        const checkRes = await fetch(
          `${INSFORGE_BASE}/api/database/records/accounts?stripe_customer_id=eq.${customerId}`,
          { headers: { 'Authorization': `Bearer ${INSFORGE_KEY}`, 'apikey': INSFORGE_KEY } }
        )
        const existing = checkRes.ok ? await checkRes.json() : []

        if (existing && existing.length > 0) {
          await fetch(
            `${INSFORGE_BASE}/api/database/records/accounts?stripe_customer_id=eq.${customerId}`,
            {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${INSFORGE_KEY}`,
                'apikey': INSFORGE_KEY,
              },
              body: JSON.stringify({ plan: 'active' }),
            }
          )
        }
        break
      }
      case 'BILLING_SUBSCRIPTION_CANCELLED':
      case 'BILLING_SUBSCRIPTION_EXPIRED':
      case 'BILLING.SUBSCRIPTION.CANCELLED':
      case 'BILLING.SUBSCRIPTION.EXPIRED': {
        const customerId = event.resource?.id
        if (!customerId) break

        const checkRes = await fetch(
          `${INSFORGE_BASE}/api/database/records/accounts?stripe_customer_id=eq.${customerId}`,
          { headers: { 'Authorization': `Bearer ${INSFORGE_KEY}`, 'apikey': INSFORGE_KEY } }
        )
        const existing = checkRes.ok ? await checkRes.json() : []

        if (existing && existing.length > 0) {
          await fetch(
            `${INSFORGE_BASE}/api/database/records/accounts?stripe_customer_id=eq.${customerId}`,
            {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${INSFORGE_KEY}`,
                'apikey': INSFORGE_KEY,
              },
              body: JSON.stringify({ plan: 'cancelled' }),
            }
          )
        }
        break
      }
    }
    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

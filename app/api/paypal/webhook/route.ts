import { NextResponse } from 'next/server'
import { insforgeAdmin } from '@/lib/insforge/admin'

export async function POST(req: Request) {
  const event = await req.json()
  const eventType = event.event_type

  try {
    switch (eventType) {
      case 'BILLING.SUBSCRIPTION.ACTIVATED': {
        const { data: existing } = await insforgeAdmin.database
          .from('accounts')
          .select('id')
          .eq('stripe_customer_id', event.resource.id)
          .maybeSingle()

        if (existing) {
          await insforgeAdmin.database
            .from('accounts')
            .update({ plan: 'active' })
            .eq('id', existing.id)
        }
        break
      }
      case 'BILLING.SUBSCRIPTION.CANCELLED':
      case 'BILLING.SUBSCRIPTION.EXPIRED': {
        const { data: existing } = await insforgeAdmin.database
          .from('accounts')
          .select('id')
          .eq('stripe_customer_id', event.resource.id)
          .maybeSingle()

        if (existing) {
          await insforgeAdmin.database
            .from('accounts')
            .update({ plan: 'cancelled' })
            .eq('id', existing.id)
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

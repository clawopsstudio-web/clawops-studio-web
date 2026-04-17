import { NextResponse } from 'next/server'

const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID || ''
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET || ''
const PAYPAL_BASE = 'https://api-m.sandbox.paypal.com' // Use api-m.paypal.com for production

async function getAccessToken(): Promise<string> {
  const res = await fetch(`${PAYPAL_BASE}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString('base64')}`,
    },
    body: 'grant_type=client_credentials',
  })
  const data = await res.json()
  return data.access_token
}

export async function POST(req: Request) {
  try {
    const { planId, userId } = await req.json()

    if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
      return NextResponse.json({ error: 'PayPal not configured' }, { status: 500 })
    }

    const token = await getAccessToken()

    const res = await fetch(`${PAYPAL_BASE}/v1/billing/subscriptions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        plan_id: planId,
        custom_id: userId,
        application_context: {
          return_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://app.clawops.studio'}/dashboard/billing?success=true`,
          cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://app.clawops.studio'}/dashboard/billing?cancelled=true`,
        },
      }),
    })

    const subscription = await res.json()

    if (!res.ok) {
      console.error('PayPal error:', subscription)
      return NextResponse.json({ error: subscription.message || 'Failed to create subscription' }, { status: 500 })
    }

    const approvalLink = subscription.links?.find((link: any) => link.rel === 'approve')

    if (!approvalLink) {
      return NextResponse.json({ error: 'No approval URL returned' }, { status: 500 })
    }

    return NextResponse.json({ approvalUrl: approvalLink.href })
  } catch (error) {
    console.error('PayPal Error:', error)
    return NextResponse.json({ error: 'Failed to create subscription' }, { status: 500 })
  }
}

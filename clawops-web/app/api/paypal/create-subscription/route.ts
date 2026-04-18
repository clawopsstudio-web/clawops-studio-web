import { NextRequest, NextResponse } from 'next/server'
import { getUserId } from '@/lib/api-auth'

const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID || ''
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET || ''
const PAYPAL_BASE = process.env.PAYPAL_SANDBOX === 'false'
  ? 'https://api-m.paypal.com'
  : 'https://api-m.sandbox.paypal.com'

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
  return data.access_token || ''
}

export async function POST(req: NextRequest) {
  const userId = getUserId(req)
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { planId } = await req.json()

    if (!planId) {
      return NextResponse.json({ error: 'planId is required' }, { status: 400 })
    }

    if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
      return NextResponse.json({ error: 'PayPal not configured' }, { status: 500 })
    }

    const token = await getAccessToken()
    if (!token) {
      return NextResponse.json({ error: 'PayPal auth failed' }, { status: 500 })
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://app.clawops.studio'

    const res = await fetch(`${PAYPAL_BASE}/v1/billing/subscriptions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        plan_id: planId,
        custom_id: userId,  // Set by server from session — not from request body
        application_context: {
          return_url: `${siteUrl}/dashboard/billing?success=true`,
          cancel_url: `${siteUrl}/dashboard/billing?cancelled=true`,
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

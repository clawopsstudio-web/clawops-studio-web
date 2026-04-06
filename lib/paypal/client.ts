import axios from 'axios';

const PAYPAL_BASE_URL = process.env.PAYPAL_MODE === 'sandbox' 
  ? 'https://api-m.sandbox.paypal.com' 
  : 'https://api-m.paypal.com';

const getAccessToken = async () => {
  const auth = Buffer.from(`${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`).toString('base64');
  const response = await axios.post(`${PAYPAL_BASE_URL}/v1/oauth2/token`, 'grant_type=client_credentials', {
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
  return response.data.access_token;
};

export const createSubscription = async (planId: string, customId: string) => {
  const accessToken = await getAccessToken();
  const response = await axios.post(`${PAYPAL_BASE_URL}/v1/billing/subscriptions`, {
    plan_id: planId,
    custom_id: customId,
    application_context: {
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`
    }
  }, {
    headers: { 'Authorization': `Bearer ${accessToken}` }
  });
  return response.data;
};

export const cancelSubscription = async (subscriptionId: string) => {
  const accessToken = await getAccessToken();
  await axios.post(`${PAYPAL_BASE_URL}/v1/billing/subscriptions/${subscriptionId}/cancel`, {
    reason: 'User requested cancellation'
  }, {
    headers: { 'Authorization': `Bearer ${accessToken}` }
  });
};

export const getSubscriptionStatus = async (subscriptionId: string) => {
  const accessToken = await getAccessToken();
  const response = await axios.get(`${PAYPAL_BASE_URL}/v1/billing/subscriptions/${subscriptionId}`, {
    headers: { 'Authorization': `Bearer ${accessToken}` }
  });
  return response.data;
};

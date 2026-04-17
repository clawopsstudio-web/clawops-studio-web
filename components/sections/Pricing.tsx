'use client';

import React from 'react';

const plans = [
  { name: 'Starter', price: '$49', originalPrice: '$149', id: 'P-STARTER' },
  { name: 'Pro', price: '$99', originalPrice: '$249', id: 'P-PRO' },
  { name: 'Business', price: '$149', id: 'P-BUSINESS' },
];

export default function Pricing() {
  const handleCheckout = async (planId: string) => {
    // For demo purposes, simplified. 
    // In production, we'd need a real userId or a different flow.
    const userId = "guest";
    const res = await fetch('/api/paypal/create-subscription', {
      method: 'POST',
      body: JSON.stringify({ planId, userId }),
    });
    const data = await res.json();
    window.location.href = data.approvalUrl;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {plans.map((plan) => (
        <div key={plan.name} className="border p-6 rounded-lg text-center">
          <h2 className="text-2xl font-bold">{plan.name}</h2>
          {plan.originalPrice && (
            <p className="text-sm text-[rgba(255,255,255,0.35)] line-through mt-1">{plan.originalPrice}/mo</p>
          )}
          <p className="text-4xl my-4 font-bold">{plan.price}<span className="text-lg text-[rgba(255,255,255,0.5)]">/mo</span></p>
          <button 
            onClick={() => handleCheckout(plan.id)}
            className="bg-blue-600 text-white px-6 py-2 rounded"
          >
            Subscribe with PayPal
          </button>
        </div>
      ))}
    </div>
  );
}

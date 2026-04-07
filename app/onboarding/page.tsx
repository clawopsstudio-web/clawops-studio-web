'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [data, setData] = useState({
    name: '', company: '', role: '',
    industry: '', useCase: '',
    integrations: [], goals: []
  })
  const router = useRouter()

  const saveToSupabase = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    await supabase.from('onboarding_configs').insert({ user_id: user?.id, ...data })
    router.push('/dashboard')
  }

  const steps = [
    { id: 1, title: 'Profile', component: (
      <div className="space-y-4">
        <input placeholder="Name" onChange={e => setData({...data, name: e.target.value})} className="w-full bg-gray-800 p-2 border border-gray-700" />
        <input placeholder="Company" onChange={e => setData({...data, company: e.target.value})} className="w-full bg-gray-800 p-2 border border-gray-700" />
      </div>
    )},
    { id: 6, title: 'Complete', component: <button onClick={saveToSupabase} className="bg-cyan-600 p-4 rounded text-white font-bold">Finish Setup</button> }
  ]

  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center p-8">
      <div className="w-full max-w-2xl bg-gray-900 p-12 rounded-2xl border border-gray-800">
        <h2 className="text-3xl font-bold mb-8">Setup Your ClawOps Studio</h2>
        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            {steps.find(s => s.id === step)?.component}
          </motion.div>
        </AnimatePresence>
        <div className="mt-8 flex justify-between">
          <button disabled={step === 1} onClick={() => setStep(step - 1)}>Back</button>
          <button onClick={() => setStep(step + 1)}>Next</button>
        </div>
      </div>
    </div>
  )
}

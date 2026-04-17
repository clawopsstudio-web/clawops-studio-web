'use client'

export default function AuthenticationGuide() {
  return (
    <div style={{
      maxWidth: 800,
      margin: '0 auto',
      padding: '40px 20px',
      fontFamily: 'Inter, system-ui, sans-serif',
      color: '#f4f7fb',
      lineHeight: 1.7,
    }}>
      <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8, letterSpacing: '-0.5px' }}>
        Authentication Guide
      </h1>
      <p style={{ color: 'rgba(244,247,251,0.5)', fontSize: 16, marginBottom: 40 }}>
        How to sign in, sign up, and manage your account.
      </p>

      <Section title="1. Sign Up with Email & Password" icon="📧">
        <ol style={{ paddingLeft: 20 }}>
          <li>Go to <strong>app.clawops.studio/auth/signup</strong></li>
          <li>Enter your name, email, and password (minimum 6 characters)</li>
          <li>Click <strong>Create Account</strong></li>
          <li>A 6-digit verification code will be sent to your email</li>
          <li>Enter the code on the verification screen</li>
          <li>You're automatically logged in and redirected to your dashboard</li>
        </ol>
        <div style={{
          marginTop: 16,
          padding: '12px 16px',
          borderRadius: 10,
          background: 'rgba(0, 212, 255, 0.08)',
          border: '0.5px solid rgba(0, 212, 255, 0.2)',
          fontSize: 14,
        }}>
          <strong>Didn't get the code?</strong> Check your spam folder. If it still doesn't arrive, click "Resend code" (wait 60s between resends).
        </div>
      </Section>

      <Section title="2. Sign In with Email & Password" icon="🔐">
        <ol style={{ paddingLeft: 20 }}>
          <li>Go to <strong>app.clawops.studio/auth/login</strong></li>
          <li>Enter your email and password</li>
          <li>Click <strong>Sign in</strong></li>
          <li>You'll be redirected to your dashboard</li>
        </ol>
      </Section>

      <Section title="3. Sign In with Google" icon="🔵">
        <ol style={{ paddingLeft: 20 }}>
          <li>Go to <strong>app.clawops.studio/auth/login</strong></li>
          <li>Click <strong>Continue with Google</strong></li>
          <li>You'll be redirected to Google's sign-in page</li>
          <li>Authorize ClawOps to access your Google account</li>
          <li>You'll be redirected back to your dashboard — no email verification needed</li>
        </ol>
      </Section>

      <Section title="4. Sign In with GitHub" icon="⚫">
        <ol style={{ paddingLeft: 20 }}>
          <li>Go to <strong>app.clawops.studio/auth/login</strong></li>
          <li>Click <strong>Continue with GitHub</strong></li>
          <li>You'll be redirected to GitHub's authorization page</li>
          <li>Authorize ClawOps for the requested permissions</li>
          <li>You'll be redirected back to your dashboard — no email verification needed</li>
        </ol>
      </Section>

      <Section title="5. Password Reset" icon="🔑">
        <ol style={{ paddingLeft: 20 }}>
          <li>Go to <strong>app.clawops.studio/auth/login</strong></li>
          <li>Click <strong>Forgot password?</strong> (below the sign-in form)</li>
          <li>Enter your email address</li>
          <li>Check your email for a 6-digit reset code</li>
          <li>Enter the code and your new password</li>
          <li>Click <strong>Reset password</strong></li>
          <li>Sign in with your new password</li>
        </ol>
      </Section>

      <Section title="6. Sign Out" icon="🚪">
        <p>To sign out:</p>
        <ol style={{ paddingLeft: 20 }}>
          <li>Click your profile avatar in the top-right corner of the dashboard</li>
          <li>Click <strong>Sign Out</strong></li>
          <li>You'll be redirected to the login page</li>
        </ol>
      </Section>

      <Section title="Session & Security" icon="🔒">
        <ul style={{ paddingLeft: 20 }}>
          <li><strong>Session duration:</strong> 7 days after sign in</li>
          <li><strong>Email verification:</strong> Required for email/password signup</li>
          <li><strong>OAuth:</strong> Google and GitHub are pre-configured via InsForge Cloud</li>
          <li><strong>Cookies:</strong> Session stored in httpOnly cookies — not accessible to JavaScript</li>
          <li><strong>Multi-device:</strong> Yes — sign in on any device with your credentials</li>
        </ul>
      </Section>
    </div>
  )
}

function Section({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 40 }}>
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 24 }}>{icon}</span>
        {title}
      </h2>
      <div style={{ color: 'rgba(244,247,251,0.8)', fontSize: 15 }}>
        {children}
      </div>
    </div>
  )
}

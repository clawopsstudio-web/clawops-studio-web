'use client';

import { useState } from 'react';
import { Settings, User, Palette, Bell, Shield, Trash2, Save, Check } from 'lucide-react';

type Tab = 'profile' | 'appearance' | 'notifications' | 'security';

export default function SettingsPage() {
  const [tab, setTab] = useState<Tab>('profile');
  const [portalName, setPortalName] = useState('ClawOps Studio');
  const [accentColor, setAccentColor] = useState('#5B6CFF');
  const [saved, setSaved] = useState(false);

  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Settings</h1>
        <p>Configure your operator profile, appearance, and security settings.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 24 }}>
        {/* Side nav */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {([
            { id: 'profile', label: 'Operator Profile', icon: User },
            { id: 'appearance', label: 'Appearance', icon: Palette },
            { id: 'notifications', label: 'Notifications', icon: Bell },
            { id: 'security', label: 'Security', icon: Shield },
          ] as { id: Tab; label: string; icon: typeof Settings }[]).map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setTab(item.id)}
                className="hover-bg"
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '9px 12px', borderRadius: 7, border: 'none',
                  background: tab === item.id ? 'var(--accent-fill)' : 'transparent',
                  color: tab === item.id ? 'var(--accent)' : 'var(--text-secondary)',
                  fontSize: 13, cursor: 'pointer', textAlign: 'left',
                }}
              >
                <Icon size={15} /> {item.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div>
          {tab === 'profile' && (
            <div className="card" style={{ padding: 24 }}>
              <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 20 }}>Operator Profile</h2>
              <div style={{ display: 'grid', gap: 14 }}>
                <div>
                  <label className="text-label" style={{ display: 'block', marginBottom: 5 }}>Portal Name</label>
                  <input className="input" value={portalName} onChange={e => setPortalName(e.target.value)} placeholder="My AI Dashboard" />
                </div>
                <div>
                  <label className="text-label" style={{ display: 'block', marginBottom: 5 }}>Operator Name</label>
                  <input className="input" value="Pulkit" />
                </div>
                <button className="btn-primary btn-scale" onClick={save} style={{ alignSelf: 'flex-start' }}>
                  {saved ? <><Check size={13} /> Saved!</> : <><Save size={13} /> Save</>}
                </button>
              </div>
            </div>
          )}

          {tab === 'appearance' && (
            <div className="card" style={{ padding: 24 }}>
              <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 20 }}>Appearance</h2>
              <div style={{ display: 'grid', gap: 16 }}>
                <div>
                  <label className="text-label" style={{ display: 'block', marginBottom: 6 }}>Accent Color</label>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <input type="color" value={accentColor} onChange={e => setAccentColor(e.target.value)} style={{ width: 40, height: 32, border: 'none', borderRadius: 6, cursor: 'pointer' }} />
                    <input className="input" value={accentColor} onChange={e => setAccentColor(e.target.value)} style={{ width: 120, fontFamily: 'var(--font-mono)', fontSize: 12 }} />
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {['#5B6CFF', '#00D1FF', '#34D058', '#FFC857', '#CC6FF0', '#FF5C57'].map(c => (
                    <button
                      key={c}
                      onClick={() => setAccentColor(c)}
                      style={{ width: 28, height: 28, borderRadius: '50%', background: c, border: accentColor === c ? '2px solid white' : '2px solid transparent', cursor: 'pointer', boxShadow: '0 0 0 1px rgba(255,255,255,0.2)' }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {tab === 'notifications' && (
            <div className="card" style={{ padding: 24 }}>
              <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 20 }}>Notifications</h2>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Notification settings coming soon.</p>
            </div>
          )}

          {tab === 'security' && (
            <div className="card" style={{ padding: 24 }}>
              <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 20 }}>Security</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <button className="btn-ghost btn-scale" style={{ alignSelf: 'flex-start' }}>
                  <Shield size={13} /> Change Password
                </button>
                <div className="divider" />
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 500 }}>Danger Zone</div>
                    <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>Permanently delete your account and all data.</div>
                  </div>
                  <button className="btn-danger btn-scale">
                    <Trash2 size={13} /> Delete Account
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

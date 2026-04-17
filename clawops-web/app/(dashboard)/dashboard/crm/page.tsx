'use client';

import { useState } from 'react';
import { Users, Building2, Briefcase, Plus, Search, Mail, Phone, Clock, ChevronDown } from 'lucide-react';

type Tab = 'contacts' | 'companies' | 'deals';
type DealStatus = 'lead' | 'qualified' | 'proposal' | 'won' | 'lost';

interface Contact {
  id: string; name: string; email: string; phone?: string;
  company?: string; role?: string; lastContact?: string; dealValue?: number;
}

interface Deal {
  id: string; title: string; company: string; value: number;
  status: DealStatus; priority: 'low' | 'medium' | 'high'; createdAt: string;
}

const COLUMNS: { id: DealStatus; title: string; color: string }[] = [
  { id: 'lead', title: 'Lead', color: '#9CA3AF' },
  { id: 'qualified', title: 'Qualified', color: '#3B82F6' },
  { id: 'proposal', title: 'Proposal', color: '#F59E0B' },
  { id: 'won', title: 'Won', color: '#22C55E' },
  { id: 'lost', title: 'Lost', color: '#EF4444' },
];

const PRIORITY_COLORS = {
  high:   { color: '#EF4444', bg: 'rgba(239,68,68,0.1)' },
  medium: { color: '#F59E0B', bg: 'rgba(245,158,11,0.1)' },
  low:    { color: '#6B7280', bg: 'rgba(107,114,128,0.1)' },
};

const MOCK_CONTACTS: Contact[] = [
  { id: '1', name: 'Sarah Chen', email: 'sarah@acmecorp.com', phone: '+1 415-555-0101', company: 'Acme Corp', role: 'VP Engineering', lastContact: '2h ago', dealValue: 12000 },
  { id: '2', name: 'James Okafor', email: 'james@techstart.io', phone: '+1 650-555-0202', company: 'TechStart', role: 'CEO', lastContact: '1d ago', dealValue: 4800 },
  { id: '3', name: 'Maria Gonzalez', email: 'maria@brightmedia.co', phone: '+1 312-555-0303', company: 'BrightMedia', role: 'Marketing Lead', lastContact: '3d ago', dealValue: 3600 },
  { id: '4', name: 'Alex Kim', email: 'alex@growthlab.com', company: 'GrowthLab', role: 'Product Manager', lastContact: 'Yesterday', dealValue: 8400 },
  { id: '5', name: 'Priya Sharma', email: 'priya@nexushq.com', phone: '+1 408-555-0505', company: 'Nexus Inc', role: 'CTO', lastContact: '5d ago', dealValue: 15600 },
];

const MOCK_DEALS: Deal[] = [
  { id: '1', title: 'Enterprise Plan', company: 'Acme Corp', value: 12000, status: 'lead', priority: 'high', createdAt: '2026-04-10' },
  { id: '2', title: 'Agency Bundle', company: 'TechStart', value: 4800, status: 'lead', priority: 'medium', createdAt: '2026-04-12' },
  { id: '3', title: 'Starter + Add-ons', company: 'BrightMedia', value: 3600, status: 'qualified', priority: 'medium', createdAt: '2026-04-05' },
  { id: '4', title: 'Multi-seat License', company: 'GrowthLab', value: 8400, status: 'qualified', priority: 'high', createdAt: '2026-04-01' },
  { id: '5', title: 'Annual Contract', company: 'Nexus Inc', value: 15600, status: 'proposal', priority: 'high', createdAt: '2026-03-28' },
  { id: '6', title: 'Pro Upgrade', company: 'Orbit SaaS', value: 2999, status: 'proposal', priority: 'low', createdAt: '2026-04-08' },
  { id: '7', title: 'Agency License', company: 'Vertex Digital', value: 9600, status: 'won', priority: 'high', createdAt: '2026-03-15' },
  { id: '8', title: 'Starter Plan', company: 'Pulse HQ', value: 1200, status: 'won', priority: 'low', createdAt: '2026-03-20' },
  { id: '9', title: 'Enterprise POC', company: 'DarkStar', value: 20000, status: 'lost', priority: 'medium', createdAt: '2026-03-10' },
];

function formatCurrency(n: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);
}

export default function CRMPage() {
  const [tab, setTab] = useState<Tab>('contacts');
  const [search, setSearch] = useState('');
  const [contacts] = useState(MOCK_CONTACTS);
  const [deals] = useState(MOCK_DEALS);

  const filteredContacts = contacts.filter(c =>
    !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.company?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>CRM</h1>
        <p>Manage contacts, companies, and your sales pipeline.</p>
      </div>

      <div className="tabs" style={{ marginBottom: 20, maxWidth: 400 }}>
        {(['contacts', 'companies', 'deals'] as Tab[]).map(t => (
          <button key={t} className={`tab-item ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>
            {t === 'contacts' && <Users size={12} />} {t === 'companies' && <Building2 size={12} />} {t === 'deals' && <Briefcase size={12} />}
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {tab === 'contacts' && (
        <>
          <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
            <div style={{ position: 'relative', flex: 1, maxWidth: 320 }}>
              <Search size={12} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-quaternary)' }} />
              <input className="input" placeholder="Search contacts..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: 32 }} />
            </div>
            <button className="btn-primary btn-scale"><Plus size={13} /> Add Contact</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 12 }}>
            {filteredContacts.map(c => (
              <div key={c.id} className="card" style={{ padding: '14px 16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <div className="avatar">{c.name.split(' ').map(n => n[0]).join('').toUpperCase()}</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 500 }}>{c.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{c.role} · {c.company}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
                  <a href={`mailto:${c.email}`} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'var(--accent)', textDecoration: 'none' }}>
                    <Mail size={10} /> {c.email}
                  </a>
                </div>
                {c.phone && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 6 }}>
                    <Phone size={10} /> {c.phone}
                  </div>
                )}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8, paddingTop: 8, borderTop: '1px solid var(--separator)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10, color: 'var(--text-tertiary)' }}>
                    <Clock size={9} /> {c.lastContact}
                  </span>
                  {c.dealValue && (
                    <span className="badge badge-accent" style={{ fontSize: 10 }}>{formatCurrency(c.dealValue)}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {tab === 'deals' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12, minWidth: 900, overflowX: 'auto' }}>
          {COLUMNS.map(col => {
            const colDeals = deals.filter(d => d.status === col.id);
            return (
              <div key={col.id} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                  <div style={{ width: 8, height: 8, borderRadius: 2, background: col.color }} />
                  <span style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: col.color }}>{col.title}</span>
                  <span className="badge badge-gray" style={{ marginLeft: 'auto', fontSize: 9 }}>{colDeals.length}</span>
                </div>
                {colDeals.map(d => {
                  const p = PRIORITY_COLORS[d.priority];
                  return (
                    <div key={d.id} className="card" style={{ padding: '10px 12px' }}>
                      <div style={{ fontSize: 12, fontWeight: 500, marginBottom: 4 }}>{d.title}</div>
                      <div style={{ fontSize: 10, color: 'var(--text-tertiary)', marginBottom: 6 }}>{d.company}</div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--system-green)' }}>{formatCurrency(d.value)}</span>
                        <span className="badge" style={{ fontSize: 9, background: p.bg, color: p.color }}>{d.priority}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      )}

      {tab === 'companies' && (
        <div className="empty-state">
          <Building2 size={32} />
          <p>Companies module — connect to GHL to auto-import company records.</p>
        </div>
      )}
    </div>
  );
}

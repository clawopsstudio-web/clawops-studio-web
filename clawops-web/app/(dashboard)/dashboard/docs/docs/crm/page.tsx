'use client';

import { useState } from 'react';
import DocsLayout from '../../../docs-layout';
import { Users, Plus, Search, ChevronDown, ChevronUp, Briefcase, Bot, Filter } from 'lucide-react';

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="doc-faq-item">
      <button className="doc-faq-q" onClick={() => setOpen(!open)}>
        {q}
        {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>
      {open && <div className="doc-faq-a">{a}</div>}
    </div>
  );
}

export default function CRMDocsPage() {
  return (
    <DocsLayout>
      <div className="doc-breadcrumb">
        <Users size={12} />
        <span>CRM</span>
      </div>

      <h1 className="doc-h1">CRM</h1>
      <p className="doc-lead">
        Manage your contacts, companies, and sales pipeline from one place.
        Add deals, move them through pipeline stages, assign follow-up tasks to your AI agent,
        and filter/sort to find what you need fast.
      </p>

      {/* Overview */}
      <div className="doc-section">
        <div className="doc-section-title">Overview</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 10 }}>
          {[
            { icon: Users, label: 'Contacts', desc: 'People and companies' },
            { icon: Briefcase, label: 'Deals', desc: 'Pipeline management' },
            { icon: Bot, label: 'AI Tasks', desc: 'Agent-assigned follow-ups' },
            { icon: Filter, label: 'Filters', desc: 'Search & segment' },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="card" style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div style={{ width: 28, height: 28, borderRadius: 7, background: 'rgba(52,208,88,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--system-green)' }}>
                  <Icon size={14} />
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{item.label}</div>
                <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{item.desc}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="doc-divider" />

      {/* Step-by-step */}
      <div className="doc-section">
        <div className="doc-section-title">Step-by-Step Guide</div>

        {/* Step 1 */}
        <div className="doc-step">
          <div className="doc-step-num">1</div>
          <div className="doc-step-body">
            <div className="doc-step-title">Add a Contact</div>
            <div className="doc-step-desc">Go to <strong>CRM</strong> in the sidebar and click the <strong>Contacts</strong> tab.</div>
            <ol style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.9, paddingLeft: 16, marginBottom: 10 }}>
              <li>Click <strong>Add Contact</strong> (top-right of the contacts area)</li>
              <li>Fill in the required fields: <strong>Name</strong> and <strong>Email</strong></li>
              <li>Optional: Phone, Company, Role, Deal Value</li>
              <li>Click <strong>Save</strong></li>
            </ol>
            <p className="doc-step-desc">
              The contact card will appear in the contacts grid. Each card shows name, role, company,
              last contact time, and any linked deal value.
            </p>
            {/* screenshot: crm-add-contact.png */}
          </div>
        </div>

        {/* Step 2 */}
        <div className="doc-step">
          <div className="doc-step-num">2</div>
          <div className="doc-step-body">
            <div className="doc-step-title">Create a Deal</div>
            <div className="doc-step-desc">
              Click the <strong>Deals</strong> tab at the top of the CRM page.
              Deals represent potential revenue tied to a contact or company.
            </div>
            <ol style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.9, paddingLeft: 16, marginBottom: 10 }}>
              <li>Click <strong>Add Deal</strong> (if you don't see it, switch to the Deals tab first)</li>
              <li>Enter a <strong>Deal Title</strong> (e.g., "Enterprise Plan — Acme Corp")</li>
              <li>Set the <strong>Value</strong> in USD</li>
              <li>Assign a <strong>Priority</strong>: Low, Medium, or High</li>
              <li>Optionally link to a contact</li>
              <li>Click <strong>Create</strong></li>
            </ol>
            <p className="doc-step-desc">
              New deals are created in the <strong>Lead</strong> pipeline stage by default.
            </p>
            {/* screenshot: crm-create-deal.png */}
          </div>
        </div>

        {/* Step 3 */}
        <div className="doc-step">
          <div className="doc-step-num">3</div>
          <div className="doc-step-body">
            <div className="doc-step-title">Move Deals Through the Pipeline</div>
            <div className="doc-step-desc">
              The deal pipeline has 5 stages: <strong>Lead → Qualified → Proposal → Won → Lost</strong>.
              Drag deals between columns to advance them.
            </div>
            <ul style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: 16, marginBottom: 10 }}>
              <li><strong>Lead</strong> — Initial contact made, no qualification yet</li>
              <li><strong>Qualified</strong> — Budget, authority, and need confirmed</li>
              <li><strong>Proposal</strong> — Quote or proposal sent</li>
              <li><strong>Won</strong> — Deal closed successfully</li>
              <li><strong>Lost</strong> — Deal lost (moves to archive)</li>
            </ul>
            <p className="doc-step-desc">
              Hover over a deal card to see its full details. Click a deal card to open a side panel
              with notes, linked contact, and activity history.
            </p>
            {/* screenshot: crm-pipeline.png */}
            <div className="doc-tip">
              <Users size={13} />
              <span>Pro tip: Move deals to Won/Lost promptly so your pipeline stays accurate. ClawOps auto-calculates your weighted pipeline value based on deal stages.</span>
            </div>
          </div>
        </div>

        {/* Step 4 */}
        <div className="doc-step">
          <div className="doc-step-num">4</div>
          <div className="doc-step-body">
            <div className="doc-step-title">Assign Tasks to Your AI Agent</div>
            <div className="doc-step-desc">
              From any deal card or contact, click the <strong>Assign to Agent</strong> button
              (or the Bot icon) to delegate follow-up work.
            </div>
            <ol style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.9, paddingLeft: 16, marginBottom: 10 }}>
              <li>Click <strong>🤖 Assign to Agent</strong> on a contact or deal</li>
              <li>Type your task — e.g., "Send a follow-up email, mention our enterprise pricing"</li>
              <li>The agent will execute the task and mark it complete</li>
              <li>You'll get a notification when the task is done</li>
            </ol>
            {/* screenshot: crm-assign-agent.png */}
            <div className="doc-tip">
              <Bot size={13} />
              <span>Agent tasks run asynchronously. Check the Tasks page in the sidebar to see all pending, in-progress, and completed agent tasks.</span>
            </div>
          </div>
        </div>

        {/* Step 5 */}
        <div className="doc-step">
          <div className="doc-step-num">5</div>
          <div className="doc-step-body">
            <div className="doc-step-title">Filter and Search</div>
            <div className="doc-step-desc">
              Use the <strong>Search</strong> bar in the Contacts tab to find any contact by name, email, or company.
              The search is instant and case-insensitive.
            </div>
            <ul style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: 16, marginBottom: 10 }}>
              <li><strong>Search bar</strong> — filters contacts in real time as you type</li>
              <li><strong>Filter by tag</strong> — tag contacts (e.g., "hot lead", "churned") and filter by tag</li>
              <li><strong>Sort by</strong> — last contacted, deal value, name, or date added</li>
              <li><strong>Pipeline filters</strong> — in the Deals tab, filter by priority or stage</li>
            </ul>
            {/* screenshot: crm-filters.png */}
          </div>
        </div>
      </div>

      <div className="doc-divider" />

      {/* FAQ */}
      <div className="doc-section">
        <div className="doc-section-title">FAQ</div>
        <FaqItem q="Can I import contacts from a CSV?" a="Yes. Go to CRM → Contacts → Import. Upload a CSV with columns: name, email (required), phone, company, role. Duplicates are detected and you can choose to skip or merge." />
        <FaqItem q="How do I link a deal to a contact?" a="Open the deal card and click 'Link Contact'. Search for an existing contact or create a new one. Linked deals appear on the contact's detail view." />
        <FaqItem q="What's the difference between Deals and Pipeline?" a="They're the same view. 'Deals' is the table/grid view and 'Pipeline' is the Kanban-style board. Both show the same deals, just displayed differently." />
        <FaqItem q="Can I use CRM without connecting an external service?" a="Yes. The built-in CRM works standalone. Connecting GHL (via Integrations) auto-imports contacts and companies from your GHL account." />
        <FaqItem q="How do I delete a contact?" a="Open the contact card, click the three-dot menu (top-right), and select Delete. This also removes any unlinked deals. Deals linked to this contact will be preserved but unlinked." />
      </div>
    </DocsLayout>
  );
}

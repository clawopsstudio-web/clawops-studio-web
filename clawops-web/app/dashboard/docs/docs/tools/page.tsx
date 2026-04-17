'use client';

import { useState } from 'react';
import DocsLayout from '../../../docs-layout';
import { Wrench, Globe, Download, Settings, ChevronDown, ChevronUp, Search, Cpu } from 'lucide-react';

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

export default function ToolsDocsPage() {
  return (
    <DocsLayout>
      <div className="doc-breadcrumb">
        <Wrench size={12} />
        <span>Tools</span>
      </div>

      <h1 className="doc-h1">Tools</h1>
      <p className="doc-lead">
        Tools extend what your AI agents can do. Browse MCP (Model Context Protocol) servers
        from Smithery, enable them for your workspace, install browser plugins, and configure
        per-tool settings. Tools become available to all agents automatically once enabled.
      </p>

      {/* Overview */}
      <div className="doc-section">
        <div className="doc-section-title">Overview</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 10 }}>
          {[
            { icon: Globe, label: 'MCP Servers', desc: 'Browse Smithery catalog' },
            { icon: Download, label: 'Install', desc: 'Enable tool for agents' },
            { icon: Settings, label: 'Configure', desc: 'Set API keys and options' },
            { icon: Cpu, label: 'Tools Scope', desc: 'Control per-agent access' },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="card" style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div style={{ width: 28, height: 28, borderRadius: 7, background: 'rgba(255,200,87,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-energy)' }}>
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
            <div className="doc-step-title">Browse MCP Servers from Smithery</div>
            <div className="doc-step-desc">Go to <strong>Tools</strong> in the sidebar. The Smithery catalog is displayed by default.</div>
            <ul style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: 16, marginBottom: 10 }}>
              <li>Use <strong>category filters</strong> (Browser, Database, Communication, Development, etc.)</li>
              <li>Use the <strong>Search</strong> bar to find specific tools</li>
              <li>Each tool card shows: name, description, author, category, and star rating</li>
              <li>Click any card to see full details, required permissions, and example usage</li>
            </ul>
            <p className="doc-step-desc">
              Smithery is an open marketplace for MCP servers. All tools listed are community-maintained.
              Official ClawOps tools appear first in the catalog.
            </p>
            {/* screenshot: tools-smithery-catalog.png */}
          </div>
        </div>

        {/* Step 2 */}
        <div className="doc-step">
          <div className="doc-step-num">2</div>
          <div className="doc-step-body">
            <div className="doc-step-title">Enable an MCP Server</div>
            <div className="doc-step-desc">
              Find the tool you want in the catalog and click <strong>Enable</strong>.
              Some tools require an API key before they can be enabled.
            </div>
            <ol style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.9, paddingLeft: 16, marginBottom: 10 }}>
              <li>Find the tool in the catalog</li>
              <li>Click <strong>Enable</strong> on its card</li>
              <li>If it needs an API key, a prompt will appear — paste the key</li>
              <li>Click <strong>Enable</strong> again to confirm</li>
              <li>The tool moves to your <strong>Enabled Tools</strong> section</li>
            </ol>
            {/* screenshot: tools-enable-mcp.png */}
            <div className="doc-tip">
              <Cpu size={13} />
              <span>Enabling a tool doesn't give all agents unlimited access — use Tools Scope when spawning agents to control which agents can use which tools.</span>
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="doc-step">
          <div className="doc-step-num">3</div>
          <div className="doc-step-body">
            <div className="doc-step-title">Install a Plugin</div>
            <div className="doc-step-desc">
              Some tools have optional plugins that extend their functionality.
              Plugins are installed per-tool, from the tool's detail page.
            </div>
            <ol style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.9, paddingLeft: 16, marginBottom: 10 }}>
              <li>Click on a tool card to open its detail view</li>
              <li>Scroll to the <strong>Plugins</strong> section</li>
              <li>Browse available plugins and their descriptions</li>
              <li>Click <strong>Install</strong> next to the plugin you want</li>
              <li>The plugin is installed and immediately active for that tool</li>
            </ol>
            <p className="doc-step-desc">
              Examples: The GitHub MCP server has plugins for Issues, Pull Requests, and Actions.
              The Browser MCP server has plugins for screenshots, PDF export, and session management.
            </p>
            {/* screenshot: tools-plugin-install.png */}
          </div>
        </div>

        {/* Step 4 */}
        <div className="doc-step">
          <div className="doc-step-num">4</div>
          <div className="doc-step-body">
            <div className="doc-step-title">Configure Tools</div>
            <div className="doc-step-desc">
              Each enabled tool has its own configuration panel. Access it from the
              <strong>Enabled Tools</strong> section on the right side of the Tools page.
            </div>
            <ol style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.9, paddingLeft: 16, marginBottom: 10 }}>
              <li>Go to the <strong>Enabled Tools</strong> section</li>
              <li>Click <strong>Configure</strong> on the tool you want to adjust</li>
              <li>Common config fields: API keys, default region/endpoint, timeout settings, retry policy</li>
              <li>Toggle <strong>Enabled</strong> on/off to temporarily disable without uninstalling</li>
              <li>Click <strong>Save</strong></li>
            </ol>
            {/* screenshot: tools-configure.png */}
            <div className="doc-warning">
              <Settings size={13} />
              <span>If you change a tool's API key, save immediately — unsaved keys are lost on page navigation. Use the Account → API Keys page for shared keys across multiple tools.</span>
            </div>
          </div>
        </div>
      </div>

      <div className="doc-divider" />

      {/* FAQ */}
      <div className="doc-section">
        <div className="doc-section-title">FAQ</div>
        <FaqItem q="What is MCP?" a="MCP (Model Context Protocol) is an open standard that lets AI models connect to external tools and data sources. ClawOps uses MCP to give agents capabilities beyond text — browsing, database access, API calls, etc." />
        <FaqItem q="Are all Smithery tools free?" a="Most are free and open-source. Some premium tools on Smithery require a paid subscription on their end. ClawOps doesn't charge extra for tool usage — only your own API costs apply." />
        <FaqItem q="How do I know if a tool is safe?" a="Check the tool's GitHub star count, last updated date, and reviews. All Smithery tools are open-source. For enterprise workspaces, ask your admin to review the tool's source code before enabling." />
        <FaqItem q="Can I disable a tool without uninstalling it?" a="Yes. In the tool's configuration panel, toggle the Enabled switch off. The tool remains installed but agents won't be able to use it until re-enabled." />
        <FaqItem q="Why is a tool I enabled not showing up for my agent?" a="Check that the agent's Tools Scope includes this tool. When spawning an agent, expand the Tools Scope section and make sure the tool is toggled on." />
      </div>
    </DocsLayout>
  );
}

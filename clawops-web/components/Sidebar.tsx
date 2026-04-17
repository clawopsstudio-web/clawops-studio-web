'use client';

import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { NavLinks } from '@/components/NavLinks';
import { useDashboardStore } from '@/store/dashboard';

export function Sidebar() {
  const sidebarCollapsed = useDashboardStore((s) => s.sidebarCollapsed);
  const setSidebarCollapsed = useDashboardStore((s) => s.setSidebarCollapsed);

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className="hidden md:flex md:flex-col"
        style={{
          width: sidebarCollapsed ? '56px' : '200px',
          flexShrink: 0,
          background: 'var(--sidebar-bg)',
          backdropFilter: 'blur(40px) saturate(180%)',
          WebkitBackdropFilter: 'blur(40px) saturate(180%)',
          borderRight: '1px solid var(--separator)',
          transition: 'width 200ms ease-out',
          overflow: 'clip',
          height: '100vh',
          position: 'sticky',
          top: 0,
        }}
      >
        {/* Logo */}
        <div
          style={{
            padding: sidebarCollapsed ? '12px 0' : '12px 14px',
            display: 'flex', alignItems: 'center', gap: 10,
            borderBottom: '1px solid var(--separator)',
            minHeight: 52,
            justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
          }}
        >
          <div style={{
            width: 28, height: 28, borderRadius: 7,
            background: 'linear-gradient(135deg, #5B6CFF, #00D1FF)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 12, fontWeight: 700, color: '#fff', flexShrink: 0,
          }}>
            C
          </div>
          {!sidebarCollapsed && (
            <div style={{ fontSize: 14, fontWeight: 600, letterSpacing: '-0.3px' }}>
              Claw<span style={{ color: 'var(--accent)' }}>Ops</span>
            </div>
          )}
        </div>

        {/* Collapse toggle */}
        <div style={{ padding: '6px 6px 2px', display: 'flex', justifyContent: sidebarCollapsed ? 'center' : 'flex-end' }}>
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            title={sidebarCollapsed ? 'Expand' : 'Collapse'}
            className="hover-bg"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 26, height: 26, borderRadius: 'var(--radius-xs)',
              border: 'none', background: 'none',
              color: 'var(--text-quaternary)', cursor: 'pointer',
            }}
          >
            {sidebarCollapsed ? <PanelLeftOpen size={15} /> : <PanelLeftClose size={15} />}
          </button>
        </div>

        <NavLinks collapsed={sidebarCollapsed} />
      </aside>
    </>
  );
}

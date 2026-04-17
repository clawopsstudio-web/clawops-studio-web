'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Users, Share2, CheckSquare, Bot, BookOpen,
  Wrench, Plug, UserCircle, Settings,
  Monitor, Globe, Cpu, Zap, ChevronRight, ExternalLink,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useUserId } from '@/lib/useUser';

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  /** If true, opens in a new tab */
  external?: boolean;
}

const PRIMARY_ITEMS: NavItem[] = [
  { href: '/',                        label: 'Dashboard',       icon: LayoutDashboard },
  { href: '/dashboard/crm',            label: 'CRM',             icon: Users          },
  { href: '/dashboard/social',        label: 'Social',          icon: Share2         },
  { href: '/dashboard/tasks',         label: 'Tasks',           icon: CheckSquare    },
  { href: '/dashboard/agents',        label: 'AI Agents',       icon: Bot            },
  { href: '/dashboard/skills',        label: 'Skills',          icon: BookOpen       },
  { href: '/dashboard/tools',         label: 'Tools',           icon: Wrench         },
  { href: '/dashboard/integrations',  label: 'Integrations',    icon: Plug           },
];

const SECONDARY_ITEMS: NavItem[] = [
  { href: '/dashboard/docs',      label: 'Docs',      icon: BookOpen  },
  { href: '/dashboard/account', label: 'Account', icon: UserCircle },
  { href: '/settings',          label: 'Settings', icon: Settings  },
];

interface ToolLink {
  /** Label shown in the UI */
  label: string;
  /** Path part after /{userId}/, e.g. 'chrome' */
  toolPath: string;
  icon: LucideIcon;
  /** Optional tooltip / description */
  desc?: string;
}

const TOOL_LINKS: ToolLink[] = [
  { label: 'Chrome VNC',  toolPath: 'chrome',  icon: Monitor,    desc: 'Shared visual browser' },
  { label: 'Browser',      toolPath: 'browser',  icon: Globe,      desc: 'Camoufox anti-detect' },
  { label: 'n8n',         toolPath: 'n8n',     icon: Zap,        desc: 'Workflow automation' },
  { label: 'Gateway',      toolPath: 'gateway',  icon: Cpu,        desc: 'OpenClaw agent gateway' },
  { label: 'HiClaw',       toolPath: 'hiclaw',  icon: Bot,        desc: 'Multi-agent hub' },
];

function NavIcon({ icon: Icon, size = 18 }: { icon: LucideIcon; size?: number }) {
  return <Icon size={size} />;
}

function NavLink({ item, collapsed }: { item: NavItem; collapsed: boolean }) {
  const pathname = usePathname();
  const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      title={collapsed ? item.label : undefined}
      target={item.external ? '_blank' : undefined}
      rel={item.external ? 'noopener noreferrer' : undefined}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: collapsed ? '7px 0' : '7px 10px',
        justifyContent: collapsed ? 'center' : 'flex-start',
        borderRadius: 'var(--radius-sm)',
        color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
        background: isActive ? 'var(--fill-tertiary)' : 'transparent',
        fontSize: 13,
        fontWeight: isActive ? 500 : 400,
        textDecoration: 'none',
        transition: 'background 120ms, color 120ms',
        position: 'relative',
      }}
      className="hover-bg"
    >
      {isActive && (
        <span style={{
          position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)',
          width: 3, height: 16, borderRadius: '0 2px 2px 0',
          background: 'var(--accent)',
        }} />
      )}
      <NavIcon icon={Icon} size={18} />
      {!collapsed && <span>{item.label}</span>}
      {item.external && !collapsed && (
        <ExternalLink size={11} style={{ marginLeft: 'auto', opacity: 0.4 }} />
      )}
    </Link>
  );
}

function SectionLabel({ label, collapsed }: { label: string; collapsed: boolean }) {
  if (collapsed) return null;
  return (
    <div style={{
      padding: '12px 10px 4px',
      fontSize: 10, fontWeight: 600, letterSpacing: '0.07em',
      textTransform: 'uppercase', color: 'var(--text-quaternary)',
    }}>
      {label}
    </div>
  );
}

export function NavLinks({ collapsed }: { collapsed: boolean }) {
  const userId = useUserId();
  const [toolsOpen, setToolsOpen] = useState(false);

  return (
    <nav style={{ flex: 1, padding: '4px 6px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 1 }}>
      <SectionLabel label="Main" collapsed={collapsed} />
      {PRIMARY_ITEMS.map((item) => (
        <NavLink key={item.href} item={item} collapsed={collapsed} />
      ))}

      {/* ── Tools section (scoped to user) ── */}
      {userId ? (
        <div style={{ marginTop: 4 }}>
          <SectionLabel label="Tools" collapsed={collapsed} />

          {!collapsed ? (
            <button
              onClick={() => setToolsOpen((v) => !v)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '7px 10px',
                width: '100%',
                borderRadius: 'var(--radius-sm)',
                background: 'transparent',
                border: 'none',
                color: 'var(--text-secondary)',
                fontSize: 13,
                cursor: 'pointer',
                transition: 'background 120ms, color 120ms',
                textAlign: 'left' as const,
              }}
              className="hover-bg"
            >
              <Monitor size={18} />
              <span style={{ flex: 1 }}>My Tools</span>
              <ChevronRight
                size={14}
                style={{
                  transform: toolsOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                  transition: 'transform 150ms',
                  opacity: 0.5,
                }}
              />
            </button>
          ) : (
            <button
              onClick={() => setToolsOpen((v) => !v)}
              title="My Tools"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '7px 0',
                width: '100%',
                borderRadius: 'var(--radius-sm)',
                background: 'transparent',
                border: 'none',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
              }}
              className="hover-bg"
            >
              <Monitor size={18} />
            </button>
          )}

          {toolsOpen && !collapsed && (
            <div style={{ paddingLeft: 6, display: 'flex', flexDirection: 'column', gap: 1 }}>
              {TOOL_LINKS.map((tool) => {
                const href = `/${userId}/${tool.toolPath}`;
                const Icon = tool.icon;
                return (
                  <Link
                    key={tool.toolPath}
                    href={href}
                    title={tool.desc}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '6px 8px',
                      borderRadius: 'var(--radius-sm)',
                      color: 'var(--text-secondary)',
                      fontSize: 12,
                      textDecoration: 'none',
                      transition: 'background 120ms, color 120ms',
                    }}
                    className="hover-bg"
                  >
                    <Icon size={15} />
                    <span style={{ flex: 1 }}>{tool.label}</span>
                    <ExternalLink size={10} style={{ opacity: 0.35 }} />
                  </Link>
                );
              })}
            </div>
          )}

          {/* When collapsed: show all tools as icon-only links */}
          {collapsed && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'center' }}>
              {TOOL_LINKS.map((tool) => {
                const href = `/${userId}/${tool.toolPath}`;
                const Icon = tool.icon;
                return (
                  <Link
                    key={tool.toolPath}
                    href={href}
                    title={tool.desc ?? tool.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '7px 0',
                      width: '100%',
                      borderRadius: 'var(--radius-sm)',
                      color: 'var(--text-secondary)',
                      textDecoration: 'none',
                      transition: 'background 120ms, color 120ms',
                    }}
                    className="hover-bg"
                  >
                    <Icon size={18} />
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        /* Not logged in yet — show tools without userId scope (auth redirect will handle it) */
        <div style={{ marginTop: 4 }}>
          <SectionLabel label="Tools" collapsed={collapsed} />
          {TOOL_LINKS.map((tool) => {
            const href = `/auth/login?redirectTo=/${tool.toolPath}`;
            const Icon = tool.icon;
            return (
              <Link
                key={tool.toolPath}
                href={href}
                title={tool.desc}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: collapsed ? '7px 0' : '7px 10px',
                  justifyContent: collapsed ? 'center' : 'flex-start',
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  fontSize: 13,
                  transition: 'background 120ms, color 120ms',
                }}
                className="hover-bg"
              >
                <Icon size={18} />
                {!collapsed && <span>{tool.label}</span>}
              </Link>
            );
          })}
        </div>
      )}

      <div style={{ height: 8 }} />
      <SectionLabel label="Account" collapsed={collapsed} />
      {SECONDARY_ITEMS.map((item) => (
        <NavLink key={item.href} item={item} collapsed={collapsed} />
      ))}
    </nav>
  );
}

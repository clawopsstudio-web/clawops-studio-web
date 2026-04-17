'use client';

import { useState } from 'react';
import {
  Share2, Twitter, Linkedin, Link2, Calendar, Clock, Trash2,
  Send, ChevronLeft, ChevronRight, Check, AlertCircle, Plus, ExternalLink,
} from 'lucide-react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Platform = 'twitter' | 'linkedin';
type PostStatus = 'scheduled' | 'published' | 'failed';

interface ConnectedAccount {
  id: string;
  platform: Platform;
  handle: string;
  name: string;
  avatar: string;
  connected: boolean;
}

interface ScheduledPost {
  id: string;
  platform: Platform;
  content: string;
  scheduledAt: string;
  date: string;
  status: PostStatus;
}

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------

const ACCOUNTS: ConnectedAccount[] = [
  { id: '1', platform: 'twitter', handle: '@pulkit_g', name: 'Pulkit G', avatar: 'PG', connected: true },
  { id: '2', platform: 'linkedin', handle: 'pulkit-sharma', name: 'Pulkit Sharma', avatar: 'PS', connected: true },
  { id: '3', platform: 'twitter', handle: '@clawops_studio', name: 'ClawOps Studio', avatar: 'CS', connected: false },
];

const SCHEDULED_POSTS: ScheduledPost[] = [
  { id: '1', platform: 'linkedin', content: 'Excited to share what we\'ve been building at ClawOps Studio — AI agents that work as hard as you do. 🚀 #AI #Startup', scheduledAt: '9:00 AM', date: 'Apr 18', status: 'scheduled' },
  { id: '2', platform: 'twitter', content: 'Hot take: The best AI automation stack is OpenClaw + n8n + DeerFlow. Thread incoming.', scheduledAt: '11:00 AM', date: 'Apr 18', status: 'scheduled' },
  { id: '3', platform: 'linkedin', content: 'We just hit 10 beta customers. Every single one came from organic Twitter. Lesson: build in public works.', scheduledAt: '2:00 PM', date: 'Apr 19', status: 'scheduled' },
  { id: '4', platform: 'twitter', content: 'Agentic AI isn\'t the future — it\'s the present. Businesses using AI agents are already winning.', scheduledAt: '10:00 AM', date: 'Apr 20', status: 'scheduled' },
  { id: '5', platform: 'twitter', content: 'Shipped: New competitor research workflow in ZeroClaw. Saves 3 hours/week per agent.', scheduledAt: '9:30 AM', date: 'Apr 21', status: 'published' },
];

// ---------------------------------------------------------------------------
// Calendar helpers
// ---------------------------------------------------------------------------

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

function getCalendarDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(d);
  return days;
}

function isToday(year: number, month: number, day: number) {
  const t = new Date();
  return t.getFullYear() === year && t.getMonth() === month && t.getDate() === day;
}

function getPostForDate(dateStr: string) {
  return SCHEDULED_POSTS.find(p => {
    const d = new Date();
    const parts = dateStr.split(' ');
    const monthMap: Record<string, number> = { Jan:0,Feb:1,Mar:2,Apr:3 };  // unused but kept for reference
    // format: "Apr 18"
    return p.date.includes(parts[0]) && p.date.includes(parts[1]);
  });
}

// ---------------------------------------------------------------------------
// Platform icon/color helpers
// ---------------------------------------------------------------------------

function PlatformIcon({ platform, size = 14 }: { platform: Platform; size?: number }) {
  if (platform === 'twitter') return <Twitter size={size} style={{ color: '#1DA1F2' }} />;
  return <Linkedin size={size} style={{ color: '#0A66C2' }} />;
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function SocialPage() {
  const [accounts] = useState(ACCOUNTS);
  const [posts, setPosts] = useState(SCHEDULED_POSTS);
  const [composerContent, setComposerContent] = useState('');
  const [composerPlatform, setComposerPlatform] = useState<Platform>('twitter');
  const [composerSchedule, setComposerSchedule] = useState('');

  // Calendar state
  const now = new Date();
  const [calYear, setCalYear] = useState(now.getFullYear());
  const [calMonth, setCalMonth] = useState(now.getMonth());
  const calendarDays = getCalendarDays(calYear, calMonth);

  const prevMonth = () => { if (calMonth === 0) { setCalMonth(11); setCalYear(y => y - 1); } else setCalMonth(m => m - 1); };
  const nextMonth = () => { if (calMonth === 11) { setCalMonth(0); setCalYear(y => y + 1); } else setCalMonth(m => m + 1); };

  const schedulePost = () => {
    if (!composerContent.trim()) return;
    const today = new Date();
    setPosts(p => [...p, {
      id: Date.now().toString(),
      platform: composerPlatform,
      content: composerContent,
      scheduledAt: composerSchedule || 'ASAP',
      date: `${MONTHS[calMonth].slice(0,3)} ${today.getDate()}`,
      status: 'scheduled' as PostStatus,
    }]);
    setComposerContent('');
    setComposerSchedule('');
  };

  const deletePost = (id: string) => setPosts(p => p.filter(post => post.id !== id));

  const maxChars = composerPlatform === 'twitter' ? 280 : 3000;
  const charCount = composerContent.length;
  const charPct = charCount / maxChars;
  const charColor = charPct > 1 ? 'var(--system-red)' : charPct > 0.9 ? 'var(--system-orange)' : 'var(--text-tertiary)';

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Social</h1>
        <p>Connect accounts, compose posts, and schedule content across platforms.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 20 }}>
        {/* Left: composer + calendar + posts */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Composer */}
          <div className="card" style={{ padding: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <Share2 size={15} style={{ color: 'var(--accent)' }} />
              <span style={{ fontSize: 14, fontWeight: 600 }}>Compose Post</span>
            </div>

            {/* Platform selector */}
            <div className="tabs" style={{ marginBottom: 12, maxWidth: 260 }}>
              {(['twitter', 'linkedin'] as Platform[]).map(p => (
                <button
                  key={p}
                  className={`tab-item ${composerPlatform === p ? 'active' : ''}`}
                  onClick={() => setComposerPlatform(p)}
                  style={{ display: 'flex', alignItems: 'center', gap: 6 }}
                >
                  <PlatformIcon platform={p} size={13} />
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </button>
              ))}
            </div>

            <textarea
              className="textarea"
              placeholder={`What's happening on ${composerPlatform === 'twitter' ? 'Twitter' : 'LinkedIn'}?`}
              value={composerContent}
              onChange={e => setComposerContent(e.target.value)}
              style={{ minHeight: 100, marginBottom: 10 }}
            />

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ fontSize: 11, color: charColor }}>{charCount} / {maxChars}</span>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <Clock size={12} style={{ color: 'var(--text-quaternary)' }} />
                <input
                  className="input"
                  type="datetime-local"
                  value={composerSchedule}
                  onChange={e => setComposerSchedule(e.target.value)}
                  style={{ fontSize: 12, width: 220, padding: '5px 10px' }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <button className="btn-ghost btn-scale">
                <Calendar size={13} /> Preview
              </button>
              <button
                className="btn-primary btn-scale"
                onClick={schedulePost}
                disabled={!composerContent.trim()}
              >
                <Send size={13} /> Schedule Post
              </button>
            </div>
          </div>

          {/* Calendar */}
          <div className="card" style={{ padding: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <span style={{ fontSize: 14, fontWeight: 600 }}>Schedule</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <button onClick={prevMonth} className="hover-bg" style={{ padding: 4, borderRadius: 4, border: 'none', background: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                  <ChevronLeft size={14} />
                </button>
                <span style={{ fontSize: 13, fontWeight: 500, minWidth: 130, textAlign: 'center' }}>
                  {MONTHS[calMonth]} {calYear}
                </span>
                <button onClick={nextMonth} className="hover-bg" style={{ padding: 4, borderRadius: 4, border: 'none', background: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2 }}>
              {DAYS.map(d => (
                <div key={d} style={{ textAlign: 'center', fontSize: 10, fontWeight: 600, color: 'var(--text-quaternary)', padding: '4px 0', letterSpacing: '0.05em' }}>{d}</div>
              ))}
              {calendarDays.map((day, i) => {
                const today = day && isToday(calYear, calMonth, day);
                return (
                  <div key={i} style={{
                    textAlign: 'center',
                    padding: '6px 2px',
                    borderRadius: 6,
                    fontSize: 11,
                    fontWeight: today ? 600 : 400,
                    color: day ? (today ? 'var(--accent)' : 'var(--text-secondary)') : 'transparent',
                    background: today ? 'var(--accent-fill)' : 'transparent',
                    cursor: 'default',
                  }}>
                    {day || ''}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Scheduled posts list */}
          <div>
            <div className="section-title">Upcoming Posts</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {posts.filter(p => p.status === 'scheduled').map(p => (
                <div key={p.id} className="card" style={{ padding: '12px 14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <PlatformIcon platform={p.platform} />
                    <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{p.date} · {p.scheduledAt}</span>
                    <span style={{ marginLeft: 'auto' }} className="badge badge-accent">Scheduled</span>
                    <button onClick={() => deletePost(p.id)} className="hover-bg" style={{ padding: 3, borderRadius: 4, border: 'none', background: 'none', color: 'var(--text-quaternary)', cursor: 'pointer' }}>
                      <Trash2 size={12} />
                    </button>
                  </div>
                  <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{p.content}</p>
                </div>
              ))}
              {posts.filter(p => p.status === 'scheduled').length === 0 && (
                <div className="empty-state" style={{ padding: '32px 0' }}>
                  <Calendar size={24} />
                  <p>No scheduled posts yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: accounts */}
        <div>
          <div className="section-title">Connected Accounts</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {accounts.map(a => (
              <div key={a.id} className="card" style={{ padding: '12px 14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div className="avatar avatar-sm">{a.avatar}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: 500 }}>{a.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{a.handle}</div>
                  </div>
                  <span className={`badge ${a.connected ? 'badge-green' : 'badge-gray'}`}>
                    {a.connected ? <><Check size={9} /> Connected</> : 'Not Connected'}
                  </span>
                </div>
                {!a.connected && (
                  <button className="btn-primary btn-scale" style={{ width: '100%', marginTop: 10, justifyContent: 'center', fontSize: 12 }}>
                    <ExternalLink size={12} /> Connect via Composio
                  </button>
                )}
              </div>
            ))}

            <button className="btn-ghost btn-scale" style={{ width: '100%', justifyContent: 'center' }}>
              <Plus size={13} /> Add Account
            </button>
          </div>

          {/* Composio note */}
          <div style={{
            marginTop: 20, padding: '14px 14px',
            background: 'var(--accent-fill)',
            border: '1px solid rgba(91,108,255,0.25)',
            borderRadius: 'var(--radius-md)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <AlertCircle size={13} style={{ color: 'var(--accent)' }} />
              <span style={{ fontSize: 12, fontWeight: 500 }}>Composio Integration</span>
            </div>
            <p style={{ fontSize: 11, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Connect Twitter and LinkedIn via Composio OAuth for seamless posting and analytics.
            </p>
            <button className="btn-primary btn-scale" style={{ marginTop: 10, width: '100%', justifyContent: 'center', fontSize: 12 }}>
              <ExternalLink size={12} /> Open Composio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

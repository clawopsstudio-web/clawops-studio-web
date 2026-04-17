'use client';

import { useState } from 'react';
import DocsLayout from '../docs-layout';
import {
  Send, MessageCircle, Hash, Key, ExternalLink, CheckCircle2,
  ChevronDown, ChevronUp, ArrowRight, Info, AlertTriangle,
  Bot, Smartphone, Users,
} from 'lucide-react';

// ── Step Group Accordion ───────────────────────────────────────────────────────
function StepGroup({ title, steps, defaultOpen = true }: {
  title: string;
  steps: React.ReactNode[];
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{
      border: '1px solid var(--separator)',
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden',
      marginBottom: 12,
    }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 16px',
          background: 'var(--fill-secondary)',
          border: 'none',
          cursor: 'pointer',
          fontFamily: 'inherit',
          fontSize: 13,
          fontWeight: 600,
          color: 'var(--text-primary)',
          textAlign: 'left',
        }}
      >
        {title}
        {open ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
      </button>
      {open && (
        <ol style={{ margin: 0, padding: '12px 16px 12px 40px', background: 'var(--material-thin)' }}>
          {steps.map((step, i) => (
            <li key={i} style={{
              fontSize: 13,
              color: 'var(--text-secondary)',
              lineHeight: 1.7,
              marginBottom: i < steps.length - 1 ? 8 : 0,
            }}>
              {step}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

// ── Inline Code ────────────────────────────────────────────────────────────────
function Code({ children }: { children: React.ReactNode }) {
  return (
    <code style={{
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      background: 'var(--code-bg)',
      border: '1px solid var(--separator)',
      borderRadius: 3,
      padding: '1px 6px',
      color: 'var(--accent-secondary)',
    }}>
      {children}
    </code>
  );
}

// ── Channel Card ──────────────────────────────────────────────────────────────
function ChannelCard({
  icon: Icon,
  iconColor,
  title,
  badge,
  badgeColor,
  description,
  children,
  tips,
  warnings,
}: {
  icon: React.ElementType;
  iconColor: string;
  title: string;
  badge?: string;
  badgeColor?: string;
  description: string;
  children: React.ReactNode;
  tips?: string[];
  warnings?: string[];
}) {
  return (
    <div style={{
      background: 'var(--material-regular)',
      border: '1px solid var(--separator)',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      marginBottom: 32,
    }}>
      {/* Header */}
      <div style={{
        padding: '20px 24px',
        borderBottom: '1px solid var(--separator)',
        display: 'flex',
        alignItems: 'flex-start',
        gap: 16,
      }}>
        <div style={{
          width: 44,
          height: 44,
          borderRadius: 10,
          background: 'var(--accent-fill)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          <Icon size={20} color={iconColor} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 4 }}>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>{title}</h2>
            {badge && (
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '2px 10px',
                borderRadius: 99,
                fontSize: 11,
                fontWeight: 600,
                background: badgeColor === 'green' ? 'rgba(34,197,94,0.12)' :
                            badgeColor === 'blue' ? 'rgba(0,209,255,0.12)' :
                            badgeColor === 'purple' ? 'rgba(168,85,247,0.12)' :
                            'var(--accent-fill)',
                color: badgeColor === 'green' ? '#22c55e' :
                       badgeColor === 'blue' ? 'var(--accent-secondary)' :
                       badgeColor === 'purple' ? '#a855f7' :
                       'var(--accent)',
              }}>
                {badge}
              </span>
            )}
          </div>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6 }}>{description}</p>
        </div>
      </div>

      {/* Steps */}
      <div style={{ padding: '20px 24px' }}>
        <div style={{
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: '0.07em',
          textTransform: 'uppercase',
          color: 'var(--text-quaternary)',
          marginBottom: 14,
        }}>
          Setup Guide
        </div>
        {children}
      </div>

      {/* Tips */}
      {tips && tips.length > 0 && (
        <div style={{ padding: '0 24px 20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {tips.map((tip, i) => (
              <div key={i} style={{
                display: 'flex', gap: 10,
                padding: '10px 14px',
                background: 'var(--accent-secondary-fill)',
                border: '1px solid rgba(0,209,255,0.2)',
                borderRadius: 'var(--radius-sm)',
                fontSize: 12,
                color: 'var(--text-secondary)',
                lineHeight: 1.5,
              }}>
                <Info size={13} style={{ color: 'var(--accent-secondary)', flexShrink: 0, marginTop: 1 }} />
                <span>{tip}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Warnings */}
      {warnings && warnings.length > 0 && (
        <div style={{ padding: '0 24px 20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {warnings.map((note, i) => (
              <div key={i} style={{
                display: 'flex', gap: 10,
                padding: '10px 14px',
                background: 'rgba(255,179,64,0.08)',
                border: '1px solid rgba(255,179,64,0.2)',
                borderRadius: 'var(--radius-sm)',
                fontSize: 12,
                color: 'var(--text-secondary)',
                lineHeight: 1.5,
              }}>
                <AlertTriangle size={13} style={{ color: '#ffb340', flexShrink: 0, marginTop: 1 }} />
                <span>{note}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── API Provider Grid ──────────────────────────────────────────────────────────
function ApiProviderGrid() {
  const providers = [
    { name: 'Twitter / X', url: 'developer.twitter.com', desc: 'Post, reply, and analyze tweets' },
    { name: 'LinkedIn', url: 'developer.linkedin.com', desc: 'Company posts and messaging' },
    { name: 'Google AI Studio', url: 'aistudio.google.com', desc: 'Gemini models & embeddings' },
    { name: 'OpenAI', url: 'platform.openai.com', desc: 'GPT models, TTS, Whisper' },
    { name: 'ElevenLabs', url: 'elevenlabs.io', desc: 'Voice synthesis & cloning' },
    { name: 'DeepSeek', url: 'platform.deepseek.com', desc: 'DeepSeek models via OpenAI compat' },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10, marginTop: 16 }}>
      {providers.map((p) => (
        <div key={p.name} style={{
          padding: '14px',
          background: 'var(--material-thin)',
          border: '1px solid var(--separator)',
          borderRadius: 'var(--radius-sm)',
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
        }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{p.name}</div>
          <div style={{ fontSize: 11, color: 'var(--accent-secondary)' }}>{p.url}</div>
          <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 2 }}>{p.desc}</div>
        </div>
      ))}
    </div>
  );
}

// ── Page ────────────────────────────────────────────────────────────────────────
export default function ChannelsPage() {
  return (
    <DocsLayout>
      <div className="doc-breadcrumb">
        <Send size={12} />
        <span>Platform</span>
        <ArrowRight size={10} style={{ color: 'var(--text-tertiary)' }} />
        <span>Channels</span>
      </div>

      <h1 className="doc-h1">Channels & API Keys</h1>
      <p className="doc-lead">
        Connect your AI agent to messaging platforms — Telegram, WhatsApp, and Discord — so it can
        chat with users in real time. Also add API keys for any external service your agents need to call.
      </p>

      {/* ── Telegram ── */}
      <ChannelCard
        icon={Send}
        iconColor="#229ED9"
        title="Telegram"
        badge="Recommended"
        badgeColor="blue"
        description="The fastest way to deploy your AI agent. Create a Telegram bot, add the token, and your agent is live in minutes."
        tips={[
          'Telegram bots never go offline — your AI agent is always on, responding instantly.',
          'Use /start to reset the conversation and get a fresh context window.',
          'You can set a bot username via @BotFather with the /setname command.',
          'Telegram bots support deep links for easy user onboarding.',
        ]}
        warnings={[
          'Never share your bot token publicly. Treat it like a password.',
          'Telegram bots cannot initiate conversations — users must message them first.',
        ]}
      >
        <StepGroup
          title="Step 1 — Create a Telegram Bot"
          steps={[
            <>
              Open Telegram and search for <strong>@BotFather</strong> — the official bot for creating bots.
            </>,
            <>
              Send <Code>/newbot</Code> and follow the prompts. Give your bot a{' '}
              <strong>display name</strong> (e.g., "Acme AI Assistant") and a{' '}
              <strong>username</strong> ending in <Code>bot</Code> (e.g., <Code>acme_ai_bot</Code>).
            </>,
            <>
              BotFather will give you a token like:{' '}
              <Code>123456789:ABCdefGHIjklMNOpqrsTUVwxyz</Code>.
              <br />
              <strong>Copy and save this token</strong> — you will need it in the next step.
            </>,
          ]}
        />

        <StepGroup
          title="Step 2 — Add Bot Token to OpenClaw"
          defaultOpen={true}
          steps={[
            <>
              Run the OpenClaw CLI command with your token:
              <div style={{
                marginTop: 8,
                padding: '10px 14px',
                background: 'var(--code-bg)',
                border: '1px solid var(--separator)',
                borderRadius: 'var(--radius-sm)',
                fontFamily: 'var(--font-mono)',
                fontSize: 12,
                color: 'var(--accent-secondary)',
              }}>
                openclaw channels add telegram --token 123456789:ABCdefGHIjklMNOpqrsTUVwxyz
              </div>
            </>,
            <>
              Or add it via the dashboard: go to <strong>Settings → Channels → Telegram</strong> and
              paste the bot token into the token field.
            </>,
            <>
              OpenClaw will validate the token automatically. A green{' '}
              <span style={{ color: '#22c55e', fontWeight: 600 }}>Connected</span> indicator confirms success.
            </>,
          ]}
        />

        <StepGroup
          title="Step 3 — Start Chatting"
          defaultOpen={false}
          steps={[
            <>
              Open Telegram and search for your bot by its username (the one you set in Step 1).
            </>,
            <>
              Send <Code>/start</Code> — your AI agent responds immediately.
            </>,
            <>
              The bot is now live 24/7. Every message goes to your AI agent running on OpenClaw.
            </>,
          ]}
        />
      </ChannelCard>

      {/* ── WhatsApp ── */}
      <ChannelCard
        icon={Smartphone}
        iconColor="#25D366"
        title="WhatsApp"
        badge="Business"
        badgeColor="green"
        description="Connect WhatsApp Business so users can message your AI agent directly from their contact list."
        tips={[
          'WhatsApp Business API is the official, reliable option — recommended for production.',
          'The phone number connected must be a dedicated WhatsApp Business number.',
          'Both individuals and businesses can use WhatsApp Business API.',
        ]}
        warnings={[
          'WhatsApp Business API requires Meta Business verification — setup takes 1-3 business days.',
          'WhatsApp has strict message templates. Non-template messages can only be sent within 24 hours of a user reply.',
        ]}
      >
        <StepGroup
          title="Step 1 — Choose Your WhatsApp Setup"
          steps={[
            <>
              <strong>Option A — WhatsApp Business API</strong> (recommended for businesses)
              <br />
              Official, scalable, supports rich media and templates.
            </>,
            <>
              <strong>Option B — WhatsApp Web via Camoufox</strong> (unofficial, faster setup)
              <br />
              Uses session cookies. Simpler to set up but less reliable for high volume.
            </>,
            <>
              For most ClawOps users: start with <strong>Option A (Business API)</strong> for reliability
              and compliance, especially if you handle customer conversations at scale.
            </>,
          ]}
        />

        <StepGroup
          title="Step 2 — WhatsApp Business API Setup"
          defaultOpen={true}
          steps={[
            <>
              Sign up at{' '}
              <span style={{ color: 'var(--accent-secondary)' }}>business.whatsapp.com</span> and
              create a WhatsApp Business account.
            </>,
            <>
              In the Meta Developer Console, create a new app and select{' '}
              <strong>WhatsApp</strong> as the product.
            </>,
            <>
              Get your <strong>Phone Number ID</strong> (from the WhatsApp Business API setup page)
              and your <strong>Permanent Access Token</strong> (from Meta Business Suite).
            </>,
            <>
              Add to OpenClaw:
              <div style={{
                marginTop: 8,
                padding: '10px 14px',
                background: 'var(--code-bg)',
                border: '1px solid var(--separator)',
                borderRadius: 'var(--radius-sm)',
                fontFamily: 'var(--font-mono)',
                fontSize: 12,
                color: 'var(--accent-secondary)',
              }}>
                openclaw channels add whatsapp --token ACCESS_TOKEN --phone-id PHONE_ID
              </div>
            </>,
          ]}
        />

        <StepGroup
          title="Step 3 — Verify & Go Live"
          defaultOpen={false}
          steps={[
            <>
              In Meta Developer Console, add your business phone number and verify it.
            </>,
            <>
              Set up message templates in WhatsApp Business Manager for outbound messages
              (required by Meta policy for business accounts).
            </>,
            <>
              Send a test message via the API to confirm the webhook is working end-to-end.
            </>,
          ]}
        />
      </ChannelCard>

      {/* ── Discord ── */}
      <ChannelCard
        icon={Hash}
        iconColor="#5865F2"
        title="Discord"
        badge="Community"
        badgeColor="purple"
        description="Add your AI agent as a Discord bot to respond to slash commands, answer questions in channels, and moderate conversations."
        tips={[
          'Discord bots can respond to slash commands (/) — very natural UX for community users.',
          'Set up channel permissions so the bot only reads messages in designated channels.',
          'Use Discord webhooks to post AI responses to channels automatically.',
        ]}
        warnings={[
          'Discord bots must be invited to servers with the correct OAuth2 scopes — missing permissions will cause silent failures.',
          'Discord has rate limits on message creation (10-50 per second). Design your agent with this in mind.',
        ]}
      >
        <StepGroup
          title="Step 1 — Create a Discord Application"
          steps={[
            <>
              Go to{' '}
              <span style={{ color: 'var(--accent-secondary)' }}>discord.com/developers/applications</span>{' '}
              and click <strong>New Application</strong>. Give it a name (e.g., "ClawOps AI Bot").
            </>,
            <>
              In the left sidebar, go to <strong>Bot</strong> and click <strong>Add Bot</strong>.
            </>,
            <>
              Under the <strong>Token</strong> section, click <strong>Reset Token</strong> and copy
              the bot token. <strong>Store it securely</strong> — it will only be shown once.
            </>,
          ]}
        />

        <StepGroup
          title="Step 2 — Add Bot to Your Server"
          defaultOpen={true}
          steps={[
            <>
              In the Discord Developer Portal, go to <strong>OAuth2 → URL Generator</strong>.
            </>,
            <>
              Select scopes: <Code>bot</Code> and <Code>applications.commands</Code>.
            </>,
            <>
              Select permissions: at minimum <Code>Send Messages</Code> and{' '}
              <Code>Read Message History</Code>.
            </>,
            <>
              Copy the generated OAuth2 URL and open it in a new tab. Select your server
              and authorize the bot.
            </>,
          ]}
        />

        <StepGroup
          title="Step 3 — Connect to OpenClaw"
          defaultOpen={false}
          steps={[
            <>
              Run the OpenClaw CLI command:
              <div style={{
                marginTop: 8,
                padding: '10px 14px',
                background: 'var(--code-bg)',
                border: '1px solid var(--separator)',
                borderRadius: 'var(--radius-sm)',
                fontFamily: 'var(--font-mono)',
                fontSize: 12,
                color: 'var(--accent-secondary)',
              }}>
                openclaw channels add discord --token YOUR_BOT_TOKEN --guild YOUR_GUILD_ID
              </div>
            </>,
            <>
              Find your <strong>Guild ID</strong> by enabling Developer Mode in Discord (User Settings
              → Advanced → Developer Mode), then right-click your server name and select{' '}
              <strong>Copy Server ID</strong>.
            </>,
            <>
              Test by mentioning the bot in any channel. It should respond to your configured
              prefix or slash commands.
            </>,
          ]}
        />
      </ChannelCard>

      {/* ── Generic API Keys ── */}
      <div style={{
        background: 'var(--material-regular)',
        border: '1px solid var(--separator)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        marginBottom: 32,
      }}>
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid var(--separator)',
          display: 'flex',
          alignItems: 'flex-start',
          gap: 16,
        }}>
          <div style={{
            width: 44,
            height: 44,
            borderRadius: 10,
            background: 'var(--accent-fill)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <Key size={20} color="var(--accent)" />
          </div>
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 4px' }}>
              API Key Setup
            </h2>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6 }}>
              Connect any external API to extend your AI agent's capabilities. Paste API keys in the
              dashboard and your agent can call those services directly.
            </p>
          </div>
        </div>

        <div style={{ padding: '20px 24px' }}>
          <div style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.07em',
            textTransform: 'uppercase',
            color: 'var(--text-quaternary)',
            marginBottom: 14,
          }}>
            Step-by-Step Guide
          </div>

          <StepGroup
            title="Step 1 — Get Your API Credentials"
            steps={[
              <>
                Go to the provider's developer portal and sign in. Each provider below has its
                own process for generating API keys.
              </>,
              <>
                Look for <strong>API Keys</strong>, <strong>Credentials</strong>, or{' '}
                <strong>OAuth</strong> in the settings or sidebar.
              </>,
              <>
                Generate a new key. Some providers let you set expiry dates, IP allowlists, or
                scope restrictions — set these according to your needs.
              </>,
            ]}
          />

          <StepGroup
            title="Step 2 — Paste Key into ClawOps Dashboard"
            defaultOpen={true}
            steps={[
              <>
                Go to <strong>Settings → API Keys</strong> in the ClawOps dashboard.
              </>,
              <>
                Select the provider from the list (or choose "Custom API" for any REST API).
              </>,
              <>
                Paste your API key and give it a label (e.g., "Production - OpenAI", "Test - DeepSeek").
              </>,
              <>
                Click <strong>Save</strong>. The key is encrypted and stored securely — never
                logged or exposed to logs.
              </>,
            ]}
          />

          <StepGroup
            title="Step 3 — Use in Your AI Agent"
            defaultOpen={false}
            steps={[
              <>
                Your AI agent automatically has access to all saved API keys within its session.
                Just describe what you want in plain English:
                <div style={{
                  marginTop: 8,
                  padding: '10px 14px',
                  background: 'var(--material-thin)',
                  border: '1px solid var(--separator)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: 12,
                  color: 'var(--text-secondary)',
                }}>
                  "Use our OpenAI key to analyze this email and suggest a reply"
                </div>
              </>,
              <>
                For webhook-based triggers (e.g., n8n workflows), copy the webhook URL from the
                target service and paste it into your agent's task configuration.
              </>,
            ]}
          />

          <div style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.07em',
            textTransform: 'uppercase',
            color: 'var(--text-quaternary)',
            marginTop: 20,
            marginBottom: 12,
          }}>
            Supported Providers
          </div>
          <ApiProviderGrid />
        </div>

        <div style={{ padding: '0 24px 20px' }}>
          <div style={{ display: 'flex', gap: 10, padding: '10px 14px', background: 'rgba(255,179,64,0.08)', border: '1px solid rgba(255,179,64,0.2)', borderRadius: 'var(--radius-sm)', fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            <AlertTriangle size={13} style={{ color: '#ffb340', flexShrink: 0, marginTop: 1 }} />
            <span>
              <strong>Security:</strong> API keys are stored encrypted and never included in logs.
              Rotate keys regularly. If a key is compromised, delete it immediately from the dashboard
              and generate a new one from the provider.
            </span>
          </div>
        </div>
      </div>

      <div className="doc-divider" />

      {/* FAQ */}
      <div className="doc-section">
        <div className="doc-section-title">FAQ</div>
        {[
          {
            q: 'Can I connect multiple channels at the same time?',
            a: 'Yes. Telegram, WhatsApp, and Discord can all be connected simultaneously. Your AI agent will respond on all active channels independently.',
          },
          {
            q: 'Which channel is best for my business?',
            a: 'Telegram is the easiest to set up and most reliable. Discord is ideal for community-focused products. WhatsApp is best for B2C businesses with existing customer WhatsApp numbers.',
          },
          {
            q: 'How do I disconnect a channel?',
            a: 'Go to Settings → Channels → select the channel → click Disconnect. This immediately stops all incoming messages from that platform.',
          },
          {
            q: 'Are messages stored?',
            a: 'Message history is stored temporarily for context during your session. Consult the privacy policy for long-term storage details.',
          },
          {
            q: 'Can I use webhooks instead of persistent connections?',
            a: 'Yes. Both Discord and Telegram support webhook-based bot modes. This can reduce resource usage for lower-volume bots.',
          },
        ].map(({ q, a }) => (
          <div key={q} style={{ marginBottom: 10 }}>
            <div style={{
              padding: '12px 16px',
              background: 'var(--material-thin)',
              border: '1px solid var(--separator)',
              borderRadius: 'var(--radius-sm)',
              fontSize: 13,
              fontWeight: 600,
              color: 'var(--text-primary)',
            }}>
              {q}
            </div>
            <div style={{
              padding: '10px 16px 12px',
              background: 'var(--material-regular)',
              border: '1px solid var(--separator)',
              borderTop: 'none',
              borderRadius: '0 0 var(--radius-sm) var(--radius-sm)',
              fontSize: 13,
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
            }}>
              {a}
            </div>
          </div>
        ))}
      </div>
    </DocsLayout>
  );
}

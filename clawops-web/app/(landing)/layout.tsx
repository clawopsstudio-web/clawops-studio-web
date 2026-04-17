import type { Metadata } from "next";
import SmoothScroll from "@/components/ui/SmoothScroll";
import GlobalStarField from "@/components/ui/GlobalStarField";

export const metadata: Metadata = {
  title: {
    default: "ClawOps — The Agentic OS for Businesses That Scale",
    template: "%s | ClawOps",
  },
  description:
    "The autonomous AI OS for businesses that want to scale without hiring. Powered by OpenClaw. Sales, Support, Research, and Ops agents that run 24/7 — autonomously. Manage from Telegram, WhatsApp, or Slack. Flat monthly pricing from $49/mo.",
  keywords: "agentic OS, autonomous AI, AI workforce, scale without hiring, business AI automation, OpenClaw business, AI agents run 24/7, ClawOps, autonomous business, AI that runs itself",
  metadataBase: new URL('https://clawops.studio'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/',
    },
  },
  openGraph: {
    title: "ClawOps — The Agentic OS for Businesses That Scale",
    description:
      "The autonomous AI OS for businesses. Powered by OpenClaw. Agents run your Sales, Support, and Ops 24/7 — without you prompting them. Scale without hiring.",
    type: "website",
    locale: "en_US",
    siteName: "ClawOps",
  },
  twitter: {
    card: "summary_large_image",
    title: "ClawOps — The Agentic OS for Businesses That Scale",
    description:
      "Autonomous AI agents that run your business 24/7. Powered by OpenClaw. Scale without hiring.",
    creator: "@ClawOps",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🦷</text></svg>",
  },
};

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      <GlobalStarField />
      {children}
    </SmoothScroll>
  );
}

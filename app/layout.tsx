import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/ui/SmoothScroll";
import GlobalStarField from "@/components/ui/GlobalStarField";

export const metadata: Metadata = {
  title: {
    default: "ClawOps — The AI Operating System for Your VPS",
    template: "%s | ClawOps — AI OS for VPS",
  },
  description:
    "The AI OS for your VPS. Deploy unlimited AI agents. Pay once for infrastructure — no per-token bills, no API costs. Starting at $49/month.",
  keywords: "AI operating system, AI agents VPS, local AI, no API costs, AI infrastructure, self-hosted AI, Llama VPS, ClawOps, AI OS",
  metadataBase: new URL('https://clawops-web.vercel.app'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/',
    },
  },
  openGraph: {
    title: "ClawOps — The AI Operating System for Your VPS",
    description:
      "Deploy unlimited AI agents on your VPS. No per-token billing. No API costs. One flat infrastructure fee.",
    type: "website",
    locale: "en_US",
    siteName: "ClawOps",
  },
  twitter: {
    card: "summary_large_image",
    title: "ClawOps — The AI Operating System for Your VPS",
    description:
      "Deploy unlimited AI agents on your VPS. No per-token billing. No API costs.",
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

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'ClawOps — AI Operating System',
  description: 'The AI Operating System for your VPS. Deploy unlimited AI agents. Pay once for infrastructure.',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Self-hosted VPS (Ampere ARM)',
  offers: {
    '@type': 'AggregateOffer',
    lowPrice: '49',
    highPrice: '499',
    priceCurrency: 'USD',
    offerCount: '3',
  },
  provider: {
    '@type': 'Organization',
    name: 'ClawOps Studio',
    url: 'https://clawops-web.vercel.app',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#04040c] text-white antialiased overflow-x-hidden">
        {/* Fixed star field persists across all pages/sections */}
        <GlobalStarField />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}

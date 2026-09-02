import type { Metadata, Viewport } from "next";
import "./globals.css";

const SITE_URL = "https://blastsky.vercel.app";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#03030b",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "BlastSky – Free Online Fireworks Simulator",
    template: "%s | BlastSky",
  },

  description:
    "BlastSky is a free online fireworks simulator. Launch colorful virtual fireworks, enjoy automatic fireworks shows, realistic sounds, and an interactive night sky on desktop or mobile.",

  keywords: [
    "online fireworks simulator",
    "free fireworks simulator",
    "virtual fireworks",
    "fireworks simulator online",
    "virtual fireworks show",
    "online fireworks show",
    "interactive fireworks",
    "fireworks animation",
    "realistic fireworks",
    "fireworks sound effects",
    "automatic fireworks show",
  ],

  authors: [
    {
      name: "BlastSky",
      url: SITE_URL,
    },
  ],

  creator: "BlastSky",
  publisher: "BlastSky",

  applicationName: "BlastSky",

  category: "entertainment",

  classification: "Online Fireworks Simulator",

  alternates: {
    canonical: SITE_URL,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "BlastSky – Free Online Fireworks Simulator",
    description:
      "Create your own virtual fireworks show with BlastSky. Launch colorful fireworks manually or enjoy an automatic show with realistic sounds and interactive effects.",
    siteName: "BlastSky",
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: "BlastSky – Free Online Fireworks Simulator",
    description:
      "Launch colorful virtual fireworks or enjoy an automatic fireworks show with BlastSky.",
  },

  icons: {
    icon: "/favicon.ico",
  },

  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
    >
      <body>{children}</body>
    </html>
  );
}
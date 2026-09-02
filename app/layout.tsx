import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = "https://blastsky.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "BlastSky – Free Online Fireworks Simulator",
    template: "%s | BlastSky",
  },

  description:
    "Experience a free online fireworks simulator with colorful interactive fireworks, automatic shows, realistic explosion sounds, and fullscreen mode.",

  keywords: [
    "online fireworks simulator",
    "virtual fireworks",
    "fireworks show online",
    "interactive fireworks",
    "free fireworks simulator",
    "fireworks animation",
    "realistic fireworks",
  ],

  authors: [{ name: "BlastSky" }],
  creator: "BlastSky",
  publisher: "BlastSky",

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
      "Create your own virtual fireworks show with BlastSky. Launch colorful fireworks manually or enjoy an automatic show with realistic explosion sounds.",
    siteName: "BlastSky",
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: "BlastSky – Free Online Fireworks Simulator",
    description:
      "Experience interactive virtual fireworks with colorful explosions and realistic fireworks sounds.",
  },

  category: "entertainment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
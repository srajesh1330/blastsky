import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://blastsky.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "BlastSky - Interactive Fireworks Experience",
    template: "%s | BlastSky",
  },

  description:
    "Experience interactive virtual fireworks with BlastSky. Launch colorful fireworks manually or enjoy an automatic fireworks show with realistic effects and sounds.",

  keywords: [
    "fireworks",
    "virtual fireworks",
    "online fireworks",
    "fireworks simulator",
    "fireworks show",
    "interactive fireworks",
    "BlastSky",
  ],

  authors: [
    {
      name: "BlastSky",
    },
  ],

  creator: "BlastSky",
  publisher: "BlastSky",

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

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    url: siteUrl,
    title: "BlastSky - Interactive Fireworks Experience",
    description:
      "Launch virtual fireworks manually or enjoy an automatic fireworks show with colorful effects and realistic sounds.",
    siteName: "BlastSky",
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: "BlastSky - Interactive Fireworks Experience",
    description:
      "Create your own spectacular virtual fireworks experience with BlastSky.",
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
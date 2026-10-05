import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";

const SITE = "https://blastsky.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: { default: "BlastSky – Realistic Fireworks Show Online", template: "%s | BlastSky" },
  description:
    "Watch a free realistic fireworks show in your browser with real boom sounds. Tap the sky to launch your own shells or start the finale.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE,
    siteName: "BlastSky",
    title: "BlastSky – Realistic Fireworks Show Online",
    description: "A free, realistic fireworks show with sound. Tap to launch your own.",
  },
};

export const viewport: Viewport = { themeColor: "#01020a", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
        {client ? (
          <Script
            async
            strategy="afterInteractive"
            crossOrigin="anonymous"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`}
          />
        ) : null}
      </body>
    </html>
  );
}

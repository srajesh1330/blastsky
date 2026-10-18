import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import Consent from "../components/Consent";

const SITE = "https://blastsky.vercel.app";

// Google Analytics 4 measurement ID (can be overridden with NEXT_PUBLIC_GA_ID).
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-4YDBQ7GB5Z";

// Lets Google AdSense verify ownership through the page head (set NEXT_PUBLIC_ADSENSE_CLIENT in Vercel).
const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  other: ADSENSE_CLIENT ? { "google-adsense-account": ADSENSE_CLIENT } : undefined,
  title: { default: "Fireworks Simulator Online Free – Virtual Fireworks | BlastSky", template: "%s | BlastSky" },
  description:
    "BlastSky is a free online fireworks simulator. Watch a realistic virtual fireworks display with booming sound, tap the sky to launch your own shells, or start a countdown. Works on phones and computers, no download.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE,
    siteName: "BlastSky",
    title: "Fireworks Simulator Online Free – Virtual Fireworks | BlastSky",
    description: "A free interactive fireworks simulator with realistic virtual fireworks and sound. Tap to launch your own.",
  },
};

export const viewport: Viewport = { themeColor: "#01020a", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  // Only count real visits: not local testing and not Vercel preview deployments.
  const gaOn =
    process.env.NODE_ENV === "production" &&
    (process.env.VERCEL_ENV ? process.env.VERCEL_ENV === "production" : true);
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {gaOn ? (
          <>
            <Script id="ga-init" strategy="beforeInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});gtag('js',new Date());gtag('config','${GA_ID}');`}
            </Script>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          </>
        ) : null}
        {children}
        <Consent />
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

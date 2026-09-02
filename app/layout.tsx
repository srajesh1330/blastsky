import type { Metadata, Viewport } from "next";
import Script from "next/script";
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
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        {children}

        {/* BlastSky Structured SEO Data */}
        <Script
          id="blastsky-structured-data"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "BlastSky",
            url: SITE_URL,
            description:
              "BlastSky is a free online fireworks simulator where users can create interactive virtual fireworks displays with manual launching or automatic shows.",
            applicationCategory: "EntertainmentApplication",
            operatingSystem: "Any",
            browserRequirements: "Requires a modern web browser",
            isAccessibleForFree: true,
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            featureList: [
              "Free online fireworks simulator",
              "Manual fireworks launching",
              "Automatic fireworks shows",
              "Virtual fireworks animations",
              "Fireworks sound effects",
              "Mobile and desktop support",
            ],
          })}
        </Script>

        {/* Google Analytics 4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-4YDBQ7GB5Z"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-4YDBQ7GB5Z');
          `}
        </Script>
      </body>
    </html>
  );
}
import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://blastsky.vercel.app";

export const metadata: Metadata = {
  title: "New Year Fireworks – Free Online Fireworks Show",
  description:
    "Celebrate New Year with a free online fireworks show on BlastSky. Launch colorful virtual fireworks in your browser or enjoy an automatic fireworks experience on desktop and mobile.",
  keywords: [
    "new year fireworks",
    "new year fireworks online",
    "virtual new year fireworks",
    "free new year fireworks",
    "online fireworks show",
    "new year fireworks simulator",
    "virtual fireworks show",
    "fireworks simulator",
  ],
  alternates: {
    canonical: `${SITE_URL}/fireworks/new-year`,
  },
  openGraph: {
    title: "New Year Fireworks – Free Online Fireworks Show",
    description:
      "Celebrate New Year with a free virtual fireworks experience from BlastSky. Launch fireworks yourself or enjoy an automatic show.",
    url: `${SITE_URL}/fireworks/new-year`,
    type: "website",
    siteName: "BlastSky",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "New Year Fireworks – BlastSky",
    description:
      "Enjoy a free virtual New Year fireworks show directly in your browser.",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "New Year Fireworks",
  url: `${SITE_URL}/fireworks/new-year`,
  description:
    "A free online New Year fireworks experience where visitors can launch virtual fireworks or enjoy an automatic fireworks show.",
  isPartOf: {
    "@type": "WebSite",
    name: "BlastSky",
    url: SITE_URL,
  },
  mainEntity: {
    "@type": "WebApplication",
    name: "BlastSky Fireworks Simulator",
    url: `${SITE_URL}/fireworks`,
    applicationCategory: "EntertainmentApplication",
    operatingSystem: "Any",
    isAccessibleForFree: true,
  },
};

const faqs = [
  {
    question: "Can I watch New Year fireworks online for free?",
    answer:
      "Yes. BlastSky provides a free virtual fireworks experience that works directly in a modern web browser. You can launch fireworks manually or choose an automatic show.",
  },
  {
    question: "How do I start the New Year fireworks show?",
    answer:
      "Select the Start Fireworks button on this page. It will take you to the BlastSky fireworks simulator where you can choose your preferred mode and begin the show.",
  },
  {
    question: "Can I launch the fireworks myself?",
    answer:
      "Yes. BlastSky includes a manual mode that lets you interact with the virtual night sky and launch fireworks yourself.",
  },
  {
    question: "Does BlastSky have an automatic fireworks show?",
    answer:
      "Yes. The simulator includes an automatic show mode with selectable show durations, allowing you to sit back and enjoy the virtual display.",
  },
  {
    question: "Does the New Year fireworks simulator work on mobile?",
    answer:
      "BlastSky is designed to work on modern desktop and mobile browsers. Performance can vary depending on your device and browser.",
  },
  {
    question: "Do I need to install an app?",
    answer:
      "No. BlastSky is browser-based, so you can open the website and start the virtual fireworks experience without installing a separate application.",
  },
];

export default function NewYearFireworksPage() {
  return (
    <main className="min-h-screen bg-[#02040b] text-white">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-[#02040b]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <Link href="/" className="flex items-center gap-3">
            <span className="text-3xl">🎆</span>

            <span className="text-xl font-black tracking-tight">
              BlastSky
            </span>
          </Link>

          <Link
            href="/fireworks"
            className="rounded-full bg-white px-5 py-2.5 text-xs font-black text-black transition hover:bg-white/90"
          >
            Launch Fireworks
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden px-5 py-20 sm:px-8 sm:py-28">
        <div className="pointer-events-none absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-purple-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-5xl text-center">
          <div className="text-6xl sm:text-8xl">🎆</div>

          <p className="mt-8 text-xs font-black uppercase tracking-[0.3em] text-white/30">
            New Year Celebration
          </p>

          <h1 className="mx-auto mt-5 max-w-4xl text-4xl font-black tracking-tight sm:text-6xl lg:text-7xl">
            New Year Fireworks
            <span className="block text-white/45">
              Light up the virtual sky
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-sm leading-7 text-white/45 sm:text-base">
            Celebrate the New Year with a free online fireworks experience.
            Launch colorful virtual fireworks yourself or sit back and enjoy
            an automatic fireworks show directly in your browser.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/fireworks"
              className="inline-flex items-center justify-center rounded-2xl bg-white px-7 py-4 text-sm font-black text-black shadow-2xl transition hover:scale-[1.02] hover:bg-white/90 active:scale-[0.98]"
            >
              🎆 Start New Year Fireworks
            </Link>

            <Link
              href="#about"
              className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] px-7 py-4 text-sm font-bold text-white transition hover:bg-white/[0.08]"
            >
              Learn More
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3 text-xs font-semibold text-white/30">
            <span className="rounded-full border border-white/10 px-4 py-2">
              Free to use
            </span>

            <span className="rounded-full border border-white/10 px-4 py-2">
              No app required
            </span>

            <span className="rounded-full border border-white/10 px-4 py-2">
              Desktop & mobile
            </span>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="px-5 pb-16 sm:px-8 sm:pb-24">
        <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-3">
          <FeatureCard
            icon="🎆"
            title="Virtual Fireworks"
            text="Enjoy colorful fireworks animations without needing a physical fireworks display."
          />

          <FeatureCard
            icon="✨"
            title="Interactive Show"
            text="Launch fireworks yourself and create your own virtual New Year celebration."
          />

          <FeatureCard
            icon="🔊"
            title="Immersive Experience"
            text="Enjoy an interactive night sky with visual effects and fireworks sound effects."
          />
        </div>
      </section>

      {/* About */}
      <section
        id="about"
        className="border-y border-white/5 bg-white/[0.015] px-5 py-16 sm:px-8 sm:py-24"
      >
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-white/25">
            About the experience
          </p>

          <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
            Celebrate New Year with virtual fireworks
          </h2>

          <div className="mt-7 space-y-5 text-sm leading-7 text-white/40 sm:text-base">
            <p>
              New Year celebrations are often marked by bright lights,
              countdowns, and spectacular fireworks. BlastSky brings part of
              that experience to your screen with an interactive virtual
              fireworks simulator.
            </p>

            <p>
              Instead of downloading an application, you can open BlastSky in
              a modern browser and create a fireworks display directly on the
              web. Choose manual mode when you want to control the action, or
              use automatic mode when you simply want to watch the virtual
              show.
            </p>

            <p>
              The experience is designed to be simple enough for a quick
              celebration while still giving you an interactive way to enjoy
              virtual fireworks on New Year's Eve or anytime you want a
              festive night-sky experience.
            </p>
          </div>
        </div>
      </section>

      {/* Modes */}
      <section className="px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-white/25">
              Choose your experience
            </p>

            <h2 className="mt-4 text-3xl font-black sm:text-4xl">
              Manual or automatic fireworks
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/35">
              BlastSky gives you two simple ways to enjoy a virtual New Year
              fireworks display.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <InfoCard
              icon="🖱️"
              title="Manual Fireworks"
              text="Take control of the celebration. Launch individual fireworks and interact with the virtual sky at your own pace."
              points={[
                "Interactive launching",
                "Create your own sequence",
                "Control the timing yourself",
              ]}
            />

            <InfoCard
              icon="🤖"
              title="Automatic Fireworks Show"
              text="Prefer to watch? Start an automatic show and let BlastSky create a continuous virtual fireworks experience."
              points={[
                "Sit back and watch",
                "Choose a show duration",
                "Great for celebrations",
              ]}
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-y border-white/5 bg-white/[0.015] px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-white/25">
              How it works
            </p>

            <h2 className="mt-4 text-3xl font-black sm:text-4xl">
              Start your New Year fireworks in seconds
            </h2>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <StepCard
              number="01"
              title="Open BlastSky"
              text="Open the free fireworks simulator in your browser."
            />

            <StepCard
              number="02"
              title="Choose a mode"
              text="Select manual fireworks or an automatic fireworks show."
            />

            <StepCard
              number="03"
              title="Start the show"
              text="Launch your virtual fireworks and watch the sky come alive."
            />

            <StepCard
              number="04"
              title="Enjoy the celebration"
              text="Relax, interact, and enjoy your virtual New Year fireworks."
            />
          </div>
        </div>
      </section>

      {/* Why Use */}
      <section className="px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-white/25">
            Why use BlastSky?
          </p>

          <h2 className="mt-4 text-3xl font-black sm:text-4xl">
            A simple virtual alternative for New Year celebrations
          </h2>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <ReasonCard
              icon="🌐"
              title="Works in your browser"
              text="No separate application is required. Open BlastSky and start the experience online."
            />

            <ReasonCard
              icon="💻"
              title="Desktop friendly"
              text="Enjoy the larger night-sky experience on a desktop or laptop."
            />

            <ReasonCard
              icon="📱"
              title="Mobile friendly"
              text="The experience is designed to work across modern mobile browsers too."
            />

            <ReasonCard
              icon="🎉"
              title="Made for celebrations"
              text="Use the virtual fireworks experience for New Year, parties, countdowns, and other special moments."
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-y border-white/5 bg-white/[0.015] px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-white/25">
              Frequently asked questions
            </p>

            <h2 className="mt-4 text-3xl font-black sm:text-4xl">
              New Year Fireworks FAQ
            </h2>
          </div>

          <div className="mt-10 space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-white/10 bg-black/30 p-5"
              >
                <summary className="cursor-pointer list-none pr-6 text-sm font-bold text-white marker:hidden">
                  <span className="flex items-center justify-between gap-5">
                    {faq.question}
                    <span className="text-white/30 transition group-open:rotate-45">
                      +
                    </span>
                  </span>
                </summary>

                <p className="mt-4 text-sm leading-7 text-white/40">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-center backdrop-blur-xl sm:p-14">
          <div className="text-5xl">🎆</div>

          <p className="mt-6 text-xs font-black uppercase tracking-[0.25em] text-white/25">
            Start the celebration
          </p>

          <h2 className="mt-4 text-3xl font-black sm:text-4xl">
            Ready for your New Year fireworks?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/35">
            Open the BlastSky simulator and create your own virtual fireworks
            experience.
          </p>

          <Link
            href="/fireworks"
            className="mt-8 inline-flex rounded-2xl bg-white px-8 py-4 text-sm font-black text-black shadow-2xl transition hover:scale-[1.02] hover:bg-white/90 active:scale-[0.98]"
          >
            🎆 Start New Year Fireworks
          </Link>

          <p className="mt-5 text-xs text-white/20">
            Free online experience • No app installation required
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 px-5 py-10 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/20">
            © {new Date().getFullYear()} BlastSky. All rights reserved.
          </p>

          <nav className="flex flex-wrap gap-5 text-xs font-semibold text-white/35">
            <Link
              href="/"
              className="transition hover:text-white"
            >
              Home
            </Link>

            <Link
              href="/fireworks"
              className="transition hover:text-white"
            >
              Fireworks
            </Link>

            <Link
              href="/about"
              className="transition hover:text-white"
            >
              About
            </Link>

            <Link
              href="/contact"
              className="transition hover:text-white"
            >
              Contact
            </Link>

            <Link
              href="/privacy"
              className="transition hover:text-white"
            >
              Privacy
            </Link>

            <Link
              href="/terms"
              className="transition hover:text-white"
            >
              Terms
            </Link>
          </nav>
        </div>
      </footer>
    </main>
  );
}

function FeatureCard({
  icon,
  title,
  text,
}: {
  icon: string;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-black/30 p-7 backdrop-blur-xl">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-2xl">
        {icon}
      </div>

      <h3 className="mt-6 text-lg font-black">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-6 text-white/35">
        {text}
      </p>
    </div>
  );
}

function InfoCard({
  icon,
  title,
  text,
  points,
}: {
  icon: string;
  title: string;
  text: string;
  points: string[];
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-black/30 p-7 backdrop-blur-xl sm:p-9">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-2xl">
        {icon}
      </div>

      <h3 className="mt-6 text-xl font-black">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-7 text-white/35">
        {text}
      </p>

      <ul className="mt-6 space-y-3">
        {points.map((point) => (
          <li
            key={point}
            className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/50"
          >
            ✓ {point}
          </li>
        ))}
      </ul>
    </div>
  );
}

function StepCard({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
      <p className="text-xs font-black tracking-[0.2em] text-white/20">
        {number}
      </p>

      <h3 className="mt-5 text-base font-black">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-6 text-white/35">
        {text}
      </p>
    </div>
  );
}

function ReasonCard({
  icon,
  title,
  text,
}: {
  icon: string;
  title: string;
  text: string;
}) {
  return (
    <div className="flex gap-4 rounded-2xl border border-white/10 bg-black/30 p-5">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-lg">
        {icon}
      </div>

      <div>
        <h3 className="text-sm font-black">
          {title}
        </h3>

        <p className="mt-2 text-sm leading-6 text-white/35">
          {text}
        </p>
      </div>
    </div>
  );
}
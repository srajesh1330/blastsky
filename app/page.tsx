"use client";

import { useState } from "react";
import Link from "next/link";

import FireworksCanvas, {
  unlockFireworksAudio,
  type FireworksMode,
} from "./fireworks/FireworksCanvas";

const DURATIONS = [5, 10, 15, 30] as const;

export default function HomePage() {
  const [active, setActive] = useState(false);
  const [mode, setMode] = useState<FireworksMode>("manual");
  const [duration, setDuration] = useState<number>(5);
  const [starting, setStarting] = useState(false);

  const startFireworks = async () => {
    if (starting) return;

    setStarting(true);

    try {
      await unlockFireworksAudio();
    } catch (error) {
      console.warn("Could not unlock fireworks audio:", error);
    } finally {
      setActive(true);
      setStarting(false);
    }
  };

  const handleFinished = () => {
    setActive(false);
  };

  if (active) {
    return (
      <FireworksCanvas
        active={active}
        duration={duration}
        mode={mode}
        onFinished={handleFinished}
      />
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#03030b] text-white">
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-[140px]" />

        <div className="absolute -right-40 top-[15%] h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[140px]" />

        <div className="absolute bottom-[-250px] left-[30%] h-[600px] w-[600px] rounded-full bg-fuchsia-600/10 blur-[150px]" />

        <div className="absolute left-[8%] top-[18%] h-1 w-1 rounded-full bg-white/60" />
        <div className="absolute left-[17%] top-[35%] h-1 w-1 rounded-full bg-white/30" />
        <div className="absolute left-[28%] top-[12%] h-1 w-1 rounded-full bg-white/50" />
        <div className="absolute left-[39%] top-[25%] h-1 w-1 rounded-full bg-white/30" />
        <div className="absolute left-[51%] top-[14%] h-1 w-1 rounded-full bg-white/50" />
        <div className="absolute left-[62%] top-[30%] h-1 w-1 rounded-full bg-white/30" />
        <div className="absolute left-[73%] top-[12%] h-1 w-1 rounded-full bg-white/50" />
        <div className="absolute left-[84%] top-[25%] h-1 w-1 rounded-full bg-white/30" />
        <div className="absolute left-[93%] top-[15%] h-1 w-1 rounded-full bg-white/50" />

        <div className="absolute left-[12%] top-[55%] h-1 w-1 rounded-full bg-white/20" />
        <div className="absolute left-[35%] top-[48%] h-1 w-1 rounded-full bg-white/20" />
        <div className="absolute left-[57%] top-[52%] h-1 w-1 rounded-full bg-white/20" />
        <div className="absolute left-[78%] top-[48%] h-1 w-1 rounded-full bg-white/20" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />
      </div>

      {/* =====================================================
          HEADER
      ====================================================== */}

      <header className="absolute inset-x-0 top-0 z-30">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
          <Link
            href="/"
            className="group flex items-center gap-3"
            aria-label="BlastSky Home"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] text-xl shadow-lg transition duration-300 group-hover:scale-105 group-hover:bg-white/[0.1]">
              🎆
            </span>

            <div>
              <div className="text-lg font-black tracking-tight">
                BlastSky
              </div>

              <div className="hidden text-[9px] font-bold uppercase tracking-[0.2em] text-white/30 sm:block">
                Virtual Fireworks
              </div>
            </div>
          </Link>

          <nav
            className="hidden items-center gap-7 md:flex"
            aria-label="Main navigation"
          >
            <Link
              href="/"
              className="text-sm font-semibold text-white transition hover:text-purple-300"
            >
              Home
            </Link>

            <Link
              href="/fireworks"
              className="text-sm font-semibold text-white/55 transition hover:text-white"
            >
              Fireworks
            </Link>

            <Link
              href="/about"
              className="text-sm font-semibold text-white/55 transition hover:text-white"
            >
              About
            </Link>

            <Link
              href="/privacy"
              className="text-sm font-semibold text-white/55 transition hover:text-white"
            >
              Privacy
            </Link>

            <Link
              href="/contact"
              className="text-sm font-semibold text-white/55 transition hover:text-white"
            >
              Contact
            </Link>
          </nav>

          <Link
            href="/fireworks"
            className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-xs font-black text-black shadow-[0_8px_30px_rgba(255,255,255,0.08)] transition duration-300 hover:-translate-y-0.5 hover:bg-white/90 sm:px-5"
          >
            <span>🎆</span>
            <span>Launch</span>
          </Link>
        </div>
      </header>

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative z-10 flex min-h-screen items-center px-5 pb-20 pt-32 sm:px-8">
        <div className="mx-auto w-full max-w-6xl text-center">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-white/45 backdrop-blur-xl">
            <span className="h-1.5 w-1.5 rounded-full bg-purple-400 shadow-[0_0_12px_rgba(192,132,252,0.9)]" />
            Free Online Fireworks Simulator
          </div>

          <div
            className="mb-6 text-6xl drop-shadow-[0_0_35px_rgba(168,85,247,0.35)] sm:text-8xl"
            aria-hidden="true"
          >
            🎆
          </div>

          <h1
            className="mx-auto max-w-5xl text-5xl font-black tracking-[-0.05em] sm:text-7xl md:text-8xl"
            id="hero-title"
          >
            Light up
            <br />
            <span className="bg-gradient-to-r from-purple-300 via-fuchsia-300 to-blue-300 bg-clip-text text-transparent">
              the virtual sky.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/45 sm:text-lg">
            Experience colorful virtual fireworks directly in your browser.
            Launch every explosion yourself or sit back and enjoy an
            automatic fireworks show with immersive effects and sound.
          </p>

          {/* MODE SELECTOR */}

          <div className="mx-auto mt-10 w-full max-w-xl">
            <div
              className="grid grid-cols-2 gap-2 rounded-2xl border border-white/10 bg-black/60 p-1.5 shadow-2xl backdrop-blur-xl"
              role="group"
              aria-label="Fireworks mode"
            >
              <button
                type="button"
                onClick={() => setMode("manual")}
                aria-pressed={mode === "manual"}
                className={[
                  "rounded-xl px-4 py-3.5 text-sm font-bold transition-all duration-300",
                  "focus:outline-none focus:ring-2 focus:ring-purple-400",
                  mode === "manual"
                    ? "bg-white text-black shadow-lg"
                    : "bg-transparent text-white/55 hover:bg-white/[0.06] hover:text-white",
                ].join(" ")}
              >
                👆 Manual Mode
              </button>

              <button
                type="button"
                onClick={() => setMode("auto")}
                aria-pressed={mode === "auto"}
                className={[
                  "rounded-xl px-4 py-3.5 text-sm font-bold transition-all duration-300",
                  "focus:outline-none focus:ring-2 focus:ring-purple-400",
                  mode === "auto"
                    ? "bg-white text-black shadow-lg"
                    : "bg-transparent text-white/55 hover:bg-white/[0.06] hover:text-white",
                ].join(" ")}
              >
                🎆 Auto Show
              </button>
            </div>

            {mode === "auto" && (
              <div className="mt-4 rounded-2xl border border-white/10 bg-black/55 p-4 backdrop-blur-xl">
                <p className="mb-3 text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
                  Show Duration
                </p>

                <div className="grid grid-cols-4 gap-2">
                  {DURATIONS.map((item) => {
                    const selected = duration === item;

                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setDuration(item)}
                        aria-pressed={selected}
                        className={[
                          "rounded-xl px-2 py-3 text-xs font-black transition-all duration-300",
                          "focus:outline-none focus:ring-2 focus:ring-purple-400",
                          selected
                            ? "bg-purple-500 text-white shadow-[0_0_25px_rgba(168,85,247,0.3)]"
                            : "border border-white/10 bg-white/[0.03] text-white/55 hover:bg-white/[0.08] hover:text-white",
                        ].join(" ")}
                      >
                        {item} min
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={startFireworks}
              disabled={starting}
              className="group relative mt-5 flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl bg-white px-7 py-4.5 text-base font-black text-black shadow-[0_15px_60px_rgba(255,255,255,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/90 active:translate-y-0 disabled:cursor-wait disabled:opacity-70"
            >
              <span className="relative z-10">
                {starting
                  ? "Starting..."
                  : mode === "manual"
                    ? "🎆 Launch Fireworks"
                    : "🎆 Start Auto Show"}
              </span>

              {!starting && (
                <span className="relative z-10 text-lg transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              )}

              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-purple-100/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </button>

            <p className="mt-4 text-[11px] text-white/25">
              {mode === "manual"
                ? "Click or tap anywhere after launching to create fireworks."
                : `Enjoy an automatic ${duration}-minute fireworks show.`}
            </p>
          </div>

          {/* FEATURES */}

          <section
            className="mx-auto mt-14 grid max-w-5xl gap-3 sm:grid-cols-3"
            aria-label="BlastSky features"
          >
            <FeatureCard
              icon="🎇"
              title="Realistic Effects"
              text="Colorful explosions, trails and multiple firework styles."
            />

            <FeatureCard
              icon="🔊"
              title="Immersive Sound"
              text="Enjoy optional fireworks explosion sound effects."
            />

            <FeatureCard
              icon="📱"
              title="Works Anywhere"
              text="Enjoy the experience on desktop, tablet or mobile."
            />
          </section>
        </div>
      </section>

      {/* =====================================================
          ABOUT BLASTSKY
      ====================================================== */}

      <section
        className="relative z-10 border-y border-white/[0.06] bg-white/[0.015] px-5 py-20 sm:px-8 sm:py-28"
        aria-labelledby="about-blastsky"
      >
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="text-xs font-black uppercase tracking-[0.24em] text-purple-300/60">
                About BlastSky
              </div>

              <h2
                id="about-blastsky"
                className="mt-4 text-3xl font-black tracking-tight sm:text-5xl"
              >
                Your browser.
                <br />
                Your fireworks.
              </h2>

              <div className="mt-6 h-1 w-14 rounded-full bg-gradient-to-r from-purple-400 to-blue-400" />
            </div>

            <div>
              <p className="text-sm leading-8 text-white/45 sm:text-base">
                BlastSky is a free online fireworks simulator that brings a
                colorful virtual fireworks experience directly to your web
                browser. You can launch fireworks yourself, experiment with
                different effects, or enjoy an automatic fireworks show.
              </p>

              <p className="mt-5 text-sm leading-8 text-white/45 sm:text-base">
                The experience is designed for modern desktop and mobile
                browsers, with interactive controls, colorful explosions,
                optional sound effects and fullscreen support.
              </p>

              <Link
                href="/about"
                className="mt-7 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-bold text-white transition hover:border-white/20 hover:bg-white/[0.08]"
              >
                Learn more
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          HOW IT WORKS
      ====================================================== */}

      <section
        className="relative z-10 px-5 py-20 sm:px-8 sm:py-28"
        aria-labelledby="how-it-works"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <div className="text-xs font-black uppercase tracking-[0.24em] text-purple-300/60">
              Simple to use
            </div>

            <h2
              id="how-it-works"
              className="mt-4 text-3xl font-black tracking-tight sm:text-5xl"
            >
              How BlastSky works
            </h2>

            <p className="mt-5 text-sm leading-7 text-white/40 sm:text-base">
              Start a virtual fireworks show in just a few simple steps.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StepCard
              number="01"
              icon="🎆"
              title="Choose a mode"
              text="Select Manual Mode if you want to launch fireworks yourself, or Auto Show for a hands-free display."
            />

            <StepCard
              number="02"
              icon="⏱️"
              title="Choose your duration"
              text="Automatic shows can run for 5, 10, 15 or 30 minutes."
            />

            <StepCard
              number="03"
              icon="👆"
              title="Launch fireworks"
              text="In Manual Mode, click or tap the virtual sky to create your own fireworks."
            />

            <StepCard
              number="04"
              icon="✨"
              title="Enjoy the show"
              text="Watch colorful explosions, trails and effects fill the virtual night sky."
            />
          </div>
        </div>
      </section>

      {/* =====================================================
          FEATURE DETAILS
      ====================================================== */}

      <section
        className="relative z-10 border-y border-white/[0.06] bg-white/[0.012] px-5 py-20 sm:px-8 sm:py-28"
        aria-labelledby="features-title"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <div className="text-xs font-black uppercase tracking-[0.24em] text-blue-300/60">
              Explore the experience
            </div>

            <h2
              id="features-title"
              className="mt-4 text-3xl font-black tracking-tight sm:text-5xl"
            >
              More ways to enjoy the sky.
            </h2>

            <p className="mt-5 text-sm leading-7 text-white/40 sm:text-base">
              BlastSky gives you control over the way your virtual fireworks
              experience looks and feels.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <DetailCard
              icon="🎨"
              title="Colors"
              text="Explore different colors and colorful combinations for your virtual fireworks display."
            />

            <DetailCard
              icon="💥"
              title="Firework Styles"
              text="Enjoy a variety of shapes and explosion patterns inspired by different fireworks effects."
            />

            <DetailCard
              icon="⚡"
              title="Intensity"
              text="Control the energy and scale of your virtual display for a calmer or more energetic experience."
            />

            <DetailCard
              icon="⛶"
              title="Fullscreen"
              text="Expand the experience and enjoy a larger virtual sky on supported devices."
            />
          </div>
        </div>
      </section>

      {/* =====================================================
          FIREWORKS STYLES
      ====================================================== */}

      <section
        className="relative z-10 px-5 py-20 sm:px-8 sm:py-28"
        aria-labelledby="fireworks-styles"
      >
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <div className="text-xs font-black uppercase tracking-[0.24em] text-fuchsia-300/60">
                Virtual fireworks
              </div>

              <h2
                id="fireworks-styles"
                className="mt-4 text-3xl font-black tracking-tight sm:text-5xl"
              >
                Explore different
                <br />
                fireworks styles.
              </h2>

              <p className="mt-6 text-sm leading-8 text-white/40 sm:text-base">
                BlastSky includes a variety of virtual fireworks effects,
                allowing you to create different looks across the night sky.
                Depending on the experience settings, you can enjoy patterns
                such as colorful bursts, rings, spirals, glittering effects
                and more.
              </p>

              <Link
                href="/fireworks"
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-black text-black transition hover:-translate-y-0.5 hover:bg-white/90"
              >
                Explore Fireworks
                <span>→</span>
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              <StyleCard icon="🎇" title="Burst" />
              <StyleCard icon="💫" title="Spiral" />
              <StyleCard icon="⭕" title="Ring" />
              <StyleCard icon="✨" title="Glitter" />
              <StyleCard icon="🌟" title="Star" />
              <StyleCard icon="🎆" title="Finale" />
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          WHY BLASTSKY
      ====================================================== */}

      <section
        className="relative z-10 border-y border-white/[0.06] bg-white/[0.015] px-5 py-20 sm:px-8 sm:py-28"
        aria-labelledby="why-blastsky"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <div className="text-xs font-black uppercase tracking-[0.24em] text-purple-300/60">
              Why BlastSky
            </div>

            <h2
              id="why-blastsky"
              className="mt-4 text-3xl font-black tracking-tight sm:text-5xl"
            >
              A simple way to enjoy virtual fireworks.
            </h2>

            <p className="mt-6 text-sm leading-8 text-white/40 sm:text-base">
              BlastSky provides an interactive fireworks experience without
              requiring a separate application or complicated setup. Open the
              website, choose your experience and enjoy the virtual sky.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            <InfoCard
              icon="🌐"
              title="Runs in your browser"
              text="Enjoy BlastSky directly from a modern web browser without installing desktop software."
            />

            <InfoCard
              icon="📱"
              title="Desktop and mobile"
              text="The experience is designed to work across phones, tablets and desktop screens."
            />

            <InfoCard
              icon="🎆"
              title="Interactive experience"
              text="Launch fireworks yourself or sit back and watch an automatic virtual fireworks show."
            />
          </div>
        </div>
      </section>

      {/* =====================================================
          FAQ
      ====================================================== */}

      <section
        className="relative z-10 px-5 py-20 sm:px-8 sm:py-28"
        aria-labelledby="faq-title"
      >
        <div className="mx-auto max-w-4xl">
          <div className="mx-auto max-w-2xl text-center">
            <div className="text-xs font-black uppercase tracking-[0.24em] text-blue-300/60">
              Frequently asked questions
            </div>

            <h2
              id="faq-title"
              className="mt-4 text-3xl font-black tracking-tight sm:text-5xl"
            >
              BlastSky FAQ
            </h2>

            <p className="mt-5 text-sm leading-7 text-white/40 sm:text-base">
              Quick answers about the online fireworks simulator.
            </p>
          </div>

          <div className="mt-12 space-y-3">
            <FaqItem
              question="Is BlastSky free to use?"
              answer="Yes. BlastSky is designed as a free online fireworks simulator that you can use directly in your browser."
            />

            <FaqItem
              question="Do I need to install anything?"
              answer="No. BlastSky runs directly in a modern web browser, so there is no separate application required."
            />

            <FaqItem
              question="Can I use BlastSky on my phone?"
              answer="Yes. BlastSky is designed to work on desktop, tablet and mobile devices with a modern browser."
            />

            <FaqItem
              question="Can I launch fireworks manually?"
              answer="Yes. Select Manual Mode and click or tap the virtual sky after starting the experience to launch fireworks."
            />

            <FaqItem
              question="Does BlastSky have an automatic fireworks show?"
              answer="Yes. Select Auto Show and choose a duration of 5, 10, 15 or 30 minutes."
            />

            <FaqItem
              question="Does BlastSky have fireworks sounds?"
              answer="Yes. The fireworks experience includes optional explosion sound effects. Your browser may require an interaction before audio can play."
            />

            <FaqItem
              question="Can I watch BlastSky in fullscreen?"
              answer="Yes. The fireworks experience includes fullscreen support on compatible browsers and devices."
            />
          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ====================================================== */}

      <section className="relative z-10 px-5 pb-24 pt-4 text-center sm:px-8 sm:pb-32">
        <div className="mx-auto max-w-3xl overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.035] px-6 py-14 shadow-2xl sm:px-12">
          <div className="text-5xl">🎆</div>

          <h2 className="mt-6 text-3xl font-black tracking-tight sm:text-5xl">
            Ready to light up the sky?
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/40 sm:text-base">
            Start your free virtual fireworks experience and create your own
            spectacular night sky.
          </p>

          <button
            type="button"
            onClick={startFireworks}
            disabled={starting}
            className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-4 text-sm font-black text-black shadow-[0_15px_60px_rgba(255,255,255,0.08)] transition hover:-translate-y-0.5 hover:bg-white/90 disabled:opacity-70"
          >
            {starting ? "Starting..." : "🎆 Launch BlastSky"}
            {!starting && <span>→</span>}
          </button>
        </div>
      </section>

      {/* =====================================================
          FOOTER
      ====================================================== */}

      <footer className="relative z-10 border-t border-white/[0.06] bg-black/20 px-5 py-10 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-7 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <span className="text-xl">🎆</span>

              <span className="font-black">BlastSky</span>
            </Link>

            <p className="mt-2 text-xs text-white/25">
              Free online virtual fireworks simulator.
            </p>
          </div>

          <nav
            className="flex flex-wrap gap-x-6 gap-y-3 text-xs font-semibold text-white/35"
            aria-label="Footer navigation"
          >
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>

            <Link href="/fireworks" className="transition hover:text-white">
              Fireworks
            </Link>

            <Link href="/about" className="transition hover:text-white">
              About
            </Link>

            <Link href="/privacy" className="transition hover:text-white">
              Privacy
            </Link>

            <Link href="/terms" className="transition hover:text-white">
              Terms
            </Link>

            <Link href="/contact" className="transition hover:text-white">
              Contact
            </Link>
          </nav>
        </div>

        <div className="mx-auto mt-8 max-w-7xl border-t border-white/[0.05] pt-6">
          <p className="text-center text-[11px] text-white/20 sm:text-left">
            © {new Date().getFullYear()} BlastSky. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}

/* =========================================================
   FEATURE CARD
========================================================= */

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
    <article className="group rounded-2xl border border-white/[0.08] bg-black/35 p-5 text-left backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-white/[0.15] hover:bg-white/[0.045]">
      <div className="text-2xl transition-transform duration-300 group-hover:scale-110">
        {icon}
      </div>

      <h2 className="mt-3 text-sm font-bold text-white">{title}</h2>

      <p className="mt-1 text-xs leading-5 text-white/35">{text}</p>
    </article>
  );
}

/* =========================================================
   DETAIL CARD
========================================================= */

function DetailCard({
  icon,
  title,
  text,
}: {
  icon: string;
  title: string;
  text: string;
}) {
  return (
    <article className="group rounded-3xl border border-white/[0.08] bg-white/[0.025] p-6 transition duration-300 hover:-translate-y-1 hover:border-purple-400/20 hover:bg-white/[0.045]">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.05] text-2xl transition duration-300 group-hover:scale-105">
        {icon}
      </div>

      <h3 className="mt-5 text-base font-black text-white">{title}</h3>

      <p className="mt-2 text-sm leading-7 text-white/35">{text}</p>
    </article>
  );
}

/* =========================================================
   STEP CARD
========================================================= */

function StepCard({
  number,
  icon,
  title,
  text,
}: {
  number: string;
  icon: string;
  title: string;
  text: string;
}) {
  return (
    <article className="rounded-3xl border border-white/[0.08] bg-white/[0.025] p-6">
      <div className="flex items-center justify-between">
        <span className="text-xs font-black tracking-[0.2em] text-white/20">
          {number}
        </span>

        <span className="text-2xl">{icon}</span>
      </div>

      <h3 className="mt-7 text-base font-black text-white">{title}</h3>

      <p className="mt-2 text-sm leading-7 text-white/35">{text}</p>
    </article>
  );
}

/* =========================================================
   STYLE CARD
========================================================= */

function StyleCard({
  icon,
  title,
}: {
  icon: string;
  title: string;
}) {
  return (
    <div className="flex min-h-[120px] flex-col items-center justify-center rounded-3xl border border-white/[0.08] bg-white/[0.025] text-center transition duration-300 hover:-translate-y-1 hover:border-purple-400/20 hover:bg-white/[0.05]">
      <div className="text-3xl">{icon}</div>

      <div className="mt-3 text-sm font-bold text-white/70">{title}</div>
    </div>
  );
}

/* =========================================================
   INFO CARD
========================================================= */

function InfoCard({
  icon,
  title,
  text,
}: {
  icon: string;
  title: string;
  text: string;
}) {
  return (
    <article className="rounded-3xl border border-white/[0.08] bg-black/25 p-7 text-center">
      <div className="text-3xl">{icon}</div>

      <h3 className="mt-5 text-base font-black">{title}</h3>

      <p className="mt-3 text-sm leading-7 text-white/35">{text}</p>
    </article>
  );
}

/* =========================================================
   FAQ ITEM
========================================================= */

function FaqItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  return (
    <details className="group rounded-2xl border border-white/[0.08] bg-white/[0.025] px-5 py-5 transition hover:border-white/[0.14]">
      <summary className="cursor-pointer list-none pr-6 text-sm font-bold text-white marker:hidden">
        <div className="flex items-center justify-between gap-5">
          <span>{question}</span>

          <span className="text-lg text-white/30 transition-transform duration-300 group-open:rotate-45">
            +
          </span>
        </div>
      </summary>

      <p className="mt-4 max-w-3xl text-sm leading-7 text-white/40">
        {answer}
      </p>
    </details>
  );
}
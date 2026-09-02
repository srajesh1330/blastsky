"use client";

import Link from "next/link";
import { useState } from "react";
import FireworksCanvas, {
  unlockFireworksAudio,
  FireworksMode,
} from "./fireworks/FireworksCanvas";

const DURATIONS = [5, 10, 15, 30];

export default function HomePage() {
  const [active, setActive] = useState(false);
  const [mode, setMode] = useState<FireworksMode>("manual");
  const [duration, setDuration] = useState(10);
  const [starting, setStarting] = useState(false);

  const startFireworks = () => {
    setStarting(true);

    try {
      unlockFireworksAudio();
    } catch {
      // Audio may be blocked until user interaction.
    }

    setTimeout(() => {
      setActive(true);
      setStarting(false);
    }, 250);
  };

  /* FIREWORKS SCREEN */
  if (active) {
  return (
    <FireworksCanvas
      active={active}
      mode={mode}
      duration={duration}
      onFinished={() => setActive(false)}
    />
  );
}

  return (
    <main className="min-h-screen bg-[#030712] text-white">
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#030712]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
          {/* LOGO */}
          <Link
            href="/"
            className="flex items-center transition-opacity hover:opacity-90"
            aria-label="BlastSky Home"
          >
            <img
              src="/blastsky-logo.png"
              alt="BlastSky - Free Online Fireworks Simulator"
              className="h-14 w-auto object-contain sm:h-16"
            />
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden items-center gap-7 md:flex">
            <Link
              href="/"
              className="text-sm font-medium text-white transition hover:text-blue-400"
            >
              Home
            </Link>

            <Link
              href="/fireworks"
              className="text-sm font-medium text-gray-300 transition hover:text-white"
            >
              Fireworks
            </Link>

            <Link
              href="/about"
              className="text-sm font-medium text-gray-300 transition hover:text-white"
            >
              About
            </Link>

            <Link
              href="/contact"
              className="text-sm font-medium text-gray-300 transition hover:text-white"
            >
              Contact
            </Link>

            <Link
              href="/privacy"
              className="text-sm font-medium text-gray-300 transition hover:text-white"
            >
              Privacy
            </Link>

            <Link
              href="/terms"
              className="text-sm font-medium text-gray-300 transition hover:text-white"
            >
              Terms
            </Link>
          </nav>

          {/* LAUNCH */}
          <button
            onClick={startFireworks}
            disabled={starting}
            className="rounded-full bg-white px-5 py-2.5 text-sm font-bold text-black shadow-lg shadow-white/10 transition hover:scale-105 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {starting ? "Launching..." : "Launch"}
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-[120px]" />

        <div className="relative mx-auto max-w-6xl px-5 pb-20 pt-20 text-center sm:px-8 sm:pt-28">
          <div className="mx-auto mb-6 inline-flex rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-300">
            🎆 Free Online Fireworks Simulator
          </div>

          <h1 className="mx-auto max-w-5xl text-4xl font-black tracking-tight sm:text-6xl lg:text-7xl">
            Experience Fireworks
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Anywhere, Anytime.
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-gray-400 sm:text-lg">
            Create a spectacular virtual fireworks show directly in your
            browser. Choose manual or automatic mode, enjoy colorful effects,
            and launch your own BlastSky experience.
          </p>

          {/* MODE SELECTOR */}
          <div className="mx-auto mt-10 max-w-md">
            <div className="grid grid-cols-2 rounded-2xl border border-white/10 bg-white/[0.04] p-1">
              <button
                onClick={() => setMode("manual")}
                className={`rounded-xl px-5 py-3 text-sm font-semibold transition ${
                  mode === "manual"
                    ? "bg-white text-black shadow-lg"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                🎯 Manual Show
              </button>

              <button
                onClick={() => setMode("auto")}
                className={`rounded-xl px-5 py-3 text-sm font-semibold transition ${
                  mode === "auto"
                    ? "bg-white text-black shadow-lg"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                ✨ Auto Show
              </button>
            </div>
          </div>

          {/* DURATION */}
          {mode === "auto" && (
            <div className="mx-auto mt-5 max-w-md">
              <p className="mb-3 text-sm text-gray-400">
                Choose show duration
              </p>

              <div className="grid grid-cols-4 gap-2">
                {DURATIONS.map((seconds) => (
                  <button
                    key={seconds}
                    onClick={() => setDuration(seconds)}
                    className={`rounded-xl border px-3 py-3 text-sm font-semibold transition ${
                      duration === seconds
                        ? "border-blue-400 bg-blue-500/20 text-white"
                        : "border-white/10 bg-white/[0.03] text-gray-400 hover:border-white/20 hover:text-white"
                    }`}
                  >
                    {seconds}s
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* MAIN CTA */}
          <button
            onClick={startFireworks}
            disabled={starting}
            className="mt-10 inline-flex min-h-[52px] items-center justify-center rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 px-8 py-4 text-base font-bold text-white shadow-2xl shadow-purple-500/20 transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {starting ? "Launching BlastSky..." : "🎆 Start BlastSky"}
          </button>

          <p className="mt-4 text-xs text-gray-500">
            No installation required • Works in your browser
          </p>
        </div>
      </section>

      {/* FEATURES */}
      <section className="border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
              BlastSky Features
            </p>

            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              A better way to enjoy virtual fireworks
            </h2>

            <p className="mt-4 text-gray-400">
              BlastSky combines interactive fireworks, colorful effects and
              automatic shows into one simple browser experience.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <FeatureCard
              icon="🎆"
              title="Realistic Fireworks"
              text="Enjoy colorful bursts, trails, sparks and multiple fireworks effects."
            />

            <FeatureCard
              icon="🎯"
              title="Manual Mode"
              text="Control when and where fireworks launch for a fully interactive show."
            />

            <FeatureCard
              icon="✨"
              title="Auto Shows"
              text="Sit back and enjoy an automatic virtual fireworks performance."
            />

            <FeatureCard
              icon="🔊"
              title="Firework Sounds"
              text="Experience immersive sound effects when your browser allows audio."
            />
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-purple-400">
              About BlastSky
            </p>

            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
              Your virtual fireworks destination
            </h2>

            <p className="mt-6 leading-8 text-gray-400">
              BlastSky is a free online fireworks simulator designed to bring
              the excitement of a fireworks show to your screen. You can launch
              fireworks manually or let BlastSky create an automatic show.
            </p>

            <p className="mt-5 leading-8 text-gray-400">
              The experience works directly in a modern web browser, making it
              easy to enjoy virtual fireworks without installing an app.
            </p>

            <Link
              href="/about"
              className="mt-7 inline-flex rounded-full border border-white/10 bg-white/[0.04] px-6 py-3 text-sm font-semibold transition hover:bg-white/[0.08]"
            >
              Learn more about BlastSky →
            </Link>
          </div>

          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 p-8">
            <div className="text-7xl">🎆</div>

            <h3 className="mt-6 text-2xl font-bold">
              Light up your screen
            </h3>

            <p className="mt-4 leading-7 text-gray-400">
              From quick celebrations to longer automatic shows, BlastSky is
              built for a simple and entertaining fireworks experience.
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
              How It Works
            </p>

            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Start your fireworks show in seconds
            </h2>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-4">
            <StepCard
              number="01"
              title="Choose a mode"
              text="Select Manual for interactive control or Auto for an automatic show."
            />

            <StepCard
              number="02"
              title="Choose duration"
              text="For Auto mode, select a show length that fits your celebration."
            />

            <StepCard
              number="03"
              title="Launch"
              text="Press Start BlastSky and let the virtual fireworks begin."
            />

            <StepCard
              number="04"
              title="Enjoy"
              text="Watch colorful fireworks fill your screen with light and sound."
            />
          </div>
        </div>
      </section>

      {/* FIREWORK STYLES */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-pink-400">
            Fireworks Styles
          </p>

          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Colorful effects for every celebration
          </h2>

          <p className="mt-5 text-gray-400">
            BlastSky brings together different visual styles to create an
            energetic virtual fireworks experience.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          <StyleCard
            icon="🌈"
            title="Color Bursts"
            text="Bright multi-color fireworks designed to stand out against the night sky."
          />

          <StyleCard
            icon="💫"
            title="Spark Trails"
            text="Glowing trails and sparks create movement across the virtual sky."
          />

          <StyleCard
            icon="🌌"
            title="Night Sky"
            text="A dark immersive background gives every fireworks burst maximum impact."
          />
        </div>
      </section>

      {/* WHY BLASTSKY */}
      <section className="border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            <InfoCard
              title="Free to use"
              text="BlastSky is designed as a free online fireworks experience that runs directly in your browser."
            />

            <InfoCard
              title="No installation"
              text="Open the website, choose your show and start enjoying virtual fireworks."
            />

            <InfoCard
              title="Interactive"
              text="Manual mode lets you take control and create fireworks when you want them."
            />

            <InfoCard
              title="Made for celebrations"
              text="Enjoy BlastSky for New Year celebrations, parties, events or simply for fun."
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-4xl px-5 py-24 sm:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
            FAQ
          </p>

          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Frequently asked questions
          </h2>
        </div>

        <div className="mt-12 space-y-4">
          <FaqItem
            question="What is BlastSky?"
            answer="BlastSky is a free online fireworks simulator that lets you enjoy virtual fireworks directly in your web browser."
          />

          <FaqItem
            question="Is BlastSky free?"
            answer="Yes. BlastSky is designed as a free online fireworks experience."
          />

          <FaqItem
            question="Can I control the fireworks?"
            answer="Yes. Manual mode lets you interact with the fireworks, while Auto mode creates an automatic show."
          />

          <FaqItem
            question="Does BlastSky work on mobile?"
            answer="BlastSky is designed to work on modern desktop and mobile browsers."
          />

          <FaqItem
            question="Do I need to install anything?"
            answer="No. BlastSky runs directly in your web browser."
          />
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-5 pb-24 sm:px-8">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 px-6 py-16 text-center sm:px-12">
          <div className="text-5xl">🎆</div>

          <h2 className="mt-5 text-3xl font-black sm:text-4xl">
            Ready to light up the sky?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-gray-400">
            Launch BlastSky and create your own virtual fireworks show right
            now.
          </p>

          <button
            onClick={startFireworks}
            disabled={starting}
            className="mt-8 rounded-full bg-white px-8 py-4 font-bold text-black transition hover:scale-105 hover:bg-gray-100 disabled:opacity-60"
          >
            {starting ? "Launching..." : "🎆 Launch BlastSky"}
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-10 sm:px-8 md:flex-row md:items-center md:justify-between">
          <div>
            <Link href="/" className="inline-block">
              <img
                src="/blastsky-logo.png"
                alt="BlastSky"
                className="h-12 w-auto object-contain"
              />
            </Link>

            <p className="mt-3 text-sm text-gray-500">
              Free online fireworks simulator.
            </p>
          </div>

          <div className="flex flex-wrap gap-5 text-sm text-gray-500">
            <Link href="/fireworks" className="hover:text-white">
              Fireworks
            </Link>

            <Link href="/about" className="hover:text-white">
              About
            </Link>

            <Link href="/contact" className="hover:text-white">
              Contact
            </Link>

            <Link href="/privacy" className="hover:text-white">
              Privacy
            </Link>

            <Link href="/terms" className="hover:text-white">
              Terms
            </Link>
          </div>
        </div>

        <div className="border-t border-white/5 py-6 text-center text-xs text-gray-600">
          © {new Date().getFullYear()} BlastSky. All rights reserved.
        </div>
      </footer>
    </main>
  );
}

/* FEATURE CARD */

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
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:-translate-y-1 hover:bg-white/[0.05]">
      <div className="text-3xl">{icon}</div>

      <h3 className="mt-5 text-lg font-bold">{title}</h3>

      <p className="mt-3 text-sm leading-6 text-gray-400">{text}</p>
    </div>
  );
}

/* STEP CARD */

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
    <div className="rounded-2xl border border-white/10 bg-[#050b18] p-6">
      <div className="text-sm font-bold text-blue-400">{number}</div>

      <h3 className="mt-5 text-lg font-bold">{title}</h3>

      <p className="mt-3 text-sm leading-6 text-gray-400">{text}</p>
    </div>
  );
}

/* STYLE CARD */

function StyleCard({
  icon,
  title,
  text,
}: {
  icon: string;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent p-8">
      <div className="text-4xl">{icon}</div>

      <h3 className="mt-6 text-xl font-bold">{title}</h3>

      <p className="mt-3 leading-7 text-gray-400">{text}</p>
    </div>
  );
}

/* INFO CARD */

function InfoCard({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#050b18] p-7">
      <h3 className="text-xl font-bold">{title}</h3>

      <p className="mt-3 leading-7 text-gray-400">{text}</p>
    </div>
  );
}

/* FAQ */

function FaqItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  return (
    <details className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <summary className="cursor-pointer list-none font-semibold">
        <div className="flex items-center justify-between gap-4">
          <span>{question}</span>

          <span className="text-gray-500 transition group-open:rotate-45">
            +
          </span>
        </div>
      </summary>

      <p className="mt-4 pr-8 text-sm leading-7 text-gray-400">
        {answer}
      </p>
    </details>
  );
}
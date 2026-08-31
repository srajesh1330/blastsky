"use client";

import { useState } from "react";
import Link from "next/link";

type FireworksMode = "auto" | "manual";

const DURATIONS = [5, 10, 15, 30] as const;

function AdSpace({
  label = "Advertisement",
}: {
  label?: string;
}) {
  return (
    <div
      className="mx-auto flex min-h-[100px] w-full max-w-3xl items-center justify-center overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.015] px-4 py-6"
      aria-label={label}
    >
      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/15">
        {label}
      </span>
    </div>
  );
}

export default function HomePage() {
  const [mode, setMode] = useState<FireworksMode>("manual");
  const [duration, setDuration] = useState(5);

  const startFireworks = () => {
    window.location.href = "/fireworks";
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#02040b] text-white">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[15%] top-[10%] h-64 w-64 rounded-full bg-blue-500/[0.04] blur-3xl" />
        <div className="absolute right-[10%] top-[25%] h-80 w-80 rounded-full bg-purple-500/[0.04] blur-3xl" />

        <div className="absolute left-[10%] top-[15%] h-1 w-1 rounded-full bg-white/60" />
        <div className="absolute left-[22%] top-[28%] h-1 w-1 rounded-full bg-white/40" />
        <div className="absolute left-[35%] top-[12%] h-1 w-1 rounded-full bg-white/50" />
        <div className="absolute left-[51%] top-[22%] h-1 w-1 rounded-full bg-white/40" />
        <div className="absolute left-[68%] top-[14%] h-1 w-1 rounded-full bg-white/60" />
        <div className="absolute left-[82%] top-[31%] h-1 w-1 rounded-full bg-white/40" />
        <div className="absolute left-[91%] top-[10%] h-1 w-1 rounded-full bg-white/50" />
        <div className="absolute left-[15%] top-[48%] h-1 w-1 rounded-full bg-white/30" />
        <div className="absolute left-[76%] top-[50%] h-1 w-1 rounded-full bg-white/30" />
      </div>

      {/* Header */}
      <header className="relative z-20 border-b border-white/[0.04]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
          <Link
            href="/"
            className="flex items-center gap-3"
            aria-label="BlastSky home"
          >
            <span className="text-3xl">🎆</span>

            <span className="text-xl font-black tracking-tight sm:text-2xl">
              BlastSky
            </span>
          </Link>

          <Link
            href="/fireworks"
            className="rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-xs font-bold text-white/80 transition hover:bg-white/10 hover:text-white"
          >
            Fireworks
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 flex min-h-[calc(100vh-80px)] items-center justify-center px-5 py-20 sm:px-8">
        <div className="w-full max-w-4xl text-center">
          {/* Logo */}
          <div className="mb-7">
            <div className="mb-5 text-6xl drop-shadow-2xl sm:text-8xl">
              🎆
            </div>

            <h1 className="text-5xl font-black tracking-tight sm:text-7xl md:text-8xl">
              BlastSky
            </h1>

            <p className="mt-4 text-lg font-semibold text-white/60 sm:text-2xl">
              Light Up the Sky.
            </p>
          </div>

          {/* Description */}
          <p className="mx-auto max-w-2xl text-sm leading-7 text-white/45 sm:text-base">
            Create your own spectacular virtual fireworks experience.
            Launch colorful fireworks manually or enjoy an automatic
            fireworks show with realistic visual effects and immersive
            fireworks sounds.
          </p>

          {/* Mode selector */}
          <div className="mx-auto mt-10 w-full max-w-xl">
            <div className="grid grid-cols-2 gap-2 rounded-2xl border border-white/10 bg-black/50 p-1.5 shadow-2xl backdrop-blur-xl">
              <button
                type="button"
                onClick={() => setMode("manual")}
                className={`rounded-xl px-5 py-3.5 text-sm font-bold transition ${
                  mode === "manual"
                    ? "bg-white text-black shadow-lg"
                    : "text-white/55 hover:bg-white/5 hover:text-white"
                }`}
              >
                👆 Manual Mode
              </button>

              <button
                type="button"
                onClick={() => setMode("auto")}
                className={`rounded-xl px-5 py-3.5 text-sm font-bold transition ${
                  mode === "auto"
                    ? "bg-white text-black shadow-lg"
                    : "text-white/55 hover:bg-white/5 hover:text-white"
                }`}
              >
                🎆 Auto Show
              </button>
            </div>

            {/* Duration */}
            {mode === "auto" && (
              <div className="mt-5 rounded-2xl border border-white/10 bg-black/45 p-4 backdrop-blur-xl">
                <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">
                  Show Duration
                </p>

                <div className="grid grid-cols-4 gap-2">
                  {DURATIONS.map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setDuration(value)}
                      className={`rounded-xl border px-3 py-3 text-sm font-bold transition ${
                        duration === value
                          ? "border-white/30 bg-white text-black"
                          : "border-white/10 bg-black/40 text-white/60 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {value} min
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Start */}
            <button
              type="button"
              onClick={startFireworks}
              className="mt-5 w-full rounded-2xl border border-white/20 bg-white px-6 py-4 text-base font-black text-black shadow-2xl transition hover:scale-[1.01] hover:bg-white/90 active:scale-[0.98]"
            >
              🎆 Start BlastSky
            </button>

            <p className="mt-4 text-xs text-white/30">
              {mode === "manual"
                ? "Click or tap anywhere to launch your fireworks."
                : `Automatic ${duration}-minute fireworks show.`}
            </p>
          </div>

          {/* First ad space */}
          <div className="mt-12">
            <AdSpace />
          </div>

          {/* Features */}
          <section className="mt-12">
            <h2 className="text-2xl font-black sm:text-3xl">
              Experience BlastSky
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-white/35">
              Enjoy an interactive virtual fireworks experience directly
              in your browser.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-black/35 p-5 text-left backdrop-blur-md">
                <div className="text-2xl">🎇</div>

                <h3 className="mt-3 text-sm font-bold">
                  Realistic Fireworks
                </h3>

                <p className="mt-1 text-xs leading-5 text-white/35">
                  Smooth explosions, colorful particles, and dynamic
                  fireworks effects.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/35 p-5 text-left backdrop-blur-md">
                <div className="text-2xl">🔊</div>

                <h3 className="mt-3 text-sm font-bold">
                  Realistic Sound
                </h3>

                <p className="mt-1 text-xs leading-5 text-white/35">
                  Immersive fireworks explosion sounds designed to
                  complement the visual experience.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/35 p-5 text-left backdrop-blur-md">
                <div className="text-2xl">✨</div>

                <h3 className="mt-3 text-sm font-bold">
                  Interactive
                </h3>

                <p className="mt-1 text-xs leading-5 text-white/35">
                  Launch fireworks wherever you want using manual
                  interaction.
                </p>
              </div>
            </div>
          </section>

          {/* Second ad space */}
          <div className="mt-12">
            <AdSpace />
          </div>

          {/* About section */}
          <section className="mt-14 rounded-3xl border border-white/10 bg-white/[0.02] p-7 text-left backdrop-blur-xl sm:p-10">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/25">
              About BlastSky
            </p>

            <h2 className="mt-3 text-2xl font-black sm:text-3xl">
              Virtual fireworks, right in your browser.
            </h2>

            <p className="mt-5 text-sm leading-7 text-white/40 sm:text-base">
              BlastSky is an interactive online fireworks experience
              created for people who enjoy colorful skies, explosive
              visual effects, and immersive browser experiences. No
              physical fireworks are required to enjoy the show.
            </p>

            <Link
              href="/about"
              className="mt-6 inline-flex rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold transition hover:bg-white/10"
            >
              Learn More
            </Link>
          </section>

          {/* Navigation links */}
          <nav
            className="mt-12 flex flex-wrap justify-center gap-3"
            aria-label="Footer navigation"
          >
            <Link
              href="/about"
              className="rounded-full border border-white/10 px-4 py-2 text-xs font-semibold text-white/40 transition hover:bg-white/5 hover:text-white"
            >
              About
            </Link>

            <Link
              href="/privacy"
              className="rounded-full border border-white/10 px-4 py-2 text-xs font-semibold text-white/40 transition hover:bg-white/5 hover:text-white"
            >
              Privacy
            </Link>

            <Link
              href="/terms"
              className="rounded-full border border-white/10 px-4 py-2 text-xs font-semibold text-white/40 transition hover:bg-white/5 hover:text-white"
            >
              Terms
            </Link>

            <Link
              href="/contact"
              className="rounded-full border border-white/10 px-4 py-2 text-xs font-semibold text-white/40 transition hover:bg-white/5 hover:text-white"
            >
              Contact
            </Link>
          </nav>

          {/* Footer */}
          <footer className="mt-10 pb-6 text-xs text-white/20">
            © {new Date().getFullYear()} BlastSky. All rights reserved.
          </footer>
        </div>
      </section>
    </main>
  );
}
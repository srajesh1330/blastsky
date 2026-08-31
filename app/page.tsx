"use client";

import { useState } from "react";
import FireworksCanvas, {
  unlockFireworksAudio,
  type FireworksMode,
} from "./fireworks/FireworksCanvas";

const DURATIONS = [5, 10, 15, 30];

export default function HomePage() {
  const [active, setActive] = useState(false);
  const [mode, setMode] = useState<FireworksMode>("manual");
  const [duration, setDuration] = useState(5);
  const [starting, setStarting] = useState(false);

  const startFireworks = async () => {
    if (starting) return;

    setStarting(true);

    try {
      /*
       * IMPORTANT:
       * This function runs from the actual Start button click.
       * It unlocks the Web Audio context before the fireworks
       * canvas is mounted.
       */
      await unlockFireworksAudio();
    } finally {
      setActive(true);
      setStarting(false);
    }
  };

  if (active) {
    return (
      <FireworksCanvas
        active={active}
        duration={duration}
        mode={mode}
        onFinished={() => setActive(false)}
      />
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#02040b] text-white">
      {/* NIGHT SKY */}

      <div className="pointer-events-none absolute inset-0">
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

      {/* HEADER */}

      <header className="absolute inset-x-0 top-0 z-20">
        <div className="flex items-center justify-center px-6 py-6">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🎆</span>

            <span className="text-xl font-black tracking-tight sm:text-2xl">
              BlastSky
            </span>
          </div>
        </div>
      </header>

      {/* HERO */}

      <section className="relative z-10 flex min-h-screen items-center justify-center px-5 py-24">
        <div className="w-full max-w-3xl text-center">
          {/* LOGO */}

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

          {/* DESCRIPTION */}

          <p className="mx-auto max-w-2xl text-sm leading-7 text-white/45 sm:text-base">
            Create your own spectacular fireworks experience.
            Launch fireworks manually or enjoy an automatic
            show with colorful explosions and realistic
            fireworks sounds.
          </p>

          {/* MODE SELECTOR */}

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

            {/* DURATION */}

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

            {/* START */}

            <button
              type="button"
              onClick={startFireworks}
              disabled={starting}
              className="mt-5 w-full rounded-2xl border border-white/20 bg-white px-6 py-4 text-base font-black text-black shadow-2xl transition hover:scale-[1.01] hover:bg-white/90 active:scale-[0.98] disabled:cursor-wait disabled:opacity-70"
            >
              {starting
                ? "🔊 Preparing Sound..."
                : "🎆 Start BlastSky"}
            </button>

            <p className="mt-4 text-xs text-white/30">
              {mode === "manual"
                ? "Click or tap anywhere to launch your fireworks."
                : `Automatic ${duration}-minute fireworks show.`}
            </p>
          </div>

          {/* FEATURES */}

          <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-black/35 p-5 backdrop-blur-md">
              <div className="text-2xl">🎇</div>

              <h2 className="mt-3 text-sm font-bold">
                Realistic Fireworks
              </h2>

              <p className="mt-1 text-xs leading-5 text-white/35">
                Smooth explosions and colorful effects.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/35 p-5 backdrop-blur-md">
              <div className="text-2xl">🔊</div>

              <h2 className="mt-3 text-sm font-bold">
                Realistic Sound
              </h2>

              <p className="mt-1 text-xs leading-5 text-white/35">
                Real fireworks explosion sound from
                boom1.mp3.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/35 p-5 backdrop-blur-md">
              <div className="text-2xl">✨</div>

              <h2 className="mt-3 text-sm font-bold">
                Interactive
              </h2>

              <p className="mt-1 text-xs leading-5 text-white/35">
                Launch fireworks wherever you want.
              </p>
            </div>
          </div>

          {/* FOOTER */}

          <footer className="mt-12 pb-4 text-xs text-white/20">
            © {new Date().getFullYear()} BlastSky
          </footer>
        </div>
      </section>
    </main>
  );
}
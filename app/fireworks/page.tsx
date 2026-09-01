"use client";

import { useState } from "react";

import FireworksCanvas, {
  type FireworksMode,
} from "./FireworksCanvas";

const DURATIONS = [5, 10, 15, 30];

export default function FireworksPage() {
  const [active, setActive] = useState(false);

  const [mode, setMode] =
    useState<FireworksMode>("manual");

  const [duration, setDuration] =
    useState(5);

  const startFireworks = () => {
    /*
     * IMPORTANT:
     * This runs directly from the user's button click.
     * It allows the browser to unlock fireworks audio.
     */
    

    setActive(true);
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
    <main className="relative min-h-screen overflow-hidden bg-[#02040b] text-white">
      {/* BACKGROUND */}

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[8%] top-[15%] h-1 w-1 rounded-full bg-white/60" />

        <div className="absolute left-[18%] top-[32%] h-1 w-1 rounded-full bg-white/40" />

        <div className="absolute left-[30%] top-[12%] h-1 w-1 rounded-full bg-white/50" />

        <div className="absolute left-[43%] top-[25%] h-1 w-1 rounded-full bg-white/40" />

        <div className="absolute left-[55%] top-[10%] h-1 w-1 rounded-full bg-white/50" />

        <div className="absolute left-[67%] top-[22%] h-1 w-1 rounded-full bg-white/60" />

        <div className="absolute left-[80%] top-[13%] h-1 w-1 rounded-full bg-white/40" />

        <div className="absolute left-[91%] top-[29%] h-1 w-1 rounded-full bg-white/50" />

        <div className="absolute left-[12%] top-[52%] h-1 w-1 rounded-full bg-white/30" />

        <div className="absolute left-[76%] top-[49%] h-1 w-1 rounded-full bg-white/30" />
      </div>

      {/* HEADER */}

      <header className="absolute left-0 right-0 top-0 z-20">
        <div className="flex items-center justify-center px-6 py-6">
          <div className="flex items-center gap-3">
            <span className="text-3xl">
              🎆
            </span>

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
            Create your own spectacular fireworks
            experience. Launch fireworks manually
            or enjoy an automatic show with colorful
            explosions and realistic fireworks sounds.
          </p>

          {/* MODE */}

          <div className="mx-auto mt-10 w-full max-w-xl">
            <div className="grid grid-cols-2 gap-2 rounded-2xl border border-white/10 bg-black/50 p-1.5 shadow-2xl backdrop-blur-xl">
              <button
                type="button"
                onClick={() =>
                  setMode("manual")
                }
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
                onClick={() =>
                  setMode("auto")
                }
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
                  {DURATIONS.map(
                    (value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() =>
                          setDuration(value)
                        }
                        className={`rounded-xl border px-3 py-3 text-sm font-bold transition ${
                          duration === value
                            ? "border-white/30 bg-white text-black"
                            : "border-white/10 bg-black/40 text-white/60 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        {value} min
                      </button>
                    ),
                  )}
                </div>
              </div>
            )}

            {/* START */}

            <button
              type="button"
              onClick={startFireworks}
              className="mt-5 w-full rounded-2xl border border-white/20 bg-white px-6 py-4 text-base font-black text-black shadow-2xl transition hover:scale-[1.01] hover:bg-white/90 active:scale-[0.98]"
            >
              🎆 Start BlastSky
            </button>

            {/* INFO */}

            <p className="mt-4 text-xs text-white/30">
              {mode === "manual"
                ? "Click or tap anywhere to launch your fireworks."
                : `Automatic ${duration}-minute fireworks show.`}
            </p>
          </div>

          {/* FEATURES */}

          <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-black/35 p-5 backdrop-blur-md">
              <div className="text-2xl">
                🎇
              </div>

              <h2 className="mt-3 text-sm font-bold">
                Realistic Fireworks
              </h2>

              <p className="mt-1 text-xs leading-5 text-white/35">
                Smooth explosions and colorful effects.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/35 p-5 backdrop-blur-md">
              <div className="text-2xl">
                🔊
              </div>

              <h2 className="mt-3 text-sm font-bold">
                Realistic Sound
              </h2>

              <p className="mt-1 text-xs leading-5 text-white/35">
                Immersive fireworks explosion sounds.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/35 p-5 backdrop-blur-md">
              <div className="text-2xl">
                ✨
              </div>

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
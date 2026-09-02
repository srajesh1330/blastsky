"use client";

import { useState } from "react";

import FireworksCanvas, {
  unlockFireworksAudio,
  type FireworksMode,
} from "./FireworksCanvas";

const DURATIONS = [5, 10, 15, 30] as const;

export default function FireworksPage() {
  const [active, setActive] = useState(false);
  const [mode, setMode] = useState<FireworksMode>("manual");
  const [duration, setDuration] = useState(5);
  const [starting, setStarting] = useState(false);

  const startFireworks = async () => {
    if (starting) return;

    setStarting(true);

    try {
      /*
       * Unlock browser audio directly from the user's click.
       */
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
    <main className="relative min-h-screen overflow-x-hidden bg-[#03030b] text-white">
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-180px] h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-purple-600/15 blur-[140px]" />

        <div className="absolute left-[-100px] top-[45%] h-[350px] w-[350px] rounded-full bg-fuchsia-600/10 blur-[130px]" />

        <div className="absolute right-[-100px] top-[50%] h-[400px] w-[400px] rounded-full bg-blue-600/10 blur-[140px]" />

        {/* Stars */}
        <div className="absolute left-[8%] top-[16%] h-1 w-1 rounded-full bg-white/60" />
        <div className="absolute left-[18%] top-[30%] h-1 w-1 rounded-full bg-white/40" />
        <div className="absolute left-[29%] top-[12%] h-1.5 w-1.5 rounded-full bg-white/50" />
        <div className="absolute left-[42%] top-[25%] h-1 w-1 rounded-full bg-white/40" />
        <div className="absolute left-[56%] top-[13%] h-1 w-1 rounded-full bg-white/50" />
        <div className="absolute left-[68%] top-[27%] h-1 w-1 rounded-full bg-white/60" />
        <div className="absolute left-[81%] top-[15%] h-1.5 w-1.5 rounded-full bg-white/40" />
        <div className="absolute left-[92%] top-[32%] h-1 w-1 rounded-full bg-white/50" />

        <div className="absolute left-[12%] top-[55%] h-1 w-1 rounded-full bg-white/30" />
        <div className="absolute left-[76%] top-[50%] h-1 w-1 rounded-full bg-white/30" />

        <div className="absolute inset-x-0 bottom-0 h-[50%] bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.08),transparent_65%)]" />
      </div>

      {/* =====================================================
          HEADER
      ====================================================== */}

      <header className="relative z-20 border-b border-white/5">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
          <a href="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-xl shadow-lg shadow-purple-900/20">
              🎆
            </span>

            <span className="text-lg font-black tracking-tight sm:text-xl">
              Blast<span className="text-purple-400">Sky</span>
            </span>
          </a>

          <a
            href="/"
            className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-bold text-white/60 transition hover:bg-white/[0.08] hover:text-white"
          >
            ← Home
          </a>
        </div>
      </header>

      {/* =====================================================
          MAIN
      ====================================================== */}

      <section className="relative z-10 px-5 pb-20 pt-12 sm:px-8 sm:pt-16">
        <div className="mx-auto max-w-5xl">
          {/* Heading */}

          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-purple-400/20 bg-purple-500/[0.08] px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-purple-200">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-purple-400" />
              Create Your Show
            </div>

            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-[24px] border border-white/10 bg-gradient-to-br from-purple-500/20 to-fuchsia-500/10 text-5xl shadow-2xl shadow-purple-900/30">
              🎆
            </div>

            <h1 className="text-4xl font-black tracking-[-0.035em] sm:text-6xl">
              Light up the sky.
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/45 sm:text-base">
              Choose how you want to experience BlastSky, then step into your
              own interactive fireworks show.
            </p>
          </div>

          {/* =================================================
              SETUP CARD
          ================================================== */}

          <div className="mx-auto mt-10 max-w-2xl">
            <div className="relative">
              <div className="absolute -inset-1 rounded-[30px] bg-gradient-to-r from-purple-600/20 via-fuchsia-500/10 to-blue-600/20 blur-xl" />

              <div className="relative rounded-[28px] border border-white/10 bg-[#080812]/85 p-4 shadow-2xl shadow-black/50 backdrop-blur-2xl sm:p-5">
                {/* Mode */}

                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-white">
                        Choose your experience
                      </p>

                      <p className="mt-1 text-xs text-white/30">
                        How would you like to launch?
                      </p>
                    </div>

                    <span className="text-xl">
                      {mode === "manual" ? "👆" : "✨"}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 rounded-2xl border border-white/10 bg-black/40 p-1.5">
                    <button
                      type="button"
                      onClick={() => setMode("manual")}
                      aria-pressed={mode === "manual"}
                      className={`rounded-xl px-4 py-4 text-sm font-bold transition-all ${
                        mode === "manual"
                          ? "bg-white text-black shadow-xl shadow-white/10"
                          : "text-white/45 hover:bg-white/[0.05] hover:text-white"
                      }`}
                    >
                      <span className="mr-2">👆</span>
                      Manual
                    </button>

                    <button
                      type="button"
                      onClick={() => setMode("auto")}
                      aria-pressed={mode === "auto"}
                      className={`rounded-xl px-4 py-4 text-sm font-bold transition-all ${
                        mode === "auto"
                          ? "bg-white text-black shadow-xl shadow-white/10"
                          : "text-white/45 hover:bg-white/[0.05] hover:text-white"
                      }`}
                    >
                      <span className="mr-2">✨</span>
                      Auto Show
                    </button>
                  </div>
                </div>

                {/* Manual information */}

                {mode === "manual" && (
                  <div className="mt-3 rounded-2xl border border-white/10 bg-white/[0.025] p-5">
                    <div className="flex gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-xl">
                        👆
                      </div>

                      <div>
                        <h2 className="text-sm font-bold">
                          You control the sky
                        </h2>

                        <p className="mt-1 text-xs leading-5 text-white/35">
                          Click or tap anywhere on the screen to launch a
                          firework exactly where you want it.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Auto duration */}

                {mode === "auto" && (
                  <div className="mt-3 rounded-2xl border border-white/10 bg-white/[0.025] p-5">
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-bold">
                          Show duration
                        </p>

                        <p className="mt-1 text-xs text-white/30">
                          Sit back and enjoy the display.
                        </p>
                      </div>

                      <span className="rounded-full bg-purple-500/10 px-3 py-1.5 text-xs font-bold text-purple-300">
                        {duration} min
                      </span>
                    </div>

                    <div className="grid grid-cols-4 gap-2">
                      {DURATIONS.map((value) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => setDuration(value)}
                          aria-pressed={duration === value}
                          className={`rounded-xl border px-2 py-3 text-sm font-bold transition ${
                            duration === value
                              ? "border-purple-300/30 bg-purple-500 text-white shadow-lg shadow-purple-900/30"
                              : "border-white/10 bg-black/30 text-white/45 hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
                          }`}
                        >
                          {value}m
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Start */}

                <button
                  type="button"
                  onClick={startFireworks}
                  disabled={starting}
                  className="group relative mt-3 w-full overflow-hidden rounded-2xl bg-white px-6 py-5 text-base font-black text-black shadow-2xl shadow-white/10 transition-all hover:-translate-y-0.5 hover:shadow-white/20 active:translate-y-0 disabled:cursor-wait disabled:opacity-70 sm:text-lg"
                >
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-purple-200/50 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                  <span className="relative">
                    {starting
                      ? "🔊 Preparing Your Show..."
                      : mode === "manual"
                        ? "🎆 Launch Fireworks"
                        : "✨ Start Auto Show"}
                  </span>
                </button>

                <p className="pt-4 text-center text-[11px] text-white/25">
                  {mode === "manual"
                    ? "Click or tap anywhere once the show starts."
                    : `Your automatic ${duration}-minute show will begin immediately.`}
                </p>
              </div>
            </div>
          </div>

          {/* =================================================
              FEATURE CARDS
          ================================================== */}

          <div className="mx-auto mt-8 grid max-w-4xl grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5 text-center backdrop-blur-xl">
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/10 text-2xl">
                🎇
              </div>

              <h2 className="mt-4 text-sm font-bold">
                Colorful Effects
              </h2>

              <p className="mt-2 text-xs leading-5 text-white/30">
                Beautiful animated fireworks across the night sky.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5 text-center backdrop-blur-xl">
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-fuchsia-500/10 text-2xl">
                🔊
              </div>

              <h2 className="mt-4 text-sm font-bold">
                Immersive Sound
              </h2>

              <p className="mt-2 text-xs leading-5 text-white/30">
                Enjoy fireworks with realistic explosion sounds.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5 text-center backdrop-blur-xl">
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-2xl">
                📱
              </div>

              <h2 className="mt-4 text-sm font-bold">
                Touch Friendly
              </h2>

              <p className="mt-2 text-xs leading-5 text-white/30">
                Launch fireworks from your phone, tablet or computer.
              </p>
            </div>
          </div>

          {/* =================================================
              FOOTER
          ================================================== */}

          <footer className="mt-14 border-t border-white/5 pt-7">
            <div className="flex flex-col items-center justify-between gap-4 text-xs sm:flex-row">
              <p className="text-white/20">
                © {new Date().getFullYear()} BlastSky
              </p>

              <div className="flex gap-5 text-white/25">
                <a
                  href="/about"
                  className="transition hover:text-white"
                >
                  About
                </a>

                <a
                  href="/privacy"
                  className="transition hover:text-white"
                >
                  Privacy
                </a>

                <a
                  href="/terms"
                  className="transition hover:text-white"
                >
                  Terms
                </a>

                <a
                  href="/contact"
                  className="transition hover:text-white"
                >
                  Contact
                </a>
              </div>
            </div>
          </footer>
        </div>
      </section>
    </main>
  );
}
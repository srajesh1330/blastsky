"use client";

import { useState } from "react";

import FireworksCanvas, {
  type FireworksMode,
} from "./FireworksCanvas";

const DURATIONS = [
  5,
  10,
  15,
  30,
] as const;

export default function FireworksPage() {
  const [active, setActive] =
    useState(false);

  const [mode, setMode] =
    useState<FireworksMode>("auto");

  const [duration, setDuration] =
    useState<number>(5);

  /*
   * =========================================================
   * START
   * =========================================================
   *
   * IMPORTANT:
   *
   * unlockFireworksAudio() MUST happen directly
   * inside this click handler.
   *
   * This is what fixes:
   *
   * "Auto fireworks start but no sound until
   * I click the screen."
   */
  const handleStart = () => {
    

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
        onFinished={
          handleFinished
        }
      />
    );
  }

  return (
    <main className="min-h-screen bg-[#02040b] text-white">
      <div className="flex min-h-screen items-center justify-center px-6">
        <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-black/60 p-8 shadow-2xl backdrop-blur-xl">
          {/* BRAND */}

          <div className="text-center">
            <div className="mb-3 text-6xl">
              🎆
            </div>

            <h1 className="text-5xl font-black tracking-tight">
              BlastSky
            </h1>

            <p className="mt-3 text-sm text-white/55">
              Realistic fireworks experience
            </p>
          </div>

          {/* MODE */}

          <div className="mt-8 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() =>
                setMode("auto")
              }
              className={`rounded-2xl border px-5 py-4 text-left transition ${
                mode === "auto"
                  ? "border-white/30 bg-white/10"
                  : "border-white/10 bg-black/40 hover:bg-white/5"
              }`}
            >
              <div className="text-lg font-bold">
                🎆 Auto
              </div>

              <div className="mt-1 text-xs text-white/45">
                Automatic fireworks show
              </div>
            </button>

            <button
              type="button"
              onClick={() =>
                setMode("manual")
              }
              className={`rounded-2xl border px-5 py-4 text-left transition ${
                mode === "manual"
                  ? "border-white/30 bg-white/10"
                  : "border-white/10 bg-black/40 hover:bg-white/5"
              }`}
            >
              <div className="text-lg font-bold">
                👆 Manual
              </div>

              <div className="mt-1 text-xs text-white/45">
                Click anywhere to launch
              </div>
            </button>
          </div>

          {/* DURATION */}

          {mode === "auto" && (
            <div className="mt-6">
              <div className="mb-3 text-xs font-bold uppercase tracking-widest text-white/45">
                Show Duration
              </div>

              <div className="grid grid-cols-4 gap-2">
                {DURATIONS.map(
                  (value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() =>
                        setDuration(
                          value
                        )
                      }
                      className={`rounded-xl border py-3 text-sm font-bold transition ${
                        duration ===
                        value
                          ? "border-white/30 bg-white/10 text-white"
                          : "border-white/10 bg-black/40 text-white/55 hover:bg-white/5"
                      }`}
                    >
                      {value}m
                    </button>
                  )
                )}
              </div>
            </div>
          )}

          {/* START */}

          <button
            type="button"
            onClick={
              handleStart
            }
            className="mt-8 w-full rounded-2xl border border-white/20 bg-white px-6 py-4 text-lg font-black text-black shadow-xl transition hover:bg-white/90 active:scale-[0.98]"
          >
            🎆 Start BlastSky
          </button>

          <p className="mt-4 text-center text-[11px] text-white/35">
            🔊 Sound unlocks automatically when you
            press Start
          </p>
        </div>
      </div>
    </main>
  );
}
"use client";

import { useState } from "react";

export type FireworksCity = {
  name: string;
  country: string;
  code: string;
  image: string;
};

export const CITIES: FireworksCity[] = [
  {
    name: "New York",
    country: "United States",
    code: "US",
    image:
      "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Dubai",
    country: "United Arab Emirates",
    code: "AE",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "London",
    country: "United Kingdom",
    code: "GB",
    image:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Paris",
    country: "France",
    code: "FR",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Singapore",
    country: "Singapore",
    code: "SG",
    image:
      "https://images.unsplash.com/photo-1525625293386-3b8f99389edd?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Sydney",
    country: "Australia",
    code: "AU",
    image:
      "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d1?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Tokyo",
    country: "Japan",
    code: "JP",
    image:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Colombo",
    country: "Sri Lanka",
    code: "LK",
    image:
      "https://images.unsplash.com/photo-1588598198321-9735fd524c4b?auto=format&fit=crop&w=900&q=80",
  },
];

const DURATIONS = [
  {
    minutes: 5,
    description: "Quick fireworks show",
  },
  {
    minutes: 10,
    description: "Extended fireworks show",
  },
  {
    minutes: 15,
    description: "Long fireworks show",
  },
  {
    minutes: 30,
    description: "Ultimate fireworks show",
  },
];

type Props = {
  onStart: (
    city: FireworksCity,
    duration: number
  ) => void;
};

export default function FireworksSetup({
  onStart,
}: Props) {
  const [selectedCity, setSelectedCity] =
    useState<FireworksCity>(CITIES[0]);

  const [duration, setDuration] =
    useState(5);

  return (
    <main className="min-h-screen bg-[#050509] px-4 py-8 text-white sm:px-6 lg:px-10">

      <div className="mx-auto max-w-7xl">

        {/* =========================
            CITY HEADER
        ========================== */}
        <div className="mb-6 flex items-center justify-between">

          <h1 className="flex items-center gap-3 text-2xl font-bold tracking-tight sm:text-3xl">
            <span className="text-2xl sm:text-3xl">
              🎆
            </span>

            <span>
              City
            </span>
          </h1>

          <div className="text-sm font-medium text-white/45 sm:text-base">
            {selectedCity.name}
          </div>

        </div>

        {/* =========================
            CITY GRID
        ========================== */}
        <section
          aria-label="Choose a city"
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {CITIES.map((city) => {
            const selected =
              selectedCity.code ===
              city.code;

            return (
              <button
                key={city.code}
                type="button"
                onClick={() =>
                  setSelectedCity(city)
                }
                aria-pressed={selected}
                className={[
                  "group relative h-52 overflow-hidden rounded-2xl border text-left transition-all duration-300",
                  "focus:outline-none focus:ring-2 focus:ring-purple-500",
                  selected
                    ? "border-purple-500 shadow-[0_0_30px_rgba(168,85,247,0.22)]"
                    : "border-white/10 hover:border-white/25",
                ].join(" ")}
              >

                {/* CITY PHOTO */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition duration-500 group-hover:scale-105"
                  style={{
                    backgroundImage: `url("${city.image}")`,
                  }}
                />

                {/* Dark overlay */}
                <div
                  className={[
                    "absolute inset-0 transition",
                    selected
                      ? "bg-gradient-to-t from-black/90 via-black/35 to-purple-950/20"
                      : "bg-gradient-to-t from-black/90 via-black/45 to-black/20 group-hover:from-black/80",
                  ].join(" ")}
                />

                {/* Purple selected glow */}
                {selected && (
                  <div className="absolute inset-0 bg-purple-500/10" />
                )}

                {/* Country code */}
                <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/45 px-3 py-1 text-xs font-semibold text-white/80 backdrop-blur-md">
                  {city.code}
                </div>

                {/* Check */}
                {selected && (
                  <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white text-black shadow-xl">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <path
                        d="M5 12.5 10 17l9-10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}

                {/* City name */}
                <div className="absolute bottom-4 left-4 right-4">

                  <div className="text-xl font-bold text-white drop-shadow-lg">
                    {city.name}
                  </div>

                  <div className="mt-1 text-sm text-white/60">
                    {city.country}
                  </div>

                </div>

              </button>
            );
          })}
        </section>

        {/* =========================
            DURATION
        ========================== */}
        <section className="mt-12">

          <div className="mb-6 flex items-center justify-between">

            <h2 className="flex items-center gap-3 text-2xl font-bold sm:text-3xl">
              <span>
                ⏱️
              </span>

              <span>
                Show Duration
              </span>
            </h2>

            <span className="hidden text-sm text-white/40 sm:block">
              Choose your experience
            </span>

          </div>

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">

            {DURATIONS.map((item) => {
              const selected =
                duration === item.minutes;

              return (
                <button
                  key={item.minutes}
                  type="button"
                  onClick={() =>
                    setDuration(
                      item.minutes
                    )
                  }
                  aria-pressed={selected}
                  className={[
                    "relative rounded-2xl border px-5 py-7 text-center transition-all duration-300",
                    "focus:outline-none focus:ring-2 focus:ring-purple-500",
                    selected
                      ? "border-purple-500 bg-purple-500/15 shadow-[0_0_30px_rgba(168,85,247,0.18)]"
                      : "border-white/10 bg-white/[0.025] hover:border-white/20 hover:bg-white/[0.05]",
                  ].join(" ")}
                >

                  {selected && (
                    <div className="absolute inset-x-8 -top-px h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent" />
                  )}

                  <div className="text-2xl font-black sm:text-3xl">
                    {item.minutes} min
                  </div>

                  <div className="mt-2 text-sm text-white/45">
                    {item.description}
                  </div>

                </button>
              );
            })}

          </div>
        </section>

        {/* =========================
            SELECTED CITY PREVIEW
        ========================== */}
        <section className="mt-12 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025]">

          <div className="relative min-h-[230px]">

            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url("${selectedCity.image}")`,
              }}
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/65 to-black/20" />

            <div className="relative flex min-h-[230px] flex-col justify-center px-6 py-8 sm:px-10">

              <div className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-purple-300">
                Your Fireworks Show
              </div>

              <h2 className="text-3xl font-black sm:text-5xl">
                {selectedCity.name}
              </h2>

              <p className="mt-3 max-w-xl text-white/55">
                A virtual fireworks experience
                designed for {duration} minutes
                with different colors, patterns,
                explosions and effects.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">

                <span className="rounded-full border border-white/10 bg-black/40 px-3 py-1.5 text-xs text-white/70 backdrop-blur-md">
                  🎆 Multiple styles
                </span>

                <span className="rounded-full border border-white/10 bg-black/40 px-3 py-1.5 text-xs text-white/70 backdrop-blur-md">
                  ✨ Realistic effects
                </span>

                <span className="rounded-full border border-white/10 bg-black/40 px-3 py-1.5 text-xs text-white/70 backdrop-blur-md">
                  🔊 Firework sounds
                </span>

              </div>

            </div>

          </div>

        </section>

        {/* =========================
            START BUTTON
        ========================== */}
        <div className="mt-8 flex justify-center pb-10">

          <button
            type="button"
            onClick={() =>
              onStart(
                selectedCity,
                duration
              )
            }
            className="group relative w-full max-w-xl overflow-hidden rounded-2xl bg-white px-8 py-5 text-lg font-black text-black shadow-[0_15px_60px_rgba(168,85,247,0.2)] transition hover:scale-[1.01] active:scale-[0.98] sm:text-xl"
          >

            {/* Animated shine */}
            <span className="absolute inset-y-0 -left-20 w-16 rotate-12 bg-black/10 blur-md transition-all duration-700 group-hover:left-[110%]" />

            <span className="relative flex items-center justify-center gap-3">
              <span className="text-2xl">
                🎆
              </span>

              <span>
                Start Fireworks
              </span>

              <span className="text-black/40">
                →
              </span>
            </span>

          </button>

        </div>

      </div>
    </main>
  );
}
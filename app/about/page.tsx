import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About BlastSky",
  description:
    "Learn about BlastSky and our interactive virtual fireworks experience.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#02040b] text-white">
      {/* Header */}
      <header className="border-b border-white/5 bg-black/20 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
          <Link
            href="/"
            className="flex items-center gap-3"
          >
            <span className="text-3xl">🎆</span>

            <span className="text-xl font-black">
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
      <section className="px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <div className="text-6xl sm:text-7xl">
            🎆
          </div>

          <p className="mt-7 text-xs font-black uppercase tracking-[0.25em] text-white/30">
            About BlastSky
          </p>

          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">
            Welcome to BlastSky.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/40 sm:text-lg">
            BlastSky is an interactive virtual fireworks experience
            designed to bring the excitement of fireworks directly
            to your browser.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="border-y border-white/5 bg-white/[0.015] px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-4xl">
          <div className="space-y-12">
            {/* What is BlastSky */}
            <article>
              <h2 className="text-2xl font-black sm:text-3xl">
                What is BlastSky?
              </h2>

              <p className="mt-5 text-sm leading-7 text-white/40 sm:text-base">
                BlastSky is a browser-based fireworks experience
                where visitors can create and enjoy virtual fireworks
                displays. The experience combines colorful visual
                effects, interactive controls, and realistic fireworks
                sounds.
              </p>

              <p className="mt-4 text-sm leading-7 text-white/40 sm:text-base">
                There is no special software required. You can open
                BlastSky in a modern web browser and start enjoying
                the experience.
              </p>
            </article>

            {/* Our Goal */}
            <article>
              <h2 className="text-2xl font-black sm:text-3xl">
                Our Goal
              </h2>

              <p className="mt-5 text-sm leading-7 text-white/40 sm:text-base">
                Our goal is to create a simple, enjoyable, and
                immersive way for people to experience virtual
                fireworks online.
              </p>

              <p className="mt-4 text-sm leading-7 text-white/40 sm:text-base">
                BlastSky focuses on making the experience easy to use
                while providing smooth animations and an engaging
                night-sky atmosphere.
              </p>
            </article>

            {/* Features */}
            <article>
              <h2 className="text-2xl font-black sm:text-3xl">
                The BlastSky Experience
              </h2>

              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                <InfoCard
                  icon="🎇"
                  title="Interactive Fireworks"
                  text="Launch fireworks yourself and choose where they appear on the screen."
                />

                <InfoCard
                  icon="🎆"
                  title="Automatic Shows"
                  text="Sit back and enjoy an automatically generated fireworks show."
                />

                <InfoCard
                  icon="🔊"
                  title="Fireworks Sounds"
                  text="Enjoy realistic explosion sound effects alongside the visual experience."
                />

                <InfoCard
                  icon="✨"
                  title="Browser Experience"
                  text="Enjoy BlastSky directly in your browser without installing special software."
                />
              </div>
            </article>

            {/* How It Works */}
            <article>
              <h2 className="text-2xl font-black sm:text-3xl">
                How It Works
              </h2>

              <div className="mt-7 space-y-4">
                <InfoStep
                  number="01"
                  title="Choose your experience"
                  text="Select Manual Mode if you want to launch fireworks yourself, or Auto Show for an automatic display."
                />

                <InfoStep
                  number="02"
                  title="Start the fireworks"
                  text="Enter the interactive fireworks screen and begin your experience."
                />

                <InfoStep
                  number="03"
                  title="Enjoy the sky"
                  text="Watch colorful explosions fill the virtual night sky and enjoy the experience."
                />
              </div>
            </article>

            {/* Disclaimer */}
            <article className="rounded-3xl border border-white/10 bg-black/30 p-7">
              <h2 className="text-lg font-black">
                Virtual Experience
              </h2>

              <p className="mt-4 text-sm leading-6 text-white/35">
                BlastSky provides a digital fireworks simulation.
                It does not provide, sell, or promote physical
                fireworks. The experience is intended for online
                entertainment.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 py-20 text-center sm:px-8 sm:py-28">
        <div className="mx-auto max-w-2xl">
          <div className="text-5xl">
            ✨
          </div>

          <h2 className="mt-5 text-3xl font-black sm:text-5xl">
            Ready to light up the sky?
          </h2>

          <p className="mt-4 text-sm leading-7 text-white/35">
            Start your BlastSky experience and enjoy interactive
            virtual fireworks.
          </p>

          <Link
            href="/fireworks"
            className="mt-7 inline-flex rounded-2xl bg-white px-7 py-4 text-sm font-black text-black transition hover:scale-[1.02] hover:bg-white/90"
          >
            🎆 Launch BlastSky
          </Link>
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
              className="hover:text-white"
            >
              Home
            </Link>

            <Link
              href="/privacy"
              className="hover:text-white"
            >
              Privacy
            </Link>

            <Link
              href="/terms"
              className="hover:text-white"
            >
              Terms
            </Link>

            <Link
              href="/contact"
              className="hover:text-white"
            >
              Contact
            </Link>
          </nav>
        </div>
      </footer>
    </main>
  );
}

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
    <div className="rounded-3xl border border-white/10 bg-black/25 p-6">
      <div className="text-3xl">
        {icon}
      </div>

      <h3 className="mt-4 text-base font-black">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-white/35">
        {text}
      </p>
    </div>
  );
}

function InfoStep({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="flex gap-5 rounded-2xl border border-white/10 bg-black/20 p-5">
      <div className="shrink-0 text-xs font-black tracking-[0.2em] text-white/25">
        {number}
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
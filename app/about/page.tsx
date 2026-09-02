import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About BlastSky",
  description:
    "Learn about BlastSky, a free interactive virtual fireworks simulator designed for fun, immersive fireworks experiences on desktop and mobile.",
  alternates: {
    canonical: "/about",
  },
};

const features = [
  {
    icon: "🎆",
    title: "Interactive Fireworks",
    text: "Launch fireworks wherever you want with a simple click or tap.",
  },
  {
    icon: "🎇",
    title: "Automatic Shows",
    text: "Sit back and enjoy an automatically generated fireworks display.",
  },
  {
    icon: "🎨",
    title: "Multiple Effects",
    text: "Experience different colors, sizes, styles, intensities and visual effects.",
  },
  {
    icon: "🔊",
    title: "Immersive Sound",
    text: "Add realistic fireworks sound effects to make the experience more engaging.",
  },
  {
    icon: "📱",
    title: "Mobile Friendly",
    text: "Enjoy BlastSky on phones, tablets, laptops and desktop computers.",
  },
  {
    icon: "⚡",
    title: "Instant Experience",
    text: "No special software or installation is required. Open your browser and play.",
  },
];

const steps = [
  {
    number: "01",
    title: "Choose your mode",
    text: "Launch fireworks yourself with Manual Mode or let BlastSky create an automatic show.",
  },
  {
    number: "02",
    title: "Customize your show",
    text: "Choose options such as firework style, color, size, intensity and sound.",
  },
  {
    number: "03",
    title: "Light up the sky",
    text: "Launch your fireworks and enjoy the colorful virtual night sky.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#03030b] text-white">
      {/* Background atmosphere */}
      <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[-15%] h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-[130px]" />
        <div className="absolute right-[-10%] top-[10%] h-[450px] w-[450px] rounded-full bg-blue-500/10 blur-[130px]" />
        <div className="absolute bottom-[-15%] left-[25%] h-[500px] w-[500px] rounded-full bg-fuchsia-500/10 blur-[140px]" />

        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "45px 45px",
          }}
        />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/[0.07] bg-[#03030b]/80 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <Link
            href="/"
            className="group flex items-center gap-3"
            aria-label="BlastSky home"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] text-xl shadow-lg transition duration-300 group-hover:scale-105 group-hover:bg-white/[0.1]">
              🎆
            </span>

            <div>
              <div className="text-lg font-black tracking-tight">
                BlastSky
              </div>

              <div className="hidden text-[9px] font-bold uppercase tracking-[0.22em] text-white/30 sm:block">
                Virtual Fireworks
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-7 md:flex">
            <Link
              href="/"
              className="text-sm font-semibold text-white/50 transition hover:text-white"
            >
              Home
            </Link>

            <Link
              href="/about"
              className="text-sm font-semibold text-white"
            >
              About
            </Link>

            <Link
              href="/privacy"
              className="text-sm font-semibold text-white/50 transition hover:text-white"
            >
              Privacy
            </Link>

            <Link
              href="/contact"
              className="text-sm font-semibold text-white/50 transition hover:text-white"
            >
              Contact
            </Link>
          </nav>

          <Link
            href="/fireworks"
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white px-4 py-2.5 text-xs font-black text-black shadow-[0_0_30px_rgba(255,255,255,0.08)] transition duration-300 hover:-translate-y-0.5 hover:bg-white/90 sm:px-5"
          >
            <span>🎆</span>
            <span>Launch Fireworks</span>
            <span className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 px-5 pb-20 pt-20 sm:px-8 sm:pb-28 sm:pt-28">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[28px] border border-white/10 bg-white/[0.05] text-5xl shadow-2xl shadow-purple-950/30 sm:h-24 sm:w-24 sm:text-6xl">
            🎆
          </div>

          <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[10px] font-black uppercase tracking-[0.24em] text-white/45">
            <span className="h-1.5 w-1.5 rounded-full bg-purple-400 shadow-[0_0_10px_rgba(192,132,252,0.8)]" />
            About BlastSky
          </div>

          <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-black tracking-[-0.04em] sm:text-6xl lg:text-7xl">
            Bringing the{" "}
            <span className="bg-gradient-to-r from-purple-300 via-fuchsia-300 to-blue-300 bg-clip-text text-transparent">
              fireworks experience
            </span>{" "}
            to your screen.
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-white/45 sm:text-lg">
            BlastSky is a free interactive virtual fireworks experience
            designed to make colorful fireworks fun, simple and accessible
            directly from your browser.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/fireworks"
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-7 py-4 text-sm font-black text-black shadow-[0_10px_50px_rgba(255,255,255,0.08)] transition duration-300 hover:-translate-y-0.5 hover:bg-white/90 sm:w-auto"
            >
              🎆 Start BlastSky
              <span>→</span>
            </Link>

            <Link
              href="/"
              className="inline-flex w-full items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] px-7 py-4 text-sm font-bold text-white/70 transition duration-300 hover:border-white/20 hover:bg-white/[0.07] hover:text-white sm:w-auto"
            >
              Explore BlastSky
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative z-10 px-5 pb-20 sm:px-8">
        <div className="mx-auto grid max-w-5xl gap-3 sm:grid-cols-3">
          <StatCard
            value="100%"
            label="Browser Based"
          />

          <StatCard
            value="2"
            label="Play Modes"
          />

          <StatCard
            value="∞"
            label="Fireworks Fun"
          />
        </div>
      </section>

      {/* What is BlastSky */}
      <section className="relative z-10 border-y border-white/[0.06] bg-white/[0.015] px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <div className="text-xs font-black uppercase tracking-[0.25em] text-purple-300/60">
                The idea
              </div>

              <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
                What is BlastSky?
              </h2>

              <div className="mt-6 h-1 w-14 rounded-full bg-gradient-to-r from-purple-400 to-blue-400" />
            </div>

            <div className="space-y-5 text-sm leading-8 text-white/45 sm:text-base">
              <p>
                BlastSky is a browser-based virtual fireworks simulator where
                you can create and enjoy colorful fireworks displays directly
                on your screen.
              </p>

              <p>
                The experience combines interactive controls, animated
                fireworks, different visual effects and optional sound to
                create an immersive digital night-sky experience.
              </p>

              <p>
                Whether you want to launch individual fireworks yourself or
                simply sit back and watch an automatic show, BlastSky is
                designed to be quick, simple and enjoyable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <div className="text-xs font-black uppercase tracking-[0.25em] text-purple-300/60">
              Built for fun
            </div>

            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
              The BlastSky experience
            </h2>

            <p className="mt-5 text-sm leading-7 text-white/40 sm:text-base">
              Explore a simple fireworks simulator with enough controls to
              make every show feel different.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                text={feature.text}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="relative z-10 border-y border-white/[0.06] bg-white/[0.015] px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <div className="text-xs font-black uppercase tracking-[0.25em] text-blue-300/60">
                Simple to use
              </div>

              <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
                How it works
              </h2>

              <p className="mt-5 max-w-md text-sm leading-7 text-white/40 sm:text-base">
                You do not need special software or complicated setup. Just
                choose your experience and start the show.
              </p>
            </div>

            <div className="space-y-4">
              {steps.map((step) => (
                <StepCard
                  key={step.number}
                  number={step.number}
                  title={step.title}
                  text={step.text}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="relative z-10 px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.035] p-8 shadow-2xl sm:p-12">
            <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-purple-500/10 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />

            <div className="relative">
              <div className="text-4xl">✨</div>

              <h2 className="mt-5 text-2xl font-black sm:text-3xl">
                Our goal is simple.
              </h2>

              <p className="mt-5 text-sm leading-8 text-white/45 sm:text-base">
                We want BlastSky to be an easy and enjoyable place to
                experience virtual fireworks. The focus is on a smooth,
                interactive experience that works directly in a modern web
                browser.
              </p>

              <p className="mt-4 text-sm leading-8 text-white/45 sm:text-base">
                BlastSky is a digital entertainment experience. It does not
                provide, sell or promote physical fireworks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 px-5 pb-24 pt-8 text-center sm:px-8 sm:pb-32">
        <div className="mx-auto max-w-3xl">
          <div className="text-5xl">🎆</div>

          <h2 className="mt-6 text-3xl font-black tracking-tight sm:text-5xl">
            Ready to light up the sky?
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/40 sm:text-base">
            Start your virtual fireworks experience and create your own
            colorful night sky.
          </p>

          <Link
            href="/fireworks"
            className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-4 text-sm font-black text-black shadow-[0_15px_60px_rgba(255,255,255,0.08)] transition duration-300 hover:-translate-y-0.5 hover:bg-white/90"
          >
            🎆 Launch BlastSky
            <span>→</span>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/[0.06] bg-black/20 px-5 py-10 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-7 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link
              href="/"
              className="flex items-center gap-2.5"
            >
              <span className="text-xl">🎆</span>

              <span className="font-black">
                BlastSky
              </span>
            </Link>

            <p className="mt-2 text-xs text-white/25">
              Interactive virtual fireworks experience.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-3 text-xs font-semibold text-white/35">
            <Link
              href="/"
              className="transition hover:text-white"
            >
              Home
            </Link>

            <Link
              href="/about"
              className="text-white"
            >
              About
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

            <Link
              href="/contact"
              className="transition hover:text-white"
            >
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

function StatCard({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-3xl border border-white/[0.08] bg-white/[0.035] p-6 text-center backdrop-blur-xl transition duration-300 hover:border-white/[0.14] hover:bg-white/[0.05]">
      <div className="text-3xl font-black tracking-tight sm:text-4xl">
        {value}
      </div>

      <div className="mt-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
        {label}
      </div>
    </div>
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
    <article className="group rounded-3xl border border-white/[0.08] bg-white/[0.025] p-6 transition duration-300 hover:-translate-y-1 hover:border-white/[0.15] hover:bg-white/[0.045]">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.05] text-2xl transition duration-300 group-hover:scale-105">
        {icon}
      </div>

      <h3 className="mt-5 text-base font-black">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-7 text-white/35">
        {text}
      </p>
    </article>
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
    <article className="group flex gap-5 rounded-3xl border border-white/[0.08] bg-white/[0.025] p-6 transition duration-300 hover:border-white/[0.15] hover:bg-white/[0.045] sm:p-7">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.04] text-[10px] font-black tracking-[0.15em] text-white/40">
        {number}
      </div>

      <div>
        <h3 className="text-base font-black">
          {title}
        </h3>

        <p className="mt-2 text-sm leading-7 text-white/35">
          {text}
        </p>
      </div>
    </article>
  );
}
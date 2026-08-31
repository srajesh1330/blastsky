import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact | BlastSky",
  description:
    "Contact BlastSky for questions, feedback, suggestions, or website-related inquiries.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#02040b] text-white">
      {/* Header */}
      <header className="border-b border-white/5 bg-black/20 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
          <Link href="/" className="flex items-center gap-3">
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
      <section className="px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <div className="text-6xl sm:text-7xl">
            💬
          </div>

          <p className="mt-7 text-xs font-black uppercase tracking-[0.25em] text-white/30">
            BlastSky
          </p>

          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">
            Contact Us
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/40 sm:text-base">
            Have a question, suggestion, or feedback about BlastSky?
            We would love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="border-y border-white/5 bg-white/[0.015] px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">

          {/* Email */}
          <div className="rounded-3xl border border-white/10 bg-black/30 p-7 backdrop-blur-xl sm:p-9">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-2xl">
              ✉️
            </div>

            <h2 className="mt-6 text-xl font-black">
              Email
            </h2>

            <p className="mt-3 text-sm leading-6 text-white/40">
              For general questions, feedback, technical issues,
              or other website-related inquiries, please contact
              BlastSky by email.
            </p>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4">
              <p className="text-xs uppercase tracking-wider text-white/25">
                Email address
              </p>

              <p className="mt-2 break-all text-sm font-bold text-white/70">
                contact@blastsky.com
              </p>
            </div>

            <p className="mt-4 text-xs leading-5 text-white/25">
              If you have not purchased the BlastSky domain or created
              this mailbox yet, replace this address with your actual
              contact email before publishing.
            </p>
          </div>

          {/* Feedback */}
          <div className="rounded-3xl border border-white/10 bg-black/30 p-7 backdrop-blur-xl sm:p-9">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-2xl">
              💡
            </div>

            <h2 className="mt-6 text-xl font-black">
              Feedback & Suggestions
            </h2>

            <p className="mt-3 text-sm leading-6 text-white/40">
              Tell us what you like about BlastSky or what you would
              like to see improved. Suggestions for new fireworks,
              effects, features, and performance improvements are
              welcome.
            </p>

            <div className="mt-6 space-y-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-sm font-bold">
                  🎆 New fireworks ideas
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-sm font-bold">
                  ⚡ Performance feedback
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-sm font-bold">
                  ✨ Feature suggestions
                </p>
              </div>
            </div>
          </div>

          {/* Technical */}
          <div className="rounded-3xl border border-white/10 bg-black/30 p-7 backdrop-blur-xl sm:p-9">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-2xl">
              🛠️
            </div>

            <h2 className="mt-6 text-xl font-black">
              Technical Issues
            </h2>

            <p className="mt-3 text-sm leading-6 text-white/40">
              If something is not working correctly, please include
              useful details such as your browser, device, the page
              where the problem occurred, and what happened.
            </p>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-white/25">
                Helpful information
              </p>

              <ul className="mt-3 space-y-2 text-sm text-white/40">
                <li>• Browser and version</li>
                <li>• Desktop or mobile device</li>
                <li>• Page where the issue occurred</li>
                <li>• Description of the problem</li>
              </ul>
            </div>
          </div>

          {/* Business */}
          <div className="rounded-3xl border border-white/10 bg-black/30 p-7 backdrop-blur-xl sm:p-9">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-2xl">
              🌐
            </div>

            <h2 className="mt-6 text-xl font-black">
              Website Inquiries
            </h2>

            <p className="mt-3 text-sm leading-6 text-white/40">
              For website-related questions, content concerns, privacy
              questions, or other inquiries, please use the contact
              email provided above.
            </p>

            <Link
              href="/privacy"
              className="mt-6 inline-flex rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-center backdrop-blur-xl sm:p-12">
          <div className="text-4xl">
            🎆
          </div>

          <h2 className="mt-5 text-2xl font-black sm:text-3xl">
            Ready to light up the sky?
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-white/35">
            Head back to BlastSky and create your own interactive
            fireworks experience.
          </p>

          <Link
            href="/fireworks"
            className="mt-7 inline-flex rounded-2xl bg-white px-7 py-4 text-sm font-black text-black shadow-2xl transition hover:scale-[1.02] hover:bg-white/90 active:scale-[0.98]"
          >
            🎆 Start Fireworks
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
              className="transition hover:text-white"
            >
              Home
            </Link>

            <Link
              href="/about"
              className="transition hover:text-white"
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
          </nav>
        </div>
      </footer>
    </main>
  );
}
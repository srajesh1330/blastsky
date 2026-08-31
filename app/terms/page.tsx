import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Use | BlastSky",
  description:
    "Read the BlastSky Terms of Use for using our interactive virtual fireworks website.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#02040b] text-white">
      {/* Header */}
      <header className="border-b border-white/5 bg-black/20 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
          <Link href="/" className="flex items-center gap-3">
            <span className="text-3xl">🎆</span>
            <span className="text-xl font-black">BlastSky</span>
          </Link>

          <Link
            href="/fireworks"
            className="rounded-full bg-white px-5 py-2.5 text-xs font-black text-black transition hover:bg-white/90"
          >
            Launch Fireworks
          </Link>
        </div>
      </header>

      {/* Page Header */}
      <section className="px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-white/30">
            BlastSky
          </p>

          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">
            Terms of Use
          </h1>

          <p className="mt-5 text-sm text-white/35">
            Last updated: August 31, 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="border-y border-white/5 bg-white/[0.015] px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-4xl space-y-12">

          <TermsSection title="1. Acceptance of Terms">
            <p>
              Welcome to BlastSky. By accessing or using this website,
              you agree to these Terms of Use.
            </p>

            <p>
              If you do not agree with these terms, please do not use
              the website.
            </p>
          </TermsSection>

          <TermsSection title="2. About BlastSky">
            <p>
              BlastSky provides an online virtual fireworks experience.
              The website allows visitors to interact with digital
              fireworks through browser-based features.
            </p>

            <p>
              BlastSky provides virtual entertainment only and does not
              sell, distribute, or supply physical fireworks.
            </p>
          </TermsSection>

          <TermsSection title="3. Use of the Website">
            <p>
              You may use BlastSky for lawful personal and recreational
              purposes.
            </p>

            <p>
              You agree not to misuse the website, interfere with its
              operation, attempt to gain unauthorized access, introduce
              malicious code, or intentionally disrupt the experience
              for other visitors.
            </p>
          </TermsSection>

          <TermsSection title="4. Intellectual Property">
            <p>
              Unless otherwise stated, the BlastSky website, branding,
              design, graphics, original code, text, and other original
              materials are owned by or used by BlastSky and are
              protected by applicable intellectual property laws.
            </p>

            <p>
              You may not copy, reproduce, modify, distribute, or
              commercially exploit BlastSky materials without
              appropriate permission, except where permitted by law.
            </p>
          </TermsSection>

          <TermsSection title="5. Fireworks Experience">
            <p>
              The fireworks displayed on BlastSky are digital visual
              effects. They are not physical fireworks and cannot cause
              physical explosions or provide instructions for handling
              fireworks.
            </p>

            <p>
              Users should always follow applicable safety laws and
              regulations when dealing with real-world fireworks.
            </p>
          </TermsSection>

          <TermsSection title="6. Third-Party Services and Advertising">
            <p>
              BlastSky may use third-party services for hosting,
              analytics, advertising, security, performance, or other
              website functionality.
            </p>

            <p>
              Third-party services may have their own terms, conditions,
              privacy policies, and requirements. Your use of those
              services may be subject to their respective policies.
            </p>
          </TermsSection>

          <TermsSection title="7. External Links">
            <p>
              BlastSky may provide links to websites or services operated
              by third parties.
            </p>

            <p>
              These links are provided for convenience. BlastSky does
              not control or guarantee the availability, accuracy,
              security, or content of third-party websites.
            </p>
          </TermsSection>

          <TermsSection title="8. Availability of the Website">
            <p>
              We aim to keep BlastSky available and functioning properly,
              but we do not guarantee that the website will always be
              available, uninterrupted, error-free, or compatible with
              every device or browser.
            </p>

            <p>
              We may modify, update, suspend, or discontinue parts of
              the website when necessary.
            </p>
          </TermsSection>

          <TermsSection title="9. Disclaimer">
            <p>
              BlastSky is provided for entertainment purposes. To the
              extent permitted by applicable law, the website and its
              features are provided without guarantees that the service
              will always be uninterrupted or error-free.
            </p>

            <p>
              We make reasonable efforts to provide a reliable
              experience, but we cannot guarantee that all website
              content, functionality, or services will always be
              available or accurate.
            </p>
          </TermsSection>

          <TermsSection title="10. Limitation of Liability">
            <p>
              To the maximum extent permitted by applicable law,
              BlastSky and its operators will not be responsible for
              losses or damages arising from your use of, or inability
              to use, the website.
            </p>

            <p>
              Nothing in these Terms is intended to exclude liability
              that cannot legally be excluded under applicable law.
            </p>
          </TermsSection>

          <TermsSection title="11. Changes to These Terms">
            <p>
              We may update these Terms of Use from time to time.
              Changes may be made to reflect new features, services,
              operational requirements, or legal requirements.
            </p>

            <p>
              Updated terms will be published on this page with a
              revised update date.
            </p>
          </TermsSection>

          <TermsSection title="12. Privacy">
            <p>
              Your use of BlastSky may also be subject to our Privacy
              Policy.
            </p>

            <Link
              href="/privacy"
              className="mt-5 inline-flex rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
            >
              Read Privacy Policy
            </Link>
          </TermsSection>

          <TermsSection title="13. Contact">
            <p>
              If you have questions about these Terms of Use, you can
              contact BlastSky through our Contact page.
            </p>

            <Link
              href="/contact"
              className="mt-5 inline-flex rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
            >
              Contact BlastSky
            </Link>
          </TermsSection>

          {/* Notice */}
          <div className="rounded-3xl border border-white/10 bg-black/30 p-6 sm:p-8">
            <h2 className="text-lg font-black">
              Important Notice
            </h2>

            <p className="mt-4 text-sm leading-7 text-white/35">
              These Terms of Use are general website terms and are not
              legal advice. Before launching BlastSky commercially,
              review these terms against the actual services, business
              structure, advertising providers, applicable laws, and
              other requirements relevant to your website.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 px-5 py-10 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/20">
            © {new Date().getFullYear()} BlastSky. All rights reserved.
          </p>

          <nav className="flex flex-wrap gap-5 text-xs font-semibold text-white/35">
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>

            <Link href="/about" className="transition hover:text-white">
              About
            </Link>

            <Link href="/privacy" className="transition hover:text-white">
              Privacy
            </Link>

            <Link href="/contact" className="transition hover:text-white">
              Contact
            </Link>
          </nav>
        </div>
      </footer>
    </main>
  );
}

function TermsSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <article>
      <h2 className="text-xl font-black sm:text-2xl">
        {title}
      </h2>

      <div className="mt-5 space-y-4 text-sm leading-7 text-white/40 sm:text-base">
        {children}
      </div>
    </article>
  );
}
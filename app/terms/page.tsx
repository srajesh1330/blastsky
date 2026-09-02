import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Read the BlastSky Terms of Use for information about using our free online virtual fireworks simulator, website features, third-party services, and acceptable use.",
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    title: "Terms of Use | BlastSky",
    description:
      "Review the Terms of Use for BlastSky, a free online virtual fireworks simulator.",
    url: "https://blastsky.vercel.app/terms",
    type: "website",
  },
};

export default function TermsPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "BlastSky Terms of Use",
    url: "https://blastsky.vercel.app/terms",
    description:
      "Terms of Use for BlastSky, a free online virtual fireworks simulator.",
    isPartOf: {
      "@type": "WebSite",
      name: "BlastSky",
      url: "https://blastsky.vercel.app",
    },
  };

  return (
    <main className="min-h-screen bg-[#02040b] text-white">
      {/* Structured SEO Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      {/* Header */}
      <header className="border-b border-white/5 bg-black/20 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
          <Link
            href="/"
            className="flex items-center gap-3"
            aria-label="BlastSky home"
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
            Last updated: September 2, 2026
          </p>

          <p className="mt-6 max-w-2xl text-sm leading-7 text-white/40 sm:text-base">
            These Terms of Use explain the rules and conditions that apply
            when you access or use the BlastSky website and virtual fireworks
            experience.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="border-y border-white/5 bg-white/[0.015] px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-4xl space-y-12">
          <TermsSection title="1. Acceptance of Terms">
            <p>
              Welcome to BlastSky. By accessing or using this website, you
              agree to these Terms of Use.
            </p>

            <p>
              If you do not agree with these terms, please do not use the
              website.
            </p>
          </TermsSection>

          <TermsSection title="2. About BlastSky">
            <p>
              BlastSky provides an online virtual fireworks experience. The
              website allows visitors to interact with digital fireworks
              through browser-based features.
            </p>

            <p>
              BlastSky is provided as a digital entertainment experience.
              It does not sell, distribute, supply, or provide physical
              fireworks.
            </p>
          </TermsSection>

          <TermsSection title="3. Eligibility and Lawful Use">
            <p>
              You may use BlastSky for lawful personal and recreational
              purposes.
            </p>

            <p>
              You are responsible for using the website in accordance with
              applicable laws and regulations in your location.
            </p>
          </TermsSection>

          <TermsSection title="4. Acceptable Use">
            <p>
              You agree not to misuse BlastSky or intentionally interfere
              with its operation.
            </p>

            <p>
              You must not attempt to gain unauthorized access to the
              website, servers, systems, or related services.
            </p>

            <p>
              You must not introduce malicious code, attempt to disrupt the
              website, abuse technical systems, or use the service in a way
              that could negatively affect other visitors.
            </p>
          </TermsSection>

          <TermsSection title="5. Intellectual Property">
            <p>
              Unless otherwise stated, the BlastSky website, branding,
              design, graphics, original code, text, visual effects, and other
              original materials are owned by or used by BlastSky and may be
              protected by applicable intellectual property laws.
            </p>

            <p>
              You may not copy, reproduce, modify, distribute, republish, or
              commercially exploit BlastSky materials without appropriate
              permission, except where permitted by applicable law.
            </p>
          </TermsSection>

          <TermsSection title="6. Virtual Fireworks Experience">
            <p>
              The fireworks displayed on BlastSky are digital visual effects
              created for entertainment.
            </p>

            <p>
              They are not physical fireworks and cannot create physical
              explosions or replace professional fireworks equipment.
            </p>

            <p>
              BlastSky does not provide instructions for purchasing,
              manufacturing, modifying, or handling physical fireworks.
            </p>
          </TermsSection>

          <TermsSection title="7. Third-Party Services and Advertising">
            <p>
              BlastSky may use third-party services for hosting, analytics,
              advertising, security, performance, or other website
              functionality.
            </p>

            <p>
              Third-party services may have their own terms, conditions,
              privacy policies, cookies, and other requirements.
            </p>

            <p>
              If advertisements are displayed on BlastSky, advertising
              providers may operate according to their own policies and
              applicable requirements.
            </p>
          </TermsSection>

          <TermsSection title="8. External Links">
            <p>
              BlastSky may provide links to websites or services operated by
              third parties.
            </p>

            <p>
              These links are provided for convenience. BlastSky does not
              control or guarantee the availability, accuracy, security, or
              content of third-party websites.
            </p>

            <p>
              Your use of external websites is subject to the terms and
              policies of those websites.
            </p>
          </TermsSection>

          <TermsSection title="9. Website Availability">
            <p>
              We aim to keep BlastSky available and functioning properly, but
              we do not guarantee that the website will always be available,
              uninterrupted, error-free, or compatible with every device,
              operating system, or browser.
            </p>

            <p>
              We may modify, update, suspend, restrict, or discontinue parts
              of the website when necessary.
            </p>
          </TermsSection>

          <TermsSection title="10. Updates and Changes">
            <p>
              BlastSky may introduce new features, remove existing features,
              modify the fireworks experience, or make other changes to the
              website at any time.
            </p>

            <p>
              Features may also behave differently depending on your device,
              browser, connection, or software environment.
            </p>
          </TermsSection>

          <TermsSection title="11. Disclaimer">
            <p>
              BlastSky is provided for entertainment purposes.
            </p>

            <p>
              To the extent permitted by applicable law, the website and its
              features are provided without guarantees that the service will
              always be uninterrupted, error-free, secure, or available.
            </p>

            <p>
              We make reasonable efforts to provide a reliable experience,
              but we cannot guarantee that all website content,
              functionality, or services will always be available or
              accurate.
            </p>
          </TermsSection>

          <TermsSection title="12. Limitation of Liability">
            <p>
              To the maximum extent permitted by applicable law, BlastSky and
              its operators will not be responsible for losses or damages
              arising from your use of, or inability to use, the website.
            </p>

            <p>
              This includes interruptions, technical problems, browser
              compatibility issues, or other circumstances beyond reasonable
              control.
            </p>

            <p>
              Nothing in these Terms is intended to exclude liability that
              cannot legally be excluded under applicable law.
            </p>
          </TermsSection>

          <TermsSection title="13. Privacy">
            <p>
              Your use of BlastSky may also be subject to our Privacy Policy,
              which explains how information, cookies, analytics, advertising,
              and third-party services may be handled.
            </p>

            <Link
              href="/privacy"
              className="mt-5 inline-flex rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
            >
              Read Privacy Policy
            </Link>
          </TermsSection>

          <TermsSection title="14. Changes to These Terms">
            <p>
              We may update these Terms of Use from time to time to reflect
              new features, services, operational requirements, technologies,
              or legal requirements.
            </p>

            <p>
              Updated terms will be published on this page with a revised
              update date.
            </p>
          </TermsSection>

          <TermsSection title="15. Contact">
            <p>
              If you have questions about these Terms of Use, you can contact
              BlastSky through our Contact page.
            </p>

            <Link
              href="/contact"
              className="mt-5 inline-flex rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
            >
              Contact BlastSky
            </Link>
          </TermsSection>

          {/* Important Notice */}
          <div className="rounded-3xl border border-white/10 bg-black/30 p-6 sm:p-8">
            <h2 className="text-lg font-black">
              Important Notice
            </h2>

            <p className="mt-4 text-sm leading-7 text-white/35">
              These Terms of Use provide general website terms and are not
              legal advice. Before operating BlastSky commercially, review
              these terms against the actual services, business structure,
              advertising providers, applicable laws, and other requirements
              relevant to your website and visitors.
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
              href="/contact"
              className="transition hover:text-white"
            >
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
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | BlastSky",
  description:
    "Read the BlastSky Privacy Policy and learn how information is handled when you use our website.",
};

export default function PrivacyPage() {
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

      {/* Page Header */}
      <section className="px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-white/30">
            BlastSky
          </p>

          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">
            Privacy Policy
          </h1>

          <p className="mt-5 text-sm text-white/35">
            Last updated: August 31, 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="border-y border-white/5 bg-white/[0.015] px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-4xl space-y-12">

          {/* Introduction */}
          <PolicySection title="1. Introduction">
            <p>
              Welcome to BlastSky. This Privacy Policy explains how
              information may be collected, used, and handled when you
              visit or use the BlastSky website.
            </p>

            <p>
              By using BlastSky, you acknowledge that you have read
              and understood this Privacy Policy.
            </p>
          </PolicySection>

          {/* Information */}
          <PolicySection title="2. Information We May Collect">
            <p>
              BlastSky is designed primarily as an interactive
              browser-based fireworks experience. We aim to collect
              only information that is reasonably necessary to operate,
              maintain, improve, and protect the website.
            </p>

            <p>
              Depending on how the website is used, information may
              include technical information such as browser type,
              device information, approximate location, pages visited,
              referring pages, and general usage information.
            </p>

            <p>
              We do not ask visitors to provide sensitive personal
              information simply to enjoy the fireworks experience.
            </p>
          </PolicySection>

          {/* Cookies */}
          <PolicySection title="3. Cookies and Similar Technologies">
            <p>
              BlastSky or third-party services used on the website may
              use cookies, local storage, pixels, or similar technologies.
            </p>

            <p>
              These technologies may be used to remember preferences,
              understand website usage, improve functionality, measure
              performance, and support advertising services.
            </p>
          </PolicySection>

          {/* Advertising */}
          <PolicySection title="4. Advertising">
            <p>
              BlastSky may display advertisements from third-party
              advertising providers.
            </p>

            <p>
              Advertising providers may use cookies or similar
              technologies to provide advertisements and measure
              advertising performance.
            </p>

            <p>
              If Google AdSense or another advertising service is used
              on BlastSky, that service may process information in
              accordance with its own privacy policies and applicable
              advertising technologies.
            </p>

            <p>
              Visitors should review the privacy policies of relevant
              advertising providers for additional information about
              how their services handle data.
            </p>
          </PolicySection>

          {/* Analytics */}
          <PolicySection title="5. Analytics">
            <p>
              BlastSky may use analytics tools to understand how
              visitors use the website.
            </p>

            <p>
              Analytics information can help us identify popular pages,
              understand general traffic patterns, improve performance,
              detect technical problems, and make the website more
              useful to visitors.
            </p>
          </PolicySection>

          {/* Third Party */}
          <PolicySection title="6. Third-Party Services">
            <p>
              BlastSky may use third-party services for hosting,
              analytics, advertising, security, performance, or other
              website functionality.
            </p>

            <p>
              These third parties may process information according to
              their own policies and terms. BlastSky does not control
              the privacy practices of independent third-party services.
            </p>
          </PolicySection>

          {/* Children's Privacy */}
          <PolicySection title="7. Children's Privacy">
            <p>
              BlastSky is a general-audience website and is not
              specifically directed toward children.
            </p>

            <p>
              We do not knowingly request sensitive personal information
              from children through the website.
            </p>
          </PolicySection>

          {/* Security */}
          <PolicySection title="8. Data Security">
            <p>
              We take reasonable measures to help protect the website
              and information processed through it.
            </p>

            <p>
              However, no website, online service, or method of
              electronic transmission can be guaranteed to be completely
              secure.
            </p>
          </PolicySection>

          {/* External Links */}
          <PolicySection title="9. External Links">
            <p>
              BlastSky may contain links to external websites or
              services.
            </p>

            <p>
              We are not responsible for the privacy practices,
              content, security, or policies of third-party websites.
              Visitors should review the privacy policies of external
              websites they choose to visit.
            </p>
          </PolicySection>

          {/* Your Choices */}
          <PolicySection title="10. Your Choices">
            <p>
              Depending on your browser, device, and location, you may
              be able to control cookies and similar technologies through
              your browser settings.
            </p>

            <p>
              You can also choose to leave the website if you do not
              agree with this Privacy Policy.
            </p>
          </PolicySection>

          {/* Changes */}
          <PolicySection title="11. Changes to This Privacy Policy">
            <p>
              We may update this Privacy Policy from time to time to
              reflect changes to the website, services, technologies,
              legal requirements, or other operational needs.
            </p>

            <p>
              When changes are made, the updated version will be
              published on this page with a revised update date.
            </p>
          </PolicySection>

          {/* Contact */}
          <PolicySection title="12. Contact">
            <p>
              If you have questions about this Privacy Policy or the
              privacy practices of BlastSky, you can contact us through
              the contact information provided on our Contact page.
            </p>

            <Link
              href="/contact"
              className="mt-5 inline-flex rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
            >
              Contact BlastSky
            </Link>
          </PolicySection>

          {/* Important Notice */}
          <div className="rounded-3xl border border-white/10 bg-black/30 p-6 sm:p-8">
            <h2 className="text-lg font-black">
              Important Notice
            </h2>

            <p className="mt-4 text-sm leading-7 text-white/35">
              This page provides general information about privacy
              practices for BlastSky. It is not legal advice. Before
              launching the website commercially, review this policy
              against the actual services, advertising providers,
              analytics tools, cookies, and legal requirements that
              apply to your website and visitors.
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
      </footer>
    </main>
  );
}

function PolicySection({
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
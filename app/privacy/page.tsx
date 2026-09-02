import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read the BlastSky Privacy Policy to learn how information, cookies, analytics, advertising, and third-party services may be handled when you use our website.",
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    title: "Privacy Policy | BlastSky",
    description:
      "Learn how BlastSky handles information, cookies, analytics, advertising, and third-party services.",
    url: "https://blastsky.vercel.app/privacy",
    type: "website",
  },
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
            Privacy Policy
          </h1>

          <p className="mt-5 text-sm text-white/35">
            Last updated: September 2, 2026
          </p>

          <p className="mt-6 max-w-2xl text-sm leading-7 text-white/40 sm:text-base">
            This Privacy Policy explains how information may be collected,
            used, and handled when you visit or use BlastSky.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="border-y border-white/5 bg-white/[0.015] px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-4xl space-y-12">
          {/* Introduction */}
          <PolicySection title="1. Introduction">
            <p>
              Welcome to BlastSky. BlastSky is an interactive,
              browser-based virtual fireworks experience.
            </p>

            <p>
              This Privacy Policy explains what types of information may be
              collected when you use the website, how that information may be
              used, and the choices that may be available to you.
            </p>

            <p>
              By using BlastSky, you acknowledge that you have read and
              understood this Privacy Policy.
            </p>
          </PolicySection>

          {/* Information */}
          <PolicySection title="2. Information We May Collect">
            <p>
              BlastSky is designed primarily as an interactive browser-based
              entertainment experience. We aim to collect only information
              that is reasonably necessary to operate, maintain, improve, and
              protect the website.
            </p>

            <p>
              Depending on how the website is used, technical or usage
              information may include browser type, device type, operating
              system, approximate location, pages visited, referring pages,
              general interaction information, and similar technical data.
            </p>

            <p>
              BlastSky does not require visitors to create an account simply
              to use the virtual fireworks simulator.
            </p>

            <p>
              We do not intentionally request sensitive personal information
              from visitors through the fireworks experience.
            </p>
          </PolicySection>

          {/* How Information Is Used */}
          <PolicySection title="3. How Information May Be Used">
            <p>
              Information collected through the website may be used to
              operate and maintain BlastSky, understand how visitors use the
              website, improve performance and functionality, identify
              technical problems, protect the website, and measure general
              website usage.
            </p>

            <p>
              Information may also be used to support advertising and
              analytics services when those services are enabled on the
              website.
            </p>
          </PolicySection>

          {/* Cookies */}
          <PolicySection title="4. Cookies and Similar Technologies">
            <p>
              BlastSky or third-party services used on the website may use
              cookies, local storage, pixels, tags, or similar technologies.
            </p>

            <p>
              These technologies may be used to remember preferences,
              understand website usage, measure performance, provide security,
              improve functionality, and support advertising services.
            </p>

            <p>
              Cookie availability and behavior may vary depending on your
              browser, device, location, and the third-party services enabled
              on the website.
            </p>
          </PolicySection>

          {/* Google Analytics */}
          <PolicySection title="5. Google Analytics">
            <p>
              BlastSky uses Google Analytics to help understand website
              traffic and visitor interactions.
            </p>

            <p>
              Google Analytics may collect information such as pages viewed,
              interactions, device information, browser information, and
              general usage data. This information helps us understand how
              visitors use BlastSky and improve the website.
            </p>

            <p>
              Google Analytics is provided by Google and may use cookies or
              similar technologies to collect and measure information.
            </p>

            <p>
              Google processes information according to its applicable
              privacy policies and terms.
            </p>
          </PolicySection>

          {/* Advertising */}
          <PolicySection title="6. Advertising">
            <p>
              BlastSky may display advertisements from third-party
              advertising providers in the future.
            </p>

            <p>
              If advertising is enabled, advertising providers may use
              cookies or similar technologies to deliver advertisements,
              measure advertising performance, prevent fraud, and provide
              relevant advertising where permitted.
            </p>

            <p>
              BlastSky may use Google AdSense or other advertising services.
              These services may process information according to their own
              privacy policies, technologies, and applicable requirements.
            </p>

            <p>
              Advertising practices may change as the website grows. This
              Privacy Policy may be updated when advertising services are
              added, removed, or changed.
            </p>
          </PolicySection>

          {/* Third Party Services */}
          <PolicySection title="7. Third-Party Services">
            <p>
              BlastSky may use third-party services for website hosting,
              analytics, advertising, security, performance monitoring, and
              other technical functionality.
            </p>

            <p>
              These third-party services may process information according to
              their own privacy policies and terms.
            </p>

            <p>
              BlastSky does not control the privacy practices of independent
              third-party services.
            </p>
          </PolicySection>

          {/* Data Sharing */}
          <PolicySection title="8. Sharing of Information">
            <p>
              BlastSky does not sell personal information simply because you
              visit or use the fireworks simulator.
            </p>

            <p>
              Information may be processed by service providers that help
              operate the website, such as hosting, analytics, security, and
              advertising providers.
            </p>

            <p>
              Information may also be disclosed when reasonably necessary to
              comply with applicable laws, protect the website, prevent
              abuse or fraud, or protect the rights and safety of users and
              others.
            </p>
          </PolicySection>

          {/* Children's Privacy */}
          <PolicySection title="9. Children's Privacy">
            <p>
              BlastSky is a general-audience website and is not specifically
              directed toward children.
            </p>

            <p>
              We do not knowingly request sensitive personal information from
              children through the website.
            </p>

            <p>
              If you believe that a child has provided personal information
              through BlastSky, please contact us so that the matter can be
              reviewed.
            </p>
          </PolicySection>

          {/* Security */}
          <PolicySection title="10. Data Security">
            <p>
              We take reasonable measures to help protect the website and
              information processed through it.
            </p>

            <p>
              However, no website, online service, or method of electronic
              transmission can be guaranteed to be completely secure.
            </p>
          </PolicySection>

          {/* External Links */}
          <PolicySection title="11. External Links">
            <p>
              BlastSky may contain links to external websites or services.
            </p>

            <p>
              We are not responsible for the privacy practices, content,
              security, or policies of third-party websites.
            </p>

            <p>
              Visitors should review the privacy policies of external
              websites they choose to visit.
            </p>
          </PolicySection>

          {/* Your Choices */}
          <PolicySection title="12. Your Choices and Privacy Rights">
            <p>
              Depending on your browser, device, and location, you may be able
              to control cookies and similar technologies through your browser
              settings.
            </p>

            <p>
              Depending on applicable law, you may have rights relating to
              personal information, including rights to access, correct,
              delete, restrict, or object to certain processing.
            </p>

            <p>
              If you have a privacy-related request or question, you can
              contact us through the Contact page.
            </p>
          </PolicySection>

          {/* International Visitors */}
          <PolicySection title="13. International Visitors">
            <p>
              BlastSky may be accessed by visitors from different countries
              and regions.
            </p>

            <p>
              Depending on where you live, different privacy laws and
              protections may apply to the processing of your information.
            </p>

            <p>
              Where required, appropriate consent or privacy controls may be
              provided for applicable visitors and services.
            </p>
          </PolicySection>

          {/* Changes */}
          <PolicySection title="14. Changes to This Privacy Policy">
            <p>
              We may update this Privacy Policy from time to time to reflect
              changes to the website, services, technologies, legal
              requirements, or other operational needs.
            </p>

            <p>
              When changes are made, the updated version will be published on
              this page with a revised update date.
            </p>
          </PolicySection>

          {/* Contact */}
          <PolicySection title="15. Contact">
            <p>
              If you have questions about this Privacy Policy or the privacy
              practices of BlastSky, you can contact us through the contact
              information provided on our Contact page.
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
              This Privacy Policy provides general information about the
              privacy practices of BlastSky. It is not legal advice. You
              should review this policy against the actual services,
              analytics tools, advertising providers, cookies, consent
              mechanisms, and legal requirements that apply to your website
              and visitors.
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
import type { Metadata } from "next";
import LegalPage from "../../components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How BlastSky handles data, cookies, analytics and advertising.",
  alternates: { canonical: "/privacy" },
};

export default function Page() {
  return (
    <LegalPage title="Privacy Policy">
      <p>
        This policy explains what information BlastSky (blastsky.vercel.app) collects and how it is used. We keep
        it to the minimum needed to run the site.
      </p>

      <h2>No accounts</h2>
      <p>You do not need to create an account, and the simulator does not ask for your name or email address.</p>

      <h2>Information stored on your device</h2>
      <p>
        BlastSky saves a few small settings in your browser&apos;s local storage: your cookie choice, how many
        shells you have fired, your visit streak, and display options. This stays on your device and is not sent to
        us. You can clear it in your browser settings.
      </p>

      <h2>Greeting links</h2>
      <p>
        When you share a greeting, the message is part of the web address you send. We do not store messages in a
        database, but because the text is in the address, it can appear in standard server logs.
      </p>

      <h2>Analytics</h2>
      <p>
        We use Google Analytics to count visits and see which pages are used. It sets cookies only if you press
        Accept in the cookie banner. If you press Reject, it runs in a limited mode without analytics cookies. You
        can change your choice at any time with the Cookie settings link at the bottom of each page.
      </p>

      <h2>Advertising</h2>
      <p>
        We use Google AdSense to show ads that keep the site free. Google, as a third-party vendor, uses cookies to
        serve ads on this site. Google&apos;s use of advertising cookies enables it and its partners to serve ads
        based on your visits to this site and other sites on the internet. Ads are shown according to your cookie
        choice, and visitors in the European Economic Area, the United Kingdom and Switzerland are asked for
        consent first.
      </p>
      <p>
        You can opt out of personalised advertising at{" "}
        <a href="https://adssettings.google.com" rel="noopener noreferrer">
          adssettings.google.com
        </a>
        . You can learn how Google uses information from sites that use its services at{" "}
        <a href="https://policies.google.com/technologies/partner-sites" rel="noopener noreferrer">
          policies.google.com/technologies/partner-sites
        </a>
        .
      </p>

      <h2>Messages you send us</h2>
      <p>
        If you contact us through the contact form, we use what you send only to read and reply to your message and
        to fix problems. We do not sell it or share it.
      </p>

      <h2>Hosting</h2>
      <p>
        Our hosting provider may keep standard server logs, such as IP address, browser type and the pages
        requested, for security and performance.
      </p>

      <h2>Children</h2>
      <p>
        BlastSky is made for a general audience and does not knowingly collect personal information from children.
      </p>

      <h2>Your rights</h2>
      <p>
        If you live in the EU, the UK, California or another region with privacy laws, you may ask what data we
        hold about you, or ask us to delete it, through the contact page.
      </p>

      <h2>Changes to this policy</h2>
      <p>We may update this policy. The date below shows when it was last changed.</p>
      <p>Last updated: 5 November 2026.</p>
    </LegalPage>
  );
}

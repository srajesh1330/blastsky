import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "../../components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "The terms for using BlastSky, including the simulator, the guides and the greeting links.",
  alternates: { canonical: "/terms" },
};

export default function Page() {
  return (
    <LegalPage title="Terms of Use">
      <p>
        These terms apply to your use of BlastSky (blastsky.vercel.app), which includes the fireworks simulator and
        the guides. By using the site you agree to them. If you do not agree, please do not use the site.
      </p>

      <h2>Using the site</h2>
      <p>
        BlastSky is free to use for personal, non-commercial purposes. You may play the simulator, read the guides,
        share links to the site, and share your own greetings and saved pictures of your sky.
      </p>

      <h2>What you must not do</h2>
      <ul>
        <li>Copy, scrape or resell the site, its code, or its guides.</li>
        <li>Try to break, overload or gain unauthorised access to the site.</li>
        <li>Use the message feature to write anything unlawful, abusive, hateful or misleading.</li>
        <li>Click advertising on the site in order to generate revenue, or ask others to do so.</li>
      </ul>

      <h2>The simulator is a simulation</h2>
      <p>
        The fireworks you see and hear on BlastSky are a computer simulation. They are not a guide to making,
        handling or lighting real fireworks, and nothing on the site should be treated as instructions for doing so.
      </p>

      <h2>The guides are general information</h2>
      <p>
        Our <Link href="/guides">guides</Link> are written for a general reader and are provided for information
        only. They are not professional, safety, legal or medical advice. If you use real fireworks, follow the
        laws where you live and the instructions on the product, and prefer a professional public display. If you
        are injured or someone else is, call your local emergency number.
      </p>

      <h2>Greetings and messages</h2>
      <p>
        When you write a message in the sky or share a greeting link, the text is part of the web address. You are
        responsible for what you write and share. We may block or remove content that breaks these terms.
      </p>

      <h2>Our content</h2>
      <p>
        The text of the guides, the design of the site and its code belong to BlastSky or are used with permission,
        and are protected by copyright. You may quote short extracts with a link back to the page they come from.
        Please do not republish whole pages.
      </p>

      <h2>Advertising and links</h2>
      <p>
        The site may show advertising from Google AdSense, and it may link to other websites. We do not control
        those websites and are not responsible for their content. See our <Link href="/privacy">privacy policy</Link>{" "}
        for how cookies and ads are handled.
      </p>

      <h2>No guarantee</h2>
      <p>
        We work to keep the site running and accurate, but it is provided as it is and as available, without any
        promise that it will always be available, error-free or suitable for a particular purpose. Performance
        depends on your device and browser.
      </p>

      <h2>Limit of liability</h2>
      <p>
        To the extent the law allows, BlastSky is not liable for any loss or damage arising from your use of the
        site or from relying on the guides. Nothing in these terms limits any rights you have by law that cannot be
        excluded.
      </p>

      <h2>Changes</h2>
      <p>
        We may update these terms from time to time. The date below shows the latest version, and continuing to use
        the site after a change means you accept it.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms can be sent through our <Link href="/contact">contact page</Link>.
      </p>
      <p>Last updated: 6 November 2026.</p>
    </LegalPage>
  );
}

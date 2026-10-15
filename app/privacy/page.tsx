import type { Metadata } from "next";
import LegalPage from "../../components/LegalPage";

export const metadata: Metadata = { title: "Privacy Policy", alternates: { canonical: "/privacy" } };

export default function Page() {
  return (
    <LegalPage title="Privacy Policy">
      <p>BlastSky does not ask you to create an account and does not collect your name or email through the show.</p>
      <p><strong>Advertising.</strong> We may show ads from Google AdSense to keep the site free. Google and its partners may use cookies to serve and personalise ads. You can manage your choices at adssettings.google.com.</p>
      <p><strong>Analytics.</strong> We use Google Analytics to count visits and see which parts of the site are used. It sets cookies only if you press Accept in the cookie banner. If you press Reject, Google Analytics runs in a limited mode without cookies. You can change your choice at any time with the Cookie settings link at the bottom of each page.</p>
      <p><strong>Hosting.</strong> Our host may keep standard server logs such as IP address and browser type for security and performance.</p>
      <p><strong>Your rights.</strong> If you live in the EU, UK, California or another region with privacy laws, you may ask what data we hold or ask us to delete it using the contact page.</p>
      <p>Last updated: 6 October 2026.</p>
    </LegalPage>
  );
}

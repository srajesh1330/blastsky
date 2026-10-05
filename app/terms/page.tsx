import type { Metadata } from "next";
import LegalPage from "../../components/LegalPage";

export const metadata: Metadata = { title: "Terms of Use", alternates: { canonical: "/terms" } };

export default function Page() {
  return (
    <LegalPage title="Terms of Use">
      <p>BlastSky is provided free and as is, for personal, non-commercial use. We do not promise that it will always be available or free of errors.</p>
      <p>Please do not copy, scrape or resell the site. Fireworks shown here are a simulation only. Follow local laws and safety rules if you use real fireworks. We may update these terms at any time.</p>
    </LegalPage>
  );
}

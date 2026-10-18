import type { Metadata } from "next";
import LegalPage from "../../components/LegalPage";

export const metadata: Metadata = { title: "Contact", alternates: { canonical: "/contact" } };

export default function Page() {
  return (
    <LegalPage title="Contact">
      <p>Questions, feedback or bug reports are welcome. Our contact email address is coming soon, so please check back shortly.</p>
    </LegalPage>
  );
}

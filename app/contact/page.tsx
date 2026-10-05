import type { Metadata } from "next";
import LegalPage from "../../components/LegalPage";

export const metadata: Metadata = { title: "Contact", alternates: { canonical: "/contact" } };

export default function Page() {
  return (
    <LegalPage title="Contact">
      <p>Questions, feedback or bug reports are welcome. Email us at <strong>your-email@example.com</strong> and we will reply as soon as we can.</p>
    </LegalPage>
  );
}

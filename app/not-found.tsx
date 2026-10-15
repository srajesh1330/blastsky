import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "../components/LegalPage";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <LegalPage title="Page not found">
      <p>Sorry, we could not find that page. It may have moved.</p>
      <p>
        <Link href="/">Go to the fireworks show</Link>
      </p>
    </LegalPage>
  );
}

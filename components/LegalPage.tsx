import Link from "next/link";
import type { ReactNode } from "react";
import { CookieSettings } from "./Consent";
import SiteHeader from "./SiteHeader";

export default function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main className="doc">
        <h1>{title}</h1>
        {children}
      </main>
      <footer className="doc site-footer">
        <nav className="links" aria-label="Footer">
          <Link href="/guides">Guides</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <CookieSettings />
        </nav>
      </footer>
    </>
  );
}

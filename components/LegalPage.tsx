import Link from "next/link";
import type { ReactNode } from "react";
import { CookieSettings } from "./Consent";

export default function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <main className="doc">
      <Link href="/" className="back">← Back to the show</Link>
      <h1>{title}</h1>
      {children}
      <nav className="links">
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/privacy">Privacy</Link>
        <Link href="/terms">Terms</Link>
        <CookieSettings />
      </nav>
    </main>
  );
}

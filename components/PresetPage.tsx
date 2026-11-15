import Link from "next/link";
import type { ReactNode } from "react";
import Breadcrumbs from "./Breadcrumbs";
import { CookieSettings } from "./Consent";
import FireworksShow from "./FireworksShow";
import type { Theme } from "../lib/fireworks";
import type { CityId } from "../lib/skylines";

export default function PresetPage({
  h1,
  crumb,
  path,
  preset,
  children,
}: {
  h1: string;
  crumb: string;
  path: string;
  preset: { city?: CityId; theme?: Theme };
  children: ReactNode;
}) {
  return (
    <>
      <a href="#about" className="skip">
        Skip to the text
      </a>
      <main>
        <FireworksShow preset={preset} />
        <section className="doc" id="about">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: crumb, href: path },
            ]}
          />
          <h1>{h1}</h1>
          {children}
          <nav className="links" aria-label="Footer">
            <Link href="/guides">Guides</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <CookieSettings />
          </nav>
        </section>
      </main>
    </>
  );
}

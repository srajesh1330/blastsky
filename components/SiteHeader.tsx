import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="site-header">
      <Link href="/" className="brand-link">
        BlastSky
      </Link>
      <nav aria-label="Main">
        <Link href="/">Fireworks show</Link>
        <Link href="/guides">Guides</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
      </nav>
    </header>
  );
}

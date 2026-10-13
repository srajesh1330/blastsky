import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "../../components/LegalPage";
import { ARTICLES } from "../../lib/articles";

export const metadata: Metadata = {
  title: "Fireworks Guides",
  description:
    "Plain-language guides about fireworks: how they work, the different types, what makes the colours, safety tips and festivals around the world.",
  alternates: { canonical: "/guides" },
};

export default function GuidesPage() {
  return (
    <LegalPage title="Fireworks guides">
      <p>Short, friendly guides to help you understand and enjoy fireworks.</p>
      <ul className="guide-list">
        {ARTICLES.map((a) => (
          <li key={a.slug}>
            <Link href={`/guides/${a.slug}`}>{a.title}</Link>
            <p>{a.description}</p>
          </li>
        ))}
      </ul>
    </LegalPage>
  );
}

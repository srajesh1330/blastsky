import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import LegalPage from "../../../components/LegalPage";
import { ARTICLES, getArticle } from "../../../lib/articles";

const SITE = "https://blastsky.vercel.app";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/guides/${article.slug}` },
    openGraph: { type: "article", title: article.title, description: article.description },
  };
}

export default async function GuideArticle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    dateModified: article.date,
    author: { "@type": "Organization", name: "BlastSky" },
    publisher: { "@type": "Organization", name: "BlastSky" },
    mainEntityOfPage: `${SITE}/guides/${article.slug}`,
  };

  const others = ARTICLES.filter((a) => a.slug !== article.slug);

  return (
    <LegalPage title={article.title}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <p className="meta">Published {article.date}</p>
      {article.blocks.map((b, i) => (
        <section key={i}>
          {b.h ? <h2>{b.h}</h2> : null}
          {b.p?.map((t, j) => <p key={j}>{t}</p>)}
          {b.list ? (
            <ul>
              {b.list.map((t, j) => (
                <li key={j}>{t}</li>
              ))}
            </ul>
          ) : null}
        </section>
      ))}
      <h2>More guides</h2>
      <ul>
        {others.map((a) => (
          <li key={a.slug}>
            <Link href={`/guides/${a.slug}`}>{a.title}</Link>
          </li>
        ))}
      </ul>
      <p>
        <Link href="/">Back to the fireworks show</Link>
      </p>
    </LegalPage>
  );
}

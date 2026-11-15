import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PresetPage from "../../components/PresetPage";
import { ARTICLES } from "../../lib/articles";
import { CITY_PAGES, getCityPage } from "../../lib/cityPages";

// Only the pages listed in CITY_PAGES exist. Anything else is a normal 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return CITY_PAGES.map((c) => ({ place: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ place: string }> }): Promise<Metadata> {
  const { place } = await params;
  const page = getCityPage(place);
  if (!page) return {};
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `/${page.slug}` },
    openGraph: { type: "website", title: page.title, description: page.description },
  };
}

export default async function Place({ params }: { params: Promise<{ place: string }> }) {
  const { place } = await params;
  const page = getCityPage(place);
  if (!page) notFound();

  const guide = ARTICLES.find((a) => a.slug === page.guide);
  const others = CITY_PAGES.filter((c) => c.slug !== page.slug);

  return (
    <PresetPage h1={page.h1} crumb={page.name} path={`/${page.slug}`} preset={{ city: page.city, theme: page.theme }}>
      <p>{page.intro}</p>
      {page.blocks.map((b, i) => (
        <section key={i}>
          {b.h ? <h2>{b.h}</h2> : null}
          {b.p?.map((t, j) => (
            <p key={j}>{t}</p>
          ))}
          {b.list ? (
            <ul>
              {b.list.map((t, j) => (
                <li key={j}>{t}</li>
              ))}
            </ul>
          ) : null}
        </section>
      ))}
      {guide ? (
        <p>
          Read more in our guide: <Link href={`/guides/${guide.slug}`}>{guide.title}</Link>.
        </p>
      ) : null}
      <h2>More fireworks simulator pages</h2>
      <ul>
        {others.map((c) => (
          <li key={c.slug}>
            <Link href={`/${c.slug}`}>{c.title}</Link>
          </li>
        ))}
      </ul>
    </PresetPage>
  );
}

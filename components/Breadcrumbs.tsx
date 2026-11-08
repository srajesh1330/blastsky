import Link from "next/link";

const SITE = "https://blastsky.com";

export default function Breadcrumbs({ items }: { items: { name: string; href: string }[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE}${it.href === "/" ? "" : it.href}`,
    })),
  };
  return (
    <>
      <nav aria-label="Breadcrumb" className="crumbs">
        <ol>
          {items.map((it, i) =>
            i < items.length - 1 ? (
              <li key={it.href}>
                <Link href={it.href}>{it.name}</Link>
              </li>
            ) : (
              <li key={it.href} aria-current="page">
                {it.name}
              </li>
            )
          )}
        </ol>
      </nav>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}

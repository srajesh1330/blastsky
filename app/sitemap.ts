import type { MetadataRoute } from "next";
import { ARTICLES } from "../lib/articles";

const SITE = "https://blastsky.vercel.app";

// Change a date only when that page's content really changes.
// (Using "today" on every build makes Google distrust the dates.)
const PAGES: { path: string; updated: string; changeFrequency: "weekly" | "monthly" | "yearly"; priority: number }[] = [
  { path: "", updated: "2026-10-18", changeFrequency: "weekly", priority: 1 },
  { path: "/guides", updated: "2026-10-18", changeFrequency: "weekly", priority: 0.8 },
  { path: "/about", updated: "2026-10-06", changeFrequency: "yearly", priority: 0.5 },
  { path: "/contact", updated: "2026-10-16", changeFrequency: "yearly", priority: 0.4 },
  { path: "/privacy", updated: "2026-10-06", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms", updated: "2026-10-06", changeFrequency: "yearly", priority: 0.3 },
];

// The old /fireworks and /fireworks/new-year pages redirect to the home page,
// so they are intentionally not listed here.
export default function sitemap(): MetadataRoute.Sitemap {
  const articles = ARTICLES.map((a) => ({ path: `/guides/${a.slug}`, updated: a.date, changeFrequency: "monthly" as const, priority: 0.7 }));
  return [...PAGES, ...articles].map((p) => ({
    url: `${SITE}${p.path}`,
    lastModified: new Date(p.updated),
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));
}

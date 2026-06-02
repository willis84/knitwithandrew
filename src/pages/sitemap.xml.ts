import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { absoluteUrl, escapeXml } from "@/utils/seo";

export const GET: APIRoute = async () => {
  const posts = (await getCollection("blog")).filter((post) => !post.data.draft);
  const tags = [...new Set(posts.flatMap((post) => post.data.tags))].sort((left, right) => left.localeCompare(right));
  const now = new Date().toISOString();

  const urls = [
    { loc: absoluteUrl("/"), lastmod: now },
    { loc: absoluteUrl("/about/"), lastmod: now },
    { loc: absoluteUrl("/blog/"), lastmod: posts.find((post) => post.data.type === "blog")?.data.updatedDate?.toISOString() ?? posts.find((post) => post.data.type === "blog")?.data.pubDate.toISOString() ?? now },
    { loc: absoluteUrl("/guides/"), lastmod: posts.find((post) => post.data.type === "guide")?.data.updatedDate?.toISOString() ?? posts.find((post) => post.data.type === "guide")?.data.pubDate.toISOString() ?? now },
    { loc: absoluteUrl("/patterns/"), lastmod: posts.find((post) => post.data.type === "pattern")?.data.updatedDate?.toISOString() ?? posts.find((post) => post.data.type === "pattern")?.data.pubDate.toISOString() ?? now },
    { loc: absoluteUrl("/pattern-testing/"), lastmod: posts.find((post) => post.data.type === "pattern-testing")?.data.updatedDate?.toISOString() ?? posts.find((post) => post.data.type === "pattern-testing")?.data.pubDate.toISOString() ?? now },
    { loc: absoluteUrl("/tags/"), lastmod: posts[0]?.data.updatedDate?.toISOString() ?? posts[0]?.data.pubDate.toISOString() ?? now },
    ...posts.map((post) => ({
      loc: absoluteUrl(`/blog/${post.id}/`),
      lastmod: (post.data.updatedDate ?? post.data.pubDate).toISOString(),
    })),
    ...tags.map((tag) => ({
      loc: absoluteUrl(`/tags/${tag}/`),
      lastmod: posts
        .filter((post) => post.data.tags.includes(tag))
        .sort((left, right) => (right.data.updatedDate ?? right.data.pubDate).valueOf() - (left.data.updatedDate ?? left.data.pubDate).valueOf())[0]
        ?.data.updatedDate?.toISOString() ?? posts
        .filter((post) => post.data.tags.includes(tag))
        .sort((left, right) => (right.data.updatedDate ?? right.data.pubDate).valueOf() - (left.data.updatedDate ?? left.data.pubDate).valueOf())[0]
        ?.data.pubDate.toISOString(),
    })),
  ].filter((entry) => entry.lastmod);

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (entry) => `  <url>
    <loc>${escapeXml(entry.loc)}</loc>
    <lastmod>${escapeXml(entry.lastmod!)}</lastmod>
  </url>`,
  )
  .join("\n")}
</urlset>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
};
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { site } from "@/data/site";
import { absoluteUrl, escapeXml } from "@/utils/seo";

export const GET: APIRoute = async () => {
  const posts = (await getCollection("blog"))
    .filter((post) => !post.data.draft)
    .sort((left, right) => right.data.pubDate.valueOf() - left.data.pubDate.valueOf());
  const latestBuildDate = posts[0] ? (posts[0].data.updatedDate ?? posts[0].data.pubDate).toUTCString() : new Date().toUTCString();

  const items = posts
    .map((post) => {
      const link = absoluteUrl(`/blog/${post.id}/`);
      const categories = [post.data.category, ...post.data.tags]
        .filter((value): value is string => Boolean(value))
        .map((value) => `      <category>${escapeXml(value)}</category>`)
        .join("\n");
      return `    <item>
      <title>${escapeXml(post.data.title)}</title>
      <link>${escapeXml(link)}</link>
      <guid>${escapeXml(link)}</guid>
      <pubDate>${post.data.pubDate.toUTCString()}</pubDate>
      <description>${escapeXml(post.data.excerpt ?? post.data.description)}</description>
${categories ? `${categories}\n` : ""}    </item>`;
    })
    .join("\n");

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(site.name)}</title>
    <link>${escapeXml(site.url)}</link>
    <description>${escapeXml(site.description)}</description>
    <language>en-gb</language>
    <lastBuildDate>${latestBuildDate}</lastBuildDate>
    <atom:link href="${escapeXml(absoluteUrl("/rss.xml"))}" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
};
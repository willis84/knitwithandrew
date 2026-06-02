import type { CollectionEntry } from "astro:content";

export type BlogEntry = CollectionEntry<"blog">;
export type BlogType = BlogEntry["data"]["type"];

export function getPublishedPosts(posts: BlogEntry[]) {
  return sortPosts(posts.filter((post) => !post.data.draft));
}

export function sortPosts(posts: BlogEntry[]) {
  return [...posts].sort((left, right) => (right.data.updatedDate ?? right.data.pubDate).valueOf() - (left.data.updatedDate ?? left.data.pubDate).valueOf());
}

export function getSectionHref(type: BlogType) {
  if (type === "guide") return "/guides/";
  if (type === "pattern") return "/patterns/";
  if (type === "pattern-testing") return "/pattern-testing/";
  return "/blog/";
}

export function getSectionTitle(type: BlogType) {
  if (type === "guide") return "Guides";
  if (type === "pattern") return "Patterns";
  if (type === "pattern-testing") return "Pattern testing";
  return "Blog";
}

export function getTypeLabel(type: BlogType) {
  if (type === "guide") return "Guide";
  if (type === "pattern") return "Pattern";
  if (type === "pattern-testing") return "Pattern testing";
  return "Blog";
}

export function getRelatedPosts(posts: BlogEntry[], currentPost: BlogEntry, limit = 3) {
  return getPublishedPosts(posts)
      .filter((post) => post.id !== currentPost.id)
      .map((post) => {
        const sharedTags = post.data.tags.filter((tag) => currentPost.data.tags.includes(tag)).length;
        const sameType = post.data.type === currentPost.data.type ? 1 : 0;
        const featured = post.data.featured ? 1 : 0;
        return {
          post,
          score: sharedTags * 10 + sameType * 5 + featured * 2,
        };
      })
      .sort((left, right) => right.score - left.score || (right.post.data.updatedDate ?? right.post.data.pubDate).valueOf() - (left.post.data.updatedDate ?? left.post.data.pubDate).valueOf())
      .slice(0, limit)
      .map((entry) => entry.post);
}

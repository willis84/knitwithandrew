import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z
    .object({
      title: z.string(),
      description: z.string(),
      excerpt: z.string().optional(),
      category: z.string().optional(),
      primaryKeyword: z.string().optional(),
      secondaryKeywords: z.array(z.string()).default([]),
      heroImage: z.string().optional(),
      ogImage: z.string().optional(),
      imageAlt: z.string().optional(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      tags: z.array(z.string()).default([]),
      draft: z.boolean().default(false),
      featured: z.boolean().default(false),
      type: z.enum(["blog", "guide", "pattern", "pattern-testing"]).default("blog"),
    })
    .superRefine((data, context) => {
      if (data.heroImage && !data.imageAlt) {
        context.addIssue({
          code: "custom",
          path: ["imageAlt"],
          message: "imageAlt is required when heroImage exists",
        });
      }
    }),
});

export const collections = { blog };

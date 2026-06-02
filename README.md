# knitwithandrew.com

A small static Astro site for `knitwithandrew.com`: personal landing page, links, blog/tutorial posts, a gentle Alpacora promo, and optional comments.

## Stack

- Astro 6 static output
- Tailwind CSS 4 via `@tailwindcss/vite`
- Markdown content collections
- GitHub Pages deployment workflow
- Custom domain via `public/CNAME`

## Run locally

```bash
npm install
npm run dev
```

Open the local URL Astro prints in your terminal.

## Build

```bash
npm run build
npm run preview
```

## Deploy to GitHub Pages

1. Create a GitHub repo, for example `knitwithandrew.com`.
2. Push this project to the `main` branch.
3. In GitHub, go to **Settings → Pages**.
4. Set **Source** to **GitHub Actions**.
5. Push again or run the workflow manually.
6. Point DNS for `knitwithandrew.com` at GitHub Pages.

The file `public/CNAME` already contains:

```txt
knitwithandrew.com
```

Because you are using a custom domain, the Astro config does not need a `base` path. If you ever deploy to `https://username.github.io/repo-name/` instead, add a `base: "/repo-name"` value in `astro.config.mjs`.

## Edit site details

Change links and copy in:

```txt
src/data/site.ts
```

Update these placeholder links:

- TikTok
- Ravelry
- Ko-fi
- Alpacora URL if needed

## Add posts

Create Markdown files in:

```txt
src/content/blog/
```

Example frontmatter:

```md
---
title: "My post title"
description: "Short summary for cards and SEO."
pubDate: 2026-06-02
tags: ["knitting", "tutorials"]
featured: true
type: "tutorial"
---
```

`type` can be `blog` or `tutorial`.

## Comments

This is a static site, so comments need a hosted/static-friendly service.

Giscus is already stubbed in:

```txt
src/components/Comments.astro
src/data/site.ts
```

To enable it:

1. Install/configure the Giscus GitHub app for your repo.
2. Fill in `repoId`, `category`, and `categoryId` in `src/data/site.ts`.
3. Set `enabled: true`.

## Instagram

This starter intentionally does not hard-code Instagram fetching. Add it later however you prefer: a build-time script, a static JSON export, or a client-side embed.

For GitHub Pages, do not put a private Instagram access token in browser code.

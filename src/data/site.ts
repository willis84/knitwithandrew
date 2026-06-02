export const site = {
  name: "Knit with Andrew",
  url: "https://knitwithandrew.com",
  domain: "knitwithandrew.com",
  title: "Knitting with Andrew — colourful knitting, guides, and pattern testing",
  titleTemplate: "%s — Knit with Andrew",
  description:
    "Knitting projects, knitting guides, pattern testing advice, and colourful maker notes from Andrew Willis in the UK.",
  author: "Andrew Willis",
  authorBio:
    "Andrew Willis is a UK-based knitter sharing colourful projects, practical knitting guides, design notes, and honest pattern testing advice.",
  locale: "en_GB",
  ogImage: "/og-default.svg",
  defaultOgImage: "/og-default.svg",
  primaryKeyword: "knitting",
  secondaryKeywords: ["knitting tutorials", "knitting patterns", "knitting blog", "knitting design", "pattern testing"],
  intro:
    "Hi, I'm Andrew, a UK-based knitter sharing colourful knitting projects, practical guides, and pattern testing advice.",
  newsletter: {
    enabled: true,
    provider: "buttondown",
    action: "https://buttondown.com/api/emails/embed-subscribe/knitwithandrew",
  },
  socials: {
    instagram: "https://www.instagram.com/knit.with.andrew/",
    tiktok: "https://www.tiktok.com/@knit.with.andrew",
    ravelry: "https://www.ravelry.com/people/knitwithandrew",
    kofi: "https://ko-fi.com/knitwithandrew",
  },
};

export type SocialIconName = "instagram" | "tiktok" | "ravelry" | "ko-fi";

export interface SocialLink {
  label: string;
  icon: SocialIconName;
  href: string;
  description: string;
}

export const links: SocialLink[] = [
  {
    label: "Instagram",
    icon: "instagram",
    href: "https://www.instagram.com/knit.with.andrew/",
    description: "Current knitting projects, experiments, and tester calls.",
  },
  {
    label: "TikTok",
    icon: "tiktok",
    href: "https://www.tiktok.com/@knit.with.andrew",
    description: "Short-form knitting progress clips and guides.",
  },
  {
    label: "Ravelry",
    icon: "ravelry",
    href: "https://www.ravelry.com/people/knitwithandrew",
    description: "Knitting projects, patterns, and fibre-craft profile.",
  },
  {
    label: "Ko-fi",
    icon: "ko-fi",
    href: "https://ko-fi.com/knitwithandrew",
    description: "Support the knitting, guides, and indie pattern work.",
  },
];

export const alpacora = {
  name: "Alpacora",
  href: "https://alpacora.com",
  strapline: "Pattern testing for designers and makers.",
  description:
    "Alpacora is a purpose-built platform for organising fibre-craft pattern tests: applications, tester progress, milestones, feedback, and project updates in one calmer place.",
};

// Static-friendly comment provider config. Leave enabled as false until you set up Giscus.
export const comments = {
  enabled: false,
  provider: "giscus",
  repo: "willis84/knitwithandrew.com",
  repoId: "",
  category: "Blog comments",
  categoryId: "",
};

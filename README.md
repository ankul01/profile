# ankul.co.in

Personal landing page and blog for Ankul Choudhry.

**Live site:** [ankul.co.in](https://ankul.co.in)

## Overview

This is the main entry point for my personal web presence, connecting to:
- [Engineering with Intent](https://ankul.co.in/engineering-with-intent/) — Architecture decisions and operating practices
- [Portfolio](https://portfolio.ankul.co.in) — Experience, projects, and case studies

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Content**: MDX for blog posts
- **Fonts**: [Geist](https://vercel.com/font)
- **Deployment**: GitHub Pages (Static Export)

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build

```bash
npm run build
```

The static output will be in the `out/` directory.

## Structure

```
app/
├── page.tsx           # Landing page
├── about/page.tsx     # About page
├── posts/             # Blog posts
│   ├── page.tsx       # Posts listing
│   └── [slug]/        # Individual posts
components/
├── CrossSiteNav.tsx   # Cross-site navigation
├── Header.tsx         # Site header
└── Footer.tsx         # Site footer
```

## Deployment

Deployed automatically via GitHub Actions on push to `main` branch.

## License

MIT

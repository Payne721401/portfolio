# Payne Yeh — Portfolio

Personal portfolio and blog built with Next.js 15, Tailwind CSS v4, and MDX.

---

## Features

- **Fully data-driven** — all personal content lives in `data/*.json`; no UI changes needed to update your info
- **Blog with MDX** — LaTeX math, syntax-highlighted code blocks, images, GFM tables, auto-categorization
- **Dark mode** — system-aware via `next-themes`, Tailwind v4 class strategy
- **Photo carousel** — hero section with multiple photos and custom crop positions
- **Attachment chips** — PDF / image lightbox / external link chips on experience, awards, activities
- **CV auto-compile** — edit `cv/cv.tex`, push, GitHub Actions compiles it and commits the PDF back
- **Dual deployment** — Vercel (primary) and GitHub Pages (backup) from the same codebase

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router, static export) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + `@tailwindcss/typography` |
| Animation | Framer Motion v12 |
| Blog | `next-mdx-remote` v6 + gray-matter + KaTeX |
| Icons | lucide-react + react-icons/si |
| Dark mode | next-themes |
| CV | pdfLaTeX via GitHub Actions |

## Getting Started

```bash
git clone https://github.com/Payne721401/portfolio.git
cd portfolio
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Customization

All personal data lives in `data/`. Edit JSON files — the UI updates automatically.

| File | Contents |
|---|---|
| `data/profile.json` | Name, bio, photos, links |
| `data/experience.json` | Work history with optional PDF attachments |
| `data/education.json` | Degrees, courses |
| `data/projects.json` | Side projects and research (`"category": "side" \| "academic"`) |
| `data/skills.json` | Grouped skills with auto-mapped icons |
| `data/awards.json` | Awards with optional image/PDF attachments |
| `data/certifications.json` | Certs with PDF links (empty array = section hidden) |
| `data/languages.json` | Language proficiency + test scores |
| `data/activities.json` | Clubs, sports, volunteer work |
| `data/hobbies.json` | Hobbies with optional attachments |
| `data/publications.json` | Publications (empty array = section hidden) |

### Adding a Blog Post

Create `content/blog/my-post.mdx`:

```mdx
---
title: "Post Title"
date: "2026-04-25"
category: "Tech"
tags: ["tag1", "tag2"]
summary: "One-line description for the listing page."
---

Content here. Supports LaTeX: $E = mc^2$, images, tables, and code blocks.
```

Categories are derived dynamically from posts — no config needed.

### Updating the CV

Edit `cv/cv.tex` and push. GitHub Actions compiles it with pdfLaTeX and commits `public/cv.pdf` back automatically.

Requires **Settings → Actions → General → Workflow permissions → Read and write**.

## Deployment

Connect the repo at [vercel.com](https://vercel.com) and deploy. No environment variables needed. Re-deploys on every push.

## Project Structure

```
├── app/                   # Next.js App Router pages
│   ├── page.tsx           # Home (all sections)
│   ├── layout.tsx         # Root layout
│   └── blog/              # Blog listing + post pages
├── components/
│   ├── sections/          # One component per portfolio section
│   └── AttachmentChips.tsx
├── content/blog/          # MDX blog posts
├── cv/cv.tex              # LaTeX CV source
├── data/                  # JSON content files
├── lib/mdx.ts             # Blog post utilities
└── public/
    ├── cv.pdf             # Auto-compiled
    ├── images/            # Hero photos (gitignored)
    └── awards/            # Certificates (gitignored)
```

## License

MIT
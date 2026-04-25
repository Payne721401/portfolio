# Portfolio – CLAUDE.md

Project context for Claude Code. Read this before making any changes.

---

## Project Overview

Personal portfolio website for **Payne Yeh (葉霈恩)**.
- Purpose: job seeking + academic activities
- Deployed on **Vercel** (primary); GitHub Pages and Cloudflare Pages also supported
- Repo: https://github.com/Payne721401/portfolio

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router, `output: "export"` in production) |
| Language | TypeScript throughout |
| Styling | Tailwind CSS **v4** with `@tailwindcss/postcss` (NOT v3 — syntax differs) |
| Dark mode | `next-themes` + `@variant dark (&:where(.dark, .dark *))` in globals.css |
| Animation | framer-motion v12 |
| Icons | lucide-react + react-icons/si (Simple Icons for tech logos) |
| Blog | MDX via `next-mdx-remote/rsc` v6 + gray-matter + remark-math + rehype-katex + remark-gfm |
| Fonts | Inter, Plus Jakarta Sans, JetBrains Mono (Google Fonts) |

---

## Critical Tailwind v4 Notes

- Import: `@import "tailwindcss"` (not `@tailwind base/components/utilities`)
- Plugin: `@plugin "@tailwindcss/typography"` (not `require(...)`)
- Dark mode: `@variant dark (&:where(.dark, .dark *));` in globals.css
- PostCSS config: `postcss.config.mjs` uses `"@tailwindcss/postcss": {}`
- If styles break in dev: restart `npm run dev` + hard refresh (Ctrl+Shift+R)

---

## Project Structure

```
portfolio/
├── app/
│   ├── globals.css              ← Tailwind import + dark mode variant + card shadows
│   ├── layout.tsx               ← ThemeProvider, Navbar, Footer, ambient glow divs
│   ├── page.tsx                 ← Section order: Hero→Education→Experience→Projects→
│   │                               Publications→Skills→Certifications→Languages→
│   │                               Awards→Activities→Hobbies→Contact
│   └── blog/
│       ├── page.tsx             ← Blog list with dynamic category filter (URL params)
│       └── [slug]/page.tsx      ← MDX post page (LaTeX, images, external links)
├── components/
│   ├── Navbar.tsx               ← "Payne Yeh" logo, /#section links, dark toggle
│   ├── SideNav.tsx              ← Fixed left nav, dynamically hides sections not in DOM
│   ├── Footer.tsx
│   ├── SectionHeading.tsx
│   ├── ThemeProvider.tsx
│   ├── AttachmentChips.tsx      ← Reusable PDF/image/link chips with lightbox
│   └── sections/
│       ├── Hero.tsx             ← Scrollable photo carousel + hover arrows
│       ├── Education.tsx
│       ├── Experience.tsx       ← job.logo monogram + job.attachments chips
│       ├── Projects.tsx         ← Split into "Side Projects" / "Academic Research" groups
│       ├── Publications.tsx     ← Returns null when empty (hidden from SideNav)
│       ├── Skills.tsx           ← react-icons/si tech icons via SKILL_ICONS map
│       ├── Certifications.tsx   ← Returns null when empty (hidden from SideNav)
│       ├── Languages.tsx        ← Proficiency dot indicators + optional TOEIC score
│       ├── Awards.tsx           ← Supports attachments chips
│       ├── Activities.tsx       ← Clubs, sports teams, volunteer; supports attachments chips
│       ├── Hobbies.tsx          ← Supports attachments chips
│       └── Contact.tsx
├── data/                        ← ⭐ ALL personal data lives here, never edit UI for data
│   ├── profile.json             ← name, title, bio, photos[], email, links
│   ├── education.json
│   ├── experience.json          ← supports logo, attachments[] per entry
│   ├── projects.json            ← supports category: "side" | "academic"
│   ├── skills.json
│   ├── awards.json              ← supports attachments[]
│   ├── certifications.json      ← has AI-900 & AZ-900; empty array → section auto-hides
│   ├── publications.json        ← empty array → section auto-hides
│   ├── languages.json           ← supports score field (TOEIC etc.)
│   ├── hobbies.json             ← supports attachments[]
│   └── activities.json          ← clubs, sports teams, volunteer; supports attachments[]
├── content/blog/                ← .mdx blog posts
├── public/
│   ├── cv.pdf                   ← compiled by GitHub Actions from cv/cv.tex
│   ├── awards/                  ← certificate PDFs and images (IN git)
│   └── images/                  ← hero carousel photos (IN git)
├── cv/
│   └── cv.tex                   ← LaTeX CV source (auto-compiled by GitHub Actions)
├── lib/
│   ├── mdx.ts                   ← getAllPosts, getPostBySlug, getAllPostSlugs; PostMeta has category field
│   └── utils.ts                 ← cn() helper
├── next.config.ts               ← output:export (production only), basePath conditional on DEPLOY_TARGET
├── postcss.config.mjs
├── README.md                    ← public-facing project documentation
├── .github/workflows/
│   ├── deploy.yml               ← GitHub Pages deployment
│   └── compile-cv.yml           ← LaTeX → public/cv.pdf auto-commit
└── .gitignore
```

---

## Data File Patterns

### Adding photos to Hero carousel
Edit `data/profile.json`:
```json
"photos": [
  { "src": "/images/photo.jpg", "position": "top center" },
  "/images/cycling.jpg"
]
```
- String = default center crop
- Object with `position` = custom `object-position` (use `"top center"` for portrait/face photos)

### Hiding a section from nav
Set the data file to an empty array `[]`. The component returns `null`, and SideNav
dynamically filters it out via `document.getElementById(id)` check on mount.
Currently hidden: Publications.

### AttachmentChips — adding PDF / image / link chips to any card
Supported in: `experience.json`, `awards.json`, `activities.json`, `hobbies.json`

```json
"attachments": [
  { "type": "pdf",   "label": "Certificate", "url": "/attachments/cert.pdf" },
  { "type": "image", "label": "Photo",       "url": "/awards/photo.jpg" },
  { "type": "link",  "label": "Instagram",   "url": "https://instagram.com/..." }
]
```
- `pdf` → opens in new tab
- `image` → opens fullscreen lightbox
- `link` → opens in new tab; label containing "instagram" auto-shows IG icon
- Files go in `public/awards/` or `public/attachments/` (URL = `/awards/file.jpg`)
- Empty `url` = chip hidden automatically

### Projects category split
In `data/projects.json`, each entry has `"category": "side"` or `"category": "academic"`.
`Projects.tsx` renders them in two groups with labels "Side Projects" / "Academic Research".

### Blog posts
Create `.mdx` files in `content/blog/`. Frontmatter fields:
```yaml
---
title: "Post Title"
date: "2026-04-25"       # YYYY-MM-DD, used for sorting (newest first)
category: "刷題"          # optional; auto-generates filter button on blog page
tags: ["tag1", "tag2"]
summary: "One-liner for listing page."
---
```
Supported in posts:
- LaTeX: `$inline$` and `$$block$$` via KaTeX
- Images: `![alt](/blog/image.png)` → Next.js Image component
- External links: auto-detected, open in new tab
- GFM: tables, strikethrough, autolinks, task lists

### Adding a skill icon
In `components/sections/Skills.tsx`, add to `SKILL_ICONS`:
```tsx
"SkillName": <SiIconName />,   // from react-icons/si
"SkillName": <Database size={14} />,  // from lucide-react for generics
```

---

## Development

```bash
# Start dev server (output:export disabled in dev for blog preview)
npm run dev
# → open http://localhost:3000

# Production build (test before deploying)
npm run build
```

### Windows PATH issue (Node.js installed via winget)
If `npm` not found, run once per session:
```powershell
$env:PATH = "C:\Program Files\nodejs;" + $env:PATH
```

---

## Deployment

### Vercel (primary — automatic)
- Connect repo at vercel.com → Import → Deploy
- No env vars needed. Re-deploys on every `git push`.
- `basePath` is empty for Vercel builds.

### GitHub Pages
- Repo → **Settings → Pages → Source: GitHub Actions** → Save
- Next push to main auto-deploys via `deploy.yml`
- `deploy.yml` sets `DEPLOY_TARGET=ghpages` → `next.config.ts` applies `basePath: "/portfolio"`
- URL: `https://payne721401.github.io/portfolio/`

### Cloudflare Pages
- Build command: `npm run build` | Output: `./out` | No env vars needed
- Treats basePath as empty (same as Vercel)

### LaTeX CV auto-compile
- Edit `cv/cv.tex` → push → GitHub Actions compiles → commits `public/cv.pdf` back
- Requires repo **Settings → Actions → General → Workflow permissions → Read and write**
- Uses pdfLaTeX; `%` must be escaped as `\%`, use `$\sim$` for tilde (~)

---

## Known Quirks & Fixes

| Issue | Fix |
|---|---|
| Tailwind styles disappear in dev | Restart `npm run dev` + Ctrl+Shift+R |
| SideNav overlaps content | Uses `left-[max(0.5rem,calc((100vw-74rem)/2))]` |
| Portrait photos cropped | Use `{ "src": "...", "position": "top center" }` in photos array |
| Clipboard error in preview | Next.js devtools bug in iframe, not user code, ignore |
| `next-mdx-remote` CVE | Fixed at v6.0.0+ |
| Navbar links from /blog page | All section links use `href="/#section"` format |
| JSON type error on AttachmentChips | Component uses `AnyAttachment` (type: string) internally; `Attachment` interface kept for docs |
| `git push` rejected | Remote has GitHub Actions auto-commits; use `git pull --rebase` then push |
| Blog posts not previewable in dev | Fixed: `next.config.ts` disables `output:export` in `NODE_ENV=development` |

---

## Migration Checklist (new computer)

- [ ] Install Node.js (winget: `winget install OpenJS.NodeJS`)
- [ ] Clone repo: `git clone https://github.com/Payne721401/portfolio.git`
- [ ] `cd portfolio && npm install`
- [ ] `npm run dev` → verify at localhost:3000
- [ ] Set git identity: `git config --global user.email "90727sam@gmail.com"` and `git config --global user.name "Payne Yeh"`
- [ ] Install Claude Code if continuing AI-assisted development

---

## Personal Info Reference

| Field | Value |
|---|---|
| Name | Payne Yeh (葉霈恩) |
| Email | 90727sam@gmail.com |
| GitHub | https://github.com/Payne721401 |
| LinkedIn | https://www.linkedin.com/in/payne-yeh-21362825b/ |
| Vercel URL | (set after first deploy) |
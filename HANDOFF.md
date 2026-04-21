# HANDOFF.md — Portfolio Project

> **For new Claude Code session:** Read this file + `CLAUDE.md` before doing anything.
> First command to run: `npm run dev` to verify everything works.

---

## What was completed in the last session

### Attachment system (AttachmentChips)
- New component `components/AttachmentChips.tsx` — renders chips for PDF, image, and external links
  - `pdf` → opens in new tab
  - `image` → opens fullscreen lightbox (click outside or × to close)
  - `link` → opens in new tab; `"Instagram"` label auto-shows IG icon (`react-icons/si`)
- Integrated into: `Awards.tsx`, `Activities.tsx`, `Hobbies.tsx`, `Experience.tsx`
- All four data files (`awards.json`, `activities.json`, `hobbies.json`, `experience.json`) have `"attachments": []` fields
- **TypeScript gotcha fixed**: JSON imports infer `type` as `string`, not `"pdf"|"image"|"link"`. Component uses internal `AnyAttachment` type to avoid build errors.

### Hero carousel arrows
- `Hero.tsx` now shows left/right chevron buttons on hover (desktop only, opacity-0 → opacity-100)
- Arrows cycle through photos and update the active dot indicator

### Projects section split
- `data/projects.json` each entry has `"category": "side"` or `"category": "academic"`
- `Projects.tsx` renders two labelled groups: **Side Projects** and **Academic Research**

### LaTeX CV updates (`cv/cv.tex`)
- Added `NCU Outstanding Student Scholarship` to Awards section
- Added `100% test coverage` bullet to Freelance entry
- Added HRV Sleep Stage Classification as a third project (condensed 2-bullet format)
- Slightly increased section/item spacing to fill the page

---

## Current state

- ✅ All changes committed and pushed to `main`
- ✅ Vercel auto-deploys on push (no env vars needed)
- ✅ GitHub Actions: `compile-cv.yml` compiles LaTeX on push to `cv/cv.tex`
- ⚠️ `public/images/` and `public/awards/` are **gitignored** — must copy manually

---

## Files NOT in the repo (must copy manually to new computer)

| Folder | Contents |
|---|---|
| `public/images/` | Hero carousel photos (avatar.jpg, cycling.jpg, contest1/2.jpg, running1/2.jpg, hiking1-4.jpg, marathon.jpg) |
| `public/awards/` | Certificate/award images (scholarship.jpg, sustainable.jpg, weather_hack.png, NSICC.jpg, proposal.jpg, NIAG.jpg, campus_run.jpg, cycling_club.jpg, paperboat1/2.jpg, ey_intern.jpg) |
| `public/activities/` | Activity PDFs (club_officer.pdf if it exists) |

---

## Known pending / next steps

- [ ] EY Internship Certificate PDF — currently has `url: ""` placeholder in `experience.json`; fill in once you have the PDF
- [ ] `public/activities/club_officer.pdf` — referenced in `activities.json` but file may not exist yet
- [ ] Blog section — `content/blog/` is empty; no posts written yet
- [ ] Vercel URL — update `CLAUDE.md` Personal Info table once confirmed
- [ ] GitHub Actions Node.js 20 deprecation warning — harmless until June 2026, update action versions then

---

## Restore commands on new computer

```powershell
# 1. Install Node.js
winget install OpenJS.NodeJS

# 2. Fix PATH (if npm not found)
$env:PATH = "C:\Program Files\nodejs;" + $env:PATH

# 3. Clone & install
git clone https://github.com/Payne721401/portfolio.git
cd portfolio
npm install

# 4. Set git identity
git config --global user.email "90727sam@gmail.com"
git config --global user.name "Payne Yeh"

# 5. Copy public/images/ and public/awards/ from old computer manually

# 6. Verify
npm run dev
```

---

## First prompt for new Claude Code session

```
我剛換了新電腦，已完成 clone + npm install + 複製 public/images 和 public/awards。
請閱讀 CLAUDE.md 和 HANDOFF.md 然後告訴我目前專案狀態，以及有什麼 pending 任務需要繼續。
```

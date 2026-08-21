# CLAUDE.md

Guidance for Claude Code (and other AI assistants) working in this repository.

## What this repo is

The public website of **Chief Designs** — a one-person Israeli design/development studio (Offir Oz).
It is a **static, hand-written HTML site**: no build step, no package manager, no framework,
no tests, no CI. Every page is a single self-contained `.html` file with its CSS in an inline
`<style>` block and its JS in inline `<script>` blocks at the bottom of `<body>`.

All user-facing content is **Hebrew, RTL** (`<html lang="he" dir="rtl">`). Keep it that way —
new copy must be written in Hebrew, and any layout you add must work right-to-left.

## Files

| File | Role |
| --- | --- |
| `index.html` | The main site (~1950 lines). Nav, hero, services, portfolio + filter + modal, about, contact form, cookie banner. This is where nearly all work happens. |
| `landing.html` | Standalone dark-theme landing page for the "Chief Bot" WhatsApp-bot product. Separate design system from `index.html`; converts via a WhatsApp deep link, not a form. |
| `message-formatter.html` | Unrelated standalone tool ("סדרן הודעות") built for a local protest campaign. Self-contained; not linked from the site. |
| `privacy.html`, `terms.html` | Legal pages, linked from the `index.html` footer. Self-contained styling. |
| `Chief Desings.png`, `Chief Desings Logo without text.png` | Logo source files (note the misspelling in the filenames — it is intentional/historic, don't "fix" it without checking references). |
| `README.md` | One line. Not maintained. |

There is deliberately **no** `package.json`, `node_modules`, config file, or `.github/` directory.
Don't introduce a toolchain unless explicitly asked.

## Running / previewing

```bash
python3 -m http.server 8000    # then open http://localhost:8000/index.html
```

Opening the file directly with `file://` mostly works, but the footer's root-absolute links
(`/privacy.html`, `/terms.html`) will not resolve. Use a server when checking navigation.

Deployment is GitHub Pages from `main`. The site is served at **chiefdesigns.co.il** and also at
`offiroz.github.io/ChiefDesigns/`. Pushing to `main` publishes; there is no staging environment.

## `index.html` architecture

Layout of the single file, in order:

1. `<head>` — Google Ads `gtag.js` (`AW-17466147922`), EmailJS browser SDK (CDN), Swiper 12 CSS (CDN).
2. `<style>` — the entire stylesheet (~1000 lines), plain CSS, no variables, no preprocessor.
3. `<body>` — `nav.navbar` → `#home` hero → `#services` → `#portfolio` → `#about` → `#contact` → `footer`.
4. First `<script>` — cookies/consent, Microsoft Clarity bootstrap, navbar scroll state, smooth scrolling, EmailJS contact form, `IntersectionObserver` reveal animations.
5. Modal + cookie-banner markup, then the Swiper CDN `<script>`.
6. Second `<script>` — the `projects` data array, the project modal (`openProject`), and the tag filter with its FLIP animation.

### The portfolio is dual-sourced — this is the most important convention

Portfolio data lives in **two places that must be kept in sync**:

- **Static card markup** inside `<div class="portfolio-grid">` — each card is
  `<div class="portfolio-item" data-index="N" onclick="openProject(N)">` with its own thumbnail
  `<img>`, `<h3>` and short `<p>`.
- **The `projects` JS array** in the second `<script>` — full `{ title, description, link, tags, images[] }`
  per project, used to populate the modal.

`data-index="N"` is the array index into `projects`. **They are linked by index only.**

Consequences you must respect:

- Adding a project means adding **both** an array entry **and** a card `<div>`, with matching index.
- **Grid order ≠ array order.** Cards are hand-ordered in the DOM for visual arrangement (currently
  the grid starts at `data-index="12"`, then 13, 11, 9, 10, 0, 1, …). To move a card in the grid,
  move the whole `<div>` — never renumber `data-index`, and never reorder the `projects` array to
  match, because that silently breaks every other card's index.
- The thumbnail in the card markup and `images[0]` in the array are separate strings. They are
  normally the same URL; if you change the primary image, change both.
- Currently **14 projects** (indices 0–13) and 14 cards.

### Images

All project imagery is hosted on **Cloudinary** (`res.cloudinary.com/dy4zfgrmu/image/upload/...`).
Nothing is stored in the repo except the logos. Hebrew filenames appear percent-encoded in URLs —
keep them encoded.

Note: a commit once added `f_auto,q_auto,w_600` optimization transforms to the grid thumbnails, and
the following commit (`119e562`) reverted them. Current URLs carry **no transforms**. If you
reintroduce them, apply them consistently and mention the earlier revert so the choice is deliberate.

### Project modal

`openProject(index)` fills `#modalTitle` / `#modalDesc`, shows `#modalLink` only when `link` is set
and not `"#"`, builds Swiper slides plus a thumbnail strip, then creates a **fresh Swiper instance
on every open** (the previous one is `destroy(true, true)`-ed first — don't try to reuse it).
Nav arrows and the thumbnail strip are hidden when a project has a single image.
Closes on the ✕ button, an overlay click (`closeProjectIfOutside`), or `Escape`.

### Tag filter

`ALL_TAGS` is a hardcoded array that drives the filter buttons; each project carries its own `tags`.
Filtering is OR-based across selected tags, with a "הצג הכל" reset button. Card tag chips are
injected at `DOMContentLoaded` by `renderCardTags()` — they are not in the markup.

`applyFilter()` is a deliberate three-phase FLIP animation: fade out departing cards → flip
`display` → measure and animate survivors from their old positions → fade in arrivals. Any running
animations are cancelled first, because overlapping animations previously caused cards to disappear
(fixed in `046593e`). If you touch this function, re-test rapid multi-tag clicking.

**Known inconsistency:** project 13 uses the tag `"ניהול סושיאל"`, which is *not* in `ALL_TAGS`, so
no button exists to filter by it. Either add it to `ALL_TAGS` or retag the project — but only when
asked; it is not currently breaking anything.

## Third-party services (all keys are public/client-side by design)

| Service | Where | Notes |
| --- | --- | --- |
| EmailJS | contact form in `index.html` | `emailjs.init("uv03BTW2wr3aHrJ8y")`, service `service_ar6pjpw`, template `template_t1xjeap`. Form fields are read **by their `placeholder` text** — changing a placeholder string breaks submission. |
| Google Ads gtag | `<head>` | `AW-17466147922`. Loads unconditionally. |
| Microsoft Clarity | `initializeClarityTracking()` | Project `ssi5g800j7`. **Only injected after cookie consent** (`cookie-consent=accepted`, 365-day cookie). Preserve this gating — the privacy policy depends on it. |
| Swiper 12 | CDN | Modal gallery. |
| Cloudinary | image URLs | Media CDN. |

## Known issues (documented, not fixed — leave alone unless asked)

- `showSuccessMessage` is **defined twice** in `index.html`. The second definition (which takes a
  `message` argument) shadows the first. `acceptCookies()` / `declineCookies()` still call it with
  no argument, so the toast renders the literal text `undefined`.
- Footer social links (`Facebook`, `Instagram`, `LinkedIn`, `Behance`) are `href="#"` placeholders.
- Several projects have `link: "#"` — the modal correctly hides the visit button for those.
- The nav and hero logos are hardcoded to absolute `https://offiroz.github.io/ChiefDesigns/...` URLs
  rather than relative paths.
- `/privacy.html` and `/terms.html` are root-absolute, so they resolve on `chiefdesigns.co.il` but
  break under the `offiroz.github.io/ChiefDesigns/` sub-path.
- `message-formatter.html` calls `https://api.anthropic.com/v1/messages` directly from the browser
  with no API key and no `anthropic-version` header. It cannot work as written (auth + CORS); it
  needs a server-side proxy. Treat the page as non-functional.

## Style conventions

- **CSS**: plain, inline, mobile-first-ish with `@media (max-width: 768px)` (and one `600px`)
  breakpoints. `index.html` uses literal hex colors — the brand palette is `#e75480` → `#de4f6e`
  (pink gradient) with `#c44569` accents and `#f8f9fa` section backgrounds. `landing.html` is the
  exception: it defines CSS custom properties in `:root` (`--pink`, `--orange`, `--deep`, …) on a
  dark background with the Heebo/Rubik Google Fonts. Follow whichever system the file you're editing
  already uses; don't unify them unprompted.
- **JS**: vanilla ES6+, no modules, no bundler. Global functions called from inline `onclick`
  handlers are the established pattern here — keep new handlers consistent rather than converting
  to `addEventListener` wholesale.
- **Comments**: existing comments are a mix of Hebrew and English. Either is fine; match the
  surrounding block.
- Keep each page self-contained. Do not extract shared CSS/JS into separate files unless asked —
  the single-file structure is intentional for this project.

## Git workflow

- `main` is the deployed branch; work happens on `claude/<short-description>` branches merged via PR.
- Commit messages are short and mixed English/Hebrew, occasionally with a `fix:` / `perf:` prefix.
  Match the existing style; describe the visible change ("add alkaa portfolio cards").
- There is no linter, formatter, or test suite. Verification means **loading the page in a browser**
  and exercising the thing you changed — for portfolio edits that means: card renders, correct modal
  opens, gallery arrows work, and the tag filter still shows/hides it correctly.

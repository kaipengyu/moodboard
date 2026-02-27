# Moodboard Page Prompt Template

Use this prompt (or adapt it) to generate a polished, interactive single-page moodboard for any brand or project.

---

## The Prompt

> Create a single-page design moodboard for **[Brand Name]** as three separate files: `moodboard.html`, `moodboard.css`, and `moodboard.js`. Use only HTML, CSS, and JavaScript — no frameworks or build tools required.
>
> **Reference materials:**
> - Brand PDF or guidelines: `[path/to/file.pdf]`
> - Logo file (SVG or PNG preferred — used to eyedropper exact brand hex values): `[path/to/logo.svg]`
> - Inspiration websites (list 3–5 URLs you love the feel of)
> - Any screenshots of specific UI patterns you like (attach as images)
>
> **Design direction:**
> [Describe the aesthetic in a few words — e.g. "editorial and cinematic", "minimal luxury", "bold and playful", "clean enterprise SaaS"]
>
> **Page structure — include these sections with a sticky sidebar nav:**
> 1. Brand Overview — hero with name, mission, typeface/color specs
> 2. Color Palette — brand swatches with hex values and usage notes, neutral scale
> 3. Typography — two-typeface specimen panels, full heading/body scale, pull-quote
> 4. Navigation — show 2–3 nav patterns (transparent hero, scrolled/white, optional overlay)
> 5. Heroes — full-bleed editorial hero and a split-layout hero with stats
> 6. Cards — news/story grid, featured editorial card, stat data band
> 7. Callouts — big-type statement, split image/text, story strip, dark mission block
> 8. UI & Forms — button system (light + dark surfaces), contact form, alert states, newsletter
>
> **Libraries to use:**
> - GSAP 3 + ScrollTrigger for scroll animations
> - Lenis for smooth scroll
> - Load both from CDN
>
> **Animations to include:**
> - Lenis smooth scroll feeding GSAP ScrollTrigger
> - Reading progress bar at the top
> - Sidebar active state updates on scroll (use scroll-position method, not IntersectionObserver)
> - Line-mask title reveal on the overview hero (on page load)
> - Scroll-triggered fade-up / stagger reveals for each section
> - Parallax on hero backgrounds
> - Count-up animation for stat numbers
> - Swatch hover expand, button micro-hover scale, subtle arrow nudges on links
>
> **Typography:**
> - One serif for display/headlines (editorial weight) — suggest a Google Font pairing
> - One sans-serif for body/UI — clean geometric or humanist
> - Load both from Google Fonts
>
> **Images:**
> Use real photos in the `images/` folder. Reference them as `images/example-image1.jpeg`, `images/example-image2.jpeg`, etc. Use them in the imagery collage, hero backgrounds, mega menu stories, and card thumbnails. Only fall back to CSS gradient `div`s if no images are provided.
>
> **Color palette:**
> Extract brand colors by eyedropping directly from the provided logo SVG or PNG — do not guess from a PDF description. Build a palette of the exact brand colors + a 7-step neutral scale. For each color, note its semantic role (Primary, Accent, Secondary, etc.).
>
> **Contrast:**
> Ensure all text passes WCAG AA contrast. Specifically: do not place white text on light-colored backgrounds (e.g. a light blue or lavender). Use the primary dark color (navy, ink, etc.) as text color on any light brand color background.
>
> **Responsive design — required, not optional:**
>
> The moodboard must work at desktop (>1024px), tablet (≤1024px), and mobile (≤768px).
>
> *HTML additions needed in `moodboard.html`:*
> - A `.mobile-bar` div at the very top of `<body>` containing a `#menuToggle` hamburger button, the brand logo, and a spacer. Hidden by default (`display:none`), shown on tablet/mobile via media query.
> - A `.sidebar-overlay` div (dark translucent overlay) immediately after the mobile bar, for tapping outside to close the drawer.
>
> *CSS breakpoints needed in `moodboard.css`:*
> - `@media (max-width: 1024px)` — tablet:
>   - Show `.mobile-bar`, enable `.sidebar-overlay`
>   - Convert sidebar to a slide-in drawer (`transform: translateX(-100%)` → `translateX(0)` when `.sidebar-open` on body)
>   - Set `main` to `margin-left: 0; padding-top: 56px`
>   - Stack hero-B to single column, collapse 3-col card grids to 2-col, stack feat-card, 2×2 stat band, collapse mega-menu to single column, hide overlay-feature panel
>   - Stack type-faces and type-scale-grid to single column
> - `@media (max-width: 768px)` — mobile:
>   - Tighter section padding (20px horizontal)
>   - Hide `.snav-links` in the nav demo bars
>   - Collapse everything to single column (cards, callouts, stories, UI grid)
>   - Imagery collage: stack row1 vertically, row2 as 2-col
>   - Full-width `.co-forest-pill` elements
>
> *JS additions needed in `moodboard.js`:*
> - Mobile sidebar toggle: `#menuToggle` click toggles `sidebar-open` on `document.body`, calling `lenis.stop()` on open and `lenis.start()` on close.
> - Clicking `.sidebar-overlay` closes the drawer.
> - Clicking any `.sb-link` also closes the drawer (so scroll navigation works on mobile).

---

## Tips for Better Results

- **Attach the logo file** (SVG preferred) so exact brand hex values can be eyedropped — do not rely on color descriptions in PDFs.
- **Attach screenshots** of nav styles, card layouts, or callout boxes you like — Claude will match the pattern directly.
- **Name the feeling**, not just the category. "Oura-dark with National Parks editorial warmth" is more useful than "modern website."
- **Specify what's off-limits** — e.g. "no rounded corners", "no drop shadows", "no blue gradients."
- **Mention the audience** — government utility, luxury brand, nonprofit, SaaS — this shapes tone and typographic choices.
- If the first pass feels too corporate or too safe, say: *"This feels too [old-fashioned / safe / trendy] — push it further toward [reference site]."*

---

## File Output Checklist

After generation, verify:
- [ ] `moodboard.html` links to `moodboard.css` and `moodboard.js`
- [ ] Google Fonts `<link>` is in the `<head>`
- [ ] GSAP, ScrollTrigger, and Lenis loaded from CDN before `moodboard.js`
- [ ] Sidebar scroll-tracking uses `lenis.on('scroll', ...)` not `IntersectionObserver`
- [ ] All sections have an `id` matching the sidebar `data-section` attribute
- [ ] `.mobile-bar` and `.sidebar-overlay` are present in the HTML
- [ ] Mobile sidebar JS (toggle, overlay click, sb-link click, lenis stop/start) is in `moodboard.js`
- [ ] Resize browser to 768px — sidebar collapses to a hamburger drawer, all grids stack to single column
- [ ] No white text on light-colored brand backgrounds (check buttons and CTAs especially)
- [ ] Brand colors match the actual logo file (not an approximation from a PDF description)
- [ ] Open in browser and scroll through all 8 sections to confirm animations fire

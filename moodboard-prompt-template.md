# Moodboard Page Prompt Template

Use this prompt (or adapt it) to generate a polished, interactive single-page moodboard for any brand or project.

---

## The Prompt

> Create a single-page design moodboard for **[Brand Name]** as three separate files: `moodboard.html`, `moodboard.css`, and `moodboard.js`. Use only HTML, CSS, and JavaScript — no frameworks or build tools required.
>
> **Reference materials:**
> - Brand PDF or guidelines: `[path/to/file.pdf]`
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
> **Image placeholders:**
> Since this is a static moodboard, use CSS gradient `div`s styled with the brand color palette instead of real photos.
>
> **Color palette source:**
> Extract colors from the provided PDF/brand materials. Build a palette of 5–6 brand colors + a 7-step neutral scale.

---

## Tips for Better Results

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
- [ ] Open in browser and scroll through all 8 sections to confirm animations fire

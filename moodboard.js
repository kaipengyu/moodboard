/* ════════════════════════════════════════════════════════════════
   AlexRenew — Design Moodboard 2025
   Interactions & Animations
   ════════════════════════════════════════════════════════════════ */

/* ─── Lenis Smooth Scroll ───────────────────────────────────────── */
const lenis = new Lenis({
  duration: 1.1,
  easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  wheelMultiplier: 0.85,
});

function rafLoop(time) {
  lenis.raf(time);
  requestAnimationFrame(rafLoop);
}
requestAnimationFrame(rafLoop);

// Feed Lenis time into GSAP ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.lagSmoothing(0);

/* ─── Progress Bar ─────────────────────────────────────────────── */
const progressFill = document.getElementById('progressFill');
lenis.on('scroll', ({ progress }) => {
  progressFill.style.width = (progress * 100) + '%';
});

/* ─── Sidebar Active State ─────────────────────────────────────── */
const sections = document.querySelectorAll('.section[id]');
const sbLinks  = document.querySelectorAll('.sb-link[data-section]');

function updateActiveSidebar() {
  const scrollY = window.scrollY;
  let current = sections[0].id;

  sections.forEach(section => {
    if (scrollY >= section.offsetTop - window.innerHeight * 0.35) {
      current = section.id;
    }
  });

  sbLinks.forEach(link => {
    link.classList.toggle('is-active', link.dataset.section === current);
  });
}

lenis.on('scroll', updateActiveSidebar);
updateActiveSidebar();

/* ─── Sidebar smooth-scroll clicks ────────────────────────────── */
sbLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) lenis.scrollTo(target, { offset: -20, duration: 1.2 });
  });
});

/* ─── GSAP: Register ScrollTrigger ────────────────────────────── */
gsap.registerPlugin(ScrollTrigger);

/* ─── Overview hero: onboarding sequence + parallax ────────────── */
const ovLines = gsap.utils.toArray('#overview .line-mask span');

// Set initial states before first paint
gsap.set('#overview .ov-bg',     { opacity: 0, scale: 1.07 });
gsap.set('#overview .ov-eyebrow',{ opacity: 0, x: -28 });
if (ovLines.length) gsap.set(ovLines, { y: '105%' });
gsap.set('#overview .ov-body',   { opacity: 0, y: 24 });
gsap.set('#overview .ov-meta',   { opacity: 0, y: 18 });

// Entrance timeline
const ovTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
ovTl
  // 1. Image fades + scales in
  .to('#overview .ov-bg',     { opacity: 1, scale: 1, duration: 2.0, ease: 'power2.out' }, 0)
  // 2. Eyebrow slides in from the left
  .to('#overview .ov-eyebrow',{ opacity: 1, x: 0, duration: 0.65 }, 0.55)
  // 3. Title lines unmask
  .to(ovLines,                { y: '0%', duration: 1.1, stagger: 0.12, ease: 'power4.out' }, 0.85)
  // 4. Body copy
  .to('#overview .ov-body',   { opacity: 1, y: 0, duration: 1.0 }, 1.35)
  // 5. Meta strip
  .to('#overview .ov-meta',   { opacity: 1, y: 0, duration: 0.9 }, 1.60);

// Scroll parallax — image drifts at a slower rate than the page
gsap.fromTo('#overview .ov-bg',
  { yPercent: -8 },
  {
    yPercent: 8,
    ease: 'none',
    scrollTrigger: {
      trigger: '#overview',
      start: 'top top',
      end: 'bottom top',
      scrub: 1.8,
    }
  }
);

/* ─── Generic section fade-up ──────────────────────────────────── */
function fadeUp(selector, options = {}) {
  gsap.utils.toArray(selector).forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, y: options.y ?? 36 },
      {
        opacity: 1,
        y: 0,
        duration: options.duration ?? 0.9,
        ease: options.ease ?? 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          once: true,
        },
        ...( options.delay ? { delay: options.delay } : {} ),
      }
    );
  });
}

/* Section eyebrows + headings */
fadeUp('.sec-eyebrow, .colors-h2, .colors-sub', { y: 24, duration: 0.8 });

/* ─── Color swatches stagger ────────────────────────────────────── */
ScrollTrigger.create({
  trigger: '#colors .palette-brand',
  start: 'top 82%',
  once: true,
  onEnter: () => {
    gsap.fromTo('#colors .sw',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.07, ease: 'power3.out' }
    );
  }
});

ScrollTrigger.create({
  trigger: '#colors .palette-neutrals',
  start: 'top 88%',
  once: true,
  onEnter: () => {
    gsap.fromTo('#colors .palette-neutrals > div',
      { opacity: 0, scaleY: 0, transformOrigin: 'bottom' },
      { opacity: 1, scaleY: 1, duration: 0.5, stagger: 0.05, ease: 'power2.out' }
    );
  }
});

/* ─── Typography panels ─────────────────────────────────────────── */
ScrollTrigger.create({
  trigger: '.type-faces',
  start: 'top 80%',
  once: true,
  onEnter: () => {
    gsap.fromTo('.tf-panel',
      { opacity: 0, x: (i) => i === 0 ? -30 : 30 },
      { opacity: 1, x: 0, duration: 1, stagger: 0.15, ease: 'power3.out' }
    );
  }
});

ScrollTrigger.create({
  trigger: '.type-quote',
  start: 'top 82%',
  once: true,
  onEnter: () => {
    gsap.fromTo('.type-quote',
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    );
    gsap.fromTo('.tq-text, .tq-cite',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.9, stagger: 0.2, delay: 0.25, ease: 'power3.out' }
    );
  }
});

/* ─── Imagery collage stagger ───────────────────────────────────── */
ScrollTrigger.create({
  trigger: '.img-collage',
  start: 'top 82%',
  once: true,
  onEnter: () => {
    gsap.fromTo('.img-coll-item',
      { opacity: 0, scale: 0.97 },
      { opacity: 1, scale: 1, duration: 0.75, stagger: 0.07, ease: 'power3.out' }
    );
  }
});

ScrollTrigger.create({
  trigger: '.img-style-notes',
  start: 'top 88%',
  once: true,
  onEnter: () => {
    gsap.fromTo('.img-note',
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.65, stagger: 0.09, ease: 'power3.out' }
    );
  }
});

/* ─── Navigation demos slide in ─────────────────────────────────── */
gsap.utils.toArray('.snav-hero-bar, .snav-white-bar, .mega-panel, .overlay-nav').forEach((el, i) => {
  gsap.fromTo(el,
    { opacity: 0, y: 20 },
    {
      opacity: 1, y: 0,
      duration: 0.7,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    }
  );
});

/* ─── Heroes parallax ───────────────────────────────────────────── */
gsap.utils.toArray('.hero-a-bg, .hero-b-bg').forEach(bg => {
  gsap.fromTo(bg,
    { yPercent: -12 },
    {
      yPercent: 12,
      ease: 'none',
      scrollTrigger: {
        trigger: bg.closest('.hero-a, .hero-b'),
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.8,
      }
    }
  );
});

/* Hero content fade in */
ScrollTrigger.create({
  trigger: '.hero-a',
  start: 'top 78%',
  once: true,
  onEnter: () => {
    gsap.fromTo('.hero-a-tag', { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out' });
    gsap.fromTo('.hero-a-title', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, delay: 0.15, ease: 'power3.out' });
    gsap.fromTo('.hero-a-sub', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.9, delay: 0.35, ease: 'power3.out' });
    gsap.fromTo('.hero-a-btns', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.5, ease: 'power3.out' });
  }
});

ScrollTrigger.create({
  trigger: '.hero-b',
  start: 'top 78%',
  once: true,
  onEnter: () => {
    gsap.fromTo('.hero-b-title, .hero-b-body', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out' });
    gsap.fromTo('.hstat-num', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, delay: 0.2, ease: 'power3.out' });
  }
});

/* ─── Cards stagger ──────────────────────────────────────────────── */
ScrollTrigger.create({
  trigger: '.c3-grid',
  start: 'top 82%',
  once: true,
  onEnter: () => {
    gsap.fromTo('.nc',
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out' }
    );
  }
});

ScrollTrigger.create({
  trigger: '.feat-card',
  start: 'top 82%',
  once: true,
  onEnter: () => {
    gsap.fromTo('.feat-card',
      { opacity: 0, y: 32 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    );
  }
});

ScrollTrigger.create({
  trigger: '.stat-band',
  start: 'top 85%',
  once: true,
  onEnter: () => {
    gsap.fromTo('.sc',
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.65, stagger: 0.08, ease: 'power3.out' }
    );
    /* Count-up effect for stat numbers */
    document.querySelectorAll('.sc-num').forEach(el => {
      const raw = el.textContent.trim();
      const num = parseFloat(raw.replace(/[^0-9.]/g, ''));
      const suffix = raw.replace(/[0-9.]/g, '');
      if (!isNaN(num)) {
        gsap.fromTo({ val: 0 },
          { val: num },
          {
            duration: 1.6,
            ease: 'power2.out',
            delay: 0.3,
            onUpdate: function() {
              const v = this.targets()[0].val;
              el.textContent = (num >= 100
                ? Math.round(v)
                : v.toFixed(num < 10 ? 1 : 0)) + suffix;
            }
          }
        );
      }
    });
  }
});

/* ─── Callouts ───────────────────────────────────────────────────── */
ScrollTrigger.create({
  trigger: '.co-type',
  start: 'top 80%',
  once: true,
  onEnter: () => {
    gsap.fromTo('.co-type-bg', { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 1.4, ease: 'power3.out' });
    gsap.fromTo('.co-type-eye, .co-type-title, .co-type-sub', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out', delay: 0.2 });
  }
});

ScrollTrigger.create({
  trigger: '.co-split',
  start: 'top 80%',
  once: true,
  onEnter: () => {
    gsap.fromTo('.co-split-img', { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 1, ease: 'power3.out' });
    gsap.fromTo('.co-split-text', { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 1, ease: 'power3.out', delay: 0.1 });
  }
});

ScrollTrigger.create({
  trigger: '.co-strip',
  start: 'top 82%',
  once: true,
  onEnter: () => {
    gsap.fromTo('.story-card', { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 0.75, stagger: 0.1, ease: 'power3.out' });
  }
});

ScrollTrigger.create({
  trigger: '.co-forest',
  start: 'top 82%',
  once: true,
  onEnter: () => {
    gsap.fromTo('.co-forest-tag, .co-forest-title', { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out' });
    gsap.fromTo('.co-forest-pill', { opacity: 0, y: 20, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.1, delay: 0.3, ease: 'power3.out' });
  }
});

/* ─── UI panels ─────────────────────────────────────────────────── */
ScrollTrigger.create({
  trigger: '#ui .ui-grid',
  start: 'top 82%',
  once: true,
  onEnter: () => {
    gsap.fromTo('#ui .ui-panel, #ui .alert-demos',
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
    );
  }
});

/* ─── Button micro-hover enhancements ──────────────────────────── */
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mouseenter', () => {
    gsap.to(btn, { scale: 1.025, duration: 0.2, ease: 'power2.out' });
  });
  btn.addEventListener('mouseleave', () => {
    gsap.to(btn, { scale: 1, duration: 0.25, ease: 'power2.out' });
  });
});

/* ─── Swatch hover: card lift + bar grow (contained within each .sw) ── */
document.querySelectorAll('.sw').forEach(sw => {
  const bar = sw.querySelector('.sw-bar');
  sw.addEventListener('mouseenter', () => {
    gsap.to(bar, { height: 130, duration: 0.28, ease: 'power2.out' });
    gsap.to(sw, { y: -7, boxShadow: '0 14px 32px rgba(0,0,0,.18)', duration: 0.28, ease: 'power2.out' });
  });
  sw.addEventListener('mouseleave', () => {
    gsap.to(bar, { height: 110, duration: 0.28, ease: 'power2.out' });
    gsap.to(sw, { y: 0, boxShadow: '0 0px 0px rgba(0,0,0,0)', duration: 0.28, ease: 'power2.out' });
  });
});

/* ─── Mega menu link arrow hover ────────────────────────────────── */
document.querySelectorAll('.mega-col a').forEach(a => {
  a.addEventListener('mouseenter', () => {
    const arrow = a.querySelector('span');
    if (arrow) gsap.to(arrow, { x: 4, duration: 0.2, ease: 'power2.out' });
  });
  a.addEventListener('mouseleave', () => {
    const arrow = a.querySelector('span');
    if (arrow) gsap.to(arrow, { x: 0, duration: 0.2, ease: 'power2.out' });
  });
});

/* ─── Overlay nav link hover ────────────────────────────────────── */
document.querySelectorAll('.overlay-primary a').forEach(a => {
  a.addEventListener('mouseenter', () => gsap.to(a, { x: 10, duration: 0.25, ease: 'power2.out' }));
  a.addEventListener('mouseleave', () => gsap.to(a, { x: 0, duration: 0.25, ease: 'power2.out' }));
});

/* ─── Mobile sidebar toggle ─────────────────────────────────────── */
const menuToggle = document.getElementById('menuToggle');
const sidebarOverlay = document.getElementById('sidebarOverlay');

function openSidebar() {
  document.body.classList.add('sidebar-open');
  lenis.stop();
}
function closeSidebar() {
  document.body.classList.remove('sidebar-open');
  lenis.start();
}

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    document.body.classList.contains('sidebar-open') ? closeSidebar() : openSidebar();
  });
  sidebarOverlay.addEventListener('click', closeSidebar);
  document.querySelectorAll('.sb-link').forEach(link => {
    link.addEventListener('click', closeSidebar);
  });
}

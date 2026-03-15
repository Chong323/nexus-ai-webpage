# Nason Solar Website Optimization Plan

## Context

Nason Solar's website currently reads as a SaaS template with CSS-generated visuals (no real photography), emoji certification badges, and generic animations. Compared to competitors like SolarMax (full-width hero imagery, case studies, pricing hooks), Base Power (lifestyle photography, testimonial carousels, media marquees, interactive calculators), and Baker Electric, the site lacks visual richness, trust signals, and conversion optimization. This plan transforms it into a premium, conversion-focused solar EPC website while preserving the existing bilingual (EN/ZH) architecture.

The user will provide real photos/videos later — all image slots will have styled placeholders.

---

## Phase 1: Highest-Impact Changes (Do First)

### 1.1 Hero Section Overhaul — `src/components/Hero.tsx`
- **Remove** the `SolarVisual` CSS mockup entirely
- **Full-width layout**: Replace two-column grid with a single centered column over a full-bleed background
  - Background: `<video>` with `<Image>` fallback, absolute-positioned with `object-cover`
  - Dark gradient overlay for text readability
  - Temporary placeholder: atmospheric CSS gradient (sunset amber → deep navy)
- **Center-aligned content** (max-w-3xl mx-auto text-center): badge → heading (text-6xl/7xl/8xl fluid) → subtitle → pricing hook badge ("$0 down") → two CTAs
- **Stats bar**: Full-width glass strip at hero bottom with 4 stats + count-up animation (`useMotionValue` + `animate`)
- **Coordinated entrance animation**: background (0-0.3s) → badge (0.3s) → title (0.5s) → subtitle (1.0s) → CTAs (1.3s) → stats count-up (1.5s)
- **New i18n key**: `hero.pricingHook`

### 1.2 Navbar Enhancement — `src/components/Navbar.tsx`
- **Active section indicator**: `IntersectionObserver` tracks visible section, highlights nav link with a sliding amber underline (`motion.div` with `layoutId`)
- **Phone number on desktop**: `(626) 559-0000` with Phone icon, left of language toggle
- **Mobile menu**: Add tappable phone link + "Call Now" button alongside "Get Free Quote"
- **Logo slot**: Prepare `<Image>` component for real SVG logo, fallback to current Sun icon

### 1.3 Certifications → Partners Marquee — `src/components/Certifications.tsx`
- **Replace emoji** (⚡☀🏅📋✓) with rectangular logo placeholder containers (120x50px, `bg-muted/20` + text label)
- **Auto-scrolling marquee**: CSS `@keyframes` translateX animation on duplicated list, pause on hover
- **Grayscale → color on hover** for logo images

### 1.4 Sticky Mobile CTA Bar (NEW) — `src/components/StickyMobileCTA.tsx`
- Fixed bottom bar, `md:hidden`, appears after scrolling past Hero
- Two buttons: "Call Now" (phone icon) + "Free Quote" (arrow icon)
- Glass background + safe-area padding for notched phones

---

## Phase 2: Section-by-Section Polish

### 2.1 Features — `src/components/Features.tsx`
- **Unify card colors**: Replace 6 pastel accents (amber/sky/emerald/violet/orange/cyan) with consistent brand palette (amber icons, `bg-primary/10` backgrounds)
- **Add image placeholder slot** (16:9 aspect-ratio div) above each card's icon/title
- **"Learn more →"** link on hover, linking to `#contact` with pre-selected project type

### 2.2 Products/"Why Choose Us" — `src/components/Products.tsx`
- **Replace `BlockVisual`** with image placeholder containers (`aspect-[4/3] bg-muted/20` + Camera icon)
  - Block 1: crew on roof / Block 2: founder+flag / Block 3: Powerwall install
- **Fix i18n bugs**: Hard-coded English at lines 55, 81, 96-97, 105, 191 — move all to locale files
- **Subtle parallax** on images using `useScroll` + `useTransform`

### 2.3 Process — `src/components/Process.tsx`
- **Timeline layout**: Vertical on mobile (line on left, cards right), horizontal on desktop
- **Scroll-driven line fill**: As each step enters viewport, the connecting line fills with amber using `useScroll` + `scaleX`/`scaleY`
- **Larger step circles** (w-14 h-14) with pulsing ring on hover
- **End CTA**: "Ready to start? Get your free quote today"

### 2.4 Testimonials — `src/components/Testimonials.tsx`
- **Fix bug**: Line 130 `testimonials.map((t, i)` shadows `t` from `useTranslation()` → rename to `testimonial`
- **Move testimonial data** into en.json/zh.json for bilingual support
- **Carousel**: Show 3 cards (desktop) / 1 (mobile) with drag navigation + dot indicators + slight card rotation (±1-2deg, Base Power style)
- **Google rating badge**: "4.9/5 on Google" with stars above the carousel
- **Avatar image slots**: `<Image>` with fallback to current initials circle
- **Remove duplicate cert badges strip** (lines 111-126)

### 2.5 Pricing/Quote — `src/components/Pricing.tsx` + `src/components/QuoteForm.tsx`
- **Fix i18n**: "Or reach us directly" (line 71) not using `t()`
- **Form field animations**: Stagger fade-in on scroll
- **"Schedule a Call"** secondary button below form submit
- **Response time indicator**: "We respond within 2 hours" with clock icon

---

## Phase 3: New Sections

### 3.1 FAQ Accordion (NEW) — `src/components/FAQ.tsx`
- 8-10 solar FAQs (cost, timeline, warranties, financing, NEM 3.0, battery)
- Framer Motion `AnimatePresence` for smooth expand/collapse
- ChevronDown rotation on toggle
- Two-column on desktop, single on mobile
- All strings in locale files
- **Position**: After Testimonials, before Pricing

### 3.2 Project Gallery (NEW) — `src/components/ProjectGallery.tsx`
- Filterable grid: Residential | Commercial | Battery | Carport tabs
- 3-column responsive grid with photo placeholders
- Hover overlay with project specs (system size, location, savings)
- Lightbox modal on click (Framer Motion portal)
- **Position**: After Process, before Testimonials

### 3.3 Savings Calculator (NEW) — `src/components/SavingsCalculator.tsx`
- Embedded in the Pricing section (left column)
- Range slider for monthly electric bill ($50–$1000)
- Animated outputs: estimated system size, monthly savings, 25-year savings, CO2 offset
- CTA: "Get Your Exact Savings →" linking to quote form

### New section order in `page.tsx`:
```
Navbar → Hero → PartnersMarquee → Features → Products → Process →
ProjectGallery → Testimonials → FAQ → Pricing (with Calculator) →
Footer → ChatBot → StickyMobileCTA
```

---

## Phase 4: Global Polish & Animations

### 4.1 Global Styles — `src/app/globals.css`
- **Section dividers**: CSS `clip-path` wave/angle transitions between sections
- **Fluid typography**: `clamp()` for headings instead of breakpoint jumps
- **Noise texture overlay**: Subtle grain on dark sections for depth
- **Button hover shimmer**: CSS pseudo-element sweep effect on primary CTAs
- **Animated gradient**: `background-size: 200%` with keyframe shift for accent sections

### 4.2 Animation Diversity
- Replace uniform fadeUp pattern across all sections with varied entrances:
  - Features: staggered scale-in (scale 0.9 → 1)
  - Process: line-drawing synced to scroll
  - Testimonials: slide from alternating sides
- Add `useReducedMotion` check for accessibility

### 4.3 Micro-Interactions
- Card hover: border color → `primary/40`, inner glow, icon scale-up
- Nav links: underline slides in left-to-right on hover
- Form inputs: amber glow ring on focus, checkmark on valid

---

## Bugs to Fix (Found During Audit)

| Bug | File | Line(s) |
|-----|------|---------|
| Variable `t` shadowed in map callback | Testimonials.tsx | 130 |
| Hard-coded English "Get a Free Quote" | Products.tsx | 191 |
| Hard-coded English in BlockVisual | Products.tsx | 55, 81, 96-97, 105 |
| Hard-coded "Or reach us directly" | Pricing.tsx | 71 |
| Testimonial data not translatable | Testimonials.tsx | 8-69 |
| Unused `@anthropic-ai/sdk` dependency | package.json | 12 |

---

## Photography/Video Needed from Client

| Asset | Component | Specs | Priority |
|-------|-----------|-------|----------|
| Hero background video (drone aerial of install) | Hero.tsx | 1920x1080 MP4, 10-15s loop | P0 |
| Hero fallback image | Hero.tsx | 1920x1080 JPG | P0 |
| Company logo SVG | Navbar, Footer | SVG, transparent bg | P0 |
| Cert logos (Tesla, Enphase, NABCEP, BBB, CSLB) | Certifications | SVG/PNG ~120x50 | P1 |
| Team on roof photo | Products block 1 | 800x600 JPG | P1 |
| Founder/veteran photo | Products block 2 | 800x600 JPG | P1 |
| Powerwall install photo | Products block 3 | 800x600 JPG | P1 |
| Service photos (residential, commercial, battery, EV, carport, farm) | Features, Gallery | 800x450 JPG each | P1 |
| Customer headshots (6) | Testimonials | 200x200 JPG | P2 |
| Project gallery photos (8-12) | ProjectGallery | 800x600 JPG each | P2 |
| OG social share image | layout.tsx | 1200x630 JPG | P2 |

All image slots will use styled gradient placeholders with Camera icon until real assets are provided.

---

## Verification Plan

1. `npm run build` — ensure no TypeScript/build errors after each batch
2. Visual check all sections in Chrome DevTools at 375px (mobile), 768px (tablet), 1440px (desktop)
3. Test EN↔ZH toggle on every section — verify no hard-coded English remains
4. Test all interactive elements: marquee, carousel arrows, FAQ accordion, calculator slider, form submission
5. Check `prefers-reduced-motion` — animations should be disabled
6. Lighthouse audit: Performance > 90, Accessibility > 95
7. Test sticky mobile CTA bar appears/hides correctly on scroll

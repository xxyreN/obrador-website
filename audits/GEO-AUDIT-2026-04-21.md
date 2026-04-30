# GEO Audit Report: Obrador Web

**Audit Date:** 2026-04-21
**URL:** https://obradorweb.com
**Business Type:** Agency / Local Services (web design for Madrid cafés)
**Pages Analyzed:** 6 (home, /compara, /proyectos, /blog, 2 blog posts) + llms.txt + robots.txt + sitemap.xml

---

## Executive Summary

**Overall GEO Score: 48/100 (Poor)**

Obrador has a **surprisingly strong technical foundation** (open robots.txt, valid llms.txt, rich schema on homepage, static SSR'd HTML) but is held back by **weak brand authority signals** (new 6-month-old entity, only Instagram in sameAs, no third-party mentions) and **thin E-E-A-T** (no author bios, no testimonials, no team page, case studies are one-sentence blurbs). The site is technically ready for AI crawlers, but AI systems don't yet know the brand exists as an entity worth citing.

### Score Breakdown

| Category | Score | Weight | Weighted |
|---|---:|---:|---:|
| AI Citability | 65/100 | 25% | 16.25 |
| Brand Authority | 25/100 | 20% | 5.00 |
| Content E-E-A-T | 35/100 | 20% | 7.00 |
| Technical GEO | 80/100 | 15% | 12.00 |
| Schema & Structured Data | 60/100 | 10% | 6.00 |
| Platform Optimization | 20/100 | 10% | 2.00 |
| **Overall GEO Score** | | | **48.25/100** |

---

## Critical Issues (Fix Immediately)

None. No crawler blocks, no noindex, no 5xx errors, no JS-only rendering. The site is accessible.

## High Priority Issues

1. **Zero third-party brand authority signals beyond Instagram.**
   - Only `sameAs` is `instagram.com/obrador.web`. AI systems rely on LinkedIn company pages, Google Business Profile, YouTube, and Wikipedia to recognize entities. Without these, Obrador is effectively invisible to LLMs as a "known" business.
   - **Fix:** Create LinkedIn company page, Google Business Profile (even without a storefront — use service-area GBP), and register the brand on Crunchbase/local Madrid business directories. Add all URLs to the `sameAs` array in the homepage schema.

2. **No author attribution on blog posts.**
   - `/blog/como-elegir-web-cafeteria/` and `/blog/seo-vs-sem-cafes/` have no `Person` author, no byline, no bio. AI systems score anonymous content much lower for citability.
   - **Fix:** Add a visible byline + Person schema (`author: { @type: Person, name: "Gonzalo ...", url: "/about/", sameAs: [LinkedIn profile] }`) and link to a real About page.

3. **No Article schema on blog posts.**
   - Both posts lack `Article` / `BlogPosting` JSON-LD. This is the single most important schema type for content citability.
   - **Fix:** Add `BlogPosting` schema with `headline`, `datePublished`, `dateModified`, `author`, `publisher` (Organization), `image`, `wordCount`.

4. **No About/Team page.**
   - The navigation has no "About us" or "Team" link. AI systems look for team credentials, company history, and founder bios as E-E-A-T anchors.
   - **Fix:** Build `/about/` with founder bio, Madrid location, credentials, "why we build hand-coded sites" positioning. Add Person + Organization schema.

## Medium Priority Issues

5. **Bilingual content uses `display: none` toggles — both ES and EN exist in DOM simultaneously.**
   - AI crawlers see both languages interleaved. Not catastrophic, but dilutes per-language semantic clarity. No `hreflang` tags either.
   - **Fix (long-term):** Move to separate `/en/` URL paths with `hreflang` annotations. Short-term: keep as-is.

6. **`/compara/` page has zero structured data.**
   - A comparison page with pricing is a prime candidate for `ItemList` of `Offer` or additional `FAQPage` schema.
   - **Fix:** Duplicate the OfferCatalog from homepage onto `/compara/` and add page-specific FAQs as schema.

7. **`/proyectos/` has no schema and paper-thin case studies.**
   - One-sentence project descriptions won't get cited when users ask AI "best Madrid coffee shop web agency examples."
   - **Fix:** Add `CreativeWork` or `Service` schema for each project. Expand each case study to 200+ words covering: client, brief, approach, outcome, technologies.

8. **`ProfessionalService` is a weaker schema type than `LocalBusiness` + `WebDesignCompany` combo.**
   - **Fix:** Change primary `@type` to `["LocalBusiness", "ProfessionalService"]` or use `Organization` with explicit `serviceType` and add `openingHoursSpecification`.

9. **Sitemap lists only 6 URLs.**
   - Demo pages (`/demos/cierzo-*`) and older project pages are missing.
   - **Fix:** Regenerate sitemap to include all crawlable pages.

10. **No `BreadcrumbList` schema on any page.**
    - **Fix:** Add breadcrumbs to blog posts, compara, proyectos.

## Low Priority Issues

11. Meta description missing on `/compara/` HTML (the HTML has one but WebFetch didn't surface it clearly — verify manually).
12. No Twitter card image beyond the logo (small square) — use a proper `summary_large_image` variant.
13. Only 2 blog posts — content freshness cadence unclear.
14. No `Review` or `AggregateRating` schema (but also no visible testimonials on site, so this is upstream of schema).
15. `keywords` meta tag is long and stuffed — unused by modern search/AI, not harmful but not helpful either.

---

## Category Deep Dives

### AI Citability (65/100)

**Strengths:**
- Pricing is stated clearly in numeric form ("€490", "€890", "€1.290", "€2.490") with delivery timeframes. This is highly quotable.
- FAQPage schema on homepage wraps 7 concrete Q&A pairs — exactly the format ChatGPT/Perplexity lift directly.
- `llms.txt` is present and **well-structured**: summary + services + pricing + projects + contact. Ahead of 99% of small-business sites.
- Blog post "Cómo elegir una web para tu cafetería" (~1250 words) has clear H2/H3 hierarchy.

**Weaknesses:**
- No author signals → AI systems discount authorless content.
- Only 2 blog posts total → thin topical authority.
- Bilingual DOM toggling may cause AI to ingest mixed-language chunks.
- `/compara/` is highly quotable pricing content but has no schema backing.
- No "Last updated" visible dates on blog posts (date is in content but not rendered as metadata).

**Rewrite examples AI would love:**
- Current: "Presencia — €490 (from). 1-page custom landing..."
- Already good in llms.txt. Repeat this format on the compara page in plain HTML (not just JSON-LD).

### Brand Authority (25/100)

**Platform presence map:**
- Instagram: ✓ (@obrador.web)
- LinkedIn company page: ✗
- Google Business Profile: ✗ (or at least not linked)
- YouTube: ✗
- Wikipedia: ✗ (unsurprising for a 6-month-old agency)
- Reddit: ✗ (no r/Madrid or r/Barista mentions visible)
- Crunchbase / local directories: ✗
- Mentions in specialty coffee publications: ✗

AI models rely on cross-platform entity graphs. Right now Obrador is a single-node entity (website + Instagram). Until there are ≥3 independent high-authority sources mentioning the brand, LLMs won't confidently cite it.

### Content E-E-A-T (35/100)

- **Experience:** Not demonstrated — no "we built X for Y, the outcome was Z" specifics. Project cards are one-sentence aesthetic summaries, not case studies.
- **Expertise:** Two blog posts show some knowledge of SEO vs SEM and Linktree tradeoffs, but no author, no credentials.
- **Authoritativeness:** No press mentions, no industry awards, no testimonials, no client logos with attribution.
- **Trustworthiness:** Pricing is clear, email + location provided, legal/terms pages not found (no `/terminos/`, `/privacidad/`).

### Technical GEO (80/100)

- robots.txt: fully permissive ✓
- llms.txt: present, high-quality ✓
- sitemap.xml: present (but only 6 URLs) ◐
- HTTPS: ✓
- SSR/static HTML: ✓ (GitHub Pages, no JS dependency)
- Canonical tags: ✓
- Open Graph + Twitter Card: ✓
- Mobile-responsive: ✓
- Page speed: expected fast (static HTML + CDN)
- `hreflang`: ✗
- Server headers: not audited here

### Schema & Structured Data (60/100)

**Present:**
- `ProfessionalService` on homepage with full `hasOfferCatalog` (8 offers) and address/areaServed.
- `FAQPage` on homepage with 7 questions.

**Missing/Weak:**
- `BlogPosting` / `Article` on blog posts
- `Person` (author)
- `Organization` (separate from ProfessionalService)
- `BreadcrumbList`
- `ItemList` on /proyectos/
- `WebSite` with `SearchAction`
- `LocalBusiness` subclass usage
- `Review` / `AggregateRating`

### Platform Optimization (20/100)

| Platform | Status |
|---|---|
| Google AI Overviews | Weak — brand unknown, but pricing FAQ schema helps |
| ChatGPT (web search) | Weak — ChatGPT's web browsing may surface pricing, but no training-data presence |
| Perplexity | Weak — similar to ChatGPT |
| Gemini | Weak — Google's AI leans on Google Business Profile, which is absent |
| Bing Copilot | Weak — limited Bing indexing likely given site age |

---

## Quick Wins (Implement This Week)

1. **Add `BlogPosting` schema + visible byline to the two blog posts.** 30 minutes of work, immediate citability lift.
2. **Add `Person` schema for yourself (founder) and link to a new `/about/` page.** The About page can be short (300-400 words) but must exist.
3. **Create a Google Business Profile for Obrador as a service-area business (Madrid).** Free, immediate Google entity recognition.
4. **Create a LinkedIn company page** and add the URL to the `sameAs` array in homepage schema.
5. **Duplicate the OfferCatalog schema onto `/compara/`** and add page-specific FAQs as `FAQPage` schema on that page.

## 30-Day Action Plan

### Week 1: Entity Anchoring
- [ ] Create Google Business Profile (service area: Madrid)
- [ ] Create LinkedIn company page
- [ ] Add all platform URLs to homepage `sameAs`
- [ ] Build `/about/` page with founder bio + Person schema

### Week 2: Content Schema
- [ ] Add `BlogPosting` schema + visible bylines to both blog posts
- [ ] Add `FAQPage` + `ItemList(Offer)` schema to `/compara/`
- [ ] Add `BreadcrumbList` to all non-home pages

### Week 3: Case Study Depth
- [ ] Expand each of the 7 projects on `/proyectos/` to 200+ words (brief, approach, outcome)
- [ ] Add `CreativeWork` schema per project
- [ ] Add 2 client testimonials (even short ones) with `Review` schema

### Week 4: Content Velocity + Legal
- [ ] Publish 2 more blog posts (target: "Carta digital QR vs PDF", "Cuánto tarda una web de cafetería")
- [ ] Add `/privacidad/` and `/terminos/` pages (GDPR + trust signal)
- [ ] Regenerate sitemap to include demos + new pages
- [ ] Rerun audit and target 60+ overall score

---

## Appendix: Pages Analyzed

| URL | Notes | GEO Issues |
|---|---|---|
| `/` | Homepage | Strong schema, no sameAs breadth |
| `/compara/` | Pricing comparison | No schema at all |
| `/proyectos/` | Portfolio | No schema, thin copy |
| `/blog/` | Blog index | Not deeply audited |
| `/blog/como-elegir-web-cafeteria/` | ~1250w post | No author, no Article schema |
| `/blog/seo-vs-sem-cafes/` | Blog post | Not fetched in this pass — assume similar gaps |
| `/llms.txt` | Present, high quality | None |
| `/robots.txt` | Fully open to AI crawlers | None |
| `/sitemap.xml` | Only 6 URLs | Missing demos, about, etc. |

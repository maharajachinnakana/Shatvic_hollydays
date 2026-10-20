# Shadvic Holidays — Premium Website UI Build

This folder contains the static HTML/CSS/JS website UI, expanded to include the 64 URLs in the supplied sitemap register. Existing route-page copy and approved starting fares have been preserved; pages absent from the starter are created with page-specific starter copy and clear fare-confirmation language rather than invented prices.

## Main features
- Shared premium forest-green / cream / gold design system
- Responsive desktop and mobile layouts
- Text-only Shadvic Holidays wordmark (no invented SH monogram)
- Blank white dashed media placeholders for manual image/video insertion
- Mobile fixed Call / WhatsApp / Enquire bar
- Responsive mobile menu, accessible skip link, reduced-motion support
- WhatsApp enquiry flow and shared contact number +91 9496933154
- FAQ accordions, fare tables where rates are confirmed, SEO titles/descriptions, basic TravelAgency JSON-LD
- Privacy / terms / cancellation drafts clearly require owner review

## Start locally
Open `index.html` directly for a quick look, or run a static server from this directory. Because links are root-relative (for deployment), a local static server is preferable:

```bash
python -m http.server 8080
```

Then open `http://localhost:8080`.

## Before production
1. Replace every media placeholder with your own licensed photos/video or remove unused slots. See `MEDIA-PLACEMENT-GUIDE.md`.
2. Confirm the canonical domain; no production canonical URLs are hardcoded yet.
3. Confirm the two intent-hold pages `/munnar-to-kochi-sightseeing-taxi/` and `/munnar-to-coimbatore-sightseeing-taxi/` before publishing.
4. Verify every route fare and operating condition with the owner. Starting fares can vary with pickup positioning, date, season, operating conditions and availability.
5. Review legal pages against the actual business policies.
6. Test WhatsApp forms, internal links, mobile layouts, accessibility and performance on real devices.
7. Set final `robots.txt` and sitemap URLs only after the domain is confirmed.

## Deployment status
This is a downloadable source folder only. It has not been pushed to GitHub or deployed to a live domain.

## Homepage trip planner
The homepage includes a responsive trip-enquiry planner (pickup, destination, travel date, passenger band and vehicle preference). Submitting it opens WhatsApp with the entered details; it does not calculate or promise a live fare.

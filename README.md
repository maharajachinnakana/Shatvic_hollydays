# Shadvic Holidays - mobile site (V2)

65 pages, one folder per page (`slug/index.html` + `slug/assets/images/`). Shared files: `assets/css/mobile.css`, `assets/js/mobile.js`, fonts in `assets/fonts` (self-hosted, SIL OFL). `desktop.css` / `desktop.js` are empty stubs for the later desktop version.

## Before launch
1. **Domain:** find and replace `https://YOUR-CONFIRMED-DOMAIN` with the real domain in all files (canonical, sitemap.xml, robots.txt, llms.txt, JSON-LD).
2. **Owner review:** Privacy, Terms and Cancellation pages are neutral summaries. Add the real rules. About page: add owner/licence details.
3. **Fares:** all fares come from the earlier approved site. Check them once; then update `fares.json`-based pages by editing the HTML tables.
4. **Photos:** add images into each `slug/assets/images/` and use them in the page.
5. Add `assets/images/og.jpg` (1200x630) for sharing.
6. Add Google Business Profile, then submit sitemap.xml in Search Console.

## Test locally
`python3 -m http.server 8000` in this folder, open http://localhost:8000 (double-click also works; links get index.html added automatically).

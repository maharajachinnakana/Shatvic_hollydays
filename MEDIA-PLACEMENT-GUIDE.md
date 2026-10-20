# Shadvic Holidays — Media Placement Guide

Every white dashed box marked **ADD ... IMAGE / VIDEO HERE** is intentionally blank so you can add your own photos or video manually. No stock photos or generated scenery are embedded in the website.

## Where to add media
- **Hero media slot**: main landscape/experience photo or a short silent looping video. Recommended landscape crop 4:3 desktop and 16:9 mobile.
- **Page image/video slot**: a relevant photo or short video for that service/route page.
- **Homepage visual strip**: Munnar/destination photo, actual vehicle photo, and tour/activity photo.

## Recommended file organisation
Create folders inside `assets/`:
- `assets/images/` — `.webp` photos where possible
- `assets/videos/` — compressed `.mp4` / `.webm` clips

Use descriptive filenames such as `munnar-tea-gardens.webp`, `shadvic-vehicle-interior.webp`, or `kolukkumalai-jeep-safari.webp`. Only use images you own or have permission to publish.

## Replacing a placeholder
In the relevant page's `index.html`, replace the full `<div class="media-placeholder ...">...</div>` with an image, for example:

```html
<img src="/assets/images/munnar-tea-gardens.webp" alt="Tea gardens in Munnar, Kerala" loading="lazy" decoding="async" class="page-image">
```

For video, use a poster image when available, muted playback, `playsinline`, and `preload="none"` or `metadata`; avoid autoplaying large files on mobile. Example:

```html
<video class="page-video" controls playsinline preload="metadata" poster="/assets/images/munnar-tea-gardens.webp">
  <source src="/assets/videos/munnar-landscape.mp4" type="video/mp4">
</video>
```

Add this CSS if using actual images/videos:

```css
.page-image,.page-video{display:block;width:100%;height:100%;min-height:220px;object-fit:cover;border-radius:22px}
```

## Important
- Do not publish blank placeholders as if they were final media. Replace them or remove the slot before launch.
- Add specific, accurate alt text to meaningful images. Use empty alt text for purely decorative images.
- Compress photos, prefer WebP/AVIF, and keep video short and compressed.
- Do not add fake vehicle photos, reviews, badges, ratings or customer images.

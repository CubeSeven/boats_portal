# Gallery, Images & Maps Fix Plan

## Problem Summary

Four issues identified during testing:

### 1. Duplicate Images in Galleries
**31 duplicate groups** found in `/public/images/fleet/` (400 files, only 360 unique). Examples:
- 7 different boat "hero" images are actually the same placeholder photo (`black-edition-nireus.jpg`, `genesis-33.jpg`, `karel-ithaca-50hp.jpg`, etc. — all identical)
- Legend A40 has files duplicated as both `legend-a-401.jpg` and `legend-a40-1.jpg` (renamed copies)
- Tiger Marine images duplicated as both `.jpg` and `.jpeg` extensions

### 2. Portrait Images Displayed in Landscape (squished/flipped)
**34 out of 44** sampled gallery images are portrait orientation (taller than wide), but the masonry CSS columns layout shows them at natural height — causing a visual "flipped" look where tall images dominate and create uneven, jarring rows.

### 3. Masonry Layout (CSS columns) — Inconsistent, Uneven
The gallery uses `column-count: 3` masonry, which:
- Creates uneven rows with no visual rhythm
- Makes portrait images tower over landscape ones
- Breaks the clean grid aesthetic used everywhere else on the site

### 4. Map Route Lines Cross Land
- `RouteMap.astro` draws a **straight polyline** between waypoints — ignoring coastline geography
- Tours have waypoint coordinates (good), but the line between them cuts across landmasses
- Water taxi routes have **NO coordinates at all** — just origin/destination, so the map draws a single straight line through whatever is in between

---

## Phase 1: Gallery Component Redesign (UI only, no data changes)

**Goal:** Replace masonry with a uniform grid, fix portrait display, add lightbox.

### Tasks
1. Rewrite `Gallery.astro` CSS:
   - Replace `column-count` masonry with CSS Grid (`grid-template-columns: repeat(auto-fill, minmax(250px, 1fr))`)
   - All thumbnails use `aspect-ratio: 4/3` with `object-fit: cover` — uniform size, no distortion
   - Portrait images get center-cropped to fit (no stretching, no flipping)
   - Keep GLightbox for full-size viewing (where original orientation is preserved)
2. Add hover overlay (zoom icon) — already exists, keep it
3. Responsive: 3 cols desktop → 2 cols tablet → 2 cols mobile (not 1)
4. Cap gallery display at first 12 images, with "View all" expanding the rest (for boats with 15+ images)

### Files Changed
- `src/components/sections/Gallery.astro` (CSS rewrite only)

### Risk: LOW — pure CSS change, no data/content changes

---

## Phase 2: Deduplicate Fleet Image Files

**Goal:** Remove the 31 duplicate image groups, keep only canonical copies, update content references.

### Tasks
1. **Identify canonical filename** for each duplicate group (pick the one already referenced in content)
2. **Delete redundant files** (40 duplicate files to remove)
3. **Update content references** in any `.md` files that point to the non-canonical name
4. **Verify no broken images** after cleanup

### Duplicate Groups to Fix
| Group | Canonical (keep) | Delete |
|-------|-----------------|--------|
| 7 boat heroes | (these are placeholder — flag for replacement, keep one) | 6 copies |
| Legend A40 | `legend-a40-1.jpg` | `legend-a-401.jpg` + .webp variants |
| Tiger Marine | `tiger-marine-2.jpg` | `tiger-marine-2.jpeg` |
| karel-open | `karel-open-1.jpg` | `karel-open-1.jpeg` |

### Files Changed
- `public/images/fleet/` (delete ~40 files)
- `src/content/fleet/*.md` (update references if needed)

### Risk: MEDIUM — must verify no broken links after deletion

---

## Phase 3: Tour/Location Gallery Image Overlap

**Goal:** Fix the rolling-overlap pattern where consecutive tours share images.

### Current State
Tours use a chain pattern where each tour's gallery overlaps with the next:
- `lalaria-blue-caves`: s19, s20
- `mamma-mia-skopelos`: s20, s21
- `sunset-wine-cruise`: s21, s22
- `tsougria-arkos-islands`: s22, s23

Locations have the same issue:
- `skiathos-new-port`: s23, s24
- `kolios-beach`: s24, s25
- `agia-paraskevi-beach`: s25, s26

### Solution
Assign each tour/location **2 unique stock images** from the existing pool (78 unique stock images available, only ~26 used). No two tours share the same image.

### Files Changed
- `src/content/tours/*.md` (update gallery arrays)
- `src/content/locations/*.md` (update gallery arrays)

### Risk: LOW — data-only change

---

## Phase 4: Map Route Curvature (sea-aware paths)

**Goal:** Replace straight polylines with curved sea routes that avoid crossing land.

### Approach
Use Leaflet curve interpolation. Instead of `L.polyline(points)`, generate a curved path using **quadratic Bezier curves** between each pair of waypoints, with a control point offset toward the sea side.

### Tasks
1. **Add curve generation function** to `RouteMap.astro`:
   - For each segment (A→B), compute a midpoint
   - Offset the midpoint perpendicular to the A→B line, toward the open sea (south/west of Skiathos)
   - Use Leaflet's curve extension or manual Bezier point generation (sample 20 points along the curve)
2. **Add sea bias direction**: Skiathos routes curve southward (toward open sea), Skopelos routes curve eastward
3. **Add transfer coordinates**: Add lat/lng waypoints to all 4 transfer route content files (origin, 1-2 sea waypoints, destination)
4. **Style improvement**: Use a thicker, solid line with a subtle glow effect, add direction arrows along the path

### Files Changed
- `src/components/maps/RouteMap.astro` (add curve logic)
- `src/content/routes/*.md` (add coordinates to all 4 routes)
- `src/layouts/RoutePage.astro` (pass waypoints to RouteMap)

### Risk: MEDIUM — requires testing curve math visually

---

## Execution Order

```
Phase 1 (Gallery CSS)  →  Phase 2 (Dedup images)  →  Phase 3 (Tour images)  →  Phase 4 (Map curves)
     ~30 min                ~20 min                   ~15 min                   ~45 min
```

Each phase ends with: `astro check` + `npm run build` + browser verification.

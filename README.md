# Georgia Family Trip Website

A static website for the 13-day family trip to Georgia (Sep 23 – Oct 5, 2026).

**Live site:** https://yairpalti.github.io/georgia-trip/index.html

## Pages

- **Home** (`index.html`) – Overview map, day cards, accommodation summary
- **Day details** (`day.html?id=1` … `day.html?id=13`) – Activities, alternatives, restaurants, hotels, mini-map
- **All places** (`places.html`) – Every pin on one map, filtered by category, with notes and video links
- **Logistics** (`logistics.html`) – Flights, rental car, drone rules, packing, emergency

## Map search & interest points

Every map (route map, day maps, extreme map, places map) has a search box in its top-right corner:

- Type a place name (English works best; Hebrew only where OSM has a Hebrew name tag) and pick a result to preview it on the map.
- `➕` saves it as an interest point (📌). Saved points appear on **all** maps, with a note field and a Google Maps link in their popup.
- Points added from a day map are tagged with that day.

Geocoding uses the free [Nominatim](https://nominatim.openstreetmap.org/) API (no key required). Points are stored in the visitor's browser (`localStorage`, key `georgia-trip.pois`) — they are per-device and not shared between visitors. Code lives in `js/poi.js`.

## The places map

`places.html` shows every place on one map: the pins from the shared Google Maps list, plus the extreme activities and drone spots already in the site data (deduplicated by proximity). Each place has a category (food, wine, lodging, attraction, nature, extreme, town, drone, transport), which drives its marker colour and the filter chips.

Per place you can write a note and attach video links (TikTok, YouTube, Instagram, Vimeo, or any URL). Both are per-browser `localStorage`:

| Key | Holds |
| --- | --- |
| `georgia-trip.pois` | Places added through the map search |
| `georgia-trip.placeNotes` | Notes on built-in places |
| `georgia-trip.placeVideos` | Video links per place |

Links open Google's own place page (reviews, photos, hours) via the `cid` place id imported with each pin — not a bare coordinate.

### Travel time between two places

Open any place and press **📏 מכאן**, then **📏 לכאן** on another — works for imported pins and for places you add yourself. A bar above the map shows driving time and distance, draws the road route, and links to Google Maps directions. Swap reverses the direction; results are cached per pair.

Routing uses the public [OSRM](https://project-osrm.org/) demo server (no key, no quota promises). If it is unreachable the bar falls back to straight-line distance at an assumed 60 km/h and says so.

### Places far from the route

Pins more than **40 km** from the itinerary — the Kazbegi/Tbilisi cluster, Borjomi, and one balloon ride the data already marks as off-route — are hidden by default, so the map shows only what is near where the trip actually goes. The dashed **🛣 רחוקים מהמסלול** chip brings them back, and each one then shows its distance from the route. Distance is measured to the nearest point on the day-by-day route lines, not to a city centre. Places you add yourself are never hidden, however far away they are.

### Refreshing the list from Google Maps

The import is **one-way**. Google has no public API for writing to a saved list, so places added on the website cannot be pushed back into Google Maps.

Pins added in Google Maps arrive on their own: `.github/workflows/refresh-places.yml` runs the import every day at 03:17 UTC and commits `data/places.js` when the list changed. If more than two places disappear at once — more likely a partial answer from Google's undocumented endpoint than a real deletion — the run keeps the old file and fails instead.

To pull them in right away, or after editing the Hebrew metadata:

```bash
python tools/refresh-places.py
```

It rewrites `data/places.js` from the shared list and reports any pin missing from `tools/places-meta.json` (Hebrew name, category, area) — add it there and re-run to classify it. The list must stay shared-by-link for the fetch to work.

## Run locally

```bash
python3 -m http.server 8080
# or: npx serve .
```

Open http://localhost:8080

## Edit content

All trip data lives in `data/trip.js`. Update days, links, images, and logistics there.

## Deploy

Upload the folder to any static host (GitHub Pages, Netlify, Vercel, etc.).

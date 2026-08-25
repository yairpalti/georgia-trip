# Georgia Family Trip Website

A static website for the 13-day family trip to Georgia (Sep 23 – Oct 5, 2026).

**Live site:** https://yairpalti.github.io/georgia-trip/index.html

## Pages

- **Home** (`index.html`) – Overview map, day cards, accommodation summary
- **Day details** (`day.html?id=1` … `day.html?id=13`) – Activities, alternatives, restaurants, hotels, mini-map
- **Logistics** (`logistics.html`) – Flights, rental car, drone rules, packing, emergency

## Map search & interest points

Every map (route map, day maps, extreme map) has a search box in its top-right corner:

- Type a place name (English works best; Hebrew only where OSM has a Hebrew name tag) and pick a result to preview it on the map.
- `➕` saves it as an interest point (📌). Saved points appear on **all** maps, with a note field and a Google Maps link in their popup.
- Points added from a day map are tagged with that day.

Geocoding uses the free [Nominatim](https://nominatim.openstreetmap.org/) API (no key required). Points are stored in the visitor's browser (`localStorage`, key `georgia-trip.pois`) — they are per-device and not shared between visitors. Code lives in `js/poi.js`.

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

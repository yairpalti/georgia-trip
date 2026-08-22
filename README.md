# Georgia Family Trip Website

A static website for the 13-day family trip to Georgia (Sep 23 – Oct 5, 2026).

## Pages

- **Home** (`index.html`) – Overview map, day cards, accommodation summary
- **Day details** (`day.html?id=1` … `day.html?id=13`) – Activities, alternatives, restaurants, hotels, mini-map
- **Logistics** (`logistics.html`) – Flights, rental car, drone rules, packing, emergency

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

#!/usr/bin/env python3
"""
Regenerate data/places.js from the trip's shared Google Maps list.

    python tools/refresh-places.py

Reads the public "גיאורגיה" saved list, merges it with the Hebrew names and
categories in tools/places-meta.json, and rewrites data/places.js.
Places missing from places-meta.json are still written out (category "custom")
and reported at the end so they can be classified.

Note: this is one-way. Google offers no public API for writing to a saved list,
so places added on the website cannot be pushed back into Google Maps.
"""

import io
import json
import os
import re
import sys
import urllib.parse
import urllib.request

LIST_ID = "UzbOPS93ZpcoIQcqaxXJkg"
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
META_PATH = os.path.join(ROOT, "tools", "places-meta.json")
OUT_PATH = os.path.join(ROOT, "data", "places.js")
LIST_URL = "https://maps.app.goo.gl/7n7fm83nZTDq31La7"

CATEGORIES = """const PLACE_CATEGORIES = {
  food: { label: "אוכל", icon: "🍽️", color: "#e67e22" },
  wine: { label: "יין ויקבים", icon: "🍷", color: "#7b2d3e" },
  lodging: { label: "לינה", icon: "🏨", color: "#8e44ad" },
  attraction: { label: "אתרים", icon: "🏛️", color: "#c9a227" },
  nature: { label: "טבע", icon: "🏞️", color: "#2d5a3d" },
  activity: { label: "אקסטרים", icon: "🪂", color: "#2980b9" },
  town: { label: "ערים וכפרים", icon: "🏙️", color: "#34495e" },
  drone: { label: "רחפן", icon: "🚁", color: "#6c5ce7" },
  transport: { label: "תחבורה", icon: "✈️", color: "#7f8c8d" },
  custom: { label: "שלנו", icon: "📌", color: "#e84393" },
};"""


def fetch_list():
    pb = f"!1m4!1s{LIST_ID}!2e1!3m1!1e1!2e2!3e2!4i500"
    url = (
        "https://www.google.com/maps/preview/entitylist/getlist"
        f"?authuser=0&hl=en&gl=us&pb={urllib.parse.quote(pb)}"
    )
    request = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 Chrome/128"})
    with urllib.request.urlopen(request, timeout=30) as response:
        raw = response.read().decode("utf-8")
    return json.loads(raw[raw.index("[") :])


def walk(node):
    """Yield the saved-place entries out of Google's nested array response."""
    if isinstance(node, list):
        if (
            len(node) >= 3
            and node[0] is None
            and isinstance(node[1], list)
            and isinstance(node[2], str)
            and len(node[1]) > 5
            and isinstance(node[1][5], list)
            and len(node[1][5]) >= 4
            and isinstance(node[1][5][2], float)
        ):
            yield node
            return
        for child in node:
            yield from walk(child)


def to_cid(feature_id):
    """Google's list stores the place's feature id as a signed int64; the CID is unsigned."""
    value = int(feature_id)
    return str(value + (1 << 64) if value < 0 else value)


def slugify(name):
    slug = re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")
    return slug or "place"


def js(value):
    return json.dumps(value, ensure_ascii=False)


def main():
    meta = json.load(io.open(META_PATH, encoding="utf-8"))
    entries = list(walk(fetch_list()))
    if not entries:
        sys.exit("No places found – the list may have been made private.")

    places, unmapped = [], []
    for entry in entries:
        info = entry[1]
        name = entry[2]
        known = meta.get(name)
        if not known:
            unmapped.append(name)
        place = {
            "id": known["id"] if known else slugify(name),
            "he": known["he"] if known else name,
            "en": name,
            "category": known["category"] if known else "custom",
            "area": known["area"] if known else "",
            "lat": round(info[5][2], 6),
            "lng": round(info[5][3], 6),
            "address": info[4] or "",
            "tip": entry[3] if len(entry) > 3 and isinstance(entry[3], str) else "",
            "cid": to_cid(info[6][1]) if len(info) > 6 and info[6] else "",
        }
        places.append(place)

    lines = [
        "/**",
        " * כל המקומות של הטיול – מיובא מרשימת המקומות השמורה ב-Google Maps",
        f" * ({LIST_URL}) ומועשר בקטגוריות ובשמות בעברית.",
        " *",
        " * הקובץ נוצר אוטומטית: python tools/refresh-places.py",
        " * שמות/קטגוריות בעברית נערכים ב-tools/places-meta.json",
        " */",
        "",
        CATEGORIES,
        "",
        "const TRIP_PLACES = [",
    ]
    for place in places:
        fields = [
            f'id: {js(place["id"])}',
            f'he: {js(place["he"])}',
            f'en: {js(place["en"])}',
            f'category: {js(place["category"])}',
            f'area: {js(place["area"])}',
            f'lat: {place["lat"]}',
            f'lng: {place["lng"]}',
        ]
        for key in ("address", "tip", "cid"):
            if place[key]:
                fields.append(f"{key}: {js(place[key])}")
        lines.append("  { " + ", ".join(fields) + " },")
    lines.append("];")
    lines.append("")

    io.open(OUT_PATH, "w", encoding="utf-8", newline="\n").write("\n".join(lines))
    print(f"Wrote {len(places)} places to data/places.js")
    if unmapped:
        print("\nNot in tools/places-meta.json (written with category \"custom\"):")
        for name in unmapped:
            print(f"  - {name}")


if __name__ == "__main__":
    main()

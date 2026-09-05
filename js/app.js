function escAttr(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function placeEnName(name) {
  if (typeof enPlace === "function") return enPlace(name);
  if (!name) return "";
  const parts = String(name).split(" · ");
  return parts.length >= 2 ? parts[1] : name;
}

function buildGoogleMapsSearchUrl(query) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

function parseCoordsFromMapsUrl(url) {
  if (!url) return null;
  const q = String(url).match(/[?&]query=(-?\d+\.?\d*),\s*(-?\d+\.?\d*)/);
  if (q) return { lat: parseFloat(q[1]), lng: parseFloat(q[2]) };
  const at = String(url).match(/@(-?\d+\.?\d*),(-?\d+\.?\d*)/);
  if (at) return { lat: parseFloat(at[1]), lng: parseFloat(at[2]) };
  const place = String(url).match(/!3d(-?\d+\.?\d*)!4d(-?\d+\.?\d*)/);
  if (place) return { lat: parseFloat(place[1]), lng: parseFloat(place[2]) };
  return null;
}

function normalizePlaceKey(name) {
  return placeEnName(name)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function lookupKnownPlaceCoords(name) {
  if (!name) return null;
  const key = normalizePlaceKey(name);
  if (!key) return null;

  const candidates = [];
  const push = (keys, lat, lng, address) => {
    if (lat == null || lng == null) return;
    candidates.push({ keys: keys.map((k) => normalizePlaceKey(k)).filter(Boolean), lat, lng, address });
  };

  if (typeof PRIME_HEAVEN !== "undefined") {
    push(["Prime Heaven"], PRIME_HEAVEN.lat, PRIME_HEAVEN.lng, PRIME_HEAVEN.address);
  }
  if (typeof HOTEL_LONDON_1889 !== "undefined") {
    push(
      ["Hotel London 1889", "London 1889", "Hotel London"],
      HOTEL_LONDON_1889.lat,
      HOTEL_LONDON_1889.lng,
      HOTEL_LONDON_1889.address
    );
  }
  if (typeof PEAK_MAZERI !== "undefined") {
    push(["Peak Mazeri", "Peak Mazeri Guest House", "mazeri cabin"], PEAK_MAZERI.lat, PEAK_MAZERI.lng, PEAK_MAZERI.address);
  }
  if (typeof WHITE_HOTEL !== "undefined") {
    push(["White Hotel Guesthouse", "White Hotel"], WHITE_HOTEL.lat, WHITE_HOTEL.lng, WHITE_HOTEL.address);
  }
  push(["Adventure Camping"], 42.5582341, 42.8517484);
  push(["Cottage Mebirashi", "Mebirashi"], 42.512732, 43.144137);
  push(["21 Mestia", "Mestia Airbnb"], 43.0432, 42.719788);

  if (typeof ROUTE_COORDS !== "undefined") {
    ROUTE_COORDS.forEach((p) => push([p.name], p.lat, p.lng));
  }
  if (typeof TRIP_PLACES !== "undefined") {
    TRIP_PLACES.forEach((p) => push([p.en, p.he, p.name], p.lat, p.lng, p.address));
  }

  for (const c of candidates) {
    if (c.keys.some((k) => k && (key.includes(k) || k.includes(key)))) {
      return { lat: c.lat, lng: c.lng, address: c.address };
    }
  }
  return null;
}

function resolvePlaceGeo(item) {
  if (!item) return null;
  if (item.lat != null && item.lng != null) return { lat: item.lat, lng: item.lng };
  const fromLink = parseCoordsFromMapsUrl(item.link || item.mapsUrl);
  if (fromLink) return fromLink;
  return lookupKnownPlaceCoords(item.name || item.label || item.area);
}

function resolvePlaceMapsUrl(item) {
  const existing = item.mapsUrl || item.link;
  if (existing && /google\.com\/maps|maps\.app\.goo\.gl|maps\.google|goo\.gl\/maps/i.test(existing)) {
    return existing;
  }
  const geo = resolvePlaceGeo(item);
  if (geo) {
    const label = placeEnName(item.name || item.label) || "";
    return label
      ? buildGoogleMapsSearchUrl(`${label} ${geo.lat},${geo.lng}`)
      : buildGoogleMapsSearchUrl(`${geo.lat},${geo.lng}`);
  }
  if (item.mapsQuery) return buildGoogleMapsSearchUrl(item.mapsQuery);
  const q = placeEnName(item.name || item.label) || item.name || item.label || "";
  const area = placeEnName(item.area) || item.area || "Georgia";
  return buildGoogleMapsSearchUrl(`${q} ${area}`.trim());
}

function resolvePlaceSearchQuery(item) {
  if (item.mapsQuery) return item.mapsQuery;
  const en = placeEnName(item.name || item.label) || item.name || item.label || "";
  const area = placeEnName(item.area) || item.area || "Georgia";
  return `${en} ${area}`.trim();
}

function placeCardKey(kind, index, name) {
  const slug = normalizePlaceKey(name || kind)
    .replace(/\s+/g, "-")
    .slice(0, 40);
  return `${kind}-${index}-${slug || "place"}`;
}

/** Identity keys for lodging/restaurant cards – used to drop duplicates across sources */
function placeItemIdentityKeys(item) {
  const keys = [];
  const nameKey = normalizePlaceKey(item?.name);
  if (nameKey) keys.push(`n:${nameKey}`);

  const link = item?.link || item?.mapsUrl || "";
  const coords = parseCoordsFromMapsUrl(link);
  if (coords && Number.isFinite(coords.lat) && Number.isFinite(coords.lng)) {
    keys.push(`c:${coords.lat.toFixed(4)},${coords.lng.toFixed(4)}`);
  } else if (link) {
    const cleaned = String(link).split(/[?#]/)[0].replace(/\/$/, "").toLowerCase();
    if (cleaned) keys.push(`u:${cleaned}`);
  }

  const booking = item?.bookingUrl;
  if (booking) {
    const cleaned = String(booking).split(/[?#]/)[0].replace(/\/$/, "").toLowerCase();
    if (cleaned) keys.push(`b:${cleaned}`);
  }
  return keys;
}

function dedupePlaceItems(items) {
  if (!items?.length) return [];
  const seen = new Set();
  return items.filter((item) => {
    const keys = placeItemIdentityKeys(item);
    if (!keys.length) return true;
    if (keys.some((k) => seen.has(k))) return false;
    keys.forEach((k) => seen.add(k));
    return true;
  });
}

function filterActivitiesDuplicatingHotels(activities, hotels) {
  if (!activities?.length || !hotels?.length) return activities || [];
  const hotelKeys = new Set(
    hotels.map((h) => normalizePlaceKey(h?.name)).filter(Boolean)
  );
  return activities.filter((a) => {
    const key = normalizePlaceKey(a?.name);
    return !key || !hotelKeys.has(key);
  });
}

function enrichPlaceItem(item, kind) {
  const geo = resolvePlaceGeo(item);
  const mapsUrl = resolvePlaceMapsUrl({ ...item, ...geo });
  return {
    ...item,
    kind,
    ...(geo ? { lat: geo.lat, lng: geo.lng } : {}),
    mapsUrl,
    link: mapsUrl,
    mapsQuery: item.mapsQuery || resolvePlaceSearchQuery(item),
  };
}

function renderPlaceMapActions(item, placeId) {
  const mapsUrl = escAttr(item.mapsUrl || resolvePlaceMapsUrl(item));
  const lat = item.lat != null ? ` data-lat="${item.lat}"` : "";
  const lng = item.lng != null ? ` data-lng="${item.lng}"` : "";
  const query = escAttr(item.mapsQuery || resolvePlaceSearchQuery(item));
  const kind = escAttr(item.kind || "place");
  const name = escAttr(placeEnName(item.name || item.label) || item.name || item.label || "");
  return `
    <a href="${mapsUrl}" target="_blank" rel="noopener noreferrer" class="external-link">פתיחה ב-Google Maps</a>
    <button type="button" class="place-map-btn" data-show-on-map
      data-place-id="${escAttr(placeId)}"
      data-place-kind="${kind}"
      data-place-name="${name}"
      data-maps-url="${mapsUrl}"
      data-maps-query="${query}"${lat}${lng}>הצג על המפה</button>`;
}

function renderPlaceCards(items, type = "place") {
  if (!items || !items.length) return "";
  return `
    <div class="place-grid">
      ${items
        .map((raw, index) => {
          const item = enrichPlaceItem(raw, type);
          const placeId = placeCardKey(type, index, item.name);
          const isTraveler = item.source === "traveler-stories";
          const isBooked = item.booked === true || /✅\s*Booked|✅\s*מאושר/.test(item.note || "");
          const badge = isTraveler
            ? `<span class="place-source-badge">📖 סיפורי מטיילים</span>`
            : "";
          const bookedBadge = isBooked
            ? `<span class="place-booked-badge">✅ Booked</span>`
            : "";
          const address = item.address
            ? `<p class="place-card-address">📍 ${item.address}</p>`
            : "";
          const storyLink =
            isTraveler && item.storyDay
              ? `<a href="${storiesPageHref(item.storyDay)}" class="place-card-story-link">לסיפור ←</a>`
              : "";
          const booking =
            item.bookingUrl
              ? `<a href="${item.bookingUrl}" target="_blank" rel="noopener noreferrer" class="external-link">הזמנה / Airbnb</a>`
              : "";
          return `
        <article class="place-card${isTraveler ? " place-card--traveler" : ""}${isBooked ? " place-card--booked" : ""}" data-place-id="${escAttr(placeId)}">
          ${renderImg(item.image, "", item.name, "supra")}
          <div class="place-card-body">
            ${bookedBadge}${badge}
            <h3>${item.name}</h3>
            ${item.cuisine ? `<p>${item.cuisine}</p>` : ""}
            ${item.area ? `<p>${item.area}</p>` : ""}
            ${address}
            ${item.note ? `<p>${item.note}</p>` : ""}
            <div class="place-card-actions">
              ${renderPlaceMapActions(item, placeId)}
              ${booking}
              ${storyLink}
            </div>
          </div>
        </article>`;
        })
        .join("")}
    </div>
  `;
}

function renderActivityGallery(gallery) {
  if (!gallery?.length) return "";
  return `
    <div class="activity-gallery">
      ${gallery
        .map(
          (item) => `
        <figure class="activity-gallery-item">
          ${renderImg(item.src, "activity-gallery-img", item.caption || "")}
          ${item.caption ? `<figcaption>${item.caption}</figcaption>` : ""}
        </figure>`
        )
        .join("")}
    </div>`;
}

function renderActivities(activities) {
  if (!activities || !activities.length) return "<p>אין פעילויות מתוכננות.</p>";
  return `<div class="activities-list">${activities
    .map(
      (a) => `
    <article class="activity-item has-image">
      ${renderImg(a.image, "activity-img", a.name || "")}
      <div class="activity-body">
        <div class="activity-header">
          <h3>${a.name}</h3>
          <div class="activity-badges">
            ${a.timeOfDay ? `<span class="badge badge-time">${a.timeOfDay}</span>` : ""}
            ${a.duration ? `<span class="badge badge-duration">⏱ ${a.duration}</span>` : ""}
          </div>
        </div>
        <p>${a.description}</p>
        ${
          a.tips && a.tips.length
            ? `<ul class="activity-tips">${a.tips.map((t) => `<li>${t}</li>`).join("")}</ul>`
            : ""
        }
        ${
          a.links?.length
            ? `<ul class="activity-links">${a.links
                .map(
                  (l) =>
                    `<li><a href="${l.url}" target="_blank" rel="noopener noreferrer" class="external-link">${l.label}</a></li>`
                )
                .join("")}</ul>`
            : a.link
              ? `<a href="${a.link}" target="_blank" rel="noopener noreferrer" class="external-link">${a.linkLabel || "פתיחה במפה / מידע נוסף"}</a>`
              : ""
        }
        ${renderActivityGallery(a.gallery)}
      </div>
    </article>
  `
    )
    .join("")}</div>`;
}

function renderRaftingKutaisiCard(dayId) {
  if (typeof RAFTING_KUTAISI === "undefined") return "";
  const optionB = typeof getStoredTripOptionId === "function" && getStoredTripOptionId() === "b";
  if (optionB) {
    if (![4, 5].includes(dayId)) return "";
  } else if (!RAFTING_KUTAISI.relatedDays.includes(dayId)) {
    return "";
  }
  const op = RAFTING_KUTAISI;
  let dayTours = op.tours.filter((t) => t.relatedDays.includes(dayId));
  if (optionB && dayId === 4) {
    // הגעה בערב – רפטינג רק ביום 5
    dayTours = [];
  }
  if (optionB && dayId === 5) {
    dayTours = op.tours.filter(
      (t) => t.relatedDays.includes(5) && /rioni|rafting/i.test(`${t.name} ${t.url || ""}`)
    );
    if (!dayTours.length) {
      dayTours = op.tours.filter((t) => t.relatedDays.includes(5));
    }
  }
  const camp = op.camping;
  const showCamp = camp && (optionB ? [4, 5].includes(dayId) : camp.relatedDays.includes(dayId));
  return `
    <div class="card operator-card">
      <h2>🛶 ${op.name}</h2>
      <p>${
        optionB && dayId === 5
          ? "בוקר רפטינג מ-Adventure Camping, אחר כך יציאה לצקאלטובו."
          : optionB && dayId === 4
            ? "הגעה למחנה אחר הצהריים – לינה ומסעדה. רפטינג מחר בבוקר."
            : op.summary
      }</p>
      <ul class="operator-contact">
        <li><a href="${op.home}" target="_blank" rel="noopener noreferrer" class="external-link">🌐 raftinginkutaisi.com</a></li>
        <li><a href="${op.contact.whatsapp}" target="_blank" rel="noopener noreferrer" class="external-link">📱 WhatsApp ${op.contact.phone}</a></li>
        <li><a href="${op.contact.emailLink}" class="external-link">✉️ ${op.contact.email}</a></li>
        <li><a href="${op.contact.maps}" target="_blank" rel="noopener noreferrer" class="external-link">📍 ${op.contact.address}</a></li>
      </ul>
      ${
        showCamp
          ? `<div class="operator-camping">
              <h3>🏕️ ${camp.name}</h3>
              <p>${
                optionB
                  ? "לינה ביום 4 · רפטינג בבוקר יום 5 · מסעדה במקום."
                  : camp.summary
              }</p>
              <p class="operator-tour-note">${
                optionB
                  ? "אופציה ב': check-in אחה\"צ יום 4 · רפטינג ~09:00 יום 5"
                  : camp.scheduleHint
              }</p>
              <p>${camp.restaurant}</p>
              <ul class="operator-lodging">${camp.lodging
                .map((l) => `<li><strong>${l.name}</strong> – ${l.price}<span class="operator-tour-note">${l.note}</span></li>`)
                .join("")}</ul>
              <ul class="link-list">${camp.links
                .map(
                  (l) =>
                    `<li><a href="${l.url}" target="_blank" rel="noopener noreferrer" class="external-link">${l.label}</a></li>`
                )
                .join("")}</ul>
            </div>`
          : ""
      }
      ${
        dayTours.length
          ? `<div class="operator-tours"><h3>סיורים רלוונטיים ליום זה</h3><ul>${dayTours
              .map(
                (t) =>
                  `<li><a href="${t.url}" target="_blank" rel="noopener noreferrer" class="external-link">${t.name}${t.price ? ` – ${t.price}` : ""}</a><span class="operator-tour-note">${t.note}</span></li>`
              )
              .join("")}</ul></div>`
          : ""
      }
      <a href="${op.home}" target="_blank" rel="noopener noreferrer" class="btn btn-primary operator-home-btn">הזמנה באתר Rafting in Kutaisi</a>
    </div>
  `;
}

function renderDayTips(tips) {
  if (!tips || !tips.length) return "";
  return `
    <div class="card tips-card">
      <h2>💡 טיפים ליום</h2>
      <ul class="day-tips">${tips.map((t) => `<li>${t}</li>`).join("")}</ul>
    </div>
  `;
}

function renderAlternatives(alts) {
  if (!alts || !alts.length) return "";
  return `
    <div class="card alt-options-card">
      <h2>🔄 תוכניות חלופיות</h2>
      ${alts
        .map(
          (a) => `
        <div class="alt-plan${a.recommended ? " alt-plan-recommended" : ""}">
          ${renderImg(a.image, "alt-plan-img", "", "mestia")}
          <div class="alt-plan-body">
            <h4>${a.name}</h4>
            ${a.driving ? `<p class="alt-driving">🚗 <span class="ltr-num">${a.driving}</span></p>` : ""}
            <p>${a.description}</p>
            ${a.overnight ? `<p class="alt-overnight">🏨 לינה: ${a.overnight}</p>` : ""}
            ${
              a.tips?.length
                ? `<ul class="alt-tips">${a.tips.map((t) => `<li>${t}</li>`).join("")}</ul>`
                : ""
            }
            ${
              a.activities?.length
                ? `<div class="alt-activities"><h5>📋 לוח זמנים מפורט</h5>${renderActivities(a.activities)}</div>`
                : ""
            }
            ${
              a.link
                ? `<a href="${a.link}" target="_blank" rel="noopener noreferrer" class="external-link">${a.linkLabel || "אתר / הזמנה"}</a>`
                : ""
            }
          </div>
        </div>
      `
        )
        .join("")}
    </div>
  `;
}

function getDayById(id) {
  const days = typeof getActiveDays === "function" ? getActiveDays() : DAYS;
  return days.find((d) => d.id === Number(id));
}

function getRouteSegmentForDay(dayId) {
  const segments =
    typeof getActiveRouteSegments === "function"
      ? getActiveRouteSegments()
      : typeof ROUTE_SEGMENTS !== "undefined"
        ? ROUTE_SEGMENTS
        : [];
  return segments.find((s) => s.day === Number(dayId)) || null;
}

/** "3.5h" / "20 min" / "2.5–3.5h" → תצוגה בעברית עם ~ */
function formatRouteDurationHe(duration) {
  if (!duration) return "";
  let d = String(duration).trim();
  d = d
    .replace(/(\d+(?:[.,]\d+)?(?:\s*[–—−-]\s*\d+(?:[.,]\d+)?)?)\s*h\b/gi, "$1 ש'")
    .replace(/(\d+(?:[.,]\d+)?(?:\s*[–—−-]\s*\d+(?:[.,]\d+)?)?)\s*mins?\b/gi, "$1 דק'")
    .replace(/\bhike\b/gi, "הליכה");
  return d.startsWith("~") ? d : `~${d}`;
}

/** הערות נסיעה (SUV, לינה…) בלי לכפול מרחק/זמן */
function drivingExtraNote(original) {
  if (!original) return "";
  return String(original)
    .split(/\s*·\s*/)
    .map((p) => p.trim())
    .filter((p) => {
      if (!p) return false;
      if (/ללא\s+נסיעות/i.test(p)) return false;
      if (/ק["״']?מ/.test(p)) return false;
      if (/\d/.test(p) && /(?:ש'|שעות|שעה|דק'|דקות|\bh\b|min|הליכה)/i.test(p) && p.length < 48) {
        return false;
      }
      return true;
    })
    .join(" · ");
}

/** מרחק כולל + זמן נסיעה בצמוד – ממקטע המסלול הפעיל */
function formatDayDriving(day) {
  if (!day) return "";
  const seg = getRouteSegmentForDay(day.id);
  if (!seg || (seg.distanceKm == null && !seg.duration)) {
    return day.driving || "";
  }

  const parts = [];
  if (Number(seg.distanceKm) === 0) {
    parts.push("ללא נסיעות");
  } else if (seg.distanceKm != null) {
    parts.push(`כ-${seg.distanceKm} ק"מ`);
  }
  if (seg.duration) {
    parts.push(formatRouteDurationHe(seg.duration));
  }

  const core = parts.join(" · ");
  const extra = drivingExtraNote(day.driving);
  return extra ? `${core} · ${extra}` : core;
}

const TRIP_YEAR = 2026;

function shortPlaceName(name) {
  if (!name || name === "—") return "";
  return name.split(" · ")[0].trim();
}

function addDayToTripDate(dateStr) {
  const [d, m] = dateStr.split(".").map(Number);
  const date = new Date(TRIP_YEAR, m - 1, d + 1);
  return `${date.getDate()}.${date.getMonth() + 1}`;
}

function getWeatherLocationForDay(dayId) {
  const segments =
    typeof getActiveRouteSegments === "function" ? getActiveRouteSegments() : ROUTE_SEGMENTS;
  const seg = segments.find((s) => s.day === dayId);
  if (seg?.to) return { name: seg.to.name, lat: seg.to.lat, lng: seg.to.lng };

  const day = getDayById(dayId);
  if (day?.mapPoints?.length) {
    const p = day.mapPoints[day.mapPoints.length - 1];
    return { name: p.name, lat: p.lat, lng: p.lng };
  }

  if (dayId === 13) {
    return { name: N.batumiAirport, lat: 41.6103, lng: 41.5997 };
  }
  return null;
}

function getTomorrowWeatherLocation(dayId) {
  if (getDayById(dayId + 1)) return getWeatherLocationForDay(dayId + 1);
  if (dayId === 13) return { name: N.telAviv, lat: 32.0853, lng: 34.7818 };
  return null;
}

function buildWeatherUrl(lat, lng) {
  return `https://www.meteoblue.com/he/weather/week/index?lat=${lat}&lon=${lng}`;
}

function renderDayWeatherCard(dayId, { inSidebar = true } = {}) {
  const day = getDayById(dayId);
  if (!day) return "";

  const todayLoc = getWeatherLocationForDay(dayId);
  const tomorrowDate = addDayToTripDate(day.date);
  const tomorrowLoc = getTomorrowWeatherLocation(dayId);

  const items = [];
  if (todayLoc) {
    items.push({
      date: day.date,
      weekday: day.weekday,
      place: shortPlaceName(todayLoc.name),
      url: buildWeatherUrl(todayLoc.lat, todayLoc.lng),
      note: "היום בטיול",
    });
  }
  if (tomorrowLoc) {
    const nextDay = getDayById(dayId + 1);
    items.push({
      date: tomorrowDate,
      weekday: nextDay?.weekday || "",
      place: shortPlaceName(tomorrowLoc.name),
      url: buildWeatherUrl(tomorrowLoc.lat, tomorrowLoc.lng),
      note: dayId === 13 ? "יום הנחיתה בישראל" : "מחר בטיול",
    });
  }

  if (!items.length) return "";

  return `
    <div class="card weather-card${inSidebar ? " sidebar-card" : ""}">
      <h2>🌤 מזג אוויר</h2>
      <ul class="weather-links">
        ${items
          .map(
            (item) => `
          <li>
            <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="external-link weather-link">
              ${item.date}${item.weekday ? ` (${item.weekday})` : ""} · ${item.place}
            </a>
            <span class="weather-link-note">${item.note}</span>
          </li>`
          )
          .join("")}
      </ul>
    </div>`;
}

function resolveImageUrl(url) {
  if (!url || typeof url !== "string") return url;
  const m = url.match(/^IMG\.(\w+)$/);
  if (m && typeof IMG !== "undefined" && IMG[m[1]]) return IMG[m[1]];
  return url;
}

function renderImg(src, className, alt = "", fallbackKey = "mestia") {
  const url = resolveImageUrl(src);
  const fallback = typeof IMG !== "undefined" ? IMG[fallbackKey] : "";
  const resolved = url || fallback;
  if (!resolved) return "";
  const onerr =
    fallback && resolved !== fallback ? ` onerror="this.onerror=null;this.src='${fallback}'"` : "";
  const cls = className ? ` class="${className}"` : "";
  return `<img${cls} src="${resolved}" alt="${alt}" loading="lazy" referrerpolicy="no-referrer"${onerr}>`;
}

function getStoriesForDay(dayId) {
  if (typeof TRAVELER_STORIES === "undefined") return null;
  const map =
    typeof getActiveTravelerStoriesMap === "function"
      ? getActiveTravelerStoriesMap()
      : TRAVELER_STORIES;
  return map[dayId] || null;
}

function storiesPageHref(dayId) {
  if (typeof storiesHref === "function") return storiesHref(dayId);
  const opt =
    typeof getStoredTripOptionId === "function" && getStoredTripOptionId() === "b" ? "b" : "a";
  return `stories.html?id=${dayId}&option=${opt}`;
}

function getStoryCount(dayId) {
  const data = getStoriesForDay(dayId);
  return data?.stories?.length || 0;
}

function renderStorySource(story) {
  const src = story.source;
  if (!src?.url) return "";
  const label = src.label || src.name || src.url;
  return `<span class="story-source"><a href="${src.url}" target="_blank" rel="noopener noreferrer" class="external-link">🔗 מקור: ${label}</a></span>`;
}

function renderStoryLinks(links) {
  if (!links?.length) return "";
  return `
    <ul class="story-links">
      ${links
        .map(
          (link) =>
            `<li><a href="${link.url}" target="_blank" rel="noopener noreferrer" class="external-link">${link.label}</a></li>`
        )
        .join("")}
    </ul>
  `;
}

function renderStoryGallery(gallery) {
  if (!gallery?.length) return "";
  return `
    <div class="story-gallery">
      ${gallery
        .map(
          (item) => `
        <figure class="story-gallery-item">
          <img src="${resolveImageUrl(item.src)}" alt="${item.caption || ""}" loading="lazy" referrerpolicy="no-referrer"${typeof IMG !== "undefined" ? ` onerror="this.onerror=null;this.src='${IMG.mestia}'"` : ""}>
          ${item.caption ? `<figcaption>${item.caption}</figcaption>` : ""}
        </figure>
      `
        )
        .join("")}
    </div>
  `;
}

function renderStorySections(sections) {
  if (!sections?.length) return "";
  return sections
    .map(
      (section) => `
    <div class="story-section">
      <h3>${section.title}</h3>
      ${
        section.items?.length
          ? `<ul class="story-section-list">${section.items.map((item) => `<li>${item}</li>`).join("")}</ul>`
          : ""
      }
      ${
        section.subsections?.length
          ? section.subsections
              .map(
                (sub) => `
        <div class="story-subsection">
          <h4>${sub.title}</h4>
          <ul class="story-section-list">${sub.items.map((item) => `<li>${item}</li>`).join("")}</ul>
        </div>`
              )
              .join("")
          : ""
      }
    </div>`
    )
    .join("");
}

function enrichCulinaryItem(item, kind) {
  const name = item.label || item.name;
  return enrichPlaceItem(
    {
      ...item,
      name,
      label: name,
      mapsUrl: item.mapsUrl,
      mapsQuery: item.mapsQuery || `${placeEnName(name)} Georgia`,
      link: item.mapsUrl || item.link,
    },
    kind
  );
}

function renderCulinaryPlaceCards(items, kind) {
  if (!items?.length) return "";
  return `
    <div class="place-grid culinary-place-grid">
      ${items
        .map((raw, index) => {
          const item = enrichCulinaryItem(raw, kind);
          const placeId = placeCardKey(kind, index, item.name);
          const fb =
            item.url && /facebook\.com/i.test(item.url)
              ? `<a href="${escAttr(item.url)}" target="_blank" rel="noopener noreferrer" class="external-link">📘 פייסבוק</a>`
              : item.url
                ? `<a href="${escAttr(item.url)}" target="_blank" rel="noopener noreferrer" class="external-link">קישור</a>`
                : "";
          return `
        <article class="place-card place-card--culinary" data-place-id="${escAttr(placeId)}">
          <div class="place-card-body">
            <h3>${item.name}</h3>
            ${item.note ? `<p>${item.note}</p>` : ""}
            <div class="place-card-actions">
              ${renderPlaceMapActions(item, placeId)}
              ${fb}
            </div>
          </div>
        </article>`;
        })
        .join("")}
    </div>`;
}

function renderCulinaryLinksCard(dayId) {
  if (typeof CULINARY_LINKS === "undefined") return "";
  let lookupDay = dayId;
  let dayLinks = null;
  if (typeof getStoredTripOptionId === "function" && getStoredTripOptionId() === "b") {
    // אופציה ב': מפת ימים שונה – חוף / Sairme / קוטאיסי / צקאלטובו
    dayLinks = CULINARY_LINKS.byDayOptionB?.[dayId] || null;
    if (!dayLinks) {
      if (dayId === 2) lookupDay = 1; // אדג'ריה / חוף
      else if (dayId === 4) lookupDay = 3; // סדנאות קוטאיסי
      else lookupDay = dayId;
    }
  }
  if (!dayLinks) dayLinks = CULINARY_LINKS.byDay?.[lookupDay];
  if (!dayLinks) return "";
  const workshops = dayLinks.workshops || [];
  const wineries = dayLinks.wineries || [];
  if (!workshops.length && !wineries.length) return "";

  const net = CULINARY_LINKS.network;
  return `
    <div class="card operator-card culinary-card">
      <h2>🍳🍷 סדנאות בישול ויקבים</h2>
      <p class="culinary-network-note">
        <a href="${net.url}" target="_blank" rel="noopener noreferrer" class="external-link">${net.label}</a>
        – ${net.note}
        ${net.phone ? `<br>📱 ${net.phone}` : ""}
      </p>
      ${
        workshops.length
          ? `<div class="culinary-group"><h3>👨‍🍳 סדנאות בישול</h3>${renderCulinaryPlaceCards(workshops, "workshop")}</div>`
          : ""
      }
      ${
        wineries.length
          ? `<div class="culinary-group"><h3>🍷 יקבים וטעימות</h3>${renderCulinaryPlaceCards(wineries, "winery")}</div>`
          : ""
      }
    </div>
  `;
}

function collectDaySidePlaces(day, dayId) {
  const places = [];
  (day.hotels || []).forEach((raw, index) => {
    const item = enrichPlaceItem(raw, "lodging");
    places.push({
      id: placeCardKey("lodging", index, item.name),
      name: placeEnName(item.name) || item.name,
      kind: "lodging",
      lat: item.lat,
      lng: item.lng,
      mapsUrl: item.mapsUrl,
      mapsQuery: item.mapsQuery,
    });
  });
  (day.restaurants || []).forEach((raw, index) => {
    const item = enrichPlaceItem(raw, "restaurant");
    places.push({
      id: placeCardKey("restaurant", index, item.name),
      name: placeEnName(item.name) || item.name,
      kind: "restaurant",
      lat: item.lat,
      lng: item.lng,
      mapsUrl: item.mapsUrl,
      mapsQuery: item.mapsQuery,
    });
  });
  const culinary = typeof CULINARY_LINKS !== "undefined" ? CULINARY_LINKS.byDay?.[dayId] : null;
  (culinary?.workshops || []).forEach((raw, index) => {
    const item = enrichCulinaryItem(raw, "workshop");
    places.push({
      id: placeCardKey("workshop", index, item.name),
      name: placeEnName(item.name) || item.name,
      kind: "workshop",
      lat: item.lat,
      lng: item.lng,
      mapsUrl: item.mapsUrl,
      mapsQuery: item.mapsQuery,
    });
  });
  (culinary?.wineries || []).forEach((raw, index) => {
    const item = enrichCulinaryItem(raw, "winery");
    places.push({
      id: placeCardKey("winery", index, item.name),
      name: placeEnName(item.name) || item.name,
      kind: "winery",
      lat: item.lat,
      lng: item.lng,
      mapsUrl: item.mapsUrl,
      mapsQuery: item.mapsQuery,
    });
  });
  return places;
}

async function resolveCoordsForShowOnMap(btn) {
  const lat = btn.dataset.lat ? parseFloat(btn.dataset.lat) : NaN;
  const lng = btn.dataset.lng ? parseFloat(btn.dataset.lng) : NaN;
  if (Number.isFinite(lat) && Number.isFinite(lng)) return { lat, lng };

  const query = btn.dataset.mapsQuery || btn.dataset.placeName;
  if (!query || typeof searchPlaces !== "function") return null;
  const results = await searchPlaces(query);
  const hit = results?.[0];
  if (!hit) return null;
  btn.dataset.lat = String(hit.lat);
  btn.dataset.lng = String(hit.lng);
  return { lat: hit.lat, lng: hit.lng };
}

function bindDayPlaceCardActions() {
  document.querySelectorAll("[data-show-on-map]").forEach((btn) => {
    if (btn.dataset.bound === "1") return;
    btn.dataset.bound = "1";
    btn.addEventListener("click", async () => {
      const mapEl = document.getElementById("day-map");
      mapEl?.scrollIntoView({ behavior: "smooth", block: "center" });

      const api = window.__dayMapApi;
      if (!api?.ensurePlace) {
        btn.textContent = "אין מפה ליום זה";
        setTimeout(() => {
          btn.textContent = "הצג על המפה";
        }, 1800);
        return;
      }

      const original = btn.textContent;
      btn.disabled = true;
      btn.textContent = "מאתר…";
      try {
        const coords = await resolveCoordsForShowOnMap(btn);
        if (!coords) {
          btn.textContent = "לא נמצא מיקום";
          setTimeout(() => {
            btn.textContent = original;
            btn.disabled = false;
          }, 1800);
          return;
        }
        api.ensurePlace({
          id: btn.dataset.placeId,
          name: btn.dataset.placeName,
          kind: btn.dataset.placeKind || "place",
          lat: coords.lat,
          lng: coords.lng,
          mapsUrl: btn.dataset.mapsUrl,
        });
        btn.textContent = original;
      } catch (err) {
        console.warn("show-on-map failed", err);
        btn.textContent = "שגיאה באיתור";
        setTimeout(() => {
          btn.textContent = original;
        }, 1800);
      } finally {
        btn.disabled = false;
      }
    });
  });
}

function renderHikingTrailsCard(dayId) {
  if (typeof HIKING_TRAILS === "undefined") return "";
  const data = HIKING_TRAILS[dayId];
  if (!data?.trails?.length) return "";

  const trailsHtml = data.trails
    .map((t) => {
      const mapyOpen =
        t.mapy && typeof mapyUrl === "function"
          ? mapyUrl(t.mapy.lng, t.mapy.lat, t.mapy.zoom || 14)
          : t.mapy
            ? `https://mapy.cz/turisticka?x=${t.mapy.lng}&y=${t.mapy.lat}&z=${t.mapy.zoom || 14}`
            : null;
      const mapyFrame =
        t.mapy && typeof mapyEmbed === "function"
          ? mapyEmbed(t.mapy.lng, t.mapy.lat, t.mapy.zoom || 14)
          : t.mapy
            ? `https://frame.mapy.cz/turisticka?x=${t.mapy.lng}&y=${t.mapy.lat}&z=${t.mapy.zoom || 14}`
            : null;

      return `
      <article class="hiking-trail">
        ${t.image ? renderImg(t.image, "hiking-trail-img", t.name) : ""}
        <div class="hiking-trail-body">
          <h3>🥾 ${t.name}</h3>
          <ul class="hiking-meta">
            <li><strong>אורך:</strong> ${t.length}</li>
            <li><strong>משך:</strong> ${t.duration}</li>
            <li><strong>קושי:</strong> ${t.difficulty}</li>
            ${t.elevation ? `<li><strong>גובה / עלייה:</strong> ${t.elevation}</li>` : ""}
            ${t.type ? `<li><strong>סוג:</strong> ${t.type}</li>` : ""}
            ${t.start ? `<li><strong>התחלה:</strong> ${t.start}</li>` : ""}
          </ul>
          <p>${t.description}</p>
          ${
            t.tips?.length
              ? `<div class="hiking-block"><h4>טיפים</h4><ul>${t.tips.map((x) => `<li>${x}</li>`).join("")}</ul></div>`
              : ""
          }
          ${
            t.gear?.length
              ? `<div class="hiking-block"><h4>ציוד</h4><p class="hiking-gear">${t.gear.join(" · ")}</p></div>`
              : ""
          }
          ${
            mapyFrame
              ? `<div class="hiking-mapy">
                  <div class="hiking-mapy-header">
                    <strong>🗺 ${t.mapy.label || "Mapy.cz"}</strong>
                    ${
                      mapyOpen
                        ? `<a href="${mapyOpen}" target="_blank" rel="noopener noreferrer" class="external-link">פתיחה ב-Mapy.cz</a>`
                        : ""
                    }
                  </div>
                  <iframe
                    class="hiking-mapy-frame"
                    title="${t.mapy.label || "Mapy.cz"}"
                    src="${mapyFrame}"
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                    allowfullscreen
                  ></iframe>
                  <p class="hiking-mapy-note">שכבת turistická · מומלץ גם להוריד offline באפליקציית Mapy.cz</p>
                </div>`
              : ""
          }
          ${
            t.links?.length
              ? `<ul class="guide-link-list">${t.links
                  .map(
                    (l) =>
                      `<li><a href="${l.url}" target="_blank" rel="noopener noreferrer" class="external-link">${l.label}</a></li>`
                  )
                  .join("")}</ul>`
              : ""
          }
        </div>
      </article>`;
    })
    .join("");

  return `
    <div class="card hiking-trails-card">
      <h2>🥾 מסלולים רגליים</h2>
      ${data.intro ? `<p class="hiking-intro">${data.intro}</p>` : ""}
      ${trailsHtml}
    </div>`;
}

function renderMtiralaKutaisiCard(dayId) {
  if (typeof MTIRALA_KUTAISI === "undefined" || !MTIRALA_KUTAISI.relatedDays.includes(dayId)) return "";
  const { mtirala: m, kutaisi: k } = MTIRALA_KUTAISI;
  const hideKutaisi =
    typeof getStoredTripOptionId === "function" && getStoredTripOptionId() === "b";

  const renderGuideGallery = (items) =>
    items?.length
      ? `<div class="guide-gallery">${items
          .map(
            (item) => `
          <figure class="guide-gallery-item">
            ${renderImg(item.src, "guide-gallery-img", item.caption || "")}
            ${item.caption ? `<figcaption>${item.caption}</figcaption>` : ""}
          </figure>`
          )
          .join("")}</div>`
      : "";

  return `
    <div class="card operator-card guide-card">
      <h2>🌲 ${m.name}</h2>
      <p class="guide-tagline">${m.tagline}</p>
      <p>${m.summary}</p>
      <ul class="operator-contact">
        <li>📍 ${m.visitorCenter}</li>
        <li>🕐 ${m.hours}</li>
        <li>📅 ${m.season}</li>
        <li>🎫 ${m.entrance}</li>
        <li><a href="${m.contact.phoneLink}" class="external-link">📱 ${m.contact.phone}</a></li>
      </ul>

      <div class="guide-section">
        <h3>🚗 הגעה</h3>
        <ul class="guide-list">${m.gettingThere.map((t) => `<li>${t}</li>`).join("")}</ul>
      </div>

      <div class="guide-section">
        <h3>🥾 מסלולי הליכה</h3>
        ${m.trails
          .map(
            (t) => `
          <div class="guide-trail">
            <h4>${t.name}</h4>
            <p class="guide-trail-meta">${t.length} · ${t.duration} · ${t.difficulty} · ${t.elevation}${t.season ? ` · ${t.season}` : ""}</p>
            <p>${t.description}</p>
            ${
              t.links?.length
                ? `<ul class="guide-link-list">${t.links
                    .map(
                      (l) =>
                        `<li><a href="${l.url}" target="_blank" rel="noopener noreferrer" class="external-link">${l.label}</a></li>`
                    )
                    .join("")}</ul>`
                : ""
            }
          </div>`
          )
          .join("")}
      </div>

      <div class="guide-section">
        <h3>🎢 Zipline & Rope Park</h3>
        <ul class="guide-adventure-list">${m.adventures
          .map(
            (a) =>
              `<li><a href="${a.url}" target="_blank" rel="noopener noreferrer" class="external-link"><strong>${a.name}</strong> – ${a.price}</a><span class="operator-tour-note">${a.note}</span></li>`
          )
          .join("")}</ul>
      </div>

      <div class="guide-section">
        <h3>🔗 לינקים שימושיים</h3>
        <ul class="guide-link-list">${m.links
          .map(
            (l) =>
              `<li><a href="${l.url}" target="_blank" rel="noopener noreferrer" class="external-link">${l.label}</a></li>`
          )
          .join("")}</ul>
      </div>

      ${renderGuideGallery(m.gallery)}

      <div class="guide-section">
        <h3>💡 טיפים – מטיראלה</h3>
        <ul class="guide-list">${m.tips.map((t) => `<li>${t}</li>`).join("")}</ul>
      </div>

      ${
        hideKutaisi
          ? `<p class="operator-tour-note">אופציה ב': אחרי מטיראלה – לינה באזור Supsa (לא קוטאיסי). סיבוב בעיר ביום 4.</p>`
          : `
      <hr class="guide-divider" />

      <h2>🏛 ${k.name}</h2>
      <p class="guide-tagline">${k.tagline}</p>
      <p>${k.summary}</p>

      <div class="guide-section">
        <h3>📍 נקודות עניין – ערב בקוטאיסי</h3>
        <ul class="guide-adventure-list">${k.sights
          .map(
            (s) =>
              `<li><a href="${s.url}" target="_blank" rel="noopener noreferrer" class="external-link"><strong>${s.name}</strong></a><span class="operator-tour-note">${s.note}</span></li>`
          )
          .join("")}</ul>
      </div>

      ${
        k.tours?.length
          ? `<div class="guide-section">
        <h3>🚶 סיורים מודרכים</h3>
        <ul class="guide-adventure-list">${k.tours
          .map(
            (t) =>
              `<li><a href="${t.url}" target="_blank" rel="noopener noreferrer" class="external-link"><strong>${t.name}</strong>${t.duration ? ` – ${t.duration}` : ""}</a><span class="operator-tour-note">${t.note || ""}</span></li>`
          )
          .join("")}</ul>
      </div>`
          : ""
      }

      <div class="guide-section">
        <h3>🔗 לינקים – קוטאיסי</h3>
        <ul class="guide-link-list">${k.links
          .map(
            (l) =>
              `<li><a href="${l.url}" target="_blank" rel="noopener noreferrer" class="external-link">${l.label}</a></li>`
          )
          .join("")}</ul>
      </div>

      ${renderGuideGallery(k.gallery)}

      <div class="guide-section">
        <h3>💡 טיפים – קוטאיסי</h3>
        <ul class="guide-list">${k.tips.map((t) => `<li>${t}</li>`).join("")}</ul>
      </div>`
      }
    </div>
  `;
}

function renderStoryFrame(story, index) {
  return `
    <article class="story-frame">
      <header class="story-frame-header">
        <span class="story-frame-num">${index + 1}</span>
        <div>
          <h2>${story.title}</h2>
          <div class="story-meta">
            ${story.author ? `<span>✍️ ${story.author}</span>` : ""}
            ${story.date ? `<span>📅 ${story.date}</span>` : ""}
            ${renderStorySource(story)}
          </div>
        </div>
      </header>
      ${story.image ? renderImg(story.image, "story-hero-img") : ""}
      <div class="story-body">
        ${(story.paragraphs || []).map((p) => `<p>${p}</p>`).join("")}
        ${renderStorySections(story.sections)}
        ${renderStoryLinks(story.links)}
        ${renderStoryGallery(story.gallery)}
      </div>
    </article>
  `;
}

function renderStoriesPage(dayId) {
  const day = enrichDay(getDayById(dayId));
  const data = getStoriesForDay(dayId);
  const el = document.getElementById("stories-content");

  if (!el) return;

  if (!day) {
    el.innerHTML = "<p>היום לא נמצא. <a href='index.html'>חזרה לדף הבית</a></p>";
    return;
  }

  document.title = `סיפורי מטיילים – יום ${day.id} | ${TRIP_META.title}`;

  const optId = typeof getStoredTripOptionId === "function" ? getStoredTripOptionId() : "a";
  const homeHref = optId === "b" ? "index.html?option=b" : "index.html";
  const dayLink = typeof dayHref === "function" ? dayHref(day.id) : `day.html?id=${day.id}`;

  const storiesHtml =
    data?.stories?.length > 0
      ? data.stories.map((story, i) => renderStoryFrame(story, i)).join("")
      : `<div class="card empty-stories"><p>עדיין אין סיפורים ליום זה – בקרוב.</p></div>`;

  el.innerHTML = `
    <section class="day-hero stories-hero">
      <div class="day-hero-inner container">
        <div class="breadcrumb">
          <a href="${homeHref}">דף הבית</a> /
          <a href="${dayLink}">יום ${day.id}</a> /
          סיפורי מטיילים
        </div>
        <h1>📖 סיפורי מטיילים – יום ${day.id}</h1>
        <p class="stories-hero-subtitle">${day.emoji} ${day.title} · ${day.date}</p>
      </div>
    </section>

    <div class="container stories-weather-wrap">
      ${renderDayWeatherCard(dayId, { inSidebar: false })}
    </div>

    <div class="container stories-page">
      ${data?.pageIntro ? `<p class="stories-intro">${data.pageIntro}</p>` : ""}
      ${
        data?.pageSource?.url
          ? `<p class="stories-page-source"><a href="${data.pageSource.url}" target="_blank" rel="noopener noreferrer" class="external-link">🔗 מקור: ${data.pageSource.label || data.pageSource.url}</a></p>`
          : ""
      }
      <div class="stories-list">${storiesHtml}</div>
    </div>

    <div class="container day-nav">
      ${
        dayId > 1
          ? `<a href="${storiesPageHref(dayId - 1)}">סיפורים יום ${dayId - 1} →</a>`
          : "<span></span>"
      }
      <a href="${dayLink}">תוכנית היום</a>
      ${
        dayId < 13
          ? `<a href="${storiesPageHref(dayId + 1)}">← סיפורים יום ${dayId + 1}</a>`
          : "<span></span>"
      }
    </div>
  `;
}

function enrichDay(day) {
  if (!day) return day;

  if (day.skipEnrichment) {
    let restaurants = [...(day.restaurants || [])];
    let hotels = [...(day.hotels || [])];
    let activities = [...(day.activities || [])];

    if (typeof getTravelerRestaurantsForDay === "function" && typeof mapTravelerRecToPlaceCard === "function") {
      getTravelerRestaurantsForDay(day.id).forEach((rec) => {
        restaurants.push(mapTravelerRecToPlaceCard(rec, "restaurant"));
      });
    }
    if (typeof getTravelerLodgingForDay === "function" && typeof mapTravelerRecToPlaceCard === "function") {
      getTravelerLodgingForDay(day.id).forEach((rec) => {
        hotels.push(mapTravelerRecToPlaceCard(rec, "lodging"));
      });
    }

    hotels = dedupePlaceItems(hotels);
    restaurants = dedupePlaceItems(restaurants);
    activities = filterActivitiesDuplicatingHotels(activities, hotels);

    return {
      ...day,
      tips: day.tips || [],
      driving: formatDayDriving(day),
      activities,
      restaurants,
      hotels,
      alternatives: day.alternatives || [],
    };
  }

  const e = typeof DAY_ENRICHMENT !== "undefined" ? DAY_ENRICHMENT[day.id] : null;

  const actDetails = typeof ACTIVITY_DETAILS !== "undefined" ? ACTIVITY_DETAILS[day.id] : null;
  let activities = (day.activities || []).map((a, i) => ({
    ...a,
    ...(actDetails?.[i] || {}),
    ...(e?.activityExtras?.[i] || {}),
  }));
  if (e?.extraActivities?.length) activities = [...activities, ...e.extraActivities];

  let restaurants = [...(day.restaurants || []), ...(e?.extraRestaurants || [])];
  let hotels = [...(day.hotels || []), ...(e?.extraHotels || [])];

  if (typeof getTravelerRestaurantsForDay === "function" && typeof mapTravelerRecToPlaceCard === "function") {
    getTravelerRestaurantsForDay(day.id).forEach((rec) => {
      restaurants.push(mapTravelerRecToPlaceCard(rec, "restaurant"));
    });
  }
  if (typeof getTravelerLodgingForDay === "function" && typeof mapTravelerRecToPlaceCard === "function") {
    getTravelerLodgingForDay(day.id).forEach((rec) => {
      hotels.push(mapTravelerRecToPlaceCard(rec, "lodging"));
    });
  }

  hotels = dedupePlaceItems(hotels);
  restaurants = dedupePlaceItems(restaurants);
  activities = filterActivitiesDuplicatingHotels(activities, hotels);

  const alternatives = (day.alternatives || []).map((alt, i) => {
    const altExtra =
      e?.alternativeExtras?.[i] ||
      e?.alternativeExtras?.[String(i)] ||
      (typeof ALTERNATIVE_ENRICHMENT !== "undefined" && ALTERNATIVE_ENRICHMENT[day.id]?.[i]) ||
      (typeof ALTERNATIVE_ENRICHMENT !== "undefined" && ALTERNATIVE_ENRICHMENT[day.id]?.[String(i)]) ||
      {};
    return { ...alt, ...altExtra };
  });

  return {
    ...day,
    summary: e?.summary || day.summary,
    tips: e?.tips || day.tips || [],
    heroImage: e?.heroImage || day.heroImage,
    driving: formatDayDriving(day),
    activities,
    restaurants,
    hotels,
    alternatives,
  };
}

function isDroneEnRoute(spot) {
  return spot?.kind === "enRoute";
}

function renderDroneSpotBadge(spot) {
  if (!isDroneEnRoute(spot)) return "";
  return `<span class="drone-spot-badge en-route">🛣 עצירה בדרך</span>`;
}

function renderDroneSpotChips(spots) {
  const groups = [
    { label: "📍 יעד", items: spots.filter((s) => !isDroneEnRoute(s)) },
    { label: "🛣 בדרך", items: spots.filter((s) => isDroneEnRoute(s)) },
  ].filter((g) => g.items.length);

  return groups
    .map(
      (g) => `
      <div class="drone-chip-group">
        <span class="drone-chip-label">${g.label}</span>
        <div class="drone-chip-row">
          ${g.items
            .map((s) => {
              const globalIndex = spots.indexOf(s);
              return `<button type="button" class="drone-spot-chip${isDroneEnRoute(s) ? " en-route" : ""}${globalIndex === 0 ? " active" : ""}" data-spot-id="${s.id}">${s.name}</button>`;
            })
            .join("")}
        </div>
      </div>`
    )
    .join("");
}

function renderDroneSpotsGrid(spots) {
  const groups = [
    { label: "📍 יעדי היום", items: spots.filter((s) => !isDroneEnRoute(s)) },
    { label: "🛣 עצירות בדרך", items: spots.filter((s) => isDroneEnRoute(s)) },
  ].filter((g) => g.items.length);

  return groups
    .map(
      (g) => `
      <div class="drone-spots-group">
        <h3 class="drone-spots-group-title">${g.label}</h3>
        <div class="drone-spots-grid">
          ${g.items
            .map(
              (s) => `
            <button type="button" class="drone-spot-card${isDroneEnRoute(s) ? " en-route" : ""}" data-spot-id="${s.id}">
              ${renderImg(s.image, "drone-spot-card-img", s.name)}
              <div class="drone-spot-card-body">
                ${renderDroneSpotBadge(s)}
                <strong>${s.name}</strong>
                <p>${s.description}</p>
              </div>
            </button>`
            )
            .join("")}
        </div>
      </div>`
    )
    .join("");
}

function renderDroneSpotGallery(spot) {
  const items = spot.gallery?.length ? spot.gallery : [];
  if (!items.length) return "";
  return `<div class="guide-gallery">${items
    .map(
      (item) => `
    <figure class="guide-gallery-item">
      ${renderImg(item.src, "guide-gallery-img", item.caption || "")}
      ${item.caption ? `<figcaption>${item.caption}</figcaption>` : ""}
    </figure>`
    )
    .join("")}</div>`;
}

function renderDroneSpotDetail(spot) {
  if (!spot) {
    return `<div class="drone-detail-empty"><p>לחצו על נקודה במפה או ברשימה</p></div>`;
  }
  return `
    ${renderImg(spot.image, "drone-detail-img", spot.name)}
    <div class="drone-detail-body">
      ${renderDroneSpotBadge(spot)}
      <h3>${spot.name}</h3>
      <p>${spot.description}</p>
      ${
        spot.tips?.length
          ? `<ul class="drone-tips">${spot.tips.map((t) => `<li>${t}</li>`).join("")}</ul>`
          : ""
      }
      ${renderDroneSpotGallery(spot)}
      ${
        spot.link
          ? `<p class="drone-detail-link"><a href="${spot.link}" target="_blank" rel="noopener noreferrer" class="external-link">${spot.linkLabel || "מפה"}</a></p>`
          : ""
      }
    </div>`;
}

function renderDroneSpotsSection(dayId) {
  const data =
    typeof getDroneSpotsForDay === "function"
      ? getDroneSpotsForDay(dayId)
      : typeof DRONE_SPOTS !== "undefined"
        ? DRONE_SPOTS[dayId]
        : null;
  if (!data?.spots?.length) return "";

  const day = typeof getDayById === "function" ? enrichDay(getDayById(dayId)) : null;
  const dayRoutes = day ? getDayMapRoutes(day) : [];
  const multiRoutes = dayRoutes.length > 1;

  const drones = typeof LOGISTICS !== "undefined" ? LOGISTICS.drones : null;
  const legalLinks = drones?.links
    ?.map(
      (l) =>
        `<a href="${l.url}" target="_blank" rel="noopener noreferrer" class="external-link">${l.label}</a>`
    )
    .join(" · ");

  const routeLegend = dayRoutes.length
    ? dayRoutes
        .map((r, i) => {
          const color = r.color || ["#7b2d3e", "#2d5a3d", "#c47b2b", "#2980b9"][i % 4];
          return `<span><span class="drone-legend-line" style="border-color:${color}"></span> ${r.label || "מסלול היום"}</span>`;
        })
        .join("")
    : `<span><span class="drone-legend-line" style="border-color:#7b2d3e"></span> מסלול היום</span>`;

  return `
    <div class="card drone-spots-card">
      <h2>🚁 רחפן – נקודות צילום מומלצות</h2>
      ${data.intro ? `<p class="drone-intro">${data.intro}</p>` : ""}
      ${
        drones
          ? `<p class="drone-legal-note">⚠️ ${drones.summary}${legalLinks ? ` · ${legalLinks}` : ""} · <a href="logistics.html#drones" class="external-link">כללי רחפן</a></p>`
          : ""
      }
      <div class="drone-map-legend">
        ${routeLegend}
        <span><span class="drone-legend-dot destination"></span> נקודת רחפן</span>
        <span><span class="drone-legend-dot en-route"></span> רחפן – עצירה בדרך</span>
        ${multiRoutes ? `<span class="drone-legend-note">קו מקווקו = אופציות מסלול</span>` : ""}
      </div>
      <div class="drone-map-layout">
        <div class="drone-map-wrap">
          <div id="drone-map-${dayId}" class="drone-map"></div>
          <div class="drone-spot-chips" id="drone-chips-${dayId}">
            ${renderDroneSpotChips(data.spots)}
          </div>
        </div>
        <div class="drone-detail" id="drone-detail-${dayId}">
          ${renderDroneSpotDetail(data.spots[0])}
        </div>
      </div>
      ${renderDroneSpotsGrid(data.spots)}
    </div>`;
}

function initDroneSpotsSection(dayId) {
  const data =
    typeof getDroneSpotsForDay === "function"
      ? getDroneSpotsForDay(dayId)
      : typeof DRONE_SPOTS !== "undefined"
        ? DRONE_SPOTS[dayId]
        : null;
  if (!data?.spots?.length) return;

  const day = enrichDay(getDayById(dayId));
  const dayRoutes = day ? getDayMapRoutes(day) : [];

  const detailEl = document.getElementById(`drone-detail-${dayId}`);
  const chipsEl = document.getElementById(`drone-chips-${dayId}`);
  const cards = document.querySelectorAll(`.drone-spots-card .drone-spot-card[data-spot-id]`);

  let ctrl = null;

  const selectSpot = (spot) => {
    if (!spot || !detailEl) return;
    detailEl.innerHTML = renderDroneSpotDetail(spot);
    chipsEl?.querySelectorAll(".drone-spot-chip").forEach((chip) => {
      chip.classList.toggle("active", chip.dataset.spotId === spot.id);
    });
    cards.forEach((card) => {
      card.classList.toggle("active", card.dataset.spotId === spot.id);
    });
    ctrl?.highlight(spot.id);
  };

  ctrl = initDroneSpotsMap(`drone-map-${dayId}`, {
    spots: data.spots,
    dayRoutes,
    overnight: day?.overnight,
    onSelect: selectSpot,
  });

  chipsEl?.querySelectorAll(".drone-spot-chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      const spot = data.spots.find((s) => s.id === chip.dataset.spotId);
      selectSpot(spot);
    });
  });

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const spot = data.spots.find((s) => s.id === card.dataset.spotId);
      selectSpot(spot);
    });
  });
}

function renderDayNav(dayId, { top = false } = {}) {
  const href =
    typeof dayHref === "function" ? (id) => dayHref(id) : (id) => `day.html?id=${id}`;
  const optId = typeof getStoredTripOptionId === "function" ? getStoredTripOptionId() : "a";
  const homeHref = optId === "b" ? "index.html?option=b#map" : "index.html";
  const prev =
    dayId > 1
      ? `<a href="${href(dayId - 1)}">יום ${dayId - 1} →</a>`
      : "<span></span>";
  const next =
    dayId < 13
      ? `<a href="${href(dayId + 1)}">← יום ${dayId + 1}</a>`
      : "<span></span>";
  const center = `<a href="${homeHref}">כל הימים</a>`;
  const cls = top ? "day-nav day-nav-top" : "container day-nav";
  return `<nav class="${cls}" aria-label="ניווט בין ימים">${prev}${center}${next}</nav>`;
}

function getDayMapRoutes(day) {
  if (day?.mapRoutes?.length) {
    return day.mapRoutes.map((r) => ({
      ...r,
      dashed: r.dashed ?? day.mapRoutes.length > 1,
    }));
  }

  const segments =
    typeof getActiveRouteSegments === "function" ? getActiveRouteSegments() : ROUTE_SEGMENTS;
  const seg = segments?.find((s) => s.day === day.id);

  if (seg) {
    const points = [
      { name: seg.from.name, lat: seg.from.lat, lng: seg.from.lng },
      ...(seg.waypoints || []).map((wp) => ({
        name: wp.name,
        lat: wp.lat,
        lng: wp.lng,
      })),
    ];
    const sameEnd =
      seg.loop && seg.from.lat === seg.to.lat && seg.from.lng === seg.to.lng;
    if (!sameEnd) {
      points.push({ name: seg.to.name, lat: seg.to.lat, lng: seg.to.lng });
    } else if (seg.waypoints?.length) {
      points.push({ name: seg.from.name, lat: seg.from.lat, lng: seg.from.lng });
    }
    return [{ label: `יום ${day.id}`, points, dashed: false }];
  }

  if (day?.mapPoints?.length) {
    return [{ label: `יום ${day.id}`, points: day.mapPoints, dashed: false }];
  }

  return [];
}

function renderDayPage(dayId) {
  const day = enrichDay(getDayById(dayId));
  if (!day) {
    document.getElementById("day-content").innerHTML =
      "<p>היום לא נמצא. <a href='index.html'>חזרה לדף הבית</a></p>";
    return;
  }

  document.title = `יום ${day.id} – ${day.title} | ${TRIP_META.title}`;
  const heroStyle = day.heroImage
    ? ` style="background-image: linear-gradient(to bottom, rgba(90,31,45,0.75), rgba(45,90,61,0.85)), url('${resolveImageUrl(day.heroImage)}')"`
    : "";

  const optId = typeof getStoredTripOptionId === "function" ? getStoredTripOptionId() : "a";
  const opt = typeof getTripOption === "function" ? getTripOption(optId) : null;
  const homeHref = optId === "b" ? "index.html?option=b" : "index.html";
  const optionBadge =
    opt && typeof TRIP_OPTIONS !== "undefined"
      ? `<div class="day-option-badge">${opt.name} · ${opt.blurb}</div>`
      : "";

  document.getElementById("day-content").innerHTML = `
    <section class="day-hero"${heroStyle}>
      <div class="day-hero-inner container">
        <div class="breadcrumb"><a href="${homeHref}">דף הבית</a> / יום ${day.id}</div>
        ${renderDayNav(dayId, { top: true })}
        ${optionBadge}
        <h1>${day.emoji} יום ${day.id}: ${day.title}</h1>
        <div class="day-meta-row">
          <span>📅 ${day.date} (${day.weekday})</span>
          <span>🚗 <span class="ltr-num">${day.driving}</span></span>
          <span>🏨 ${day.overnight}</span>
        </div>
      </div>
    </section>

    <div class="container content-grid">
      <main>
        ${
          getStoryCount(dayId) > 0
            ? `
        <a href="${storiesPageHref(dayId)}" class="stories-banner card">
          <span class="stories-banner-icon">📖</span>
          <div>
            <strong>סיפורי מטיילים</strong>
            <p>${getStoryCount(dayId)} סיפורים מהשטח – המלצות, תמונות ולינקים</p>
          </div>
          <span class="stories-banner-arrow">←</span>
        </a>`
            : ""
        }

        <div class="card">
          <h2>📋 תוכנית היום</h2>
          <p class="day-summary">${day.summary}</p>
          ${renderActivities(day.activities)}
        </div>

        ${renderMtiralaKutaisiCard(dayId)}

        ${renderHikingTrailsCard(dayId)}

        ${typeof renderMestiaVehicleGuideHtml === "function" && [7, 8, 9].includes(dayId) ? renderMestiaVehicleGuideHtml({ dayId }) : ""}

        ${renderRaftingKutaisiCard(dayId)}

        ${renderCulinaryLinksCard(dayId)}

        ${renderDayTips(day.tips)}

        ${renderAlternatives(day.alternatives)}

        <div class="card">
          <h2>🍽 מסעדות מומלצות</h2>
          ${
            day.restaurants && day.restaurants.length
              ? renderPlaceCards(day.restaurants, "restaurant")
              : "<p class='empty-section'>אין המלצות ספציפיות ליום זה – שאלו את המארח/ת או חפשו באזור הלינה.</p>"
          }
        </div>

        <div class="card">
          <h2>🏨 לינה</h2>
          ${
            day.hotels && day.hotels.length
              ? renderPlaceCards(day.hotels, "lodging")
              : "<p class='empty-section'>לינה לא רלוונטית (יום נסיעה / המראה).</p>"
          }
        </div>

        ${renderDroneSpotsSection(dayId)}
      </main>

      <aside>
        ${renderDayWeatherCard(dayId)}
        <div class="card sidebar-card">
          <h2>פרטים</h2>
          <div class="info-row"><span>תאריך</span><span>${day.date}</span></div>
          <div class="info-row"><span>נושא</span><span>${day.theme}</span></div>
          <div class="info-row"><span>נהיגה</span><span class="ltr-num">${day.driving}</span></div>
          <div class="info-row"><span>לינה</span><span>${day.overnight}</span></div>
          <div id="day-map"></div>
          <div id="day-map-legend" class="day-map-legend" hidden></div>
          <p style="margin-top:1rem;font-size:0.85rem">
            <a href="${TRIP_META.globalMapUrl}" target="_blank" rel="noopener noreferrer" class="external-link">
              מפת Google המלאה
            </a>
          </p>
        </div>
        ${
          getStoryCount(dayId) > 0
            ? `
        <div class="card sidebar-card stories-sidebar">
          <h2>📖 סיפורי מטיילים</h2>
          <p>${getStoryCount(dayId)} סיפורים עם תמונות, לינקים וטיפים מהשטח</p>
          <a href="${storiesPageHref(dayId)}" class="btn btn-outline stories-sidebar-btn">לסיפורים ←</a>
        </div>`
            : ""
        }
      </aside>
    </div>

    ${renderDayNav(dayId)}
  `;

  const dayRoutes = getDayMapRoutes(day);
  const sidePlaces = collectDaySidePlaces(day, dayId);
  window.__dayMapApi = null;
  if (dayRoutes.length || sidePlaces.length) {
    setTimeout(() => {
      window.__dayMapApi = initDayMap("day-map", {
        routes: dayRoutes.length ? dayRoutes : [{ label: `יום ${dayId}`, points: [], dashed: false }],
        overnight: day.overnight,
        dayId,
        places: sidePlaces,
      });
      bindDayPlaceCardActions();
    }, 100);
  } else {
    setTimeout(() => bindDayPlaceCardActions(), 100);
  }
  if (
    (typeof getDroneSpotsForDay === "function"
      ? getDroneSpotsForDay(dayId)
      : typeof DRONE_SPOTS !== "undefined"
        ? DRONE_SPOTS[dayId]
        : null
    )?.spots?.length
  ) {
    setTimeout(() => initDroneSpotsSection(dayId), 150);
  }
}

function renderAccommodationSummary() {
  const tbody = document.getElementById("accommodation-body");
  if (!tbody) return;
  const rows =
    typeof getActiveAccommodationSummary === "function"
      ? getActiveAccommodationSummary()
      : LOGISTICS.accommodationSummary;
  tbody.innerHTML = rows
    .map(
      (row) => `
        <tr>
          <td>${row.place}</td>
          <td>${row.nights}</td>
          <td>${row.note}</td>
        </tr>
      `
    )
    .join("");
}

function renderDaysGrid() {
  const grid = document.getElementById("days-grid");
  if (!grid) return;

  const days = typeof getActiveDays === "function" ? getActiveDays() : DAYS;
  const href = typeof dayHref === "function" ? (id) => dayHref(id) : (id) => `day.html?id=${id}`;

  grid.innerHTML = days
    .map((day) => {
      const d = enrichDay(day);
      return `
    <article class="day-card">
      ${d.heroImage ? `<div class="day-card-thumb" style="background-image:url('${resolveImageUrl(d.heroImage)}')"></div>` : ""}
      <div class="day-card-header">
        <div class="day-card-num">${d.emoji} יום ${d.id} · ${d.date} (${d.weekday})</div>
        <h3 class="day-card-title"><a href="${href(d.id)}" class="day-card-title-link">${d.title}</a></h3>
      </div>
      <div class="day-card-body">
        <div class="day-card-meta">${d.theme} · <span class="ltr-num">${d.driving}</span></div>
        <p class="day-card-summary">${d.summary}</p>
        <div class="day-card-overnight">🏨 ${d.overnight}</div>
        <div class="day-card-links">
          <a href="${href(d.id)}" class="day-card-link">פרטים מלאים ←</a>
          ${
            getStoryCount(d.id) > 0
              ? `<a href="${storiesPageHref(d.id)}" class="day-card-link day-card-stories">📖 סיפורי מטיילים</a>`
              : ""
          }
        </div>
      </div>
    </article>
  `;
    })
    .join("");
}

let routeMapApi = null;

function destroyRouteMap() {
  if (routeMapApi?.map) {
    try {
      routeMapApi.map.remove();
    } catch {
      /* ignore */
    }
    routeMapApi = null;
  }
  const mapEl = document.getElementById("route-map");
  if (mapEl) {
    mapEl.innerHTML = "";
    if (mapEl._leaflet_id) delete mapEl._leaflet_id;
  }
  const measurePanel = document.getElementById("poi-measure-panel");
  if (measurePanel) {
    measurePanel.hidden = true;
    measurePanel.innerHTML = "";
  }
}

function renderHomeRouteMap() {
  destroyRouteMap();
  const segments =
    typeof getActiveRouteSegments === "function" ? getActiveRouteSegments() : ROUTE_SEGMENTS;
  routeMapApi = initRouteMap("route-map", segments, DAY_COLORS, {
    activities: typeof EXTREME_ACTIVITIES !== "undefined" ? EXTREME_ACTIVITIES : [],
    categories: typeof EXTREME_CATEGORIES !== "undefined" ? EXTREME_CATEGORIES : null,
  });
}

function renderTripOptions() {
  const host = document.getElementById("trip-options");
  if (!host || typeof TRIP_OPTIONS === "undefined") return;

  const activeId = getStoredTripOptionId();

  host.innerHTML = `
    <div class="trip-options-intro">
      <h3 class="trip-options-heading">בחירת מסלול לימים 2–5</h3>
      <p class="trip-options-note">מיום 6 ואילך המסלול זהה. הלחיצה מעדכנת את המפה, רשימת הימים, הלינות ודפי היום (כולל רחפן).</p>
    </div>
    <div class="trip-options-grid" role="radiogroup" aria-label="אופציות מסלול">
      ${TRIP_OPTIONS.map((opt) => {
        const segments = opt.getSegments();
        const km = totalRouteKm(segments);
        const daysDelta = opt.id === "b" ? [2, 3, 4, 5] : [2, 3, 4];
        const days24 = totalRouteKm(segments.filter((s) => daysDelta.includes(s.day)));
        const selected = opt.id === activeId;
        return `
          <button type="button"
            class="trip-option-card${selected ? " is-selected" : ""}"
            role="radio"
            aria-checked="${selected}"
            data-option="${opt.id}">
            <div class="trip-option-top">
              <span class="trip-option-name">${opt.name}</span>
              <span class="trip-option-km ltr-num">${km.toLocaleString("en-US")} km</span>
            </div>
            <div class="trip-option-blurb">${opt.blurb}</div>
            <div class="trip-option-highlight">${opt.highlight}</div>
            <div class="trip-option-subkm ltr-num">ימים ${daysDelta[0]}–${daysDelta[daysDelta.length - 1]}: ${days24} km</div>
          </button>
        `;
      }).join("")}
    </div>
  `;

  host.querySelectorAll("[data-option]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-option");
      if (id === getStoredTripOptionId()) return;
      setStoredTripOptionId(id);
      const url = new URL(window.location.href);
      url.searchParams.set("option", id);
      history.replaceState(null, "", `${url.pathname}${url.search}${url.hash || "#map"}`);
      applyTripOption(id);
    });
  });
}

function applyTripOption(id) {
  setStoredTripOptionId(id);
  renderTripOptions();
  renderHomeRouteMap();
  renderDaysGrid();
  renderAccommodationSummary();

  const sectionTitle = document.getElementById("days-section-title");
  if (sectionTitle) {
    const opt = getTripOption(id);
    sectionTitle.textContent = `📅 תוכנית לפי ימים · ${opt.name}`;
  }
}

function renderExtremeDetail(activity, categories) {
  if (!activity) {
    return `<div class="extreme-detail extreme-detail-empty"><p>לחצו על נקודה במפה או על כרטיס פעילות לפרטים מלאים.</p></div>`;
  }
  const cat = categories[activity.category];
  const days =
    activity.relatedDays?.length > 0
      ? activity.relatedDays.map((d) => `<a href="day.html?id=${d}">יום ${d}</a>`).join(" · ")
      : "—";

  return `
    <article class="extreme-detail" id="extreme-detail-panel">
      ${activity.image ? renderImg(activity.image, "extreme-detail-img") : ""}
      <div class="extreme-detail-body">
        <span class="extreme-detail-cat" style="--cat-color:${cat.color}">${cat.icon} ${cat.label}</span>
        <h2>${activity.name}</h2>
        <dl class="extreme-detail-meta">
          <div><dt>אזור</dt><dd>${activity.region}</dd></div>
          <div><dt>רמת קושי</dt><dd>${activity.difficulty}</dd></div>
          <div><dt>עונה</dt><dd>${activity.season}</dd></div>
          <div><dt>משך</dt><dd>${activity.duration}</dd></div>
          ${activity.price ? `<div><dt>מחיר</dt><dd>${activity.price}</dd></div>` : ""}
          <div><dt>ימים בתוכנית</dt><dd>${days}</dd></div>
          <div><dt>על המסלול</dt><dd>${activity.onRoute ? "✅ כן" : "➖ מחוץ למסלול"}</dd></div>
        </dl>
        <p class="extreme-detail-desc">${activity.description}</p>
        ${
          activity.website
            ? `<div class="extreme-detail-links">
                <a href="${activity.website}" target="_blank" rel="noopener noreferrer" class="btn btn-primary extreme-detail-link">🔗 ${activity.websiteLabel || "אתר / הזמנה"}</a>
                ${activity.operatorHome ? `<a href="${activity.operatorHome}" target="_blank" rel="noopener noreferrer" class="btn btn-outline extreme-detail-link">🌐 ${activity.operatorLabel || "מפעיל"}</a>` : ""}
              </div>`
            : ""
        }
      </div>
    </article>
  `;
}

function renderCampInGeorgiaGuide() {
  if (typeof CAMP_IN_GEORGIA === "undefined") return "";
  const g = CAMP_IN_GEORGIA;
  const vf = g.viaFerrata;

  return `
    <section class="section extreme-rafting-guide" id="camp-in-georgia-guide">
      <div class="card operator-card extreme-rafting-card">
        <h2 class="section-title">⛓️ ${g.name} – ${g.tagline}</h2>
        <p>${g.summary}</p>
        <p class="extreme-rafting-link-note">${g.location.driving}</p>

        <div class="extreme-rafting-companies">
          <article class="extreme-rafting-company extreme-rafting-company-featured">
            <h3>${vf.title}</h3>
            <p><strong>${vf.price}</strong> · ${vf.priceNote}</p>
            <ul class="guide-list">
              ${vf.specs.map((s) => `<li>${s}</li>`).join("")}
            </ul>
            <p><strong>מסלולים:</strong> ${vf.routes.map((r) => `${r.name} (${r.duration})`).join(" · ")}</p>
            <p class="extreme-rafting-verify"><strong>חשוב:</strong> ${vf.guidedOnly}</p>
            <p>
              <a href="${vf.url}" target="_blank" rel="noopener noreferrer" class="external-link">campingeorgia.ge/hiking/</a>
            </p>
          </article>

          <article class="extreme-rafting-company">
            <h3>${g.camp.title}</h3>
            <ul class="guide-list">${g.camp.facilities.map((f) => `<li>${f}</li>`).join("")}</ul>
            <p>
              <a href="${g.camp.url}" target="_blank" rel="noopener noreferrer" class="external-link">campingeorgia.ge/camp/</a>
              ·
              <a href="${g.location.maps}" target="_blank" rel="noopener noreferrer" class="external-link">מפה</a>
            </p>
          </article>
        </div>

        <h3 class="extreme-category-title" style="margin-top:1.25rem">הזמנה ומפעילים</h3>
        <div class="extreme-rafting-companies">
          ${g.operators
            .map(
              (c) => `
            <article class="extreme-rafting-company${c.featured ? " extreme-rafting-company-featured" : ""}">
              <h3>${c.name}${c.featured ? ' <span class="extreme-rafting-badge">ישירות מהמחנה</span>' : ""}</h3>
              <p>${c.description}</p>
              <ul class="extreme-rafting-link-list">
                ${(c.links || [])
                  .map(
                    (l) => `
                  <li>
                    <a href="${l.url}" target="_blank" rel="noopener noreferrer" class="external-link">${l.label}</a>
                    ${l.note ? `<span class="extreme-rafting-link-note">${l.note}</span>` : ""}
                  </li>`
                  )
                  .join("")}
              </ul>
            </article>`
            )
            .join("")}
        </div>

        <ul class="guide-list extreme-season-tips" style="margin-top:1rem">
          ${g.tips.map((t) => `<li>${t}</li>`).join("")}
        </ul>
        <p style="margin-top:0.75rem">
          ${g.contact.phone.map((p) => `<a href="tel:${p.replace(/\s/g, "")}" class="external-link">${p}</a>`).join(" · ")}
          · <a href="${g.contact.emailLink}" class="external-link">${g.contact.email}</a>
        </p>
      </div>
    </section>`;
}

function renderKutaisiRaftingGuide() {
  if (typeof KUTAISI_RAFTING_GUIDE === "undefined") return "";
  const g = KUTAISI_RAFTING_GUIDE;

  return `
    <section class="section extreme-rafting-guide">
      <div class="card operator-card extreme-rafting-card">
        <h2 class="section-title">🛶 ${g.title}</h2>
        <p>${g.intro}</p>

        <div class="extreme-rafting-companies">
          ${g.companies
            .map(
              (c) => `
            <article class="extreme-rafting-company${c.featured ? " extreme-rafting-company-featured" : ""}">
              <h3>${c.name}${c.featured ? ' <span class="extreme-rafting-badge">מומלץ במסלול</span>' : ""}</h3>
              <p>${c.description}</p>
              <ul class="extreme-rafting-link-list">
                ${(c.links || [])
                  .map(
                    (l) => `
                  <li>
                    <a href="${l.url}" target="_blank" rel="noopener noreferrer" class="external-link">${l.label}</a>
                    ${l.note ? `<span class="extreme-rafting-link-note">${l.note}</span>` : ""}
                  </li>`
                  )
                  .join("")}
              </ul>
            </article>`
            )
            .join("")}
        </div>

        <div class="extreme-rafting-coldgear">
          <h3>${g.coldGear.title}</h3>
          <p>${g.coldGear.summary}</p>
          <ul class="guide-list">${g.coldGear.items.map((item) => `<li>${item}</li>`).join("")}</ul>
          <p class="extreme-rafting-verify"><strong>וידוא מראש:</strong> ${g.coldGear.verifyTip}</p>
        </div>
      </div>
    </section>`;
}

function renderExtremeSeasonGuide() {
  if (typeof EXTREME_SEASON_GUIDE === "undefined") return "";
  const g = EXTREME_SEASON_GUIDE;

  return `
    <section class="section extreme-season-guide">
      <div class="card operator-card extreme-season-card">
        <h2 class="section-title">🍂 ${g.title}</h2>
        <p class="extreme-season-intro">${g.intro}</p>
        <div class="extreme-season-grid">
          ${g.sections
            .map(
              (s) => `
            <article class="extreme-season-block">
              <h3>${s.icon} ${s.title}</h3>
              ${
                s.relatedDays?.length
                  ? `<p class="extreme-season-days">${s.relatedDays.map((d) => `<a href="day.html?id=${d}">יום ${d}</a>`).join(" · ")}</p>`
                  : ""
              }
              ${s.paragraphs.map((p) => `<p>${p}</p>`).join("")}
              ${
                s.tips?.length
                  ? `<ul class="guide-list extreme-season-tips">${s.tips.map((t) => `<li>${t}</li>`).join("")}</ul>`
                  : ""
              }
            </article>`
            )
            .join("")}
        </div>
      </div>
    </section>`;
}

function parseUpdateDate(itemOrDate, timeStr) {
  const dateStr = typeof itemOrDate === "object" && itemOrDate ? itemOrDate.date : itemOrDate;
  const time = typeof itemOrDate === "object" && itemOrDate ? itemOrDate.time : timeStr;
  if (!dateStr) return 0;
  const dmy = String(dateStr).match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/);
  if (dmy) {
    let h = 0;
    let m = 0;
    const tm = String(time || "").match(/^(\d{1,2}):(\d{2})$/);
    if (tm) {
      h = +tm[1];
      m = +tm[2];
    }
    return new Date(+dmy[3], +dmy[2] - 1, +dmy[1], h, m).getTime();
  }
  if (/אוגוסט\s*2026/.test(dateStr)) return new Date(2026, 7, 1).getTime();
  return 0;
}

function formatUpdateStamp(item) {
  if (!item?.date) return "";
  return item.time ? `${item.date} · ${item.time}` : item.date;
}

function renderNewPage() {
  const root = document.getElementById("new-content");
  if (!root || typeof SITE_UPDATES === "undefined") return;

  const data = SITE_UPDATES;
  const items = [...data.items].sort((a, b) => parseUpdateDate(b) - parseUpdateDate(a));
  root.innerHTML = `
    <section class="day-hero new-hero">
      <div class="day-hero-inner container">
        <div class="breadcrumb"><a href="index.html">דף הבית</a> / ${data.title}</div>
        <h1>✨ ${data.title}</h1>
        <p style="opacity:0.9;margin:0">${data.intro}</p>
      </div>
    </section>
    <main class="container new-page">
      <div class="new-updates-list">
        ${items
          .map(
            (item) => `
          <article class="card new-update-card" id="${item.id}">
            <div class="new-update-meta">
              <span class="new-update-badge">${item.badge}</span>
              <time class="new-update-date" datetime="${item.date}${item.time ? `T${item.time}` : ""}">${formatUpdateStamp(item)}</time>
            </div>
            <h2>${item.title}</h2>
            <p>${item.summary}</p>
            ${
              item.links?.length
                ? `<ul class="new-update-links">${item.links
                    .map(
                      (l) =>
                        `<li><a href="${l.url}" class="external-link"${l.url.startsWith("http") ? ' target="_blank" rel="noopener noreferrer"' : ""}>${l.label}</a></li>`
                    )
                    .join("")}</ul>`
                : ""
            }
          </article>`
          )
          .join("")}
      </div>
    </main>
  `;
}

function renderExtremePage() {
  const root = document.getElementById("extreme-content");
  if (!root || typeof EXTREME_ACTIVITIES === "undefined") return;

  const categories = EXTREME_CATEGORIES;
  let selectedId = null;
  let mapApi = null;
  const activeCats = new Set(Object.keys(categories));

  const grouped = {};
  Object.keys(categories).forEach((k) => {
    grouped[k] = [];
  });
  EXTREME_ACTIVITIES.forEach((a) => {
    if (grouped[a.category]) grouped[a.category].push(a);
  });

  root.innerHTML = `
    <section class="day-hero extreme-hero">
      <div class="day-hero-inner container">
        <div class="breadcrumb"><a href="index.html">דף הבית</a> / אקסטרים</div>
        <h1>🧗 פעילויות אקסטרים</h1>
        <p style="opacity:0.9;margin:0">רפטינג, קניונינג, Via Ferrata, כדורים פורחים, Paragliding ועוד – ליד מסלול הטיול</p>
        <p style="margin:0.75rem 0 0"><a href="https://www.raftinginkutaisi.com/" target="_blank" rel="noopener noreferrer" class="external-link" style="color:var(--gold-light)">🛶 Rafting in Kutaisi – ספק מומלץ לימים 3–4 (Via Ferrata, Rioni, Shareula)</a></p>
        <p style="margin:0.5rem 0 0"><a href="#camp-in-georgia-guide" class="external-link" style="color:var(--gold-light)">⛓️ Camp in Georgia – Via Ferrata ב-Sveri (~€35)</a> · <a href="https://campingeorgia.ge/hiking/" target="_blank" rel="noopener noreferrer" class="external-link" style="color:var(--gold-light)">אתר רשמי</a></p>
      </div>
    </section>
    <main class="container extreme-page">
      ${renderExtremeSeasonGuide()}
      ${renderCampInGeorgiaGuide()}
      ${renderKutaisiRaftingGuide()}
      <section class="section">
        <h2 class="section-title">🗺 מפה – מסלול + אטרקציות</h2>
        <p class="extreme-map-intro">קווי המסלול = ימי הטיול (📐 קווים ישירים / 🛣 כביש). הנקודות הצבעוניות = פעילויות אקסטרים. לחצו על נקודה → 📏 מכאן / 📏 לכאן.</p>
        <div class="extreme-filters" id="extreme-filters">
          ${Object.entries(categories)
            .map(
              ([key, cat]) => `
            <button type="button" class="extreme-filter-btn active" data-cat="${key}" style="--cat-color:${cat.color}">
              ${cat.icon} ${cat.label}
            </button>
          `
            )
            .join("")}
          <button type="button" class="extreme-filter-btn extreme-filter-route" data-cat="route-only">
            🛣 רק על המסלול
          </button>
        </div>
        <div class="extreme-map-layout">
          <div class="extreme-map-wrap map-section">
            <div id="extreme-map"></div>
            <div class="map-legend extreme-map-legend" id="extreme-map-legend"></div>
          </div>
          <div id="extreme-detail-slot">${renderExtremeDetail(null, categories)}</div>
        </div>
      </section>
      <section class="section">
        <h2 class="section-title">📋 כל הפעילויות</h2>
        ${Object.entries(categories)
          .filter(([key]) => grouped[key]?.length)
          .map(
            ([key, cat]) => `
          <div class="extreme-category-block" data-category="${key}">
            <h3 class="extreme-category-title" style="--cat-color:${cat.color}">${cat.icon} ${cat.label}</h3>
            <div class="extreme-cards">
              ${grouped[key]
                .map(
                  (a) => `
                <button type="button" class="extreme-card" data-id="${a.id}" style="--cat-color:${cat.color}">
                  <span class="extreme-card-cat">${cat.label}</span>
                  <strong>${a.name}</strong>
                  <span class="extreme-card-region">${a.region}</span>
                  ${a.onRoute ? '<span class="extreme-card-badge">על המסלול</span>' : ""}
                </button>
              `
                )
                .join("")}
            </div>
          </div>
        `
          )
          .join("")}
      </section>
    </main>
  `;

  function getVisibleActivities() {
    return EXTREME_ACTIVITIES.filter((a) => activeCats.has(a.category));
  }

  function selectActivity(activity) {
    selectedId = activity?.id || null;
    document.getElementById("extreme-detail-slot").innerHTML = renderExtremeDetail(activity, categories);
    if (mapApi && selectedId) mapApi.highlight(selectedId);
    document.querySelectorAll(".extreme-card").forEach((el) => {
      el.classList.toggle("selected", el.dataset.id === selectedId);
    });
    if (activity) {
      document.getElementById("extreme-detail-slot").scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }

  function refreshMapMarkers() {
    const visible = getVisibleActivities().map((a) => a.id);
    if (mapApi) mapApi.setVisible(visible);
  }

  document.getElementById("extreme-filters").addEventListener("click", (e) => {
    const btn = e.target.closest(".extreme-filter-btn");
    if (!btn) return;

    if (btn.dataset.cat === "route-only") {
      const routeIds = EXTREME_ACTIVITIES.filter((a) => a.onRoute).map((a) => a.id);
      activeCats.clear();
      EXTREME_ACTIVITIES.forEach((a) => {
        if (a.onRoute) activeCats.add(a.category);
      });
      document.querySelectorAll(".extreme-filter-btn[data-cat]").forEach((b) => {
        if (b.dataset.cat === "route-only") return;
        b.classList.toggle("active", activeCats.has(b.dataset.cat));
      });
      if (mapApi) mapApi.setVisible(routeIds);
      document.querySelectorAll(".extreme-category-block").forEach((block) => {
        block.querySelectorAll(".extreme-card").forEach((card) => {
          const act = EXTREME_ACTIVITIES.find((a) => a.id === card.dataset.id);
          card.style.display = act?.onRoute ? "" : "none";
        });
      });
      return;
    }

    btn.classList.toggle("active");
    const cat = btn.dataset.cat;
    if (btn.classList.contains("active")) activeCats.add(cat);
    else activeCats.delete(cat);

    document.querySelectorAll(".extreme-card").forEach((card) => {
      card.style.display = "";
    });
    document.querySelectorAll(".extreme-category-block").forEach((block) => {
      block.style.display = activeCats.has(block.dataset.category) ? "" : "none";
    });
    refreshMapMarkers();
  });

  root.addEventListener("click", (e) => {
    const card = e.target.closest(".extreme-card");
    if (!card) return;
    const activity = EXTREME_ACTIVITIES.find((a) => a.id === card.dataset.id);
    if (activity) selectActivity(activity);
  });

  const legend = document.getElementById("extreme-map-legend");
  if (legend) {
    legend.innerHTML = `
      <div class="extreme-legend-section">
        <strong>מסלול הטיול</strong>
        <div class="map-legend-grid">
          ${ROUTE_SEGMENTS.map(
            (s) => `
            <a href="day.html?id=${s.day}" class="legend-day-item" style="--day-color:${DAY_COLORS[s.day]}">
              <span class="legend-day-line" style="background:${DAY_COLORS[s.day]}"></span>
              <span class="legend-day-text"><strong>יום ${s.day}</strong><span class="legend-day-date">📅 ${getDayById(s.day)?.date || ""}</span><span class="legend-day-stat" dir="ltr">${s.distanceKm} km</span></span>
            </a>
          `
          ).join("")}
        </div>
      </div>
      <div class="extreme-legend-section">
        <strong>סוגי פעילות</strong>
        <div class="extreme-legend-cats">
          ${Object.entries(categories)
            .map(
              ([key, cat]) => `
            <span><span class="extreme-legend-dot" style="background:${cat.color}">${cat.icon}</span> ${cat.label}</span>
          `
            )
            .join("")}
        </div>
      </div>
    `;
  }

  setTimeout(() => {
    mapApi = initExtremeMap("extreme-map", {
      activities: EXTREME_ACTIVITIES,
      categories,
      segments: ROUTE_SEGMENTS,
      dayColors: DAY_COLORS,
      onSelect: selectActivity,
    });
  }, 50);
}

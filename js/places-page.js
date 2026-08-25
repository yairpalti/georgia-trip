/**
 * עמוד "כל המקומות" – מפה אחת עם כל הנקודות של הטיול, מסוננות לפי קטגוריה,
 * עם אפשרות להוסיף מקומות חדשים (חיפוש על המפה) ולכתוב הערות על כל מקום.
 */

const PLACE_NOTES_KEY = "georgia-trip.placeNotes";

/* ---------- הערות על מקומות קבועים ---------- */

function loadPlaceNotes() {
  try {
    const raw = localStorage.getItem(PLACE_NOTES_KEY);
    const notes = raw ? JSON.parse(raw) : {};
    return notes && typeof notes === "object" ? notes : {};
  } catch (err) {
    console.warn("Place notes unreadable", err);
    return {};
  }
}

function savePlaceNote(id, text) {
  const notes = loadPlaceNotes();
  if (text.trim()) notes[id] = text;
  else delete notes[id];
  try {
    localStorage.setItem(PLACE_NOTES_KEY, JSON.stringify(notes));
  } catch (err) {
    console.warn("Place notes unwritable", err);
  }
}

/* ---------- סרטונים לכל מקום (TikTok / YouTube / Instagram וכו') ---------- */

const PLACE_VIDEOS_KEY = "georgia-trip.placeVideos";

const VIDEO_PLATFORMS = [
  { match: /(^|\.)tiktok\.com$/, icon: "🎵", label: "TikTok" },
  { match: /(^|\.)(youtube\.com|youtu\.be)$/, icon: "▶️", label: "YouTube" },
  { match: /(^|\.)instagram\.com$/, icon: "📸", label: "Instagram" },
  { match: /(^|\.)facebook\.com$/, icon: "👍", label: "Facebook" },
  { match: /(^|\.)vimeo\.com$/, icon: "🎬", label: "Vimeo" },
];

function loadAllPlaceVideos() {
  try {
    const raw = localStorage.getItem(PLACE_VIDEOS_KEY);
    const data = raw ? JSON.parse(raw) : {};
    return data && typeof data === "object" ? data : {};
  } catch (err) {
    console.warn("Place videos unreadable", err);
    return {};
  }
}

function placeVideos(place) {
  const saved = loadAllPlaceVideos()[place.id] || [];
  return [...(place.videos || []), ...saved];
}

function savePlaceVideos(placeId, videos) {
  const all = loadAllPlaceVideos();
  if (videos.length) all[placeId] = videos;
  else delete all[placeId];
  try {
    localStorage.setItem(PLACE_VIDEOS_KEY, JSON.stringify(all));
  } catch (err) {
    console.warn("Place videos unwritable", err);
  }
}

function videoMeta(url) {
  try {
    const parsed = new URL(url);
    if (!/^https?:$/.test(parsed.protocol)) return null;
    const host = parsed.hostname.replace(/^www\./, "");
    const platform = VIDEO_PLATFORMS.find((p) => p.match.test(host));
    return {
      url: parsed.href,
      icon: platform?.icon || "🔗",
      label: platform?.label || host,
    };
  } catch (err) {
    return null;
  }
}

function addPlaceVideo(placeId, url) {
  const meta = videoMeta(url);
  if (!meta) return null;
  const saved = loadAllPlaceVideos()[placeId] || [];
  if (saved.some((v) => v.url === meta.url)) return meta;
  savePlaceVideos(placeId, [...saved, { url: meta.url, addedAt: new Date().toISOString() }]);
  return meta;
}

function removePlaceVideo(placeId, url) {
  const saved = loadAllPlaceVideos()[placeId] || [];
  savePlaceVideos(
    placeId,
    saved.filter((v) => v.url !== url)
  );
}

/* ---------- איסוף המקומות מכל מקורות המידע ---------- */

function distanceKm(a, b) {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;
  const h =
    Math.sin(dLat / 2) ** 2 + Math.sin(dLng / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  return 2 * R * Math.asin(Math.sqrt(h));
}

function findNearby(list, point, maxKm) {
  let best = null;
  let bestDist = maxKm;
  list.forEach((item) => {
    const d = distanceKm(item, point);
    if (d <= bestDist) {
      best = item;
      bestDist = d;
    }
  });
  return best;
}

function addDayTag(place, day) {
  if (!day) return;
  if (!place.days.includes(day)) place.days.push(day);
  place.days.sort((a, b) => a - b);
}

function collectTripPlaces() {
  const places = TRIP_PLACES.map((p) => ({ ...p, days: [], source: "trip" }));

  /* תיוג ימים לפי נקודות המסלול והימים */
  if (typeof ROUTE_SEGMENTS !== "undefined") {
    ROUTE_SEGMENTS.forEach((segment) => {
      [segment.from, segment.to, ...(segment.waypoints || [])].forEach((point) => {
        const match = findNearby(places, point, 2);
        if (match) addDayTag(match, segment.day);
      });
    });
  }
  if (typeof DAYS !== "undefined") {
    DAYS.forEach((day) => {
      (day.mapPoints || []).forEach((point) => {
        const match = findNearby(places, point, 2);
        if (match) addDayTag(match, day.id);
      });
    });
  }

  /* פעילויות אקסטרים */
  if (typeof EXTREME_ACTIVITIES !== "undefined") {
    EXTREME_ACTIVITIES.forEach((activity) => {
      const match = findNearby(places, activity, 0.5);
      if (match) {
        (activity.relatedDays || []).forEach((d) => addDayTag(match, d));
        if (!match.description) match.description = activity.description;
        if (!match.link) {
          match.link = activity.website;
          match.linkLabel = activity.websiteLabel;
        }
        return;
      }
      places.push({
        id: `extreme-${activity.id}`,
        he: activity.name,
        en: "",
        category: "activity",
        area: activity.region || "",
        lat: activity.lat,
        lng: activity.lng,
        description: activity.description,
        link: activity.website,
        linkLabel: activity.websiteLabel,
        days: [...(activity.relatedDays || [])],
        source: "extreme",
        extremeCategory: activity.category,
      });
    });
  }

  /* נקודות רחפן */
  if (typeof DRONE_SPOTS !== "undefined") {
    Object.entries(DRONE_SPOTS).forEach(([dayId, entry]) => {
      (entry.spots || []).forEach((spot) => {
        const day = Number(dayId);
        const match = findNearby(places, spot, 0.4);
        if (match) {
          addDayTag(match, day);
          match.droneSpot = true;
          if (!match.description) match.description = spot.description;
          return;
        }
        places.push({
          id: `drone-${day}-${spot.id}`,
          he: spot.name,
          en: "",
          category: "drone",
          area: "",
          lat: spot.lat,
          lng: spot.lng,
          description: spot.description,
          link: spot.link,
          linkLabel: spot.linkLabel,
          days: [day],
          source: "drone",
        });
      });
    });
  }

  return places;
}

function userPlaces() {
  return loadPois().map((poi) => ({
    id: poi.id,
    he: poi.name,
    en: "",
    category: poi.category || "custom",
    area: poi.address || "",
    lat: poi.lat,
    lng: poi.lng,
    days: poi.dayId ? [poi.dayId] : [],
    source: "user",
    note: poi.note || "",
  }));
}

/* ---------- תצוגה ---------- */

function placeCategory(place) {
  return PLACE_CATEGORIES[place.category] || PLACE_CATEGORIES.custom;
}

function createCategoryIcon(place, selected) {
  const cat = placeCategory(place);
  const ring = selected ? `box-shadow:0 0 0 3px #fff,0 0 0 6px ${cat.color};` : "";
  return L.divIcon({
    className: "place-cat-marker-wrap",
    html: `<div class="place-cat-marker${selected ? " is-selected" : ""}" style="background:${cat.color};${ring}">${cat.icon}</div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });
}

function placeMatchesQuery(place, query) {
  if (!query) return true;
  const haystack = [place.he, place.en, place.area, place.address, place.description]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return haystack.includes(query.toLowerCase());
}

function buildVideoSection(place, onChange) {
  const section = poiEl("div", "place-videos");
  const list = poiEl("div", "place-videos-list");

  function renderList() {
    list.innerHTML = "";
    const videos = placeVideos(place);
    if (!videos.length) {
      list.appendChild(poiEl("span", "place-videos-empty", "אין עדיין סרטונים"));
      return;
    }
    videos.forEach((video) => {
      const meta = videoMeta(video.url);
      if (!meta) return;
      const row = poiEl("div", "place-video");
      const link = poiEl("a", "place-video-link", `${meta.icon} ${video.title || meta.label}`);
      link.href = meta.url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      row.appendChild(link);

      /* סרטונים שמוגדרים בקוד נשארים; רק מה שהוספנו כאן ניתן להסרה */
      if (!(place.videos || []).some((v) => v.url === video.url)) {
        const del = poiEl("button", "place-video-remove", "✕");
        del.type = "button";
        del.title = "הסרת הסרטון";
        del.addEventListener("click", () => {
          removePlaceVideo(place.id, video.url);
          renderList();
          onChange();
        });
        row.appendChild(del);
      }
      list.appendChild(row);
    });
  }

  section.appendChild(poiEl("div", "place-videos-title", "🎬 סרטונים"));
  section.appendChild(list);

  const form = poiEl("div", "place-video-form");
  const input = poiEl("input", "place-video-input");
  input.type = "url";
  input.placeholder = "הדביקו לינק ל-TikTok / YouTube…";
  input.setAttribute("aria-label", "לינק לסרטון");
  const add = poiEl("button", "poi-btn poi-btn-primary place-video-add", "הוספה");
  add.type = "button";

  function submit() {
    const value = input.value.trim();
    if (!value) return;
    const meta = addPlaceVideo(place.id, value);
    if (!meta) {
      input.classList.add("is-invalid");
      input.setAttribute("title", "לינק לא תקין – צריך להתחיל ב-https://");
      return;
    }
    input.classList.remove("is-invalid");
    input.removeAttribute("title");
    input.value = "";
    renderList();
    onChange();
  }

  add.addEventListener("click", submit);
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      submit();
    }
  });

  form.appendChild(input);
  form.appendChild(add);
  section.appendChild(form);

  renderList();
  return section;
}

function buildPlacePopup(place, notes, onNoteChange) {
  const cat = placeCategory(place);
  const wrap = poiEl("div", "poi-popup place-popup");
  stopKeyPropagation(wrap);

  const badge = poiEl("span", "place-badge", `${cat.icon} ${cat.label}`);
  badge.style.background = cat.color;
  wrap.appendChild(badge);

  wrap.appendChild(poiEl("strong", null, place.he || place.en));
  if (place.en && place.en !== place.he) wrap.appendChild(poiEl("div", "poi-popup-meta", place.en));
  if (place.area) wrap.appendChild(poiEl("div", "poi-popup-meta", place.area));
  if (place.tip) wrap.appendChild(poiEl("div", "place-popup-tip", `💡 המלצה: ${place.tip}`));
  if (place.description) {
    wrap.appendChild(poiEl("p", "place-popup-desc", place.description));
  }

  if (place.days?.length) {
    const days = poiEl("div", "place-popup-days");
    place.days.forEach((day) => {
      const link = poiEl("a", "place-day-chip", `יום ${day}`);
      link.href = `day.html?id=${day}`;
      days.appendChild(link);
    });
    wrap.appendChild(days);
  }

  const isOwn = place.source === "user";
  if (isOwn) {
    const categorySelect = buildCategorySelect(place.category, (value) => {
      updatePoi(place.id, { category: value });
    });
    if (categorySelect) wrap.appendChild(categorySelect);
  }

  const note = poiEl("textarea", "poi-note");
  note.placeholder = "הערה / מה חשוב לזכור כאן…";
  note.value = isOwn ? place.note || "" : notes[place.id] || "";
  note.rows = 2;
  let timer;
  note.addEventListener("input", () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (isOwn) updatePoi(place.id, { note: note.value }, { silent: true });
      else savePlaceNote(place.id, note.value);
      onNoteChange();
    }, 500);
  });
  wrap.appendChild(note);

  wrap.appendChild(buildVideoSection(place, onNoteChange));

  const actions = poiEl("div", "poi-popup-actions");
  const maps = poiEl("a", "poi-popup-link", "פתיחה ב-Google Maps");
  maps.href = googleMapsUrl(place.lat, place.lng);
  maps.target = "_blank";
  maps.rel = "noopener noreferrer";
  actions.appendChild(maps);
  if (place.link) {
    const extra = poiEl("a", "poi-popup-link", place.linkLabel || "לינק");
    extra.href = place.link;
    extra.target = "_blank";
    extra.rel = "noopener noreferrer";
    actions.appendChild(extra);
  }
  if (isOwn) {
    const del = poiEl("button", "poi-btn poi-btn-danger", "🗑 הסרה");
    del.type = "button";
    del.addEventListener("click", () => removePoi(place.id));
    actions.appendChild(del);
  }
  wrap.appendChild(actions);

  return wrap;
}

function initPlacesPage() {
  const mapEl = document.getElementById("places-map");
  const listEl = document.getElementById("places-list");
  const filtersEl = document.getElementById("places-filters");
  const searchEl = document.getElementById("places-search");
  const countEl = document.getElementById("places-count");
  if (!mapEl) return;

  const map = L.map("places-map", { scrollWheelZoom: false }).setView([42.3, 43.0], 8);
  L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
    subdomains: "abcd",
    maxZoom: 19,
  }).addTo(map);

  /* קו המסלול ברקע, כדי לראות אילו מקומות קרובים אליו */
  if (typeof ROUTE_SEGMENTS !== "undefined") {
    ROUTE_SEGMENTS.forEach((segment) => {
      L.polyline(segmentPath(segment), {
        color: DAY_COLORS[segment.day] || "#999",
        weight: 3,
        opacity: 0.3,
        dashArray: "8 8",
        interactive: false,
      }).addTo(map);
    });
  }

  const tripLayer = L.layerGroup().addTo(map);
  const poiApi = attachPoiLayer(map);
  tameWheelZoom(map);

  const state = {
    query: "",
    active: new Set(Object.keys(PLACE_CATEGORIES)),
    selectedId: null,
    places: [],
    markers: {},
    notes: loadPlaceNotes(),
  };

  function visiblePlaces() {
    return state.places.filter(
      (p) => state.active.has(p.category) && placeMatchesQuery(p, state.query)
    );
  }

  function select(id, { pan = true } = {}) {
    state.selectedId = id;
    state.places.forEach((place) => {
      const marker = state.markers[place.id] || poiApi.markerById[place.id];
      if (marker && marker.setIcon) marker.setIcon(createCategoryIcon(place, place.id === id));
    });
    const place = state.places.find((p) => p.id === id);
    const marker = state.markers[id] || poiApi.markerById[id];
    if (place && marker) {
      if (pan) map.setView([place.lat, place.lng], Math.max(map.getZoom(), 11), { animate: true });
      marker.openPopup();
    }
    renderList();
  }

  function rebuildMarkers() {
    tripLayer.clearLayers();
    state.markers = {};
    const visibleIds = new Set(visiblePlaces().map((p) => p.id));

    state.places.forEach((place) => {
      if (place.source === "user") {
        /* הסמנים של המקומות שהוספנו מנוהלים ב-poi.js – רק מסתירים/מציגים */
        const marker = poiApi.markerById[place.id];
        if (!marker) return;
        marker.setIcon(createCategoryIcon(place, place.id === state.selectedId));
        marker.bindPopup(() => buildPlacePopup(place, state.notes, onNoteSaved));
        if (visibleIds.has(place.id)) poiApi.layer.addLayer(marker);
        else poiApi.layer.removeLayer(marker);
        return;
      }
      if (!visibleIds.has(place.id)) return;

      const marker = L.marker([place.lat, place.lng], {
        icon: createCategoryIcon(place, place.id === state.selectedId),
      })
        .bindPopup(() => buildPlacePopup(place, state.notes, onNoteSaved))
        .bindTooltip(`${placeCategory(place).icon} ${place.he || place.en}`, {
          direction: "top",
          offset: [0, -16],
          className: "poi-tooltip",
        });
      marker.on("click", () => select(place.id, { pan: false }));
      marker.addTo(tripLayer);
      state.markers[place.id] = marker;
    });
  }

  function onNoteSaved() {
    state.notes = loadPlaceNotes();
    renderList();
  }

  function renderFilters() {
    filtersEl.innerHTML = "";
    const counts = {};
    state.places.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });

    Object.entries(PLACE_CATEGORIES).forEach(([id, cat]) => {
      if (!counts[id]) return;
      const chip = poiEl("button", "place-chip");
      chip.type = "button";
      chip.appendChild(poiEl("span", "place-chip-icon", cat.icon));
      chip.appendChild(poiEl("span", null, `${cat.label} (${counts[id]})`));
      const on = state.active.has(id);
      chip.classList.toggle("is-off", !on);
      chip.style.borderColor = on ? cat.color : "transparent";
      chip.style.background = on ? `${cat.color}1a` : "";
      chip.addEventListener("click", () => {
        if (state.active.has(id)) state.active.delete(id);
        else state.active.add(id);
        renderFilters();
        rebuildMarkers();
        renderList();
      });
      filtersEl.appendChild(chip);
    });

    const all = poiEl("button", "place-chip place-chip-all");
    const everything = state.active.size === Object.keys(PLACE_CATEGORIES).length;
    all.type = "button";
    all.textContent = everything ? "נקה בחירה" : "הצג הכל";
    all.addEventListener("click", () => {
      state.active = everything ? new Set() : new Set(Object.keys(PLACE_CATEGORIES));
      renderFilters();
      rebuildMarkers();
      renderList();
    });
    filtersEl.appendChild(all);
  }

  function renderList() {
    const items = visiblePlaces().sort((a, b) => {
      const order = Object.keys(PLACE_CATEGORIES);
      const byCat = order.indexOf(a.category) - order.indexOf(b.category);
      return byCat !== 0 ? byCat : (a.he || a.en).localeCompare(b.he || b.en, "he");
    });

    countEl.textContent = `${items.length} מתוך ${state.places.length} מקומות`;
    listEl.innerHTML = "";

    if (!items.length) {
      listEl.appendChild(poiEl("li", "places-empty", "אין מקומות שמתאימים לסינון"));
      return;
    }

    items.forEach((place) => {
      const cat = placeCategory(place);
      const item = poiEl("li", "places-item");
      if (place.id === state.selectedId) item.classList.add("is-active");

      const button = poiEl("button", "places-item-btn");
      button.type = "button";
      button.style.borderInlineStartColor = cat.color;

      const head = poiEl("div", "places-item-head");
      head.appendChild(poiEl("span", "places-item-icon", cat.icon));
      head.appendChild(poiEl("span", "places-item-name", place.he || place.en));
      button.appendChild(head);

      const meta = [place.en && place.en !== place.he ? place.en : "", place.area]
        .filter(Boolean)
        .join(" · ");
      if (meta) button.appendChild(poiEl("span", "places-item-meta", meta));

      const tags = poiEl("div", "places-item-tags");
      place.days.forEach((day) => tags.appendChild(poiEl("span", "places-item-day", `יום ${day}`)));
      if (place.source === "user") tags.appendChild(poiEl("span", "places-item-own", "נוסף על ידינו"));
      const noteText = place.source === "user" ? place.note : state.notes[place.id];
      if (noteText) tags.appendChild(poiEl("span", "places-item-note", `💬 ${noteText}`));
      const videoCount = placeVideos(place).length;
      if (videoCount) tags.appendChild(poiEl("span", "places-item-video", `🎬 ${videoCount}`));
      if (tags.childNodes.length) button.appendChild(tags);

      button.addEventListener("click", () => select(place.id));
      item.appendChild(button);
      listEl.appendChild(item);
    });
  }

  function refresh({ keepView = true } = {}) {
    state.places = [...collectTripPlaces(), ...userPlaces()];
    state.notes = loadPlaceNotes();
    renderFilters();
    rebuildMarkers();
    renderList();
    if (!keepView) {
      const pts = state.places.map((p) => [p.lat, p.lng]);
      if (pts.length) map.fitBounds(pts, { padding: [40, 40] });
    }
  }

  searchEl.addEventListener("input", () => {
    state.query = searchEl.value.trim();
    rebuildMarkers();
    renderList();
  });

  const addBtn = document.getElementById("places-add");
  if (addBtn) {
    addBtn.addEventListener("click", () => {
      const input = document.querySelector(".poi-search-input");
      mapEl.scrollIntoView({ behavior: "smooth", block: "center" });
      input?.focus();
    });
  }

  onPoiChange(() => refresh());
  refresh({ keepView: false });
}

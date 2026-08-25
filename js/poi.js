/**
 * נקודות עניין (Points of interest)
 * חיפוש מקומות על המפה (Nominatim / OpenStreetMap) ושמירתם בדפדפן (localStorage).
 * הנקודות משותפות לכל המפות באתר – מפת המסלול, מפות היום ומפת האקסטרים.
 */

const POI_STORAGE_KEY = "georgia-trip.pois";
const POI_GEOCODE_URL = "https://nominatim.openstreetmap.org/search";
/* הטיה לתוצאות בגיאורגיה: lon,lat של פינה שמאלית-עליונה וימנית-תחתונה */
const POI_VIEWBOX = "39.9,43.7,46.8,40.9";
const POI_COLOR = "#c9a227";

/* ---------- אחסון ---------- */

const poiSubscribers = new Set();

function loadPois() {
  try {
    const raw = localStorage.getItem(POI_STORAGE_KEY);
    const list = raw ? JSON.parse(raw) : [];
    return Array.isArray(list) ? list : [];
  } catch (err) {
    console.warn("POI storage unreadable", err);
    return [];
  }
}

function savePois(list) {
  try {
    localStorage.setItem(POI_STORAGE_KEY, JSON.stringify(list));
  } catch (err) {
    console.warn("POI storage unwritable", err);
  }
  notifyPoiChange();
}

function notifyPoiChange() {
  poiSubscribers.forEach((fn) => {
    try {
      fn();
    } catch (err) {
      console.warn("POI subscriber failed", err);
    }
  });
}

function onPoiChange(fn) {
  poiSubscribers.add(fn);
  return () => poiSubscribers.delete(fn);
}

function poiKey(lat, lng) {
  return `${Number(lat).toFixed(4)},${Number(lng).toFixed(4)}`;
}

function addPoi({ name, lat, lng, address, dayId, category }) {
  const list = loadPois();
  const existing = list.find((p) => poiKey(p.lat, p.lng) === poiKey(lat, lng));
  if (existing) return existing;

  const poi = {
    id: `poi-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
    name: name || "נקודה ללא שם",
    address: address || "",
    category: category || "custom",
    lat: Number(lat),
    lng: Number(lng),
    note: "",
    dayId: dayId || null,
    addedAt: new Date().toISOString(),
  };
  list.push(poi);
  savePois(list);
  return poi;
}

/* silent – שמירה בלי לרענן את המפה, כדי שחלונית פתוחה לא תיסגר באמצע הקלדה */
function updatePoi(id, patch, { silent = false } = {}) {
  const list = loadPois();
  const idx = list.findIndex((p) => p.id === id);
  if (idx < 0) return;
  list[idx] = { ...list[idx], ...patch };
  if (silent) {
    try {
      localStorage.setItem(POI_STORAGE_KEY, JSON.stringify(list));
    } catch (err) {
      console.warn("POI storage unwritable", err);
    }
    return;
  }
  savePois(list);
}

function removePoi(id) {
  savePois(loadPois().filter((p) => p.id !== id));
}

/* ---------- חיפוש ---------- */

async function searchPlaces(query, signal) {
  const params = new URLSearchParams({
    q: query,
    format: "jsonv2",
    addressdetails: "1",
    limit: "8",
    viewbox: POI_VIEWBOX,
    bounded: "0",
    "accept-language": "he,en",
  });

  const res = await fetch(`${POI_GEOCODE_URL}?${params}`, {
    signal,
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error(`Geocoder returned ${res.status}`);

  const data = await res.json();
  return data.map((item) => {
    const parts = String(item.display_name || "").split(", ");
    return {
      name: item.name || parts[0] || item.display_name,
      address: parts.slice(1).join(", "),
      lat: parseFloat(item.lat),
      lng: parseFloat(item.lon),
    };
  });
}

/* ---------- סמנים ---------- */

/* קטגוריות מוגדרות ב-data/places.js; בדפים שלא טוענים אותו – ברירת מחדל 📌 */
function poiCategory(id) {
  if (typeof PLACE_CATEGORIES === "undefined") return null;
  return PLACE_CATEGORIES[id] || null;
}

function createPoiIcon(poi) {
  const cat = poiCategory(poi?.category);
  return L.divIcon({
    className: "poi-marker-wrap",
    html: `<div class="poi-marker" style="background:${cat?.color || POI_COLOR}">${cat?.icon || "📌"}</div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });
}

/* בורר קטגוריה – מוצג רק כשהעמוד טוען את רשימת הקטגוריות */
function buildCategorySelect(value, onChange) {
  if (typeof PLACE_CATEGORIES === "undefined") return null;
  const select = poiEl("select", "poi-category-select");
  select.setAttribute("aria-label", "קטגוריית המקום");
  Object.entries(PLACE_CATEGORIES).forEach(([id, cat]) => {
    const option = poiEl("option", null, `${cat.icon} ${cat.label}`);
    option.value = id;
    if (id === value) option.selected = true;
    select.appendChild(option);
  });
  select.addEventListener("change", () => onChange(select.value));
  return select;
}

function createPoiPreviewIcon() {
  return L.divIcon({
    className: "poi-marker-wrap",
    html: '<div class="poi-marker poi-marker-preview">🔎</div>',
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });
}

/* לינק לדף המקום ב-Google (עם ביקורות ותמונות) ולא רק לנקודת ציון */
function googleMapsUrl(lat, lng, name) {
  const query = name ? encodeURIComponent(name) : `${lat},${lng}`;
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

function poiEl(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = text;
  return node;
}

/* מונע מהמפה לחטוף מקשים (חצים, +/-) בזמן הקלדה בשדות */
function stopKeyPropagation(node) {
  L.DomEvent.on(node, "keydown keyup keypress", L.DomEvent.stopPropagation);
}

function buildPoiPopup(poi) {
  const wrap = poiEl("div", "poi-popup");
  stopKeyPropagation(wrap);
  wrap.appendChild(poiEl("strong", null, poi.name));
  if (poi.address) wrap.appendChild(poiEl("div", "poi-popup-meta", poi.address));
  if (poi.dayId) wrap.appendChild(poiEl("div", "poi-popup-day", `נוספה ממפת יום ${poi.dayId}`));

  const categorySelect = buildCategorySelect(poi.category || "custom", (value) =>
    updatePoi(poi.id, { category: value })
  );
  if (categorySelect) wrap.appendChild(categorySelect);

  const note = poiEl("textarea", "poi-note");
  note.placeholder = "הערה…";
  note.value = poi.note || "";
  note.rows = 2;
  let noteTimer;
  note.addEventListener("input", () => {
    clearTimeout(noteTimer);
    noteTimer = setTimeout(() => updatePoi(poi.id, { note: note.value }, { silent: true }), 500);
  });
  wrap.appendChild(note);

  const actions = poiEl("div", "poi-popup-actions");
  const link = poiEl("a", "poi-popup-link", "פתיחה ב-Google Maps");
  link.href = googleMapsUrl(poi.lat, poi.lng, poi.name);
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  actions.appendChild(link);

  const del = poiEl("button", "poi-btn poi-btn-danger", "🗑 הסרה");
  del.type = "button";
  del.addEventListener("click", () => removePoi(poi.id));
  actions.appendChild(del);

  wrap.appendChild(actions);
  return wrap;
}

function buildResultPopup(result, dayId) {
  const wrap = poiEl("div", "poi-popup");
  wrap.appendChild(poiEl("strong", null, result.name));
  if (result.address) wrap.appendChild(poiEl("div", "poi-popup-meta", result.address));

  let category = "custom";
  const categorySelect = buildCategorySelect(category, (value) => {
    category = value;
  });
  if (categorySelect) wrap.appendChild(categorySelect);

  const actions = poiEl("div", "poi-popup-actions");
  const add = poiEl("button", "poi-btn poi-btn-primary", "➕ הוספה לנקודות עניין");
  add.type = "button";
  add.addEventListener("click", () => addPoi({ ...result, dayId, category }));
  actions.appendChild(add);
  wrap.appendChild(actions);
  return wrap;
}

/* ---------- פקד החיפוש ---------- */

function createPoiControl(map, options) {
  const dayId = options.dayId || null;
  const control = L.control({ position: options.position || "topright" });
  const state = { results: [], preview: null, listOpen: false };

  control.onAdd = function () {
    const box = poiEl("div", "poi-control");
    L.DomEvent.disableClickPropagation(box);
    L.DomEvent.disableScrollPropagation(box);
    stopKeyPropagation(box);

    const searchRow = poiEl("div", "poi-search-row");
    const input = poiEl("input", "poi-search-input");
    input.type = "search";
    input.placeholder = "חיפוש מקום…";
    input.setAttribute("aria-label", "חיפוש מקום על המפה");
    searchRow.appendChild(poiEl("span", "poi-search-icon", "🔎"));
    searchRow.appendChild(input);
    const status = poiEl("span", "poi-search-status");
    searchRow.appendChild(status);
    box.appendChild(searchRow);

    const results = poiEl("ul", "poi-results");
    results.hidden = true;
    box.appendChild(results);

    const listToggle = poiEl("button", "poi-list-toggle");
    listToggle.type = "button";
    box.appendChild(listToggle);

    const listWrap = poiEl("ul", "poi-list");
    listWrap.hidden = true;
    box.appendChild(listWrap);

    let controller = null;
    let debounce;

    function renderResults(searched) {
      results.innerHTML = "";
      if (!state.results.length) {
        if (searched) {
          results.appendChild(poiEl("li", "poi-result-empty", "אין תוצאות · נסו לחפש באנגלית"));
          results.hidden = false;
        } else {
          results.hidden = true;
        }
        return;
      }
      state.results.forEach((result) => {
        const item = poiEl("li", "poi-result");
        const pick = poiEl("button", "poi-result-btn");
        pick.type = "button";
        pick.appendChild(poiEl("span", "poi-result-name", result.name));
        if (result.address) pick.appendChild(poiEl("span", "poi-result-meta", result.address));
        pick.addEventListener("click", () => showPreview(result));
        item.appendChild(pick);

        const add = poiEl("button", "poi-result-add", "➕");
        add.type = "button";
        add.title = "הוספה לנקודות עניין";
        add.setAttribute("aria-label", `הוספת ${result.name} לנקודות עניין`);
        add.addEventListener("click", () => {
          addPoi({ ...result, dayId });
          map.setView([result.lat, result.lng], Math.max(map.getZoom(), 12), { animate: true });
        });
        item.appendChild(add);

        results.appendChild(item);
      });
      results.hidden = false;
    }

    function showPreview(result) {
      clearPreview();
      state.preview = L.marker([result.lat, result.lng], { icon: createPoiPreviewIcon() })
        .addTo(map)
        .bindPopup(buildResultPopup(result, dayId));
      map.setView([result.lat, result.lng], Math.max(map.getZoom(), 12), { animate: true });
      state.preview.openPopup();
    }

    function clearPreview() {
      if (state.preview) {
        map.removeLayer(state.preview);
        state.preview = null;
      }
    }

    async function runSearch(query) {
      if (controller) controller.abort();
      if (query.trim().length < 2) {
        state.results = [];
        renderResults();
        status.textContent = "";
        return;
      }
      controller = new AbortController();
      status.textContent = "…";
      try {
        state.results = await searchPlaces(query.trim(), controller.signal);
        status.textContent = "";
        renderResults(true);
      } catch (err) {
        if (err.name === "AbortError") return;
        console.warn("Place search failed", err);
        state.results = [];
        renderResults();
        status.textContent = "שגיאת חיפוש";
      }
    }

    input.addEventListener("input", () => {
      clearTimeout(debounce);
      debounce = setTimeout(() => runSearch(input.value), 450);
    });

    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        clearTimeout(debounce);
        runSearch(input.value);
      } else if (event.key === "Escape") {
        input.value = "";
        state.results = [];
        renderResults();
        status.textContent = "";
        clearPreview();
      }
    });

    listToggle.addEventListener("click", () => {
      state.listOpen = !state.listOpen;
      refreshList();
    });

    function refreshList() {
      const pois = loadPois();
      listToggle.textContent = `📌 נקודות עניין (${pois.length}) ${state.listOpen ? "▴" : "▾"}`;
      listToggle.hidden = pois.length === 0;

      if (!state.listOpen || !pois.length) {
        listWrap.hidden = true;
        return;
      }

      listWrap.innerHTML = "";
      pois.forEach((poi) => {
        const item = poiEl("li", "poi-list-item");
        const focus = poiEl("button", "poi-list-name", poi.name);
        focus.type = "button";
        focus.title = "מעבר לנקודה על המפה";
        focus.addEventListener("click", () => {
          map.setView([poi.lat, poi.lng], Math.max(map.getZoom(), 13), { animate: true });
          options.openPoi?.(poi.id);
        });
        item.appendChild(focus);

        const del = poiEl("button", "poi-list-remove", "🗑");
        del.type = "button";
        del.title = "הסרת הנקודה";
        del.setAttribute("aria-label", `הסרת ${poi.name}`);
        del.addEventListener("click", () => removePoi(poi.id));
        item.appendChild(del);

        listWrap.appendChild(item);
      });
      listWrap.hidden = false;
    }

    control.refreshList = refreshList;
    control.clearPreview = clearPreview;
    refreshList();
    return box;
  };

  control.addTo(map);
  return control;
}

/**
 * מוסיף למפה חיפוש מקומות + שכבת נקודות העניין השמורות.
 * options: { dayId, position }
 */
function attachPoiLayer(map, options = {}) {
  if (typeof L === "undefined" || !map) return null;

  const layer = L.layerGroup().addTo(map);
  const markerById = {};

  const control = createPoiControl(map, {
    ...options,
    openPoi: (id) => markerById[id]?.openPopup(),
  });

  function render() {
    layer.clearLayers();
    Object.keys(markerById).forEach((id) => delete markerById[id]);

    loadPois().forEach((poi) => {
      const marker = L.marker([poi.lat, poi.lng], { icon: createPoiIcon(poi) })
        .bindPopup(buildPoiPopup(poi))
        .bindTooltip(`📌 ${poi.name}`, {
          direction: "top",
          offset: [0, -16],
          className: "poi-tooltip",
        });
      marker.addTo(layer);
      markerById[poi.id] = marker;
    });

    control.refreshList?.();
    control.clearPreview?.();
  }

  const unsubscribe = onPoiChange(render);
  map.on("unload", unsubscribe);
  render();

  return { layer, markerById, refresh: render };
}

/* סנכרון בין לשוניות פתוחות */
window.addEventListener("storage", (event) => {
  if (event.key === POI_STORAGE_KEY) notifyPoiChange();
});

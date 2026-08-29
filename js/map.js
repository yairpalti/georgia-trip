function hePlace(name) {
  if (!name) return "";
  const parts = String(name).split(" · ");
  return parts[0];
}

function enPlace(name) {
  if (!name) return "";
  const parts = String(name).split(" · ");
  return parts.length >= 2 ? parts[1] : name;
}

/** Matches overnight labels like "אמברולאורי / Adventure Camping" to map points */
function isOvernightPlace(place, overnightName) {
  if (!overnightName || !place) return false;
  if (place.extremeId) return false;
  if (place.overnight === true) return true;
  const placeName = typeof place === "string" ? place : place.name;
  if (!placeName) return false;
  if (placeName === overnightName) return true;

  const placeTokens = String(placeName)
    .split(/\s*[·|/]\s*/)
    .map((s) => s.trim().toLowerCase())
    .filter((s) => s.length >= 3);
  const overnightTokens = String(overnightName)
    .split(/\s*[·|/]\s*/)
    .map((s) => s.trim().toLowerCase())
    .filter((s) => s.length >= 3);

  return placeTokens.some((pt) =>
    overnightTokens.some((ot) => ot === pt || ot.includes(pt) || pt.includes(ot))
  );
}

function segmentPath(segment) {
  const path = [[segment.from.lat, segment.from.lng]];
  (typeof routeWaypoints === "function" ? routeWaypoints(segment) : segment.waypoints || []).forEach(
    (wp) => path.push([wp.lat, wp.lng])
  );
  if (!segment.loop || segment.from.lat !== segment.to.lat || segment.from.lng !== segment.to.lng) {
    path.push([segment.to.lat, segment.to.lng]);
  } else if (segment.waypoints?.length) {
    path.push([segment.from.lat, segment.from.lng]);
  }
  return path;
}

/** Overnight marker: prefer explicit overnight coords, else match named point on segment */
function overnightLatLng(segment) {
  if (segment.overnightLat) {
    return [segment.overnightLat, segment.overnightLng];
  }
  const endpoints = [segment.to, segment.from];
  for (const p of endpoints) {
    if (p?.overnight || isOvernightPlace(p, segment.overnight)) {
      return [p.lat, p.lng];
    }
  }
  for (const p of segment.waypoints || []) {
    if (p?.overnight || isOvernightPlace(p, segment.overnight)) {
      return [p.lat, p.lng];
    }
  }
  return [segment.to.lat, segment.to.lng];
}

function pathMidpoint(path) {
  if (path.length < 2) return path[0];
  let total = 0;
  const legs = [];
  for (let i = 1; i < path.length; i++) {
    const d = L.latLng(path[i - 1]).distanceTo(L.latLng(path[i]));
    legs.push(d);
    total += d;
  }
  let half = total / 2;
  for (let i = 0; i < legs.length; i++) {
    if (half <= legs[i]) {
      const t = half / legs[i];
      const lat = path[i][0] + t * (path[i + 1][0] - path[i][0]);
      const lng = path[i][1] + t * (path[i + 1][1] - path[i][1]);
      return [lat, lng];
    }
    half -= legs[i];
  }
  return path[Math.floor(path.length / 2)];
}

function dayDateLabel(dayId) {
  const day = (typeof DAYS !== "undefined" ? DAYS : []).find((d) => d.id === dayId);
  if (!day) return "";
  return day.weekday ? `${day.date} (${day.weekday})` : day.date;
}

function segmentLabel(segment) {
  return `Day ${segment.day} · ${segment.distanceKm} km · ${segment.duration}`;
}

function createSegmentBadge(text, color) {
  return L.divIcon({
    className: "segment-label-wrap",
    html: `<div class="segment-label" style="border-color:${color};color:${color}">${text}</div>`,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  });
}

function createOvernightIcon() {
  return L.divIcon({
    className: "overnight-marker-wrap",
    html: '<div class="overnight-marker" title="לינה" aria-label="לינה"><span class="overnight-marker-icon">🏨</span></div>',
    iconSize: [36, 36],
    iconAnchor: [18, 18],
  });
}

const EXTREME_LAYER_STORAGE_KEY = "georgia-trip-show-extreme";

function getStoredExtremeVisible() {
  try {
    return localStorage.getItem(EXTREME_LAYER_STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

function storeExtremeVisible(visible) {
  try {
    localStorage.setItem(EXTREME_LAYER_STORAGE_KEY, visible ? "1" : "0");
  } catch {
    /* ignore */
  }
}

function bindExtremeMeasurePopup(layer, activity, cat, measure, popupRegistry) {
  const place = createMeasurePlace(activity, activity.name);
  const build = () => {
    const wrap = poiEl("div", "poi-popup");
    if (typeof stopKeyPropagation === "function") stopKeyPropagation(wrap);
    wrap.appendChild(poiEl("strong", null, activity.name));
    wrap.appendChild(poiEl("div", "poi-popup-meta", `${cat.icon} ${cat.label}`));
    if (typeof appendDistanceFromUser === "function") {
      appendDistanceFromUser(wrap, activity.lat, activity.lng);
    }
    const details = poiEl("a", "external-link poi-popup-link", "פרטים בעמוד האקסטרים →");
    details.href = "extreme.html";
    wrap.appendChild(details);
    if (measure) wrap.appendChild(buildMeasureButtons(place, measure));
    appendGoogleMapsLinks(wrap, activity.lat, activity.lng, { name: activity.name });
    return wrap;
  };
  layer.bindPopup(build);
  popupRegistry?.push({ layer, build });
}

/**
 * Extreme activity markers – shared by the extreme page and optional overlay on the main map.
 */
function attachExtremeLayer(map, options) {
  const {
    activities,
    categories,
    measure,
    popupRegistry,
    visible = false,
    onSelect,
    useLayerGroup = true,
  } = options;

  const layerGroup = useLayerGroup ? L.layerGroup() : null;
  const markerById = {};

  activities.forEach((activity) => {
    const cat = categories[activity.category] || { color: "#666", icon: "📍" };
    const latlng = [activity.lat, activity.lng];
    const marker = L.marker(latlng, {
      icon: createExtremeIcon(cat.color, cat.icon, false),
    });

    if (onSelect) marker.on("click", () => onSelect(activity));
    bindExtremeMeasurePopup(marker, activity, cat, measure, popupRegistry);
    marker.bindTooltip(activity.name, {
      permanent: false,
      direction: "top",
      offset: [0, -18],
      className: "extreme-tooltip",
    });

    if (layerGroup) layerGroup.addLayer(marker);
    else marker.addTo(map);

    markerById[activity.id] = { marker, activity, cat };
  });

  if (layerGroup && visible) layerGroup.addTo(map);

  return {
    layerGroup,
    markerById,
    setVisible(show) {
      if (!layerGroup) return;
      if (show) layerGroup.addTo(map);
      else map.removeLayer(layerGroup);
      storeExtremeVisible(show);
    },
    isVisible() {
      return layerGroup ? map.hasLayer(layerGroup) : false;
    },
    onVisibilityChange: null,
    setVisibleIds(ids) {
      const visibleIds = new Set(ids);
      Object.entries(markerById).forEach(([aid, { marker }]) => {
        const show = visibleIds.has(aid);
        if (layerGroup) {
          if (show && !layerGroup.hasLayer(marker)) layerGroup.addLayer(marker);
          if (!show && layerGroup.hasLayer(marker)) layerGroup.removeLayer(marker);
        } else if (show) marker.addTo(map);
        else map.removeLayer(marker);
      });
    },
    highlight(id) {
      Object.entries(markerById).forEach(([aid, { marker, cat }]) => {
        const selected = aid === id;
        marker.setIcon(createExtremeIcon(cat.color, cat.icon, selected));
        if (selected) map.panTo(marker.getLatLng(), { animate: true });
      });
    },
  };
}

function createPlaceIcon(color, optional) {
  const optionalClass = optional ? " place-marker-optional" : "";
  return L.divIcon({
    className: "place-marker-wrap",
    html: `<div class="place-marker${optionalClass}" style="background:${color}"></div>`,
    iconSize: optional ? [14, 14] : [12, 12],
    iconAnchor: optional ? [7, 7] : [6, 6],
  });
}

/**
 * זום עדין בגלגלת: הדפדפן שולח "קליק" אחד של גלגלת ככמה אירועי wheel רצופים,
 * ו-Leaflet הופך כל אחד מהם לקפיצת זום שלמה – ולכן קליק אחד קופץ 2–3 רמות.
 * כאן כל רצף כזה שווה רבע רמת זום בלבד.
 */
function tameWheelZoom(map) {
  const ZOOM_STEP = 0.25;
  const ZOOM_THROTTLE_MS = 100;
  map.scrollWheelZoom.disable();
  /* zoomSnap חייב להיות קטן או שווה לצעד, אחרת Leaflet מעגל בחזרה לרמה שלמה */
  map.options.zoomSnap = ZOOM_STEP;

  let lastZoomAt = 0;
  map.getContainer().addEventListener(
    "wheel",
    (event) => {
      event.preventDefault();
      const now = Date.now();
      if (now - lastZoomAt < ZOOM_THROTTLE_MS) return;
      lastZoomAt = now;

      const direction = event.deltaY < 0 ? 1 : -1;
      map.setZoomAround(
        map.mouseEventToContainerPoint(event),
        map.getZoom() + direction * ZOOM_STEP
      );
    },
    { passive: false }
  );

  return map;
}

/*
 * רקע המפה בכל העמודים. CARTO התחילו לדרוש מפתח API ולהטביע
 * "API KEY REQUIRED" על האריחים, ולכן עברנו לאריחים של OpenStreetMap –
 * חינמיים, בלי מפתח וללא הגבלת דומיין.
 */
function addBaseTiles(map) {
  return L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 19,
  }).addTo(map);
}

function createMeasurePlace(point, name) {
  return {
    id: point.id || `trip-${Number(point.lat).toFixed(4)},${Number(point.lng).toFixed(4)}`,
    name: name || enPlace(point.name) || point.he || point.en || "נקודה",
    lat: point.lat,
    lng: point.lng,
  };
}

function bindTripMeasurePopup(layer, point, title, subtitle, measure, popupRegistry) {
  const place = createMeasurePlace(point, title);
  const build = () => {
    const wrap = poiEl("div", "poi-popup");
    if (typeof stopKeyPropagation === "function") stopKeyPropagation(wrap);
    wrap.appendChild(poiEl("strong", null, title));
    if (subtitle) wrap.appendChild(poiEl("div", "poi-popup-meta", subtitle));
    if (typeof appendDistanceFromUser === "function") appendDistanceFromUser(wrap, point.lat, point.lng);
    if (measure) wrap.appendChild(buildMeasureButtons(place, measure));
    appendGoogleMapsLinks(wrap, point.lat, point.lng, { name: title });
    return wrap;
  };
  layer.bindPopup(build);
  popupRegistry?.push({ layer, build });
}

function createMapMeasure(map, popupRegistry, panelId = "poi-measure-panel") {
  if (typeof attachRouteMeasure !== "function") return null;
  let extraOnChange = () => {};
  const measure = attachRouteMeasure(map, {
    panelEl: document.getElementById(panelId),
    onChange: () => {
      popupRegistry.forEach(({ layer, build }) => {
        if (layer.isPopupOpen()) layer.setPopupContent(build());
      });
      extraOnChange();
    },
  });
  measure.onPopupRefresh = (fn) => {
    extraOnChange = fn;
  };

  if (typeof onUserLocationChange === "function") {
    onUserLocationChange(() => {
      popupRegistry.forEach(({ layer, build }) => {
        if (layer.isPopupOpen()) layer.setPopupContent(build());
      });
      extraOnChange();
    });
  }

  return measure;
}

async function drawRouteLines(map, lineLayer, segments, dayColors, mode, ui, buttons) {
  lineLayer.clearLayers();
  let fallbackCount = 0;

  if (mode === "roads") {
    ui.setLoading(true);
    ui.setButtonsDisabled(true, buttons);
  } else {
    ui.setHint("");
  }

  const items = segments.map((segment) => ({
    segment,
    color: dayColors[segment.day] || "#666",
    points:
      typeof segmentToPoints === "function"
        ? segmentToPoints(segment)
        : segmentPath(segment).map(([lat, lng]) => ({ lat, lng })),
  }));

  const resolvedPaths =
    mode === "roads"
      ? await Promise.all(items.map((item) => resolvePathLatLngs(item.points, "roads")))
      : items.map((item) => ({ path: directPathLatLngs(item.points), usedFallback: false }));

  items.forEach((item, i) => {
    const { path, usedFallback } = resolvedPaths[i];
    if (usedFallback) fallbackCount += 1;

    const label = segmentLabel(item.segment);

    L.polyline(path, {
      color: item.color,
      weight: 5,
      opacity: mode === "roads" ? 0.85 : 0.75,
      dashArray: mode === "direct" ? "10 8" : null,
      lineJoin: "round",
    })
      .addTo(lineLayer)
      .bindTooltip(label, { sticky: true, className: "segment-tooltip" });

    const mid = pathMidpoint(path);
    L.marker(mid, {
      icon: createSegmentBadge(label, item.color),
      interactive: false,
    }).addTo(lineLayer);
  });

  if (mode === "roads") {
    ui.setLoading(false);
    ui.setButtonsDisabled(false, buttons);
    if (fallbackCount) {
      ui.setHint(`${fallbackCount} מקטעים ללא כביש – מוצגים כקווים ישירים`);
    } else {
      ui.setHint("מסלולי כביש · OSRM / OpenStreetMap");
    }
  }
}

function cloneSegmentsForMap(segments) {
  return segments.map((s) => ({
    ...s,
    from: { ...s.from },
    to: { ...s.to },
    waypoints: (s.waypoints || []).map((wp) => ({ ...wp })),
  }));
}

function collectSegmentPoints(segments) {
  const points = [];
  segments.forEach((seg) => {
    [seg.from, seg.to, ...(seg.waypoints || [])].forEach((p) => {
      if (p?.lat != null && p?.lng != null) points.push(p);
    });
  });
  return points;
}

function distanceMeters(a, b) {
  return L.latLng(a.lat, a.lng).distanceTo(L.latLng(b.lat, b.lng));
}

/** True when a map point is already covered by the route (within ~900 m). */
function isNearRoutePoint(lat, lng, routePoints, thresholdM = 900) {
  return routePoints.some((p) => distanceMeters({ lat, lng }, p) < thresholdM);
}

function nearestSegmentDay(lat, lng, segments) {
  let bestDay = segments[0]?.day ?? 1;
  let bestDist = Infinity;
  segments.forEach((seg) => {
    collectSegmentPoints([seg]).forEach((p) => {
      const d = distanceMeters({ lat, lng }, p);
      if (d < bestDist) {
        bestDist = d;
        bestDay = seg.day;
      }
    });
  });
  return bestDay;
}

/** Add extreme activities missing from route waypoints as optional markers (no route bend). */
function mergeExtremeWaypoints(segments, activities) {
  const merged = cloneSegmentsForMap(segments);
  const routePoints = collectSegmentPoints(merged);

  (activities || []).forEach((activity) => {
    if (activity.lat == null || activity.lng == null) return;
    if (isNearRoutePoint(activity.lat, activity.lng, routePoints)) return;

    const day =
      activity.relatedDays?.length > 0
        ? activity.relatedDays[0]
        : nearestSegmentDay(activity.lat, activity.lng, merged);
    const seg = merged.find((s) => s.day === day);
    if (!seg) return;

    seg.waypoints.push({
      name: activity.name,
      lat: activity.lat,
      lng: activity.lng,
      optional: true,
      extremeId: activity.id,
    });
    routePoints.push({ lat: activity.lat, lng: activity.lng });
  });

  return merged;
}

function initRouteMap(containerId, segments, dayColors, mapOptions = {}) {
  const map = L.map(containerId, { scrollWheelZoom: true }).setView([42.3, 42.5], 7);

  addBaseTiles(map);

  const allBounds = [];
  const overnightSeen = new Set();
  const popupRegistry = [];
  const measure = createMapMeasure(map, popupRegistry);
  const lineLayer = L.layerGroup().addTo(map);

  const activities = mapOptions.activities || [];
  const categories = mapOptions.categories || null;
  const segmentsToRender =
    activities.length > 0 ? mergeExtremeWaypoints(segments, activities) : segments;
  const routePointsAfterMerge = collectSegmentPoints(segmentsToRender);
  const overlayActivities = activities.filter(
    (a) => !isNearRoutePoint(a.lat, a.lng, routePointsAfterMerge)
  );

  let extremeApi = null;
  if (overlayActivities.length && categories) {
    extremeApi = attachExtremeLayer(map, {
      activities: overlayActivities,
      categories,
      measure,
      popupRegistry,
      visible: getStoredExtremeVisible(),
      useLayerGroup: true,
    });
  }

  segmentsToRender.forEach((segment) => {
    const color = dayColors[segment.day] || "#666";
    const path = segmentPath(segment);
    path.forEach((pt) => allBounds.push(pt));

    (segment.waypoints || []).forEach((wp) => {
      if (wp.optional) allBounds.push([wp.lat, wp.lng]);
      const tooltip = wp.extremeId
        ? enPlace(wp.name)
        : wp.optional
          ? `${enPlace(wp.name)} · Option B`
          : enPlace(wp.name);
      const marker = L.marker([wp.lat, wp.lng], {
        icon: createPlaceIcon(color, wp.optional),
      }).addTo(map);
      const popupSubtitle = wp.extremeId
        ? `Day ${segment.day} · Extreme`
        : wp.optional
          ? `Day ${segment.day} · Option B`
          : `Day ${segment.day}`;
      if (wp.extremeId && categories) {
        const activity = activities.find((a) => a.id === wp.extremeId);
        const cat = activity ? categories[activity.category] : null;
        if (activity && cat) {
          bindExtremeMeasurePopup(marker, activity, cat, measure, popupRegistry);
        } else {
          bindTripMeasurePopup(
            marker,
            wp,
            enPlace(wp.name),
            popupSubtitle,
            measure,
            popupRegistry
          );
        }
      } else {
        bindTripMeasurePopup(
          marker,
          wp,
          enPlace(wp.name),
          popupSubtitle,
          measure,
          popupRegistry
        );
      }
      marker.bindTooltip(tooltip, {
        permanent: true,
        direction: "top",
        className: "place-tooltip",
        offset: [0, wp.optional ? -8 : -6],
      });
    });

    const overnightKey = overnightLatLng(segment).join(",");
    if (segment.overnight && !overnightSeen.has(overnightKey)) {
      overnightSeen.add(overnightKey);
      const [lat, lng] = overnightLatLng(segment);
      const overnightMarker = L.marker([lat, lng], { icon: createOvernightIcon() }).addTo(map);
      bindTripMeasurePopup(
        overnightMarker,
        { lat, lng, name: segment.overnight },
        `🏨 ${enPlace(segment.overnight)}`,
        `Overnight · Day ${segment.day}`,
        measure,
        popupRegistry
      );
    }

    const fromMarker = L.circleMarker([segment.from.lat, segment.from.lng], {
      radius: 7,
      fillColor: color,
      color: "#fff",
      weight: 2,
      fillOpacity: 1,
    }).addTo(map);
    bindTripMeasurePopup(
      fromMarker,
      segment.from,
      enPlace(segment.from.name),
      `Day ${segment.day} start`,
      measure,
      popupRegistry
    );

    if (!segment.loop) {
      const toMarker = L.circleMarker([segment.to.lat, segment.to.lng], {
        radius: 7,
        fillColor: color,
        color: "#fff",
        weight: 2,
        fillOpacity: 1,
      }).addTo(map);
      bindTripMeasurePopup(
        toMarker,
        segment.to,
        enPlace(segment.to.name),
        `Day ${segment.day} end`,
        measure,
        popupRegistry
      );
    }
  });

  if (allBounds.length) {
    map.fitBounds(allBounds, { padding: [50, 50] });
  }

  if (extremeApi) {
    extremeApi.onVisibilityChange = (show) => {
      document.getElementById("map-legend-extreme")?.toggleAttribute("hidden", !show);
    };
  }

  mountRouteModeBar(
    containerId,
    (mode, ui, buttons) => {
      drawRouteLines(map, lineLayer, segmentsToRender, dayColors, mode, ui, buttons);
    },
    extremeApi
  );

  renderMapLegend(segments, dayColors, {
    extremeCategories: categories,
    showExtremeLegend: extremeApi?.isVisible(),
  });
  tameWheelZoom(map);
  const poiApi = attachPoiLayer(map, { measureApi: measure });
  measure?.onPopupRefresh?.(() => {
    Object.values(poiApi.markerById).forEach((marker) => {
      if (marker.isPopupOpen()) marker.setPopupContent(buildPoiPopup(marker.poi, measure));
    });
  });
  return { map, extremeApi };
}

function createExtremeIcon(color, icon, selected) {
  const ring = selected ? "box-shadow:0 0 0 3px #fff,0 0 0 5px " + color + ";" : "";
  return L.divIcon({
    className: "extreme-marker-wrap",
    html: `<div class="extreme-marker${selected ? " extreme-marker-selected" : ""}" style="background:${color};${ring}">${icon}</div>`,
    iconSize: [34, 34],
    iconAnchor: [17, 17],
  });
}

function initExtremeMap(containerId, options) {
  const { activities, categories, segments, dayColors, onSelect } = options;

  const map = L.map(containerId, { scrollWheelZoom: true }).setView([42.3, 42.5], 7);

  addBaseTiles(map);

  const bounds = [];
  const markerById = {};
  const popupRegistry = [];
  const measure = createMapMeasure(map, popupRegistry);
  const lineLayer = L.layerGroup().addTo(map);

  if (segments?.length && typeof mountRouteModeBar === "function") {
    mountRouteModeBar(containerId, (mode, ui, buttons) => {
      drawRouteLines(map, lineLayer, segments, dayColors, mode, ui, buttons);
    });
    segments.forEach((segment) => {
      segmentPath(segment).forEach((pt) => bounds.push(pt));
    });
  }

  const extremeLayer = attachExtremeLayer(map, {
    activities,
    categories,
    measure,
    popupRegistry,
    visible: true,
    onSelect,
    useLayerGroup: false,
  });
  Object.assign(markerById, extremeLayer.markerById);
  activities.forEach((a) => bounds.push([a.lat, a.lng]));

  if (bounds.length) {
    map.fitBounds(bounds, { padding: [48, 48] });
  }

  tameWheelZoom(map);
  const poiApi = attachPoiLayer(map, { measureApi: measure });
  measure?.onPopupRefresh?.(() => {
    Object.values(poiApi.markerById).forEach((marker) => {
      if (marker.isPopupOpen()) marker.setPopupContent(buildPoiPopup(marker.poi, measure));
    });
  });

  return {
    map,
    markerById,
    highlight: (id) => extremeLayer.highlight(id),
    setVisible: (ids) => extremeLayer.setVisibleIds(ids),
  };
}

function renderMapLegend(segments, dayColors, legendOptions = {}) {
  const legend = document.getElementById("map-legend");
  if (!legend) return;

  const { extremeCategories, showExtremeLegend } = legendOptions;
  const extremeLegendHtml = extremeCategories
    ? `<div class="map-legend-extreme" id="map-legend-extreme"${showExtremeLegend ? "" : " hidden"}>
        <span class="map-legend-extreme-title">🧗 אקסטרים:</span>
        ${Object.entries(extremeCategories)
          .map(
            ([, cat]) =>
              `<span class="map-legend-extreme-cat" style="--cat-color:${cat.color}">${cat.icon} ${cat.label}</span>`
          )
          .join("")}
      </div>`
    : "";

  legend.innerHTML = `
    <div class="map-legend-grid">
      ${segments
        .map(
          (s) => `
        <a href="day.html?id=${s.day}" class="legend-day-item" style="--day-color:${dayColors[s.day]}">
          <span class="legend-day-line" style="background:${dayColors[s.day]}"></span>
          <span class="legend-day-text">
            <strong>יום ${s.day}</strong>
            <span class="legend-day-date">📅 ${dayDateLabel(s.day)}</span>
            <span class="legend-day-stat" dir="ltr">${s.distanceKm} km · ${s.duration}</span>
            <span class="legend-overnight">🏨 ${hePlace(s.overnight)}</span>
          </span>
        </a>
      `
        )
        .join("")}
    </div>
    ${extremeLegendHtml}
    <div class="map-legend-notes">
      <span><span class="place-marker inline"></span> מקומות בדרך</span>
      <span><span class="place-marker inline place-marker-optional"></span> אקסטרים / אופציות</span>
      <span>🏨 לינה</span>
      ${extremeCategories ? "<span>🧗 «פעילויות אקסטרים» – שכבה נוספת לנקודות שלא על המסלול</span>" : ""}
      <span>📍 לחצו 📍 בפינת המפה למיקום שלכם + מרחק לנקודות</span>
      <span>📏 לחצו על נקודה → 📏 מכאן / 📏 לכאן לחישוב זמן ומרחק</span>
      <span>📐 / 🛣 החליפו בין קווים ישירים למסלול כביש מעל המפה</span>
      <span>
        <a href="${TRIP_META.globalMapUrl}" target="_blank" rel="noopener noreferrer" class="external-link">
          פתיחת מפת Google המלאה
        </a>
      </span>
    </div>
  `;
}

async function drawDayRouteLines(map, lineLayer, routes, routeColors, multi, mode, ui, buttons) {
  lineLayer.clearLayers();
  let fallbackCount = 0;

  if (mode === "roads") {
    ui.setLoading(true);
    ui.setButtonsDisabled(true, buttons);
  } else {
    ui.setHint("");
  }

  const items = routes
    .map((route, idx) => ({
      route,
      idx,
      points: route.points || [],
      color: route.color || routeColors[idx % routeColors.length],
    }))
    .filter((item) => item.points.length);

  const resolvedPaths =
    mode === "roads"
      ? await Promise.all(items.map((item) => resolvePathLatLngs(item.points, "roads")))
      : items.map((item) => ({
          path: directPathLatLngs(item.points),
          usedFallback: false,
          distanceKm: directPointsDistanceKm(item.points),
          durationSec: null,
        }));

  items.forEach((item, i) => {
    const { path, usedFallback, distanceKm, durationSec } = resolvedPaths[i];
    if (usedFallback) fallbackCount += 1;

    const dashed = multi || item.route.dashed;
    const label = formatRouteDistanceLabel(path, {
      prefix: item.route.label || `מסלול ${item.idx + 1}`,
      durationSec: mode === "roads" ? durationSec : null,
    });

    L.polyline(path, {
      color: item.color,
      weight: multi ? 4 : 3,
      opacity: mode === "roads" ? 0.9 : 0.75,
      dashArray: mode === "direct" || dashed ? "8 6" : null,
      lineJoin: "round",
    })
      .addTo(lineLayer)
      .bindTooltip(label, { sticky: true });

    const mid = pathMidpoint(path);
    L.marker(mid, {
      icon: createSegmentBadge(label, item.color),
      interactive: false,
    }).addTo(lineLayer);
  });

  if (mode === "roads") {
    ui.setLoading(false);
    ui.setButtonsDisabled(false, buttons);
    if (fallbackCount) {
      ui.setHint(`${fallbackCount} מקטעים ללא כביש – מוצגים כקווים ישירים`);
    } else {
      ui.setHint("מסלולי כביש · OSRM");
    }
  }
}

function initDayMap(containerId, options) {
  const routes = Array.isArray(options) ? [{ points: options }] : options?.routes || [];
  const overnightName = options?.overnight || null;
  if (!routes.length) return null;

  const map = L.map(containerId);
  addBaseTiles(map);

  const routeColors = ["#7b2d3e", "#2d5a3d", "#c47b2b", "#2980b9"];
  const multi = routes.length > 1;
  const bounds = [];
  const seen = new Map();
  const popupRegistry = [];
  const measure = createMapMeasure(map, popupRegistry);
  const lineLayer = L.layerGroup().addTo(map);

  routes.forEach((route) => {
    const points = route.points || [];
    points.forEach((p) => bounds.push([p.lat, p.lng]));
  });

  mountRouteModeBar(containerId, (mode, ui, buttons) => {
    drawDayRouteLines(map, lineLayer, routes, routeColors, multi, mode, ui, buttons);
  });

  routes.forEach((route, idx) => {
    const points = route.points || [];
    if (!points.length) return;
    const color = route.color || routeColors[idx % routeColors.length];

    points.forEach((p) => {
      const key = `${p.lat.toFixed(4)},${p.lng.toFixed(4)}`;
      const isOvernight = isOvernightPlace(p, overnightName);
      const prev = seen.get(key);
      if (prev && !(isOvernight && !prev.overnight)) return;
      if (prev?.layer) map.removeLayer(prev.layer);
      const marker = isOvernight
        ? L.marker([p.lat, p.lng], { icon: createOvernightIcon() })
        : L.marker([p.lat, p.lng], { icon: createPlaceIcon(color) });
      marker.addTo(map);
      bindTripMeasurePopup(
        marker,
        p,
        isOvernight ? `🏨 ${enPlace(p.name)}` : enPlace(p.name),
        isOvernight ? "לינה" : null,
        measure,
        popupRegistry
      );
      seen.set(key, { overnight: isOvernight, layer: marker });
    });
  });

  if (bounds.length) {
    map.fitBounds(bounds, { padding: [30, 30] });
  }

  const legendEl = document.getElementById("day-map-legend");
  if (legendEl) {
    if (multi) {
      legendEl.innerHTML = `
        <div class="day-map-legend-items">
          ${routes
            .map((r, i) => {
              const color = r.color || routeColors[i % routeColors.length];
              return `<span class="day-map-legend-item"><span class="day-map-legend-line" style="border-color:${color}"></span>${r.label || `אופציה ${i + 1}`}</span>`;
            })
            .join("")}
        </div>`;
      legendEl.hidden = false;
    } else {
      legendEl.innerHTML = "";
      legendEl.hidden = true;
    }
  }

  tameWheelZoom(map);
  const poiApi = attachPoiLayer(map, { dayId: options?.dayId || null, measureApi: measure });
  measure?.onPopupRefresh?.(() => {
    Object.values(poiApi.markerById).forEach((marker) => {
      if (marker.isPopupOpen()) marker.setPopupContent(buildPoiPopup(marker.poi, measure));
    });
  });
  return map;
}

const DRONE_COLORS = { destination: "#6c5ce7", enRoute: "#e67e22" };

function createDroneIcon(selected, kind = "destination") {
  const color = DRONE_COLORS[kind] || DRONE_COLORS.destination;
  const emoji = kind === "enRoute" ? "🛣" : "🚁";
  const ring = selected ? `box-shadow:0 0 0 3px #fff,0 0 0 5px ${color};` : "";
  return L.divIcon({
    className: "drone-marker-wrap",
    html: `<div class="drone-marker${selected ? " drone-marker-selected" : ""}" style="background:${color};${ring}">${emoji}</div>`,
    iconSize: [34, 34],
    iconAnchor: [17, 17],
  });
}

function initDroneSpotsMap(containerId, options, onSelectMaybe) {
  const spots = Array.isArray(options) ? options : options?.spots || [];
  const onSelect = typeof onSelectMaybe === "function" ? onSelectMaybe : options?.onSelect;
  const dayRoutes = Array.isArray(options) ? [] : options?.dayRoutes || [];
  const overnightName = Array.isArray(options) ? null : options?.overnight || null;
  if (!spots?.length) return null;

  const map = L.map(containerId, { scrollWheelZoom: true });
  addBaseTiles(map);

  const bounds = [];
  const markerById = {};
  const routeColors = ["#7b2d3e", "#2d5a3d", "#c47b2b", "#2980b9"];
  const placeSeen = new Set();
  const popupRegistry = [];
  const measure = createMapMeasure(map, popupRegistry);
  const lineLayer = L.layerGroup().addTo(map);

  if (dayRoutes.length && typeof mountRouteModeBar === "function") {
    mountRouteModeBar(containerId, (mode, ui, buttons) => {
      drawDayRouteLines(map, lineLayer, dayRoutes, routeColors, dayRoutes.length > 1, mode, ui, buttons);
    });
    dayRoutes.forEach((route) => {
      (route.points || []).forEach((p) => bounds.push([p.lat, p.lng]));
    });
  }

  dayRoutes.forEach((route, idx) => {
    const points = route.points || [];
    if (!points.length) return;
    const color = route.color || routeColors[idx % routeColors.length];

    points.forEach((p) => {
      const key = `${Number(p.lat).toFixed(4)},${Number(p.lng).toFixed(4)}`;
      if (placeSeen.has(key)) return;
      placeSeen.add(key);
      const isOvernight = isOvernightPlace(p, overnightName);
      const marker = isOvernight
        ? L.marker([p.lat, p.lng], { icon: createOvernightIcon() })
        : L.marker([p.lat, p.lng], { icon: createPlaceIcon(color) });
      marker.addTo(map);
      bindTripMeasurePopup(
        marker,
        p,
        isOvernight ? `🏨 ${enPlace(p.name)}` : enPlace(p.name),
        isOvernight ? "לינה" : "מקום בטיול",
        measure,
        popupRegistry
      );
    });
  });

  spots.forEach((spot) => {
    const kind = spot.kind || "destination";
    const latlng = [spot.lat, spot.lng];
    bounds.push(latlng);
    const marker = L.marker(latlng, { icon: createDroneIcon(false, kind) }).addTo(map);
    marker.on("click", () => onSelect?.(spot));
    bindTripMeasurePopup(
      marker,
      { ...spot, id: spot.id },
      spot.name,
      kind === "enRoute" ? "עצירה בדרך" : "נקודת רחפן",
      measure,
      popupRegistry
    );
    const tipPrefix = kind === "enRoute" ? "🛣 " : "🚁 ";
    marker.bindTooltip(tipPrefix + spot.name, {
      permanent: false,
      direction: "top",
      offset: [0, -18],
      className: "drone-tooltip",
    });
    markerById[spot.id] = { marker, kind };
  });

  if (bounds.length) {
    map.fitBounds(bounds, { padding: [40, 40] });
  }

  tameWheelZoom(map);
  const poiApi = attachPoiLayer(map, { measureApi: measure });
  measure?.onPopupRefresh?.(() => {
    Object.values(poiApi.markerById).forEach((marker) => {
      if (marker.isPopupOpen()) marker.setPopupContent(buildPoiPopup(marker.poi, measure));
    });
  });

  return {
    map,
    highlight(id) {
      Object.entries(markerById).forEach(([sid, { marker, kind }]) => {
        const selected = sid === id;
        marker.setIcon(createDroneIcon(selected, kind));
        if (selected) map.panTo(marker.getLatLng(), { animate: true });
      });
    },
  };
}

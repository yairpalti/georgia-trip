/**
 * מדידת מסלול נהיגה בין שתי נקודות – OSRM + גיבוי קו אווירי.
 * משותף לנקודות העניין (poi.js) ולעמוד המקומות (places-page.js).
 */

const OSRM_URL = "https://router.project-osrm.org/route/v1/driving";

function formatDuration(seconds) {
  const total = Math.round(seconds / 60);
  const hours = Math.floor(total / 60);
  const minutes = total % 60;
  if (!hours) return `${minutes} דק'`;
  return minutes ? `${hours} ש' ${minutes} דק'` : `${hours} ש'`;
}

function formatDistance(km) {
  return km < 10 ? `${km.toFixed(1)} ק"מ` : `${Math.round(km)} ק"מ`;
}

function haversineKm(a, b) {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;
  const h =
    Math.sin(dLat / 2) ** 2 + Math.sin(dLng / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  return 2 * R * Math.asin(Math.sqrt(h));
}

/** מבקש מסלול נהיגה אמיתי מ-OSRM; אם השירות לא זמין – מרחק אווירי בלבד */
async function fetchDrivingRoute(from, to, signal) {
  const coords = `${from.lng},${from.lat};${to.lng},${to.lat}`;
  const res = await fetch(`${OSRM_URL}/${coords}?overview=full&geometries=geojson`, { signal });
  if (!res.ok) throw new Error(`Router returned ${res.status}`);
  const data = await res.json();
  const route = data.routes?.[0];
  if (!route) throw new Error("No route found");
  return {
    km: route.distance / 1000,
    seconds: route.duration,
    path: (route.geometry?.coordinates || []).map(([lng, lat]) => [lat, lng]),
  };
}

function directionsUrl(from, to) {
  return (
    "https://www.google.com/maps/dir/?api=1" +
    `&origin=${from.lat},${from.lng}&destination=${to.lat},${to.lng}&travelmode=driving`
  );
}

const MEASURE_ROUTE_COLOR = "#7b2d3e";
const MEASURE_DIRECT_COLOR = "#6b7280";

function pathMidpoint(path) {
  if (!path?.length) return null;
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

function measureRouteLabel(data) {
  const km = data.km < 10 ? data.km.toFixed(1) : String(Math.round(data.km));
  return `🛣 ${km} km · ${formatDuration(data.seconds)}`;
}

function measureDirectLabel(km) {
  const formatted = km < 10 ? km.toFixed(1) : String(Math.round(km));
  return `📐 ${formatted} km`;
}

function createMeasureRouteBadge(text, color = MEASURE_ROUTE_COLOR) {
  return L.divIcon({
    className: "segment-label-wrap",
    html: `<div class="segment-label measure-route-label" dir="ltr" style="border-color:${color};color:${color}">${text}</div>`,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  });
}

function buildMeasureButtons(place, measure) {
  const row = poiEl("div", "measure-buttons");
  const isFrom = measure.from()?.id === place.id;
  const isTo = measure.to()?.id === place.id;

  const from = poiEl(
    "button",
    "measure-btn" + (isFrom ? " is-active" : ""),
    isFrom ? "📏 מוצא ✓" : "📏 מכאן"
  );
  from.type = "button";
  from.addEventListener("click", () => measure.setFrom(place));
  row.appendChild(from);

  const to = poiEl(
    "button",
    "measure-btn" + (isTo ? " is-active" : ""),
    isTo ? "📏 יעד ✓" : "📏 לכאן"
  );
  to.type = "button";
  to.addEventListener("click", () => measure.setTo(place));
  row.appendChild(to);

  return row;
}

/**
 * מוסיף למפה שכבת מסלול + פאנל (DOM חיצוני או Leaflet control).
 * options: { panelEl, position, fitBounds }
 */
function attachRouteMeasure(map, options = {}) {
  const measureLayer = L.layerGroup().addTo(map);
  const state = { from: null, to: null, controller: null, cache: {} };
  const fitBounds = options.fitBounds !== false;

  let panelEl = options.panelEl || null;
  if (!panelEl) {
    const control = L.control({ position: options.position || "bottomleft" });
    control.onAdd = function () {
      const box = poiEl("div", "measure-panel measure-panel-map");
      box.hidden = true;
      L.DomEvent.disableClickPropagation(box);
      L.DomEvent.disableScrollPropagation(box);
      return box;
    };
    control.addTo(map);
    panelEl = control.getContainer();
  }

  function renderPanel(status = {}) {
    if (!panelEl) return;
    panelEl.innerHTML = "";

    if (!state.from && !state.to) {
      panelEl.hidden = true;
      return;
    }
    panelEl.hidden = false;

    const line = poiEl("div", "measure-line");
    line.appendChild(poiEl("span", "measure-label", "מ־"));
    line.appendChild(poiEl("strong", null, state.from?.name || "בחרו נקודת מוצא"));
    line.appendChild(poiEl("span", "measure-label", "אל־"));
    line.appendChild(poiEl("strong", null, state.to?.name || "בחרו יעד"));
    panelEl.appendChild(line);

    const result = poiEl("div", "measure-result");
    if (status.loading) result.appendChild(poiEl("span", "measure-loading", "מחשב מסלול…"));
    else if (status.error) result.appendChild(poiEl("span", "measure-error", status.error));
    else if (status.data) {
      if (status.data.roadKm != null && status.data.path?.length) {
        result.appendChild(
          poiEl("span", "measure-time", `🛣 ${formatDuration(status.data.seconds)} · ${formatDistance(status.data.roadKm)}`)
        );
      } else if (status.data.seconds != null) {
        result.appendChild(poiEl("span", "measure-time", `🚗 ${formatDuration(status.data.seconds)}`));
        result.appendChild(poiEl("span", "measure-distance", formatDistance(status.data.km)));
      }
      if (status.data.directKm != null) {
        result.appendChild(poiEl("span", "measure-distance", `📐 ${formatDistance(status.data.directKm)}`));
      }
      if (status.data.straightLine) {
        result.appendChild(poiEl("span", "measure-note", "🛣 לא זמין – מוצג קו ישיר בלבד"));
      }
    } else {
      result.appendChild(poiEl("span", "measure-note", 'בחרו "לכאן" במקום נוסף'));
    }
    panelEl.appendChild(result);

    const actions = poiEl("div", "measure-actions");
    if (state.from && state.to) {
      const dir = poiEl("a", "measure-link", "ניווט ב-Google Maps");
      dir.href = directionsUrl(state.from, state.to);
      dir.target = "_blank";
      dir.rel = "noopener noreferrer";
      actions.appendChild(dir);

      const swap = poiEl("button", "measure-btn", "⇄ החלפת כיוון");
      swap.type = "button";
      swap.addEventListener("click", () => {
        const from = state.from;
        state.from = state.to;
        state.to = from;
        runMeasure();
      });
      actions.appendChild(swap);
    }

    const clear = poiEl("button", "measure-btn", "✕ ניקוי");
    clear.type = "button";
    clear.addEventListener("click", () => api.clear());
    actions.appendChild(clear);
    panelEl.appendChild(actions);
  }

  function drawRoute(data) {
    measureLayer.clearLayers();
    if (!state.from || !state.to) return;

    const directPath = [
      [state.from.lat, state.from.lng],
      [state.to.lat, state.to.lng],
    ];
    const directKm = data.directKm ?? haversineKm(state.from, state.to);

    L.polyline(directPath, {
      color: MEASURE_DIRECT_COLOR,
      weight: 2,
      opacity: 0.75,
      dashArray: "6 6",
    }).addTo(measureLayer);

    const directMid = pathMidpoint(directPath);
    if (directMid) {
      L.marker(directMid, {
        icon: createMeasureRouteBadge(measureDirectLabel(directKm), MEASURE_DIRECT_COLOR),
        interactive: false,
        zIndexOffset: 999,
      }).addTo(measureLayer);
    }

    if (data.path?.length) {
      L.polyline(data.path, { color: MEASURE_ROUTE_COLOR, weight: 5, opacity: 0.9 }).addTo(
        measureLayer
      );
      const roadMid = pathMidpoint(data.path);
      if (roadMid) {
        L.marker(roadMid, {
          icon: createMeasureRouteBadge(measureRouteLabel(data), MEASURE_ROUTE_COLOR),
          interactive: false,
          zIndexOffset: 1000,
        }).addTo(measureLayer);
      }
    }

    if (fitBounds) {
      const boundsPath = data.path?.length ? data.path : directPath;
      map.fitBounds(boundsPath, { padding: [60, 60] });
    }
  }

  async function runMeasure() {
    measureLayer.clearLayers();
    if (state.controller) state.controller.abort();

    if (!state.from || !state.to) {
      renderPanel({});
      return;
    }

    const key = `${state.from.lat},${state.from.lng}->${state.to.lat},${state.to.lng}`;
    if (state.cache[key]) {
      renderPanel({ data: state.cache[key] });
      drawRoute(state.cache[key]);
      return;
    }

    renderPanel({ loading: true });
    state.controller = new AbortController();
    const directKm = haversineKm(state.from, state.to);
    try {
      const road = await fetchDrivingRoute(state.from, state.to, state.controller.signal);
      const data = {
        path: road.path,
        km: road.km,
        roadKm: road.km,
        seconds: road.seconds,
        directKm,
        straightLine: false,
      };
      state.cache[key] = data;
      renderPanel({ data });
      drawRoute(data);
    } catch (err) {
      if (err.name === "AbortError") return;
      console.warn("Routing failed", err);
      const data = {
        km: directKm,
        directKm,
        seconds: (directKm / 60) * 3600,
        path: [],
        straightLine: true,
      };
      renderPanel({ data });
      drawRoute(data);
    }
  }

  function measurePoint(place) {
    return {
      id: place.id,
      name: place.name || place.he || place.en || "נקודה",
      lat: place.lat,
      lng: place.lng,
    };
  }

  const api = {
    from: () => state.from,
    to: () => state.to,
    setFrom(place) {
      state.from = measurePoint(place);
      if (state.to?.id === state.from.id) state.to = null;
      runMeasure();
      options.onChange?.();
    },
    setTo(place) {
      state.to = measurePoint(place);
      if (state.from?.id === state.to.id) state.from = null;
      runMeasure();
      options.onChange?.();
    },
    clear() {
      state.from = null;
      state.to = null;
      measureLayer.clearLayers();
      renderPanel({});
      map.closePopup();
      options.onChange?.();
    },
  };

  return api;
}

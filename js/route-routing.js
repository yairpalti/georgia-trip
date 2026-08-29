/** Road geometry via OSRM (OpenStreetMap) – free public demo server */
const OSRM_DRIVING_URL = "https://router.project-osrm.org/route/v1/driving";
const roadPathCache = new Map();
const ROUTE_MODE_STORAGE_KEY = "georgia-trip-route-mode";

function getStoredRouteMode() {
  try {
    return localStorage.getItem(ROUTE_MODE_STORAGE_KEY) === "roads" ? "roads" : "direct";
  } catch {
    return "direct";
  }
}

function storeRouteMode(mode) {
  try {
    localStorage.setItem(ROUTE_MODE_STORAGE_KEY, mode);
  } catch {
    /* ignore */
  }
}

function routeWaypoints(segment) {
  return (segment.waypoints || []).filter((wp) => !wp.optional);
}

function segmentToPoints(segment) {
  const pts = [{ lat: segment.from.lat, lng: segment.from.lng }];
  routeWaypoints(segment).forEach((wp) => pts.push({ lat: wp.lat, lng: wp.lng }));
  const sameEnd =
    segment.loop &&
    segment.from.lat === segment.to.lat &&
    segment.from.lng === segment.to.lng;
  if (!sameEnd) {
    pts.push({ lat: segment.to.lat, lng: segment.to.lng });
  } else if (segment.waypoints?.length) {
    pts.push({ lat: segment.from.lat, lng: segment.from.lng });
  }
  return pts;
}

function pathCacheKey(points) {
  return points.map((p) => `${Number(p.lat).toFixed(5)},${Number(p.lng).toFixed(5)}`).join("|");
}

function directPathLatLngs(points) {
  return points.map((p) => [p.lat, p.lng]);
}

function pathLengthKm(path) {
  if (!path || path.length < 2) return 0;
  let total = 0;
  for (let i = 1; i < path.length; i++) {
    total += L.latLng(path[i - 1]).distanceTo(L.latLng(path[i]));
  }
  return total / 1000;
}

function directPointsDistanceKm(points) {
  return pathLengthKm(directPathLatLngs(points));
}

function formatKm(km) {
  return km < 10 ? km.toFixed(1) : String(Math.round(km));
}

function formatRouteDistanceLabel(path, { prefix, durationSec } = {}) {
  const km = formatKm(pathLengthKm(path));
  const parts = [];
  if (prefix) parts.push(prefix);
  parts.push(`${km} km`);
  if (durationSec != null) {
    const total = Math.round(durationSec / 60);
    const hours = Math.floor(total / 60);
    const minutes = total % 60;
    if (!hours) parts.push(`${minutes} min`);
    else parts.push(minutes ? `${hours}h ${minutes}m` : `${hours}h`);
  }
  return parts.join(" · ");
}

async function fetchRoadPath(points) {
  if (points.length < 2) {
    return {
      path: directPathLatLngs(points),
      distanceKm: directPointsDistanceKm(points),
      durationSec: null,
    };
  }

  const key = pathCacheKey(points);
  if (roadPathCache.has(key)) return roadPathCache.get(key);

  const coordStr = points.map((p) => `${p.lng},${p.lat}`).join(";");
  const url = `${OSRM_DRIVING_URL}/${coordStr}?overview=full&geometries=geojson`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`OSRM HTTP ${res.status}`);

  const data = await res.json();
  const route = data.routes?.[0];
  if (data.code !== "Ok" || !route?.geometry?.coordinates?.length) {
    throw new Error(data.message || "No route");
  }

  const result = {
    path: route.geometry.coordinates.map(([lng, lat]) => [lat, lng]),
    distanceKm: route.distance / 1000,
    durationSec: route.duration,
  };
  roadPathCache.set(key, result);
  return result;
}

function createRouteModeUi() {
  const statusEl = { current: null };
  return {
    setLoading(loading) {
      if (!statusEl.current) return;
      statusEl.current.hidden = !loading;
      statusEl.current.textContent = loading ? "טוען מסלולי כביש…" : "";
    },
    setHint(text) {
      if (!statusEl.current) return;
      statusEl.current.hidden = !text;
      statusEl.current.textContent = text || "";
    },
    bindStatus(el) {
      statusEl.current = el;
    },
    setButtonsDisabled(disabled, buttons) {
      buttons.forEach((b) => {
        b.disabled = disabled;
      });
    },
  };
}

/**
 * Mount direct / roads toggle above a map container.
 * @param {object|null} extremeApi – optional layer from attachExtremeLayer (main map)
 * @returns {{ getMode: Function } | null}
 */
function mountRouteModeBar(mapContainerId, onModeChange, extremeApi) {
  const mapEl = document.getElementById(mapContainerId);
  if (!mapEl?.parentNode) return null;

  const existing = mapEl.previousElementSibling;
  if (existing?.classList?.contains("route-mode-bar")) {
    existing.remove();
  }

  const showExtreme = extremeApi?.isVisible?.() ?? false;
  const extremeHtml = extremeApi
    ? `<span class="route-mode-divider" aria-hidden="true"></span>
       <button type="button" class="route-mode-btn map-extreme-toggle${showExtreme ? " active" : ""}" aria-pressed="${showExtreme}">
         🧗 פעילויות אקסטרים
       </button>`
    : "";

  const bar = document.createElement("div");
  bar.className = "route-mode-bar";
  bar.innerHTML = `
    <span class="route-mode-label">תצוגת מסלול:</span>
    <div class="route-mode-toggle" role="group" aria-label="תצוגת מסלול">
      <button type="button" class="route-mode-btn" data-mode="direct">📐 קווים ישירים</button>
      <button type="button" class="route-mode-btn" data-mode="roads">🛣 מסלול כביש</button>
    </div>
    ${extremeHtml}
    <span class="route-mode-status" hidden></span>
  `;
  mapEl.parentNode.insertBefore(bar, mapEl);

  const ui = createRouteModeUi();
  ui.bindStatus(bar.querySelector(".route-mode-status"));
  const routeButtons = bar.querySelectorAll(".route-mode-btn[data-mode]");
  let mode = getStoredRouteMode();

  function syncRouteButtons() {
    routeButtons.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.mode === mode);
    });
  }

  syncRouteButtons();

  routeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const next = btn.dataset.mode;
      if (next === mode) return;
      mode = next;
      storeRouteMode(mode);
      syncRouteButtons();
      onModeChange(mode, ui, routeButtons);
    });
  });

  const extremeBtn = bar.querySelector(".map-extreme-toggle");
  if (extremeBtn && extremeApi) {
    extremeBtn.addEventListener("click", () => {
      const next = !extremeApi.isVisible();
      extremeApi.setVisible(next);
      extremeBtn.classList.toggle("active", next);
      extremeBtn.setAttribute("aria-pressed", String(next));
      extremeApi.onVisibilityChange?.(next);
    });
  }

  onModeChange(mode, ui, routeButtons);

  return { getMode: () => mode };
}

async function resolvePathLatLngs(points, mode) {
  const directPath = directPathLatLngs(points);
  if (mode !== "roads" || points.length < 2) {
    return {
      path: directPath,
      usedFallback: false,
      distanceKm: directPointsDistanceKm(points),
      durationSec: null,
    };
  }
  try {
    const road = await fetchRoadPath(points);
    return {
      path: road.path,
      usedFallback: false,
      distanceKm: road.distanceKm,
      durationSec: road.durationSec,
    };
  } catch {
    return {
      path: directPath,
      usedFallback: true,
      distanceKm: directPointsDistanceKm(points),
      durationSec: null,
    };
  }
}

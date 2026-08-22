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

function segmentPath(segment) {
  const path = [[segment.from.lat, segment.from.lng]];
  (segment.waypoints || []).forEach((wp) => path.push([wp.lat, wp.lng]));
  if (!segment.loop || segment.from.lat !== segment.to.lat || segment.from.lng !== segment.to.lng) {
    path.push([segment.to.lat, segment.to.lng]);
  } else if (segment.waypoints?.length) {
    path.push([segment.from.lat, segment.from.lng]);
  }
  return path;
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
    html: '<div class="overnight-marker">🏨</div>',
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  });
}

function createPlaceIcon(color) {
  return L.divIcon({
    className: "place-marker-wrap",
    html: `<div class="place-marker" style="background:${color}"></div>`,
    iconSize: [12, 12],
    iconAnchor: [6, 6],
  });
}

function initRouteMap(containerId, segments, dayColors) {
  const map = L.map(containerId, { scrollWheelZoom: true }).setView([42.3, 42.5], 7);

  L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
    subdomains: "abcd",
    maxZoom: 19,
  }).addTo(map);

  const allBounds = [];
  const overnightSeen = new Set();

  segments.forEach((segment) => {
    const color = dayColors[segment.day] || "#666";
    const path = segmentPath(segment);

    L.polyline(path, {
      color,
      weight: 5,
      opacity: 0.85,
      lineJoin: "round",
    })
      .addTo(map)
      .bindTooltip(segmentLabel(segment), { sticky: true, className: "segment-tooltip" });

    path.forEach((pt) => allBounds.push(pt));

    const mid = pathMidpoint(path);
    L.marker(mid, {
      icon: createSegmentBadge(segmentLabel(segment), color),
      interactive: false,
    }).addTo(map);

    (segment.waypoints || []).forEach((wp) => {
      L.marker([wp.lat, wp.lng], { icon: createPlaceIcon(color) })
        .addTo(map)
        .bindPopup(`<strong>${enPlace(wp.name)}</strong><br>Day ${segment.day}`)
        .bindTooltip(enPlace(wp.name), {
          permanent: true,
          direction: "top",
          className: "place-tooltip",
          offset: [0, -6],
        });
    });

    const overnightKey = `${segment.to.lat},${segment.to.lng}`;
    if (segment.overnight && !overnightSeen.has(overnightKey)) {
      overnightSeen.add(overnightKey);
      L.marker([segment.to.lat, segment.to.lng], { icon: createOvernightIcon() })
        .addTo(map)
        .bindPopup(
          `<strong>🏨 ${enPlace(segment.overnight)}</strong><br>Overnight · Day ${segment.day}`
        );
    }

    L.circleMarker([segment.from.lat, segment.from.lng], {
      radius: 7,
      fillColor: color,
      color: "#fff",
      weight: 2,
      fillOpacity: 1,
    })
      .addTo(map)
      .bindPopup(`<strong>${enPlace(segment.from.name)}</strong><br>Day ${segment.day} start`);

    if (!segment.loop) {
      L.circleMarker([segment.to.lat, segment.to.lng], {
        radius: 7,
        fillColor: color,
        color: "#fff",
        weight: 2,
        fillOpacity: 1,
      })
        .addTo(map)
        .bindPopup(`<strong>${enPlace(segment.to.name)}</strong><br>Day ${segment.day} end`);
    }
  });

  if (allBounds.length) {
    map.fitBounds(allBounds, { padding: [50, 50] });
  }

  renderMapLegend(segments, dayColors);
  return map;
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

  L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
    subdomains: "abcd",
    maxZoom: 19,
  }).addTo(map);

  const bounds = [];
  const markerById = {};

  segments.forEach((segment) => {
    const color = dayColors[segment.day] || "#999";
    const path = segmentPath(segment);
    L.polyline(path, {
      color,
      weight: 4,
      opacity: 0.35,
      dashArray: "10 8",
      lineJoin: "round",
    }).addTo(map);
    path.forEach((pt) => bounds.push(pt));
  });

  activities.forEach((activity) => {
    const cat = categories[activity.category] || { color: "#666", icon: "📍" };
    const latlng = [activity.lat, activity.lng];
    bounds.push(latlng);

    const marker = L.marker(latlng, {
      icon: createExtremeIcon(cat.color, cat.icon, false),
    }).addTo(map);

    marker.on("click", () => onSelect(activity));
    marker.bindTooltip(activity.name, {
      permanent: false,
      direction: "top",
      offset: [0, -18],
      className: "extreme-tooltip",
    });

    markerById[activity.id] = { marker, activity, cat };
  });

  if (bounds.length) {
    map.fitBounds(bounds, { padding: [48, 48] });
  }

  return {
    map,
    markerById,
    highlight(id) {
      Object.entries(markerById).forEach(([aid, { marker, cat }]) => {
        const selected = aid === id;
        marker.setIcon(createExtremeIcon(cat.color, cat.icon, selected));
        if (selected) {
          map.panTo(marker.getLatLng(), { animate: true });
        }
      });
    },
    setVisible(ids) {
      const visible = new Set(ids);
      Object.entries(markerById).forEach(([aid, { marker }]) => {
        if (visible.has(aid)) marker.addTo(map);
        else map.removeLayer(marker);
      });
    },
  };
}

function renderMapLegend(segments, dayColors) {
  const legend = document.getElementById("map-legend");
  if (!legend) return;

  legend.innerHTML = `
    <div class="map-legend-grid">
      ${segments
        .map(
          (s) => `
        <a href="day.html?id=${s.day}" class="legend-day-item">
          <span class="legend-day-line" style="background:${dayColors[s.day]}"></span>
          <span class="legend-day-text">
            <strong>יום ${s.day}</strong>
            <span>${s.distanceKm} km · ${s.duration}</span>
            <span class="legend-overnight">🏨 ${hePlace(s.overnight)}</span>
          </span>
        </a>
      `
        )
        .join("")}
    </div>
    <div class="map-legend-notes">
      <span><span class="place-marker inline"></span> מקומות בדרך</span>
      <span>🏨 לינה</span>
      <span>
        <a href="${TRIP_META.globalMapUrl}" target="_blank" rel="noopener noreferrer" class="external-link">
          פתיחת מפת Google המלאה
        </a>
      </span>
    </div>
  `;
}

function initDayMap(containerId, options) {
  const routes = Array.isArray(options) ? [{ points: options }] : options?.routes || [];
  const overnightName = options?.overnight || null;
  if (!routes.length) return null;

  const map = L.map(containerId);
  L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
    attribution: '&copy; OpenStreetMap &copy; CARTO',
    subdomains: "abcd",
    maxZoom: 19,
  }).addTo(map);

  const routeColors = ["#7b2d3e", "#2d5a3d", "#c47b2b", "#2980b9"];
  const multi = routes.length > 1;
  const bounds = [];
  const seen = new Set();

  routes.forEach((route, idx) => {
    const points = route.points || [];
    if (!points.length) return;
    const color = route.color || routeColors[idx % routeColors.length];
    const path = points.map((p) => [p.lat, p.lng]);
    path.forEach((ll) => bounds.push(ll));

    const dashed = multi || route.dashed;
    L.polyline(path, {
      color,
      weight: multi ? 4 : 3,
      opacity: 0.9,
      dashArray: dashed ? "8 6" : null,
      lineJoin: "round",
    })
      .addTo(map)
      .bindTooltip(route.label || `מסלול ${idx + 1}`, { sticky: true });

    points.forEach((p) => {
      const key = `${p.lat.toFixed(4)},${p.lng.toFixed(4)}`;
      if (seen.has(key)) return;
      seen.add(key);
      const isOvernight =
        overnightName &&
        (p.name === overnightName || String(p.name).includes(String(overnightName).split(" · ")[0]));
      const marker = isOvernight
        ? L.marker([p.lat, p.lng], { icon: createOvernightIcon() })
        : L.marker([p.lat, p.lng], { icon: createPlaceIcon(color) });
      marker.addTo(map).bindPopup(`<strong>${enPlace(p.name)}</strong>`);
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
  L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
    attribution: '&copy; OpenStreetMap &copy; CARTO',
    subdomains: "abcd",
    maxZoom: 19,
  }).addTo(map);

  const bounds = [];
  const markerById = {};
  const routeColors = ["#7b2d3e", "#2d5a3d", "#c47b2b", "#2980b9"];
  const placeSeen = new Set();

  dayRoutes.forEach((route, idx) => {
    const points = route.points || [];
    if (!points.length) return;
    const color = route.color || routeColors[idx % routeColors.length];
    const path = points.map((p) => [p.lat, p.lng]);
    path.forEach((ll) => bounds.push(ll));
    const multi = dayRoutes.length > 1;
    const dashed = multi || route.dashed;

    L.polyline(path, {
      color,
      weight: multi ? 4 : 3,
      opacity: 0.75,
      dashArray: dashed ? "8 6" : null,
      lineJoin: "round",
    })
      .addTo(map)
      .bindTooltip(route.label || "מסלול היום", { sticky: true });

    points.forEach((p) => {
      const key = `${Number(p.lat).toFixed(4)},${Number(p.lng).toFixed(4)}`;
      if (placeSeen.has(key)) return;
      placeSeen.add(key);
      const isOvernight =
        overnightName &&
        (p.name === overnightName ||
          String(p.name).includes(String(overnightName).split(" · ")[0]));
      const marker = isOvernight
        ? L.marker([p.lat, p.lng], { icon: createOvernightIcon() })
        : L.marker([p.lat, p.lng], { icon: createPlaceIcon(color) });
      marker
        .addTo(map)
        .bindPopup(`<strong>${enPlace(p.name)}</strong><br><small>מקום בטיול</small>`);
    });
  });

  spots.forEach((spot) => {
    const kind = spot.kind || "destination";
    const latlng = [spot.lat, spot.lng];
    bounds.push(latlng);
    const marker = L.marker(latlng, { icon: createDroneIcon(false, kind) }).addTo(map);
    marker.on("click", () => onSelect?.(spot));
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

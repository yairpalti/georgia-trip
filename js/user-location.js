/**
 * מיקום המשתמש – מרכוז המפה + מרחק לנקודות.
 * משותף לכל המפות באתר.
 */

const userLocationState = {
  lat: null,
  lng: null,
  accuracy: null,
  active: false,
  error: null,
};

const userLocationSubs = new Set();
let watchId = null;

function getUserLocation() {
  if (userLocationState.lat == null || userLocationState.lng == null) return null;
  return {
    lat: userLocationState.lat,
    lng: userLocationState.lng,
    accuracy: userLocationState.accuracy,
  };
}

function onUserLocationChange(fn) {
  userLocationSubs.add(fn);
  return () => userLocationSubs.delete(fn);
}

function notifyUserLocationChange() {
  userLocationSubs.forEach((fn) => {
    try {
      fn(getUserLocation());
    } catch (err) {
      console.warn("User location subscriber failed", err);
    }
  });
}

function userLocHaversineKm(a, b) {
  if (typeof haversineKm === "function") return haversineKm(a, b);
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;
  const h =
    Math.sin(dLat / 2) ** 2 + Math.sin(dLng / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  return 2 * R * Math.asin(Math.sqrt(h));
}

function distanceFromUserKm(lat, lng) {
  const loc = getUserLocation();
  if (!loc || lat == null || lng == null) return null;
  return userLocHaversineKm(loc, { lat: Number(lat), lng: Number(lng) });
}

function formatDistanceFromUser(lat, lng) {
  const km = distanceFromUserKm(lat, lng);
  if (km == null) return null;
  if (km < 1) return `${Math.round(km * 1000)} מ' ממך`;
  return km < 10 ? `${km.toFixed(1)} ק"מ ממך` : `${Math.round(km)} ק"מ ממך`;
}

function appendDistanceFromUser(container, lat, lng) {
  const text = formatDistanceFromUser(lat, lng);
  if (!text || !container) return;
  const node = document.createElement("div");
  node.className = "poi-popup-distance";
  node.textContent = `📍 ${text}`;
  container.appendChild(node);
}

function userLocationErrorMessage(code) {
  if (code === 1) return "הגישה למיקום נדחתה";
  if (code === 2) return "לא ניתן לקבל מיקום";
  if (code === 3) return "תם הזמן – נסו שוב";
  return "שגיאת מיקום";
}

function createUserLocationIcon() {
  return L.divIcon({
    className: "user-location-wrap",
    html: '<div class="user-location-dot"><span class="user-location-pulse"></span></div>',
    iconSize: [22, 22],
    iconAnchor: [11, 11],
  });
}

function attachUserLocation(map, options = {}) {
  if (typeof L === "undefined" || !map || !navigator.geolocation) return null;

  const layer = L.layerGroup().addTo(map);
  let btn = null;

  function updateMarker() {
    layer.clearLayers();
    const loc = getUserLocation();
    if (!loc) return;

    if (loc.accuracy) {
      L.circle([loc.lat, loc.lng], {
        radius: loc.accuracy,
        color: "#2563eb",
        fillColor: "#2563eb",
        fillOpacity: 0.1,
        weight: 1,
        interactive: false,
      }).addTo(layer);
    }

    L.marker([loc.lat, loc.lng], {
      icon: createUserLocationIcon(),
      interactive: false,
      zIndexOffset: 2500,
    }).addTo(layer);
  }

  function syncButton() {
    if (!btn) return;
    btn.classList.toggle("is-active", userLocationState.active);
    btn.classList.toggle("is-error", userLocationState.error != null && !userLocationState.active);
    btn.title = userLocationState.active
      ? "מרכוז למיקום שלי"
      : userLocationState.error != null
        ? userLocationErrorMessage(userLocationState.error)
        : "הצג את המיקום שלי על המפה";
  }

  function applyPosition(pos, { center = false } = {}) {
    userLocationState.lat = pos.coords.latitude;
    userLocationState.lng = pos.coords.longitude;
    userLocationState.accuracy = pos.coords.accuracy;
    userLocationState.active = true;
    userLocationState.error = null;
    updateMarker();
    syncButton();
    notifyUserLocationChange();
    if (center) {
      map.setView([userLocationState.lat, userLocationState.lng], Math.max(map.getZoom(), 12), {
        animate: true,
      });
    }
    options.onLocated?.(getUserLocation());
  }

  function startWatch() {
    if (watchId != null) return;
    watchId = navigator.geolocation.watchPosition(
      (pos) => applyPosition(pos),
      (err) => {
        if (userLocationState.active) return;
        userLocationState.error = err.code;
        syncButton();
        notifyUserLocationChange();
      },
      { enableHighAccuracy: true, maximumAge: 30000, timeout: 20000 }
    );
  }

  function locate({ center = true } = {}) {
    btn?.classList.add("is-loading");
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          btn?.classList.remove("is-loading");
          applyPosition(pos, { center });
          startWatch();
          resolve(getUserLocation());
        },
        (err) => {
          btn?.classList.remove("is-loading");
          userLocationState.error = err.code;
          syncButton();
          notifyUserLocationChange();
          reject(err);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 60000 }
      );
    });
  }

  const control = L.control({ position: options.position || "bottomright" });
  control.onAdd = function () {
    btn = L.DomUtil.create("button", "user-locate-btn");
    btn.type = "button";
    btn.innerHTML = "📍";
    btn.setAttribute("aria-label", "הצג את המיקום שלי על המפה");
    L.DomEvent.disableClickPropagation(btn);
    L.DomEvent.on(btn, "click", () => {
      if (userLocationState.active) {
        map.setView([userLocationState.lat, userLocationState.lng], Math.max(map.getZoom(), 12), {
          animate: true,
        });
        return;
      }
      locate({ center: true }).catch(() => {});
    });
    syncButton();
    return btn;
  };
  control.addTo(map);

  map.on("unload", () => {
    if (watchId != null) {
      navigator.geolocation.clearWatch(watchId);
      watchId = null;
    }
  });

  if (userLocationState.active) updateMarker();

  return { locate, layer, getLocation: getUserLocation };
}

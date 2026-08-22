function renderPlaceCards(items, type) {
  if (!items || !items.length) return "";
  return `
    <div class="place-grid">
      ${items
        .map(
          (item) => `
        <a href="${item.link}" target="_blank" rel="noopener noreferrer" class="place-card">
          ${renderImg(item.image, "", item.name, "supra")}
          <div class="place-card-body">
            <h3>${item.name}</h3>
            ${item.cuisine ? `<p>${item.cuisine}</p>` : ""}
            ${item.area ? `<p>${item.area}</p>` : ""}
            ${item.note ? `<p>${item.note}</p>` : ""}
            <span class="external-link">פתיחה במפה</span>
          </div>
        </a>
      `
        )
        .join("")}
    </div>
  `;
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
          a.link
            ? `<a href="${a.link}" target="_blank" rel="noopener noreferrer" class="external-link">${a.linkLabel || "פתיחה במפה / מידע נוסף"}</a>`
            : ""
        }
      </div>
    </article>
  `
    )
    .join("")}</div>`;
}

function renderRaftingKutaisiCard(dayId) {
  if (typeof RAFTING_KUTAISI === "undefined" || !RAFTING_KUTAISI.relatedDays.includes(dayId)) return "";
  const op = RAFTING_KUTAISI;
  const dayTours = op.tours.filter((t) => t.relatedDays.includes(dayId));
  return `
    <div class="card operator-card">
      <h2>🛶 ${op.name}</h2>
      <p>${op.summary}</p>
      <ul class="operator-contact">
        <li><a href="${op.home}" target="_blank" rel="noopener noreferrer" class="external-link">🌐 raftinginkutaisi.com</a></li>
        <li><a href="${op.contact.whatsapp}" target="_blank" rel="noopener noreferrer" class="external-link">📱 WhatsApp ${op.contact.phone}</a></li>
        <li><a href="${op.contact.emailLink}" class="external-link">✉️ ${op.contact.email}</a></li>
        <li><a href="${op.contact.maps}" target="_blank" rel="noopener noreferrer" class="external-link">📍 ${op.contact.address}</a></li>
      </ul>
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
            ${a.driving ? `<p class="alt-driving">🚗 ${a.driving}</p>` : ""}
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
  return DAYS.find((d) => d.id === id);
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
  return TRAVELER_STORIES[dayId] || null;
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

  const storiesHtml =
    data?.stories?.length > 0
      ? data.stories.map((story, i) => renderStoryFrame(story, i)).join("")
      : `<div class="card empty-stories"><p>עדיין אין סיפורים ליום זה – בקרוב.</p></div>`;

  el.innerHTML = `
    <section class="day-hero stories-hero">
      <div class="day-hero-inner container">
        <div class="breadcrumb">
          <a href="index.html">דף הבית</a> /
          <a href="day.html?id=${day.id}">יום ${day.id}</a> /
          סיפורי מטיילים
        </div>
        <h1>📖 סיפורי מטיילים – יום ${day.id}</h1>
        <p class="stories-hero-subtitle">${day.emoji} ${day.title} · ${day.date}</p>
      </div>
    </section>

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
          ? `<a href="stories.html?id=${dayId - 1}">סיפורים יום ${dayId - 1} →</a>`
          : "<span></span>"
      }
      <a href="day.html?id=${dayId}">תוכנית היום</a>
      ${
        dayId < 13
          ? `<a href="stories.html?id=${dayId + 1}">← סיפורים יום ${dayId + 1}</a>`
          : "<span></span>"
      }
    </div>
  `;
}

function enrichDay(day) {
  if (!day || typeof DAY_ENRICHMENT === "undefined") return day;
  const e = DAY_ENRICHMENT[day.id];
  if (!e) return day;

  const actDetails = typeof ACTIVITY_DETAILS !== "undefined" ? ACTIVITY_DETAILS[day.id] : null;
  const activities = (day.activities || []).map((a, i) => ({
    ...a,
    ...(actDetails?.[i] || {}),
    ...(e.activityExtras?.[i] || {}),
  }));
  if (e.extraActivities?.length) activities.push(...e.extraActivities);

  const restaurants = [...(day.restaurants || []), ...(e.extraRestaurants || [])];
  const hotels = [...(day.hotels || []), ...(e.extraHotels || [])];

  const alternatives = (day.alternatives || []).map((alt, i) => {
    const altExtra =
      e.alternativeExtras?.[i] ||
      e.alternativeExtras?.[String(i)] ||
      (typeof ALTERNATIVE_ENRICHMENT !== "undefined" && ALTERNATIVE_ENRICHMENT[day.id]?.[i]) ||
      (typeof ALTERNATIVE_ENRICHMENT !== "undefined" && ALTERNATIVE_ENRICHMENT[day.id]?.[String(i)]) ||
      {};
    return { ...alt, ...altExtra };
  });

  return {
    ...day,
    summary: e.summary || day.summary,
    tips: e.tips || day.tips || [],
    heroImage: e.heroImage || day.heroImage,
    activities,
    restaurants,
    hotels,
    alternatives,
  };
}

function renderDayNav(dayId, { top = false } = {}) {
  const prev =
    dayId > 1
      ? `<a href="day.html?id=${dayId - 1}">יום ${dayId - 1} →</a>`
      : "<span></span>";
  const next =
    dayId < 13
      ? `<a href="day.html?id=${dayId + 1}">← יום ${dayId + 1}</a>`
      : "<span></span>";
  const center = `<a href="index.html">כל הימים</a>`;
  const cls = top ? "day-nav day-nav-top" : "container day-nav";
  return `<nav class="${cls}" aria-label="ניווט בין ימים">${prev}${center}${next}</nav>`;
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

  document.getElementById("day-content").innerHTML = `
    <section class="day-hero"${heroStyle}>
      <div class="day-hero-inner container">
        <div class="breadcrumb"><a href="index.html">דף הבית</a> / יום ${day.id}</div>
        ${renderDayNav(dayId, { top: true })}
        <h1>${day.emoji} יום ${day.id}: ${day.title}</h1>
        <div class="day-meta-row">
          <span>📅 ${day.date} (${day.weekday})</span>
          <span>🚗 ${day.driving}</span>
          <span>🏨 ${day.overnight}</span>
        </div>
      </div>
    </section>

    <div class="container content-grid">
      <main>
        ${
          getStoryCount(dayId) > 0
            ? `
        <a href="stories.html?id=${dayId}" class="stories-banner card">
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

        ${renderRaftingKutaisiCard(dayId)}

        ${renderDayTips(day.tips)}

        ${renderAlternatives(day.alternatives)}

        <div class="card">
          <h2>🍽 מסעדות מומלצות</h2>
          ${
            day.restaurants && day.restaurants.length
              ? renderPlaceCards(day.restaurants)
              : "<p class='empty-section'>אין המלצות ספציפיות ליום זה – שאלו את המארח/ת או חפשו באזור הלינה.</p>"
          }
        </div>

        <div class="card">
          <h2>🏨 לינה</h2>
          ${
            day.hotels && day.hotels.length
              ? renderPlaceCards(day.hotels)
              : "<p class='empty-section'>לינה לא רלוונטית (יום נסיעה / המראה).</p>"
          }
        </div>
      </main>

      <aside>
        <div class="card sidebar-card">
          <h2>פרטים</h2>
          <div class="info-row"><span>תאריך</span><span>${day.date}</span></div>
          <div class="info-row"><span>נושא</span><span>${day.theme}</span></div>
          <div class="info-row"><span>נהיגה</span><span>${day.driving}</span></div>
          <div class="info-row"><span>לינה</span><span>${day.overnight}</span></div>
          <div id="day-map"></div>
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
          <a href="stories.html?id=${dayId}" class="btn btn-outline stories-sidebar-btn">לסיפורים ←</a>
        </div>`
            : ""
        }
      </aside>
    </div>

    ${renderDayNav(dayId)}
  `;

  if (day.mapPoints && day.mapPoints.length) {
    setTimeout(() => initDayMap("day-map", day.mapPoints), 100);
  }
}

function renderDaysGrid() {
  const grid = document.getElementById("days-grid");
  if (!grid) return;

  grid.innerHTML = DAYS.map(
    (day) => {
      const d = enrichDay(day);
      return `
    <article class="day-card">
      ${d.heroImage ? `<div class="day-card-thumb" style="background-image:url('${resolveImageUrl(d.heroImage)}')"></div>` : ""}
      <div class="day-card-header">
        <div class="day-card-num">${d.emoji} יום ${d.id} · ${d.date} (${d.weekday})</div>
        <h3 class="day-card-title">${d.title}</h3>
      </div>
      <div class="day-card-body">
        <div class="day-card-meta">${d.theme} · ${d.driving}</div>
        <p class="day-card-summary">${d.summary}</p>
        <div class="day-card-overnight">🏨 ${d.overnight}</div>
        <div class="day-card-links">
          <a href="day.html?id=${d.id}" class="day-card-link">פרטים מלאים ←</a>
          ${
            getStoryCount(d.id) > 0
              ? `<a href="stories.html?id=${d.id}" class="day-card-link day-card-stories">📖 סיפורי מטיילים</a>`
              : ""
          }
        </div>
      </div>
    </article>
  `;
    }
  ).join("");
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
                ${activity.operatorHome ? `<a href="${activity.operatorHome}" target="_blank" rel="noopener noreferrer" class="btn btn-outline extreme-detail-link">🌐 Rafting in Kutaisi</a>` : ""}
              </div>`
            : ""
        }
      </div>
    </article>
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
      </div>
    </section>
    <main class="container extreme-page">
      <section class="section">
        <h2 class="section-title">🗺 מפה – מסלול + אטרקציות</h2>
        <p class="extreme-map-intro">קווי המסלול הצבעוניים (מקווקווים) = ימי הטיול. הנקודות הצבעוניות = פעילויות אקסטרים לפי סוג.</p>
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
            <a href="day.html?id=${s.day}" class="legend-day-item">
              <span class="legend-day-line" style="background:${DAY_COLORS[s.day]};opacity:0.5"></span>
              <span class="legend-day-text"><strong>יום ${s.day}</strong><span>${s.distanceKm} km</span></span>
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

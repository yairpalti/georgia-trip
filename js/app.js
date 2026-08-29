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
  if (typeof RAFTING_KUTAISI === "undefined" || !RAFTING_KUTAISI.relatedDays.includes(dayId)) return "";
  const op = RAFTING_KUTAISI;
  const dayTours = op.tours.filter((t) => t.relatedDays.includes(dayId));
  const camp = op.camping;
  const showCamp = camp && camp.relatedDays.includes(dayId);
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
        showCamp
          ? `<div class="operator-camping">
              <h3>🏕️ ${camp.name}</h3>
              <p>${camp.summary}</p>
              <p class="operator-tour-note">${camp.scheduleHint}</p>
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
  return DAYS.find((d) => d.id === id);
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
  const seg = ROUTE_SEGMENTS.find((s) => s.day === dayId);
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

function renderCulinaryLinkList(items) {
  if (!items?.length) return "";
  return `<ul class="culinary-link-list">${items
    .map(
      (item) => `
    <li>
      <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="external-link">📘 ${item.label}</a>
      ${item.note ? `<span class="culinary-link-note">${item.note}</span>` : ""}
    </li>`
    )
    .join("")}</ul>`;
}

function renderCulinaryLinksCard(dayId) {
  if (typeof CULINARY_LINKS === "undefined") return "";
  const dayLinks = CULINARY_LINKS.byDay?.[dayId];
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
          ? `<div class="culinary-group"><h3>👨‍🍳 סדנאות בישול</h3>${renderCulinaryLinkList(workshops)}</div>`
          : ""
      }
      ${
        wineries.length
          ? `<div class="culinary-group"><h3>🍷 יקבים וטעימות</h3>${renderCulinaryLinkList(wineries)}</div>`
          : ""
      }
    </div>
  `;
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
      </div>
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
  if (typeof DRONE_SPOTS === "undefined") return "";
  const data = DRONE_SPOTS[dayId];
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
  const data = typeof DRONE_SPOTS !== "undefined" ? DRONE_SPOTS[dayId] : null;
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

function getDayMapRoutes(day) {
  if (day?.mapRoutes?.length) {
    return day.mapRoutes.map((r) => ({
      ...r,
      dashed: r.dashed ?? day.mapRoutes.length > 1,
    }));
  }

  const seg =
    typeof ROUTE_SEGMENTS !== "undefined"
      ? ROUTE_SEGMENTS.find((s) => s.day === day.id)
      : null;

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

  document.getElementById("day-content").innerHTML = `
    <section class="day-hero"${heroStyle}>
      <div class="day-hero-inner container">
        <div class="breadcrumb"><a href="index.html">דף הבית</a> / יום ${day.id}</div>
        ${renderDayNav(dayId, { top: true })}
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
          <a href="stories.html?id=${dayId}" class="btn btn-outline stories-sidebar-btn">לסיפורים ←</a>
        </div>`
            : ""
        }
      </aside>
    </div>

    ${renderDayNav(dayId)}
  `;

  const dayRoutes = getDayMapRoutes(day);
  if (dayRoutes.length) {
    setTimeout(
      () =>
        initDayMap("day-map", {
          routes: dayRoutes,
          overnight: day.overnight,
          dayId,
        }),
      100
    );
  }
  if (typeof DRONE_SPOTS !== "undefined" && DRONE_SPOTS[dayId]?.spots?.length) {
    setTimeout(() => initDroneSpotsSection(dayId), 150);
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
        <h3 class="day-card-title"><a href="day.html?id=${d.id}" class="day-card-title-link">${d.title}</a></h3>
      </div>
      <div class="day-card-body">
        <div class="day-card-meta">${d.theme} · <span class="ltr-num">${d.driving}</span></div>
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

function parseUpdateDate(dateStr) {
  if (!dateStr) return 0;
  const dmy = dateStr.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/);
  if (dmy) return new Date(+dmy[3], +dmy[2] - 1, +dmy[1]).getTime();
  if (/אוגוסט\s*2026/.test(dateStr)) return new Date(2026, 7, 1).getTime();
  return 0;
}

function renderNewPage() {
  const root = document.getElementById("new-content");
  if (!root || typeof SITE_UPDATES === "undefined") return;

  const data = SITE_UPDATES;
  const items = [...data.items].sort((a, b) => parseUpdateDate(b.date) - parseUpdateDate(a.date));
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
              <time class="new-update-date">${item.date}</time>
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
      </div>
    </section>
    <main class="container extreme-page">
      ${renderExtremeSeasonGuide()}
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

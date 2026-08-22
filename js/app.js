function renderPlaceCards(items, type) {
  if (!items || !items.length) return "";
  return `
    <div class="place-grid">
      ${items
        .map(
          (item) => `
        <a href="${item.link}" target="_blank" rel="noopener noreferrer" class="place-card">
          ${item.image ? `<img src="${item.image}" alt="${item.name}" loading="lazy">` : ""}
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
    <article class="activity-item${a.image ? " has-image" : ""}">
      ${a.image ? `<img class="activity-img" src="${a.image}" alt="" loading="lazy">` : ""}
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
    <div class="card">
      <h2>🔄 תוכניות חלופיות</h2>
      ${alts
        .map(
          (a) => `
        <div class="alt-plan">
          <h4>${a.name}</h4>
          <p>${a.description}</p>
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

function getStoriesForDay(dayId) {
  if (typeof TRAVELER_STORIES === "undefined") return null;
  return TRAVELER_STORIES[dayId] || null;
}

function getStoryCount(dayId) {
  const data = getStoriesForDay(dayId);
  return data?.stories?.length || 0;
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
          <img src="${item.src}" alt="${item.caption || ""}" loading="lazy">
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
          </div>
        </div>
      </header>
      ${story.image ? `<img class="story-hero-img" src="${story.image}" alt="" loading="lazy">` : ""}
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
      <div class="stories-list">${storiesHtml}</div>
    </div>

    <div class="container day-nav">
      ${
        dayId > 1
          ? `<a href="stories.html?id=${dayId - 1}">← סיפורים יום ${dayId - 1}</a>`
          : "<span></span>"
      }
      <a href="day.html?id=${dayId}">תוכנית היום</a>
      ${
        dayId < 13
          ? `<a href="stories.html?id=${dayId + 1}">סיפורים יום ${dayId + 1} →</a>`
          : "<span></span>"
      }
    </div>
  `;
}

function enrichDay(day) {
  if (!day || typeof DAY_ENRICHMENT === "undefined") return day;
  const e = DAY_ENRICHMENT[day.id];
  if (!e) return day;

  const activities = (day.activities || []).map((a, i) => ({
    ...a,
    ...(e.activityExtras?.[i] || {}),
  }));
  if (e.extraActivities?.length) activities.push(...e.extraActivities);

  const restaurants = [...(day.restaurants || []), ...(e.extraRestaurants || [])];
  const hotels = [...(day.hotels || []), ...(e.extraHotels || [])];

  return {
    ...day,
    summary: e.summary || day.summary,
    tips: e.tips || day.tips || [],
    heroImage: e.heroImage || day.heroImage,
    activities,
    restaurants,
    hotels,
  };
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
    ? ` style="background-image: linear-gradient(to bottom, rgba(90,31,45,0.75), rgba(45,90,61,0.85)), url('${day.heroImage}')"`
    : "";

  document.getElementById("day-content").innerHTML = `
    <section class="day-hero"${heroStyle}>
      <div class="day-hero-inner container">
        <div class="breadcrumb"><a href="index.html">דף הבית</a> / יום ${day.id}</div>
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

    <div class="container day-nav">
      ${
        dayId > 1
          ? `<a href="day.html?id=${dayId - 1}">← יום ${dayId - 1}</a>`
          : "<span></span>"
      }
      <a href="index.html">כל הימים</a>
      ${
        dayId < 13
          ? `<a href="day.html?id=${dayId + 1}">יום ${dayId + 1} →</a>`
          : "<span></span>"
      }
    </div>
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

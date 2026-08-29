/** רכב שכור (SUV) מול ג'יפ 4×4 – ימי מסטיה (7–9) + Koruldi ביום 11 */
const MESTIA_VEHICLE_GUIDE = {
  title: "מסטיה: רכב שכור (SUV) מול ג'יפ 4×4",
  intro:
    "הרכב השכור (SUV) מספיק לרוב הימים במסטיה. ג'יפ 4×4 עם נהג מקומי נדרש רק ליעדי שטח – בעיקר Ushguli. להזמין ג'יפ מראש ב-check-in (יום 7).",
  bookAhead: [
    "יום 8 (Ushguli) – ג'יפ + נהג, ~150–200 ₾/רכב · לתאם ביום 7",
    "אופציה Koruldi (יום 7 ערב / יום 11 בוקר) – ~150–300 ₾ · לא נגיש ב-SUV",
    "אופציה Chalaadi עד הגשר (יום 9) – ~80 ₾ H/R · חוסך ~2 ש' הליכה",
  ],
  days: [
    {
      day: 7,
      date: "29.9",
      title: "זוגדידi → מסטיה",
      suv: "🚗 SUV – מספיק",
      suvNote: "140 ק\"מ, כביש סלול מפותל. שעה–שעה וחצי אחרונות: serpentine, פרות, בורות – נהיגה זהירה.",
      jeep: "🚙 ג'יפ – אופציה בערב",
      jeepNote: "Koruldi Lakes (~2,850 מ') – לא ברכב רגיל. חצי יום אחרי check-in.",
      jeepRequired: false,
    },
    {
      day: 8,
      date: "30.9",
      title: "Ushguli + Shkhara",
      suv: "🚗 SUV – חונה במסטיה",
      suvNote: "לא נוסעים ל-Ushguli ברכב השכור – הכביש מחלקו סלע.",
      jeep: "🚙 ג'יפ 4×4 – חובה",
      jeepNote: "ג'יפ + נהג מקומי (~150–200 ₾). 90 ק\"מ H/R, ~3.5 ש'.",
      jeepRequired: true,
    },
    {
      day: 9,
      date: "1.10",
      title: "צ'לאדי + מעבר למאזרי",
      suv: "🚗 SUV – מספיק",
      suvNote: "בוקר: צ'לאדי (חניה בכניסה). אחה\"צ: מסטיה → מאזרי (~45 דק', 25 ק\"מ).",
      jeep: "🚙 ג'יפ – אופציה (צ'לאדי)",
      jeepNote: "קטע עד גשר העץ – ~80 ₾ H/R. מקצר ~2 ש' הליכה.",
      jeepRequired: false,
    },
    {
      day: 11,
      date: "3.10",
      title: "Koruldi בירידה (ממאזרי)",
      suv: "🚗 SUV – המשך לים",
      suvNote: "נסיעה Mazeri → Anaklia – כביש רגיל.",
      jeep: "🚙 ג'יפ – אופציה בבוקר",
      jeepNote: "Koruldi – רק אם לא ביקרתם ביום 7. ג'יפ 4×4 + נהג.",
      jeepRequired: false,
      related: true,
    },
  ],
};

function getMestiaVehicleDay(dayId) {
  return MESTIA_VEHICLE_GUIDE.days.find((d) => d.day === dayId) || null;
}

function renderMestiaVehicleGuideHtml(options = {}) {
  const g = MESTIA_VEHICLE_GUIDE;
  if (!g) return "";

  if (options.dayId) {
    const d = getMestiaVehicleDay(options.dayId);
    if (!d) return "";
    return `
      <div class="card vehicle-guide-card">
        <h2>🚗🚙 רכב במסטיה – SUV מול ג'יפ</h2>
        <div class="vehicle-day-block${d.jeepRequired ? " vehicle-day-jeep-required" : ""}">
          <p class="vehicle-day-title"><strong>יום ${d.day} (${d.date})</strong> · ${d.title}</p>
          <ul class="vehicle-day-list">
            <li><span class="vehicle-tag vehicle-tag-suv">${d.suv}</span> ${d.suvNote}</li>
            <li><span class="vehicle-tag vehicle-tag-jeep${d.jeepRequired ? " required" : ""}">${d.jeep}</span> ${d.jeepNote}</li>
          </ul>
        </div>
        ${
          d.day === 7
            ? `<p class="vehicle-footnote">💡 מחר (יום 8) – ג'יפ חובה ל-Ushguli. לתאם היום.</p>`
            : ""
        }
        <p class="vehicle-footnote"><a href="logistics.html#mestia-vehicle">טבלה מלא → לוגיסטיקה</a></p>
      </div>`;
  }

  const rows = g.days
    .filter((d) => !options.mestiaOnly || d.day <= 9)
    .map(
      (d) => `
      <tr class="${d.jeepRequired ? "vehicle-row-required" : ""}">
        <td><a href="day.html?id=${d.day}">יום ${d.day}</a><br><small>${d.date} · ${d.title}</small></td>
        <td>${d.suv}<br><small>${d.suvNote}</small></td>
        <td>${d.jeep}<br><small>${d.jeepNote}</small></td>
      </tr>`
    )
    .join("");

  return `
    <p>${g.intro}</p>
    <table class="accommodation-table vehicle-guide-table">
      <thead>
        <tr><th>יום</th><th>רכב שכור (SUV)</th><th>ג'יפ 4×4</th></tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
    <h3 style="font-size:1rem;margin:1.25rem 0 0.5rem">להזמין מראש</h3>
    <ul>${g.bookAhead.map((t) => `<li>${t}</li>`).join("")}</ul>
    <p style="font-size:0.9rem;color:var(--text-muted);margin-top:1rem">
      <strong>בקצרה:</strong> רק יום 8 חייב ג'יפ. ימים 7 ו-9 – SUV. Koruldi וקטע צ'לאדי – ג'יפ אופציונלי.
    </p>`;
}

if (typeof module !== "undefined") module.exports = { MESTIA_VEHICLE_GUIDE, getMestiaVehicleDay, renderMestiaVehicleGuideHtml };

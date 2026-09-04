/** רכב שכור (SUV) מול ג'יפ 4×4 – ימי מסטיה (7–9) + Koruldi ביום 11 */
const MESTIA_VEHICLE_GUIDE = {
  title: "מסטיה: רכב שכור (SUV) מול ג'יפ 4×4",
  intro:
    "הרכב השכור (SUV) מספיק למסטיה→אושגולי ולרוב הדרך לקרחון שחארה. ג'יפ 4×4 עם נהג מקומי מומלץ מאוד ל-Koruldi – הדרך מאתגרת מאוד. צ'לאדי: ג'יפ אופציונלי עד הגשר.",
  bookAhead: [
    "אופציה Koruldi (יום 7 ערב / יום 11 בוקר) – ג'יפ + נהג ~150–300 ₾ · הדרך מאוד מאתגרת (יש קטעים ברוורס) – לא לנסוע לבד",
    "יום 8 (Ushguli + Shkhara) – SUV מספיק: מסטיה→אושגולי כביש לכל רכב; אושגולי→שחארה כמעט עד סוף הדרך בכל רכב, ואז הליכה",
    "אופציה Chalaadi עד הגשר (יום 9) – ~80 ₾ H/R · חוסך ~2 ש' הליכה",
  ],
  days: [
    {
      day: 7,
      date: "29.9",
      title: "זוגדידi → מסטיה",
      suv: "🚗 SUV – מספיק",
      suvNote: "140 ק\"מ, כביש סלול מפותל. שעה–שעה וחצי אחרונות: serpentine, פרות, בורות – נהיגה זהירה.",
      jeep: "🚙 ג'יפ – מומלץ בערב (Koruldi)",
      jeepNote:
        "Koruldi Lakes (~2,850 מ') – דרך מאוד מאתגרת; יש מקומות שהנהג עולה ברוורס. מומלץ חזק לקחת נהג. לא ברכב שכור לבד.",
      jeepRequired: false,
    },
    {
      day: 8,
      date: "30.9",
      title: "Ushguli + Shkhara",
      suv: "🚗 SUV – מספיק",
      suvNote:
        "מסטיה→אושגולי: כביש לכל רכב. מאושגולי לקרחון שחארה: אפשר כמעט בכל רכב עד סוף הדרך; החלק האחרון – הליכה רגלית.",
      jeep: "🚙 ג'יפ – לא חובה",
      jeepNote: "אופציונלי לנוחות / נהג מקומי. לא נדרש לכביש אושגולי עצמו.",
      jeepRequired: false,
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
      jeep: "🚙 ג'יפ + נהג – מומלץ ל-Koruldi",
      jeepNote: "רק אם לא ביקרתם ביום 7. דרך מאתגרת מאוד – לקחת נהג, לא לבד.",
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
            ? `<p class="vehicle-footnote">💡 מחר (יום 8) – מסטיה→אושגולי ב-SUV. ל-Koruldi הערב: לקחת נהג.</p>`
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
      <strong>בקצרה:</strong> מסטיה→אושגולי→שחארה – SUV מספיק (הליכה בסוף לשחארה). Koruldi – ג'יפ + נהג מומלץ מאוד. צ'לאדי – ג'יפ אופציונלי עד הגשר.
    </p>`;
}

if (typeof module !== "undefined") module.exports = { MESTIA_VEHICLE_GUIDE, getMestiaVehicleDay, renderMestiaVehicleGuideHtml };

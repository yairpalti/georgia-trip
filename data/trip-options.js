/**
 * שתי אופציות מסלול:
 * א' – קצחי / צ'יאתורה / ראצ'ה (התוכנית הקיימת)
 * ב' – מטיראלה → Supsa → Sairme → קוטאיסי → Adventure Camping (רפטינג ביום 5)
 */
const TRIP_OPTION_STORAGE_KEY = "georgia-trip-option";

function cloneRouteSegment(seg) {
  return {
    ...seg,
    from: { ...seg.from },
    to: { ...seg.to },
    waypoints: (seg.waypoints || []).map((wp) => ({ ...wp })),
    places: seg.places ? [...seg.places] : undefined,
  };
}

function totalRouteKm(segments) {
  return (segments || []).reduce((sum, s) => sum + (Number(s.distanceKm) || 0), 0);
}

const ROUTE_SEGMENTS_B = (() => {
  const segments = ROUTE_SEGMENTS.map(cloneRouteSegment);
  const byDay = Object.fromEntries(segments.map((s) => [s.day, s]));

  byDay[2] = {
    day: 2,
    from: { name: N.batumi, lat: 41.6168, lng: 41.6367 },
    to: { name: N.supsa, lat: SUPSA.lat, lng: SUPSA.lng, overnight: true },
    waypoints: [
      { name: N.mtirala, lat: 41.8833, lng: 41.9833 },
      { name: N.grigoleti, lat: SUPSA.grigoleti.lat, lng: SUPSA.grigoleti.lng, optional: true },
    ],
    places: [N.mtirala, N.supsa, N.grigoleti],
    distanceKm: 115,
    duration: "2.5–3.5h",
    overnight: N.supsa,
  };

  byDay[3] = {
    day: 3,
    from: { name: N.supsa, lat: SUPSA.lat, lng: SUPSA.lng },
    to: { name: N.sairmeResort, lat: SAIRME.lat, lng: SAIRME.lng, overnight: true },
    waypoints: [
      { name: N.baghdati, lat: SAIRME.baghdati.lat, lng: SAIRME.baghdati.lng, optional: true },
    ],
    places: [N.sairme, N.sairmeResort],
    distanceKm: 140,
    duration: "2.5–3h",
    overnight: N.sairmeResort,
  };

  byDay[4] = {
    day: 4,
    from: { name: N.sairmeResort, lat: SAIRME.lat, lng: SAIRME.lng },
    to: { name: N.adventureCamping, lat: 42.5582341, lng: 42.8517484, overnight: true },
    waypoints: [{ name: N.kutaisi, lat: 42.2679, lng: 42.6946 }],
    places: [N.sairme, N.kutaisi, N.adventureCamping],
    distanceKm: 165,
    duration: "3–4h + סיבוב בקוטאיסי",
    overnight: N.adventureCamping,
  };

  byDay[5] = {
    day: 5,
    from: { name: N.adventureCamping, lat: 42.5582341, lng: 42.8517484 },
    to: { name: N.tskaltubo, lat: 42.3417, lng: 42.5986 },
    waypoints: [],
    places: [N.adventureCamping, N.tskaltubo],
    distanceKm: 80,
    duration: "1.5–2h אחרי רפטינג",
    overnight: N.tskaltubo,
  };

  return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((d) => byDay[d]);
})();

const DAYS_OPTION_B = {
  2: {
    id: 2,
    date: "24.9",
    weekday: "חמישי",
    title: `${N.mtirala.split(" · ")[0]} ולינה ב${N.supsa.split(" · ")[0]}`,
    emoji: "🌲",
    theme: fmt("יער גשם → שבירת נסיעה בחוף", "Rainforest → coastal break at Supsa", "მტირალა → სუფსა"),
    overnight: fmt(`אזור ${N.supsa.split(" · ")[0]} / ${N.grigoleti.split(" · ")[0]}`, "Supsa / Grigoleti area", "სუფსა / გრიგოლეთი"),
    driving: 'כ-115 ק"מ · ~2.5–3.5 ש\' נסיעה (בנוסף למטיראלה)',
    summary:
      "בוקר: יער הגשם מטיראלה – מסלול Tsablnari, zipline ו-Rope Park. אחר הצהריים: נסיעה קצרה צפונה לאזור Supsa / Grigoleti על חוף הים השחור – שוברים את הדרך לפני Sairme. ערב רגוע על החוף.",
    skipEnrichment: true,
    heroImage: "IMG.mtirala",
    tips: [
      "לצאת מוקדם למטיראלה (08:00) – יום מלא בפארק",
      "מעיל גשם ונעלי hiking waterproof",
      "אחרי הפארק – נסיעה קצרה יחסית ל-Supsa (~1–1.5 ש')",
      "להזמין לינה באזור Grigoleti / Supsa מראש (ספטמבר)",
      "למלא דלק לפני יציאה מבאטומי",
    ],
    activities: [
      {
        name: N.mtirala,
        timeOfDay: "08:00–13:30",
        duration: "3–5 שעות",
        description:
          "יער גשם Colchic UNESCO. מסלול Tsablnari (7 ק\"מ): כרמלית, zipline (₾15), מפל 15 מ', אגם לשחייה, Rope Park. מרכז מבקרים: Chakvistavi.",
        link: "https://apa.gov.ge/en/eco-tourism/servisebi-da-tarifebi/mtiralas-erovnuli-parki",
        linkLabel: fmt("APA – פארק מטיראלה", "APA – Mtirala National Park", "APA"),
        image: "IMG.mtirala",
      },
      {
        name: fmt("נסיעה לאזור Supsa", "Drive to Supsa area", "სუფსა"),
        timeOfDay: "14:00–16:00",
        duration: "~1–1.5 ש'",
        description:
          "חזרה לכביש החוף וצפונה דרך Kobuleti / Ureki לאזור Supsa–Grigoleti. שוברים את הנסיעה הארוכה של מחר ל-Sairme.",
        link: "https://www.google.com/maps/search/Supsa+Georgia",
        linkLabel: N.supsa,
        image: "IMG.ureki",
      },
      {
        name: fmt("ערב על חוף Grigoleti / Supsa", "Evening on Grigoleti / Supsa beach", "გრიგოლეთი"),
        timeOfDay: "ערב",
        duration: "1–2 ש'",
        description:
          "חול מגנטי (כמו אורקי), שקיעה על הים השחור, ארוחת ערב במלון/מסעדה מקומית. יום רגוע אחרי היער.",
        link: "https://www.google.com/maps/search/Grigoleti+beach+Georgia",
        linkLabel: N.grigoleti,
        image: "IMG.ureki",
      },
    ],
    alternatives: [
      {
        name: "🏨 מומלץ – Grigoleti Beach / אזור Supsa",
        description:
          "לינה על החוף (Grigoleti Beach Resort, Sun Beach, Andamati וכו') – בריכה, ים, ארוחה במקום. נוח למשפחה אחרי מטיראלה.",
        overnight: N.grigoleti,
        recommended: true,
        image: "IMG.ureki",
      },
      {
        name: "🏖 עצירה קצרה ב-Ureki / Shekvetili",
        description:
          "אם מגיעים מוקדם – טיילת אורקי או מבט על Black Sea Arena ב-Shekvetili לפני check-in.",
        overnight: N.supsa,
        image: "IMG.ureki",
      },
    ],
    restaurants: [
      {
        name: fmt("מסעדה במלון / חוף Grigoleti", "Hotel / beach restaurant – Grigoleti", "გრიგოლეთი"),
        cuisine: "דגים · גיאורגית · נוף לים",
        note: "נוח אחרי יום מטיראלה – בלי נסיעה נוספת",
        link: "https://www.google.com/maps/search/restaurant+Grigoleti+Georgia",
        image: "IMG.supra",
      },
      {
        name: fmt("מסעדות באורקי (קרוב)", "Restaurants in Ureki", "ურეკი"),
        cuisine: "חוף · דגים",
        note: "~10–15 דק' מ-Supsa אם רוצים מבחר גדול יותר",
        link: "https://www.google.com/maps/search/restaurants+Ureki+Georgia",
        image: "IMG.ureki",
      },
      {
        name: fmt("Kobuleti – עצירת צהריים (בדרך)", "Kobuleti lunch stop (en route)", "ქობულეთი"),
        cuisine: "דגים / גיאורגית על כביש החוף",
        note: "אופציה אם רעבים אחרי מטיראלה לפני check-in",
        link: "https://www.google.com/maps/search/restaurant+Kobuleti+Georgia",
        image: "IMG.supra",
      },
    ],
    hotels: [
      {
        name: fmt("Grigoleti Beach Resort (Wyndham)", "Grigoleti Beach Resort", "გრიგოლეთი"),
        area: `${N.supsa} · ${N.grigoleti}`,
        nights: 1,
        note: "Sector Supsa · חוף, בריכה, מסעדה · נוח למשפחה · להזמין מראש",
        link: "https://www.google.com/maps/search/Grigoleti+Beach+Resort+Wyndham",
        image: "IMG.ureki",
      },
      {
        name: fmt("Sun Beach / Andamati – Grigoleti", "Sun Beach / Andamati – Grigoleti", "გრიგოლეთი"),
        area: N.grigoleti,
        nights: 1,
        note: "חלופות על החוף · בריכה / דירות",
        link: "https://www.google.com/maps/search/hotels+Grigoleti+Georgia",
        image: "IMG.ureki",
      },
      {
        name: fmt("מלון / אכסניה באורקי", "Hotel / guesthouse in Ureki", "ურეკი"),
        area: N.ureki,
        nights: 1,
        note: "חלופה קרובה · חול מגנטי · ~10–15 דק' מ-Supsa",
        link: "https://www.google.com/maps/search/hotels+Ureki+Georgia",
        image: "IMG.ureki",
      },
    ],
    mapPoints: [
      { name: N.batumi, lat: 41.6168, lng: 41.6367 },
      { name: N.mtirala, lat: 41.8833, lng: 41.9833 },
      { name: N.grigoleti, lat: SUPSA.grigoleti.lat, lng: SUPSA.grigoleti.lng },
      { name: N.supsa, lat: SUPSA.lat, lng: SUPSA.lng, overnight: true },
    ],
  },

  3: {
    id: 3,
    date: "25.9",
    weekday: "שישי",
    title: `${N.sairme.split(" · ")[0]} – מעיינות וספא`,
    emoji: "♨️",
    theme: fmt("נסיעה ל-Sairme + חצי יום ריזורט", "Drive to Sairme + half-day resort", "საირმე"),
    overnight: N.sairmeResort,
    driving: 'כ-140 ק"מ · ~2.5–3 ש\' בבוקר · אחר הצהריים בלי נסיעה ארוכה',
    summary:
      "בוקר: נסיעה מ-Supsa ל-Sairme. אחר הצהריים: מעיינות מינרליים בטבע (בוּבֶטִים על נהר Bostania), בריכות תרמיות, ואופציה ל-zipline 800 מ'. לינה ב-Best Western Sairme Resort.",
    skipEnrichment: true,
    heroImage: "IMG.sairme",
    tips: [
      "יציאה מ-Supsa ~08:00–08:30 – הגעה ל-Sairme לפני הצהריים",
      "בלי מוזיאונים / אתרי עתיקות בדרך – לחסוך זמן למעיינות",
      "כוס / בקבוק קטן לבוּבֶטִים – מים חינם; לא לשתות כמויות גדולות בלי ייעוץ",
      "בגד ים + מגבת לבריכות התרמיות (~₾10 · shuttle מהמלון)",
      "Zipline: להזמין מראש · ספטמבר 11:00–19:00 · ~₾50 · משקל 30–120 ק\"ג",
      "check-in Best Western – לוודא שעות · +995 32 240 45 45",
    ],
    activities: [
      {
        name: fmt("נסיעה Supsa → Sairme", "Drive Supsa → Sairme", "სუფსა → საირმე"),
        timeOfDay: "08:00–11:00",
        duration: "~2.5–3 ש'",
        description:
          "מזרחה פנימה לכיוון Baghdati / Sairme (~140 ק\"מ). כביש סלול. בלי עצירות תרבות – ישר לריזורט. אופציה קצרה בדרך: יקב Baia's Wine או מסעדת פורל Tskaltashua ליד Baghdati – רק אם באמת שווה.",
        link: "https://www.google.com/maps/dir/Supsa,+Georgia/Sairme,+Georgia",
        linkLabel: "Supsa → Sairme",
        image: "IMG.sairme",
      },
      {
        name: fmt("מעיינות מינרליים בטבע – בוּבֶטִים", "Outdoor mineral springs – buvettes", "მინერალური წყაროები"),
        timeOfDay: "12:00–13:30",
        duration: "45–90 דק'",
        description:
          "בלב הריזורט (~950 מ'), לאורך נהר Bostania: כמה בוּבֶטִים (תחנות שתייה) ממוספרים – כל מעיין עם הרכב מינרלי שונה (סידן, נתרן, ברזל, מגנזיום). שתייה חינם מהברזים (מינונים 100–250 מ\"ל). אוויר נקי, יער מחטני/נשיר – החוויה המרכזית של «מעיינות בטבע», לא רק הספא. להביא כוס; לטעום מעט מכל מקור.",
        link: "https://www.google.com/maps/search/Sairme+mineral+water+buvette",
        linkLabel: "בוּבֶטִים – מפה",
        image: "IMG.sairme",
        tips: [
          "חינם · ליד הפארק המרכזי / שפת הנהר",
          "לא לשתות כמויות גדולות בלי ייעוץ רפואי",
          "כוס נוחה יותר מבקבוק לטעימות קצרות",
          "מותגים מסחריים של Sairme נמכרים בחנויות – המעיינות עצמם בחוץ",
        ],
      },
      {
        name: fmt("בריכות תרמיות וספא", "Thermal pools & spa", "თერმული აუზები"),
        timeOfDay: "13:30–16:00",
        duration: "1.5–2.5 ש'",
        description:
          "בריכות תרמיות מקורות ופתוחות (מים מינרליים חמים), סאונה, ומרכז ספא. הכניסה לבריכות ~₾10. מהמלון – shuttle חינם (~10 דק' צפונה לכיוון Baghdati). מתאים למשפחה אחרי ההליכה בין הבוּבֶטִים.",
        link: "https://www.google.com/maps/search/Sairme+thermal+pools",
        linkLabel: "בריכות תרמיות – מפה",
        image: "IMG.sairme",
        tips: ["בגד ים + מגבת", "shuttle מהמלון לבריכות", "בריכה פתוחה – נוף להרים"],
      },
      {
        name: fmt("Zipline Sairme – 800 מ'", "Sairme Zipline – 800 m", "საირმეს ზიპლაინი"),
        timeOfDay: "11:00–19:00 (ספטמבר)",
        duration: "45–75 דק' (כולל המתנה)",
        description:
          "ה-zipline הארוך בדרום הקווקז: שני מקטעים – 500 מ' (~40–50 שנ') מעל יער הרים, ואז 300 מ' (~30–35 שנ') מעל המלון והפארק. סה\"כ 800 מ', שתי מסילות במקביל (שניים יורדים יחד). ציוד מודרני + מדריכים. מחיר ~₾50. משקל 30–120 ק\"ג. סגור בגשם/רוח חזקה. להזמין מראש.",
        link: "https://sairmeresort.ge/en/static/ziplaini",
        linkLabel: "Sairme Resort – Zipline",
        image: "IMG.rafting",
        tips: [
          "ספטמבר: בערך 11:00–19:00",
          "הזמנה: sairmeresort.ge · +995 32 240 45 45 · reservations@sairmeresort.ge",
          "גם: georgia.travel/sairme-zipline · zipline.ge",
          "לא לפחד גבהים · נעליים סגורות",
        ],
      },
      {
        name: fmt("אופציה – שביל Air Temple / יער", "Optional – Air Temple trail / forest", "Air Temple"),
        timeOfDay: "אחה\"צ / ערב",
        duration: "45–90 דק'",
        description:
          "שבילי הליכה מסומנים מהריזורט ליער הסובב (כולל Air Temple). קל–בינוני, אוויר הרים. אם נשארו כוחות אחרי מעיינות/ספא/zipline.",
        link: "https://www.google.com/maps/search/Sairme+Air+Temple+trail",
        linkLabel: "Air Temple – חיפוש מפה",
        image: "IMG.sairme",
      },
    ],
    alternatives: [
      {
        name: "♨️ מומלץ – בוּבֶטִים + בריכות",
        description: "אחרי נסיעת הבוקר – מעיינות בטבע + בריכות תרמיות וארוחה בריזורט. הכי מתאים למשפחה.",
        overnight: N.sairmeResort,
        recommended: true,
        image: "IMG.sairme",
      },
      {
        name: "🎢 ספא + Zipline 800 מ'",
        description: "אם אנרגיה גבוהה: zipline בנוסף למעיינות והבריכות. להזמין מראש.",
        overnight: N.sairmeResort,
        image: "IMG.rafting",
        link: "https://sairmeresort.ge/en/static/ziplaini",
        linkLabel: "הזמנת Zipline",
      },
      {
        name: "🍽 עצירה בדרך (רק אם מיוחד)",
        description:
          "לא מוזיאונים. אופציה: יקב Baia's Wine, או מסעדת פורל Tskaltashua ליד Baghdati – רק אם באמת שווה את העצירה.",
        overnight: N.sairmeResort,
        image: "IMG.supra",
        link: "https://www.google.com/maps/search/Baia+Wine+Baghdati",
        linkLabel: "Baia's Wine – מפה",
      },
    ],
    restaurants: [
      {
        name: fmt("מסעדות בריזורט Sairme", "Sairme resort restaurants", "საირმე"),
        cuisine: "גיאורגית / איטלקית בריזורט",
        note: "בתי קפה וברים במרחק הליכה מהמלון",
        link: "https://www.google.com/maps/search/Sairme+Resort+restaurant",
        image: "IMG.supra",
      },
      {
        name: fmt("Tskaltashua – פורל ליד Baghdati (בדרך)", "Tskaltashua trout – near Baghdati", "წყალთაშუა"),
        cuisine: "דגי נחל · בקתות על המים",
        note: "אופציה בנסיעה – רק אם עוצרים",
        link: "https://www.google.com/maps/search/Tskaltashua+restaurant+Baghdati",
        image: "IMG.supra",
      },
      {
        name: N.baiaWine,
        cuisine: "יקב משפחתי · טעימות · ליד Baghdati",
        note: "עצירה אופציונלית בדרך / חזרה מחר – לתאם מראש",
        link: "https://www.google.com/maps/search/Baia's+Wine+Baghdati+Georgia",
        image: "IMG.wine",
      },
    ],
    hotels: [
      {
        name: N.sairmeResort,
        area: `${N.sairme} · ${N.baghdati}`,
        nights: 1,
        note: "Best Western · סנטוריום משופץ · ספא, בריכות, zipline · ~950 מ' · +995 32 240 45 45",
        link: "https://www.google.com/maps/search/Best+Western+Sairme+Resort",
        image: "IMG.sairme",
      },
      {
        name: fmt("Sairme South / Ensana (חלופה)", "Sairme South / Ensana (alt)", "Sairme South"),
        area: N.sairme,
        nights: 1,
        note: "חלופה בריזורט – ספא תרמי, בוּבֶטִים בקרבת מקום",
        link: "https://www.google.com/maps/search/Sairme+South+Hotel",
        image: "IMG.sairme",
      },
    ],
    mapPoints: [
      { name: N.supsa, lat: SUPSA.lat, lng: SUPSA.lng },
      { name: N.baghdati, lat: SAIRME.baghdati.lat, lng: SAIRME.baghdati.lng, optional: true },
      { name: N.baiaWine, lat: SAIRME.baiaWine.lat, lng: SAIRME.baiaWine.lng, optional: true },
      { name: N.sairmeResort, lat: SAIRME.lat, lng: SAIRME.lng, overnight: true },
      {
        name: fmt("בוּבֶטִים – מעיינות מינרליים", "Mineral spring buvettes", "ბიუვეტები"),
        lat: SAIRME.mineralSprings.lat,
        lng: SAIRME.mineralSprings.lng,
        optional: true,
      },
      {
        name: fmt("בריכות תרמיות", "Thermal pools", "თერმული აუზები"),
        lat: SAIRME.thermalPools.lat,
        lng: SAIRME.thermalPools.lng,
        optional: true,
      },
      {
        name: fmt("Zipline Sairme 800 מ'", "Sairme Zipline 800 m", "ზიპლაინი"),
        lat: SAIRME.zipline.lat,
        lng: SAIRME.zipline.lng,
        optional: true,
      },
    ],
  },

  4: {
    id: 4,
    date: "26.9",
    weekday: "שבת",
    title: fmt("Sairme → קוטאיסי → Adventure Camping", "Sairme → Kutaisi → Adventure Camping", "საირმე → ქუთაისი"),
    emoji: "🛶",
    theme: fmt("בוקר בריזורט, סיבוב בעיר, עלייה לראצ'ה", "Resort morning, city walk, up to Racha", "საირმე და რაჭა"),
    overnight: N.adventureCamping,
    driving: 'כ-165 ק"מ · Sairme→קוטאיסי→Adventure Camping · + סיבוב בעיר',
    summary:
      "בוקר ב-Sairme (אם נשאר מה לעשות – ספא קצר / הליכה). נסיעה לקוטאיסי – סיבוב קצר בעיר (גשר הלב, Bagrati, מזרקת Colchis). המשך ל-Adventure Camping בראצ'ה ללינה. רפטינג מחר בבוקר.",
    skipEnrichment: true,
    heroImage: "IMG.kutaisiBagrati",
    tips: [
      "לא לארח יותר מדי ב-Sairme בבוקר – צריך זמן לקוטאיסי + עלייה למחנה",
      "סיבוב קוטאיסי ~1.5–2 ש' מספיק (בלי מוזיאון ארוך)",
      "להזמין Adventure Camping מראש · WhatsApp +995 595 41 15 47",
      "check-in במחנה – לוודא שעה; מסעדה במקום לערב",
      "רפטינג מחר בבוקר – בגדים להחלפה במחנה",
    ],
    activities: [
      {
        name: fmt("בוקר ב-Sairme (אופציונלי)", "Optional morning in Sairme", "საირმე"),
        timeOfDay: "08:00–10:00",
        duration: "1–2 ש'",
        description:
          "רק אם יש עוד משהו שפספסתם: מעיין קצר, קפה בריזורט, או תצפית. אחרת – יציאה מוקדמת לקוטאיסי.",
        link: "https://www.google.com/maps/search/Sairme+Resort+Georgia",
        linkLabel: N.sairme,
        image: "IMG.sairme",
      },
      {
        name: fmt("סיבוב בקוטאיסי", "Kutaisi city walk", "ქუთაისი"),
        timeOfDay: "11:00–13:30",
        duration: "1.5–2.5 ש'",
        description:
          "עצירה בעיר: גשר הלב, מזרקת Colchis, Bagrati (UNESCO) ממעל, קפה/ארוחת צהריים קצרה. בלי מוזיאונים ארוכים – סיבוב קליל לפני העלייה לראצ'ה.",
        link: "https://www.google.com/maps/search/Kutaisi+White+Bridge",
        linkLabel: N.kutaisi,
        image: "IMG.kutaisiBagrati",
      },
      {
        name: fmt("נסיעה ל-Adventure Camping", "Drive to Adventure Camping", "Adventure Camping"),
        timeOfDay: "14:00–17:00",
        duration: "~2–2.5 ש'",
        description:
          "מקוטאיסי צפונה לראצ'ה (~110 ק\"מ). check-in, סידור חדרים/אוהלים, ארוחת ערב במסעדת המחנה. מנוחה לפני רפטינג מחר.",
        link: "https://www.google.com/maps/place/Adventure+Camping/@42.5582341,42.8517484,17z",
        linkLabel: N.adventureCamping,
        image: "IMG.racha",
      },
    ],
    alternatives: [
      {
        name: "🏙 מומלץ – בוקר קצר ב-Sairme + קוטאיסי + מחנה",
        description: "יציאה מ-Sairme עד 10:00 → סיבוב קוטאיסי → Adventure Camping לערב.",
        overnight: N.adventureCamping,
        recommended: true,
        image: "IMG.kutaisiBagrati",
      },
      {
        name: "♨️ בוקר ארוך יותר ב-Sairme",
        description: "ספא עד הצהריים → קוטאיסי קצר מאוד → מחנה מאוחר. פחות זמן בעיר.",
        overnight: N.adventureCamping,
        image: "IMG.sairme",
      },
    ],
    restaurants: [
      {
        name: fmt("צהריים בקוטאיסי – SIAM Thai", "Lunch in Kutaisi – SIAM Thai", "SIAM Thai"),
        cuisine: "תאילנדית אותנטית · ליד גשר הלב",
        note: "TOP 10 Restaurant Guru · +995 591 27 48 74 · siami.ge",
        link: "https://siami.ge/",
        image: "IMG.kutaisi",
      },
      {
        name: fmt("Palaty", "Palaty Restaurant", "Palaty"),
        cuisine: "גיאורגית מסורתית · סופרה",
        note: "אחת המומלצות בקוטאיסי",
        link: "https://www.google.com/maps/search/Palaty+restaurant+Kutaisi",
        image: "IMG.supra",
      },
      {
        name: fmt("Sapere", "Sapere Restaurant", "Sapere"),
        cuisine: "גיאורגית מודרנית",
        note: "אווירה נעימה לצהריים קצרים",
        link: "https://www.google.com/maps/search/Sapere+Kutaisi",
        image: "IMG.kutaisi",
      },
      {
        name: fmt("מסעדה ב-Adventure Camping", "Restaurant at Adventure Camping", "რესტორანი"),
        cuisine: "מסעדה במחנה – ערב בלי לצאת",
        note: "לינה + ארוחה במקום",
        link: "https://www.google.com/maps/place/Adventure+Camping/@42.5582341,42.8517484,17z",
        image: "IMG.supra",
      },
    ],
    hotels: [
      {
        name: N.adventureCamping,
        area: `${N.racha} · Rafting in Kutaisi`,
        nights: 1,
        note: "קוטג' ₾250/חדר (2 מיטות זוגיות) או אוהלים · מסעדה · רפטינג מחר בבוקר",
        link: "https://www.google.com/maps/place/Adventure+Camping/@42.5582341,42.8517484,17z",
        image: "IMG.racha",
      },
      {
        name: fmt("קוטג' Airbnb בקוטאיסי (חלופה)", "Kutaisi Airbnb cottage (alt)", "Airbnb"),
        area: N.kutaisi,
        nights: 1,
        note: "רק אם משנים תוכנית ולא עולים לראצ'ה – ראו סיפורי מטיילים",
        link: "https://he.airbnb.com/rooms/678687088249315048",
        image: "IMG.kutaisi",
      },
    ],
    mapPoints: [
      { name: N.sairmeResort, lat: SAIRME.lat, lng: SAIRME.lng },
      { name: N.kutaisi, lat: 42.2679, lng: 42.6946 },
      { name: N.adventureCamping, lat: 42.5582341, lng: 42.8517484, overnight: true },
    ],
    mapRoutes: [
      {
        label: "Sairme → קוטאיסי → Adventure Camping",
        color: "#2f5fd0",
        dashed: false,
        points: [
          { name: N.sairmeResort, lat: SAIRME.lat, lng: SAIRME.lng },
          { name: N.kutaisi, lat: 42.2679, lng: 42.6946 },
          { name: N.adventureCamping, lat: 42.5582341, lng: 42.8517484, overnight: true },
        ],
      },
    ],
  },

  5: {
    id: 5,
    date: "27.9",
    weekday: "ראשון",
    title: fmt("רפטינג → צקאלטובו", "Rafting → Tskaltubo", "rafting → ცხალტუბო"),
    emoji: "🛶",
    theme: fmt("בוקר רפטינג במחנה, אחר כך צקאלטובו", "Morning rafting at camp, then Tskaltubo", "rafting და ცხალტუბო"),
    overnight: fmt("צקאלטובו / אזור Okatse", "Tskaltubo / Okatse area", "ცხალტუბო / ოკაცე"),
    driving: 'רפטינג מהמחנה (הלוך-חזור בהסעת המפעיל) · אחר כך ~80 ק"מ למחנה→צקאלטובו',
    summary:
      "בוקר: רפטינג מ-Adventure Camping (הסעה לנהר כלולה, חזרה למחנה). אחר הצהריים: סיור Urbex בצקאלטובו – סנטוריומים סובייטיים (Medea, Metalurgi, בתי מרחץ). פרומתאוס/סטאפליה אופציונלי. לינה: צקאלטובו או Okatse. מיום 6 – כמו אופציה א'.",
    skipEnrichment: true,
    heroImage: "IMG.rafting",
    tips: [
      "רפטינג – מפגש והתחלה ב-Adventure Camping · חזרה למחנה בסוף · WhatsApp +995 595 41 15 47",
      "הנסיעה לנהר היא בהסעת המפעיל – לא חלק ממסלול הרכב שלכם",
      "אחרי הרפטינג – מקלחת במחנה ואז יציאה ברכב לצקאלטובו (~80 ק\"מ / 1.5–2 ש')",
      "צקאלטובו – חובה: Medea + Metalurgi; אם נשאר זמן: Bathhouse 6/8",
      "נעליים סגורות + פנס · לא להיכנס לדירות מאוכלסות · מבנים לא יציבים",
      "פרומתאוס / סטאפליה – אופציונלי אחרי האורבקס",
      "לינה: צקאלטובו או Okatse – לא זוגדידי · בוקר יום 6 → Okatse",
    ],
    activities: [
      {
        name: fmt("רפטינג על נהר הריוני – מ-Adventure Camping", "Rioni rafting – from Adventure Camping", "rafting მდ. რიონზე"),
        timeOfDay: "בוקר · ~09:00–12:00",
        duration: "2 ש' 20 דק' על המים",
        description:
          "מפגש במחנה Adventure Camping → הסעה לנקודת היציאה על הריוני → רפטינג (14 ק\"מ, II–III, ₾150) → חזרה למחנה. מדריך IRF, Neoprene 5mm. הרכב נשאר במחנה.",
        link: "https://www.google.com/maps/place/Adventure+Camping/@42.5582341,42.8517484,17z",
        linkLabel: N.adventureCamping + " – מפגש / חזרה",
        image: "IMG.rafting",
      },
      {
        name: fmt("נסיעה מהמחנה לצקאלטובו", "Drive camp → Tskaltubo", "ბანაკი → ცხალტუბო"),
        timeOfDay: "אחרי הרפטינג · ~12:30–14:00",
        duration: "~1.5–2 ש'",
        description: "רק אחרי החזרה למחנה: יציאה ברכב ישירות לצקאלטובו (~80 ק\"מ).",
        link: "https://www.google.com/maps/dir/42.5582341,42.8517484/Tskaltubo,+Georgia",
        linkLabel: "Adventure Camping → צקאלטובו",
        image: "IMG.tskaltubo",
      },
      {
        name: N.tskaltubo,
        timeOfDay: "14:00–17:00",
        duration: "2–3 ש'",
        description:
          "עיירת ספא סובייטית – כ־20 סנטוריומי שיש/שיש מדומה שננטשו אחרי קריסת ברית המועצות. חלקם עדיין משמשים דיור לעקורים מאבחזיה – לכבד פרטיות, לא להיכנס לחדרים מאוכלסים. Urbex עצמאי ברגל/רכב קצר בין נקודות, או סיור מודרך מקומי (מומלץ לבטיחות והיסטוריה).",
        link: "https://www.google.com/maps/search/Tskaltubo+sanatorium",
        linkLabel: N.tskaltubo,
        image: "IMG.tskaltubo",
        tips: [
          "נעליים סגורות חובה – זכוכית, רצפות שבורות",
          "פנס / טלפון – אולמות חשוכים",
          "לא תמיד בטוח להיכנס פנימה – חלק מהמבנים מסוכנים / מגודרים לשיפוץ",
          "לצלם מבחוץ ומחללים ציבוריים; לא להפריע לדיירים",
        ],
      },
      {
        name: fmt("סנטוריום Medea", "Sanatorium Medea", "მედეა"),
        timeOfDay: "בתוך הסיור",
        duration: "30–45 דק'",
        description:
          "הכי פוטוגני: עמודים בסגנון רומי, מרפסת שיש, מדרגות דרמטיות וחצר פנימית. כניסה מהשביל הצר – Wow מיידי. גג / מרפסת לנוף לחצר (זהירות).",
        link: "https://www.google.com/maps/search/Sanatorium+Medea+Tskaltubo",
        linkLabel: "Medea – מפה",
        image: "IMG.tskaltubo",
      },
      {
        name: fmt("סנטוריום Metalurgi (Metallurg)", "Sanatorium Metalurgi", "მეტალურგი"),
        timeOfDay: "בתוך הסיור",
        duration: "45–60 דק'",
        description:
          "לובי עגול, שיש מתפורר, ואולם תיאטרון/נשפים מאחור – אחד האתרים העשירים ביותר מבפנים. קלאסיקה לצילום Urbex.",
        link: "https://www.google.com/maps/search/Sanatorium+Metalurg+Tskaltubo",
        linkLabel: "Metalurgi – מפה",
        image: "IMG.tskaltubo",
      },
      {
        name: fmt("בית מרחץ מס' 6 (Stalin's Bath) + מס' 8", "Bathhouse No. 6 & No. 8", "აბანო 6"),
        timeOfDay: "בתוך הסיור",
        duration: "30–40 דק'",
        description:
          "Bathhouse 6 – «מרחץ סטלין» ההיסטורי. Bathhouse 8 – כיפה גדולה מרשימה. ליד הפארק המרכזי. אפשר גם לטעום ממעיין מינרלי ציבורי (Spring of Beauty) אם פתוח.",
        link: "https://www.google.com/maps/search/Bathhouse+6+Tskaltubo",
        linkLabel: "Bathhouse 6 – מפה",
        image: "IMG.tskaltubo",
      },
      {
        name: fmt("אופציה – סיור Urbex מודרך", "Optional – guided urbex tour", "urbex ტური"),
        timeOfDay: "אם מעדיפים מדריך",
        duration: "3–6 ש'",
        description:
          "מדריך מקומי (למשל Camp Caucasus) – Medea, Metalurgi, בתי מרחץ, לפעמים דאצ'ה של סטלין. נוח למשפחה: פחות סיכון, יותר הקשר היסטורי. לתאם מראש.",
        link: "https://campcaucasus.com/tour/urbex-tour-tskaltubo/",
        linkLabel: "Camp Caucasus – Urbex Tskaltubo",
        image: "IMG.tskaltubo",
      },
      {
        name: N.prometheusCave,
        timeOfDay: "אופציונלי",
        duration: "1.5–2 ש'",
        description:
          "אופציה אם יש זמן ואנרגיה אחרי צקאלטובו (או במקום חלק מהאורבקס). ~6–7 ק\"מ ממרכז העיירה. מערה ענקית – נטיפים, אגמים, שייט. ~14°C – סווטר חובה. לא על מסלול הנסיעה החובה.",
        link: "https://www.google.com/maps/search/Prometheus+Cave+Georgia",
        linkLabel: N.prometheusCave,
        image: "IMG.prometheus",
      },
      {
        name: N.satapliaReserve,
        timeOfDay: "אופציונלי",
        duration: "2–3 ש'",
        description:
          "שמורת טבע – יער, מערה, עקבות דינוזאורים. מתאים עם ילדים אם נשאר זמן (או במקום חלק מצקאלטובו).",
        link: "https://www.google.com/maps/search/Sataplia+Nature+Reserve+Kutaisi",
        linkLabel: N.satapliaReserve,
        image: "IMG.prometheus",
      },
    ],
    alternatives: [
      {
        name: "🛶 מומלץ – רפטינג → צקאלטובו",
        description: "בוקר מים, אחר הצהריים Urbex בצקאלטובו. בלי פרומתאוס. לינה באזור צקאלטובו או Okatse.",
        overnight: fmt("אזור צקאלטובו / Okatse", "Tskaltubo / Okatse area", "ცხალტუბო / ოკაცე"),
        recommended: true,
        image: "IMG.rafting",
      },
      {
        name: "🕳 אופציה – הוספת מערת פרומתאוס",
        description: "אחרי צקאלטובו (או במקום חלק מהאורבקס) – סיור במערה ~1.5–2 ש'. סווטר חובה.",
        overnight: fmt("אזור צקאלטובו / Okatse", "Tskaltubo / Okatse area", "ცხალტუბო / ოკაცე"),
        image: "IMG.prometheus",
      },
      {
        name: "📋 לינה באזור צקאלטובו",
        description: "check-in ליד צקאלטובו. בוקר יום 6: ~30–40 דק' ל-Okatse.",
        overnight: fmt("אזור צקאלטובו", "Tskaltubo area", "ცხალტუბო"),
        image: "IMG.tskaltubo",
      },
      {
        name: "🏞 לינה באזור Okatse Canyon",
        description: "אחרי צקאלטובו ממשיכים ~30–40 דק' מערבה. בוקר יום 6 מתחיל ישר בקניון.",
        overnight: fmt("אזור Okatse Canyon", "Okatse Canyon area", "ოკაცე"),
        image: "IMG.okatse",
      },
    ],
    restaurants: [
      {
        name: fmt("ארוחת בוקר / אחרי רפטינג במחנה", "Breakfast / post-rafting at camp", "ბანაკი"),
        cuisine: "מסעדת Adventure Camping",
        note: "לפני היציאה לצקאלטובו",
        link: "https://www.google.com/maps/place/Adventure+Camping/@42.5582341,42.8517484,17z",
        image: "IMG.supra",
      },
      {
        name: fmt("מסעדות / קפה בצקאלטובו", "Cafes in Tskaltubo", "ცხალტუბო"),
        cuisine: "גיאורגית קלה · ליד הפארק / תחנת הרכבת",
        note: "אחרי האורבקס – מים ומשהו חם",
        link: "https://www.google.com/maps/search/restaurant+Tskaltubo+Georgia",
        image: "IMG.supra",
      },
      {
        name: fmt("Mate's Marani – סדנת בישול (אופציה)", "Mate's Marani – cooking class", "Mate's Marani"),
        cuisine: "סדנה גיאורגית · ליד צקאלטובו / פרומתאוס",
        note: "להזמין מראש אם רוצים חוויית אוכל במקום אורבקס ארוך",
        link: "https://www.google.com/maps/search/Mate+Marani+Tskaltubo",
        image: "IMG.wine",
      },
      {
        name: fmt("Cafe Prometheus (אם הולכים למערה)", "Cafe near Prometheus Cave", "კაფე"),
        cuisine: "ארוחה קלה · ליד המערה",
        area: N.prometheusCave,
        note: "רק אם בוחרים באופציית הפרומתאוס",
        link: "https://www.google.com/maps/search/restaurant+Prometheus+Cave+Georgia",
        image: "IMG.prometheus",
      },
    ],
    hotels: [
      {
        name: fmt("לינה באזור צקאלטובו / פרומתאוס", "Stay near Tskaltubo / Prometheus", "ცხალტუბო"),
        area: N.tskaltubo,
        nights: 1,
        note: "קרוב לצקאלטובו · יום 6 → Okatse",
        link: "https://www.google.com/maps/search/hotels+Tskaltubo+Georgia",
        image: "IMG.tskaltubo",
      },
      {
        name: fmt("לינה באזור Okatse Canyon", "Stay near Okatse Canyon", "ოკაცე"),
        area: N.okatseCanyon,
        nights: 1,
        note: "בוקר יום 6 בקניון",
        link: "https://www.google.com/maps/search/hotels+Okatse+Canyon+Georgia",
        image: "IMG.okatse",
      },
    ],
    mapPoints: [
      { name: N.adventureCamping, lat: 42.5582341, lng: 42.8517484 },
      { name: N.tskaltubo, lat: 42.3417, lng: 42.5986, overnight: true },
      { name: fmt("סנטוריום Medea", "Sanatorium Medea", "მედეა"), lat: 42.3255, lng: 42.5975, optional: true },
      { name: fmt("סנטוריום Metalurgi", "Sanatorium Metalurgi", "მეტალურგი"), lat: 42.328, lng: 42.601, optional: true },
    ],
  },
};

/** נקודות רחפן – רק למקטעי אופציה ב' (ימים 2–5) */
const DRONE_SPOTS_B = {
  2: {
    intro: "מטיראלה + חוף Supsa/Grigoleti – יער גשם ושקיעה על הים השחור.",
    spots: [
      {
        id: "kobuleti-coast-b",
        kind: "enRoute",
        name: "חוף Kobuleti – בדרך למטיראלה",
        lat: 41.812,
        lng: 41.773,
        description: "עצירה על כביש החוף – גלים, חול ויער.",
        tips: ["חניה בצד הכביש", "רוחות ים – Windy"],
        image: "IMG.batumiBoulevard",
        gallery: [{ src: "IMG.ureki", caption: "חוף הים השחור" }],
        link: "https://www.google.com/maps/search/Kobuleti+beach+Georgia",
        linkLabel: "Kobuleti",
      },
      {
        id: "mtirala-waterfall-b",
        name: "מפל Tsablnari – מטיראלה",
        lat: 41.884,
        lng: 41.982,
        description: "מפל בלב יער הגשם – ערפל ועצים. צילום מלמעלה חושף את המסלול.",
        tips: ["פארק לאומי – לבדוק GCAA", "לחות גבוהה"],
        image: "IMG.mtiralaWaterfall",
        gallery: [
          { src: "IMG.mtirala", caption: "יער גשם Colchic" },
          { src: "IMG.mtiralaForest", caption: "שביל ביער" },
        ],
        link: "https://www.google.com/maps/search/Tsablnari+waterfall+Mtirala",
        linkLabel: "מפל Tsablnari",
      },
      {
        id: "supsa-coast",
        name: "חוף Supsa / Grigoleti",
        lat: 42.033,
        lng: 41.755,
        description: "קו החוף של גוריה – חול, גלים ושקיעה. מושלם אחרי יום היער.",
        tips: ["רוחות ים", "שקיעה ~19:00", "לא מעל מתרחצים"],
        image: "IMG.ureki",
        gallery: [{ src: "IMG.ureki", caption: "ים השחור – אורקי/גריגולתי" }],
        link: "https://www.google.com/maps/search/Grigoleti+beach+Georgia",
        linkLabel: "Grigoleti beach",
      },
    ],
  },
  3: {
    intro: "Sairme – עמק הריזורט, בוּבֶטִים על הנהר, בריכות ו-zipline.",
    spots: [
      {
        id: "sairme-valley",
        name: "עמק Sairme – הריזורט",
        lat: 41.9048,
        lng: 42.74331,
        description: "בקעה מיוערת עם הריזורט והנחל – pullback מהרמה שמעל.",
        tips: ["לא מעל הבריכות עם אנשים", "אחה\"צ – אור רך על היער"],
        image: "IMG.sairme",
        gallery: [{ src: "IMG.sairme", caption: "נוף הרי אימרתי" }],
        link: "https://www.google.com/maps/search/Sairme+Resort+Georgia",
        linkLabel: "Sairme",
      },
      {
        id: "sairme-springs",
        name: "בוּבֶטִים / נהר Bostania",
        lat: 41.9055,
        lng: 42.745,
        description: "מעיינות מינרליים לאורך הנחל – מבנה הבוּבֶטִים והפארק מלמעלה.",
        tips: ["לא מעל אנשים ליד הברזים", "גובה נמוך–בינוני"],
        image: "IMG.sairme",
        link: "https://www.google.com/maps/search/Sairme+mineral+water+buvette",
        linkLabel: "בוּבֶטִים",
      },
      {
        id: "sairme-zipline-drone",
        name: "Zipline Sairme – קווי 800 מ'",
        lat: 41.907,
        lng: 42.741,
        description: "קווי ה-zipline מעל היער והפארק – רק אם אין יורדים באותו רגע.",
        tips: ["לא לטוס ליד כבלים בזמן פעילות", "תיאום עם המפעיל"],
        image: "IMG.sairme",
        link: "https://sairmeresort.ge/en/static/ziplaini",
        linkLabel: "Zipline",
      },
      {
        id: "sairme-forest",
        kind: "enRoute",
        name: "יער בדרך ל-Sairme",
        lat: 42.05,
        lng: 42.78,
        description: "עצירת תצפית ביער לפני הריזורט – ירוק עמוק, כביש מתפתל.",
        tips: ["עצירה רק ב-pull-off בטוח", "VLOS"],
        image: "IMG.racha",
        link: "https://www.google.com/maps/search/Baghdati+Sairme+road",
        linkLabel: "דרך Baghdati–Sairme",
      },
    ],
  },
  4: {
    intro: "Sairme בבוקר, קוטאיסי בצהריים, עלייה לראצ'ה אחר הצהריים.",
    spots: [
      {
        id: "sairme-morning",
        name: "Sairme – בוקר",
        lat: 41.9048,
        lng: 42.74331,
        description: "אם נשארים לבוקר – ערפל על העמק ותצפית קצרה לפני היציאה.",
        tips: ["בוקר מוקדם – ערפל יפה", "לא לעכב את הנסיעה לקוטאיסי"],
        image: "IMG.sairme",
        link: "https://www.google.com/maps/search/Sairme+Resort+Georgia",
        linkLabel: "Sairme",
      },
      {
        id: "bagrati-b",
        name: "Bagrati – קוטאיסי",
        lat: 42.272,
        lng: 42.704,
        description: "קתדרלה UNESCO מעל העיר – orbit או pullback לנהר Rioni.",
        tips: ["אתר דתי – מרחק מכבד", "סיבוב קצר ביום זה"],
        image: "IMG.kutaisiBagrati",
        gallery: [{ src: "IMG.kutaisi", caption: "מרכז קוטאיסי" }],
        link: "https://www.google.com/maps/search/Bagrati+Cathedral+Kutaisi",
        linkLabel: "Bagrati",
      },
      {
        id: "adventure-camping-arrive",
        name: "Adventure Camping – הגעה",
        lat: 42.5582341,
        lng: 42.8517484,
        description: "המחנה בעמק ראצ'ה – צילום קצר של הנהר והבקעה אחרי check-in.",
        tips: ["לא מעל הכביש הצר", "ערב – אור זהוב"],
        image: "IMG.racha",
        link: "https://www.google.com/maps/place/Adventure+Camping/@42.5582341,42.8517484,17z",
        linkLabel: "Adventure Camping",
      },
    ],
  },
  5: {
    intro: "רפטינג מהמחנה בבוקר (הסעה לנהר כלולה), אחר כך נסיעה לצקאלטובו.",
    spots: [
      {
        id: "adventure-camping-rafting",
        name: "Adventure Camping – מפגש רפטינג",
        lat: 42.5582341,
        lng: 42.8517484,
        description:
          "המחנה הוא נקודת המפגש והחזרה. הרפטינג עצמו על הנהר בהסעת המפעיל – לא נוהגים ל-Alpana.",
        tips: ["לתאם עם המדריך", "להחליף ל-GoPro על המים", "לא מעל הסירות בזמן הפעילות"],
        image: "IMG.rafting",
        gallery: [{ src: "IMG.racha", caption: "עמק / המחנה" }],
        link: "https://www.google.com/maps/place/Adventure+Camping/@42.5582341,42.8517484,17z",
        linkLabel: "Adventure Camping",
      },
      {
        id: "tskaltubo-b",
        name: "צקאלטובו – סנטוריומים נטושים",
        lat: 42.3417,
        lng: 42.5986,
        description:
          "צילום אוויר של מתחמי Medea / Metalurgi והפארק – עמודים, חצרות פנימיות ומבנים סובייטיים ענקיים. לא לטוס נמוך ליד מבנים לא יציבים או מעל דיירים.",
        tips: ["VLOS", "צהריים – אור לחצרות", "לכבד פרטיות של דיירים"],
        image: "IMG.tskaltubo",
        gallery: [{ src: "IMG.tskaltubo", caption: "סנטוריום נטוש בצקאלטובו" }],
        link: "https://www.google.com/maps/search/Tskaltubo+sanatorium",
        linkLabel: "צקאלטובו",
      },
      {
        id: "medea-drone",
        name: "סנטוריום Medea – חזית ועמודים",
        lat: 42.3255,
        lng: 42.5975,
        description: "החזית הקולונדית והחצר – אחד הצילומים האיקוניים של העיירה.",
        tips: ["לא מעל אנשים על המרפסת", "pullback מהשביל"],
        image: "IMG.tskaltubo",
        link: "https://www.google.com/maps/search/Sanatorium+Medea+Tskaltubo",
        linkLabel: "Medea",
      },
    ],
  },
};

const ACCOMMODATION_SUMMARY_B = [
  { place: N.hotelLondon1889, nights: 1, note: "✅ Booked · יום 1 · 23.9–24.9 · 3 rooms · ~$308 · ארוחת בוקר" },
  { place: N.batumi, nights: 1, note: "לילה אחרון (יום 12)" },
  { place: `${N.supsa} / ${N.grigoleti}`, nights: 1, note: "יום 2 · שבירת נסיעה אחרי מטיראלה · חוף" },
  { place: N.sairmeResort, nights: 1, note: "יום 3 · Best Western Sairme · ספא / מעיינות" },
  { place: N.adventureCamping, nights: 1, note: "יום 4 · הגעה אחה\"צ · רפטינג בבוקר יום 5" },
  { place: `${N.tskaltubo} / ${N.okatseCanyon}`, nights: 1, note: "יום 5 – אחרי רפטינג · בלי זוגדידי" },
  { place: N.whiteHotelGuesthouse, nights: 1, note: "✅ Booked · יום 6 · 28.9–29.9 · 2 rooms · $115" },
  { place: N.mestiaAirbnb, nights: 2, note: "✅ Booked · ימים 7–8 · Airbnb 29.9–1.10 · 21 Mestia" },
  { place: N.mazeriCabin, nights: 2, note: "✅ Booked · ימים 9–10 · Peak Mazeri · 1.10–3.10 · 3 rooms · $239" },
  { place: N.anaklia, nights: 1, note: fmt("ים השחור", "Black Sea", "შავი ზღვა") },
];

const TRIP_OPTIONS = [
  {
    id: "a",
    name: "אופציה א'",
    blurb: "המסלול הקיים – קצחי, צ'יאתורה, ראצ'ה",
    highlight: "צ'יאתורה · Via Ferrata · Prime Heaven",
    getSegments() {
      return ROUTE_SEGMENTS;
    },
    getDays() {
      return DAYS;
    },
    getAccommodation() {
      return LOGISTICS.accommodationSummary;
    },
  },
  {
    id: "b",
    name: "אופציה ב'",
    blurb: "Supsa → Sairme → קוטאיסי → Adventure Camping",
    highlight: "שבירת נסיעה בחוף · ספא · רפטינג ביום 5",
    getSegments() {
      return ROUTE_SEGMENTS_B;
    },
    getDays() {
      return DAYS.map((d) => DAYS_OPTION_B[d.id] || d);
    },
    getAccommodation() {
      return ACCOMMODATION_SUMMARY_B;
    },
  },
];

function getStoredTripOptionId() {
  try {
    const fromUrl =
      typeof window !== "undefined"
        ? new URLSearchParams(window.location.search).get("option")
        : null;
    if (fromUrl === "a" || fromUrl === "b") return fromUrl;
    const stored = sessionStorage.getItem(TRIP_OPTION_STORAGE_KEY);
    if (stored === "a" || stored === "b") return stored;
  } catch {
    /* ignore */
  }
  return "a";
}

function setStoredTripOptionId(id) {
  try {
    sessionStorage.setItem(TRIP_OPTION_STORAGE_KEY, id === "b" ? "b" : "a");
  } catch {
    /* ignore */
  }
}

function getTripOption(id = getStoredTripOptionId()) {
  return TRIP_OPTIONS.find((o) => o.id === id) || TRIP_OPTIONS[0];
}

function getActiveRouteSegments() {
  return getTripOption().getSegments();
}

function getActiveDays() {
  return getTripOption().getDays();
}

function getActiveAccommodationSummary() {
  return getTripOption().getAccommodation();
}

function dayHref(dayId, optionId = getStoredTripOptionId()) {
  const opt = optionId === "b" ? "b" : "a";
  return `day.html?id=${dayId}&option=${opt}`;
}

function storiesHref(dayId, optionId = getStoredTripOptionId()) {
  const opt = optionId === "b" ? "b" : "a";
  return `stories.html?id=${dayId}&option=${opt}`;
}

function getDroneSpotsForDay(dayId) {
  const optB = typeof getStoredTripOptionId === "function" && getStoredTripOptionId() === "b";
  if (optB && typeof DRONE_SPOTS_B !== "undefined" && DRONE_SPOTS_B[dayId]) {
    return DRONE_SPOTS_B[dayId];
  }
  if (typeof DRONE_SPOTS !== "undefined") return DRONE_SPOTS[dayId] || null;
  return null;
}

if (typeof module !== "undefined") {
  module.exports = {
    TRIP_OPTIONS,
    ROUTE_SEGMENTS_B,
    DAYS_OPTION_B,
    DRONE_SPOTS_B,
    totalRouteKm,
    getTripOption,
    getActiveRouteSegments,
    getActiveDays,
    getDroneSpotsForDay,
  };
}

const TRIP_META = {
  title: "טיול משפחתי לגיאורגיה",
  subtitle: "13 ימים · מסלול מעגלי מבאטומי",
  dates: "23 בספטמבר – 5 באוקטובר 2026",
  globalMapUrl: "https://maps.app.goo.gl/7n7fm83nZTDq31La7",
  flights: {
    outbound: {
      date: "23.9.2026",
      day: "רביעי",
      from: `${N.telAviv} (TLV)`,
      to: `${N.batumi} (BUS)`,
      depart: "14:55",
      arrive: "18:10",
      flight: "LY5405",
      airline: "EL AL",
    },
    return: {
      date: "5.10.2026",
      day: "שני",
      from: `${N.batumi} (BUS)`,
      to: `${N.telAviv} (TLV)`,
      depart: "09:35",
      arrive: "10:50",
      flight: "LY5114",
      airline: "EL AL (Electra Airways)",
    },
  },
};

const ROUTE_COORDS = [
  { name: N.batumi, lat: 41.6168, lng: 41.6367, day: 1 },
  { name: N.kutaisi, lat: 42.2679, lng: 42.6946, day: 2 },
  { name: N.adventureCamping, lat: 42.5582341, lng: 42.8517484, day: 4 },
  { name: N.tskaltubo, lat: 42.3417, lng: 42.5986, day: 5 },
  { name: N.zugdidi, lat: 42.5088, lng: 41.8709, day: 6 },
  { name: N.mestia, lat: 43.0458, lng: 42.7289, day: 7 },
  { name: N.anaklia, lat: 42.3917, lng: 41.5583, day: 11 },
  { name: N.batumi, lat: 41.6168, lng: 41.6367, day: 12 },
];

const DAY_COLORS = {
  1: "#d62828",
  2: "#0f8b8d",
  3: "#e07b00",
  4: "#2f5fd0",
  5: "#c9930a",
  6: "#7b3fbf",
  7: "#7d8c1f",
  8: "#1a7fb5",
  9: "#2e8b3d",
  10: "#b32bab",
  11: "#14926b",
  12: "#d62872",
  13: "#4b3fc4",
};

const ROUTE_SEGMENTS = [
  {
    day: 1,
    from: { name: N.batumiAirport, lat: 41.6103, lng: 41.5997 },
    to: { name: N.batumi, lat: 41.6168, lng: 41.6367 },
    waypoints: [],
    places: [N.batumiBoulevard],
    distanceKm: 10,
    duration: "20 min",
    overnight: N.batumi,
  },
  {
    day: 2,
    from: { name: N.batumi, lat: 41.6168, lng: 41.6367 },
    to: { name: N.kutaisi, lat: 42.2679, lng: 42.6946 },
    waypoints: [{ name: N.mtirala, lat: 41.8833, lng: 41.9833 }],
    places: [N.mtirala],
    distanceKm: 170,
    duration: "3.5h",
    overnight: N.kutaisi,
  },
  {
    day: 3,
    from: { name: N.kutaisi, lat: 42.2679, lng: 42.6946 },
    to: { name: N.chiatura, lat: 42.2989, lng: 43.289 },
    waypoints: [
      { name: N.katskhiPillar, lat: 42.2872, lng: 43.2125 },
      { name: N.mgvimevi, lat: 42.2694, lng: 43.0456 },
    ],
    places: [N.katskhiPillar, N.chiatura, N.lunchAtLia, N.mgvimevi],
    distanceKm: 130,
    duration: "2h",
    overnight: N.chiatura,
  },
  {
    day: 4,
    from: { name: N.chiatura, lat: 42.2989, lng: 43.289 },
    to: { name: N.adventureCamping, lat: 42.5582341, lng: 42.8517484 },
    waypoints: [
      { name: N.rioniRiver, lat: 42.45, lng: 43.05 },
    ],
    places: [N.rioniRiver, N.adventureCamping, N.shaoriReservoir, N.khvanchkaraWinery],
    distanceKm: 90,
    duration: "1.5–2h",
    overnight: fmt("אמברולאורי / Adventure Camping", "Ambrolauri / Adventure Camping", "ამბროლაური / Adventure Camping"),
  },
  {
    day: 5,
    from: { name: N.adventureCamping, lat: 42.5582341, lng: 42.8517484 },
    to: { name: N.tskaltubo, lat: 42.3417, lng: 42.5986 },
    waypoints: [{ name: N.prometheusCave, lat: 42.3708, lng: 42.5989 }],
    places: [N.adventureCamping, N.tskaltubo, N.prometheusCave],
    distanceKm: 80,
    duration: "1.5–2h",
    overnight: N.tskaltubo,
  },
  {
    day: 6,
    from: { name: N.tskaltubo, lat: 42.3417, lng: 42.5986 },
    to: { name: N.zugdidi, lat: 42.5088, lng: 41.8709 },
    waypoints: [
      { name: N.okatseCanyon, lat: 42.4167, lng: 42.5167 },
      { name: N.martvili, lat: 42.4167, lng: 42.3667 },
      { name: N.nokalakeviHotSprings, lat: 42.3533, lng: 42.3167 },
    ],
    places: [N.okatseCanyon, N.martviliCanyon, N.nokalakeviHotSprings],
    distanceKm: 90,
    duration: "2–2.5h",
    overnight: N.zugdidi,
  },
  {
    day: 7,
    from: { name: N.zugdidi, lat: 42.5088, lng: 41.8709 },
    to: { name: N.mestia, lat: 43.0458, lng: 42.7289 },
    waypoints: [{ name: N.enguriDam, lat: 42.7583, lng: 42.0333 }],
    places: [N.enguriDam],
    distanceKm: 140,
    duration: "3h",
    overnight: N.mestia,
  },
  {
    day: 8,
    from: { name: N.mestia, lat: 43.0458, lng: 42.7289 },
    to: { name: N.mestia, lat: 43.0458, lng: 42.7289 },
    waypoints: [{ name: N.ushguli, lat: 42.9114, lng: 43.0136 }],
    places: [N.ushguli, N.shkharaGlacier],
    distanceKm: 90,
    duration: "3.5h",
    overnight: N.mestia,
    loop: true,
  },
  {
    day: 9,
    from: { name: N.mestia, lat: 43.0458, lng: 42.7289 },
    to: { name: N.mazeri, lat: 43.0833, lng: 42.5167 },
    waypoints: [{ name: N.chalaadiGlacier, lat: 43.0667, lng: 42.6833 }],
    places: [N.chalaadiGlacier, N.mazeri, N.ushba],
    distanceKm: 45,
    duration: "45 min",
    overnight: N.mazeriCabin,
  },
  {
    day: 10,
    from: { name: N.mazeri, lat: 43.0833, lng: 42.5167 },
    to: { name: N.mazeri, lat: 43.0833, lng: 42.5167 },
    waypoints: [{ name: N.shdugraWaterfall, lat: 43.0983, lng: 42.4833 }],
    places: [N.shdugraWaterfall, N.bechoValley],
    distanceKm: 0,
    duration: "4–5h hike",
    overnight: N.mazeriCabin,
    loop: true,
  },
  {
    day: 11,
    from: { name: N.mazeri, lat: 43.0833, lng: 42.5167 },
    to: { name: N.anaklia, lat: 42.3917, lng: 41.5583 },
    waypoints: [
      { name: N.koruldiLakes, lat: 43.05, lng: 42.75 },
      { name: N.dadianiPalace, lat: 42.5233, lng: 41.8683 },
    ],
    places: [N.koruldiLakes, N.dadianiPalace],
    distanceKm: 140,
    duration: "3h",
    overnight: N.anaklia,
  },
  {
    day: 12,
    from: { name: N.anaklia, lat: 42.3917, lng: 41.5583 },
    to: { name: N.batumi, lat: 41.6168, lng: 41.6367 },
    waypoints: [
      { name: N.ureki, lat: 41.9833, lng: 41.6167 },
      { name: N.tsitsinatela, lat: 41.9683, lng: 41.7233 },
    ],
    places: [N.ureki, N.shekvetili, N.tsitsinatela, N.batumiOldTown],
    distanceKm: 110,
    duration: "1.5h",
    overnight: N.batumi,
  },
];

const DAYS = [
  {
    id: 1,
    date: "23.9",
    weekday: "רביעי",
    title: `נחיתה ב${N.batumi.split(" · ")[0]} והתאקלמות`,
    emoji: "🌊",
    theme: "נחיתה, התאקלמות וטיילת",
    overnight: N.batumiCenter,
    driving: "כ-15–20 דק' (10 ק\"מ)",
    summary: "נחיתה ב-18:10, איסוף רכב SUV בשדה התעופה, ארוחת ערב בטיילת.",
    activities: [
      {
        name: `נחיתה ואיסוף רכב – ${N.batumiAirport}`,
        description: `נחיתה ב${N.batumiAirport.split(" · ")[0]}. מומלץ SUV. נסיעה קצרה למרכז.`,
        link: TRIP_META.globalMapUrl,
        linkLabel: "מפת Google",
      },
      {
        name: N.batumiBoulevard,
        description: "הליכה בטיילת, ארוחת ערב ראשונה – חצ'פורי אג'רי עם ביצת עין.",
        link: "https://www.google.com/maps/search/Batumi+Boulevard",
        linkLabel: N.batumiBoulevard,
      },
    ],
    restaurants: [
      {
        name: fmt("מסעדות על הטיילת", "Restaurants on the Boulevard", "რესტორნები ბულვარზე"),
        cuisine: "גיאורגית – חצ'פורი, סלטים",
        note: "הזדמנות מעולה לטעום חצ'פורי אג'רי",
        link: "https://www.google.com/maps/search/restaurants+Batumi+boulevard",
        image: "IMG.khachapuri",
      },
    ],
    hotels: [
      {
        name: N.batumiCenter,
        area: N.batumi,
        nights: 1,
        note: "לינה ראשונה – קרוב לטיילת ולמרינה",
        link: "https://www.google.com/maps/search/hotels+Batumi+center",
        image: "IMG.batumi",
      },
    ],
    mapPoints: [{ name: N.batumi, lat: 41.6168, lng: 41.6367 }],
  },
  {
    id: 2,
    date: "24.9",
    weekday: "חמישי",
    title: `${N.mtirala.split(" · ")[0]} ו${N.kutaisi.split(" · ")[0]}`,
    emoji: "🌲",
    theme: "יער גשם ואדרנלין",
    overnight: fmt("מרכז קוטאיסי", "Kutaisi Center", "ქუთაისის ცენტრი"),
    driving: "כ-3.5 שעות (170 ק\"מ)",
    summary:
      "בוקר: יער הגשם מטיראלה – מסלול Tsablnari, zipline ו-Rope Park. אחר הצהריים: נסיעה לקוטאיסי וערב ראשון בעיר.",
    activities: [
      {
        name: N.mtirala,
        timeOfDay: "08:00–13:00",
        duration: "3–5 שעות",
        description:
          "יער גשם Colchic UNESCO – אחד הגשומים בגיאורגיה. מסלול Tsablnari (7 ק\"מ): כרמלית על הנהר, zipline (₾15), מפל 15 מ', אגם לשחייה, Rope Park. מרכז מבקרים: Chakvistavi.",
        link: "https://apa.gov.ge/en/eco-tourism/servisebi-da-tarifebi/mtiralas-erovnuli-parki",
        linkLabel: fmt("APA – פארק מטיראלה", "APA – Mtirala National Park", "APA"),
        image: "IMG.mtirala",
      },
      {
        name: fmt("נסיעה לקוטאיסי + ערב בעיר", "Drive to Kutaisi & evening walk", "ქუთაისი"),
        timeOfDay: "14:00–21:00",
        duration: "~2 ש' נסיעה + 2–3 ש' בעיר",
        description:
          "המשך ~90 ק\"מ ממטיראלה. check-in, הליכה: גשר הלב, גשר הזכוכית, Bagrati (UNESCO), מזרקת Colchis. ארוחת ערב – Palaty / SIAM Thai.",
        link: "https://www.google.com/maps/search/Kutaisi+White+Bridge",
        linkLabel: N.kutaisi,
        image: "IMG.kutaisiBagrati",
      },
    ],
    alternatives: [
      {
        name: fmt("יום רגוע בבאטומי", "Relaxed day in Batumi", "დასვენების დღე ბათუმში"),
        description: fmt(
          "אם מעדיפים לא לנהוג – יום נוסף בבאטומי: botanical garden, פארק 6 מאי, חוף.",
          "Skip driving – extra day in Batumi: botanical garden, 6 May Park, beach.",
          "მართვის გარეშე – დამატებითი დღე ბათუმში: ბოტანიკური ბაღი, 6 მაისის პარკი, პლაჟი."
        ),
        image: "IMG.batumi",
      },
    ],
    restaurants: [
      {
        name: fmt("מסעדות בקוטאיסי", "Restaurants in Kutaisi", "რესტორნები ქუთაისში"),
        cuisine: "גיאורגית מסורתית",
        link: "https://www.google.com/maps/search/restaurants+Kutaisi",
        image: "IMG.kutaisi",
      },
    ],
    hotels: [
      {
        name: fmt("מרכז קוטאיסי", "Kutaisi City Center", "ქუთაისის ცენტრი"),
        area: N.kutaisi,
        nights: 1,
        note: "לילה 2 בלבד · check-out בבוקר יום 3 לכיוון צ'יאתורה",
        link: "https://www.google.com/maps/search/hotels+Kutaisi+center",
        image: "IMG.kutaisi",
      },
    ],
    mapPoints: [
      { name: N.mtirala, lat: 41.8833, lng: 41.9833 },
      { name: N.kutaisi, lat: 42.2679, lng: 42.6946 },
    ],
  },
  {
    id: 3,
    date: "25.9",
    weekday: "שישי",
    title: `${N.katskhiPillar.split(" · ")[0]} ו${N.chiatura.split(" · ")[0]}`,
    emoji: "🚠",
    theme: fmt("תרבות, מים ואקסטרים – ברכב עצמי", "Culture, water & adventure – own car", "კულტურა, წყალი და ექსტრემი"),
    overnight: fmt("אזור צ'יאתורה", "Chiatura area", "ჭიათურა"),
    driving: "כ-130 ק\"מ · רכב עצמי · לינה בצ'יאתורה",
    summary:
      "יום 3 ברכב שלכם – check-out מקוטאיסי בבוקר. אופציה א': קצחי, Urbex בצ'יאתורה, Lia, מגווימבי. אופציה ב': Via Ferrata ב-Sveri (מפגש במקום). שתיהן – לינה באזור צ'יאתורה.",
    activities: [
      {
        name: N.katskhiPillar,
        timeOfDay: "09:00–10:00",
        duration: "45 דק'",
        description:
          "עמוד קצחי – סלע 40 מ' עם מנזר בראש. עצירת צילום מהכביש (30 ק\"מ / 40 דק' מקוטאיסי). בפתיחה של שתי האופציות.",
        link: "https://www.google.com/maps/search/Katskhi+Pillar",
        linkLabel: N.katskhiPillar,
        image: "IMG.katskhi",
      },
      {
        name: fmt("אופציה א' – צ'יאתורה, Lia ומגווימבי", "Option A – Chiatura, Lia & Mgvimevi", "ჭიათურა"),
        timeOfDay: "10:30–17:00",
        duration: "יום מלא",
        description:
          "Urbex ורכבל Sanatorium · ארוחה אצל Lia (WhatsApp מראש!) · מנזר מגווימבי. לינה במלון באזור צ'יאתורה – בלי חזרה לקוטאיסי.",
        link: "https://www.google.com/maps/search/Chiatura+Georgia",
        linkLabel: N.chiatura,
        image: "IMG.chiatura",
      },
      {
        name: fmt("אופציה ב' – Via Ferrata ב-Sveri", "Option B – Via Ferrata at Sveri", "Sveri"),
        timeOfDay: "10:00–17:00",
        duration: "יום מלא",
        description:
          "נסיעה ברכב ל-Sveri Adventure Camp (~110 ק\"מ / 2 ש' מקוטאיסי). Via Ferrata עם Rafting in Kutaisi במקום (₾200 – בלי הסעה). שחייה, BBQ. לינה בצ'יאתורה (~30 דק' מ-Sveri).",
        link: "https://www.raftinginkutaisi.com/trip/via-ferrata-in-georgia/",
        linkLabel: N.raftingInKutaisi + " – Via Ferrata",
        image: "IMG.rafting",
      },
    ],
    alternatives: [
      {
        name: "📋 אופציה א' – קצחי, צ'יאתורה, Lia ומגווימבי",
        description:
          "יום תרבות ו-Urbex ברכב עצמי: קצחי → צ'יאתורה → Lia → מגווימבי → לינה בצ'יאתורה.",
        overnight: fmt("אזור צ'יאתורה", "Chiatura area", "ჭიათურა"),
        recommended: true,
        image: "IMG.chiatura",
      },
      {
        name: "🧗 אופציה ב' – Via Ferrata ב-Sveri (רכב עצמי)",
        description:
          "ברכב שלכם ל-Sveri. מפגש עם Rafting in Kutaisi – Via Ferrata, שחייה ו-BBQ. ערב: מלון בצ'יאתורה. לתאם מראש: +995 595 41 15 47.",
        overnight: fmt("אזור צ'יאתורה", "Chiatura area", "ჭიათურა"),
        link: "https://www.raftinginkutaisi.com/trip/via-ferrata-in-georgia/",
        linkLabel: N.raftingInKutaisi + " – Via Ferrata",
        image: "IMG.rafting",
      },
    ],
    restaurants: [
      {
        name: N.lunchAtLia,
        cuisine: fmt("ארוחת צהריים גיאורגית אצל משפחה מקומית", "Georgian home lunch", "ქართული სახლის ლანჩი"),
        note: "אופציה א' – חובה WhatsApp מראש!",
        link: "https://www.google.com/maps/search/Lunch+at+Lia+Georgia",
        image: "IMG.supra",
      },
    ],
    hotels: [
      {
        name: fmt("לינה באזור צ'יאתורה", "Stay near Chiatura", "ჭიათურა"),
        area: N.chiatura,
        nights: 1,
        note: "check-out קוטאיסי בבוקר · Sveri ~30 דק' · חניה במלון",
        link: "https://www.google.com/maps/search/hotels+Chiatura+Georgia",
        image: "IMG.chiatura",
      },
    ],
    mapPoints: [
      { name: N.kutaisi, lat: 42.2679, lng: 42.6946 },
      { name: N.katskhiPillar, lat: 42.2872, lng: 43.2125 },
      { name: N.chiatura, lat: 42.2989, lng: 43.289 },
      { name: N.mgvimevi, lat: 42.2694, lng: 43.0456 },
      { name: fmt("Sveri – Via Ferrata", "Sveri – Via Ferrata", "Sveri"), lat: 42.352, lng: 43.268 },
    ],
    mapRoutes: [
      {
        label: "אופציה א' – קצחי, צ'יאתורה, מגווימבי",
        color: "#7b2d3e",
        dashed: true,
        points: [
          { name: N.kutaisi, lat: 42.2679, lng: 42.6946 },
          { name: N.katskhiPillar, lat: 42.2872, lng: 43.2125 },
          { name: N.chiatura, lat: 42.2989, lng: 43.289 },
          { name: N.mgvimevi, lat: 42.2694, lng: 43.0456 },
          { name: N.chiatura, lat: 42.2989, lng: 43.289 },
        ],
      },
      {
        label: "אופציה ב' – Via Ferrata ב-Sveri",
        color: "#2d5a3d",
        dashed: true,
        points: [
          { name: N.kutaisi, lat: 42.2679, lng: 42.6946 },
          { name: N.katskhiPillar, lat: 42.2872, lng: 43.2125 },
          { name: fmt("Sveri – Via Ferrata", "Sveri – Via Ferrata", "Sveri"), lat: 42.352, lng: 43.268 },
          { name: N.chiatura, lat: 42.2989, lng: 43.289 },
        ],
      },
    ],
  },
  {
    id: 4,
    date: "26.9",
    weekday: "שבת",
    title: fmt("רפטינג וחבל ראצ'ה", "Rafting & Racha", "rafting და რაჭა"),
    emoji: "🛶",
    theme: fmt("מצ'יאתורה לראצ'ה – נהר, יין ונוף", "Chiatura to Racha – river, wine & views", "რიონი, რაჭა"),
    overnight: fmt("אמברולאורי / Adventure Camping", "Ambrolauri / Adventure Camping", "ამბროლაური / Adventure Camping"),
    driving: "כ-90 ק\"מ · ~1.5–2 ש' מאזור צ'יאתורה",
    summary:
      "יום 4: יציאה מאזור צ'יאתורה לראצ'ה. אופציה א': רפטינג → שאורי → יקב → אמברולאורי. אופציה ב': רפטינג + קניונינג Shareula. אופציה ג' (מומלץ לאקסטרים): check-in ב-Adventure Camping → רפטינג מהמחנה → לינה בקוטג'/אוהל · יום 5 בוקר קניונינג.",
    activities: [
      {
        name: fmt("נסיעה לנקודת הרפטינג / Adventure Camping", "Drive to rafting / Adventure Camping", "rafting"),
        timeOfDay: "08:00–12:00",
        duration: "~1–1.5 ש'",
        description:
          "יציאה מצ'יאתורה. אופציה ג': check-in ב-Adventure Camping ב־12:00 (הכנה לרפטינג 12:30). אופציות א'/ב': נסיעה ישירה לנקודת רפטינג.",
        link: "https://www.google.com/maps/place/Adventure+Camping/@42.5582341,42.8517484,17z",
        linkLabel: N.adventureCamping,
        image: "IMG.racha",
      },
      {
        name: fmt("רפטינג על נהר הריוני", "Rioni River Rafting", "rafting მდ. რიონზე"),
        timeOfDay: "12:30–15:00",
        duration: "2 ש' 20 דק' על המים",
        description:
          "Racha-Lechkhumi · 14 ק\"מ · רמה II–III · ₾150 לאדם. כולל הסעה מהמחנה לנקודת היציאה ובחזרה, מדריך IRF, ציוד Neoprene 5mm מלא. סיור קבוצתי – עד 6 + מדריך בסירה.",
        link: "https://www.raftinginkutaisi.com/trip/rafting-on-the-rioni-river/",
        linkLabel: N.raftingInKutaisi + " – Rioni",
        image: "IMG.rafting",
      },
      {
        name: N.shaoriReservoir,
        timeOfDay: "אחה\"צ (אופציה א')",
        duration: "45 דק'",
        description: "תצפית במאגר שאורי – בדרך לאמברולאורי (אופציה א').",
        link: "https://www.google.com/maps/search/Shaori+Reservoir",
        linkLabel: N.shaoriReservoir,
        image: "IMG.racha",
      },
      {
        name: N.khvanchkaraWinery,
        timeOfDay: "אחה\"צ (אופציה א')",
        duration: "1–1.5 ש'",
        description: "טעימות Khvanchkara. לא לנהוג אחרי! check-in באמברולאורי (אופציה א').",
        link: "https://www.google.com/maps/search/Khvanchkara+Winery",
        linkLabel: N.khvanchkaraWinery,
        image: "IMG.wine",
      },
    ],
    alternatives: [
      {
        name: "📋 אופציה א' – רפטינג, שאורי ויין → אמברולאורי",
        description:
          "מצ'יאתורה לרפטינג (₾150), מאגר שאורי ויקב Khvanchkara. לינה באמברולאורי.",
        overnight: N.ambrolauri,
        link: "https://www.raftinginkutaisi.com/trip/rafting-on-the-rioni-river/",
        linkLabel: N.raftingInKutaisi + " – Rioni",
        image: "IMG.rafting",
      },
      {
        name: "🛶 אופציה ב' – רפטינג + קניונינג Shareula → אמברולאורי",
        description:
          "יום כפול: רפטינג בוקר + קניונינג Shareula (₾200). לינה באמברולאורי.",
        overnight: N.ambrolauri,
        link: "https://www.raftinginkutaisi.com/trip/canyoning-on-the-shareula-river/",
        linkLabel: N.raftingInKutaisi + " – Shareula",
        image: "IMG.rafting",
      },
      {
        name: "🏕️ אופציה ג' – Adventure Camping (רפטינג + לינה במחנה)",
        description:
          "check-in 12:00 במחנה של Rafting in Kutaisi → 12:30 הכנה לרפטינג על הריוני (14 ק\"מ, II–III, ₾150). מסעדה במקום. לינה בקוטג' (₾250 לחדר עם 2 מיטות זוגיות) או באוהלים. בוקר יום 5: קניונינג פרטי ליד המחנה.",
        overnight: N.adventureCamping,
        recommended: true,
        link: "https://www.google.com/maps/place/Adventure+Camping/@42.5582341,42.8517484,17z",
        linkLabel: N.adventureCamping + " – Google Maps",
        image: "IMG.rafting",
        tips: [
          "WhatsApp: +995 595 41 15 47",
          "ציוד רפטינג מלא (Neoprene 5mm) מהמפעיל",
          "לקניונינג ביום 5 – להביא סניקרס",
        ],
      },
    ],
    restaurants: [
      {
        name: fmt("מסעדה ב-Adventure Camping", "Restaurant at Adventure Camping", "რესტორანი"),
        cuisine: fmt("מסעדה במחנה – בלי לצאת לארוחות", "On-site restaurant", "ბანაკში"),
        note: "אופציה ג'",
        link: "https://www.google.com/maps/place/Adventure+Camping/@42.5582341,42.8517484,17z",
        image: "IMG.supra",
      },
      {
        name: N.khvanchkaraWinery,
        cuisine: fmt("יקב – יין חצי מתוק", "Semi-sweet wine tasting", "ღვინის დეგustatsia"),
        link: "https://www.google.com/maps/search/Khvanchkara+Winery",
        image: "IMG.wine",
      },
      {
        name: N.naberauliWines,
        cuisine: fmt("יקב באמברולאורי", "Winery in Ambrolauri", "მარანი ამბროლაურში"),
        link: "https://www.google.com/maps/search/Naberauli+Wines",
        image: "IMG.wine",
      },
    ],
    hotels: [
      {
        name: N.adventureCamping,
        area: `${N.racha} · Rafting in Kutaisi`,
        nights: 1,
        note: "אופציה ג' · קוטג' ₾250/חדר (2 מיטות זוגיות) או אוהלים · מסעדה במקום",
        link: "https://www.google.com/maps/place/Adventure+Camping/@42.5582341,42.8517484,17z",
        image: "IMG.racha",
      },
      {
        name: fmt("אמברולאורי / ראצ'ה", "Ambrolauri / Racha", "ამბროლაური / რაჭა"),
        area: `${N.ambrolauri}, ${N.racha}`,
        nights: 1,
        note: "אופציות א'/ב'",
        link: "https://www.google.com/maps/search/hotels+Ambrolauri",
        image: "IMG.racha",
      },
    ],
    mapPoints: [
      { name: N.chiatura, lat: 42.2989, lng: 43.289 },
      { name: N.rioniRiver, lat: 42.45, lng: 43.05 },
      { name: N.adventureCamping, lat: 42.5582341, lng: 42.8517484, overnight: true },
      { name: N.shaoriReservoir, lat: 42.5833, lng: 43.0833 },
      { name: N.khvanchkaraWinery, lat: 42.55, lng: 43.1 },
      { name: N.shareulaRiver, lat: 42.545, lng: 43.135 },
      { name: N.ambrolauri, lat: 42.5211, lng: 43.1622, overnight: true },
    ],
    mapRoutes: [
      {
        label: "אופציה א' – רפטינג, שאורי ויין",
        color: "#7b2d3e",
        dashed: true,
        points: [
          { name: N.chiatura, lat: 42.2989, lng: 43.289 },
          { name: N.rioniRiver, lat: 42.45, lng: 43.05 },
          { name: N.shaoriReservoir, lat: 42.5833, lng: 43.0833 },
          { name: N.khvanchkaraWinery, lat: 42.55, lng: 43.1 },
          { name: N.ambrolauri, lat: 42.5211, lng: 43.1622 },
        ],
      },
      {
        label: "אופציה ב' – רפטינג + Shareula",
        color: "#2d5a3d",
        dashed: true,
        points: [
          { name: N.chiatura, lat: 42.2989, lng: 43.289 },
          { name: N.rioniRiver, lat: 42.45, lng: 43.05 },
          { name: N.shareulaRiver, lat: 42.545, lng: 43.135 },
          { name: N.ambrolauri, lat: 42.5211, lng: 43.1622 },
        ],
      },
      {
        label: "אופציה ג' – Adventure Camping",
        color: "#1a5276",
        dashed: true,
        points: [
          { name: N.chiatura, lat: 42.2989, lng: 43.289 },
          { name: N.adventureCamping, lat: 42.5582341, lng: 42.8517484 },
          { name: N.rioniRiver, lat: 42.45, lng: 43.05 },
          { name: N.adventureCamping, lat: 42.5582341, lng: 42.8517484 },
        ],
      },
    ],
  },
  {
    id: 5,
    date: "27.9",
    weekday: "ראשון",
    title: `${N.tskaltubo.split(" · ")[0]} ו${N.prometheusCave.split(" · ")[0]}`,
    emoji: "🏚",
    theme: fmt("נטישות סובייטיות ומערות", "Soviet Urbex & Caves", "საბჭოთა urbex და მღვირები"),
    overnight: fmt("צקאלטובו / אזור Okatse", "Tskaltubo / Okatse area", "ცხალტუბო / ოკაცე"),
    driving: "כ-100 ק\"מ · לינה במזרח (בלי זוגדידי)",
    summary:
      "אם לנו ב-Adventure Camping: בוקר קניונינג פרטי ליד המחנה, אחר כך צקאלטובו + פרומתאוס. אחרת: יציאה מאמברולאורי לצקאלטובו + מערה. לינה: צקאלטובו/פרומתאוס או Okatse – בלי זוגדידי.",
    activities: [
      {
        name: fmt("קניונינג ליד Adventure Camping (אופציה ג')", "Canyoning near Adventure Camping", "canyoning"),
        timeOfDay: "בוקר",
        duration: "חצי יום",
        description:
          "אם לנו במחנה בלילה הקודם: קניונינג פרטי ליד המחנה – צוקים, בריכות, חבלים ליד מפלים. להביא סניקרס; שאר הציוד במקום. WhatsApp: +995 595 41 15 47.",
        link: "https://www.raftinginkutaisi.com/trip/canyoning-on-the-shareula-river/",
        linkLabel: N.raftingInKutaisi + " – Canyoning",
        image: "IMG.rafting",
      },
      {
        name: N.tskaltubo,
        description: "סיור בסנטוריומים סובייטיים נטושים – Urbex.",
        link: "https://www.google.com/maps/search/Tskaltubo+sanatorium",
        linkLabel: N.tskaltubo,
      },
      {
        name: N.prometheusCave,
        description: "מערה ענקית ומרשימה – נטיפים, תצורות סלע, אגמים ושייט. ~14°C – סווטר חובה.",
        link: "https://www.google.com/maps/search/Prometheus+Cave+Georgia",
        linkLabel: N.prometheusCave,
      },
      {
        name: N.satapliaReserve,
        timeOfDay: "אופציונלי",
        duration: "2–3 ש'",
        description:
          "שמורת טבע ליד קוטאיסי – יער, מערה, תצפיות ועקבות דינוזאורים – חובה למשפחות עם ילדים. מתאים באותו יום עם פרומתאוס אם יש זמן.",
        link: "https://www.google.com/maps/search/Sataplia+Nature+Reserve+Kutaisi",
        linkLabel: N.satapliaReserve,
        image: "IMG.prometheus",
      },
    ],
    alternatives: [
      {
        name: "🏕️ אופציה ג' – בוקר קניונינג במחנה → צקאלטובו",
        description:
          "אחרי לינה ב-Adventure Camping: קניונינג פרטי בבוקר, אחר כך נסיעה לצקאלטובו + פרומתאוס. לינה באזור צקאלטובו או Okatse.",
        overnight: fmt("אזור צקאלטובו / Okatse", "Tskaltubo / Okatse area", "ცხალტუბო / ოკაცე"),
        recommended: true,
        link: "https://www.raftinginkutaisi.com/trip/canyoning-on-the-shareula-river/",
        linkLabel: N.raftingInKutaisi + " – Canyoning",
        image: "IMG.rafting",
        tips: [
          "סניקרס חובה לקניונינג",
          "סיור פרטי לכם",
          "מסעדה במחנה לפני היציאה",
        ],
      },
      {
        name: "📋 אופציה א' – לינה באזור צקאלטובו / פרומתאוס",
        description:
          "יציאה מאמברולאורי (או אחרי קניונינג). אחרי המערה – check-in ליד צקאלטובו. בוקר יום 6: ~30–40 דק' ל-Okatse.",
        overnight: fmt("אזור צקאלטובו", "Tskaltubo area", "ცხალტუბო"),
        image: "IMG.tskaltubo",
      },
      {
        name: "🏞 אופציה ב' – לינה באזור Okatse Canyon",
        description:
          "אחרי פרומתאוס ממשיכים ~30–40 דק' מערבה ללינה ליד Okatse. בוקר יום 6 מתחיל ישר בקניון.",
        overnight: fmt("אזור Okatse Canyon", "Okatse Canyon area", "ოკაცე"),
        image: "IMG.okatse",
      },
    ],
    hotels: [
      {
        name: fmt("לינה באזור צקאלטובו / פרומתאוס", "Stay near Tskaltubo / Prometheus", "ცხალტუბო"),
        area: N.tskaltubo,
        nights: 1,
        note: "אופציה א' · קרוב למערה · יום 6 → Okatse",
        link: "https://www.google.com/maps/search/hotels+Tskaltubo+Georgia",
        image: "IMG.tskaltubo",
      },
      {
        name: fmt("לינה באזור Okatse Canyon", "Stay near Okatse Canyon", "ოკაცე"),
        area: N.okatseCanyon,
        nights: 1,
        note: "אופציה ב' · בוקר יום 6 בקניון",
        link: "https://www.google.com/maps/search/hotels+Okatse+Canyon+Georgia",
        image: "IMG.okatse",
      },
    ],
    mapPoints: [
      { name: N.adventureCamping, lat: 42.5582341, lng: 42.8517484 },
      { name: N.ambrolauri, lat: 42.5211, lng: 43.1622 },
      { name: N.tskaltubo, lat: 42.3417, lng: 42.5986 },
      { name: N.prometheusCave, lat: 42.3708, lng: 42.5989 },
      { name: N.satapliaReserve, lat: 42.248, lng: 42.775 },
      { name: N.okatseCanyon, lat: 42.4167, lng: 42.5167 },
    ],
    mapRoutes: [
      {
        label: "אופציה ג' – מקמפינג לצקאלטובו",
        color: "#1a5276",
        dashed: true,
        points: [
          { name: N.adventureCamping, lat: 42.5582341, lng: 42.8517484 },
          { name: N.tskaltubo, lat: 42.3417, lng: 42.5986 },
          { name: N.prometheusCave, lat: 42.3708, lng: 42.5989 },
          { name: N.tskaltubo, lat: 42.3417, lng: 42.5986 },
        ],
      },
      {
        label: "אופציה א' – מאמברולאורי לצקאלטובו",
        color: "#7b2d3e",
        dashed: true,
        points: [
          { name: N.ambrolauri, lat: 42.5211, lng: 43.1622 },
          { name: N.tskaltubo, lat: 42.3417, lng: 42.5986 },
          { name: N.prometheusCave, lat: 42.3708, lng: 42.5989 },
          { name: N.tskaltubo, lat: 42.3417, lng: 42.5986 },
        ],
      },
      {
        label: "אופציה ב' – לינה ב-Okatse",
        color: "#2d5a3d",
        dashed: true,
        points: [
          { name: N.ambrolauri, lat: 42.5211, lng: 43.1622 },
          { name: N.tskaltubo, lat: 42.3417, lng: 42.5986 },
          { name: N.prometheusCave, lat: 42.3708, lng: 42.5989 },
          { name: N.okatseCanyon, lat: 42.4167, lng: 42.5167 },
        ],
      },
    ],
  },
  {
    id: 6,
    date: "28.9",
    weekday: "שני",
    title: fmt("קניונים ומעיינות חמים", "Canyons & Hot Springs", "კანიონები და ცხელი წყლები"),
    emoji: "🛶",
    theme: `${N.okatseCanyon.split(" · ")[0]}, ${N.martvili.split(" · ")[0]}, ${N.nokalakeviHotSprings.split(" · ")[0]}`,
    overnight: N.zugdidi,
    driving: "כ-90 ק\"מ · מצקאלטובו/Okatse → זוגדידי",
    summary:
      "יוצאים מלינת יום 5 – אוקאצה (גשרים תלויים) → מרטווילי (מים טורקיז, שייט) → נוקאלאקווי. אופציה: טיול ג'יפים עם Bacho Tsotsoria. לינה בזוגדידי.",
    activities: [
      {
        name: N.okatseCanyon,
        description:
          "מסלול מיוחד עם שבילים תלויים מעל הקניון – נופים מרהיבים. אם לנו ב-Okatse – מתחילים מהמלון.",
        link: "https://www.google.com/maps/search/Okatse+Canyon",
        linkLabel: N.okatseCanyon,
      },
      {
        name: N.martviliCanyon,
        description: "מים בצבע טורקיז, מפלים, טבע מדהים – שייט בסירות גומי.",
        link: "https://www.google.com/maps/search/Martvili+Canyon",
        linkLabel: N.martviliCanyon,
      },
      {
        name: N.nokalakeviHotSprings,
        description: "טבילה במעיינות חמים פראיים. אחר כך – נסיעה לזוגדידי ללינה.",
        link: "https://www.google.com/maps/search/Nokalakevi+Hot+Springs",
        linkLabel: N.nokalakeviHotSprings,
      },
    ],
    alternatives: [
      {
        name: "🚙 אופציה – טיול ג'יפים עם Bacho Tsotsoria",
        description:
          "מדריך מקומי עם ג'יפ למקומות מיוחדים בין מפלים, מים וטבע פראי – אחד הטיולים שהכי נהנו מהם באזור קוטאיסי. שילוב הרפתקה, ג'יפ ואדרנלין.",
        link: "https://www.facebook.com/search/top?q=Bacho%20Tsotsoria",
        linkLabel: N.bachoJeepTours + " – Facebook",
        image: "IMG.martvili",
        tips: ["לחפש Bacho Tsotsoria בפייסבוק", "מתאים למשפחות", "ראו גם לוגיסטיקה → נהגים ומדריכים"],
      },
    ],
    hotels: [
      {
        name: N.zugdidi,
        area: N.zugdidi,
        nights: 1,
        note: "לילה אחד · יציאה לסוואנטי בבוקר יום 7",
        link: "https://www.google.com/maps/search/hotels+Zugdidi",
        image: "IMG.martvili",
      },
    ],
    mapPoints: [
      { name: N.tskaltubo, lat: 42.3417, lng: 42.5986 },
      { name: N.okatseCanyon, lat: 42.4167, lng: 42.5167 },
      { name: N.martvili, lat: 42.4167, lng: 42.3667 },
      { name: N.nokalakeviHotSprings, lat: 42.3533, lng: 42.3167 },
      { name: N.zugdidi, lat: 42.5088, lng: 41.8709 },
    ],
  },
  {
    id: 7,
    date: "29.9",
    weekday: "שלישי",
    title: `${N.enguriDam.split(" · ")[0]} ו${N.mestia.split(" · ")[0]}`,
    emoji: "🏔",
    theme: fmt("עלייה לסוואנטי", "Ascent to Svaneti", "სვანეთში"),
    overnight: N.mestia,
    driving: "כ-4–5 שעות (140 ק\"מ) – כביש מפותל",
    summary: "עלייה לסוואנטי: נסיעה מזוגדידי דרך סכר אנגורי, הגעה למסטיה – בירת ההרים.",
    activities: [
      {
        name: fmt("יציאה מזוגדידי", "Departure from Zugdidi", "გასვლა ზუგდიდიდან"),
        description:
          "יציאה ב-08:00–08:30 אחרי ארוחת בוקר. לוודא: דלק מלא (תחנות נדירות בהמשך), מזומן, חטיפים, שכבות לבוש. הכביש עובר דרך עמק Enguri – נוף משתנה מירוק לטורקיז.",
        link: "https://www.google.com/maps/search/Zugdidi+Georgia",
        linkLabel: N.zugdidi,
      },
      {
        name: N.enguriDam,
        description:
          "עצירה של 45–60 דק' לתצפית על סכר אנגורי – בין הגבוהים באירופה (271 מ'). גשר תלוי מעל, נוף לעמק. אפשר לרדת לנקודת צילום – לא מומלץ לבעלי vertigo. כניסה חינם לרוב.",
        link: "https://www.google.com/maps/search/Enguri+Dam",
        linkLabel: N.enguriDam,
      },
      {
        name: fmt("עצירת צהריים בדרך", "Lunch stop en route", "სადილი გზაში"),
        description:
          "עצירה בכפר לאורך הדרך – ח'צפורי, lobio או kubdari מקומי. הזדמנות ל-5 דק' stretch. הדרך האחרונה לפני מסטיה (שעה–שעה וחצי) – serpentine עם פרות, מפולות סלעים ועבודות בכביש – לנהוג לאט.",
        link: "https://www.google.com/maps/search/restaurant+Zugdidi+Mestia+road",
        linkLabel: fmt("מסעדות בדרך", "Road restaurants", "გზის რესტორნები"),
      },
      {
        name: fmt("הגעה ולינה במסטיה", "Arrival & check-in Mestia", "ჩასვლა მესტიაში"),
        description:
          "הגעה צפויה 13:30–14:30. check-in, מנוחה קצרה. לרכוש מזומן מהכספומט (ATM מוגבל), חטיפים ומים לימי הטרק. להזמין ג'יפ ל-Ushguli ליום 8.",
        link: "https://www.google.com/maps/search/hotels+Mestia",
        linkLabel: N.mestia,
      },
      {
        name: fmt("סיור במסטיה – מגדלים ומוזיאון", "Mestia walking tour", "მესტიის სვლა"),
        description: `הליכה במרכז ${N.mestia.split(" · ")[0]}: מגדלי Svanetian (מגדלי הגנה מימי הביניים), כנסייה, מוזיאון ההיסטורי של סוואנטי (שעות: בדרך כלל 10:00–18:00, לבדוק). נוף ל-Ushba ו-Tetnuldi.`,
        link: "https://www.google.com/maps/search/Svaneti+Museum+Mestia",
        linkLabel: fmt("מוזיאון סוואנטי", "Svaneti Museum", "სვანეთის მუზეუმი"),
      },
      {
        name: fmt("ארוחת ערב – Laila / Samushao", "Dinner in Mestia", "ვახშამი მესტიაში"),
        description:
          "ארוחת ערב במסעדה Laila (kubdari – מאפה בשר סוואנטי, tashmijabi) או Samushao Marani (יין מקומי + מנות גיאורגיות). לשבת מוקדם – עמוס בערב. סיום יום רגוע – מחר Ushguli!",
        link: "https://www.google.com/maps/search/Laila+Restaurant+Mestia",
        linkLabel: "Laila Restaurant",
      },
    ],
    hotels: [
      {
        name: N.mestia,
        area: `${N.mestia}, ${N.svaneti}`,
        nights: 2,
        note: "בסיס לימים 7–8",
        link: "https://www.google.com/maps/search/hotels+Mestia",
        image: "IMG.mestia",
      },
    ],
    mapPoints: [
      { name: N.enguriDam, lat: 42.7583, lng: 42.0333 },
      { name: N.mestia, lat: 43.0458, lng: 42.7289 },
    ],
  },
  {
    id: 8,
    date: "30.9",
    weekday: "רביעי",
    title: `${N.ushguli.split(" · ")[0]} ו${N.shkharaGlacier.split(" · ")[0]}`,
    emoji: "🏔",
    theme: fmt("4x4 לכפר הגבוה באירופה", "4x4 to Europe's highest village", "4x4 უშგულში"),
    overnight: N.mestia,
    driving: "כ-3.5 שעות שטח (90 ק\"מ הלוך-חזור)",
    summary: "ג'יפ 4x4 עם נהג לאושגולי, סוסים או הליכה לקרחון שחארה.",
    activities: [
      {
        name: N.ushguli,
        description: "הכפר הגבוה ביותר באירופה – מגדלי אבן, UNESCO.",
        link: "https://www.google.com/maps/search/Ushguli",
        linkLabel: N.ushguli,
      },
      {
        name: N.shkharaGlacier,
        description: "רכיבה על סוסים או הליכה לקרחון.",
        link: "https://www.google.com/maps/search/Shkhara+Glacier",
        linkLabel: N.shkharaGlacier,
      },
    ],
    alternatives: [
      {
        name: fmt("טיול מודרך", "Guided tour", "საგიდო ტური"),
        description: "להזמין ג'יפ מראש במסטיה – הכביש מחלקו סלע ונדרש נהג מקומי.",
        image: "IMG.ushguli",
      },
    ],
    hotels: [
      {
        name: N.mestia,
        area: N.mestia,
        nights: 1,
        link: "https://www.google.com/maps/search/hotels+Mestia",
        image: "IMG.ushguli",
      },
    ],
    mapPoints: [
      { name: N.mestia, lat: 43.0458, lng: 42.7289 },
      { name: N.ushguli, lat: 42.9114, lng: 43.0136 },
    ],
  },
  {
    id: 9,
    date: "1.10",
    weekday: "חמישי",
    title: fmt("צ'לאדי ומעבר לבקתה במאזרי", "Chalaadi & cabin in Mazeri", "ჭალაadi და კოტეჯი მაზერში"),
    emoji: "🏡",
    theme: fmt("טרק קליל ולינה בטבע", "Easy hike & nature stay", "მსუბუქი ლაშქრობა და ბუნებაში ღამე"),
    overnight: N.mazeriCabin,
    driving: "כ-45 דק' נסיעה (25 ק\"מ) + הליכה 2–3 שעות",
    summary: "בוקר: טרק לקרחון צ'לאדי. אחר הצהריים: איסוף ציוד ונסיעה למאזרי – בקתת עץ עם נוף לאושבה. ערב רגוע בטבע.",
    activities: [
      {
        name: N.chalaadiGlacier,
        description: "מסלול קליל – הליכה 2–3 שעות הלוך-חזור ביער אל הקרחון. יוצאים ממסטיה בבוקר.",
        link: "https://www.google.com/maps/search/Chalaadi+Glacier",
        linkLabel: N.chalaadiGlacier,
      },
      {
        name: N.mazeriCabin,
        description: `נסיעה של כ-45 דקות ל${N.mazeri.split(" · ")[0]}, ${N.bechoValley.split(" · ")[0]}. אזור פראי ושקט – בקתת עץ או גסטהאוס כפרי עם נוף ישיר ל${N.ushba.split(" · ")[0]}.`,
        link: "https://www.google.com/maps/search/guesthouse+Mazeri+Becho",
        linkLabel: N.mazeri,
      },
    ],
    alternatives: [
      {
        name: N.dedeCinema,
        description: "אם חוזרים דרך מסטיה בערב – אפשרות לסרט בקולנוע Dede (במקום מעבר מוקדם למאזרי).",
        image: "IMG.mestia",
      },
    ],
    hotels: [
      {
        name: N.mazeriCabin,
        area: `${N.mazeri}, ${N.bechoValley}`,
        nights: 2,
        note: "בקתת עץ / גסטהאוס – 2 לילות (ימים 9–10)",
        link: "https://www.google.com/maps/search/cabin+guesthouse+Mazeri+Georgia",
        image: "IMG.ushba",
      },
    ],
    mapPoints: [
      { name: N.mestia, lat: 43.0458, lng: 42.7289 },
      { name: N.chalaadiGlacier, lat: 43.0667, lng: 42.6833 },
      { name: N.mazeri, lat: 43.0833, lng: 42.5167 },
    ],
  },
  {
    id: 10,
    date: "2.10",
    weekday: "שישי",
    title: fmt("טרק שדוגרה מהבקתה", "Shdugra trek from the cabin", "შდუგრის ტrek კოტეჯიდან"),
    emoji: "💧",
    theme: fmt("מפל שדוגרה – ללא נסיעות", "Shdugra Waterfall – no driving", "შდუგრა – მართვის გარეშე"),
    overnight: N.mazeriCabin,
    driving: "ללא נסיעות – יוצאים מהבקתה",
    summary: "התעוררות בטבע. המסלול אל מפל שדוגרה יוצא ממש מהעמק – 4–5 שעות הליכה. אחרי הטרק: מקלחת חמה ולילה שני רגוע בבקתה.",
    activities: [
      {
        name: N.shdugraWaterfall,
        description: "טרק מאתגר אל המפל הגבוה בגיאורגיה – יוצא ישירות ממאזרי / עמק בצ'ו. 4–5 שעות הליכה.",
        link: "https://www.google.com/maps/search/Shdugra+Waterfall",
        linkLabel: N.shdugraWaterfall,
      },
      {
        name: N.bechoValley,
        description: "שארית היום והערב ברגוע בבקתה – נוף להרים ולפסגת אושבה.",
        link: "https://www.google.com/maps/search/Becho+Valley+Mazeri",
        linkLabel: N.bechoValley,
      },
    ],
    hotels: [
      {
        name: N.mazeriCabin,
        area: `${N.mazeri}, ${N.bechoValley}`,
        nights: 1,
        note: "לילה שני בבקתה",
        link: "https://www.google.com/maps/search/guesthouse+Mazeri+Georgia",
        image: "IMG.ushba",
      },
    ],
    mapPoints: [
      { name: N.mazeri, lat: 43.0833, lng: 42.5167 },
      { name: N.shdugraWaterfall, lat: 43.0983, lng: 42.4833 },
    ],
  },
  {
    id: 11,
    date: "3.10",
    weekday: "שבת",
    title: `${N.koruldiLakes.split(" · ")[0]} ו${N.anaklia.split(" · ")[0]}`,
    emoji: "🏖",
    theme: fmt("ירידה לים השחור", "Descent to the Black Sea", "შავ ზღვაზე ჩამოსვლა"),
    overnight: N.anaklia,
    driving: "כ-2.5–3 שעות (140 ק\"מ)",
    summary: "תצפית מאגמי קורולדי, ארמון דאדיאני, הגעה לחוף.",
    activities: [
      {
        name: N.koruldiLakes,
        description: "תצפית בוקר על אגמים alpines מעל ההרים.",
        link: "https://www.google.com/maps/search/Koruldi+Lakes",
        linkLabel: N.koruldiLakes,
      },
      {
        name: N.dadianiPalace,
        description: `עצירה ב${N.zugdidi.split(" · ")[0]} בדרך לים.`,
        link: "https://www.google.com/maps/search/Dadiani+Palace",
        linkLabel: N.dadianiPalace,
      },
      {
        name: N.anaklia,
        description: fmt("עיירת חוף על הים השחור", "Black Sea resort town", "შავი ზღვის სasorto ქალაქი"),
        link: "https://www.google.com/maps/search/Anaklia+Georgia",
        linkLabel: N.anaklia,
      },
    ],
    hotels: [
      {
        name: N.anaklia,
        area: fmt("חוף אנאקליה", "Anaklia Beach", "ანაკლიის პლაჟი"),
        nights: 1,
        link: "https://www.google.com/maps/search/hotels+Anaklia",
        image: "IMG.anaklia",
      },
    ],
    mapPoints: [
      { name: N.koruldiLakes, lat: 43.05, lng: 42.75 },
      { name: N.anaklia, lat: 42.3917, lng: 41.5583 },
    ],
  },
  {
    id: 12,
    date: "4.10",
    weekday: "ראשון",
    title: `${N.ureki.split(" · ")[0]}, ${N.tsitsinatela.split(" · ")[0]} ו${N.batumi.split(" · ")[0]}`,
    emoji: "🎢",
    theme: fmt("ספורט ימי ופארק שעשועים", "Water sports & amusement park", "წყლის სპორტი და პარკი"),
    overnight: N.batumi,
    driving: "כ-1.5 שעות (110 ק\"מ)",
    summary: "אורקי/שקווטילי – ספורט ימי, ציצנאטלה, מופע דולפינים, מנוחה ופינוקים בבאטומי.",
    activities: [
      {
        name: `${N.ureki} / ${N.shekvetili}`,
        description: "אופנועי ים, מצנחי רחף בחופים.",
        link: "https://www.google.com/maps/search/Ureki+beach",
        linkLabel: N.ureki,
      },
      {
        name: N.tsitsinatela,
        description: "פארק שעשועים על החוף.",
        link: "https://www.google.com/maps/search/Tsitsinatela+amusement+park",
        linkLabel: N.tsitsinatela,
      },
      {
        name: N.batumiDolphinarium,
        description:
          "מופע דולפינים מרהיב – להזמין מקומות מראש. אחרי ההרים והטרקים – יום מנוחה, בריכות וטיילת.",
        link: "https://www.google.com/maps/search/Batumi+Dolphinarium",
        linkLabel: N.batumiDolphinarium,
        image: "IMG.batumi",
      },
      {
        name: N.batumiOldTown,
        description: "ארוחת סיום חגיגית – חינקלי.",
        link: "https://www.google.com/maps/search/Batumi+old+town",
        linkLabel: N.batumiOldTown,
      },
    ],
    restaurants: [
      {
        name: fmt("חינקלי בעיר העתיקה", "Khinkali in Old Town", "ხინკali ძველ ქალაქში"),
        cuisine: "גיאורגית – חינקלי",
        note: "ארוחת סיום חגיגית",
        link: "https://www.google.com/maps/search/khinkali+Batumi+old+town",
        image: "IMG.khinkali",
      },
    ],
    hotels: [
      {
        name: N.batumi,
        area: fmt("באטומי – לילה אחרון", "Batumi – last night", "ბათუმი – ბოლო ღამე"),
        nights: 1,
        link: "https://www.google.com/maps/search/hotels+Batumi+center",
        image: "IMG.batumi",
      },
    ],
    mapPoints: [
      { name: N.anaklia, lat: 42.3917, lng: 41.5583 },
      { name: N.ureki, lat: 41.9833, lng: 41.6167 },
      { name: N.batumi, lat: 41.6168, lng: 41.6367 },
    ],
  },
  {
    id: 13,
    date: "5.10",
    weekday: "שני",
    title: fmt("המראה חזרה", "Departure", "გამგზავრება"),
    emoji: "✈️",
    theme: fmt("חזרה הביתה", "Heading home", "სახლში დაბრუნება"),
    overnight: "—",
    driving: "כ-15 דק' (10 ק\"מ)",
    summary: "השכמה מוקדמת, החזרת רכב, המראה 09:35.",
    activities: [
      {
        name: N.batumiAirport,
        description: "החזרת רכב שכור, check-in, המראה 09:35.",
        link: "https://www.google.com/maps/search/Batumi+International+Airport",
        linkLabel: N.batumiAirport,
      },
    ],
    mapPoints: [{ name: N.batumiAirport, lat: 41.6103, lng: 41.5997 }],
  },
];

const LOGISTICS = {
  tasks: [
    {
      id: "car-rental",
      label: fmt("השכרת רכב", "Car rental", "ავტომობილის ქირა"),
      note: fmt("SUV · איסוף BUS 23.9 · החזרה 5.10 · ביטוח מלא", "SUV · pick-up BUS Sep 23 · return Oct 5 · full insurance", "SUV · BUS · CDW"),
      link: "#rental",
      linkLabel: fmt("פרטי רכב שכור", "Rental details", "ქირავნობა"),
    },
    {
      id: "hotels",
      label: fmt("מלונות", "Hotels", "სასტუმროები"),
      note: fmt("12 לילות · ראו טבלת לינות למטה (יום 5: צקאלטובו/Okatse)", "12 nights · see table (day 5: Tskaltubo/Okatse)", "12 ღამე"),
      link: "#accommodation",
      linkLabel: fmt("סיכום לינות", "Accommodation summary", "განთავსება"),
    },
    {
      id: "drone-license",
      label: fmt("רישיון וביטוח רחפן", "Drone registration & insurance", "UAS რეგისტრაცია"),
      note: fmt("רישום GCAA + ביטוח צד ג' לרחפן", "GCAA registration + third-party drone insurance", "GCAA + დაზღვევა"),
      link: "#drones",
      linkLabel: fmt("כללי רחפן", "Drone rules", "UAS"),
    },
    {
      id: "travel-insurance",
      label: fmt("ביטוח נסיעות", "Travel insurance", "სამოგზაურო დაზღვევა"),
      note: fmt(
        "כיסוי רפואי, ביטול, ציוד – לוודא כולל נהיגה בחו\"ל ופעילות אקסטרים",
        "Medical, cancellation, gear – confirm driving abroad & adventure cover",
        "დაზღვევა + ექსტremi"
      ),
    },
    {
      id: "extra-luggage",
      label: fmt("הוספת מזוודות", "Extra baggage", "დამატებითი ბagage"),
      note: fmt("LY386/387 · לבדוק מול El Al לפני check-in", "LY386/387 · confirm with El Al before check-in", "El Al LY386/387"),
      link: "#flights",
      linkLabel: fmt("פרטי טיסות", "Flight details", "რეისები"),
    },
  ],
  rentalCars: [
    {
      name: fmt("איסוף והחזרה בשדה התעופה באטומי", "Pick-up & drop-off at Batumi Airport", "აღება და დაბრუნება ბათუმის აეროპორტში"),
      details: `מומלץ SUV – כבישים הרריים, שטח בדרך ל${N.ushguli.split(" · ")[0]}. איסוף ביום 1 (23.9) אחרי הנחיתה, החזרה ביום 13 (5.10) לפני ההמראה.`,
      tips: [
        "להזמין מראש – עונת ספטמבר-אוקטובר",
        "ביטוח מלא (CDW) מומלץ מאוד",
        "רישיון נהיגה בינלאומי + רישיון ישראלי",
        "GPS / Waze – עובד מצוין בגיאורגיה",
      ],
      links: [
        { label: "Rentalcars.com", url: "https://www.rentalcars.com/" },
        { label: "Localrent Georgia", url: "https://localrent.com/ge/" },
        { label: "Economy Bookings", url: "https://www.economybookings.com/" },
      ],
    },
    {
      name: fmt("דרישות נהיגה", "Driving requirements", "მართვის მოთხოვნები"),
      details: "נהיגה בצד ימין. מהירות מקסימלית בכבישים ראשיים ~80–110 קמ\"ש. דלק זול יחסית.",
      tips: [
        `כבישים ל${N.svaneti.split(" · ")[0]} – מפותלים, לנהוג בזהירות`,
        "חניה בערים – בדרך כלל קלה",
        "שמירת דלק – תחנות דלק נדירות באזורים מרוחקים",
      ],
    },
  ],
  drones: {
    summary: "גיאורגיה מסדירה רחפנים לפי תקני EASA (דומה לאירופה). חובה לבדוק מפה רשמית לפני כל טיסה.",
    rules: [
      "גובה מקסימלי: 120 מטר מעל קרקע",
      "VLOS – שמירה על קשר עין עם הרחפן",
      "רישום GCAA נדרש לרחפנים מעל 250 גרם או עם מצלמה",
      "אסור לטוס באזורים מוגבלים: בסיסים צבאיים, שדות תעופה, אירועים ציבוריים",
      fmt("פארקים לאומיים ומרכז היסטורי של טבילisi – דורשים אישור", "National parks & Tbilisi old town require permit", "ერovnuli parkები და თbilisi ისტ. ცენტrი – საჭირoებს ნებართვას"),
      "לסמן את הרחפן במספר רישום",
    ],
    links: [
      { label: fmt("GCAA – רישום רחפנים", "GCAA – Drone registration", "GCAA – UAS რეგისტრაცია"), url: "https://uas.gov.ge/EN" },
      { label: fmt("מפת מרחב אוויר", "Airspace map", "საჰაერო სივრცის რუკა"), url: "https://airspace.gov.ge/" },
      { label: "Drone Traveller – Georgia", url: "https://drone-traveller.com/drone-laws-georgia/" },
    ],
  },
  packing: [
    "דרכונים – בתוקף לכל הטיול (+ צילום/עותק דיגיטלי)",
    "בגדים לשכבות – בוקר קר בהרים, צהריים חמים",
    fmt("נעלי hiking לטרקים (צ'לאדי, שדוגרה)", "Hiking boots (Chalaadi, Shdugra)", "ლაშქრობის ფეხსacmebi"),
    fmt("מעיל גשם – מטיראלה וסוואנטי", "Rain jacket – Mtirala & Svaneti", "საწუმიმარი – მთირალა და სვანეთი"),
    fmt("בגד ים – אנאקליה, אורקי", "Swimsuit – Anaklia, Ureki", "საცულაური – ანაკლია, ურეკი"),
    "קרם הגנה – שמש חזקה בהרים ובחוף",
    "שקית waterproof גדולה – תיק / בגדים במטיראלה, טרקים וגשם",
    "שקית waterproof לטלפון – רפטינג, קניונים, מטיראלה",
    "מטען לרכב / adapter (שקע אירופאי Type C/F)",
    "SIM מקומי או eSIM – Magti, Cellfie",
  ],
  emergency: [
    { label: fmt("חירום כללי", "Emergency", "გადაუდებელი"), value: "112" },
    { label: fmt("משטרה", "Police", "პოლიცია"), value: "112" },
    { label: fmt("שגרירות ישראל בטבילisi", "Israeli Embassy in Tbilisi", "იზრაელის ელჩობა ყბილისში"), value: "+995 32 291 3000" },
  ],
  privateDrivers: [
    {
      name: "Vakhtang (וואחו)",
      phone: "+995 591 22 55 24",
      whatsapp: "https://wa.me/995591225524",
      viber: "viber://chat?number=%2B995591225524",
      note: fmt(
        "נהג פרטי מומלץ – נעים, סבלני, מקצועי. מכיר דרכים, מסעדות טובות. זמין ב-WhatsApp וב-Viber. (המלצה מטיול משפחתי – לופוטה עד באטומי)",
        "Recommended private driver – patient, professional, knows roads & restaurants. WhatsApp & Viber.",
        "რекომენდებული მძღოლი"
      ),
      region: fmt("מזרח גאורגיה / כבישים ארוכים", "Eastern Georgia / long transfers", "აღმოსავლეთი"),
    },
    {
      name: fmt("Bacho Tsotsoria – טיולי ג'יפ", "Bacho Tsotsoria – jeep tours", "Bacho Tsotsoria"),
      phone: null,
      facebook: "https://www.facebook.com/search/top?q=Bacho%20Tsotsoria",
      note: fmt(
        "מדריך מקומי באזור קוטאיסי – ג'יפ בין מפלים, מים וטבע. אחד הטיולים שהכי נהנו מהם באזור. לחפש בפייסבוק.",
        "Local guide near Kutaisi – jeep between waterfalls & wild nature. Search on Facebook.",
        "ჯიპ-ტური კუთაისის რეგიონში"
      ),
      region: fmt(`אזור ${N.kutaisi.split(" · ")[0]}`, "Kutaisi / Imereti area", "იმერეთი"),
    },
  ],
  accommodationSummary: [
    { place: N.batumi, nights: 2, note: "לילה ראשון + אחרון" },
    { place: N.kutaisi, nights: 1, note: "יום 2" },
    { place: N.chiatura, nights: 1, note: "יום 3 – אזור צ'יאתורה" },
    {
      place: `${N.ambrolauri} / ${N.adventureCamping}`,
      nights: 1,
      note: "יום 4 – אמברולאורי או Adventure Camping (רפטינג + קניונינג)",
    },
    { place: `${N.tskaltubo} / ${N.okatseCanyon}`, nights: 1, note: "יום 5 – בלי חזרה לזוגדידי" },
    { place: N.zugdidi, nights: 1, note: "יום 6 – לפני סוואנטי" },
    { place: `${N.mestia}, ${N.svaneti}`, nights: 2, note: "ימים 7–8" },
    { place: N.mazeriCabin, nights: 2, note: "בקתה / גסטהאוס – ימים 9–10" },
    { place: N.anaklia, nights: 1, note: fmt("ים השחור", "Black Sea", "შავი ზღვა") },
  ],
};

if (typeof module !== "undefined") module.exports = { TRIP_META, ROUTE_COORDS, DAYS, LOGISTICS };

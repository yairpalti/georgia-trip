/** תיאורים מפורטים, תמונות ולינקים לפעילויות – ממוזגים ב-enrichDay() */
const ACTIVITY_DETAILS = {
  1: [
    {
      description:
        "נחיתה בשעה 18:10 ב-BUS. איסוף רכב SUV (מומלץ להזמין מראש עם ביטוח מלא). נסיעה של כ-10 ק\"מ / 15–20 דק' למרכז באטומי. בדרך: נוף ראשון לים השחור, שלטי גיאורגית-אנגלית. לצלם את מצב הרכב לפני יציאה, לוודא USB/מטען.",
      image: "IMG.batumiAirport",
      link: "https://www.google.com/maps/search/Batumi+International+Airport",
      linkLabel: N.batumiAirport,
    },
    {
      description:
        "הליכה על טיילת הבוליבארד – כ-2–3 שעות בקצב נוח. רואים: מגדלור, פסל Ali & Nino, dolphinarium, מסעדות על הים. ארוחת ערב ראשונה – חצ'פורי אג'רי (ביצת עין במרכז). מרחק הליכה: 3–5 ק\"מ לאורך הטיילת.",
      image: "IMG.batumiBoulevard",
      link: "https://www.google.com/maps/search/Batumi+Boulevard",
      linkLabel: N.batumiBoulevard,
    },
  ],
  2: [
    {
      description:
        "יציאה מבאטומי ב-08:00. נסיעה ~80 ק\"מ / 1.5 ש' ל-Chakvistavi. מסלול Tsablnari (7 ק\"מ, קל): כרמלית ₾2 → zipline ₾15 (~220 מ') → Rope Park ₾15–20 → מפל Tsablnari / אגם. יער Colchic – מעיל גשם חובה!",
      image: "IMG.mtirala",
      tips: [
        "Mapy.cz offline – קליטה חלקית",
        "zipline & Rope Park: מאי–אוקטובר",
        "בגד ים לשחייה באגם",
      ],
      links: [
        {
          label: fmt("Zipline & מחירים – APA", "Zipline & prices – APA", "APA"),
          url: "https://apa.gov.ge/en/eco-tourism/servisebi-da-tarifebi/mtiralas-erovnuli-parki",
        },
        {
          label: fmt("מסלול Tsablnari – APA", "Tsablnari Trail – APA", "APA"),
          url: "https://apa.gov.ge/en/eco-tourism/Trails/mtiralas-erovnuli-parkis-turistuli-bilikebi-satesto/1-wablnaris-biliki",
        },
        {
          label: fmt("Mapy.cz – מפת טיול רגלי", "Mapy.cz – hiking map", "Mapy.cz"),
          url: "https://mapy.cz/turisticka?x=41.9840000&y=41.8820000&z=15&source=czpub&id=ostredni",
        },
        { label: "Visit Adjara – Mtirala", url: "https://visitajara.com/en/sights/77" },
      ],
      gallery: [
        { src: "IMG.mtirala", caption: fmt("יער גשם Mtirala", "Mtirala rainforest", "მტირალა") },
        { src: "IMG.mtiralaWaterfall", caption: fmt("מפל Tsablnari", "Tsablnari waterfall", "წაბლნარის ჩანჩქერი") },
        { src: "IMG.mtiralaForest", caption: fmt("שביל ביער", "Forest trail", "ტყის ბილიკი") },
      ],
    },
    {
      description:
        "אחר הצהריים: ~90 ק\"מ / 2 ש' לקוטאיסי. ערב: גשר הלב, גשר הזכוכית, Bagrati Cathedral (UNESCO), מזרקת Colchis. בסיס ל-2 לילות.",
      image: "IMG.kutaisiBagrati",
      tips: ["SIAM Thai ליד גשר הלב – הפסקה מהגיאורגית", "חניה במרכז – בדרך כלל קלה"],
      links: [
        {
          label: fmt("Mapy.cz – סיור ערב", "Mapy.cz – evening walk", "Mapy.cz"),
          url: "https://mapy.cz/turisticka?x=42.6946000&y=42.2679000&z=15",
        },
        {
          label: fmt("Bagrati Cathedral", "Bagrati Cathedral", "ბაგრატი"),
          url: "https://www.google.com/maps/search/Bagrati+Cathedral+Kutaisi",
        },
        {
          label: fmt("גשר הלב", "White Bridge", "თეთრი ხიდი"),
          url: "https://www.google.com/maps/search/Kutaisi+White+Bridge",
        },
      ],
      gallery: [
        { src: "IMG.kutaisiBagrati", caption: fmt("Bagrati Cathedral", "Bagrati Cathedral", "ბაგრატი") },
        { src: "IMG.kutaisi", caption: fmt("מרכז קוטאיסי", "Kutaisi center", "ქუთაისი") },
      ],
    },
  ],
  3: [
    {
      description:
        "יציאה מקוטאיסי ~09:00. נסיעה 30 ק\"מ / 40 דק' לעמוד קצחי – סלע אבן גיר בגובה 40 מ' עם מנזר קטן בראש (נגיש רק לנזיר אחד!). עצירת צילום מהכביש, אין צורך בטיפוס. נוף לעמק Imereti.",
      image: "IMG.katskhi",
      link: "https://www.google.com/maps/search/Katskhi+Pillar",
      linkLabel: N.katskhiPillar,
    },
    {
      description:
        "המשך 25 ק\"מ / 35 דק' לצ'יאתורה – עיירת מכרות מanganese עם עשרות רכבלים סובייטיים. Urbex: רכבל Sanatorium (הכי מפורסם), תחנות נטושות, פסיפסים, שכונות על המדרון. הליכה בעיר 1–2 ש' בין נקודות צילום. רכבל – מרגש, ישן, לבדוק בטיחות.",
      image: "IMG.chiatura",
      link: "https://www.google.com/maps/search/Chiatura+cable+car",
      linkLabel: N.chiatura,
    },
    {
      description:
        "ארוחת צהריים אצל Lia – חוויה ביתית אותנטית (jonjoli, khachapuri, mtsvadi). חובה WhatsApp מראש! נסיעה ~15 ק\"מ מהאזור. 1–1.5 ש' ארוחה.",
      image: "IMG.supra",
      link: "https://www.google.com/maps/search/Lunch+at+Lia+Georgia",
      linkLabel: N.lunchAtLia,
    },
    {
      description:
        "סיום ב-15:00 – מנזר מגווימבי, חצוב בסלע (~20 ק\"מ / 30 דק' מ-Lia). לינה באזור צ'יאתורה – בלי חזרה לקוטאיסי.",
      image: "IMG.mgvimevi",
      link: "https://www.google.com/maps/search/Mgvimevi+Convent",
      linkLabel: N.mgvimevi,
    },
  ],
  4: [
    {
      description:
        "יציאה מצ'יאתורה. אופציה ג': הגעה ל-Adventure Camping עד 12:00 (הכנה לרפטינג 12:30). אופציות א'/ב': נסיעה ישירה לנקודת רפטינג (~1–1.5 ש').",
      image: "IMG.racha",
      link: "https://www.google.com/maps/place/Adventure+Camping/@42.5582341,42.8517484,17z",
      linkLabel: N.adventureCamping,
    },
    {
      description:
        "רפטינג Rioni: 14 ק\"מ, רמה II–III, 2ש'20 על המים, ₾150. הסעה מהמחנה לנקודת היציאה ובחזרה, מדריך IRF, Neoprene 5mm. סיור קבוצתי – עד 6 + מדריך בסירה.",
      image: "IMG.rafting",
      link: "https://www.raftinginkutaisi.com/trip/rafting-on-the-rioni-river/",
      linkLabel: "Rafting in Kutaisi – ₾150",
    },
    {
      description:
        "אחרי רפטינג (אופציה א') – עצירה במאגר שאורי – תצפית, 10–15 דק' צילום. נסיעה לאמברולאורי.",
      image: "IMG.racha",
      link: "https://www.google.com/maps/search/Shaori+Reservoir",
      linkLabel: N.shaoriReservoir,
    },
    {
      description:
        "ביקור ביקב Khvanchkara (אופציה א') – יין חצי-מתוק. לא לנהוג אחרי! אופציה ג': ערב במחנה – מסעדה + לינה בקוטג' (₾250) או אוהלים.",
      image: "IMG.wine",
      link: "https://www.google.com/maps/search/Khvanchkara+Winery",
      linkLabel: N.khvanchkaraWinery,
    },
  ],
  5: [
    {
      description:
        "אם לנו ב-Adventure Camping: בוקר קניונינג פרטי ליד המחנה – צוקים, בריכות, חבלים. סניקרס חובה; שאר הציוד במקום. WhatsApp +995 595 41 15 47.",
      image: "IMG.rafting",
      link: "https://www.raftinginkutaisi.com/trip/canyoning-on-the-shareula-river/",
      linkLabel: N.raftingInKutaisi + " – Canyoning",
    },
    {
      description:
        "יציאה מהמחנה או מאמברולאורי לצקאלטובו – עיירת סנטוריומים סובייטיים נטושים. Urbex 2–3 ש'. זהירות: מבנים לא יציבים.",
      image: "IMG.tskaltubo",
      link: "https://www.google.com/maps/search/Tskaltubo+sanatorium",
      linkLabel: N.tskaltubo,
    },
    {
      description:
        "המשך למערת פרומתאוס – ~1.6 ק\"מ מסלול, ~14°C – סווטר חובה. לינה באזור צקאלטובו או ממשיכים ל-Okatse – לא לזוגדידי.",
      image: "IMG.prometheus",
      link: "https://www.google.com/maps/search/Prometheus+Cave+Georgia",
      linkLabel: N.prometheusCave,
    },
  ],
  6: [
    {
      description:
        "בוקר – קניון אוקאצה. יוצאים מלינת יום 5 (צקאלטובו ~30–40 דק' / או ישירות מ-Okatse). מסלול מדרגות + גשר תלוי 780 מ'. הליכה 1.5–2 ש' H/R. לא לפחד גובה.",
      image: "IMG.okatse",
      link: "https://www.google.com/maps/search/Okatse+Canyon",
      linkLabel: N.okatseCanyon,
    },
    {
      description:
        "צהריים – קניון מרטווילי, ~15 ק\"מ מ-Okatse. שייט סירות 30–45 דק' במים טורקיז בין צוקים. כרטיסים בכניסה, עמוס 12:00–15:00.",
      image: "IMG.martvili",
      link: "https://www.google.com/maps/search/Martvili+Canyon",
      linkLabel: N.martviliCanyon,
    },
    {
      description:
        "אחר הצהריים – מעיינות חמים נוקאלאקווי. נסיעה ~20 ק\"מ, הליכה 10 דק' לבריכות טבעיות. בגד ים, מגבת. אחר כך נסיעה לזוגדידי ללינה (יציאה לסוואנטי מחר).",
      image: "IMG.nokalakevi",
      link: "https://www.google.com/maps/search/Nokalakevi+Hot+Springs",
      linkLabel: N.nokalakeviHotSprings,
    },
  ],
  7: [
    { image: "IMG.zugdidi" },
    { image: "IMG.enguriDam" },
    { image: "IMG.supra" },
    { image: "IMG.mestia" },
    { image: "IMG.mestia" },
    { image: "IMG.supra" },
  ],
  8: [
    {
      description:
        "08:00 – ג'יפ 4×4 עם נהג מקומי ממסטיה (להזמין מראש, ~150–200 ₾/רכב). נסיעה 45 ק\"מ / 2–2.5 ש' על כביש עפר לאושגולi – הכפר המיושb ב-Europa (2,200 מ'). רואים: מגדלי Svanetian, בקתות אבן, נוף ל-Shkhara. עצירות: Zhabeshi, Adishi (אם טrek multi-day).",
      image: "IMG.ushguli",
      link: "https://www.google.com/maps/search/Ushguli",
      linkLabel: N.ushguli,
    },
    {
      description:
        "מאושגולi – רכיבה על סוסים (~20–30 ₾) או הליכה 3–4 ש' H/R לקרחון Shkhara (5,193 מ'). מסלול יחסית שטוח לאורך העמק, נוף לפסגות מושלגות. חזרה בג'יפ למסטיה – 14:00–16:00.",
      image: "IMG.shkhara",
      link: "https://www.google.com/maps/search/Shkhara+Glacier",
      linkLabel: N.shkharaGlacier,
    },
  ],
  9: [
    {
      description:
        "08:00 – יציאה ממסטיה לטרק Chalaadi. חניה בכניסה, הליכה 3–4 ש' H/R (14 ק\"מ, עלייה ~400 מ') דרך יער אל לשon הקרחון. נוף ל-Ushba. נעליים waterproof, מים, snacks.",
      image: "IMG.chalaadi",
      link: "https://www.google.com/maps/search/Chalaadi+Glacier+trail",
      linkLabel: N.chalaadiGlacier,
    },
    {
      description:
        "13:00 – איסוף ציוד, נסיעה 25 ק\"מ / 45 דק' למאזרi (Becho Valley). check-in בבקתה/גסטהאוס – נוף ישיר ל-Ushba. לקנות אוכל במסטיה לפני! ערב שקט בטבע.",
      image: "IMG.ushba",
      link: "https://www.google.com/maps/search/guesthouse+Mazeri+Becho",
      linkLabel: N.mazeri,
    },
  ],
  10: [
    {
      description:
        "07:30 – יציאה מהבקתה למפל Shdugra. מסלול 8–10 ק\"מ H/R, 4–5 ש', עלייה ~600 מ'. עוברים ביער, גשרים, נקודת תצפית על המפל (~525 מ' גובה!). מקלות, מים, שכבת גשם. לא לטפס לבסיס המפל.",
      image: "IMG.shdugra",
      link: "https://www.google.com/maps/search/Shdugra+Waterfall+trail",
      linkLabel: N.shdugraWaterfall,
    },
    {
      description:
        "אחר הצהריים – חזרה לבקתה, מקלחת, מנוחה. הליכה קלה בעמק Becho (אופציונלי, 1 ש'). לילה שני – הכנה לנסיעה ארוכה מחר.",
      image: "IMG.ushba",
      link: "https://www.google.com/maps/search/Becho+Valley+Mazeri",
      linkLabel: N.bechoValley,
    },
  ],
  11: [
    {
      description:
        "08:00 – יציאה ממאזרi. ג'יפ/רכב ל-Koruldi Lakes (2,850 מ') – 1.5 ש' על כביש עפר. אגמים alpine, נוף 360° ל-Ushba. 45–60 דק' צילום. יורדים למסטיה, ממשיכים דרומה.",
      image: "IMG.koruldi",
      link: "https://www.google.com/maps/search/Koruldi+Lakes",
      linkLabel: N.koruldiLakes,
    },
    {
      description:
        "11:30 – עצירה בזוגדידi: ארמון Dadiani (מוזיאון, גנים – שעות 10:00–17:00, כרטיסים ~10 ₾). הליכה 1–1.5 ש' בין האולמות. ארוחת צהריים בעיר.",
      image: "IMG.dadiani",
      link: "https://www.google.com/maps/search/Dadiani+Palace+Zugdidi",
      linkLabel: N.dadianiPalace,
    },
    {
      description:
        "14:00 – נסיעה 140 ק\"מ / 2.5 ש' לאנaklia על הים השחור. check-in, חוף, ארוחת ערב. הליכה על הטיילת, גשר לים.",
      image: "IMG.anaklia",
      link: "https://www.google.com/maps/search/Anaklia+beach",
      linkLabel: N.anaklia,
    },
  ],
  12: [
    {
      description:
        "09:00 – יציאה מאנaklia. עצירה באורקi/שקווטili (60 ק\"מ) – חוף חול מגנטי שחור, אופנועי ים, parasailing (לסגור מחיר). 2–3 ש' על החוף.",
      image: "IMG.ureki",
      link: "https://www.google.com/maps/search/Ureki+beach",
      linkLabel: N.ureki,
    },
    {
      description:
        "13:30 – Tsitsinatela, 15 ק\"מ מבאטומי. פארק שעשועים: רכבל, roller coaster, מתקנים. 2–3 ש'. כרטיסיםים בכניסה / online.",
      image: "IMG.tsitsinatela",
      link: "https://www.google.com/maps/search/Tsitsinatela+Georgia",
      linkLabel: N.tsitsinatela,
    },
    {
      description:
        "18:00 – באטומי Old Town. ארוחת סיום – חינkali (כיסים במילוי בשר). הליכה 1–2 ש' בסמטאות, קניות אחרונות.",
      image: "IMG.batumiOldTown",
      link: "https://www.google.com/maps/search/Batumi+old+town+restaurants",
      linkLabel: N.batumiOldTown,
    },
  ],
  13: [
    {
      description:
        "06:00 – השכמה. ארוחת בוקר, check-out. נסיעה 10 ק\"מ / 15 דק' לשדה. החזרת רכב (דלק מלא!), check-in, המראה 09:35 LY5114. להגיע 2 ש' לפני.",
      image: "IMG.batumiAirport",
      link: "https://www.google.com/maps/search/Batumi+International+Airport",
      linkLabel: N.batumiAirport,
    },
  ],
};

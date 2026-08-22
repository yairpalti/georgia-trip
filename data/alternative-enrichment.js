/** תוכניות חלופיות מפורטות – במיוחד אופציה ב' בימים 3–4 */
const ALTERNATIVE_ENRICHMENT = {
  3: {
    0: {
      driving: "כ-130 ק\"מ מעגל · 4 עצירות · ~2 ש' נסיעה",
      description:
        "התכנון המקורי – יום תרבות ו-Urbex מלא. מתאים למי שרוצה לראות את צ'יאתורה האגדית, לאכול אצל Lia, ולסיים במנזר מגווימבי. נסיעה ארוכה יותר אבל מגוון מקסימלי.",
      image: "IMG.chiatura",
      tips: [
        "Lunch at Lia – WhatsApp מראש חובה",
        "רכבל Sanatorium – לבדוק שעות פעילות",
        "להתחיל ב-08:30–09:00",
      ],
      activities: [
        {
          name: N.katskhiPillar,
          timeOfDay: "09:00–10:00",
          duration: "45 דק'",
          description: "30 ק\"מ מקוטאיסי, עצירת צילום מהכביש.",
          link: "https://www.google.com/maps/search/Katskhi+Pillar",
          linkLabel: N.katskhiPillar,
          image: "IMG.katskhi",
        },
        {
          name: N.chiatura,
          timeOfDay: "10:30–13:00",
          duration: "2–2.5 ש'",
          description: "Urbex, רכבל Sanatorium, הליכה בעיר.",
          link: "https://www.google.com/maps/search/Chiatura+cable+car",
          linkLabel: N.chiatura,
          image: "IMG.chiatura",
        },
        {
          name: N.lunchAtLia,
          timeOfDay: "13:00–14:30",
          duration: "1.5 ש'",
          description: "ארוחה ביתית – WhatsApp מראש!",
          link: "https://www.google.com/maps/search/Lunch+at+Lia+Georgia",
          linkLabel: N.lunchAtLia,
          image: "IMG.supra",
        },
        {
          name: N.mgvimevi,
          timeOfDay: "15:00–16:00",
          duration: "45 דק'",
          description: "מנזר חצוב בסלע, חזרה לקוטאיסי.",
          link: "https://www.google.com/maps/search/Mgvimevi+Convent",
          linkLabel: N.mgvimevi,
          image: "IMG.mgvimevi",
        },
      ],
    },
    1: {
      driving: "כ-180 ק\"מ · יום מלא · חזרה ~19:00–20:00 לקוטאיסי",
      description:
        "אופציה ב' – יום אקסטרים עם Rafting in Kutaisi. Via Ferrata הראשון בקווקז בכפר Sveri (אזור צ'יאתורה). כולל: הסעה, הדרכה, ארוחה, טיפוס 2–2.5 ש', שחייה בנהר Sadzaliskevi, BBQ. אופציונלי: גיחה קצרה לקצחי בחזרה.",
      image: "IMG.rafting",
      link: "https://www.raftinginkutaisi.com/trip/via-ferrata-in-georgia/",
      linkLabel: "Rafting in Kutaisi – Via Ferrata",
      tips: [
        "להזמין מראש – +995 595 41 15 47 (WhatsApp/Viber)",
        "בגד סport מתחת לציוד, נעליים סגורות",
        "לא מתאים לפחד גובה קיצוני",
        "בדרך לSveri – עצירה לצילום קצחי מהכביש",
      ],
      activities: [
        {
          name: fmt("איסוף והסעה ל-Sveri", "Transfer to Sveri", "Sveri"),
          timeOfDay: "09:00–11:00",
          duration: "2 ש' נסיעה",
          description:
            "יציאה מקוטאיסי (או מהמלון). 110 ק\"מ / ~2 ש' לכפר Sveri. בדרך: עמוד קצחי – עצירת צילום 15 דק'.",
          link: "https://www.google.com/maps/search/Sveri+Georgia",
          linkLabel: "Sveri – מפה",
          image: "IMG.katskhi",
        },
        {
          name: "Via Ferrata – Sveri Adventure Camp",
          timeOfDay: "11:30–14:00",
          duration: "2–2.5 ש'",
          description:
            "הדרכה על רתמות וcarabiners, הליכה 20 דק' לנקודת הטיפוס. טיפוס על סולמות ברזל בבקעה – 2–2.5 ש' עם מדריך. מעבר במערות קצרות בסלע.",
          link: "https://www.raftinginkutaisi.com/trip/via-ferrata-in-georgia/",
          linkLabel: "Via Ferrata – פרטים",
          image: "IMG.rafting",
        },
        {
          name: fmt("שחייה + BBQ", "River pool & picnic", "ცურვა და BBQ"),
          timeOfDay: "14:00–16:00",
          duration: "1.5–2 ש'",
          description:
            "שחייה בבריכת נהר Sadzaliskevi (מפלים!). ארוחת BBQ: jonjoli, ekala, גבינה אימרתית, khachapuri, limonada ביתית.",
          image: "IMG.supra",
        },
        {
          name: fmt("גיחה לקצחי (אופציונלי)", "Katskhi stop (optional)", "კაცხი"),
          timeOfDay: "16:30–17:15",
          duration: "45 דק'",
          description: "אם נשאר זמן בחזרה – עצירה נוספת לצילום עמוד קצחי.",
          link: "https://www.google.com/maps/search/Katskhi+Pillar",
          linkLabel: N.katskhiPillar,
          image: "IMG.katskhi",
        },
        {
          name: fmt("חזרה לקוטאיסי", "Return to Kutaisi", "ქუთაისი"),
          timeOfDay: "17:15–19:00",
          duration: "1.5–2 ש'",
          description: "הסעה חזרה למלון. ארוחת ערב בקוטאיסי (Palaty / Sapere).",
          link: "https://www.google.com/maps/search/hotels+Kutaisi",
          linkLabel: N.kutaisi,
          image: "IMG.kutaisi",
        },
      ],
    },
  },
  4: {
    0: {
      driving: "כ-100 ק\"מ · רפטינג + ראצ'ה · ~2 ש' נסיעה",
      description:
        "התכנון המקורי – יום משפחתי-נופי. רפטינג רגוע (2–3), עלייה לראצ'ה, תצפית במאגר שאורי, יין Khvanchkara. פחות מאתגר, יותר נוף ותרבות.",
      image: "IMG.racha",
      tips: ["רפטינג – להזמין מראש", "יין – לא לנהוג אחרי", "כבישים מפותלים"],
      activities: [
        {
          name: fmt("רפטינג על הריוני", "Rioni rafting", "rafting"),
          timeOfDay: "09:00–12:00",
          duration: "2.5–3 ש'",
          description: "23 ק\"מ, רמה 2–3, ציוד מלא.",
          link: "https://www.raftinginkutaisi.com/trip/rafting-on-the-rioni-river/",
          linkLabel: "Rafting in Kutaisi",
          image: "IMG.rafting",
        },
        {
          name: N.shaoriReservoir,
          timeOfDay: "13:30–14:30",
          duration: "45 דק'",
          description: "תצפית על האגם הירוק.",
          link: "https://www.google.com/maps/search/Shaori+Reservoir",
          linkLabel: N.shaoriReservoir,
          image: "IMG.racha",
        },
        {
          name: N.khvanchkaraWinery,
          timeOfDay: "15:00–17:00",
          duration: "1.5 ש'",
          description: "טעימות יין, לינה באמברולאורי.",
          link: "https://www.google.com/maps/search/Khvanchkara+Winery",
          linkLabel: N.khvanchkaraWinery,
          image: "IMG.wine",
        },
      ],
    },
    1: {
      driving: "יום מלא · ~12–14 ש' · אמברולאורי בערב",
      description:
        "אופציה ב' – יום אקסטרים כפול! Rafting in Kutaisi מארגנים: בוקר – רפטינג על הריוני (23 ק\"מ), אחר הצהריים – קניונינg בנהר Shareula (ראצ'ה): מפלים, קפיצות למים, ירידות בחבל. יום ארוך ומאתגר – לחובבי אדרנalin.",
      image: "IMG.rafting",
      link: "https://www.raftinginkutaisi.com/trip/canyoning-on-the-shareula-river/",
      linkLabel: "Rafting in Kutaisi – Canyoning Shareula",
      tips: [
        "להזמין יום מלא מראש – raftinginkutaisi.com",
        "בגדים להחלפה + נעליים סגורות",
        "רמה בינונית–גבוהה – לא לילדים קטנים",
        "מגיעים לאמברולאורי בערב – לינה מוכנה מראש",
      ],
      activities: [
        {
          name: fmt("רפטינג – נהר הריוני", "Rioni River rafting", "rafting"),
          timeOfDay: "08:00–12:00",
          duration: "3–4 ש'",
          description:
            "יציאה מקוטאיסי / נקודת מפגש. נסיעה לראצ'ה, ירידה 23 ק\"מ על הריוני – רapids, ציוד neoprene מלא. הפסקה לארוחה.",
          link: "https://www.raftinginkutaisi.com/trip/rafting-on-the-rioni-river/",
          linkLabel: "Rioni rafting",
          image: "IMG.rafting",
        },
        {
          name: fmt("קניונינg – Shareula", "Shareula canyoning", "Shareula"),
          timeOfDay: "13:00–17:00",
          duration: "3–4 ש'",
          description:
            "הליכה בקניון נהר שאראולה. מפלים, בריכות טורקיז, קפיצות למים (אופציונלי), rappelling בחבל. מדריך + ציוד מלא.",
          link: "https://www.raftinginkutaisi.com/trip/canyoning-on-the-shareula-river/",
          linkLabel: N.shareulaRiver,
          image: "IMG.racha",
        },
        {
          name: fmt("הגעה לאמברולאורי", "Arrival Ambrolauri", "ამბროლauri"),
          timeOfDay: "18:00–19:00",
          duration: "1 ש'",
          description: "נסיעה ללינה. ארוחת ערב, מנוחה – מחר צקאלטובו ופרומתאוס.",
          link: "https://www.google.com/maps/search/hotels+Ambrolauri",
          linkLabel: N.ambrolauri,
          image: "IMG.racha",
        },
      ],
    },
  },
};

/** מדריך מלא – יום 2: פארק מטיראלה + קוטאיסי */
const MTIRALA_KUTAISI = {
  relatedDays: [2],
  mtirala: {
    name: N.mtirala,
    tagline: fmt("יער הגשם – אחד הגשומים בגיאורגיה", "Rainforest – one of Georgia's wettest places", "მტირალა – წვიმის ტყე"),
    summary:
      "פארק לאומי בגודל 15,700 הקטר בדרום-מערב גיאורגיה (אד'ריה). השם «מטיראלה» = «בוכה» – ערפל, לחות וטיפות מהעצים יוצרים תחושת גשם מתמיד. מרכז מבקרים בכפר Chakvistavi, ~25 ק\"מ מבאטומי (~80 ק\"מ / 1.5 ש' נסיעה).",
    visitorCenter: fmt("Chakvistavi – מרכז מבקרים", "Chakvistavi Visitor Center", "ჭაკვისთავი"),
    hours: "09:00–18:00 (לבדוק לפני הגעה)",
    season: "מאי–אוקטובר (zipline: מאי–אוקטובר)",
    entrance: fmt("כניסה חופשית · חניה בכפר", "Free entry · parking in village", "უფასო შესვლა"),
    contact: {
      name: "Neriman Ashlarba – Visitors Service",
      phone: "+995 577 10 18 89",
      phoneLink: "tel:+995577101889",
    },
    gettingThere: [
      "מבאטומי: ~25 ק\"מ / 45 דק' – כביש ל-Chakvistavi (דרך Hala)",
      "מינibus #40 מבאטומי ל-Chakvi, משם מונית ל-Chakvistavi",
      "מונית מבאטומי: ~40–50 ₾ (2024–2025)",
    ],
    trails: [
      {
        name: fmt("מסלול Tsablnari (יער ערמונים)", "Tsablnari Trail (Chestnut Forest)", "წაბლნარის ბილიკი"),
        length: "7 ק\"מ מעגלי",
        duration: "3–4 ש' (5–6 ש' עם zipline ושחייה)",
        difficulty: fmt("קל", "Easy", "მარტივი"),
        elevation: "260–445 מ'",
        season: "מאי–אוקטובר",
        description:
          "מתחיל במרכז המבקרים. מעבירה את נהר Chakvistskali בכרמלית מכנית (₾2). אחרי ~1.5 ק\"מ – zipline ו-Rope Park. מפגש: ימינה למפל Tsablnari (15 מ'), שמאלה לאגם קטן (שחייה מותרת). מסלול עגול חזרה.",
        links: [
          {
            label: fmt("מסלול Tsablnari – APA (רשמי)", "Tsablnari Trail – official APA page", "APA"),
            url: "https://apa.gov.ge/en/eco-tourism/Trails/mtiralas-erovnuli-parkis-turistuli-bilikebi-satesto/1-wablnaris-biliki",
          },
          {
            label: fmt("Mapy.cz – מפת טיול רגלי (שכבת turistická)", "Mapy.cz – hiking map at visitor center", "Mapy.cz"),
            url: "https://mapy.cz/turisticka?x=41.9840000&y=41.8820000&z=15&source=czpub&id=ostredni",
          },
          {
            label: fmt("Wikiloc – מסלולי Mtirala", "Wikiloc – Mtirala tracks", "Wikiloc"),
            url: "https://www.wikiloc.com/trails/hiking/georgia/adjara/mtirala",
          },
        ],
      },
      {
        name: fmt("מסלול Tsivtskaro (2 ימים)", "Tsivtskaro Trail (2 days)", "წივწყარო"),
        length: "16 ק\"מ מעגלי",
        duration: "2 ימים",
        difficulty: fmt("בינוני", "Medium", "საშუალო"),
        elevation: "260–1,250 מ'",
        season: "יוני–ספטמבר",
        description: "מסלול הרים ארוך – יער Colchic, מעיינות, אפשרות לפגוש איילים ודובים. מקלט לינה בפסגה.",
        links: [
          {
            label: fmt("מסלול Tsivtskaro – APA", "Tsivtskaro Trail – APA", "APA"),
            url: "https://apa.gov.ge/en/eco-tourism/Trails/mtiralas-erovnuli-parkis-turistuli-bilikebi-satesto",
          },
        ],
      },
    ],
    adventures: [
      {
        name: "Zipline",
        price: "₾15",
        note: "~200–220 מ' בין עצי יער עבות · מאי–אוקטובר · ~1.5 ק\"מ מהכניסה",
        url: "https://apa.gov.ge/en/eco-tourism/servisebi-da-tarifebi/mtiralas-erovnuli-parki",
      },
      {
        name: fmt("Rope Park – מסלול מבוגרים", "Rope Park – adult route", "Rope Park"),
        price: "₾15",
        note: "17 מכשולים, 209 מ' (67 + 142 מ')",
        url: "https://visitajara.com/en/sights/77",
      },
      {
        name: fmt("Rope Park – משפחתי", "Rope Park – family route", "Rope Park"),
        price: "₾20",
        note: "מסלול קל יותר לילדים",
        url: "https://visitajara.com/en/sights/77",
      },
      {
        name: fmt("כרמלית מעל הנהר", "River cable crossing", "საბაგირო"),
        price: "₾2",
        note: "מעבר מכאני מעל Chakvistskali – תחילת מסלול Tsablnari",
        url: "https://gobatumi.com/en/catalog/75-mtiralas-erovnuli-parki",
      },
    ],
    links: [
      {
        label: fmt("APA – פארק מטיראלה (רשמי)", "APA – Mtirala National Park", "APA"),
        url: "https://apa.gov.ge/en/eco-tourism/servisebi-da-tarifebi/mtiralas-erovnuli-parki",
      },
      {
        label: "Visit Adjara – Mtirala",
        url: "https://visitajara.com/en/sights/77",
      },
      {
        label: "GoBatumi – Mtirala",
        url: "https://gobatumi.com/en/catalog/75-mtiralas-erovnuli-parki",
      },
      {
        label: fmt("Mapy.cz – offline (מומלץ!)", "Mapy.cz – download offline maps", "Mapy.cz"),
        url: "https://mapy.cz/turisticka?x=41.9840000&y=41.8820000&z=15",
      },
      {
        label: fmt("Google Maps – מרכז מבקרים", "Google Maps – visitor center", "Google Maps"),
        url: "https://www.google.com/maps/search/Mtirala+National+Park+Visitor+Center+Chakvistavi",
      },
    ],
    gallery: [
      { src: "IMG.mtirala", caption: fmt("יער גשם Colchic – Mtirala", "Colchic rainforest – Mtirala", "მტირალა") },
      { src: "IMG.mtiralaWaterfall", caption: fmt("מפל Tsablnari", "Tsablnari waterfall", "წაბლნარის ჩანჩქერი") },
      { src: "IMG.mtiralaForest", caption: fmt("שביל ביער – לחות וערפל", "Forest trail – humidity & fog", "ტყის ბილიკი") },
    ],
    tips: [
      "מעיל גשם ונעלי hiking waterproof – באמת גשום!",
      "בגד ים לשחייה באגם / מתחת למפל",
      "Mapy.cz offline – קליטה חלקית ביער",
      "zipline & Rope Park – מאי–אוקטובר, מזומן מומלץ",
      "3–4 ש' למסלול Tsablnari · 5–6 ש' עם zipline וארוחה",
    ],
  },
  kutaisi: {
    name: N.kutaisi,
    tagline: fmt("עיר היסטורית – בסיס ליום 3 בבוקר", "Historic city – base for day 3 morning", "ქუთაისი"),
    summary:
      "אחר הצהריים: נסיעה ~90 ק\"מ / 2 ש' ממטיראלה. קוטאיסי – העיר השנייה בגודלה בגיאורגיה, עיר הבירה של ממלכת Colchis העתיקה. ערב ראשון: הליכה בכיכר הלב, גשר הזכוכית, ארוחה גיאורגית (או תאילנדית ב-SIAM).",
    sights: [
      {
        name: fmt("גשר הלב (White Bridge)", "White Bridge", "თეთრი ხიდი"),
        note: "מרכז העיר – נקודת מפגש, בתי קפה, SIAM Thai ליד",
        url: "https://www.google.com/maps/search/Kutaisi+White+Bridge",
      },
      {
        name: fmt("גשר הזכוכית", "Glass Bridge", "მინის ხიდი"),
        note: "מעל Rioni – נוף לעיר",
        url: "https://www.google.com/maps/search/Kutaisi+Glass+Bridge",
      },
      {
        name: fmt("Bagrati Cathedral", "Bagrati Cathedral", "ბაგრატი"),
        note: "UNESCO – על גבעה מעל העיר, נוף מרהיב",
        url: "https://www.google.com/maps/search/Bagrati+Cathedral+Kutaisi",
      },
      {
        name: fmt("מזרקת Colchis", "Colchis Fountain", "კოლხეთის ფონტანი"),
        note: "30 פסלים מזהב – ז'argon וארגו",
        url: "https://www.google.com/maps/search/Colchis+Fountain+Kutaisi",
      },
    ],
    links: [
      {
        label: fmt("Mapy.cz – סיור ערב בעיר", "Mapy.cz – evening walk in Kutaisi", "Mapy.cz"),
        url: "https://mapy.cz/turisticka?x=42.6946000&y=42.2679000&z=15",
      },
      {
        label: fmt("Google Maps – מרכז קוטאיסי", "Google Maps – Kutaisi center", "Google Maps"),
        url: "https://www.google.com/maps/search/Kutaisi+city+center",
      },
    ],
    gallery: [
      { src: "IMG.kutaisi", caption: fmt("מרכז קוטאיסי", "Kutaisi center", "ქუთაისი") },
      { src: "IMG.kutaisiBagrati", caption: fmt("Bagrati Cathedral", "Bagrati Cathedral", "ბაგრატი") },
    ],
    tips: [
      "חניה במרכז – בדרך כלל קלה",
      "בסיס ללילה 2 · יום 3 – צ'יאתורה",
      "SIAM Thai – הפסקה מהגיאורגית (ליד גשר הלב)",
    ],
  },
};

if (typeof module !== "undefined") module.exports = { MTIRALA_KUTAISI };

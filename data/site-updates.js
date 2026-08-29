/** עדכונים אחרונים באתר – מוצג ב-new.html */
const SITE_UPDATES = {
  title: "חדש באתר",
  intro: "עדכונים, המלצות ותוכן חדש שנוסף לאחרונה לתוכנית הטיול.",
  items: [
    {
      id: "family-two-weeks",
      date: "29.8.2026",
      badge: "סיפור מטיילים",
      title: "גאורגיה – שבועיים של חוויות, טבע, הרים, מים ופינוקים",
      summary:
        "סיכום טיול משפחתי עם שלושה ילדים: אזור קוטאיסי (מרטווילי, אוקאצה, סטאפליה, פרומתאוס), טיול ג'יפים עם Bacho Tsotsoria, סיום מפנק בבטומי – ונהג מומלץ Vakhtang.",
      links: [
        { label: "סיפורים – יום 2 (קוטאיסי)", url: "stories.html?id=2" },
        { label: "סיפורים – יום 5 (מערות)", url: "stories.html?id=5" },
        { label: "סיפורים – יום 6 (קניונים)", url: "stories.html?id=6" },
        { label: "סיפורים – יום 12 (באטומי)", url: "stories.html?id=12" },
        { label: "נהג Vakhtang – לוגיסטיקה", url: "logistics.html#drivers" },
      ],
    },
    {
      id: "bacho-jeep",
      date: "29.8.2026",
      badge: "המלצה",
      title: "טיול ג'יפים – Bacho Tsotsoria (אזור קוטאיסי)",
      summary:
        "מדריך מקומי – ג'יפ בין מפלים, מים וטבע פראי. אחד הטיולים שהכי נהנו מהם באזור. לחפש בפייסבוק.",
      links: [
        { label: "יום 6 – אופציית ג'יפ", url: "day.html?id=6" },
        { label: "Bacho Tsotsoria – Facebook", url: "https://www.facebook.com/search/top?q=Bacho%20Tsotsoria" },
      ],
    },
    {
      id: "sataplia",
      date: "29.8.2026",
      badge: "אתר",
      title: "שמורת סטאפליה – עקבות דינוזאורים",
      summary: "יער, מערה, תצפיות – הילדים אהבו במיוחד את עקבות הדינוזאורים. ליד קוטאיסי.",
      links: [
        { label: "יום 5 – סטאפליה", url: "day.html?id=5" },
        { label: "Sataplia – Google Maps", url: "https://www.google.com/maps/search/Sataplia+Nature+Reserve+Kutaisi" },
      ],
    },
    {
      id: "adventure-camping",
      date: "25.8.2026",
      badge: "לינה + אקסטרים",
      title: "Adventure Camping – רפטינג, קניונינג ולינה בראצ'ה",
      summary:
        "קמפינג של Rafting in Kutaisi: check-in 12:00, רפטינג 14 ק\"מ על הריונi (₾150), קוטג' ₾250, מסעדה במקום. יום 4 לינה → יום 5 קניונינג.",
      links: [
        { label: "יום 4 – Adventure Camping", url: "day.html?id=4" },
        { label: "יום 5 – קניונינג בוקר", url: "day.html?id=5" },
        { label: "לוגיסטיקה – Rafting in Kutaisi", url: "logistics.html#adventure-container" },
        { label: "Adventure Camping – Google Maps", url: "https://www.google.com/maps/place/Adventure+Camping/@42.5582341,42.8517484,17z" },
      ],
    },
    {
      id: "hiking-trails",
      date: "25.8.2026",
      badge: "טרקים",
      title: "מסלולי hiking עם מפות Mapy.cz",
      summary: "כרטיסי טרק לימים 2, 6, 8, 9, 10 – מטיראלה, Okatse, Ushguli, Chalaadi, Mazeri/Shdugra.",
      links: [
        { label: "יום 2 – מטיראלה", url: "day.html?id=2" },
        { label: "יום 8 – Ushguli", url: "day.html?id=8" },
        { label: "יום 10 – שדוגרה", url: "day.html?id=10" },
      ],
    },
    {
      id: "places-map",
      date: "אוגוסט 2026",
      badge: "מפה",
      title: "דף «מקומות» – כל הנקודות על מפה אחת",
      summary: "סינון, חיפוש, הערות מקומיות וצבעים לפי סוג (אוכל, לינה, טבע, אקסטרים).",
      links: [{ label: "מקומות", url: "places.html" }],
    },
  ],
};

if (typeof module !== "undefined") module.exports = { SITE_UPDATES };

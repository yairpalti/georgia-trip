/** עדכונים אחרונים באתר – מוצג ב-new.html */
const SITE_UPDATES = {
  title: "חדש באתר",
  intro: "עדכונים, המלצות ותוכן חדש שנוסף לאחרונה לתוכנית הטיול.",
  items: [
    {
      id: "mestia-weather",
      date: "2.9.2026",
      badge: "מזג אוויר",
      title: "תחזית 10 ימים – מסטיה (Foreca)",
      summary:
        "תחזית מפורטת לסוואנטי – שימושי לפני ואחרי הגעה לימים 7–10 (מסטיה, Ushguli, Mazeri).",
      links: [
        { label: "Foreca – מסטיה (10 ימים)", url: "https://www.foreca.ru/Georgia/Mestia?tenday=" },
        { label: "יום 7 – הגעה למסטיה", url: "day.html?id=7" },
        { label: "יום 8 – Ushguli", url: "day.html?id=8" },
        { label: "יום 9 – צ'לאדי", url: "day.html?id=9" },
      ],
    },
    {
      id: "confirmed-hotels",
      date: "29.8.2026",
      badge: "הזמנות",
      title: "לינה מאושרת – Prime Heaven, White Hotel, Airbnb מסטיה",
      summary:
        "שלוש הזמנות שעודכנו במסלול ובמפה: Prime Heaven, צ'יאתורה (25.9–26.9, Booking, דירוג 9.2) · White Hotel Guesthouse, Zugdidi (28.9–29.9, 2 חדרים, $115) · Home in Mestia Airbnb (29.9–1.10, 21 Mestia).",
      links: [
        { label: "יום 3 – Prime Heaven", url: "day.html?id=3" },
        { label: "יום 4 – Adventure Camping (לילה אחרי)", url: "day.html?id=4" },
        { label: "יום 6 – White Hotel Guesthouse", url: "day.html?id=6" },
        { label: "ימים 7–8 – Airbnb מסטיה", url: "day.html?id=7" },
        { label: "לוגיסטיקה – סיכום לינה", url: "logistics.html#accommodation" },
        { label: "Prime Heaven – Google Maps", url: "https://maps.app.goo.gl/ykQspZ4zZXnftZH1A" },
        { label: "White Hotel – Booking", url: "https://www.booking.com/Share-qT3VBX" },
        { label: "Airbnb מסטיה", url: "https://www.airbnb.com/trips/v1/1759464519441989123/ro/RESERVATION2_CHECKIN/HMN32SS2XJ" },
      ],
    },
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

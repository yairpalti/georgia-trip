/** עדכונים אחרונים באתר – מוצג ב-new.html
 * date: D.M.YYYY · time: HH:MM (אופציונלי, משמש גם למיון)
 */
const SITE_UPDATES = {
  title: "חדש באתר",
  intro: "עדכונים, המלצות ותוכן חדש שנוסף לאחרונה לתוכנית הטיול.",
  items: [
    {
      id: "hotel-london-1889",
      date: "5.9.2026",
      time: "19:35",
      badge: "הזמנות",
      title: "Hotel London 1889 – Booked (באטומי)",
      summary:
        "לינה ראשונה מאושרת: Hotel London 1889 & Casino, באטומי · 23.9–24.9 · 3 חדרים · ~$308 · ארוחת בוקר כלולה · תשלום במלון · ביטול חינם עד 19.9. כתובת: Zhordania / Gamsakhurdia 8/15.",
      links: [
        { label: "יום 1 – לינה", url: "day.html?id=1" },
        { label: "לוגיסטיקה – סיכום לינה", url: "logistics.html#accommodation" },
        { label: "Google Maps", url: "https://www.google.com/maps/search/?api=1&query=41.65095,41.64138" },
        { label: "Booking.com – המלון", url: "https://www.booking.com/hotel/ge/divan-suites-batumi.html" },
      ],
    },
    {
      id: "kutaisi-walking-tour",
      date: "5.9.2026",
      time: "19:30",
      badge: "פעילות",
      title: "מה לעשות בקוטאיסי – סיור הליכה מודרך",
      summary:
        "ליום 2 (ערב בקוטאיסי): סיור GetYourGuide עם מדריך מקומי – «3,000 שנה בשעתיים». כולל מזרקת Colchis, גשר הלב, השוק הירוק והרובע המלכותי. עודכנו גם נקודות עניין במדריך מטיראלה+קוטאיסי.",
      links: [
        {
          label: "GetYourGuide – סיור הליכה בקוטאיסי",
          url: "https://www.getyourguide.com/kutaisi-l90033/kutaisi-walking-tour-with-local-guide-3000-years-in-2-hours-t1220975/",
        },
        { label: "יום 2 – תוכנית", url: "day.html?id=2" },
      ],
    },
    {
      id: "mebirashi-cancelled",
      date: "4.9.2026",
      time: "13:05",
      badge: "הזמנות",
      title: "Cottage Mebirashi – בוטל",
      summary:
        "Cottage Mebirashi (Ambrolauri) בוטל. נשאר בדף יום 3 כאופציה בלבד – ללא סימון Booked. Prime Heaven נשאר מאושר ללילה 25.9–26.9.",
      links: [
        { label: "יום 3 – לינה", url: "day.html?id=3" },
        { label: "לוגיסטיקה – סיכום לינה", url: "logistics.html#accommodation" },
      ],
    },
    {
      id: "confirmed-hotels",
      date: "4.9.2026",
      time: "12:35",
      badge: "הזמנות",
      title: "לינה Booked – Peak Mazeri ועוד",
      summary:
        "הזמנות מאושרות: Hotel London 1889 Batumi (23.9–24.9, 3 rooms, ~$308) · Prime Heaven (25.9–26.9, Chiatura, $153) · White Hotel Zugdidi (28.9–29.9, $115) · Airbnb מסטיה 21 Mestia (29.9–1.10) · Peak Mazeri Guest House (1.10–3.10, 3 rooms, $239). Cottage Mebirashi בוטל.",
      links: [
        { label: "יום 1 – Hotel London 1889", url: "day.html?id=1" },
        { label: "יום 3 – Prime Heaven", url: "day.html?id=3" },
        { label: "יום 6 – White Hotel", url: "day.html?id=6" },
        { label: "ימים 7–8 – Airbnb מסטיה", url: "day.html?id=7" },
        { label: "ימים 9–10 – Peak Mazeri", url: "day.html?id=9" },
        { label: "לוגיסטיקה – סיכום לינה", url: "logistics.html#accommodation" },
        { label: "Hotel London 1889 – Google Maps", url: "https://www.google.com/maps/search/?api=1&query=41.65095,41.64138" },
        { label: "Prime Heaven – Google Maps", url: "https://maps.app.goo.gl/ykQspZ4zZXnftZH1A" },
        { label: "Peak Mazeri – Google Maps", url: "https://www.google.com/maps/search/Peak+Mazeri+Guest+House+Mazeri" },
        { label: "Airbnb מסטיה", url: "https://www.airbnb.com/trips/v1/1759464519441989123/ro/RESERVATION2_CHECKIN/HMN32SS2XJ" },
      ],
    },
    {
      id: "family-road-summary",
      date: "4.9.2026",
      time: "10:45",
      badge: "סיפור מטיילים",
      title: "שבועיים מטורפים – סיכום דרך למשפחות",
      summary:
        "סיכום מטיילים מאזורי המסלול שלנו: מרטווילי/אוקצה/קינצחה, עלייה למסטיה (אנגורי, Hatsvali), צ'לאדי, אושגולי/שחארה, קורולדי ותצפית הנדנדה – פלוס טיפי כשר, כבישים, כסף ומזג אוויר. (ללא קזבגי/טיביליסי – לא במסלול).",
      links: [
        { label: "סיפורים – יום 1 (פתיחה)", url: "stories.html?id=1" },
        { label: "סיפורים – יום 6 (מרטווילי/אוקצה)", url: "stories.html?id=6" },
        { label: "סיפורים – יום 7 (מסטיה/קורולדי)", url: "stories.html?id=7" },
        { label: "סיפורים – יום 8 (אושגולי)", url: "stories.html?id=8" },
        { label: "סיפורים – יום 9 (צ'לאדי)", url: "stories.html?id=9" },
        { label: "לוגיסטיקה – כשר / כסף / מזג", url: "logistics.html#rental" },
      ],
    },
    {
      id: "mestia-weather",
      date: "2.9.2026",
      time: "14:05",
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
      id: "family-two-weeks",
      date: "29.8.2026",
      time: "11:00",
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
      time: "10:45",
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
      time: "10:30",
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
      time: "16:00",
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
      time: "15:30",
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
      date: "1.8.2026",
      time: "12:00",
      badge: "מפה",
      title: "דף «מקומות» – כל הנקודות על מפה אחת",
      summary: "סינון, חיפוש, הערות מקומיות וצבעים לפי סוג (אוכל, לינה, טבע, אקסטרים).",
      links: [{ label: "מקומות", url: "places.html" }],
    },
  ],
};

if (typeof module !== "undefined") module.exports = { SITE_UPDATES };

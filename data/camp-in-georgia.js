/** Camp in Georgia – Sveri Adventure Camp + Via Ferrata (campingeorgia.ge) */
const CAMP_IN_GEORGIA = {
  name: "Camp in Georgia",
  home: "https://campingeorgia.ge/",
  tagline: "Sveri Adventure Camp – Via Ferrata, טיפוס, מערות",
  summary:
    "Sveri Adventure Camp בכפר Sveri (מחוז צ'יאתורה) – המחנה שמפעיל את Via Ferrata הראשון בקווקז. קוטג'ים, אוהלים, מסעדה, קיר טיפוס, בריכה. המסלול 700 מ' מהמחנה.",
  location: {
    lat: 42.237867,
    lng: 43.300874,
    area: "כפר Sveri · צ'יאתורה · אימרתי",
    driving:
      "113 ק\"מ / ~1.5 ש' מקוטאיסי · 11 ק\"מ מעיר צ'יאתורה · סימון על הכביש הראשי בבקעה",
    maps: "https://www.google.com/maps/search/Sveri+Adventure+Camp+Chiatura",
  },
  contact: {
    phone: ["+995 558 48 63 48", "+995 557 30 07 00"],
    email: "info@campingeorgia.ge",
    emailLink: "mailto:info@campingeorgia.ge",
    whatsapp: "https://wa.me/995558486348",
  },
  relatedDays: [3],
  viaFerrata: {
    title: fmt("Via Ferrata – המסלול הראשון בקווקז", "Via Ferrata – first in the Caucasus", "Via Ferrata"),
    url: "https://campingeorgia.ge/hiking/",
    price: "~€35 / אדם",
    priceNote: "כולל קסדה, רתמה, לניארדים, כפפות ופנס ראש",
    routes: [
      { name: fmt("קל", "Easy", "მარტივი"), duration: "~70 דק'" },
      { name: fmt("בינוני", "Medium", "საშუალო"), duration: "~90 דק'" },
    ],
    specs: [
      "אורך מסלול: 230 מ' · ~300 שלבים · גובה עד 70 מ'",
      "זמן מלא: 2–2.5 ש' (הדרכה 30 דק' במחנה + 15 דק' הליכה + מעבר + חזרה)",
      "קבוצה: 3–10 משתתפים · שני מדריכים",
      "מעבר במערות קצרות בסלע",
      "אחרי המסלול: בריכת נהר Sadzaliskevi (~10 דק' הליכה)",
    ],
    includes: ["קסדה", "רתמה", "לניארדים", "כפפות", "פנס ראש"],
    guidedOnly:
      "המסלול מונחה בלבד – הדרכה חובה, אין השכרת ציוד לשימוש עצמאי. מינימום 3 משתתפים.",
  },
  camp: {
    title: fmt("המחנה", "The camp", "ბანაკი"),
    url: "https://campingeorgia.ge/camp/",
    facilities: [
      "קוטג'ים מעץ ואזור אוהלים",
      "חדר אוכל משותף, מטבח, מקלחות ושירותים",
      "קיר טיפוס (70 מ' מהמחנה) · השכרת ציוד טיפוס ~€15/יום",
      "בריכה, טרמפולינה, פינג-פונג, סלאקליין, כדורעף",
      "מערת כנסייה היסטורית ליד המחנה",
    ],
  },
  operators: [
    {
      name: "Camp in Georgia (ישירות)",
      featured: true,
      description:
        "המפעיל המקומי של המחנה והמסלול. הזמנה ישירה, מחיר ~€35 לאדם כולל ציוד והדרכה.",
      links: [
        { label: "campingeorgia.ge – Via Ferrata", url: "https://campingeorgia.ge/hiking/" },
        { label: "campingeorgia.ge – המחנה", url: "https://campingeorgia.ge/camp/" },
        { label: "WhatsApp +995 558 48 63 48", url: "https://wa.me/995558486348" },
      ],
    },
    {
      name: "Rafting in Kutaisi",
      description:
        "ספק חלופי במסלול שלנו – מפגש במקום ב-Sveri, בלי הסעה (₾200). כולל מדריך וציוד מלא.",
      links: [
        {
          label: "Via Ferrata – raftinginkutaisi.com",
          url: "https://www.raftinginkutaisi.com/trip/via-ferrata-in-georgia/",
          note: "₾200 · +995 595 41 15 47",
        },
      ],
    },
  ],
  tips: [
    "להזמין מראש – מינימום 3 משתתפים",
    "בגד ספורט ונעליים סגורות",
    "אפשר לשלב שחייה ו-BBQ במחנה אחרי המסלול",
    "ערב: מלון בצ'יאתורה (Booking 25.9–26.9)",
  ],
};

if (typeof module !== "undefined") module.exports = { CAMP_IN_GEORGIA };

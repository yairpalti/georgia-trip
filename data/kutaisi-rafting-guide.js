/** מדריך רפטינג – אזור קוטאיסי / נהר הריוני (דף אקסטרים) */
const KUTAISI_RAFTING_GUIDE = {
  title: fmt("חברות רפטינג מובילות באזור קוטאיסי – נהר הריוני", "Leading rafting near Kutaisi – Rioni River", "rafting კუთაისში"),
  intro:
    "יום 4 (ובאופציות נוספות) – רפטינג על הריוני בראצ'ה-Lechkhumi. הנה חברות מובילות, מה לצפות מבחינת ציוד, ואיך לוודא חליפות Neoprene לסוף ספטמבר / תחילת אוקטובר.",
  companies: [
    {
      name: fmt("Rafting in Georgia (Rafting.ge)", "Rafting in Georgia (Rafting.ge)", "Rafting in Georgia"),
      description:
        "אחת החברות הגדולות והוותיקות במדינה – קשורה לפדרציית הרפטינג הגיאורגית. מוציאים טיולי רפטינג מסודרים ברמות קושי שונות, כולל מסלולים שמותאמים למשפחות באזור קוטאיסי ונהר הריוני.",
      links: [
        {
          label: "getur.ge – Rafting in Georgia",
          url: "https://getur.ge/",
          note: "הזמנות · Rioni, Racha · +995 555 701 999",
        },
        {
          label: fmt("רפטינג משפחתי על הריוני", "Family Rioni rafting", "rafting"),
          url: "https://getur.ge/tour/27-rafting_po_rioni_marshrut_v_lechhumi",
        },
      ],
    },
    {
      name: "Rafting in Kutaisi",
      description:
        "ספק מקומי בקוטאיסי – משרד ב-Mosashvili 9. רפטינג על הריוני (₾150), קניונינג, Via Ferrata. מדריכי IRF, ציוד Neoprene כלול. מומלץ לימים 3–4 במסלול שלנו.",
      links: [
        {
          label: "raftinginkutaisi.com",
          url: "https://www.raftinginkutaisi.com/",
        },
        {
          label: fmt("רפטינג על הריוני – הזמנה", "Rioni rafting – book", "rafting"),
          url: "https://www.raftinginkutaisi.com/trip/rafting-on-the-rioni-river/",
          note: "₾150 · WhatsApp +995 595 41 15 47",
        },
      ],
      featured: true,
    },
    {
      name: fmt("Kutaisi Rafting – מפעילים מקומיים", "Kutaisi Rafting – local operators", "Kutaisi Rafting"),
      description:
        "סוכנויות ומפעילים שיושבים ממש בעיר קוטאיסי. לרוב מציעים איסוף מהמלון אל נקודת ההתחלה בנהר. חפשו «Kutaisi Rafting» או «Rioni River Rafting» – השוו מחירים, ציוד ורמת קושי.",
      links: [
        {
          label: fmt("Google Maps – Kutaisi Rafting", "Google Maps – Kutaisi Rafting", "Google Maps"),
          url: "https://www.google.com/maps/search/Kutaisi+Rafting+Rioni+River",
        },
        {
          label: fmt("Google – Rioni River Rafting", "Google – Rioni River Rafting", "Google"),
          url: "https://www.google.com/search?q=Kutaisi+Rafting+Rioni+River+Georgia",
        },
      ],
    },
  ],
  coldGear: {
    title: fmt("🥶 חליפות נגד קור – מה קורה בפועל?", "🥶 Cold-weather gear – what to expect", "🥶"),
    summary:
      "לסוף ספטמבר ותחילת אוקטובר – החשש מהקור מוצדק. אצל מפעילים מקצועיים בגיאורגיה מספקים בדרך כלל ציוד מלא:",
    items: [
      "חליפות Neoprene ארוכות וייעודיות לכל המשתתפים",
      "נעלי מים מ-Neoprene – מעבר לחליפה המבודדת",
      "קסדות בטיחות וחגורות הצלה תקניות",
      "מומלץ: שכבה דקה מתחת (בגד ים / thermal) – המפעילים יבקשו מידות בהזמנה",
    ],
    verifyTip:
      "בעת סגירת ההזמנה – שלחו WhatsApp או מייל קצר ווודאו שמספקים חליפות במידות שמתאימות לכל המשפחה (גובה, משקל, מידת נעל באירופאי).",
  },
};

if (typeof module !== "undefined") module.exports = { KUTAISI_RAFTING_GUIDE };

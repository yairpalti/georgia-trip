/** Rafting in Kutaisi – ספק האקסטרים לימים 3–5 + Adventure Camping */
const RAFTING_KUTAISI = {
  name: "Rafting in Kutaisi",
  home: "https://www.raftinginkutaisi.com/",
  tagline: "Rafting, canyoning & Adventure Camping – Racha",
  summary:
    "חברה מקומית – רפטינג, קניונינג, Via Ferrata, קיאקים. משרד בקוטאיסי + Adventure Camping בראצ'ה (לינה + מסעדה + יציאה לפעילויות).",
  contact: {
    phone: "+995 595 41 15 47",
    phoneLink: "tel:+995595411547",
    whatsapp: "https://wa.me/995595411547",
    email: "raftinginkutaisi@gmail.com",
    emailLink: "mailto:raftinginkutaisi@gmail.com",
    address: fmt("קוטאיסי, רח' Mosashvili 9", "Kutaisi, Mosashvili 9", "ქუთაისი, მოსაშვილი 9"),
    maps: "https://www.google.com/maps/search/Mosashvili+9+Kutaisi+Georgia",
  },
  certifications: ["IRF – International Rafting Federation", "Rescue 3 Europe"],
  relatedDays: [3, 4, 5],
  tips: [
    "להזמין מראש – WhatsApp: +995 595 41 15 47",
    "Adventure Camping – check-in 12:00 · הכנה לרפטינג 12:30",
    "ציוד מלא מהמפעיל: Neoprene 5mm + נעליים (רפטינג)",
    "לקניונינג – להביא סניקרס; שאר הציוד במקום · סיור פרטי",
    "בגדים להחלפה חובה",
  ],
  camping: {
    name: N.adventureCamping,
    lat: 42.5582341,
    lng: 42.8517484,
    maps:
      "https://www.google.com/maps/place/Adventure+Camping/@42.5582341,42.8517484,17z",
    relatedDays: [4, 5],
    summary:
      "קמפינג של Rafting in Kutaisi בראצ'ה – לינה באוהלים או בקוטג'ים, מסעדה במקום, יציאה לרפטינג ולקניונינג מהמחנה. לוח נוח ליומיים: יום 1 רפטינג + לינה, יום 2 קניונינג.",
    lodging: [
      {
        name: fmt("קוטג' – חדר עם 2 מיטות זוגיות", "Cottage room – 2 double beds", "კოტეჯი"),
        price: "₾250 / חדר",
        note: "2 חדרים זמינים · נוחות מלאה",
      },
      {
        name: fmt("אוהלים במחנה", "Camp tents", "კარვები"),
        price: fmt("לשאול בהזמנה", "Ask when booking", "იკითხეთ"),
        note: "לינה במחנה · שירותים משותפים לפי המקום",
      },
    ],
    scheduleHint:
      "check-in 12:00 → 12:30 הכנה לרפטינג. רפטינג קבוצתי (2 סירות, עד 6 + מדריך בכל סירה). קניונינג = סיור פרטי.",
    restaurant: fmt("מסעדה במחנה – אין צורך לצאת לארוחות", "On-site restaurant – no need to leave camp", "რესტორანი ბანაკში"),
    links: [
      {
        label: "Adventure Camping – Google Maps",
        url: "https://www.google.com/maps/place/Adventure+Camping/@42.5582341,42.8517484,17z",
      },
      {
        label: "Instagram – Rafting Rioni",
        url: "https://www.instagram.com/reel/DPf-3DogT0Y/",
      },
      {
        label: "Instagram – Canyoning",
        url: "https://www.instagram.com/reel/DbicIYFCEXc/",
      },
      {
        label: "WhatsApp +995 595 41 15 47",
        url: "https://wa.me/995595411547",
      },
    ],
  },
  tours: [
    {
      id: "via-ferrata",
      name: "Via Ferrata in Georgia",
      price: "₾200",
      region: "Imereti",
      duration: fmt("יום מלא", "1 day", "1 დღე"),
      relatedDays: [3],
      url: "https://www.raftinginkutaisi.com/trip/via-ferrata-in-georgia/",
      note: "Via Ferrata הראשון בקווקז – Sveri, ליד צ'יאתורה. אופציה ב' ביום 3.",
    },
    {
      id: "rioni-rafting",
      name: "Rafting on the Rioni river (Racha-Lechkhumi)",
      price: "₾150",
      region: "Racha-Lechkhumi",
      duration: "2 ש' 20 דק' על המים",
      relatedDays: [4],
      url: "https://www.raftinginkutaisi.com/trip/rafting-on-the-rioni-river/",
      note:
        "14 ק\"מ · רמה II–III · כולל הסעה מהמחנה לנקודת היציאה ובחזרה, מדריך IRF, ציוד Neoprene 5mm מלא. check-in במחנה 12:00.",
    },
    {
      id: "shareula-canyoning",
      name: "Canyoning (ליד Adventure Camping / Shareula)",
      price: "₾200",
      region: "Racha-Lechkhumi",
      duration: fmt("חצי–יום מלא", "Half / full day", "ნახევარი დღე"),
      relatedDays: [4, 5],
      url: "https://www.raftinginkutaisi.com/trip/canyoning-on-the-shareula-river/",
      note:
        "קניונינג פרטי ליד המחנה – צוקים, בריכות, חבלים ליד מפלים. להביא סניקרס; שאר הציוד במקום. מתאים ליום 5 אחרי לינה במחנה.",
    },
    {
      id: "rioni-extreme",
      name: "The Most Extreme Rafting In Georgia",
      price: "₾200",
      region: "Kutaisi / Racha-Lechkhumi",
      duration: fmt("יום מלא", "1 day", "1 დღე"),
      relatedDays: [4],
      url: "https://www.raftinginkutaisi.com/trip/extreme-rafting-georgia-rioni-racha-lechkhumi/",
      note: "קטע אתגרי יותר על הריוני – לחובבי אדרנלין.",
    },
    {
      id: "rafting-from-batumi",
      name: "Rafting on the Rioni river, from Batumi",
      price: null,
      region: "Racha-Lechkhumi",
      duration: fmt("יום מלא (~14 ש')", "Full day from Batumi", "1 დღე"),
      relatedDays: [1],
      url: "https://www.raftinginkutaisi.com/trip/rafting-trip-from-batumi/",
      note: "יום spare – יוצא מבאטומי, לא בתוכנית הקבועה.",
    },
    {
      id: "alpana-rafting",
      name: "Rafting in Alpana canyon",
      price: "₾100",
      region: "Racha-Lechkhumi",
      duration: fmt("יום מלא", "1 day", "1 დღე"),
      relatedDays: [4],
      url: "https://www.raftinginkutaisi.com/trip/rafting-in-alpana-canyon/",
      note: "רמה בינונית על הריוני – חלופה לרפטינג הקלאסי.",
    },
  ],
};

if (typeof module !== "undefined") module.exports = { RAFTING_KUTAISI };

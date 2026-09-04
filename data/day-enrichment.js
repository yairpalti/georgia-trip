/** Extra detail merged into DAYS at render time – see enrichDay() in app.js */
const DAY_ENRICHMENT = {
  1: {
    heroImage: "IMG.batumi",
    summary:
      "יום הגעה רגוע. נחיתה בשעה 18:10, איסוף רכב SUV בשדה התעופה, נסיעה קצרה למרכז העיר. ערב ראשון על טיילת הבוליבארד – ארוחה גיאורגית, הליכה לאורך הים והתרגלות לקצב הטיול.",
    tips: [
      "להזמין SUV מראש – חובה לכבישים הרריים בהמשך",
      "לקנות SIM/eSIM (Magti / Cellfie) בשדה או בבאטומי",
      "לא לעמיס יותר מדי בערב – מחר נסיעה ארוכה לקוטאיסי",
      "לשאול את המלון לגבי חניה – בדרך כלל קלה במרכז",
    ],
    activityExtras: [
      {
        timeOfDay: "18:00–19:00",
        duration: "כ-45 דק'",
        tips: ["לצלם את מצב הרכב לפני יציאה", "לוודא שיש כבל USB / מטען"],
        image: "IMG.batumiAirport",
      },
      {
        timeOfDay: "19:30–22:00",
        duration: "2–3 שעות",
        tips: ["להזמין חצ'פורי אג'רי מיד – לוקח זמן", "הטיילת ארוכה ונעימה גם עם ילדים"],
        image: "IMG.batumiBoulevard",
      },
    ],
    extraActivities: [
      {
        name: N.batumiOldTown,
        timeOfDay: "אופציונלי – ערב",
        duration: "45 דק'",
        description: "אם נשארו כוחות – סיבוב קצר בעיר העתיקה: סמטאות צבעוניות, קפה, אווירה אירופאית-מזרחית.",
        link: "https://www.google.com/maps/search/Batumi+old+town",
        linkLabel: N.batumiOldTown,
        image: "IMG.batumiOldTown",
      },
    ],
    extraRestaurants: [
      {
        name: fmt("San Remo", "San Remo Restaurant", "San Remo"),
        cuisine: "גיאורגית וים תיכונית · נוף לים",
        area: N.batumiBoulevard,
        note: "מסעדה פופולרית על הטיילת – חצ'פורי, דגים וסalads",
        link: "https://www.google.com/maps/search/San+Remo+Restaurant+Batumi",
        image: "IMG.khachapuri",
      },
      {
        name: fmt("Ethno-Tavern Sanapiro", "Ethno-Tavern Sanapiro", "Sanapiro"),
        cuisine: "מסעדה אתנית גיאורגית · מוזיקה חיה",
        area: N.batumi,
        note: "אווירה אותנטית, מנות מסורתיות, מתאים למשפחות",
        link: "https://www.google.com/maps/search/Ethno+Tavern+Sanapiro+Batumi",
        image: "IMG.supra",
      },
    ],
    extraHotels: [
      {
        name: fmt("Hilton Batumi", "Hilton Batumi", "Hilton ბათუმი"),
        area: N.batumiCenter,
        nights: 1,
        note: "5 כוכבים · מרינה וטיילת · בריכה",
        link: "https://www.google.com/maps/search/Hilton+Batumi",
        image: "IMG.batumi",
      },
      {
        name: fmt("Intourist Palace", "Intourist Palace Batumi", "Intourist"),
        area: N.batumiBoulevard,
        nights: 1,
        note: "מלון קלאסי על הטיילת · נוף לים",
        link: "https://www.google.com/maps/search/Intourist+Palace+Batumi",
        image: "IMG.batumiBoulevard",
      },
    ],
  },
  2: {
    heroImage: "IMG.mtirala",
    summary:
      "יום מלא של טבע ואדרנלין. בוקר: יער הגשם מטיראלה – מסלול Tsablnari (7 ק\"מ), zipline (₾15), Rope Park, מפל ואגם. אחר הצהריים: נסיעה לקוטאיסי – גשר הלב, Bagrati, מזרקת Colchis.",
    tips: [
      "לצאת מוקדם (8:00) – מטיראלה + נסיעה ארוכה",
      "מעיל גשם ונעלי hiking waterproof – יער גשום באמת",
      "Mapy.cz offline – מפת טיול רגלי ביער",
      "zipline & Rope Park – מאי–אוקטובר, מזומן ₾15–20",
      "למלא דלק לפני יציאה מבאטומי",
    ],
    activityExtras: [
      {
        timeOfDay: "08:00–13:00",
        duration: "3–5 שעות",
        tips: [
          "כרמלית ₾2 · zipline ₾15 · Rope Park ₾15–20",
          "בגד ים לשחייה באגם / מתחת למפל",
        ],
        image: "IMG.mtirala",
      },
      {
        timeOfDay: "14:00–21:00",
        duration: "~2 ש' נסיעה + 2–3 ש' בעיר",
        tips: ["SIAM Thai ליד גשר הלב", "Bagrati – נוף לילה מומלץ"],
        image: "IMG.kutaisiBagrati",
      },
    ],
    extraActivities: [
      {
        name: fmt("סיור ערב בקוטאיסי", "Evening in Kutaisi", "საღამო ქუთაისში"),
        timeOfDay: "18:00–21:00",
        duration: "2 שעות",
        description: "הליכה בכיכר הלב (White Bridge), גשר הזכוכית, אווירה נעימה. ארוחת ערב במסעדה מקומית.",
        link: "https://www.google.com/maps/search/Kutaisi+White+Bridge",
        linkLabel: N.kutaisi,
        image: "IMG.kutaisi",
      },
    ],
    extraRestaurants: [
      {
        name: fmt("Palaty", "Palaty Restaurant", "Palaty"),
        cuisine: "גיאורגית מסורתית · סופרה",
        area: N.kutaisi,
        note: "אחת המסעדות המומלצות בקוטאיסי",
        link: "https://www.google.com/maps/search/Palaty+restaurant+Kutaisi",
        image: "IMG.supra",
      },
      {
        name: fmt("Sapere", "Sapere Restaurant", "Sapere"),
        cuisine: "גיאורגית מודרנית",
        area: N.kutaisi,
        note: "אווירה נעימה, מתאים לערב ראשון בעיר",
        link: "https://www.google.com/maps/search/Sapere+Kutaisi",
        image: "IMG.kutaisi",
      },
      {
        name: N.siamThai,
        cuisine: fmt("תאילנדית אותנטית · בוקר 08:00–12:00 · Thai 12:00–23:00", "Authentic Thai · breakfast 8–12 · Thai food 12–23", "თაილანდური"),
        area: fmt("ליד גשר הלב, קוטאיסי", "Near White Bridge, Kutaisi", "თეთრი ხიდი"),
        note: "TOP 10 Restaurant Guru 2025 · שפים מתאילנד · siami.ge · +995 591 27 48 74",
        link: "https://siami.ge/",
        image: "IMG.kutaisi",
      },
    ],
    extraHotels: [
      {
        name: fmt("Hotel Grand Opera", "Hotel Grand Opera", "Grand Opera"),
        area: N.kutaisi,
        nights: 1,
        note: "לילה 2 · check-out בבוקר יום 3",
        link: "https://www.google.com/maps/search/Hotel+Grand+Opera+Kutaisi",
        image: "IMG.kutaisi",
      },
    ],
  },
  3: {
    heroImage: "IMG.chiatura",
    summary:
      "יום 3 (25.9) – ברכב עצמי. check-out מקוטאיסי בבוקר. אופציה א': קצחי, Urbex, Lia, מגווימבי → Prime Heaven. אופציה ב': Via Ferrata ב-Sveri → Prime Heaven.",
    tips: [
      "check-out קוטאיסי בבוקר – כל הציוד ברכב",
      "Lunch at Lia – WhatsApp מראש! (אופציה א')",
      "Prime Heaven – check-in 25.9 מ-14:00 · check-out 26.9 עד 12:00",
      "Booking: דירוג 9.2 · מיקום 9.8 · WiFi · חניה · מסעדה",
      "Via Ferrata – Camp in Georgia ~€35 · +995 558 48 63 48",
      "או Rafting in Kutaisi – מפגש ב-Sveri: +995 595 41 15 47",
      "רכבל Sanatorium – לבדוק שעות ובטיחות",
    ],
    activityExtras: [
      { timeOfDay: "09:00–10:00", duration: "45 דק'", image: "IMG.katskhi" },
      {
        timeOfDay: "10:30–13:00",
        duration: "2–2.5 שעות",
        tips: ["רכבל Sanatorium – הכי מפורסם", "לצלם תחנות נטושות"],
        image: "IMG.chiatura",
      },
      {
        timeOfDay: "13:00–14:30",
        duration: "1.5 שעות",
        tips: ["WhatsApp מראש – חובה!", "מזומן מומלץ"],
        image: "IMG.supra",
      },
      {
        timeOfDay: "15:00–16:00",
        duration: "45 דק'",
        image: "IMG.mgvimevi",
      },
    ],
    extraHotels: [],
  },
  4: {
    heroImage: "IMG.racha",
    summary:
      "יום 4 (26.9): יציאה מצ'יאתורה לראצ'ה. אופציה א': רפטינג → שאורי → יקב → אמברולאורי. אופציה ב': רפטינג + Shareula. אופציה ג': Adventure Camping – check-in 12:00, רפטינג, לינה במחנה (קוטג' ₾250 או אוהלים).",
    tips: [
      "אופציה ג' מומלצת לאקסטרים: Adventure Camping · WhatsApp +995 595 41 15 47",
      "check-in במחנה 12:00 · הכנה לרפטינג 12:30",
      "רפטינג: 14 ק\"מ · II–III · 2ש'20 · ₾150 · Neoprene 5mm מהמפעיל",
      "קוטג': ₾250 לחדר עם 2 מיטות זוגיות · מסעדה במקום",
      "אופציות א'/ב' – לינה באמברולאורי · יין לא לנהוג אחרי!",
    ],
    activityExtras: [
      {
        timeOfDay: "עד 12:00",
        duration: "נסיעה / check-in",
        tips: ["אופציה ג': הגעה למחנה לפני 12:00"],
        image: "IMG.racha",
      },
      {
        timeOfDay: "12:30–15:00",
        duration: "2 ש' 20 דק'",
        tips: ["בגד ים / להחליף", "שקית waterproof לטלפון", "קבוצה – עד 6 בסירה"],
        image: "IMG.rafting",
      },
      { timeOfDay: "אחה\"צ", duration: "45 דק'", image: "IMG.racha" },
      { timeOfDay: "אחה\"צ", duration: "1–1.5 ש'", image: "IMG.wine" },
    ],
    extraRestaurants: [
      {
        name: fmt("מסעדה – Adventure Camping", "Restaurant – Adventure Camping", "რესტორანი"),
        cuisine: "ארוחות במחנה · אופציה ג'",
        area: N.adventureCamping,
        note: "אין צורך לצאת מהמחנה",
        link: "https://www.google.com/maps/place/Adventure+Camping/@42.5582341,42.8517484,17z",
        image: "IMG.supra",
      },
      {
        name: fmt("Racha Tavern", "Racha Tavern", "რაჭული საცხობი"),
        cuisine: "מטבח ראצ'ה · lobio, khachapuri",
        area: N.ambrolauri,
        note: "מנות כפריות אותנטיות",
        link: "https://www.google.com/maps/search/restaurant+Ambrolauri",
        image: "IMG.supra",
      },
    ],
    extraHotels: [
      {
        name: N.adventureCamping,
        area: N.racha,
        nights: 1,
        note: "אופציה ג' · קוטג' ₾250 / אוהלים · +995 595 41 15 47",
        link: "https://www.google.com/maps/place/Adventure+Camping/@42.5582341,42.8517484,17z",
        image: "IMG.racha",
      },
      {
        name: fmt("Guesthouse Racha", "Guesthouse in Racha", "სასტუმრო რაჭა"),
        area: `${N.ambrolauri}, ${N.racha}`,
        nights: 1,
        note: "אופציות א'/ב' – לינה ב-Adventure Camping",
        link: "https://www.google.com/maps/place/Adventure+Camping/@42.5582341,42.8517484,17z",
        image: "IMG.racha",
      },
    ],
  },
  5: {
    heroImage: "IMG.prometheus",
    summary:
      "אם לנו ב-Adventure Camping: בוקר קניונינג פרטי, אחר כך צקאלטובו + פרומתאוס. אחרת: מאמברולאורי ישירות. לינה: צקאלטובו או Okatse – לא זוגדידי.",
    tips: [
      "אופציה ג': קניונינג פרטי ליד המחנה – סניקרס חובה",
      "צקאלטובו – לא תמיד בטוח להיכנס לבניינים נטושים",
      "מערת פרומתאוס – סווטר, כ-14°C בפנים",
      "לינה: צקאלטובו (א') או Okatse (ב') – לא זוגדידי",
      "סטאפליה (אופציונלי) – עקבות דינוזאורים, חובה עם ילדים",
    ],
    activityExtras: [
      {
        timeOfDay: "בוקר",
        duration: "חצי יום",
        tips: ["רק אם לנו במחנה", "סניקרס", "סיור פרטי"],
        image: "IMG.rafting",
      },
      {
        timeOfDay: "09:00–12:00",
        duration: "2–3 שעות",
        tips: ["נעליים סגורות", "פנס לחלקים חשוכים"],
        image: "IMG.tskaltubo",
      },
      {
        timeOfDay: "13:30–16:00",
        duration: "1.5–2 שעות",
        tips: ["סווטר חובה", "צילום מותר"],
        image: "IMG.prometheus",
      },
    ],
    extraRestaurants: [
      {
        name: fmt("Cafe Prometheus", "Cafe near Prometheus Cave", "კაფე"),
        cuisine: "ארוחה קלה · ליד המערה",
        area: N.prometheusCave,
        note: "נוח אחרי הסיור במערה",
        link: "https://www.google.com/maps/search/restaurant+Prometheus+Cave+Georgia",
        image: "IMG.prometheus",
      },
    ],
    extraHotels: [
      {
        name: fmt("Hotel / guesthouse צקאלטובו", "Hotel near Tskaltubo", "ცხალტუბო"),
        area: N.tskaltubo,
        nights: 1,
        note: "אופציה א'",
        link: "https://www.google.com/maps/search/hotels+Tskaltubo",
        image: "IMG.tskaltubo",
      },
      {
        name: fmt("Guesthouse ליד Okatse", "Guesthouse near Okatse", "ოკაცე"),
        area: N.okatseCanyon,
        nights: 1,
        note: "אופציה ב' · בוקר בקניון",
        link: "https://www.google.com/maps/search/guesthouse+Okatse+Canyon",
        image: "IMG.okatse",
      },
    ],
  },
  6: {
    heroImage: "IMG.martvili",
    summary:
      "יוצאים מלינת יום 5 (צקאלטובו או Okatse) מערבה: אוקאצה → מרטווילי → נוקאלאקווי. לינה בזוגדידי – בסיס ליציאה לסוואנטי ביום 7.",
    tips: [
      "אם לנו ב-Okatse – מתחילים בקניון בבוקר",
      "אם לנו בצקאלטובו – ~30–40 דק' ל-Okatse",
      "בגד ים / מגבת למעיינות",
      "ערב: check-in בזוגדידי + דלק מלא ליום 7",
    ],
    activityExtras: [
      {
        timeOfDay: "09:00–11:30",
        duration: "2 שעות",
        tips: ["לא מתאים לפחד גובה"],
        image: "IMG.okatse",
      },
      { timeOfDay: "12:00–14:00", duration: "1.5 שעות", image: "IMG.martvili" },
      { timeOfDay: "15:00–17:00", duration: "1–2 שעות", tips: ["בגד ים", "מגבת"], image: "IMG.nokalakevi" },
    ],
    extraRestaurants: [
      {
        name: fmt("Okatse Canyon Cafe", "Cafe at Okatse", "ოკაცე"),
        cuisine: "ארוחה קלה · נוף לקניון",
        area: N.okatseCanyon,
        note: "נוח לצהריים לפני מרטווילי",
        link: "https://www.google.com/maps/search/Okatse+Canyon+cafe",
        image: "IMG.okatse",
      },
      {
        name: fmt("Martvili Restaurant", "Restaurant Martvili", "მარტვილი"),
        cuisine: "גיאורגית · elarji, khachapuri",
        area: N.martvili,
        note: "מנות Samegrelo מסורתיות",
        link: "https://www.google.com/maps/search/restaurant+Martvili+canyon",
        image: "IMG.martvili",
      },
    ],
    extraHotels: [],
  },
  7: {
    heroImage: "IMG.mestia",
    summary:
      "יום עלייה לסוואנטי – אחד הימים המרהיבים במסלול. יציאה מזוגדידi בבוקר, נסיעה של כ-4–5 שעות (140 ק\"מ) לאורך נהר Enguri הטורקיזi. עצירה חובה בסכר אנגורי – מהסכרים הגבוהים באירופה. הגעה למסטיה – עיירה אלפינית בגובה 1,500 מ' עם מגדלי אבן, מוזיאון ונוף להרים. ערב: ארוחה מקומית והכנה ליום Ushguli.",
    tips: [
      "🚗 SUV – הגעה מזוגדידi · 🚙 ל-Koruldi: ג'יפ + נהג מומלץ מאוד",
      "יציאה מוקדם – 08:00. כביש serpentine – SUV + נהיגה זהירה",
      "למלא דלק בזוגדידי – אין תחנות בהרים",
      "מזג אוויר משתנה – שכבות, מעיל, כובע",
      "מחר Ushguli ב-SUV (כביש לכל רכב) – אין צורך בג'יפ",
      "אופציה בערב: אגמי Koruldi – דרך מאתגרת מאוד (יש רוורס) · ג'יפ + נהג, לא לבד",
      "מזומן: ATM במסטיה מוגבל – לצאת עם לארי",
      "חטיפים ומים – הכנה לימי הטרק",
    ],
    activityExtras: [
      {
        timeOfDay: "08:00–09:30",
        duration: "1.5 שעות",
        tips: ["דלק מלא", "ארוחת בוקר לפני יציאה"],
        image: "IMG.zugdidi",
      },
      {
        timeOfDay: "10:00–11:00",
        duration: "45–60 דק'",
        tips: ["צילום מהגשר", "זהירות לילדים ליד המעקה"],
        image: "IMG.enguriDam",
      },
      {
        timeOfDay: "11:30–13:00",
        duration: "1–1.5 שעות",
        tips: ["ח'צפורי / lobio בדרך", "שירותים בכפרים בלבד"],
        image: "IMG.supra",
      },
      {
        timeOfDay: "13:30–15:00",
        duration: "1.5 שעות",
        tips: ["check-in", "ATM + קניות במרכז"],
        image: "IMG.mestia",
      },
      {
        timeOfDay: "15:30–18:00",
        duration: "2–2.5 שעות",
        tips: ["מוזיאון – לבדוק שעות", "מגדלים – כניסה חלקם בתשלום"],
        image: "IMG.mestia",
      },
      {
        timeOfDay: "19:00–21:00",
        duration: "2 שעות",
        tips: ["Laila – kubdari", "להזמין מקום בערב"],
        image: "IMG.supra",
      },
    ],
    alternativeExtras: {
      0: {
        timeOfDay: "16:30–19:00",
        duration: "2–2.5 שעות",
        tips: ["ג'יפ + נהג – לתאם ב-Airbnb / מרכז מסטיה · לא לבד (דרך מאתגרת / רוורס)", "לבוש חם – ~2,850 מ'"],
        image: "IMG.koruldi",
      },
    },
    extraRestaurants: [
      {
        name: fmt("Laila Restaurant", "Laila Restaurant Mestia", "Laila"),
        cuisine: "סוואנטי · kubdari, tashmijabi",
        area: N.mestia,
        note: "מסעדה מפורסמת – kubdari (בשר במאפה)",
        link: "https://www.google.com/maps/search/Laila+Restaurant+Mestia",
        image: "IMG.mestia",
      },
      {
        name: fmt("Samushao Marani", "Samushao Marani", "Samushao"),
        cuisine: "גיאורגית + יין מקומי",
        area: N.mestia,
        note: "ארוחת ערב עם יין Svanetian",
        link: "https://www.google.com/maps/search/Samushao+Marani+Mestia",
        image: "IMG.supra",
      },
    ],
    extraHotels: [],
  },
  8: {
    heroImage: "IMG.ushguli",
    summary:
      "היום הגדול של סוואנטי. נסיעה ב-SUV ל-Ushguli – הכפר הגבוה באירופה, UNESCO (כביש לכל רכב). מאושגולי לקרחון Shkhara: כמעט בכל רכב עד סוף הדרך, ואז הליכה – או סוסים.",
    tips: [
      "🚗 SUV מספיק – מסטיה→אושגולי כביש לכל רכב",
      "מאושגולי→שחארה: כמעט עד סוף הדרך בכל רכב; החלק האחרון הליכה",
      "אופציה: סוסים מאושגולי",
      "בגדים חמים – גבוה ורוח",
      "מזומן לסוסים / קפה",
    ],
    activityExtras: [
      {
        timeOfDay: "08:00–12:00",
        duration: "4 שעות",
        tips: ["SUV ממסטיה", "מצלמה – סוללה"],
        image: "IMG.ushguli",
      },
      {
        timeOfDay: "12:00–15:00",
        duration: "2–3 שעות",
        tips: ["רכב עד סוף הדרך כמעט · הליכה בסוף", "סוסים – לסגור מחיר מראש", "snacks + מים"],
        image: "IMG.shkhara",
      },
    ],
    extraRestaurants: [
      {
        name: fmt("Ushguli Cafe", "Cafe in Ushguli", "უშგული"),
        cuisine: "ארוחה כפרית · kubdari",
        area: N.ushguli,
        note: "ארוחת צהריים בכפר",
        link: "https://www.google.com/maps/search/Ushguli+restaurant",
        image: "IMG.ushguli",
      },
    ],
    extraHotels: [],
  },
  9: {
    heroImage: "IMG.ushba",
    summary:
      "בוקר: טרק קל לקרחון צ'לאדי ממסטיה. אחר הצהריים: איסוף ציוד, נסיעה 45 דק' למאזרי – Peak Mazeri Guest House (Booked · 1.10–3.10). ערב רגוע בטבע.",
    tips: [
      "🚗 SUV – צ'לאדי + נסיעה למאזרי · 🚙 ג'יפ אופציונלי עד גשר (~80 ₾)",
      "צ'לאדי – לצאת מוקדם",
      "✅ Booked – Peak Mazeri Guest House · 3 rooms · $239",
      "מזון – מוגבל במאזרי, לקנות במסטיה",
      "נעליים waterproof לטרק",
    ],
    activityExtras: [
      {
        timeOfDay: "08:00–11:00",
        duration: "2–3 שעות",
        tips: ["מים + snacks", "מקלות hiking"],
        image: "IMG.chalaadi",
      },
      {
        timeOfDay: "13:00–18:00",
        duration: "45 דק' + ערב",
        tips: ["להזמין בקתה מראש", "להביא אוכל לערב"],
        image: "IMG.ushba",
      },
    ],
    extraRestaurants: [
      {
        name: fmt("ארוחה בבקתה", "Meals at the cabin", "კოტეჯში"),
        cuisine: "בישול עצמי / ארוחה מהמארחת",
        area: N.mazeriCabin,
        note: "לרכוש supplies במסטיה לפני ההגעה",
        link: "https://www.google.com/maps/search/Mestia+supermarket",
        image: "IMG.ushba",
      },
      {
        name: fmt("Laila – לפני היציאה", "Laila before departure", "Laila"),
        cuisine: "ארוחת צהריים",
        area: N.mestia,
        note: "אם יוצאים ממסטיה אחרי הצ'לאדי",
        link: "https://www.google.com/maps/search/Laila+Mestia",
        image: "IMG.mestia",
      },
    ],
    extraHotels: [],
  },
  10: {
    heroImage: "IMG.ushba",
    summary:
      "התעוררות בטבע. המסלול אל מפל שדוגרה יוצא ממש מהעמק – 4–5 שעות הליכה מאתגת. אחרי הטרק: מקלחת חmה ולילה שני רגוע בבקתה.",
    tips: [
      "לצאת מוקדם – הטרק ארוך",
      "מים, אוכל, שכֱ גשם",
      "נעליים עם grip",
      "לא לנסות להגיע לבסיס המפל – מסוכן",
    ],
    activityExtras: [
      {
        timeOfDay: "07:30–13:00",
        duration: "4–5 שעות",
        tips: ["מקלות", "שכֱ גשם"],
        image: "IMG.shdugra",
      },
      {
        timeOfDay: "13:00–ערב",
        duration: "אחר הצהריים",
        image: "IMG.ushba",
      },
    ],
    extraRestaurants: [
      {
        name: fmt("ארוחות בבקתה", "Cabin meals", "კოტეჯი"),
        cuisine: "בישול עצמי",
        area: N.mazeriCabin,
        note: "ארוחות מה שהבאתם + אפשרות ארוחה מהמארחת",
        link: "https://www.google.com/maps/search/guesthouse+Mazeri",
        image: "IMG.ushba",
      },
    ],
  },
  11: {
    heroImage: "IMG.anaklia",
    summary:
      "יום מעבר מההרים לים. יציאה מהבקתה במאזרי, תצפית ב-Koruldi Lakes, ארמon Dadiani בזוגdidi, הגעה לחוף אנaklia על הים השחור.",
    tips: [
      "Koruldi – ג'יפ + נהג מומלץ מאוד (דרך מאתגרת) · לדלג אם ביקרתם בערב יום 7",
      "לבדוק שעות Dadiani Palace",
      "בגד ים לאנaklia",
      "לינה על החוף – נוח לילדים",
    ],
    activityExtras: [
      { timeOfDay: "08:00–10:00", duration: "1.5 שעות", image: "IMG.koruldi" },
      { timeOfDay: "11:30–13:00", duration: "1 שעה", image: "IMG.dadiani" },
      { timeOfDay: "15:00–ערב", duration: "אחר הצהריים", image: "IMG.anaklia" },
    ],
    extraRestaurants: [
      {
        name: fmt("Anaklia Beach Restaurant", "Beach restaurant Anaklia", "ანაკლია"),
        cuisine: "דגים · גיאורגית · נוף לים",
        area: N.anaklia,
        note: "ארוחת ערב על החוף",
        link: "https://www.google.com/maps/search/restaurant+Anaklia+beach",
        image: "IMG.anaklia",
      },
      {
        name: fmt("Zugdidi Lunch", "Restaurant Zugdidi", "ზუგდიდი"),
        cuisine: "גיאורגית · בדרך",
        area: N.zugdidi,
        note: "ארוחת צהריים לפני / אחרי Dadiani",
        link: "https://www.google.com/maps/search/restaurants+Zugdidi",
        image: "IMG.anaklia",
      },
    ],
    extraHotels: [
      {
        name: fmt("Paragraph Resort", "Paragraph Resort Shekvetili", "Paragraph"),
        area: N.shekvetili,
        nights: 1,
        note: "חלופה יוקרתית – קרוב, עם spa",
        link: "https://www.google.com/maps/search/Paragraph+Resort+Shekvetili",
        image: "IMG.anaklia",
      },
    ],
  },
  12: {
    heroImage: "IMG.batumi",
    summary:
      "יום כיף לפני הסיום. אורכי / שקווטילי – חוף חול מגנטי, ספורט ימי. Tsitsinatela – פark שעשועים על החוף. חזרה לבאטומי – חינקלי חגיגי בעיר העתיקה.",
    tips: [
      "אופnועי ים – לסגור מחיר",
      "Tsitsinatela – כרטיסים online",
      "חניה בבאטומי – לשאל מלון",
      "ארוחת סיום – להזמין מקום",
    ],
    activityExtras: [
      {
        timeOfDay: "09:00–13:00",
        duration: "3–4 שעות",
        tips: ["בגד ים", "קרem שמש"],
        image: "IMG.ureki",
      },
      { timeOfDay: "13:30–17:00", duration: "2–3 שעות", image: "IMG.tsitsinatela" },
      { timeOfDay: "18:00–21:00", duration: "2 שעות", image: "IMG.khinkali" },
    ],
    extraRestaurants: [
      {
        name: fmt("Ureki Beach Cafe", "Cafe Ureki", "ურეკი"),
        cuisine: "ארוחה קלה · חוף",
        area: N.ureki,
        note: "צהריים על החוף",
        link: "https://www.google.com/maps/search/restaurant+Ureki",
        image: "IMG.batumi",
      },
      {
        name: fmt("San Remo", "San Remo Batumi", "San Remo"),
        cuisine: "גיאורגית · חוף",
        area: N.batumiBoulevard,
        note: "חלופה לערב – על הטיילת",
        link: "https://www.google.com/maps/search/San+Remo+Batumi",
        image: "IMG.khachapuri",
      },
    ],
    extraHotels: [
      {
        name: fmt("Hilton Batumi", "Hilton Batumi", "Hilton"),
        area: N.batumiCenter,
        nights: 1,
        note: "נוח לפני טיסה – שירות טוב",
        link: "https://www.google.com/maps/search/Hilton+Batumi",
        image: "IMG.batumi",
      },
    ],
  },
  13: {
    heroImage: "IMG.batumiAirport",
    summary:
      "יום קצר – המראה 09:35. השכמה מוקדם (06:00), ארוחת בוקר, החזרת רכֱ, check-in, המראה LY5114 חזרה לתל אביב.",
    tips: [
      "להיות mלון עם early check-out / shuttle לשדה",
      "להחzיר רכֱ מלא בדלק",
      "להגיע לשדה 2 שעות לפני",
      "שקילת מזודנות – חזרה הביתה",
    ],
    activityExtras: [
      {
        timeOfDay: "06:30–09:35",
        duration: "3 שעות",
        tips: ["דלק – תחנות ליד שדה", "נוזלים – רק ב-hand luggage"],
        image: "IMG.batumiAirport",
      },
    ],
    extraRestaurants: [
      {
        name: fmt("ארוחת בוקר במלון", "Hotel breakfast", "საუზმე"),
        cuisine: "בוקר לפני היציאה",
        area: N.batumi,
        note: "רוב המלונות – buffet מוקדם",
        link: "https://www.google.com/maps/search/hotels+near+Batumi+airport",
        image: "IMG.batumiAirport",
      },
      {
        name: fmt("קפה בשדה", "Airport cafe", "აეროპორტი"),
        cuisine: "קפה / snack",
        area: N.batumiAirport,
        note: "אם נשאר זמן אחרי check-in",
        link: "https://www.google.com/maps/search/Batumi+airport+cafe",
        image: "IMG.batumiAirport",
      },
    ],
  },
};

/** Extra detail merged into DAYS at render time – see enrichDay() in app.js */
const DAY_ENRICHMENT = {
  1: {
    heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Shipwreck_Batumi_Georgia_R_Bartz.jpg/960px-Shipwreck_Batumi_Georgia_R_Bartz.jpg",
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
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Batumi_Old_Town.jpg/960px-Batumi_Old_Town.jpg",
      },
    ],
    extraRestaurants: [
      {
        name: fmt("San Remo", "San Remo Restaurant", "San Remo"),
        cuisine: "גיאורגית וים תיכונית · נוף לים",
        area: N.batumiBoulevard,
        note: "מסעדה פופולרית על הטיילת – חצ'פורי, דגים וסalads",
        link: "https://www.google.com/maps/search/San+Remo+Restaurant+Batumi",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Khachapuri_%28Adjarian%29.jpg/960px-Khachapuri_%28Adjarian%29.jpg",
      },
      {
        name: fmt("Ethno-Tavern Sanapiro", "Ethno-Tavern Sanapiro", "Sanapiro"),
        cuisine: "מסעדה אתנית גיאורגית · מוזיקה חיה",
        area: N.batumi,
        note: "אווירה אותנטית, מנות מסורתיות, מתאים למשפחות",
        link: "https://www.google.com/maps/search/Ethno+Tavern+Sanapiro+Batumi",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Georgian_supra.jpg/960px-Georgian_supra.jpg",
      },
    ],
    extraHotels: [
      {
        name: fmt("Hilton Batumi", "Hilton Batumi", "Hilton ბათუმი"),
        area: N.batumiCenter,
        nights: 1,
        note: "5 כוכבים · מרינה וטיילת · בריכה",
        link: "https://www.google.com/maps/search/Hilton+Batumi",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Shipwreck_Batumi_Georgia_R_Bartz.jpg/960px-Shipwreck_Batumi_Georgia_R_Bartz.jpg",
      },
      {
        name: fmt("Intourist Palace", "Intourist Palace Batumi", "Intourist"),
        area: N.batumiBoulevard,
        nights: 1,
        note: "מלון קלאסי על הטיילת · נוף לים",
        link: "https://www.google.com/maps/search/Intourist+Palace+Batumi",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Batumi_Boulevard_Magnolia.jpg/960px-Batumi_Boulevard_Magnolia.jpg",
      },
    ],
  },
  2: {
    heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Mtirala_National_Park.jpg/960px-Mtirala_National_Park.jpg",
    summary:
      "יום מלא של טבע ואדרנלין. יציאה מוקדמת מבאטומי, עצירה ביער הגשם מטיראלה – zipline, באגים ומסלולי הליכה. אחר הצהריים המשך נסיעה מזרחה לקוטאיסי, עיר היסטורית ושער לעבר אזורי ההרים.",
    tips: [
      "לצאת מוקדם (8:00) – מטיראלה + נסיעה ארוכה",
      "מעיל גשם ונעלי hiking – יער גשום באמת",
      "zipline – להזמין מראש בעונה",
      "למלא דלק לפני יציאה מבאטומי",
    ],
    activityExtras: [
      {
        timeOfDay: "09:00–13:00",
        duration: "3–4 שעות",
        tips: ["כרטיס ל-zipline – לבדוק שעות פתיחה", "נעליים שעולות במים לבריכה הטבעית"],
        image: "IMG.mtirala",
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
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/2014_Kutaisi%2C_Wielka_Synagoga_%2801%29.jpg/960px-2014_Kutaisi%2C_Wielka_Synagoga_%2801%29.jpg",
      },
    ],
    extraRestaurants: [
      {
        name: fmt("Palaty", "Palaty Restaurant", "Palaty"),
        cuisine: "גיאורגית מסורתית · סופרה",
        area: N.kutaisi,
        note: "אחת המסעדות המומלצות בקוטאיסי",
        link: "https://www.google.com/maps/search/Palaty+restaurant+Kutaisi",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Georgian_supra.jpg/960px-Georgian_supra.jpg",
      },
      {
        name: fmt("Sapere", "Sapere Restaurant", "Sapere"),
        cuisine: "גיאורגית מודרנית",
        area: N.kutaisi,
        note: "אווירה נעימה, מתאים לערב ראשון בעיר",
        link: "https://www.google.com/maps/search/Sapere+Kutaisi",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/2014_Kutaisi%2C_Wielka_Synagoga_%2801%29.jpg/960px-2014_Kutaisi%2C_Wielka_Synagoga_%2801%29.jpg",
      },
    ],
    extraHotels: [
      {
        name: fmt("Hotel Grand Opera", "Hotel Grand Opera", "Grand Opera"),
        area: N.kutaisi,
        nights: 2,
        note: "בסיס לימים 2–3 · קרוב לכיכר",
        link: "https://www.google.com/maps/search/Hotel+Grand+Opera+Kutaisi",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/2014_Kutaisi%2C_Wielka_Synagoga_%2801%29.jpg/960px-2014_Kutaisi%2C_Wielka_Synagoga_%2801%29.jpg",
      },
    ],
  },
  3: {
    heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/2025-06-17_Katskhi_pillar_2.jpg/960px-2025-06-17_Katskhi_pillar_2.jpg",
    summary:
      "ימים 3–4: תרבות, מים ואקסטרים. יום 3 (25.9): אזור קוטאיסי וצ'יאתורה – התכנון המקורי (קצחי, Urbex, Lia, מגווימבי) או אופציה ב' – Via Ferrata באימרתי עם Rafting in Kutaisi + גיחה לקצחי. לינה: מרכז קוטאיסי.",
    tips: [
      "Lunch at Lia – חובה לשלוח וואטסאפ מראש! (בתכנון המקורי)",
      "רכבל Sanatorium בצ'יאתורה – מרגש אבל ישן",
      "עמוד קצחי – צילום מהכביש · גם באופציה ב'",
      "אופציה ב' – להזמין Via Ferrata מראש עם Rafting in Kutaisi",
      "להתחיל מוקדם – הרבה עצירות",
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
    extraRestaurants: [
      {
        name: fmt("Palaty", "Palaty Restaurant", "Palaty"),
        cuisine: "גיאורגית · ארוחת ערב",
        area: N.kutaisi,
        note: "אם חוזרים מוקדם – ארוחת ערב בעיר",
        link: "https://www.google.com/maps/search/Palaty+Kutaisi",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Tbilisi%2C_Khachapuri_and_khinkali%2C_Georgian_traditional_food%2C_Georgia.jpg/960px-Tbilisi%2C_Khachapuri_and_khinkali%2C_Georgian_traditional_food%2C_Georgia.jpg",
      },
    ],
    extraHotels: [
      {
        name: fmt("Best Western Kutaisi", "Best Western Kutaisi", "Best Western"),
        area: N.kutaisi,
        nights: 1,
        note: "חלופה נוחה עם חניה",
        link: "https://www.google.com/maps/search/Best+Western+Kutaisi",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/2014_Kutaisi%2C_Wielka_Synagoga_%2801%29.jpg/960px-2014_Kutaisi%2C_Wielka_Synagoga_%2801%29.jpg",
      },
    ],
  },
  4: {
    heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Racha_Region%2C_Georgia.jpg/960px-Racha_Region%2C_Georgia.jpg",
    summary:
      "יום 4 (26.9): נהר הריוני והטיפוס לחבל ראצ'ה. התכנון המקורי: רפטינג רגוע (2–3) → מאגר שאורי → יקב. אופציה ב': יום כפול עם Rafting in Kutaisi – רפטינג + קניונינג בנהר שאראולה (Shareula). לינה: אמברולאורי (בשתי האופציות).",
    tips: [
      "רפטינג – להזמין מראש, להביא בגדים להחלפה",
      "אופציה ב' – יום ארוך ומאתגר, לתאם מראש עם Rafting in Kutaisi",
      "ראצ'ה – כבישים מפותלים, לנהוג לאט",
      "טעימות יין – לא לנהוג אחרי! (בתכנון המקורי)",
      "לקנות בקבוק Khvanchkara – מתנה מעולה",
    ],
    activityExtras: [
      {
        timeOfDay: "09:00–12:00",
        duration: "2–3 שעות",
        tips: ["להביא בגד ים / להחליף", "שקית waterproof לטלפון"],
        image: "IMG.rafting",
      },
      { timeOfDay: "13:30–14:30", duration: "45 דק'", image: "IMG.racha" },
      { timeOfDay: "15:00–17:00", duration: "1.5 שעות", image: "IMG.wine" },
    ],
    extraRestaurants: [
      {
        name: fmt("Racha Tavern", "Racha Tavern", "რაჭული საცხობი"),
        cuisine: "מטבח ראצ'ה · lobio, khachapuri",
        area: N.ambrolauri,
        note: "מנות כפריות אותנטיות",
        link: "https://www.google.com/maps/search/restaurant+Ambrolauri",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Georgian_supra.jpg/960px-Georgian_supra.jpg",
      },
    ],
    extraHotels: [
      {
        name: fmt("Guesthouse Racha", "Guesthouse in Racha", "სასტუმრო რაჭა"),
        area: `${N.ambrolauri}, ${N.racha}`,
        nights: 1,
        note: "גסטהאוס כפרי – חוויה אותנטית",
        link: "https://www.google.com/maps/search/guesthouse+Ambrolauri+Racha",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Racha_Region%2C_Georgia.jpg/960px-Racha_Region%2C_Georgia.jpg",
      },
    ],
  },
  5: {
    heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Prometheus_cave%2C_Georgia.jpg/960px-Prometheus_cave%2C_Georgia.jpg",
    summary:
      "יום Urbex וגיאולוגיה. בוקר: סיור בסנטוריומים הסובייטיים הנטושים של צקאלטובו. אחר הצהריים: מערת פרומתאוס – מערה תת-קרקעית מוארת עם stalactites מרהיבים. לינה בזוגדידי או מרטווילי (מומלץ – קרוב לקניונים).",
    tips: [
      "צקאלטובו – לא תמיד בטוח להיכנס לבניינים נטושים",
      "מערת פרומתאוס – סווטר, כ-14°C בפנים",
      "לינה במרטווילי חוסכת נסיעה בוקר ליום 6",
      "להזמין כרטיסים למערה מראש בעונה",
    ],
    activityExtras: [
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
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Prometheus_cave%2C_Georgia.jpg/960px-Prometheus_cave%2C_Georgia.jpg",
      },
      {
        name: fmt("Martvili Local Restaurant", "Martvili Restaurant", "მარტვილი"),
        cuisine: "גיאורגית · Samegrelo",
        area: N.martvili,
        note: "אם לנים במרטווילי – ארוחת ערב",
        link: "https://www.google.com/maps/search/restaurant+Martvili",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Martvili_Canyon_View.jpg/960px-Martvili_Canyon_View.jpg",
      },
    ],
    extraHotels: [
      {
        name: fmt("Guesthouse Martvili", "Guesthouse Martvili", "მარტვილი"),
        area: N.martvili,
        nights: 2,
        note: "מומלץ – קרוב לקניונים (ימים 5–6)",
        link: "https://www.google.com/maps/search/guesthouse+Martvili",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Martvili_Canyon_View.jpg/960px-Martvili_Canyon_View.jpg",
      },
    ],
  },
  6: {
    heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Martvili_Canyon_View.jpg/960px-Martvili_Canyon_View.jpg",
    summary:
      "יום טבע אקסטרים. שלושה אתרים: קניון אוקאצה עם גשר תלוי, קניון מרטווילי בשייט סירות, ומעיינות חמים פראיים בנוקאלאקבי – רחצה בטבע אחרי יום הליכות.",
    tips: [
      "להתחיל באוקאצה – פחות עמוס בבוקר",
      "בגד ים / מגבת למעיינות",
      "שייט מרטווילי – כרטיסים, עמוס בעונה",
      "נעליים עם grip לגשרים",
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
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Okatse_Canyon%2C_Imereti%2C_Georgia.jpg/960px-Okatse_Canyon%2C_Imereti%2C_Georgia.jpg",
      },
      {
        name: fmt("Martvili Restaurant", "Restaurant Martvili", "მარტვილი"),
        cuisine: "גיאורגית · elarji, khachapuri",
        area: N.martvili,
        note: "מנות Samegrelo מסורתיות",
        link: "https://www.google.com/maps/search/restaurant+Martvili+canyon",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Martvili_Canyon_View.jpg/960px-Martvili_Canyon_View.jpg",
      },
    ],
  },
  7: {
    heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Mestia%2C_evening.jpg/1280px-Mestia%2C_evening.jpg",
    summary:
      "יום עלייה לסוואנטי – אחד הימים המרהיבים במסלול. יציאה מזוגדידi בבוקר, נסיעה של כ-4–5 שעות (140 ק\"מ) לאורך נהר Enguri הטורקיזi. עצירה חובה בסכר אנגורי – מהסכרים הגבוהים באירופה. הגעה למסטיה – עיירה אלפינית בגובה 1,500 מ' עם מגדלי אבן, מוזיאון ונוף להרים. ערב: ארוחה מקומית והכנה ליום Ushguli.",
    tips: [
      "יציאה מוקדם – 08:00. כביש serpentine – SUV + נהיגה זהירה",
      "למלא דלק בזוגדידי – אין תחנות בהרים",
      "מזג אוויר משתנה – שכבות, מעיל, כובע",
      "להזמין מסטיה + ג'יפ ל-Ushguli מראש (Booking / המלון)",
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
    extraRestaurants: [
      {
        name: fmt("Laila Restaurant", "Laila Restaurant Mestia", "Laila"),
        cuisine: "סוואנטי · kubdari, tashmijabi",
        area: N.mestia,
        note: "מסעדה מפורסמת – kubdari (בשר במאפה)",
        link: "https://www.google.com/maps/search/Laila+Restaurant+Mestia",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Mestia%2C_evening.jpg/960px-Mestia%2C_evening.jpg",
      },
      {
        name: fmt("Samushao Marani", "Samushao Marani", "Samushao"),
        cuisine: "גיאורגית + יין מקומי",
        area: N.mestia,
        note: "ארוחת ערב עם יין Svanetian",
        link: "https://www.google.com/maps/search/Samushao+Marani+Mestia",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Georgian_supra.jpg/960px-Georgian_supra.jpg",
      },
    ],
    extraHotels: [
      {
        name: fmt("Hotel Posta", "Hotel Posta Mestia", "Posta"),
        area: N.mestia,
        nights: 2,
        note: "מלון מרכזי · בסיס לימים 7–8",
        link: "https://www.google.com/maps/search/Hotel+Posta+Mestia",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Mestia%2C_evening.jpg/960px-Mestia%2C_evening.jpg",
      },
      {
        name: fmt("Guesthouse Mestia", "Guesthouse in Mestia", "სასტუმრო მესტია"),
        area: `${N.mestia}, ${N.svaneti}`,
        nights: 2,
        note: "גסטהאוס משפחתי – חוויה מקומית",
        link: "https://www.google.com/maps/search/guesthouse+Mestia",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Mestia%2C_evening.jpg/960px-Mestia%2C_evening.jpg",
      },
    ],
  },
  8: {
    heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Ushguli%2C_lonely_tower.jpg/960px-Ushguli%2C_lonely_tower.jpg",
    summary:
      "היום הגדול של סוואנטי. נסיעת ג'יפ 4x4 עם נהג מקומי ל-Ushguli – הכפר המיושb ב-Europa, UNESCO. רכיבה על סוסים או הליכה לקרחון Shkhara.",
    tips: [
      "ג'יפ + נהג – חובה, לא לנסוע לבד",
      "להזמין מראש במסטיה",
      "בגדים חמים – גבוה ורוח",
      "מזומן לנהג ולסוסים",
    ],
    activityExtras: [
      {
        timeOfDay: "08:00–12:00",
        duration: "4 שעות",
        tips: ["ג'יפ מהמרכז", "מצלמה – סוללה"],
        image: "IMG.ushguli",
      },
      {
        timeOfDay: "12:00–15:00",
        duration: "2–3 שעות",
        tips: ["סוסים – לסגור מחיר מראש", "snacks + מים"],
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
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Ushguli%2C_lonely_tower.jpg/960px-Ushguli%2C_lonely_tower.jpg",
      },
    ],
    extraHotels: [
      {
        name: fmt("Hotel Posta", "Hotel Posta Mestia", "Posta"),
        area: N.mestia,
        nights: 1,
        note: "לילה שני במסטיה",
        link: "https://www.google.com/maps/search/Hotel+Posta+Mestia",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Mestia%2C_evening.jpg/960px-Mestia%2C_evening.jpg",
      },
    ],
  },
  9: {
    heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Ushba.jpg/960px-Ushba.jpg",
    summary:
      "בוקר: טרק קל לקרחון צ'לאדי ממסטיה. אחר הצהריים: איסוף ציוד, נסיעה 45 דק' למאזרי – בקתת עץ בלב עמק בצו, נוף ישיר לפסגת אושבה. ערב רגוע בטבע.",
    tips: [
      "צ'לאדי – לצאת מוקדם",
      "לארוז ל-2 לילות בבקתה",
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
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Ushba.jpg/960px-Ushba.jpg",
      },
      {
        name: fmt("Laila – לפני היציאה", "Laila before departure", "Laila"),
        cuisine: "ארוחת צהריים",
        area: N.mestia,
        note: "אם יוצאים ממסטיה אחרי הצ'לאדי",
        link: "https://www.google.com/maps/search/Laila+Mestia",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Mestia%2C_evening.jpg/960px-Mestia%2C_evening.jpg",
      },
    ],
    extraHotels: [
      {
        name: fmt("Guesthouse Mazeri", "Guesthouse Mazeri", "მაზერი"),
        area: N.bechoValley,
        nights: 2,
        note: "חלופות: Ushba Homestead, Guesthouse Mazeri",
        link: "https://www.google.com/maps/search/guesthouse+Mazeri+Ushba",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Ushba.jpg/960px-Ushba.jpg",
      },
    ],
  },
  10: {
    heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Ushba.jpg/960px-Ushba.jpg",
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
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Ushba.jpg/960px-Ushba.jpg",
      },
    ],
  },
  11: {
    heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Anaklia_pier.jpg/960px-Anaklia_pier.jpg",
    summary:
      "יום מעבר מההרים לים. יציאה מהבקתה במאזרי, תצפית ב-Koruldi Lakes, ארמon Dadiani בזוגdidi, הגעה לחוף אנaklia על הים השחור.",
    tips: [
      "Koruldi – כֱ שטח",
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
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Anaklia_pier.jpg/960px-Anaklia_pier.jpg",
      },
      {
        name: fmt("Zugdidi Lunch", "Restaurant Zugdidi", "ზუგდიდი"),
        cuisine: "גיאורגית · בדרך",
        area: N.zugdidi,
        note: "ארוחת צהריים לפני / אחרי Dadiani",
        link: "https://www.google.com/maps/search/restaurants+Zugdidi",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Anaklia_pier.jpg/960px-Anaklia_pier.jpg",
      },
    ],
    extraHotels: [
      {
        name: fmt("Paragraph Resort", "Paragraph Resort Shekvetili", "Paragraph"),
        area: N.shekvetili,
        nights: 1,
        note: "חלופה יוקרתית – קרוב, עם spa",
        link: "https://www.google.com/maps/search/Paragraph+Resort+Shekvetili",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Anaklia_pier.jpg/960px-Anaklia_pier.jpg",
      },
    ],
  },
  12: {
    heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Shipwreck_Batumi_Georgia_R_Bartz.jpg/960px-Shipwreck_Batumi_Georgia_R_Bartz.jpg",
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
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Shipwreck_Batumi_Georgia_R_Bartz.jpg/960px-Shipwreck_Batumi_Georgia_R_Bartz.jpg",
      },
      { timeOfDay: "13:30–17:00", duration: "2–3 שעות", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Shipwreck_Batumi_Georgia_R_Bartz.jpg/960px-Shipwreck_Batumi_Georgia_R_Bartz.jpg" },
      { timeOfDay: "18:00–21:00", duration: "2 שעות", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Tbilisi%2C_Khachapuri_and_khinkali%2C_Georgian_traditional_food%2C_Georgia.jpg/960px-Tbilisi%2C_Khachapuri_and_khinkali%2C_Georgian_traditional_food%2C_Georgia.jpg" },
    ],
    extraRestaurants: [
      {
        name: fmt("Ureki Beach Cafe", "Cafe Ureki", "ურეკი"),
        cuisine: "ארוחה קלה · חוף",
        area: N.ureki,
        note: "צהריים על החוף",
        link: "https://www.google.com/maps/search/restaurant+Ureki",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Shipwreck_Batumi_Georgia_R_Bartz.jpg/960px-Shipwreck_Batumi_Georgia_R_Bartz.jpg",
      },
      {
        name: fmt("San Remo", "San Remo Batumi", "San Remo"),
        cuisine: "גיאורגית · חוף",
        area: N.batumiBoulevard,
        note: "חלופה לערב – על הטיילת",
        link: "https://www.google.com/maps/search/San+Remo+Batumi",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Khachapuri_%28Adjarian%29.jpg/960px-Khachapuri_%28Adjarian%29.jpg",
      },
    ],
    extraHotels: [
      {
        name: fmt("Hilton Batumi", "Hilton Batumi", "Hilton"),
        area: N.batumiCenter,
        nights: 1,
        note: "נוח לפני טיסה – שירות טוב",
        link: "https://www.google.com/maps/search/Hilton+Batumi",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Shipwreck_Batumi_Georgia_R_Bartz.jpg/960px-Shipwreck_Batumi_Georgia_R_Bartz.jpg",
      },
    ],
  },
  13: {
    heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Batumi_Airport.jpg/960px-Batumi_Airport.jpg",
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
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Batumi_Airport.jpg/960px-Batumi_Airport.jpg",
      },
    ],
    extraRestaurants: [
      {
        name: fmt("ארוחת בוקר במלון", "Hotel breakfast", "საუზმე"),
        cuisine: "בוקר לפני היציאה",
        area: N.batumi,
        note: "רוב המלונות – buffet מוקדם",
        link: "https://www.google.com/maps/search/hotels+near+Batumi+airport",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Batumi_Airport.jpg/960px-Batumi_Airport.jpg",
      },
      {
        name: fmt("קפה בשדה", "Airport cafe", "აეროპორტი"),
        cuisine: "קפה / snack",
        area: N.batumiAirport,
        note: "אם נשאר זמן אחרי check-in",
        link: "https://www.google.com/maps/search/Batumi+airport+cafe",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Batumi_Airport.jpg/960px-Batumi_Airport.jpg",
      },
    ],
  },
};

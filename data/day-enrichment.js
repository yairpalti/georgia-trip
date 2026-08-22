/** Extra detail merged into DAYS at render time – see enrichDay() in app.js */
const DAY_ENRICHMENT = {
  1: {
    heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Batumi_skyline.jpg/1280px-Batumi_skyline.jpg",
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
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Batumi_International_Airport.jpg/640px-Batumi_International_Airport.jpg",
      },
      {
        timeOfDay: "19:30–22:00",
        duration: "2–3 שעות",
        tips: ["להזמין חצ'פורי אג'רי מיד – לוקח זמן", "הטיילת ארוכה ונעימה גם עם ילדים"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Batumi_boulevard.jpg/640px-Batumi_boulevard.jpg",
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
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Batumi_Old_Town.jpg/640px-Batumi_Old_Town.jpg",
      },
    ],
    extraRestaurants: [
      {
        name: fmt("San Remo", "San Remo Restaurant", "San Remo"),
        cuisine: "גיאורגית וים תיכונית · נוף לים",
        area: N.batumiBoulevard,
        note: "מסעדה פופולרית על הטיילת – חצ'פורי, דגים וסalads",
        link: "https://www.google.com/maps/search/San+Remo+Restaurant+Batumi",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Khachapuri_%28Adjarian%29.jpg/640px-Khachapuri_%28Adjarian%29.jpg",
      },
      {
        name: fmt("Ethno-Tavern Sanapiro", "Ethno-Tavern Sanapiro", "Sanapiro"),
        cuisine: "מסעדה אתנית גיאורגית · מוזיקה חיה",
        area: N.batumi,
        note: "אווירה אותנטית, מנות מסורתיות, מתאים למשפחות",
        link: "https://www.google.com/maps/search/Ethno+Tavern+Sanapiro+Batumi",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Georgian_supra.jpg/640px-Georgian_supra.jpg",
      },
    ],
    extraHotels: [
      {
        name: fmt("Hilton Batumi", "Hilton Batumi", "Hilton ბათუმი"),
        area: N.batumiCenter,
        nights: 1,
        note: "5 כוכבים · מרינה וטיילת · בריכה",
        link: "https://www.google.com/maps/search/Hilton+Batumi",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Batumi_skyline.jpg/640px-Batumi_skyline.jpg",
      },
      {
        name: fmt("Intourist Palace", "Intourist Palace Batumi", "Intourist"),
        area: N.batumiBoulevard,
        nights: 1,
        note: "מלון קלאסי על הטיילת · נוף לים",
        link: "https://www.google.com/maps/search/Intourist+Palace+Batumi",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Batumi_boulevard.jpg/640px-Batumi_boulevard.jpg",
      },
    ],
  },
  2: {
    heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Mtirala_National_Park.jpg/1280px-Mtirala_National_Park.jpg",
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
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Mtirala_National_Park.jpg/640px-Mtirala_National_Park.jpg",
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
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Kutaisi_Center%2C_Georgia.jpg/640px-Kutaisi_Center%2C_Georgia.jpg",
      },
    ],
    extraRestaurants: [
      {
        name: fmt("Palaty", "Palaty Restaurant", "Palaty"),
        cuisine: "גיאורגית מסורתית · סופרה",
        area: N.kutaisi,
        note: "אחת המסעדות המומלצות בקוטאיסי",
        link: "https://www.google.com/maps/search/Palaty+restaurant+Kutaisi",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Georgian_supra.jpg/640px-Georgian_supra.jpg",
      },
      {
        name: fmt("Sapere", "Sapere Restaurant", "Sapere"),
        cuisine: "גיאורגית מודרנית",
        area: N.kutaisi,
        note: "אווירה נעימה, מתאים לערב ראשון בעיר",
        link: "https://www.google.com/maps/search/Sapere+Kutaisi",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Kutaisi_Center%2C_Georgia.jpg/640px-Kutaisi_Center%2C_Georgia.jpg",
      },
    ],
    extraHotels: [
      {
        name: fmt("Hotel Grand Opera", "Hotel Grand Opera", "Grand Opera"),
        area: N.kutaisi,
        nights: 2,
        note: "בסיס לימים 2–3 · קרוב לכיכר",
        link: "https://www.google.com/maps/search/Hotel+Grand+Opera+Kutaisi",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Kutaisi_Center%2C_Georgia.jpg/640px-Kutaisi_Center%2C_Georgia.jpg",
      },
    ],
  },
  3: {
    heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Katskhi_pillar.jpg/1280px-Katskhi_pillar.jpg",
    summary:
      "יום Urbex ונוסטלגיה סובייטית. מסלול מעגלי מקוטאיסי: עמוד קצחי המרהיב, צ'יאתורה עם רכבלים עתיקים, ארוחת צהריים אצל Lia, ומנזר מגווימבי חצוב בסלע.",
    tips: [
      "Lunch at Lia – חובה לשלוח וואטסאפ מראש!",
      "רכבל Sanatorium בצ'יאתורה – מרגש אבל ישן",
      "עמוד קצחי – צילום מהכביש",
      "להתחיל מוקדם – הרבה עצירות",
    ],
    activityExtras: [
      { timeOfDay: "09:00–10:00", duration: "45 דק'", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Katskhi_pillar.jpg/640px-Katskhi_pillar.jpg" },
      {
        timeOfDay: "10:30–13:00",
        duration: "2–2.5 שעות",
        tips: ["רכבל Sanatorium – הכי מפורסם", "לצלם תחנות נטושות"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Chiatura_cable_car.jpg/640px-Chiatura_cable_car.jpg",
      },
      {
        timeOfDay: "13:00–14:30",
        duration: "1.5 שעות",
        tips: ["WhatsApp מראש – חובה!", "מזומן מומלץ"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Georgian_supra.jpg/640px-Georgian_supra.jpg",
      },
      {
        timeOfDay: "15:00–16:00",
        duration: "45 דק'",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Mgvimevi_Monastery.jpg/640px-Mgvimevi_Monastery.jpg",
      },
    ],
    extraRestaurants: [
      {
        name: fmt("Palaty", "Palaty Restaurant", "Palaty"),
        cuisine: "גיאורגית · ארוחת ערב",
        area: N.kutaisi,
        note: "אם חוזרים מוקדם – ארוחת ערב בעיר",
        link: "https://www.google.com/maps/search/Palaty+Kutaisi",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Khinkali_Georgian_dumplings.jpg/640px-Khinkali_Georgian_dumplings.jpg",
      },
    ],
    extraHotels: [
      {
        name: fmt("Best Western Kutaisi", "Best Western Kutaisi", "Best Western"),
        area: N.kutaisi,
        nights: 1,
        note: "חלופה נוחה עם חניה",
        link: "https://www.google.com/maps/search/Best+Western+Kutaisi",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Kutaisi_Center%2C_Georgia.jpg/640px-Kutaisi_Center%2C_Georgia.jpg",
      },
    ],
  },
  4: {
    heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Racha_Region%2C_Georgia.jpg/1280px-Racha_Region%2C_Georgia.jpg",
    summary:
      "יום הרפתקאות ויין. בוקר: רפטינג על נהר הריוני (רמה 2–3, מתאים למשפחות). צהריים: עלייה לראצ'ה – אזור יין ויער ירוק. תצפית במאגר שאורי, טעימות יין ביקב Khvanchkara.",
    tips: [
      "רפטינג – להזמין מראש, להביא בגדים להחלפה",
      "ראצ'ה – כבישים מפותלים, לנהוג לאט",
      "טעימות יין – לא לנהוג אחרי!",
      "לקנות בקבוק Khvanchkara – מתנה מעולה",
    ],
    activityExtras: [
      {
        timeOfDay: "09:00–12:00",
        duration: "2–3 שעות",
        tips: ["להביא בגד ים / להחליף", "שקית waterproof לטלפון"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Rafting_in_Georgia.jpg/640px-Rafting_in_Georgia.jpg",
      },
      { timeOfDay: "13:30–14:30", duration: "45 דק'", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Racha_Region%2C_Georgia.jpg/640px-Racha_Region%2C_Georgia.jpg" },
      { timeOfDay: "15:00–17:00", duration: "1.5 שעות", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Georgian_wine.jpg/640px-Georgian_wine.jpg" },
    ],
    extraRestaurants: [
      {
        name: fmt("Racha Tavern", "Racha Tavern", "რაჭული საცხობი"),
        cuisine: "מטבח ראצ'ה · lobio, khachapuri",
        area: N.ambrolauri,
        note: "מנות כפריות אותנטיות",
        link: "https://www.google.com/maps/search/restaurant+Ambrolauri",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Georgian_supra.jpg/640px-Georgian_supra.jpg",
      },
    ],
    extraHotels: [
      {
        name: fmt("Guesthouse Racha", "Guesthouse in Racha", "სასტუმრო რაჭა"),
        area: `${N.ambrolauri}, ${N.racha}`,
        nights: 1,
        note: "גסטהאוס כפרי – חוויה אותנטית",
        link: "https://www.google.com/maps/search/guesthouse+Ambrolauri+Racha",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Racha_Region%2C_Georgia.jpg/640px-Racha_Region%2C_Georgia.jpg",
      },
    ],
  },
  5: {
    heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Prometheus_Cave%2C_Georgia.jpg/1280px-Prometheus_Cave%2C_Georgia.jpg",
    summary:
      "יום Urbex וגיאולוגיה. בוקר: סיור בסנטוריומים הסובייטיים הנטושים של צקאלטובו. אחר הצהריים: מערת פרומתאוס – מערה תת-קרקעית מוארת עם stalactites מרהיבים. לינה בזוגדידי או מרטווili (מומלץ – קרוב לקניונים).",
    tips: [
      "צקאלטובו – לא תמיד בטוח להיכנס לבניינים נטושים",
      "מערת פרומתאוס – סweater, כ-14°C בפנים",
      "לינה במרטווili חוסכת נסיעה בוקר ליום 6",
      "להזמין כרטיסים למערה מראש בעונה",
    ],
    activityExtras: [
      {
        timeOfDay: "09:00–12:00",
        duration: "2–3 שעות",
        tips: ["נעליים סגורות", "פנס לחלקים חשוכים"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Tskaltubo_sanatorium.jpg/640px-Tskaltubo_sanatorium.jpg",
      },
      {
        timeOfDay: "13:30–16:00",
        duration: "1.5–2 שעות",
        tips: ["סweater חובה", "צילום מותר"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Prometheus_Cave%2C_Georgia.jpg/640px-Prometheus_Cave%2C_Georgia.jpg",
      },
    ],
    extraRestaurants: [
      {
        name: fmt("Cafe Prometheus", "Cafe near Prometheus Cave", "კაფე"),
        cuisine: "ארוחה קלה · ליד המערה",
        area: N.prometheusCave,
        note: "נוח אחרי הסיור במערה",
        link: "https://www.google.com/maps/search/restaurant+Prometheus+Cave+Georgia",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Prometheus_Cave%2C_Georgia.jpg/640px-Prometheus_Cave%2C_Georgia.jpg",
      },
      {
        name: fmt("Martvili Local Restaurant", "Martvili Restaurant", "მარტვილი"),
        cuisine: "גיאורגית · Samegrelo",
        area: N.martvili,
        note: "אם לנים במרטווili – ארוחת ערב",
        link: "https://www.google.com/maps/search/restaurant+Martvili",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Martvili_Canyon.jpg/640px-Martvili_Canyon.jpg",
      },
    ],
    extraHotels: [
      {
        name: fmt("Guesthouse Martvili", "Guesthouse Martvili", "მარტვილი"),
        area: N.martvili,
        nights: 2,
        note: "מומלץ – קרוב לקניונים (ימים 5–6)",
        link: "https://www.google.com/maps/search/guesthouse+Martvili",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Martvili_Canyon.jpg/640px-Martvili_Canyon.jpg",
      },
    ],
  },
  6: {
    heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Martvili_Canyon.jpg/1280px-Martvili_Canyon.jpg",
    summary:
      "יום טבע אקstremי. שלושה אתרים: קניון אוקאצה עם גשר תלוי, קניון מרטווili בשייט סירות, ומעיינות חמים פראיים בנוקאלאקevi – רחצה בטבע אחרי יום הליכות.",
    tips: [
      "להתחיל באוקאצה – פחות עמוס בבוקר",
      "בגד ים / מגבת למעיינות",
      "שייט מרטווili – כרטיסים, עמוס בעונה",
      "נעליים עם grip לגשרים",
    ],
    activityExtras: [
      {
        timeOfDay: "09:00–11:30",
        duration: "2 שעות",
        tips: ["לא מתאים לפחד גובה"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Okatse_Canyon.jpg/640px-Okatse_Canyon.jpg",
      },
      { timeOfDay: "12:00–14:00", duration: "1.5 שעות", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Martvili_Canyon.jpg/640px-Martvili_Canyon.jpg" },
      {
        timeOfDay: "15:00–17:00",
        duration: "1–2 שעות",
        tips: ["בגד ים", "מגבת"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Martvili_Canyon.jpg/640px-Martvili_Canyon.jpg",
      },
    ],
    extraRestaurants: [
      {
        name: fmt("Okatse Canyon Cafe", "Cafe at Okatse", "ოკაცე"),
        cuisine: "ארוחה קלה · נוף לקניון",
        area: N.okatseCanyon,
        note: "נוח לצהריים לפני מרטווili",
        link: "https://www.google.com/maps/search/Okatse+Canyon+cafe",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Okatse_Canyon.jpg/640px-Okatse_Canyon.jpg",
      },
      {
        name: fmt("Martvili Restaurant", "Restaurant Martvili", "მარტვილი"),
        cuisine: "גיאורגית · elarji, khachapuri",
        area: N.martvili,
        note: "מנות Samegrelo מסורתיות",
        link: "https://www.google.com/maps/search/restaurant+Martvili+canyon",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Martvili_Canyon.jpg/640px-Martvili_Canyon.jpg",
      },
    ],
  },
  7: {
    heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Mestia%2C_Georgia.jpg/1280px-Mestia%2C_Georgia.jpg",
    summary:
      "יום עלייה להרים. נסיעה דרך סכr אנגורi – מהגבohים בעולm. המשך serpentine לעיירה Alpine מסטיה – בירת סוואנטi, מגdלי אבן, מוזיאon, הכנה לימי הטרk.",
    tips: [
      "כביש מפותל – לנהוג לאט",
      "למלא דלק בזוגדidi – נדיר בהרים",
      "מזג אוויר משתנה – שכבות",
      "להזמין מסטיה מראש – עונה עמusה",
    ],
    activityExtras: [
      { timeOfDay: "10:00–11:00", duration: "45 דק'", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Enguri_Dam.jpg/640px-Enguri_Dam.jpg" },
      {
        timeOfDay: "12:30–18:00",
        duration: "יום שלם",
        tips: ["מוזיאon – לבדוק שעות", "להזמין ג'ip ל-Ushguli מראש"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Mestia%2C_Georgia.jpg/640px-Mestia%2C_Georgia.jpg",
      },
    ],
    extraRestaurants: [
      {
        name: fmt("Laila Restaurant", "Laila Restaurant Mestia", "Laila"),
        cuisine: "סvanetian · kubdari, tashmijabi",
        area: N.mestia,
        note: "מסעדה מפורסמת – kubdari (בשר במאפה)",
        link: "https://www.google.com/maps/search/Laila+Restaurant+Mestia",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Mestia%2C_Georgia.jpg/640px-Mestia%2C_Georgia.jpg",
      },
      {
        name: fmt("Samushao Marani", "Samushao Marani", "Samushao"),
        cuisine: "גיאורgית + יין מקומי",
        area: N.mestia,
        note: "ארוחת ערב עם יין Svanetian",
        link: "https://www.google.com/maps/search/Samushao+Marani+Mestia",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Georgian_supra.jpg/640px-Georgian_supra.jpg",
      },
    ],
    extraHotels: [
      {
        name: fmt("Hotel Posta", "Hotel Posta Mestia", "Posta"),
        area: N.mestia,
        nights: 2,
        note: "מלון מרכzי · בסיס לימים 7–8",
        link: "https://www.google.com/maps/search/Hotel+Posta+Mestia",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Mestia%2C_Georgia.jpg/640px-Mestia%2C_Georgia.jpg",
      },
      {
        name: fmt("Guesthouse Mestia", "Guesthouse in Mestia", "სასტუმრო მესტია"),
        area: `${N.mestia}, ${N.svaneti}`,
        nights: 2,
        note: "גסטהאוס משפחתi – חוויה מקומית",
        link: "https://www.google.com/maps/search/guesthouse+Mestia",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Mestia%2C_Georgia.jpg/640px-Mestia%2C_Georgia.jpg",
      },
    ],
  },
  8: {
    heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Ushguli_village.jpg/1280px-Ushguli_village.jpg",
    summary:
      "היום הגדול של סוואנטi. נסיעת ג'ip 4x4 עם נהג מקומi ל-Ushguli – הכפר המיושb ב-Europa, UNESCO. רchצה על סוסים או הlיכה לקרchon Shkhara.",
    tips: [
      "ג'ip + נהג – חובה, לא לנסוע לבד",
      "להזמין מראש במסטיה",
      "בגדים חmים – גboה ורוח",
      "מזומן לנהג ולסוסים",
    ],
    activityExtras: [
      {
        timeOfDay: "08:00–12:00",
        duration: "4 שעות",
        tips: ["ג'ip מהמרכz", "מצלמה – סוללה"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Ushguli_village.jpg/640px-Ushguli_village.jpg",
      },
      {
        timeOfDay: "12:00–15:00",
        duration: "2–3 שעות",
        tips: ["סוסים – לסgור מחיר מראש", "snacks + מים"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Ushguli_village.jpg/640px-Ushguli_village.jpg",
      },
    ],
    extraRestaurants: [
      {
        name: fmt("Ushguli Cafe", "Cafe in Ushguli", "უშგული"),
        cuisine: "ארוחה כפרית · kubdari",
        area: N.ushguli,
        note: "ארוחת צהריים בכפר",
        link: "https://www.google.com/maps/search/Ushguli+restaurant",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Ushguli_village.jpg/640px-Ushguli_village.jpg",
      },
    ],
    extraHotels: [
      {
        name: fmt("Hotel Posta", "Hotel Posta Mestia", "Posta"),
        area: N.mestia,
        nights: 1,
        note: "לילה שני במסטיה",
        link: "https://www.google.com/maps/search/Hotel+Posta+Mestia",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Mestia%2C_Georgia.jpg/640px-Mestia%2C_Georgia.jpg",
      },
    ],
  },
  9: {
    heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Ushba.jpg/1280px-Ushba.jpg",
    summary:
      "בוקר: טרk קלil לקרchon צ'לאדי ממסטיה. אחר הצהריים: איסוף צiוד, נסיעה 45 דק' למאזרi – בקתת עץ בלב עמק בצ'o, נוף ישיר לפסגat אושba. ערb rגוע בטבע.",
    tips: [
      "צ'לאדי – לצאת מוקדm",
      "לארוז ל-2 לילות בבקתה",
      "מזון – מוגbל במאזרi, לקנות במסטיה",
      "נעליים waterproof לטרk",
    ],
    activityExtras: [
      {
        timeOfDay: "08:00–11:00",
        duration: "2–3 שעות",
        tips: ["מים + snacks", "מקלות hiking"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Chalaadi_glacier.jpg/640px-Chalaadi_glacier.jpg",
      },
      {
        timeOfDay: "13:00–18:00",
        duration: "45 דק' + ערב",
        tips: ["להזמין בקתה מראש", "להביא אוכל לערב"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Ushba.jpg/640px-Ushba.jpg",
      },
    ],
    extraRestaurants: [
      {
        name: fmt("ארוחה בבקתה", "Meals at the cabin", "კოტეჯში"),
        cuisine: "בישול עצmי / ארוחה מהמארchת",
        area: N.mazeriCabin,
        note: "לרכוש supplies במסטיה לפני ההגעה",
        link: "https://www.google.com/maps/search/Mestia+supermarket",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Ushba.jpg/640px-Ushba.jpg",
      },
      {
        name: fmt("Laila – לפני היציאה", "Laila before departure", "Laila"),
        cuisine: "ארוחת צהריים",
        area: N.mestia,
        note: "אם יוצאים ממסטיה אחרי הצ'לאדי",
        link: "https://www.google.com/maps/search/Laila+Mestia",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Mestia%2C_Georgia.jpg/640px-Mestia%2C_Georgia.jpg",
      },
    ],
    extraHotels: [
      {
        name: fmt("Guesthouse Mazeri", "Guesthouse Mazeri", "მაზერი"),
        area: N.bechoValley,
        nights: 2,
        note: "חלופות: Ushba Homestead, Guesthouse Mazeri",
        link: "https://www.google.com/maps/search/guesthouse+Mazeri+Ushba",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Ushba.jpg/640px-Ushba.jpg",
      },
    ],
  },
  10: {
    heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Ushba.jpg/1280px-Ushba.jpg",
    summary:
      "התעוררות בטבע. המסlול אל מפל שדוגרה יוצא ממש מהעמק – 4–5 שעות הlיכה מאתgת. אחרי הטרk: מקlחת חmה ולילה שני rגוע בבקתה.",
    tips: [
      "לצאת מוקדm – הטרk ארוך",
      "מים, אוכל, שכbת גשm",
      "נעליים עם grip",
      "לא לנסות להגיע לבסis המפל – מסוכn",
    ],
    activityExtras: [
      {
        timeOfDay: "07:30–13:00",
        duration: "4–5 שעות",
        tips: ["מקלות", "שכbת גשm"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Ushba.jpg/640px-Ushba.jpg",
      },
      {
        timeOfDay: "13:00–ערב",
        duration: "אחר הצהריים",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Ushba.jpg/640px-Ushba.jpg",
      },
    ],
    extraRestaurants: [
      {
        name: fmt("ארוחות בבקתה", "Cabin meals", "კოტეჯი"),
        cuisine: "בישול עצmי",
        area: N.mazeriCabin,
        note: "ארוחות מה שהבאתם + אפשרות ארוחה מהמארchת",
        link: "https://www.google.com/maps/search/guesthouse+Mazeri",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Ushba.jpg/640px-Ushba.jpg",
      },
    ],
  },
  11: {
    heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Anaklia_pier.jpg/1280px-Anaklia_pier.jpg",
    summary:
      "יום מעבר מההרים לים. יציאה מהבקתה במאזרi, תצפית ב-Koruldi Lakes, ארמon Dadiani בזוגdidi, הגעה לחof אנaklia על הים השחור.",
    tips: [
      "Koruldi – כbיש שטch",
      "לבדוק שעות Dadiani Palace",
      "בגד ים לאנaklia",
      "לינה על החof – נוח לילדים",
    ],
    activityExtras: [
      { timeOfDay: "08:00–10:00", duration: "1.5 שעות", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Mestia%2C_Georgia.jpg/640px-Mestia%2C_Georgia.jpg" },
      { timeOfDay: "11:30–13:00", duration: "1 שעה", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Anaklia_pier.jpg/640px-Anaklia_pier.jpg" },
      { timeOfDay: "15:00–ערב", duration: "אחר הצהריים", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Anaklia_pier.jpg/640px-Anaklia_pier.jpg" },
    ],
    extraRestaurants: [
      {
        name: fmt("Anaklia Beach Restaurant", "Beach restaurant Anaklia", "ანაკლია"),
        cuisine: "דגים · גיאורgית · נוף לים",
        area: N.anaklia,
        note: "ארוחת ערb על החof",
        link: "https://www.google.com/maps/search/restaurant+Anaklia+beach",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Anaklia_pier.jpg/640px-Anaklia_pier.jpg",
      },
      {
        name: fmt("Zugdidi Lunch", "Restaurant Zugdidi", "ზუგდიდი"),
        cuisine: "גיאורgית · בדרך",
        area: N.zugdidi,
        note: "ארוחת צהריים לפני / אחרי Dadiani",
        link: "https://www.google.com/maps/search/restaurants+Zugdidi",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Anaklia_pier.jpg/640px-Anaklia_pier.jpg",
      },
    ],
    extraHotels: [
      {
        name: fmt("Paragraph Resort", "Paragraph Resort Shekvetili", "Paragraph"),
        area: N.shekvetili,
        nights: 1,
        note: "חלופa יוקratית – קרוב, עם spa",
        link: "https://www.google.com/maps/search/Paragraph+Resort+Shekvetili",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Anaklia_pier.jpg/640px-Anaklia_pier.jpg",
      },
    ],
  },
  12: {
    heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Batumi_skyline.jpg/1280px-Batumi_skyline.jpg",
    summary:
      "יום כיף לפני הסיom. אורkי / שקvetili – חof חול מgneti, סpורt יmi. Tsitsinatela – פark שעשועים על החof. חזרה לבאטomi – חinkali חgigי בעיר העתiקה.",
    tips: [
      "אופnועי ים – לסgור מחיר",
      "Tsitsinatela – כרטisים online",
      "חnיה בבאטomi – לשאl מlון",
      "ארוחת סיom – להזמין מקom",
    ],
    activityExtras: [
      {
        timeOfDay: "09:00–13:00",
        duration: "3–4 שעות",
        tips: ["בגד ים", "קרem שמש"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Batumi_skyline.jpg/640px-Batumi_skyline.jpg",
      },
      { timeOfDay: "13:30–17:00", duration: "2–3 שעות", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Batumi_skyline.jpg/640px-Batumi_skyline.jpg" },
      { timeOfDay: "18:00–21:00", duration: "2 שעות", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Khinkali_Georgian_dumplings.jpg/640px-Khinkali_Georgian_dumplings.jpg" },
    ],
    extraRestaurants: [
      {
        name: fmt("Ureki Beach Cafe", "Cafe Ureki", "ურეკი"),
        cuisine: "ארוחה קלה · חof",
        area: N.ureki,
        note: "צהריים על החof",
        link: "https://www.google.com/maps/search/restaurant+Ureki",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Batumi_skyline.jpg/640px-Batumi_skyline.jpg",
      },
      {
        name: fmt("San Remo", "San Remo Batumi", "San Remo"),
        cuisine: "גיאורgית · חof",
        area: N.batumiBoulevard,
        note: "חלופa לערb – על הטiילת",
        link: "https://www.google.com/maps/search/San+Remo+Batumi",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Khachapuri_%28Adjarian%29.jpg/640px-Khachapuri_%28Adjarian%29.jpg",
      },
    ],
    extraHotels: [
      {
        name: fmt("Hilton Batumi", "Hilton Batumi", "Hilton"),
        area: N.batumiCenter,
        nights: 1,
        note: "נוח לפני טisה – שירות טוב",
        link: "https://www.google.com/maps/search/Hilton+Batumi",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Batumi_skyline.jpg/640px-Batumi_skyline.jpg",
      },
    ],
  },
  13: {
    heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Batumi_International_Airport.jpg/1280px-Batumi_International_Airport.jpg",
    summary:
      "יom קצr – המראה 09:35. השכמה מוקדm (06:00), ארוחת בוקר, החzרת רכb, check-in, המראה LY5114 חזרה לתל אבiv.",
    tips: [
      "לhנות mלון עם early check-out / shuttle לשdה",
      "להחzיר רכb מלא בדלk",
      "להגיע לשdה 2 שעות לפני",
      "שקילת מזוdנות – חזרה הביתה",
    ],
    activityExtras: [
      {
        timeOfDay: "06:30–09:35",
        duration: "3 שעות",
        tips: ["דלq – תחnות ליד שdה", "נוזלים – רק ב-hand luggage"],
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Batumi_International_Airport.jpg/640px-Batumi_International_Airport.jpg",
      },
    ],
    extraRestaurants: [
      {
        name: fmt("ארוחת בוקר במlון", "Hotel breakfast", "საუზმე"),
        cuisine: "בוקר לפני היציאה",
        area: N.batumi,
        note: "רoב המlונות – buffet מוקדm",
        link: "https://www.google.com/maps/search/hotels+near+Batumi+airport",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Batumi_International_Airport.jpg/640px-Batumi_International_Airport.jpg",
      },
      {
        name: fmt("קofe בשdה", "Airport cafe", "აეროპორტი"),
        cuisine: "קofe / snack",
        area: N.batumiAirport,
        note: "אם נשאר זמן אחרי check-in",
        link: "https://www.google.com/maps/search/Batumi+airport+cafe",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Batumi_International_Airport.jpg/640px-Batumi_International_Airport.jpg",
      },
    ],
  },
};

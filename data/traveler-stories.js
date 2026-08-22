/** Traveler stories per day – rendered on stories.html?id=N */
const TRAVELER_STORIES = {
  1: {
    pageIntro:
      "סיפורים והמלצות ממטיילים – רלוונטיים להגעה, התאקלמות ותחילת המסע. מקור מרכזי: סיכום ביניים מטיול משפחתי לסוואנטי, אוגוסט 2026.",
    stories: [
      {
        title: "גיאורגיה – ארץ מופלאה ונגישה",
        author: "משפחה (6 נפשות)",
        date: "אוגוסט 2026",
        image: "IMG.batumi",
        paragraphs: [
          "ראשית, באמת ארץ מופלאה – הנופים, אנשים מסבירי פנים, האוכל, הכל יוצא מן הכלל ונגיש לכיס.",
          "יצאנו משפחה בהרכב של 6 (הורים ו-4 ילדים: 18, 17, 13, 7) – קצת מאתגר מבחינת הצרכים והיכולות השונות, והצלחנו למצוא שילוב מוצלח שהתאים רוב הזמן.",
          "עיקר הטיול בחבל סוואנטי עוצר הנשימה – הדרך אליו פתלתלה ומאתגרת, אך שווה את המאמץ: נוף פנורמי, קצוות מחודדים מושלגים, מפלים, פריחה מ-ט-ו-ר-פ-ת, פרפרים ומגדלי מבצר. אף תמונה לא תעביר באמת את היופי (גם לא עשרות סיניות עם מצלמות משוכללות…).",
        ],
        links: [
          { label: "מפת Google – המסלול שלנו", url: "https://maps.app.goo.gl/7n7fm83nZTDq31La7" },
        ],
      },
    ],
  },
  2: {
    pageIntro: "קוטאיסי כבסיס – סיפורי הגעה, לינה וארוחות בוקר מפנקות.",
    stories: [
      {
        title: "הגעה, נהג פרטי ומלון בקוטאיסי",
        author: "משפחה (6 נפשות)",
        date: "אוגוסט 2026",
        image: "IMG.kutaisi",
        paragraphs: [
          "במסלול דומה: נחיתה בערב, נהג עם שלט מחכה לנסיעה של כ-3 שעות לקוטאיסי – מלון נוח עם ארוחת בוקר מפנקת בטירוף (אחח, פאנקייקים עם הריבות הביתיות מיד – זה משהו).",
          "לא בטוחה שההליכות בטרקים קיזזו את הקלוריות… אבל שווה.",
          "טיפ: אם מגיעים מאוחר – לוודא מראש ארוחת בוקר במלון וחניה.",
        ],
        links: [
          { label: N.kutaisi + " – Google Maps", url: "https://www.google.com/maps/search/Kutaisi+Georgia" },
          { label: "Palaty Restaurant", url: "https://www.google.com/maps/search/Palaty+Kutaisi" },
        ],
        gallery: [
          {
            src: "IMG.supra",
            caption: "ארוחה גיאורגית טיפוסית",
          },
        ],
      },
    ],
  },
  3: {
    pageIntro: "טיפים למשפחות עם גילאים מעורבים – רלוונטי גם לימי הטרק בהמשך.",
    stories: [
      {
        title: "משפחה עם ילדים בגילאים שונים",
        author: "משפחה (6 נפשות)",
        date: "אוגוסט 2026",
        image: "IMG.katskhi",
        paragraphs: [
          "עם 4 ילדים בגילאים 7–18 – חשוב לתכנן ימים עם שילוב: בוקר פעיל, אחר צהריים רגוע, ולפעמים 'חצי מסלול' לילדים צעירים.",
          "SIM מקומי (Magti) – 22 לארי ל-SIM, כולל שיחות – שווה כל לארי לשקט ביתי בין מתבגרים ולתקשורת. עצירה ב-Magti ל-5 סימים לוקחת 5 דקות.",
          "אוכל בדרך: ח'צפורי, lobio ממולא בשר (טעים, קצת חריף – לכשרים: לבדוק מראש).",
        ],
        links: [
          { label: "Magti – סים", url: "https://www.google.com/maps/search/Magti+Georgia" },
          { label: N.lunchAtLia, url: "https://www.google.com/maps/search/Lunch+at+Lia+Georgia" },
        ],
      },
    ],
  },
  4: {
    pageIntro: "ראצ'ה ונהרות – טיפים מהשטח על נהיגה ויין.",
    stories: [
      {
        title: "נהיגה בגיאורגיה – שמח שלא נהגנו (לפעמים)",
        author: "משפחה (6 נפשות)",
        date: "אוגוסט 2026",
        image: "IMG.racha",
        paragraphs: [
          "במסלול סוואנטי: 'איזה כייף שלא צריך לנהוג' – כבישים עם פרות, מפולות סלעים, עבודות, בורות. אפשר לנהוג לבד, אבל חובה רכב גבוה ונהיגה מיומנת.",
          "אחרי טעימות יין בראצ'ה – לא לנהוג. להזמין נהג/מונית או ללון באזור.",
        ],
        links: [
          { label: N.khvanchkaraWinery, url: "https://www.google.com/maps/search/Khvanchkara+Winery" },
          { label: N.rioniRiver + " – rafting", url: "https://www.google.com/maps/search/Rioni+River+rafting" },
        ],
      },
    ],
  },
  5: {
    pageIntro: "צקאלטובו, מערות – חוויות Urbex וטיפים לנסיעה.",
    stories: [
      {
        title: "כבישים מאתגרים – מה לצפות",
        author: "מטיילים לסוואנטי",
        date: "אוגוסט 2026",
        image: "IMG.prometheus",
        paragraphs: [
          "השעה וחצי האחרונות לפני מסטיה: חתחתים עם פרות, מפולות, עבודות בכביש, בורות. SUV + נהיגה זהירה – חובה.",
          "לפני עלייה להרים: לקנות מצרכים, מזומן, חטיפים – ATM במסטיה מוגבל, לצאת עם מזומן.",
        ],
        links: [
          { label: N.prometheusCave, url: "https://www.google.com/maps/search/Prometheus+Cave+Georgia" },
          { label: N.tskaltubo, url: "https://www.google.com/maps/search/Tskaltubo+sanatorium" },
        ],
      },
    ],
  },
  6: {
    pageIntro: "קניונים ומפלי מרטווילי – כולל עדכון חשוב מהשטח.",
    stories: [
      {
        title: "עדכון ממפלי מרטווילי – אל תיפלו למלכודת",
        author: "משפחה (6 נפשות)",
        date: "אוגוסט 2026",
        image: "IMG.martvili",
        paragraphs: [
          "עדכון ממפלי מרטווילי: הפארק הרשמי (השמורה) – מיותר, מלכודת תיירים.",
          "עדיף ללכת למפל הסמוך המהמם – שם אפשר לשחות גם במים הקפואים, או למפלים בסביבה.",
          "חזרנו דרך אושגולי למפלי מרטווילי – הדרך הרבה יותר קצרה ונוחה, עם נוף מהמם.",
        ],
        links: [
          { label: N.martviliCanyon, url: "https://www.google.com/maps/search/Martvili+Canyon" },
          { label: N.martvili + " – מפלים בסביבה", url: "https://www.google.com/maps/search/Martvili+waterfall" },
          { label: N.okatseCanyon, url: "https://www.google.com/maps/search/Okatse+Canyon" },
        ],
        gallery: [
          {
            src: "IMG.okatse",
            caption: N.okatseCanyon,
          },
        ],
      },
    ],
  },
  7: {
    pageIntro:
      "יום עלייה למסטיה – נסיעה ארוכה, סכר אנגורי, אגמי קורולדי. מקור: סיכום ביניים מטיול מסטיה–אושגולי, אוגוסט 2026.",
    stories: [
      {
        title: "נסיעה למסטיה – 6 שעות, Magti וסכר אנגורי",
        author: "משפחה (6 נפשות)",
        date: "אוגוסט 2026",
        image: "IMG.enguriDam",
        paragraphs: [
          "נסיעה של 6 שעות דרך זוגדידי – עצירת חָחָפורי/lobio בדרך, שהתארכה בגלל עצירה מרהיבה של שעה+ ב-Enguri Dam – אחד הסכרים הגדולים באירופה, מדהים, כולל אומגה מטורפת מעל (לא לבעלי לב חלש).",
          "הדרך למסטיה לאורך נהר טורקיזי. השעה וחצי האחרונות: חתחתים, פרות, מפולות, בורות. נהג מקומי שווה זהב – קבענו איסוף מאושגולי שבוע אחרי.",
          "עצירה ב-Magti: 5 סימים, 22 לארי כל אחד, ללא הגבלה כולל שיחות.",
        ],
        links: [
          { label: N.enguriDam, url: "https://www.google.com/maps/search/Enguri+Dam" },
          { label: N.mestia, url: "https://www.google.com/maps/search/Mestia+Georgia" },
          { label: "Magti", url: "https://www.google.com/maps/search/Magti+Georgia" },
        ],
      },
      {
        title: "אגמי Koruldi – יום מנוחה לפני הטרק",
        author: "משפחה (6 נפשות)",
        date: "אוגוסט 2026",
        image: "IMG.mestia",
        paragraphs: [
          "בזכות המלצה – הקדשנו יום ל'מנוחה' לפני הטרק הגדול. בעל הגסטהאוס ארגן ג'יפ + נהג (300 לארי – אפשר בפחות, אבל היו מעולים).",
          "אי אפשר עם רכב רגיל – הוזהרתם. הדרך למעלה – הלב והסרעפת מחליפים מקום. נוף 360° של הרים מושלגים, שלוליות (לא אגמים ענקיים) – אבל מלחמת שלג מושלמת.",
          "ירדנו ברגל לבקתת הקפה – קפה משובח, עוגיות בית, מרק. להביא ברכיים, מעיל גשם לסנובורד. לא לעלות בלי ראות טובה.",
          "במסטיה: מונית (50 לארי) חוסכת 4 ק\"מ הליכה. למעלה – מיץ דובדבנים ממותק שווה.",
        ],
        links: [
          { label: N.koruldiLakes, url: "https://www.google.com/maps/search/Koruldi+Lakes" },
          { label: "Hotel Posta Mestia", url: "https://www.google.com/maps/search/Hotel+Posta+Mestia" },
        ],
        gallery: [
          {
            src: "IMG.ushba",
            caption: N.ushba,
          },
        ],
      },
    ],
  },
  8: {
    pageIntro:
      "הלב של סוואנטי – טרק מסטיה–זהאבשי–אדישי–אושגולי, guesthouses, טיפים ומחירי מוניות. מקור מרכזי: אוגוסט 2026.",
    stories: [
      {
        title: "טרק מסטיה – זהאבשי – אדישי – אושגולי (ימים 4–7)",
        author: "משפחה (6 נפשות)",
        date: "אוגוסט 2026",
        image: "IMG.ushguli",
        paragraphs: [
          "העולם מתחלק לשניים: מי שמטפסים 900 מ' בקלילות, ומי שמקצרים – אבל אפשר גם וגם! עם ילד בן 7 – קילומטר וחצי עם עליות זה המקסימום (וחטיפי אנרגיה).",
          "בזכות נהגים מקומיים והקפצות – גם אנחנו נהנינו מנוף מטורף: 4 גלגלים, אוטו גבוה, גם אם יצא מקוסטריצה משנות ה-70.",
          "טיפים למהלכים: להתאמן לפני, mapy.cz offline, מגנזיום, תמיסת אנרגיה, קרם הגנה, דוחה חרקים (זבובי ענק!), מעיל גשם, צווארון לסופת ברקים, Booking מראש, מזומן, פחות זה יותר, מקלות.",
          "זהאבשי: לעלות דרך המסלול לא בכביש עפר. הקפצה לפיק אחרי הרכבל – הרוב בירידה לאדישי.",
          "אדישי: בית קפה מעל – בירה/אבטיח. לינה – לבחור בחכמה.",
        ],
        links: [
          { label: N.ushguli, url: "https://www.google.com/maps/search/Ushguli" },
          { label: "Mapy.cz – מפות offline", url: "https://mapy.cz/" },
          { label: "Zhabeshi", url: "https://www.google.com/maps/search/Zhabeshi+Georgia" },
        ],
      },
      {
        title: "Guesthouses בולטים בטרק",
        author: "משפחה (6 נפשות)",
        date: "אוגוסט 2026",
        image: "IMG.ushguli",
        paragraphs: [
          "זהאבשי – Ciuri (גם Tsiuri): מקסים, מאקה נהדרת, ארוחות מעולות, ריבת פטל מהשיח (תשאירו קצת!).",
          "קהלדה – Gaul Gavkhe: מפנק ברמות, הכי טוב בכל הטיול. שווה השקעה.",
          "אושגולי – Chazhashi guesthouse: נוף מהמם, אוכל מושקע, ארגנה טיול סוסים.",
          "קהלדה – מפל מ-ה-מ-ם: 1.3 ק\"מ מהשביל, שביל קטן 20 מ' – בן 7 חגג במים הקפאים. סנדלים לבוץ. דוחה חרקים.",
        ],
        links: [
          { label: "Ciuri Guesthouse Zhabeshi", url: "https://www.google.com/maps/search/Ciuri+guesthouse+Zhabeshi" },
          { label: "Gaul Gavkhe Khaleda", url: "https://www.google.com/maps/search/Gaul+Gavkhe+Khalde" },
          { label: "Chazhashi Guesthouse Ushguli", url: "https://www.google.com/maps/search/Chazhashi+guesthouse+Ushguli" },
        ],
      },
      {
        title: "מחירי מוניות (לארי) – מסטיה וסביבה",
        author: "מטיילים · אוגוסט 2026",
        date: "אוגוסט 2026",
        image: "IMG.mestia",
        paragraphs: [
          "שדה תעופה–קוטאיסי–מסטיה: 700",
          "אושגולי–מרטווילי–קוטאיסי–טביליסי: 770",
          "מסטיה–זהאבשי: 100 | זהאבשי–אדישי: 200 (כולל פיק) | אדישי–קהלדה: 200",
          "קהלדה–אושגולי: 150 (+150 לקרחון עם המתנה)",
          "אפשר לנהוג לבד – חובה רכב גבוה ונהיגים מיומנים.",
        ],
        links: [
          { label: N.shkharaGlacier, url: "https://www.google.com/maps/search/Shkhara+Glacier" },
        ],
      },
    ],
  },
  9: {
    pageIntro: "מסטיה → צ'לאדי → בקתה במאזרי. טיפים מהטרק הרב-יומי בסוואנטי.",
    stories: [
      {
        title: "טרק קל יותר – גם עם ילדים",
        author: "משפחה (6 נפשות)",
        date: "אוגוסט 2026",
        image: "IMG.chalaadi",
        paragraphs: [
          "צ'לאדי – מסלול קל יחסית לעומת שדוגרה. אותם עקרונות: מקלות, שכבת גשם, חטיפים, מים, התחלה מוקדם.",
          "לפני יציאה למאזרי – לקנות מצרכים במסטיה: מזומן מהכספומט (הרבה!), אוכל לבקתה, חטיפי אנרגיה.",
          "בקתה – פחות זה יותר, אבל אל תחסירו מעיל וגשם.",
        ],
        links: [
          { label: N.chalaadiGlacier, url: "https://www.google.com/maps/search/Chalaadi+Glacier" },
          { label: N.mazeri, url: "https://www.google.com/maps/search/Mazeri+Georgia" },
        ],
      },
    ],
  },
  10: {
    pageIntro: "טרק שדוגרה מהבקתה – חוויה מאתג מהקהילה.",
    stories: [
      {
        title: "שדוגרה – המפל הגבוה בגיאורגיה",
        author: "מטיילים · אוגוסט 2026",
        date: "אוגוסט 2026",
        image: "IMG.ushba",
        paragraphs: [
          "4–5 שעות הליכה מאתג. אותם טיפים מהטרק לסוואנטי: mapy offline, מגנזיום, דוחה חרקים, מעיל גשם לסופת ברקים פתאומית.",
          "לא לנסות להגיע לבסיס המפל – מסוכן. תצפית מספיק מרהיב.",
          "אחרי הטרק – מקלחת חמה בבקתה = אושר.",
        ],
        links: [
          { label: N.shdugraWaterfall, url: "https://www.google.com/maps/search/Shdugra+Waterfall" },
          { label: N.bechoValley, url: "https://www.google.com/maps/search/Becho+Valley+Mazeri" },
        ],
      },
    ],
  },
  11: {
    pageIntro: "ירידה מההרים – Koruldi, דרך זוגדידי, אנאקליה.",
    stories: [
      {
        title: "חזרה דרך מרטווילי – קצר ונוח",
        author: "משפחה (6 נפשות)",
        date: "אוגוסט 2026",
        image: "IMG.anaklia",
        paragraphs: [
          "חזרנו דרך אושגולי למפלי מרטווילי – הדרך הרבה יותר קצרה ונוחה ממה שחשbנו, נוף מהמם.",
          "Koruldi בבוקר – אם לא עליתם ביום 7, אפשר לשלב בירידה (ג'יפ!).",
          "אנאקליה – עיירת חוף רגועה אחרי סוואנטי.",
        ],
        links: [
          { label: N.anaklia, url: "https://www.google.com/maps/search/Anaklia+Georgia" },
          { label: N.dadianiPalace, url: "https://www.google.com/maps/search/Dadiani+Palace" },
        ],
      },
    ],
  },
  12: {
    pageIntro: "חוף, כיף – אחרי ההרים.",
    stories: [
      {
        title: "מסטיה לים – שינוי קצר מושלם",
        author: "מטיילים",
        date: "אוגוסט 2026",
        image: "IMG.batumi",
        paragraphs: [
          "אחרי סוואנטי – אורכי, ציצינאטלה ובאטומי מרגישים כמו עולם אחר. מומלץ יום 'כיף' לפני הטיסה.",
          "ח'צפורי אג'רi בטיילת – חובה לפני סיום.",
        ],
        links: [
          { label: N.ureki, url: "https://www.google.com/maps/search/Ureki+beach" },
          { label: N.tsitsinatela, url: "https://www.google.com/maps/search/Tsitsinatela" },
          { label: N.batumiBoulevard, url: "https://www.google.com/maps/search/Batumi+Boulevard" },
        ],
      },
    ],
  },
  13: {
    pageIntro: "יום המראה – טיפים אחרונים.",
    stories: [
      {
        title: "יום טיסה מבאטומי",
        author: "מטיילים",
        date: "אוגוסט 2026",
        image: "IMG.batumiAirport",
        paragraphs: [
          "החזרת רכֱ, דלק – תחנות ליד שדה. להגיע 2 שעות לפני.",
          "שקילת מזודנות – מזכרות מהטיול: guesthouses, נופים, lobio, פאנקיקים בקוטאיסי.",
          "תהנו – מקווים שעוזר!",
        ],
        links: [
          { label: N.batumiAirport, url: "https://www.google.com/maps/search/Batumi+International+Airport" },
        ],
      },
    ],
  },
};

if (typeof MESTIA_TREK_GUIDE !== "undefined") {
  const guideIntro = "מדריך מלא: georgia.org.il – טרק מסטיה–אושגולי (PDF 2024).";
  const guideSource = {
    label: "georgia.org.il – טרק מסטיה–אושגולי (PDF)",
    url: MESTIA_TREK_GUIDE.source.url,
  };
  const attachSource = (story) => ({
    ...story,
    source: story.source || guideSource,
  });

  for (const [dayId, guideStories] of Object.entries(MESTIA_TREK_GUIDE.byDay)) {
    const id = parseInt(dayId, 10);
    const withSource = guideStories.map(attachSource);
    if (!TRAVELER_STORIES[id]) {
      TRAVELER_STORIES[id] = { pageIntro: guideIntro, pageSource: guideSource, stories: [] };
    } else {
      TRAVELER_STORIES[id].pageIntro = `${guideIntro} ${TRAVELER_STORIES[id].pageIntro || ""}`.trim();
      TRAVELER_STORIES[id].pageSource = TRAVELER_STORIES[id].pageSource || guideSource;
    }
    TRAVELER_STORIES[id].stories = [...withSource, ...(TRAVELER_STORIES[id].stories || [])];
  }
}

if (typeof module !== "undefined") module.exports = { TRAVELER_STORIES };

/** מסלולים רגליים לפי יום – פרטים מלאים + Mapy.cz (שכבת turistická) */
function mapyUrl(lng, lat, z = 15) {
  return `https://mapy.cz/turisticka?x=${lng}&y=${lat}&z=${z}`;
}

function mapyEmbed(lng, lat, z = 14) {
  return `https://frame.mapy.cz/turisticka?x=${lng}&y=${lat}&z=${z}`;
}

const HIKING_TRAILS = {
  2: {
    intro: "יום מטיראלה – מסלול Tsablnari הוא המסלול העיקרי (קל–משפחתי). להוריד Mapy.cz offline לפני הכניסה ליער.",
    trails: [
      {
        id: "tsablnari",
        name: fmt("מסלול Tsablnari (יער ערמונים)", "Tsablnari Trail", "წაბლნარის ბილიკი"),
        length: "7 ק\"מ מעגלי",
        duration: "3–4 ש' (5–6 ש' עם zipline ושחייה)",
        difficulty: fmt("קל", "Easy", "მარტივი"),
        elevation: "260–445 מ'",
        type: fmt("מעגלי · יער גשם", "Loop · rainforest", "წრიული"),
        start: fmt("Chakvistavi – מרכז מבקרים", "Chakvistavi Visitor Center", "ჭაკვისთავი"),
        description:
          "מתחיל במרכז המבקרים. מעבר נהר Chakvistskali בכרמלית (₾2). אחרי ~1.5 ק\"מ – zipline ו-Rope Park. מפגש: ימינה למפל Tsablnari (15 מ'), שמאלה לאגם (שחייה). חזרה במעגל.",
        tips: [
          "מעיל גשם + נעליים waterproof – הפארק באמת גשום",
          "Mapy.cz offline – קליטה חלקית ביער",
          "מזומן ל-zipline / Rope Park (₾15–20)",
          "עונה: מאי–אוקטובר",
        ],
        gear: ["מעיל גשם", "נעלי hiking", "מים", "שקית waterproof לטלפון"],
        mapy: {
          lat: 41.8833,
          lng: 41.9833,
          zoom: 14,
          label: "Mapy.cz – Tsablnari / Mtirala",
        },
        links: [
          {
            label: fmt("APA – מסלול Tsablnari", "APA – Tsablnari Trail", "APA"),
            url: "https://apa.gov.ge/en/eco-tourism/Trails/mtiralas-erovnuli-parkis-turistuli-bilikebi-satesto/1-wablnaris-biliki",
          },
          {
            label: "Wikiloc – Mtirala",
            url: "https://www.wikiloc.com/trails/hiking/georgia/adjara/mtirala",
          },
        ],
        image: "IMG.mtirala",
      },
    ],
  },
  6: {
    intro: "קניון אוקאצה – מסלול הליכה על מדרגות וגשר תלוי (לא טרק הרים). מרטווילי = שייט, לא הליכה ארוכה.",
    trails: [
      {
        id: "okatse",
        name: N.okatseCanyon,
        length: "~2–3 ק\"מ הלוך-חזור (מהחניה/כניסה)",
        duration: "1.5–2 שעות",
        difficulty: fmt("קל–בינוני (פחד גובה)", "Easy–moderate (heights)", "საშუალო"),
        elevation: "גשר תלוי ~140 מ' מעל הקניון · אורך גשר ~780 מ'",
        type: fmt("הלוך-חזור · גשר תלוי", "Out & back · hanging bridge", "ხიდი"),
        start: fmt("חניון / כניסה Okatse Canyon", "Okatse Canyon entrance", "ოკაცე"),
        description:
          "מדרגות יורדות לקניון + גשר תלוי ארוך מעל הנחל. נופים דרמטיים. לא מתאים למי עם פחד גובה חזק. עמוס בצהריים – מומלץ בוקר.",
        tips: [
          "להתחיל מוקדם – פחות תורים",
          "נעליים עם אחיזה (רטוב/חלק)",
          "כרטיס כניסה בכניסה – לבדוק שעות",
          "לא לרוץ על הגשר",
        ],
        gear: ["נעליים סגורות", "מים", "מצלמה עם רצועה"],
        mapy: {
          lat: 42.4167,
          lng: 42.5167,
          zoom: 14,
          label: "Mapy.cz – Okatse Canyon",
        },
        links: [
          {
            label: fmt("Google Maps – Okatse", "Google Maps – Okatse", "Google"),
            url: "https://www.google.com/maps/search/Okatse+Canyon",
          },
          {
            label: "Wikiloc – Okatse",
            url: "https://www.wikiloc.com/trails/hiking/georgia/imereti/okatse",
          },
        ],
        image: "IMG.okatse",
      },
    ],
  },
  8: {
    intro: "מאושגולי – הליכה או סוסים לקרחון שחארה. מסטיה→אושגולי כביש לכל רכב; מאושגולי אפשר כמעט בכל רכב עד סוף הדרך, ואז הליכה.",
    trails: [
      {
        id: "shkhara",
        name: N.shkharaGlacier,
        length: "~8–10 ק\"מ הלוך-חזור מאושגולי (או פחות אם נוסעים עד סוף הדרך)",
        duration: "3–4 שעות הליכה (או נסיעה כמעט עד הסוף + הליכה קצרה / סוסים)",
        difficulty: fmt("קל–בינוני", "Easy–moderate", "საშუალო"),
        elevation: "עלייה מתונה · פסגת Shkhara 5,193 מ' ברקע",
        type: fmt("הלוך-חזור · עמק קרחון", "Out & back · glacier valley", "მყინვარი"),
        start: fmt("אושגולי – כפר / סוף דרך רכב", "Ushguli – village / end of driveable road", "უშგული"),
        description:
          "מאושגולי ממשיכים לאורך העמק לכיוון קרחון Shkhara. אפשר כמעט בכל רכב עד סוף הדרך; החלק האחרון הליכה. אופציה: סוסים. נוף לפסגות מושלגות.",
        tips: [
          "מסטיה→אושגולי: כביש לכל רכב (SUV מספיק)",
          "שחארה: רכב כמעט עד הסוף · הליכה בחלק האחרון",
          "שכבות – קריר ליד הקרחון",
          "מים + חטיפים – אין חנויות בדרך",
          "אל תתקרבו לקרחון עצמו – סכנת קריסה",
        ],
        gear: ["נעלי hiking", "מעיל רוח", "מים", "קרם הגנה", "משקפי שמש"],
        mapy: {
          lat: 42.93,
          lng: 43.04,
          zoom: 13,
          label: "Mapy.cz – Ushguli → Shkhara",
        },
        links: [
          {
            label: fmt("Google Maps – Shkhara", "Google Maps – Shkhara", "Google"),
            url: "https://www.google.com/maps/search/Shkhara+Glacier",
          },
          {
            label: "Wikiloc – Shkhara / Ushguli",
            url: "https://www.wikiloc.com/trails/hiking/georgia/samegrelo-zemo-svaneti/ushguli",
          },
        ],
        image: "IMG.shkhara",
      },
    ],
  },
  9: {
    intro: "טרק צ'לאדי ממסטיה – מסלול קל יחסית ביער אל הקרחון. אחר הצהריים מעבר לבקתה במאזרי.",
    trails: [
      {
        id: "chalaadi",
        name: N.chalaadiGlacier,
        length: "~8–14 ק\"מ הלוך-חזור (תלוי איפה חונים / יורדים מג'יפ)",
        duration: "2–4 שעות הליכה (3–4 ש' H/R מלא ממסטיה)",
        difficulty: fmt("קל–בינוני", "Easy–moderate", "საშუალო"),
        elevation: "עלייה ~300–400 מ'",
        type: fmt("הלוך-חזור · יער + קרחון", "Out & back · forest + glacier", "მყინვარი"),
        start: fmt("מסטיה / חניון כניסה לצ'לאדי", "Mestia / Chalaadi trailhead", "მესტია"),
        description:
          "ממסטיה מזרחה – דרך ג'יפים (סימון). אפשר ג'יפ עד גשר עץ ואז ~שעה טיפוס לקרחון. יער אשוח, נהר, נוף ל-Ushba. מתאים כטרק קליל לפני המעבר למאזרי.",
        tips: [
          "נעליים waterproof – בוץ ונהר",
          "אפשר לקצר עם ג'יפ עד הגשר",
          "התחלה מוקדם – אחר הצהריים מעבר למאזרי",
          "Mapy.cz offline לפני היציאה",
        ],
        gear: ["נעלי hiking waterproof", "מקלות (אופציונלי)", "מים", "חטיפים", "מעיל גשם"],
        mapy: {
          lat: 43.0667,
          lng: 42.6833,
          zoom: 13,
          label: "Mapy.cz – Chalaadi Glacier",
        },
        links: [
          {
            label: fmt("Google Maps – Chalaadi", "Google Maps – Chalaadi", "Google"),
            url: "https://www.google.com/maps/search/Chalaadi+Glacier+trail",
          },
          {
            label: "Wikiloc – Chalaadi",
            url: "https://www.wikiloc.com/trails/hiking/georgia/samegrelo-zemo-svaneti/chalaadi",
          },
        ],
        image: "IMG.chalaadi",
      },
    ],
  },
  10: {
    intro: "טרק שדוגרה מהבקתה במאזרי / עמק בצ'ו – יום הליכה מלא בלי נסיעות. המפל מהגבוהים בגיאורגיה.",
    trails: [
      {
        id: "shdugra",
        name: N.shdugraWaterfall,
        length: "~8–12 ק\"מ הלוך-חזור",
        duration: "4–5 שעות (עד 6–7 ש' לפי קצב)",
        difficulty: fmt("בינוני–מאתגר", "Moderate–challenging", "რთული"),
        elevation: "עלייה ~500–700 מ'",
        type: fmt("הלוך-חזור · מפל הרים", "Out & back · mountain waterfall", "ჩანჩქერი"),
        start: fmt("מאזרי / עמק בצ'ו – מהבקתה", "Mazeri / Becho – from cabin", "მაზერი"),
        description:
          "יוצאים מהבקתה בעמק בצ'ו. יער, גשרים, עלייה למפל Shdugra. נוף עוצר נשימה – לא חובה לרדת לבסיס המפל (מסוכן/חלק). אחרי הטרק: מקלחת חמה בבקתה.",
        tips: [
          "יציאה מוקדמת (07:00–08:00)",
          "מזג אוויר בהרים משתנה מהר – שכבת גשם",
          "דוחה חרקים (זבובים בעמק)",
          "Mapy.cz offline חובה",
          "לא לטפס על סלעים רטובים ליד המפל",
        ],
        gear: [
          "נעלי hiking",
          "מקלות",
          "מעיל גשם",
          "מים 1.5–2 ל'",
          "חטיפים / אנרגיה",
          "קרם הגנה",
          "דוחה חרקים",
        ],
        mapy: {
          lat: 43.0983,
          lng: 42.4833,
          zoom: 13,
          label: "Mapy.cz – Shdugra Waterfall",
        },
        links: [
          {
            label: fmt("Google Maps – Shdugra", "Google Maps – Shdugra", "Google"),
            url: "https://www.google.com/maps/search/Shdugra+Waterfall",
          },
          {
            label: "Wikiloc – Shdugra / Mazeri",
            url: "https://www.wikiloc.com/trails/hiking/georgia/samegrelo-zemo-svaneti/mazeri",
          },
        ],
        image: "IMG.shdugra",
      },
    ],
  },
};

if (typeof module !== "undefined") module.exports = { HIKING_TRAILS, mapyUrl, mapyEmbed };

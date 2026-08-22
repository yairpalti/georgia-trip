#!/usr/bin/env python3
"""Generate data/days.js with enriched day content."""

OUTPUT = "/Users/yair/Dev/georgia-trip/data/days.js"

HEADER = """/* Auto-generated enriched day content – edit scripts/generate-days.py and re-run */
const DAYS = [
"""

FOOTER = """
];

if (typeof module !== "undefined") module.exports = { DAYS };
"""

# Each day is raw JS object text (uses N, fmt, TRIP_META from other files)
DAYS_JS = r'''
  {
    id: 1,
    date: "23.9",
    weekday: "רביעי",
    title: `נחיתה ב${N.batumi.split(" · ")[0]} והתאקלמות`,
    emoji: "🌊",
    theme: "נחיתה, התאקלמות וטיילת",
    overnight: N.batumiCenter,
    driving: "כ-15–20 דק' (10 ק\"מ)",
    heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Batumi_skyline.jpg/1280px-Batumi_skyline.jpg",
    summary: "יום הגעה רגוע. נחיתה בשעה 18:10, איסוף רכב SUV בשדה התעופה, נסיעה קצרה למרכז העיר. ערב ראשון על טיילת הבוליבארד – ארוחה גיאורגית, הליכה לאורך הים והתרגלות לקצב הטיול.",
    tips: [
      "להזמין SUV מראש – חובה לכבישים הרריים בהמשך",
      "לקנות SIM/eSIM (Magti / Cellfie) בשדה או בבאטומי",
      "לא לעמיס יותר מדי בערב – מחר נסיעה ארוכה לקוטאיסי",
      "חניה בדרך כלל קלה ליד המלון – לשאול את הקבלה",
    ],
    activities: [
      {
        name: `נחיתה ואיסוף רכב – ${N.batumiAirport}`,
        timeOfDay: "18:00–19:00",
        duration: "כ-45 דק'",
        description: "נחיתה בטיסה LY5405, מעבר דרכונים, איסוף הרכב השכור (מומלץ SUV עם ביטוח מלא). הדרכה קצרה על הרכב, GPS/Waze מוכן. נסיעה קצרה של כ-10 ק\"מ למרכז באטומי.",
        tips: ["לצלם את מצב הרכב לפני יציאה", "לוודא שיש כבל USB / מטען"],
        link: "https://www.google.com/maps/search/Batumi+International+Airport",
        linkLabel: N.batumiAirport,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Batumi_International_Airport.jpg/640px-Batumi_International_Airport.jpg",
      },
      {
        name: N.batumiBoulevard,
        timeOfDay: "19:30–22:00",
        duration: "2–3 שעות",
        description: "הליכה על טיילת הבוליבארד – אחת הטיילות היפות בים השחור. מגדל אלפabet, פסל Ali & Nino, נוף לים, דוכנים ומוזיקה. ארוחת ערב ראשונה – חובה לטעום חצ'פורי אג'רי (עגול עם ביצת עין וחמאה).",
        tips: ["להזמין חצ'פורi אג'רי מיד כשמגיעים – לוקח זמן", "הטיילת ארוכה – נעים גם עם עגלת ילדים"],
        link: "https://www.google.com/maps/search/Batumi+Boulevard",
        linkLabel: N.batumiBoulevard,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Batumi_boulevard.jpg/640px-Batumi_boulevard.jpg",
      },
      {
        name: N.batumiOldTown,
        timeOfDay: "אופציונלי – ערב",
        duration: "45 דק'",
        description: "אם נשארו כוחות – סיבוב קצר בעיר העתיקה: סמטאות צבעוניות, קафה, אווירה אירופאית-מזרחית.",
        link: "https://www.google.com/maps/search/Batumi+old+town",
        linkLabel: N.batumiOldTown,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Batumi_Old_Town.jpg/640px-Batumi_Old_Town.jpg",
      },
    ],
    restaurants: [
      {
        name: fmt("San Remo", "San Remo Restaurant", "San Remo"),
        cuisine: "גיאורגית וים תיכונית · נוף לים",
        area: N.batumiBoulevard,
        note: "מסעדה פופולרית על הטיילת – חצ'פורi, דגים, סalatים",
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
      {
        name: fmt("Piazza Restaurant", "Piazza Restaurant", "Piazza"),
        cuisine: "גיאורגית · כיכר Piazza",
        area: fmt("כיכר Piazza", "Piazza Square", "პიაცა"),
        note: "מיקום מרכזי, תפריט מגוון, נוח אחרי הליכה",
        link: "https://www.google.com/maps/search/Piazza+Restaurant+Batumi",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Batumi_skyline.jpg/640px-Batumi_skyline.jpg",
      },
    ],
    hotels: [
      {
        name: fmt("Hilton Batumi", "Hilton Batumi", "Hilton ბათუმი"),
        area: N.batumiCenter,
        nights: 1,
        note: "5 כוכבים · מרינה וטיילת · בריכה",
        link: "https://www.google.com/maps/search/Hilton+Batumi",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Batumi_skyline.jpg/640px-Batumi_skyline.jpg",
      },
      {
        name: fmt("Intourist Palace", "Intourist Palace Batumi", "ინტourist"),
        area: N.batumiBoulevard,
        nights: 1,
        note: "מלון קlassי על הטיילת · נוף לים",
        link: "https://www.google.com/maps/search/Intourist+Palace+Batumi",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Batumi_boulevard.jpg/640px-Batumi_boulevard.jpg",
      },
      {
        name: N.batumiCenter,
        area: N.batumi,
        nights: 1,
        note: "אפשרות חסכונית – דירות / בoutique hotels במרכz",
        link: "https://www.google.com/maps/search/hotels+Batumi+center",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Batumi_Old_Town.jpg/640px-Batumi_Old_Town.jpg",
      },
    ],
    mapPoints: [{ name: N.batumi, lat: 41.6168, lng: 41.6367 }],
  },
  {
    id: 2,
    date: "24.9",
    weekday: "חמישי",
    title: `${N.mtirala.split(" · ")[0]} ו${N.kutaisi.split(" · ")[0]}`,
    emoji: "🌲",
    theme: "יער גשם ואדרנלין",
    overnight: fmt("מרכז קוטאיסi", "Kutaisi Center", "ქუთაისის ცენტრი"),
    driving: "כ-3.5 שעות (170 ק\"מ)",
    heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Mtirala_National_Park.jpg/1280px-Mtirala_National_Park.jpg",
    summary: "יום מלא של טבע ואדרנלין. יציאה מוקדמת מבאטומi, עצירה ביער הגשם מטיראלה – zipline, באגים ומסלולי הליכה. אחר הצהריים המשך נסיעה מזרחה לקוטאיסi, עיר היסטורית ושער לעבר אזורי ההרים.",
    tips: [
      "לצאת מוקדם (8:00) – מטיראלה + נסיעה ארוכה",
      "מעיל גשם / נעלי hiking – יער גשום באמת",
      "zipline – להזמין מראש בעונה",
      "למלא דלק לפני יציאה מבאטומi",
    ],
    activities: [
      {
        name: N.mtirala,
        timeOfDay: "09:00–13:00",
        duration: "3–4 שעות",
        description: "פארק לאומי מטיראלה – 'יער הגשם' הכי גשום בגיאורגיה. מסלול הליכה לבריכה טבעית ביער עבות, zipline מעל העצים, והשכרת באגים (ATV) על מסלולים ביער. חוויה מושלמת למשפחות עם ילדים גדולים.",
        tips: ["כרטis לzipline – לבדוק שעות פתיחה", "להביא נעליים שעולות במים לבריכה"],
        link: "https://www.google.com/maps/search/Mtirala+National+Park",
        linkLabel: N.mtirala,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Mtirala_National_Park.jpg/640px-Mtirala_National_Park.jpg",
      },
      {
        name: fmt("נסיעה לקוטאיסi", "Drive to Kutaisi", "ქუთაისში"),
        timeOfDay: "13:00–17:00",
        duration: "כ-3.5 שעות",
        description: "נסיעה לאורך חוף הים השחור ואז פנימה לעבר קוטאיסi – עיר הבירה ההיסטורית של גיאורגיה. עצירת קפה/צהריים בדרך (אופציונלי).",
        link: "https://www.google.com/maps/search/Kutaisi+Georgia",
        linkLabel: N.kutaisi,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Kutaisi_Center%2C_Georgia.jpg/640px-Kutaisi_Center%2C_Georgia.jpg",
      },
      {
        name: fmt("סיור ערב בקוטאיסi", "Evening in Kutaisi", "საღამო ქუთაისში"),
        timeOfDay: "18:00–21:00",
        duration: "2 שעות",
        description: "הליכה בכיכר הלב (White Bridge), גשר הזכוכית, אווירה נעימה. ארוחת ערב במסעדה מקומית.",
        link: "https://www.google.com/maps/search/Kutaisi+White+Bridge",
        linkLabel: N.kutaisi,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Kutaisi_Center%2C_Georgia.jpg/640px-Kutaisi_Center%2C_Georgia.jpg",
      },
    ],
    alternatives: [
      {
        name: fmt("יום רגוע בבאטומi", "Relaxed day in Batumi", "დასვენების დღე ბათუმში"),
        description: fmt(
          "אם מעדיפים לא לנהוג – יום נוסף בבאטומi: botanical garden, פארק 6 מאי, חוף.",
          "Skip driving – extra day in Batumi: botanical garden, 6 May Park, beach.",
          "მართვის გარეშე – დამატებითი დღე ბათუმში."
        ),
      },
    ],
    restaurants: [
      {
        name: fmt("Palaty", "Palaty Restaurant", "Palaty"),
        cuisine: "גיאורגית מסורתית · סupra",
        area: N.kutaisi,
        note: "אחת המסעדות המומלצות בקוטאיסi – חachapuri, khinkali",
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
      {
        name: fmt("Cafe Megruli", "Cafe Megruli", "Cafe Megruli"),
        cuisine: "מטbח מגרeli · ארוחות ביתיות",
        area: N.kutaisi,
        note: "מחירים סבירים, מנות גדולות",
        link: "https://www.google.com/maps/search/Cafe+Megruli+Kutaisi",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Khinkali_Georgian_dumplings.jpg/640px-Khinkali_Georgian_dumplings.jpg",
      },
    ],
    hotels: [
      {
        name: fmt("Best Western Kutaisi", "Best Western Kutaisi", "Best Western"),
        area: N.kutaisi,
        nights: 2,
        note: "מלון מודרני · מרכz · חניה",
        link: "https://www.google.com/maps/search/Best+Western+Kutaisi",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Kutaisi_Center%2C_Georgia.jpg/640px-Kutaisi_Center%2C_Georgia.jpg",
      },
      {
        name: fmt("Hotel Grand Opera", "Hotel Grand Opera", "Grand Opera"),
        area: N.kutaisi,
        nights: 2,
        note: "בסיס לימים 2–3 · קרוב לכיכר",
        link: "https://www.google.com/maps/search/Hotel+Grand+Opera+Kutaisi",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Kutaisi_Center%2C_Georgia.jpg/640px-Kutaisi_Center%2C_Georgia.jpg",
      },
    ],
    mapPoints: [
      { name: N.mtirala, lat: 41.8833, lng: 41.9833 },
      { name: N.kutaisi, lat: 42.2679, lng: 42.6946 },
    ],
  },
'''

# Continue with days 3-13 in the same file - I'll append via the script reading multiple parts

def main():
    with open(OUTPUT, "w", encoding="utf-8") as f:
        f.write(HEADER)
        f.write(DAYS_JS)
        # Read part 2 from embedded string below
        f.write(DAYS_JS_PART2)
        f.write(FOOTER)
    print(f"Wrote {OUTPUT}")

DAYS_JS_PART2 = r'''
  {
    id: 3,
    date: "25.9",
    weekday: "שישי",
    title: `${N.katskhiPillar.split(" · ")[0]} ו${N.chiatura.split(" · ")[0]}`,
    emoji: "🚠",
    theme: "סוריאליזם תעשייתי",
    overnight: fmt("מרכז קוטאיסi", "Kutaisi Center", "ქუთაისის ცენტრი"),
    driving: "כ-2 שעות מעגלי (130 ק\"מ)",
    heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Katskhi_pillar.jpg/1280px-Katskhi_pillar.jpg",
    summary: "יום Urbex ונostalgia סובייטית. מסלול מעגלי מקוטאיסi: עמוד קצחi המרהיב, צ'יאתורה עם רכבלים עתיקים, ומנזר מגווימבי חצוב בסלע. ארוחת צהריים חובה אצל Lia – להזמין מראש!",
    tips: [
      "Lunch at Lia – חובה WhatsApp מראש!",
      "רכבל Sanatorium בצ'יאתורה – מרגש אבל ישן, לבדוק בטיחות",
      "עמוד קצחi – צילום מהכביש, לא תמיד אפשר לעלות",
      "להתחיל מוקדם – הרבה עצירות",
    ],
    activities: [
      {
        name: N.katskhiPillar,
        timeOfDay: "09:00–10:00",
        duration: "45 דק'",
        description: "עמוד סלע בגובה 40 מ' עם מנזר קטן בראשו – אחד הנופים האייקוניים ביותר בגיאורגיה. עצירה לצילום מהכביש, הסבר על הנזיר שמתגורר בראש (נדיר).",
        link: "https://www.google.com/maps/search/Katskhi+Pillar",
        linkLabel: N.katskhiPillar,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Katskhi_pillar.jpg/640px-Katskhi_pillar.jpg",
      },
      {
        name: N.chiatura,
        timeOfDay: "10:30–13:00",
        duration: "2–2.5 שעות",
        description: "עיירת כריית מנганז ייחודית – עשרות רכבלים סובייטיים עדיין פועלים! רכבל Sanatorium, תחנות נטושות, פסיפסים של לנין/סטalin. חוויה סוריאליסטית שאין כמוה בעולם.",
        tips: ["רכבל Sanatorium – הכי מפורסם", "לצלם את התחנות הנטושות", "להיזהר מכבלים ישנים"],
        link: "https://www.google.com/maps/search/Chiatura+Georgia",
        linkLabel: N.chiatura,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Chiatura_cable_car.jpg/640px-Chiatura_cable_car.jpg",
      },
      {
        name: N.lunchAtLia,
        timeOfDay: "13:00–14:30",
        duration: "1.5 שעות",
        description: "ארוחת צהריים ביתית אצל משפחה מקומית – אחת החוויות הקulinarיות הטובות בטיול. מנות גיאורגיות אutentיות, כמויות ענק, אווירה משפחתית. חובה להזמין מראש!",
        tips: ["WhatsApp מראש – חובה!", "מזומן מומלץ", "לומר אם יש אלergies"],
        link: "https://www.google.com/maps/search/Lunch+at+Lia+Georgia",
        linkLabel: N.lunchAtLia,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Georgian_supra.jpg/640px-Georgian_supra.jpg",
      },
      {
        name: N.mgvimevi,
        timeOfDay: "15:00–16:00",
        duration: "45 דק'",
        description: "מנזר נשים מהמאה XIII חצוב בתוך סלע – ארches מרהיבים, שקט, נוף לעמק.",
        link: "https://www.google.com/maps/search/Mgvimevi+Convent",
        linkLabel: N.mgvimevi,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Mgvimevi_Monastery.jpg/640px-Mgvimevi_Monastery.jpg",
      },
    ],
    restaurants: [
      {
        name: N.lunchAtLia,
        cuisine: fmt("ארוחת צהריים גיאורגית אצל משפחה", "Georgian home lunch", "სახლის ლანჩი"),
        area: fmt("בדרך לצ'יאתורה", "On the way to Chiatura", "ჭიათურის გზაზე"),
        note: "חובה להזמין מראש בוואטסאפ – לא walk-in!",
        link: "https://www.google.com/maps/search/Lunch+at+Lia+Georgia",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Georgian_supra.jpg/640px-Georgian_supra.jpg",
      },
      {
        name: fmt("Palaty", "Palaty Restaurant", "Palaty"),
        cuisine: "גיאורגית · ארוחת ערב",
        area: N.kutaisi,
        note: "אם חוזרים מוקדם – ארוחת ערב בעיר",
        link: "https://www.google.com/maps/search/Palaty+Kutaisi",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Khinkali_Georgian_dumplings.jpg/640px-Khinkali_Georgian_dumplings.jpg",
      },
    ],
    hotels: [
      {
        name: fmt("Hotel Grand Opera", "Hotel Grand Opera", "Grand Opera"),
        area: N.kutaisi,
        nights: 1,
        note: "לילה שני בקוטאיסi",
        link: "https://www.google.com/maps/search/Hotel+Grand+Opera+Kutaisi",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Kutaisi_Center%2C_Georgia.jpg/640px-Kutaisi_Center%2C_Georgia.jpg",
      },
      {
        name: fmt("Best Western Kutaisi", "Best Western Kutaisi", "Best Western"),
        area: N.kutaisi,
        nights: 1,
        note: "חלופה נוחה עם חניה",
        link: "https://www.google.com/maps/search/Best+Western+Kutaisi",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Kutaisi_Center%2C_Georgia.jpg/640px-Kutaisi_Center%2C_Georgia.jpg",
      },
    ],
    mapPoints: [
      { name: N.katskhiPillar, lat: 42.2872, lng: 43.2125 },
      { name: N.chiatura, lat: 42.2989, lng: 43.289 },
      { name: N.kutaisi, lat: 42.2679, lng: 42.6946 },
    ],
  },
  {
    id: 4,
    date: "26.9",
    weekday: "שבת",
    title: fmt("רפטינג וחבל ראצ'ה", "Rafting & Racha", "rafting და რაჭა"),
    emoji: "🛶",
    theme: fmt("נהר הריונi וראצ'ה", "Rioni River & Racha", "რიონი და რაჭა"),
    overnight: N.ambrolauri,
    driving: "כ-2 שעות (100 ק\"מ)",
    heroImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Racha_Region%2C_Georgia.jpg/1280px-Racha_Region%2C_Georgia.jpg",
    summary: "יום הרפתקאות ויין. בוקר: רפטינג על נהר הריונi (רמה 2–3, מתאים למשפחות). צהריים: עלייה לראצ'ה – אזור יין וheaven ירוק. תצפית במאגר שאורi, טעימות יין ביקb Khvanchkara.",
    tips: [
      "רפטינג – להזמין מראש, להביא בגדים להחלפה",
      "ראצ'ה – כבישים מפותלים, לנהוג לאט",
      "טעימות יין – לא לנהוג אחרי!",
      "לקנות בקבוק Khvanchkara – מתנה מעולה",
    ],
    activities: [
      {
        name: fmt("רפטינג על נהר הריונi", "Rioni River Rafting", "rafting მდ. რიონზე"),
        timeOfDay: "09:00–12:00",
        duration: "2–3 שעות",
        description: "רפטינג בטיחותi ברמה 2–3 – מתאים גם למתחילים ולמשפחות. נוף ליערות ולheights של אimereti. ציוד מסופק, מדריך מקומי.",
        tips: ["להביא בגד ים / להחליף", "waterproof לטלפון"],
        link: "https://www.google.com/maps/search/Rioni+River+rafting+Georgia",
        linkLabel: N.rioniRiver,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Rafting_in_Georgia.jpg/640px-Rafting_in_Georgia.jpg",
      },
      {
        name: N.shaoriReservoir,
        timeOfDay: "13:30–14:30",
        duration: "45 דק'",
        description: "תצפית על אגם שאורi בלב יערות ראצ'ה – מקום שקט, צילומים מדהימים, פiknik אפשרi.",
        link: "https://www.google.com/maps/search/Shaori+Reservoir",
        linkLabel: N.shaoriReservoir,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Racha_Region%2C_Georgia.jpg/640px-Racha_Region%2C_Georgia.jpg",
      },
      {
        name: N.khvanchkaraWinery,
        timeOfDay: "15:00–17:00",
        duration: "1.5 שעות",
        description: "ביקור ביקb Khvanchkara – יין חצי-מתוק אדום legendaire (יין Stalin!). סיור, טעימות, קניית בקבוקים.",
        link: "https://www.google.com/maps/search/Khvanchkara+Winery",
        linkLabel: N.khvanchkaraWinery,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Georgian_wine.jpg/640px-Georgian_wine.jpg",
      },
    ],
    restaurants: [
      {
        name: N.khvanchkaraWinery,
        cuisine: fmt("יקb + טעימות", "Winery & tasting", "მარანი"),
        area: N.racha,
        note: "טעימות יין + גבינות מקומיות",
        link: "https://www.google.com/maps/search/Khvanchkara+Winery",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Georgian_wine.jpg/640px-Georgian_wine.jpg",
      },
      {
        name: N.naberauliWines,
        cuisine: fmt("יקb ומסעדה", "Winery & restaurant", "ნაბერაული"),
        area: N.ambrolauri,
        note: "ארוחה + יין מקומי באמברולאורi",
        link: "https://www.google.com/maps/search/Naberauli+Wines+Ambrolauri",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Racha_Region%2C_Georgia.jpg/640px-Racha_Region%2C_Georgia.jpg",
      },
      {
        name: fmt("Racha Tavern", "Racha Tavern", "რაჭული საცხობი"),
        cuisine: "מטbח ראצ'ה · lobio, khachapuri",
        area: N.ambrolauri,
        note: "מנות כפריות אutentיות",
        link: "https://www.google.com/maps/search/restaurant+Ambrolauri",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Georgian_supra.jpg/640px-Georgian_supra.jpg",
      },
    ],
    hotels: [
      {
        name: fmt("Hotel Ambrolauri", "Hotel Ambrolauri", "სასტუმრო ამბროლაური"),
        area: N.ambrolauri,
        nights: 1,
        note: "מלון מקומi · בסיס ללילה בראצ'ה",
        link: "https://www.google.com/maps/search/hotels+Ambrolauri",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Racha_Region%2C_Georgia.jpg/640px-Racha_Region%2C_Georgia.jpg",
      },
      {
        name: fmt("Guesthouse Racha", "Guesthouse in Racha", "სასტუმრო რაჭა"),
        area: `${N.ambrolauri}, ${N.racha}`,
        nights: 1,
        note: "גסטהאוס כפרi – חוויה אutentית",
        link: "https://www.google.com/maps/search/guesthouse+Ambrolauri+Racha",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Racha_Region%2C_Georgia.jpg/640px-Racha_Region%2C_Georgia.jpg",
      },
    ],
    mapPoints: [
      { name: N.ambrolauri, lat: 42.5211, lng: 43.1622 },
      { name: N.shaoriReservoir, lat: 42.5833, lng: 43.0833 },
    ],
  },
'''

if __name__ == "__main__":
    main()

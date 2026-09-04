/** Trilingual place names: Hebrew · English · Georgian */
function fmt(he, en, ka) {
  return `${he} · ${en} · ${ka}`;
}

const N = {
  batumi: fmt("באטומי", "Batumi", "ბათუმი"),
  kutaisi: fmt("קוטאיסי", "Kutaisi", "ქუთაისი"),
  ambrolauri: fmt("אמברולאורי", "Ambrolauri", "ამბროლაური"),
  zugdidi: fmt("זוגדידי", "Zugdidi", "ზუგდიდი"),
  martvili: fmt("מרטווילי", "Martvili", "მარტვილი"),
  mestia: fmt("מסטיה", "Mestia", "მესტია"),
  anaklia: fmt("אנאקליה", "Anaklia", "ანაკლია"),
  mazeri: fmt("מאזרי", "Mazeri", "მაზერი"),
  ushba: fmt("הר אושבה", "Mount Ushba", "უშბა"),
  mazeriCabin: fmt("Peak Mazeri Guest House", "Peak Mazeri Guest House", "Peak Mazeri Guest House"),
  peakMazeriGuestHouse: fmt("Peak Mazeri Guest House", "Peak Mazeri Guest House", "Peak Mazeri Guest House"),
  racha: fmt("ראצ'ה", "Racha", "რაჭა"),
  svaneti: fmt("סוואנטי", "Svaneti", "სვანეთი"),
  bechoValley: fmt("עמק בצ'ו", "Becho Valley", "ბეჩოს ხეობა"),

  batumiAirport: fmt("שדה התעופה באטומי", "Batumi International Airport", "ბათუმის საერთაშორისო აეროპორტი"),
  batumiBoulevard: fmt("טיילת הבוליבארד", "Batumi Boulevard", "ბათუმის ბულვარი"),
  batumiOldTown: fmt("העיר העתיקה של באטומי", "Batumi Old Town", "ძველი ბათუმი"),
  batumiCenter: fmt("מרכז באטומי", "Batumi City Center", "ბათუმის ცენტრი"),

  mtirala: fmt("פארק לאומי מטיראלה", "Mtirala National Park", "მტირალის ეროვნული პარკი"),
  katskhiPillar: fmt("עמוד קצחי", "Katskhi Pillar", "კაცხის სვეტი"),
  chiatura: fmt("צ'יאתורה", "Chiatura", "ჭიათურა"),
  mgvimevi: fmt("מנזר מגווימבי", "Mgvimevi Convent", "მღვიმევის მონასტერი"),
  campInGeorgia: fmt("Camp in Georgia – Sveri Adventure Camp", "Camp in Georgia – Sveri Adventure Camp", "Camp in Georgia"),
  sveriViaFerrata: fmt("Sveri – Via Ferrata", "Sveri – Via Ferrata", "სვერი – Via Ferrata"),

  rioniRiver: fmt("נהר הריוני", "Rioni River", "რიონი"),
  shaoriReservoir: fmt("מאגר שאורי", "Shaori Reservoir", "შაორის ტბა"),

  tskaltubo: fmt("צקאלטובו", "Tskaltubo", "ცხალტუბო"),
  prometheusCave: fmt("מערת פרומתאוס", "Prometheus Cave", "პრომეთეს მღვირა"),

  okatseCanyon: fmt("קניון אוקאצה", "Okatse Canyon", "ოკაცეს კანიონი"),
  martviliCanyon: fmt("קניון מרטווילי", "Martvili Canyon", "მარტვილის კანიონი"),
  nokalakeviHotSprings: fmt("מעיינות נוקאלאקווי", "Nokalakevi Hot Springs", "ნოკალაკევის ცხელი წყლები"),

  enguriDam: fmt("סכר אנגורי", "Enguri Dam", "ენგურის ჰესი"),
  ushguli: fmt("אושגולי", "Ushguli", "უშგული"),
  shkharaGlacier: fmt("קרחון שחארה", "Shkhara Glacier", "შხარის მყინვარი"),
  chalaadiGlacier: fmt("קרחון צ'לאדי", "Chalaadi Glacier", "ჭალაადის მყინვარი"),
  shdugraWaterfall: fmt("מפל שדוגרה", "Shdugra Waterfall", "შდუგრის ჩანჩქერი"),

  koruldiLakes: fmt("אגמי קורולדי", "Koruldi Lakes", "კორულდის ტბები"),
  dadianiPalace: fmt("ארמון דאדיאני", "Dadiani Palace", "დადიანების სასახლე"),

  ureki: fmt("אורקי", "Ureki", "ურეკი"),
  shekvetili: fmt("שקווטילי", "Shekvetili", "შეკვეთილი"),
  tsitsinatela: fmt("ציצנאטלה", "Tsitsinatela", "ციცინათელა"),

  dedeCinema: fmt("קולנוע Dede", "Dede Cinema", "კინოთეატრი Dede"),
  lunchAtLia: fmt("Lunch at Lia", "Lunch at Lia", "Lunch at Lia"),
  khvanchkaraWinery: fmt("יקב Khvanchkara", "Khvanchkara Winery", "ხვანჭკრის მარანი"),
  naberauliWines: fmt("יקב Naberauli", "Naberauli Wines", "ნაბერაულის მარანი"),
  raftingInKutaisi: fmt("Rafting in Kutaisi", "Rafting in Kutaisi", "Rafting in Kutaisi"),
  adventureCamping: fmt("Adventure Camping", "Adventure Camping (Rafting in Kutaisi)", "Adventure Camping"),
  primeHeaven: fmt("Prime Heaven", "Prime Heaven · Restaurant & Hotel", "Prime Heaven"),
  cottageMebirashi: fmt("Cottage Mebirashi", "Cottage Mebirashi", "Cottage Mebirashi"),
  whiteHotelGuesthouse: fmt("White Hotel Guesthouse", "White Hotel Guesthouse", "White Hotel Guesthouse"),
  mestiaAirbnb: fmt("Home in Mestia (Airbnb)", "Home in Mestia (Airbnb)", "Home in Mestia"),
  satapliaReserve: fmt("שמורת סטאפליה", "Sataplia Nature Reserve", "სათაფლია"),
  batumiDolphinarium: fmt("דולפינריום באטומי", "Batumi Dolphinarium", "ბათუმის დელფინარიუმი"),
  bachoJeepTours: fmt("Bacho Tsotsoria – טיולי ג'יפ", "Bacho Tsotsoria – jeep tours", "Bacho Tsotsoria"),
  siamThai: fmt("SIAM Thai Restaurant", "SIAM Thai Restaurant @ Kutaisi", "SIAM Thai Restaurant"),
  shareulaRiver: fmt("נהר שאראולה", "Shareula River", "შარაულა"),

  tbilisi: fmt("טביליסי", "Tbilisi", "თბილისი"),
  telAviv: fmt("תל אביב", "Tel Aviv", "თელ ავივი"),
};

function placeLabel(name) {
  return name;
}

/** Sveri – Camp in Georgia base + Via Ferrata route (~700 m apart) */
const SVERI = {
  camp: { lat: 42.237867, lng: 43.300874 },
  viaFerrata: { lat: 42.2422, lng: 43.2958 },
};

/** Prime Heaven – צ'יאתורה, רח' ჭავჭავაძე (Booking 25.9–26.9) */
const PRIME_HEAVEN = { lat: 42.2893119, lng: 43.2880929 };

/** Peak Mazeri Guest House – מאזרי / Becho (Booking 1.10–3.10) */
const PEAK_MAZERI = {
  lat: 43.0833,
  lng: 42.5167,
  address: "Mazeri village, Becho, Turbaza, Shikhra, 3200, Georgia",
};

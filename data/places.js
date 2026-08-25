/**
 * כל המקומות של הטיול – מיובא מרשימת המקומות השמורה ב-Google Maps
 * (https://maps.app.goo.gl/7n7fm83nZTDq31La7) ומועשר בקטגוריות ובשמות בעברית.
 * לרענון הרשימה: ראו README, פרק "מפת המקומות".
 */

const PLACE_CATEGORIES = {
  food: { label: "אוכל", icon: "🍽️", color: "#e67e22" },
  wine: { label: "יין ויקבים", icon: "🍷", color: "#7b2d3e" },
  lodging: { label: "לינה", icon: "🏨", color: "#8e44ad" },
  attraction: { label: "אתרים", icon: "🏛️", color: "#c9a227" },
  nature: { label: "טבע", icon: "🏞️", color: "#2d5a3d" },
  activity: { label: "אקסטרים", icon: "🪂", color: "#2980b9" },
  town: { label: "ערים וכפרים", icon: "🏙️", color: "#34495e" },
  drone: { label: "רחפן", icon: "🚁", color: "#6c5ce7" },
  transport: { label: "תחבורה", icon: "✈️", color: "#7f8c8d" },
  custom: { label: "שלנו", icon: "📌", color: "#e84393" },
};

const TRIP_PLACES = [
  { id: "chateau-dio", he: "יקב שאטו דיו", en: "Chateau Dio", category: "wine", area: "ראצ'ה · אמברולאורי", lat: 42.536156, lng: 43.130021, address: "G4PJ+F26, Dzirageuli Village, Ambrolauri 0400, גאורגיה" },
  { id: "hillside-kazbegi", he: "Hillside Kazbegi", en: "Hillside Kazbegi", category: "lodging", area: "קזבגי", lat: 42.657366, lng: 44.643271, address: "სტეფანწმინდა, Ilia Chavchavadze 32 B, Stepantsminda 4700, גאורגיה" },
  { id: "ananuri", he: "אנאנורי", en: "Ananuri", category: "attraction", area: "קרתלי", lat: 42.17314, lng: 44.694246, address: "גאורגיה" },
  { id: "chateau-mephis", he: "יקב שאטו מפיס", en: "Chateau Mephis Kalaki", category: "wine", area: "קרתלי", lat: 41.882109, lng: 44.341522, address: "10str david aghmashenebeli, Upper Chocheti, גאורגיה" },
  { id: "elle-boulangerie", he: "מאפיית ELLE", en: "ბულანჟერია ელლე - ELLE Boulangerie", category: "food", area: "קוטאיסי", lat: 42.268883, lng: 42.705152, address: "Alexander Pushkin Street, 8 Guram panjikidze Street, Kutaisi 4600, גאורגיה" },
  { id: "green-bazaar", he: "השוק הירוק", en: "Green Bazaar", category: "food", area: "קוטאיסי", lat: 42.272064, lng: 42.701432, address: "7PC2+VHG, კ.გამსახურდიას 37 Tsisperi Kantselebi Street, Kutaisi 4600, גאורגיה" },
  { id: "buffet-rotsa-gshia", he: "בופה Rotsa Gshia", en: "ბუფეტი „როცა გშია“ • Buffet Rotsa Gshia", category: "food", area: "קוטאיסי", lat: 42.269948, lng: 42.702093, address: "5 Tsisperi Kantselebi Street, Kutaisi, גאורגיה", tip: "סתיו" },
  { id: "gala-restaurant", he: "מסעדת Gala", en: "Gala Restaurant Kutaisi", category: "food", area: "קוטאיסי", lat: 42.271788, lng: 42.703091, address: "29 Zakharia Paliashvili, Kutaisi 4600, גאורגיה" },
  { id: "newport-hotel", he: "מלון Newport", en: "Newport Hotel Kutaisi", category: "lodging", area: "קוטאיסי", lat: 42.272751, lng: 42.706664, address: "1 Newport Street, Kutaisi 4600, גאורגיה", tip: "המלצה סתיו" },
  { id: "rioni-river", he: "נהר הריוני", en: "Rioni River", category: "nature", area: "ראצ'ה", lat: 42.563393, lng: 43.270115 },
  { id: "rafting-kutaisi", he: "רפטינג בקוטאיסי", en: "Rafting in Kutaisi", category: "activity", area: "קוטאיסי", lat: 42.282429, lng: 42.715725 },
  { id: "nokalakevi-springs", he: "מעיינות גופרית נוקאלאקווי", en: "Sulfur Spring Nokalakevi", category: "nature", area: "סמגרלו", lat: 42.365371, lng: 42.19579 },
  { id: "katskhi-pillar", he: "עמוד קצחי", en: "Katskhi Pillar", category: "attraction", area: "אימרתי", lat: 42.28748, lng: 43.215845 },
  { id: "chiatura", he: "צ'יאתורה", en: "Chiatura", category: "town", area: "אימרתי", lat: 42.290217, lng: 43.283141 },
  { id: "kutaisi", he: "קוטאיסי", en: "Kutaisi", category: "town", area: "אימרתי", lat: 42.271834, lng: 42.705944 },
  { id: "vani", he: "ואני", en: "Vani", category: "attraction", area: "אימרתי", lat: 42.08896, lng: 42.504484 },
  { id: "shaori-reservoir", he: "מאגר שאורי", en: "Shaori Reservoir", category: "nature", area: "ראצ'ה", lat: 42.419878, lng: 43.078402 },
  { id: "ambrolauri", he: "אמברולאורי", en: "Ambrolauri", category: "town", area: "ראצ'ה", lat: 42.519632, lng: 43.140953 },
  { id: "mtirala", he: "פארק לאומי מטיראלה", en: "Mtirala National Park", category: "nature", area: "אג'ריה", lat: 41.661672, lng: 41.877912 },
  { id: "batumi", he: "באטומי", en: "Batumi", category: "town", area: "אג'ריה", lat: 41.646098, lng: 41.64049 },
  { id: "zugdidi", he: "זוגדידי", en: "Zugdidi", category: "town", area: "סמגרלו", lat: 42.509139, lng: 41.866992 },
  { id: "shkhara-glacier", he: "קרחון שחארה", en: "Shkhara Glacier", category: "nature", area: "סוואנטי", lat: 42.982581, lng: 43.103614 },
  { id: "ushguli", he: "אושגולי", en: "Ushguli", category: "attraction", area: "סוואנטי", lat: 42.915824, lng: 43.018924 },
  { id: "mestia", he: "מסטיה", en: "Mestia", category: "town", area: "סוואנטי", lat: 43.046355, lng: 42.718537 },
  { id: "enguri-dam", he: "סכר אנגורי", en: "Inguri Dam", category: "attraction", area: "סמגרלו", lat: 42.76, lng: 42.03 },
  { id: "martvili-canyon", he: "קניון מרטווילי", en: "Martvili Canyon", category: "nature", area: "סמגרלו", lat: 42.457204, lng: 42.376926 },
  { id: "okatse-canyon", he: "קניון אוקאצה", en: "Okatse Canyon Visitor Center", category: "nature", area: "אימרתי", lat: 42.455728, lng: 42.527437 },
  { id: "borjomi", he: "בורג'ומי", en: "Borjomi", category: "town", area: "סמצחה־ג'וואחתי", lat: 41.837865, lng: 43.378518 },
  { id: "uplistsikhe", he: "אופליסציחה", en: "Uplistsikhe", category: "attraction", area: "קרתלי", lat: 41.966784, lng: 44.207334 },
  { id: "gergeti", he: "כנסיית גרגטי", en: "Gergeti Trinity Church", category: "attraction", area: "קזבגי", lat: 42.6622, lng: 44.620257 },
  { id: "stepantsminda", he: "סטפנצמינדה", en: "Stepantsminda", category: "town", area: "קזבגי", lat: 42.658317, lng: 44.640952 },
  { id: "gudauri", he: "גודאורי", en: "Gudauri", category: "town", area: "קזבגי", lat: 42.475539, lng: 44.480472 },
  { id: "zhinvali", he: "מאגר ז'ינוואלי", en: "Zhinvali Reservoir", category: "nature", area: "קרתלי", lat: 42.152324, lng: 44.768064 },
  { id: "ananuri-fortress", he: "מצודת אנאנורי", en: "Ananuri Fortress Complex", category: "attraction", area: "קרתלי", lat: 42.163816, lng: 44.70299 },
  { id: "mtskheta", he: "מצחתא", en: "Mtskheta", category: "town", area: "קרתלי", lat: 41.845425, lng: 44.720274 },
  { id: "tbilisi-airport", he: "שדה התעופה טביליסי", en: "Tbilisi International Airport", category: "transport", area: "טביליסי", lat: 41.669539, lng: 44.964644 },
];

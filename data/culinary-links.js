/** סדנאות בישול ויקבים לפי יום – רשת AGROguesthouse + המלצות אזוריות בפייסבוק */
const CULINARY_LINKS = {
  network: {
    name: "AGROguesthouse",
    label: fmt("AGROguesthouse – רשת גסטהאוסים וסיורים", "AGROguesthouse – guesthouse & tour network", "AGROguesthouse"),
    url: "https://www.facebook.com/share/1GZgCgBBXL/",
    phone: "+995 595 50 16 51",
    email: "korena.office@gmail.com",
    note: fmt(
      "רשת גסטהאוסים וסיורים בגאורגיה – סדנאות בישול, יקבים וחוויות אגרו-תיירות. לתאום מראש.",
      "Guesthouse network & tours across Georgia – cooking workshops, wineries and agro-tourism.",
      "საოჯახო სასტუმროების ქსელი და ტურები – culinary masterclasses და მარანები."
    ),
  },
  byDay: {
    1: {
      workshops: [
        {
          label: fmt("Ethno-Tavern Sanapiro – ערב גיאורגי", "Ethno-Tavern Sanapiro", "Sanapiro"),
          url: "https://www.facebook.com/EthnoTavernSanapiro",
          note: fmt("מסעדה אתנית בבאטומי – מוזיקה חיה ומנות מסורתיות", "Ethnic tavern in Batumi – live music & traditional food", "ეთნო-ტavernი ბათუმში"),
        },
      ],
      wineries: [
        {
          label: fmt("AGROguesthouse – סיורים באджריה", "AGROguesthouse – Adjara tours", "AGROguesthouse"),
          url: "https://www.facebook.com/share/1GZgCgBBXL/",
          note: fmt("לתאום סדנת בישול / יקב באזור החוף", "Book cooking workshop or winery visit on the coast", "საზღვაო რეგიონის culinary ტურები"),
        },
      ],
    },
    2: {
      workshops: [
        {
          label: fmt("Agro Guesthouse Korena – סדנת בישול (גלאטי)", "Agro Guesthouse Korena – cooking class", "აგრო Korena"),
          url: "https://www.facebook.com/RuralGuesthouseKorena",
          note: fmt("חצ'פורי בתנור על האש, לוביו, פטריות באגוזים – 8 ק\"מ מקוטאיסי", "Khachapuri in fireplace, lobio, mushrooms in walnuts", "ხაჭაპური ბუხარში, ლობიო"),
        },
      ],
      wineries: [
        {
          label: fmt("Korena – מרתף משפחתי", "Korena family cellar", "Korena მარანი"),
          url: "https://www.facebook.com/RuralGuesthouseKorena",
          note: fmt("Tsolikauri, Tsitska, Otskhanuri Sapere", "Imeretian wines – Tsolikauri, Tsitska", "იმერული ღვინოები"),
        },
      ],
    },
    3: {
      workshops: [
        {
          label: fmt("Kutaisi Cooking Classes – חינקלי וחצ'פורי", "Kutaisi Cooking Classes – khinkali & khachapuri", "Kutaisi Cooking Classes"),
          url: "https://www.facebook.com/KutaisiCookingClasses",
          note: fmt("Nikoladze Family – סדנה + טעימות יין", "Nikoladze family – hands-on class with wine", "Nikoladze – masterclass + ღვინის დეგustatsia"),
        },
        {
          label: fmt("Lunch at Lia – ארוחה ביתית", "Lunch at Lia – home lunch", "Lunch at Lia"),
          url: "https://www.facebook.com/share/1GZgCgBBXL/",
          note: fmt("חוויה ביתית – להזמין מראש (גם בתכנון המקורי)", "Home dining – book ahead (original plan)", "სახლის ლანჩი – წინასწარ დაჯავშნა"),
        },
      ],
      wineries: [
        {
          label: fmt("Nikoladze Family Winery", "Nikoladze Family Winery", "Nikoladze მარანი"),
          url: "https://www.facebook.com/KutaisiCookingClasses",
          note: fmt("יקב משפחתי + חנות יין במרכז קוטאיסי", "Family winery & tasting shop near White Bridge", "ოჯახური მარანი ქუთაისში"),
        },
      ],
    },
    4: {
      workshops: [
        {
          label: fmt("Korena – סיורי ראצ'ה וסדנאות", "Korena – Racha tours & workshops", "Korena – რაჭა"),
          url: "https://www.facebook.com/RuralGuesthouseKorena",
          note: fmt("מארגנים סיורים לראצ'ה וסוואנטי + masterclasses", "Organizes Racha & Svaneti tours with food experiences", "რაჭისა და სვანეთის ტურები"),
        },
      ],
      wineries: [
        {
          label: N.khvanchkaraWinery,
          url: "https://www.facebook.com/KhvanchkaraWinery",
          note: fmt("Khvanchkara – יין חצי-מתוק אדום מפורסם", "Famous semi-sweet red Khvanchkara", "ხვანჭკრა"),
        },
        {
          label: N.naberauliWines,
          url: "https://www.facebook.com/share/1GZgCgBBXL/",
          note: fmt("יקב Naberauli באמברולאורי", "Naberauli winery in Ambrolauri", "ნაბერაული ამბროლაურში"),
        },
      ],
    },
    5: {
      workshops: [
        {
          label: fmt("Mate's Marani – סדנת בישול (צקאלטובו)", "Mate's Marani – cooking masterclass", "Mate's Marani"),
          url: "https://www.facebook.com/winecellarmate",
          note: fmt("יקב משפחתי + masterclass ואוכל ביתי – לתאם מראש", "Family winery + cooking class & homemade food", "საოჯახო მარანი + culinary masterclass"),
        },
      ],
      wineries: [
        {
          label: fmt("Mate's Marani – טעימות יין וצ'אצ'ה", "Mate's Marani – wine & chacha tasting", "Mate's Marani"),
          url: "https://www.facebook.com/winecellarmate",
          note: fmt("בצקאלטובo, ליד מערת פרומתאוס", "In Tskaltubo, near Prometheus Cave", "წყალტუბოში"),
        },
      ],
    },
    6: {
      workshops: [
        {
          label: fmt("Oda Family Marani – סדנת מטבח מגרלי (מרטווילי)", "Oda Family Marani – Megrelian cooking", "Oda Family Marani"),
          url: "https://www.facebook.com/OdaFamilyMarani",
          note: fmt("Elarji, Gebzhalia, חצ'פורי מגרלי, Ajika – ליד קניון מרטווילי", "Elarji, gebzhalia, Megrelian khachapuri", "მეგრული სამზარეულო"),
        },
      ],
      wineries: [
        {
          label: fmt("Oda Family Marani – יינות Samegrelo", "Oda Family Marani – Samegrelo wines", "Oda მარანი"),
          url: "https://www.facebook.com/OdaFamilyMarani",
          note: fmt("זנים מקומיים: Chvitiluri, Koloshi, Dudghushi", "Indigenous Megrelian grape varieties", "მეგრული ჯიში"),
        },
      ],
    },
    7: {
      workshops: [
        {
          label: fmt("AGROguesthouse – סדנאות בהרים", "AGROguesthouse – mountain workshops", "AGROguesthouse"),
          url: "https://www.facebook.com/share/1GZgCgBBXL/",
          note: fmt("לתאום סדנת בישול סוואנטית בדרך / במסטיה", "Book Svanetian cooking experience en route", "სვანური culinary"),
        },
      ],
      wineries: [
        {
          label: fmt("Samushao Marani – מסטיה", "Samushao Marani – Mestia", "Samushao Marani"),
          url: "https://www.facebook.com/SamushaoMarani",
          note: fmt("יין מקומי + kubdari ו-tashmijabi (Laila / Samushao)", "Local wine with kubdari & tashmijabi", "კუბდარი + ღვინო"),
        },
      ],
    },
    8: {
      workshops: [
        {
          label: fmt("Oda House – kubdari סוואנטי", "Oda House – Svanetian kubdari", "Oda House"),
          url: "https://www.facebook.com/odahouse",
          note: fmt("מאפה בשר סוואנטי מסורתי – חוויה בכפרים", "Traditional Svanetian meat bread", "სვანური კუბდარი"),
        },
      ],
      wineries: [
        {
          label: fmt("Samushao Marani – מסטיה / אושגולי", "Samushao Marani – Mestia / Ushguli", "Samushao Marani"),
          url: "https://www.facebook.com/SamushaoMarani",
          note: fmt("יין מקומי וצ'אצ'ה – גם בגסטהאוסים בטרק", "Local wine & chacha – also at trek guesthouses", "ადგილობრივი ღვინო"),
        },
      ],
    },
    9: {
      workshops: [
        {
          label: fmt("Oda House – מטבח סוואנטי (מאזרי)", "Oda House – Svanetian cuisine", "Oda House"),
          url: "https://www.facebook.com/odahouse",
          note: fmt("kubdari, tashmijabi – בגסטהאוס / בקתה", "Kubdari & tashmijabi at guesthouse", "სვანური კერძები"),
        },
      ],
      wineries: [
        {
          label: fmt("AGROguesthouse – חוויות בBecho", "AGROguesthouse – Becho experiences", "AGROguesthouse"),
          url: "https://www.facebook.com/share/1GZgCgBBXL/",
          note: fmt("לתאום ארוחות וטעימות בבקתה", "Book meals & tastings at the cabin", "Becho valley"),
        },
      ],
    },
    10: {
      workshops: [
        {
          label: fmt("בישול בבקתה – מאזרי", "Cabin cooking – Mazeri", "მაზერი"),
          url: "https://www.facebook.com/odahouse",
          note: fmt("ארוחות ביתיות בגסטהאוס – kubdari, גבינות מקומיות", "Home-style guesthouse meals", "საოჯახო კვება"),
        },
      ],
      wineries: [
        {
          label: fmt("Samushao Marani – מסטיה (חזרה)", "Samushao Marani – Mestia", "Samushao Marani"),
          url: "https://www.facebook.com/SamushaoMarani",
          note: fmt("אפשרות לעצירה בחזרה ממאזרי", "Stop on return from Mazeri", "მესტიაში"),
        },
      ],
    },
    11: {
      workshops: [
        {
          label: fmt("Oda Family Marani – מטבח מגרלי", "Oda Family Marani – Megrelian kitchen", "Oda Family Marani"),
          url: "https://www.facebook.com/OdaFamilyMarani",
          note: fmt("בדרך לים – מרטווילי / זוגדידי", "En route to the sea – Martvili / Zugdidi area", "Samegrelo"),
        },
      ],
      wineries: [
        {
          label: fmt("Oda Family Marani – טעימות", "Oda Family Marani – tasting", "Oda მარანი"),
          url: "https://www.facebook.com/OdaFamilyMarani",
          note: fmt("יינות Samegrelo + מנות מגרליות", "Samegrelo wines & Megrelian dishes", "მეგრული ღვინო"),
        },
      ],
    },
    12: {
      workshops: [
        {
          label: fmt("Ethno-Tavern Sanapiro – סיום חגיגי", "Ethno-Tavern Sanapiro – festive finale", "Sanapiro"),
          url: "https://www.facebook.com/EthnoTavernSanapiro",
          note: fmt("ארוחת סיום בבאטומי – חינקלי וסופרה", "Farewell dinner in Batumi", "ბათუმში"),
        },
        {
          label: fmt("AGROguesthouse – סדנאות באджריה", "AGROguesthouse – Adjara workshops", "AGROguesthouse"),
          url: "https://www.facebook.com/share/1GZgCgBBXL/",
          note: fmt("חצ'פורי אדגרי וחוויות קולינריות", "Adjarian khachapuri & culinary tours", "აჭარული ხაჭაპური"),
        },
      ],
      wineries: [
        {
          label: fmt("AGROguesthouse – יקבים באזור", "AGROguesthouse – regional wineries", "AGROguesthouse"),
          url: "https://www.facebook.com/share/1GZgCgBBXL/",
          note: fmt("לתאום טעימות לפני העלייה למטוס", "Book tasting before departure", "დაჯავშნა"),
        },
      ],
    },
    13: {
      workshops: [],
      wineries: [],
    },
  },
};

if (typeof module !== "undefined") module.exports = { CULINARY_LINKS };

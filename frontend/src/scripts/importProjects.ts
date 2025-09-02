// 🚀 Импорт проектов InoxMetalArt
// Данные собраны с сайта https://www.inoxmetalart.com

interface ProjectData {
  title: string;
  description: string;
  short_description: string;
  category: string;
  client: string;
  location: string;
  area: string;
  completion_date: string;
  features: string[];
  technologies: string[];
  status: string;
  sort_order: number;
  is_featured: boolean;
}

// Проекты с сайта InoxMetalArt
export const inoxMetalArtProjects: ProjectData[] = [
  // EXTERIOR PROJECTS
  {
    title: "DUBAI FRAME – Metamophose 3D in N8,Ti(Armani Gold)",
    description: "Знаковый проект Dubai Frame с использованием декоративной нержавеющей стали N8 с титановым покрытием PVD в цвете Armani Gold. Создание уникального 3D эффекта для одного из самых узнаваемых архитектурных сооружений Дубая.",
    short_description: "3D фасад Dubai Frame с титановым покрытием Armani Gold",
    category: "exterior",
    client: "Dubai Municipality",
    location: "Дубай, ОАЭ",
    area: "1500 м²",
    completion_date: "2023",
    features: [
      "3D эффект поверхности",
      "Титановое PVD покрытие",
      "Armani Gold цвет",
      "Устойчивость к климату пустыни"
    ],
    technologies: [
      "N8 Mirror finish",
      "PVD Ti покрытие",
      "3D текстурирование",
      "Защита от коррозии"
    ],
    status: "active",
    sort_order: 1,
    is_featured: true
  },
  {
    title: "Petronas Twin Towers – HL finish",
    description: "Облицовка знаменитых башен-близнецов Petronas с использованием Hairline (HL) отделки нержавеющей стали. Создание элегантного и современного внешнего вида для символа Малайзии.",
    short_description: "HL отделка для Petronas Twin Towers",
    category: "exterior",
    client: "Petronas",
    location: "Куала-Лумпур, Малайзия",
    area: "2800 м²",
    completion_date: "2022",
    features: [
      "Hairline отделка",
      "Высокая отражающая способность",
      "Устойчивость к тропическому климату",
      "Премиальное качество"
    ],
    technologies: [
      "HL finish",
      "AISI 316L сталь",
      "Защитные покрытия",
      "Архитектурная отделка"
    ],
    status: "active",
    sort_order: 2,
    is_featured: true
  },
  {
    title: "Eye of Qatar – HL,Ti(Blue)+NAS",
    description: "Фасад здания Eye of Qatar с комбинированной отделкой Hairline и титановым синим PVD покрытием, дополненным нанопокрытием NAS™ для антибактериальных свойств.",
    short_description: "HL отделка с синим титаном и NAS™ покрытием",
    category: "exterior",
    client: "Qatar Foundation",
    location: "Доха, Катар",
    area: "1200 м²",
    completion_date: "2023",
    features: [
      "Hairline отделка",
      "Титановое синее покрытие",
      "Антибактериальные свойства",
      "Современный дизайн"
    ],
    technologies: [
      "HL finish",
      "PVD Ti покрытие",
      "NAS™ нанопокрытие",
      "Антибактериальная защита"
    ],
    status: "active",
    sort_order: 3,
    is_featured: false
  },
  {
    title: "Lusail Marina Twin Towers – N8,Ti(Rose Gold)",
    description: "Облицовка башен-близнецов в Lusail Marina с использованием суперзеркальной отделки N8 и титанового розового золота PVD покрытия для создания роскошного внешнего вида.",
    short_description: "N8 отделка с розовым золотом для Lusail Marina",
    category: "exterior",
    client: "Lusail Development",
    location: "Лусаил, Катар",
    area: "2100 м²",
    completion_date: "2023",
    features: [
      "Суперзеркальная отделка N8",
      "Розовое золото PVD",
      "Роскошный внешний вид",
      "Высокая отражающая способность"
    ],
    technologies: [
      "N8 Mirror finish",
      "PVD Ti покрытие",
      "Rose Gold цвет",
      "Зеркальная полировка"
    ],
    status: "active",
    sort_order: 4,
    is_featured: true
  },
  {
    title: "360 Mall Extension – HL,Ti(Nickel Silver)",
    description: "Расширение торгового центра 360 Mall с использованием Hairline отделки и титанового никель-серебряного PVD покрытия для создания элегантного и современного фасада.",
    short_description: "HL отделка с никель-серебром для 360 Mall",
    category: "exterior",
    client: "360 Mall",
    location: "Эль-Кувейт, Кувейт",
    area: "1800 м²",
    completion_date: "2022",
    features: [
      "Hairline отделка",
      "Никель-серебряное покрытие",
      "Современный дизайн",
      "Высокое качество"
    ],
    technologies: [
      "HL finish",
      "PVD Ti покрытие",
      "Nickel Silver цвет",
      "Архитектурная отделка"
    ],
    status: "active",
    sort_order: 5,
    is_featured: false
  },
  {
    title: "Grand Avenue – BB,Ti(Light Bronze)+NAS",
    description: "Фасад Grand Avenue с использованием Bead Blast отделки, титанового светло-бронзового PVD покрытия и нанопокрытия NAS™ для создания уникальной текстуры и антибактериальных свойств.",
    short_description: "BB отделка со светло-бронзовым титаном и NAS™",
    category: "exterior",
    client: "Grand Avenue Development",
    location: "Эль-Кувейт, Кувейт",
    area: "1600 м²",
    completion_date: "2022",
    features: [
      "Bead Blast текстура",
      "Светло-бронзовое покрытие",
      "Антибактериальные свойства",
      "Уникальная текстура"
    ],
    technologies: [
      "BB finish",
      "PVD Ti покрытие",
      "Light Bronze цвет",
      "NAS™ нанопокрытие"
    ],
    status: "active",
    sort_order: 6,
    is_featured: false
  },
  {
    title: "Louis Vuitton – HL,Ti(Gold)",
    description: "Фасад бутика Louis Vuitton с использованием Hairline отделки и титанового золотого PVD покрытия для создания премиального и роскошного внешнего вида.",
    short_description: "HL отделка с золотым титаном для Louis Vuitton",
    category: "exterior",
    client: "Louis Vuitton",
    location: "Париж, Франция",
    area: "450 м²",
    completion_date: "2023",
    features: [
      "Hairline отделка",
      "Золотое PVD покрытие",
      "Премиальный вид",
      "Роскошная эстетика"
    ],
    technologies: [
      "HL finish",
      "PVD Ti покрытие",
      "Gold цвет",
      "Премиальная отделка"
    ],
    status: "active",
    sort_order: 7,
    is_featured: true
  },
  {
    title: "GUCCI – N8,Zr(Brass) and HL,Zr(Brass)",
    description: "Фасад бутика GUCCI с комбинированной отделкой N8 Mirror и Hairline с циркониевым латунным покрытием для создания уникального и запоминающегося дизайна.",
    short_description: "N8 и HL отделка с латунным цирконием для GUCCI",
    category: "exterior",
    client: "GUCCI",
    location: "Гонконг",
    area: "380 м²",
    completion_date: "2023",
    features: [
      "Комбинированная отделка N8+HL",
      "Латунное циркониевое покрытие",
      "Уникальный дизайн",
      "Высокое качество"
    ],
    technologies: [
      "N8 Mirror finish",
      "HL finish",
      "Zr покрытие",
      "Brass цвет"
    ],
    status: "active",
    sort_order: 8,
    is_featured: false
  },
  {
    title: "Centre Point – HL,Ti(Dark Gold)",
    description: "Фасад здания Centre Point с использованием Hairline отделки и титанового темно-золотого PVD покрытия для создания элегантного и современного внешнего вида.",
    short_description: "HL отделка с темно-золотым титаном для Centre Point",
    category: "exterior",
    client: "Centre Point Development",
    location: "Бангкок, Таиланд",
    area: "950 м²",
    completion_date: "2022",
    features: [
      "Hairline отделка",
      "Темно-золотое покрытие",
      "Элегантный дизайн",
      "Современная эстетика"
    ],
    technologies: [
      "HL finish",
      "PVD Ti покрытие",
      "Dark Gold цвет",
      "Архитектурная отделка"
    ],
    status: "active",
    sort_order: 9,
    is_featured: false
  },
  {
    title: "SinSiam Building – N8 Mirror HL N8,Ti(Brown)",
    description: "Фасад здания SinSiam с комбинированной отделкой N8 Mirror и Hairline, дополненной титановым коричневым PVD покрытием для создания уникального и стильного дизайна.",
    short_description: "N8 Mirror + HL отделка с коричневым титаном",
    category: "exterior",
    client: "SinSiam Development",
    location: "Бангкок, Таиланд",
    area: "1100 м²",
    completion_date: "2022",
    features: [
      "Комбинированная отделка N8+HL",
      "Коричневое PVD покрытие",
      "Уникальный дизайн",
      "Стильная эстетика"
    ],
    technologies: [
      "N8 Mirror finish",
      "HL finish",
      "PVD Ti покрытие",
      "Brown цвет"
    ],
    status: "active",
    sort_order: 10,
    is_featured: false
  },
  {
    title: "Kronos – HL,Ti(Nickel Bronze)",
    description: "Фасад здания Kronos с использованием Hairline отделки и титанового никель-бронзового PVD покрытия для создания элегантного и современного внешнего вида.",
    short_description: "HL отделка с никель-бронзовым титаном для Kronos",
    category: "exterior",
    client: "Kronos Development",
    location: "Бангкок, Таиланд",
    area: "850 м²",
    completion_date: "2022",
    features: [
      "Hairline отделка",
      "Никель-бронзовое покрытие",
      "Элегантный дизайн",
      "Современная эстетика"
    ],
    technologies: [
      "HL finish",
      "PVD Ti покрытие",
      "Nickel Bronze цвет",
      "Архитектурная отделка"
    ],
    status: "active",
    sort_order: 11,
    is_featured: false
  },
  {
    title: "Wat Phra Dhammakaya – HL,Ti(Gold) Mirror,Ti(Rainbow)",
    description: "Храм Wat Phra Dhammakaya с комбинированной отделкой Hairline золотого титана и зеркального радужного титана для создания уникального и духовного архитектурного решения.",
    short_description: "HL золотой титан + зеркальный радужный титан",
    category: "exterior",
    client: "Wat Phra Dhammakaya Temple",
    location: "Бангкок, Таиланд",
    area: "2800 м²",
    completion_date: "2023",
    features: [
      "Комбинированная отделка HL+Mirror",
      "Золотое PVD покрытие",
      "Радужное зеркальное покрытие",
      "Духовная эстетика"
    ],
    technologies: [
      "HL finish",
      "Mirror finish",
      "PVD Ti покрытие",
      "Gold и Rainbow цвета"
    ],
    status: "active",
    sort_order: 12,
    is_featured: true
  },

  // INTERIOR PROJECTS
  {
    title: "Prestige Arcade – HL,Ti(Light Bronze)+NAS",
    description: "Интерьер торговой галереи Prestige Arcade с использованием Hairline отделки, титанового светло-бронзового PVD покрытия и нанопокрытия NAS™ для создания роскошной и антибактериальной поверхности.",
    short_description: "HL отделка со светло-бронзовым титаном и NAS™",
    category: "interior",
    client: "Prestige Arcade",
    location: "Эль-Кувейт, Кувейт",
    area: "1200 м²",
    completion_date: "2023",
    features: [
      "Hairline отделка",
      "Светло-бронзовое покрытие",
      "Антибактериальные свойства",
      "Роскошная эстетика"
    ],
    technologies: [
      "HL finish",
      "PVD Ti покрытие",
      "Light Bronze цвет",
      "NAS™ нанопокрытие"
    ],
    status: "active",
    sort_order: 13,
    is_featured: true
  },
  {
    title: "Grand Avenue – HL,Ti(Brass) and HL,Ti(Nickel Silver)",
    description: "Интерьер Grand Avenue с комбинированной отделкой Hairline латунного и никель-серебряного титана для создания контрастного и стильного дизайна.",
    short_description: "HL отделка с латунным и никель-серебряным титаном",
    category: "interior",
    client: "Grand Avenue Development",
    location: "Эль-Кувейт, Кувейт",
    area: "1800 м²",
    completion_date: "2022",
    features: [
      "Комбинированная отделка HL",
      "Латунное покрытие",
      "Никель-серебряное покрытие",
      "Контрастный дизайн"
    ],
    technologies: [
      "HL finish",
      "PVD Ti покрытие",
      "Brass цвет",
      "Nickel Silver цвет"
    ],
    status: "active",
    sort_order: 14,
    is_featured: false
  },
  {
    title: "Department Store – N8 and N8,Ti(Rose Gold)",
    description: "Интерьер универмага с комбинированной отделкой N8 Mirror и N8 с титановым розовым золотом PVD покрытием для создания элегантного и современного дизайна.",
    short_description: "N8 отделка с розовым золотом для универмага",
    category: "interior",
    client: "Department Store Chain",
    location: "Стамбул, Турция",
    area: "2100 м²",
    completion_date: "2022",
    features: [
      "Комбинированная отделка N8",
      "Розовое золото PVD",
      "Элегантный дизайн",
      "Современная эстетика"
    ],
    technologies: [
      "N8 Mirror finish",
      "PVD Ti покрытие",
      "Rose Gold цвет",
      "Интерьерная отделка"
    ],
    status: "active",
    sort_order: 15,
    is_featured: false
  },
  {
    title: "GUCCI – N8,Zr and HL,Zr",
    description: "Интерьер бутика GUCCI с комбинированной отделкой N8 Mirror и Hairline с циркониевым покрытием для создания премиального и стильного дизайна.",
    short_description: "N8 и HL отделка с цирконием для GUCCI",
    category: "interior",
    client: "GUCCI",
    location: "Бангкок, Таиланд",
    area: "420 м²",
    completion_date: "2023",
    features: [
      "Комбинированная отделка N8+HL",
      "Циркониевое покрытие",
      "Премиальный дизайн",
      "Стильная эстетика"
    ],
    technologies: [
      "N8 Mirror finish",
      "HL finish",
      "Zr покрытие",
      "Премиальная отделка"
    ],
    status: "active",
    sort_order: 16,
    is_featured: true
  },
  {
    title: "Temple – N8,Etched,Ti(Gold)",
    description: "Интерьер храма с комбинированной отделкой N8 Mirror, травлеными узорами и титановым золотым PVD покрытием для создания духовной и элегантной атмосферы.",
    short_description: "N8 отделка с травлением и золотым титаном",
    category: "interior",
    client: "Myanmar Temple",
    location: "Мьянма",
    area: "850 м²",
    completion_date: "2023",
    features: [
      "N8 Mirror отделка",
      "Травленые узоры",
      "Золотое PVD покрытие",
      "Духовная атмосфера"
    ],
    technologies: [
      "N8 Mirror finish",
      "Химическое травление",
      "PVD Ti покрытие",
      "Gold цвет"
    ],
    status: "active",
    sort_order: 17,
    is_featured: false
  },
  {
    title: "MBK – N8,Ti(Brown)",
    description: "Интерьер торгового центра MBK с использованием N8 Mirror отделки и титанового коричневого PVD покрытия для создания теплой и привлекательной атмосферы.",
    short_description: "N8 отделка с коричневым титаном для MBK",
    category: "interior",
    client: "MBK Center",
    location: "Бангкок, Таиланд",
    area: "1600 м²",
    completion_date: "2022",
    features: [
      "N8 Mirror отделка",
      "Коричневое PVD покрытие",
      "Теплая атмосфера",
      "Привлекательный дизайн"
    ],
    technologies: [
      "N8 Mirror finish",
      "PVD Ti покрытие",
      "Brown цвет",
      "Интерьерная отделка"
    ],
    status: "active",
    sort_order: 18,
    is_featured: false
  },
  {
    title: "SinSiam Building – N8 Mirror HL N8,Ti(Brown)",
    description: "Интерьер здания SinSiam с комбинированной отделкой N8 Mirror и Hairline, дополненной титановым коричневым PVD покрытием для создания уникального и стильного дизайна.",
    short_description: "N8 Mirror + HL отделка с коричневым титаном",
    category: "interior",
    client: "SinSiam Development",
    location: "Бангкок, Таиланд",
    area: "1100 м²",
    completion_date: "2022",
    features: [
      "Комбинированная отделка N8+HL",
      "Коричневое PVD покрытие",
      "Уникальный дизайн",
      "Стильная эстетика"
    ],
    technologies: [
      "N8 Mirror finish",
      "HL finish",
      "PVD Ti покрытие",
      "Brown цвет"
    ],
    status: "active",
    sort_order: 19,
    is_featured: false
  },
  {
    title: "Kronos – HL,Ti(Rose Gold)",
    description: "Интерьер здания Kronos с использованием Hairline отделки и титанового розового золота PVD покрытия для создания роскошной и элегантной атмосферы.",
    short_description: "HL отделка с розовым золотом для Kronos",
    category: "interior",
    client: "Kronos Development",
    location: "Бангкок, Таиланд",
    area: "950 м²",
    completion_date: "2022",
    features: [
      "Hairline отделка",
      "Розовое золото PVD",
      "Роскошная атмосфера",
      "Элегантная эстетика"
    ],
    technologies: [
      "HL finish",
      "PVD Ti покрытие",
      "Rose Gold цвет",
      "Интерьерная отделка"
    ],
    status: "active",
    sort_order: 20,
    is_featured: false
  },
  {
    title: "Mattia Wine Cellar – Ripple,Ti(Nickel Silver)",
    description: "Интерьер винного погреба Mattia с использованием Ripple отделки и титанового никель-серебряного PVD покрытия для создания уникальной текстуры и элегантной атмосферы.",
    short_description: "Ripple отделка с никель-серебряным титаном",
    category: "interior",
    client: "Mattia Wine Cellar",
    location: "Бангкок, Таиланд",
    area: "320 м²",
    completion_date: "2023",
    features: [
      "Ripple текстура",
      "Никель-серебряное покрытие",
      "Уникальная текстура",
      "Элегантная атмосфера"
    ],
    technologies: [
      "Ripple finish",
      "PVD Ti покрытие",
      "Nickel Silver цвет",
      "Текстурированная отделка"
    ],
    status: "active",
    sort_order: 21,
    is_featured: false
  },
  {
    title: "Jabal Omar 3 – HL,Ti(Nickel Bronze)",
    description: "Интерьер здания Jabal Omar 3 с использованием Hairline отделки и титанового никель-бронзового PVD покрытия для создания элегантного и современного дизайна.",
    short_description: "HL отделка с никель-бронзовым титаном",
    category: "interior",
    client: "Jabal Omar Development",
    location: "Мекка, Саудовская Аравия",
    area: "1400 м²",
    completion_date: "2022",
    features: [
      "Hairline отделка",
      "Никель-бронзовое покрытие",
      "Элегантный дизайн",
      "Современная эстетика"
    ],
    technologies: [
      "HL finish",
      "PVD Ti покрытие",
      "Nickel Bronze цвет",
      "Интерьерная отделка"
    ],
    status: "active",
    sort_order: 22,
    is_featured: false
  },

  // ELEVATOR PROJECTS
  {
    title: "HL,Ti(G),HY-004",
    description: "Отделка лифтов с использованием Hairline отделки и титанового золотого PVD покрытия по дизайну HY-004. Создание премиального и элегантного внешнего вида для лифтовых кабин.",
    short_description: "HL отделка с золотым титаном для лифтов HY-004",
    category: "elevators",
    client: "Elevator Company",
    location: "Международный проект",
    area: "180 м²",
    completion_date: "2023",
    features: [
      "Hairline отделка",
      "Золотое PVD покрытие",
      "Дизайн HY-004",
      "Премиальный вид"
    ],
    technologies: [
      "HL finish",
      "PVD Ti покрытие",
      "Gold цвет",
      "Лифтовая отделка"
    ],
    status: "active",
    sort_order: 23,
    is_featured: false
  },
  {
    title: "Basketweave finish",
    description: "Отделка лифтов с использованием уникальной текстуры Basketweave для создания оригинального и запоминающегося дизайна лифтовых кабин.",
    short_description: "Basketweave текстура для лифтов",
    category: "elevators",
    client: "Elevator Company",
    location: "Международный проект",
    area: "150 м²",
    completion_date: "2023",
    features: [
      "Basketweave текстура",
      "Уникальный дизайн",
      "Оригинальная эстетика",
      "Запоминающийся вид"
    ],
    technologies: [
      "Basketweave finish",
      "Текстурированная отделка",
      "Лифтовая отделка",
      "Специальная обработка"
    ],
    status: "active",
    sort_order: 24,
    is_featured: false
  },
  {
    title: "HL,HY-004",
    description: "Отделка лифтов с использованием Hairline отделки по дизайну HY-004. Создание элегантного и современного внешнего вида для лифтовых кабин.",
    short_description: "HL отделка для лифтов HY-004",
    category: "elevators",
    client: "Elevator Company",
    location: "Международный проект",
    area: "160 м²",
    completion_date: "2023",
    features: [
      "Hairline отделка",
      "Дизайн HY-004",
      "Элегантный вид",
      "Современная эстетика"
    ],
    technologies: [
      "HL finish",
      "Лифтовая отделка",
      "Специальный дизайн",
      "Высокое качество"
    ],
    status: "active",
    sort_order: 25,
    is_featured: false
  },
  {
    title: "N8,HY-041",
    description: "Отделка лифтов с использованием суперзеркальной отделки N8 по дизайну HY-041. Создание зеркального и премиального внешнего вида для лифтовых кабин.",
    short_description: "N8 отделка для лифтов HY-041",
    category: "elevators",
    client: "Elevator Company",
    location: "Международный проект",
    area: "140 м²",
    completion_date: "2023",
    features: [
      "N8 Mirror отделка",
      "Дизайн HY-041",
      "Зеркальный вид",
      "Премиальная эстетика"
    ],
    technologies: [
      "N8 Mirror finish",
      "Лифтовая отделка",
      "Специальный дизайн",
      "Зеркальная полировка"
    ],
    status: "active",
    sort_order: 26,
    is_featured: false
  },
  {
    title: "N4, Light Bronze + NAS",
    description: "Отделка лифтов с использованием сатинированной отделки N4, светло-бронзового PVD покрытия и нанопокрытия NAS™ для создания элегантной и антибактериальной поверхности.",
    short_description: "N4 отделка со светло-бронзовым покрытием и NAS™",
    category: "elevators",
    client: "Elevator Company",
    location: "Международный проект",
    area: "170 м²",
    completion_date: "2023",
    features: [
      "Сатинированная отделка N4",
      "Светло-бронзовое покрытие",
      "Антибактериальные свойства",
      "Элегантная эстетика"
    ],
    technologies: [
      "N4 Satin finish",
      "PVD покрытие",
      "Light Bronze цвет",
      "NAS™ нанопокрытие"
    ],
    status: "active",
    sort_order: 27,
    is_featured: false
  },
  {
    title: "N8,HY-020,Ti(Gold)",
    description: "Отделка лифтов с использованием суперзеркальной отделки N8 по дизайну HY-020 и титанового золотого PVD покрытия для создания роскошного и премиального внешнего вида.",
    short_description: "N8 отделка с золотым титаном для лифтов HY-020",
    category: "elevators",
    client: "Elevator Company",
    location: "Международный проект",
    area: "190 м²",
    completion_date: "2023",
    features: [
      "N8 Mirror отделка",
      "Дизайн HY-020",
      "Золотое PVD покрытие",
      "Роскошный вид"
    ],
    technologies: [
      "N8 Mirror finish",
      "PVD Ti покрытие",
      "Gold цвет",
      "Лифтовая отделка"
    ],
    status: "active",
    sort_order: 28,
    is_featured: true
  }
];

// Функция для добавления одного проекта
export async function addProject(projectData: ProjectData): Promise<any> {
  try {
    const formData = new FormData();
    formData.append('title', projectData.title);
    formData.append('description', projectData.description);
    formData.append('short_description', projectData.short_description);
    formData.append('category', projectData.category);
    formData.append('client', projectData.client);
    formData.append('location', projectData.location);
    formData.append('area', projectData.area);
    formData.append('completion_date', projectData.completion_date);
    formData.append('features', JSON.stringify(projectData.features));
    formData.append('technologies', JSON.stringify(projectData.technologies));
    formData.append('status', projectData.status);
    formData.append('sort_order', projectData.sort_order.toString());
    formData.append('is_featured', projectData.is_featured.toString());

    const response = await fetch('http://localhost:8000/api/v1/projects/', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log(`✅ Проект "${projectData.title}" успешно добавлен:`, result);
    return result;
  } catch (error) {
    console.error(`❌ Ошибка при добавлении проекта "${projectData.title}":`, error);
    throw error;
  }
}

// Функция для импорта всех проектов
export async function importAllProjects(): Promise<void> {
  console.log(`🚀 Начинаем импорт ${inoxMetalArtProjects.length} проектов...`);
  
  let successCount = 0;
  let errorCount = 0;
  
  for (let i = 0; i < inoxMetalArtProjects.length; i++) {
    const project = inoxMetalArtProjects[i];
    try {
      console.log(`📝 Добавляем проект ${i + 1}/${inoxMetalArtProjects.length}: "${project.title}"`);
      await addProject(project);
      successCount++;
      
      // Небольшая задержка между запросами
      if (i < inoxMetalArtProjects.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    } catch (error) {
      console.error(`❌ Ошибка при добавлении проекта "${project.title}":`, error);
      errorCount++;
    }
  }
  
  console.log(`🎉 Импорт завершен! Успешно: ${successCount}, Ошибок: ${errorCount}`);
}

// Функция для импорта проектов по категории
export async function importProjectsByCategory(category: string): Promise<void> {
  const filteredProjects = inoxMetalArtProjects.filter(p => p.category === category);
  console.log(`🚀 Начинаем импорт ${filteredProjects.length} проектов категории "${category}"...`);
  
  let successCount = 0;
  let errorCount = 0;
  
  for (let i = 0; i < filteredProjects.length; i++) {
    const project = filteredProjects[i];
    try {
      console.log(`📝 Добавляем проект ${i + 1}/${filteredProjects.length}: "${project.title}"`);
      await addProject(project);
      successCount++;
      
      // Небольшая задержка между запросами
      if (i < filteredProjects.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    } catch (error) {
      console.error(`❌ Ошибка при добавлении проекта "${project.title}":`, error);
      errorCount++;
    }
  }
  
  console.log(`🎉 Импорт категории "${category}" завершен! Успешно: ${successCount}, Ошибок: ${errorCount}`);
}

// Функция для очистки всех проектов
export async function clearAllProjects(): Promise<void> {
  if (!confirm('⚠️ Вы уверены, что хотите удалить ВСЕ проекты? Это действие нельзя отменить!')) {
    return;
  }
  
  try {
    console.log('🗑️ Начинаем очистку всех проектов...');
    
    // Получаем список всех проектов
    const response = await fetch('http://localhost:8000/api/v1/projects/');
    if (!response.ok) {
      throw new Error('Ошибка получения списка проектов');
    }
    
    const data = await response.json();
    const projects = data.projects;
    
    if (projects.length === 0) {
      console.log('ℹ️ Проекты для удаления не найдены');
      return;
    }
    
    console.log(`🗑️ Найдено ${projects.length} проектов для удаления...`);
    
    let deletedCount = 0;
    let errorCount = 0;
    
    for (const project of projects) {
      try {
        const deleteResponse = await fetch(`http://localhost:8000/api/v1/projects/${project.id}`, {
          method: 'DELETE',
        });
        
        if (deleteResponse.ok) {
          console.log(`✅ Проект "${project.title}" удален`);
          deletedCount++;
        } else {
          console.error(`❌ Ошибка удаления проекта "${project.title}"`);
          errorCount++;
        }
        
        // Небольшая задержка между запросами
        await new Promise(resolve => setTimeout(resolve, 200));
      } catch (error) {
        console.error(`❌ Ошибка при удалении проекта "${project.title}":`, error);
        errorCount++;
      }
    }
    
    console.log(`🎉 Очистка завершена! Удалено: ${deletedCount}, Ошибок: ${errorCount}`);
  } catch (error) {
    console.error('❌ Ошибка при очистке проектов:', error);
  }
}

// Экспортируем функции в глобальную область для использования в консоли браузера
(window as any).inoxMetalArtProjectsImport = {
  addProject,
  importAllProjects,
  importProjectsByCategory,
  clearAllProjects,
  projects: inoxMetalArtProjects
};

console.log('🚀 Модуль импорта проектов InoxMetalArt загружен!');
console.log('📊 Доступно проектов:', inoxMetalArtProjects.length);
console.log('🔧 Используйте inoxMetalArtProjectsImport.importAllProjects() для импорта всех проектов');
console.log('📁 Используйте inoxMetalArtProjectsImport.importProjectsByCategory("exterior") для импорта по категории');
console.log('🗑️ Используйте inoxMetalArtProjectsImport.clearAllProjects() для очистки базы данных');




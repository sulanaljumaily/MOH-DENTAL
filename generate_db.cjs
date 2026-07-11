const fs = require('fs');
const path = require('path');

const provinces = [
  {
    id: 1,
    name: 'دائرة صحة بغداد / الرصافة',
    description: 'تغطي الجانب الشرقي من العاصمة بغداد وتشمل عدة أقضية ونواحي',
    location: 'بغداد - الرصافة',
    sectors: ['الأعظمية', 'الرصافة', 'الشعب', 'الصدر الأول', 'الصدر الثاني', 'المدائن', 'بغداد الجديدة', 'الاستقلال', 'التاجي (الرصافة)', 'الزهور', 'الحسينية', 'المعامل', 'جسر ديالى'],
    spec: ['الرصافة', 'بغداد الجديدة', 'الصدر']
  },
  {
    id: 2,
    name: 'دائرة صحة بغداد / الكرخ',
    description: 'تغطي الجانب الغربي من العاصمة بغداد والبلدات التابعة لها',
    location: 'بغداد - الكرخ',
    sectors: ['الكرخ', 'الكاظمية', 'المنصور', 'الدورة', 'المحمودية', 'التاجي', 'الطارمية', 'أبو غريب', 'الرضوانية', 'البياع', 'حي العامل', 'الحرية', 'اليوسفية', 'اللطيفية'],
    spec: ['الكرخ', 'العامرية', 'المحمودية']
  },
  {
    id: 3,
    name: 'دائرة صحة صلاح الدين',
    description: 'تغطي محافظة صلاح الدين بجميع أقضيتها ونواحيها',
    location: 'صلاح الدين - تكريت',
    sectors: ['تكريت', 'سامراء', 'بيجي', 'بلد', 'الدجيل', 'طوزخورماتو', 'الشرقاط', 'الدور', 'العلم', 'سليمان بيك', 'يثرب', 'الضلوعية', 'حمرين'],
    spec: ['تكريت']
  },
  {
    id: 4,
    name: 'دائرة صحة البصرة',
    description: 'تغطي محافظة البصرة وجميع أقضيتها ونواحيها الجنوبية والشرقية',
    location: 'البصرة',
    sectors: ['البصرة الأول', 'البصرة الثاني', 'الزبير', 'أبو الخصيب', 'القرنة', 'شط العرب', 'الفاو', 'المدينة', 'الهارثة', 'سفوان', 'أم قصر', 'نشوة', 'الدير', 'السيبة'],
    spec: ['البصرة التخصصي', 'المعقل التخصصي', 'الزبير التخصصي']
  },
  {
    id: 5,
    name: 'دائرة صحة نينوى',
    description: 'تغطي محافظة نينوى ومركزها مدينة الموصل وباقي أقضيتها الشمالية والجنوبية',
    location: 'نينوى - الموصل',
    sectors: ['الموصل الأيمن', 'الموصل الأيسر', 'تلعفر', 'سنجار', 'الحضر', 'الشيخان', 'تلكيف', 'الحمدانية', 'البعاج', 'مخمور', 'ربيعة', 'زمار', 'القيارة', 'العياضية', 'حمام العليل', 'برطلة', 'النمرود'],
    spec: ['نينوى التخصصي', 'الحدباء التخصصي', 'تلعفر التخصصي']
  },
  {
    id: 6,
    name: 'دائرة صحة ذي قار',
    description: 'تغطي محافظة ذي قار وأقضيتها السبعة ومركزها مدينة الناصرية',
    location: 'ذي قار - الناصرية',
    sectors: ['الناصرية', 'الشطرة', 'الرفاعي', 'سوق الشيوخ', 'الجبايش', 'الغراف', 'قلعة سكر', 'الفجر', 'النصر', 'البطحاء', 'الدواية', 'سيد دخيل', 'الفضيلية', 'الإصلاح'],
    spec: ['الناصرية التخصصي', 'الشطرة التخصصي', 'سوق الشيوخ التخصصي']
  },
  {
    id: 7,
    name: 'دائرة صحة الأنبار',
    description: 'تغطي محافظة الأنبار الشاسعة بجميع أقضيتها الغربية والشرقية',
    location: 'الأنبار - الرمادي',
    sectors: ['الرمادي', 'الفلوجة', 'هيت', 'حديثة', 'عانة', 'راوة', 'الرطبة', 'القائم', 'الكرمة', 'الخالدية', 'الحبانية', 'البغدادي', 'العبيدي', 'القيروان'],
    spec: ['الرمادي التخصصي', 'الفلوجة التخصصي', 'هيت التخصصي']
  },
  {
    id: 8,
    name: 'دائرة صحة بابل',
    description: 'تغطي محافظة بابل ومركزها مدينة Hلة وأقضيتها المحيطة',
    location: 'بابل - الحلة',
    sectors: ['الحلة الأول', 'الحلة الثاني', 'المحاويل', 'المسيب', 'الهاشمية', 'القاسم', 'الحمزة الغربي', 'الإسكندرية', 'جرف النصر', 'الكفل', 'السدة', 'مشروع المسيب'],
    spec: ['الحلة التخصصي', 'المحاويل التخصصي', 'المسيب التخصصي']
  },
  {
    id: 9,
    name: 'دائرة صحة كربلاء المقدسة',
    description: 'تغطي محافظة كربلاء وأقضيتها ونواحيها بالكامل والمناطق المحيطة',
    location: 'كربلاء المقدسة',
    sectors: ['كربلاء الأول', 'كربلاء الثاني', 'الهندية', 'عين التمر', 'الحسينية', 'الحر', 'الجدول الغربي', 'عون', 'حي الوفاء'],
    spec: ['كربلاء التخصصي', 'الهندية التخصصي', 'الحسينية التخصصي']
  },
  {
    id: 10,
    name: 'دائرة صحة النجف الأشرف',
    description: 'تغطي محافظة النجف ومركزها مدينة النجف الأشرف والكوفة وبقية الأقضية والبادية',
    location: 'النجف الأشرف',
    sectors: ['النجف الشمالي', 'النجف الجنوبي', 'الكوفة', 'المناذرة', 'المشخاب', 'الحيدرية', 'العباسية', 'الشبكة', 'القادسية (النجف)', 'الرضوية'],
    spec: ['النجف التخصصي', 'الغري التخصصي', 'الكوفة التخصصي']
  },
  {
    id: 11,
    name: 'دائرة صحة القادسية',
    description: 'تغطي محافظة القادسية ومركزها مدينة الديوانية وأقضية الشامية وعفك والحمزة',
    location: 'القادسية - الديوانية',
    sectors: ['الديوانية الأول', 'الديوانية الثاني', 'الشامية', 'عفك', 'الحمزة', 'الدغارة', 'السنية', 'سومر', 'آل بدير', 'نفر', 'غماس', 'الشنافية'],
    spec: ['الديوانية التخصصي', 'الشامية التخصصي', 'عفك التخصصي']
  },
  {
    id: 12,
    name: 'دائرة صحة واسط',
    description: 'تغطي محافظة واسط ومركزها مدينة الكوت وأقضيتها الشمالية والجنوبية والحدودية',
    location: 'واسط - الكوت',
    sectors: ['الكوت الأول', 'الكوت الثاني', 'النعمانية', 'الصويرة', 'الحي', 'العزيزية', 'بدرة', 'زرباطية', 'الموفقية', 'شيخ سعد', 'البشائر', 'الدبوني'],
    spec: ['الكوت التخصصي', 'النعمانية التخصصي', 'الصويرة التخصصي']
  },
  {
    id: 13,
    name: 'دائرة صحة ميسان',
    description: 'تغطي محافظة ميسان ومركزها مدينة العمارة وأقضية المجر والكحلاء والميمونة',
    location: 'ميسان - العمارة',
    sectors: ['العمارة الأول', 'العمارة الثاني', 'المجر الكبير', 'قلعة صالح', 'الكحلاء', 'الميمونة', 'علي الغربي', 'المشرح', 'المجر الصغير', 'السلام', 'علي الشرقي'],
    spec: ['العمارة التخصصي', 'المجر الكبير التخصصي', 'قلعة صالح التخصصي']
  },
  {
    id: 14,
    name: 'دائرة صحة المثنى',
    description: 'تغطي محافظة المثنى ومركزها مدينة السماوة والرميثة وقضاء الخضر والبادية الجنوبية',
    location: 'المثنى - السماوة',
    sectors: ['السماوة الأول', 'السماوة الثاني', 'الرميثة', 'الخضر', 'السلمان', 'الوركاء', 'المجد', 'النجمي', 'الهلال', 'بصية'],
    spec: ['السماوة التخصصي', 'الرميثة التخصصي', 'الخضر التخصصي']
  },
  {
    id: 15,
    name: 'دائرة صحة كركوك',
    description: 'تغطي محافظة كركوك ونواحيها بالكامل وتتميز بالتنوع الثقافي والجغرافي والأقضية المرتبطة',
    location: 'كركوك',
    sectors: ['كركوك الأول', 'كركوك الثاني', 'الحويجة', 'داقوق', 'الدبس', 'الرياض', 'الرشاد', 'التون كوبري', 'تازة', 'ليلان', 'شوان'],
    spec: ['كركوك التخصصي', 'الحويجة التخصصي', 'النصر التخصصي']
  },
  {
    id: 16,
    name: 'دائرة صحة ديالى',
    description: 'تغطي محافظة ديالى ومركزها مدينة بعقوبة وأقضية المقدادية والخالص وخانقين وبلدروز',
    location: 'ديالى - بعقوبة',
    sectors: ['بعقوبة الأول', 'بعقوبة الثاني', 'المقدادية', 'الخالص', 'خانقين', 'بلدروز', 'كفري', 'جلولاء', 'السعدية', 'هبهب', 'العظيم', 'المنصورية', 'بهرز'],
    spec: ['ديالى التخصصي', 'بعقوبة التخصصي', 'الخالص التخصصي']
  },
  {
    id: 17,
    name: 'دائرة صحة دهوك',
    description: 'تغطي محافظة دهوك في إقليم كردستان العراق بالكامل وبجميع أقضيتها ونواحيها الجبلية',
    location: 'دهوك',
    sectors: ['دهوك الأول', 'دهوك الثاني', 'زاخو', 'سميل', 'العمادية', 'عقرة', 'شيخان', 'باتيفا', 'مانكيش', 'صرسنك', 'بامرني'],
    spec: ['دهوك التخصصي', 'زاخو التخصصي', 'عقرة التخصصي']
  },
  {
    id: 18,
    name: 'دائرة صحة أربيل',
    description: 'تغطي عاصمة إقليم كردستان العراق مدينة أربيل ونواحيها وأقضيتها التاريخية والجبلية',
    location: 'أربيل',
    sectors: ['أربيل الأول', 'أربيل الثاني', 'سوران', 'شقلاوة', 'كويسنجق', 'مخمور', 'عينكاوة', 'صلاح الدين', 'خليفان', 'رواندز', 'خبات', 'حرير'],
    spec: ['أربيل التخصصي', 'عينكاوة التخصصي', 'سوران التخصصي']
  },
  {
    id: 19,
    name: 'دائرة صحة السليمانية',
    description: 'تغطي محافظة السليمانية في إقليم كردستان العراق بجميع أقضيتها وإداراتها المستقلة',
    location: 'السليمانية',
    sectors: ['السليمانية الأول', 'السليمانية الثاني', 'رانية', 'كلار', 'جمجمال', 'دربندخان', 'دوكان', 'بنجوين', 'سيد صادق', 'قلات دزة', 'حلبجة الجديدة', 'قره داغ'],
    spec: ['السليمانية التخصصي', 'رانية التخصصي', 'كلار التخصصي']
  },
  {
    id: 20,
    name: 'دائرة صحة حلبجة',
    description: 'تغطي محافظة حلبجة الفتية ومناطقها الجبلية بالكامل وأقضيتها ونواحيها الحدودية',
    location: 'حلبجة',
    sectors: ['حلبجة', 'سيروان', 'خورمال', 'بيارة', 'بمو'],
    spec: ['حلبجة التخصصي', 'سيروان التخصصي', 'خورمال التخصصي']
  }
];

// Custom highly authentic center names mapper
const customSectorCenters = {
  // Baghdad Resafa
  "قطاع الأعظمية": ["الوزيرية", "الصليخ", "جري دية", "القاهرة", "سبع أبكار"],
  "قطاع الرصافة": ["الفضل", "الصدرية", "باب الشيخ", "الشيخ عمر", "أبو سيفين"],
  "قطاع الشعب": ["حي البساتين", "حي أور", "الشعب الرئيسي", "الثعالبة", "الجزائر"],
  "قطاع الصدر الأول": ["الكيارة", "الحبيبية", "الداخل", "القطاع 1", "القطاع 10"],
  "قطاع الصدر الثاني": ["الجوادر", "الأورفلي", "القطاع 25", "القطاع 40", "الداخل الشرقي"],
  "قطاع المدائن": ["جسر ديالى", "سلمان باك", "اللج", "الوردية", "الجعفرية"],
  "قطاع بغداد الجديدة": ["المشتل", "الأمين", "الفضيلية", "الغدير", "الكفاءات"],
  "قطاع الاستقلال": ["الحسينية", "بوب الشام", "الثعالبة الثانية", "الراشدية", "الزهور الأولى"],
  
  // Baghdad Karkh
  "قطاع الكرخ": ["الشواكة", "الصالحية", "الكريمات", "الرحمانية", "الشيخ معروف"],
  "قطاع الكاظمية": ["النور", "الخطيب", "الجوادين", "العراق الجديد", "الوفاء", "الشهيد الصدر"],
  "قطاع المنصور": ["الداودي", "اليرموك", "الحارثية", "الإسكان", "الوشاش"],
  "قطاع الدورة": ["أبو تشير", "الميكانيك", "الآثاريين", "هور رجب", "الوادي"],
  "قطاع المحمودية": ["الرشيد", "اللطيفية", "اليوسفية", "صدر اليوسفية", "اليوسفية الثانية"],
  "قطاع أبو غريب": ["النصر والسلام", "الزيدان", "خان ضاري", "عكركوف", "الحمدانية الغربية"],

  // Salah Al-Din
  "قطاع تكريت": ["حي الطين", "حي القادسية", "حي الزهور", "الديوم", "العلم"],
  "قطاع سامراء": ["الجبيرية", "الخضراء", "العروبة", "الجيزانية", "المعتصم"],
  "قطاع بيجي": ["البعيجي", "التحرير", "الزيتون", "الصينية", "البو جواري", "الزوية", "البو طعمة", "الحجاج", "مكحول"],
  "قطاع بلد": ["يثرب", "الضلوعية", "عزيز بلد", "الجزيرة", "بلد الرئيسي"],
  "قطاع الدجيل": ["الشيخ جميل", "البو علوان", "السجلة", "الدجيل الرئيسي", "الدجيل الجنوبي"],
  "قطاع طوزخورماتو": ["سليمان بيك", "ينكجة", "بسطاملي", "آمرلي", "الطوز الرئيسي"],
  "قطاع الشرقاط": ["سديرة", "مسحك", "الخصم", "جميلة", "اجمسة"],
};

// Province-based locality templates for other sectors
const provinceLocalities = {
  "ذي قار": ["الحبوبي", "أريدو", "الصالحية", "الفداء", "المنصورية", "الغراف", "البطحاء", "الغدير", "سيد دخيل", "الإصلاح", "الفضيلية", "اور"],
  "الأنبار": ["الخالدية", "الحبانية", "البغدادي", "العبيدي", "القيروان", "البوعيثة", "النساف", "الصقلاوية", "البوعساف", "الجزيرة", "الفرات"],
  "بابل": ["الحمزة الغربي", "الإسكندرية", "جرف النصر", "الكفل", "السدة", "نادر", "باب المشهد", "الثورة", "الكرامة", "المهندسين", "الجزيرة"],
  "كربلاء المقدسة": ["الحر", "الجدول الغربي", "عون", "حي الوفاء", "باب الخان", "باب السلالمة", "حي الحسين", "الملحق", "حي المعلمين", "الشباب"],
  "النجف الأشرف": ["المشخاب", "الحيدرية", "العباسية", "الرضوية", "حي الأمير", "حي العدالة", "حي العسكري", "النجف القديمة", "المشراق"],
  "القادسية": ["السنية", "سومر", "آل بدير", "نفر", "غماس", "الشنافية", "الشامية الجنوبي", "العروبة", "الإسكان", "حي العسكري", "الصدر"],
  "واسط": ["زرباطية", "الموفقية", "شيخ سعد", "البشائر", "الدبوني", "الهورة", "الكوت القديمة", "الجهاد", "الربيع", "أنوار الكوت"],
  "ميسان": ["المشرح", "المجر الصغير", "السلام", "علي الشرقي", "القطاع", "حي الحسين", "الشبانية", "أبو رمانة", "الماجدية", "القادسية"],
  "المثنى": ["الوركاء", "المجد", "النجمي", "الهلال", "بصية", "الحكيم", "السماوة القديمة", "الصدر", "الشرقية", "الغربية"],
  "كركوك": ["الرياض", "الرشاد", "التون كوبري", "تازة", "ليلان", "شوان", "تسعين", "النصر", "العروبة", "حي واسط", "القادسية كركوك"],
  "ديالى": ["جلولاء", "السعدية", "هبهب", "العظيم", "المنصورية", "بهرز", "المفرق", "كفري", "خانقين القديمة", "بلدروز الغربية"],
  "دهوك": ["باتيفا", "مانكيش", "صرسنك", "بامرني", "مازي", "شيلادزي", "ديرلوك", "زاويته", "كروي", "الشهداء دهوك"],
  "أربيل": ["صلاح الدين", "خليفان", "رواندز", "خبات", "حرير", "شقلاوة القديمة", "باداوا", "عدالة أربيل", "منارة أربيل"],
  "السليمانية": ["سيد صادق", "قلات دزة", "حلبجة الجديدة", "قره داغ", "سرجنار", "بختياري", "قاضي محمد", "عقاري", "رزكاري"],
  "حلبجة": ["بيارة", "بمو", "خورمال القديمة", "سيروان الثانية", "حلبجة الشمالية"]
};

let nextHcId = 3000;
let nextSpecId = 2100;

// Specific manual center overrides to keep user sessions working
const hcOverrides = {
  "3-301-0": 1012, // Salah Al-Din, sector تكريت index 0 (تكريت) -> 1012
  "3-301-1": 1013, // Salah Al-Din, sector تكريت index 1 (العلم) -> 1013
  "4-401-0": 1019, // Basra, sector البصرة الأول index 0 (البصرة) -> 1019
  "4-401-1": 1020, // Basra, sector البصرة الأول index 1 (العشار) -> 1020
  "4-401-2": 1021, // Basra, sector البصرة الأول index 2 (الجبيلة) -> 1021
  "4-402-0": 1022, // Basra, sector الزبير index 0 -> 1022
  "1-101-0": 1001, // Baghdad Resafa, sector الأعظمية index 0 -> 1001
  "1-101-1": 1002, // Baghdad Resafa, sector الأعظمية index 1 -> 1002
  "1-101-2": 1003, // Baghdad Resafa, sector الأعظمية index 2 -> 1003
  "1-102-0": 1004, // Baghdad Resafa, sector الرصافة index 0 -> 1004
  "1-102-1": 1005, // Baghdad Resafa, sector الرصافة index 1 -> 1005
  "1-103-0": 1006, // Baghdad Resafa, sector الشعب index 0 -> 1006
  "1-103-1": 1007, // Baghdad Resafa, sector الشعب index 1 -> 1007
  "2-201-0": 1008, // Baghdad Karkh, sector المنصور index 0 -> 1008
  "2-201-1": 1009, // Baghdad Karkh, sector المنصور index 1 -> 1009
  "2-202-0": 1010, // Karkh, sector الكاظمية index 0 (النور) -> 1010
  "2-202-1": 1011, // Karkh, sector الكاظمية index 1 (الخطيب) -> 1011
  "2-202-2": 1025, // Karkh, sector الكاظمية index 2 (الجوادين) -> 1025
  "2-202-3": 1026, // Karkh, sector الكاظمية index 3 (العراق الجديد) -> 1026
  "2-202-4": 1027, // Karkh, sector الكاظمية index 4 (الوفاء) -> 1027
  "2-202-5": 1028, // Karkh, sector الكاظمية index 5 (الشهيد الصدر) -> 1028
};

const specOverrides = {
  "1-0": 2001,
  "1-1": 2002,
  "1-2": 2039,
  "2-0": 2003,
  "2-1": 2040,
  "2-2": 2041,
  "3-0": 2004,
  "4-0": 2005,
  "4-1": 2006,
  "4-2": 2044,
  "5-0": 2007,
  "5-1": 2008,
  "5-2": 2045,
  "6-0": 2009,
  "6-1": 2046,
  "6-2": 2047,
  "7-0": 2010,
  "7-1": 2024,
  "7-2": 2048,
};

const generatedDirs = provinces.map((p) => {
  const dirSectors = p.sectors.map((secName, secIdx) => {
    const sectorId = p.id * 100 + (secIdx + 1);
    const fullSectorName = `قطاع ${secName}`;
    const hcs = [];
    
    let centerLocs = [];
    if (customSectorCenters[fullSectorName]) {
      centerLocs = [...customSectorCenters[fullSectorName]];
    } else {
      centerLocs = [
        "الرئيسي",
        "النموذجي"
      ];
      const provLocs = provinceLocalities[p.location.split(' - ')[0]] || provinceLocalities[p.name.replace('دائرة صحة ', '')] || ["حي السلام", "حي النور", "حي الحسين"];
      for (let i = 0; i < 3; i++) {
        const locName = provLocs[(sectorId + i) % provLocs.length];
        centerLocs.push(locName);
      }
    }

    const numHcs = centerLocs.length;
    for (let cIdx = 0; cIdx < numHcs; cIdx++) {
      const overrideKey = `${p.id}-${sectorId}-${cIdx}`;
      let hcId = hcOverrides[overrideKey];
      if (!hcId) {
        hcId = nextHcId++;
      }

      const loc = centerLocs[cIdx];
      let name = '';
      if (loc === "الرئيسي" || loc === "النموذجي") {
        name = `مركز صحي ${secName} ${loc}`;
      } else {
        name = `مركز صحي ${loc}`;
      }

      // Format name overrides to keep evaluator logins working
      if (overrideKey === "3-301-0") name = 'مركز صحي تكريت';
      if (overrideKey === "3-301-1") name = 'مركز صحي العلم';
      if (overrideKey === "4-401-0") name = 'مركز صحي البصرة';
      if (overrideKey === "4-401-1") name = 'مركز صحي العشار';
      if (overrideKey === "4-401-2") name = 'مركز صحي الجبيلة';
      if (overrideKey === "4-402-0") name = 'مركز صحي الزبير';
      if (overrideKey === "1-101-0") name = 'مركز صحي الأعظمية';
      if (overrideKey === "1-101-1") name = 'مركز صحي الوزيرية';
      if (overrideKey === "1-101-2") name = 'مركز صحي الكاظمية الشرقية';
      if (overrideKey === "1-102-0") name = 'مركز صحي الرصافة';
      if (overrideKey === "1-102-1") name = 'مركز صحي الفضل';
      if (overrideKey === "1-103-0") name = 'مركز صحي مدينة الصدر';
      if (overrideKey === "1-103-1") name = 'مركز صحي الحبيبية';
      
      // Let's set Karkh -> sector الكاظمية (id: 202) centers names exactly as PDF!
      if (p.id === 2 && sectorId === 202) {
        if (cIdx === 0) name = 'م.ص النور';
        if (cIdx === 1) name = 'م.ص الخطيب';
        if (cIdx === 2) name = 'م.ص الجوادين';
        if (cIdx === 3) name = 'م.ص العراق الجديد';
        if (cIdx === 4) name = 'م.ص الوفاء';
        if (cIdx === 5) name = 'م.ص الشهيد الصدر';
      }

      // Check if it should be pre-evaluated
      let isEvaluated = overrideKey === "3-301-0" || overrideKey === "4-401-0" || overrideKey === "4-401-1" || overrideKey === "4-402-0" || overrideKey === "1-101-0" || overrideKey === "1-101-2" || overrideKey === "1-102-0" || overrideKey === "1-103-1";
      
      // All Karkh -> sector الكاظمية (id: 202) centers are evaluated matching the PDF reports!
      if (p.id === 2 && sectorId === 202 && cIdx < 6) {
        isEvaluated = true;
      }

      let score = null;
      let serviceScore = null;
      let indicatorScore = null;
      let answers = undefined;

      if (isEvaluated) {
        if (p.id === 2 && sectorId === 202) {
          // Exact PDF stats
          if (cIdx === 0) { score = 93; serviceScore = 40; indicatorScore = 53; }
          else if (cIdx === 1) { score = 80; serviceScore = 23; indicatorScore = 57; }
          else if (cIdx === 2) { score = 77; serviceScore = 23; indicatorScore = 54; }
          else if (cIdx === 3) { score = 72; serviceScore = 25; indicatorScore = 47; }
          else if (cIdx === 4) { score = 70; serviceScore = 23; indicatorScore = 47; }
          else if (cIdx === 5) { score = 69; serviceScore = 16; indicatorScore = 53; }
        } else {
          // General realistic defaults
          score = 78;
          serviceScore = 30;
          indicatorScore = 48;
        }

        // Generate answers matching the new evaluation schema
        answers = {
          // Service outcomes (out of 10 each)
          s_fillings: serviceScore ? Math.round(serviceScore * 0.25) : 8,
          s_extractions: serviceScore ? Math.round(serviceScore * 0.25) : 7,
          s_cleaning: serviceScore ? Math.round(serviceScore * 0.25) : 8,
          s_exam: serviceScore ? Math.round(serviceScore * 0.25) : 7,
          // Indicators (out of 2 each)
          q_chair: 2, q_xray: 2,
          q_materials: 2, q_fridge: 1,
          q_daily_reg: 2, q_spend_reg: 2, q_referrals: 2,
          q_ocp_reg: 2, q_ocp_visits: 2, q_ocp_card: 2, q_ocp_dentists: 2, q_ocp_parents: 2, q_ocp_school: 1, q_ocp_parent_card: 2, q_ocp_workshop: 2,
          q_inf_prec: 2, q_inf_safety: 2, q_inf_waste: 2, q_inf_ultra: 2, q_inf_autoclave: 2, q_inf_clean: 2, q_inf_vaccine: 2, q_inf_extractor: 2, q_inf_wrapper: 2, q_inf_guidelines: 2, q_inf_tools: 2, q_inf_training: 2
        };
      }

      hcs.push({
        id: hcId,
        name: name,
        status: isEvaluated ? 'evaluated' : 'pending',
        score: score,
        serviceScore: serviceScore,
        indicatorScore: indicatorScore,
        answers: answers
      });
    }

    return {
      id: sectorId,
      name: fullSectorName,
      healthCenters: hcs
    };
  });

  const dirSpecs = p.spec.map((specName, specIdx) => {
    const overrideKey = `${p.id}-${specIdx}`;
    let specId = specOverrides[overrideKey];
    if (!specId) {
      specId = nextSpecId++;
    }

    const isEvaluated = overrideKey === "1-0" || overrideKey === "2-0" || overrideKey === "3-0" || overrideKey === "4-0" || overrideKey === "5-0";
    
    let name = `مركز أسنان تخصصي ${specName}`;
    if (p.id === 3) {
      name = `المركز التخصصي لطب الأسنان في تكريت`;
    }

    let score = null;
    let stage1Score = null;
    let stage2Score = null;
    let answers = undefined;

    if (isEvaluated) {
      score = overrideKey === "4-0" ? 92 : overrideKey === "1-0" ? 88 : overrideKey === "2-0" ? 83 : 79;
      stage1Score = Math.round(score * 1.02);
      stage2Score = Math.round(score * 0.98);

      answers = {
        // Setup answers for units
        u_1_daily_reg: 10, u_1_spend_reg: 10, u_1_docs_reg: 10, u_1_chairs: 10, u_1_materials: 10, u_1_inf_control: 10,
        u_2_daily_reg: 10, u_2_spend_reg: 10, u_2_docs_reg: 10, u_2_chairs: 10, u_2_materials: 10, u_2_inf_control: 10,
        u_3_daily_reg: 10, u_3_spend_reg: 10, u_3_docs_reg: 10, u_3_chairs: 10, u_3_materials: 10, u_3_inf_control: 10,
        u_4_daily_reg: 10, u_4_spend_reg: 10, u_4_docs_reg: 10, u_4_chairs: 10, u_4_materials: 10, u_4_inf_control: 10,
        u_5_daily_reg: 10, u_5_spend_reg: 10, u_5_docs_reg: 10, u_5_chairs: 10, u_5_materials: 10, u_5_inf_control: 10,
        u_6_daily_reg: 10, u_6_spend_reg: 10, u_6_docs_reg: 10, u_6_chairs: 10, u_6_materials: 10, u_6_inf_control: 10,
        u_7_daily_reg: 10, u_7_spend_reg: 10, u_7_docs_reg: 10, u_7_chairs: 10, u_7_materials: 10, u_7_inf_control: 10,
        u_8_daily_reg: 10, u_8_spend_reg: 10, u_8_docs_reg: 10, u_8_chairs: 10, u_8_materials: 10, u_8_inf_control: 10,
        u_9_daily_reg: 10, u_9_spend_reg: 10, u_9_docs_reg: 10, u_9_chairs: 10, u_9_materials: 10, u_9_inf_control: 10,
        u_10_daily_reg: 10, u_10_spend_reg: 10, u_10_docs_reg: 10, u_10_chairs: 10, u_10_materials: 10, u_10_inf_control: 10,
        u_11_daily_reg: 10, u_11_spend_reg: 10, u_11_docs_reg: 10, u_11_chairs: 10, u_11_materials: 10, u_11_inf_control: 10,
        // Central Infection Control
        inf_waste_reg: 30, inf_injury_reg: 30, inf_vaccines: 40
      };
    }

    return {
      id: specId,
      name: name,
      status: isEvaluated ? 'evaluated' : 'pending',
      score: score,
      stage1Score: stage1Score,
      stage2Score: stage2Score,
      availableUnits: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], // Default to all units available
      answers: answers
    };
  });

  return {
    id: p.id,
    name: p.name,
    description: p.description,
    location: p.location,
    sectors: dirSectors,
    specializedCenters: dirSpecs
  };
});

const storePath = path.join(__dirname, 'src', 'data', 'store.js');
let storeContent = fs.readFileSync(storePath, 'utf8');

const startMarker = 'const initialData = {';
const endMarker = 'const SESSION_KEY =';

const startIndex = storeContent.indexOf(startMarker);
const endIndex = storeContent.indexOf(endMarker);

if (startIndex === -1 || endIndex === -1) {
  console.error("Could not find initialData block in store.js!");
  process.exit(1);
}

const newInitialData = `const initialData = {
  directorates: ${JSON.stringify(generatedDirs, null, 2)},

  users: [
    {
      id: 1,
      username: 'admin',
      password: 'admin123',
      fullName: 'أحمد محمد العلي',
      role: 'admin',
      specialization: null,
      directorateIds: [],
      sectorId: null,
      assignedCenterIds: [],
      createdAt: '2024-01-15',
      evaluationsCompleted: 0,
      totalAssigned: 0,
    },
    {
      id: 2,
      username: 'eval_health1',
      password: '123456',
      fullName: 'محمد حسين الجبوري',
      role: 'evaluator',
      specialization: 'health',
      directorateIds: [2], // Baghdad Karkh
      sectorId: 202, // قطاع الكاظمية
      assignedCenterIds: [1010, 1011, 1025, 1026, 1027, 1028],
      createdAt: '2024-02-10',
      evaluationsCompleted: 6,
      totalAssigned: 6,
    },
    {
      id: 3,
      username: 'eval_spec1',
      password: '123456',
      fullName: 'علي كاظم الموسوي',
      role: 'evaluator',
      specialization: 'specialized',
      directorateIds: [1], // Baghdad الرصافة
      sectorId: null,
      assignedCenterIds: [2001, 2002],
      createdAt: '2024-02-20',
      evaluationsCompleted: 1,
      totalAssigned: 2,
    },
    {
      id: 4,
      username: 'eval_health2',
      password: '123456',
      fullName: 'فاطمة عبد الرزاق',
      role: 'evaluator',
      specialization: 'health',
      directorateIds: [4, 3], // Basra and Salah Al-Din
      sectorId: 401,
      assignedCenterIds: [1019, 1020],
      createdAt: '2024-03-01',
      evaluationsCompleted: 3,
      totalAssigned: 5,
    },
    {
      id: 5,
      username: 'eval_spec2',
      password: '123456',
      fullName: 'زينب حسن البصري',
      role: 'evaluator',
      specialization: 'specialized',
      directorateIds: [4, 1], // Basra and Baghdad الرصافة
      sectorId: null,
      assignedCenterIds: [2005, 2006],
      createdAt: '2024-03-15',
      evaluationsCompleted: 1,
      totalAssigned: 2,
    },
  ],

  evaluations: [],
  nextUserId: 6,
  nextDirectorateId: 21,
  dbVersion: 10
};\n\n`;

const updatedStoreContent = storeContent.substring(0, startIndex) + newInitialData + storeContent.substring(endIndex);

fs.writeFileSync(storePath, updatedStoreContent, 'utf8');
console.log("Successfully generated and updated store.js database to dbVersion: 10!");

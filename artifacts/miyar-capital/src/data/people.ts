import { BOARD_MEMBER_PHOTOS } from "../site/memberImages";
import {
  EXECUTIVE_PHOTOS,
  PORTRAIT_PLACEHOLDER_FEMALE,
  PORTRAIT_PLACEHOLDER_MALE,
} from "../site/executiveImages";

export type PersonGender = "male" | "female";

export interface Person {
  /** Stable id for hierarchy / cross-refs (executive team). */
  id?: string;
  name: string;
  nameAr: string;
  role: string;
  roleAr: string;
  /**
   * Portrait URL. Empty / missing → gender placeholder
   * (`placeholder-portrait-male` / `placeholder-portrait-female`).
   */
  photo?: string;
  /** Used when `photo` is missing. Defaults to `"male"`. */
  gender?: PersonGender;
  initials?: string;
  /** Bio / paragraph — EN */
  bio?: string;
  /** Bio / paragraph — AR (falls back to EN when empty) */
  bioAr?: string;
}

/** Resolve a portrait URL, falling back to the gender placeholder. */
export function resolvePersonPhoto(
  photo: string | undefined,
  gender: PersonGender = "male",
): string {
  if (photo) return photo;
  return gender === "female"
    ? PORTRAIT_PLACEHOLDER_FEMALE
    : PORTRAIT_PLACEHOLDER_MALE;
}

/**
 * Board of Directors — LTR display order = member-1 … member-7 photos.
 * Drop portraits into public/media/members/ as member-1.webp (or .jpg/.png/…).
 */
export const BOARD_INTRO = {
  parasEn: [
    "The management team and the organization's ability to maintain focus on achieving its strategic objectives depend on the Miyar Capital team. The Board of Directors oversees the company's business in accordance with its vision, purpose, and objectives.",
    "Senior businessmen and experts who have knowledge of the nature and scope of the organization form the Board of Directors of Miyar Capital.",
  ],
  parasAr: [
    "يعتمد فريق الإدارة وقدرة المنظمة على الحفاظ على التركيز على تحقيق أهدافها الاستراتيجية على فريق معيار المالية. يشرف مجلس الإدارة على أعمال الشركة وفق رؤيتها وغرضها وأهدافها.",
    "يشكل كبار رجال الأعمال والخبراء الذين لديهم معرفة بطبيعة ونطاق المنظمة مجلس إدارة معيار المالية.",
  ],
} as const;

export const BOARD_MEMBERS: Person[] = [
  {
    name: "Mr. Muhammad ibn Abdul Mohsen al-Zakri",
    nameAr: "الأستاذ محمد بن عبدالمحسن الزكري",
    role: "Chairman of the Board & Co-Founder",
    roleAr: "رئيس مجلس الإدارة والشريك المؤسس",
    photo: BOARD_MEMBER_PHOTOS[0] || "",
    gender: "male",
    initials: "MZ",
    bio: "CEO of Al-Zakri Holding Company, Mr. Mohammed served as a member of the Board of Directors of Al-Andalus Real Estate Company and a member of the Executive Committee. He holds a master's degree in management from the University of La Verne in the United States of America and a bachelor's degree in financial management from Prince Sultan University.",
    bioAr: "الرئيس التنفيذي لشركة الزكري القابضة ،شغل الاستاذ محمد عضو مجلس ادارة شركة الاندلس العقارية وعضو اللجنة التنفيذية ،‌‌ حاصل على شهادة الماجستير في الادارة من جامعة لافيرن في الولايات المتحده الامريكية وشهادة البكالوريوس في الادارة المالية من‌‌ جامعة الامير سلطان.",
  },
  {
    name: "Ziad ibn Abdul Mohsen al-Zakri",
    nameAr: "الأستاذزياد بن عبدالمحسن الزكري",
    role: "Vice Chairman of the Board of Directors",
    roleAr: "نائب رئيس مجلس الإدارة",
    photo: BOARD_MEMBER_PHOTOS[1] || "",
    gender: "male",
    initials: "ZZ",
    bio: "CEO of Azm Investment Company since 2019. He has experience in asset management, investment operations, and equity valuation. He previously served as an investment manager at Al-Zakri Holding Company and serves on the boards of several companies and startups in the technology, healthcare, and event management sectors. He holds a Bachelor's degree in Business Administration, majoring in Finance, from Alfaisal University, with distinguished experience in structuring and executing investment deals and financial analysis.",
    bioAr: "يشغل منصب الرئيس التنفيذي لشركة ‌‌عزم للاستثمار‌‌ منذ عام ‌‌2019‌‌، ويتمتع بخبرة في إدارة الأصول والعمليات الاستثمارية وتقييم‌‌ الأسهم. شغل سابقًا منصب مدير استثمار في ‌‌شركة الزكري القابضة‍‍، ويشغل عضوية مجالس إدارة عدة شركات ومشاريع ناشئة في‌‌ مجالات التكنولوجيا والرعاية الصحية وإدارة الفعاليات. يحمل درجة البكالوريوس في إدارة الأعمال ‌‌–‌‌ تخصص المالية من ‌‌جامعة‌‌ الفيصل‍‍، بخبرة متميزة في هيكلة وتنفيذ الصفقات الاستثمارية والتحليل المالي",
  },
  {
    name: "Mr. Ghassan bin Abdulrahman Al-Thukair",
    nameAr: "الأستاذ غسان بن عبدالرحمن الذكير",
    role: "CEO and Managing Director",
    roleAr: "الرئيس التنفيذي والعضو المنتدب",
    photo: BOARD_MEMBER_PHOTOS[2] || "",
    gender: "male",
    initials: "GT",
    bio: "He served as CEO of Dar Al Tamweel and Investment Financial Company, senior fund manager at Al Rajhi Capital, Director of the Saudi Equity Fund, Director of private investment portfolios for VIP clients, acting head of asset management with the position of Director of the Alinma Fund at Alinma Investment Company, and senior financial analyst and Head of the asset management research team, covering the banking and petrochemical sectors at Al Bilad Capital Company. He holds a bachelor’s degree in industrial management from King Fahd University of Petroleum and Minerals in Saudi Arabia in 2007.",
    bioAr: "شغل منصب الرئيس التنفيذي لـشركة دار التمويل والاستثمار المالية، وشغل منصب كبير مدراء الصناديق الاستثمارية في شركة الراجحي المالية، ومدير صندوق الأسهم السعودية ومدير المحافظ الاستثمارية الخاصة لكبار العملاء ورئيس ادارة الاصول المكلف مع وظيفة مدير صندوق الانماء في شركة الانماء للاستثمار وكبير المحللين الماليين ورئيس فريق أبحاث إدارة الاصول حيث قام بتغطية قطاع البنوك والبتروكيماويات في شركة البلاد المالية، حاصل على درجة البكالوريوس في الإدارة الصناعية عام 2007م من جامعة الملك فهد للبترول والمعادن في السعودية.",
  },
  {
    name: "Mr. Mishari Muslim Al-Shaman",
    nameAr: "الأستاذ مشاري مسلم الشامان",
    role: "Independent Board Member",
    roleAr: "عضو مجلس إدارة - مستقل",
    photo: BOARD_MEMBER_PHOTOS[3] || "",
    gender: "male",
    initials: "MS",
    bio: "Chief Investment Officer of Maysan Business Investment Company. He has served on the boards of directors and committees of several companies, including Sehati Information Technology Services Company and Muscat Capital.",
    bioAr: "الرئيس التنفيذي للاستثمار لشركة ميسان لاستثمار الاعمال، شارك في عضوية مجالس الإدارات واللجان في عدد من الشركات منها (شركة صحتي لخدمات تكنولوجيا المعلومات ومسقط المالية).",
  },
  {
    name: "Mr. Majid bin Suleiman Al-Saleem",
    nameAr: "الأستاذ ماجد بن سليمان السليم",
    role: "Independent Board Member",
    roleAr: "عضو مجلس إدارة - مستقل",
    photo: BOARD_MEMBER_PHOTOS[4] || "",
    gender: "male",
    initials: "MS",
    bio: "Founder of Mujaz Financial Consulting, he has worked for several prestigious financial institutions and has diverse experience in several fields, including investment consulting, product development, valuation and financial modeling, real estate investment, and investment funds. He is a board member of several investment funds. He also holds an MBA from the University of Portsmouth, UK, and a BA in Finance from Suffolk University, USA.",
    bioAr: "المؤسس لمكتب مجاز للاستشارات المالية، عمل في عدة مؤسسات مالية مرموقة ولديه خبرات متنوعة في عدة مجالات من ضمنها الاستشارات الاستثمارية، تطوير المنتجات، التقييم والنماذج المالية، الاستثمار العقاري، الصناديق الاستثمارية وهو عضو مجلس إدارة فى عدة صناديق إستثمارية، كما أنه يحمل ماجستير ادارة الأعمال من جامعة بوورتسموث المملكة المتحده وبكالوريوس في المالية من جامعة سوفولك في الولايات المتحدة الأمريكية.",
  },
  {
    name: "Mr. Ayman Mansour Al-Aidan",
    nameAr: "الأستاذ أيمن منصور العيدان",
    role: "Independent Board Member",
    roleAr: "عضو مجلس إدارة مستقل",
    photo: BOARD_MEMBER_PHOTOS[5] || "",
    gender: "male",
    initials: "AA",
    bio: "He heads the position of Financial Investment Manager at Badel Al Khair Trading and Real Estate Establishment, and has over 10 years of experience in financial investment management and business development. He previously served as Acting CEO and Head of Brokerage at Emirates NBD Securities, in addition to leadership positions at Bank Al Bilad and Fransi Finance. He holds a Bachelor's degree in Applied Medical Sciences from King Saud University, along with several specialized certificates in financial management and investment planning.",
    bioAr: "يترأس منصب ‌‌مدير الاستثمارات المالية في مؤسسة باذل الخير للأعمال التجارية والعقارية‍‍، ويتمتع بخبرة تزيد عن ‌‌10‌‌ سنوات في‌‌ إدارة الاستثمارات المالية وتطوير الأعمال. شغل سابقًا منصب ‌‌الرئيس التنفيذي المكلف‌‌ ورئيس قسم الوساطة في ‌‌شركة الإمارات‌‌ دبي الوطني للأوراق المالية‍‍، إضافة إلى مناصب قيادية في ‌‌بنك البلاد‌‌ و‍‍الفرنسي المالية‌‌. يحمل درجة البكالوريوس في ‌‌العلوم الطبية‌‌ التطبيقية‌‌ من ‌‌جامعة الملك سعود‍‍، إلى جانب عدة شهادات متخصصة في الإدارة المالية والتخطيط الاستثماري.",
  },
];

/**
 * Executive Team — LTR display order = exec-1 … exec-7 photos.
 * Drop portraits into public/media/executives/ as exec-1.webp (or .jpg/.png/…).
 */
export const EXECUTIVE_TEAM: Person[] = [
  {
    id: "ceo",
    name: "Mr. Ghassan bin Abdulrahman Al-Thukair",
    nameAr: "الأستاذ غسان بن عبدالرحمن الذكير",
    role: "CEO and Managing Director",
    roleAr: "الرئيس التنفيذي والعضو المنتدب",
    photo: EXECUTIVE_PHOTOS[0] || "",
    gender: "male",
    initials: "GT",
    bio: "He served as CEO of Dar Al Tamweel and Investment Financial Company, senior fund manager at Al Rajhi Capital, Director of the Saudi Equity Fund, Director of private investment portfolios for VIP clients, acting head of asset management with the position of Director of the Alinma Fund at Alinma Investment Company, and senior financial analyst and Head of the asset management research team, covering the banking and petrochemical sectors at Al Bilad Capital Company. He holds a bachelor’s degree in industrial management from King Fahd University of Petroleum and Minerals in Saudi Arabia in 2007.",
    bioAr: "شغل منصب الرئيس التنفيذي لـشركة دار التمويل والاستثمار المالية، وشغل منصب كبير مدراء الصناديق الاستثمارية في شركة الراجحي المالية، ومدير صندوق الأسهم السعودية ومدير المحافظ الاستثمارية الخاصة لكبار العملاء ورئيس ادارة الاصول المكلف مع وظيفة مدير صندوق الانماء في شركة الانماء للاستثمار وكبير المحللين الماليين ورئيس فريق أبحاث إدارة الاصول حيث قام بتغطية قطاع البنوك والبتروكيماويات في شركة البلاد المالية، حاصل على درجة البكالوريوس في الإدارة الصناعية عام 2007م من جامعة الملك فهد للبترول والمعادن في السعودية.",
  },
  {
    id: "evp-bd",
    name: "Raed Abu Moati",
    nameAr: "رائد أبو معطي",
    role: "Executive Vice President of Business Development and Co-Head of Asset Management",
    roleAr: "نائب الرئيس التنفيذي لتطوير الأعمال والمسؤول المشارك عن إدارة الأصول",
    photo: EXECUTIVE_PHOTOS[1] || "",
    gender: "male",
    initials: "RM",
    bio: "He holds a bachelor's degree in financial management from King Saud University. He also holds a certificate in securities trading, an international certificate in wealth and investment management, and several courses in fund and portfolio management. He has over 16 years of experience in asset management and investment services, having served as head of money markets at Albilad Capital. Prior to joining Mi'yar Finance, he was head of money markets at SICO Capital and, prior to that, head of money markets at Itqan Capital.",
    bioAr: "حاصل على درجة البكالوريوس في الإدارة المالية من جامعة الملك سعود، وهو حاصل أيضاً على شهادة التعامل في الأوراق المالية، بالإضافة إلى الشهادة الدولية في إدارة الثروات والاستثمار بالاضافة الى عدة دورات في إدارة الصناديق والمحافظ، كما أن له اكثر من 16 عاماً من الخبرة في إدارة الأصول وخدمات الإستثمار، وقد عمل كرئيس أسواق النقد في البلاد المالية. كما انه قبل الانضمام إلى معيار المالية كان رئيس اسواق النقد في سيكو كابيتال وقبلها كذلك رئيس اسواق النقد في إتقان كابيتال.",
  },
  {
    id: "cfo",
    name: "Wael Abulfotouh",
    nameAr: "وائل أبو الفتوح",
    role: "Chief Financial Officer",
    roleAr: "المدير المالي",
    photo: "",
    gender: "male",
    initials: "WA",
    bio: "He has over 25 years of professional experience spanning various sectors and management levels. His practical experience has spanned multiple sectors, including financial companies licensed by the Saudi Capital Market Authority, as well as aviation, contracting, manufacturing, and agricultural land reclamation. Mr. Wael Abou El Fotouh holds a Bachelor's degree in Accounting and Auditing from Cairo University and is registered with the Saudi Capital Market Authority. He also holds the General Equity Qualification (CME1) from the CISI and is currently completing the Corporate Finance (CME5) certification from the same institute, in addition to the Financial Modeling and Valuation Analyst (FMVA) certification from the Corporate Finance Institute of Canada (CFI). He has over 25 years of professional experience spanning various sectors and management levels.",
    bioAr: "يتمتع بخبرة مهنية تمتد لأكثر من 25 عاماً تغطي مختلف القطاعات والمستويات الإدارية. تنوعت خبراته العملية في قطاعات متعددة، منها الشركات المالية المرخصة من هيئة السوق المالية السعودية، بالإضافة إلى مجالات الطيران، المقاولات، التصنيع، واستصلاح الأراضي الزراعية. حصل السيد / وائل ابوالفتوح على درجة البكالوريوس في المحاسبة والمراجعة من جامعة القاهرة، وهو مسجل لدى هيئة السوق المالية السعودية. كما يحمل شهادة “التأهيل العام للأوراق المالية” (CME1) من معهد CISI، ويعمل حالياً على إكمال شهادة “تمويل الشركات” (CME5) من نفس المعهد، إلى جانب شهادة محلل النمذجة المالية والتقييم المالي (FMVA) من معهد تمويل الشركات بكندا (CFI). يملك خبرة مهنية تمتد لأكثر من 25 عاماً تغطي مختلف القطاعات والمستويات الإدارية.",
  },
  // {
  //   id: "hwm",
  //   name: "Mohammed alhunaidi",
  //   nameAr: "محمد الهنيدي",
  //   role: "Head of Wealth Management",
  //   roleAr: "رئيس إدارة الثروات",
  //   photo: "",
  //   gender: "male",
  //   initials: "MH",
  //   bio: "Mohammed Al-Hunaidi holds the position of Head of Wealth Management at Miyar Capital Company and has over 23 years of experience in the Saudi financial sector, including wealth management, brokerage services in both the Saudi and American markets, and business development and investment services. Mohammed leads the wealth management operations at Miyar Capital, which includes developing management strategies, attracting high-net-worth and institutional clients, growing managed assets, developing investment solutions, and supporting capital raising efforts and marketing investment opportunities. He previously held several leadership positions at the Middle East Investment Company, Yaqeen Capital, Sequoia Capital, and Derayah Capital, in addition to his banking experience at SABB Bank and the Arab National Bank. During his career, he contributed to attracting assets worth over one billion riyals, led specialized teams, participated in the development and launch of investment platforms, products, and services, and was involved in the corporate culture team at Derayah Capital. He holds the General Securities Qualification Certificate (CME-1) and completed the Future Financial Leaders Program (FFLP) offered by the Financial Academy, in addition to several professional certifications and programs in sales management, leadership, and derivatives markets.",
  //   bioAr: "يشغل محمد الهنيدي منصب رئيس إدارة الثروات في شركة معيار المالية، ويتمتع بخبرة تمتد لأكثر من 23 عامًا في القطاع المالي السعودي، تشمل إدارة الثروات، وخدمات الوساطة في السوقين السعودي والأمريكي، وتطوير الأعمال والخدمات الاستثمارية. يقود محمد أعمال إدارة الثروات في معيار المالية، بما يشمل تطوير استراتيجية الإدارة، واستقطاب العملاء من ذوي الملاءة المالية العالية والعملاء المؤسسيين، وتنمية الأصول المدارة، وتطوير الحلول الاستثمارية، ودعم جهود جمع رؤوس الأموال وتسويق الفرص الاستثمارية. شغل سابقًا عددًا من المناصب القيادية في شركة الشرق الأوسط للاستثمار، ويقين المالية، وسيكو المالية، ودراية المالية، إلى جانب خبراته المصرفية في بنك ساب والبنك العربي الوطني. وخلال مسيرته، ساهم في استقطاب أصول تتجاوز قيمتها مليار ريال، وقاد فرقًا متخصصة، وشارك في تطوير وإطلاق منصات ومنتجات وخدمات استثمارية، كما شارك في فريق الثقافة المؤسسية في دراية المالية. يحمل شهادة التأهيل العام للتعامل في الأوراق المالية (CME-1)، وأتم برنامج قادة المستقبل المالي (FFLP) المقدم من الأكاديمية المالية، إلى جانب عدد من الشهادات والبرامج المهنية في إدارة المبيعات، وقيادة الأفراد، وأسواق المشتقات المالية.",
  // },
  {
    id: "ib",
    name: "Ibrahim Bawazeer",
    nameAr: "إبراهيم باوزير",
    role: "Senior Investment Banking Analyst",
    roleAr: "محلل أول في الخدمات المصرفية الاستثمارية",
    photo: "",
    gender: "male",
    initials: "IB",
    bio: "Has experience in initial public offerings (IPOs) in the parallel market, strategic studies, and financial evaluation. He served as a fund operations officer at the National Commercial Bank (NCB) Capital. He served as a financial analyst at Yaqeen Financial Company in the Investment Banking Group. He currently holds the position of Senior Financial Analyst in Investment Banking. He holds a bachelor's degree in financial management from King Saud University in Saudi Arabia. He holds the General Certificate in Securities Dealing (CME1), the International Certificate in Wealth and Investment Management (ICWIM), the Technical Foundations of Corporate Finance (CME5), and numerous other finance courses.",
    bioAr: "يتمتع بخبرة في عمليات الطرح العام الأولي في السوق الموازية نمو ، و الدراسات الاستراتيجية و التقييم المالي . شغل منصب ضابط عمليات الصناديق لدى البنك الأهلي السعودي كابيتال. شغل منصب محلل مالي لدى شركة يقين المالية في مجموعة الاستثمار المصرفي. يشغل حالياً منصب محلل مالي أول في المصرفية الاستثمارية. حاصل على درجة البكالوريوس في الإدارة المالية من جامعة الملك سعود في المملكة العربية السعودية. حاصل على الشهادة العامة للتعامل في الأوراق المالية (CME1) ، و الشهادة الدولية في إدارة الثروات و الاستثمار (ICWIM)، و شهادة الأسس الفنية لتمويل الشركات (CME5) ، و العديد من الدورات في التمويل.",
  },
  {
    id: "hop",
    name: "Fahad AlAli",
    nameAr: "فهد العلي",
    role: "Head of Operations",
    roleAr: "مدير العمليات",
    photo: "",
    gender: "male",
    initials: "FA",
    bio: "Mr. Fahad Al-Ali brings over 22 years of experience in investment operations, having held several key positions throughout his professional career. He most recently served as Trads and Settlement Operations Manager for investment funds and private portfolios at Al Ahli Capital, where he contributed to developing the plans and strategies that enhanced the company's settlement operations workflow. He previously held the position of Operations Department Manager at Rasanah Capital, SICO Capital, and Emirates NBD Capital. Additionally, during his 10 years at Albilad Capital, he held several positions, most notably Head of Equity Operations and Head of Funds and Private Portfolios Operations. Mr. Fahad holds an Intermediate University Diploma in Accounting with honors, and a Diploma in Computer Science specializing in Programming Technology",
    bioAr: "يتمتع الأستاذ/ فهد العلي بخبرة تزيد عن 22 عامًا في مجال عمليات الاستثمار، شغل خلالها عدة مناصب مهمة على مدار مسيرته المهنية. وقد شغل مؤخرًا منصب مدير عمليات التسوية للصناديق الاستثمارية والمحافظ الخاصة في شركة الأهلي المالية، حيث شارك في وضع الخطط والاستراتيجيات لتطوير سير عمل عمليات التسوية في الشركة. كما شغل مسبقًا منصب مدير إدارة العمليات في كل من شركة رصانة المالية، وشركة سيكو المالية، وشركة الإمارات دبي الوطني كابيتال. وتولى خلال 10 سنوات قضاها في شركة البلاد المالية عدة مناصب، من أهمها مدير قسم عمليات الأسهم، ومدير قسم عمليات الصناديق والمحافظ الخاصة. حاصل الأستاذ فهد على الشهادة الجامعية المتوسطة في المحاسبة بمرتبة الشرف، ودبلوم في علوم الحاسب تخصص تقنية البرمجة.",
  },
  {
    id: "ham",
    name: "Fahad AlAnazi",
    nameAr: "فهد العنزي",
    role: "Head of Asset Management",
    roleAr: "رئيس إدارة الأصول",
    photo: "",
    gender: "male",
    initials: "FA",
    bio: "More than 19 years of leadership experience in asset management, multi-asset investing, and investment product development. Previously served as Head of Asset Management at Yaqeen Capital and GFH Capital – Saudi Arabia. Held leadership positions at Albilad Capital, including Head of Asset Management and Head of Capital Markets. Has specialized experience in fixed income instruments and money markets through his work at Capital Investments. Holds a Bachelor’s degree from King Fahd University of Petroleum and Minerals, is a CFA Charterholder, and completed executive education in value investing from Columbia Business School.",
    bioAr: "أكثر من 19 عاماً من الخبرة القيادية في إدارة الأصول، والاستثمار متعدد الأصول، وتطوير المنتجات الاستثمارية. شغل سابقاً منصب رئيس إدارة الأصول في يقين معيار المالية وGFH Capital – السعودية. تقلد مناصب قيادية في البلاد المالية، من بينها رئيس إدارة الأصول ورئيس أسواق المال. يمتلك خبرة متخصصة في أدوات الدخل الثابت وأسواق النقد من خلال عمله في الاستثمارات Capital. حاصل على بكالوريوس من جامعة الملك فهد للبترول والمعادن وحامل لشهادة CFA، وتعليم تنفيذي في الاستثمار القيمي من كلية كولومبيا للأعمال.",
  },
  {
    id: "compliance",
    name: "Raghad AlSunaid",
    nameAr: "رغد السنيد",
    role: "Compliance and AML Manager",
    roleAr: "مدير المطابقة والإلتزام ومكافحة غسل الأموال",
    photo: "",
    gender: "female",
    initials: "RS",
    bio: "Ms. Raghad AlSunaid serves as the Compliance, Anti-Money Laundering Manager at Miyar Capital. She has over five years of experience in the financial services and capital markets sector, with extensive knowledge of the regulatory framework and requirements of the Capital Market Authority (CMA). Prior to joining Miyar Capital, Ms. AlSunaid held compliance-related positions at BSF Capital and SICO Capital, where she gained valuable experience in regulatory compliance, anti-money laundering, and financial crime prevention. Ms. AlSunaid holds a Bachelor’s degree in International Relations from Sharjah University.",
    bioAr: "تشغل رغد السنيّد منصب مدير الالتزام ومكافحة غسل الأموال في شركة معيار المالية. وتمتلك خبرة تتجاوز خمس سنوات في القطاع المالي وأسواق المال، مع معرفة واسعة بالإطار التنظيمي ومتطلبات هيئة السوق المالية. وقبل انضمامها إلى شركة معيار المالية، شغلت الأستاذة رغد مناصب متخصصة في مجال الالتزام لدى شركتي السعودي الفرنسي كابيتال وسيكو كابيتال، حيث اكتسبت خبرة عملية في مجالات الالتزام التنظيمي ومكافحة غسل الأموال والوقاية من الجرائم المالية. وتحمل الأستاذة رغد السنيّد درجة البكالوريوس في العلاقات الدولية من جامعة الشارقة.",
  },
];

export function getExecutiveById(id: string): Person | undefined {
  return EXECUTIVE_TEAM.find((p) => p.id === id);
}

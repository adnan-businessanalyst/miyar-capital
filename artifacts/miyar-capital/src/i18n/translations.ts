export type Lang = "en" | "ar";

export type TranslationKey =
  | "reg"
  | "tb_login"
  | "tb_login_url"
  | "tb_signup"
  | "tb_signup_url"
  | "nav_about"
  | "nav_am"
  | "nav_ib"
  | "nav_insights"
  | "nav_ir"
  | "am_h"
  | "fp_wwd_tag"
  | "fp_wwd_h"
  | "fp_wwd_lead"
  | "fp_wwd_btn1"
  | "fp_wwd_btn1_url"
  | "fp_wwd_btn2"
  | "fp_wwd_btn2_url"
  | "fp_wwd_p1_n"
  | "fp_wwd_p1_l"
  | "fp_wwd_p2_n"
  | "fp_wwd_p2_l"
  | "fp_wwd_p3_n"
  | "fp_wwd_p3_l"
  | "fp_prin_left_a"
  | "fp_prin_left_hl"
  | "fp_prin_left_b"
  | "fp_prin_r1_lead"
  | "fp_prin_r1_body"
  | "fp_prin_r2_lead"
  | "fp_prin_r2_body"
  | "fp_prin_r3_lead"
  | "fp_prin_r3_body"
  | "fp_services_tag"
  | "fp_services_h"
  | "fp_svc_ib"
  | "fp_svc_ib_p"
  | "fp_svc_ib_link"
  | "fp_svc_am"
  | "fp_svc_am_p"
  | "fp_svc_am_link"
  | "fp_svc_ib_url"
  | "fp_svc_am_url"
  | "fp_why_tag"
  | "fp_why_h"
  | "fp_why_p"
  | "fp_why2_h"
  | "fp_why2_p"
  | "fp_why3_h"
  | "fp_why3_p"
  | "fp_why4_h"
  | "fp_why4_p"
  | "fp_why5_h"
  | "fp_why5_p"
  | "fp_contact_tag"
  | "fp_contact_h"
  | "fp_contact_name"
  | "fp_contact_email"
  | "fp_contact_phone"
  | "fp_contact_subject"
  | "fp_contact_opt1"
  | "fp_contact_opt2"
  | "fp_contact_opt3"
  | "fp_contact_msg"
  | "fp_contact_send"
  | "fp_contact_form_action"
  | "fp_app_h"
  | "fp_app_p"
  | "fp_app_phone_img"
  | "fp_app_google_url"
  | "fp_app_store_url"
  | "fp_img_svc_ib"
  | "fp_img_svc_am"
  | "fp_img_contact"
  | "fp_img_why1"
  | "fp_img_why2"
  | "fp_img_why3"
  | "fp_img_why4"
  | "fp_img_why5";

export const EN: Record<TranslationKey, string> = {
  reg: "CMA License No. 21216-32 · CR 1010698788 · Riyadh, KSA",
  tb_login: "Login",
  tb_login_url: "",
  tb_signup: "New User",
  tb_signup_url: "",
  nav_about: "About",
  nav_am: "Asset Management",
  nav_ib: "Investment Banking",
  nav_insights: "Insights",
  nav_ir: "Investor Relations",
  am_h: "Asset management organised around investor objectives — across four pillars.",
  fp_wwd_tag: "INDEPENDENT · SAUDI · CMA-REGULATED",
  fp_wwd_h: "Principal-minded investing, built on conviction — not product shelves.",
  fp_wwd_lead: "Miyar Capital is an independent Saudi investment firm managing capital across four integrated disciplines, and advising companies and shareholders on the transactions that define their future.",
  fp_wwd_btn1: "Explore Asset Management",
  fp_wwd_btn1_url: "/asset-management",
  fp_wwd_btn2: "Investment Banking",
  fp_wwd_btn2_url: "/investment-banking",
  fp_wwd_p1_n: "4",
  fp_wwd_p1_l: "Investment Pillars",
  fp_wwd_p2_n: "Multi-bn",
  fp_wwd_p2_l: "SAR Under Management",
  fp_wwd_p3_n: "Est. 2021",
  fp_wwd_p3_l: "Riyadh, Saudi Arabia",
  fp_prin_left_a: "We act as ",
  fp_prin_left_hl: "principals",
  fp_prin_left_b: ", not distributors. We launch only what we would invest in ourselves.",
  fp_prin_r1_lead: "Independence is structural, not stylistic.",
  fp_prin_r1_body: " As a non-bank-affiliated manager, Miyar carries no captive distribution agenda and no pressure to push affiliated product. Allocation decisions answer to client objectives alone.",
  fp_prin_r2_lead: "Conviction over shelf-space.",
  fp_prin_r2_body: " We build a deliberately small number of strategies we are willing to underwrite with our own credibility — diversified across four pillars, governed by an independent second line, and reported transparently.",
  fp_prin_r3_lead: "Alignment first.",
  fp_prin_r3_body: " Unit-holder outcomes precede the firm's. Our economics are designed to reward performance and continuity, not asset-gathering for its own sake.",
  fp_services_tag: "WHAT WE DO",
  fp_services_h: "Two businesses. One standard of conviction.",
  fp_svc_ib: "Investment Banking",
  fp_svc_ib_p: "Advisory and capital markets expertise for companies and shareholders shaping their next chapter.",
  fp_svc_ib_link: "Explore Investment Banking",
  fp_svc_ib_url: "/investment-banking",
  fp_svc_am: "Asset Management",
  fp_svc_am_p: "Principal-minded investing across four integrated pillars, built around long-term conviction.",
  fp_svc_am_link: "Explore Asset Management",
  fp_svc_am_url: "/asset-management",
  fp_why_tag: "Why Miyar Capital",
  fp_why_h: "Understanding Goals",
  fp_why_p: "Miyar Capital employees are keen to understand your investment goals, because we consider them the foundation of this relationship.",
  fp_why2_h: "Tailored Strategies",
  fp_why2_p: "We build investment strategies around your unique profile, risk appetite and objectives — not the other way around.",
  fp_why3_h: "Independent Thinking",
  fp_why3_p: "As a CMA-regulated independent firm, our advice is shaped solely by your interests, free from institutional conflicts.",
  fp_why4_h: "Long-Term Partnership",
  fp_why4_p: "We commit to a sustained relationship, providing continuous guidance as your financial circumstances and goals evolve.",
  fp_why5_h: "Transparent Reporting",
  fp_why5_p: "We deliver clear, timely reporting on performance, portfolio composition and market context, keeping you fully informed at every stage.",
  fp_contact_tag: "Get In Touch",
  fp_contact_h: "Contact Us",
  fp_contact_name: "Name",
  fp_contact_email: "Email",
  fp_contact_phone: "Phone",
  fp_contact_subject: "Select Subject",
  fp_contact_opt1: "General Inquiry",
  fp_contact_opt2: "Complaint",
  fp_contact_opt3: "Info",
  fp_contact_msg: "Write your message",
  fp_contact_send: "Send Message",
  fp_contact_form_action: "",
  fp_app_h: "Get Miyar App",
  fp_app_p: "Manage your investments, track performance, and access reports — anywhere, anytime, from the palm of your hand.",
  fp_app_phone_img: "",
  fp_app_google_url: "",
  fp_app_store_url: "",
  fp_img_svc_ib: "",
  fp_img_svc_am: "",
  fp_img_contact: "",
  fp_img_why1: "",
  fp_img_why2: "",
  fp_img_why3: "",
  fp_img_why4: "",
  fp_img_why5: "",
};

export const AR: Record<TranslationKey, string> = {
  reg: "ترخيص هيئة السوق المالية رقم 21216-32 · سجل تجاري 1010698788 · الرياض",
  tb_login: "تسجيل الدخول",
  tb_login_url: "",
  tb_signup: "مستخدم جديد",
  tb_signup_url: "",
  nav_about: "عن معيار",
  nav_am: "إدارة الأصول",
  nav_ib: "المصرفية الاستثمارية",
  nav_insights: "رؤى",
  nav_ir: "علاقات المستثمرين",
  am_h: "إدارة أصول منظّمة حول أهداف المستثمر — عبر أربع ركائز.",
  fp_wwd_tag: "مستقلة · سعودية · مرخصة من هيئة السوق المالية",
  fp_wwd_h: "استثمار قائم على المبادئ، مبني على القناعة — لا على رفوف المنتجات.",
  fp_wwd_lead: "معيار المالية شركة استثمارية سعودية مستقلة تدير رؤوس الأموال عبر أربعة مجالات متكاملة، وتقدم المشورة للشركات والمساهمين في الصفقات التي ترسم مستقبلهم.",
  fp_wwd_btn1: "استكشف إدارة الأصول",
  fp_wwd_btn1_url: "/asset-management",
  fp_wwd_btn2: "الخدمات المصرفية الاستثمارية",
  fp_wwd_btn2_url: "/investment-banking",
  fp_wwd_p1_n: "4",
  fp_wwd_p1_l: "ركائز استثمارية",
  fp_wwd_p2_n: "مليارات",
  fp_wwd_p2_l: "ريال سعودي تحت الإدارة",
  fp_wwd_p3_n: "تأسست 2021",
  fp_wwd_p3_l: "الرياض، المملكة العربية السعودية",
  fp_prin_left_a: "نعمل كـ",
  fp_prin_left_hl: "أصلاء",
  fp_prin_left_b: "، لا كموزعين. نطلق فقط ما نستثمر فيه بأنفسنا.",
  fp_prin_r1_lead: "الاستقلال هيكلي، لا شكلي.",
  fp_prin_r1_body: " بصفتنا مديراً غير تابع لبنك، لا تحمل معيار أجندة توزيع أسيرة ولا ضغطاً لدفع منتجات مرتبطة. قرارات التخصيص تجيب على أهداف العميل وحدها.",
  fp_prin_r2_lead: "القناعة فوق رفوف المنتجات.",
  fp_prin_r2_body: " نبني عدداً محدوداً عمداً من الاستراتيجيات التي نقبل أن نضمنها بمصداقيتنا — متنوعة عبر أربع ركائز، ومحكومة بخط دفاع ثانٍ مستقل، ومُبلَّغ عنها بشفافية.",
  fp_prin_r3_lead: "المواءمة أولاً.",
  fp_prin_r3_body: " نتائج مالكي الوحدات تسبق مصلحة الشركة. صُمّم اقتصادنا لمكافأة الأداء والاستمرارية، لا لجمع الأصول لذاته.",
  fp_services_tag: "خدماتنا",
  fp_services_h: "ما نقدّمه",
  fp_svc_ib: "المصرفية الاستثمارية",
  fp_svc_ib_p: "خبرة استشارية وأسواق رأس المال للشركات والمساهمين في رسم فصلهم القادم.",
  fp_svc_ib_link: "استكشف المصرفية الاستثمارية",
  fp_svc_ib_url: "/investment-banking",
  fp_svc_am: "إدارة الأصول",
  fp_svc_am_p: "استثمار قائم على القناعة عبر أربع ركائز متكاملة، مبني حول رؤية طويلة الأمد.",
  fp_svc_am_link: "استكشف إدارة الأصول",
  fp_svc_am_url: "/asset-management",
  fp_why_tag: "لماذا معيار المالية",
  fp_why_h: "فهم الأهداف",
  fp_why_p: "يحرص موظفو معيار المالية على فهم أهدافك الاستثمارية، لأننا نعتبرها أساس هذه العلاقة.",
  fp_why2_h: "استراتيجيات مخصصة",
  fp_why2_p: "نبني استراتيجيات استثمارية تناسب ملفك الشخصي ومستوى المخاطرة وأهدافك بشكل فريد.",
  fp_why3_h: "رأي مستقل",
  fp_why3_p: "بصفتنا شركة مستقلة خاضعة لإشراف هيئة السوق المالية، تتشكل نصائحنا وفق مصالحك بعيداً عن أي تضارب مؤسسي.",
  fp_why4_h: "شراكة طويلة الأمد",
  fp_why4_p: "نلتزم بعلاقة مستدامة نقدم فيها إرشادات مستمرة مع تطور ظروفك المالية وأهدافك.",
  fp_why5_h: "تقارير شفافة",
  fp_why5_p: "نقدم تقارير واضحة وفي الوقت المناسب حول الأداء وتكوين المحفظة والسياق السوقي، لنبقيك على اطلاع كامل في كل مرحلة.",
  fp_contact_tag: "تواصل معنا",
  fp_contact_h: "اتصل بنا",
  fp_contact_name: "الاسم",
  fp_contact_email: "البريد الإلكتروني",
  fp_contact_phone: "الهاتف",
  fp_contact_subject: "اختر الموضوع",
  fp_contact_opt1: "استفسار عام",
  fp_contact_opt2: "شكوى",
  fp_contact_opt3: "معلومات",
  fp_contact_msg: "اكتب رسالتك",
  fp_contact_send: "إرسال الرسالة",
  fp_contact_form_action: "",
  fp_app_h: "حمّل تطبيق معيار",
  fp_app_p: "أدر استثماراتك، وتابع الأداء، واطّلع على التقارير — في أي وقت ومن أي مكان، من راحة يدك.",
  fp_app_phone_img: "",
  fp_app_google_url: "",
  fp_app_store_url: "",
  fp_img_svc_ib: "",
  fp_img_svc_am: "",
  fp_img_contact: "",
  fp_img_why1: "",
  fp_img_why2: "",
  fp_img_why3: "",
  fp_img_why4: "",
  fp_img_why5: "",
};

export const DICTS: Record<Lang, Record<TranslationKey, string>> = {
  en: EN,
  ar: AR,
};

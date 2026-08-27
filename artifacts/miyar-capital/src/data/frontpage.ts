import type { Lang } from "../site/types";

export type { Lang };

/**
 * Front-page (and a few shared chrome) EN/AR strings.
 * Looked up via `t(key)` from LanguageContext.
 */
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
  | "fp_wwd_link"
  | "fp_wwd_link_url"
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
  | "fp_prin_pillars"
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
  | "fp_jobs_modal_title"
  | "fp_jobs_modal_lead"
  | "fp_jobs_modal_close"
  | "fp_jobs_label_email"
  | "fp_jobs_label_subject"
  | "fp_jobs_label_body"
  | "fp_jobs_copy"
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
  tb_login_url: "https://miyarcapital.com.sa/ar/login",
  tb_signup: "New User",
  tb_signup_url: "https://miyarcapital.com.sa/ar/register",
  nav_about: "About",
  nav_am: "Asset Management",
  nav_ib: "Investment Banking",
  nav_insights: "Insights",
  nav_ir: "Investor Relations",
  am_h: "Asset management organised around investor objectives — across four pillars.",
  fp_wwd_tag: "INDEPENDENT · SAUDI · CMA-REGULATED",
  fp_wwd_h: "Principal-minded investing, built on conviction — not product shelves.",
  fp_wwd_lead: "Miyar Capital is an independent Saudi investment firm managing capital across four integrated disciplines, and advising companies and shareholders on the transactions that define their future. We specialise in securities business — including arranging, advising, and managing investments and funds — with a mission to deliver long-term value for our clients and partners.",
  fp_wwd_link: "Who We Are",
  fp_wwd_link_url: "/who-we-are",
  fp_wwd_p1_n: "Investment Pillars",
  fp_wwd_p1_l: "4",
  fp_wwd_p2_n: "Multi-bn \u20C1",
  fp_wwd_p2_l: "Under Management",
  fp_wwd_p3_n: "Est. 2021",
  fp_wwd_p3_l: "Riyadh, Saudi Arabia",
  fp_prin_left_a: "We invest with conviction and build solutions we believe in for the long term.",
  fp_prin_left_hl: "",
  fp_prin_left_b: "",
  fp_prin_r1_lead: "Independence is structural, not stylistic.",
  fp_prin_r1_body: " As a non-bank-affiliated manager, Miyar carries no captive distribution agenda and no pressure to push affiliated product. Allocation decisions answer to client objectives alone.",
  fp_prin_r2_lead: "Conviction over shelf-space.",
  fp_prin_r2_body: " We build a deliberately small number of strategies we are willing to underwrite with our own credibility — diversified across four pillars, governed by an independent second line, and reported transparently.",
  fp_prin_r3_lead: "Alignment first.",
  fp_prin_r3_body: " Unit-holder outcomes precede the firm's. Our economics are designed to reward performance and continuity, not asset-gathering for its own sake.",
  fp_prin_pillars: "Our Pillars",
  fp_services_tag: "WHAT WE DO",
  fp_services_h: "Two businesses. One standard of conviction.",
  fp_svc_ib: "Investment Banking",
  fp_svc_ib_p: "Advisory and arrangement for companies, shareholders, and sponsors — capital markets, M&A, debt and financing arrangement, valuation, and strategic transactions.",
  fp_svc_ib_link: "Explore Investment Banking",
  fp_svc_ib_url: "/investment-banking",
  fp_svc_am: "Asset Management",
  fp_svc_am_p: "Funds and discretionary mandates across Liquidity & FI Solutions, Equity Management, Real Assets, and Private Markets — for individuals, family offices, and institutions.",
  fp_svc_am_link: "Explore Asset Management",
  fp_svc_am_url: "/asset-management",
  fp_why_tag: "Why Miyar Capital",
  fp_why_h: "Your Trust Motivates Us",
  fp_why_p: "We believe that what motivates us is to achieve the highest return on investment, as our profitability principle is only achieved when you profit.",
  fp_why2_h: "Participation",
  fp_why2_p: "Our vision will only be achieved through the participation of our clients and we always remember that, so our commitment to providing the best service is our passion.",
  fp_why3_h: "Safe Return",
  fp_why3_p: "Safe return on investment matters to us more than the return on investment itself.",
  fp_why4_h: "Understanding Goals",
  fp_why4_p: "Miyar Capital employees are keen to clearly understand your investment goals because you are the foundation of this relationship.",
  fp_why5_h: "Performance",
  fp_why5_p: "Performance is the first and most important standard that we are committed to providing.",
  fp_contact_tag: "Get In Touch",
  fp_contact_h: "Contact Us",
  fp_contact_name: "Name",
  fp_contact_email: "Email",
  fp_contact_phone: "Phone",
  fp_contact_subject: "Select Subject",
  fp_contact_opt1: "Inquiry",
  fp_contact_opt2: "Complaint",
  fp_contact_opt3: "Info",
  fp_contact_msg: "Write your message",
  fp_contact_send: "Send Message",
  fp_contact_form_action: "",
  fp_jobs_modal_title: "Send your application by email",
  fp_jobs_modal_lead:
    "Your browser could not open an email app. Copy the details below into your email client.",
  fp_jobs_modal_close: "Close",
  fp_jobs_label_email: "To",
  fp_jobs_label_subject: "Subject",
  fp_jobs_label_body: "Body",
  fp_jobs_copy: "Copy",
  fp_app_h: "Get Miyar App",
  fp_app_p: "Manage your investments, track performance, and access reports — anywhere, anytime, from the palm of your hand.",
  fp_app_phone_img: "",
  fp_app_google_url: "https://play.google.com/store/apps/details?id=com.miyarcapital.app",
  fp_app_store_url: "https://apps.apple.com/us/app/miyar-capital/id6743315158",
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
  fp_wwd_tag: "شركة سعودية مستقلة و مرخصة من هيئة السوق المالية",
  fp_wwd_h: "استثمارٌ بصفة الأصيل، مبنيٌّ على الاقتناع — لا مجرد على كثرة المنتجات.",
  fp_wwd_lead: "معيار المالية شركة استثمارية سعودية مستقلة، تُدير رؤوس الأموال عبر أربع ركائز متكاملة، وتقدّم المشورة للشركات والمساهمين في الصفقات التي تُشكّل مستقبلهم. نتخصص في أعمال الأوراق المالية — بما في ذلك الترتيب وتقديم المشورة وإدارة الاستثمارات والصناديق — برسالةٍ قوامها تحقيق قيمةٍ مستدامة لعملائنا وشركائنا.",
  fp_wwd_link: "من نحن",
  fp_wwd_link_url: "/who-we-are",
  fp_wwd_p1_n: "ركائز استثمارية",
  fp_wwd_p1_l: "أربعة",
  fp_wwd_p2_n: "مليارات",
  fp_wwd_p2_l: " \u20C1 تحت الإدارة",
  fp_wwd_p3_n: "تأسست 2021",
  fp_wwd_p3_l: "الرياض، المملكة العربية السعودية",
  fp_prin_left_a: "نستثمر بقناعة ونبني حلولًا نؤمن بقيمتها على المدى الطويل",
  fp_prin_left_hl: "",
  fp_prin_left_b: "",
  fp_prin_r1_lead: "استقلالية هيكلية، لا شكلية. ",
  fp_prin_r1_body: "بصفتنا مديراً غير تابعٍ لمجموعة مصرفية، لا تحمل معيار أجندة توزيعٍ أسيرة ولا ضغوطاً لترويج منتجات الأطراف ذات العلاقة. وقرارات توزيع الأصول لا تخضع إلا لأهداف العميل.",
  fp_prin_r2_lead: "قناعةٌ راسخة، لا كثرةُ منتجات. ",
  fp_prin_r2_body: "نبني عدداً محدوداً من الاستراتيجيات عن سابق قصدٍ وتصميم — استراتيجيات نضع مصداقيتنا ضماناً لها، مُنوّعة على أربع ركائز، وخاضعة لحوكمة وظائف رقابية مستقلة، ويُفصح عن نتائجها بشفافية.",
  fp_prin_r3_lead: "المواءمة أولاً. ",
  fp_prin_r3_body: "مصلحة مالكي الوحدات قبل مصلحتنا. حوافزنا مبنية على الأداء والاستمرارية،لا على مجرد زيادة المبيعات.",
  fp_prin_pillars: "ركائزنا",
  fp_services_tag: "خدماتنا",
  fp_services_h: "ما نقدّمه",
  fp_svc_ib: "مستشار الإستثمار",
  fp_svc_ib_p: "نقدم الاستشارة والترتيب في المصرفية الاستثمارية للشركات والمساهمين والرعاة الماليين: أسواق رأس المال، وصفقات الاندماج والاستحواذ، وترتيب التسهيلات المصرفية و ترتيب صفقات التمويل، والتقييم، والصفقات الاستراتيجية.",
  fp_svc_ib_link: "مستشار الإستثمار",
  fp_svc_ib_url: "/investment-banking",
  fp_svc_am: "إدارة الأصول",
  fp_svc_am_p: "نقدم صناديق إستثمارية وإدارة محافظ إستثمارية خاصة تشمل حلول السيولة والدخل الثابت، وإدارة أسهم الملكية الخاصة، والأصول العقارية، والأسواق الخاصة — للأفراد والمكاتب العائلية والمؤسسات.",
  fp_svc_am_link: "استكشف إدارة الأصول",
  fp_svc_am_url: "/asset-management",
  fp_why_tag: "لماذا معيار المالية؟",
  fp_why_h: "ثقتك بنا حافز لنا",
  fp_why_p: "مؤمنين بان ما يحفزنا هو ان نحقق العائد الاعلى على الاستثمار ، حيث ان مبدء ربحيتنا لا يتحقق الا في حال ربحك.",
  fp_why2_h: "المشاركة",
  fp_why2_p: "رؤيتنا لن تتحقق الا بمشاركة عملائنا ونحن نتذكر ذلك دائما , لذلك حرصنا على تقديم افضل خدمة هو شغفنا.",
  fp_why3_h: "عودة آمنة",
  fp_why3_p: "عودة الاستثمار بشكل أمن يهمنا اكثر من العائد على الاستثمار.",
  fp_why4_h: "فهم الأهداف",
  fp_why4_p: "يحرص موظفين معيار المالية على فهم اهدافك الاستثمارية بشكل واضح لانك عمود الاساس لهذه العلاقة.",
  fp_why5_h: "الأداء",
  fp_why5_p: "الاداء هو المعيار الاول والاهم الذي نحرص على تقديمه.",
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
  fp_jobs_modal_title: "أرسل طلبك عبر البريد الإلكتروني",
  fp_jobs_modal_lead:
    "تعذّر على المتصفح فتح تطبيق البريد. انسخ التفاصيل أدناه إلى برنامج البريد لديك.",
  fp_jobs_modal_close: "إغلاق",
  fp_jobs_label_email: "إلى",
  fp_jobs_label_subject: "الموضوع",
  fp_jobs_label_body: "نص الرسالة",
  fp_jobs_copy: "نسخ",
  fp_app_h: "حمّل تطبيق معيار",
  fp_app_p: "أدِر استثماراتك، وتابع أداءها، واطّلع على تقاريرك — أينما كنت، ومتى شئت، بين يديك.",
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

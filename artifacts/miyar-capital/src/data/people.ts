import { BOARD_MEMBER_PHOTOS } from "../site/memberImages";
import { EXECUTIVE_PHOTOS } from "../site/executiveImages";

export interface Person {
  name: string;
  role: string;
  photo: string;
  initials?: string;
  /** Short quote/bio — shown on person-card hover when present. */
  bio?: string;
}

/**
 * Board of Directors — LTR display order = member-1 … member-7 photos.
 * Drop portraits into public/media/members/ as member-1.webp (or .jpg/.png/…).
 */
export const BOARD_MEMBERS: Person[] = [
  {
    name: "Mr. Muhammad ibn Abdul Mohsen al-Zakri",
    role: "Chairman of the Board & Co-Founder",
    photo: BOARD_MEMBER_PHOTOS[0],
    initials: "MZ",
    bio: "CEO of Al-Zakri Holding Company, Mr. Mohammed served as a member of the Board of Directors of Al-Andalus Real Estate Company and a member of the Executive Committee. He holds a master's degree in management from the University of La Verne in the United States of America and a bachelor's degree in financial management from Prince Sultan University.",
  },
  {
    name: "Ziad ibn Abdul Mohsen al-Zakri",
    role: "Vice Chairman of the Board of Directors",
    photo: BOARD_MEMBER_PHOTOS[1],
    initials: "ZZ",
    bio: "CEO of Azm Investment Company since 2019. He has experience in asset management, investment operations, and equity valuation. He previously served as an investment manager at Al-Zakri Holding Company and serves on the boards of several companies and startups in the technology, healthcare, and event management sectors. He holds a Bachelor's degree in Business Administration, majoring in Finance, from Alfaisal University, with distinguished experience in structuring and executing investment deals and financial analysis.",
  },
  {
    name: "Mr. Ghassan bin Abdulrahman Al-Thukair",
    role: "CEO and Managing Director",
    photo: BOARD_MEMBER_PHOTOS[2],
    initials: "GT",
    bio: "He served as CEO of Dar Al Tamweel and Investment Financial Company, senior fund manager at Al Rajhi Capital, Director of the Saudi Equity Fund, Director of private investment portfolios for VIP clients, acting head of asset management with the position of Director of the Alinma Fund at Alinma Investment Company, and senior financial analyst and Head of the asset management research team, covering the banking and petrochemical sectors at Al Bilad Capital Company. He holds a bachelor’s degree in industrial management from King Fahd University of Petroleum and Minerals in Saudi Arabia in 2007.",
  },
  {
    name: "Mr. Mishari Muslim Al-Shaman",
    role: "Independent Board Member",
    photo: BOARD_MEMBER_PHOTOS[3],
    initials: "MS",
    bio: "Chief Investment Officer of Maysan Business Investment Company. He has served on the boards of directors and committees of several companies, including Sehati Information Technology Services Company and Muscat Capital.",
  },
  {
    name: "Mr. Majid bin Suleiman Al-Saleem",
    role: "Independent Board Member",
    photo: BOARD_MEMBER_PHOTOS[4],
    initials: "MS",
    bio: "Chief Investment Officer of Maysan Business Investment Company. He has served on the boards of directors and committees of several companies, including Sehati Information Technology Services Company and Muscat Capital.",
  },
  {
    name: "Mr. Ayman Mansour Al-Aidan",
    role: "Independent Board Member",
    photo: BOARD_MEMBER_PHOTOS[5],
    initials: "AA",
    bio: "He heads the position of Financial Investment Manager at Badel Al Khair Trading and Real Estate Establishment, and has over 10 years of experience in financial investment management and business development. He previously served as Acting CEO and Head of Brokerage at Emirates NBD Securities, in addition to leadership positions at Bank Al Bilad and Fransi Finance. He holds a Bachelor's degree in Applied Medical Sciences from King Saud University, along with several specialized certificates in financial management and investment planning.",
  },
  // {
  //   name: "Mr. Hassan ibn Ibrahim al-Shehri",
  //   role: "Board Member",
  //   photo: BOARD_MEMBER_PHOTOS[6],
  //   initials: "HS",
  //   bio: "Long-term value is built when risk, compliance, and opportunity are weighed together — never in isolation from the trust our stakeholders place in us.",
  // },
];

/**
 * Executive Team — LTR display order = exec-1 … exec-7 photos.
 * Drop portraits into public/media/executives/ as exec-1.webp (or .jpg/.png/…).
 */
export const EXECUTIVE_TEAM: Person[] = [
  {
    name: "Mr. Ghassan bin Abdulrahman Al-Thukair",
    role: "CEO and Managing Director",
    photo: EXECUTIVE_PHOTOS[0],
    initials: "GT",
    bio: "He served as CEO of Dar Al Tamweel and Investment Financial Company, senior fund manager at Al Rajhi Capital, Director of the Saudi Equity Fund, Director of private investment portfolios for VIP clients, acting head of asset management with the position of Director of the Alinma Fund at Alinma Investment Company, and senior financial analyst and Head of the asset management research team, covering the banking and petrochemical sectors at Al Bilad Capital Company. He holds a bachelor’s degree in industrial management from King Fahd University of Petroleum and Minerals in Saudi Arabia in 2007.",
  },
  {
    name: "Raed Abu Moati",
    role: "Executive Vice President of Business Development and Co-Head of Asset Management",
    photo: EXECUTIVE_PHOTOS[1],
    initials: "RM",
    bio: "He holds a bachelor's degree in financial management from King Saud University. He also holds a certificate in securities trading, an international certificate in wealth and investment management, and several courses in fund and portfolio management. He has over 16 years of experience in asset management and investment services, having served as head of money markets at Albilad Capital. Prior to joining Mi'yar Finance, he was head of money markets at SICO Capital and, prior to that, head of money markets at Itqan Capital.",
  },
  {
    name: "Wael Abulfotouh",
    role: "Chief Financial Officer",
    photo: EXECUTIVE_PHOTOS[2],
    initials: "WA",
    bio: "He has over 25 years of professional experience spanning various sectors and management levels. His practical experience has spanned multiple sectors, including financial companies licensed by the Saudi Capital Market Authority, as well as aviation, contracting, manufacturing, and agricultural land reclamation. Mr. Wael Abou El Fotouh holds a Bachelor's degree in Accounting and Auditing from Cairo University and is registered with the Saudi Capital Market Authority. He also holds the General Equity Qualification (CME1) from the CISI and is currently completing the Corporate Finance (CME5) certification from the same institute, in addition to the Financial Modeling and Valuation Analyst (FMVA) certification from the Corporate Finance Institute of Canada (CFI). He has over 25 years of professional experience spanning various sectors and management levels.",
  },
  {
    name: "Mohammed alhunaidi",
    role: "Head of Wealth Management",
    photo: EXECUTIVE_PHOTOS[3],
    initials: "MH",
    bio: "Mohammed Al-Hunaidi holds the position of Head of Wealth Management at Miyar Capital Company and has over 23 years of experience in the Saudi financial sector, including wealth management, brokerage services in both the Saudi and American markets, and business development and investment services. Mohammed leads the wealth management operations at Miyar Capital, which includes developing management strategies, attracting high-net-worth and institutional clients, growing managed assets, developing investment solutions, and supporting capital raising efforts and marketing investment opportunities. He previously held several leadership positions at the Middle East Investment Company, Yaqeen Capital, Sequoia Capital, and Derayah Capital, in addition to his banking experience at SABB Bank and the Arab National Bank. During his career, he contributed to attracting assets worth over one billion riyals, led specialized teams, participated in the development and launch of investment platforms, products, and services, and was involved in the corporate culture team at Derayah Capital. He holds the General Securities Qualification Certificate (CME-1) and completed the Future Financial Leaders Program (FFLP) offered by the Financial Academy, in addition to several professional certifications and programs in sales management, leadership, and derivatives markets.",
  },
  {
    name: "Ibrahim Bawazeer",
    role: "Senior Investment Banking Analyst",
    photo: EXECUTIVE_PHOTOS[4],
    initials: "IB",
    bio: "Has experience in initial public offerings (IPOs) in the parallel market, strategic studies, and financial evaluation. He served as a fund operations officer at the National Commercial Bank (NCB) Capital. He served as a financial analyst at Yaqeen Financial Company in the Investment Banking Group. He currently holds the position of Senior Financial Analyst in Investment Banking. He holds a bachelor's degree in financial management from King Saud University in Saudi Arabia. He holds the General Certificate in Securities Dealing (CME1), the International Certificate in Wealth and Investment Management (ICWIM), the Technical Foundations of Corporate Finance (CME5), and numerous other finance courses.",
  },
  {
    name: "Fahad AlAli",
    role: "Head of Operations ",
    photo: EXECUTIVE_PHOTOS[5],
    initials: "FA",
    bio: "Mr. Fahad Al-Ali brings over 22 years of experience in investment operations, having held several key positions throughout his professional career. He most recently served as Trads and Settlement Operations Manager for investment funds and private portfolios at Al Ahli Capital, where he contributed to developing the plans and strategies that enhanced the company's settlement operations workflow. He previously held the position of Operations Department Manager at Rasanah Capital, SICO Capital, and Emirates NBD Capital. Additionally, during his 10 years at Albilad Capital, he held several positions, most notably Head of Equity Operations and Head of Funds and Private Portfolios Operations. Mr. Fahad holds an Intermediate University Diploma in Accounting with honors, and a Diploma in Computer Science specializing in Programming Technology.",
  },
  {
    name: "Fahad AlAnazi",
    role: "Head of Asst Management",
    photo: EXECUTIVE_PHOTOS[6],
    initials: "FA",
    bio: "More than 19 years of leadership experience in asset management, multi-asset investing, and investment product development. Previously served as Head of Asset Management at Yaqeen Capital and GFH Capital – Saudi Arabia. Held leadership positions at Albilad Capital, including Head of Asset Management and Head of Capital Markets. Has specialized experience in fixed income instruments and money markets through his work at Capital Investments. Holds a Bachelor’s degree from King Fahd University of Petroleum and Minerals, is a CFA Charterholder, and completed executive education in value investing from Columbia Business School.",
  },
  {
    name: "Raghad AlSunaid",
    role: "Compliance and AML Manager",
    photo: EXECUTIVE_PHOTOS[6],
    initials: "RS",
    bio: "Ms. Raghad AlSunaid serves as the Compliance, Anti-Money Laundering Manager at Miyar Capital. She has over five years of experience in the financial services and capital markets sector, with extensive knowledge of the regulatory framework and requirements of the Capital Market Authority (CMA). Prior to joining Miyar Capital, Ms. AlSunaid held compliance-related positions at BSF Capital and SICO Capital, where she gained valuable experience in regulatory compliance, anti-money laundering, and financial crime prevention. Ms. AlSunaid holds a Bachelor’s degree in International Relations from Sharjah University.",
  },
];

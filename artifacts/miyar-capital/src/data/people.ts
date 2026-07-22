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
    bio: "Miyar was founded so that disciplined capital and Shariah principles could sit at the same table. Our duty is to set a clear standard — and hold ourselves to it. Every decision of this board should strengthen that standard for our clients, our partners, and the Kingdom’s capital markets.",
  },
  {
    name: "Mr. Khalid ibn Sultan al-Otaibi",
    role: "Vice Chairman of the Board",
    photo: BOARD_MEMBER_PHOTOS[1],
    initials: "KO",
    bio: "Good governance is not ceremony. It is the quiet discipline that protects clients, sharpens decisions, and keeps every mandate accountable over the long term.",
  },
  {
    name: "Mr. Faisal ibn Nasser al-Harbi",
    role: "Board Member & Co-Founder",
    photo: BOARD_MEMBER_PHOTOS[2],
    initials: "FH",
    bio: "We build products we would place our own capital in — screened, structured, and monitored with the same care we expect for every stakeholder we serve.",
  },
  {
    name: "Mr. Abdulaziz ibn Salem al-Qahtani",
    role: "Board Member",
    photo: BOARD_MEMBER_PHOTOS[3],
    initials: "AQ",
    bio: "Sustainable returns begin with sound process. Independent oversight and transparent reporting are how we earn trust in Saudi Arabia’s capital markets.",
  },
  {
    name: "Mr. Turki ibn Fahad al-Dosari",
    role: "Independent Board Member",
    photo: BOARD_MEMBER_PHOTOS[4],
    initials: "TD",
    bio: "Independence on this board means constructive challenge: testing assumptions, safeguarding clients, and ensuring decisions withstand scrutiny.",
  },
  {
    name: "Ms. Noura bint Saeed al-Mutairi",
    role: "Independent Board Member",
    photo: BOARD_MEMBER_PHOTOS[5],
    initials: "NM",
    bio: "Clients deserve a board that listens as carefully as it decides. Clarity, fairness, and Shariah integrity must shape every product we bring to market.",
  },
  {
    name: "Mr. Hassan ibn Ibrahim al-Shehri",
    role: "Board Member",
    photo: BOARD_MEMBER_PHOTOS[6],
    initials: "HS",
    bio: "Long-term value is built when risk, compliance, and opportunity are weighed together — never in isolation from the trust our stakeholders place in us.",
  },
];

/**
 * Executive Team — LTR display order = exec-1 … exec-7 photos.
 * Drop portraits into public/media/executives/ as exec-1.webp (or .jpg/.png/…).
 */
export const EXECUTIVE_TEAM: Person[] = [
  {
    name: "Mr. Muhammad ibn Abdul Mohsen al-Zakri",
    role: "Chief Executive Officer",
    photo: EXECUTIVE_PHOTOS[0],
    initials: "MZ",
    bio: "Our mandate is simple: deliver disciplined, Shariah-compliant investment outcomes with the same care we would apply to our own capital — and earn trust through every decision we make.",
  },
  {
    name: "Ms. Fatimah bint Nasser al-Harbi",
    role: "Chief Operating Officer",
    photo: EXECUTIVE_PHOTOS[1],
    initials: "FH",
    bio: "Operations are where strategy becomes reliable service. We align growth with compliance so every client experience reflects Miyar’s standard of integrity.",
  },
  {
    name: "Mr. Yousef ibn Ahmed al-Ghamdi",
    role: "Chief Investment Officer",
    photo: EXECUTIVE_PHOTOS[2],
    initials: "YG",
    bio: "We invest with conviction and patience — structuring Islamic portfolios that seek sustainable returns while remaining rooted in real economic activity.",
  },
  {
    name: "Mr. Saad ibn Ali al-Shammari",
    role: "Chief Financial Officer",
    photo: EXECUTIVE_PHOTOS[3],
    initials: "SS",
    bio: "Financial stewardship means clarity in every number. Capital, reporting, and planning must reinforce the confidence our clients and regulators place in us.",
  },
  {
    name: "Mr. Bandar ibn Abdullah al-Rashid",
    role: "Chief Risk Officer",
    photo: EXECUTIVE_PHOTOS[4],
    initials: "BR",
    bio: "Risk discipline protects the firm and its clients. Independent challenge across the three lines of defence is how we keep every mandate accountable.",
  },
  {
    name: "Mr. Omar ibn Khalid al-Zahrani",
    role: "General Counsel & Head of Compliance",
    photo: EXECUTIVE_PHOTOS[5],
    initials: "OZ",
    bio: "Legal and compliance are not hurdles — they are the framework that lets us innovate responsibly within Shariah and regulatory expectations.",
  },
  {
    name: "Ms. Layla bint Fahad al-Otaibi",
    role: "Head of Client Solutions",
    photo: EXECUTIVE_PHOTOS[6],
    initials: "LO",
    bio: "Every mandate begins with listening. We translate client objectives into solutions that are transparent, suitable, and built for the long term.",
  },
];

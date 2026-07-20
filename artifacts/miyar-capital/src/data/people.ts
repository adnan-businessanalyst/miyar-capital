import person1 from "@assets/generated_images/person_1.png";
import person2 from "@assets/generated_images/person_2.png";
import person3 from "@assets/generated_images/person_3.png";

export interface Person {
  name: string;
  role: string;
  photo: string;
  initials?: string;
  bio?: string;
}

export const BOARD_MEMBERS: Person[] = [
  {
    name: "Mr. Muhammad ibn Abdul Mohsen al-Zakri",
    role: "Chairman of the Board & Co-Founder",
    photo: person1,
  },
  {
    name: "Mr. Khalid ibn Sultan al-Otaibi",
    role: "Vice Chairman of the Board",
    photo: person3,
  },
  {
    name: "Mr. Faisal ibn Nasser al-Harbi",
    role: "Board Member & Co-Founder",
    photo: person2,
  },
  {
    name: "Mr. Abdulaziz ibn Salem al-Qahtani",
    role: "Board Member",
    photo: person1,
  },
  {
    name: "Mr. Turki ibn Fahad al-Dosari",
    role: "Independent Board Member",
    photo: person3,
  },
];

export const TEAM_MEMBERS: Person[] = [
  {
    name: "Mr. Muhammad ibn Abdul Mohsen al-Zakri",
    role: "Chief Executive Officer",
    photo: person1,
    initials: "MZ",
    bio: "Over 30 years of leadership in regional banking and capital markets, spanning corporate finance, risk oversight, and institutional strategy across the GCC.",
  },
  {
    name: "Ms. Fatimah bint Nasser al-Harbi",
    role: "Chief Operating Officer",
    photo: person2,
    initials: "FH",
    bio: "Former regulator and specialist in financial-sector operations, focused on aligning institutional growth with international compliance and governance standards.",
  },
  {
    name: "Mr. Yousef ibn Ahmed al-Ghamdi",
    role: "Chief Investment Officer",
    photo: person3,
    initials: "YG",
    bio: "Two decades of experience in Islamic investment structuring and asset management, leading the firm's portfolio strategy and product development.",
  },
  {
    name: "Mr. Saad ibn Ali al-Shammari",
    role: "Chief Financial Officer",
    photo: person1,
    initials: "SS",
    bio: "Chartered accountant with deep expertise in Islamic economics and financial planning, overseeing treasury, capital management, and financial reporting.",
  },
  {
    name: "Mr. Bandar ibn Abdullah al-Rashid",
    role: "Chief Risk Officer",
    photo: person2,
    initials: "BR",
    bio: "Former audit partner responsible for enterprise risk management and the integrity of the firm's three-lines-of-defence internal control framework.",
  },
  {
    name: "Mr. Omar ibn Khalid al-Zahrani",
    role: "General Counsel & Head of Compliance",
    photo: person3,
    initials: "OZ",
    bio: "Corporate lawyer with expertise in governance and regulatory affairs, leading the firm's legal, compliance, and Shariah-coordination functions.",
  },
];

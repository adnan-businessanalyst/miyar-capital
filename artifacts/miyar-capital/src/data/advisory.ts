import { IA_PROCESS_IMAGES } from "../site/contentImages";

export interface AdvisoryPillar {
  title: string;
  text: string;
  icon: "priority" | "trust" | "partnership";
}

export const ADVISORY_PILLARS: AdvisoryPillar[] = [
  {
    title: "Priority",
    text: "Unit-holders' profits and benefits come first, then our partners.",
    icon: "priority",
  },
  {
    title: "Trust",
    text: "We do not create any investment product except what we would be satisfied investing in.",
    icon: "trust",
  },
  {
    title: "Partnership",
    text: "Act like your partners, not like the traditional fund managers.",
    icon: "partnership",
  },
];

export interface AdvisoryStep {
  n: string;
  text: string;
  img: string;
  alt?: string;
}

export const ADVISORY_STEPS: AdvisoryStep[] = [
  {
    n: "01",
    text: "Meeting the client and determining their objectives, risk tolerance, and investment constraints.",
    img: IA_PROCESS_IMAGES[1],
    alt: "Investment advisory process step 1",
  },
  {
    n: "02",
    text: "Analyzing client assets, liabilities, and cash flows and determining investment objectives and strategy.",
    img: IA_PROCESS_IMAGES[2],
    alt: "Investment advisory process step 2",
  },
  {
    n: "03",
    text: "Determining and selecting the appropriate strategic asset allocation and ideal portfolio managers.",
    img: IA_PROCESS_IMAGES[3],
    alt: "Investment advisory process step 3",
  },
  {
    n: "04",
    text: "Implementation phase and beginning investment.",
    img: IA_PROCESS_IMAGES[4],
    alt: "Investment advisory process step 4",
  },
  {
    n: "05",
    text: "Monitoring, analysis, and evaluation phase of investment portfolio components and performance, and correction if necessary.",
    img: IA_PROCESS_IMAGES[5],
    alt: "Investment advisory process step 5",
  },
];

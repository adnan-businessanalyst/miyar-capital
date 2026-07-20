import { CONTENT_IMAGES } from "../site/contentImages";

const step1 = CONTENT_IMAGES.wm_long_term_partnership;
const step2 = CONTENT_IMAGES.wm_transparent_reporting;
const step3 = CONTENT_IMAGES.advisory_step3;
const step4 = CONTENT_IMAGES.advisory_step4;
const step5 = CONTENT_IMAGES.wm_transparent_reporting;

export interface AdvisoryPillar {
  title: string;
  text: string;
}

export const ADVISORY_PILLARS: AdvisoryPillar[] = [
  {
    title: "Priority",
    text: "Unit-holders' profits and benefits come first, then our partners.",
  },
  {
    title: "Trust",
    text: "We do not create any investment product except what we would be satisfied investing in.",
  },
  {
    title: "Partnership",
    text: "Act like your partners, not like the traditional fund managers.",
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
    img: step1,
    alt: "Long-Term Partnership",
  },
  {
    n: "02",
    text: "Analyzing client assets, liabilities, and cash flows and determining investment objectives and strategy.",
    img: step2,
    alt: "Transparent Reporting",
  },
  {
    n: "03",
    text: "Determining and selecting the appropriate strategic asset allocation and ideal portfolio managers.",
    img: step3,
  },
  {
    n: "04",
    text: "Implementation phase and beginning investment.",
    img: step4,
  },
  {
    n: "05",
    text: "Monitoring, analysis, and evaluation phase of investment portfolio components and performance, and correction if necessary.",
    img: step5,
    alt: "Transparent Reporting",
  },
];

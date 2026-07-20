import step1 from "@assets/generated_images/advisory_step1.png";
import step2 from "@assets/generated_images/advisory_step2.png";
import step3 from "@assets/generated_images/advisory_step3.png";
import step4 from "@assets/generated_images/advisory_step4.png";
import step5 from "@assets/generated_images/advisory_step5.png";

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
}

export const ADVISORY_STEPS: AdvisoryStep[] = [
  {
    n: "01",
    text: "Meeting the client and determining their objectives, risk tolerance, and investment constraints.",
    img: step1,
  },
  {
    n: "02",
    text: "Analyzing client assets, liabilities, and cash flows and determining investment objectives and strategy.",
    img: step2,
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
  },
];

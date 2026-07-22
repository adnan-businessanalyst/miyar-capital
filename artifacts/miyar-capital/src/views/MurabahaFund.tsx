"use client";

import { FundPage } from "../components/FundPage";
import { MURABAHA_FUND } from "../data/funds";

export function MurabahaFund() {
  return <FundPage fund={MURABAHA_FUND} />;
}

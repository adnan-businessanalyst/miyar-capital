"use client";

import { FundPage } from "../components/FundPage";
import { SAUDI_EQUITY_FUND } from "../data/funds";

export function SaudiEquityFund() {
  return <FundPage fund={SAUDI_EQUITY_FUND} sourcePage="/saudi-equity-fund" />;
}

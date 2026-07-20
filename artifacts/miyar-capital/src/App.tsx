import { useEffect } from "react";
import { Switch, Route, Router as WouterRouter, useLocation, Redirect } from "wouter";
import { LanguageProvider } from "./i18n/LanguageContext";
import { SITE_META } from "./site/defaults";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Disclaimer } from "./components/Disclaimer";
import { WhatsAppWidget } from "./components/WhatsAppWidget";
import { FrontPage } from "./pages/FrontPage";
import { WhoWeAre } from "./pages/WhoWeAre";
import { AboutUs } from "./pages/AboutUs";
import { BoardOfDirectors } from "./pages/BoardOfDirectors";
import { OurTeam } from "./pages/OurTeam";
import { AssetManagement } from "./pages/AssetManagement";
import { InvestmentBanking } from "./pages/InvestmentBanking";
import { ProductTemplate } from "./pages/ProductTemplate";
import { DPM } from "./pages/DPM";
import { PrivateMarketsPage } from "./pages/PrivateMarketsPage";
import { Rakiza } from "./pages/Rakiza";
import { FinancialReports } from "./pages/FinancialReports";
import { AnnualReports } from "./pages/AnnualReports";
import { InvestmentAdvisory } from "./pages/InvestmentAdvisory";
import { ArrangementManagement } from "./pages/ArrangementManagement";
import { InvestmentManagement } from "./pages/InvestmentManagement";
import { MurabahaFund } from "./pages/MurabahaFund";
import { SaudiEquityFund } from "./pages/SaudiEquityFund";
import { LiquidityFI } from "./pages/LiquidityFI";
import { EquityManagement } from "./pages/EquityManagement";
import { RealAssets } from "./pages/RealAssets";
import { InstitutionalFamilyOffice } from "./pages/InstitutionalFamilyOffice";
import { EquityManagementPage } from "./pages/EquityManagementPage";
import { RealAssetsPage } from "./pages/RealAssetsPage";
import { CapitalMarketsAdvisory } from "./pages/CapitalMarketsAdvisory";
import { MergersAcquisitions } from "./pages/MergersAcquisitions";
import { DebtFinancingArrangement } from "./pages/DebtFinancingArrangement";
import { ValuationFinancialAdvisory } from "./pages/ValuationFinancialAdvisory";
import { RealEstatePrivateArrangements } from "./pages/RealEstatePrivateArrangements";
import { IBRegisterInterest } from "./pages/IBRegisterInterest";
import { Insights } from "./pages/Insights";
import { GovernanceIndependence } from "./pages/GovernanceIndependence";
import { ShariahPrinciples } from "./pages/ShariahPrinciples";
import { Disclosures } from "./pages/Disclosures";
import { FATCA } from "./pages/FATCA";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";

function MetaInjector() {
  const { metaTitle, metaDescription, metaKeywords, metaFavicon } = SITE_META;
  useEffect(() => {
    if (metaTitle) document.title = metaTitle;
  }, [metaTitle]);
  useEffect(() => {
    let el = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!el) { el = document.createElement("meta"); el.name = "description"; document.head.appendChild(el); }
    if (metaDescription) el.content = metaDescription;
  }, [metaDescription]);
  useEffect(() => {
    let el = document.querySelector<HTMLMetaElement>('meta[name="keywords"]');
    if (!el) { el = document.createElement("meta"); el.name = "keywords"; document.head.appendChild(el); }
    if (metaKeywords) el.content = metaKeywords;
    else el.remove();
  }, [metaKeywords]);
  useEffect(() => {
    if (!metaFavicon) return;
    let el = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
    if (!el) { el = document.createElement("link"); el.rel = "icon"; document.head.appendChild(el); }
    el.href = metaFavicon;
  }, [metaFavicon]);
  return null;
}

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);
  return null;
}

function ConditionalDisclaimer() {
  const [location] = useLocation();
  if (location === "/") return null;
  return <Disclaimer />;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={FrontPage} />
      <Route path="/front-page">
        <Redirect to="/" />
      </Route>
      <Route path="/who-we-are" component={WhoWeAre} />
      <Route path="/about-us" component={AboutUs} />
      <Route path="/board-of-directors" component={BoardOfDirectors} />
      <Route path="/our-team" component={OurTeam} />
      <Route path="/governance-independence" component={GovernanceIndependence} />
      <Route path="/shariah-principles" component={ShariahPrinciples} />
      <Route path="/asset-management" component={AssetManagement} />
      <Route path="/investment-banking" component={InvestmentBanking} />
      <Route path="/product" component={ProductTemplate} />
      <Route path="/dpm" component={DPM} />
      <Route path="/private-markets" component={PrivateMarketsPage} />
      <Route path="/rakiza" component={Rakiza} />
      <Route path="/financial-reports" component={FinancialReports} />
      <Route path="/annual-reports" component={AnnualReports} />
      <Route path="/investment-advisory" component={InvestmentAdvisory} />
      <Route path="/arrangement-management" component={ArrangementManagement} />
      <Route path="/investment-management" component={InvestmentManagement} />
      <Route path="/murabaha-fund" component={MurabahaFund} />
      <Route path="/saudi-equity-fund" component={SaudiEquityFund} />
      <Route path="/asset-management/liquidity-fi" component={LiquidityFI} />
      <Route path="/equity-management" component={EquityManagementPage} />
      <Route path="/real-assets" component={RealAssetsPage} />
      <Route path="/asset-management/equity-management" component={EquityManagement} />
      <Route path="/asset-management/real-assets" component={RealAssets} />
      <Route path="/asset-management/institutional-family-office" component={InstitutionalFamilyOffice} />
      <Route path="/investment-banking/capital-markets-advisory" component={CapitalMarketsAdvisory} />
      <Route path="/investment-banking/mergers-acquisitions" component={MergersAcquisitions} />
      <Route path="/investment-banking/debt-financing-arrangement" component={DebtFinancingArrangement} />
      <Route path="/investment-banking/valuation-financial-advisory" component={ValuationFinancialAdvisory} />
      <Route path="/investment-banking/real-estate-private-arrangements" component={RealEstatePrivateArrangements} />
      <Route path="/investment-banking/register-interest" component={IBRegisterInterest} />
      <Route path="/insights" component={Insights} />
      <Route path="/disclosures" component={Disclosures} />
      <Route path="/fatca" component={FATCA} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route component={FrontPage} />
    </Switch>
  );
}

function App() {
  return (
    <LanguageProvider>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <MetaInjector />
        <ScrollToTop />
        <Header />
        <Router />
        <ConditionalDisclaimer />
        <Footer />
        <WhatsAppWidget />
      </WouterRouter>
    </LanguageProvider>
  );
}

export default App;

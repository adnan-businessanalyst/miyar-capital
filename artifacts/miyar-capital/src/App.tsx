import { useEffect } from "react";
import { Switch, Route, Router as WouterRouter, useLocation, Redirect } from "wouter";
import { LanguageProvider } from "./i18n/LanguageContext";
import { SITE_META } from "./site/defaults";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Disclaimer } from "./components/Disclaimer";
import { WhatsAppWidget } from "./components/WhatsAppWidget";
import { RouteLoadingProvider, lazyPage } from "./components/RouteLoading";

const FrontPage = lazyPage(() => import("./pages/FrontPage"), "FrontPage");
const WhoWeAre = lazyPage(() => import("./pages/WhoWeAre"), "WhoWeAre");
const AboutUs = lazyPage(() => import("./pages/AboutUs"), "AboutUs");
const BoardOfDirectors = lazyPage(() => import("./pages/BoardOfDirectors"), "BoardOfDirectors");
const OurTeam = lazyPage(() => import("./pages/OurTeam"), "OurTeam");
const AssetManagement = lazyPage(() => import("./pages/AssetManagement"), "AssetManagement");
const InvestmentBanking = lazyPage(() => import("./pages/InvestmentBanking"), "InvestmentBanking");
const ProductTemplate = lazyPage(() => import("./pages/ProductTemplate"), "ProductTemplate");
const DPM = lazyPage(() => import("./pages/DPM"), "DPM");
const PrivateMarketsPage = lazyPage(() => import("./pages/PrivateMarketsPage"), "PrivateMarketsPage");
const Rakiza = lazyPage(() => import("./pages/Rakiza"), "Rakiza");
const FinancialReports = lazyPage(() => import("./pages/FinancialReports"), "FinancialReports");
const AnnualReports = lazyPage(() => import("./pages/AnnualReports"), "AnnualReports");
const InvestmentAdvisory = lazyPage(() => import("./pages/InvestmentAdvisory"), "InvestmentAdvisory");
const ArrangementManagement = lazyPage(
  () => import("./pages/ArrangementManagement"),
  "ArrangementManagement",
);
const InvestmentManagement = lazyPage(
  () => import("./pages/InvestmentManagement"),
  "InvestmentManagement",
);
const MurabahaFund = lazyPage(() => import("./pages/MurabahaFund"), "MurabahaFund");
const SaudiEquityFund = lazyPage(() => import("./pages/SaudiEquityFund"), "SaudiEquityFund");
const LiquidityFI = lazyPage(() => import("./pages/LiquidityFI"), "LiquidityFI");
const EquityManagement = lazyPage(() => import("./pages/EquityManagement"), "EquityManagement");
const RealAssets = lazyPage(() => import("./pages/RealAssets"), "RealAssets");
const InstitutionalFamilyOffice = lazyPage(
  () => import("./pages/InstitutionalFamilyOffice"),
  "InstitutionalFamilyOffice",
);
const EquityManagementPage = lazyPage(
  () => import("./pages/EquityManagementPage"),
  "EquityManagementPage",
);
const RealAssetsPage = lazyPage(() => import("./pages/RealAssetsPage"), "RealAssetsPage");
const CapitalMarketsAdvisory = lazyPage(
  () => import("./pages/CapitalMarketsAdvisory"),
  "CapitalMarketsAdvisory",
);
const MergersAcquisitions = lazyPage(
  () => import("./pages/MergersAcquisitions"),
  "MergersAcquisitions",
);
const DebtFinancingArrangement = lazyPage(
  () => import("./pages/DebtFinancingArrangement"),
  "DebtFinancingArrangement",
);
const ValuationFinancialAdvisory = lazyPage(
  () => import("./pages/ValuationFinancialAdvisory"),
  "ValuationFinancialAdvisory",
);
const RealEstatePrivateArrangements = lazyPage(
  () => import("./pages/RealEstatePrivateArrangements"),
  "RealEstatePrivateArrangements",
);
const IBRegisterInterest = lazyPage(
  () => import("./pages/IBRegisterInterest"),
  "IBRegisterInterest",
);
const Insights = lazyPage(() => import("./pages/Insights"), "Insights");
const GovernanceIndependence = lazyPage(
  () => import("./pages/GovernanceIndependence"),
  "GovernanceIndependence",
);
const ShariahPrinciples = lazyPage(() => import("./pages/ShariahPrinciples"), "ShariahPrinciples");
const Disclosures = lazyPage(() => import("./pages/Disclosures"), "Disclosures");
const FATCA = lazyPage(() => import("./pages/FATCA"), "FATCA");
const PrivacyPolicy = lazyPage(() => import("./pages/PrivacyPolicy"), "PrivacyPolicy");

function MetaInjector() {
  const { metaTitle, metaDescription, metaKeywords, metaFavicon } = SITE_META;
  useEffect(() => {
    if (metaTitle) document.title = metaTitle;
  }, [metaTitle]);
  useEffect(() => {
    let el = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!el) {
      el = document.createElement("meta");
      el.name = "description";
      document.head.appendChild(el);
    }
    if (metaDescription) el.content = metaDescription;
  }, [metaDescription]);
  useEffect(() => {
    let el = document.querySelector<HTMLMetaElement>('meta[name="keywords"]');
    if (!el) {
      el = document.createElement("meta");
      el.name = "keywords";
      document.head.appendChild(el);
    }
    if (metaKeywords) el.content = metaKeywords;
    else el.remove();
  }, [metaKeywords]);
  useEffect(() => {
    if (!metaFavicon) return;
    let el = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
    if (!el) {
      el = document.createElement("link");
      el.rel = "icon";
      document.head.appendChild(el);
    }
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
      <Route
        path="/investment-banking/real-estate-private-arrangements"
        component={RealEstatePrivateArrangements}
      />
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
        <RouteLoadingProvider>
          <Router />
        </RouteLoadingProvider>
        <ConditionalDisclaimer />
        <Footer />
        <WhatsAppWidget />
      </WouterRouter>
    </LanguageProvider>
  );
}

export default App;

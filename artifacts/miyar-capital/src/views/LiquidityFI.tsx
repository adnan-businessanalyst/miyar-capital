"use client";

import { Banknote, Landmark, Shield, Wallet } from "lucide-react";
import { PageHero } from "../components/PageHero";
import { RegisterInterest } from "../components/RegisterInterest";
import { CONTENT_IMAGES } from "../site/contentImages";

const heroImg = CONTENT_IMAGES.pillar_liquidity;

const DEFAULT_ORDER = ["intro", "offer", "what-we-offer"];

export function LiquidityFI() {
  const sectionOrder = DEFAULT_ORDER;

  const renderSection = (id: string) => {
    switch (id) {
      case "intro":
        return (
          <PageHero
            key={id}
            title="Capital preserved. Returns made predictable."
            crumbs={[
              { label: "Asset Management", href: "/asset-management" },
              { label: "Liquidity & Fixed Income Solutions" },
            ]}
          />
        );
      case "offer":
        return (
          <section key={id} className="blk blk--cream">
            <div className="wrap">
              <div className="pi-intro">
                <div className="pi-intro-text">
                  <span className="pi-intro-eyebrow">The Four Pillars</span>
                  <h2>Liquidity &amp; Fixed Income Solutions</h2>
                  <p>
                    We help clients preserve capital and generate stable, predictable returns
                    through disciplined liquidity and fixed income management. Our strategies
                    span money market instruments, Sukuk, and short- to long-term fixed income
                    products, structured in full compliance with Shariah principles and Capital
                    Market Authority regulations.
                  </p>
                  <RegisterInterest
                    sourcePage="/asset-management/liquidity-fi"
                    className="btn btn-outline-navy"
                  />
                </div>
                <div
                  className="pi-intro-img"
                  style={{ backgroundImage: `url(${heroImg})` }}
                />
              </div>
            </div>
          </section>
        );
      case "what-we-offer":
        return (
          <section key={id} className="blk">
            <div className="wrap">
              <div className="sec-head sec-head--center">
                <h2 className="sec-head-navy">What We Offer</h2>
              </div>
              <div className="svc-grid svc-grid--4">
                <div className="svc svc--dark">
                  <div className="si" aria-hidden="true">
                    <Wallet strokeWidth={1.5} />
                  </div>
                  <h4>Money Market Solutions</h4>
                  <p>Short-term instruments designed for capital preservation and liquidity.</p>
                </div>
                <div className="svc svc--dark">
                  <div className="si" aria-hidden="true">
                    <Landmark strokeWidth={1.5} />
                  </div>
                  <h4>Sukuk &amp; Fixed Income</h4>
                  <p>Access to local, regional, and global Shariah-compliant fixed income opportunities.</p>
                </div>
                <div className="svc svc--dark">
                  <div className="si" aria-hidden="true">
                    <Banknote strokeWidth={1.5} />
                  </div>
                  <h4>Cash Management</h4>
                  <p>Efficient management of surplus cash for optimal, low-risk returns.</p>
                </div>
                <div className="svc svc--dark">
                  <div className="si" aria-hidden="true">
                    <Shield strokeWidth={1.5} />
                  </div>
                  <h4>Capital Preservation</h4>
                  <p>Strategies built around protecting principal while pursuing steady income.</p>
                </div>
              </div>
            </div>
          </section>
        );
      default:
        return null;
    }
  };

  return <div className="page">{sectionOrder.map((id) => renderSection(id))}</div>;
}

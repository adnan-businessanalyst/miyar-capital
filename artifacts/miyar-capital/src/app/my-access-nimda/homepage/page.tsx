import { redirect } from "next/navigation";
import { AdminBar } from "../AdminBar";
import { apiServerFetch, isAdminAuthenticatedViaApi } from "@/lib/api-server";
import { HomepageHeroForm } from "./HomepageHeroForm";
import {
  DEFAULT_HOMEPAGE_HERO,
  type HomepageHero,
} from "@/data/homepageHero";

export const metadata = { title: "Homepage · Admin" };
export const dynamic = "force-dynamic";

export default async function AdminHomepagePage() {
  if (!(await isAdminAuthenticatedViaApi())) redirect("/my-access-nimda");

  let hero: HomepageHero = DEFAULT_HOMEPAGE_HERO;
  let dbError = "";
  try {
    const res = await apiServerFetch("/api/admin/homepage-hero");
    const json = (await res.json()) as {
      hero?: HomepageHero;
      error?: string;
    };
    if (!res.ok) {
      dbError = json.error || "Failed to load homepage settings";
    } else if (json.hero) {
      hero = { ...DEFAULT_HOMEPAGE_HERO, ...json.hero };
    }
  } catch (e) {
    dbError = e instanceof Error ? e.message : "API unavailable";
  }

  return (
    <>
      <AdminBar />
      <div className="admin-wrap">
        <h1>Homepage hero</h1>
        <p className="admin-meta">
          Edit the CTA button and promo card on{" "}
          <a href="/">the homepage</a>.
        </p>
        {dbError ? <p className="form-error">{dbError}</p> : null}
        <div className="admin-card" style={{ marginTop: 20 }}>
          <HomepageHeroForm initial={hero} />
        </div>
      </div>
    </>
  );
}

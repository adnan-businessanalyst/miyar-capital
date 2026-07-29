import {
  DEFAULT_HOMEPAGE_HERO,
  type HomepageHero,
} from "@/data/homepageHero";
import { apiInternalBase } from "@/lib/api-server";

export async function fetchHomepageHero(): Promise<HomepageHero> {
  try {
    const res = await fetch(`${apiInternalBase()}/api/homepage-hero`, {
      cache: "no-store",
    });
    if (!res.ok) return DEFAULT_HOMEPAGE_HERO;
    const json = (await res.json()) as { hero?: HomepageHero };
    return json.hero ? { ...DEFAULT_HOMEPAGE_HERO, ...json.hero } : DEFAULT_HOMEPAGE_HERO;
  } catch {
    return DEFAULT_HOMEPAGE_HERO;
  }
}

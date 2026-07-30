"use client";

import Link from "next/link";
import { PageHero } from "../components/PageHero";
import { useLanguage } from "../i18n/LanguageContext";
import { pickLang } from "../site/types";
import type { NewsArticle as NewsArticleData, NewsSettings } from "../data/news";

export function NewsArticle({
  article,
  settings,
}: {
  article: NewsArticleData;
  settings: NewsSettings;
}) {
  const { lang } = useLanguage();
  const heading = pickLang(settings.headingEn, settings.headingAr, lang);
  const title = pickLang(article.title, article.titleAr ?? "", lang);
  const date = pickLang(article.date, article.dateAr ?? "", lang);
  const body =
    lang === "ar" && article.bodyAr.length > 0 ? article.bodyAr : article.body;
  const backLabel = pickLang(
    settings.backLabelEn,
    settings.backLabelAr,
    lang,
  );

  return (
    <div className="page">
      <PageHero
        title={title}
        crumbs={[{ label: heading, href: "/news" }, { label: title }]}
        description={date}
      />

      <section className="blk">
        <div className="wrap news-article">
          <Link href="/news" className="news-back">
            ← {backLabel}
          </Link>

          {article.imageUrl ? (
            <div className="news-article-media">
              <img src={article.imageUrl} alt="" />
            </div>
          ) : null}

          <div
            className="news-article-body"
            lang={lang === "ar" && article.bodyAr.length > 0 ? "ar" : undefined}
          >
            {body.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

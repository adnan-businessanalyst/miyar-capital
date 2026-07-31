"use client";

import Link from "next/link";
import { PageHero } from "../components/PageHero";
import { useLanguage } from "../i18n/LanguageContext";
import { useLocalePath } from "../i18n/useLocalePath";
import { pickLang } from "../site/types";
import type { NewsArticle, NewsSettings } from "../data/news";

export function News({
  settings,
  articles,
}: {
  settings: NewsSettings;
  articles: NewsArticle[];
}) {
  const { lang } = useLanguage();
  const withLocale = useLocalePath();
  const heading = pickLang(settings.headingEn, settings.headingAr, lang);
  const empty = pickLang(settings.emptyEn, settings.emptyAr, lang);
  const readMore = pickLang(settings.readMoreEn, settings.readMoreAr, lang);

  return (
    <div className="page">
      <PageHero title={heading} crumb={heading} />

      <section className="blk">
        <div className="wrap">
          {articles.length === 0 ? (
            <p className="news-empty">{empty}</p>
          ) : (
            <div className="news-grid">
              {articles.map((article) => {
                const title = pickLang(
                  article.title,
                  article.titleAr ?? "",
                  lang,
                );
                const date = pickLang(article.date, article.dateAr ?? "", lang);
                const blurb = pickLang(
                  article.blurb,
                  article.blurbAr ?? "",
                  lang,
                );
                return (
                  <Link
                    key={article.id}
                    href={withLocale(`/news/${article.slug}`)}
                    className="news-card"
                  >
                    {article.imageUrl ? (
                      <div className="news-card-media">
                        <img src={article.imageUrl} alt="" />
                      </div>
                    ) : null}
                    <div className="news-card-body">
                      <time className="news-card-date">{date}</time>
                      <h2
                        className="news-card-title"
                        lang={lang === "ar" && article.titleAr ? "ar" : undefined}
                      >
                        {title}
                      </h2>
                      <p className="news-card-blurb">{blurb}</p>
                      <span className="news-card-more">
                        {readMore}
                        <span aria-hidden="true">→</span>
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

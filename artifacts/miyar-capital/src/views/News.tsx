import Link from "next/link";
import { PageHero } from "../components/PageHero";
import { listNews } from "../data/news";

export function News() {
  const articles = listNews();

  return (
    <div className="page">
      <PageHero title="News" crumb="News" />

      <section className="blk">
        <div className="wrap">
          {articles.length === 0 ? (
            <p className="news-empty">No news articles at this time.</p>
          ) : (
            <div className="news-grid">
              {articles.map((article) => (
                <Link
                  key={article.id}
                  href={`/news/${article.slug}`}
                  className="news-card"
                >
                  <div className="news-card-media">
                    <img src={article.image} alt="" />
                  </div>
                  <div className="news-card-body">
                    <time className="news-card-date">{article.date}</time>
                    <h2 className="news-card-title">{article.title}</h2>
                    <p className="news-card-blurb">{article.blurb}</p>
                    <span className="news-card-more">
                      Read more
                      <span aria-hidden="true">→</span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

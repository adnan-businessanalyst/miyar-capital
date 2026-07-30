import Link from "next/link";
import { PageHero } from "../components/PageHero";
import type { NewsArticle as NewsArticleData } from "../data/news";

export function NewsArticle({ article }: { article: NewsArticleData }) {
  return (
    <div className="page">
      <PageHero
        title={article.title}
        crumbs={[{ label: "News", href: "/news" }, { label: article.title }]}
        description={article.date}
      />

      <section className="blk">
        <div className="wrap news-article">
          <Link href="/news" className="news-back">
            ← Back to News
          </Link>

          {article.image ? (
            <div className="news-article-media">
              <img src={article.image} alt="" />
            </div>
          ) : null}

          <div className="news-article-body">
            {article.body.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

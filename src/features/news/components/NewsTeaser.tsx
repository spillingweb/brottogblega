import { useMemo } from "react";
import { tinaField } from "tinacms/tina-field";
import type {
  ArticlesConnectionQuery,
  PagesHomepage,
} from "../../../../tina/__generated__/types";
import { Link } from "@tanstack/react-router";
import { Button } from "#/components/ui/button";
import NewsItem from "#/features/news/components/NewsItem";
import Kicker from "#/components/ui/Kicker";

const NewsTeaser = ({
  page,
  articlesData,
}: {
  page: PagesHomepage;
  articlesData: ArticlesConnectionQuery;
}) => {
  const articles = useMemo(() => {
    return (articlesData.articlesConnection.edges || [])
      .map((edge) => edge?.node)
      .filter((node): node is NonNullable<typeof node> => node !== null)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 3);
  }, [articlesData]);

  return (
    <section className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="anim-scroll flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
          <div>
            <Kicker className="text-primary mb-4">Aktuelt</Kicker>
            <h2
              className="text-3xl md:text-4xl"
              style={{ fontFamily: "'Lora', serif" }}
              data-tina-field={tinaField(page, "newsHeading")}
            >
              {page.newsHeading}
            </h2>
          </div>
          <Button variant="link" className="p-0 h-fit" asChild tabIndex={-1}>
            <Link to="/aktuelt">
              Se alle innlegg
              <span>→</span>
            </Link>
          </Button>
        </div>

        {articles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-grid">
            {articles.map((article) => {
              return (
                <Link
                  key={article.id}
                  to="/aktuelt/$slug"
                  params={{ slug: article._sys.filename }}
                >
                  <NewsItem article={article} />
                </Link>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Ingen artikler funnet.
          </p>
        )}
      </div>
    </section>
  );
};

export default NewsTeaser;

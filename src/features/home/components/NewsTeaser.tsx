import { useMemo } from "react";
import { tinaField } from "tinacms/tina-field";
import type {
  ArticlesConnectionQuery,
  PagesHomepage,
} from "../../../../tina/__generated__/types";
import { calculateReadingTime } from "#/features/news/utils";
import { OptimizedImage } from "#/components/ui/OptimizedImage";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "#/components/ui/card";
import { Link } from "@tanstack/react-router";
import { Button } from "#/components/ui/button";

const categoryColors: Record<string, string> = {
  Kronikk: "bg-blue-50 text-blue-700",
  Fagartikkel: "bg-violet-50 text-violet-700",
  Nyhet: "bg-emerald-50 text-emerald-700",
  Refleksjon: "bg-amber-50 text-amber-700",
};

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
        <div className="anim-scroll flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs uppercase tracking-widest text-primary mb-3">
              Aktuelt
            </p>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 stagger-grid">
            {articles.map((article) => {
              const categoryColor =
                categoryColors[article.category] ??
                "bg-secondary text-foreground";

              const readingTime = calculateReadingTime(article.body);

              return (
                <Link
                  key={article.id}
                  to="/aktuelt/$slug"
                  params={{ slug: article._sys.filename }}
                >
                  <Card className="pt-0 anim-scroll hover:shadow-md transition-shadow duration-300 h-full">
                    <div className="aspect-video overflow-hidden bg-secondary shrink-0">
                      <OptimizedImage
                        src={article.coverImage || ""}
                        alt={article.title}
                        defaultWidth={1200}
                        sizes="100vw"
                        className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
                        data-tina-field={tinaField(article, "coverImage")}
                      />
                    </div>
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-3">
                        <span
                          className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-sm font-medium ${categoryColor}`}
                          data-tina-field={tinaField(article, "category")}
                        >
                          {article.category}
                        </span>
                        <span
                          className="text-[11px] text-muted-foreground"
                          data-tina-field={tinaField(article, "date")}
                        >
                          {new Date(article.date).toLocaleDateString("nb-NO", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                            timeZone: "UTC",
                          })}
                        </span>
                      </div>
                      <CardTitle data-tina-field={tinaField(article, "title")}>
                        {article.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent
                      className="text-muted-foreground leading-relaxed line-clamp-2 flex-1 mb-4"
                      data-tina-field={tinaField(article, "excerpt")}
                    >
                      {article.excerpt}
                    </CardContent>
                    <CardFooter className="flex items-center justify-between text-muted-foreground">
                      <span
                        className="text-primary font-medium"
                        data-tina-field={tinaField(article, "author")}
                      >
                        {article.author}
                      </span>
                      <span>{readingTime ?? "?"} min lesetid</span>
                    </CardFooter>
                  </Card>
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

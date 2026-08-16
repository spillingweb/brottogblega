import NavLink from "#/features/header/components/NavLink";
import { useMemo } from "react";
import { tinaField } from "tinacms/tina-field";
import type {
  ArticlesConnectionQuery,
  PagesHomepage,
} from "../../../../tina/__generated__/types";
import { calculateReadingTime } from "#/features/news/utils";

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
          <NavLink
            to="/aktuelt"
            className="text-sm text-primary font-medium hover:underline shrink-0"
          >
            Se alle innlegg →
          </NavLink>
        </div>

        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 stagger-grid">
            {articles.map((article) => {
              const categoryColor =
                categoryColors[article.category] ??
                "bg-secondary text-foreground";

              const readingTime = calculateReadingTime(article.body);

              return (
                <NavLink
                  key={article.id}
                  to={`/aktuelt/${article._sys.filename}`}
                  className="anim-scroll group flex flex-col bg-card border border-border rounded-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
                >
                  <div className="aspect-video overflow-hidden bg-secondary shrink-0">
                    <img
                      src={article.coverImage || ""}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      data-tina-field={tinaField(article, "coverImage")}
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
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
                        })}
                      </span>
                    </div>
                    <h3
                      className="text-base leading-snug mb-2 group-hover:text-primary transition-colors"
                      style={{ fontFamily: "'Lora', serif" }}
                      data-tina-field={tinaField(article, "title")}
                    >
                      {article.title}
                    </h3>
                    <p
                      className="text-xs text-muted-foreground leading-relaxed line-clamp-2 flex-1 mb-4"
                      data-tina-field={tinaField(article, "excerpt")}
                    >
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-3 mt-auto">
                      <span
                        className="text-primary font-medium"
                        data-tina-field={tinaField(article, "author")}
                      >
                        {article.author}
                      </span>
                      <span>{readingTime ?? "?"} min lesetid</span>
                    </div>
                  </div>
                </NavLink>
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

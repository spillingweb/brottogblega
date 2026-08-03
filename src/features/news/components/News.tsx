import CallToAction from "#/components/CallToAction";
import ContactDialog from "#/components/ContactDialog";
import PageWrapper from "#/components/PageWrapper";
import { useState } from "react";
import type {
  PagesQuery,
  PagesStandard,
} from "../../../../tina/__generated__/types";
import { articles, type Article } from "../constants";
import NewsItem from "./NewsItem";
import Featured from "./Featured";
import { Dialog } from "#/components/ui/dialog";
import { Button } from "#/components/ui/button";
import ArticleDialog from "./ArticleDialog";

const News = ({ pageData }: { pageData: PagesQuery }) => {
  const page = pageData.pages as PagesStandard;
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [filter, setFilter] = useState<string>("Alle");

  const categories = [
    "Alle",
    ...Array.from(new Set(articles.map((a) => a.category))),
  ];
  const filtered =
    filter === "Alle"
      ? articles
      : articles.filter((a) => a.category === filter);
  const featured = filtered.find((a) => a.featured);
  const rest = filtered.filter((a) => !a.featured);

  return (
    <PageWrapper kicker={"nyheter"} page={page}>
      {/* Filter */}
      <div className="max-w-6xl mx-auto px-6 -mt-8 mb-8 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <Button
            key={cat}
            onClick={() => setFilter(cat)}
            variant={filter === cat ? "default" : "outline"}
            size="sm"
          >
            {cat}
          </Button>
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-24">
        <Dialog>
          {/* Featured article */}
          {featured && (
            <Featured article={featured} setActiveArticle={setActiveArticle} />
          )}

          {/* Rest */}
          {rest.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {rest.map((article) => (
                <NewsItem
                  key={article.id}
                  article={article}
                  setActiveArticle={setActiveArticle}
                />
              ))}
            </div>
          )}

          <ArticleDialog article={activeArticle} />
        </Dialog>
      </div>

      <CallToAction
        btnText="Ta kontakt"
        dialog={<ContactDialog />}
        title={page.ctaTitle || "Alle tjenester er tilgjengelige i Fevik"}
        description={
          page.ctaDescription ||
          "Vi holder til sentralt i Fevik og kan i noen tilfeller tilby digitale konsultasjoner. Ta kontakt for mer informasjon om hva som passer best for de"
        }
      />
    </PageWrapper>
  );
};

export default News;

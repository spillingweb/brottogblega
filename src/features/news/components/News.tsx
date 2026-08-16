import CallToAction from "#/components/CallToAction";
import ContactDialog from "#/components/ContactDialog";
import PageWrapper from "#/components/PageWrapper";
import { useMemo, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import type {
  ArticlesConnectionQuery,
  PagesQuery,
  PagesStandard,
} from "../../../../tina/__generated__/types";
import { articleCategories } from "../constants";
import type { ArticleNode } from "../types";
import NewsItem from "./NewsItem";
import Featured from "./Featured";
import { Dialog } from "#/components/ui/dialog";
import { Button } from "#/components/ui/button";
import ArticleDialog from "./ArticleDialog";
import { tinaField } from "tinacms/tina-field";

const News = ({
  pageData,
  articlesData,
  activeSlug,
  onOpenArticle,
  onCloseArticle,
}: {
  pageData: PagesQuery;
  articlesData: ArticlesConnectionQuery;
  activeSlug?: string;
  onOpenArticle?: (slug: string) => void;
  onCloseArticle?: () => void;
}) => {
  const page = pageData.pages as PagesStandard;
  const [filter, setFilter] = useState<string>("Alle");
  const isSmallScreen = useMediaQuery("(max-width: 640px)"); // Adjust the breakpoint as needed

  // Extract articles from connection
  const articles = (articlesData.articlesConnection.edges || [])
    .map((edge) => edge?.node)
    .filter((node): node is ArticleNode => node !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const filtered =
    filter === "Alle"
      ? articles
      : articles.filter((a) => a.category === filter);

  const featured = isSmallScreen ? null : filtered[0];
  const rest = isSmallScreen ? filtered : filtered.slice(1);
  const activeArticle = useMemo(() => {
    if (!activeSlug) return null;
    return (
      articles.find((article) => article._sys.filename === activeSlug) ?? null
    );
  }, [activeSlug, articles]);

  const handleSelectArticle = (article: ArticleNode) => {
    onOpenArticle?.(article._sys.filename);
  };

  const handleDialogOpenChange = (open: boolean) => {
    if (!open) {
      onCloseArticle?.();
    }
  };

  if (!featured && rest.length === 0) {
    return (
      <PageWrapper kicker={"nyheter"} page={page}>
        <p>Ingen blogginnlegg funnet.</p>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper kicker={"nyheter"} page={page}>
      {/* Filter */}
      <div className="max-w-6xl mx-auto px-6 mb-8 flex flex-wrap gap-2">
        {articleCategories.map((cat) => (
          <Button
            key={cat}
            onClick={() => setFilter(cat)}
            variant={filter === cat ? "default" : "outline"}
            size={isSmallScreen ? "xs" : "sm"}
          >
            {cat}
          </Button>
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-24">
        <Dialog
          open={Boolean(activeArticle)}
          onOpenChange={handleDialogOpenChange}
        >
          {/* Featured article */}
          {featured && (
            <Featured
              article={featured}
              onSelectArticle={handleSelectArticle}
            />
          )}

          {/* Rest */}
          {rest.length > 0 && (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 items-stretch">
              {rest.map((article) => (
                <NewsItem
                  key={article.id}
                  article={article}
                  onSelectArticle={handleSelectArticle}
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
        title={page.ctaTitle || "Vil du få nye innlegg rett i innboksen?"}
        description={
          page.ctaDescription ||
          "Send oss en e-post, så legger vi deg til på listen vår. Vi sender kun ut når det er noe nytt og verdt å lese."
        }
        dataTitle={tinaField(page, "ctaTitle")}
        dataDescription={tinaField(page, "ctaDescription")}
      />
    </PageWrapper>
  );
};

export default News;

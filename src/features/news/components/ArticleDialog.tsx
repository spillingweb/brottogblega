import { Button } from "#/components/ui/button";
import { DialogContent } from "#/components/ui/dialog";
import Heading from "#/components/ui/Heading";
import { ScrollArea } from "#/components/ui/scroll-area";
import type { ArticleNode } from "../types";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { calculateReadingTime, categoryColors } from "../utils";
import { tinaField } from "tinacms/tina-field";
import { PrinterIcon, Share2Icon } from "lucide-react";
import { cn } from "#/lib/utils";
import { formatArticleDate } from "../utils/dateFormatter";

const ArticleDialog = ({ article }: { article: ArticleNode | null }) => {
  if (!article) return null;
  const readingTime = calculateReadingTime(article.body);

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    const shareUrl = window.location.href;

    if (navigator.share) {
      await navigator.share({
        title: article.title,
        text: article.excerpt,

        url: shareUrl,
      });
      return;
    }

    await navigator.clipboard.writeText(shareUrl);
    window.prompt("Kopier lenken til innlegget", shareUrl);
  };

  return (
    <DialogContent className="max-w-[calc(100dvw-2rem)] sm:max-w-xl! md:max-w-2xl! p-0 h-[calc(100dvh-2rem)] print:h-full">
      <ScrollArea className="h-full overflow-auto print:overflow-visible">
        <div className="overflow-hidden rounded-t-sm bg-secondary h-70 print:h-50">
          <img
            src={article.coverImage || ""}
            alt={article.title}
            className="w-full h-full object-cover"
            data-tina-field={tinaField(article, "coverImage")}
          />
        </div>
        <div className="p-6 sm:p-8 md:p-10 print:p-0">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <span
                className={cn(
                  "text-[11px] uppercase tracking-wider px-2 py-0.5 rounded-sm font-medium",
                  categoryColors[article.category] ??
                    "bg-secondary text-foreground",
                )}
                data-tina-field={tinaField(article, "category")}
              >
                {article.category}
              </span>
              <span
                className="text-xs text-muted-foreground"
                data-tina-field={tinaField(article, "date")}
              >
                {formatArticleDate(article.date)}
              </span>
              <span>·</span>
              <span className="text-xs text-muted-foreground">
                {readingTime ?? "?"} min lesetid
              </span>
            </div>

            <div className="flex items-center gap-2 print:hidden">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handlePrint}
              >
                <PrinterIcon />
                Skriv ut
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleShare}
              >
                <Share2Icon />
                Del
              </Button>
            </div>
          </div>
          <Heading
            level={2}
            className="md:text-3xl mb-3 leading-snug wrap-break-words"
            data-tina-field={tinaField(article, "title")}
          >
            {article.title}
          </Heading>
          <p
            className="text-sm text-muted-foreground mb-6"
            data-tina-field={tinaField(article, "excerpt")}
          >
            {article.excerpt}
          </p>
          <p
            className="text-sm text-primary font-medium mb-6"
            data-tina-field={tinaField(article, "author")}
          >
            — {article.author}
          </p>
          {article.body && (
            <div
              className="text-sm md:text-base text-foreground text-balance leading-relaxed flex flex-col gap-4 [&>p]:print:break-inside-avoid"
              data-tina-field={tinaField(article, "body")}
            >
              <TinaMarkdown content={article.body} />
            </div>
          )}
        </div>
      </ScrollArea>
    </DialogContent>
  );
};

export default ArticleDialog;

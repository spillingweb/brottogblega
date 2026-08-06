import { DialogContent } from "#/components/ui/dialog";
import Heading from "#/components/ui/Heading";
import { ScrollArea } from "#/components/ui/scroll-area";
import type { ArticleNode } from "../types";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { categoryColors } from "../utils";
import { tinaField } from "tinacms/tina-field";

const ArticleDialog = ({ article }: { article: ArticleNode | null }) => {
  if (!article) return null;

  return (
    <DialogContent className="max-w-[calc(100dvw-2rem)] sm:max-w-xl! md:max-w-2xl! p-0 h-[calc(100dvh-2rem)]">
      <ScrollArea className="h-full overflow-auto">
        <div className="overflow-hidden rounded-t-sm bg-secondary h-70">
          <img
            src={article.coverImage || ""}
            alt={article.title}
            className="w-full h-full object-cover"
            data-tina-field={tinaField(article, "coverImage")}
          />
        </div>
        <div className="p-6 sm:p-8 md:p-10">
          <div className="flex items-center gap-3 mb-4">
            <span
              className={`text-[11px] uppercase tracking-wider px-2 py-0.5 rounded-sm font-medium ${categoryColors[article.category] ?? "bg-secondary text-foreground"}`}
              data-tina-field={tinaField(article, "category")}
            >
              {article.category}
            </span>
            <span
              className="text-xs text-muted-foreground"
              data-tina-field={tinaField(article, "date")}
            >
              {new Date(article.date).toLocaleDateString("nb-NO", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
            <span>·</span>
            <span
              className="text-xs text-muted-foreground"
              data-tina-field={tinaField(article, "readingTime")}
            >
              {article.readingTime ?? "?"} min lesetid
            </span>
          </div>
          <Heading
            level={2}
            className="md:text-3xl mb-3 leading-snug"
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
              className="text-sm md:text-base text-foreground leading-relaxed flex flex-col gap-4"
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

import type { ArticleNode } from "../types";
import { Card } from "#/components/ui/card";
import { categoryColors } from "../utils";
import { DialogTrigger } from "#/components/ui/dialog";
import { tinaField } from "tinacms/tina-field";

const NewsItem = ({
  article,
  onSelectArticle,
}: {
  article: ArticleNode;
  onSelectArticle: (article: ArticleNode) => void;
}) => {
  const categoryColor =
    categoryColors[article.category] || "bg-gray-50 text-gray-700";

  return (
    <DialogTrigger
      className="cursor-pointer"
      onClick={() => onSelectArticle(article)}
    >
      <Card className="text-left group hover:shadow-md transition-shadow duration-300 py-0">
        <div
          className="aspect-video overflow-hidden bg-secondary"
          data-tina-field={tinaField(article, "coverImage")}
        >
          <img
            src={article.coverImage || ""}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <span
              className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-sm font-medium ${categoryColor ?? "bg-secondary text-foreground"}`}
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
            className="text-xs text-muted-foreground leading-relaxed line-clamp-3 mb-4"
            data-tina-field={tinaField(article, "excerpt")}
          >
            {article.excerpt}
          </p>
          <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-3">
            <span
              className="text-primary font-medium"
              data-tina-field={tinaField(article, "author")}
            >
              {article.author}
            </span>
            <span data-tina-field={tinaField(article, "readingTime")}>
              {article.readingTime ?? "?"} min lesetid
            </span>
          </div>
        </div>
      </Card>
    </DialogTrigger>
  );
};

export default NewsItem;

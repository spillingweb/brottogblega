import { Card } from "#/components/ui/card";
import { DialogTrigger } from "#/components/ui/dialog";
import { tinaField } from "tinacms/tina-field";
import type { ArticleNode } from "../types";
import { calculateReadingTime, categoryColors } from "../utils";
import Heading from "#/components/ui/Heading";

const Featured = ({
  article,
  onSelectArticle,
}: {
  article: ArticleNode;
  onSelectArticle: (article: ArticleNode) => void;
}) => {
const readingTime = calculateReadingTime(article.body || ""); // Calculate reading time based on content

  return (
    <DialogTrigger
      className="w-full text-left mb-14 group cursor-pointer"
      onClick={() => onSelectArticle(article)}
    >
      <Card className="grid md:grid-cols-2 gap-0 hover:shadow-md transition-shadow duration-300 py-0">
        <div className="aspect-4/3 md:aspect-auto overflow-hidden bg-secondary">
          <img
            src={article.coverImage || ""}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            data-tina-field={tinaField(article, "coverImage")}
          />
        </div>
        <div className="p-8 md:p-10 bg-card flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-4">
            <span
              className={`text-[11px] uppercase tracking-wider px-2 py-0.5 rounded-sm font-medium ${categoryColors[article.category] ?? ""}`}
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
          </div>
          <Heading
            level={2}
            className="md:text-3xl leading-snug mb-4 group-hover:text-primary transition-colors"
            data-tina-field={tinaField(article, "title")}
          >
            {article.title}
          </Heading>
          <p
            className="text-sm text-muted-foreground leading-relaxed mb-6"
            data-tina-field={tinaField(article, "excerpt")}
          >
            {article.excerpt}
          </p>
          <div className="flex items-center gap-3 text-xs text-primary font-medium">
            <span data-tina-field={tinaField(article, "author")}>
              {article.author}
            </span>
            <span className="text-muted-foreground">·</span>
            <span
              className="text-muted-foreground"
            >
              {readingTime ?? "?"} min lesetid
            </span>
            <span className="ml-auto group-hover:translate-x-1 transition-transform">
              →
            </span>
          </div>
        </div>
      </Card>
    </DialogTrigger>
  );
};

export default Featured;

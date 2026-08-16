import type { ArticleNode } from "../types";
import {
  Card,
  CardContent,
  CardFooter,
} from "#/components/ui/card";
import { calculateReadingTime, categoryColors } from "../utils";
import { DialogTrigger } from "#/components/ui/dialog";
import { tinaField } from "tinacms/tina-field";
import Heading from "#/components/ui/Heading";

const NewsItem = ({
  article,
  onSelectArticle,
}: {
  article: ArticleNode;
  onSelectArticle: (article: ArticleNode) => void;
}) => {
  const categoryColor =
    categoryColors[article.category] || "bg-gray-50 text-gray-700";

  const readingTime = calculateReadingTime(article.body || ""); // Calculate reading time based on content

  return (
    <DialogTrigger
      className="cursor-pointer"
      onClick={() => onSelectArticle(article)}
    >
      <Card className="text-left group hover:shadow-md transition-shadow duration-300 py-0 h-full flex flex-col gap-0">
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
        <CardContent className="p-5">
          <div className="flex items-center gap-2 my-3">
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
          <Heading
            level={3}
            className="text-base leading-snug mb-2 group-hover:text-primary transition-colors"
            data-tina-field={tinaField(article, "title")}
          >
            {article.title}
          </Heading>
          <p
            className="text-xs text-muted-foreground leading-relaxed"
            data-tina-field={tinaField(article, "excerpt")}
          >
            {article.excerpt}
          </p>
        </CardContent>

        <CardFooter className="mt-auto flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-3">
          <span
            className="text-primary font-medium"
            data-tina-field={tinaField(article, "author")}
          >
            {article.author}
          </span>
          <span>{readingTime ?? "?"} min lesetid</span>
        </CardFooter>
      </Card>
    </DialogTrigger>
  );
};

export default NewsItem;

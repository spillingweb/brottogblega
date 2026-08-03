import { DialogTrigger } from "@radix-ui/react-dialog";
import type { Article } from "../constants";
import { Card } from "#/components/ui/card";
import { categoryColors } from "../utils";

const NewsItem = ({
  article,
  setActiveArticle,
}: {
  article: Article;
  setActiveArticle: React.Dispatch<React.SetStateAction<Article | null>>;
}) => {
  const categoryColor =
    categoryColors[article.category] || "bg-gray-50 text-gray-700";

  return (
    <DialogTrigger
      className="cursor-pointer"
      onClick={() => setActiveArticle(article)}
    >
      <Card className="text-left group hover:shadow-md transition-shadow duration-300 py-0">
        <div className="aspect-video overflow-hidden bg-secondary">
          <img
            src={article.img}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <span
              className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-sm font-medium ${categoryColor ?? "bg-secondary text-foreground"}`}
            >
              {article.category}
            </span>
            <span className="text-[11px] text-muted-foreground">
              {article.date}
            </span>
          </div>
          <h3
            className="text-base leading-snug mb-2 group-hover:text-primary transition-colors"
            style={{ fontFamily: "'Lora', serif" }}
          >
            {article.title}
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 mb-4">
            {article.excerpt}
          </p>
          <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-3">
            <span className="text-primary font-medium">{article.author}</span>
            <span>{article.readTime} lesetid</span>
          </div>
        </div>
      </Card>
    </DialogTrigger>
  );
};

export default NewsItem;

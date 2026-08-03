import { Card } from "#/components/ui/card";
import { DialogTrigger } from "#/components/ui/dialog";
import type { Article } from "../constants";
import { categoryColors } from "../utils";

const Featured = ({
  article,
  setActiveArticle,
}: {
  article: Article;
  setActiveArticle: React.Dispatch<React.SetStateAction<Article | null>>;
}) => {
  return (
    <DialogTrigger
      className="w-full text-left mb-14 group"
      onClick={() => setActiveArticle(article)}
    >
      <Card className="grid grid-cols-1 md:grid-cols-2 gap-0 hover:shadow-md transition-shadow duration-300 py-0">
        <div className="aspect-4/3 md:aspect-auto overflow-hidden bg-secondary">
          <img
            src={article.img}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="p-8 md:p-10 bg-card flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-4">
            <span
              className={`text-[11px] uppercase tracking-wider px-2 py-0.5 rounded-sm font-medium ${categoryColors[article.category] ?? ""}`}
            >
              {article.category}
            </span>
            <span className="text-xs text-muted-foreground">
              {article.date}
            </span>
          </div>
          <h2
            className="text-2xl md:text-3xl leading-snug mb-4 group-hover:text-primary transition-colors"
            style={{ fontFamily: "'Lora', serif" }}
          >
            {article.title}
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-6">
            {article.excerpt}
          </p>
          <div className="flex items-center gap-3 text-xs text-primary font-medium">
            <span>{article.author}</span>
            <span className="text-muted-foreground">·</span>
            <span className="text-muted-foreground">
              {article.readTime} lesetid
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

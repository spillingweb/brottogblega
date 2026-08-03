import { DialogContent } from "#/components/ui/dialog";
import Heading from "#/components/ui/Heading";
import { ScrollArea } from "#/components/ui/scroll-area";
import type { Article } from "../constants";
import { categoryColors } from "../utils";

const ArticleDialog = ({ article }: { article: Article | null }) => {
  if (!article) return null;

  return (
    <DialogContent className="max-w-[calc(100dvw-2rem)] sm:max-w-xl! md:max-w-2xl! p-0 h-[calc(100dvh-2rem)]">
      <ScrollArea className="h-full overflow-auto">
        <div className="overflow-hidden rounded-t-sm bg-secondary h-70">
          <img
            src={article.img}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-6 sm:p-8 md:p-10">
          <div className="flex items-center gap-3 mb-4">
            <span
              className={`text-[11px] uppercase tracking-wider px-2 py-0.5 rounded-sm font-medium ${categoryColors[article.category] ?? "bg-secondary text-foreground"}`}
            >
              {article.category}
            </span>
            <span className="text-xs text-muted-foreground">
              {article.date}
            </span>
            <span className="text-xs text-muted-foreground">
              · {article.readTime} lesetid
            </span>
          </div>
          <Heading level={2} className="md:text-3xl mb-3 leading-snug">
            {article.title}
          </Heading>
          <p className="text-sm text-muted-foreground mb-6">
            {article.excerpt}
          </p>
          <p className="text-sm text-primary font-medium mb-6">
            — {article.author}
          </p>
          <div className="space-y-4">
            {article.body.map((para, i) => (
              <p
                key={i}
                className="text-sm md:text-base text-foreground/80 leading-relaxed"
              >
                {para}
              </p>
            ))}
          </div>
        </div>
      </ScrollArea>
    </DialogContent>
  );
};

export default ArticleDialog;

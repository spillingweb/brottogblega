import NavLink from "#/features/header/components/NavLink";
import { tinaField } from "tinacms/tina-field";
import type { PagesHomepage } from "../../../../tina/__generated__/types";

const teaserArticles = [
  {
    id: 1,
    category: "Kronikk",
    date: "2. juli 2025",
    title:
      "Hva skjer egentlig i kroppen under overgangsalderen — og hvorfor snakker vi ikke mer om det?",
    excerpt:
      "Overgangsalderen er en av de mest undervurderte og misforståtte fasene i et kvinneliv.",
    author: "Kari Andersen",
    readTime: "6 min",
    img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=700&h=420&fit=crop&auto=format",
  },
  {
    id: 2,
    category: "Fagartikkel",
    date: "18. juni 2025",
    title:
      "Filosofisk samtale som helsearbeid — en annen måte å møte seg selv på",
    excerpt:
      "Ingrid Solberg utforsker hva det vil si å bruke filosofi som et klinisk verktøy.",
    author: "Ingrid Solberg",
    readTime: "8 min",
    img: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=700&h=420&fit=crop&auto=format",
  },
  {
    id: 3,
    category: "Nyhet",
    date: "4. juni 2025",
    title: "Brott & Blega åpner ny dialoggruppe for kvinner i Fevik til høsten",
    excerpt:
      "Fra oktober starter vi opp en ny runde med dialoggrupper. Vi gleder oss til å møte nye deltakere.",
    author: "Redaksjonen",
    readTime: "2 min",
    img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=700&h=420&fit=crop&auto=format",
  },
];

const categoryColors: Record<string, string> = {
  Kronikk: "bg-blue-50 text-blue-700",
  Fagartikkel: "bg-violet-50 text-violet-700",
  Nyhet: "bg-emerald-50 text-emerald-700",
  Refleksjon: "bg-amber-50 text-amber-700",
};

const NewsTeaser = ({ page }: { page: PagesHomepage }) => {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="anim-scroll flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs uppercase tracking-widest text-primary mb-3">
              Aktuelt
            </p>
            <h2
              className="text-3xl md:text-4xl"
              style={{ fontFamily: "'Lora', serif" }}
              data-tina-field={tinaField(page, "newsHeading")}
            >
              {page.newsHeading}
            </h2>
          </div>
          <NavLink
            to="/aktuelt"
            className="text-sm text-primary font-medium hover:underline shrink-0"
          >
            Se alle innlegg →
          </NavLink>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {teaserArticles.map((article) => (
            <NavLink
              key={article.id}
              to="/aktuelt"
              className="anim-scroll group flex flex-col bg-card border border-border rounded-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
            >
              <div className="aspect-16/9 overflow-hidden bg-secondary shrink-0">
                <img
                  src={article.img}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-sm font-medium ${
                      categoryColors[article.category] ??
                      "bg-secondary text-foreground"
                    }`}
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
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 flex-1 mb-4">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-3 mt-auto">
                  <span className="text-primary font-medium">
                    {article.author}
                  </span>
                  <span>{article.readTime} lesetid</span>
                </div>
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsTeaser;

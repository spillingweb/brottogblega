import { tinaField } from "tinacms/tina-field";
import type { PagesAbout } from "../../../../tina/__generated__/types";
import { TinaMarkdown } from "tinacms/dist/rich-text";

const SharedSection = ({ page }: { page: PagesAbout }) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="max-w-6xl mx-auto px-6 pb-16 md:pb-20">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-0 rounded-sm overflow-hidden border border-border">
        {/* Photo */}
        <div className="md:col-span-3 aspect-4/3 md:aspect-auto overflow-hidden bg-secondary">
          <img
            src={page.sharedImage || ""}
            alt={page.sharedImageAlt || "Brott & Blega ansatte"}
            className="w-full h-full object-cover"
            data-tina-field={tinaField(page, "sharedImage")}
          />
        </div>

        {/* Vision text */}
        <div className="md:col-span-2 bg-primary text-primary-foreground p-8 md:p-12 flex flex-col justify-between">
          <div>
            <p
              className="text-xs uppercase tracking-widest text-primary-foreground/50 mb-6"
              data-tina-field={tinaField(page, "sharedKicker")}
            >
              {page.sharedKicker}
            </p>
            <p
              className="text-lg leading-relaxed mb-5"
              style={{ fontFamily: "'Lora', serif" }}
              data-tina-field={tinaField(page, "sharedIntro")}
            >
              {page.sharedIntro}
            </p>
            <div
              className="text-sm text-primary-foreground/75 leading-relaxed flex flex-col gap-4 text-balance"
              data-tina-field={tinaField(page, "sharedContent")}
            >
              <TinaMarkdown content={page.sharedContent} />
            </div>
          </div>

          {/* Scroll links */}
          <div className="mt-10 pt-8 border-t border-primary-foreground/20 flex flex-col gap-3">
            <p className="text-xs uppercase tracking-widest text-primary-foreground/50 mb-1">
              Bli kjent med oss
            </p>
            <button
              onClick={() => scrollTo("hilde")}
              className="flex items-center justify-between text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors group"
            >
              <span>Hilde Stenqvist — Fysioterapeut</span>
              <span className="group-hover:translate-y-1 transition-transform">
                ↓
              </span>
            </button>
            <button
              onClick={() => scrollTo("tinaMaria")}
              className="flex items-center justify-between text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors group"
            >
              <span>Tina Maria Lie — Sykepleier & filosof</span>
              <span className="group-hover:translate-y-1 transition-transform">
                ↓
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SharedSection;

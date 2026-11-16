import { tinaField } from "tinacms/tina-field";
import type { PagesHomepage } from "../../../../tina/__generated__/types";
import Heading from "#/components/ui/Heading";

const Intro = ({ page }: { page: PagesHomepage }) => {
  return (
    <section className="bg-secondary py-14 md:py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-10 md:gap-16">
          <div className="flex gap-5 motion-safe:anim-scroll md:[--index:0]">
            <span className="text-xs font-medium text-primary/90 pt-1.5 select-none">
              01
            </span>
            <div>
              <Heading
                level={2}
                className="text-lg mb-2"
                data-tina-field={tinaField(page, "intro1Title")}
              >
                {page.intro1Title}
              </Heading>
              <p
                className="text-sm text-primary/90 leading-relaxed"
                data-tina-field={tinaField(page, "intro1Text")}
              >
                {page.intro1Text}
              </p>
            </div>
          </div>

          <div className="flex gap-5 motion-safe:anim-scroll md:[--index:1]">
            <span className="text-xs font-medium text-primary/90 pt-1.5 select-none">
              02
            </span>
            <div>
              <Heading
                level={3}
                className="text-lg mb-2"
                data-tina-field={tinaField(page, "intro2Title")}
              >
                {page.intro2Title}
              </Heading>
              <p
                className="text-sm text-primary/90 leading-relaxed"
                data-tina-field={tinaField(page, "intro2Text")}
              >
                {page.intro2Text}
              </p>
            </div>
          </div>

          <div className="flex gap-5 motion-safe:anim-scroll md:[--index:2]">
            <span className="text-xs font-medium text-primary/90 pt-1.5 select-none">
              03
            </span>
            <div>
              <Heading
                level={3}
                className="text-lg mb-2"
                data-tina-field={tinaField(page, "intro3Title")}
              >
                {page.intro3Title}
              </Heading>
              <p
                className="text-sm text-primary/90 leading-relaxed"
                data-tina-field={tinaField(page, "intro3Text")}
              >
                {page.intro3Text}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Intro;

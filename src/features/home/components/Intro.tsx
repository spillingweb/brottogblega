import { tinaField } from "tinacms/tina-field";
import type { PagesHomepage } from "../../../../tina/__generated__/types";

// const IntroArray = [
//   {
//     num: "01",
//     title: "Kropp",
//     text: "Fysioterapi og bevegelsesveiledning tilpasset kvinner i alle livsfaser.",
//   },
//   {
//     num: "02",
//     title: "Sinn",
//     text: "Filosofisk terapi og dialog som skaper rom for refleksjon og mening.",
//   },
//   {
//     num: "03",
//     title: "Fellesskap",
//     text: "Seminarer og samtalegrupper hvor kvinner møtes og støtter hverandre.",
//   },
// ];

const Intro = ({ page }: { page: PagesHomepage }) => {
  // const introArray = [
  //   {
  //     title: page.intro1Title,
  //     text: page.intro1Text,
  //   },
  //   {
  //     title: page.intro2Title,
  //     text: page.intro2Text,
  //   },
  //   {
  //     title: page.intro3Title,
  //     text: page.intro3Text,
  //   },
  // ];
  return (
    <section className="bg-secondary py-14 md:py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
          {/* Intro 1 */}
            <div className="flex gap-5">
              <span className="text-xs font-medium text-primary/40 pt-1 select-none">
                01
              </span>
              <div>
                <h3
                  className="text-lg mb-2"
                  style={{ fontFamily: "'Lora', serif" }}
                  data-tina-field={tinaField(page, "intro1Title")}
                >
                  {page.intro1Title}
                </h3>
                <p
                  className="text-sm text-muted-foreground leading-relaxed"
                  data-tina-field={tinaField(page, "intro1Text")}
                >
                  {page.intro1Text}
                </p>
              </div>
            </div>

            {/* Intro 2 */}
             <div className="flex gap-5">
              <span className="text-xs font-medium text-primary/40 pt-1 select-none">
                02
              </span>
              <div>
                <h3
                  className="text-lg mb-2"
                  style={{ fontFamily: "'Lora', serif" }}
                  data-tina-field={tinaField(page, "intro2Title")}
                >
                  {page.intro2Title}
                </h3>
                <p
                  className="text-sm text-muted-foreground leading-relaxed"
                  data-tina-field={tinaField(page, "intro2Text")}
                >
                  {page.intro2Text}
                </p>
              </div>
            </div>

            {/* Intro 3 */}
            <div className="flex gap-5">
              <span className="text-xs font-medium text-primary/40 pt-1 select-none">
                03
              </span>
              <div>
                <h3
                  className="text-lg mb-2"
                  style={{ fontFamily: "'Lora', serif" }}
                  data-tina-field={tinaField(page, "intro3Title")}
                >
                  {page.intro3Title}
                </h3>
                <p
                  className="text-sm text-muted-foreground leading-relaxed"
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

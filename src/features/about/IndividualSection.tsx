import Heading from "#/components/ui/Heading";
import Kicker from "#/components/ui/Kicker";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import type { PagesAbout } from "../../../tina/__generated__/types";
import { tinaField } from "tinacms/tina-field";
import { cn } from "#/lib/utils";

type IndividualProps = {
  id: string;
  page: PagesAbout;
  isHilde?: boolean;
};

const IndividualSection = ({ id, page, isHilde = false }: IndividualProps) => {
  // Determine which individual's data to use based on the isHilde prop
  const { title, kicker, imgSrc, content, keywords } = isHilde
    ? {
        title: page.hildeTitle,
        kicker: page.hildeKicker,
        imgSrc: page.hildeImage,
        content: page.hildeContent,
        keywords: page.hildeKeywords,
      }
    : {
        title: page.tinaMariaTitle,
        kicker: page.tinaMariaKicker,
        imgSrc: page.tinaMariaImage,
        content: page.tinaMariaContent,
        keywords: page.tinaMariaKeywords,
      };

  return (
    <section
      id={id}
      className="scroll-mt-20 max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
    >
      <div className={cn("aspect-3/4 rounded-sm overflow-hidden", isHilde ? "" : "order-2 md:order-1")}>
        <img
          src={imgSrc || ""}
          alt={`Bilde av ${title}`}
          className="w-full h-full object-cover object-top"
          data-tina-field={tinaField(
            page,
            isHilde ? "hildeImage" : "tinaMariaImage",
          )}
        />
      </div>
      <div>
        <Kicker
          className="mb-2"
          data-tina-field={tinaField(
            page,
            isHilde ? "hildeKicker" : "tinaMariaKicker",
          )}
        >
          {kicker}
        </Kicker>
        <Heading
          level={2}
          className="md:text-4xl mb-5"
          data-tina-field={tinaField(
            page,
            isHilde ? "hildeTitle" : "tinaMariaTitle",
          )}
        >
          {title}
        </Heading>
        <div
          className="text-sm md:text-base text-muted-foreground leading-relaxed flex flex-col gap-4"
          data-tina-field={tinaField(
            page,
            isHilde ? "hildeContent" : "tinaMariaContent",
          )}
        >
          <TinaMarkdown content={content} />
        </div>
        {keywords && keywords.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {keywords
              .filter(
                (keyword): keyword is NonNullable<typeof keyword> =>
                  keyword !== null,
              )
              .map((item, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-xs bg-secondary text-secondary-foreground rounded-sm"
                  data-tina-field={tinaField(item, "keyword")}
                >
                  {item.keyword}
                </span>
              ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default IndividualSection;

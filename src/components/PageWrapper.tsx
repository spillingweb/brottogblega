import type { PagesStandard } from "../../tina/__generated__/types";
import { tinaField } from "tinacms/tina-field";
import Heading from "./ui/Heading";
import Kicker from "./ui/Kicker";
import ScrollToTopButton from "./ScrollToTopButton";

const PageWrapper = ({
  kicker,
  page,
  children,
}: {
  kicker: string;
  page: PagesStandard;
  children?: React.ReactNode;
}) => {
  return (
    <div className="pt-28">
      <section className="max-w-6xl mx-auto px-6 py-8 md:py-10">
        <Kicker className="mb-4">{kicker}</Kicker>
        <Heading
          level={1}
          className="md:text-5xl max-w-2xl leading-tight mb-6"
          data-tina-field={tinaField(page, "title")}
        >
          {page.title}
        </Heading>
        <p
          className="text-base text-muted-foreground leading-relaxed max-w-xl"
          data-tina-field={tinaField(page, "intro")}
        >
          {page.intro}
        </p>
      </section>
      {children}
      <ScrollToTopButton />
    </div>
  );
};

export default PageWrapper;

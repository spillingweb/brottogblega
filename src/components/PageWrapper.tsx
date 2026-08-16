import type { PagesStandard } from "../../tina/__generated__/types";
import { tinaField } from "tinacms/tina-field";
import Heading from "./ui/Heading";
import Kicker from "./ui/Kicker";
import ScrollToTopButton from "./ScrollToTopButton";
import { cn } from "#/lib/utils";
import { useLocation } from "@tanstack/react-router";

const PageWrapper = ({
  kicker,
  page,
  children,
}: {
  kicker: string;
  page: PagesStandard;
  children?: React.ReactNode;
}) => {
  // Check route if the page is a news article, if so, add a class to the wrapper to hide the scroll to top button
  const location = useLocation();
  const isNewsArticle = location.pathname.startsWith("/aktuelt/");

  return (
    <div className={cn("pt-20 lg:pt-50", isNewsArticle && "print:hidden")}>
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

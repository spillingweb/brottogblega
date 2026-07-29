import CallToAction from "#/components/CallToAction";
import ContactDialog from "#/components/ContactDialog";
import { tinaField } from "tinacms/tina-field";
import AboutTeaser from "./AboutTeaser";
import Hero from "./Hero";
import Intro from "./Intro";
import NewsTeaser from "./NewsTeaser";
import ServicesTeaser from "./ServicesTeaser";
import type { PagesHomepage, PagesQuery } from "../../../../tina/__generated__/types";

const Home = ({ pageData }: { pageData: PagesQuery }) => {
  const page = pageData.pages as PagesHomepage;

  return (
    <div>
      <Hero page={page} />
      <Intro page={page} />
      <AboutTeaser page={page} />
      <ServicesTeaser page={page} />
      <NewsTeaser page={page} />
      <CallToAction
        title={page.ctaTitle || "Klar til å ta et skritt mot bedre helse?"}
        headingClass="md:text-4xl"
        description={
          page.ctaDescription ||
          "Ta kontakt for en uforpliktende samtale. Vi er her for deg."
        }
        dataTitle={tinaField(page, "ctaTitle")}
        dataDescription={tinaField(page, "ctaDescription")}
        btnText="Send oss en melding"
        dialog={<ContactDialog />}
      />
    </div>
  );
};

export default Home;

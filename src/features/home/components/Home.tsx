import CallToAction from "#/components/CallToAction";
import ContactDialog from "#/components/ContactDialog";
import { tinaField } from "tinacms/tina-field";
import AboutTeaser from "./AboutTeaser";
import Hero from "./Hero";
import Intro from "./Intro";
import NewsTeaser from "./NewsTeaser";
import ServicesTeaser from "./ServicesTeaser";
import type {
  PagesHomepage,
  PagesQuery,
  ServicesConnectionQuery,
} from "../../../../tina/__generated__/types";

const Home = ({
  pageData,
  servicesData,
}: {
  pageData: PagesQuery;
  servicesData: ServicesConnectionQuery;
}) => {
  const page = pageData.pages as PagesHomepage;

  return (
    <div>
      <Hero page={page} />
      <Intro page={page} />
      <AboutTeaser page={page} />
      <ServicesTeaser page={page} servicesData={servicesData} />
      <NewsTeaser page={page} />
      <CallToAction
        className="anim-scroll"
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

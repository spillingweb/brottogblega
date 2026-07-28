import CallToAction from "#/components/CallToAction";
import ContactDialog from "#/components/ContactDialog";
import type { PagesHomepage, PagesQuery } from "../../../../tina/__generated__/types";
import AboutTeaser from "./AboutTeaser";
import Hero from "./Hero";
import Intro from "./Intro";
import ServicesTeaser from "./ServicesTeaser";

const Home = ({ pageData }: { pageData: PagesQuery }) => {
  const page = pageData.pages as PagesHomepage;

  return (
    <div>
      <Hero page={page} />
      <Intro page={page} />
      <AboutTeaser page={page} />
      <ServicesTeaser />
      <CallToAction
        title="Klar til å ta et skritt mot bedre helse?"
        headingClass="md:text-4xl"
        description="Ta kontakt for en uforpliktende samtale. Vi er her for deg."
        btnText="Send oss en melding"
        dialog={<ContactDialog />}
      />
    </div>
  );
};

export default Home;

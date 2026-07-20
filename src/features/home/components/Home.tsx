import CallToAction from "#/components/CallToAction";
import ContactDialog from "#/components/ContactDialog";
import AboutTeaser from "./AboutTeaser";
import Hero from "./Hero";
import Intro from "./Intro";
import ServicesTeaser from "./ServicesTeaser";

const Home = () => {
  return (
    <div>
      <Hero />
      <Intro />
      <AboutTeaser />
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

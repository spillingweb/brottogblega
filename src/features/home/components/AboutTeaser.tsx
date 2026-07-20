import { Button } from "#/components/ui/button";
import Heading from "#/components/ui/Heading";
import UppercaseHeading from "#/components/ui/UppercaseHeading";
import { Link } from "@tanstack/react-router";

const AboutTeaser = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="relative">
          <div className="aspect-4/5 rounded-sm overflow-hidden bg-secondary">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=700&h=875&fit=crop&auto=format"
              alt="To kvinner i rolig, profesjonell samtale"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-5 -right-5 w-32 h-32 bg-accent rounded-sm hidden md:block" />
        </div>
        <div>
          <UppercaseHeading className="text-primary mb-4">
            Om oss
          </UppercaseHeading>
          <Heading level={2}
            className="md:text-4xl mb-6 leading-snug"
          >
            To kvinner, én felles visjon
          </Heading>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-4">
            Kari er fysioterapeut med spesialkompetanse i kvinnehelse,
            bekkenbunn og livsfaser. Ingrid er sykepleier og filosof med
            fordypning i eksistensiell og fenomenologisk tenkning.
          </p>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-8">
            Sammen tilbyr vi en helhetlig tilnærming der kropp og sinn sees i
            sammenheng — fordi vi tror at ekte velvære krever begge deler.
          </p>
          <Button variant="link" className="p-0 h-fit" asChild>
            <Link to="/om-oss">
              Les mer om oss
              <span>→</span>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AboutTeaser;

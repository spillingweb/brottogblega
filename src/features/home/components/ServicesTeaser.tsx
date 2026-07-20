import { Button } from "#/components/ui/button";
import Heading from "#/components/ui/Heading";
import UppercaseHeading from "#/components/ui/UppercaseHeading";
import { Link } from "@tanstack/react-router";
import ServiceCard from "./ServiceCard";

export type Service = {
  label: string;
  desc: string;
  img: string;
};

const DUMMY_SERVICES = [
  {
    label: "Fysioterapi",
    desc: "Individuell vurdering og behandling av bekken, kropp og bevegelse.",
    img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop&auto=format",
  },
  {
    label: "Filosofisk samtale",
    desc: "En-til-en dialog som utforsker livsspørsmål, mening og identitet.",
    img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&auto=format",
  },
  {
    label: "Dialoggrupper",
    desc: "Ukentlige grupper for kvinner som ønsker fellesskap og refleksjon.",
    img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=300&fit=crop&auto=format",
  },
  {
    label: "Seminarer",
    desc: "Dagsarrangementer og kurs om temaer som berører kvinner direkte.",
    img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=300&fit=crop&auto=format",
  },
];

const ServicesTeaser = () => {
  return (
    <section className="bg-muted py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-14">
          <div>
            <UppercaseHeading className="text-primary mb-4">
              Tjenester
            </UppercaseHeading>
            <Heading level={2} className="md:text-4xl">
              Hva vi tilbyr
            </Heading>
          </div>
          <Button variant="link" className="p-0 h-fit" asChild>
            <Link to="/tjenester">
              Se alle tjenester <span> →</span>
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
          {DUMMY_SERVICES.map((s) => (
            <ServiceCard key={s.label} service={s} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesTeaser;

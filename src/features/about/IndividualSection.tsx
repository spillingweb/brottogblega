import Heading from "#/components/ui/Heading";
import UppercaseHeading from "#/components/ui/UppercaseHeading";
import type React from "react";

type IndividualProps = {
  id: string;
  imgSrc: string;
  profession: string;
  name: string;
  description: React.ReactNode;
  quote: string;
  keywords: string[];
};

const IndividualSection = ({
  id,
  imgSrc,
  profession,
  name,
  description,
  quote,
  keywords,
}: IndividualProps) => {
  return (
    <section
      id={id}
      className="scroll-mt-24 max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
    >
      <div className="aspect-3/4 rounded-sm overflow-hidden bg-secondary">
        <img
          src={imgSrc}
          alt={`${name}, ${profession}`}
          className="w-full h-full object-cover object-top"
        />
      </div>
      <div>
        <UppercaseHeading className="mb-2">{profession}</UppercaseHeading>
        <Heading level={2} className="md:text-4xl mb-5">
          {name}
        </Heading>
        <div className="text-sm md:text-base text-muted-foreground leading-relaxed flex flex-col gap-4">
          {description}
          <p className="italic">«{quote}»</p>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {keywords.map((t) => (
            <span
              key={t}
              className="px-3 py-1 text-xs bg-secondary text-secondary-foreground rounded-sm"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndividualSection;

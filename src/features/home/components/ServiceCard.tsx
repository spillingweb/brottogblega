import { Card, CardDescription, CardTitle } from "#/components/ui/card";
import { tinaField } from "tinacms/tina-field";
import type { Services } from "../../../../tina/__generated__/types";

const ServiceCard = ({ service }: { service: Services }) => {
  return (
    <Card className="group pt-0 anim-scroll">
      {service.image && (
        <div
          className="aspect-4/3 overflow-hidden bg-secondary"
          data-tina-field={tinaField(service, "image")}
        >
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}
      <div className="p-5">
        <CardTitle
          className="text-base mb-2 font-serif"
          data-tina-field={tinaField(service, "title")}
        >
          {service.title}
        </CardTitle>
        <CardDescription
          className="text-xs text-muted-foreground leading-relaxed"
          data-tina-field={tinaField(service, "description")}
        >
          {service.description}
        </CardDescription>
      </div>
    </Card>
  );
};

export default ServiceCard;

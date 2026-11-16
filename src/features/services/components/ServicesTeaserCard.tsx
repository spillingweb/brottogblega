import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "#/components/ui/card";
import { tinaField } from "tinacms/tina-field";
import type { Services } from "../../../../tina/__generated__/types";

const ServicesTeaserCard = ({ service }: { service: Services }) => {
  return (
    <Card className="pt-0 h-full hover:shadow-md transition-shadow duration-300 motion-safe:anim-scroll ">
      {service.image && (
        <div
          className="aspect-4/3 overflow-hidden bg-secondary"
          data-tina-field={tinaField(service, "image")}
        >
          <img
            src={service.image}
            alt={service.title}
            sizes="100vw"
            className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
            data-tina-field={tinaField(service, "image")}
          />
        </div>
      )}
      <CardHeader className="mt-3">
        <CardTitle data-tina-field={tinaField(service, "title")}>
          {service.title}
        </CardTitle>
      </CardHeader>
      <CardContent
        className="text-muted-foreground group-hover/card:text-foreground/90 transition-colors leading-relaxed flex-1"
        data-tina-field={tinaField(service, "description")}
      >
        {service.description}
      </CardContent>
      <CardFooter className="text-muted-foreground group-hover/card:text-foreground/90 transition-colors">
        Detaljer
        <span className="ml-1 group-hover/card:translate-x-1 transition-transform">
          →
        </span>
      </CardFooter>
    </Card>
  );
};

export default ServicesTeaserCard;

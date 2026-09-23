import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "#/components/ui/card";
import { tinaField } from "tinacms/tina-field";
import type { Services } from "../../../../tina/__generated__/types";
import { OptimizedImage } from "#/components/ui/OptimizedImage";
import { Link } from "@tanstack/react-router";

const ServiceCard = ({ service }: { service: Services }) => {
  return (
    <Link
      to="/tjenester"
      hash={service.title.toLowerCase()}
      hashScrollIntoView
      className="text-xs text-muted-foreground/80 hover:text-muted-foreground transition-colors"
    >
      <Card className="pt-0 anim-scroll h-full hover:shadow-md transition-shadow duration-300">
        {service.image && (
          <div
            className="aspect-4/3 overflow-hidden bg-secondary"
            data-tina-field={tinaField(service, "image")}
          >
            <OptimizedImage
              src={service.image}
              alt={service.title}
              defaultWidth={1200} // High resolution starting point if srcSet isn't evaluated
              sizes="100vw"
              className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
              data-tina-field={tinaField(service, "image")}
            />
          </div>
        )}
        <CardHeader className="mt-3">
          <CardTitle
            data-tina-field={tinaField(service, "title")}
          >
            {service.title}
          </CardTitle>
        </CardHeader>
        <CardContent
          className="text-xs text-muted-foreground leading-relaxed flex-1"
          data-tina-field={tinaField(service, "description")}
        >
          {service.description}
        </CardContent>
        <CardFooter className="text-muted-foreground/90 group-hover/card:text-muted-foreground transition-colors">
          Detaljer
          <span className="ml-1 group-hover/card:translate-x-1 transition-transform">
            →
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ServiceCard;

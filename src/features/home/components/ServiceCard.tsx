import { Card, CardDescription, CardTitle } from "#/components/ui/card";
import type { Service } from "./ServicesTeaser";

const ServiceCard = ({ service }: { service: Service }) => {
  return (
    <Card className="pt-0">
      <div className="aspect-4/3 overflow-hidden bg-secondary">
        <img
          src={service.img}
          alt={service.label}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-5">
        <CardTitle
          className="text-base mb-2"
          style={{ fontFamily: "'Lora', serif" }}
        >
          {service.label}
        </CardTitle>
        <CardDescription className="text-xs text-muted-foreground leading-relaxed">
          {service.desc}
        </CardDescription>
      </div>
    </Card>
  );
};

export default ServiceCard;

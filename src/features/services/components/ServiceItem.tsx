import ContactDialog from "#/components/ContactDialog";
import { Button } from "#/components/ui/button";
import { Card } from "#/components/ui/card";
import { Dialog, DialogTrigger } from "#/components/ui/dialog";
import Heading from "#/components/ui/Heading";
import Kicker from "#/components/ui/Kicker";
import { tinaField } from "tinacms/tina-field";
import type { Services } from "../../../../tina/__generated__/types";

const ServiceItem = ({
  service,
  index,
}: {
  service: Services;
  index: number;
}) => {
  // Get the service ID from the filename or generate it from the title
  const serviceId = (service as Services & { _sys?: { filename?: string } })?._sys?.filename
    ? (service as Services & { _sys?: { filename?: string } })?._sys?.filename.replace(
        /\.[^/.]+$/, "",
      )
    : (service.title || "tjeneste")

  return (
    <Card id={serviceId} className="p-0 scroll-mt-28">
      <section className="grid grid-cols-1 lg:grid-cols-2 items-stretch gap-0 overflow-hidden">
        <div
          className={`${index % 2 === 1 ? "lg:order-2" : ""} min-h-64 lg:min-h-0`}
        >
          <div className="relative h-full min-h-64 lg:min-h-0 overflow-hidden bg-secondary">
            <img
              src={service.image || ""}
              alt={service.title}
              className="absolute inset-0 h-full w-full object-cover"
              data-tina-field={tinaField(service, "image")}
            />
          </div>
        </div>
        <div className={`p-5 lg:p-7 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
          <Kicker
            className="mb-2"
            data-tina-field={tinaField(service, "category")}
          >
            {service.category}
          </Kicker>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-6 mb-4">
            <div className="max-w-2xl">
              <Heading
                level={2}
                className="mb-1"
                data-tina-field={tinaField(service, "title")}
              >
                {service.title}
              </Heading>
              <p
                className="text-sm text-muted-foreground italic"
                data-tina-field={tinaField(service, "tagline")}
              >
                {service.tagline}
              </p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>Bestill time</Button>
              </DialogTrigger>
              <ContactDialog />
            </Dialog>
          </div>
          <p
            className="text-sm text-foreground/80 leading-relaxed mb-5 max-w-3xl"
            data-tina-field={tinaField(service, "description")}
          >
            {service.description}
          </p>
          {service.offers && service.offers.length > 0 && (
            <div className="divide-y divide-border rounded-2xl border border-border/70 bg-background/75">
              {service.offers.map((offer) => {
                if (!offer) return null;
                return (
                  <div
                    key={offer.title}
                    className="flex items-center justify-between gap-4 px-4 py-3.5"
                  >
                    <div className="min-w-0">
                      <p
                        className="text-sm font-medium text-foreground leading-tight text-balance"
                        data-tina-field={tinaField(offer, "title")}
                      >
                        {offer.title}
                      </p>
                    </div>
                    <span
                      className="text-sm font-semibold text-primary whitespace-nowrap"
                      data-tina-field={tinaField(offer, "price")}
                    >
                      {offer.price}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </Card>
  );
};
export default ServiceItem;

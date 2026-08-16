import { Calendar, MapPin, Clock } from "lucide-react";
import { spotsColor } from "../utils";
import { Dialog } from "#/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "#/components/ui/button";
import ContactDialog from "#/components/ContactDialog";
import { Card } from "#/components/ui/card";
import Heading from "#/components/ui/Heading";
import type { Events } from "../../../../tina/__generated__/types";
import { tinaField } from "tinacms/tina-field";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { cn } from "#/lib/utils";

const EventItem = ({
  event,
  categoryLabel,
}: {
  event: Events;
  categoryLabel?: string;
}) => {
  const month = new Date(event.date).toLocaleString("nb-NO", {
    month: "short",
  });
  const day = new Date(event.date).getDate();

  const startDate = new Date(event.date).toLocaleDateString("nb-NO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const endDate = event.endDate
    ? new Date(event.endDate).toLocaleDateString("nb-NO", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  // Displayed date format for the event, if start and end dates are the same month, only show the day for the start date
  const monthsEqual = event.endDate
    ? new Date(event.date).getMonth() === new Date(event.endDate).getMonth()
    : false;

  const formattedDate = endDate
    ? monthsEqual
      ? `${day} - ${endDate}`
      : `${startDate} - ${endDate}`
    : startDate;

  return (
    <article>
      <Card className="group grid grid-cols-1 md:grid-cols-[200px_1fr] py-0  @container">
        {/* Image */}
        <div
          className="relative md:h-auto h-48 overflow-hidden bg-secondary"
          data-tina-field={tinaField(event, "image")}
        >
          {event.image && (
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          )}
          <div className="absolute inset-0 bg-primary/20" />
          <div
            className="absolute bottom-0 left-0 right-0 p-4 text-white"
            data-tina-field={tinaField(event, "date")}
          >
            <p
              className="text-3xl font-medium leading-none"
              style={{ fontFamily: "'Lora', serif" }}
            >
              {day}
            </p>
            <p className="text-xs tracking-widest uppercase mt-0.5 opacity-80">
              {month}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 flex flex-col justify-between gap-5">
          <div>
            <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
              <div className="flex flex-wrap gap-1.5">
                {categoryLabel && (
                  <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 bg-primary text-primary-foreground rounded-sm font-medium">
                    {categoryLabel}
                  </span>
                )}
                {event.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] uppercase tracking-wider px-2 py-0.5 bg-secondary text-primary rounded-sm"
                    data-tina-field={tinaField(event, "tags")}
                  >
                    {t}
                  </span>
                ))}
              </div>
              <span
                className={cn(
                  "text-xs px-2 py-0.5 rounded-sm font-medium",
                  spotsColor(event.spots),
                )}
                data-tina-field={tinaField(event, "spots")}
              >
                {event.spots}
              </span>
            </div>
            <Heading
              level={2}
              className="md:text-2xl mb-2"
              data-tina-field={tinaField(event, "title")}
            >
              {event.title}
            </Heading>
            <div
              className="text-sm text-muted-foreground leading-relaxed mb-4"
              data-tina-field={tinaField(event, "description")}
            >
              <TinaMarkdown content={event.description} />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <div
                className="flex items-center gap-1.5 text-xs text-muted-foreground text-balance"
                data-tina-field={tinaField(event, "date")}
              >
                <Calendar size={13} />
                <span>{formattedDate}</span>
              </div>
              <div
                className="flex items-center gap-1.5 text-xs text-muted-foreground text-balance"
                data-tina-field={tinaField(event, "time")}
              >
                <Clock size={13} />
                <span>{event.time}</span>
              </div>
              <div
                className="flex items-center gap-1.5 text-xs text-muted-foreground col-span-2 md:col-span-1 text-balance"
                data-tina-field={tinaField(event, "location")}
              >
                <MapPin size={13} />
                <span>{event.location}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between border-t border-border pt-5">
            <div className="flex flex-col @sm:flex-row @sm:items-center @sm:gap-2 text-sm text-muted-foreground">
              <span
                className="text-base font-medium text-foreground"
                data-tina-field={tinaField(event, "price")}
              >
                {event.price}
              </span>
              <span className="hidden @sm:block">·</span>
              <span
                className="text-xs text-muted-foreground"
                data-tina-field={tinaField(event, "host")}
              >
                {event.host}
              </span>
            </div>
            <Dialog>
              <DialogTrigger className="cursor-pointer" asChild>
                <Button>Meld deg på</Button>
              </DialogTrigger>
              <ContactDialog />
            </Dialog>
          </div>
        </div>
      </Card>
    </article>
  );
};

export default EventItem;

import type { Event } from "../constants";
import { Calendar, MapPin, Clock } from "lucide-react";
import { spotsColor } from "../utils";
import { Dialog } from "#/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "#/components/ui/button";
import ContactDialog from "#/components/ContactDialog";
import { Card } from "#/components/ui/card";
import Heading from "#/components/ui/Heading";

const EventItem = ({ event }: { event: Event }) => {
  return (
    <article>
      <Card className="group grid grid-cols-1 md:grid-cols-[200px_1fr] py-0">
        {/* Image */}
        <div className="relative md:h-auto h-48 overflow-hidden bg-secondary">
          <img
            src={event.img}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-primary/20" />
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <p
              className="text-3xl font-medium leading-none"
              style={{ fontFamily: "'Lora', serif" }}
            >
              {event.day}
            </p>
            <p className="text-xs tracking-widest uppercase mt-0.5 opacity-80">
              {event.month}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 flex flex-col justify-between gap-5">
          <div>
            <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
              <div className="flex flex-wrap gap-1.5">
                {event.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] uppercase tracking-wider px-2 py-0.5 bg-secondary text-primary rounded-sm"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <span
                className={`text-xs px-2 py-0.5 rounded-sm font-medium ${spotsColor(event.spotsLeft)}`}
              >
                {event.spots}
              </span>
            </div>
            <Heading level={2} className="md:text-2xl mb-2">
              {event.title}
            </Heading>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              {event.desc}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Calendar size={13} />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock size={13} />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground col-span-2 md:col-span-1">
                <MapPin size={13} />
                <span>{event.location}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between border-t border-border pt-5">
            <div>
              <span className="text-base font-medium text-foreground">
                {event.price}
              </span>
              <span className="text-xs text-muted-foreground ml-2">
                · {event.host}
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

import { Button } from "#/components/ui/button";
import { Dialog, DialogTrigger } from "#/components/ui/dialog";
import { cn } from "#/lib/utils";
import Heading from "./ui/Heading";
import Kicker from "./ui/Kicker";

const CallToAction = ({
  className,
  smallHeading,
  headingClass,
  title,
  description,
  btnText,
  dialog,
  dataTitle,
  dataDescription,
}: {
  className?: string;
  smallHeading?: string;
  headingClass?: string;
  title: string;
  description: string;
  btnText: string;
  dialog: React.ReactNode;
  dataTitle?: string;
  dataDescription?: string;
}) => {
  return (
    <section
      className={cn("py-20 md:py-28 text-center bg-secondary", className)}
    >
      <div className="max-w-xl mx-auto px-6">
        {smallHeading && <Kicker>{smallHeading}</Kicker>}
        <Heading
          level={2}
          className={cn("mb-5", headingClass)}
          data-tina-field={dataTitle}
        >
          {title}
        </Heading>
        <p
          className="text-muted-foreground text-sm leading-relaxed mb-8 text-balance"
          data-tina-field={dataDescription}
        >
          {description}
        </p>
        <Dialog>
          <DialogTrigger className="cursor-pointer" asChild>
            <Button size="lg">{btnText}</Button>
          </DialogTrigger>
          {dialog}
        </Dialog>
      </div>
    </section>
  );
};

export default CallToAction;

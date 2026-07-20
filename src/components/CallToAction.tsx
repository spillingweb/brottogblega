import { Button } from "#/components/ui/button";
import { Dialog, DialogTrigger } from "#/components/ui/dialog";
import { cn } from "#/lib/utils";
import Heading from "./ui/Heading";
import UppercaseHeading from "./ui/UppercaseHeading";

const CallToAction = ({
  className,
  smallHeading,
  headingClass,
  title,
  description,
  btnText,
  dialog,
}: {
  className?: string;
  smallHeading?: string;
  headingClass?: string;
  title: string;
  description: string;
  btnText: string;
  dialog: React.ReactNode;
}) => {
  return (
    <section className={cn("py-20 md:py-28 text-center", className)}>
      <div className="max-w-xl mx-auto px-6">
        {smallHeading && <UppercaseHeading>{smallHeading}</UppercaseHeading>}
        <Heading level={2} className={cn("mb-5", headingClass)}>
          {title}
        </Heading>
        <p className="text-muted-foreground text-sm leading-relaxed mb-8 text-balance">
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

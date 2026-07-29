import { cn } from "#/lib/utils";

const Kicker = ({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <p
      className={cn(
        "uppercase tracking-widest text-xs text-primary",
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
};

export default Kicker;

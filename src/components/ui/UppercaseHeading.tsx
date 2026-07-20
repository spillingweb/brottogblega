import { cn } from "#/lib/utils";

const UppercaseHeading = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <p className={cn("uppercase tracking-widest text-xs text-primary", className)}>
      {children}
    </p>
  );
};

export default UppercaseHeading;

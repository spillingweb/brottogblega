import { cn } from "#/lib/utils";
import { Link } from "@tanstack/react-router";

const NavLink = ({
  to,
  children,
  className,
  activeProps,
}: {
  to: string;
  children: React.ReactNode;
  className?: string;
  activeProps?: string;
}) => {
  return (
    <Link
      to={to}
      activeProps={{
        className: cn(
          "text-primary font-medium",
          activeProps,
        ),
      }}
      className={`text-foreground/70 hover:text-foreground transition-colors duration-300 ${className}`}
    >
      {children}
    </Link>
  );
};

export default NavLink;

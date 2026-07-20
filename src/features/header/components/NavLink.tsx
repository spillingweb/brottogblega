import { Link } from "@tanstack/react-router"

const NavLink = ({ to, children, className }: any) => {
  return (
    <Link
        to={to}
        activeProps={{ className: "text-primary" }}
        className={`text-foreground/70 hover:text-foreground transition-colors duration-300 ${className}`}
      >
        {children}
    </Link>
  );
}

export default NavLink;
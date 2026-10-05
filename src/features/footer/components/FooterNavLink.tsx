import { Link } from "@tanstack/react-router";

const FooterNavLink = ({ path, label }: { path: string; label: string }) => {
  return (
    <li>
      <Link
        to={path}
        className="hover:text-primary-foreground/80 transition-colors"
        activeProps={{
          className: "text-primary-foreground font-medium",
        }}
      >
        {label}
      </Link>
    </li>
  );
};

export default FooterNavLink;

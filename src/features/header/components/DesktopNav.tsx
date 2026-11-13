import { Button } from "#/components/ui/button";
import { DialogTrigger } from "#/components/ui/dialog";
import { Link } from "@tanstack/react-router";
import NavLink from "./NavLink";
import { navLinks } from "#/lib/constants";
import { useServiceLinks } from "../hooks";

const DesktopNav = () => {
  const serviceLinks = useServiceLinks();

  return (
    <nav
      aria-label="desktop"
      className="hidden lg:flex items-center gap-8 self-start py-2"
    >
      <ul className="flex items-center gap-8">
        {navLinks.map((link) => (
          <li key={link.to} className="relative group">
            {link.to === "/tjenester" ? (
              <>
                <div className="flex items-center gap-1">
                  <NavLink
                    to={link.to}
                    className="text-sm lg:text-base tracking-wide text-foreground/70 hover:text-primary"
                    activeProps="border-b border-primary pb-0.5"
                  >
                    {link.label}
                  </NavLink>
                  <span className="text-xs text-foreground/60 transition-transform duration-200 group-hover:rotate-180">
                    ▾
                  </span>
                </div>
                <div className="invisible absolute left-0 top-full pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                  <div className="min-w-56 rounded-xl border border-border bg-white/95 p-2 shadow-lg backdrop-blur-sm">
                    {serviceLinks.map((service) => (
                      <Link
                        key={service.id}
                        to="/tjenester"
                        hash={service.id}
                        className="block rounded-md px-3 py-2 text-sm text-foreground/80 transition-colors hover:bg-muted hover:text-primary"
                      >
                        {service.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <NavLink
                to={link.to}
                className="text-sm lg:text-base tracking-wide text-foreground/70 hover:text-primary"
                activeProps="border-b border-primary pb-0.5"
              >
                {link.label}
              </NavLink>
            )}
          </li>
        ))}
      </ul>
      <DialogTrigger className="cursor-pointer" asChild>
        <Button size="sm">Kontakt oss</Button>
      </DialogTrigger>
    </nav>
  );
};

export default DesktopNav;

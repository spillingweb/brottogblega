import { Link, useLocation } from "@tanstack/react-router";
import NavLink from "#/features/header/components/NavLink";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Dialog, DialogTrigger } from "../../../components/ui/dialog";
import ContactDialog from "../../../components/ContactDialog";
import { navLinks } from "#/lib/constants";
import { useServiceLinks } from "../hooks";
import { cn } from "#/lib/utils";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const serviceLinks = useServiceLinks();
  const location = useLocation();

  // Close the mobile menu when the location changes,
  // for example when clicking on the link to a new page
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const viewport = document.querySelector<HTMLElement>("[data-slot='scroll-area-viewport']");
    const target = viewport ?? window;
    const getScrollTop = () => (viewport ? viewport.scrollTop : window.scrollY);
    const checkScroll = () => setScrolled(getScrollTop() > 20);
    checkScroll();
    target.addEventListener("scroll", checkScroll);
    return () => target.removeEventListener("scroll", checkScroll);
  }, []);

  return (
    <header className={`transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-sm shadow-sm" : ""} sticky top-0 z-50 print:hidden`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/">
          <img
            src="/brottogblega_logo.svg"
            alt="Brott og Blega logo"
            className={cn(
              "w-auto text-primary transition-all duration-300",
              scrolled ? "h-10" : "h-10 lg:h-25 lg:pt-4",
            )}
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-8 self-start py-2">
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
          <Dialog open={contactOpen} onOpenChange={setContactOpen}>
            <DialogTrigger className="cursor-pointer" asChild>
              <Button size="sm">Kontakt oss</Button>
            </DialogTrigger>
            <ContactDialog />
          </Dialog>
        </nav>

        <button
          className="lg:hidden relative flex h-8 w-8 items-center justify-center text-primary transition-transform duration-300"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Meny"
        >
          <span className="relative flex h-5 w-5 items-center justify-center">
            <Menu
              size={22}
              className={`absolute transition-all duration-300 ${
                menuOpen ? "rotate-45 opacity-0" : "rotate-0 opacity-100"
              }`}
            />
            <X
              size={22}
              className={`absolute transition-all duration-300 ${
                menuOpen ? "rotate-0 opacity-100" : "-rotate-45 opacity-0"
              }`}
            />
          </span>
        </button>
      </div>

      <div
        className={`lg:hidden overflow-hidden border-t border-border bg-white/95 backdrop-blur-sm transition-all duration-300 ease-out ${
          menuOpen
            ? "max-h-96 opacity-100"
            : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`px-6 py-6 transition-all duration-300 ease-out ${
            menuOpen ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
          }`}
        >
          <ul className="flex flex-col gap-5 mb-10">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className="text-xl tracking-wide text-foreground/70 hover:text-primary"
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <Dialog open={contactOpen} onOpenChange={setContactOpen}>
            <DialogTrigger asChild>
              <Button className="text-xl" size="lg">
                Kontakt oss
              </Button>
            </DialogTrigger>
            <ContactDialog />
          </Dialog>
        </div>
      </div>
    </header>
  );
};

export default Header;

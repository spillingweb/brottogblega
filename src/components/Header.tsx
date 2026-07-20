import { Link, useLocation } from "@tanstack/react-router";
import Logo from "./Logo";
import NavLink from "#/features/header/components/NavLink";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogTrigger } from "./ui/dialog";
import ContactDialog from "./ContactDialog";
import { navLinks } from "#/lib/constants";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 pt-6 pb-4 flex items-start justify-between">
        <Link to="/" className="leading-none">
          <Logo
            className={`w-auto text-primary transition-all duration-300 ${
              scrolled ? "h-10" : "h-20 md:max-lg:h-10"
            }`}
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8 self-start">
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className="text-sm tracking-wide text-foreground/70 hover:text-primary"
                  activeProps="border-b border-primary pb-0.5"
                >
                  {link.label}
                </NavLink>
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
          className="md:hidden text-primary self-start"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Meny"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-border px-6 py-6">
          <ul className="flex flex-col gap-5 mb-7">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className="text-md tracking-wide text-foreground/70 hover:text-primary"
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <Dialog open={contactOpen} onOpenChange={setContactOpen}>
            <DialogTrigger asChild>
              <Button className="w-fit">Kontakt oss</Button>
            </DialogTrigger>
            <ContactDialog />
          </Dialog>
        </div>
      )}
    </header>
  );
};

export default Header;

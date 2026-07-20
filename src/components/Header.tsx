import { Link, useLocation } from "@tanstack/react-router";
import Logo from "./Logo";
import NavLink from "#/features/header/components/NavLink";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogTrigger } from "./ui/dialog";
import ContactDialog from "./ContactDialog";

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

  const navLinks = [
    { to: "/", label: "Hjem" },
    { to: "/om-oss", label: "Om oss" },
    { to: "/tjenester", label: "Tjenester" },
    { to: "/arrangementer", label: "Arrangementer" },
    { to: "/aktuelt", label: "Aktuelt" },
  ];

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
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className="text-sm tracking-wide text-foreground/70 hover:text-primary"
            >
              {link.label}
            </NavLink>
          ))}
          <button
            onClick={() => setContactOpen(true)}
            className="ml-2 px-5 py-2 text-sm bg-primary text-primary-foreground rounded-sm hover:bg-primary/90 transition-colors"
          >
            Kontakt oss
          </button>
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
        <div className="md:hidden bg-white border-t border-border px-6 py-6 flex flex-col gap-5">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className="text-sm tracking-wide text-foreground/70 hover:text-primary"
            >
              {link.label}
            </NavLink>
          ))}
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

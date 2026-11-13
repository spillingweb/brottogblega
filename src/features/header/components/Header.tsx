import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Dialog } from "../../../components/ui/dialog";
import ContactDialog from "../../../components/ContactDialog";
import { cn } from "#/lib/utils";
import MobileNav from "./MobileNav";
import DesktopNav from "./DesktopNav";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const location = useLocation();

  // Close the mobile menu when the location changes,
  // for example when clicking on the link to a new page
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const viewport = document.querySelector<HTMLElement>(
      "[data-slot='scroll-area-viewport']",
    );
    const target = viewport ?? window;
    const getScrollTop = () => (viewport ? viewport.scrollTop : window.scrollY);
    const checkScroll = () => setScrolled(getScrollTop() > 20);

    target.addEventListener("scroll", checkScroll);

    // Check scroll after hydration completes
    const frameId = requestAnimationFrame(() => checkScroll());

    return () => {
      cancelAnimationFrame(frameId);
      target.removeEventListener("scroll", checkScroll);
    };
  }, []);

  return (
    <header
      data-menu-open={menuOpen || undefined}
      className={`transition-all duration-300 ${scrolled || menuOpen ? "bg-card backdrop-blur-sm shadow-sm" : ""} sticky top-0 z-50 print:hidden`}
    >
      <Dialog open={contactOpen} onOpenChange={setContactOpen}>
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

          <DesktopNav />

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

        <MobileNav menuOpen={menuOpen} />

        <ContactDialog />
      </Dialog>
    </header>
  );
};

export default Header;

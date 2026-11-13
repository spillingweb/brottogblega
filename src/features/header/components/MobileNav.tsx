import { Button } from "#/components/ui/button";
import { DialogTrigger } from "#/components/ui/dialog";
import { navLinks } from "#/lib/constants";
import NavLink from "./NavLink";

const MobileNav = ({ menuOpen }: { menuOpen: boolean }) => {
  return (
    <div
      className={`lg:hidden absolute top-18 left-0 w-full overflow-hidden border border-border bg-card backdrop-blur-sm transition-all duration-300 ease-out z-50 ${
        menuOpen
          ? "h-[calc(100vh-4.5rem)] opacity-100"
          : "max-h-0 opacity-0 pointer-events-none"
      }`}
    >
      <nav
        aria-label="mobile"
        className={`px-6 py-6 transition-all duration-300 ease-out flex flex-col h-full ${
          menuOpen ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
        }`}
      >
        <ul className="flex-1 flex flex-col items-center justify-center gap-6 mb-10">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className="text-4xl sm:text-5xl tracking-wide text-foreground/60 hover:text-primary"
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <DialogTrigger asChild>
          <Button className="text-xl h-15 sm:text-3xl sm:h-20">
            Kontakt oss
          </Button>
        </DialogTrigger>
      </nav>
    </div>
  );
};

export default MobileNav;

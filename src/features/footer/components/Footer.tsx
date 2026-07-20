import { Globe, Mail, Phone } from "lucide-react";
import Logo from "../../../components/Logo";
import { Separator } from "../../../components/ui/separator";
import { Link } from "@tanstack/react-router";
import UppercaseHeading from "#/components/ui/UppercaseHeading";
import FooterSocial from "./FooterSocial";

const Footer = () => {
  return (
    <footer className="bg-primary flex flex-col justify-center gap-4 text-sm text-primary-foreground/70">
      <div className="grid md:grid-cols-3 gap-10 px-6 py-12 max-w-6xl w-full mx-auto">
        {/* Logo and social media */}
        <div className="flex flex-col items-start justify-between gap-4">
          <div className="flex flex-col items-start">
            <Logo className="h-12 w-auto text-primary-foreground mb-3" />
            <p>Fevik, Agder, Norge</p>
          </div>

          <FooterSocial />
        </div>

        {/* Contact info */}
        {/* TODO: Make editable with TinaCMS */}
        <div className="flex flex-col items-start gap-2">
          <UppercaseHeading className="text-primary-foreground/50">
            Kontakt
          </UppercaseHeading>
          <div className="flex flex-col items-start gap-1">
            <p className="italic text-primary-foreground/50">
              Heidi fysioterapeut
            </p>
            <a
              href="mailto:heidi@brottogblega.no"
              className="flex items-center gap-2 hover:text-primary-foreground transition-colors"
            >
              <Mail size={16} /> heidi@brottogblega.no
            </a>
            <a
              href="tel:+4791234567"
              className="flex items-center gap-2 hover:text-primary-foreground transition-colors"
            >
              <Phone size={16} /> +47 912 34 567
            </a>
          </div>
          <div className="flex flex-col items-start gap-1 pt-2">
            <p className="italic text-primary-foreground/50">
              Tina Maria Filosamtale
            </p>
            <a
              href="mailto:filosamtale@filosamtale.no"
              className="flex items-center gap-2 hover:text-primary-foreground transition-colors"
            >
              <Mail size={16} /> filosamtale@filosamtale.no
            </a>
            <a
              href="tel:+4791234567"
              className="flex items-center gap-2 hover:text-primary-foreground transition-colors"
            >
              <Phone size={16} /> +47 912 34 567
            </a>
            <a
              href="https://www.filosamtale.no"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-primary-foreground transition-colors"
            >
              <Globe size={16} /> www.filosamtale.no
            </a>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col items-start gap-2">
          <UppercaseHeading className="text-primary-foreground/50">
            Sider
          </UppercaseHeading>
          <ul className="flex flex-col items-start gap-2">
            <li>
              <Link
                to="/"
                className="hover:text-primary-foreground transition-colors"
              >
                Hjem
              </Link>
            </li>
            <li>
              <Link
                to="/om-oss"
                className="hover:text-primary-foreground transition-colors"
              >
                Om oss
              </Link>
            </li>
            <li>
              <Link
                to="/tjenester"
                className="hover:text-primary-foreground transition-colors"
              >
                Tjenester
              </Link>
            </li>
            <li>
              <Link
                to="/arrangementer"
                className="hover:text-primary-foreground transition-colors"
              >
                Arrangementer
              </Link>
            </li>
            <li>
              <Link
                to="/aktuelt"
                className="hover:text-primary-foreground transition-colors"
              >
                Aktuelt
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <Separator className="bg-primary-foreground/10 max-w-6xl w-full mx-auto" />
      <p className="text-xs text-primary-foreground/40 pb-4 px-6 max-w-6xl w-full mx-auto">
        &copy; {new Date().getFullYear()}{" "}
        <a href="https://spillingweb.com">Spilling Web</a>. Alle rettigheter
        forbeholdt.
      </p>
    </footer>
  );
};

export default Footer;

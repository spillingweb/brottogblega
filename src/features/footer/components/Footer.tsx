import { Facebook, Globe, Instagram, Mail, Phone } from "lucide-react";
import Logo from "../../../components/Logo";
import { Separator } from "../../../components/ui/separator";
import Kicker from "#/components/ui/Kicker";
import { navLinks } from "#/lib/constants";
import FooterNavLink from "./FooterNavLink";
import type { PagesContact } from "../../../../tina/__generated__/types";
import { tinaField } from "tinacms/tina-field";
import { useEffect, useState } from "react";

const Footer = ({ pageData }: { pageData: any }) => {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  const page = pageData.pages as PagesContact;

  return (
    <footer className="bg-primary flex flex-col justify-center gap-4 text-sm text-primary-foreground/70 print:hidden">
      <div className="grid md:grid-cols-3 gap-10 px-6 py-12 max-w-6xl w-full mx-auto">
        {/* Logo and social media */}
        <div className="flex flex-col items-start justify-between gap-4">
          <div className="flex flex-col items-start">
            <Logo className="h-10 w-auto text-primary-foreground mb-3" />
            <p>Fevik, Agder, Norge</p>
          </div>

          <div className="flex items-center gap-4">
            {/* Facebook */}
            {page.facebook && (
              <a
                href={page.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary-foreground transition-colors"
                data-tina-field={tinaField(page, "facebook")}
              >
                <Facebook size={24} />
              </a>
            )}

            {/* Instagram */}
            {page.instagram && (
              <a
                href={page.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary-foreground transition-colors"
                data-tina-field={tinaField(page, "instagram")}
              >
                <Instagram size={24} />
              </a>
            )}
          </div>
        </div>

        {/* Contact info */}
        {/* TODO: Make editable with TinaCMS */}
        <div className="flex flex-col items-start gap-2">
          <Kicker className="text-primary-foreground/50">Kontakt</Kicker>
          <div className="flex flex-col items-start gap-1">
            <p
              className="italic text-primary-foreground/50"
              data-tina-field={tinaField(page, "hildeName")}
            >
              {page.hildeName}
            </p>
            <a
              href={`mailto:${page.hildeEmail}`}
              className="flex items-center gap-2 hover:text-primary-foreground transition-colors"
              data-tina-field={tinaField(page, "hildeEmail")}
            >
              <Mail size={16} /> {page.hildeEmail}
            </a>
            <a
              href={`tel:${page.hildePhone}`}
              className="flex items-center gap-2 hover:text-primary-foreground transition-colors"
              data-tina-field={tinaField(page, "hildePhone")}
            >
              <Phone size={16} />
              +47 {page.hildePhone.split(/(\d{2})(\d{2})(\d{2})(\d{2})/).slice(1).join(" ")}
            </a>
            {page.hildeHomePage && (
              <a
                href={page.hildeHomePage}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-primary-foreground transition-colors"
                data-tina-field={tinaField(page, "hildeHomePage")}
              >
                <Globe size={16} /> {page.hildeHomePage}
              </a>
            )}
          </div>
          <div className="flex flex-col items-start gap-1 pt-2">
            <p
              className="italic text-primary-foreground/50"
              data-tina-field={tinaField(page, "tinaName")}
            >
              {page.tinaName}
            </p>
            <a
              href={`mailto:${page.tinaEmail}`}
              className="flex items-center gap-2 hover:text-primary-foreground transition-colors"
              data-tina-field={tinaField(page, "tinaEmail")}
            >
              <Mail size={16} /> {page.tinaEmail}
            </a>
            <a
              href={`tel:${page.tinaPhone}`}
              className="flex items-center gap-2 hover:text-primary-foreground transition-colors"
              data-tina-field={tinaField(page, "tinaPhone")}
            >
              <Phone size={16} /> +47 {page.tinaPhone.split(/(\d{2})(\d{2})(\d{2})(\d{2})/).slice(1).join(" ")}
            </a>
            {page.tinaHomePage && (
              <a
                href={page.tinaHomePage}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-primary-foreground transition-colors"
                data-tina-field={tinaField(page, "tinaHomePage")}
              >
                <Globe size={16} /> {page.tinaHomePage}
              </a>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col items-start gap-2">
          <Kicker className="text-primary-foreground/50">Sider</Kicker>
          <ul className="flex flex-col items-start gap-2">
            {navLinks.map((nav) => (
              <FooterNavLink key={nav.to} path={nav.to} label={nav.label} />
            ))}
          </ul>
        </nav>
      </div>
      <Separator className="bg-primary-foreground/10 max-w-6xl w-full mx-auto" />
      <p className="text-xs text-primary-foreground/40 pb-4 px-6 max-w-6xl w-full mx-auto">
        &copy; {year} <a href="https://spillingweb.com">Spilling Web</a>. Alle
        rettigheter forbeholdt.
      </p>
    </footer>
  );
};

export default Footer;

import { Facebook, Instagram } from "lucide-react";

const FooterSocial = () => {
  return (
    <div className="flex items-center gap-4">
      {/* Facebook */}
      <a
        href="https://www.facebook.com/filosamtale"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-primary-foreground transition-colors"
      >
        <Facebook size={24} />
      </a>

      {/* Instagram */}
      <a
        href="https://www.instagram.com/filosamtale/"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-primary-foreground transition-colors"
      >
        <Instagram size={24} />
      </a>
    </div>
  );
};

export default FooterSocial;

import { SITE } from "@/lib/constants";
import LegalNotice from "@/components/LegalNotice";

const socialLinks = [
  { label: "LinkedIn", href: SITE.links.linkedin, icon: "in" },
  { label: "Instagram", href: SITE.links.instagram, icon: "ig" },
  { label: "TikTok", href: SITE.links.tiktok, icon: "tt" },
];

export default function Footer() {
  return (
    <footer className="relative bg-surface border-t border-white/5 py-12">
      <div className="container-base">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand */}
          <div className="text-center md:text-left">
            <p className="font-display font-bold text-lg tracking-widest text-gradient-brand mb-1">
              {SITE.brandName}
            </p>
            <p className="text-xs font-body text-muted/90">
              {SITE.city} ·{" "}
              <a href="mailto:roberth@resueltoagency.com" className="hover:text-cream/90 transition-colors">
                roberth@resueltoagency.com
              </a>
            </p>
            <p className="mt-1 text-xs font-body text-muted/75">
              RESUELTO SMART SOLUTIONS S.A.C. · RUC 20614688921
            </p>
            {/* Obligatorio y visible en la portada (D.S. 011-2011-PCM) */}
            <a
              href="/libro-de-reclamaciones"
              className="mt-3 inline-flex items-center gap-2 rounded-lg border border-white/15 px-3 py-2
                         text-xs font-body text-cream/90 hover:border-white/40 transition-colors"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M4 5.5C4 4.7 4.7 4 5.5 4H11v16H5.5c-.8 0-1.5-.7-1.5-1.5z" />
                <path d="M20 5.5c0-.8-.7-1.5-1.5-1.5H13v16h5.5c.8 0 1.5-.7 1.5-1.5z" />
                <path d="M6.5 8h2.5M6.5 11h2.5M15 8h2.5M15 11h2.5" />
              </svg>
              Libro de Reclamaciones
            </a>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="w-9 h-9 rounded-full border border-white/10 bg-white/[0.02]
                           hover:border-violet-500/30 hover:bg-violet/10
                           flex items-center justify-center
                           transition-all duration-300 group"
              >
                <span className="text-xs font-display font-bold text-muted group-hover:text-violet-light transition-colors">
                  {social.icon}
                </span>
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-xs font-body text-muted/75 text-center md:text-right">
            © {SITE.year} {SITE.brandName}. Todos los derechos reservados.
          </p>
        </div>

        {/* Legal — colapsado por defecto */}
        <LegalNotice />
      </div>
    </footer>
  );
}

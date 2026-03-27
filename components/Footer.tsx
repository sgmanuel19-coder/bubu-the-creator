import { SITE } from "@/lib/constants";

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
            <p className="text-xs font-body text-muted/60">
              {SITE.city} · {SITE.email}
            </p>
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
          <p className="text-xs font-body text-muted/40 text-center md:text-right">
            © {SITE.year} {SITE.brandName}. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

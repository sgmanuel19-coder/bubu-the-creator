"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { SITE } from "@/lib/constants";

const navLinks = [
  { label: "Inicio", href: "/" },
  { label: "Sobre nosotros", href: "/sobre-mi" },
  { label: "Portafolio", href: "/casos" },
  { label: "Servicios", href: "/servicios" },
  // Academy apunta al portal de la masterclass (landing + plataforma).
  { label: "Academy", href: "/taller" },
];

export default function Navbar({ minimal = false }: { minimal?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      // Hide on scroll-down, show on scroll-up or near top
      if (y < 80) {
        setNavVisible(true);
      } else {
        setNavVisible(y < lastY.current);
      }
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-bg/88 backdrop-blur-xl border-b border-neon-green/10"
          : "bg-transparent"
      }`}
      style={{
        transform: navVisible ? "translateY(0)" : "translateY(-100%)",
        transition: "transform 0.35s cubic-bezier(0.21,0.47,0.32,0.98), background-color 0.5s, border-color 0.5s, backdrop-filter 0.5s",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="relative transition-all duration-300 group-hover:opacity-80">
              <div
                className="absolute inset-0 blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-300"
                style={{ background: "rgba(26,128,255,0.5)", borderRadius: 4 }}
              />
              <Image
                src="/images/logo-mark.png"
                alt="RESUELTO logo"
                width={44}
                height={44}
                className="relative object-contain"
              />
            </div>
            <span
              style={{
                fontFamily: "var(--font-poppins), sans-serif",
                fontWeight: 600,
                letterSpacing: "0.45em",
                fontSize: "0.85rem",
                color: "#EEEBD4",
                textTransform: "uppercase",
                lineHeight: 1,
              }}
            >
              {SITE.brandName}
            </span>
          </Link>

          {/* Desktop nav — oculto en modo minimal */}
          {!minimal && (
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-display font-medium tracking-wider uppercase transition-colors hover-underline ${
                    isActive(link.href)
                      ? "text-neon-green"
                      : "text-muted hover:text-cream"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          )}

          {/* CTA — oculto en modo minimal */}
          {!minimal && (
            <div className="hidden md:flex">
              <a href={SITE.links.whatsapp} className="btn-glow text-sm py-2.5 px-6" target="_blank" rel="noopener noreferrer">
                Hablemos <span className="ml-1">→</span>
              </a>
            </div>
          )}

          {/* Mobile hamburger — oculto en modo minimal */}
          {!minimal && (
            <button
              className="md:hidden flex flex-col gap-1.5 p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-green/50 rounded"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={menuOpen}
            >
              <span className={`block w-6 h-0.5 bg-neon-green transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block w-6 h-0.5 bg-cream transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block w-6 h-0.5 bg-neon-purple transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          )}
        </div>

        {!minimal && menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="md:hidden border-t border-neon-green/10 py-6 flex flex-col gap-4"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`text-sm font-display uppercase tracking-wider transition-colors ${
                  isActive(link.href)
                    ? "text-neon-green"
                    : "text-muted hover:text-cream"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={SITE.links.whatsapp}
              onClick={() => setMenuOpen(false)}
              className="btn-glow mt-2 justify-center text-sm py-3 px-6"
              target="_blank"
              rel="noopener noreferrer"
            >
              Hablemos →
            </a>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}

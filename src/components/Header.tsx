"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import { COMPANY, NAV_LINKS } from "@/lib/constants";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Sólido ao rolar ou com o menu mobile aberto; transparente no topo
  const solid = scrolled || mobileOpen;

  return (
    <div
      className={`fixed inset-x-0 top-0 z-50 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
        solid ? "lg:-translate-y-9" : ""
      }`}
    >
      {/* Topbar — some por fade enquanto o container desliza */}
      <div
        className={`hidden lg:block h-9 transition-opacity duration-500 ease-out motion-reduce:transition-none ${
          solid ? "opacity-0" : "opacity-100"
        }`}
        aria-hidden={solid}
      >
        <div className="h-full border-b border-white/15 text-white/70 text-sm">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 h-full flex items-center justify-between">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5" />
                {COMPANY.phones[0]} | {COMPANY.phones[1]}
              </span>
              <span>{COMPANY.email}</span>
            </div>
            <span>{COMPANY.hours}</span>
          </div>
        </div>
      </div>

      <header
        className={`transition-[background-color,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
          solid
            ? "bg-white/95 backdrop-blur-md border-b border-border shadow-sm"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 flex items-center justify-between h-20">
          <Link
            href="/"
            className="shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            <Image
              src="/logo_com_icone_transparente.png"
              alt="Metalgalvano - Soluções Metálicas / Pré-Moldados"
              width={199}
              height={40}
              className={`h-9 w-auto sm:h-10 transition-[filter] duration-300 ${
                solid ? "" : "brightness-0 invert"
              }`}
              priority
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) =>
              "children" in link ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(link.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className={`flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors rounded-lg ${
                      solid
                        ? "text-foreground hover:text-primary"
                        : "text-white/85 hover:text-white"
                    }`}
                  >
                    {link.label}
                    <ChevronDown className="w-4 h-4" />
                  </Link>
                  {openDropdown === link.label && (
                    <div className="absolute top-full left-0 mt-0 w-56 bg-white border border-border rounded-xl shadow-lg py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2.5 text-sm text-foreground hover:bg-muted hover:text-primary transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`px-4 py-2 text-sm font-medium transition-colors rounded-lg ${
                    solid
                      ? "text-foreground hover:text-primary"
                      : "text-white/85 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/contato"
              className="hidden md:inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white px-6 py-2.5 rounded-lg font-heading font-medium text-sm transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Solicitar Orçamento
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden p-2 cursor-pointer transition-colors ${
                solid ? "text-foreground" : "text-white"
              }`}
              aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="lg:hidden border-t border-border bg-white max-h-[calc(100vh-4rem)] overflow-y-auto">
            <nav className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 py-4 space-y-1">
              {NAV_LINKS.map((link) => (
                <div key={link.label}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-3 text-foreground font-medium rounded-lg hover:bg-muted transition-colors"
                  >
                    {link.label}
                  </Link>
                  {"children" in link && (
                    <div className="pl-6 space-y-1">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setMobileOpen(false)}
                          className="block px-4 py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link
                href="/contato"
                onClick={() => setMobileOpen(false)}
                className="block text-center bg-accent text-white px-6 py-3 rounded-lg font-heading font-medium mt-4 cursor-pointer"
              >
                Solicitar Orçamento
              </Link>
            </nav>
          </div>
        )}
      </header>
    </div>
  );
}

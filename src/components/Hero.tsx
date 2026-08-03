"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, type FormEvent } from "react";
import { COMPANY } from "@/lib/constants";

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) {
      video.pause();
    }
  }, []);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const nome = data.get("nome");
    const fone = data.get("whatsapp");
    const email = data.get("email");
    const text = encodeURIComponent(
      `Olá! Meu nome é ${nome} e gostaria de solicitar um orçamento.\nWhatsApp: ${fone}\nE-mail: ${email}`
    );
    window.open(
      `https://wa.me/${COMPANY.whatsapp.comercial.number}?text=${text}`,
      "_blank",
      "noopener,noreferrer"
    );
  }

  const inputClass =
    "w-full px-3.5 py-2.5 text-sm rounded-md bg-white/5 border border-white/15 text-white placeholder:text-white/40 transition-colors duration-200 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 hover:border-white/25";

  return (
    <section className="relative bg-primary-dark text-white overflow-hidden flex flex-col">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        poster="/video-estrutura-home-poster.jpg"
        className="absolute inset-0 w-full h-full object-cover opacity-35"
      >
        <source src="/video-estrutura-home.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/95 via-primary-dark/80 to-primary-dark/40" />

      {/* Hairlines verticais — grade técnica */}
      <div
        aria-hidden
        className="absolute inset-0 hidden lg:block pointer-events-none"
      >
        <div className="max-w-7xl mx-auto h-full px-6 sm:px-10 lg:px-14 relative">
          <span className="absolute top-0 h-full w-px bg-white/8 left-1/4" />
          <span className="absolute top-0 h-full w-px bg-white/8 left-2/4" />
          <span className="absolute top-0 h-full w-px bg-white/8 left-3/4" />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 w-full flex-1 pt-32 pb-14 lg:pt-36 lg:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Conteúdo */}
          <div className="lg:col-span-7">
            <p className="flex items-center gap-3 text-accent-light font-heading font-medium text-sm uppercase tracking-widest mb-5">
              <span aria-hidden className="w-8 h-[2px] bg-accent-light" />
              Fábrica própria em Araquari/SC
            </p>
            <h1 className="font-heading text-3xl md:text-4xl lg:text-[2.9rem] font-bold leading-[1.15] tracking-tight mb-6 text-balance">
              Estruturas metálicas e pré-moldados, do projeto à montagem
              <span className="text-accent-light">.</span>
            </h1>
            <p className="text-base lg:text-lg text-white/75 leading-relaxed mb-8 max-w-xl">
              Engenharia, fabricação, montagem e acabamento em uma única
              planta de 5.000&nbsp;m² — controle total de prazo e qualidade,
              sem intermediários.
            </p>
            <Link
              href="/obras"
              className="inline-flex items-center gap-2 text-white font-heading font-medium border-b-2 border-white/25 hover:border-accent hover:text-accent pb-1 transition-colors duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              Ver obras realizadas
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Card de orçamento */}
          <div className="lg:col-span-5">
            <div className="w-full max-w-sm lg:ml-auto rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-sm p-5 shadow-[0_16px_40px_-24px_rgba(0,0,0,0.5)]">
              <h2 className="font-heading text-lg font-bold mb-1">
                Solicite seu orçamento
              </h2>
              <p className="text-xs text-white/60 mb-4">
                Preencha e fale direto com nossa equipe comercial.
              </p>
              <form onSubmit={handleSubmit} className="space-y-2.5">
                <div>
                  <label htmlFor="hero-nome" className="sr-only">
                    Seu nome
                  </label>
                  <input
                    id="hero-nome"
                    name="nome"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Seu nome"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="hero-whatsapp" className="sr-only">
                    WhatsApp com DDD
                  </label>
                  <input
                    id="hero-whatsapp"
                    name="whatsapp"
                    type="tel"
                    required
                    autoComplete="tel"
                    placeholder="WhatsApp (com DDD)"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="hero-email" className="sr-only">
                    Seu melhor e-mail
                  </label>
                  <input
                    id="hero-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="Seu melhor e-mail"
                    className={inputClass}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-white px-6 py-3 text-sm rounded-md font-heading font-semibold transition-colors duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  Solicitar Orçamento
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
              <p className="text-[11px] leading-snug text-white/50 text-center mt-3">
                Resposta em até 24h úteis. Seus dados não são compartilhados.
              </p>
              <p className="flex items-center justify-center gap-2 text-[11px] text-white/50 text-center mt-1.5">
                <span
                  aria-hidden
                  className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                />
                Equipe comercial disponível: {COMPANY.hours}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Régua técnica */}
      <div className="relative border-t border-white/15 mb-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 py-4 flex items-center justify-between gap-6 text-[11px] uppercase tracking-widest text-white/45 font-heading">
          <span>BR-280, km 26 — Araquari/SC</span>
          <span className="hidden md:inline" aria-hidden>
            26°22&apos;S · 48°43&apos;W
          </span>
          <span className="hidden sm:inline">5.000 m² de área fabril</span>
          <span>20+ anos de experiência</span>
        </div>
      </div>
    </section>
  );
}

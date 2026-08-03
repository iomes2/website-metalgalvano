"use client";

import { MessageCircle } from "lucide-react";
import { COMPANY } from "@/lib/constants";

export function WhatsAppButton() {
  const url = `https://wa.me/${COMPANY.whatsapp.comercial.number}?text=${encodeURIComponent(
    "Olá! Gostaria de solicitar um orçamento."
  )}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
      aria-label="Fale conosco pelo WhatsApp"
    >
      <span className="hidden group-hover:inline-block pl-5 pr-1 text-sm font-medium whitespace-nowrap">
        Fale conosco
      </span>
      <span className="w-14 h-14 flex items-center justify-center">
        <MessageCircle className="w-7 h-7" />
      </span>
    </a>
  );
}

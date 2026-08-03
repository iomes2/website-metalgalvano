import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { COMPANY } from "@/lib/constants";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Entre em contato com a Metalgalvano. Solicite um orçamento para estruturas metálicas, pré-moldados, estrutura mista e mais. Atendemos todo o Brasil.",
};

export default function ContatoPage() {
  return (
    <>
      <PageHero
        badge="Fale conosco"
        title="Entre em contato"
        subtitle="Solicite um orçamento sem compromisso ou tire suas dúvidas com nossa equipe comercial."
      />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="font-heading text-2xl font-bold text-foreground mb-8">
                Solicite um orçamento
              </h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Nome completo *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                      placeholder="Seu nome"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="company"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Empresa
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                      placeholder="Nome da empresa"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      E-mail *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                      placeholder="seu@email.com"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Telefone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                      placeholder="(47) 99999-9999"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="service"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Tipo de serviço
                  </label>
                  <select
                    id="service"
                    name="service"
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors cursor-pointer"
                  >
                    <option value="">Selecione uma opção</option>
                    <option value="estrutura-metalica">
                      Estrutura Metálica
                    </option>
                    <option value="pre-moldado">Pré-Moldado</option>
                    <option value="estrutura-mista">Estrutura Mista</option>
                    <option value="galpao">Galpão Metálico</option>
                    <option value="cobertura">Cobertura Metálica</option>
                    <option value="brise">Brise</option>
                    <option value="acm">ACM</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Mensagem *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors resize-y"
                    placeholder="Descreva seu projeto ou dúvida..."
                  />
                </div>

                <button
                  type="submit"
                  className="bg-accent hover:bg-accent-hover text-white px-8 py-4 rounded-lg font-heading font-semibold transition-colors cursor-pointer w-full md:w-auto"
                >
                  Enviar solicitação
                </button>
              </form>
            </div>

            <div className="space-y-6">
              <div className="bg-surface rounded-2xl p-8 border border-border">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-6">
                  Informações de contato
                </h3>
                <ul className="space-y-5">
                  <li className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-foreground">Endereço</p>
                      <p className="text-muted-foreground mt-1">
                        {COMPANY.address}
                        <br />
                        CEP: {COMPANY.cep}
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <Phone className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-foreground">Telefones</p>
                      <p className="text-muted-foreground mt-1">
                        {COMPANY.phones[0]}
                        <br />
                        {COMPANY.phones[1]}
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <Mail className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-foreground">E-mail</p>
                      <p className="text-muted-foreground mt-1">
                        {COMPANY.email}
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <Clock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-foreground">Horário</p>
                      <p className="text-muted-foreground mt-1">
                        {COMPANY.hours}
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-surface rounded-2xl p-8 border border-border">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-4">
                  WhatsApp direto
                </h3>
                <div className="space-y-3">
                  <a
                    href={`https://wa.me/${COMPANY.whatsapp.comercial.number}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-white rounded-xl border border-border hover:border-[#25D366] hover:shadow-md transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-5 h-5 text-[#25D366]" />
                    <div className="text-sm">
                      <p className="font-medium text-foreground">Comercial</p>
                      <p className="text-muted-foreground">
                        {COMPANY.whatsapp.comercial.label}
                      </p>
                    </div>
                  </a>
                  <a
                    href={`https://wa.me/${COMPANY.whatsapp.financeiro.number}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-white rounded-xl border border-border hover:border-[#25D366] hover:shadow-md transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-5 h-5 text-[#25D366]" />
                    <div className="text-sm">
                      <p className="font-medium text-foreground">Financeiro</p>
                      <p className="text-muted-foreground">
                        {COMPANY.whatsapp.financeiro.label}
                      </p>
                    </div>
                  </a>
                  <a
                    href={`https://wa.me/${COMPANY.whatsapp.rh.number}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-white rounded-xl border border-border hover:border-[#25D366] hover:shadow-md transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-5 h-5 text-[#25D366]" />
                    <div className="text-sm">
                      <p className="font-medium text-foreground">RH</p>
                      <p className="text-muted-foreground">
                        {COMPANY.whatsapp.rh.label}
                      </p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

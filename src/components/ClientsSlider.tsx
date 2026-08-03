"use client";

import Image from "next/image";

interface Client {
  name: string;
  logo: string;
}

interface ClientsSliderProps {
  clients: readonly Client[];
}

export function ClientsSlider({ clients }: ClientsSliderProps) {
  // Split clients into three groups for three slider rows
  const third = Math.ceil(clients.length / 3);
  const row1Clients = clients.slice(0, third);
  const row2Clients = clients.slice(third, third * 2);
  const row3Clients = clients.slice(third * 2);

  return (
    <div className="space-y-5 overflow-hidden">
      {/* Row 1 — scrolls left */}
      <div className="relative">
        {/* Fade masks on edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-24 z-10 bg-gradient-to-r from-surface to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-24 z-10 bg-gradient-to-l from-surface to-transparent" />

        <div
          className="flex gap-5"
          style={{
            width: "max-content",
            animation: "scroll-left 35s linear infinite",
          }}
        >
          {/* Triple the items for seamless infinite loop */}
          {[...row1Clients, ...row1Clients, ...row1Clients].map(
            (client, i) => (
              <LogoCard key={`row1-${i}`} client={client} />
            )
          )}
        </div>
      </div>

      {/* Row 2 — scrolls right */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-24 z-10 bg-gradient-to-r from-surface to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-24 z-10 bg-gradient-to-l from-surface to-transparent" />

        <div
          className="flex gap-5"
          style={{
            width: "max-content",
            animation: "scroll-right 40s linear infinite",
          }}
        >
          {[...row2Clients, ...row2Clients, ...row2Clients].map(
            (client, i) => (
              <LogoCard key={`row2-${i}`} client={client} />
            )
          )}
        </div>
      </div>

      {/* Row 3 — scrolls left */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-24 z-10 bg-gradient-to-r from-surface to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-24 z-10 bg-gradient-to-l from-surface to-transparent" />

        <div
          className="flex gap-5"
          style={{
            width: "max-content",
            animation: "scroll-left 45s linear infinite",
          }}
        >
          {[...row3Clients, ...row3Clients, ...row3Clients].map(
            (client, i) => (
              <LogoCard key={`row3-${i}`} client={client} />
            )
          )}
        </div>
      </div>
    </div>
  );
}

function LogoCard({ client }: { client: Client }) {
  return (
    <div className="bg-white rounded-xl border border-border px-6 py-4 flex items-center justify-center h-20 w-[160px] sm:w-[180px] shrink-0 hover:shadow-md grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300">
      <Image
        src={client.logo}
        alt={client.name}
        width={120}
        height={48}
        className="object-contain max-h-12 w-auto"
      />
    </div>
  );
}

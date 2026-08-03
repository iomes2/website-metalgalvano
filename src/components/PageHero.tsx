import Image from "next/image";

interface PageHeroProps {
  badge: string;
  title: string;
  subtitle?: string;
  /** Banner de fundo, ofuscado sob o overlay (mín. ~2560px de largura) */
  image?: string;
  imageAlt?: string;
}

export function PageHero({
  badge,
  title,
  subtitle,
  image,
  imageAlt = "",
}: PageHeroProps) {
  return (
    <section className="relative bg-primary-dark text-white overflow-hidden">
      {image ? (
        <>
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/95 via-primary-dark/80 to-primary-dark/55" />
        </>
      ) : (
        <>
          {/* Grade blueprint — fallback sem imagem */}
          <div
            aria-hidden
            className="absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:56px_56px]"
          />
          <div
            aria-hidden
            className="absolute -top-24 right-[8%] w-[420px] h-[420px] rounded-full bg-accent/10 blur-3xl pointer-events-none"
          />
        </>
      )}

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

      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 pt-32 pb-16 lg:pt-40 lg:pb-20">
        <p className="flex items-center gap-3 text-accent-light font-heading font-medium text-sm uppercase tracking-widest mb-4">
          <span aria-hidden className="w-8 h-[2px] bg-accent-light" />
          {badge}
        </p>
        <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-white/70 mt-4 max-w-xl text-lg leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}

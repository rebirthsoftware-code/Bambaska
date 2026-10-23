import Image from "next/image";
import { Reveal } from "./Reveal";

type Props = {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  image?: string;
  imageAlt?: string;
  compact?: boolean;
};

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt = "",
  compact = false,
}: Props) {
  return (
    <section
      className={`relative isolate overflow-hidden bg-forest-800 text-cream-100 ${
        compact
          ? "pb-16 pt-32 lg:pb-20 lg:pt-40"
          : "pb-20 pt-36 lg:pb-28 lg:pt-48"
      }`}
    >
      {image && (
        <>
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-50"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-forest-900 via-forest-900/60 to-forest-900/20"
            aria-hidden
          />
        </>
      )}
      {!image && (
        <div className="waffle-grid absolute inset-0 opacity-30" aria-hidden />
      )}
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <p className="mb-5 inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] text-gold-400">
            <span className="h-px w-10 bg-gold-400" aria-hidden />
            {eyebrow}
          </p>
        </Reveal>
        <Reveal delay={100}>
          <h1 className="max-w-4xl font-display text-5xl leading-[1] tracking-tight sm:text-6xl lg:text-7xl">
            {title}
          </h1>
        </Reveal>
        {description && (
          <Reveal delay={200}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-cream-100/75 sm:text-lg">
              {description}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}

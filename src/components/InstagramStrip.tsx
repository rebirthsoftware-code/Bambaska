import Image from "next/image";
import { site } from "@/data/site";
import { InstagramIcon } from "./icons";
import { Reveal } from "./Reveal";

const shots = [
  { src: "/images/menu/bambaska-croissant.webp", alt: "Bambaşka Croissant" },
  { src: "/images/hero/magnolia.webp", alt: "Magnolia" },
  { src: "/images/menu/citir-profiterol.webp", alt: "Çıtır Profiterol" },
  { src: "/images/mekan/mekan-3.webp", alt: "Mekândan bir köşe" },
  { src: "/images/menu/basque-cheesecake.webp", alt: "Basque Cheesecake" },
  { src: "/images/hero/bowl-hands.webp", alt: "Waffle Bowl" },
];

export function InstagramStrip() {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.28em] text-caramel-500">
              <span className="h-px w-8 bg-current" aria-hidden />
              Instagram
            </p>
            <h2 className="mt-3 font-display text-3xl text-forest-800 sm:text-4xl">
              {site.instagramHandle}
            </h2>
          </div>
          <a
            href={site.instagram}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-forest-800/20 px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.18em] text-forest-800 transition hover:bg-forest-800 hover:text-cream-100"
          >
            <InstagramIcon className="h-4 w-4" />
            Takip et
          </a>
        </Reveal>
        <div className="mt-10 grid grid-cols-3 gap-3 sm:gap-4 lg:grid-cols-6">
          {shots.map((s, i) => (
            <Reveal key={s.src} delay={i * 60}>
              <a
                href={site.instagram}
                target="_blank"
                rel="noreferrer"
                className="group relative block aspect-square overflow-hidden rounded-2xl bg-cream-200"
                aria-label={`${s.alt} — Instagram'da gör`}
              >
                <Image
                  src={s.src}
                  alt={s.alt}
                  fill
                  sizes="(min-width: 1024px) 16vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <span className="absolute inset-0 flex items-center justify-center bg-forest-900/0 text-cream-100 opacity-0 transition group-hover:bg-forest-900/40 group-hover:opacity-100">
                  <InstagramIcon className="h-6 w-6" />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

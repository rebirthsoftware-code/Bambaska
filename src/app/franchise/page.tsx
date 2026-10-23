import type { Metadata } from "next";
import Image from "next/image";
import { FranchiseForm } from "@/components/FranchiseForm";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Franchise Başvurusu",
  description:
    "Kendi şehrinde bir Bambaşka Waffle açmak ister misin? Franchise başvuru formunu doldur, seninle iletişime geçelim.",
};

const perks = [
  {
    title: "Kanıtlanmış reçeteler",
    text: "2019'dan beri geliştirilen, misafirlerin tekrar tekrar geldiği özgün bir menü.",
  },
  {
    title: "Güçlü marka kimliği",
    text: "Altın ve yeşil tonlarıyla akılda kalan, sosyal medyada paylaşılan bir konsept.",
  },
  {
    title: "Kurulum ve eğitim desteği",
    text: "Mekân tasarımından ürün standartlarına kadar açılış sürecinde yanınızdayız.",
  },
  {
    title: "Sürekli iletişim",
    text: "Operasyon, tedarik ve pazarlama konularında düzenli destek.",
  },
];

export default function FranchisePage() {
  return (
    <>
      <PageHero
        eyebrow="Franchising"
        title={
          <>
            Bu heyecana <em className="italic text-gold-300">sen de</em> ortak
            ol.
          </>
        }
        description="Formu doldur, ekibimiz en kısa sürede seninle iletişime geçsin. Tüm başvurular gizli tutulur."
        image="/images/hero/collage.webp"
        compact
      />

      <section className="py-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div>
            <Reveal>
              <h2 className="font-display text-3xl text-forest-800 sm:text-4xl">
                Neden Bambaşka Waffle?
              </h2>
            </Reveal>
            <ul className="mt-8 space-y-6">
              {perks.map((p, i) => (
                <Reveal
                  key={p.title}
                  delay={i * 80}
                  as="li"
                  className="flex gap-4"
                >
                  <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold-400 font-display text-sm text-forest-900">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold text-forest-800">{p.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink-500">
                      {p.text}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ul>
            <Reveal
              delay={300}
              className="relative mt-10 aspect-[4/3] overflow-hidden rounded-3xl shadow-card"
            >
              <Image
                src="/images/hero/concept.webp"
                alt="Bambaşka Waffle mekân konsepti"
                fill
                sizes="(min-width: 1024px) 35vw, 100vw"
                className="object-cover"
              />
            </Reveal>
            <Reveal
              delay={350}
              className="mt-8 rounded-2xl bg-cream-200 p-5 text-sm text-ink-700"
            >
              Sorularınız için doğrudan arayabilirsiniz:{" "}
              <a href={site.phoneHref} className="font-bold text-forest-800">
                {site.phone}
              </a>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <FranchiseForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}

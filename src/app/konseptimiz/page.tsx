import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/Button";
import { Gallery } from "@/components/Gallery";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { Logo } from "@/components/Logo";

export const metadata: Metadata = {
  title: "Konseptimiz",
  description:
    "Bambaşka Waffle'ın sıcak, modern ve samimi mekân konsepti. Mekân görselleri ve franchise için konsept detayları.",
};

const gallery = [
  {
    src: "/images/mekan/mekan-1.webp",
    alt: "Kemerli nişler ve mermer masalar",
  },
  {
    src: "/images/mekan/mekan-2.webp",
    alt: "Pembe duvarlar ve altın detaylar",
  },
  { src: "/images/mekan/mekan-3.webp", alt: "BW logolu oturma alanı" },
  { src: "/images/mekan/mekan-4.webp", alt: "Tatlı vitrini ve servis bankosu" },
];

const pillars = [
  {
    title: "Işık",
    text: "Sıcak tonlu aydınlatma ve kemerli nişler, her saatte fotoğraf çekilesi bir atmosfer yaratır.",
  },
  {
    title: "Malzeme",
    text: "Mermer masa yüzeyleri, altın metal detaylar ve doğal ahşap sandalyeler.",
  },
  {
    title: "Renk",
    text: "Koyu orman yeşili ve altın; krem ve pudra pembesiyle dengelenir.",
  },
  {
    title: "Akış",
    text: "Vitrin ön planda, oturma alanları rahat; hem hızlı servis hem uzun sohbetler için.",
  },
];

export default function ConceptPage() {
  return (
    <>
      <PageHero
        eyebrow="Konseptimiz"
        title={
          <>
            Sıcak, modern, <em className="italic text-gold-300">samimi</em>.
          </>
        }
        description="Bambaşka Waffle'ın rahat atmosferinde hem çalışabilir hem de taze waffle'larımızı deneyimleyebilirsiniz. Mekânımızı yakından görün."
        image="/images/mekan/mekan-2.webp"
        imageAlt="Bambaşka Waffle mekân içi"
      />

      <section className="py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
          <Reveal className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-soft">
              <Image
                src="/images/hero/concept.webp"
                alt="Bambaşka Waffle konsept görseli"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 left-6 flex items-center gap-4 rounded-2xl bg-forest-800 px-6 py-4 text-gold-300 shadow-soft">
              <Logo variant="heart" className="h-10 w-12" />
              <span className="font-display text-lg italic">Sen Başkasın</span>
            </div>
          </Reveal>
          <div>
            <SectionHeading
              eyebrow="Bu heyecana sen de ortak ol"
              title="Bir waffle dükkânından fazlası."
              description="Konseptimiz; ürünün tazeliği kadar mekânın hissini de önemser. Her şube aynı sıcaklığı, aynı ışığı ve aynı kaliteyi taşır."
            />
            <Reveal delay={150} className="mt-10 grid gap-5 sm:grid-cols-2">
              {pillars.map((p) => (
                <div
                  key={p.title}
                  className="rounded-2xl border border-forest-800/10 bg-cream-50 p-5"
                >
                  <h3 className="font-display text-xl text-forest-800">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">
                    {p.text}
                  </p>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-cream-200 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            align="center"
            eyebrow="Mekân Görselleri"
            title="İçeriden kareler."
          />
          <div className="mt-14">
            <Gallery images={gallery} />
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-forest-800 py-24 text-cream-100 lg:py-32">
        <div className="waffle-grid absolute inset-0 opacity-30" aria-hidden />
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1fr_1.2fr]">
          <Reveal className="mx-auto w-full max-w-xs">
            <div className="relative aspect-[9/16] overflow-hidden rounded-[2rem] shadow-soft ring-1 ring-gold-400/20">
              <video
                className="h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster="/images/mekan/mekan-3.webp"
              >
                <source src="/video/mekan.mp4" type="video/mp4" />
                Tarayıcınız bu videoyu desteklemiyor.
              </video>
            </div>
          </Reveal>
          <div>
            <SectionHeading
              tone="dark"
              eyebrow="Mekânın Tadını Çıkartın"
              title="Kendi şehrinizde bir Bambaşka Waffle hayal edin."
              description="Franchise başvurusu bırakın; konsept, kurulum ve ürün standartları konusunda sizinle birlikte çalışalım."
            />
            <Reveal delay={150} className="mt-8 flex flex-wrap gap-4">
              <Button href="/franchise">Franchise Başvurusu</Button>
              <Button href="/iletisim" variant="outline-light" arrow={false}>
                İletişim
              </Button>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

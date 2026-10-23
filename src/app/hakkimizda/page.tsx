import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/Button";
import { Marquee } from "@/components/Marquee";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description:
    "Bambaşka Waffle 2019'da Karabük'te kuruldu. Özgün reçeteler, Belçika çikolatası ve samimi bir atmosferle tatlı bir yolculuk.",
};

const values = [
  {
    title: "Özgün reçeteler",
    text: "Menümüzdeki her ürün kendi mutfağımızda geliştirildi. Kopyası değil, aslı.",
  },
  {
    title: "Gerçek malzeme",
    text: "Belçika çikolatası, file Antep fıstığı, taze meyve. Kısayol yok.",
  },
  {
    title: "Samimi deneyim",
    text: "Yalnızca tatlı değil, iyi bir an. Masada geçen zaman bizim için ürünün parçası.",
  },
  {
    title: "Yenilikçilik",
    text: "Karabük'ün ilk geniş menülü waffle markası olarak her sezon yeni tatlar deniyoruz.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative isolate flex min-h-[80svh] items-end overflow-hidden bg-forest-900 text-cream-100">
        <Image
          src="/images/hero/about.webp"
          alt="Bambaşka Waffle mekânının camında altın BW logosu"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-75"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-forest-900 via-forest-900/50 to-transparent"
          aria-hidden
        />
        <div className="relative mx-auto w-full max-w-7xl px-5 pb-20 pt-40 sm:px-8 lg:pb-28">
          <Reveal>
            <p className="mb-5 inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] text-gold-400">
              <span className="h-px w-10 bg-gold-400" aria-hidden />
              Hakkımızda
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="max-w-3xl font-display text-5xl leading-[1] tracking-tight sm:text-6xl lg:text-7xl">
              Waffle dünyasında <em className="italic text-gold-300">yeni</em>{" "}
              bir deneyim.
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading
              eyebrow="Biz Kimiz?"
              title="Kaliteyi lezzetle buluşturan bir yolculuk."
            />
            <Reveal delay={150} className="mt-10 flex items-end gap-6">
              <div className="text-forest-800">
                <p className="font-display text-7xl leading-none">
                  {site.foundedYear}
                </p>
                <p className="mt-2 text-xs font-bold uppercase tracking-[0.2em] text-caramel-500">
                  Karabük&rsquo;te kuruluş
                </p>
              </div>
            </Reveal>
          </div>
          <Reveal
            delay={100}
            className="space-y-6 text-lg leading-relaxed text-ink-700"
          >
            <p>
              Bambaşka Waffle, kaliteyi lezzetle buluşturduğu yola{" "}
              {site.foundedYear} yılında çıktı ve o günden bugüne müşteri
              memnuniyeti ve yenilikçilik anlayışıyla tatlı bir yolculuğa imza
              attı. Karabük&rsquo;te sektördeki açığı fark ederek, kendi özgün
              reçeteleriyle tasarladığı menüsüyle lezzet dünyasında fark
              yaratıyor.
            </p>
            <p>
              Bambaşka Waffle yalnızca waffle değil, mutluluk da üretiyor.
              Modern ve samimi atmosferiyle misafirlerine eşsiz tatlar sunmakla
              kalmıyor, aynı zamanda keyifli bir deneyim yaşatıyor.
            </p>
            <p>
              Karabük&rsquo;ün ilk geniş ürün yelpazesiyle öne çıkan waffle
              markası olarak, yenilikçi tatlar ve kaliteli hizmet anlayışımızla
              fark yaratmaya devam ediyoruz. Bizimle bu lezzetli yolculuğa
              katılın ve her lokmada mutluluğu keşfedin.
            </p>
            <p className="font-display text-2xl italic text-forest-800">
              — Sen Başkasın.
            </p>
          </Reveal>
        </div>
      </section>

      <Marquee dark />

      <section className="bg-cream-200 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            align="center"
            eyebrow="Değerlerimiz"
            title="Bizi bambaşka yapan dört şey."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal
                key={v.title}
                delay={i * 80}
                className="rounded-3xl bg-cream-50 p-7 shadow-card ring-1 ring-forest-800/5"
              >
                <span className="font-display text-4xl text-gold-500">
                  0{i + 1}
                </span>
                <h3 className="mt-5 font-display text-2xl text-forest-800">
                  {v.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-500">
                  {v.text}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2">
          <Reveal className="relative aspect-square overflow-hidden rounded-[2rem] shadow-soft">
            <Image
              src="/images/hero/collage.webp"
              alt="Bambaşka Waffle mekânından kareler"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </Reveal>
          <div>
            <SectionHeading
              eyebrow="Mekânımız"
              title="Gelin, bir fincan kahve eşliğinde tanışalım."
              description="Mermer masalar, sıcak ışık ve altın detaylar. Konseptimizi yakından görün ya da hemen menüye göz atın."
            />
            <Reveal delay={150} className="mt-8 flex flex-wrap gap-4">
              <Button href="/konseptimiz" variant="forest">
                Konseptimiz
              </Button>
              <Button href="/menu" variant="outline">
                Menü
              </Button>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

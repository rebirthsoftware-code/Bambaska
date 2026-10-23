import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/Button";
import { Counter } from "@/components/Counter";
import { Marquee } from "@/components/Marquee";
import { Parallax } from "@/components/Parallax";
import { BoxFeature } from "@/components/BoxFeature";
import { InstagramStrip } from "@/components/InstagramStrip";
import { ProcessSteps } from "@/components/ProcessSteps";
import { SignatureShowcase } from "@/components/SignatureShowcase";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import {
  ArrowIcon,
  InstagramIcon,
  MapPinIcon,
  PhoneIcon,
} from "@/components/icons";
import { categories, featuredProducts } from "@/data/menu";
import { site } from "@/data/site";

const stats = [
  { value: <>{site.foundedYear}</>, label: "Karabük'te kuruluş" },
  { value: <Counter to={30} suffix="+" />, label: "Özgün ürün" },
  { value: <Counter to={6} />, label: "Menü kategorisi" },
  { value: <Counter to={100} prefix="%" />, label: "Belçika çikolatası" },
];

export default function HomePage() {
  const featured = featuredProducts;
  const picks = [
    "klasik-waffle",
    "belgian-waffle",
    "brownie",
    "orman-meyveli-cheesecake",
  ]
    .map((slug) =>
      categories.flatMap((c) => c.items).find((p) => p.slug === slug),
    )
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <>
      {/* ───────────── Hero ───────────── */}
      <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-forest-900 text-cream-100">
        <div className="hero-zoom absolute inset-0">
          <Image
            src="/images/hero/waffle.webp"
            alt="Belçika çikolatalı, çilekli Bambaşka waffle"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[62%_center] sm:object-[70%_center]"
          />
        </div>
        <div
          className="absolute inset-0 bg-gradient-to-t from-forest-900 via-forest-900/45 to-forest-900/15"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-forest-900/85 via-forest-900/35 to-transparent"
          aria-hidden
        />

        {/* floating waffles */}
        <Image
          src="/images/brand/waffle-float-1.webp"
          alt=""
          width={1100}
          height={817}
          priority
          className="rise animate-float pointer-events-none absolute -right-12 top-[14%] w-[46vw] max-w-[520px] drop-shadow-[0_30px_40px_rgba(0,0,0,0.5)] sm:-right-6 sm:top-[12%] [--d:500ms] [--float-rotate:-6deg]"
        />
        <Image
          src="/images/brand/waffle-float-2.webp"
          alt=""
          width={1100}
          height={1100}
          className="rise animate-float-slow pointer-events-none absolute -bottom-10 -left-16 hidden w-[30vw] max-w-[400px] drop-shadow-[0_30px_40px_rgba(0,0,0,0.5)] md:block [--d:700ms] [--float-rotate:8deg]"
        />

        <div className="relative mx-auto w-full max-w-7xl px-5 pb-20 pt-40 sm:px-8 lg:pb-28">
          <p className="rise mb-6 inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.32em] text-gold-400 [--d:100ms]">
            <span className="h-px w-10 bg-gold-400" aria-hidden />
            Karabük · Est. {site.foundedYear}
          </p>
          <h1 className="max-w-4xl font-display text-[clamp(3rem,9vw,7.5rem)] leading-[0.95] tracking-tight">
            <span className="rise block [--d:200ms]">Her lokmada</span>
            <span className="rise block [--d:320ms]">
              <em className="shine font-normal italic text-gold-300">
                bambaşka
              </em>{" "}
              bir
            </span>
            <span className="rise block [--d:440ms]">mutluluk.</span>
          </h1>
          <p className="rise mt-7 max-w-xl text-base leading-relaxed text-cream-100/80 sm:text-lg [--d:600ms]">
            Taptaze pişen waffle, gerçek Belçika çikolatası ve sıcacık bir
            atmosfer. {site.foundedYear}&rsquo;dan beri Karabük&rsquo;ün tatlı
            durağı.
          </p>
          <div className="rise mt-10 flex flex-wrap items-center gap-4 [--d:740ms]">
            <Button href="/menu">Menüyü Keşfet</Button>
            <Button href="/franchise" variant="outline-light" arrow={false}>
              Franchise Ol
            </Button>
          </div>
        </div>

        <a
          href="#hikaye"
          className="rise absolute bottom-6 right-6 hidden flex-col items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-cream-100/60 transition hover:text-gold-300 lg:flex [--d:1000ms]"
          aria-label="Aşağı kaydır"
        >
          Kaydır
          <span className="relative h-14 w-px overflow-hidden bg-cream-100/20">
            <span className="scroll-dash absolute left-0 top-0 h-6 w-px bg-gold-400" />
          </span>
        </a>
      </section>

      <Marquee />

      {/* ───────────── Signature showcase ───────────── */}
      <section id="hikaye" className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="İmza Lezzetler"
            title="Menümüzün yıldızları."
            description="Üzerine gelin, yakından bakın. Her biri kendi mutfağımızda, kendi reçetemizle hazırlanır."
          />
          <div className="mt-14">
            <SignatureShowcase products={featured} />
          </div>
        </div>
      </section>

      {/* ───────────── Process ───────────── */}
      <section className="bg-cream-200 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            align="center"
            eyebrow="Nasıl Yapıyoruz"
            title="Dört adım, hiç kısayol yok."
          />
          <div className="mt-14">
            <ProcessSteps />
          </div>
        </div>
      </section>

      {/* ───────────── Featured products ───────────── */}
      <section id="lezzetler" className="relative scroll-mt-20 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Menüden Seçmeler"
              title="Klasikler, cheesecake'ler ve daha fazlası."
              description="Altı kategori, otuzun üzerinde ürün. Sıcak içeceklerden paylaşmalık kutulara kadar her şey menüde."
            />
            <Reveal delay={150}>
              <Button href="/menu" variant="outline">
                Tüm Menü
              </Button>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {picks.map((p, i) => (
              <Reveal key={p.slug} delay={i * 80}>
                <ProductCard product={p} index={i} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── About split ───────────── */}
      <section className="relative overflow-hidden bg-forest-800 py-24 text-cream-100 lg:py-32">
        <div className="waffle-grid absolute inset-0 opacity-30" aria-hidden />
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
          <Reveal className="relative">
            <Parallax className="relative aspect-[4/5] rounded-[2rem] shadow-soft">
              <Image
                src="/images/hero/bowl-hands.webp"
                alt="Bambaşka Waffle çalışanı, çikolatalı waffle bowl sunarken"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </Parallax>
            <div className="absolute -bottom-6 -right-4 hidden rounded-2xl bg-gold-400 p-6 text-forest-900 shadow-soft sm:block lg:-right-10">
              <p className="font-display text-5xl leading-none">
                {site.foundedYear}
              </p>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.2em]">
                &rsquo;dan beri
              </p>
            </div>
          </Reveal>

          <div>
            <SectionHeading
              tone="dark"
              eyebrow="Hakkımızda"
              title="Yalnızca waffle değil, mutluluk da üretiyoruz."
              description="Bambaşka Waffle, kaliteyi lezzetle buluşturduğu yola 2019 yılında Karabük'te çıktı. Sektördeki açığı fark edip kendi özgün reçeteleriyle tasarladığı menüsüyle, şehrin ilk geniş ürün yelpazesine sahip waffle markası oldu."
            />
            <Reveal
              delay={150}
              className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4 lg:grid-cols-2"
            >
              {stats.map((s) => (
                <div key={s.label} className="border-l border-gold-400/40 pl-4">
                  <p className="font-display text-3xl text-gold-300 sm:text-4xl">
                    {s.value}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-[0.16em] text-cream-100/60">
                    {s.label}
                  </p>
                </div>
              ))}
            </Reveal>
            <Reveal delay={250} className="mt-10">
              <Button href="/hakkimizda" variant="gold">
                Hikâyemiz
              </Button>
            </Reveal>
          </div>
        </div>
      </section>

      <BoxFeature />

      {/* ───────────── Concept / venue ───────────── */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            align="center"
            eyebrow="Konseptimiz"
            title="Sıcak, modern ve samimi bir mekân."
            description="Mermer masalar, altın detaylar ve yumuşak ışık. İster bir fincan kahveyle çalışın, ister arkadaşlarınızla tatlı bir mola verin."
          />
        </div>
        <div className="mt-14 flex gap-4 overflow-x-auto px-5 pb-4 no-scrollbar sm:px-8 lg:grid lg:grid-cols-4 lg:overflow-visible lg:px-8 lg:pb-0 mx-auto max-w-7xl">
          {[1, 2, 3, 4].map((n, i) => (
            <Reveal
              key={n}
              delay={i * 80}
              className={`relative aspect-[3/4] w-[72vw] shrink-0 overflow-hidden rounded-3xl shadow-card sm:w-[48vw] lg:w-auto ${
                i % 2 === 1 ? "lg:translate-y-10" : ""
              }`}
            >
              <Image
                src={`/images/mekan/mekan-${n}.webp`}
                alt={`Bambaşka Waffle mekânı ${n}`}
                fill
                sizes="(min-width: 1024px) 24vw, 72vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-16 text-center lg:mt-24">
          <Button href="/konseptimiz" variant="outline">
            Mekânı Keşfet
          </Button>
        </Reveal>
      </section>

      {/* ───────────── Franchise CTA ───────────── */}
      <section className="relative isolate overflow-hidden">
        <Image
          src="/images/hero/box.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-forest-900/85" aria-hidden />
        <div className="relative mx-auto flex max-w-7xl flex-col items-start gap-10 px-5 py-24 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:py-32">
          <div className="max-w-2xl">
            <Reveal>
              <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.28em] text-gold-400">
                Franchising
              </p>
              <h2 className="font-display text-4xl leading-tight text-cream-100 sm:text-5xl lg:text-6xl">
                Bu heyecana <em className="italic text-gold-300">sen de</em>{" "}
                ortak ol.
              </h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-cream-100/75 sm:text-lg">
                Kanıtlanmış reçeteler, güçlü bir marka ve sıcak bir konsept.
                Kendi şehrinde Bambaşka Waffle açmak için başvurunu bırak,
                seninle iletişime geçelim.
              </p>
            </Reveal>
          </div>
          <Reveal delay={150} className="flex flex-col gap-4 sm:flex-row">
            <Button href="/franchise">Başvuru Formu</Button>
            <Button href="/konseptimiz" variant="outline-light" arrow={false}>
              Konsepti İncele
            </Button>
          </Reveal>
        </div>
      </section>

      <InstagramStrip />

      {/* ───────────── Visit ───────────── */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="Bizi Ziyaret Edin"
              title="Karabük'te, 100. Yıl'da sizi bekliyoruz."
              description="Tatlı bir mola, bir fincan Türk kahvesi ya da arkadaşlarınızla paylaşacağınız bir Bambaşka Box için uğrayın."
            />
            <Reveal delay={120} className="mt-10 space-y-5">
              <a
                href={site.mapsLink}
                target="_blank"
                rel="noreferrer"
                className="group flex items-start gap-4"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-forest-800 text-gold-300">
                  <MapPinIcon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-xs font-bold uppercase tracking-[0.2em] text-caramel-500">
                    Adres
                  </span>
                  <span className="mt-1 block text-ink-700 group-hover:text-forest-800">
                    {site.address}
                  </span>
                </span>
              </a>
              <a href={site.phoneHref} className="group flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-forest-800 text-gold-300">
                  <PhoneIcon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-xs font-bold uppercase tracking-[0.2em] text-caramel-500">
                    Telefon
                  </span>
                  <span className="mt-1 block text-ink-700 group-hover:text-forest-800">
                    {site.phone}
                  </span>
                </span>
              </a>
              <a
                href={site.instagram}
                target="_blank"
                rel="noreferrer"
                className="group flex items-start gap-4"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-forest-800 text-gold-300">
                  <InstagramIcon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-xs font-bold uppercase tracking-[0.2em] text-caramel-500">
                    Instagram
                  </span>
                  <span className="mt-1 block text-ink-700 group-hover:text-forest-800">
                    {site.instagramHandle}
                  </span>
                </span>
              </a>
            </Reveal>
            <Reveal delay={200} className="mt-10">
              <Link
                href="/iletisim"
                className="group inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-forest-800"
              >
                Yol tarifi ve iletişim
                <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>
          <Reveal
            delay={100}
            className="relative min-h-[380px] overflow-hidden rounded-[2rem] shadow-soft"
          >
            <Image
              src="/images/hero/magnolia.webp"
              alt="Bambaşka Waffle magnolia tatlısı"
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover"
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}

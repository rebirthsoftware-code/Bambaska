import Image from "next/image";
import { Button } from "./Button";
import { Reveal } from "./Reveal";

const contents = [
  "Waffle çubukları",
  "Brownie cake",
  "Çıtır profiterol",
  "Mevsim meyveleri",
  "File fındık",
  "File Antep fıstığı",
  "2 porsiyon çikolata",
];

export function BoxFeature() {
  return (
    <section className="relative overflow-hidden bg-cream-200 py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        <div className="order-2 lg:order-1">
          <Reveal>
            <p className="mb-4 inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.28em] text-caramel-500">
              <span className="h-px w-8 bg-current" aria-hidden />
              Paylaşmalık
            </p>
            <h2 className="font-display text-4xl leading-[1.05] tracking-tight text-forest-800 sm:text-5xl lg:text-[3.4rem]">
              Bambaşka Box: masaya gelen{" "}
              <em className="italic text-caramel-500">en keyifli</em> kutu.
            </h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-ink-500 sm:text-lg">
              Dokuz bölme, tek kutu. Waffle, brownie ve çıtır profiterolün
              yanında taze meyveler ve daldırmak için iki porsiyon çikolata.
              Arkadaşlarınızla paylaşmak için tasarlandı.
            </p>
          </Reveal>
          <Reveal delay={120} className="mt-8 flex flex-wrap gap-2">
            {contents.map((c) => (
              <span
                key={c}
                className="rounded-full border border-forest-800/15 bg-cream-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-forest-800"
              >
                {c}
              </span>
            ))}
          </Reveal>
          <Reveal
            delay={200}
            className="mt-10 flex flex-wrap items-center gap-5"
          >
            <Button href="/menu#waffle" variant="forest">
              Menüde Gör
            </Button>
            <p className="font-display text-2xl text-forest-800">₺1.350</p>
          </Reveal>
        </div>
        <Reveal delay={80} className="order-1 lg:order-2">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-soft sm:aspect-square lg:aspect-[4/5]">
            <Image
              src="/images/menu/bambaska-box.webp"
              alt="Bambaşka Box: waffle, brownie, profiterol, meyveler ve çikolatalar"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

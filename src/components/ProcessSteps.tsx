import { Reveal } from "./Reveal";

const steps = [
  {
    n: "01",
    title: "Siparişle dökülür",
    text: "Hamur önceden pişmez. Her waffle siparişiniz geldiğinde plakaya dökülür; dışı çıtır, içi yumuşak.",
  },
  {
    n: "02",
    title: "Gerçek Belçika çikolatası",
    text: "Sütlü, bitter ve fildişi; üçü de gerçek Belçika çikolatası. Sıcakken cömertçe sürülür.",
  },
  {
    n: "03",
    title: "Her sabah taze meyve",
    text: "Muz, kivi ve çilek güne başlarken dilimlenir. Mevsimine göre menü değişir.",
  },
  {
    n: "04",
    title: "File fıstıkla biter",
    text: "Son dokunuş file Antep fıstığı, fındık ve ince ince bitter sos. Sonra masanıza.",
  },
];

export function ProcessSteps() {
  return (
    <ol className="grid gap-px overflow-hidden rounded-[2rem] bg-forest-800/10 ring-1 ring-forest-800/10 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((s, i) => (
        <Reveal
          key={s.n}
          as="li"
          delay={i * 90}
          className="group relative bg-cream-50 p-7 transition-colors hover:bg-forest-800 lg:p-9"
        >
          <span className="font-display text-5xl text-gold-500 transition-colors group-hover:text-gold-300">
            {s.n}
          </span>
          <h3 className="mt-6 font-display text-2xl text-forest-800 transition-colors group-hover:text-cream-100">
            {s.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-ink-500 transition-colors group-hover:text-cream-100/75">
            {s.text}
          </p>
          <span
            className="waffle-grid pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-40"
            aria-hidden
          />
        </Reveal>
      ))}
    </ol>
  );
}

const words = [
  "Taze Waffle",
  "Belçika Çikolatası",
  "Cheesecake",
  "Çıtır Profiterol",
  "Türk Kahvesi",
  "Sen Başkasın",
  "Karabük · 2019",
];

export function Marquee({ dark = false }: { dark?: boolean }) {
  const row = [...words, ...words];
  return (
    <div
      className={`relative overflow-hidden border-y py-5 ${
        dark
          ? "border-gold-400/20 bg-forest-900 text-gold-300"
          : "border-forest-800/10 bg-cream-200 text-forest-800"
      }`}
      aria-hidden
    >
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
        {row.map((w, i) => (
          <span
            key={i}
            className="flex items-center gap-10 font-display text-xl italic sm:text-2xl"
          >
            {w}
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold-400" />
          </span>
        ))}
      </div>
    </div>
  );
}

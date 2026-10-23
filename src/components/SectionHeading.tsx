import { Reveal } from "./Reveal";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  className = "",
}: Props) {
  const dark = tone === "dark";
  return (
    <Reveal
      className={`${align === "center" ? "mx-auto text-center" : ""} max-w-2xl ${className}`}
    >
      {eyebrow && (
        <p
          className={`mb-4 inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.28em] ${
            dark ? "text-gold-400" : "text-caramel-500"
          }`}
        >
          <span className="h-px w-8 bg-current" aria-hidden />
          {eyebrow}
        </p>
      )}
      <h2
        className={`font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.4rem] ${
          dark ? "text-cream-100" : "text-forest-800"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-5 text-base leading-relaxed sm:text-lg ${dark ? "text-cream-100/70" : "text-ink-500"}`}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}

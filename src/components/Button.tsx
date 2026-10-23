import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowIcon } from "./icons";

type Variant = "gold" | "forest" | "outline" | "outline-light" | "ghost";

const styles: Record<Variant, string> = {
  gold: "bg-gold-400 text-forest-900 hover:bg-gold-300",
  forest: "bg-forest-800 text-gold-300 hover:bg-forest-700",
  outline:
    "border border-forest-800/30 text-forest-800 hover:border-forest-800 hover:bg-forest-800 hover:text-cream-100",
  "outline-light":
    "border border-cream-100/40 text-cream-100 hover:border-gold-400 hover:text-gold-300",
  ghost: "text-forest-800 hover:text-caramel-500",
};

type Props = {
  href: ComponentProps<typeof Link>["href"];
  children: ReactNode;
  variant?: Variant;
  arrow?: boolean;
  className?: string;
  external?: boolean;
};

export function Button({
  href,
  children,
  variant = "gold",
  arrow = true,
  className = "",
  external,
}: Props) {
  const cls = `group inline-flex items-center gap-2.5 rounded-full px-6 py-3.5 text-[12px] font-bold uppercase tracking-[0.18em] transition-all duration-300 hover:-translate-y-0.5 ${styles[variant]} ${className}`;
  const inner = (
    <>
      {children}
      {arrow && (
        <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </>
  );
  if (external) {
    return (
      <a href={String(href)} target="_blank" rel="noreferrer" className={cls}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

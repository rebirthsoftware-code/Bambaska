import Link from "next/link";

type Props = {
  className?: string;
  variant?: "mark" | "heart" | "full";
  label?: string;
};

/** Brand logo rendered through a CSS mask so it inherits `currentColor`. */
export function Logo({
  className = "h-10 w-28",
  variant = "mark",
  label = "Bambaşka Waffle",
}: Props) {
  const file =
    variant === "heart"
      ? "/images/brand/logo-heart.svg"
      : variant === "full"
        ? "/images/brand/logo-full.svg"
        : "/images/brand/logo-mark.svg";
  return (
    <span
      role="img"
      aria-label={label}
      className={`logo-mask ${className}`}
      style={{ ["--logo" as string]: `url(${file})` }}
    />
  );
}

export function LogoLink({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className="inline-flex items-center"
      aria-label="Bambaşka Waffle anasayfa"
    >
      <Logo className={className} />
    </Link>
  );
}

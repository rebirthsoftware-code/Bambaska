import Link from "next/link";
import { nav, site } from "@/data/site";
import { Logo } from "./Logo";
import { InstagramIcon, MailIcon, MapPinIcon, PhoneIcon } from "./icons";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-forest-900 text-cream-100">
      <div className="waffle-grid absolute inset-0 opacity-30" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-5 pb-10 pt-16 sm:px-8 lg:pt-24">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Logo variant="full" className="h-20 w-40 text-gold-400" />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-cream-100/70">
              {site.description}
            </p>
            <p className="mt-6 font-display text-2xl italic text-gold-300">
              Sen Başkasın.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.24em] text-gold-400">
              Keşfet
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-cream-100/80 transition hover:text-gold-300"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/aydinlatma-metni"
                  className="text-cream-100/80 transition hover:text-gold-300"
                >
                  KVKK Aydınlatma Metni
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.24em] text-gold-400">
              Franchise
            </h3>
            <p className="mt-5 text-sm leading-relaxed text-cream-100/70">
              Bu heyecana sen de ortak ol. Kendi şehrinde bir Bambaşka Waffle
              aç.
            </p>
            <Link
              href="/franchise"
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-gold-400/60 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.18em] text-gold-300 transition hover:bg-gold-400 hover:text-forest-900"
            >
              Başvuru Formu
            </Link>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.24em] text-gold-400">
              İletişim
            </h3>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex gap-3">
                <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                <a
                  href={site.mapsLink}
                  target="_blank"
                  rel="noreferrer"
                  className="text-cream-100/80 hover:text-gold-300"
                >
                  {site.address}
                </a>
              </li>
              <li className="flex gap-3">
                <PhoneIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                <a
                  href={site.phoneHref}
                  className="text-cream-100/80 hover:text-gold-300"
                >
                  {site.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <MailIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                <a
                  href={site.emailHref}
                  className="break-all text-cream-100/80 hover:text-gold-300"
                >
                  {site.email}
                </a>
              </li>
              <li className="flex gap-3">
                <InstagramIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="text-cream-100/80 hover:text-gold-300"
                >
                  {site.instagramHandle}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-cream-100/10 pt-6 text-xs text-cream-100/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2019–2026 Bambaşka Waffle. Tüm hakları saklıdır.</p>
          <p>
            Bu site <span className="text-cream-100/80">Rebirth Software</span>{" "}
            tarafından yapılmıştır.
          </p>
        </div>
      </div>
    </footer>
  );
}

import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import {
  InstagramIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
} from "@/components/icons";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "İletişim",
  description: `Bambaşka Waffle iletişim: ${site.address}. Telefon ${site.phone}.`,
};

const cards = [
  {
    icon: MapPinIcon,
    label: "Adres",
    value: site.address,
    href: site.mapsLink,
    external: true,
  },
  {
    icon: PhoneIcon,
    label: "Telefon",
    value: site.phone,
    href: site.phoneHref,
  },
  { icon: MailIcon, label: "E-posta", value: site.email, href: site.emailHref },
  {
    icon: InstagramIcon,
    label: "Instagram",
    value: site.instagramHandle,
    href: site.instagram,
    external: true,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="İletişim"
        title={
          <>
            Bizimle <em className="italic text-gold-300">iletişime</em> geçin.
          </>
        }
        description="Sorularınız, önerileriniz ya da sadece merhaba demek için. Karabük 100. Yıl'da kapımız açık."
        compact
      />

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map((c, i) => (
              <Reveal key={c.label} delay={i * 80}>
                <a
                  href={c.href}
                  target={c.external ? "_blank" : undefined}
                  rel={c.external ? "noreferrer" : undefined}
                  className="group flex h-full flex-col rounded-3xl bg-cream-50 p-6 shadow-card ring-1 ring-forest-800/5 transition hover:-translate-y-1 hover:shadow-soft"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-forest-800 text-gold-300">
                    <c.icon className="h-5 w-5" />
                  </span>
                  <span className="mt-6 text-[11px] font-bold uppercase tracking-[0.22em] text-caramel-500">
                    {c.label}
                  </span>
                  <span className="mt-2 break-words text-[15px] leading-relaxed text-ink-900 group-hover:text-forest-800">
                    {c.value}
                  </span>
                </a>
              </Reveal>
            ))}
          </div>

          <Reveal
            delay={200}
            className="mt-10 overflow-hidden rounded-[2rem] shadow-soft ring-1 ring-forest-800/10"
          >
            <iframe
              src={site.mapsEmbed}
              title="Bambaşka Waffle konumu"
              width="100%"
              height="480"
              style={{ border: 0, display: "block" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Reveal>

          <Reveal
            delay={250}
            className="mt-10 flex flex-col items-start justify-between gap-6 rounded-3xl bg-forest-800 p-8 text-cream-100 sm:flex-row sm:items-center"
          >
            <div>
              <h2 className="font-display text-2xl">
                Franchise hakkında mı konuşmak istiyorsunuz?
              </h2>
              <p className="mt-2 text-sm text-cream-100/70">
                Başvuru formunu doldurun, ekibimiz sizi arasın.
              </p>
            </div>
            <Button href="/franchise">Başvuru Formu</Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}

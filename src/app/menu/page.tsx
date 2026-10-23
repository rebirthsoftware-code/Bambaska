import type { Metadata } from "next";
import { MenuBrowser } from "@/components/MenuBrowser";
import { PageHero } from "@/components/PageHero";
import { categories } from "@/data/menu";

export const metadata: Metadata = {
  title: "Menü",
  description:
    "Bambaşka Waffle menüsü: özgün waffle çeşitleri, çıtır profiterol, cheesecake, sıcak ve soğuk içecekler.",
};

export default function MenuPage() {
  const withItems = categories.filter((c) => c.items.length > 0);
  return (
    <>
      <PageHero
        eyebrow="Menü"
        title={
          <>
            Tatlı bir <em className="italic text-gold-300">seçim</em> yapın.
          </>
        }
        description="Her ürün kendi mutfağımızda, kendi reçetemizle, günlük taze hazırlanır. Fiyatlar güncel menümüzü yansıtır ve değişiklik gösterebilir."
        image="/images/hero/box.webp"
        imageAlt="Bambaşka Box: waffle, brownie, profiterol ve meyveler"
        compact
      />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <MenuBrowser categories={withItems} />
      </div>
    </>
  );
}

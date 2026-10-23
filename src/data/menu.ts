export type Product = {
  slug: string;
  name: string;
  price: number;
  description?: string;
  allergens?: string[];
  image?: string;
  featured?: boolean;
};

export type Category = {
  id: string;
  title: string;
  subtitle: string;
  items: Product[];
};

const img = (name: string) => `/images/menu/${name}.webp`;

export const categories: Category[] = [
  {
    id: "special",
    title: "Bambaşka Special",
    subtitle: "Yalnızca burada bulacağınız imza tatlar.",
    items: [
      {
        slug: "citir-profiterol",
        name: "Çıtır Profiterol",
        price: 280,
        description:
          "Belçika çikolatası, file Antep fıstığı ve file fındık ile porsiyon şeklinde servis edilir.",
        allergens: ["Fıstık", "Gluten"],
        image: img("citir-profiterol"),
        featured: true,
      },
      {
        slug: "bambaska-croissant",
        name: "Bambaşka Croissant",
        price: 390,
        description:
          "Kruvasan hamuru, BW krema, Belçika çikolatası, çilek ve file Antep fıstığı ile servis edilir.",
        allergens: ["Fıstık", "Gluten"],
        image: img("bambaska-croissant"),
        featured: true,
      },
      {
        slug: "feuilletine-bowl",
        name: "Feuilletine Bowl",
        price: 320,
        description:
          "Çilek, muz, Belçika çikolatası ve krep kırığı ile servis edilir.",
        allergens: ["Fıstık", "Gluten"],
        image: img("feuilletine-bowl"),
      },
      { slug: "krep-sarma", name: "Krep Sarma", price: 370 },
      { slug: "bueno", name: "Bueno", price: 270 },
    ],
  },
  {
    id: "klasik",
    title: "Bambaşka Klasik",
    subtitle: "Vazgeçilmez tatlılar, Bambaşka dokunuşuyla.",
    items: [
      {
        slug: "suffle",
        name: "Sufle",
        price: 250,
        description: "Sıcak, akışkan çikolata kalbiyle.",
        allergens: ["Gluten"],
        image: img("suffle"),
      },
      {
        slug: "brownie",
        name: "Brownie",
        price: 260,
        description:
          "Brownie cake, kırık fıstık, bitter sos ve dondurma ile servis edilir.",
        image: img("brownie"),
      },
      { slug: "ibiza", name: "İbiza", price: 260, image: img("ibiza") },
      { slug: "red-velvet", name: "Red Velvet", price: 250 },
    ],
  },
  {
    id: "waffle",
    title: "Waffle",
    subtitle: "Taptaze pişen hamur, bol meyve ve gerçek çikolata.",
    items: [
      {
        slug: "bambaska-waffle",
        name: "Bambaşka Waffle",
        price: 310,
        description:
          "Kakaolu waffle hamuru, sütlü çikolata, fildişi çikolata, muz, kivi, çilek, file Antep fıstığı, beyaz ve bitter sos ile servis edilir.",
        image: img("bambaska-waffle"),
        featured: true,
      },
      {
        slug: "klasik-waffle",
        name: "Klasik Waffle",
        price: 300,
        description:
          "Waffle hamuru, sütlü çikolata, muz, kivi, çilek, file fındık ve bitter sos ile servis edilir.",
        image: img("klasik-waffle"),
      },
      {
        slug: "kendin-yarat-waffle",
        name: "Kendin Yarat Waffle",
        price: 325,
        description:
          "Kendi seçeceğiniz malzemelerle hazırlanan, size özel waffle.",
        image: img("kendin-yarat-waffle"),
        featured: true,
      },
      {
        slug: "waffle-bowl",
        name: "Waffle Bowl",
        price: 315,
        description:
          "Dilimlenmiş waffle hamuru, sütlü çikolata, fildişi çikolata, muz, kivi, çilek, file fındık ve bitter sos ile servis edilir.",
        image: img("waffle-bowl"),
      },
      {
        slug: "bambaska-box",
        name: "Bambaşka Box",
        price: 1350,
        description:
          "Waffle hamuru, brownie cake, çıtır profiterol, mevsim meyveleri, file fındık, file Antep fıstığı ve 2 porsiyon çikolata ile servis edilir. Paylaşmak için ideal.",
        image: img("bambaska-box"),
        featured: true,
      },
      {
        slug: "belgian-waffle",
        name: "Belgian Waffle",
        price: 375,
        description:
          "Belçika çikolatası, file fındık, file Antep fıstığı, çilek ve pudra şekeri ile servis edilir.",
        image: img("belgian-waffle"),
      },
      {
        slug: "fistik-ruyasi-waffle",
        name: "Fıstık Rüyası Waffle",
        price: 320,
        description:
          "Waffle hamuru, Antep fıstıklı çikolata, muz, kivi, çilek, file Antep fıstığı ve bitter sos ile servis edilir.",
        image: img("fistik-ruyasi-waffle"),
      },
      { slug: "belgian-bowl", name: "Belgian Bowl", price: 390 },
    ],
  },
  {
    id: "cheesecake",
    title: "Cheesecake",
    subtitle: "Kremamsı, hafif ve her dilimi özenle.",
    items: [
      {
        slug: "orman-meyveli-cheesecake",
        name: "Orman Meyveli Cheesecake",
        price: 260,
        image: img("orman-meyveli-cheesecake"),
      },
      {
        slug: "basque-cheesecake",
        name: "Basque Cheesecake",
        price: 310,
        description: "Belçika çikolatası ile servis edilir.",
        image: img("basque-cheesecake"),
        featured: true,
      },
      { slug: "brownie-cheesecake", name: "Brownie Cheesecake", price: 260 },
    ],
  },
  {
    id: "soguk-icecekler",
    title: "Soğuk İçecekler",
    subtitle: "Serinletici eşlikçiler.",
    items: [
      { slug: "su", name: "Su", price: 20, image: img("su") },
      {
        slug: "sade-soda",
        name: "Sade Soda",
        price: 45,
        image: img("sade-soda"),
      },
      {
        slug: "meyveli-soda",
        name: "Meyveli Soda",
        price: 55,
        image: img("meyveli-soda"),
      },
      {
        slug: "coca-cola",
        name: "Coca-Cola",
        price: 80,
        image: img("coca-cola"),
      },
      { slug: "sprite", name: "Sprite", price: 80, image: img("sprite") },
      { slug: "fuse-tea", name: "Fuse Tea", price: 80, image: img("fuse-tea") },
      {
        slug: "churchill",
        name: "Churchill",
        price: 110,
        image: img("churchill"),
      },
    ],
  },
  {
    id: "sicak-icecekler",
    title: "Sıcak İçecekler",
    subtitle: "Tatlının yanına sıcacık bir mola.",
    items: [
      { slug: "cay", name: "Çay", price: 30, image: img("cay") },
      {
        slug: "fincan-cay",
        name: "Fincan Çay",
        price: 60,
        image: img("fincan-cay"),
      },
      {
        slug: "turk-kahvesi",
        name: "Türk Kahvesi",
        price: 100,
        image: img("turk-kahvesi"),
      },
      {
        slug: "nescafe-gold",
        name: "Nescafe Gold",
        price: 110,
        image: img("nescafe-gold"),
      },
      {
        slug: "sutlu-nescafe",
        name: "Sütlü Nescafe",
        price: 120,
        image: img("sutlu-nescafe"),
      },
      {
        slug: "sicak-cikolata",
        name: "Sıcak Çikolata",
        price: 95,
        image: img("sicak-cikolata"),
      },
      { slug: "sut", name: "Süt", price: 80 },
    ],
  },
];

export const featuredProducts: Product[] = categories
  .flatMap((c) => c.items)
  .filter((p) => p.featured);

export const formatPrice = (price: number) =>
  new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  }).format(price);

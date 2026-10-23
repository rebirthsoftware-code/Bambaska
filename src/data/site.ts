export const site = {
  name: "Bambaşka Waffle",
  tagline: "Sen Başkasın",
  description:
    "Karabük'ün ilk geniş menülü waffle markası. 2019'dan beri özgün reçeteler, Belçika çikolatası ve sıcak bir atmosferle tatlı bir deneyim.",
  url: "https://bambaşkawaffle.com.tr",
  phone: "+90 542 261 92 10",
  phoneHref: "tel:+905422619210",
  email: "bambaska@bambaşkawaffle.com.tr",
  emailHref: "mailto:bambaska@xn--bambakawaffle-mtc.com.tr",
  address: "100. Yıl Mah. 1002. Cd. No:38/40A, 78100 Merkez / Karabük",
  addressShort: "100. Yıl, 1002. Cd. No:38/40A, Karabük",
  instagram: "https://www.instagram.com/bambaska.waffle/",
  instagramHandle: "@bambaska.waffle",
  mapsEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2970.052784299994!2d32.6605713!3d41.2199422!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x408354ac28fa38cd%3A0x3c342e070fb5c686!2sBamba%C5%9Fka+Waffle!5e0!3m2!1str!2str!4v1702316164437!5m2!1str!2str",
  mapsLink:
    "https://www.google.com/maps/search/?api=1&query=Bamba%C5%9Fka+Waffle+Karab%C3%BCk",
  foundedYear: 2019,
} as const;

export const nav = [
  { href: "/", label: "Anasayfa" },
  { href: "/menu", label: "Menü" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/konseptimiz", label: "Konseptimiz" },
  { href: "/franchise", label: "Franchise" },
  { href: "/iletisim", label: "İletişim" },
] as const;

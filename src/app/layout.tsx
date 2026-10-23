import type { Metadata, Viewport } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { site } from "@/data/site";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  variable: "--font-playfair",
  style: ["normal", "italic"],
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://xn--bambakawaffle-mtc.com.tr"),
  title: {
    default: "Bambaşka Waffle | Sen Başkasın",
    template: "%s | Bambaşka Waffle",
  },
  description: site.description,
  keywords: [
    "waffle",
    "Karabük",
    "tatlı",
    "cheesecake",
    "profiterol",
    "franchise",
    "Bambaşka Waffle",
  ],
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: site.name,
    title: "Bambaşka Waffle | Sen Başkasın",
    description: site.description,
    images: [
      {
        url: "/images/hero/magnolia.webp",
        width: 1600,
        height: 1600,
        alt: "Bambaşka Waffle",
      },
    ],
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#002c07",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="tr"
      className={`${playfair.variable} ${manrope.variable} h-full`}
    >
      <head>
        {/* Marks that JS is running so scroll-reveal styles never hide content without it. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body className="flex min-h-full flex-col">
        <a
          href="#icerik"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-gold-400 focus:px-4 focus:py-2 focus:text-forest-900"
        >
          İçeriğe geç
        </a>
        <Header />
        <main id="icerik" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

# Bambaşka Waffle

Bambaşka Waffle'ın (Karabük) kurumsal web sitesi. Eski PHP sitesinin içeriği korunarak Next.js ile yeniden tasarlandı.

## Geliştirme

```bash
npm install
npm run dev
```

Site <http://localhost:3000> adresinde açılır.

## Komutlar

| Komut           | Açıklama                      |
| --------------- | ----------------------------- |
| `npm run dev`   | Geliştirme sunucusu           |
| `npm run build` | Üretim derlemesi              |
| `npm run start` | Üretim sunucusu               |
| `npm run lint`  | ESLint                        |

## Yapı

- `src/app` — sayfalar (App Router): `/`, `/menu`, `/hakkimizda`, `/konseptimiz`, `/franchise`, `/iletisim`, `/aydinlatma-metni`
- `src/components` — paylaşılan bileşenler (Header, Footer, ProductCard, Gallery, FranchiseForm…)
- `src/data` — içerik: `menu.ts` (ürünler ve fiyatlar), `site.ts` (iletişim bilgileri, navigasyon), `cities.ts`
- `public/images` — optimize edilmiş görseller (WebP), `public/video` — mekân videosu

Menüyü güncellemek için `src/data/menu.ts` dosyasını düzenlemek yeterlidir.

## Franchise formu

Form bir Server Action ile sunucuda doğrulanır. `FRANCHISE_WEBHOOK_URL` ortam değişkeni tanımlıysa başvuru JSON olarak o adrese POST edilir; tanımlı değilse sunucu konsoluna yazılır. Bkz. `.env.example`.

import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "KVKK Aydınlatma Metni",
  description:
    "Bambaşka Waffle kişisel verilerin korunması kanunu aydınlatma metni.",
  robots: { index: false },
};

const rights = [
  "Kişisel veri işlenip işlenmediğini öğrenme,",
  "Kişisel veriler işlenmişse buna ilişkin bilgi talep etme,",
  "Kişisel verilerin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme,",
  "Yurt içinde veya yurt dışında kişisel verilerin aktarıldığı üçüncü kişileri bilme,",
  "Kişisel verilerin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme,",
  "Kişisel verilerin silinmesini veya yok edilmesini isteme,",
  "Kişisel verilerin aktarıldığı üçüncü kişilere bu taleplerin bildirilmesini isteme,",
  "İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi sonucu aleyhinize bir sonuç doğmasına itiraz etme,",
  "Kişisel verilerin kanuna aykırı işlenmesi nedeniyle zarara uğramanız hâlinde zararın giderilmesini talep etme.",
];

export default function KvkkPage() {
  return (
    <>
      <PageHero eyebrow="KVKK" title="Aydınlatma Metni" compact />
      <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8 lg:py-24 [&_h2]:mt-12 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:text-forest-800 [&_p]:mt-4 [&_p]:leading-relaxed [&_p]:text-ink-700">
        <p>
          Bambaşka Waffle olarak, kişisel verilerinizin güvenliği konusuna azami
          hassasiyet göstermekteyiz. Bu bilinçle, ürün ve hizmetlerimizden
          faydalanan kişiler dahil olmak üzere, şirketimizle ilişkili tüm
          şahıslara ait her türlü kişisel verinin 6698 sayılı Kişisel Verilerin
          Korunması Kanunu (&ldquo;KVKK&rdquo;) uyarınca işlenmesine ve muhafaza
          edilmesine büyük önem atfetmekteyiz. Veri Sorumlusu sıfatıyla, kişisel
          verilerinizi aşağıda belirtilen çerçevede ve mevzuatın gerektirdiği
          sınırlar dahilinde işlemekteyiz.
        </p>

        <h2>1. Kişisel Verilerin Toplanması, İşlenmesi ve İşleme Amaçları</h2>
        <p>
          Kişisel verileriniz, şirketimizin sunduğu ürün, hizmet veya ticari
          faaliyetlere bağlı olarak değişkenlik gösterebilmekle birlikte;
          otomatik ya da otomatik olmayan yöntemlerle, ofisler, şubeler,
          bayiler, çağrı merkezi, internet sitesi, sosyal medya mecraları, mobil
          uygulamalar ve benzeri vasıtalarla sözlü, yazılı ya da elektronik
          olarak toplanabilir. Şirketimizin ürün ve hizmetlerinden
          faydalandığınız sürece kişisel verileriniz işlenebilecek ve
          güncellenebilecektir.
        </p>

        <h2>
          2. İşlenen Kişisel Verilerin Kimlere ve Hangi Amaçlarla
          Aktarılabileceği
        </h2>
        <p>
          Toplanan kişisel verileriniz; ürün ve hizmetlerin sizlere sunulması,
          kullanım alışkanlıklarınıza göre özelleştirilmesi, şirketimizin hukuki
          ve ticari güvenliğinin sağlanması, ticari stratejilerimizin
          uygulanması ve insan kaynakları politikalarımızın yürütülmesi
          amaçlarıyla iş ortaklarımıza, tedarikçilerimize, hissedarlarımıza,
          kanunen yetkili kamu kurumlarına ve özel kişilere KVKK&rsquo;nın 8. ve
          9. maddelerinde belirtilen veri işleme şartları çerçevesinde
          aktarılabilir.
        </p>

        <h2>3. Kişisel Verilerin Toplanma Yöntemi ve Hukuki Sebebi</h2>
        <p>
          Kişisel verileriniz, her türlü sözlü, yazılı ya da elektronik ortamda,
          yukarıda belirtilen amaçlar doğrultusunda, sunduğumuz ürün ve
          hizmetlerin yasal çerçevede sağlanabilmesi ve şirketimizin sözleşme ve
          yasal yükümlülüklerini yerine getirebilmesi amacıyla toplanmaktadır.
        </p>

        <h2>4. Kişisel Veri Sahibinin KVKK Kapsamındaki Hakları</h2>
        <ul className="mt-4 list-disc space-y-2 pl-6 leading-relaxed text-ink-700">
          {rights.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>

        <h2>5. Başvuru Yöntemi</h2>
        <p>
          KVKK&rsquo;nın 13. maddesi gereğince, yukarıda belirtilen haklarınızı
          kullanmak için{" "}
          <a
            href={site.emailHref}
            className="font-semibold text-forest-800 underline underline-offset-4"
          >
            {site.email}
          </a>{" "}
          adresine e-posta gönderebilir veya aşağıdaki adrese yazılı olarak
          başvuru yapabilirsiniz:
        </p>
        <p>
          <strong>Adres:</strong> Bambaşka Waffle, {site.address}
        </p>
      </article>
    </>
  );
}

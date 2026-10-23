import { Button } from "@/components/Button";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80svh] items-center overflow-hidden bg-forest-800 text-cream-100">
      <div className="waffle-grid absolute inset-0 opacity-30" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-5 pt-20 sm:px-8">
        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-gold-400">
          404
        </p>
        <h1 className="mt-4 font-display text-5xl sm:text-7xl">
          Bu sayfa <em className="italic text-gold-300">bambaşka</em> bir yerde.
        </h1>
        <p className="mt-6 max-w-md text-cream-100/70">
          Aradığınız sayfa taşınmış ya da hiç var olmamış olabilir. Tatlıya
          dönelim.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Button href="/">Anasayfa</Button>
          <Button href="/menu" variant="outline-light" arrow={false}>
            Menü
          </Button>
        </div>
      </div>
    </section>
  );
}

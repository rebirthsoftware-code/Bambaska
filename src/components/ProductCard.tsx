import Image from "next/image";
import { formatPrice, type Product } from "@/data/menu";

const placeholderGradient = [
  "from-gold-300/60 to-cream-200",
  "from-caramel-500/30 to-cream-200",
  "from-forest-500/20 to-cream-200",
  "from-berry-500/20 to-cream-200",
];

export function ProductCard({
  product,
  index = 0,
  priority = false,
}: {
  product: Product;
  index?: number;
  priority?: boolean;
}) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl bg-cream-50 shadow-card ring-1 ring-forest-800/5 transition-all duration-500 hover:-translate-y-1 hover:shadow-soft">
      <div className="relative aspect-[4/3] overflow-hidden">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            priority={priority}
            sizes="(min-width: 1280px) 22vw, (min-width: 768px) 45vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div
            className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${placeholderGradient[index % placeholderGradient.length]}`}
          >
            <span className="font-display text-5xl italic text-forest-800/30">
              BW
            </span>
          </div>
        )}
        <span className="absolute left-4 top-4 rounded-full bg-cream-50/90 px-3 py-1 text-xs font-bold tracking-wide text-forest-800 backdrop-blur">
          {formatPrice(product.price)}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-xl text-forest-800">{product.name}</h3>
        {product.description && (
          <p className="mt-2 text-sm leading-relaxed text-ink-500">
            {product.description}
          </p>
        )}
        {product.allergens && product.allergens.length > 0 && (
          <p className="mt-auto pt-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-caramel-500">
            Alerjen: {product.allergens.join(", ")}
          </p>
        )}
      </div>
    </article>
  );
}

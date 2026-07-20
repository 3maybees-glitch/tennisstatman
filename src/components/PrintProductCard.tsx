import Image from "next/image";
import { ExternalLink } from "lucide-react";
import type { PrintProduct } from "@/lib/prints";

export function PrintProductCard({ product }: { product: PrintProduct }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-white/5 bg-navy-light transition-all hover:border-gold/30">
      <div className="relative aspect-[4/3] overflow-hidden bg-navy">
        <Image
          src={product.imageSrc}
          alt={product.imageAlt}
          fill
          className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/90 via-navy/40 to-transparent p-4 pt-12">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-gold">
            {product.tourLabel}
          </p>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-medium uppercase tracking-wider text-muted">
          {product.subtitle}
        </p>
        <h2 className="mt-2 text-xl font-bold text-white group-hover:text-gold-light">
          {product.title}
        </h2>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
          {product.description}
        </p>
        <a
          href={product.etsyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-gold px-5 py-3 text-sm font-semibold text-navy transition-colors hover:bg-gold-light"
        >
          Buy on Etsy
          <ExternalLink size={15} aria-hidden />
        </a>
      </div>
    </article>
  );
}

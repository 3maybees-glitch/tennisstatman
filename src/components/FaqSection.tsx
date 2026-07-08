import type { FaqItem } from "@/lib/seo/json-ld";

type Props = {
  title?: string;
  faqs: FaqItem[];
};

export function FaqSection({ title = "Frequently asked questions", faqs }: Props) {
  return (
    <section
      className="border-t border-white/5 bg-navy-light/30 py-16"
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto max-w-3xl px-6">
        <h2 id="faq-heading" className="text-2xl font-bold">
          {title}
        </h2>
        <div className="mt-8 space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-2xl border border-white/10 bg-navy-light open:border-gold/25"
            >
              <summary className="cursor-pointer list-none px-5 py-4 font-medium marker:content-none [&::-webkit-details-marker]:hidden">
                <span className="flex items-center justify-between gap-4">
                  {faq.question}
                  <span
                    className="shrink-0 text-gold transition-transform group-open:rotate-45"
                    aria-hidden
                  >
                    +
                  </span>
                </span>
              </summary>
              <p className="border-t border-white/5 px-5 py-4 text-sm leading-relaxed text-muted">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

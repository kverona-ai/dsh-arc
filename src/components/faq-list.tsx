import { FAQS } from "@/data/faq";
import { cn } from "@/lib/utils";
import { FAQS_EN } from "@/data/en/faq";
import { useLocale } from "@/lib/locale";

/**
 * Questions are real headings, not <dt>: answer engines and screen readers both
 * chunk this page by heading, and a <dl> may not contain heading content.
 */
export function FaqList({
  className,
  limit,
  headingLevel = 2,
}: {
  className?: string;
  limit?: number;
  headingLevel?: 2 | 3;
}) {
  const locale = useLocale();
  const faqs = locale === "en" ? FAQS_EN : FAQS;
  const items = limit ? faqs.slice(0, limit) : faqs;
  const Heading = headingLevel === 3 ? "h3" : "h2";
  return (
    <div className={cn("grid gap-3", className)}>
      {items.map((item) => (
        <article
          key={item.q}
          className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)] sm:p-6"
        >
          <Heading className="text-lg font-medium">{item.q}</Heading>
          <p className="mt-2 text-sm leading-relaxed text-muted">{item.a}</p>
        </article>
      ))}
    </div>
  );
}

import { FAQS } from "@/data/faq";
import { cn } from "@/lib/utils";

export function FaqList({
  className,
  limit,
}: {
  className?: string;
  limit?: number;
}) {
  const items = limit ? FAQS.slice(0, limit) : FAQS;
  return (
    <dl className={cn("grid gap-3", className)}>
      {items.map((item) => (
        <div key={item.q} className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)] sm:p-6">
          <dt className="text-lg font-medium">{item.q}</dt>
          <dd className="mt-2 text-sm leading-relaxed text-muted">{item.a}</dd>
        </div>
      ))}
    </dl>
  );
}

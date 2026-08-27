import { Link } from "@tanstack/react-router";
import type { ComponentProps, ReactNode } from "react";
import { localizedPath, useLocale } from "@/lib/locale";

export function LocalizedLink({
  to,
  children,
  ...props
}: {
  to: string;
  children: ReactNode;
} & Omit<ComponentProps<"a">, "href">) {
  const locale = useLocale();

  return (
    <Link to={localizedPath(to, locale) as never} {...props}>
      {children}
    </Link>
  );
}

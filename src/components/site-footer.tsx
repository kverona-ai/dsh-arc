import { AUTHOR_X, SITE_AUTHOR, SITE_REPO, SOURCE_REPO } from "@/lib/seo";
import { LocalizedLink } from "@/components/localized-link";
import { CreatorAvatar, XLogo } from "@/components/creator-card";
import { useLocale } from "@/lib/locale";
import { HARNESS_RELEASE } from "@/data/release";

export function SiteFooter() {
  const locale = useLocale();
  const en = locale === "en";
  return (
    <footer className="border-t border-border px-4 py-10 sm:px-8 lg:px-12">
      <div className="grid max-w-3xl gap-5 text-sm leading-relaxed text-muted">
        <p>
          {en ? (
            <>
              <span className="text-fg">DSH Brickbook</span> is a source-level reading of DeepSeek
              Harness, pairing a child-friendly explanation with real source names. Aligned with{" "}
              {HARNESS_RELEASE.tag}; not official documentation.
            </>
          ) : (
            <>
              <span className="text-fg">DSH 积木书</span>
              是对 DeepSeek Harness 源码的架构精读，小孩版与源码版对照。内容已对齐{" "}
              {HARNESS_RELEASE.tag}，不是官方文档。
            </>
          )}
        </p>
        <a
          href={AUTHOR_X}
          target="_blank"
          rel="me noopener noreferrer"
          className="flex w-fit items-center gap-3 rounded-lg bg-elevated p-2.5 pr-4 shadow-[var(--shadow-border)] transition-[background-color,transform] duration-[var(--motion-quick)] hover:-translate-y-0.5 hover:bg-surface"
        >
          <CreatorAvatar className="size-10" badge={false} />
          <span className="leading-tight">
            <span className="block font-medium text-fg">@{SITE_AUTHOR}</span>
            <span className="block text-xs">
              {en ? "Wrote and maintains this Brickbook" : "本书的作者与维护者"}
            </span>
          </span>
          <XLogo className="ml-1 size-4 shrink-0 text-fg" />
        </a>
        <p className="flex flex-wrap gap-x-4 gap-y-2">
          <a href={SOURCE_REPO} className="text-accent hover:underline">
            {en ? "Official source" : "官方源码"}
          </a>
          <a href={SITE_REPO} className="text-accent hover:underline">
            {en ? "Site repository" : "本站仓库"}
          </a>
          <LocalizedLink to="/faq" className="text-accent hover:underline">
            {en ? "FAQ" : "常见问题"}
          </LocalizedLink>
          <a href="/sitemap.xml" className="text-accent hover:underline">
            {en ? "Sitemap" : "站点地图"}
          </a>
          <a href="/llms.txt" className="text-accent hover:underline">
            llms.txt
          </a>
        </p>
      </div>
    </footer>
  );
}

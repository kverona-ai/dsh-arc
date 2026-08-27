import { SITE_AUTHOR, SITE_REPO, SOURCE_REPO } from "@/lib/seo";
import { LocalizedLink } from "@/components/localized-link";
import { useLocale } from "@/lib/locale";

export function SiteFooter() {
  const locale = useLocale();
  return (
    <footer className="border-t border-border px-4 py-10 sm:px-8 lg:px-12">
      <div className="grid max-w-3xl gap-4 text-sm leading-relaxed text-muted">
        <p>
          {locale === "en" ? (
            <>
              <span className="text-fg">DSH Brickbook</span> is a source-level reading of DeepSeek
              Harness, pairing a child-friendly explanation with real source names. By {SITE_AUTHOR}
              . Based on the developer preview; not official documentation.
            </>
          ) : (
            <>
              <span className="text-fg">DSH 积木书</span>
              是对 DeepSeek Harness 源码的架构精读，小孩版与源码版对照。作者 {SITE_AUTHOR}
              。依据 developer preview，不是官方文档。
            </>
          )}
        </p>
        <p className="flex flex-wrap gap-x-4 gap-y-2">
          <a href={SOURCE_REPO} className="text-accent hover:underline">
            {locale === "en" ? "Official source" : "官方源码"}
          </a>
          <a href={SITE_REPO} className="text-accent hover:underline">
            {locale === "en" ? "Site repository" : "本站仓库"}
          </a>
          <LocalizedLink to="/faq" className="text-accent hover:underline">
            {locale === "en" ? "FAQ" : "常见问题"}
          </LocalizedLink>
          <a href="/sitemap.xml" className="text-accent hover:underline">
            {locale === "en" ? "Sitemap" : "站点地图"}
          </a>
          <a href="/llms.txt" className="text-accent hover:underline">
            llms.txt
          </a>
        </p>
      </div>
    </footer>
  );
}

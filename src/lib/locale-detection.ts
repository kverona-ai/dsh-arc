import type { Locale } from "@/lib/locale";

const COUNTRY_HEADERS = [
  "x-vercel-ip-country",
  "cf-ipcountry",
  "x-country-code",
  "cloudfront-viewer-country",
] as const;

const CHINESE_READING_REGIONS = new Set(["CN", "HK", "MO", "TW"]);

const REGION_NAMES: Record<string, { zh: string; en: string }> = {
  CN: { zh: "中国大陆", en: "Mainland China" },
  HK: { zh: "中国香港", en: "Hong Kong" },
  MO: { zh: "中国澳门", en: "Macao" },
  TW: { zh: "中国台湾", en: "Taiwan" },
  SG: { zh: "新加坡", en: "Singapore" },
  US: { zh: "美国", en: "United States" },
  CA: { zh: "加拿大", en: "Canada" },
  GB: { zh: "英国", en: "United Kingdom" },
  AU: { zh: "澳大利亚", en: "Australia" },
  NZ: { zh: "新西兰", en: "New Zealand" },
  IN: { zh: "印度", en: "India" },
  JP: { zh: "日本", en: "Japan" },
  KR: { zh: "韩国", en: "South Korea" },
  DE: { zh: "德国", en: "Germany" },
  FR: { zh: "法国", en: "France" },
};

export type LocaleSuggestion = {
  country: string | null;
  countryName: { zh: string; en: string } | null;
  suggestedLocale: Locale;
  source: "ip" | "language" | "default";
};

function normalizeCountry(value: string | null): string | null {
  const country = value?.trim().toUpperCase();
  return country && /^[A-Z]{2}$/.test(country) ? country : null;
}

export function detectCountry(headers: Headers): string | null {
  for (const header of COUNTRY_HEADERS) {
    const country = normalizeCountry(headers.get(header));
    if (country) return country;
  }
  return null;
}

export function suggestionFromHeaders(headers: Headers): LocaleSuggestion {
  const country = detectCountry(headers);
  if (country) {
    return {
      country,
      countryName: REGION_NAMES[country] ?? { zh: country, en: country },
      suggestedLocale: CHINESE_READING_REGIONS.has(country) ? "zh-CN" : "en",
      source: "ip",
    };
  }

  const languages = headers.get("accept-language")?.toLowerCase() ?? "";
  const preferredLanguage = languages
    .split(",")
    .map((part, index) => {
      const [language = "", ...parameters] = part.trim().split(";");
      const quality = parameters
        .map((parameter) => parameter.trim().match(/^q=(0(?:\.\d+)?|1(?:\.0+)?)$/)?.[1])
        .find(Boolean);
      return { language, quality: quality ? Number(quality) : 1, index };
    })
    .filter((entry) => entry.language && entry.quality > 0)
    .sort((a, b) => b.quality - a.quality || a.index - b.index)[0]?.language;
  const prefersChinese =
    preferredLanguage === "zh" || preferredLanguage?.startsWith("zh-") === true;

  return {
    country: null,
    countryName: null,
    suggestedLocale: prefersChinese ? "zh-CN" : languages ? "en" : "zh-CN",
    source: languages ? "language" : "default",
  };
}

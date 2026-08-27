import assert from "node:assert/strict";
import test from "node:test";
import { basePath, localeFromPath, localizedPath } from "./locale.ts";
import { suggestionFromHeaders } from "./locale-detection.ts";
import { NAV } from "../data/nav.ts";
import { NAV_EN } from "../data/en/nav.ts";
import { GROUPS, LAYERS } from "../data/groups.ts";
import { groupsEn, LAYERS_EN } from "../data/en/groups.ts";
import { PACKAGES } from "../data/packages.ts";
import { packagesEn } from "../data/en/packages.ts";
import { GLOSSARY } from "../data/glossary.ts";
import { GLOSSARY_EN } from "../data/en/glossary.ts";
import { FAQS } from "../data/faq.ts";
import { FAQS_EN } from "../data/en/faq.ts";
import { STORY_CHAPTERS } from "../data/story.ts";
import { STORY_CHAPTERS_EN } from "../data/en/story.ts";

test("locale paths round-trip between Chinese and English", () => {
  assert.equal(localeFromPath("/"), "zh-CN");
  assert.equal(localeFromPath("/en/modules/core"), "en");
  assert.equal(basePath("/en/modules/core"), "/modules/core");
  assert.equal(localizedPath("/modules/core", "en"), "/en/modules/core");
  assert.equal(localizedPath("/en/modules/core", "zh-CN"), "/modules/core");
});

test("edge country headers take priority over Accept-Language", () => {
  const english = suggestionFromHeaders(
    new Headers({ "x-vercel-ip-country": "US", "accept-language": "zh-CN" }),
  );
  assert.equal(english.source, "ip");
  assert.equal(english.country, "US");
  assert.equal(english.suggestedLocale, "en");

  const chinese = suggestionFromHeaders(
    new Headers({ "cf-ipcountry": "cn", "accept-language": "en-US" }),
  );
  assert.equal(chinese.country, "CN");
  assert.equal(chinese.suggestedLocale, "zh-CN");
});

test("Accept-Language is used only when no country header exists", () => {
  assert.equal(
    suggestionFromHeaders(new Headers({ "accept-language": "en-US,en;q=0.9" })).suggestedLocale,
    "en",
  );
  assert.equal(
    suggestionFromHeaders(new Headers({ "accept-language": "zh-CN,zh;q=0.9" })).suggestedLocale,
    "zh-CN",
  );
  assert.equal(
    suggestionFromHeaders(new Headers({ "accept-language": "en-US,en;q=0.9,zh-CN;q=0.1" }))
      .suggestedLocale,
    "en",
  );
  assert.equal(
    suggestionFromHeaders(new Headers({ "accept-language": "en;q=0.4,zh-CN;q=0.9" }))
      .suggestedLocale,
    "zh-CN",
  );
});

test("English datasets cover every translated record without Chinese leftovers", () => {
  assert.equal(NAV_EN.length, NAV.length);
  assert.equal(LAYERS_EN.length, LAYERS.length);
  assert.equal(groupsEn(GROUPS).length, GROUPS.length);
  assert.equal(packagesEn(PACKAGES).length, PACKAGES.length);
  assert.equal(GLOSSARY_EN.length, GLOSSARY.length);
  assert.equal(FAQS_EN.length, FAQS.length);
  assert.equal(STORY_CHAPTERS_EN.length, STORY_CHAPTERS.length);

  const englishContent = JSON.stringify({
    nav: NAV_EN,
    layers: LAYERS_EN,
    groups: groupsEn(GROUPS),
    packages: packagesEn(PACKAGES),
    glossary: GLOSSARY_EN,
    faq: FAQS_EN,
    story: STORY_CHAPTERS_EN,
  });
  assert.doesNotMatch(englishContent, /[\u3400-\u9fff]/u);
});

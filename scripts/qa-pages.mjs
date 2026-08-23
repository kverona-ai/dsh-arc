import { mkdirSync, writeFileSync } from "node:fs";
import { chromium } from "playwright";

const BASE = process.env.QA_BASE || "http://127.0.0.1:8080";
const OUT = "screenshots";
mkdirSync(OUT, { recursive: true });

const ROUTES = [
  ["home", "/"],
  ["story", "/story"],
  ["principles", "/principles"],
  ["map", "/map"],
  ["cordis", "/cordis"],
  ["boot", "/boot"],
  ["loop", "/loop"],
  ["seams", "/seams"],
  ["events", "/events"],
  ["modules", "/modules"],
  ["modules_core", "/modules/core"],
  ["glossary", "/glossary"],
];

const errors = [];

function attach(page, label) {
  page.on("pageerror", (err) => errors.push(`${label} pageerror: ${err.message}`));
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(`${label} console: ${msg.text()}`);
  });
}

const browser = await chromium.launch();
const desktop = await browser.newContext({ viewport: { width: 1280, height: 800 } });
const mobile = await browser.newContext({
  viewport: { width: 390, height: 844 },
  isMobile: true,
  hasTouch: true,
});

const page = await desktop.newPage();
attach(page, "desktop");

for (const [name, path] of ROUTES) {
  const res = await page.goto(BASE + path, { waitUntil: "networkidle" });
  const status = res?.status() ?? 0;
  if (status >= 400) errors.push(`${path} HTTP ${status}`);
  const text = (await page.locator("body").innerText()).trim();
  if (text.length < 40) errors.push(`${path} too little text (${text.length})`);
  await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: false });
}

await page.goto(BASE + "/", { waitUntil: "networkidle" });
await page.keyboard.press("Meta+K");
await page.waitForTimeout(200);
const searchOpen = await page.getByRole("dialog", { name: "搜索" }).count();
if (!searchOpen) errors.push("search palette did not open with Meta+K");
else {
  await page.getByPlaceholder("搜页面、抽屉、包名、词汇…").fill("Cordis");
  await page.waitForTimeout(150);
  await page.keyboard.press("Enter");
  await page.waitForTimeout(400);
  if (!page.url().includes("cordis") && !page.url().includes("glossary")) {
    errors.push(`search did not navigate, url=${page.url()}`);
  }
}

await page.goto(BASE + "/seams", { waitUntil: "networkidle" });
await page.getByRole("button", { name: "搬到 E2B" }).click();
const cloud = await page.getByText("云上的执行世界").count();
if (!cloud) errors.push("seams E2B toggle did not swap world");

await page.goto(BASE + "/loop", { waitUntil: "networkidle" });
await page.getByRole("button", { name: "暂停" }).click();
if (!(await page.getByRole("button", { name: "继续" }).count())) {
  errors.push("loop pause did not switch to 继续");
}

await page.goto(BASE + "/modules", { waitUntil: "networkidle" });
await page.getByRole("button", { name: "主干" }).click();
await page.waitForTimeout(150);
const cards = await page.locator("h2").count();
if (cards < 2) errors.push("modules layer filter produced too few headings");

const mpage = await mobile.newPage();
attach(mpage, "mobile");
await mpage.goto(BASE + "/", { waitUntil: "networkidle" });
await mpage.screenshot({ path: `${OUT}/home-mobile.png` });
const overflow = await mpage.evaluate(
  () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
);
if (overflow) errors.push("mobile home horizontal overflow");
await mpage.getByLabel("打开目录").click();
await mpage.getByRole("link", { name: "两条铁律 插件与日记", exact: true }).click();
await mpage.waitForTimeout(300);
if (!mpage.url().includes("principles")) errors.push(`mobile nav failed url=${mpage.url()}`);
await mpage.screenshot({ path: `${OUT}/principles-mobile.png` });

await browser.close();
writeFileSync(
  `${OUT}/qa.json`,
  JSON.stringify({ ok: errors.length === 0, errors }, null, 2),
);
console.log(JSON.stringify({ ok: errors.length === 0, errors }, null, 2));
if (errors.length) process.exit(1);

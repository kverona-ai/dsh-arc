import { createFileRoute } from "@tanstack/react-router";
import { KidNote, TechNote } from "@/components/kid-note";
import { Page } from "@/components/page";
import { BOOT_LAYERS, BOOT_STEPS, PRESETS } from "@/data/boot";

import { seoHead } from "@/lib/seo";
import { BOOT_LAYERS_EN, BOOT_STEPS_EN, PRESETS_EN } from "@/data/en/boot";
import { useLocale } from "@/lib/locale";

export const Route = createFileRoute("/boot")({
  component: BootPage,
  head: () => seoHead("/boot"),
});

export function BootPage() {
  const locale = useLocale();
  const en = locale === "en";
  const steps = en ? BOOT_STEPS_EN : BOOT_STEPS;
  const layers = en ? BOOT_LAYERS_EN : BOOT_LAYERS;
  const presets = en ? PRESETS_EN : PRESETS;
  return (
    <Page
      kicker={en ? "Boot" : "启动"}
      title={en ? "An empty backpack, filled one layer at a time" : "空书包，一层一层装满"}
      lead={
        en
          ? "A running dsh is a plugin tree. The tree is not hard-coded; startup composes it layer by layer."
          : "运行中的 dsh 是一棵插件树。树不是写死的，是启动时按序叠加出来的。"
      }
    >
      <KidNote className="mb-10 max-w-3xl">
        {en ? (
          <>
            Call <strong className="text-fg">dsh web</strong>. The caretaker opens the web box,
            empties the largest bag of base bricks, adds the window, and applies your notes. The
            empty cordis.yml is only a backpack—everything inside comes from bags and patches.
          </>
        ) : (
          <>
            你喊 <strong className="text-fg">dsh web</strong>。管家拿出叫 web
            的盒子，先倒进最大那袋基础积木，再倒窗户，最后贴上你的便条。空的 cordis.yml
            只是空书包——里面的东西全是袋子和贴纸。
          </>
        )}
      </KidNote>

      <h2 className="mb-4 text-2xl">{en ? "Six steps to leave the house" : "六步出门"}</h2>
      <ol className="grid gap-3">
        {steps.map((s, i) => (
          <li
            key={s.title}
            className="grid gap-1 rounded-xl bg-surface px-5 py-4 shadow-[var(--shadow-border)] sm:grid-cols-[3rem_1fr]"
          >
            <span className="font-mono text-accent tabular-nums">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="font-medium">{s.title}</h3>
              <p className="text-sm text-fg">{s.kid}</p>
              <p className="mt-1 text-sm text-muted">{s.tech}</p>
            </div>
          </li>
        ))}
      </ol>

      <h2 className="mt-14 mb-4 text-2xl">
        {en ? "Patch layers · Later wins" : "补丁层 · 后写的赢"}
      </h2>
      <div className="grid gap-2">
        {[...layers].reverse().map((layer, i) => (
          <article
            key={layer.id}
            className="rounded-xl bg-elevated p-5 shadow-[var(--shadow-border)]"
            style={{ marginLeft: `${i * 8}px` }}
          >
            <h3 className="text-lg">{layer.title}</h3>
            <p className="mt-1 text-sm">{layer.kid}</p>
            <p className="mt-2 text-sm text-muted">{layer.tech}</p>
          </article>
        ))}
      </div>

      <h2 className="mt-14 mb-4 text-2xl">
        {en ? "One process, different outfits" : "同一进程，不同套装"}
      </h2>
      <p className="mb-4 max-w-2xl text-muted">
        {en
          ? "A Profile decides how the whole city is assembled. An agent preset decides what one agent wears by mounting a smaller tree inside an isolate realm."
          : "Profile 决定整座城怎么拼。Agent preset 决定某一个机器人穿哪套衣服——在 isolate realm 里再挂一棵小树。"}
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        {presets.map((p) => (
          <article key={p.id} className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]">
            <p className="font-mono text-xs text-accent">{p.id}</p>
            <h3 className="mt-2 text-lg">{p.name}</h3>
            <p className="mt-1 text-sm">{p.kid}</p>
            <p className="mt-2 text-sm text-muted">{p.note}</p>
          </article>
        ))}
      </div>

      <TechNote className="mt-8">
        {en
          ? "Inspect the tree that truly boots with dsh --profile web --dump-config. Every printed row can be replaced by a patch. Patches locate a row by id and replace its complete config. Mode-specific values are deliberately absent from base so web-app and headless can each provide a full row."
          : "查看你机器真正启动的树：dsh --profile web --dump-config。打印出的每一行都可以被 patch 替换。补丁按 id 定位并替换整个 config。base 里模式专属的值故意不放——留给 web-app / headless 各写完整的一行。"}
      </TechNote>
    </Page>
  );
}

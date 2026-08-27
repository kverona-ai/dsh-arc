import { createFileRoute, notFound, useParams } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { KidNote, TechNote } from "@/components/kid-note";
import { Page } from "@/components/page";
import { groupBySlug, LAYERS, type Group } from "@/data/groups";
import { ROLE_LABEL } from "@/data/packages";
import { notFoundHead, seoHead } from "@/lib/seo";
import { groupsEn, LAYERS_EN } from "@/data/en/groups";
import { GROUPS } from "@/data/groups";
import { PACKAGES } from "@/data/packages";
import { packagesEn, ROLE_LABEL_EN } from "@/data/en/packages";
import { useLocale } from "@/lib/locale";
import { LocalizedLink } from "@/components/localized-link";

export const Route = createFileRoute("/modules/$slug")({
  // Reject the slug before render so the boundary owns the response; a throw
  // from the component rendered an empty 200 page that crawlers read as a
  // near-duplicate of /modules.
  loader: ({ params }) => {
    if (!groupBySlug(params.slug)) throw notFound();
    return null;
  },
  component: GroupPage,
  head: ({ params }) =>
    groupBySlug(params.slug) ? seoHead(`/modules/${params.slug}`) : notFoundHead(),
  notFoundComponent: () => (
    <Page title="没有这个抽屉" lead="回到目录看看别的积木。">
      <LocalizedLink to="/modules" className="text-accent hover:underline">
        返回目录
      </LocalizedLink>
    </Page>
  ),
});

export function GroupPage() {
  const locale = useLocale();
  const en = locale === "en";
  const { slug } = useParams({ strict: false }) as { slug: string };
  const sourceGroups = en ? groupsEn(GROUPS) : GROUPS;
  const sourcePackages = en ? packagesEn(PACKAGES) : PACKAGES;
  const roleLabel = en ? ROLE_LABEL_EN : ROLE_LABEL;
  const group = sourceGroups.find((item) => item.slug === slug);
  if (!group) throw notFound();
  const pkgs = sourcePackages.filter((pkg) => pkg.group === slug);

  return (
    <Page kicker={group.path} title={group.name} lead={group.job}>
      <LocalizedLink
        to="/modules"
        className="mb-8 inline-flex min-h-11 items-center gap-2 text-sm text-muted hover:text-fg"
      >
        <ArrowLeft className="size-4" />
        {en ? "Back to directory" : "返回目录"}
      </LocalizedLink>
      <KidNote className="mb-8">{group.kid}</KidNote>
      {group.ctx ? <p className="mb-6 font-mono text-sm text-accent">{group.ctx}</p> : null}

      {pkgs.length ? (
        <ul className="grid gap-3">
          {pkgs.map((p) => (
            <li key={p.npm} className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg">{p.slug}</h2>
                <span className="rounded-full bg-elevated px-2 py-0.5 text-[11px] text-muted">
                  {roleLabel[p.role]}
                </span>
              </div>
              <code className="mt-1 block font-mono text-xs text-subtle">{p.npm}</code>
              {p.ctx ? (
                <code className="mt-1 block font-mono text-xs text-accent">{p.ctx}</code>
              ) : null}
              <p className="mt-3">{p.kid}</p>
              <p className="mt-1 text-sm text-muted">{p.job}</p>
            </li>
          ))}
        </ul>
      ) : (
        <TechNote>
          {en
            ? "This group has no individually expanded packages in the curated directory. Return to the directory and search for related names."
            : "这一组在精选目录里没有单独展开的包，请回到总目录用搜索查看相关名字。"}
        </TechNote>
      )}

      <GroupExtra slug={slug} en={en} />
      <SiblingDrawers group={group} groups={sourceGroups} en={en} />
    </Page>
  );
}

/**
 * Drawer pages had exactly one outbound link, so neither readers nor crawlers
 * could move sideways. The same layer is the honest neighbourhood.
 */
function SiblingDrawers({ group, groups, en }: { group: Group; groups: Group[]; en: boolean }) {
  const layers = en ? LAYERS_EN : LAYERS;
  const sameLayer = groups.filter((item) => item.layer === group.layer && item.slug !== group.slug);
  // A layer can hold a single drawer (brain is just llm). Fall back to the
  // layers on either side rather than leaving that page with one link.
  const at = layers.findIndex((item) => item.id === group.layer);
  const neighbours = [layers[at - 1]?.id, layers[at + 1]?.id].filter(Boolean);
  const siblings = sameLayer.length
    ? sameLayer
    : groups.filter((item) => neighbours.includes(item.layer));
  if (!siblings.length) return null;
  const layer = layers[at];
  return (
    <nav className="mt-12 border-t border-border pt-6" aria-labelledby="sibling-drawers">
      <h2 id="sibling-drawers" className="text-sm font-medium text-muted">
        {sameLayer.length
          ? `${en ? "Same layer" : "同一层的抽屉"}${layer ? ` · ${layer.title}` : ""}`
          : en
            ? "Neighbouring layers"
            : "相邻层的抽屉"}
      </h2>
      <ul className="mt-3 flex flex-wrap gap-2">
        {siblings.map((item) => (
          <li key={item.slug}>
            <LocalizedLink
              to={`/modules/${item.slug}`}
              className="flex min-h-11 items-center gap-2 rounded-md bg-elevated px-3 text-sm shadow-[var(--shadow-border)] transition-colors duration-[var(--motion-quick)] hover:bg-surface"
            >
              <span className="font-medium">{item.name}</span>
              <span className="text-xs text-subtle">{item.kid}</span>
            </LocalizedLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function GroupExtra({ slug, en }: { slug: string; en: boolean }) {
  const extra: Record<string, { title: string; body: string }> = {
    core: {
      title: "依赖方向",
      body: "扩展依赖 dsh-agent，不依赖 dsh-agent-loop。loop 是可替换驱动器。scope 不是沙箱，只是教室储物柜。isolate 才是教室自己的水龙头。",
    },
    client: {
      title: "窗户自己也是 Cordis",
      body: "Host 把 __DSH_BOOT__ 塞进 HTML。浏览器另起 Loader，立即挂载 immediately 行，再把 DOM 交给 ctx.uiRenderer。Slot 是毡板上的洞。",
    },
    subagent: {
      title: "三种「有人在干活」",
      body: "subagent 是请朋友；agent team 是俱乐部花名册+邮箱+任务板（实验）；jobs 是洗衣机上的便利贴，不是朋友。",
    },
    sandbox: {
      title: "围栏不是搬家",
      body: "sandbox.confine 包装本机 argv。E2B 是另一对 fs+subprocess。两者都读 ctx.sandboxPolicy，避免围栏根和工作区根对不上。",
    },
    session: {
      title: "三套柜子",
      body: "会话日志是日记。sessionPersistence 是复印件。ctx.storage 是非日记的档案柜。密钥只在凭据柜，日记里只写钥匙名。",
    },
    llm: {
      title: "换老师不换教室",
      body: "循环只认识 GenerateOptions 和 StreamChunk。适配器可以是 DeepSeek、pi-ai 或 replay。换提供方不会改 session 日志形状。",
    },
    e2b: {
      title: "搬家不是围栏",
      body: "E2B 提供另一对 fs + subprocess。Bash、PTY、LSP 跟着走。ctx.sandbox 仍然只是本机 confine(argv)。",
    },
    host: {
      title: "哑巴信箱和接待员",
      body: "webserver 只做 HTTP 路由载体。apiproxy 是 Host API 网关。静态前端把窗户玻璃装上。Native 能力仅 loopback。",
    },
  };
  const extraEn: Record<string, { title: string; body: string }> = {
    core: {
      title: "Dependency direction",
      body: "Extensions depend on dsh-agent, not dsh-agent-loop. The loop is a replaceable driver. scope is not a sandbox; it is a set of classroom lockers. isolate provides the classroom's own tap.",
    },
    client: {
      title: "The window is Cordis too",
      body: "The Host puts __DSH_BOOT__ into HTML. The browser starts another Loader, mounts immediately rows, and hands the DOM to ctx.uiRenderer. A Slot is a hole in the felt board.",
    },
    subagent: {
      title: "Three kinds of ‘someone is working’",
      body: "A subagent is a friend; an agent team is an experimental roster + mailbox + task board; a job is a note on a washing machine, not a friend.",
    },
    sandbox: {
      title: "A fence is not a move",
      body: "sandbox.confine wraps local argv. E2B is another fs + subprocess pair. Both read ctx.sandboxPolicy so fence roots and workspace roots stay aligned.",
    },
    session: {
      title: "Three cabinets",
      body: "The Session log is the journal. sessionPersistence is its copy. ctx.storage is a non-journal filing cabinet. Secrets stay in the credential cabinet; the journal stores only key names.",
    },
    llm: {
      title: "Change the teacher, not the classroom",
      body: "The loop knows only GenerateOptions and StreamChunk. The adapter may be DeepSeek, pi-ai, or replay. Replacing the provider does not change the session log shape.",
    },
    e2b: {
      title: "Moving is not fencing",
      body: "E2B provides another fs + subprocess pair. Bash, PTY, and LSP follow. ctx.sandbox remains local confine(argv).",
    },
    host: {
      title: "The quiet mailbox and receptionist",
      body: "webserver only carries HTTP routes. apiproxy is the Host API gateway. The static frontend installs the window glass. Native capabilities are loopback-only.",
    },
  };
  const block = (en ? extraEn : extra)[slug];
  if (!block) return null;
  return (
    <TechNote className="mt-8" title={block.title}>
      {block.body}
    </TechNote>
  );
}

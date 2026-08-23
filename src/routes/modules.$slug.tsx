import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { KidNote, TechNote } from "@/components/kid-note";
import { Page } from "@/components/page";
import { groupBySlug } from "@/data/groups";
import { packagesInGroup, ROLE_LABEL } from "@/data/packages";

export const Route = createFileRoute("/modules/$slug")({
  component: GroupPage,
  notFoundComponent: () => (
    <Page title="没有这个抽屉" lead="回到目录看看别的积木。">
      <Link to="/modules" className="text-accent hover:underline">
        返回目录
      </Link>
    </Page>
  ),
});

function GroupPage() {
  const { slug } = Route.useParams();
  const group = groupBySlug(slug);
  if (!group) throw notFound();
  const pkgs = packagesInGroup(slug);

  return (
    <Page kicker={group.path} title={group.name} lead={group.job}>
      <Link
        to="/modules"
        className="mb-8 inline-flex min-h-11 items-center gap-2 text-sm text-muted hover:text-fg"
      >
        <ArrowLeft className="size-4" />
        返回目录
      </Link>
      <KidNote className="mb-8">{group.kid}</KidNote>
      {group.ctx ? (
        <p className="mb-6 font-mono text-sm text-accent">{group.ctx}</p>
      ) : null}

      {pkgs.length ? (
        <ul className="grid gap-3">
          {pkgs.map((p) => (
            <li key={p.npm} className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg">{p.slug}</h2>
                <span className="rounded-full bg-elevated px-2 py-0.5 text-[11px] text-muted">
                  {ROLE_LABEL[p.role]}
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
          这一组在精选目录里没有单独展开的包，请回到总目录用搜索查看相关名字。
        </TechNote>
      )}

      <GroupExtra slug={slug} />
    </Page>
  );
}

function GroupExtra({ slug }: { slug: string }) {
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
  const block = extra[slug];
  if (!block) return null;
  return (
    <TechNote className="mt-8" title={block.title}>
      {block.body}
    </TechNote>
  );
}

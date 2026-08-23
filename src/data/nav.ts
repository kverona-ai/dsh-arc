export const NAV = [
  { to: "/", label: "封面", kid: "从这里开始" },
  { to: "/story", label: "积木故事", kid: "五岁也能听懂" },
  { to: "/principles", label: "两条铁律", kid: "插件与日记" },
  { to: "/map", label: "总图", kid: "整座积木城" },
  { to: "/cordis", label: "Cordis 底板", kid: "积木怎么卡住" },
  { to: "/boot", label: "怎么启动", kid: "先铺哪一层" },
  { to: "/loop", label: "一轮对话", kid: "机器人怎么想" },
  { to: "/seams", label: "可换接头", kid: "换一块手" },
  { to: "/events", label: "事件总线", kid: "谁在喊谁" },
  { to: "/modules", label: "模块目录", kid: "每一块积木" },
  { to: "/glossary", label: "词汇表", kid: "名字对照" },
] as const;

export type NavItem = (typeof NAV)[number];
export type NavPath = NavItem["to"];

export function navIsActive(pathname: string, to: NavPath) {
  if (to === "/") return pathname === "/";
  return pathname === to || pathname.startsWith(`${to}/`);
}

export function navNeighbors(pathname: string) {
  const exact = NAV.findIndex((item) => item.to === pathname);
  const i =
    exact >= 0
      ? exact
      : NAV.findIndex((item) => item.to !== "/" && pathname.startsWith(`${item.to}/`));
  if (i < 0) return { prev: undefined, next: undefined, index: -1 };
  return {
    index: i,
    prev: i > 0 ? NAV[i - 1] : undefined,
    next: i < NAV.length - 1 ? NAV[i + 1] : undefined,
  };
}

export const STORY_CHAPTERS = [
  {
    n: "01",
    title: "有一座会动的积木城",
    kid: "想象你有一盒超级多的积木。有的积木会说话，有的会开门，有的会写日记。DeepSeek 把整座城交给一个叫 dsh 的管家。管家不自己干活——它只负责把积木按说明书拼好。",
    tech: "DeepSeek Harness（dsh）是开源 agent 运行时。核心口号：Everything is a plugin。模型适配器、工具、会话、沙箱、循环、UI，全部是插件。",
  },
  {
    n: "02",
    title: "底板叫 Cordis",
    kid: "积木要卡在底板上才不会散。这块底板叫 Cordis。谁把积木卡上去，谁就能喊『我提供大脑』『我提供手』。不想玩了，把积木拔掉，它留下的痕迹也会一起消失。",
    tech: "Cordis 是时空可组合的插件框架。插件向共享 Context 贡献 Service、类型化事件、可逆 Effect。卸载 fiber 时注册自动撤销。没有需要打补丁的特权内核。",
  },
  {
    n: "03",
    title: "先选玩具盒",
    kid: "出门前先选盒子：web 盒子带窗户，headless 盒子不带窗户、做完就回家。每个盒子里有好几层袋子。最底下永远是 dsh-base——大脑、手、日记本、围栏都在里面。",
    tech: "Profile（web / headless）按顺序叠 bundle。dsh-base 是第一层；dsh-web-app 加上浏览器；dsh-headless 是一次性运行器。然后是 profile 的 cordis.patch.yml、home 级补丁、--patch。",
  },
  {
    n: "04",
    title: "日记本才是真相",
    kid: "机器人做过的每件事都写进一本只能往后翻的日记。想事情、说话、动手，都要先写下来。合上本子再打开，故事还在。所以：模型看见的，一定已经记过。",
    tech: "Session 是仅追加的 SessionEvent 日志。deriveMessages() 从 surface 投影模型历史。runtime invariant 断言：抵达模型请求的一切都能从日志重建。",
  },
  {
    n: "05",
    title: "一轮对话像写作业",
    kid: "你按门铃（followup），管家打开一轮作业（turn）。先把桌上的纸条收走（claim），老师们检查能不能做（pre-step）。然后想一次（模型），动手（工具），再想，直到作业做完。",
    tech: "Turn = 零或多步。Step = 一次模型请求 + 它调用的工具。Inbox 分 next-turn / next-step。agent/pre-step、agent/request、llm/stream、tools/* 是 waterfall。",
  },
  {
    n: "06",
    title: "插座可以换房间",
    kid: "台灯的插头形状是固定的。你可以插在家里，也可以把整间游戏室搬到云上的小屋。台灯不用改。但手、脚、眼镜必须一起搬家——它们住在同一个房间。",
    tech: "Seam = Service Definition + Provider + Consumer。换 ctx.fs + ctx.subprocess 到 E2B，Bash / PTY / LSP 跟着走，工具包不用 fork。ctx.sandbox 只是本机围栏，不是搬家。",
  },
  {
    n: "07",
    title: "窗户那一半也是积木",
    kid: "网页不是另外一栋楼。屋子里有一个哑巴信箱（webserver），一个接待员（apiproxy），浏览器再按目录自己拼一座小 Cordis 城。聊天框、侧栏、设置，都是往毡板上按图片。",
    tech: "Host 跑 Node；Client 在浏览器另起 Loader。dsh.client 声明组成 __DSH_BOOT__。Slot 是 UI 组合点。Native 能力仅 loopback。",
  },
] as const;

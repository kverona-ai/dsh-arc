# DSH 积木书

DeepSeek Harness 架构解析站。用积木城的比喻把 Cordis、插件树、会话日志、能力 seam 讲清楚——小孩版和源码版对照着看。

核心口号：

- **Everything is a plugin** — 模型、工具、会话、沙箱、循环、UI 都是可替换插件。
- **Every run is traceable** — 模型看见的，一定已经写进仅追加的会话日志。

源码依据：[deepseek-ai/deepseek-harness](https://github.com/deepseek-ai/deepseek-harness) v0.1 developer preview。

## 章节

1. 积木故事 — 七页讲完一座城
2. 两条铁律 — 插件可换、日记不撒谎，以及新行为往哪挂
3. 总图 — 十层积木城
4. Cordis 底板 — 插件、上下文、事件、可逆副作用
5. 怎么启动 — profile / bundle / patch
6. 一轮对话 — turn / step / inbox
7. 可换接头 — 定义、提供方、消费方
8. 事件总线 — 日记、对讲机、规矩
9. 模块目录 — 主干包与抽屉
10. 词汇表 — 源码真名字对照

站内搜索：`⌘K` / `Ctrl+K`。

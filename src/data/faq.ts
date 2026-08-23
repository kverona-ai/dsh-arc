export const FAQS = [
  {
    q: "DeepSeek Harness 是什么？",
    a: "DeepSeek Harness（dsh）是开源 agent 运行时。它不把模型写死在内核里：模型适配器、工具、会话、沙箱、循环和 UI 全部是插件。核心口号是 Everything is a plugin，以及 Every run is traceable。",
  },
  {
    q: "Cordis 在 dsh 里做什么？",
    a: "Cordis 是底板。插件向共享 Context 贡献 Service、类型化事件和可逆副作用。卸载 fiber 时登记自动撤销。没有需要打补丁的特权内核；扩展方式是把插件挂到旁边。",
  },
  {
    q: "Everything is a plugin 是什么意思？",
    a: "每一块能力都是可替换积木。换 LLM 适配器不必改循环；换文件系统提供方，Bash、PTY、LSP 可以跟着走。配置里选择、替换、扩展，不必改 dsh 源码。",
  },
  {
    q: "模型可见即已记录是什么意思？",
    a: "抵达模型请求的一切必须能从仅追加的 Session 日志重建。deriveMessages() 只投影 surface 事件，不是另存一份聊天数组。这是运行时不变量，也是 Every run is traceable 的来源。",
  },
  {
    q: "sandbox 和 E2B 有什么区别？",
    a: "sandbox.confine 包装本机 argv，是这间屋里的婴儿门。E2B 是另一对 fs + subprocess 提供方，等于把整间游戏室搬到云上。围栏不是搬家；手和脚必须去同一间房。",
  },
  {
    q: "Cordis 的 inject 和 Agent.inject() 是一回事吗？",
    a: "不是。Cordis inject 声明插件依赖，底板等服务到齐再激活。Agent.inject() 把消息塞进 inbox.next-step 且不叫醒驱动器。名字一样，完全不是一回事。",
  },
  {
    q: "scope 和 isolate 有什么不同？",
    a: "scope 是按 agent 划分的储物柜，不是沙箱。isolate 让子上下文拥有另一份同名服务，是这间教室自己的水龙头。agent preset 换衣服靠 isolate。",
  },
  {
    q: "一轮对话（turn）和一步（step）怎么分？",
    a: "一步是一次模型请求加上它调用的工具。一轮包含零个或多个步骤：领取首条输入前打开，不再欠工作时关闭。被拒绝的首次领取仍会留下一个不含步骤的耐久轮次。",
  },
] as const;

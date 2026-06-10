---
name: learn
description: 针对源码学习问题、目标或用户提出的理解，自动选择最合适的 Agent CodeMentor 学习模式。
argument-hint: "<目标、问题或理解>"
---

# Skill: Agent CodeMentor 路由器

当用户想学习源码但没有指定具体模式时使用。

## 目标

选择正确的学习模式并直接执行。除非请求确实模糊，否则不要让用户自己选择。

## 模式选择

- 使用 `/socratic` 处理陌生模块、第一次阅读或 onboarding。
- 使用 `/hypothesis` 处理用户提出心智模型，或询问某个理解是否正确。
- 使用 `/inversion` 处理“为什么这样设计，而不是更简单方案”的问题。
- 使用 `/dataflow` 追踪 request、tensor、buffer、cache entry、stream chunk 或对象生命周期。
- 使用 `/interview` 在用户读完后进行高强度测试。
- 使用 `/refactor` 在用户准备修改、替换、优化复杂子系统或插入逻辑前评估风险。

## 输出契约

1. **选择的模式**：说明选择哪个模式，并用一句话解释原因。
2. **子系统镜头**：把目标归类为 request 生命周期、scheduler、KV/cache/memory、model runner/kernel、distributed transfer、streaming cleanup 或 tests/observability。
3. **执行所选模式**：遵循对应 skill 的行为。
4. **验证任务**：最后给出一个具体源码级检查任务。

## 硬约束

- 不逐行解释代码。
- 有源码位置时，不停留在泛泛架构层面。
- 除非用户正在考虑修改，否则不要选择 `/refactor`。

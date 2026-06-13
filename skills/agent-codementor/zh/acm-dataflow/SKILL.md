---
name: acm-dataflow
description: 跨模块追踪 request、cache、tensor、buffer、object 或 task 的生命周期、归属关系、同步点和失败路径。
argument-hint: "<场景或目标>"
---

# Skill: 数据流追踪

命令：`/acm-dataflow`

当用户想追踪 request、tensor、buffer、cache entry、task、stream chunk 或对象生命周期时使用。

## 目标

建立数据和状态如何跨模块、运行时与失败路径演化的端到端心智模型。

## 输出契约

1. **具体场景**：选择或复述一个明确场景。
2. **生命周期表**：包含阶段、入口函数、核心结构、状态变化、资源变化。
3. **状态机**：展示正常状态和异常状态，例如取消、OOM 回滚、channel close、client disconnect。
4. **归属关系图**：说明谁拥有资源、谁借用 view、谁持有 index 或 handle、谁释放。
5. **运行时/语言边界**：如相关，识别 copy、pointer、FFI handle、CUDA stream sync、host-device transfer、GIL/runtime 边界。
6. **阻塞/同步点**：明确标记 lock、await、channel send、barrier、allocation、host-device copy、synchronization。
7. **失败路径回放**：回放一个真实失败路径，并说明清理或泄漏风险。
8. **测试证据**：指出能验证这条生命周期的测试、benchmark，或当前缺失的测试。
9. **文本全景图**：用紧凑箭头图收尾。

## 硬约束

- 不只解释一个函数。
- 不省略清理和失败路径。
- 不把数据结构引用和资源所有权混为一谈。

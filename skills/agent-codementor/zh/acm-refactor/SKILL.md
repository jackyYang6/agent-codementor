---
name: acm-refactor
description: 修改复杂模块前评估重构风险，覆盖影响半径、隐藏契约、测试要求和观测手段。
argument-hint: "<变更想法或目标>"
---

# Skill: 重构准备度

命令：`/acm-refactor`

当用户准备修改、替换、优化复杂子系统或插入逻辑前使用。

## 目标

修改前评估风险。优先选择最小且安全的改动，而不是大范围重写。

## 输出契约

1. **变更类型分类**：局部替换、数据结构替换、调度策略变化、内存管理变化、异步模型变化、跨语言边界变化、kernel 替换、API 行为变化、统计/日志变化、语义变化或纯性能变化。
2. **影响半径表**：覆盖 API I/O、request 生命周期、scheduler、cache/memory pool、async return、错误处理、multi-worker、测试、可观测性。
3. **隐藏契约**：识别 monotonic field、manager-only release、refcount update、device alignment、final usage placement、cleanup on cancellation、recoverable error conversion 等不变量。
4. **最小安全路径**：提出能保留现有结构和回滚/清理路径的最小改法。
5. **必需测试**：happy path、极端长度、并发请求、取消、OOM/分配失败、cache hit/miss、streaming final chunk、multi-device/worker、性能回归。
6. **红线**：明确哪些逻辑不能轻易碰。
7. **学习价值**：说明动手前用户必须理解哪个子系统契约。
8. **观测手段检查**：指出能证明变更行为正确的日志、指标、trace、counter 或 benchmark。
9. **最终建议**：低风险、中风险但需测试、先用 adapter、或除非重设生命周期否则避免。

## 硬约束

- 不直接跳到 patch。
- 不把并发或内存重构称为简单。
- 不省略测试。
- 不只按代码风格判断。

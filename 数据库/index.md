关系型数据库：

 - MySQL：
   - 结构化数据
   - 表格结构
   - SQL
   - 事务处理
   - 良好跨平台
   - 广泛用于网站或者在线应用
   - 适合初学者使用过和学习
 - PostgreSQL
   - 事务和并发支持
   - 支持复杂查询和数据类型，比如JSON
   - 高度可扩展
   - 大规模操作，适合企业级应用（难怪这个日本项目选择这个数据库）

```markdown
什么是事务？
一系列操作集合，这些操作要么全部执行，要么全部不执行。

事务确保数据库完整性和一致性的关键机制

核心特性 ACID：
1.Atomicity 原子性
 	原子性确保事务中的所有操作要么全部完成，要么全部不执行。换句话说，一个事务是不可分割的单元，操作要么全部成功，要么全部失败。
2.Consistency 一致性
	一致性确保事务的执行将数据库从一个一致的状态转变到另一个一致的状态。一致性意味着事务执行的结果必须遵守所有预定义的规则和约束，如数据类型、触发器、完整性约束等。
3.Isolation 隔离性
	隔离性确保并发执行的事务彼此隔离，事务的中间状态对其他事务不可见。这意味着一个事务的操作和中间结果对其他并发事务是不可见的，直到该事务完成。
4.Durability 持久性
	持久性确保一旦事务被提交，它对数据库的更改是永久性的，即使系统故障也不会丢失。这通常通过将事务记录到持久存储中来实现。
	
举例：
从一个账户向另一个账户转账。
这个过程涉及两个步骤：从一个账户扣款和向另一个账户存款。
这两个操作必须作为一个单一的事务来执行。要么两个操作都成功（原子性），确保账户总额不变（一致性），在转账过程中，其他人看不到中间状态（隔离性），一旦转账完成，即使系统崩溃，结果也是永久的（持久性）。
```

NoSQL数据库：

- MongoDB（文档型NoSQL）
  - 不使用传统的表格结构，适用于处理大量分布式数据。通常更灵活，易于扩展。
  - 数据存储类似JSON的文档，数据模型更灵活
  - 适用于数据模式频繁变化或不完全结构化的场景
  - 快速查询，键值对的形式存储
  - 使用查询语言（不是SQL语句）
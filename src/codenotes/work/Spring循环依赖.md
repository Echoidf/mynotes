---
title: Sprng如何解决循环依赖
icon: storage
# 分类
category:
  - 事务
# 标签
tag:
  - 面试题
  - java
  - 分布式
sticky: false
# 是否收藏在博客主题的文章列表中，当填入数字时，数字越大，排名越靠前。
star: 23
# 是否将该文章添加至文章列表中
article: true
# 是否将该文章添加至时间线中
timeline: true
---

## ![image.png](https://s2.loli.net/2023/03/14/ThPFJAjasCUHE7x.png)

按照对象的状态分类：

- 半成品
- 成品

如果持有了某一个对象的引用，能否在后续缓解给该对象完成赋值操作？-----可以

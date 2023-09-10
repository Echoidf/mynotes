---
title: Spring感知类 
icon: edit
# 分类  
category:
- xx
# 标签
tag:
- xx
sticky: false
# 排序越大越靠前
star: 32  
# 添加到文章列表
article: true
# 添加到时间线 
timeline: true
---

Spring感知类
--------  

## 常用Aware

- BeanNameAware 获得容器中bean名称
- BeanClassLoaderAware 获得类加载器
- BeanFactoryAware 获得bean 创建工厂
- EnvironmentAware 获得环境变量
- EmbeddedValueResolverAware 获取spring容器加载的 properties 文件属性值
- ResourceLoaderAware 获得资源加载器
- ApplicationEventPublisherAware 获取应用事件发布器
- MessageSourceAware 或得文本信息
- ApplicationContextAware 获得当前应用上下文
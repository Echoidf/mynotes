---
title: go redis实现排行榜  
icon: edit
# 分类  
category:
- redis
# 标签
tag:
- redis
sticky: false
# 排序越大越靠前
star: 32  
# 添加到文章列表
article: true
# 添加到时间线 
timeline: true
---

## 文档

[Go Redis Introduction](https://redis.uptrace.dev/zh/guide/)

[Go Redis Document](https://pkg.go.dev/github.com/redis/go-redis/v9)

[Redis 中文网](https://www.redis.net.cn/)

## 安装

### 1.安装Redis

```shell
# mac 安装redis，本机配置文件路径：/System/Volumes/Data/opt/homebrew/etc/redis.conf
brew install redis
# mac 启动redis服务
brew services start redis
# 使用客户端连接
redis-cli
```


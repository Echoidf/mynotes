---
title: DSL搜索
# 当前页面图标
icon: write
# 分类
category:
  - ES
# 标签
tag:
  - 分布式
  - 搜索引擎
sticky: false
# 是否收藏在博客主题的文章列表中，当填入数字时，数字越大，排名越靠前。
star: false
# 是否将该文章添加至文章列表中
article: true
# 是否将该文章添加至时间线中
timeline: true
---

## 一、QueryString

请求参数的查询（QueryString）

```
GET     /shop/_doc/_search?q=desc:慕课网
GET     /shop/_doc/_search?q=nickname:慕&q=age:25
```

这种方式被称之为<mark>QuerySting</mark>查询方式，参数都是放在url中作为请求参数的

## 二、DSL基本语法

QueryString用的很少，一旦参数复杂就难以构建，所以大多查询都会使用 DSL 来进行查询更好。

- Domain Specific Language
- 特定领域语言
- 基于JSON格式的数据查询
- 查询更灵活，有利于复杂查询

```
# 查询
POST     /{index_name}/_doc/_search
{
    "query": {
        "match": {
            "desc": "慕课网"
        }
    }
}
# 判断某个字段是否存在
{
    "query": {
        "exists": {
	        "field": "desc"
	    }
    }
}
#查询所有--分页
{
	"query": {
		"match_all":{}
	},
	"from": 0,
	"size": 10
}
#查询某些字段
{
	"query": {
		"match_all":{}
	}
	"_source": [
		"id",
		"nickname",
		"age"
	]
}
```

语法格式为一个JSON Object， 内容都是k-v键值对，json可以嵌套

key可以是一些ES的关键字，也可以是某个field字段

**搜索不合法问题定位**

DSL查询的时候经常会出现一些**错误查询**，出现这样的问题大多都是**json无法被ES解析**，会像java那样报一个异常信息，根据**异常信息**去推断问题所在，比如json格式不对，关键词不存在未注册等等，甚至有时候不能定位问题直接复制错误信息到百度一搜就能定位问题了。

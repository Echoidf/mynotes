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
timeline: true
---
## 一、QueryString

请求参数的查询（QueryString）

```
GET     /shop/_doc/_search?q=desc:慕课网
GET     /shop/_doc/_search?q=nickname:慕&q=age:25
```

这种方式被称之为`<mark>`QuerySting`</mark>`查询方式，参数都是放在url中作为请求参数的

## 二、DSL基本语法

QueryString用的很少，一旦参数复杂就难以构建，所以大多查询都会使用 DSL 来进行查询更好。

- Domain Specific Language
- 特定领域语言
- 基于JSON格式的数据查询
- 查询更灵活，有利于复杂查询

```json
# 查询
POST     /{index_name}/_doc/_search
# match--进行分词/全文检索
# 这里只要文档中包含'慕课' '网'这样的分词就可以命中
{
    "query": {
        "match": {
            "desc": "慕课网"
        }
    }
}
# 操作符`operator`默认是or,设置为and后要求文档必须包含query的所有分词，无顺序之分
# 也可以设置"minimum_should_match":"70%"（也可填数字）来要求最少要匹配多少关键词
{
    "query": {
        "match": {
            "desc": {
                "query": "学习慕课网"
                "operator": "and"
            }
        }
    }
}

# term--精确查询/关键字查询
{
    "query": {
        "term": {
            "desc": "慕课网"
        }
    }
}
# terms--多个关键字查询（只要一个关键词命中了就会返回）
{
    "query": {
        "terms": {
            "desc": ["慕课网","学习"]
        }
    }
}
#match_phrase--多关键词在一个字段中
#这里'大学'和'研究生'必须同时包含在`desc`属性中才会命中,slop表示query关键词之间可以允许跳过的词数，如果没写slop表示'大学'后面必须紧跟'研究生'才会命中
{
    "query": {
        "match_phrase": {
            "desc": {
            	"query": "大学 研究生",
                 "slop": 3
            }
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
# 查询所有--分页
{
	"query": {
		"match_all":{}
	},
	"from": 0,
	"size": 10
}
# 查询某些字段
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
# ids查询
{
	"query": {
        "ids": {
            "type": "_doc",
            "values": ["1001","1002","1003"]
        }
    }
}
# multi_match--在多个属性上进行分词检索
# 'nickname^10'表示以nickname属性为主加一个分数权重，提升10倍相关性
{
    "query": {
        "multi_match": {
           "query": "慕课网",
           "fields": ["desc", "nickname^10"]
        }
    }
}
```

语法格式为一个JSON Object， 内容都是k-v键值对，json可以嵌套

key可以是一些ES的关键字，也可以是某个field字段

基于Head也可以做类似的可视化操作



**搜索不合法问题定位**

DSL查询的时候经常会出现一些**错误查询**，出现这样的问题大多都是**json无法被ES解析**，会像java那样报一个异常信息，根据**异常信息**去推断问题所在，比如json格式不对，关键词不存在未注册等等，甚至有时候不能定位问题直接复制错误信息到百度一搜就能定位问题了。

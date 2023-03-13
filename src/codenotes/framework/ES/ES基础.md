---
title: ES基础
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
## 一、核心概念

- ES->数据库
- 索引index->表
- 文档document->行（记录）
- 字段fields->列

### 集群相关

- 分片(sard)：把索引库拆分为多份，分别放在不同的节点上，比如有3个节点，3个节点的所有数据内容加在一起是一个完整的索引库。分别保存到三个节点上，目的为了水平扩展，提高吞吐量。
- 备份(replica):每个shard的备份。

  **简称**
  shard = primary shard(主分片)
  replica = replica shard(备份节点)

## 二、倒排索引

1. 倒排索引源于实际应用中需要根据属性的值来查找记录;
2. 这种索引表中的每一项都包括一个属性和包含该属性值的各个记录地址;
3. 由于不是根据记录来确定属性(key确定value),而是根据属性来确定记录的位置(value确定key)

![image.png](https://s2.loli.net/2023/03/10/LBqi5h21xkKM3jO.png)

## 三、ElasticSearch下载安装

官网：https://www.elastic.co/cn/downloads/elasticsearch

教程文档：https://www.elastic.co/guide/cn/elasticsearch/guide/current/_cluster_health.html#_cluster_health

参考文档：[ElasticSearch之Windows中环境安装 - Qubernet - 博客园 (cnblogs.com)](https://www.cnblogs.com/qubernet/p/16849818.html)

注意：需要设置环境变量，因为7.x版本自带了jdk：

```shell
ES_JAVA_HOME=C:\Users\86188\Documents\java-study\software\elasticsearch-7.4.2\jdk
ES_HOME=C:\Users\86188\Documents\java-study\software\elasticsearch-7.4.2
```

7.x版本点击 `bin/elasticsearch.bat`启动程序

> 如果出现启动错误，显示 `Unrecognized VM option 'UseConcMarkSweepGC`，将config/jvm.options文件中GC configruation下面三行注释掉
>
> ```shell
> ##GC configuration
> #-XX:+UseConcMarkSweepGC
> #-XX:CMSInitiatingOccupancyFraction=75
> #-XX:+UseCMSInitiatingOccupancyOnly
> ```

可以在浏览器安装elasticsearch-head插件进行图形可视化界面的操作

## 三、基本RestFull接口

### 1、主要数据类型

- text,keyword,string
- long,integer,short,byte
- double,float
- boolean
- date
- object
- 数组不能混，类型一致

注意：

- text：文字类需要被分词被倒排索引的内容，比如商品名称，商品详情，商品介绍，使用text。
- keyword：**`<mark>`不会被分词，不会被倒排索引，直接匹配搜索`</mark>`**，比如订单状态，用户qq,微信号，手机号等，这些精确匹配，无需分词。

### 2、索引

相当于数据库中的表

```sql
# 创建索引
PUT    /index_name
{
    "settings": {
        "index": {
            "number_of_shards": "2",  #设置主分片数量，默认5
            "number_of_replicas": "0" #设置副本数量，默认1
        }
    }
}


#查看索引
GET     _cat/indices?v
#删除索引
DELETE    /index_name
```

索引的mapping动态映射

可以在创建索引时同时创建mappings

```shell
PUT     /index_name
{
    "mappings": {
        "properties": {
            "realname": {
                "type": "text",
                "index": true  #设置该字段会被索引，默认就是true
            },
            "username": {
                "type": "keyword",
                "index": false
            }
        }
    }
}
```

为已存在的索引创建mappings：

```shell
POST        /index_name/_mapping
{
    "properties": {
        "id": {
            "type": "long"
        },
        "age": {
            "type": "integer"
        },
        "nickname": {
            "type": "keyword"
        },
        "birthday": {
            "type": "date"
        },
        "relationship": {
            "type": "object"
        }
    }
}
```

无法修改索引mappings，某个属性一旦被建立就无法修改，但是可以新增字段：

```shell
POST        /index_name/_mapping
{
    "properties": {
        "name": {
               "type": "long"
        }
    }
}
```

### 3、文档

```shell
## 创建文档
POST     /index_name/_doc/{id}
{
    "id": 1001,
    "name": "docs_test",
    "desc": "I'm creating my doc!",
    "create_date": "2023-03-11"
}
```

如果索引没有手动建立mapping，那么插入文档数据时，会根据文档类型自动设置属性类型。这个就是es动态映射，帮我们在index索引库中去建立数据结构的相关配置。

```shell
## 删除文档
DELETE    /{index_name}/_doc/{id}

## 修改文档
POST     /{index_name}/_doc/{id}/_update
{
    "doc": {
        "name": "updated_name"
    }
}
```

这里的删除文档只是逻辑删除，只有当内存空间不够时才会触发被动清理，真正从磁盘删除

每次修改后，version会自增

```shell
## 查询文档
GET /{index_name}/_doc/{id}
GET /{index_name}/_doc/_search

##定制结果集
GET /{index_name}/_doc/{id}?_source=id,name
GET /{index_name}/_doc/_search?_source=id,name
```

`<mark>`文档乐观锁控制 `</mark>if_seq_no` 和 `if_primary_term`

- _seq_no：文档版本号，作用同_version
- primary term：文档所在位置

## 四、分词器

ES内置分词器：

- standard ：默认分词，单词会被拆分，大小写会转换小写。
- simple：按照非字母分词。大写会转为小写。
- whitespace :按照空格分词。忽略大小写。
- stop: 去除无意义单词。比如the/a/an/is...
- keyword：不做分词。把整个文本作为一个单独的关键词

```sql
POST /{index_name}/_analyze
{
    "analyzer": "standard",
    "field": "name",
    "text": "text文本"
}
```

IK中文分词器

下载地址：[GitHub - medcl/elasticsearch-analysis-ik: The IK Analysis plugin integrates Lucene IK analyzer into elasticsearch, support customized dictionary.](https://github.com/medcl/elasticsearch-analysis-ik)

analyzer可设置为：

- ik_max_word：最细粒度划分
- ik_smart：会做最粗粒度的拆分

## 五、自定义中文词库

修改 `plugins/ik/config` 下的`<mark>`IKAnalyzer.cfg.xml`</mark>`文件，进行配置

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE properties SYSTEM "http://java.sun.com/dtd/properties.dtd">
<properties>
    <comment>IK Analyzer 扩展配置</comment>
    <!--用户可以在这里配置自己的扩展字典 -->
    <entry key="ext_dict">custom.dic</entry>
     <!--用户可以在这里配置自己的扩展停止词字典-->
    <entry key="ext_stopwords"></entry>
    <!--用户可以在这里配置远程扩展字典 -->
    <!-- <entry key="remote_ext_dict">words_location</entry> -->
    <!--用户可以在这里配置远程扩展停止词字典-->
    <!-- <entry key="remote_ext_stopwords">words_location</entry> -->
</properties>
```

在  `plugins/ik/config` 下创建custom.dic，添加需要的自定义中文分词即可

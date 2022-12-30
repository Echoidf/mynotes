---
title: Clickhouse学习实践
icon: storage
# 分类
category:
  - 云计算
  - 数据库
  - 大数据
# 标签
tag:
  - 云计算
  - 列式存储
sticky: false
# 是否收藏在博客主题的文章列表中，当填入数字时，数字越大，排名越靠前。
star: 4
# 是否将该文章添加至文章列表中
article: true
# 是否将该文章添加至时间线中
timeline: true
---
## 一、ClickHouse入门

### 1.参考文档

- 中文文档地址：[什么是ClickHouse？ | ClickHouse Docs](https://clickhouse.com/docs/zh/)
- 英文文档地址：[Welcome to ClickHouse Docs | ClickHouse Docs](https://clickhouse.com/docs/en/home/)

注：学习时可以参考中文文档，但是具体内容不如英文版全面

还有一些学习教程

- [OLAP分析引擎-Clickhouse 枫叶云笔记 (fynote.com)](https://cloud.fynote.com/share/d/7551#1-1-ClickHouse与其特性_0)
- [ClickHouse入门：ubuntu安装ClickHouse_ClickHouse入门学习_大数据知识库 (saoniuhuo.com)](https://www.saoniuhuo.com/article/detail-36706.html)
- [尚硅谷ClickHouse视频教程](https://www.bilibili.com/video/BV1Yh411z7os/?spm_id_from=333.337.search-card.all.click&vd_source=bdbfe17d291002594c9e265913af7f71)

### 2.简介

ClickHouse 是俄罗斯的 Yandex 于 2016 年开源的**列式存储数据库**（DBMS），使用 C++语言编写，主要用于**在线分析查询**（OLAP），能够使用 SQL 查询实时生成分析数据报告。

ClickHouse核心特性：

![ch核心特性](https://s2.loli.net/2022/12/25/Qs7IrJE1UqMoj8Z.jpg)

#### 2.1列式存储

- 对于列的聚合，计数，求和等统计操作原因优于行式存储
- 由于某一列的数据类型都是相同的，针对于数据存储更容易进行数据压缩，每一列选择更优的数据压缩算法，大大提高了数据的压缩比重
- 由于数据压缩比更好，一方面节省了磁盘空间，另一方面对于 cache 也有了更大的发挥空间

#### 2.2DBMS的功能

几乎覆盖了标准 SQL 的大部分语法，包括 DDL 和 DML，以及配套的各种函数，用户管理及权限管理，数据的备份与恢复

#### 2.3多样化的引擎

ClickHouse 和 MySQL 类似，把表级的存储引擎插件化，根据表的不同需求可以设定不同的存储引擎。目前包括合并树、日志、接口和其他四大类 20 多种引擎。

#### 2.4高吞吐写入能力

ClickHouse 采用类 LSM Tree的结构，数据写入后定期在后台 Compaction。通过类 LSM tree的结构，ClickHouse 在数据导入时全部是顺序 append 写，写入后数据段不可更改，在后台compaction 时也是多个段 merge sort 后顺序写回磁盘。顺序写的特性，充分利用了磁盘的吞吐能力，即便在 HDD 上也有着优异的写入性能。官方公开 benchmark 测试显示能够达到 50MB-200MB/s 的写入吞吐能力，按照每行100Byte 估算，大约相当于 50W-200W 条/s 的写入速度

#### 2.5数据分区与线程级并行

ClickHouse 将数据划分为多个 partition，每个 partition 再进一步划分为多个 index granularity(索引粒度)，然后通过多个 CPU核心分别处理其中的一部分来实现并行数据处理。在这种设计下，单条 Query 就能利用整机所有 CPU。极致的并行处理能力，极大的降低了查询延时。所以，ClickHouse 即使对于大量数据的查询也能够化整为零平行处理。但是有一个弊端就是对于单条查询使用多 cpu，就不利于同时并发多条查询。所以对于高 qps 的查询业务，ClickHouse 并不是强项

### 3.Clickhouse常用命令

参考：

[Clickhouse常用命令|阿里开发者社区](https://developer.aliyun.com/article/713387#:~:text=ClickHouse常用命令 2019-08-09 12324)

[clickhouse常用操作命令|CSDN博客](https://blog.csdn.net/anyitian/article/details/115717758)

客户端常用参数

```shell
--host, -h -– 服务端的 host 名称, 默认是 'localhost'。 您可以选择使⽤ host 名称或者 IPv4 或 IPv6 地址
--port – 连接的端⼝，默认值： 9000。注意 HTTP 接⼝以及 TCP 原⽣接⼝是使⽤不同端⼝的 
--user, -u – ⽤户名。 默认值： default。 
--password – 密码。 默认值： 空字符串。 
--query, -q – ⾮交互模式下的查询语句. 
--database, -d – 默认当前操作的数据库. 默认值： 服务端默认的配置 （默认是 default ） 
--multiline, -m – 如果指定，允许多⾏语句查询（Enter 仅代表换⾏，不代表查询语句完结） 
--multiquery, -n – 如果指定, 允许处理⽤逗号分隔的多个查询，只在⾮交互模式下⽣效
--format, -f – 使⽤指定的默认格式输出结果。 
--vertical, -E – 如果指定，默认情况下使⽤垂直格式输出结果。这与 '--format=Vertical' 相同。在这种格式中，每个值都在单独的⾏上打印，这种⽅式对显示宽表很有帮助。
--time, -t – 如果指定，⾮交互模式下会打印查询执⾏的时间到 'stderr' 中。
--stacktrace – 如果指定，如果出现异常，会打印堆栈跟踪信息。
-config-file – 配置⽂件的名称

## 客户端登录
```bash
clickhouse-client --user xxxx  --password xxxx
clickhouse-client -u xxxx  --password xxxx

```

导入导出

```shell
clickhouse-client --query="INSERT INTO database.table_name FORMAT CSVWithNames" < /path/import_filename.csv

clickhouse-client --query="SELECT * FROM database.table_name FORMAT CSV" sed 's/"//g' > /path/export_filename.csv
```

### 4.表引擎

表引擎（即表的类型）决定了：

- 数据的存储方式和位置，写到哪里以及从哪里读取数据
- 支持哪些查询以及如何支持。
- 并发数据访问。
- 索引的使用（如果存在）。
- 是否可以执行多线程请求。
- 数据复制参数。

#### （1）TinyLog

最简单的表引擎，用于将数据存储在磁盘上。每列都存储在单独的压缩文件中，写入时，数据将附加到文件末尾。 该引擎没有并发控制

- 如果同时从表中读取和写入数据，则读取操作将抛出异常；
- 如果同时写入多个查询中的表，则数据将被破坏。

这种表引擎的典型用法是 write-once：首先只写入一次数据，然后根据需要多次读取。此引擎**适用于相对较小的表**（建议最多 1,000,000 行）。**如果有许多小表，则使用此表引擎是适合的，因为它比需要打开的文件更少**。当拥有大量小表时，可能会导致性能低下。 **不支持索引**。 案例：创建一个 TinyLog 引擎的表并插入一条数据

```shell
:)create table t (a UInt16, b String) ENGINE=TinyLog;
:)insert into t (a, b) values (1, 'abc');
```

#### （2） Memory

内存引擎，数据以未压缩的原始形式直接保存在内存当中，服务器重启数据就会消失。读写操作不会相互阻塞，不支持索引。简单查询下有非常非常高的性能表现（超过 10G/s）。 一般用到它的地方不多，除了用来测试，就是在需要非常高的性能，同时数据量又不太大（上限大概 1 亿行）的场景。

#### （3） Merge

Merge 引擎 (不要跟 MergeTree 引擎混淆) 本身不存储数据，但可用于同时从任意多个其他的表中读取数据。 读是自动并行的，不支持写入。读取时，那些被真正读取到数据的表的索引（如果有的话）会被使用。 Merge 引擎的参数：一个数据库名和一个用于匹配表名的正则表达式。 案例：先建 t1，t2，t3 三个表，然后用 Merge 引擎的 t 表再把它们链接起来。

```shell
:)create table t1 (id UInt16, name String) ENGINE=TinyLog;
:)create table t2 (id UInt16, name String) ENGINE=TinyLog;
:)create table t3 (id UInt16, name String) ENGINE=TinyLog;

:)insert into t1(id, name) values (1, 'first');
:)insert into t2(id, name) values (2, 'second');
:)insert into t3(id, name) values (3, 'i am in t3');

:)create table t (id UInt16, name String) ENGINE=Merge(currentDatabase(), '^t');

:) select * from t;
┌─id─┬─name─┐
│  2 │ second │
└────┴──────┘
┌─id─┬─name──┐
│  1 │ first │
└────┴───────┘
┌─id─┬─name───────┐
│ 3     │ i am in t3 │
└────┴────────────┘
```

#### （4）MergeTree

Clickhouse 中最强大的表引擎当属 MergeTree （合并树）引擎及该系列（MergeTree）中的其他引擎。 MergeTree 引擎系列的基本理念如下。当你有巨量数据要插入到表中，你要**高效地一批批写入数据片段**，并希望这些数据片段**在后台按照一定规则合并**。相比在插入时不断修改（重写）数据进存储，这种策略会高效很多。 格式：

```
CREATE TABLE [IF NOT EXISTS] [db.]table_name [ON CLUSTER cluster]
(
    name1 [type1] [DEFAULT|MATERIALIZED|ALIAS expr1],
    name2 [type2] [DEFAULT|MATERIALIZED|ALIAS expr2],
    ...
) ENGINE = VersionedCollapsingMergeTree(sign, version)
[PARTITION BY expr]
[ORDER BY expr]
[PRIMARY KEY expr]
[SAMPLE BY expr]
[SETTINGS name=value, ...]
```

PARTITION BY [选填]：分区键，用于指定表数据以何种标准进行分区。

ORDER BY[选填]：排序键

PRIMARY KEY [选填] ： 主键

SAMPLE BY [选填]：抽样表达式，用于声明数据以何种标 准进行采样

SETTINGS：index_granularity [选填]：它表示索引的粒度，默认值为 8192。也就是说，MergeTree的索引在默认情况下，每间隔8192行数据 才生成一条索引，稀疏索引

MergeTree 其实还有很多参数(绝大多数用默认值即可)，但是有三个参数比较重要：

1. **partition by  分区(可选)**

   分区的目的主要是降低扫描的范围，优化查询速度，不填只有一个分区。MergeTree 是以列文件+索引文件+表定义文件组成的，但是如果设定了分区那么这些文件就会保存到不同的分区目录中。

   分区后，面对涉及跨分区的查询统计，ClickHouse 会以分区为单位并行处理。

   ---

   任何一个批次的数据写入都会产生一个临时分区，不会纳入任何一个已有的分区。写入后的某个时刻（大概 10-15 分钟后），ClickHouse 会自动执行合并操作（等不及也可以手动通过 optimize 执行），把临时分区的数据，合并到已有分区中。


   ```shell
   optimize table xxxx final;
   ```

   ---
2. **primary key 主键(可选)**

   ClickHouse 中的主键，和其他数据库不太一样，**它只提供了数据的一级索引**，但是却不是唯一约束。这就意味着是可以存在相同 primary key 的数据的。

   待主键定义之后， MergeTree会依据index_granularity间隔（默认8192行），为数据表生成 一级索引并保存至primary.idx文件内，索引数据按照PRIMARY KEY排 序。相比使用PRIMARY KEY定义，更为常见的简化形式是通过 ORDER BY指代主键。

   每间隔8192行数据就会取一次主键的值作为索引值，索引数据最终会被写入primary.idx文件进行保存

   主键的设定主要依据是查询语句中的 where 条件。

   根据条件通过对主键进行某种形式的二分查找，能够定位到对应的 index granularity,避免了全表扫描。

   > 【index granularity索引粒度，ClickHouse 中的 MergeTree 默认是 8192,指在稀疏索引中两个相邻索引对应数
   >
   > 据的间隔,官方不建议修改这个值，除非该列存在大量重复值，比如在一个分区中几万行才有一个不同数据。】
   >
3. **order by （必选）**

   order by 设定了分区内的数据按照哪些字段顺序进行有序保存。

   order by 是 MergeTree 中唯一一个必填项，甚至比 primary key 还重要，因为当用户不设置主键的情况，很多处理会依照 order by 的字段进行处理（比如去重和汇总）。

   要求：主键必须是 order by 字段的前缀字段。

   比如 order by 字段是 (id,sku_id) 那么主键必须是 id 或者(id,sku_id)

#### （5）ReplacingMergeTree

```shell
CREATE TABLE replace_table(
id String,  
code String,   
create_time DateTime
)ENGINE = ReplacingMergeTree() 
PARTITION BY toYYYYMM(create_time) 
ORDER BY (id,code) //根据id与code去重 
PRIMARY KEY id
```

只有在相同的数据分区内重复的数据才可以被删除，而不同数 据分区之间的重复数据依然不能被剔除

- **使用ORBER BY排序键作为判断重复数据的唯一键**
- 只有在合并分区的时候才会触发删除重复数据的逻辑。
- 以数据分区为单位删除重复数据。当分区合并时，同一分区 内的重复数据会被删除；不同分区之间的重复数据不会被删除。
- 在进行数据去重时，因为分区内的数据已经基于ORBER BY 进行了排序，所以能够找到那些相邻的重复数据。
- 数据去重策略有两种：
- 如果没有设置ver版本号，则保留同一组重复数据中的最后一 行。
- 如果设置了ver版本号，则保留同一组重复数据中ver字段取值最 大的那一行。

#### （6）SummingMergeTree

该引擎继承自 MergeTree。能够在合并分区的时候按照预先定义的条件聚合汇总数据，将同一分组下的多行数据汇总合并成一行，这样既减少了数据行，又降低了后续汇总查询的开销。**适用于不查询明细，只关心以维度进行汇总聚合结果的场景**。

### 5.二级索引

granularity与index_granularity的关系

index_granularity定 义了数据的粒度，而granularity定义了聚合信息汇总的粒度。换言之， granularity定义了一行跳数索引能够跳过多少个index_granularity区间的数据。

二级索引类型

- minmax：minmax索引记录了一段数据内的最小和最大极值，其索引的作用类似分区目录的minmax索引，能够快速跳过无用的数据区间。
- set：set索引直接记录了声明字段或表达式的取值
- ngrambf*v1：ngrambf*v1索引记录的是数据短语的布隆表过滤器，只支持String和FixedString数据类型
- tokenbf*v1：tokenbf*v1索引是ngrambf_v1的变种，同样也是 一种布隆过滤器索引

### 6.数据库引擎之Mysql

服务器安装mysql

```
apt-get install mysql-server
//启动服务
service mysql start
//进入服务
mysql -uroot -p
```

MySQL表引擎可以与MySQL数据库中的数据表建立映射，并通过 SQL向其发起远程查询，包括SELECT和INSERT，它的声明方式如 下：

```
ENGINE = MySQL('host:port', 'database', 'table', 'user', 'password'[,replace_query, 'on_duplicate_clause'])
```

> replacequery默认为0，对应MySQL的REPLACE INTO语法。如果将它设置为1，则会用REPLACE INTO代替INSERT INTO。
>
> on*duplicate*clause默认为0，对应MySQL的ON DUPLICATE KEY 语法。如果需要使用该设置，则必须replacequery设置成0

**clickhouse创建映射表**

```
CREATE TABLE test(
id UInt32,
name String
)ENGINE = MySQL('127.0.0.1:3306', 'test',
'test', 'root', '')
```

插入数据

```sql
INSERT INTO TABLE test VALUES (1,'流程1')
```

查询Mysql 表 test ，发现数据已经被远程写入了。

## 二、分布式安装

### 1.搭建Zooker集群

ClickHouse的分布式安装要依赖于Zookeeper，首先我们需要准备三台虚拟机，搭建Zookeeper的集群，具体步骤可以参考[VirtualBox搭建集群 | Zuoo (echoidf.github.io)](https://echoidf.github.io/posts/virtualbox搭建zookeeper集群/)

可以先进行单机版的安装，然后再直接复制虚拟机，进行简单配置即可

### 2.安装ClickHouse

先安装一下依赖：

```shell
 yum install -y libtool
```

将四个依赖包上传到虚拟机指定的目录，并安装依赖

```shell
tar -xzvf clickhouse-common-static-$LATEST_VERSION.tgz
sudo clickhouse-common-static-$LATEST_VERSION/install/doinst.sh

tar -xzvf clickhouse-common-static-dbg-$LATEST_VERSION.tgz
sudo clickhouse-common-static-dbg-$LATEST_VERSION/install/doinst.sh

tar -xzvf clickhouse-server-$LATEST_VERSION.tgz
sudo clickhouse-server-$LATEST_VERSION/install/doinst.sh

tar -xzvf clickhouse-client-$LATEST_VERSION.tgz
sudo clickhouse-client-$LATEST_VERSION/install/doinst.sh
```

注：安装第3个包clickhouse-server时，clickhouse会在数据库中创建一个默认的用户default，安装过程中，会需要给这个default用户输入一个密码。这里进行测试，就直接回车，不设置密码即可。

安装完成后，就可以使用clickhouse start指令启动clickhouse服务了

如果遇到启动错误，可以查询启动日志，查看错误信息：

```shell
 journalctl -xe
 cat /var/log/clickhouse-server/clickhouse-server.log
```

### 3.目录解析

| 目录                                                           | 描述                                        |
| :------------------------------------------------------------- | ------------------------------------------- |
| /var/lib/clickhouse/                                           | 数据文件                                    |
| /var/log/clickhouse-server/                                    | 日志文件                                    |
| /etc/clickhouse-server/                                        | 配置文件（config.xml和users.xml等）         |
| /usr/bin/                                                      | 执行脚本（clickhouse和clickhouse-client等） |
| clickhouse在安装时，会默认创建一个clickhouse用户来部署这些文件 |                                             |

### 4.常见命令

| 功能       | 命令                                           |
| :--------- | ---------------------------------------------- |
| 启动Server | systemctl start clickhouse-server              |
| 关闭Server | systemctl stop clickhouse-server               |
| 重启Server | systemctl restart clickhouse-server            |
| 查看状态   | systemctl status clickhouse-server             |
| 客户端连接 | clickhouse-client [--password (your password)] |

### 5.修改配置文件

前提：已经按照[VirtualBox搭建集群 | Zuoo (echoidf.github.io)](https://echoidf.github.io/posts/virtualbox搭建zookeeper集群/)搭建好Zookeeper集群

修改3台服务器ClickHouse配置文件 /etc/clickhouse-server/config.xml

1. 在 <remote_servers> 标签内添加如下配置:
   配置副本节点

   ```shell
   <nt_1shards_3replicas> 
     <shard> 
       <internal_replication>true</internal_replication>  
       <replica> 
         <host>node01</host>  
         <port>9000</port> 
       </replica>  
       <replica> 
         <host>node02</host>  
         <port>9000</port> 
       </replica>  
       <replica> 
         <host>node03</host>  
         <port>9000</port> 
       </replica> 
     </shard> 
   </nt_1shards_3replicas>
   ```
2. 添加zookeeper配置

   ```shell
   <zookeeper> 
     <node index="1"> 
       <host>node01</host>  
       <port>2181</port> 
     </node>  
     <node index="2"> 
       <host>node02</host>  
       <port>2181</port> 
     </node>  
     <node index="3"> 
       <host>node03</host>  
       <port>2181</port> 
     </node> 
   </zookeeper>
   ```
3. 添加macros配置

   ```shell
   <macros>
       <shard>1</shard>
       <replica>192.168.56.154</replica> #这里每个结点的配置添加当前节点IP
   </macros>
   ```
4. 重启使配置生效

   ```shell
   systemctl restart clickhouse-server.service
   ```

   ClickHouse-Client查看配置是否生效：

   ```shell
   select * from system.clusters;
   ```

  ![](https://s2.loli.net/2022/12/25/87F3xQZMECsTKwt.png)

   可以看出集群名是：nt_1shards_3replicas

## 三、物化视图

### 1.什么是视图？

在 SQL 中，视图是基于 SQL 语句的结果集的可视化的表。

视图包含行和列，就像一个真实的表。视图中的字段就是来自一个或多个数据库中的真实的表中的字段。我们可以向视图添加 SQL 函数、WHERE 以及 JOIN 语句，我们也可以提交数据，就像这些来自于某个单一的表。

**注释：**数据库的设计和结构不会受到视图中的函数、where 或 join 语句的影响。

### 2.ClickHouse物化视图

物化视图（Materialized Views，以下简称 MV）是一种特殊的视图，它的数据会持久化。那么在查询 MV 时，并不会去访问基表，而是直接从 MV 里读数据。

当然，基表的数据会修改，那么 MV 的数据也要跟着修改。

#### 典型使用场景

**1.加速查询**

有些查询需要访问大量的数据，而且每天要查询数次，那么就可以利用 MV。这样不仅查询更快，还降低了系统的 CPU 和 IO 开销。

同时，还可以在 MV 上建索引、分区以进一步提高性能。

**2.数据仓库**

把多个数据源的数据收集并存储的数据库，就叫数据仓库（Data Warehousing）。

MV 的作用是把多个数据源的数据收集起来，而不是直接复制数据。这样在数据仓库查询时，只用访问 MV ，而不用访问远程的数据源。

**3.数据集成**

数据集成（Data Integration）是把多个数据源的相同对象进行匹配（类似于 outer join），组合为更大的对象。

因为匹配条件很难计算，而 MV 可以保存组合后的对象，所以复用的代价就很低了。

**4.数据备份**

一些场景下（例如 field sales），副本在固定时刻会断开网络，要在重新连接网络时同步数据，那么需要在需要时更新副本或者定期更新。

这种需要恰巧符合 MV 的能力，所以有一种备份叫 MV 备份。这些场景的 MV 包含了基表的全部或部分数据。

**5.当成快照使用**

MV 不一定要实时更新，那么每次 MV 更新完，就相当于是基表的一个快照。可以利用这个特定，来实现特定的业务逻辑。

举个例子，有个显示文章的系统，用户可以通过前端查看文章。后台可以随时修改文章并保存，但是希望前端不要马上看到，而是修改完以后一次刷新到前端显示。

这样我们就可以用 MV 来实现：后台修改的是基表，前端读的是 MV。后台修改完后，再手动刷新 MV，让前端看到。

#### Clickhouse中的物化视图

参考：[「ClickHouse系列」ClickHouse中的物化视图详解 - 腾讯云开发者社区-腾讯云 (tencent.com)](https://cloud.tencent.com/developer/article/1988528)

```sql
CREATE [MATERIALIZED] VIEW [IF NOT EXISTS] [db.]table_name [TO[db.]name] [ENGINE = engine] [POPULATE] AS SELECT …
```

也是create语法，会创建一个隐藏的目标表来保存视图数据。也可以TO 表名，保存到一张显式的表。没有加TO表名，表名默认就是 .inner.物化视图名。

**物化视图中需要注意的几点**:

1. 必须指定物化视图的engine 用于数据存储
2. TO [db].[table]语法的时候，不得使用POPULATE。
3. 查询语句(select）可以包含下面的子句：DISTINCT, GROUP BY, ORDER BY, LIMIT…
4. 物化视图的alter操作有些限制，操作起来不大方便。
5. 物化视图是种特殊的数据表，可以用show tables 查看

创建物化视图时一般情况下引擎可以选用**SummingMergeTree**，因为该引擎支持**以主键分组**，对数值型指标做自动累加。每当表的parts做后台merge的时候，主键相同的所有记录会被加和合并成一行记录，可以大大节省空间。

#### 实践

[ClickHouse物化视图在微信的实战经验 (qq.com)](https://mp.weixin.qq.com/s?__biz=Mzg3MTU2MTY5Nw==&mid=2247484678&idx=1&sn=aefc05096b87def5cb0907c75292d2d5&chksm=cefde588f98a6c9e4440bb07e6ed753325bb733bedcef06bdf708c061847482c5f10263fc716&mpshare=1&scene=1&srcid=1128sPOfzg4V9H953Kp2a9oC&sharer_sharetime=1669623285188&sharer_shareid=aedd72d7c0b9d4a1826b9a3022f6ce94&key=b74d2dd8e3b5765f95ee244dbcf0c3c6397046b469d2fcd94806e2868b95cab3b6b8e1ffa915a3900cbcf6621f1a76144e117245fa211af2b32817895ee11ebe53b8bdf35f4333d77264c039b1267f6211691a684c46e706fb6d6678dd386cf2d4b010c4ede60f0fbf08fbbb14b65d58d9c72fd9c04116415e0dbdc76d16cd87&ascene=1&uin=MTkwNjkxNDU1OA%3D%3D&devicetype=Windows+11+x64&version=63080021&lang=zh_CN&exportkey=n_ChQIAhIQtC%2BqwRDQkmJ2q4XdX1tMFBLlAQIE97dBBAEAAAAAAM6mDPqyGRkAAAAOpnltbLcz9gKNyK89dVj0MsjEgs3wWPDel1%2ForZG1%2BpXMEJYReQ3AEXH%2Bm3KS%2Fy7n3cTdz17onVUvFd2xy6Tg42c%2FtaGJ%2BnNCMmUDNZ4oTnRIE8TOWkEzOh62gXNkJIvkq188%2B8I7vHbNvChyepYP5ti6M02bi%2FLFLnreiGrrVeQNNcQGSxM1C5oewnusv%2F1jfm1D71ficzH25ebJHUdO%2BtYuv3kTPE1rJxUUp7h46Q2Nqjdkmtdfb5tyyIAtxldS%2FwdPqoAP7L82sRkhl6Q%3D&acctmode=0&pass_ticket=tLY%2F%2FIuKQjSmAhxZOoGuxuGZWkw7KWFM9JnoE4uFmzgOlc3%2Bd%2FwocWOQ1fhcrayA&wx_header=1&fontgear=2)

[IVitamin-C/clickhouse-learning: ClickHouse学习之路，一起进步 (github.com)](https://github.com/IVitamin-C/clickhouse-learning)

## 四、MySql迁移到Clickhouse

ClickHouse支持Mysql大多数语法，迁移成本低，目前有五种迁移方案：

- create table engin mysql，映射方案数据还是在Mysql
- insert into select from，先建表，在导入
- create table as select from，建表同时导入
- csv离线导入
- streamsets

**建表同时导入**

以数据中台表为案例,在DBeaver连接clickhouse,执行sql:

```sql
CREATE TABLE b_chem_base
ENGINE = MergeTree ORDER BY id AS SELECT * FROM mysql('[主机名]:3306', '[数据库名]', '[表名]', '[用户名]', '[密码]');
```

## 五、MySql数据同步

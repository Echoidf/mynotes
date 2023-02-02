---
title: Redis持久化
icon: workingDirectory
# 分类
category:
  - Redis
  - 数据库
# 标签
tag:
  - NoSql
  - 非关系型数据库
  - 高并发
sticky: false
# 是否收藏在博客主题的文章列表中，当填入数字时，数字越大，排名越靠前。
star: 9
# 是否将该文章添加至文章列表中
article: true
# 是否将该文章添加至时间线中
timeline: true
---


## 一、官方资料

在线文档 : [https://redis.io/topics/persistence](在线文档 : https://redis.io/topics/persistence)

* **RDB** (Redis Database): RDB persistence performs point-in-time snapshots of your dataset at specified intervals.
* **AOF** (Append Only File): AOF persistence logs every write operation received by the server. These operations can then be replayed again at server startup, reconstructing the original dataset. Commands are logged using the same format as the Redis protocol itself.
* **No persistence** : You can disable persistence completely. This is sometimes used when caching.
* **RDB + AOF** : You can also combine both AOF and RDB in the same instance.

官方共列出了四种持久化方案

### 1. RDB（Redis DataBase）

是指在指定的时间间隔内将内存中的数据集快照写入磁盘， 也就 Snapshot 快照，恢复时将快照文件读到内存

### 2.AOF  (Append Only File)

> 以日志的形式来记录每个写操作(增量保存)，将 Redis 执行过的所有写指令记录下来(比如 set/del 操作会记录, 读操作 get 不记录)
>
> 只许追加文件但不可以改写文件
>
> redis 启动之初会读取该文件重新构建数据
>
> redis 重启后根据日志文件的内容将写指令从前到后执行一次以完成数据的恢复工作

### 3. 小结

1) 整个过程中，主进程是不进行任何 IO 操作的，这就确保了极高的性能
2) 如果需要进行大规模数据的恢复, 且对于数据恢复的完整性不是非常敏感，那 RDB 方式要比 AOF 方式更加的高效
3) RDB 的缺点是最后一次持久化后的数据可能丢失

   > 如果你是正常关闭 Redis , 仍然会进行持久化, 不会造成数据丢失
   >
   > 如果是 Redis 异常终止/宕机, 就可能造成数据丢失
   >

## 二、RDB配置

### 1.修改默认rdb文件位置

在 redis.conf 中配置文件名称, 默认为 dump.rdb

`# The filename where to dump the DB`

`dbfilename dump.rdb`

rdb文件存储位置：默认为 Redis 启动时命令行所在的目录下

可以在redis.conf中修改rdb文件的保存路径：

![20230130120703](https://s2.loli.net/2023/01/30/RvJa29WtcULMiXT.png)

### 2.默认快照配置

`save 60 10000`表示在60秒时间段，有10000个key变化就进行RDB备份

如何禁用快照：`save ""`

如果没有开启save注释，那么在退出Redis时也会进行备份，更新dump.rdb文件--->shutdown [NOSAVE | SAVE] (默认save)

![20230201094723](https://s2.loli.net/2023/02/01/kSD8VqspQPN7ldb.png)

### 3.相关指令

| 指令                         | 说明                                                                                                        |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------- |
| save                         | save 时只管保存，其它不管，全部阻塞。手动保存, 不建议                                                       |
| bgsave                       | Redis 会在后台异步进行快照操作， 快照同时还可以响应客户端请求                                               |
| lastsave                     | 获取最后一次成功执行快照的时间(unix 时间戳),转换网址：[https://tool.lu/timestamp/](https://tool.lu/timestamp/) |
| flushall                     | 用于清空整个 Redis 服务器的数据(删除所有数据库的所有 key),也会产生 dump.rdb 文件, 数据为空                  |
| redis-cli config set save "" | 动态停止 RDB，save 后给空值，表示禁用保存策略                                                               |

### 4.其他配置项

| 配置                        | 说明                                                                                                                        |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| stop-writes-on-bgsave-error | 当 Redis 无法写入磁盘的话(比如磁盘满了), 直接关掉 Redis 的写操作。推荐 yes                                                  |
| rdbcompression              | 对于存储到磁盘中的快照，可以设置是否进行压缩存储。<br />如果是的话，redis 会采用LZF算法进行压缩，默认yes                    |
| rdbchecksum                 | 在存储快照后, 还可以让 redis 使用 CRC64 算法来进行数据校验，保证文件是完整的。<br />这样做会增加大约 10%的性能消耗，推荐yes |

### 5.RDB备份及恢复

- Redis 可以充当缓存, 对项目进行优化, 因此重要/敏感的数据建议在 Mysql要保存一份
- 从设计层面来说, Redis 的内存数据, 都是可以重新获取的(可能来自程序, 也可能来自Mysql)
- Redis 启动时, 初始化数据是从dump.rdb 来的

a. config get dir 查询 rdb 文件的目录

b. 将 dump.rdb 进行备份, 如果有必要可以写 shell 脚本来定时备份

### 6.小结

a. 优势

1、适合大规模的数据恢复
2、对数据完整性和一致性要求不高更适合使用
3、节省磁盘空间
4、恢复速度快

b. 劣势

1、虽然 Redis 在 fork 时使用了写时拷贝技术(Copy-On-Write),但是如果数据庞大时还是比较消耗性能。

2、在备份周期在一定间隔时间做一次备份，所以如果 Redis 意外 down 掉的话(如果正常关闭 Redis, 仍然会进行 RDB 备份, 不会丢失数据), 就会丢失最后一次快照后的所有修改

## 三、AOF

### 1.持久化流程

1) 客户端的请求写命令会被 `append` 追加到 `AOF 缓冲区` 内
2) AOF 缓冲区根据 `AOF 持久化策略` [always,everysec,no]将操作 sync 同步到磁盘的 `AOF 文件` 中

   > AOF频率设置
   >

   ```shell
   appendfsync everysec # 每秒进行一次同步，显示的将多个写命令同步到硬盘
   appendfsync always # 每个redis写命令都同步的写入磁盘，这样做会严重降低redis的速度
   appendfsync no # 由操作系统决定应该何时进行同步
   ```
3) AOF 文件大小超过重写策略或手动重写时，会对 AOF 文件 `rewrite` 重写，压缩 AOF 文件容量

   > AOF文件手动重写
   >

   可以向redis发送 `bgrewriteaof`，这个命令会移除在文件中的冗余命令来重写rewriteAOF文件，使AOF文件的体积变得尽可能的小

   还需要注意的是，当AOF文件过大，在重写过程以及重写完成之后删除旧有AOF文件，删除一个较大的AOF文件还可能会导致操作系统挂起数秒

   > AOF文件自动重写策略
   >

   ```shell
   auto-aof-rewrite-percentage 100
   auto-aof-rewrite-min-size 64mb
   ```

   上述选项的含义：当AOF文件此时大于64M，并且AOF文件的体积比上一次重写之后的体积大于了至少一倍100%，那么redis就会执行 `BGREWRITEAOF`命令
4) Redis 服务重启时，会重新 `load` 加载 AOF 文件中的写操作达到数据恢复目的

### 2.开启AOF

- 在 redis.conf 中配置文件名称，默认为 appendonly.aof,需要开启appendonly选项，默认为no
- AOF 文件的保存路径，同 RDB 的路径一致
- AOF 和 RDB 同时开启，系统默认读取 AOF 的数据

```shell
1253 appendonly yes
1254
1255 # The name of the append only file (default: "appendonly.aof")
1256
1257 appendfilename "appendonly.aof"
```

### 3.AOF异常恢复

- 如遇到 AOF 文件损坏，通过/usr/local/bin/redis-check-aof --fix appendonly.aof 进行恢复
- 建议先: 备份被写坏的 AOF 文件
- 恢复：重启 redis，然后重新加载

### 4.小结

a. 优势

1、备份机制更稳健，丢失数据概率更低。
2、可读的日志文本，通过操作 AOF 稳健，可以处理误操作

b. 劣势

1、比起 RDB 占用更多的磁盘空间
2、恢复备份速度要慢
3、每次读写都同步的话，有一定的性能压力
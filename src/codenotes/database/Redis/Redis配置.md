---
title: Redis配置
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
star: 7
# 是否将该文章添加至文章列表中
article: true
# 是否将该文章添加至时间线中
timeline: true
---
# 一、常规配置

## 1.设置密码

### a.永久设置--通过配置文件

![20230128113221](https://s2.loli.net/2023/01/28/46wJHmdVPulz7EW.png)

requirepass配置可以让用户使用AUTH命令来认证密码，才能使用其他命令。

使用requirepass的时候需要注意，因为redis太快了，每秒可以认证15w次密码，简单的密码很容易被攻破，所以最好使用一个更复杂的密码

### b.命令行设置

```shell
127.0.0.1:6379> config set requirepass zql  #设置密码
OK
127.0.0.1:6379> config get requirepass
1) "requirepass"
2) "zql"
127.0.0.1:6379> set key val
OK
127.0.0.1:6379> get key
"val"
127.0.0.1:6379> quit
zql@Master:/opt/Redis/redis-6.2.6$ redis-cli  #重新登录客户端
127.0.0.1:6379> get key
(error) NOAUTH Authentication required.	      #此时需要进行密码认证
127.0.0.1:6379> auth zql		      #输入密码
OK
127.0.0.1:6379> get key			      #可以进行操作了
"val"
127.0.0.1:6379>
```

## 2.daemonize

是否在后台执行，yes：后台运行；no：不是后台运行

## 3.loglevel

指定了服务端日志的级别。

级别包括：

- debug（很多信息，方便开发、测试）
- verbose（许多有用的信息，但是没有debug级别信息多）
- notice（适当的日志级别，适合生产环境）
- warn（只有非常重要的信息）

## 4.logfile

指定了记录日志的文件。空字符串的话，日志会打印到标准输出设备。后台运行的redis标准输出是/dev/null

## 5.设定库的数量

默认：`database 16`

默认使用的数据库是0。可以通过”SELECT 【数据库序号】“命令选择一个数据库，序号从0开始

# 二、Units单位

配置文件中说明了基本的度量单位，只支持bytes，不支持bit【注意：1k=1000bytes】

![20230128111728](https://s2.loli.net/2023/01/28/EPnL4KCWzYMGF7x.png)

# 三、#INCLUDES#

多实例的情况下可以把公用的配置文件提取出来，然后include

![20230128112110](https://s2.loli.net/2023/01/28/lC6dnJ9AqsNPVri.png)

# 四、#NETWORK#

## 1.bind

- 默认情况bind=127.0.0.1只能接受本机的访问请求
- 如果需要远程访问，需要注释掉该行

## 2.protected-mode

- 默认是保护模式 `protected-mode yes`
- 如果需要远程访问，需要改为no

## 3.port

默认端口 `port 6379`

## 4.timeout

默认 `timeout 0`

一个空闲的客户端维持多少秒会关闭，0 表示关闭该功能, 即永不超时

## 5.tcp-keepalive

默认 `tcp-keepalive 300`

tcp-keepalive 是对访问客户端的一种心跳检测，每隔 n 秒检测一次, 单位为秒

如果设置为 0，则不会进行 Keepalive 检测，建议设置成 60

## 思考

**为什么需要心跳检测机制？**

1. TCP 协议中有长连接和短连接之分。短连接环境下，数据交互完毕后，主动释放连接；
2. 长连接的环境下，进行一次数据交互后，很长一段时间内无数据交互时，客户端可能意外断开，这些 TCP 连接并未来得及正常释放，那么，连接的另一方并不知道对端的情况，它会一直维护这个连接，长时间的积累会导致非常多的半打开连接，造成端系统资源的消耗和浪费，且有可能导致在一个无效的数据链路层面发送业务数据，结果就是发送失败。所以服务器端要做到快速感知失败，减少无效链接操作，这就有了 TCP 的 Keepalive(保活探测)机制。


# 五、#LIMITS限制#

## 1.maxclients

设置 redis 同时可以与多少个客户端进行连接

默认：`maxclients 10000`

## 2.maxmemory

默认：`# maxmemory <bytes>`，在默认情况下, 对于 64 位实例没有限制，对 32 位 实例会限制在 3 GB, 因为 32 位的机器最大只支持 4GB 的内存，可以避免因为内存不足而导致 Redis 实例崩溃

当用户开启了 redis.conf 配置文件的 maxmemory 选项，那么 Redis 将限制选项的值不能小于 1 MB

**建议**：

- 设置取决于使用情况, 有些网站只需要 32MB，有些可能需要 12GB。只能根据具体的生产环境来调试，不要预设一个定值，从小到大测试，基本标准是不干扰正常程序的运行
- 最大使用内存跟搭配方式有关，如果只是用 Redis 做纯缓存, 64-128M 对一般小型网站就足够了
- 如果使用 Redis 做数据库的话，设置到物理内存的 1/2 到 3/4 左右都可以
- 如果使用了快照功能的话，最好用到 50%以下，因为快照复制更新需要双倍内存空间，如果没有使用快照而设置 redis 缓存数据库，可以用到内存的 80%左右，只要能保证 Java、NGINX 等其它程序可以正常运行就行了

## 3.maxmemory-policy

默认：`# maxmemory-policy noeviction`

**policy一览**

1) volatile-lru：使用 LRU 算法移除 key，只对设置了过期时间的键；(最近最少使用)
2) allkeys-lru：在所有集合 key 中，使用 LRU 算法移除 key
3) volatile-random：在过期集合中移除随机的 key，只对设置了过期时间的键
4) allkeys-random：在所有集合 key 中，移除随机的 key
5) volatile-ttl：移除那些 TTL 值最小的 key，即那些最近要过期的 key
6) noeviction：不进行移除。针对写操作，只是返回错误信息

## 4.maxmemory-samples

默认：`# maxmemory-samples 5`

- 设置样本数量，LRU 算法和最小 TTL 算法都并非是精确的算法，而是估算值，所以可以设置样本的大小，redis 默认会检查这么多个 key 并选择其中 LRU 的那个
- 一般设置 3 到 7 的数字，数值越小样本越不准确，但性能消耗越小

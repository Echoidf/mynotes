---
title: MySQL自增ID跳跃问题
icon: storage
# 分类
category:
  - MySQL
# 标签
tag:
  - MySQL
sticky: false
# 是否收藏在博客主题的文章列表中，当填入数字时，数字越大，排名越靠前。
star: 26
# 是否将该文章添加至文章列表中
article: true
# 是否将该文章添加至时间线中
timeline: true
---

## 记一次MySQL自增ID发生跳跃的问题

在对大规模数据进行分页查询测试性能时，我使用了MySQL的蠕虫复制快速生成了百万级别的数据，但是发现了一个很奇怪的问题，先回顾一下我的操作：

```sql
CREATE TABLE `emp` (
  `empno` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `ename` varchar(32) NOT NULL DEFAULT '',
  `job` varchar(32) NOT NULL DEFAULT '',
  `mgr` mediumint(8) unsigned DEFAULT NULL,
  `hiredate` date NOT NULL,
  `sal` double(6,0) NOT NULL,
  `comm` decimal(7,2) DEFAULT NULL,
  `deptno` int(11) unsigned NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
INSERT INTO `emp` VALUES (7369, 'SMITH', 'CLERK', 7902, '1990-12-17', 800, NULL, 20);
INSERT INTO `emp` VALUES (7499, 'ALLEN', 'SALESMAN', 7698, '1991-02-20', 1600, 300.00, 30);
INSERT INTO `emp` VALUES (7521, 'WARD', 'SALESMAN', 7698, '1991-02-22', 1250, 500.00, 30);
INSERT INTO `emp` VALUES (7566, 'JONES', 'MANAGER', 7839, '1991-04-02', 2975, NULL, 20);
INSERT INTO `emp`VALUES (7654, 'MARTIN', 'SALESMAN', 7698, '1991-09-28', 1250, 1400.00, 30);
INSERT INTO `emp` VALUES (7698, 'BLAKE', 'MANAGER', 7839, '1991-05-01', 2850, NULL, 30);
INSERT INTO `emp` VALUES (7782, 'CLARK', 'MANAGER', 7839, '1991-06-09', 2450, NULL, 10);
INSERT INTO `emp` VALUES (7788, 'SCOTT', 'ANALYST', 7566, '1997-04-19', 3000, NULL, 20);
INSERT INTO `emp` VALUES (7839, 'KING', 'PRESIDENT', NULL, '1991-11-17', 5000, NULL, 10);
INSERT INTO `emp` VALUES (7844, 'TURNER', 'SALESMAN', 7698, '1991-09-08', 1500, NULL, 30);
INSERT INTO `emp` VALUES (7900, 'JAMES', 'CLERK', 7698, '1991-12-03', 950, NULL, 30);
INSERT INTO `emp` VALUES (7902, 'FORD', 'ANALYST', 7566, '1991-12-03', 3000, NULL, 20);
INSERT INTO `emp` VALUES (7934, 'MILLER', 'CLERK', 7782, '1992-01-23', 1300, NULL, 10);
```

`emp`表中有13条记录，此时再创建一个新表`test`作为测试表，并从`emp`表中查询数据插入到测试表中：

```sql
CREATE TABLE test
( `id` BIGINT(64) PRIMARY KEY AUTO_INCREMENT,
 `name` VARCHAR(32), 
 sal DOUBLE, job VARCHAR(32),
 deptno INT(10))ENGINE=InnoDB DEFAULT CHARSET=utf8;

 INSERT INTO test
(`name`, sal, job,deptno)
SELECT ename, sal, job, deptno FROM emp;
```

此时测试表`test`中也有了13条记录

接下来进行蠕虫复制，反复执行如下sql，`test`表的数据行数就会以指数级成倍增加：

```sql
INSERT INTO test (`name`, sal, job,deptno) SELECT `name`, sal, job,deptno FROM test;
```

但是在测试时却发现以这种方式批量插入的数据发生了id跳跃，可以看到第二次插入数据时直接从16开始了：

![image.png](https://s2.loli.net/2023/03/13/xIwMnyAvN9fRku4.png)

我以`INSERT INTO ... SELECT ...`的方式插入数据时并没有指定插入id值，而是希望它以MySQL的自增ID方式自动生成

为什么会出现ID跳跃的情况呢？

首先要了解下MySQL是如何保证**自增主键的单调递增属性**的，这与<mark>MySQL的自增锁模式有关——`innodb_autoinc_lock_mode`</mark>

查看这个全局配置：

```sql
-- 查看自增锁模式配置
show variables like 'innodb_autoinc_lock_mode';
```

Mysql 8.0开始默认是 2，之前的版本默认是1

该配置有0/1/2三种可选值

参考文章：[深入剖析 MySQL 自增锁 - detectiveHLH - 博客园 (cnblogs.com)](https://www.cnblogs.com/detectiveHLH/p/14832940.html)

- **innodb_autoinc_lock_mode=0**

  **传统锁模式【traditional 】**

  > 当我们向包含了 `AUTO_INCREMENT` 列的表中插入数据时，都会持有这么一个特殊的表锁——自增锁（AUTO-INC），并且当语句执行完之后就会释放。这样一来可以保证单个语句内生成的自增值是连续的。
  >
  > 但是这样一来，传统模式的弊端就自然暴露出来了，如果有多个事务并发的执行 `INSERT` 操作，`AUTO-INC`的存在会使得 MySQL 的性能略有下降，因为同时只能执行一条 `INSERT` 语句。

- **innodb_autoinc_lock_mode=1**

  **连续模式【Consecutive】**

  > 在锁模式处于连续模式下时，如果 `INSERT` 语句能够提前确定插入的数据量，则可以不用获取自增锁，举个例子，像 `INSERT INTO` 这种简单的、能提前确认数量的新增语句，就不会使用自增锁，这个很好理解，在自增值上，我可以直接把这个 `INSERT` 语句所需要的空间流出来，就可以继续执行下一个语句了。通过持有所需要数量的自增值的互斥锁（轻量锁）来避免使用表锁，这个锁仅在分配过程中持有，不会持续到语句结束。
  >
  > 但是如果 `INSERT` 语句不能提前确认数据量，则还是会去获取自增锁。例如像 `INSERT INTO ... SELECT ...` 这种语句，`INSERT` 的值来源于另一个 `SELECT` 语句，会使用表锁直到语句结束，同时只有一个语句持有表锁。

- **innodb_autoinc_lock_mode=2**

  **交叉模式【Interleaved】**

  >交叉模式（Interleaved）下，所有的 `INSERT` 语句，包含 `INSERT` 和 `INSERT INTO ... SELECT` ，都不会使用 `AUTO-INC` 自增锁，而是使用较为轻量的 `mutex` 锁。这样一来，多条 `INSERT` 语句可以并发的执行，这也是三种锁模式中扩展性最好的一种。
  >
  >并发执行所带来的副作用就是单个 `INSERT` 的自增值并不连续，因为 `AUTO_INCREMENT` 的值分配会在多个 `INSERT` 语句中来回交叉的执行。
  >
  >优点很明确，缺点是在并发的情况下无法保证数据一致性，

关于MySQL的锁机制，可以看下这篇博客（引用）：[MySQL中的锁机制 - 周二鸭 - 博客园](https://www.cnblogs.com/jojop/p/13982679.html)

如何理解交叉模式的缺陷，先了解下MySQL的`binlog`机制，`Binlog`一般用于MySQL的数据复制/主从同步。

在 MySQL 中 Binlog 的格式有 3 种，分别是：

- **Statement** 基于语句，只记录对数据做了修改的SQL语句，能够有效的减少binlog的数据量，提高读取、基于binlog重放的性能
- **Row** 只记录被修改的行，所以Row记录的binlog日志量一般来说会比Statement格式要多。基于Row的binlog日志非常完整、清晰，记录了所有数据的变动，但是缺点是可能会非常多，例如一条`update`语句，有可能是所有的数据都有修改；再例如`alter table`之类的，修改了某个字段，同样的每条记录都有改动。
- **Mixed** Statement和Row的结合，例如像`alter table`之类的对表结构的修改，采用Statement格式。其余的对数据的修改例如`update`和`delete`采用Row格式进行记录。

如果 MySQL 采用的格式为 `Statement` ，那么 MySQL 的主从同步实际上同步的就是一条一条的 SQL 语句。如果此时我们采用了交叉模式，那么并发情况下 `INSERT` 语句的执行顺序就无法得到保障。

`INSERT` 同时交叉执行，并且 `AUTO_INCREMENT` 交叉分配将会直接导致主从之间同行的数据**主键 ID 不同**。而这对主从同步来说是灾难性的。

再回过头来看进行蠕虫复制的时候为什么会发生ID跳跃呢？

我的MySQL版本是5.7，默认是连续模式，每次会预申请多余的id，申请个数与当前的数据记录行数N有关，每次都会申请2N个id，当下一次insert时会把从多余的id中取最大值作为自增的起始点，我画了一个图来表示：

| 当前数据行数 | 申请id | 插入操作记录序列                                             |
| ------------ | ------ | ------------------------------------------------------------ |
| N=1          | 2      | <mark>1，2，</mark>3  （申请的id是2和3，3是多余的id）        |
| N=2          | 4      | <mark>3，4，</mark>5，6   （5，6是多余的id）                 |
| N=4          | 8      | <mark>6，7，8，9，</mark>10，11，12，13    （10-13是多余的id） |
| N=8          | 16     | <mark>13，14，... ，19，20，</mark>21，... ，27，28    （21-28是多余的id） |

这就能解释为什么蠕虫复制如果初始值为1的情况下，id的序列会是：【1，2，3，4，6，7，8，9，13，……】

**如何修改锁模式呢？**

在MySQL的配置文件（Windows是my.ini，Linux是my.cnf）中进行配置即可：`innodb_autoinc_lock_mode=1`，需要重启MySQL服务


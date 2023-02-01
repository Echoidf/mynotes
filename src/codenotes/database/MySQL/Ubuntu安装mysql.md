---
title: Ubuntu安装Mysql
icon: workingDirectory
# 分类
category:
  - Mysql
  - Linux
# 标签
tag:
  - Mysql
  - Linux
sticky: false
# 是否收藏在博客主题的文章列表中，当填入数字时，数字越大，排名越靠前。
star: 11
# 是否将该文章添加至文章列表中
article: true
# 是否将该文章添加至时间线中
timeline: true
---
## 一、卸载原有的Mysql环境

```shell
sudo apt-get remove mysql-server
sudo apt-get autoremove mysql-server
sudo apt-get remove mysql-common
```

清理残留数据

```shell
dpkg -l |grep ^rc|awk '{print $2}' |sudo xargs dpkg -P
```

## 二、安装Mysql

```shell
sudo aptitude search  mysql
sudo apt-get install mysql-server mysql-client
```

## 三、修改密码

```shell
sudo vim /etc/mysql/mysql.conf.d/mysqld.cnf
```

找到 [mysqld] ，然后在该行下面添加以下参数：`skip-grant-tables`，保存并退出

重启Mysql: `service mysql restart`

进入mysql后修改密码：

```sql
use mysql;
ALTER USER 'root'@'localhost' PASSWORD EXPIRE NEVER;  #设置密码永不过期
flush privileges; 
```
查询所有的管理员命令：`select user, host from user;`

## 四、Mysql相关命令

### （一） 启动方式

1、使用 service 启动：service mysql start

2、使用 mysqld 脚本启动：/etc/inint.d/mysql start

3、使用 safe_mysqld 启动：safe_mysql&

### （二）停止

1、使用 service 启动：service mysql stop

2、使用 mysqld 脚本启动：/etc/inint.d/mysql stop

3、mysqladmin shutdown

### （三）重启

1、使用 service 启动：service mysql restart

2、使用 mysqld 脚本启动：/etc/inint.d/mysql restart

## 五、设置远程连接

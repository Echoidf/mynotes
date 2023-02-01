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
sudo apt-get autoremove --purge mysql-server
sudo apt-get remove mysql-common
```

清理残留数据

```shell
dpkg -l |grep ^rc|awk '{print $2}' |sudo xargs dpkg -P
```

查看mysql依赖项，继续删除干净

```shell
dpkg --list|grep mysql
```

## 二、安装Mysql

```shell
sudo aptitude search  mysql
sudo apt-get install mysql-server mysql-client
```

[官网安装（推荐）](https://dev.mysql.com/downloads/repo/apt/)

```shell
sudo dpkg -i mysql-apt-config_0.8.10-1_all.deb
```

- 选mysql-8.0 并按enter键
- 再次方向键选择mysql-8.0 并按enter键
- 方向键选择ok 并按enter键
- 更新apt: 执行 sudo apt update
- 解决提示部分：sudo apt-get upgrade
- 正式安装MySQL18.04：sudo apt install mysql-server
- 上边安装完后，会让你设置root密码，输入后按enter键，并再次确认
- MySQL8.0采用了新的加密方式，与Ubuntu18.04有兼容问题；故选择下面的旧版本5.x的加密方式

## 三、Mysql相关命令

| 指令                 | 说明      |
| -------------------- | --------- |
| service mysqld start | 启动mysql |
| service mysqld stop  | 关闭mysql |

## 四、设置远程连接

1. 登进MySQL
   
2. 输入以下语句，进入mysql库：
```shell
use mysql
```
3. 更新域属性，'%'表示允许任意IP地址访问：
```shell
update user set host='%' where user ='root';
```
4. 执行以上语句之后再执行：
```shell
FLUSH PRIVILEGES;
```
5. 再执行授权语句：
```shell
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%'WITH GRANT OPTION;
```

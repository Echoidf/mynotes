---
title: Linux定时备份Mysql
icon: workingDirectory
# 分类
category:
  - Mysql
  - 数据库
# 标签
tag:
  - 定时备份
  - Linux
sticky: false
# 是否收藏在博客主题的文章列表中，当填入数字时，数字越大，排名越靠前。
star: 10
# 是否将该文章添加至文章列表中
article: true
# 是否将该文章添加至时间线中
timeline: true
---
## 一、案例需求

1) 每天凌晨 2:30 备份 数据库 test 到 /data/backup/db
2) 备份开始和备份结束能够给出相应的提示信息
3) 备份后的文件要求以备份时间为文件名，并打包成 .tar.gz 的形式，比如：2021-03-12_230201.tar.gz
4) 在备份的同时，检查是否有 10 天前备份的数据库文件，如果有就将其删除。

## 二、shell脚本

```shell
#!/bin/bash
#备份目录
BACKUP=/data/backup/db
#当前时间
DATETIME=$(date +%Y-%m-%d_%H%M%S)
echo $DATETIME

#数据库地址
HOST=localhost
DB_USER=root
BD_PWD="123456"
#备份的数据库
DATABASE=test

#创建备份目录
[ ! -d "${BACKUP}/${DATETIME}" ] && mkdir -p "${BACKUP}/${DATETIME}"

#备份数据库
mysqldump -u${DB_USER} -p${DB_PWD} --host=${HOST} -q -R --databases ${DATABASE} | gzip > ${BACKUP}/${DATETIME}/$DATETIME.sql.gz

#将文件处理成tar.gz
cd ${BACKUP}
tar -zcvf $DATETIME.tar.gz ${DATETIME}
#删除对应的备份目录
rm -rf ${BACKUP}/${DATETIME}

#删除10天前的备份文件
find ${BACKUP} -atime +10 -name "*.tar.gz" -exec rm -rf {} \;
echo "备份数据库${DATABASE} 成功"
```

## 三、定时调用
`使用crond定时调用`

[crontab命令](https://www.runoob.com/linux/linux-comm-crontab.html)

```shell
crontab -e #新建定时任务

#输入以下内容
30 2 * * * /usr/sbin/mysql_db_backup.sh
```
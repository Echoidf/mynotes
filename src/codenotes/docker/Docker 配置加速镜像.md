---
title: Docker配置加速镜像
icon: storage
# 分类
category:
  - Docker
# 标签
tag:
  - Docker
sticky: false
# 是否收藏在博客主题的文章列表中，当填入数字时，数字越大，排名越靠前。
star: 38
# 是否将该文章添加至文章列表中
article: true
timeline: true
---
## 一、手动安装 Docker

```shell
vim /etc/docker/daemon.json

## 输入以下内容
{
   "registry-mirrors": [
        "https://ung2thfc.mirror.aliyuncs.com",
        "https://registry.docker-cn.com",
        "http://hub-mirror.c.163.com",
        "https://docker.mirrors.ustc.edu.cn"
   ]
}

systemctl daemon-reload

systemctl restart docker
```


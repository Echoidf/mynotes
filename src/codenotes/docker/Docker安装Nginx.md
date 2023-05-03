---
title: Docker安装Nginx
icon: storage
# 分类
category:
  - Docker
# 标签
tag:
  - Docker
  - Nginx
sticky: false
# 是否收藏在博客主题的文章列表中，当填入数字时，数字越大，排名越靠前。
star: false
# 是否将该文章添加至文章列表中
article: true
timeline: true
---
### 1、docker安装Nginx命令

```shell
docker run  --restart always --name Nginx -d -p 80:80 nginx
```

### 2、Nginx容器目录映射到服务器/本地

```shell
docker container cp Nginx:/etc/nginx/nginx.conf  /data/nginx/conf

docker container cp Nginx:/etc/nginx/conf.d/default.conf  /data/nginx/conf/conf.d

docker container cp Nginx:/usr/share/nginx/html/index.html /data/nginx/html

docker run --name Nginx -p 80:80 \
	-v /data/nginx/logs:/var/log/nginx \
	-v /data/nginx/html:/usr/share/nginx/html \
	-v /data/nginx/conf/nginx.conf:/etc/nginx/nginx.conf \
	-v /data/nginx/conf/conf.d:/etc/nginx/conf.d \
	-v /data/nginx/ssl:/etc/nginx/ssl/ \
	--privileged=true -d --restart=always nginx

```

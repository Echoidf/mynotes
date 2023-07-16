---
title: 云服务器配置SSH远程访问
icon: workingDirectory
# 分类
category:
  - 服务器
# 标签
tag:
  - SSH
  - Linux
sticky: false
# 是否收藏在博客主题的文章列表中，当填入数字时，数字越大，排名越靠前。
star: 10
# 是否将该文章添加至文章列表中
article: true
# 是否将该文章添加至时间线中
timeline: true
---
## 一、SSH密钥登录

本机如没有密钥对，可以生成密钥：`ssh-keygen –t rsa –P`

id_rsa 和 id_rsa.pub 其中一个是私钥，一个是公钥

以腾讯云服务器为例，在~/.ssh目录下，有一个 authorized_keys 文件用来保存公钥，将自己本机的公钥 id_ras.pub文件内容复制进去，设置权限：

```shell
sudo chmod 600 authorized_keys
```








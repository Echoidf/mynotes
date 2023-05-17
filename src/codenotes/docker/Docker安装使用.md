---
title: Docker安装使用
icon: storage
# 分类
category:
  - Docker
# 标签
tag:
  - Docker
sticky: false
# 是否收藏在博客主题的文章列表中，当填入数字时，数字越大，排名越靠前。
star: 37
# 是否将该文章添加至文章列表中
article: true
timeline: true
---
## 一、手动安装 Docker

Docker 是一个开源的应用容器引擎，让开发者可以打包他们的应用以及依赖包到一个可移植的镜像中，然后发布到任何流行的 Linux或Windows操作系统的机器上，也可以实现虚拟化。容器是完全使用沙箱机制，相互之间不会有任何接口。

- 官网：[https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop)

containerd.io

> containerd 可用作 Linux 和 Windows 的守护程序。 它管理其主机系统的完整容器[生命周期]()，从图像传输和存储到容器执行和监督，再到低级存储到网络附件等等。

docker-ce-cli

> docker 引擎的命令行界面，社区版

docker-ce

> docker 引擎，社区版。 需要 docker-ce-cli

Portainer是Docker的图形化管理工具，提供状态显示面板、应用模板快速部署、容器镜像网络数据卷的基本操作（包括上传下载镜像，创建容器等操作）、事件日志显示、容器控制台操作、Swarm集群和服务等集中管理和操作、登录用户管理和控制等功能。

### 1. 查看系统的内核版本

```java
[root@CodeGuide ~]# uname -r
4.18.0-80.11.2.el8_0.x86_64
```

- `uname -r`
- x86 64位系统，如果是32位是不能安装 docker 的

### 2. yum 更新到最新版本

```java
[root@CodeGuide ~]# sudo yum update
Last metadata expiration check: 1:15:10 ago on Sat 27 Nov 2021 04:22:53 PM CST.
Dependencies resolved.
Nothing to do.
Complete!
```

- `sudo yum update`
- 看到显示 `Complete` 就代表完成了，整个过程需要 5-10 分钟左右

### 3. 安装Docker所需的依赖包

```java
[root@CodeGuide ~]# sudo yum install -y yum-utils device-mapper-persistent-data lvm2
Last metadata expiration check: 1:16:16 ago on Sat 27 Nov 2021 04:22:53 PM CST.
Package yum-utils-4.0.21-3.el8.noarch is already installed.
Package device-mapper-persistent-data-0.9.0-4.el8.x86_64 is already installed.
Package lvm2-8:2.03.12-10.el8.x86_64 is already installed.
Dependencies resolved.
Nothing to
```

- `sudo yum install -y yum-utils device-mapper-persistent-data lvm2`
- 看到显示 `Complete` 就代表完成了，整个过程需要 1-3 分钟左右

### 4. 设置Docker的yum的源

```java
[root@CodeGuide ~]# sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
Adding repo from: https://download.docker.com/linux/centos/docker-ce.repo
```

- sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
- 鉴于国内网络问题，强烈建议使用国内源。以下是阿里云的软件源。

```bash
sudo yum-config-manager \
    --add-repo \
    https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
sudo sed -i 's/download.docker.com/mirrors.aliyun.com\/docker-ce/g' /etc/yum.repos.d/docker-ce.repo
```

### 5. 查看仓库所有Docker版本

```java
[root@CodeGuide ~]# yum list docker-ce --showduplicates | sort -r
Installed Packages
docker-ce.x86_64               3:20.10.9-3.el8                 docker-ce-stable 
docker-ce.x86_64               3:20.10.8-3.el8                 docker-ce-stable 
docker-ce.x86_64               3:20.10.7-3.el8                 docker-ce-stable 
docker-ce.x86_64               3:20.10.6-3.el8                 docker-ce-stable 
docker-ce.x86_64               3:20.10.5-3.el8                 docker-ce-stable 
docker-ce.x86_64               3:20.10.4-3.el8                 docker-ce-stable 
docker-ce.x86_64               3:20.10.3-3.el8                 docker-ce-stable 
docker-ce.x86_64               3:20.10.2-3.el8                 docker-ce-stable 
docker-ce.x86_64               3:20.10.1-3.el8                 docker-ce-stable 
docker-ce.x86_64               3:20.10.11-3.el8                docker-ce-stable 
docker-ce.x86_64               3:20.10.11-3.el8                @docker-ce-stable
docker-ce.x86_64               3:20.10.10-3.el8                docker-ce-stable 
docker-ce.x86_64               3:20.10.0-3.el8                 docker-ce-stable 
docker-ce.x86_64               3:19.03.15-3.el8                docker-ce-stable 
docker-ce.x86_64               3:19.03.14-3.el8                docker-ce-stable 
docker-ce.x86_64               3:19.03.13-3.el8                docker-ce-stable 
Docker CE Stable - x86_64                       7.1 kB/s | 3.5 kB     00:00  
Available Packages
```

- yum list docker-ce --showduplicates | sort -r
- 这里可以看到你能安装的最新版本

### 6. 安装Docker

```java
[root@CodeGuide ~]# sudo yum install docker-ce
```

- 安装默认最新版本的 Docker

```java
[root@CodeGuide ~]# sudo yum install <FQPN>
```

- 安装指定版本，例如：sudo yum install docker-ce-20.10.11.ce

### 7. 启动Docker并添加开机自启动

```java
[root@CodeGuide ~]# sudo systemctl start docker
```

- 启动 Docker

```java
[root@CodeGuide ~]# systemctl enable docker
```

- 设置开机启动 Docker

### 8. 查看 Docker 版本

```java
[root@CodeGuide ~]# docker --version
Docker version 20.10.11, build dea9396
```

### 9. 卸载 Docker

1. 查看当前docker状态

   `systemctl satus docker`如果是开启状态就先关闭：`systemctl stop docker`

2. 查看yum安装的docker文件

   ` yum list installed |grep docker`

   删除掉相关文件：`yum remove -y [filename]`

3. 删除docker镜像文件：`rm -rf /var/lib/docker`


### 10. Docker 常用命令

```java
[root@CodeGuide ~]# docker --help				#Docker帮助
[root@CodeGuide ~]# docker --version			#查看Docker版本
[root@CodeGuide ~]# docker search <image>		#搜索镜像文件，如：docker search mysql
[root@CodeGuide ~]# docker pull <image>		#拉取镜像文件， 如：docker pull mysql
[root@CodeGuide ~]# docker images				#查看已经拉取下来的所以镜像文件
[root@CodeGuide ~]# docker rmi <image>		#删除指定镜像文件
[root@CodeGuide ~]# docker run --name <name> -p 80:8080 -d <image>		#发布指定镜像文件
[root@CodeGuide ~]# docker ps					#查看正在运行的所有镜像
[root@CodeGuide ~]# docker ps -a				#查看所有发布的镜像
[root@CodeGuide ~]# docker rm <image>			#删除执行已发布的镜像
```

## 二、安装 Portainer

- 接下来的步骤会安装 Portainer 并进行汉化处理，如果你不需要汉化也可以忽略

### 1. 创建目录

```java
mkdir -p /data/portainer/data
```

### 2. 拉取最新的 Portainer

```java
docker pull portainer/portainer
Using default tag: latest
latest: Pulling from portainer/portainer
94cfa856b2b1: Pull complete 
49d59ee0881a: Pull complete 
a2300fd28637: Pull complete 
Digest: sha256:fb45b43738646048a0a0cc74fcee2865b69efde857e710126084ee5de9be0f3f
Status: Downloaded newer image for portainer/portainer:latest
docker.io/portainer/portainer:latest
```

- docker pull portainer/portainer
- 拉取 portainer

### 3. 安装和启动

-d后台运行  --name 命名 -p 端口映射(需要确认端口号是开放的)   -v挂载

```java
docker run -d -p 9000:9000 \
    --restart=always \
    -v /var/run/docker.sock:/var/run/docker.sock \
   -v /data/portainer/data:/data \
    --privileged=true \
    --name portainer \
    portainer/portainer
```

### 5. 访问 Portainer

- 地址：http://ip:9000/
- 操作：登录后设置你的用户名和密码，并设置本地Docker即可，设置完成后，如下

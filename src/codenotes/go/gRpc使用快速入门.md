---
title: gRpc使用快速入门  
icon: edit
# 分类  
category:
- Golang
# 标签
tag:
- gRpc
sticky: false
# 排序越大越靠前
star: 37  
# 添加到文章列表
article: true
# 添加到时间线 
timeline: true
---

>gRPC is a modern open source high performance Remote Procedure Call (RPC) framework that can run in any environment. It can efficiently connect services in and across data centers with pluggable support for load balancing, tracing, health checking and authentication. It is also applicable in last mile of distributed computing to connect devices, mobile applications and browsers to backend services.

`gRPC` 是一个高性能、开源和通用的 RPC 框架，支持多种编程语言。

## gRpc 有哪些特点

- 基于 HTTP/2 标准设计，带来诸如双向流、流控、头部压缩、单 TCP 连接上的多复用

- 高性能：gRPC使用**Protocol Buffers**作为序列化格式，比JSON和XML更快、更小、更简单，同时使用**HTTP/2**作为传输协议，支持多路复用、流控、头部压缩等特性，可以提高网络传输效率

- 跨语言：gRPC支持多种编程语言，可以方便地实现跨语言通信。

- 自动生成代码：gRPC使用Protocol Buffers定义接口，可以自动生成客户端和服务器端的代码，省去了手写代码的繁琐过程。

- 安全性：gRPC支持**SSL/TLS**加密，可以保证通信数据的安全性。

- 可扩展性：gRPC支持**服务端流、客户端流和双向流**，可以满足不同的通信需求。

grpc 的普及程度远远不及 Restfull，这与它使用的复杂性和维护成本有一定的关系，现在大部分的项目也基本上都是使用Restfull api，因为可能根本就没有对性能急迫的需求，HTTP1.1就可以满足大部分项目的需求了。但是作为gopher，还是不得不了解一下grpc这个利器。

## gRpc为什么快

这与它的传输协议和网络协议分不开。

1. grpc使用protobuf 作为序列化格式

   Protocol Buffers（简称protobuf）是一种语言无关、平台无关、可扩展的序列化数据格式，由Google开发。它类似于XML和JSON等数据交换格式，但是更加轻量级、更快、更简单、更易于使用。Protocol Buffers主要特点包括：

   1. 高效：Protocol Buffers**使用二进制编码，比XML和JSON更小、更快、更节省带宽**。
   2. 可扩展：Protocol Buffers支持向后兼容性和向前兼容性，可以方便地扩展消息格式。
   3. 易用性：Protocol Buffers使用简单的IDL（接口定义语言）来定义数据格式，可以自动生成代码，省去了手写代码的繁琐过程。
   4. 跨语言：Protocol Buffers**支持多种编程语言**，可以方便地实现跨语言通信。
   5. 安全性：Protocol Buffers支持消息签名和加密，可以保证数据的安全性。

2. grpc是基于HTTP2协议的

   HTTP/2相比于HTTP/1.1，有以下改进和优化：

   1. **多路复用**：HTTP/2使用**二进制分帧机制**，允许客户端和服务器端同时发送多个请求和响应，避免了**HTTP/1.1的队头阻塞**问题，提高了网络传输效率。
   2. **头部压缩**：HTTP/2使用**HPACK**算法对HTTP头部进行压缩，减少了头部大小，节省了带宽和传输时间。
   3. **服务器推送**：HTTP/2允许服务器端在收到请求后主动推送相关资源给客户端，避免了客户端重复请求，提高了页面加载速度。
   4. **流量控制**：HTTP/2支持流量控制机制，可以避免服务器端过载或客户端缓存不足的问题。
   5. 优化了TLS：HTTP/2对TLS进行了优化，支持TLS1.2和TLS1.3，提高了安全性和性能。

   HTTP/2相比于HTTP/1.1，提高了网络传输效率、节省了带宽和传输时间、提高了页面加载速度、避免了服务器端过载和客户端缓存不足的问题，同时还提高了安全性和性能。

## proto格式

```protobuf
syntax = "proto3"; // 版本声明，使用Protocol Buffers v3版本

option go_package = "xx";  // 指定生成的Go代码在你项目中的导入路径

package pb; // 包名


// 定义服务
service Greeter {
    // SayHello 方法
    rpc SayHello (HelloRequest) returns (HelloResponse) {}
}

// 请求消息
message HelloRequest {
    string name = 1;
}

// 响应消息
message HelloResponse {
    string reply = 1;
}
```

踩坑记录：

`option go_package = "xx"; ` 在这个配置项后面必须要加`/`，否则会报错：

```text
The import path must contain at least one period ('.') or forward slash ('/') character.
```

## demo源码

https://github.com/Echoidf/grpc-demo



## 优质学习教程

官方学习文档：https://grpc.io/docs/languages/go/quickstart/

李文周的博客：https://www.liwenzhou.com/posts/Go/gRPC/
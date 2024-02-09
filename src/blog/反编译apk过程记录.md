---
title: 反编译apk过程记录  
icon: edit
# 分类  
category:
- xx
# 标签
tag:
- xx
sticky: false
# 排序越大越靠前
star: 32  
# 添加到文章列表
article: true
# 添加到时间线 
timeline: true
---

## 安装工反编译工具

```shell
brew install apktool
brew install smali
brew install dex2jar
brew install jadx
brew install --cask jd-gui
```

- apktool：资源文件获取，可以提取出图片文件和布局文件进行使用查看
  下载地址：https://ibotpeaches.github.io/Apktool/
  Mac下载地址：http://mac.softpedia.com/get/Developer-Tools/Apktool.shtml
- dex2jar：将apk反编译成java源码（classes.dex转化成jar文件）
  下载地址：https://github.com/pxb1988/dex2jar
  Mac下载地址：http://mac.softpedia.com/get/Developer-Tools/dex2jar.shtml
- jd-gui：查看APK中classes.dex转化成出的jar文件，即源码文件
  下载地址：https://code.google.com/archive/p/innlab/downloads
  Mac下载地址：http://mac.softpedia.com/get/Development/Java/JD-GUI.shtml

## apktool

将apk文件重命名为zip文件后可以直接对其进行解压缩，但是内部的xml文件是二进制的xml，我们无法直接阅读，需要借助apktool 进行资源的提取和转换，在我们修改文件资源后也可以使用apktool进行重新打包，使用方式如下：

```shell
// 提取资源
apktool decode test.apk

// 提取资源并指定输出目录
apktool d test.apk -o test

// 重新打包apk
apktool b test
```



## dex2jar

使用apktool提取apk资源后会得到一个同名的文件夹，内部有一个子文件夹smali，它对应着原始Android目录下的src目录，smali是Dalvik虚拟机指令语言。

```shell
cp test.apk test.zip
unzip test.zip # 会得到classes.dex
d2j-dex2jar classed.dex -o test.jar # 转换成jar包
```

## jd-gui

`jd-gui`是java的反编译器`Java Decompiler project`,把二进制的可执行文件翻译成代码。 `jd-gui`提供了一个图形化的界面可以查看jar包代码

Jar包可以直接使用jd-gui打开，但是打开后可能会报错：

```
No suitable Java version found on your system! This program requires Java 1.8+
```

解决办法：

```shell
vim /Applications/JD-GUI.app/Contents/MacOS/universalJavaApplicationStub.sh

# 查找并修改为以下内容[JAVACMD填写本机Java路径，版本不能超过Java10]
# first check system variable "$JAVA_HOME"
if [ -n "$JAVA_HOME" ] ; then
        JAVACMD="/Library/Java/JavaVirtualMachines/zulu-8.jdk/Contents/Home/bin/java"
```


---
title: Git使用技巧
icon: edit
# 分类
category:
  - Git
# 标签
tag:
  - Git
sticky: false
# 是否收藏在博客主题的文章列表中，当填入数字时，数字越大，排名越靠前。
star: 32
# 是否将该文章添加至文章列表中
article: true
# 是否将该文章添加至时间线中
timeline: true
---


## 使用shell脚本提交git修改

```shell
#!/bin/bash

# 检查参数个数
if [ $# -ne 1 ]; then
  echo "Usage: $0 <commit message>"
  exit 1
fi

# 获取提交信息
msg="$1"

# 添加变更文件
git add -u

# 提交变更
git commit -m "$msg" 

# 推送到远程仓库
git push origin main
```

使用方式：`sh deploy.sh "chore: update something"`

## 删除远程仓库不必要的文件

有时候如果向远程仓库提交了类似于`.idea`这样的文件，我们提交后想将远程的这个文件删除，可以使用以下命令：

```shell
git rm --cached [filename] //本地中该文件不会被删除
git rm -r  --cached  [dirName] //删除文件夹
git commit -m '删除某个文件'
git push 
```

这样再将我们不需要git追踪的文件加入`.gitignore`，在下次提交时就不会跟踪该文件

## 代码提交规范

在Git的Commit message中，通常以一些特定的前缀来说明这个Commit是做了何种修改。常见的前缀包括：

- feat: 表示新增了一个功能(feature)
- fix: 表示修复了一个问题(bug fix)
- docs : 表示修改了文档(documentation)
- style: 表示修改了代码风格，而不影响代码功能
- refactor: 表示进行了重构(refactor)操作，即修改了代码结构但不改变功能
- test: 表示新增或修改了测试代码(test)
- chore: 表示更新了一些杂项或零碎的任务(chore)

使用这些前缀可以帮助其他人更快地理解每个Commit的含义，从而更好地维护代码，同时也有利于代码审查和发布管理。


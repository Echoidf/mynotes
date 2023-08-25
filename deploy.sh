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

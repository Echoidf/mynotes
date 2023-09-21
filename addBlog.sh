#!/bin/bash

md_file=$1
folder=$2

# 默认blog目录
default_folder="blog" 

# 如果指定了子目录
if [ ! -z "$folder" ]; then
  default_folder="codenotes/$folder"
fi 

# 拼接最终路径  
dir="/Volumes/OS 1/mynotes/src/$default_folder"
md_path="$dir/${md_file}"

# 创建目录结构
mkdir -p $dir

rm -rf ./1

# 写入模板内容 
cat << EOF > $md_path
---
title: ${md_file%.*}  
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
EOF

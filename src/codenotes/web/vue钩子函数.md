---
title: VUE钩子函数和生命周期
icon: storage
# 分类
category:
  - 前端
# 标签
tag:
  - 钩子函数
  - Vue
sticky: false
# 是否收藏在博客主题的文章列表中，当填入数字时，数字越大，排名越靠前。
star: 4
# 是否将该文章添加至文章列表中
article: true
# 是否将该文章添加至时间线中
timeline: true
---
created：在创建vue对象时，当html渲染之前就触发；但是注意，只会触发一次

mounted：是挂载vue实例后的钩子函数，钩子在主页挂载时执行一次，如果没有缓存的话，再次回到主页时，此函数还会执行

activated：是组件被激活后的钩子函数，每次回到页面都会执行

执行顺序：created  =>  mounted =>activated

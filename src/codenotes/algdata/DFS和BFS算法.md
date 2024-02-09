---
title: DFS和BFS算法  
icon: edit
# 分类  
category:
- 算法
# 标签
tag:
- DFS BFS
sticky: false
# 排序越大越靠前
star: 37 
# 添加到文章列表
article: true
# 添加到时间线 
timeline: true
---

本篇记录一下Golang如何实现深度优先搜索【DFS】和广度优先搜索【BFS】两种算法。



## BFS

```go
package main

import "fmt"

type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

type Queue []*TreeNode

// 入队方法
func (q *Queue) Enqueue(n *TreeNode) {
	if n == nil {
		return
	}
	*q = append(*q, n)
}

// 出队方法
func (q *Queue) Dequeue() *TreeNode {
	n := (*q)[0]
	*q = (*q)[1:]
	return n
}

// 广度优先遍历 BFS
func BFS(root *TreeNode) {
	q := Queue{}
	q.Enqueue(root)

	for len(q) > 0 {
		n := q.Dequeue()
		fmt.Println(n.Val)
		q.Enqueue(n.Left)
		q.Enqueue(n.Right)
	}
}

func main() {
	root := TreeNode{
		Val:   1,
		Left:  &TreeNode{Val: 2, Right: &TreeNode{Val: 4}},
		Right: &TreeNode{Val: 3, Right: &TreeNode{Val: 5}},
	}
	BFS(&root)
}
```

广度优先遍历也叫层序遍历，需要借助一个队列来实现，在遇到岔路口时我们需要把所有的选择记录下来即入队操作



## DFS

深度优先遍历 DFS 包括三种算法：前序遍历，中序遍历和后序遍历

可以采用递归实现：

```go
// 深度优先遍历 DFS
func DFS(root *TreeNode) {
	if root == nil {
		return
	}

	fmt.Println(root.Val)

	// 左子树
	DFS(root.Left)
	// 右子树
	DFS(root.Right)
}
```


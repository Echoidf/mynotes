---
title: Java遍历集合时如何修改元素
icon: storage
# 分类
category:
  - 异常
  - 集合
# 标签
tag:
  - 面试题
  - java
sticky: false
# 是否收藏在博客主题的文章列表中，当填入数字时，数字越大，排名越靠前。
star: 26
# 是否将该文章添加至文章列表中
article: true
# 是否将该文章添加至时间线中
timeline: true
---

**记一次遍历Java集合时修改元素出现的异常ConcurrentModificationException**

---

### 报错经历

这是一道算法题，[称砝码 | 牛客网 (nowcoder.com)](https://www.nowcoder.com/practice/f9a4c19050fc477e9e27eb75f3bfd49c?tpId=37&tags=&title=&difficulty=3&judgeStatus=3&rp=1&sourceUrl=%2Fexam%2Foj%2Fta%3FtpId%3D37&gioEnter=menu)

**描述：**

现有n种砝码，重量互不相等，分别为 m1,m2,m3…mn ；
每种砝码对应的数量为 x1,x2,x3...xn 。现在要用这些砝码去称物体的重量(放在同一侧)，问能称出多少种不同的重量。

**注：**称重重量包括 0

**输入描述：**

对于每组测试数据：
第一行：n --- 砝码的种数(范围[1,10])
第二行：m1 m2 m3 ... mn --- 每种砝码的重量(范围[1,2000])
第三行：x1 x2 x3 .... xn --- 每种砝码对应的数量(范围[1,10])

**输出描述：**

利用给定的砝码可以称出的不同的重量数

参考了题解上一名同学的思路：

1. 首先根据输入顺序，将砝码用数字序列表示，例如2个1g和1个2g，就用 1 1 2的序列表示；
2. set序列用来表示**加入当前砝码之前能产生的重量种类**；
3. set初始化为{0}；当第一个1g砝码放入时，则set中需要插入原先set中的所有元素+1g后的结果；即{0, 0+1};
4. 当第二个1g加入时，则set会插入{0+1, 1+1},就变成了{0, 1, 2};
5. 重复上述步骤加入所有砝码；则**最后set的大小即为能产生的重量种类**。

这是我用Java写出的代码：

```java
public class Solution {
    public static void main(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        String value;
        while ((value = reader.readLine()) != null) {
            int n = Integer.parseInt(value);
            List<Integer> list = new ArrayList<>();
            String[] s1 = reader.readLine().split(" ");
            String[] s2 = reader.readLine().split(" ");
            for (int i = 0; i < n; i++) {
                for (int j = 0; j < Integer.parseInt(s2[i]); j++) {
                    list.add(Integer.parseInt(s1[i]));
                }
            }
            Set<Integer> set = new HashSet<>();
            ArrayList<Integer> list1 = new ArrayList<>();
            set.add(0); //0是一种
            for (int i = 0; i < list.size(); i++) {
                final int tmp = list.get(i);
                //这里我想往set中添加set中所有原有元素再加上tmp
                set.forEach(item -> {
                    set.add(item + tmp);
                });
            }
            System.out.println(set.size());
        }
    }
}
```

运行后21行出现了异常：ConcurrentModificationException

大致原因是这里我在遍历Set集合的时候向里面添加了元素

### Java遍历集合的方式及注意事项

- 普通for循环
- 增强for循环
- 迭代器遍历
- 使用forEach()方法



### Java的快速失败和安全失败

- 快速失败（fail—fast）

​		在用迭代器遍历一个集合对象时，如果遍历过程中对集合对象的内容进行了修改（增加、删除、修改），则会抛出Concurrent Modification Exception。

​		场景：java.util包下的集合类都是快速失败的，不能在多线程下发生并发修改或者迭代过程中被修改。

- 安全失败（fail—safe）

​		采用安全失败机制的集合容器，在遍历时不是直接在集合内容上访问的，而是先复制原有集合内容，在拷贝的集合上进行遍历。

​		场景：java.util.concurrent包下的容器都是安全失败，可以在多线程下并发使用，并发修改。

- 原理：

  迭代器在遍历时直接访问集合中的内容，并且在遍历过程中使用一个 modCount 变量。集合在被遍历期间如果内容发生变化，就会改变modCount的值。每当

  迭代器使用hashNext()/next()遍历下一个元素之前，都会检测modCount变量是否为expectedmodCount值，是的话就返回遍历；否则抛出异常，终止遍历。

### 解决方案

- 在使用iterator迭代的时候使用`synchronized`或者`Lock`进行同步；
- 使用并发容器`CopyOnWriteArrayList`代替`ArrayList`和`Vector`
- 使用并发容器`ConcurrentHashMap`代替`HashMap`
- 创建一个新的集合用来修改数据，最后再一次性对目标集合进行修改

### 对于删除操作

删除操作比较特殊，迭代器`Itr`类的内部也提供了`remove`方法，这个方法可以在删除的时候保证一致性【这种方法只适用于单线程环境下】

```java
public static void main(String[] args){
        ArrayList<Integer> arr = new ArrayList<Integer>();
        for(int i=0; i<10; i++){
            arr.add(i);
        }

        for(Iterator<Integer> it=arr.iterator(); it.hasNext();){
            Integer i = it.next();
            if(i == 5){
                it.remove();
            }
            else{
                System.out.println(i);
            }
        }
}
```

### List.listIterator()

这个方法也是返回一个迭代器，但它与`List.iterator()`方法有所不同：

- 使用范围不同，Iterator可以应用于所有的集合，Set、List和Map和这些集合的子类型。而ListIterator只能用于List及其子类型。

- ListIterator有add方法，可以向List中添加对象，而Iterator不能。

- ListIterator和Iterator都有hasNext()和next()方法，可以实现顺序向后遍历，但是ListIterator有hasPrevious()和previous()方法，可以实现逆向（顺序向前）遍历。Iterator不可以。

- ListIterator可以定位当前索引的位置，nextIndex()和previousIndex()可以实现。Iterator没有此功能。

- 都可实现删除操作，但是ListIterator可以实现对象的修改，set()方法可以实现。Iterator仅能遍历，不能修改。
  

### 解决Bug

回到我的题目，我现在使用的是Set集合【为了去重】，没有List集合那样提供listIterator方法，也不是删除操作，而是要在遍历时动态地增加元素，我的思路有两个：

- 创建一个List集合用来添加数据，最后调用`set.addAll()`方法

  ```java
  ArrayList<Integer> list1 = new ArrayList<>();
  set.add(0); //0是一种
  for (int i = 0; i < list.size(); i++) {
  	final int tmp = list.get(i);
  	list1.add(tmp);
       //这里我想往set中添加set中所有原有元素再加上tmp
       set.forEach(item -> {
           list1.add(item + tmp);
        });
       set.addAll(list1);
  }
  ```

  


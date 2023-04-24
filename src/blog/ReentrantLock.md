---
title: ReentrantLock 和 公平锁
icon: lock
# 分类
category:
  - 并发工具
# 标签
tag:
  - 锁
  - ReentrantLock
  - 公平锁
sticky: false
# 是否收藏在博客主题的文章列表中，当填入数字时，数字越大，排名越靠前。
star: 27
# 是否将该文章添加至文章列表中
article: true
# 是否将该文章添加至时间线中
timeline: true
---
### ReentrantLock 和 公平锁

ReentrantLock 是基于 Lock 实现的可重入锁，所有的 Lock 都是基于 AQS 实现的。

AQS是通过将每条请求共享资源的线程封装成一个节点来实现锁的分配。

它的可重入是因为实现了同步器 Sync，这个抽象类 Sync 继承了AQS，在 Sync 的两个实现类中，包括了公平锁和非公平锁。

![img.png](https://zql-oss1.oss-cn-nanjing.aliyuncs.com/notes/img1.png)

同步器 Sync 继承自 AbstractQueuedSynchronizer 抽象队列同步器

ReentrantLock默认是非公平锁，在构造函数中传入true 构建公平锁

```java
public ReentrantLock() {
        sync = new NonfairSync();
}
  
public ReentrantLock(boolean fair) {
     sync = fair ? new FairSync() : new NonfairSync();
}
```

一般情况下并不需要公平锁，除非你的场景中需要保证顺序性

### CLH 基于单向链表的公平锁

![CLH.png](https://zql-oss1.oss-cn-nanjing.aliyuncs.com/notes/clh.png)

```java
public class CLHLock implements Lock {

    private final ThreadLocal<CLHLock.Node> prev;
    private final ThreadLocal<CLHLock.Node> node;
    private final AtomicReference<CLHLock.Node> tail = new AtomicReference<>(new CLHLock.Node());

    public CLHLock() {
        this.prev = ThreadLocal.withInitial(() -> null);
        this.node = ThreadLocal.withInitial(CLHLock.Node::new);
    }


    private static class Node {
        private volatile boolean locked;
    }

    @Override
    public void lock() {
        final Node node = this.node.get();
        node.locked = true;
        //把新加入的结点设置成尾部结点
        //getAndSet  获取当前值并设置新值
        Node predNode = this.tail.getAndSet(node);
        this.prev.set(predNode);
        //自旋
        while (predNode.locked) ;
    }

    @Override
    public void unlock() {
        final Node node = this.node.get();
        node.locked = false;
        this.node.set(this.prev.get());
    }

   ...
}
```

### MCS

和CLH一样也是一种基于链表的可扩展、高性能、公平的自旋锁

不同点：它是真的有下一个节点 next，添加这个真实节点后，它就可以只在本地变量上自旋，而 CLH 是前驱节点的属性上自旋。

CLH 更需要线程数据在同一块内存上效果才更好-- SMP 架构

MCS 更适合 NUMA 非一致存储访问架构，无论数据是否分散在不同的CPU模块都没有影响

```java
public class MCSLock implements Lock {
    private AtomicReference<MCSLock.Node> tail = new AtomicReference<>(null);

    private ThreadLocal<MCSLock.Node> node;

    private static class Node {
        private volatile boolean locked = false;
        private volatile Node next = null;
    }

    public MCSLock() {
        this.node = ThreadLocal.withInitial(Node::new);
    }

    @Override
    public void lock() {
        Node node = this.node.get();
        Node preNode = tail.getAndSet(node);
        if (null == preNode) {
            node.locked = true;
            return;
        }
        node.locked = false;
        preNode.next = node;
        while (!node.locked) ;
    }

    @Override
    public void unlock() {
        Node node = this.node.get();
        if (null != node.next) {
            node.next.locked = true;
            node.next = null;
            return;
        }
        if (tail.compareAndSet(node, null)) {
            return;
        }
        while (node.next == null) ;
    }

   ...
}
```

### TicketLock

TicketLock 就像你去银行、呷哺给你的一个排号卡一样，叫到你号你才能进去。属于严格的公平性实现，但是多处理器系统上，每个进程/线程占用的处理器都在读写同一个变量，每次读写操作都需要进行多处理间的缓存同步，非常消耗系统性能。

代码实现上也比较简单，lock() 中设置拥有者的号牌，并进入自旋比对。unlock() 中使用 CAS 进行解锁操作，并处理移除。

```java
public class TicketLock implements Lock {

    private AtomicInteger serviceCount = new AtomicInteger(0);
    private AtomicInteger ticketCount = new AtomicInteger(0);
    private final ThreadLocal<Integer> owner = new ThreadLocal<>();

    @Override
    public void lock() {
        owner.set(ticketCount.getAndIncrement());
        while (serviceCount.get() != owner.get());
    }

    @Override
    public void unlock() {
        serviceCount.compareAndSet(owner.get(), owner.get() + 1);
        owner.remove();
    }

	...
}
```

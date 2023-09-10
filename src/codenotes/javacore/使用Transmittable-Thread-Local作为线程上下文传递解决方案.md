---
title: 使用Transmittable-Thread-Local作为线程上下文传递解决方案
icon: edit
# 分类  
category:
- Java
# 标签
tag:
- ThreadLocal
sticky: false
# 排序越大越靠前
star: 37  
# 添加到文章列表
article: true
# 添加到时间线 
timeline: true
---

使用Transmittable-Thread-Local作为线程上下文传递解决方案
--------  


TransmittableThreadLocal 是阿里开源的线程上下文传递解决方案，提供了一种增强的 InheritableThreadLocal，使得线程池等组件可以正确处理线程内数据，避免并发问题。

> TransmittableThreadLocal (TTL), the missing Java™ std lib(simple & 0-dependency) for framework/middleware, provide an enhanced InheritableThreadLocal that transmits values between threads even using thread pooling components.

## 前置知识

### ThreadLocal

ThreadLocal 是一个线程内部存储类，通过它可以在指定的线程中存储数据，对不同的线程的数据进行隔离，让每个线程可以访问自己内部的 ThreadLocal 存储的数据。

每个Thread对象拥有一个ThreadLocalMap对象，这个ThreadLocalMap对象是ThreadLocal的内部类，它实现了Map接口，主要作用是存储K-V键值对，key就是ThreadLocal对象，value就是我们通过set方法存储的对象。

在线程中如果我们尝试获取其他线程的ThreadLocal对象，这个get方法会根据Thread.currentThread()获取当前线程，然后通过当前线程的ThreadLocalMap对象获取ThreadLocal对象，最后返回ThreadLocal对象对应的value。所以是无法获取其他线程的ThreadLocal对象的。



### InheritableThreadLocal

InheritableThreadLocal 继承 ThreadLocal，并重写了 set、get、initialValue 方法。

```java
public class InheritableThreadLocal<T> extends ThreadLocal<T> {
  /**
  * 设置线程的ThreadLocalMap
  */
  protected void setThreadLocalMap(ThreadLocalMap map) {
    threadLocals = map;
  }

  /**
  * 获取线程的ThreadLocalMap
  */
  public T get() {
    Thread t = Thread.currentThread();
    ThreadLocalMap map = getMap(t);
    if (map != null) {
      ThreadLocalMap.Entry e = map.getEntry(this);
      if (e != null) {
        @SuppressWarnings("unchecked")
        T result = (T)e.value;
        return result;
      }
    }
    return setInitialValue();
  }

  /**
  * 设置初始值
  */
  private T setInitialValue() {
    T value = initialValue();
    Thread t = Thread.currentThread();
    ThreadLocalMap map = getMap(t);
    if (map != null)
      map.set(this, value);
    else
      createMap(t, value);
    return value;
  }

  /**
  * 创建ThreadLocalMap
  */
  void createMap(Thread t, T firstValue) {
    t.threadLocals = new ThreadLocalMap(this, firstValue);
  }

  /**
  * 获取线程的ThreadLocalMap
  */
  ThreadLocalMap getMap(Thread t) {
    return t.threadLocals;
  }
}

```

Thread类中有两个ThreadLocalMap类型的成员变量threadLocals和inheritableThreadLocals
```java
    /* ThreadLocal values pertaining to this thread. This map is maintained
     * by the ThreadLocal class. */
    ThreadLocal.ThreadLocalMap threadLocals = null;

    /*
     * InheritableThreadLocal values pertaining to this thread. This map is
     * maintained by the InheritableThreadLocal class.
     */
    ThreadLocal.ThreadLocalMap inheritableThreadLocals = null;
```

如果是在父线程中创建的子线程，那么子线程会继承父线程的inheritableThreadLocals，如果子线程中没有设置inheritableThreadLocals，那么子线程会继承父线程的threadLocals。

但是在实际应用场景中，我们基本上都是使用线程池，线程池使用线程复用的技术，而inheritableThreadLocals是在创建子线程的时候设置的，所以在这种场景下inheritableThreadLocals就失去了意义。


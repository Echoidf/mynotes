---
title: 借助Spring实现策略模式
icon: edit
# 分类
category:
  - Spring
# 标签
tag:
  - Spring
  - 策略模式
sticky: false
# 排序越大越靠前
star: 32
# 添加到文章列表
article: true
# 添加到时间线
timeline: true
---

借助 Spring 实现策略模式

---

策略模式：定义一系列的算法，把它们一个个封装起来，并且使它们可相互替换。

应用场景：

- 计算商品优惠的时候会有各种优惠券，满减券、奖金券、折扣券等
- 抽奖过程中会使用到多种不同的抽奖算法

合理地使用策略模式可以让代码更具有可维护性，替代了大量的 if-else 语句。

策略模式通常和模板模式结合在一起使用，模板模式用于定义算法骨架，而策略模式则用于定义算法中的可变部分。

策略模式总结起来有以下几个部分：

1. 抽象策略类（Strategy）：策略、算法家族的抽象，通常为接口，定义每个策略或算法必须具有的方法和属性。
2. 具体策略类（ConcreteStrategy）：实现抽象策略中的操作，含有具体的算法。
3. 环境类（Context）：持有一个策略类的引用，最终给客户端调用。

**如何借助 Spring 实现策略模式？**

1. 定义抽象策略类（Strategy）：

```java
public interface Strategy implements InitializingBean{
    /**
     * 策略方法
     */
    void doSomething();


    /**
     * 设置策略key
     */
    int getStrategyKey();

    @Override
    default void afterPropertiesSet() throws Exception {
      int key = getStrategyKey();
      Context.registerStrategy(key, this);
    }
}
```

2. 定义具体策略类（ConcreteStrategy）：

```java
public class ConcreteStrategyA implements Strategy {
    @Override
    public void doSomething() {
        System.out.println("具体策略A的实现");
    }

    @Override
    public int getStrategyKey() {
        return 1;
    }
}
```

```java
public class ConcreteStrategyB implements Strategy {
    @Override
    public void doSomething() {
        System.out.println("具体策略B的实现");
    }

    @Override
    public int getStrategyKey() {
        return 2;
    }
}
```

3. 定义环境类（Context）：

```java
public class Context {
    private Map<Integer, Strategy> strategyMap = new HashMap<>();

    public static registerStrategy(int key, Strategy strategy) {
        strategyMap.put(key, strategy);
    }

    public void doAnything(int key) {
        Strategy strategy = strategyMap.get(key);
        strategy.doSomething();
    }
}
```

4. 测试

```java
public class Test {
    public static void main(String[] args) {
        Context context = new Context();
        context.doAnything(1);

        context = new Context(new ConcreteStrategyB());
        context.doAnything(2);
    }
}
```

**InitializingBean**

InitializingBean的作用是Bean注入到Spring容器且初始化后，执行特定业务化的操作。

Spring允许容器中的Bean，在Bean初始化完成后或者Bean销毁前，执行特定业务化的操作，常用的实现方式有以下三种：

- 通过实现InitializingBean/DisposableBean接口来处理初始化后/销毁前的操作；
- 通过标签的init-method/destroy-method属性处理初始化后/销毁前的操作；
- 在指定方法上加上@PostConstruct或@PreDestroy注解来处理初始化后/销毁前的操作

如果采用实现InitializingBean接口的方式去执行特定业务化的操作，则需要重写afterPropertiesSet这个方法

**优化**

我们还可以基于注解的方式来标注具体的策略类，结合PostConstruct注解，我们可以将注解标注在具体的策略类上，这样我们就可以在初始化后执行特定业务化的操作。

```java
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
public @interface StrategyAnnoation {
    Constants.StrategyMode strategyMode();
}
```

```java
 public enum StrategyMode {

        SINGLE(1, "策略A"),

        ENTIRETY(2, "策略B");

        private Integer code;
        private String info;

        StrategyMode(Integer code, String info) {
            this.code = code;
            this.info = info;
        }

        ...getter/setter
    }
```

```java
public class Context {

    @Resource
    private List<Strategy> strategyList;

    /**
     * 抽奖策略组
     */
    protected static Map<Integer, Strategy> strategyGroup = new ConcurrentHashMap<>();

    @PostConstruct
    public void init() {
        strategyList.forEach(strategy -> {
            Strategy strategy = AnnotationUtils.findAnnotation(strategy.getClass(), StrategyAnnoation.class);
            if (null != strategy) {
                strategyGroup.put(strategy.strategyMode().getCode(), strategy);
            }
        });
    }

}
````
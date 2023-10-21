---
title: RabbitMQ安装入门
# 当前页面图标
icon: write
# 分类
category:
  - RabbitMQ
# 标签
tag:
  - RabbitMQ
sticky: false
# 是否收藏在博客主题的文章列表中，当填入数字时，数字越大，排名越靠前。
star: false
# 是否将该文章添加至文章列表中
article: true
timeline: true
---
## 一、安装

RabbitMQ 的架构模型可以分为客户端和服务端两部分，客户端包括生产者和消费者，服务端包括虚拟主机、交换器和队列。

整体的流程非常简单，生产者将消息发送到服务端，消费者从服务端获取对应的消息。

生产者在发送消息前需要先确认发送给哪个虚拟主机的哪个交换器，再由交换器通过路由键将消息转发给与之绑定的队列。

最后，消费者到指定的队列中获取自己的消息进行消费。

安装地址：[RabbitMQ官网下载地址](https://www.rabbitmq.com/download.html)

 RabbitMQ 依赖于 erlang（Erlang 是一种多用途编程语言，主要用于开发并发和分布式系统），需要先行下载erlang。

Erlang安装下载：[Erlang官网下载地址](https://www.erlang.org/patches/otp-23.3.4.17)

安装完成后，windows默认是在`C:\Program Files\RabbitMQ Server\rabbitmq_server-3.10.7\sbin`目录下启动

```shell
rabbitmgctl status //查看当前状态
rabbitmq-plugins enable rabbitmq_management  //开启Web插件
rabbitmg-server start  //启动服务
rabbitmq-server stop   //停止服务
rabbitmq-server restart//重启服务
```

在浏览器访问地址：localhost:15672即可访问，默认用户名和密码都是`guest`

## 二、基础概念

### 1、客户端

生产者和消费者都属于客户端。

- **生产者**：消息的发送方，将要发送的消息封装成一定的格式，发送给服务端。消息包括消息体和标签。
- **消费者**：消息的接收方，负责消费消息体。

### 2、服务端

虚拟主机、交换机、队列都属于服务端。

- **虚拟主机**：用来对交换器和队列进行逻辑隔离，在同一个虚拟主机下，交换器和队列的名称不能重复。有点类似 Java 中的包，同一个包下，不能有相同名称的类或者接口。
- **交换器**：负责接收生产者发来的消息，并根据规则分配给对应的队列，不生产消息，只是消息的搬运工。
- **队列**：负责存储消息，生产者发送的消息会放在这里，消费者从这里取。

### 3、连接和信道

连接和信道是两个不同的概念，连接的英文叫 connection，信道叫 channel。

![img](https://files.mdnice.com/user/3903/0eabe904-6176-450b-949f-0e196b8d162e.png)

连接里包含了多条信道，连接用的是 TCP 连接，因为 AMQP 就是用 TCP 实现的。

为什么不直接使用连接，而要在连接的基础上新建信道呢？

因为 TCP 连接是比较昂贵的，新建需要三次握手，销毁需要四次挥手，所以如果每个线程在想 RabbitMQ 服务端发送/接收消息的时候都新建一个 TCP 连接，就会非常的消耗资源，于是就有了信道。

**信道是线程私有的，连接是线程共享的。**

信道+连接的模式，既保证了线程之间的私密性，又减少了系统开销。

### 4、业务场景

消息队列的主要功能有三种：

- 异步处理：比如说在做电商业务的时候，提交订单的动作可能涉及到创建订单、扣除库存、增加用户积分、发送订单邮件等。它们并不是一个串行的操作，可以把发送订单邮件和增加用户积分交给消息队列去做。
- 系统解耦：消息队列可以作为不同系统之间的桥梁，且不受系统技术栈的约束。
- 缓冲削峰：消息队列可以将大量的请求放到队列中，然后再按照一定的顺序规则交给业务服务器处理。

###  5、工作模式

#### 1、头路由模式---headers

- headers 模式/headers 头路由模式使用比较少

- headers 交换机是一种比较复杂且少见的交换机，不同于 direct 和 topic，它不关心 路由 key 是否匹配，而只关心 header 中的 key-value 对是否匹配(这里的匹配为精确匹配， 包含键和值都必须匹配)， 有点类似于 http 中的请求头。 

- headers 头路由模型中，消息是根据 prop 即请求头中 key-value 来匹配的。 

- 绑定的队列(也可以理解成消费方) 指定的 headers 中必须包含一个"x-match"的键 

- 键"x-match"的值有 2 个：all 和 any。

   all：表示绑定的队列/消费方 指定的所有 key-value 都必须在消息 header 中出现并匹配

   any：表示绑定的队列/消费方 指定的 key-value 至少有一个在消息 header 中出现并匹配即可

配置队列和交换机：

```java
@Configuration
public class RabbitMQConfig {
    private static final String QUEUE01 = "queue_header01";
    private static final String QUEUE02 = "queue_header02";
    private static final String EXCHANGE = "headersExchange";

    @Bean
    public Queue queue_header01(){
        return new Queue(QUEUE01);
    }

    @Bean
    public Queue queue_header02(){
        return new Queue(QUEUE02);
    }

    //创建交换机--HeadersExchange
    @Bean
    public HeadersExchange headersExchange() {
        return new HeadersExchange(EXCHANGE);
    }

    //队列交换机绑定，声明要匹配的k-v，指定匹配方式：all/any
    @Bean
    public Binding binding_header01() {
        Map<String, Object> map = new HashMap<>();
        map.put("color", "red");
        map.put("speed", "slow");
        return BindingBuilder.bind(queue_header01()).to(headersExchange())
                .whereAny(map).match(); //以any方式匹配
    }

    @Bean
    public Binding binding_header02() {
        Map<String, Object> map = new HashMap<>();
        map.put("color", "red");
        map.put("speed", "fast");
        return BindingBuilder.bind(queue_header02()).to(headersExchange())
                .whereAll(map).match(); //以all方式匹配
    }
}
```

在消息生产者中编写方法：

```java
 //发送消息到headers交换机，同时指定k-v
    public void sendToHeader01(String msg) {
        log.info("发送消息==>{}",msg);
        //创建消息属性
        MessageProperties properties = new MessageProperties();
        properties.setHeader("color", "red");
        properties.setHeader("speed", "fast");
        //创建Message对象
        Message message = new Message(msg.getBytes(), properties);
        template.convertAndSend("headersExchange", "", message);
    }

    public void sendToHeader02(String msg) {
        log.info("发送消息==>{}",msg);
        //创建消息属性
        MessageProperties properties = new MessageProperties();
        properties.setHeader("color", "red");
        properties.setHeader("speed", "normal");
        //创建Message对象
        Message message = new Message(msg.getBytes(), properties);
        template.convertAndSend("headersExchange", "", message);
    }
```

配置消费者：

```java
 /* 接收消息 */
    @RabbitListener(queues = "queue_header01")
    public void receive01(Message message) {
        log.info("[CONSUMER] received from queue_header01 --> " + new String(message.getBody()));
    }

    /* 接收消息 */
    @RabbitListener(queues = "queue_header02")
    public void receive02(Message message) {
        log.info("[CONSUMER] received from queue_header02 --> " + new String(message.getBody()));
    }
```

控制层：

```java
    @RequestMapping("/header01")
    @ResponseBody
    public void header01() {
        //让两个队列都收到消息
        mqSender.sendToHeader01("hello queue1 queue2");
    }

    @RequestMapping("/header02")
    @ResponseBody
    public void header02() {
        //只让第一个队列收到消息
        mqSender.sendToHeader02("hello queue1");
    }
```



#### 2、广播模式---fanout

在广播模式下，即使生产者只生产了一条消息，它对应的所有消费者都能全部接收。就是把交换机里的消息发送给所有绑定了该交换机的队列，忽略`routingKey`（路由）。

![img](https://files.mdnice.com/user/3903/30202ffb-3fb6-4b61-89ed-1ee7818ab9c2.png)

#### 3、路由模式---Direct

路由模式是在使用交换机的同时，生产者指定路由发送数据， 消费者绑定路由接受数据。 

与广播模式不同的是，广播模式只要是绑定了交换机的队列都会收到生产者向交换机推送过来的数据。而路由模式下加了一个路由设置，生产者向交换机发送数据时，会声明发送给交换机下的哪个路由，并且只有当消费者的队列绑定了交换机并且声明了路由，才会收到数据。

#### 4、主题模式---Topic

direct 模式会造成路由 RoutingKey 太多, 而实际开发中往往是按照某个规则来进行路由匹配的, RabbitMQ 提供了 Topic 模式/主题模式来适应这种需求

Topic 模式是 direct 模式上的一种扩展/叠加, 扩展/叠加了模糊路由 RoutingKey 的模式, 可以理解为是模糊的路由匹配模式 

- '*'   ：只能匹配一个单词 
-  '#' ：可以匹配多个单词（或者零个）

```java
@Configuration
public class RabbitConfig {
    private static final String QUEUE01 = "queue_topic01";
    private static final String QUEUE02 = "queue_topic02";
    private static final String EXCHANGE = "topicExchange";
    
    private static final String ROUTING_KEY01 = "#.queue.#";
    private static final String ROUTING_KEY01 = "*.queue.#";
    
    @Bean
    public Queue queue_topic01() {
        return new Queue(QUEUE01);
    }
    
    @Bean
    public Queue queue_topic02() {
        return new Queue(QUEUE02);
    }
    
    @Bean
    public TopicExchange exchange() {
        return new TopicExchange(EXCHANGE);
    }
    
    //绑定交换机同时指定路由
    @Bean
    public Binding binding_topic01() {
       return BindingBuilder.bind(queue_topic01()).to(topicExchange()).with(ROUTINGKEY01);
    }
    
    @Bean
	public Binding binding_topic02() {
		return BindingBuilder.bind(queue_topic02()).to(topicExchange()).with(ROUTINGKEY02);
	}   
}
```



## 三、SpringBoot集成

添加maven依赖：

```xml
<dependency>
	<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-starter-amqp</artifactId>
</dependency>
```

`application.yml`配置

```yaml
rabbitmq:
    host: localhost
    port: 5672
    # 虚拟主机
    virtual-host: /
    password: guest
    username: guest
    listener:
      simple:
        # 消费者最小数量
        concurrency: 1
        # 消费者最大数量
        max-concurrency: 10
        # 限制消费者每次只能处理一条消息,处理完才能处理下一条消息
        prefetch: 1
        # 启动时是否默认启动容器
        auto-startup: true
        # 消息被拒绝后，重新进入消息队列
        default-requeue-rejected: true

    template:
      retry:
        # 启用重试机制，默认false
        enabled: true
        # 最大重试次数
        max-attempts: 3
        # 初始的重试时间间隔--第一次消息处理失败后重试时间间隔
        initial-interval: 1000ms
        # 最大时间间隔，默认10s
        max-interval: 10000ms
        # 重试时间间隔的乘数--上一次重试时间✖倍数
        multiplier: 1
```

配置类：

```java
import org.springframework.amqp.core.Queue;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * @author 左齐亮
 * @version 1.0
 */
@Configuration
public class RabbitMQConfig {
   /*定义队列名称*/
    private static final String QUEUE = "queue";

    /**
     * 配置队列
     * durable: true  表示队列是否持久化，默认 true
     * 默认情况下默认放到内存，重启mq后就丢失了
     * 持久化后保存到 Erlang 自带的 Mnesia 数据库中，当 rabbitmq 重启之后会读取该数据库
     */
    @Bean
    public Queue queue() {
        return new Queue(QUEUE, true);
    }


    // ---fanout---
    private static final String QUEUE1 = "queue_fanout01";
    private static final String QUEUE2 = "queue_fanout02";
    private static final String EXCHANGE = "fanoutExchange";

    //创建队列
    @Bean
    public Queue queue1() {
        return new Queue(QUEUE1, true);
    }

    //创建队列
    @Bean
    public Queue queue2() {
        return new Queue(QUEUE2, true);
    }

    //创建交换机--FanoutExchange
    @Bean
    public FanoutExchange exchange(){
        return new FanoutExchange(EXCHANGE);
    }

    //进行绑定--QUEUE1绑定到交换机
    @Bean
    public Binding binding01() {
        return BindingBuilder.bind(queue1()).to(exchange());
    }

    //进行绑定--QUEUE2绑定到交换机
    @Bean
    public Binding binding02() {
        return BindingBuilder.bind(queue2()).to(exchange());
    }
}
```

如果没有将队列和交换机绑定就是使用默认的交换机——`amqp.direct`【路由模式】

创建生产者：

```java
@Service
@Slf4j
public class MQSender {
    @Resource
    private RabbitTemplate template;

    /* 发送消息 */
    public void send(Object msg){
      log.info("[PRODUCER] start send message --> " + msg);
      template.convertAndSend("queue", msg);
    }

    //发送消息到指定交换机
    //注意由于是fanout模式，需要忽略路由，在convertAndSend时传入第二个是路由参数置空即可
    public void sendFanout(Object msg){
        log.info("发送消息==>{}",msg);
        template.convertAndSend("fanoutExchange", "", msg);
    }

}
```

创建消费者：

```java
@Service
@Slf4j
public class MQConsumer {

    /* 接收消息 */
    @RabbitListener(queues = "queue")
    public void consume(Object msg) {
        log.info("[CONSUMER] received from queue --> " + msg);
    }

    //监听队列QUEUE1---接收消息
    @RabbitListener(queues = "queue_fanout01")
    public void receive1(Object msg) {
        log.info("从队列QUEUE1接收消息==>{}", msg);
    }

    //监听队列QUEUE2---接收消息
    @RabbitListener(queues = "queue_fanout02")
    public void receive2(Object msg) {
        log.info("从队列QUEUE2接收消息==>{}", msg);
    }
}
```

创建Controller：

```java
@Controller
public class RabbitMQHandler {
    @Resource
    private MQSender mqSender;

    @RequestMapping("/mq")
    @ResponseBody
    public void mq(){
        String msg = "hello mq";
        mqSender.send(msg);
    }

    @RequestMapping("/mq/fanout")
    @ResponseBody
    public void fanout(){
        String msg = "hello fanout";
        mqSender.sendFanout(msg);
    }
}
```


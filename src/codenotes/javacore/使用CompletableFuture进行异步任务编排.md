---
title: 使用CompletableFuture进行异步任务编排 
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



# 使用CompletableFuture进行异步任务编排

Java8引入了一个新特性：CompletableFuture，让异步任务的编排变得更简单了。

`CompletableFuture`可以指定异步处理流程：

- `thenAccept()`处理正常结果；
- `exceptional()`处理异常结果；
- `thenApplyAsync()`用于串行化另一个`CompletableFuture`；
- `anyOf()`和`allOf()`用于并行化多个`CompletableFuture`。



场景：假设你正在开发一个天气应用，用户可以输入多个城市名，应用会同时向多个天气API发送请求，然后将结果合并并展示给用户。

使用CompletableFuture，你可以并行地发送这些请求并等待它们的完成，然后将结果进行合并。

```java
public static void main(String[] args) {
  List<String> cities = Arrays.asList("Beijing", "London", "NewYork");

  List<CompletableFuture<String>> futures = cities.stream()
    .map(city -> CompletableFuture.supplyAsync(() -> getWeather(city)))
    .collect(Collectors.toList());

  CompletableFuture<Void> allFutures = CompletableFuture.allOf(futures.toArray(new CompletableFuture[0]));

  CompletableFuture<List<String>> combinedFuture = allFutures.thenApplyAsync(v -> futures.stream()
                                                                             .map(CompletableFuture::join)
                                                                             .collect(Collectors.toList()));

  try {
    List<String> weatherList = combinedFuture.get();
    System.out.println(weatherList);
  } catch (InterruptedException | ExecutionException e) {
    throw new RuntimeException(e);
  }
}

private static String getWeather(String city) {
  return "weather in " + city;
}
```



CompletableFuture是一个Future的实现类，它允许你以函数式的方式处理异步操作的结果。

CompletableFuture的主要特点包括：

1. 异步执行：可以使用CompletableFuture来执行耗时的操作，而**不会阻塞主线程**。而**使用Future.get方法是会阻塞主线程的**

2. 链式操作：可以将多个CompletableFuture**链接在一起，形成一个操作流**，每个操作都可以依赖前一个操作的结果。

3. 异常处理：可以使用**exceptionally()方法来处理异常情况**，或者使用handle()方法来处理正常结果和异常情况。

4. 组合操作：可以使用**thenCompose()**方法将多个CompletableFuture组合成一个CompletableFuture，以便更灵活地处理结果。

5. 并行执行：可以使用**allOf()、anyOf()**等方法来并行执行多个CompletableFuture。

以下是一些CompletableFuture的常用方法：

1. supplyAsync()：以异步方式执行一个任务，并返回一个CompletableFuture。

2. thenApply()：对CompletableFuture的结果应用一个函数，返回一个新的CompletableFuture。

3. thenAccept()：对CompletableFuture的结果应用一个消费者函数，不返回结果。

4. thenRun()：在CompletableFuture完成后执行一个Runnable任务。

5. thenCompose()：将多个CompletableFuture组合成一个CompletableFuture。

6. exceptionally()：处理CompletableFuture的异常情况。

7. handle()：处理CompletableFuture的正常结果和异常情况。

8. allOf()：并行执行多个CompletableFuture，并在所有CompletableFuture完成后返回一个CompletableFuture。

9. anyOf()：并行执行多个CompletableFuture，并在任意一个CompletableFuture完成后返回一个CompletableFuture。

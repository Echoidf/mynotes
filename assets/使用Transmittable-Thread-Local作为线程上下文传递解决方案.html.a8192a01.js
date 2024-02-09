import{_ as n}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as a,c as s,b as e}from"./app.193c9a2b.js";const t={},p=e(`<h2 id="使用transmittable-thread-local作为线程上下文传递解决方案" tabindex="-1"><a class="header-anchor" href="#使用transmittable-thread-local作为线程上下文传递解决方案" aria-hidden="true">#</a> 使用Transmittable-Thread-Local作为线程上下文传递解决方案</h2><p>TransmittableThreadLocal 是阿里开源的线程上下文传递解决方案，提供了一种增强的 InheritableThreadLocal，使得线程池等组件可以正确处理线程内数据，避免并发问题。</p><blockquote><p>TransmittableThreadLocal (TTL), the missing Java™ std lib(simple &amp; 0-dependency) for framework/middleware, provide an enhanced InheritableThreadLocal that transmits values between threads even using thread pooling components.</p></blockquote><h2 id="前置知识" tabindex="-1"><a class="header-anchor" href="#前置知识" aria-hidden="true">#</a> 前置知识</h2><h3 id="threadlocal" tabindex="-1"><a class="header-anchor" href="#threadlocal" aria-hidden="true">#</a> ThreadLocal</h3><p>ThreadLocal 是一个线程内部存储类，通过它可以在指定的线程中存储数据，对不同的线程的数据进行隔离，让每个线程可以访问自己内部的 ThreadLocal 存储的数据。</p><p>每个Thread对象拥有一个ThreadLocalMap对象，这个ThreadLocalMap对象是ThreadLocal的内部类，它实现了Map接口，主要作用是存储K-V键值对，key就是ThreadLocal对象，value就是我们通过set方法存储的对象。</p><p>在线程中如果我们尝试获取其他线程的ThreadLocal对象，这个get方法会根据Thread.currentThread()获取当前线程，然后通过当前线程的ThreadLocalMap对象获取ThreadLocal对象，最后返回ThreadLocal对象对应的value。所以是无法获取其他线程的ThreadLocal对象的。</p><h3 id="inheritablethreadlocal" tabindex="-1"><a class="header-anchor" href="#inheritablethreadlocal" aria-hidden="true">#</a> InheritableThreadLocal</h3><p>InheritableThreadLocal 继承 ThreadLocal，并重写了 set、get、initialValue 方法。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">InheritableThreadLocal</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> <span class="token keyword">extends</span> <span class="token class-name">ThreadLocal</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> <span class="token punctuation">{</span>
  <span class="token doc-comment comment">/**
  * 设置线程的ThreadLocalMap
  */</span>
  <span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">setThreadLocalMap</span><span class="token punctuation">(</span><span class="token class-name">ThreadLocalMap</span> map<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    threadLocals <span class="token operator">=</span> map<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token doc-comment comment">/**
  * 获取线程的ThreadLocalMap
  */</span>
  <span class="token keyword">public</span> <span class="token class-name">T</span> <span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Thread</span> t <span class="token operator">=</span> <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">ThreadLocalMap</span> map <span class="token operator">=</span> <span class="token function">getMap</span><span class="token punctuation">(</span>t<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>map <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token class-name">ThreadLocalMap<span class="token punctuation">.</span>Entry</span> e <span class="token operator">=</span> map<span class="token punctuation">.</span><span class="token function">getEntry</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>e <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token annotation punctuation">@SuppressWarnings</span><span class="token punctuation">(</span><span class="token string">&quot;unchecked&quot;</span><span class="token punctuation">)</span>
        <span class="token class-name">T</span> result <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">T</span><span class="token punctuation">)</span>e<span class="token punctuation">.</span>value<span class="token punctuation">;</span>
        <span class="token keyword">return</span> result<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token function">setInitialValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token doc-comment comment">/**
  * 设置初始值
  */</span>
  <span class="token keyword">private</span> <span class="token class-name">T</span> <span class="token function">setInitialValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">T</span> value <span class="token operator">=</span> <span class="token function">initialValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Thread</span> t <span class="token operator">=</span> <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">ThreadLocalMap</span> map <span class="token operator">=</span> <span class="token function">getMap</span><span class="token punctuation">(</span>t<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>map <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
      map<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">else</span>
      <span class="token function">createMap</span><span class="token punctuation">(</span>t<span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> value<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token doc-comment comment">/**
  * 创建ThreadLocalMap
  */</span>
  <span class="token keyword">void</span> <span class="token function">createMap</span><span class="token punctuation">(</span><span class="token class-name">Thread</span> t<span class="token punctuation">,</span> <span class="token class-name">T</span> firstValue<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    t<span class="token punctuation">.</span>threadLocals <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ThreadLocalMap</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> firstValue<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token doc-comment comment">/**
  * 获取线程的ThreadLocalMap
  */</span>
  <span class="token class-name">ThreadLocalMap</span> <span class="token function">getMap</span><span class="token punctuation">(</span><span class="token class-name">Thread</span> t<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> t<span class="token punctuation">.</span>threadLocals<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Thread类中有两个ThreadLocalMap类型的成员变量threadLocals和inheritableThreadLocals</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>    <span class="token comment">/* ThreadLocal values pertaining to this thread. This map is maintained
     * by the ThreadLocal class. */</span>
    <span class="token class-name">ThreadLocal<span class="token punctuation">.</span>ThreadLocalMap</span> threadLocals <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

    <span class="token comment">/*
     * InheritableThreadLocal values pertaining to this thread. This map is
     * maintained by the InheritableThreadLocal class.
     */</span>
    <span class="token class-name">ThreadLocal<span class="token punctuation">.</span>ThreadLocalMap</span> inheritableThreadLocals <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果是在父线程中创建的子线程，那么子线程会继承父线程的inheritableThreadLocals，如果子线程中没有设置inheritableThreadLocals，那么子线程会继承父线程的threadLocals。</p><p>但是在实际应用场景中，我们基本上都是使用线程池，线程池使用线程复用的技术，而inheritableThreadLocals是在创建子线程的时候设置的，所以在这种场景下inheritableThreadLocals就失去了意义。</p>`,15),c=[p];function l(o,i){return a(),s("div",null,c)}const d=n(t,[["render",l],["__file","使用Transmittable-Thread-Local作为线程上下文传递解决方案.html.vue"]]);export{d as default};

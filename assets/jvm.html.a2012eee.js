import{_ as n}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as s,c as a,b as t}from"./app.193c9a2b.js";const p={},o=t(`<h2 id="一、面试常问题" tabindex="-1"><a class="header-anchor" href="#一、面试常问题" aria-hidden="true">#</a> 一、面试常问题</h2><ol><li>请你谈谈你对jvm的理解？</li><li>Java8虚拟机和之前的变化更新？</li><li>什么是OOM？什么是栈溢出StackOverFlowError？怎么分析？</li><li>jvm的常见调优参数有哪些？</li><li>内存快照如何抓取？怎么分析Dump文件？</li><li>谈谈jvm中，类加载器你的认识?</li></ol><h2 id="二、jvm" tabindex="-1"><a class="header-anchor" href="#二、jvm" aria-hidden="true">#</a> 二、JVM</h2><h3 id="_1-jvm体系结构图" tabindex="-1"><a class="header-anchor" href="#_1-jvm体系结构图" aria-hidden="true">#</a> 1.JVM体系结构图</h3><p><img src="https://s2.loli.net/2022/12/24/PeElBHSFYrOQJZt.jpg" alt="jvm体系结构图"></p><p><strong>栈</strong>是代码运行空间，栈区中存放的是引用地址，一般方法、变量名、类名都会存放在栈区</p><p>而<strong>堆区</strong>存放的是实例对象、数组等，和方法区同属于<strong>线程共享区域</strong>，也就是都是<strong>线程不安全</strong>的</p><p><strong>方法区</strong> 是用于存放类似于元数据信息方面的数据的，比如类信息，常量，静态变量，编译后代码···等，类加载器将 .class 文件搬过来就是先丢到这一块上</p><h3 id="_2-类加载器" tabindex="-1"><a class="header-anchor" href="#_2-类加载器" aria-hidden="true">#</a> 2.类加载器</h3><p><img src="https://s2.loli.net/2022/12/24/5GvXLhmJDu2bCcx.jpg" alt="类加载过程"></p><ul><li>引导类加载器（BootstrapClassloader）：用C++编写，是JVM自带的类加载器；负责加载Java的核心类库。（该加载器无法直接获取）</li><li>扩展类加载器（ExtClassloader）：负责加载/jre/lib/ext目录下的jar包。</li><li>应用程序类加载器（AppClassloader）：负责加载java -classpath或java.class.path所指的目录下的类与jar包。（最常用的加载器）</li></ul><h3 id="_3-双亲委派机制" tabindex="-1"><a class="header-anchor" href="#_3-双亲委派机制" aria-hidden="true">#</a> 3.双亲委派机制</h3><ul><li>首先判断被加载的类是否已经加载过，如果是则结束，否则会将加载任务委托给自己的父亲；</li><li>父类加载器在收到类加载的请求时，也会先判断被加载的类是否已经加载过，如果是则结束，否则同样将加载任务委托给自己的父亲</li><li>不断的循环进行步骤2，直到将加载任务委托给Bootstrap ClassLoader为止。此时，Bootstrap ClassLoader会先判断被加载的类是否已经加载过，如果是则结束；</li><li>Bootstrap ClassLoader会判断能否完成加载任务，如果能则直接加载，否则会将加载任务交给儿子类加载器；</li><li>儿子类加载器也会判断能否完成加载任务，如果能则直接加载，否则会再一次将加载任务交给儿子类加载器；</li><li>不断的循环进行步骤5，直到最后一个类加载器，如果这个类加载器仍然不能够加载这个类，就会抛出一个异常：ClassNotFoundException。</li></ul><p>好处：</p><ol><li>保证了java核心库的安全性</li><li>保证同一个类不会被加载多次</li></ol><h3 id="_4-沙箱安全机制" tabindex="-1"><a class="header-anchor" href="#_4-沙箱安全机制" aria-hidden="true">#</a> 4.沙箱安全机制</h3><p>沙箱是Java安全的核心，沙箱机制就是讲Java代码限定在虚拟机JVM特定的运行范围中，并且严格限制代码对本地资源的访问，通过这样的措施来保证对代码的有效隔离，防止对本地系统造成破坏。</p><p>沙箱主要限制系统资源访问，例如：CPU、内存、文件系统、网络。不同级别的沙箱对这些资源访问的限制也可以不一样</p><p>当前最新的安全机制实现，引入了域（Domain）的概念。虚拟机把所有代码加载到不同的系统域和应用域，系统域部分专门负责与关键资源进行交互。而各个域应用部分则通过系统域的部分代理来对各种需要的资源进行访问。虚拟机中不同的受保护域（Protected Domain），对应不一样的权限（Permission）。存在于不同域中的类文件就具有了当前域的全部权限，下图是最新安全模型 <img src="https://s2.loli.net/2022/12/24/EVKz17jlhLX8gm2.png" alt="沙箱安全机制"></p><p>组成沙箱的基本组件： 1.字节码校验器（bytecode verifier）：确保Java类文件遵循Java语言规范。可以帮助Java程序实现内存保护 。核心类不经过字节码校验 2.类装载器：其中类装载器在3个方面对Java沙箱起作用</p><ul><li>防止恶意代码干涉善意代码（双亲委派机制）</li><li>守护被信任的类库边界</li><li>它将代码归入保护域，确定了代码可以进行哪些操作</li></ul><p>类装载器采用的机制是双亲委派机制： 1.从最内层JVM自带的类加载器开始加载，外层恶意同名类得不到加载从而无法调用</p><p>2.由于严格通过包来区分了访问域，外层恶意的类通过内置代码也无法获得权限访问到内部类，破坏代码就自然无法生效</p><p>3.存取控制器（access controller）：存取控制器可以控制核心API对操作系统的存取权限，而这个控制的策略设定可以由用户指定。</p><p>4.安全管理器（security manager）：是核心API和操作系统之间的主要接口。实现权限控制，比存取控制器优先级高</p><p>5.安全软件包（security package）：java.security下的类和扩展包下的类，允许用户为自己的应用增加新的安全特性，包括：</p><ul><li>安全提供者</li><li>消息摘要</li><li>数字签名</li><li>加密</li><li>鉴别</li></ul><h2 id="三、native关键字及方法区" tabindex="-1"><a class="header-anchor" href="#三、native关键字及方法区" aria-hidden="true">#</a> 三、native关键字及方法区</h2><h3 id="_1-native关键字" tabindex="-1"><a class="header-anchor" href="#_1-native关键字" aria-hidden="true">#</a> 1.native关键字</h3><p>凡是使用了native关键字的，说明Java的作用范围已经达不到了，它会去调用底层的C语言的库。</p><ol><li>进入本地方法栈。</li><li>调用本地方法接口。</li></ol><p><strong>JNI</strong>的作用：扩展Java的使用，融合不同的语言为Java所用。（最初是为了融合C、C++语言）</p><p>因为Java诞生的时候，C和C++非常火，想要立足，就有必要调用C、C++的程序。</p><p>所以Java在JVM内存区域专门开辟了一块标记区域Native Method Area Stack，用来登记native方法。 在最终执行（执行引擎执行）的时候，通过<strong>JNI</strong>来加载本地方法库中的方法。</p><h3 id="_2-方法区" tabindex="-1"><a class="header-anchor" href="#_2-方法区" aria-hidden="true">#</a> 2.方法区</h3><p><strong>Method Area方法区</strong>（此区域属于<strong>共享区间</strong>，所有定义的方法的信息都保存在该区域） 方法区又称为<strong>静态区</strong>是被所有线程共享，所有字段、方法字节码、以及一些特殊方法（如构造函数，接口代码）也在此定义。</p><p><strong>静态变量static、常量final、类信息class（构造方法、接口定义）、运行时的常量池存在方法区中，但是实例变量存在堆内存中，和方法区无关。</strong></p><h2 id="四、栈" tabindex="-1"><a class="header-anchor" href="#四、栈" aria-hidden="true">#</a> 四、栈</h2><p><strong>栈区: 8大基本类型+对象引用+实例方法</strong></p><ul><li>每个线程都包含一个栈区，栈中只保存基本数据类型的值和对象以及基础数据的引用。</li><li>每个栈中的数据（基本数据类型和对象的引用）都是私有的，其它栈是无法进行访问的。</li><li>栈分为三个部分：基本类型变量区、执行环境上下文、操作指令区(存放操作指令)。</li></ul><p>对象加载过程：</p><p><img src="https://s2.loli.net/2022/12/24/T43py7Pa1DFiQrX.png" alt="对象加载过程"></p><p><img src="https://s2.loli.net/2022/12/24/Gc7rKJNVWTHneqf.png" alt="加载过程"></p><ul><li>加载：载入class对象，不一定是从class文件获取，可以是jar包，或者动态生成的class</li><li>验证：校验class字节流是否符合当前jvm规范</li><li>准备：为 <strong>类变量</strong> 分配内存并设置变量的初始值( <strong>默认值</strong> )。如果是final修饰的对象则是赋值声明值</li><li>解析：将常量池的符号引用替换为直接引用</li><li>初始化：执行类构造器( <strong>注意不是对象构造器</strong> )，为 <strong>类变量</strong> 赋值，执行静态代码块。jvm会保证子类的执行之前，父类的先执行完毕</li></ul><h2 id="五、堆" tabindex="-1"><a class="header-anchor" href="#五、堆" aria-hidden="true">#</a> 五、堆</h2><h3 id="_1-三种jvm" tabindex="-1"><a class="header-anchor" href="#_1-三种jvm" aria-hidden="true">#</a> 1.三种JVM</h3><ul><li>Sun公司的HotSpot。（java -version查看）</li><li>BEA的JRockit</li><li>IBM的J9VM</li></ul><h3 id="_2-堆" tabindex="-1"><a class="header-anchor" href="#_2-堆" aria-hidden="true">#</a> 2.堆</h3><p>Heap，一个JVM只有一个堆内存，堆内存的大小是可以调节的。</p><p><img src="https://s2.loli.net/2022/12/26/d8a6xDKJCftnFvs.png" alt="配置类信息"></p><p>类加载器读取了类文件后，一般会把什么东西放到堆中？ 类、方法、常量、变量、保存我们所有引用类型的真实对象。</p><p>堆内存中细分为三个区域：</p><ul><li><p>新生区（伊甸园区）Young/New</p><p>又叫做伊甸园区，包括：伊甸园区、幸存from区、幸存to区，默认比例是8：1：1</p></li><li><p>养老区 old</p></li><li><p>永久区 Perm</p><p>这个区域是<strong>常驻内存</strong>的。 用来存放JDK自身携带的Class对象、Interface元数据，存储的是Java运行时的一些环境或类信息 这个区域<strong>不存在垃圾回收</strong> 关闭JVM虚拟机就会释放这个区域的内存。</p><p>什么情况下，在永久区就崩了？</p><ul><li>一个启动类，加载了大量的第三方jar包。</li><li>Tomcat部署了太多的应用。</li><li>大量动态生成的反射类；不断的被加载，直到内存满，就会出现OOM</li></ul></li></ul><p><img src="https://s2.loli.net/2022/12/24/AmucOEyfCXzj4gi.png" alt="堆内存"></p><p>jdk1.8以后取消了永久区，而采用了元空间（Perm),使用本地内存,元空间逻辑上存在，物理上不存在</p><p><img src="https://s2.loli.net/2022/12/24/Ai2xIrm9GqQNMHz.png" alt="堆内存结构"></p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Test</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//Java虚拟机可用的最大内存（Byte)</span>
        <span class="token keyword">long</span> maxMemory <span class="token operator">=</span> <span class="token class-name">Runtime</span><span class="token punctuation">.</span><span class="token function">getRuntime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">maxMemory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//已占用的内存，初始堆大小</span>
        <span class="token keyword">long</span> totalMemory <span class="token operator">=</span> <span class="token class-name">Runtime</span><span class="token punctuation">.</span><span class="token function">getRuntime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">totalMemory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;maxMemory=&quot;</span> <span class="token operator">+</span> maxMemory <span class="token operator">+</span> <span class="token string">&quot;字节\\t&quot;</span> <span class="token operator">+</span> maxMemory<span class="token operator">/</span><span class="token punctuation">(</span><span class="token keyword">double</span><span class="token punctuation">)</span> <span class="token number">1024</span><span class="token operator">/</span><span class="token number">1024</span> <span class="token operator">+</span> <span class="token string">&quot;MB&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;totalMemory=&quot;</span> <span class="token operator">+</span> totalMemory <span class="token operator">+</span> <span class="token string">&quot;字节\\t&quot;</span> <span class="token operator">+</span> totalMemory<span class="token operator">/</span><span class="token punctuation">(</span><span class="token keyword">double</span><span class="token punctuation">)</span> <span class="token number">1024</span><span class="token operator">/</span><span class="token number">1024</span> <span class="token operator">+</span> <span class="token string">&quot;MB&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

output<span class="token operator">:</span>
maxMemory<span class="token operator">=</span><span class="token number">3749183488</span>字节	<span class="token number">3575.5</span><span class="token constant">MB</span>
totalMemory<span class="token operator">=</span><span class="token number">253231104</span>字节	<span class="token number">241.5</span><span class="token constant">MB</span>
<span class="token comment">//我的计算机内存为16G</span>
<span class="token comment">//默认情况下初始化内存为计算机内存的1/64</span>
<span class="token comment">//最大内存为计算机内存的1/4</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>分析OOM：</p><ol><li><p>尝试扩大堆内存，看结果</p></li><li><p>分析内存，看一下哪个地方出现了问题（专业工具）JProfiler</p><p>Add VM options: -Xms1024m -Xmx1024m -XX:+PrintGCDetails</p></li></ol><p><img src="https://s2.loli.net/2022/12/24/vODxY2F7r1BEpSn.png" alt="VmOptions"></p><p>OOM测试</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Demo</span> <span class="token punctuation">{</span>
    <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arr <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token number">1024</span><span class="token operator">*</span><span class="token number">1024</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Demo</span><span class="token punctuation">&gt;</span></span> list <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> count <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token keyword">while</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                list<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Demo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                count<span class="token operator">++</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;count=&quot;</span> <span class="token operator">+</span> count<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>-Xms10m -Xmx108m -XX:+HeapDumpOnOutOfMemoryError</p><p>-Xms 设置初始化内存大小</p><p>-Xmx 设置最大分配内存</p><p>-XX:+PrintGCDetails 打印GC垃圾回收信息</p><p>-XX:+HeapDumpOnOutOfMemoryError OOM dump</p><p><img src="https://s2.loli.net/2022/12/24/mor5WRd2gQjv7VM.png" alt="Jprofile1"></p><p><img src="https://s2.loli.net/2022/12/24/EZgY8zBaCObvfkn.png" alt="Jprofile2"></p><h3 id="_3-常量池" tabindex="-1"><a class="header-anchor" href="#_3-常量池" aria-hidden="true">#</a> 3.常量池</h3><ul><li>在jdk1.7之前，<strong>运行时常量池</strong>+<strong>字符串常量池</strong>是存放在方法区中，HotSpot VM对方法区的实现称为<strong>永久代</strong></li><li>在jdk1.7中，字符串常量池从方法区移到<strong>堆</strong>中，运行时常量池保留在<strong>方法区</strong>中</li><li>jdk1.8之后，HotSpot移除永久代，使用<strong>元空间</strong>代替；此时字符串常量池保留在堆中，运行时常量池保留在方法区中，只是实现不一样了，JVM内存变成了<strong>直接内存</strong>。</li></ul><h2 id="六、gc垃圾回收" tabindex="-1"><a class="header-anchor" href="#六、gc垃圾回收" aria-hidden="true">#</a> 六、GC垃圾回收</h2><p>JVM在进行GC时，并非对三个区域进行统一回收，大部分时候是在回收新生代</p><ul><li>新生代</li><li>幸存区（from, to)</li><li>老年区</li></ul><h3 id="_1-两种gc" tabindex="-1"><a class="header-anchor" href="#_1-两种gc" aria-hidden="true">#</a> 1.两种GC</h3><p>轻GC(Minor/Young GC ) 重GC(Major GC)</p><p>在GC开始的时候，对象只会存在于Eden区和名为From的Survivor区，Survivor区To是空的。紧接着进行GC，Eden区中所有存活的对象都会被复制到To，而在From区中，仍存活的对象会根据他们的年龄值来决定去向。年龄达到一定值(年龄阈值，可以通过-XX:MaxTenuringThreshold来设置)的对象会被移动到年老代中，没有达到阈值的对象会被复制到To区域。经过这次GC后，Eden区和From区已经被清空。</p><p>这个时候，From和To会交换他们的角色，就是新的To是上次GC前的From，新的From就是上次GC前的To。不管怎样，都会保证名为To的Survivor区域是空的。Minor GC会一直重复这样的过程，直到To区被填满，To区被填满之后，会将所有对象移动到年老代中。</p><ul><li><p>轻GC和重GC分别在什么时候发生？</p><p>如果新生的对象无法在 Eden 区创建（Eden 区无法容纳) 就会触发一次<strong>Young GC</strong> 此时会将 S0 区与Eden 区的对象一起进行<strong>可达性分析</strong>，找出活跃的对象，将它复制到 S1 区并且将S0区域和 Eden 区的对象给清空，这样那些不可达的对象进行清除，并且将<strong>from 区 和 to区交换</strong>(from&lt;--&gt;to)。</p><p><strong>Major GC</strong></p><ol><li>对于一个大对象，我们会首先在Eden 尝试创建，如果创建不了，就会触发Minor GC</li><li>随后继续尝试在Eden区存放，发现仍然放不下</li><li>尝试直接进入老年代，老年代也放不下</li><li><strong>触发 Major GC 清理老年代的空间</strong></li><li>放的下 成功</li><li>放不下 <strong>OOM</strong></li></ol></li><li><p>如何避免频繁的<strong>Full GC</strong></p><p>1.避免定义过大的对象/数组</p><p>2.避免将过大的对象定义为静态变量</p></li></ul><h3 id="_2-gc常用算法" tabindex="-1"><a class="header-anchor" href="#_2-gc常用算法" aria-hidden="true">#</a> 2.GC常用算法</h3><ol><li><p>引用计数法</p><blockquote><p>引用计数器：对于一个对象A，只要有任何一个s对象引用了A，则A的引用计数器就加1，当引用失效时，引用计数器就减1。只要对象A的引用计数器的值为0，则对象A就不可能再被使用。</p></blockquote></li><li><p>标记-清除</p><p>将垃圾回收分为两个阶段：标记阶段和清除阶段。一种可行的实现是:</p><blockquote><p>1、在标记阶段，首先通过根节点，标记所有<strong>从根节点开始的可达对象</strong>。因此，未被标记的对象就是未被引用的垃圾对象。</p><p>2、然后，在清除阶段，清除所有未被标记的对象。</p></blockquote></li><li><p>标记-压缩</p><p>标记-压缩算法适合用于存活对象较多的场合，如老年代。它在标记-清除算法的基础上做了一些优化。</p><blockquote><p>1、和标记-清除算法一样，标记-压缩算法也首先需要从根节点开始，对所有可达对象做一次标记。</p><p>2、之后，将所有的存活对象压缩到内存的一端。最后，清理边界外所有的空间。</p></blockquote></li><li><p>复制算法</p><ul><li>与标记-清除算法相比，复制算法是一种相对高效的回收方法</li><li>不适用于存活对象较多的场合，如老年代</li></ul><p>算法思想如下：</p><blockquote><p>将原有的内存空间分为两块，每次只使用其中一块，在垃圾回收时，将正在使用的内存中的存活对象复制到未使用的内存块中，之后，清除正在使用的内存块中的所有对象，交换两个内存的角色，完成垃圾回收。</p></blockquote></li><li><p>分代思想</p><ul><li>依据对象的存活周期进行分类，短命对象归为新生代，长命对象归为老年代。</li><li>根据不同代的特点，选取合适的收集算法 <ul><li>少量对象存活（新生代），适合复制算法</li><li>大量对象存活（老年代），适合标记清理或者标记压缩</li></ul></li></ul></li></ol>`,81),e=[o];function l(i,c){return s(),a("div",null,e)}const d=n(p,[["render",l],["__file","jvm.html.vue"]]);export{d as default};
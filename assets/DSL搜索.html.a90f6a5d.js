import{_ as n}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as s,c as a,b as t}from"./app.a0e4d3bb.js";const p={},e=t(`<h2 id="一、querystring" tabindex="-1"><a class="header-anchor" href="#一、querystring" aria-hidden="true">#</a> 一、QueryString</h2><p>请求参数的查询（QueryString）</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>GET     /shop/_doc/_search?q=desc:慕课网
GET     /shop/_doc/_search?q=nickname:慕&amp;q=age:25
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这种方式被称之为<code>&lt;mark&gt;</code>QuerySting<code>&lt;/mark&gt;</code>查询方式，参数都是放在url中作为请求参数的</p><h2 id="二、dsl基本语法" tabindex="-1"><a class="header-anchor" href="#二、dsl基本语法" aria-hidden="true">#</a> 二、DSL基本语法</h2><p>QueryString用的很少，一旦参数复杂就难以构建，所以大多查询都会使用 DSL 来进行查询更好。</p><ul><li>Domain Specific Language</li><li>特定领域语言</li><li>基于JSON格式的数据查询</li><li>查询更灵活，有利于复杂查询</li></ul><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code># 查询
POST     /<span class="token punctuation">{</span>index_name<span class="token punctuation">}</span>/_doc/_search
# match--进行分词/全文检索
# 这里只要文档中包含&#39;慕课&#39; &#39;网&#39;这样的分词就可以命中
<span class="token punctuation">{</span>
    <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;match&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;desc&quot;</span><span class="token operator">:</span> <span class="token string">&quot;慕课网&quot;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
# 操作符\`operator\`默认是or<span class="token punctuation">,</span>设置为and后要求文档必须包含query的所有分词，无顺序之分
# 也可以设置<span class="token property">&quot;minimum_should_match&quot;</span><span class="token operator">:</span><span class="token string">&quot;70%&quot;</span>（也可填数字）来要求最少要匹配多少关键词
<span class="token punctuation">{</span>
    <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;match&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;desc&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token string">&quot;学习慕课网&quot;</span>
                <span class="token property">&quot;operator&quot;</span><span class="token operator">:</span> <span class="token string">&quot;and&quot;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

# term--精确查询/关键字查询
<span class="token punctuation">{</span>
    <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;term&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;desc&quot;</span><span class="token operator">:</span> <span class="token string">&quot;慕课网&quot;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
# terms--多个关键字查询（只要一个关键词命中了就会返回）
<span class="token punctuation">{</span>
    <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;terms&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;desc&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;慕课网&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;学习&quot;</span><span class="token punctuation">]</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
#match_phrase--多关键词在一个字段中
#这里&#39;大学&#39;和&#39;研究生&#39;必须同时包含在\`desc\`属性中才会命中<span class="token punctuation">,</span>slop表示query关键词之间可以允许跳过的词数，如果没写slop表示&#39;大学&#39;后面必须紧跟&#39;研究生&#39;才会命中
<span class="token punctuation">{</span>
    <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;match_phrase&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;desc&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            	<span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token string">&quot;大学 研究生&quot;</span><span class="token punctuation">,</span>
                 <span class="token property">&quot;slop&quot;</span><span class="token operator">:</span> <span class="token number">3</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
# 判断某个字段是否存在
<span class="token punctuation">{</span>
    <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;exists&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
	        <span class="token property">&quot;field&quot;</span><span class="token operator">:</span> <span class="token string">&quot;desc&quot;</span>
	    <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
# 查询所有--分页
<span class="token punctuation">{</span>
	<span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
		<span class="token property">&quot;match_all&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">,</span>
	<span class="token property">&quot;from&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
	<span class="token property">&quot;size&quot;</span><span class="token operator">:</span> <span class="token number">10</span>
<span class="token punctuation">}</span>
# 查询某些字段
<span class="token punctuation">{</span>
	<span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
		<span class="token property">&quot;match_all&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
	<span class="token property">&quot;_source&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
		<span class="token string">&quot;id&quot;</span><span class="token punctuation">,</span>
		<span class="token string">&quot;nickname&quot;</span><span class="token punctuation">,</span>
		<span class="token string">&quot;age&quot;</span>
	<span class="token punctuation">]</span>
<span class="token punctuation">}</span>
# ids查询
<span class="token punctuation">{</span>
	<span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;ids&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;_doc&quot;</span><span class="token punctuation">,</span>
            <span class="token property">&quot;values&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;1001&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;1002&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;1003&quot;</span><span class="token punctuation">]</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
# multi_match--在多个属性上进行分词检索
# &#39;nickname^<span class="token number">10</span>&#39;表示以nickname属性为主加一个分数权重，提升<span class="token number">10</span>倍相关性
<span class="token punctuation">{</span>
    <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;multi_match&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
           <span class="token property">&quot;query&quot;</span><span class="token operator">:</span> <span class="token string">&quot;慕课网&quot;</span><span class="token punctuation">,</span>
           <span class="token property">&quot;fields&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;desc&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;nickname^10&quot;</span><span class="token punctuation">]</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>语法格式为一个JSON Object， 内容都是k-v键值对，json可以嵌套</p><p>key可以是一些ES的关键字，也可以是某个field字段</p><p>基于Head也可以做类似的可视化操作</p><p><strong>搜索不合法问题定位</strong></p><p>DSL查询的时候经常会出现一些<strong>错误查询</strong>，出现这样的问题大多都是<strong>json无法被ES解析</strong>，会像java那样报一个异常信息，根据<strong>异常信息</strong>去推断问题所在，比如json格式不对，关键词不存在未注册等等，甚至有时候不能定位问题直接复制错误信息到百度一搜就能定位问题了。</p>`,13),o=[e];function i(c,l){return s(),a("div",null,o)}const d=n(p,[["render",i],["__file","DSL搜索.html.vue"]]);export{d as default};

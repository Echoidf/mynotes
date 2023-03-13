import{_ as e}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as i,c as n,e as s}from"./app.b0b981a1.js";const d={},l=s(`<h2 id="一、querystring" tabindex="-1"><a class="header-anchor" href="#一、querystring" aria-hidden="true">#</a> 一、QueryString</h2><p>请求参数的查询（QueryString）</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>GET     /shop/_doc/_search?q=desc:慕课网
GET     /shop/_doc/_search?q=nickname:慕&amp;q=age:25
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这种方式被称之为<mark>QuerySting</mark>查询方式，参数都是放在url中作为请求参数的</p><h2 id="二、dsl基本语法" tabindex="-1"><a class="header-anchor" href="#二、dsl基本语法" aria-hidden="true">#</a> 二、DSL基本语法</h2><p>QueryString用的很少，一旦参数复杂就难以构建，所以大多查询都会使用 DSL 来进行查询更好。</p><ul><li>Domain Specific Language</li><li>特定领域语言</li><li>基于JSON格式的数据查询</li><li>查询更灵活，有利于复杂查询</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 查询
POST     /{index_name}/_doc/_search
{
    &quot;query&quot;: {
        &quot;match&quot;: {
            &quot;desc&quot;: &quot;慕课网&quot;
        }
    }
}
# 判断某个字段是否存在
{
    &quot;query&quot;: {
        &quot;exists&quot;: {
	        &quot;field&quot;: &quot;desc&quot;
	    }
    }
}
#查询所有--分页
{
	&quot;query&quot;: {
		&quot;match_all&quot;:{}
	},
	&quot;from&quot;: 0,
	&quot;size&quot;: 10
}
#查询某些字段
{
	&quot;query&quot;: {
		&quot;match_all&quot;:{}
	}
	&quot;_source&quot;: [
		&quot;id&quot;,
		&quot;nickname&quot;,
		&quot;age&quot;
	]
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>语法格式为一个JSON Object， 内容都是k-v键值对，json可以嵌套</p><p>key可以是一些ES的关键字，也可以是某个field字段</p><p><strong>搜索不合法问题定位</strong></p><p>DSL查询的时候经常会出现一些<strong>错误查询</strong>，出现这样的问题大多都是<strong>json无法被ES解析</strong>，会像java那样报一个异常信息，根据<strong>异常信息</strong>去推断问题所在，比如json格式不对，关键词不存在未注册等等，甚至有时候不能定位问题直接复制错误信息到百度一搜就能定位问题了。</p>`,12),t=[l];function a(u,r){return i(),n("div",null,t)}const o=e(d,[["render",a],["__file","DSL搜索.html.vue"]]);export{o as default};

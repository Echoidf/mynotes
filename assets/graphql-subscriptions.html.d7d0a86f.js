import{_ as s}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as r,c as t,a,b as n,d as p,e as o,r as i}from"./app.b2e6e428.js";const l={},c=a("p",null,"GraphQL 规范支持某些类似于 GraphQL 查询的订阅，但不是在一次读取中返回数据，而是获取服务器推送的数据。",-1),d=a("p",null,"这有助于你的应用程序从后端订阅“事件”或“即时结果”，同时允许你通过应用程序控制事件的“形状”。",-1),h=a("p",null,"GraphQL 订阅是轻松为你的应用程序添加实时或响应式功能的关键组件。 支持订阅的 GraphQL 客户端和服务器，让你可以无需处理 WebSocket 代码，即可提供出色的体验！",-1),u=a("h2",{id:"make-first-graphql-subscription",tabindex:"-1"},[a("a",{class:"header-anchor",href:"#make-first-graphql-subscription","aria-hidden":"true"},"#"),n(" 立即订阅 GraphQL")],-1),_=a("code",null,"Step 1:",-1),m={href:"https://hasura.io/learn/graphql/graphiql",target:"_blank",rel:"noopener noreferrer"},b=o(`<p><code>Step 2:</code>在文本区域编写该 GraphQL 查询：</p><div class="language-graphql line-numbers-mode" data-ext="graphql"><pre class="language-graphql"><code><span class="token keyword">subscription</span> <span class="token punctuation">{</span>
  <span class="token object">online_users</span> <span class="token punctuation">{</span>
    <span class="token property">id</span>
    <span class="token property">last_seen</span>
    <span class="token object">user</span> <span class="token punctuation">{</span>
      <span class="token property">name</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第 3 步： 单击播放按钮。</p><p>每次在线用户集发生更改时，你都会在右侧的相应窗口中看到最新的用户集。</p><h2 id="how-do-graphql-subscriptions-work" tabindex="-1"><a class="header-anchor" href="#how-do-graphql-subscriptions-work" aria-hidden="true">#</a> GraphQL 订阅如何运作？</h2><p>GraphQL 查询和变更是发送到 POST 端点的字符串。 什么是 GraphQL 订阅？ 该操作不能通过 POST 端点进行，因为简单的 HTTP 端点只会返回响应且连接会关闭。</p><p>GraphQL 订阅是发送到 WebSocket 端点的订阅查询字符串。 每当后端出现数据变化，新数据都会通过 WebSocket 从服务器向客户端推送。</p><h2 id="summary" tabindex="-1"><a class="header-anchor" href="#summary" aria-hidden="true">#</a> 总结</h2><ul><li>你知道如何订阅 GraphQL</li></ul><p>现在你已经熟悉使用 GraphQL 的基本知识，那我们来看一下服务器和客户端的结构。</p>`,10);function k(v,g){const e=i("ExternalLinkIcon");return r(),t("div",null,[c,d,h,u,a("p",null,[_,n("转到 "),a("a",m,[n("https://hasura.io/learn/graphql/graphiql"),p(e)])]),b])}const q=s(l,[["render",k],["__file","graphql-subscriptions.html.vue"]]);export{q as default};

import{_ as n}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as a,c as s,b as e}from"./app.e5b261e7.js";const p={},i=e(`<p>GraphQL 向来自 REST API 后端的人士介绍一组新概念。 这一部分将从客户端/前端的角度介绍 GraphQL 的核心概念。</p><h2 id="graphql-document" tabindex="-1"><a class="header-anchor" href="#graphql-document" aria-hidden="true">#</a> GraphQL 文档</h2><p>GraphQL 请求字符串的内容叫作 GraphQL 文档。 这是文档的一个示例：</p><div class="language-graphql line-numbers-mode" data-ext="graphql"><pre class="language-graphql"><code><span class="token punctuation">{</span>
  <span class="token object">author</span> <span class="token punctuation">{</span>
    <span class="token property">id</span>
    <span class="token property">name</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该字符串遵循 GraphQL 服务器或客户端可解析并验证的上述语法。 上述语法使用查询操作的简化符号。</p><h2 id="graphql-operation" tabindex="-1"><a class="header-anchor" href="#graphql-operation" aria-hidden="true">#</a> GraphQL 操作</h2><p>GraphQL 操作的类型包括</p><ul><li>查询（只读抓取）</li><li>变更（先写入后抓取）</li><li>订阅（响应源事件抓取数据的持久请求。）</li></ul><p>GraphQL 文档可包含一个或多个此类操作（如多个请求/变更/订阅）。</p><p>我们来看一个含有操作的 GraphQL 文档示例：</p><div class="language-graphql line-numbers-mode" data-ext="graphql"><pre class="language-graphql"><code><span class="token keyword">query</span> <span class="token punctuation">{</span>
  <span class="token object">author</span> <span class="token punctuation">{</span>
    <span class="token property">id</span>
    <span class="token property">name</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，文档包含一个查询操作。 GraphQL 操作选择它所需的信息集，其被称为选择集。 在上述示例中，查询操作选择关于<code>author</code>及其<code>id</code>和<code>name</code>的信息。</p><p>现在，我们将详细解析该文档。</p><h2 id="anatomy-of-graphql-document" tabindex="-1"><a class="header-anchor" href="#anatomy-of-graphql-document" aria-hidden="true">#</a> GraphQL 文档解析</h2><p>现在，我们来看下面的示例：</p><div class="language-graphql line-numbers-mode" data-ext="graphql"><pre class="language-graphql"><code><span class="token keyword">query</span> <span class="token punctuation">{</span>
  <span class="token property-query">author</span><span class="token punctuation">(</span><span class="token attr-name">limit</span><span class="token punctuation">:</span> <span class="token number">5</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token property">id</span>
    <span class="token property">name</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>你可能已经发现，这是另一个带有查询操作的 GraphQL 文档。</p><p>文档的其余部分由什么组成？ 我们来看一下。</p><h4 id="fields" tabindex="-1"><a class="header-anchor" href="#fields" aria-hidden="true">#</a> 字段</h4><p>一个 GraphQL 字段描述一条独立信息。 该信息可简单可复杂，含有数据之间的关系。</p><p>在上述文档中，操作中包含的全部内容都是字段。 （作者，id 和姓名）。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>author {
  id
  name
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可能存在含有如下关系的复杂信息：</p><div class="language-graphql line-numbers-mode" data-ext="graphql"><pre class="language-graphql"><code><span class="token keyword">query</span> <span class="token punctuation">{</span>
  <span class="token property-query">author</span><span class="token punctuation">(</span><span class="token attr-name">limit</span><span class="token punctuation">:</span> <span class="token number">5</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token property">id</span>
    <span class="token property">name</span>
    <span class="token object">articles</span> <span class="token punctuation">{</span>
      <span class="token property">id</span>
      <span class="token property">title</span>
      <span class="token property">content</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中除了作者字段，我们还提供文章字段，允许表示字段之间的关系。</p><h4 id="arguments" tabindex="-1"><a class="header-anchor" href="#arguments" aria-hidden="true">#</a> 参数</h4><p>将字段想象成可以返回值的函数。 现在，假设该函数也接受行为不同的参数。</p><p>在上述示例中，</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>author(limit: 5)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>作者字段接受一个参数<code>limit</code>，以限制返回的结果的数量。 这些参数是可选的或强制的，且可以出现在本文档中的任何字段。</p><h4 id="variables" tabindex="-1"><a class="header-anchor" href="#variables" aria-hidden="true">#</a> 变量</h4><p>GraphQL 查询可使用变量参数化，以便在客户端重用和轻松构建查询。</p><p>在上述示例中，假设该限制参数可通过用户浏览页面进行配置，那么将变量传递至字段参数就会更容易。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>query ($limit: Int) {
  author(limit: $limit) {
    id
    name
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该变量在操作的顶部定义，且该变量的值可由客户端以服务器理解的格式发送。 通常变量以 JSON 表示，如下所示：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
  limit: 5
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="operation-name" tabindex="-1"><a class="header-anchor" href="#operation-name" aria-hidden="true">#</a> 操作名称</h4><p>当文档中含有多个操作时，服务器必须了解执行哪些操作并以相同的顺序将结果映射回来。 例如：</p><div class="language-graphql line-numbers-mode" data-ext="graphql"><pre class="language-graphql"><code><span class="token keyword">query</span> <span class="token definition-query function">fetchAuthor</span> <span class="token punctuation">{</span>
  <span class="token property-query">author</span><span class="token punctuation">(</span><span class="token attr-name">id</span><span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token property">name</span>
    <span class="token property">profile_pic</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">query</span> <span class="token definition-query function">fetchAuthors</span> <span class="token punctuation">{</span>
  <span class="token property-query">author</span><span class="token punctuation">(</span><span class="token attr-name">limit</span><span class="token punctuation">:</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token attr-name">order_by</span><span class="token punctuation">:</span> <span class="token punctuation">{</span> <span class="token attr-name">name</span><span class="token punctuation">:</span> <span class="token property">asc</span> <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token property">id</span>
    <span class="token property">name</span>
    <span class="token property">profile_pic</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这包含两个操作 - 一个是抓取单个作者，一个是抓取多个作者。</p><p>这些是通常应用于简单 GraphQL 请求中的最常见操作。</p><p>以下是一些由较为复杂的应用程序使用的其他概念。</p><h4 id="aliases" tabindex="-1"><a class="header-anchor" href="#aliases" aria-hidden="true">#</a> 别名</h4><p>考虑以下示例：</p><div class="language-graphql line-numbers-mode" data-ext="graphql"><pre class="language-graphql"><code><span class="token keyword">query</span> <span class="token definition-query function">fetchAuthor</span> <span class="token punctuation">{</span>
  <span class="token property-query">author</span><span class="token punctuation">(</span><span class="token attr-name">id</span><span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token property">name</span>
    <span class="token attr-name">profile_pic_large</span><span class="token punctuation">:</span> <span class="token property-query">profile_pic</span><span class="token punctuation">(</span><span class="token attr-name">size</span><span class="token punctuation">:</span> <span class="token string">&quot;large&quot;</span><span class="token punctuation">)</span>
    <span class="token attr-name">profile_pic_small</span><span class="token punctuation">:</span> <span class="token property-query">profile_pic</span><span class="token punctuation">(</span><span class="token attr-name">size</span><span class="token punctuation">:</span> <span class="token string">&quot;small&quot;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在你抓取关于某个作者的信息时，比如说你有两张大小不同的图像，而且有一个带参数的字段来执行此操作。 在这种情况下，你不能在同一选择集下两次使用相同的字段，因此，<code>Alias</code>就有助于区别这两个字段。</p><h4 id="fragments" tabindex="-1"><a class="header-anchor" href="#fragments" aria-hidden="true">#</a> 片段</h4><p>片段可以提高 GraphQL 的重用性。 如果文档中的某些部分在给定的类型上重用相同的字段集，那么片段就大有帮助。</p><p>例如：</p><div class="language-graphql line-numbers-mode" data-ext="graphql"><pre class="language-graphql"><code><span class="token keyword">fragment</span> <span class="token fragment function">authorFields</span> <span class="token keyword">on</span> <span class="token object">author</span> <span class="token punctuation">{</span>
  <span class="token property">id</span>
  <span class="token property">name</span>
  <span class="token property">profile_pic</span>
  <span class="token property">created_at</span>
<span class="token punctuation">}</span>

<span class="token keyword">query</span> <span class="token definition-query function">fetchAuthor</span> <span class="token punctuation">{</span>
  <span class="token property-query">author</span><span class="token punctuation">(</span><span class="token attr-name">id</span><span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token operator">...</span><span class="token fragment function">authorFields</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">query</span> <span class="token definition-query function">fetchAuthors</span> <span class="token punctuation">{</span>
  <span class="token property-query">author</span><span class="token punctuation">(</span><span class="token attr-name">limit</span><span class="token punctuation">:</span> <span class="token number">5</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token operator">...</span><span class="token fragment function">authorFields</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>请注意此处对片段的使用 - <code>...authorFields</code>。这种用法叫作片段扩展。 还有内联片段，即没有分别明确声明片段却在查询中内联使用了它。</p><h4 id="directives" tabindex="-1"><a class="header-anchor" href="#directives" aria-hidden="true">#</a> 指示</h4><p>指示是在不影响响应值的情况下添加附加功能的标识符，但会影响返回到客户端的响应。</p><p>标识符<code>@</code>后可以跟一列已命名的参数。</p><p>GraphQL 规范支持的一些默认服务器指示包括：</p><ul><li>@deprecated(reason: String) - 将字段标为已弃用</li><li>@skip (if: Boolean) - 跳过该字段的 GraphQL 执行</li><li>@include (if: Boolean) - 如果为 true，则为带注解的字段调用解析器。</li></ul><p>例如：</p><div class="language-graphql line-numbers-mode" data-ext="graphql"><pre class="language-graphql"><code><span class="token keyword">query</span> <span class="token punctuation">(</span><span class="token variable">$showFullname</span><span class="token punctuation">:</span> <span class="token scalar">Boolean</span><span class="token operator">!</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token object">author</span> <span class="token punctuation">{</span>
    <span class="token property">id</span>
    <span class="token property">name</span>
    <span class="token property">fullname</span> <span class="token directive function">@include</span><span class="token punctuation">(</span><span class="token attr-name">if</span><span class="token punctuation">:</span> <span class="token variable">$showFullname</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上述查询中，我们仅在条件为 true 时（条件可有自己的逻辑，具体取决于应用程序）包含字段全名。</p><p>你也可以使用自定义指示来处理其他用例。</p><p>在你的 GraphQL 探险之旅中，你一定会遇到这些核心概念。 现在，你已准备好使用它们了！</p>`,61),t=[i];function l(c,o){return a(),s("div",null,t)}const u=n(p,[["render",l],["__file","core-concepts.html.vue"]]);export{u as default};

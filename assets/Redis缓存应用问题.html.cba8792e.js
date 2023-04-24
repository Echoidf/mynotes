const e=JSON.parse('{"key":"v-69221db2","path":"/codenotes/database/Redis/Redis%E7%BC%93%E5%AD%98%E5%BA%94%E7%94%A8%E9%97%AE%E9%A2%98.html","title":"Redis缓存应用问题","lang":"zh-CN","frontmatter":{"title":"Redis缓存应用问题","icon":"workingDirectory","category":["Redis","数据库"],"tag":["Redis","缓存"],"sticky":false,"star":18,"article":true,"timeline":true,"description":"一、缓存穿透 当用户访问的数据，既不在缓存中，也不在数据库中，导致请求在访问缓存时，发现缓存缺失，再去访问数据库时，发现数据库中也没有要访问的数据，没办法构建缓存数据，来服务后续的请求。那么当有大量这样的请求到来时，数据库的压力骤增，这就是缓存穿透的问题。若黑客利用此漏洞进行攻击可能压垮数据库。 解决方案： 对空值缓存; 如果一个查询返回的数据为空，我...","head":[["meta",{"property":"og:url","content":"http://www.codepit.tech/mynotes/mynotes/codenotes/database/Redis/Redis%E7%BC%93%E5%AD%98%E5%BA%94%E7%94%A8%E9%97%AE%E9%A2%98.html"}],["meta",{"property":"og:site_name","content":"Zuooの学习笔记"}],["meta",{"property":"og:title","content":"Redis缓存应用问题"}],["meta",{"property":"og:description","content":"一、缓存穿透 当用户访问的数据，既不在缓存中，也不在数据库中，导致请求在访问缓存时，发现缓存缺失，再去访问数据库时，发现数据库中也没有要访问的数据，没办法构建缓存数据，来服务后续的请求。那么当有大量这样的请求到来时，数据库的压力骤增，这就是缓存穿透的问题。若黑客利用此漏洞进行攻击可能压垮数据库。 解决方案： 对空值缓存; 如果一个查询返回的数据为空，我..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:updated_time","content":"2023-04-23T13:22:22.000Z"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:tag","content":"Redis"}],["meta",{"property":"article:tag","content":"缓存"}],["meta",{"property":"article:modified_time","content":"2023-04-23T13:22:22.000Z"}]]},"excerpt":"","headers":[{"level":2,"title":"一、缓存穿透","slug":"一、缓存穿透","link":"#一、缓存穿透","children":[]},{"level":2,"title":"二、缓存击穿","slug":"二、缓存击穿","link":"#二、缓存击穿","children":[]},{"level":2,"title":"三、缓存雪崩","slug":"三、缓存雪崩","link":"#三、缓存雪崩","children":[]}],"git":{"createdTime":1676447332000,"updatedTime":1682256142000,"contributors":[{"name":"zql","email":"1241236275@qq.com","commits":4}]},"readingTime":{"minutes":3.46,"words":1038},"filePathRelative":"codenotes/database/Redis/Redis缓存应用问题.md","localizedDate":"2023年2月15日"}');export{e as data};

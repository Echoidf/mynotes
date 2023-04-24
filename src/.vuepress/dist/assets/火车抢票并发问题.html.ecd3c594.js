const e=JSON.parse('{"key":"v-253fb928","path":"/codenotes/database/Redis/%E7%81%AB%E8%BD%A6%E6%8A%A2%E7%A5%A8%E5%B9%B6%E5%8F%91%E9%97%AE%E9%A2%98.html","title":"火车抢票并发问题","lang":"zh-CN","frontmatter":{"title":"火车抢票并发问题","icon":"workingDirectory","category":["Redis","数据库"],"tag":["抢票","Redis","高并发"],"sticky":false,"star":15,"article":true,"timeline":true,"description":"一、可能出现的逻辑问题 1、一个 user 只能购买一张票, 即不能复购 2、不能出现超购,也是就多卖了 3、不能出现火车票遗留问题/库存遗留, 即火车票不能留下 二、初始化业务代码 新建原生的web项目模拟火车票抢购的场景 index.jsp ```jsp redis抢票 北京-成都 火车票！秒杀！ $(function () { $(\\"#secki...","head":[["meta",{"property":"og:url","content":"http://www.codepit.tech/mynotes/mynotes/codenotes/database/Redis/%E7%81%AB%E8%BD%A6%E6%8A%A2%E7%A5%A8%E5%B9%B6%E5%8F%91%E9%97%AE%E9%A2%98.html"}],["meta",{"property":"og:site_name","content":"Zuooの学习笔记"}],["meta",{"property":"og:title","content":"火车抢票并发问题"}],["meta",{"property":"og:description","content":"一、可能出现的逻辑问题 1、一个 user 只能购买一张票, 即不能复购 2、不能出现超购,也是就多卖了 3、不能出现火车票遗留问题/库存遗留, 即火车票不能留下 二、初始化业务代码 新建原生的web项目模拟火车票抢购的场景 index.jsp ```jsp redis抢票 北京-成都 火车票！秒杀！ $(function () { $(\\"#secki..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:updated_time","content":"2023-02-14T02:50:12.000Z"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:tag","content":"抢票"}],["meta",{"property":"article:tag","content":"Redis"}],["meta",{"property":"article:tag","content":"高并发"}],["meta",{"property":"article:modified_time","content":"2023-02-14T02:50:12.000Z"}]]},"excerpt":"","headers":[{"level":2,"title":"一、可能出现的逻辑问题","slug":"一、可能出现的逻辑问题","link":"#一、可能出现的逻辑问题","children":[]},{"level":2,"title":"二、初始化业务代码","slug":"二、初始化业务代码","link":"#二、初始化业务代码","children":[]},{"level":2,"title":"三、连接池技术","slug":"三、连接池技术","link":"#三、连接池技术","children":[]},{"level":2,"title":"四、利用Redis事务机制解决超卖问题","slug":"四、利用redis事务机制解决超卖问题","link":"#四、利用redis事务机制解决超卖问题","children":[]},{"level":2,"title":"五、库存遗留问题","slug":"五、库存遗留问题","link":"#五、库存遗留问题","children":[{"level":3,"title":"LUA脚本解决问题","slug":"lua脚本解决问题","link":"#lua脚本解决问题","children":[]}]}],"git":{"createdTime":1676343012000,"updatedTime":1676343012000,"contributors":[{"name":"zql","email":"12412362785@qq.com","commits":1}]},"readingTime":{"minutes":8.18,"words":2453},"filePathRelative":"codenotes/database/Redis/火车抢票并发问题.md","localizedDate":"2023年2月14日"}');export{e as data};

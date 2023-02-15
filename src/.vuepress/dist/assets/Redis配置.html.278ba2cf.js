const e=JSON.parse('{"key":"v-4466a2e1","path":"/codenotes/database/Redis/Redis%E9%85%8D%E7%BD%AE.html","title":"Redis配置","lang":"zh-CN","frontmatter":{"title":"Redis配置","icon":"workingDirectory","category":["Redis","数据库"],"tag":["NoSql","非关系型数据库","高并发"],"sticky":false,"star":7,"article":true,"timeline":true,"description":"一、常规配置 1.设置密码 a.永久设置--通过配置文件 20230128113221 requirepass配置可以让用户使用AUTH命令来认证密码，才能使用其他命令。 使用requirepass的时候需要注意，因为redis太快了，每秒可以认证15w次密码，简单的密码很容易被攻破，所以最好使用一个更复杂的密码 b.命令行设置 ```shell 12...","head":[["meta",{"property":"og:url","content":"https://gitee.com/oucystong/mynotes/codenotes/database/Redis/Redis%E9%85%8D%E7%BD%AE.html"}],["meta",{"property":"og:site_name","content":"Zuooの学习笔记"}],["meta",{"property":"og:title","content":"Redis配置"}],["meta",{"property":"og:description","content":"一、常规配置 1.设置密码 a.永久设置--通过配置文件 20230128113221 requirepass配置可以让用户使用AUTH命令来认证密码，才能使用其他命令。 使用requirepass的时候需要注意，因为redis太快了，每秒可以认证15w次密码，简单的密码很容易被攻破，所以最好使用一个更复杂的密码 b.命令行设置 ```shell 12..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:updated_time","content":"2023-01-28T04:47:09.000Z"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:tag","content":"NoSql"}],["meta",{"property":"article:tag","content":"非关系型数据库"}],["meta",{"property":"article:tag","content":"高并发"}],["meta",{"property":"article:modified_time","content":"2023-01-28T04:47:09.000Z"}]]},"excerpt":"","headers":[{"level":2,"title":"一、常规配置","slug":"一、常规配置","link":"#一、常规配置","children":[{"level":3,"title":"1.设置密码","slug":"_1-设置密码","link":"#_1-设置密码","children":[]},{"level":3,"title":"2.daemonize","slug":"_2-daemonize","link":"#_2-daemonize","children":[]},{"level":3,"title":"3.loglevel","slug":"_3-loglevel","link":"#_3-loglevel","children":[]},{"level":3,"title":"4.logfile","slug":"_4-logfile","link":"#_4-logfile","children":[]},{"level":3,"title":"5.设定库的数量","slug":"_5-设定库的数量","link":"#_5-设定库的数量","children":[]}]},{"level":2,"title":"二、Units单位","slug":"二、units单位","link":"#二、units单位","children":[]},{"level":2,"title":"三、#INCLUDES#","slug":"三、-includes","link":"#三、-includes","children":[]},{"level":2,"title":"四、#NETWORK#","slug":"四、-network","link":"#四、-network","children":[{"level":3,"title":"1.bind","slug":"_1-bind","link":"#_1-bind","children":[]},{"level":3,"title":"2.protected-mode","slug":"_2-protected-mode","link":"#_2-protected-mode","children":[]},{"level":3,"title":"3.port","slug":"_3-port","link":"#_3-port","children":[]},{"level":3,"title":"4.timeout","slug":"_4-timeout","link":"#_4-timeout","children":[]},{"level":3,"title":"5.tcp-keepalive","slug":"_5-tcp-keepalive","link":"#_5-tcp-keepalive","children":[]},{"level":3,"title":"思考","slug":"思考","link":"#思考","children":[]}]},{"level":2,"title":"五、#LIMITS限制#","slug":"五、-limits限制","link":"#五、-limits限制","children":[{"level":3,"title":"1.maxclients","slug":"_1-maxclients","link":"#_1-maxclients","children":[]},{"level":3,"title":"2.maxmemory","slug":"_2-maxmemory","link":"#_2-maxmemory","children":[]},{"level":3,"title":"3.maxmemory-policy","slug":"_3-maxmemory-policy","link":"#_3-maxmemory-policy","children":[]},{"level":3,"title":"4.maxmemory-samples","slug":"_4-maxmemory-samples","link":"#_4-maxmemory-samples","children":[]}]}],"git":{"createdTime":1674880917000,"updatedTime":1674881229000,"contributors":[{"name":"zql","email":"12412362785@qq.com","commits":3}]},"readingTime":{"minutes":5.01,"words":1504},"filePathRelative":"codenotes/database/Redis/Redis配置.md","localizedDate":"2023年1月28日"}');export{e as data};

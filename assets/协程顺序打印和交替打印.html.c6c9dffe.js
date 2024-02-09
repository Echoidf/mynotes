const t=JSON.parse('{"key":"v-4a51422a","path":"/codenotes/go/%E5%8D%8F%E7%A8%8B%E9%A1%BA%E5%BA%8F%E6%89%93%E5%8D%B0%E5%92%8C%E4%BA%A4%E6%9B%BF%E6%89%93%E5%8D%B0.html","title":"协程顺序打印和交替打印","lang":"zh-CN","frontmatter":{"title":"协程顺序打印和交替打印","icon":"edit","category":["Golang"],"tag":["协程"],"sticky":false,"star":40,"article":true,"timeline":true,"description":"本文展示一下如何控制Golang的协程进行顺序执行或者交替执行 1.顺序执行 ```go package main import ( \\"fmt\\" \\"sync\\" ) func main() { fmt.Println(\\"=====通过 channel 顺序打印=====\\") printOrderlyByChannel() fmt.Println(\\"===...","head":[["meta",{"property":"og:url","content":"http://www.codepit.tech/mynotes/mynotes/codenotes/go/%E5%8D%8F%E7%A8%8B%E9%A1%BA%E5%BA%8F%E6%89%93%E5%8D%B0%E5%92%8C%E4%BA%A4%E6%9B%BF%E6%89%93%E5%8D%B0.html"}],["meta",{"property":"og:site_name","content":"Zuooの学习笔记"}],["meta",{"property":"og:title","content":"协程顺序打印和交替打印"}],["meta",{"property":"og:description","content":"本文展示一下如何控制Golang的协程进行顺序执行或者交替执行 1.顺序执行 ```go package main import ( \\"fmt\\" \\"sync\\" ) func main() { fmt.Println(\\"=====通过 channel 顺序打印=====\\") printOrderlyByChannel() fmt.Println(\\"===..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:updated_time","content":"2024-02-09T02:33:05.000Z"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:tag","content":"协程"}],["meta",{"property":"article:modified_time","content":"2024-02-09T02:33:05.000Z"}]]},"excerpt":"","headers":[{"level":2,"title":"1.顺序执行","slug":"_1-顺序执行","link":"#_1-顺序执行","children":[]},{"level":2,"title":"2.交替执行","slug":"_2-交替执行","link":"#_2-交替执行","children":[]}],"git":{"createdTime":1697887487000,"updatedTime":1707445985000,"contributors":[{"name":"zql","email":"1241236275@qq.com","commits":2}]},"readingTime":{"minutes":0.83,"words":249},"filePathRelative":"codenotes/go/协程顺序打印和交替打印.md","localizedDate":"2023年10月21日"}');export{t as data};

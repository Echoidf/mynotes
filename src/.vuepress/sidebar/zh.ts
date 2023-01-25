import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  // 代码笔记的侧边栏
  "/codenotes/": [
    {
      text: "Java核心",
      icon: "java",
      collapsible: true,
      prefix: "/codenotes/javacore/",
      children: [
        {
          text: "Java8新特性",
          icon: "write",
          link: "Java8新特性.md",
        },
      ]
    },
    {
      text: "Java虚拟机",
      icon: "engine",
      collapsible: true,
      prefix: "/codenotes/jvm/",
      children: [
        {
          text: "JVM",
          icon: "engine",
          link: "jvm.md"
        }
      ],
    },
    {
      text: "企业级框架",
      icon: "frame",
      collapsible: true,
      prefix: "/codenotes/framework/",
      children: [
        {
          text: "Netty",
          icon: "network",
          collapsible: true,
          prefix: "netty/",
          children: ["Netty核心.md", "Netty高级.md"],
        }
      ],
    },
    {
      text: "算法和数据结构",
      icon: "ability",
      collapsible: true,
      prefix: "/codenotes/algdata/",
      children: [
            "算法小抄数学运算.md",
            "算法小抄数据结构.md",
            "算法小抄高频面试.md"
          ],
    },
    {
      text: "数据库",
      icon: "mysql",
      collapsible: true,
      prefix: "/codenotes/database/",
      children: [{
        text: "Redis",
        icon:"workingDirectory",
        collapsible: true,
        prefix: "Redis/",
        children: [
          "安装及基本指令.md",
          "五大数据类型及指令.md"
        ]
      }],
    },
    {
      text: "云计算",
      icon: "computer",
      collapsible: true,
      prefix: "/codenotes/cloudcompute/",
      children: [
        "clickhouse.md",
        "hadoop.md"
      ],
    },
    {
      text: "web",
      icon: "vue",
      collapsible: true,
      prefix: "/codenotes/web/",
      children: [
          "vue钩子函数.md",
          "分页操作详解.md",
          "异步函数.md"
      ]
    },
    {
      text: "在线技术文档",
      icon: "read",
      collapsible: true,
      prefix: "/codenotes/cookbook/",
      children: [""],
    },
  ],

  // 开源项目的侧边栏
  "/projects/": [
    {
      text: "技术教程",
      icon: "guide",
      collapsible: true,
      link: "/projects/techguide/",
    },
    {
      text: "实战项目",
      icon: "workingDirectory",
      collapsible: true,
      link: "/projects/pracprojects/",
    },
    {
      text: "系统设计",
      icon: "shell",
      collapsible: true,
      link: "/projects/systemdesign/",
    },
    {
      text: "工具类库",
      icon: "module",
      collapsible: true,
      link: "/projects/toollibrary/",
    }
  ]
});

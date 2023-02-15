import { defineUserConfig } from "vuepress";
import { searchPlugin } from "@vuepress/plugin-search";
import { registerComponentsPlugin } from "@vuepress/plugin-register-components";
import { getDirname, path } from "@vuepress/utils";
import {viteBundler} from "@vuepress/bundler-vite";
import theme from "./theme.js";

// @ts-ignore
const __dirname = getDirname(import.meta.url);

//自定义用户配置
export default defineUserConfig({
  bundler: viteBundler({
    viteOptions: {
      base: "/"
    }
  }),
  base: "/mynotes/",
  head: [
    ['meta', { name: 'referrer', content: 'no-referrer' }]
  ],
  // 多语言设置
  locales: {
    "/": {
      lang: "zh-CN",
      title: "Zuooの学习笔记",
      description: "Zuooの学习笔记",
      // 设置favicon
      head: [["link", { rel: "icon", href: "/favicon.svg" }]],
    }
  },
  // 主题设置
  theme,
  plugins: [
    // 注册全局组件的插件
    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, "./components"),
    }),
    // 搜索插件
    searchPlugin({
      //多语言支持
      locales: {
        "/": {
          placeholder: "搜索本站",
        },
      },
      // 热键支持
      hotKeys: ["command", "k"],
      // 最大推荐个数
      maxSuggestions: 7,
      // 排除首页
      isSearchable: (page) => page.path !== "/",
    }),
  ],

  shouldPrefetch: false
});

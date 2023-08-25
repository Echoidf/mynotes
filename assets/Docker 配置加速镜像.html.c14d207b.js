import{_ as n}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as s,c as e,e as a}from"./app.5b8aca09.js";const i={},t=a(`<h2 id="一、手动安装-docker" tabindex="-1"><a class="header-anchor" href="#一、手动安装-docker" aria-hidden="true">#</a> 一、手动安装 Docker</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">vim</span> /etc/docker/daemon.json

<span class="token comment">## 输入以下内容</span>
<span class="token punctuation">{</span>
   <span class="token string">&quot;registry-mirrors&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
        <span class="token string">&quot;https://ung2thfc.mirror.aliyuncs.com&quot;</span>,
        <span class="token string">&quot;https://registry.docker-cn.com&quot;</span>,
        <span class="token string">&quot;http://hub-mirror.c.163.com&quot;</span>,
        <span class="token string">&quot;https://docker.mirrors.ustc.edu.cn&quot;</span>
   <span class="token punctuation">]</span>
<span class="token punctuation">}</span>

systemctl daemon-reload

systemctl restart <span class="token function">docker</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),c=[t];function r(o,l){return s(),e("div",null,c)}const m=n(i,[["render",r],["__file","Docker 配置加速镜像.html.vue"]]);export{m as default};

import{_ as n}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as s,c as a,b as e}from"./app.901fdbaf.js";const i={},t=e(`<h2 id="使用shell脚本提交git修改" tabindex="-1"><a class="header-anchor" href="#使用shell脚本提交git修改" aria-hidden="true">#</a> 使用shell脚本提交git修改</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>

<span class="token comment"># 检查参数个数</span>
<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable">$#</span> <span class="token parameter variable">-ne</span> <span class="token number">1</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
  <span class="token builtin class-name">echo</span> <span class="token string">&quot;Usage: <span class="token variable">$0</span> &lt;commit message&gt;&quot;</span>
  <span class="token builtin class-name">exit</span> <span class="token number">1</span>
<span class="token keyword">fi</span>

<span class="token comment"># 获取提交信息</span>
<span class="token assign-left variable">msg</span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable">$1</span>&quot;</span>

<span class="token comment"># 添加变更文件</span>
<span class="token function">git</span> <span class="token function">add</span> <span class="token parameter variable">-u</span>

<span class="token comment"># 提交变更</span>
<span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;<span class="token variable">$msg</span>&quot;</span> 

<span class="token comment"># 推送到远程仓库</span>
<span class="token function">git</span> push origin main
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用方式：<code>sh deploy.sh &quot;chore: update something&quot;</code></p><h2 id="删除远程仓库不必要的文件" tabindex="-1"><a class="header-anchor" href="#删除远程仓库不必要的文件" aria-hidden="true">#</a> 删除远程仓库不必要的文件</h2><p>有时候如果向远程仓库提交了类似于<code>.idea</code>这样的文件，我们提交后想将远程的这个文件删除，可以使用以下命令：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> <span class="token function">rm</span> <span class="token parameter variable">--cached</span> <span class="token punctuation">[</span>filename<span class="token punctuation">]</span> //本地中该文件不会被删除
<span class="token function">git</span> <span class="token function">rm</span> <span class="token parameter variable">-r</span>  <span class="token parameter variable">--cached</span>  <span class="token punctuation">[</span>dirName<span class="token punctuation">]</span> //删除文件夹
<span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&#39;删除某个文件&#39;</span>
<span class="token function">git</span> push 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样再将我们不需要git追踪的文件加入<code>.gitignore</code>，在下次提交时就不会跟踪该文件</p><h2 id="代码提交规范" tabindex="-1"><a class="header-anchor" href="#代码提交规范" aria-hidden="true">#</a> 代码提交规范</h2><p>在Git的Commit message中，通常以一些特定的前缀来说明这个Commit是做了何种修改。常见的前缀包括：</p><ul><li>feat: 表示新增了一个功能(feature)</li><li>fix: 表示修复了一个问题(bug fix)</li><li>docs : 表示修改了文档(documentation)</li><li>style: 表示修改了代码风格，而不影响代码功能</li><li>refactor: 表示进行了重构(refactor)操作，即修改了代码结构但不改变功能</li><li>test: 表示新增或修改了测试代码(test)</li><li>chore: 表示更新了一些杂项或零碎的任务(chore)</li></ul><p>使用这些前缀可以帮助其他人更快地理解每个Commit的含义，从而更好地维护代码，同时也有利于代码审查和发布管理。</p>`,11),l=[t];function c(o,p){return s(),a("div",null,l)}const u=n(i,[["render",c],["__file","Git使用技巧.html.vue"]]);export{u as default};

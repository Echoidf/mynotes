import{_ as e}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as s,c as a,e as n}from"./app.775ec40d.js";const t={},c=n(`<h2 id="一、ssh密钥登录" tabindex="-1"><a class="header-anchor" href="#一、ssh密钥登录" aria-hidden="true">#</a> 一、SSH密钥登录</h2><p>本机如没有密钥对，可以生成密钥：<code>ssh-keygen –t rsa –P</code></p><p>id_rsa 和 id_rsa.pub 其中一个是私钥，一个是公钥</p><p>以腾讯云服务器为例，在~/.ssh目录下，有一个 authorized_keys 文件用来保存公钥，将自己本机的公钥 id_ras.pub文件内容复制进去，设置权限：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">chmod</span> <span class="token number">600</span> authorized_keys
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,5),d=[c];function o(r,i){return s(),a("div",null,d)}const l=e(t,[["render",o],["__file","云服务器配置SSH远程访问.html.vue"]]);export{l as default};

import{_ as e}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as l,c as t,a,d as p,e as i,b as s,r as o}from"./app.7b0c1160.js";const c={},r=s(`<h2 id="一、案例需求" tabindex="-1"><a class="header-anchor" href="#一、案例需求" aria-hidden="true">#</a> 一、案例需求</h2><ol><li>每天凌晨 2:30 备份 数据库 test 到 /data/backup/db</li><li>备份开始和备份结束能够给出相应的提示信息</li><li>备份后的文件要求以备份时间为文件名，并打包成 .tar.gz 的形式，比如：2021-03-12_230201.tar.gz</li><li>在备份的同时，检查是否有 10 天前备份的数据库文件，如果有就将其删除。</li></ol><h2 id="二、shell脚本" tabindex="-1"><a class="header-anchor" href="#二、shell脚本" aria-hidden="true">#</a> 二、shell脚本</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>
<span class="token comment">#备份目录</span>
<span class="token assign-left variable">BACKUP</span><span class="token operator">=</span>/data/backup/db
<span class="token comment">#当前时间</span>
<span class="token assign-left variable">DATETIME</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">date</span> +%Y-%m-%d_%H%M%S<span class="token variable">)</span></span>
<span class="token builtin class-name">echo</span> <span class="token variable">$DATETIME</span>

<span class="token comment">#数据库地址</span>
<span class="token assign-left variable">HOST</span><span class="token operator">=</span>localhost
<span class="token assign-left variable">DB_USER</span><span class="token operator">=</span>root
<span class="token assign-left variable">BD_PWD</span><span class="token operator">=</span><span class="token string">&quot;123456&quot;</span>
<span class="token comment">#备份的数据库</span>
<span class="token assign-left variable">DATABASE</span><span class="token operator">=</span>test

<span class="token comment">#创建备份目录</span>
<span class="token punctuation">[</span> <span class="token operator">!</span> <span class="token parameter variable">-d</span> <span class="token string">&quot;<span class="token variable">\${BACKUP}</span>/<span class="token variable">\${DATETIME}</span>&quot;</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token function">mkdir</span> <span class="token parameter variable">-p</span> <span class="token string">&quot;<span class="token variable">\${BACKUP}</span>/<span class="token variable">\${DATETIME}</span>&quot;</span>

<span class="token comment">#备份数据库</span>
mysqldump -u<span class="token variable">\${DB_USER}</span> -p<span class="token variable">\${DB_PWD}</span> <span class="token parameter variable">--host</span><span class="token operator">=</span><span class="token variable">\${HOST}</span> <span class="token parameter variable">-q</span> <span class="token parameter variable">-R</span> <span class="token parameter variable">--databases</span> <span class="token variable">\${DATABASE}</span> <span class="token operator">|</span> <span class="token function">gzip</span> <span class="token operator">&gt;</span> <span class="token variable">\${BACKUP}</span>/<span class="token variable">\${DATETIME}</span>/<span class="token variable">$DATETIME</span>.sql.gz

<span class="token comment">#将文件处理成tar.gz</span>
<span class="token builtin class-name">cd</span> <span class="token variable">\${BACKUP}</span>
<span class="token function">tar</span> <span class="token parameter variable">-zcvf</span> <span class="token variable">$DATETIME</span>.tar.gz <span class="token variable">\${DATETIME}</span>
<span class="token comment">#删除对应的备份目录</span>
<span class="token function">rm</span> <span class="token parameter variable">-rf</span> <span class="token variable">\${BACKUP}</span>/<span class="token variable">\${DATETIME}</span>

<span class="token comment">#删除10天前的备份文件</span>
<span class="token function">find</span> <span class="token variable">\${BACKUP}</span> <span class="token parameter variable">-atime</span> +10 <span class="token parameter variable">-name</span> <span class="token string">&quot;*.tar.gz&quot;</span> <span class="token parameter variable">-exec</span> <span class="token function">rm</span> <span class="token parameter variable">-rf</span> <span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token punctuation">\\</span><span class="token punctuation">;</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;备份数据库<span class="token variable">\${DATABASE}</span> 成功&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="三、定时调用" tabindex="-1"><a class="header-anchor" href="#三、定时调用" aria-hidden="true">#</a> 三、定时调用</h2><p><code>使用crond定时调用</code></p>`,6),d={href:"https://www.runoob.com/linux/linux-comm-crontab.html",target:"_blank",rel:"noopener noreferrer"},v=s(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">crontab</span> <span class="token parameter variable">-e</span> <span class="token comment">#新建定时任务</span>

<span class="token comment">#输入以下内容</span>
<span class="token number">30</span> <span class="token number">2</span> * * * /usr/sbin/mysql_db_backup.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1);function b(m,u){const n=o("ExternalLinkIcon");return l(),t("div",null,[r,a("p",null,[a("a",d,[p("crontab命令"),i(n)])]),v])}const _=e(c,[["render",b],["__file","Linux定时备份Mysql.html.vue"]]);export{_ as default};

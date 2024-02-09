import{_ as n}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as s,c as a,b as t}from"./app.578bc06c.js";const p={},e=t(`<p>本篇记录一下Golang如何实现深度优先搜索【DFS】和广度优先搜索【BFS】两种算法。</p><h2 id="bfs" tabindex="-1"><a class="header-anchor" href="#bfs" aria-hidden="true">#</a> BFS</h2><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">type</span> TreeNode <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Val   <span class="token builtin">int</span>
	Left  <span class="token operator">*</span>TreeNode
	Right <span class="token operator">*</span>TreeNode
<span class="token punctuation">}</span>

<span class="token keyword">type</span> Queue <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">*</span>TreeNode

<span class="token comment">// 入队方法</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>q <span class="token operator">*</span>Queue<span class="token punctuation">)</span> <span class="token function">Enqueue</span><span class="token punctuation">(</span>n <span class="token operator">*</span>TreeNode<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> n <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
	<span class="token operator">*</span>q <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span><span class="token operator">*</span>q<span class="token punctuation">,</span> n<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 出队方法</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>q <span class="token operator">*</span>Queue<span class="token punctuation">)</span> <span class="token function">Dequeue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span>TreeNode <span class="token punctuation">{</span>
	n <span class="token operator">:=</span> <span class="token punctuation">(</span><span class="token operator">*</span>q<span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
	<span class="token operator">*</span>q <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token operator">*</span>q<span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">:</span><span class="token punctuation">]</span>
	<span class="token keyword">return</span> n
<span class="token punctuation">}</span>

<span class="token comment">// 广度优先遍历 BFS</span>
<span class="token keyword">func</span> <span class="token function">BFS</span><span class="token punctuation">(</span>root <span class="token operator">*</span>TreeNode<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	q <span class="token operator">:=</span> Queue<span class="token punctuation">{</span><span class="token punctuation">}</span>
	q<span class="token punctuation">.</span><span class="token function">Enqueue</span><span class="token punctuation">(</span>root<span class="token punctuation">)</span>

	<span class="token keyword">for</span> <span class="token function">len</span><span class="token punctuation">(</span>q<span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">0</span> <span class="token punctuation">{</span>
		n <span class="token operator">:=</span> q<span class="token punctuation">.</span><span class="token function">Dequeue</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>n<span class="token punctuation">.</span>Val<span class="token punctuation">)</span>
		q<span class="token punctuation">.</span><span class="token function">Enqueue</span><span class="token punctuation">(</span>n<span class="token punctuation">.</span>Left<span class="token punctuation">)</span>
		q<span class="token punctuation">.</span><span class="token function">Enqueue</span><span class="token punctuation">(</span>n<span class="token punctuation">.</span>Right<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	root <span class="token operator">:=</span> TreeNode<span class="token punctuation">{</span>
		Val<span class="token punctuation">:</span>   <span class="token number">1</span><span class="token punctuation">,</span>
		Left<span class="token punctuation">:</span>  <span class="token operator">&amp;</span>TreeNode<span class="token punctuation">{</span>Val<span class="token punctuation">:</span> <span class="token number">2</span><span class="token punctuation">,</span> Right<span class="token punctuation">:</span> <span class="token operator">&amp;</span>TreeNode<span class="token punctuation">{</span>Val<span class="token punctuation">:</span> <span class="token number">4</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
		Right<span class="token punctuation">:</span> <span class="token operator">&amp;</span>TreeNode<span class="token punctuation">{</span>Val<span class="token punctuation">:</span> <span class="token number">3</span><span class="token punctuation">,</span> Right<span class="token punctuation">:</span> <span class="token operator">&amp;</span>TreeNode<span class="token punctuation">{</span>Val<span class="token punctuation">:</span> <span class="token number">5</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>
	<span class="token function">BFS</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>root<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>广度优先遍历也叫层序遍历，需要借助一个队列来实现，在遇到岔路口时我们需要把所有的选择记录下来即入队操作</p><h2 id="dfs" tabindex="-1"><a class="header-anchor" href="#dfs" aria-hidden="true">#</a> DFS</h2><p>深度优先遍历 DFS 包括三种算法：前序遍历，中序遍历和后序遍历</p><p>可以采用递归实现：</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">// 深度优先遍历 DFS</span>
<span class="token keyword">func</span> <span class="token function">DFS</span><span class="token punctuation">(</span>root <span class="token operator">*</span>TreeNode<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> root <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>

	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>Val<span class="token punctuation">)</span>

	<span class="token comment">// 左子树</span>
	<span class="token function">DFS</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>Left<span class="token punctuation">)</span>
	<span class="token comment">// 右子树</span>
	<span class="token function">DFS</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>Right<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,8),o=[e];function c(i,l){return s(),a("div",null,o)}const k=n(p,[["render",c],["__file","DFS和BFS算法.html.vue"]]);export{k as default};

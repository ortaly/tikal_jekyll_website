---
layout: post
title: organizing your specs into groups and running them separately
created: 1345380824
author: avit
permalink: /ruby/blog/organizing-your-specs-groups-and-running-them-separately
tags:
- Ruby
---
<p dir="ltr">A while back I answered <a href="http://stackoverflow.com/questions/10029250/organizing-rspec-2-tests-into-unit-and-integration-categories-in-rails/10029504#10029504">this StackOverflow question</a>.</p>

<p dir="ltr">When you have a lot of specs, it makes sense to run them in separate logical groups and not just with <code>rspec spec</code> or something like that.</p>

<p dir="ltr">This way, you can save time and you can also run them in separate processes on the CI.</p>

<p dir="ltr">For example:</p>

<figure class="code">
<div class="highlight" dir="ltr">
<table>
	<tbody>
		<tr>
			<td class="gutter">
			<pre class="line-numbers">
<span class="line-number">1</span>
<span class="line-number">2</span>
<span class="line-number">3</span>
</pre>
			</td>
			<td class="code">
			<pre>
<code><span class="line">bundle exec rake spec:unit
</span><span class="line">bundle exec rake spec:integration
</span><span class="line">bundle exec rake spec:api</span></code></pre>
			</td>
		</tr>
	</tbody>
</table>
</div>
</figure>

<p dir="ltr">In order to achieve this, you need to change the <code>spec.rake</code> file.</p>

<figure class="code"><figcaption dir="ltr"></figcaption>

<div class="highlight" dir="ltr">
<table>
	<tbody>
		<tr>
			<td class="gutter">
			<pre class="line-numbers">
<span class="line-number">1</span>
<span class="line-number">2</span>
<span class="line-number">3</span>
<span class="line-number">4</span>
<span class="line-number">5</span>
<span class="line-number">6</span>
<span class="line-number">7</span>
<span class="line-number">8</span>
<span class="line-number">9</span>
<span class="line-number">10</span>
<span class="line-number">11</span>
<span class="line-number">12</span>
<span class="line-number">13</span>
</pre>
			</td>
			<td class="code">
			<pre>
<code class="ruby"><span class="line">  <span class="n">namespace</span> <span class="ss">:spec</span> <span class="k">do</span>
</span><span class="line">    <span class="no">Rspec</span><span class="o">::</span><span class="no">Core</span><span class="o">::</span><span class="no">RakeTask</span><span class="o">.</span><span class="n">new</span><span class="p">(</span><span class="ss">:unit</span><span class="p">)</span> <span class="k">do</span> <span class="o">|</span><span class="n">t</span><span class="o">|</span>
</span><span class="line">      <span class="n">t</span><span class="o">.</span><span class="n">pattern</span> <span class="o">=</span> <span class="no">Dir</span><span class="o">[</span><span class="s1">&#39;spec/*/**/*_spec.rb&#39;</span><span class="o">].</span><span class="n">reject</span><span class="p">{</span> <span class="o">|</span><span class="n">f</span><span class="o">|</span> <span class="n">f</span><span class="o">[</span><span class="s1">&#39;/api/v1&#39;</span><span class="o">]</span> <span class="o">||</span> <span class="n">f</span><span class="o">[</span><span class="s1">&#39;/integration&#39;</span><span class="o">]</span> <span class="p">}</span>
</span><span class="line">    <span class="k">end</span>
</span><span class="line">
</span><span class="line">   <span class="no">Rspec</span><span class="o">::</span><span class="no">Core</span><span class="o">::</span><span class="no">RakeTask</span><span class="o">.</span><span class="n">new</span><span class="p">(</span><span class="ss">:api</span><span class="p">)</span> <span class="k">do</span> <span class="o">|</span><span class="n">t</span><span class="o">|</span>
</span><span class="line">      <span class="n">t</span><span class="o">.</span><span class="n">pattern</span> <span class="o">=</span> <span class="s2">&quot;spec/*/{api/v1}*/**/*_spec.rb&quot;</span>
</span><span class="line">    <span class="k">end</span>
</span><span class="line">
</span><span class="line">    <span class="no">Rspec</span><span class="o">::</span><span class="no">Core</span><span class="o">::</span><span class="no">RakeTask</span><span class="o">.</span><span class="n">new</span><span class="p">(</span><span class="ss">:integration</span><span class="p">)</span> <span class="k">do</span> <span class="o">|</span><span class="n">t</span><span class="o">|</span>
</span><span class="line">      <span class="n">t</span><span class="o">.</span><span class="n">pattern</span> <span class="o">=</span> <span class="s2">&quot;spec/integration/**/*_spec.rb&quot;</span>
</span><span class="line">    <span class="k">end</span>
</span><span class="line">  <span class="k">end</span>
</span></code></pre>
			</td>
		</tr>
	</tbody>
</table>
</div>
</figure>

<p dir="ltr">You can continue customizing that all you want, you can run specific specs that are the most important to you.</p>

<p dir="ltr">I find those groups useful for most of my use cases, but with minor changes you can make it fit yours</p>

<h3 dir="ltr">Using Rspec Tags</h3>

<p dir="ltr">You can use tags for that as well, but I find that more tedious and you can forget to <em>tag</em> something.</p>

<p dir="ltr">For example:</p>

<figure class="code"><figcaption dir="ltr"></figcaption>

<div class="highlight">
<table dir="ltr">
	<tbody>
		<tr>
			<td class="gutter">
			<pre class="line-numbers">
<span class="line-number">1</span>
<span class="line-number">2</span>
<span class="line-number">3</span>
</pre>
			</td>
			<td class="code">
			<pre>
<code class="ruby"><span class="line">  <span class="n">it</span> <span class="s2">&quot;should do some integration test&quot;</span><span class="p">,</span> <span class="ss">:integration</span> <span class="o">=&gt;</span> <span class="kp">true</span> <span class="k">do</span>
</span><span class="line">   <span class="c1"># something</span>
</span><span class="line">  <span class="k">end</span>
</span></code></pre>
			</td>
		</tr>
	</tbody>
</table>
</div>
</figure>

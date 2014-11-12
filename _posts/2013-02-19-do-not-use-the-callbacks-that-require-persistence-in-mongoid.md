---
layout: post
title: DO NOT use the callbacks that require persistence in Mongoid
created: 1361309827
author: avit
permalink: /ruby/do-not-use-callbacks-require-persistence-mongoid
tags:
- Ruby
---
<p>I started using MongoDB at <a href="http://www.gogobot.com">Gogobot</a> a little while ago. While using it, I encountered some <a href="http://avi.io/blog/2013/01/30/problems-with-mongoid-and-sidekiq-brainstorming/">problems</a>, but for the most part, things went pretty smooth.</p>

<p>Today, I encountered a bug that surprised me.</p>

<p>While it certainly should not have, I think it can surprise you as well, so I am writing it up here as a fair warning.</p>

<p>For Gogobot, the entire graph is built on top of MongoDB, all the things social are driven by it and for the most parts like I mentioned, we are pretty happy with it.</p>

<h2>SO, What was the problem?</h2>

<p>The entire graph is a mountable engine, we can decide to turn it on or to turn it off at will. It acts as a data warehouse and the workflows are being managed by the app.</p>

<p>For example:</p>

<p>When model X is created, app is notified and decides what to do with this notification, and so on and so forth.</p>

<p>Everything peachy so far, nothing we haven&rsquo;t used hundreds of times in the past.</p>

<p>Here&rsquo;s how it works.</p>

<p>We have a model called <code>VisitedPlace</code>, it&rsquo;s a representation of a user that visited a certain place</p>

<p>Here&rsquo;s the code</p>

<figure class="code"><figcaption></figcaption>

<div class="highlight">
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
</pre>
			</td>
			<td class="code">
			<pre>
<code class="ruby"><span class="line"><span class="k">module</span> <span class="nn">GraphEngine</span>
</span><span class="line">  <span class="k">class</span> <span class="nc">FbPlace</span>
</span><span class="line">    <span class="kp">include</span> <span class="no">Mongoid</span><span class="o">::</span><span class="no">Document</span>
</span><span class="line">    <span class="kp">include</span> <span class="no">Mongoid</span><span class="o">::</span><span class="no">Timestamps</span>
</span><span class="line">    <span class="kp">include</span> <span class="no">GraphEngine</span><span class="o">::</span><span class="no">Notifications</span><span class="o">::</span><span class="no">NotifiableModel</span>
</span><span class="line">
</span><span class="line">    <span class="c1">#&hellip; rest of code here</span>
</span><span class="line">  <span class="k">end</span>
</span><span class="line"><span class="k">end</span>
</span></code></pre>
			</td>
		</tr>
	</tbody>
</table>
</div>
</figure>

<p>As you can see, this model includes a module called <code>NotifiableModel</code>, here&rsquo;s the important part from it:</p>

<figure class="code"><figcaption></figcaption>

<div class="highlight">
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
<span class="line-number">14</span>
<span class="line-number">15</span>
<span class="line-number">16</span>
<span class="line-number">17</span>
</pre>
			</td>
			<td class="code">
			<pre>
<code class="ruby"><span class="line"><span class="k">module</span> <span class="nn">GraphEngine</span>
</span><span class="line">  <span class="k">module</span> <span class="nn">Notifications</span>
</span><span class="line">    <span class="k">module</span> <span class="nn">NotifiableModel</span>
</span><span class="line">      <span class="kp">extend</span> <span class="no">ActiveSupport</span><span class="o">::</span><span class="no">Concern</span>
</span><span class="line">
</span><span class="line">      <span class="n">included</span> <span class="k">do</span>
</span><span class="line">        <span class="n">after_create</span> <span class="k">do</span>
</span><span class="line">          <span class="n">send_notification</span><span class="p">(</span><span class="s2">&quot;created&quot;</span><span class="p">)</span>
</span><span class="line">        <span class="k">end</span>
</span><span class="line">      <span class="k">end</span>
</span><span class="line">
</span><span class="line">      <span class="k">def</span> <span class="nf">send_notification</span><span class="p">(</span><span class="n">verb</span><span class="p">)</span>
</span><span class="line">          <span class="c1"># Notify the app here...</span>
</span><span class="line">      <span class="k">end</span>
</span><span class="line">    <span class="k">end</span>
</span><span class="line">  <span class="k">end</span>
</span><span class="line"><span class="k">end</span>
</span></code></pre>
			</td>
		</tr>
	</tbody>
</table>
</div>
</figure>

<p>Like I said, pretty standard stuff, nothing too fancy, but here&rsquo;s where it&rsquo;s getting tricky.</p>

<p>This model has a unique index on <code>user_id</code> and <code>place_id</code>. It&rsquo;s a unique index and no two documents can exist in the same collection.</p>

<p>BUT&hellip; check this out:</p>

<figure class="code"><figcaption></figcaption>

<div class="highlight">
<table>
	<tbody>
		<tr>
			<td class="gutter">
			<pre class="line-numbers">
<span class="line-number">1</span>
<span class="line-number">2</span>
</pre>
			</td>
			<td class="code">
			<pre>
<code class="ruby"><span class="line">  <span class="no">GraphEngine</span><span class="o">::</span><span class="no">VisitedPlace</span><span class="o">.</span><span class="n">create!</span><span class="p">(</span><span class="n">user_id</span><span class="p">:</span> <span class="mi">1</span><span class="p">,</span> <span class="n">place_id</span><span class="p">:</span> <span class="mi">1</span><span class="p">)</span> <span class="o">=&gt;</span> <span class="kp">true</span>
</span><span class="line">  <span class="no">GraphEngine</span><span class="o">::</span><span class="no">VisitedPlace</span><span class="o">.</span><span class="n">create!</span><span class="p">(</span><span class="n">user_id</span><span class="p">:</span> <span class="mi">1</span><span class="p">,</span> <span class="n">place_id</span><span class="p">:</span> <span class="mi">1</span><span class="p">)</span> <span class="o">=&gt;</span> <span class="kp">true</span>
</span></code></pre>
			</td>
		</tr>
	</tbody>
</table>
</div>
</figure>

<p>The second query actually failed in the DB level, but the application still returned true.</p>

<p>Meaning, that <code>after_create</code> is actually being called even if the record is <strong>not really persisted</strong>.</p>

<h2>How you can fix? / should you fix?</h2>

<p>For Gogobot, I fixed it using safe mode on those models, I don&rsquo;t mind the performance penalty, since I don&rsquo;t want to trigger Sidekiq workers that will do all sorts of things twice or three times.</p>

<p>Should you do the same? I am not sure, you need to benchmark your app and see if you can fix it in another way.</p>

<p>Would love to hear back from you in comments/discussion</p>

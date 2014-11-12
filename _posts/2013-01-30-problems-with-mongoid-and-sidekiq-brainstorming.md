---
layout: post
title: Problems with Mongoid and Sidekiq- Brainstorming
created: 1359574586
author: avit
permalink: /ruby/blog/problems-mongoid-and-sidekiq-brainstorming
tags:
- Ruby
---
<p>A few weeks back, we started slowly upgrading all of our queues at <a href="http://www.gogobot.com">Gogobot</a> to work with <a href="https://github.com/mperham/sidekiq">Sidekiq</a>.</p>
<p>Posts on how awesome the experience was and how much better Sidekiq is from <a href="http://github.com/defunkt/sidekiq">Resque</a> coming soon, though with all the good came some bad.</p>
<h2>
	Summary of the solution</h2>
<p>With Sidekiq, we are processing around <strong>25X more</strong> jobs than what we were doing with Resque, processing around 15,000,000 jobs per day, at paces of over 1K per second at times (at peak we go up well past that)</p>
<p>This is how many jobs we processed today&hellip;</p>
<p><img alt="Sidekiq history graph for today" src="http://d.pr/i/O9aU+" /></p>
<p>And this is a snapshot of our realtime graph</p>
<p><img alt="Realtime graph snapshot" src="http://d.pr/i/7Fkr+" /></p>
<p>On the MongoDB side we are working with Mongoid and we have a shared environment, 9 shards with 3 replicas in each shard, all running through 2 routers.</p>
<p>Our production mongoid config looks like this</p>
<figure class="code">
	<figcaption></figcaption>
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
</pre>
					</td>
					<td class="code">
						<pre>
<code class="yaml"><span class="line"><span class="l-Scalar-Plain">production</span><span class="p-Indicator">:</span>
</span><span class="line">  <span class="l-Scalar-Plain">op_timeout</span><span class="p-Indicator">:</span> <span class="l-Scalar-Plain">3</span>
</span><span class="line">  <span class="l-Scalar-Plain">connection_timeout</span><span class="p-Indicator">:</span> <span class="l-Scalar-Plain">3</span>
</span><span class="line">  <span class="l-Scalar-Plain">sessions</span><span class="p-Indicator">:</span>
</span><span class="line">    <span class="l-Scalar-Plain">default</span><span class="p-Indicator">:</span>
</span><span class="line">      <span class="l-Scalar-Plain">hosts</span><span class="p-Indicator">:</span>
</span><span class="line">        <span class="p-Indicator">-</span> <span class="l-Scalar-Plain">HOST_NAME:27017</span> <span class="c1">#Single router R0</span>
</span><span class="line">      <span class="l-Scalar-Plain">username</span><span class="p-Indicator">:</span> <span class="l-Scalar-Plain">USER_NAME</span>
</span><span class="line">      <span class="l-Scalar-Plain">password</span><span class="p-Indicator">:</span> <span class="l-Scalar-Plain">PASSWORD</span>
</span><span class="line">      <span class="l-Scalar-Plain">database</span><span class="p-Indicator">:</span> <span class="l-Scalar-Plain">DATABASE_NAME</span>
</span><span class="line">      <span class="l-Scalar-Plain">options</span><span class="p-Indicator">:</span>
</span><span class="line">        <span class="l-Scalar-Plain">consistency</span><span class="p-Indicator">:</span> <span class="l-Scalar-Plain">:eventual</span>
</span></code></pre>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</figure>
<p>We are using latest versions of all relevant gems (Sidekiq, Mongoid, Moped, Redis)</p>
<h2>
	All seems fine right? What&rsquo;s the problem?</h2>
<p>The problem is that we have too many connections opening and closing to our mongo instances. (~25-40 new connections per second).</p>
<p>Each time a job is picked up, a connection to Mongo is opened and when the job is done, this connection is closed (using Kiqstand middleware).</p>
<p>This is causing huge loads on our router server, and causing mongo to run out of file descriptors at times.</p>
<h2>
	SO?</h2>
<p>More then anything, this post is a callout for discussion with anyone using similar solution with similar scale and can assist, I know I would love to brainstorm on how to solve this problem.</p>

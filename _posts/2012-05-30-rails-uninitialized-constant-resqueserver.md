---
layout: post
title: Rails uninitialized constant Resque::Server
created: 1338394544
author: avit
permalink: /rails-uninitialized-constant-resqueserver
tags:
- Ruby
- web
---
<p>One of the most significant changes in my migration of a rails app from Rails 2.3.10 to rails 3.0.9 was the move from <a href='https://github.com/collectiveidea/delayed_job'>delayed_jobs</a> to <a href='https://github.com/defunkt/resque'>Resque</a>.</p>

<p>Resque is a Queue system that’s based on <a href='http://redis.io/'>Redis</a>, which is much faster and reduces the load on your database. Also we were experiencing some nasty deadlocks with delayed jobs that really broke our transactions and our backs.</p>

<p>I installed the gem and installed Redis on my development machine, <a href='http://www.kensodev.com/2011/08/22/mount-a-sinatra-app-on-your-ruby-on-rails-3-application/'>mounted the Sinatra app</a> on my rails app and navigated to the web view of resque.</p>

<p>Then, I saw this error:</p>
<div class='highlight'><pre><code class='bash'>	RuntimeError at /resque/overview
	ERR unknown <span class='nb'>command</span> <span class='s1'>'server'</span>
	file: client.rb location: call line: 47
</code></pre>
</div>
<p>Which looked like that:</p>

<p><img alt='Resque server error' src='http://f.cl.ly/items/3A3w351J1y2g2h1E0k1H/Screen%20Shot%202011-08-29%20at%207.44.00%20PM.png' /></p>

<p>After doing some digging into the code (as I always do when I encountered a problem with a gem), I found that the version of the gem (resque) I was using called the “server” method on the redis instance which was not there any more.</p>

<p>Looking at the code for the new gem showed that the app is now using the property “redis_id” which looks like this:</p>
<div class='highlight'><pre><code class='ruby'>	<span class='k'>def</span> <span class='nf'>redis_id</span>
	  <span class='c1'># support 1.x versions of redis-rb</span>
	  <span class='k'>if</span> <span class='n'>redis</span><span class='o'>.</span><span class='n'>respond_to?</span><span class='p'>(</span><span class='ss'>:server</span><span class='p'>)</span>
	    <span class='n'>redis</span><span class='o'>.</span><span class='n'>server</span>
	    <span class='k'>elsif</span> <span class='n'>redis</span><span class='o'>.</span><span class='n'>respond_to?</span><span class='p'>(</span><span class='ss'>:nodes</span><span class='p'>)</span> <span class='c1'># distributed</span>
	      <span class='n'>redis</span><span class='o'>.</span><span class='n'>nodes</span><span class='o'>.</span><span class='n'>map</span> <span class='p'>{</span> <span class='o'>|</span><span class='n'>n</span><span class='o'>|</span> <span class='n'>n</span><span class='o'>.</span><span class='n'>id</span> <span class='p'>}</span><span class='o'>.</span><span class='n'>join</span><span class='p'>(</span><span class='s1'>', '</span><span class='p'>)</span>
	    <span class='k'>else</span>
	      <span class='n'>redis</span><span class='o'>.</span><span class='n'>client</span><span class='o'>.</span><span class='n'>id</span>
	  <span class='k'>end</span>
	<span class='k'>end</span>
</code></pre>
</div>
<p>Upgrading the gem to the newest version solved my problem and everything got back to normal. So, if you encounter this issue, just upgrade the resque gem and you are all good.</p>

<p>The gem version I was using was “resque (1.8.2)”, now I am using “resque (1.18.2)”</p>

<p>As always, if this post was helpful, drop me a comment, I would love to hear.</p>
      
    <img src="http://feeds.feedburner.com/~r/KensoDev-en/~4/b9Zi-PVpXrs" height="1" width="1"/>

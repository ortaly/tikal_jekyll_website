---
layout: post
title: A solution for the “I Follow” bug with cucumber and Capybara
created: 1338394544
author: avit
permalink: /ruby/solution-i-follow-bug-cucumber-and-capybara
tags:
- Ruby
- web
---
<p>While working on a new application and writing tests I encountered a problem: This is the test I have been using:</p>
<div class="highlight">
	<pre>
<code class="ruby">  <span class="no">Scenario</span><span class="p">:</span> <span class="no">Deleting</span> <span class="n">a</span> <span class="n">project</span> <span class="n">from</span> <span class="n">the</span> <span class="n">main</span> <span class="n">page</span>
    <span class="no">Given</span> <span class="n">I</span> <span class="n">am</span> <span class="n">on</span> <span class="n">the</span> <span class="n">account</span> <span class="n">home</span> <span class="n">page</span>
	<span class="no">When</span> <span class="n">I</span> <span class="n">follow</span> <span class="o">&amp;</span><span class="n">quot</span><span class="p">;</span><span class="no">Delete</span> <span class="no">Project</span><span class="o">&amp;</span><span class="n">quot</span><span class="p">;</span>
	<span class="no">Then</span> <span class="n">I</span> <span class="n">should</span> <span class="n">see</span> <span class="o">&amp;</span><span class="n">quot</span><span class="p">;</span><span class="no">Your</span> <span class="n">project</span> <span class="n">has</span> <span class="n">been</span> <span class="n">deleted</span><span class="o">&amp;</span><span class="n">quot</span><span class="p">;</span>
</code></pre>
</div>
<p>The error that was shown is this:</p>
<div class="highlight">
	<pre>
<code class="bash">undefined <span class="nb">local </span>variable or method <span class="sb">`</span>node<span class="err">&#39;</span> <span class="k">for</span> <span class="c">#&lt;Capybara::Driver::Node tag=&quot;a&quot; ...</span>
</code></pre>
</div>
<p>Here&rsquo;s a screen shot of the test run: <a href="http://www.flickr.com/photos/51960246@N07/5201208261/" title="Screen shot 2010-11-23 at 5.36.24 PM by KensoDev, on Flickr"><img alt="Screen shot 2010-11-23 at 5.36.24 PM" height="135" src="http://farm5.static.flickr.com/4129/5201208261_b5193c9cda.jpg" width="500" /></a></p>
<p>After browsing around for quite some time, I found that the error is originated with this line in env.rb file:</p>
<p>&nbsp;</p>
<div class="highlight">
	<pre>
<code class="ruby"><span class="nb">require</span> <span class="s1">&#39;cucumber/rails/capybara_javascript_emulation&#39;</span> <span class="c1"># Lets you click links with onclick javascript handlers without using @culerity or @javascript</span>
</code></pre>
</div>
<p>&nbsp;</p>
<p>Commenting out this line solved the problem for me and now I can continue with my testing. I hope it will solve your problem as well.</p>
<img height="1" src="http://feeds.feedburner.com/~r/KensoDev-en/~4/KOfqGVlh_EI" width="1" />

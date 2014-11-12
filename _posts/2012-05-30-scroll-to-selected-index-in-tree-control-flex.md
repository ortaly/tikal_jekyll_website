---
layout: post
title: Scroll to selected index in Tree control (Flex)
created: 1338394544
author: avit
permalink: /scroll-selected-index-tree-control-flex
tags:
- Ruby
- web
---
<p>Sometimes, in your application you have a tree that has many nodes, folders, sub-folders and many items.</p>

<p>Often, this tree needs to have a scroll bar, and usually you want the scroll to be on the spot with the selected item.</p>

<p>I recently encountered some weird solutions for this in a company I work for these days, I have actually seen a custom control with saving the scroll position in memory, height calculations for items and many more “solutions”.</p>

<p>There’s actually a simple way to do this, it is so simple that when the developers saw it they laughed so hard (the team leader didn’t) on the time they have spent on this solution.</p>

<p>By the way, the solution can also be for Grid and List controls so you can use it there as well.</p>

<p>Here’s the code:</p>
<div class='highlight'><pre><code class='actionscript'><span class='k'>if</span><span class='p'>(</span><span class='nx'>tree</span><span class='p'>.</span><span class='nx'>selectedIndex</span> <span class='o'>&</span><span class='nx'>gt</span><span class='o'>;</span> <span class='mi'>0</span><span class='p'>)</span>
<span class='p'>{</span>
	<span class='nx'>tree</span><span class='p'>.</span><span class='nx'>scrollToIndex</span><span class='p'>(</span> <span class='nx'>tree</span><span class='p'>.</span><span class='nx'>selectedIndex</span> <span class='p'>);</span>
<span class='p'>}</span>
</code></pre>
</div>
<p>Simple isn’t it?</p>
      
    <img src="http://feeds.feedburner.com/~r/KensoDev-en/~4/H54T6uCyzLM" height="1" width="1"/>

---
layout: post
title: Use specific version of RubyGems per project with RVM
created: 1338394544
author: avit
permalink: /use-specific-version-rubygems-project-rvm
tags:
- Ruby
- web
---
<p>If you’re following this blog (and of course you should), you know by now that I have been upgrading a bug project to rails 3. One of the things that I needed to do was to upgrade RubyGems.</p>

<p>Since I did not make the switch completely (production still on rails 2.3.10), I’m fixing p0 bugs on the old project and merging the changes.</p>

<p>One problem I encountered is that rails 2.3.10 does not run with the latest RubyGems.</p>

<p>Since I am using RVM, it made since that this project will run on a specific version of RubyGems and the main project (the rails 3 one) will run on the latest.</p>

<p>It turned out to be very simple:</p>
<div class='highlight'><pre><code class='bash'>rvm rubygems 1.4.2
</code></pre>
</div>
<p>Once you execute this bit of code, it will download RubyGems and this RVM folder will use it.</p>

<p>As always, if this helped you, drop me a note, let me know.</p>
      
    <img src="http://feeds.feedburner.com/~r/KensoDev-en/~4/oXp7OXp0swo" height="1" width="1"/>

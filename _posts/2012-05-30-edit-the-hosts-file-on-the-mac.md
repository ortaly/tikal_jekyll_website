---
layout: post
title: Edit the hosts file on the mac
created: 1338394544
author: avit
permalink: /edit-hosts-file-mac
tags:
- Ruby
- web
---
<p>Sometimes, you may need to edit the hosts file on the mac.</p>

<p>The hosts file is a file that controls the routing to websites, both localhost and other websites. For example, I can say that whenever I enter http://www.kensodev.com in the browser, the address is then traced back to 127.0.0.1 instead of going to the DNS server and lookup the address there.</p>

<p>This is a very efficient way to do testing to websites, so you don’t have to use localhost or everything. For example, I always use a local prefix to a website to identify it’s on my machine. http://local.kensodev.com will be the local version of this website and so on and so forth.</p>

<p>There are many cases where you might want to edit the hosts file. In mac it’s not that intuitive to find it like in windows so here’s a quick tip (I am using textmate bug you can use whatever you want).</p>

<p>To edit the file simply enter this command into the terminal:</p>
<div class='highlight'><pre><code class='bash'>sudo mate /private/etc/hosts
</code></pre>
</div>
<p>You will then be prompted to enter a password and after you edit the file and press save, you will have to enter the password again.</p>

<p>This is it, that is how you edit the hosts file on the mac.</p>
      
    <img src="http://feeds.feedburner.com/~r/KensoDev-en/~4/0zAHC3kD8aw" height="1" width="1"/>

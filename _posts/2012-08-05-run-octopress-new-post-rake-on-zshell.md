---
layout: post
title: Run Octopress New Post Rake On Zshell
created: 1344161388
author: avit
permalink: /ruby/run-octopress-new-post-rake-zshell
tags:
- Ruby
---
<p>a–
layout: post
title: “run octopress new_post rake on zshell”
date: 2012-07-27 22:53
comments: true</p>

<h2>categories: general</h2>

<p>This blog is running on <a href="https://github.com/imathis/octopress">Octopress</a>, which is an awesome implementation of a blogging engine in Ruby.</p>

<p>To create a new post, you need to run a rake task like so:</p>

<figure class='code'><figcaption><span></span></figcaption><div class="highlight"><table><tr><td class="gutter"><pre class="line-numbers"><span class='line-number'>1</span>
</pre></td><td class='code'><pre><code class='bash'><span class='line'>rake new_post<span class="o">[</span><span class="s2">"some awesome post title"</span><span class="o">]</span>
</span></code></pre></td></tr></table></div></figure>


<p>The problem is, that in zsh, those are escaped and you get an error.</p>

<p>I used to do <code>new_post</code> without anything and then edit the file name and the title inside the file BUT there’s actually a better way.</p>

<p>You can either run <code>noglob rake</code> or you can run the rake like this:</p>

<figure class='code'><figcaption><span></span></figcaption><div class="highlight"><table><tr><td class="gutter"><pre class="line-numbers"><span class='line-number'>1</span>
</pre></td><td class='code'><pre><code class='bash'><span class='line'>rake <span class="s2">"new_post[some awesome post title]"</span>
</span></code></pre></td></tr></table></div></figure>


<p>Enjoy!</p>

---
layout: post
title: copy all files from a folder into a folder without the confirmation on linux
created: 1344161388
author: avit
permalink: /ruby/copy-all-files-folder-folder-without-confirmation-linux
tags:
- Ruby
---
<p>As a developer, there are things that never mind how many times you’ll do them, you will never ever remember how to do it exactly without googling for a couple of minutes or looking through the last executed list of commands on the terminal.</p>

<p>For me, one of those things is how to copy all files and folders from source to destination with automatic reply yes to overwrite requests.</p>

<p>Here’s how you do it</p>

<figure class='code'><figcaption><span></span></figcaption><div class="highlight"><table><tr><td class="gutter"><pre class="line-numbers"><span class='line-number'>1</span>
</pre></td><td class='code'><pre><code class='bash'><span class='line'>cp -apRv <source_folder>/* <dest_folder>/ --reply<span class="o">=</span>yes
</span></code></pre></td></tr></table></div></figure>


<p>Enjoy!</p>

<p>And #notetoself, no need to google anymore, find it on my blog ;)</p>

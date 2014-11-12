---
layout: post
title: run rake task in the background and log to file
created: 1344161388
author: avit
permalink: /ruby/run-rake-task-background-and-log-file
tags:
- Ruby
---
<p>I am working with rake tasks a lot, I love the simplicity of creating one and just running one on the server.</p>

<p>For the real heavy lifting I am using a queue system of course, but when I just want to throw something in the queue for example, I will usually create a rake task for it and run it on one of the servers.</p>

<p>I use quick and dirty <code>puts</code> messages to log the progress.</p>

<p>For example I could have a rake task like this:</p>

<figure class='code'><figcaption><span></span></figcaption><div class="highlight"><table><tr><td class="gutter"><pre class="line-numbers"><span class='line-number'>1</span>
<span class='line-number'>2</span>
<span class='line-number'>3</span>
<span class='line-number'>4</span>
</pre></td><td class='code'><pre><code class='ruby'><span class='line'><span class="no">User</span><span class="o">.</span><span class="n">find_each</span> <span class="k">do</span> <span class="o">|</span><span class="n">user</span><span class="o">|</span>
</span><span class='line'>  <span class="nb">puts</span> <span class="s2">"Going over user: </span><span class="si">#{</span><span class="n">user</span><span class="o">.</span><span class="n">id</span><span class="si">}</span><span class="s2">"</span>
</span><span class='line'>  <span class="no">Resque</span><span class="o">.</span><span class="n">enqueue</span><span class="p">(</span><span class="o">.</span><span class="n">.</span><span class="o">.</span><span class="p">)</span>
</span><span class='line'><span class="k">end</span>
</span></code></pre></td></tr></table></div></figure>


<p>To run this on the server, I just ssh into is and then I do <code>screen</code> so when I log out of the server the session will save the process and not kill it.</p>

<p>Then, I run this command:</p>

<figure class='code'><figcaption><span></span></figcaption><div class="highlight"><table><tr><td class="gutter"><pre class="line-numbers"><span class='line-number'>1</span>
</pre></td><td class='code'><pre><code class='ruby'><span class='line'><span class="n">rake</span> <span class="n">foo</span><span class="ss">:bar</span>  <span class="o">--</span><span class="n">trace</span> <span class="mi">2</span><span class="o">>&</span><span class="mi">1</span> <span class="o">>></span> <span class="n">log</span><span class="o">/</span><span class="n">some_log_file</span><span class="o">.</span><span class="n">log</span>
</span></code></pre></td></tr></table></div></figure>


<p>That’s it, you can now leave the server and let it do all the work, periodically, you can log in and check the progress just by tailing the file.</p>

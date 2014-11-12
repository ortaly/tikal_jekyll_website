---
layout: post
title: Kill all resque workers with a single command
created: 1338394544
author: avit
permalink: /kill-all-resque-workers-single-command
tags:
- Ruby
- web
---
<p>At <a href='http://www.gogobot.com'>Gogobot</a> we are running background processes with <a href='http://www.github.com/defunkt/resque'>Resque</a>.</p>

<p>We are using <a href='http://god.rubyforge.org/'>God</a> to start workers on all servers, both front end and back end (with different queues).</p>

<p>God sometimes has an issue with leaving some stale workers laying around which cache old code, so if you change your code, this is your enemy since you start seeing failed jobs that should not fail what so ever.</p>

<p>Even when you stop the rakes (Workers run by rake) with god, it will still leave those lying around.</p>

<p>In one word, Frustrating…</p>

<p>So, I was IM’ng with <a href='http://twitter.com/#!/chiuki'>Chiu-Ki</a> and we were talking about killing workers, and I was telling her how to kill those.</p>

<p>She told me she has a shell script for it.</p>

<p>There you go…</p>
<div class='highlight'><pre><code class='bash'>sudo <span class='nb'>kill</span> -9  <span class='sb'>`</span>ps aux | grep <span class='o'>[</span>r<span class='o'>]</span>esque | grep -v grep | cut -c 10-16<span class='sb'>`</span>
</code></pre>
</div>
<p>and if you just want to test before doing some killing, you can run this:</p>
<div class='highlight'><pre><code class='bash'><span class='nb'>echo</span> <span class='sb'>`</span>ps aux | grep <span class='o'>[</span>r<span class='o'>]</span>esque | grep -v grep | cut -c 10-16<span class='sb'>`</span>
</code></pre>
</div>
<p>Of course after this GOD will restart the workers with the new code and that’s it, you have fresh workers, with new code, ready to be up and running.</p>
      
    <img src="http://feeds.feedburner.com/~r/KensoDev-en/~4/ORIAhHrW7nE" height="1" width="1"/>

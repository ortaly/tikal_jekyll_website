---
layout: post
title: Mount a Sinatra app on your Ruby on rails (3) application
created: 1338394544
author: avit
permalink: /mount-sinatra-app-your-ruby-rails-3-application
tags:
- Ruby
- web
---
<p>I have been migrating a Rails 2.3.10 application to Rails 3.0.9, while doing so I also migrated our queue system from delayed_jobs that ripped our system apart to Resque.</p>

<p>Resque comes with a Sintra app to monitor the Queue, see what’s going on and what jobs failed etc.</p>

<p>It’s very convenient and you can really grasp what’s going on with your system. I really missed that in delayed_job (amongst other things).</p>

<p>So, I wanted to mount this Sinatra app onto our rails application.</p>

<p>It turns out to be VERY easy and straight forward.</p>

<p>Just add this to your routes.rb file:</p>
<div class='highlight'><pre><code class='ruby'><span class='n'>mount</span> <span class='no'>Resque</span><span class='o'>::</span><span class='no'>Server</span><span class='p'>,</span> <span class='ss'>:at</span> <span class='o'>=></span> <span class='s2'>"/resque"</span>
</code></pre>
</div>
<p>In an initializer, just require the “resque/server” and you are done!</p>
      
    <img src="http://feeds.feedburner.com/~r/KensoDev-en/~4/YmW-ERmDS3g" height="1" width="1"/>

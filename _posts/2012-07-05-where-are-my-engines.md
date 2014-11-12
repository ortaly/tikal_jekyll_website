---
layout: post
title: Where are my engines?
created: 1341505431
author: avit
permalink: /where-are-my-engines
tags:
- Ruby
- web
---
<p>Right now, I am working on an engine for the Gogobot application.</p>
<p>As part of my work on the engine, I am working with the Mongoid gem and the Fabrication gem, both great gems b.t.w.</p>
<p>The problem with Fabrication is that it wasn’t really adapted to working with Engines and it was relying a lot on Rails.root for where to locate the fabricator files.</p>
<p>Since in an engine, the application is located in spec/dummy I needed a better way locate the fabricators.</p>
<p>ok… so far the story of how I got to even writing this post.</p>
<p>To solve my problem I needed to grab all of the engines that are included inside the Rails application.</p>
<p>Turns out, there’s a real easy way to do it.</p>
<div id="gist-3054632" class="gist">
    
        <div class="gist-file">
          <div class="gist-data gist-syntax">
              <div class="highlight"><pre><div class='line' id='LC1'><span class="no">Rails</span><span class="o">.</span><span class="n">application</span><span class="o">.</span><span class="n">railties</span><span class="o">.</span><span class="n">engines</span></div></pre></div>
          </div>

          <div class="gist-meta">
            <a href="https://gist.github.com/raw/3054632/b4043bcc0c07ae0dcbe4e467b5f8dc635b8af6fb/find_engines.rb" style="float:right;">view raw</a>
            <a href="https://gist.github.com/3054632#file_find_engines.rb" style="float:right;margin-right:10px;color:#666">find_engines.rb</a>
            <a href="https://gist.github.com/3054632">This Gist</a> brought to you by <a href="http://github.com">GitHub</a>.
          </div>
        </div>
</div>

<p>You can look at my solution including this line in the pull request I have open for Fabrication here: <a href="https://github.com/paulelliott/fabrication/pull/114" target="_blank">https://github.com/paulelliott/fabrication/pull/114</a></p>

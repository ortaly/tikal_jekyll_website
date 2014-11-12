---
layout: post
title: Working with Resque? perform_later is at 1.0, you should use it
created: 1337693333
author: avit
permalink: /working-resque-performlater-10-you-should-use-it
tags:
- Ruby
- web
---
<p>Last night, I released the 1.0 version of <a href="http://github.com/kensodev/perform_later" target="_blank">perform_later</a>.</p>
<div id="attachment_1139" class="wp-caption aligncenter" style="width: 310px"><a href="http://www.kensodev.com/wp-content/uploads/2012/05/iStock_000018537479Small.jpg"><img class="size-medium wp-image-1139" title="Now or later?" src="http://www.kensodev.com/wp-content/uploads/2012/05/iStock_000018537479Small-300x218.jpg" alt="" width="300" height="218" /></a><p class="wp-caption-text">Now or later?</p></div>
<p>The gem is being used in production for over 6 months now, in a big-scale website (<a href="http://www.gogobot.com" target="_blank">Gogobot</a>), so I thought it’s time to put in some extra needed work, some major refactoring and to release 1.0.</p>
<h2>What’s new?</h2>
<ul>
<li>1.0 is basically the same in the core functionality, I refactored big bits of the codebase, it’s much cleaner and more readable then before (still need to work quite a bit on code documentation)</li>
<li>Added the <em>later </em>method support for ActiveRecord models.</li>
<li>Added the loner support, now you can mark methods to be loners, meaning only a single instance of this method can exist in the queue at all times, this is super useful when a user does many actions that will result in say a cache clear for the user, there’s no reason to do a clear more then once. (and there are many more cases like this)</li>
</ul>
<p>So, right off the README, here’s simple usage for this gem</p>
<div id="gist-2768981" class="gist">
    
        <div class="gist-file">
          <div class="gist-data gist-syntax">
              <div class="highlight"><pre><div class='line' id='LC1'><span class="k">class</span> <span class="nc">User</span> <span class="o"><</span> <span class="no">ActiveRecord</span><span class="o">::</span><span class="no">Base</span></div><div class='line' id='LC2'>  <span class="k">def</span> <span class="nf">long_running_method</span></div><div class='line' id='LC3'>    <span class="c1"># Your code here</span></div><div class='line' id='LC4'>  <span class="k">end</span></div><div class='line' id='LC5'>  <span class="n">later</span> <span class="ss">:long_running_method</span></div><div class='line' id='LC6'><br/></div><div class='line' id='LC7'>  <span class="k">def</span> <span class="nf">long_running_method_2</span></div><div class='line' id='LC8'>    <span class="c1"># Your code here</span></div><div class='line' id='LC9'>  <span class="k">end</span></div><div class='line' id='LC10'>  <span class="n">later</span> <span class="ss">:long_running_method_2</span><span class="p">,</span> <span class="n">queue</span><span class="p">:</span> <span class="ss">:some_queue_name</span></div><div class='line' id='LC11'><br/></div><div class='line' id='LC12'>  <span class="k">def</span> <span class="nf">lonely_long_running_method</span></div><div class='line' id='LC13'>    <span class="c1"># Your code here</span></div><div class='line' id='LC14'>  <span class="k">end</span></div><div class='line' id='LC15'>  <span class="n">later</span> <span class="ss">:lonely_long_running_method</span><span class="p">,</span> <span class="ss">:loner</span> <span class="o">=></span> <span class="kp">true</span><span class="p">,</span> <span class="n">queue</span><span class="p">:</span> <span class="ss">:some_queue_name</span></div><div class='line' id='LC16'><span class="k">end</span></div></pre></div>
          </div>

          <div class="gist-meta">
            <a href="https://gist.github.com/raw/2768981/8d9932700c4c9b7eb6787394e42a99a8b60cbe21/user.rb" style="float:right;">view raw</a>
            <a href="https://gist.github.com/2768981#file_user.rb" style="float:right;margin-right:10px;color:#666">user.rb</a>
            <a href="https://gist.github.com/2768981">This Gist</a> brought to you by <a href="http://github.com">GitHub</a>.
          </div>
        </div>
</div>

<p>The best thing about perform_later (not new in this version) is that you can pass in any param, and it will get translated into JSON with no problem.</p>
<p>You can pass in AR objects, hashes, arrays, anything you need, there’s no need to rewrite your methods.</p>
<p>I would love your comments, feel free to contribute issues, pull requests, documentation or anything else.</p>

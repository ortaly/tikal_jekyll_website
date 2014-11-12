---
layout: post
title: Showing the git commit SHA that is currently deployed
created: 1335824630
author: avit
permalink: "/showing-git-commit-sha-currently-deployed"
tags:
- Ruby
- web
---
<p>I cannot count how many times I (or others) have asked the following question:</p>
<blockquote><p>What is the difference between master and the production version?</p></blockquote>
<p>We deploy about 3-5 times a day and we merge code about twice as much into master (some days, even more then that).</p>
<p>We deploy to servers with Capistrano, Capistrano has a very useful feature to write a REVISION file to the root of the project, this file contains a single line with the commit sha.</p>
<p>So, I thought I might set up a controller that will read this file and display it when I want.</p>
<p>So, I spec’d it out:</p>
<div id="gist-2566281" class="gist">

        <div class="gist-file">
          <div class="gist-data gist-syntax">
              <div class="highlight"><pre><div class='line' id='LC1'><span class="n">describe</span> <span class="ss">:git_sha</span> <span class="k">do</span></div><div class='line' id='LC2'>  <span class="n">it</span> <span class="s2">"should read the file correctly"</span> <span class="k">do</span></div><div class='line' id='LC3'>    <span class="n">controller</span><span class="o">.</span><span class="n">stub!</span><span class="p">(</span><span class="ss">:current_user</span><span class="p">)</span><span class="o">.</span><span class="n">and_return</span><span class="p">(</span><span class="kp">nil</span><span class="p">)</span></div><div class='line' id='LC4'>    <span class="no">File</span><span class="o">.</span><span class="n">should_receive</span><span class="p">(</span><span class="ss">:open</span><span class="p">)</span><span class="o">.</span><span class="n">with</span><span class="p">(</span><span class="s2">"</span><span class="si">#{</span><span class="no">Rails</span><span class="o">.</span><span class="n">root</span><span class="si">}</span><span class="s2">/REVISION"</span><span class="p">)</span><span class="o">.</span><span class="n">and_return</span><span class="p">(</span><span class="n">stub</span><span class="p">(</span><span class="n">read</span><span class="p">:</span> <span class="s2">"aaa"</span><span class="p">))</span></div><div class='line' id='LC5'>    <span class="n">get</span> <span class="ss">:git_sha</span></div><div class='line' id='LC6'>    <span class="n">response</span><span class="o">.</span><span class="n">body</span><span class="o">.</span><span class="n">should</span> <span class="o">==</span> <span class="s2">"aaa"</span></div><div class='line' id='LC7'>  <span class="k">end</span></div><div class='line' id='LC8'><span class="k">end</span></div></pre></div>
          </div>

          <div class="gist-meta">
            <a href="https://gist.github.com/raw/2566281/be3011960805865bc075bcc857369f665e586096/diagnostic_controller_spec.rb" style="float:right;">view raw</a>
            <a href="https://gist.github.com/2566281#file_diagnostic_controller_spec.rb" style="float:right;margin-right:10px;color:#666">diagnostic_controller_spec.rb</a>
            <a href="https://gist.github.com/2566281">This Gist</a> brought to you by <a href="http://github.com">GitHub</a>.
          </div>
        </div>
</div>

<p>And this is the controller code:</p>
<div id="gist-2563752" class="gist">

        <div class="gist-file">
          <div class="gist-data gist-syntax">
              <div class="highlight"><pre><div class='line' id='LC1'><span class="k">def</span> <span class="nf">git_sha</span></div><div class='line' id='LC2'>  <span class="n">revision</span> <span class="o">=</span> <span class="no">File</span><span class="o">.</span><span class="n">open</span><span class="p">(</span><span class="s2">"</span><span class="si">#{</span><span class="no">Rails</span><span class="o">.</span><span class="n">root</span><span class="si">}</span><span class="s2">/REVISION"</span><span class="p">)</span><span class="o">.</span><span class="n">read</span><span class="o">.</span><span class="n">strip</span><span class="o">.</span><span class="n">to_s</span></div><div class='line' id='LC3'>  <span class="n">render</span> <span class="ss">:text</span> <span class="o">=></span> <span class="n">revision</span></div><div class='line' id='LC4'><span class="k">end</span></div></pre></div>
          </div>

          <div class="gist-meta">
            <a href="https://gist.github.com/raw/2563752/3133803a2e2c756deab8c9b420d0e845f67ff003/diagnostic_controller.rb" style="float:right;">view raw</a>
            <a href="https://gist.github.com/2563752#file_diagnostic_controller.rb" style="float:right;margin-right:10px;color:#666">diagnostic_controller.rb</a>
            <a href="https://gist.github.com/2563752">This Gist</a> brought to you by <a href="http://github.com">GitHub</a>.
          </div>
        </div>
</div>

---
layout: post
title: The simplest Enum you will ever find for your ActiveRecord models
created: 1336493377
author: avit
permalink: /simplest-enum-you-will-ever-find-your-activerecord-models
tags:
- Ruby
- web
---
<p>I have been using a really useful snippet for a while now.</p>
<p>While dropping it today into a project I realized just how powerful it is:</p>
<ol>
<li>it’s a drop-in and will work on any project</li>
<li>it’s database agnostic</li>
<li>it’s dead simple</li>
<li>it’s not sensitive to enum changes</li>
<li>and more and more</li>
</ol>
<p>Just as an into, an enum is a way to have string represented as integers in your database.</p>
<p>Why?</p>
<p>Because integers are much faster to index and query (at least on mysql).</p>
<p>MySQL has an enum solution but ActiveRecord can’t really use it without some nasty hacking and it’s really messy when you want to add another param.</p>
<p>Enough Said, here’s the snippet</p>
<div id="gist-2636650" class="gist">
    
        <div class="gist-file">
          <div class="gist-data gist-syntax">
              <div class="highlight"><pre><div class='line' id='LC1'>  <span class="no">STATUS</span> <span class="o">=</span> <span class="p">{</span> <span class="n">pending</span><span class="p">:</span> <span class="mi">0</span><span class="p">,</span> <span class="n">active</span><span class="p">:</span> <span class="mi">1</span><span class="p">,</span> <span class="n">inactive</span><span class="p">:</span> <span class="mi">2</span><span class="p">,</span> <span class="n">deleted</span><span class="p">:</span> <span class="mi">3</span> <span class="p">}</span></div><div class='line' id='LC2'><br/></div><div class='line' id='LC3'>  <span class="k">def</span> <span class="nf">status</span></div><div class='line' id='LC4'>    <span class="no">STATUS</span><span class="o">.</span><span class="n">key</span><span class="p">(</span><span class="n">read_attribute</span><span class="p">(</span><span class="ss">:status</span><span class="p">))</span></div><div class='line' id='LC5'>  <span class="k">end</span></div><div class='line' id='LC6'><br/></div><div class='line' id='LC7'>  <span class="k">def</span> <span class="nf">status</span><span class="o">=</span><span class="p">(</span><span class="n">s</span><span class="p">)</span></div><div class='line' id='LC8'>    <span class="n">write_attribute</span><span class="p">(</span><span class="ss">:status</span><span class="p">,</span> <span class="no">STATUS</span><span class="o">[</span><span class="n">s</span><span class="o">]</span><span class="p">)</span></div><div class='line' id='LC9'>  <span class="k">end</span></div></pre></div>
          </div>

          <div class="gist-meta">
            <a href="https://gist.github.com/raw/2636650/f02584bf531c359c0b3fd8bfe63402b8527410ec/account.rb" style="float:right;">view raw</a>
            <a href="https://gist.github.com/2636650#file_account.rb" style="float:right;margin-right:10px;color:#666">account.rb</a>
            <a href="https://gist.github.com/2636650">This Gist</a> brought to you by <a href="http://github.com">GitHub</a>.
          </div>
        </div>
</div>

<p>This gives you the ability to work with the Account model like so:</p>
<div id="gist-2636990" class="gist">
    
        <div class="gist-file">
          <div class="gist-data gist-syntax">
              <div class="highlight"><pre><div class='line' id='LC1'><span class="o">>></span> <span class="n">account</span> <span class="o">=</span> <span class="no">Account</span><span class="o">.</span><span class="n">first</span></div><div class='line' id='LC2'>  <span class="no">Account</span> <span class="no">Load</span> <span class="p">(</span><span class="mi">0</span><span class="o">.</span><span class="mi">2</span><span class="n">ms</span><span class="p">)</span>  <span class="no">SELECT</span> <span class="sb">`accounts`</span><span class="o">.</span><span class="n">*</span> <span class="no">FROM</span> <span class="sb">`accounts`</span> <span class="no">LIMIT</span> <span class="mi">1</span></div><div class='line' id='LC3'><span class="o">=></span> <span class="c1">#<Account id: 4, name: "KensoDev", subdomain: "kensodev", user_id: 6, created_at: "2012-05-08 16:06:31", updated_at: "2012-05-08 16:29:11", logo_file_name: nil, logo_content_type: nil, logo_file_size: nil, logo_updated_at: nil, token: "5022N7VSAD", plan_id: 1, project_count: 1, contact_count: 1, quota_used: 0, notification_interval: nil, billing_token: "", status: 1></span></div><div class='line' id='LC4'><span class="o">>></span> <span class="n">account</span><span class="o">.</span><span class="n">status</span></div><div class='line' id='LC5'><span class="o">=></span> <span class="ss">:active</span></div><div class='line' id='LC6'><span class="o">>></span> <span class="n">account</span><span class="o">.</span><span class="n">status</span> <span class="o">=</span> <span class="ss">:pending</span></div><div class='line' id='LC7'><span class="o">=></span> <span class="ss">:pending</span></div><div class='line' id='LC8'><span class="o">>></span> <span class="n">account</span><span class="o">.</span><span class="n">save</span></div><div class='line' id='LC9'>  <span class="no">SQL</span> <span class="p">(</span><span class="mi">0</span><span class="o">.</span><span class="mi">1</span><span class="n">ms</span><span class="p">)</span>  <span class="k">BEGIN</span></div><div class='line' id='LC10'>  <span class="no">Account</span> <span class="no">Load</span> <span class="p">(</span><span class="mi">0</span><span class="o">.</span><span class="mi">3</span><span class="n">ms</span><span class="p">)</span>  <span class="no">SELECT</span> <span class="sb">`accounts`</span><span class="o">.</span><span class="n">`</span><span class="nb">id</span><span class="sb">` FROM `</span><span class="n">accounts</span><span class="sb">` WHERE (`</span><span class="n">accounts</span><span class="sb">`.`</span><span class="n">subdomain</span><span class="sb">` = BINARY 'kensodev') AND (`</span><span class="n">accounts</span><span class="sb">`.id <> 4) LIMIT 1</span></div><div class='line' id='LC11'><span class="sb">  User Load (0.2ms)  SELECT `</span><span class="n">users</span><span class="sb">`.* FROM `</span><span class="n">users</span><span class="sb">` WHERE (`</span><span class="n">users</span><span class="sb">`.`</span><span class="nb">id</span><span class="sb">` = 6) LIMIT 1</span></div><div class='line' id='LC12'><span class="sb">  Plan Load (0.2ms)  SELECT `</span><span class="n">plans</span><span class="sb">`.* FROM `</span><span class="n">plans</span><span class="sb">` WHERE (`</span><span class="n">plans</span><span class="sb">`.`</span><span class="nb">id</span><span class="sb">` = 1) LIMIT 1</span></div><div class='line' id='LC13'><span class="sb">  User Load (0.3ms)  SELECT `</span><span class="n">users</span><span class="sb">`.`</span><span class="nb">id</span><span class="sb">` FROM `</span><span class="n">users</span><span class="sb">` WHERE (LOWER(`</span><span class="n">users</span><span class="sb">`.`</span><span class="n">email</span><span class="sb">`) = LOWER('avi@kensodev.com')) AND (`</span><span class="n">users</span><span class="sb">`.id <> 6) LIMIT 1</span></div><div class='line' id='LC14'><span class="sb">[paperclip] Saving attachments.</span></div><div class='line' id='LC15'><span class="sb">  AREL (0.2ms)  UPDATE `</span><span class="n">accounts</span><span class="sb">` SET `</span><span class="n">status</span><span class="sb">` = 0, `</span><span class="n">updated_at</span><span class="sb">` = '2012-05-08 16:29:40' WHERE (`</span><span class="n">accounts</span><span class="sb">`.`</span><span class="nb">id</span><span class="sb">` = 4)</span></div><div class='line' id='LC16'><span class="sb">[paperclip] Saving attachments.</span></div><div class='line' id='LC17'><span class="sb">  SQL (1.5ms)  COMMIT</span></div><div class='line' id='LC18'><span class="sb">=> true</span></div><div class='line' id='LC19'><span class="sb">>> </span></div><div class='line' id='LC20'><br/></div></pre></div>
          </div>

          <div class="gist-meta">
            <a href="https://gist.github.com/raw/2636990/92cc08ed3e9df9cc2e7010ece3233f0b5ab5a3f5/account_status_shell.rb" style="float:right;">view raw</a>
            <a href="https://gist.github.com/2636990#file_account_status_shell.rb" style="float:right;margin-right:10px;color:#666">account_status_shell.rb</a>
            <a href="https://gist.github.com/2636990">This Gist</a> brought to you by <a href="http://github.com">GitHub</a>.
          </div>
        </div>
</div>

<p>As you can see, it’s being persisted into the database as an integer, but you work with symbols/strings which is much nicer and cleaner.</p>

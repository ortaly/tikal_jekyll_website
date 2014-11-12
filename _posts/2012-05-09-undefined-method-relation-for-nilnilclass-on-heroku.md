---
layout: post
title: undefined method `relation’ for nil:NilClass on Heroku
created: 1336576986
author: avit
permalink: /undefined-method-relation’-nilnilclass-heroku
tags:
- Ruby
- web
---
<p>I host almost 100% of my open source projects on Heroku, it’s amazing how easy it is to setup and how “out-of-your-way” they are.</p>
<p>Today, while working on one of my open source project I encountered this error:</p>
<div id="gist-2645424" class="gist">
    
        <div class="gist-file">
          <div class="gist-data gist-syntax">
              <div class="highlight"><pre><div class='line' id='LC1'>plan.update_attributes!({:contract_id_with_trial => 2133290})</div><div class='line' id='LC2'>NoMethodError: undefined method `relation' for nil:NilClass</div><div class='line' id='LC3'>	/app/.bundle/gems/ruby/1.9.1/gems/arel-2.0.9/lib/arel/crud.rb:12:in `update'</div><div class='line' id='LC4'>	/app/.bundle/gems/ruby/1.9.1/gems/activerecord-3.0.3/lib/active_record/persistence.rb:255:in `update'</div><div class='line' id='LC5'>	/app/.bundle/gems/ruby/1.9.1/gems/activerecord-3.0.3/lib/active_record/locking/optimistic.rb:77:in `update'</div><div class='line' id='LC6'>	/app/.bundle/gems/ruby/1.9.1/gems/activerecord-3.0.3/lib/active_record/attribute_methods/dirty.rb:68:in `update'</div></pre></div>
          </div>

          <div class="gist-meta">
            <a href="https://gist.github.com/raw/2645424/85bdaf24588f51317e40f7ad493400e41662009e/heroku_error" style="float:right;">view raw</a>
            <a href="https://gist.github.com/2645424#file_heroku_error" style="float:right;margin-right:10px;color:#666">heroku_error</a>
            <a href="https://gist.github.com/2645424">This Gist</a> brought to you by <a href="http://github.com">GitHub</a>.
          </div>
        </div>
</div>

<p>It was right after I deployed and migrated the database.</p>
<p>After about 5 minutes of head scratching I came across <a href="http://stackoverflow.com/questions/7373039/getting-nomethoderror-undefined-method-name-for-nilnilclass-when-creating-a" target="_blank">an answer on stackoverflow</a> saying you have to restart your app after a migration for it to pick up on schema changes.</p>
<p>Had a DAH! moment there <img src='http://www.kensodev.com/wp-includes/images/smilies/icon_smile.gif' alt=':-)' class='wp-smiley' /> </p>

---
layout: post
title: Removing a model from your rails project
created: 1338394544
author: avit
permalink: /removing-model-your-rails-project
tags:
- Ruby
- web
---
<p>During the work on a project I created a model. Right after clicking the Enter key I realized that I didn’t need it and wanted to roll back. Because I am using GIT, I could of course have done this using it, but I wanted to do it using a Rails command. Turns out, there’s a command to do this (if you haven’t migrated the db yet). The command is as follows:</p>
<div class='highlight'><pre><code class='bash'>script/destroy model contact
</code></pre>
</div>
<p>This will remove all of the files that were added by this command.</p>
<div class='highlight'><pre><code class='bash'>script/generate model contact user_id:integer <span class='nb'>type</span>:integer
</code></pre>
</div>
<p>Nice to know you can either do this with GIT or with Rails. Obviously the best solution is to think before you click Enter :-) but it’s nice to know nevertheless.</p>
      
    <img src="http://feeds.feedburner.com/~r/KensoDev-en/~4/6EN6t9NgP48" height="1" width="1"/>

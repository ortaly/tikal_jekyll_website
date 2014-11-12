---
layout: post
title: Replace the Hash syntax to the 1.9 syntax for all files, with a regular expression
created: 1338394544
author: avit
permalink: /replace-hash-syntax-19-syntax-all-files-regular-expression
tags:
- Ruby
- web
---
<p>This morning I got this email from my buddy <a href='http://twitter.com/elado'>@elado</a>.</p>

<p>At <a href='http://gogobot.com'>Gogobot</a> we try to keep everyone on the same coding style as much as we can, follow conventions and readability.</p>

<p>This works best for us since you can be reading code someone else wrote and you won’t feel alienated.</p>

<p>Any way, back to the email, here’s a quote…</p>
<blockquote><p>Hi guys,</p><p>Whoever isn't yet, can you please start using colon notation for hashes instead of arrows?</p><p>RIGHT:<br />render partial: "name", locals: { item: item }</p><p><br />:DEPRECATED =><br />render :partial => "name", :locals => { :item => item }</p></blockquote>
<p>Now, like I said in my reply, I am one of the culprits doing that still, but definitely not alone :-)</p>

<p>So, I replied with a challenge, here’s what I wrote…</p>

<p><blockquote><p>Good idea, although I admit I am one of the culprits, it's just embedded into my brain.<br />I'll do my best...</p><p>Challenge for @elado, regular expression to replace those with bash script...</p></blockquote></p>

<p>Now, Elad is known as “The Regex king” amongst other nicknames.</p>

<p>After about 10 minutes, I get a Skype ping, Elado is telling me to check my email, this is what I see…</p>
<div class='highlight'><pre><code class='ruby'><span class='no'>Dir</span><span class='o'>[</span><span class='s1'>'**/*.rb'</span><span class='o'>].</span><span class='n'>each</span> <span class='p'>{</span> <span class='o'>|</span><span class='n'>f</span><span class='o'>|</span>
  <span class='n'>s</span> <span class='o'>=</span> <span class='nb'>open</span><span class='p'>(</span><span class='n'>f</span><span class='p'>)</span><span class='o'>.</span><span class='n'>read</span>
  <span class='n'>awesome_rx</span> <span class='o'>=</span> <span class='sr'>/(?<!return)(?<!:)(?<!\w)(\s+):(\w+)\s*=>/</span>
  <span class='n'>count</span> <span class='o'>=</span> <span class='n'>s</span><span class='o'>.</span><span class='n'>scan</span><span class='p'>(</span><span class='n'>awesome_rx</span><span class='p'>)</span><span class='o'>.</span><span class='n'>length</span>
  <span class='k'>next</span> <span class='k'>if</span> <span class='n'>count</span><span class='o'>.</span><span class='n'>zero?</span>
  <span class='n'>s</span><span class='o'>.</span><span class='n'>gsub!</span><span class='p'>(</span><span class='n'>awesome_rx</span><span class='p'>,</span> <span class='s1'>'\1\2:'</span><span class='p'>)</span>
  <span class='nb'>puts</span> <span class='s2'>"</span><span class='si'>#{</span><span class='n'>count</span><span class='si'>}</span><span class='s2'> replacements @ </span><span class='si'>#{</span><span class='n'>f</span><span class='si'>}</span><span class='s2'>"</span>
  <span class='nb'>open</span><span class='p'>(</span><span class='n'>f</span><span class='p'>,</span> <span class='s1'>'w'</span><span class='p'>)</span> <span class='p'>{</span> <span class='o'>|</span><span class='n'>b</span><span class='o'>|</span> <span class='n'>b</span> <span class='o'><<</span> <span class='n'>s</span> <span class='p'>}</span>
<span class='p'>}</span>
</code></pre>
</div>
<p>we did not end up running it on the project, but we definitely plan on running it on files we are working on, so when we commit it will be with the new Syntax.</p>

<p>Thanks to <a href='http://twitter.com/elado'>@elado</a> for the awesomeness.</p>

<p>UPDATE: Elad thought it was worth a post as well, so here’s a link to his blog <a href='http://devign.me/convert-ruby-file-hash-syntax-to-1-9-2/'>here</a>.</p>
      
    <img src="http://feeds.feedburner.com/~r/KensoDev-en/~4/HMM1r2XDoY8" height="1" width="1"/>

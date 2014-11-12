---
layout: post
title: Bypassing the IE "onchange" bug with jQuery
created: 1338394544
author: avit
permalink: /bypassing-ie-onchange-bug-jquery
tags:
- Ruby
- web
---
<a href='http://www.kensodev.com/2009/10/20/bypassing-the-ie-onchange-bug-with-jquery/internetexplorer_1/' rel='attachment wp-att-206'><img alt='IE' class='size-thumbnail wp-image-206 alignleft' height='150' src='http://www.kensodev.com/wp-content/uploads/2009/10/InternetExplorer_1-150x150.jpg' title='IE' width='150' /></a>
<p>I absolutely love <a href='http://www.jquery.com'>jQuery</a>! I use it daily with my client side work, putting the jQuery file into my JS library has become an automated thing I do.</p>

<p>Well, after saying that, even jQuery can’t fix all the IE bugs and quirks. Sometimes you have to bypass them with intelligence and some style<!--more--></p>

<p>The bug I’m talking about is the one that disables the “onchange” event from firing when the element still has focus.</p>

<p>This phenomenon is absolutely frustrating when you have to react to a checkbox or a radiobutton.</p>

<p>Well, like everything else in jQuery, after scratching my head for a second or two (or 20, or 200) I came up with this solution:</p>
<script src='http://gist.github.com/214459.js' />
<p>This works like a charm.</p>

<p>Good luck! If you find it useful drop me a line in the comments below…</p>
      
    <img src="http://feeds.feedburner.com/~r/KensoDev-en/~4/gD1Te7fkhi4" height="1" width="1"/>

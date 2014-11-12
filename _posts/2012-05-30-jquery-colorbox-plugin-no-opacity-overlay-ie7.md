---
layout: post
title: jQuery colorbox plugin no opacity (overlay) - IE7
created: 1338394544
author: avit
permalink: /jquery-colorbox-plugin-no-opacity-overlay-ie7
tags:
- Ruby
- web
---
<p>Today, while checking a website I did heavy client side work - converting PSD’s to html, CSS and <a href='http://www.kensodev.com/tag/javascript/' title='JavaScript'>JavaScript</a>, I checked everything on IE7. One of the most annoying things I encountered was that the colorbox overlay color was pitch black.</p>

<p>On other browsers, such as Firefox or Chrome everything seemed fine and the overlay was in the correct opacity. However, I like fixing everything and found a very easy way to do so.</p>

<p>This was my code before:</p>

<p><span>js</span> $(‘.guestboox_more’).colorbox({ inline:true, href:’.guestbook_more_details’, innerWidth:’610px’, opacity: ‘.2’, transition: ‘elastic’ }); <span>/js</span></p>

<p>And this is the code after (this fixed the problem):</p>

<p><span>js</span> $(‘.guestboox_more’).colorbox({ inline:true, href:’.guestbook_more_details’, innerWidth:’610px’, opacity: ‘0.2’, transition: ‘elastic’ }); <span>/js</span></p>

<p>The problem was only that IE7 didn’t recognizance .2 as 0.2 and needed to be more specific (as often IE needs). I hope this will save you some time.</p>

<p> </p>
      
    <img src="http://feeds.feedburner.com/~r/KensoDev-en/~4/83Lq8rw-3wE" height="1" width="1"/>

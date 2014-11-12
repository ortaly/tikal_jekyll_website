---
layout: post
title: jQuery - wait for animation to end then do something
created: 1338394544
author: avit
permalink: /jquery-wait-animation-end-then-do-something
tags:
- Ruby
- web
---
<p>I have been using <a href='http://www.kensodev.com/category/jquery/' title='jQuery'>jQuery</a> for quite some time now. Following a question on one of the many forums and discussions group I visit daily, I found that not many know that <a href='http://www.kensodev.com/tag/jquery/' title='jQuery'>jQuery</a> has a built in way to “listen” for an animation to end and then continue work. For instance, if I am using the slideDown effect, I can create a function that will only execute when the slide is finished.</p>

<p>Wish to know how?</p>

<p>Just like that…</p>

<p><span>js</span> $(‘div.menuOurHotel’).slideDown("slow", function() { $("div.order_form").hide(); }); <span>/js</span></p>

<p>This is a very useful way to create a responsive intuitive user interface.</p>

<p>Good luck!</p>
      
    <img src="http://feeds.feedburner.com/~r/KensoDev-en/~4/ekkfDQ8Y20k" height="1" width="1"/>

---
layout: post
title: Empty dialogs in flex builder 3 + Flash builder 4
created: 1338394544
author: avit
permalink: /empty-dialogs-flex-builder-3-flash-builder-4
tags:
- Ruby
- web
---
<p>This week I needed to work with My PC on a<a href='http://www.kensodev.com/tag/flex/' title='Flex'> flex</a> project. I usually stay away of the PC with flex projects, I’m used to working on the mac with these project, but I needed to work on the PC.</p>

<p>While trying to configure the project in flex builder 3 (and with 4 as well), I stumbled upon a weird bug that made me scratch my head for a while.  The bug was that all of the dialogs appeared empty, no configuration, almost no buttons.</p>

<p>Here’s a screenshot of the problem: <p style='text-align: center;'><a href='http://www.kensodev.com/wp-content/uploads/2010/06/10-06-2010-11-06-14.png' rel='facebox'><img alt='' class='size-medium wp-image-473 aligncenter' height='249' src='http://www.kensodev.com/wp-content/uploads/2010/06/10-06-2010-11-06-14-300x249.png' title='Flex empty dialog' width='300' /></a></p> Now, I remembered a teammate I had a while back that had the same problem and it appeared to be a WACOM with a windows 7 driver that caused the problem, so I started disabling devices one after the other.</p>

<p>The problem was a logitech mouse software I have installed on the pc. Once I quited this application everything went back to normal.</p>

<p>Here’s the icon on the taskbar (not hard to trace).</p>
<a href='http://www.kensodev.com/wp-content/uploads/2010/06/10-06-2010-11-06-43.png' rel='attachment wp-att-474 facebox'><img alt='' class='aligncenter size-medium wp-image-474' height='26' src='http://www.kensodev.com/wp-content/uploads/2010/06/10-06-2010-11-06-43-300x26.png' title='Logitech Mouse Icon in taskbar' width='300' /></a>
<p>Hope this post helps you and you won’t scratch your had for hours like I did.</p>
      
    <img src="http://feeds.feedburner.com/~r/KensoDev-en/~4/94BSPMmatdU" height="1" width="1"/>

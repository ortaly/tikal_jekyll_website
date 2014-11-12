---
layout: post
title: jQuery and UpdatePanels (Asp.Net)
created: 1338394544
author: avit
permalink: /jquery-and-updatepanels-aspnet
tags:
- Ruby
- web
---
<a href='http://www.kensodev.com/2010/02/01/jquery-and-updatepanels-asp-net/jquery-logo-9/' rel='attachment wp-att-336'><img alt='' class='alignleft size-thumbnail wp-image-336' height='150' src='http://www.kensodev.com/wp-content/uploads/2010/02/jquery-logo-9-150x150.jpg' title='jQuery' width='150' /></a>
<p>I think this open-source js library is simply the best when you want to create a richer user experience in your websites and applications.</p>

<p>Some will argue Mootools is better but hey, this is a long and exhausting battle, almost like the one between PHP and ASP.net</p>

<p>This post comes to explain the difficulties when using jQuery dom event like “click” and “change” with an update panel.</p>
<!--more-->
<p>Just one thing before I start, this post assumes you know jQuery, it also assumes you know your way around .net and you also know what an UpdatePanel is.</p>

<p>So, let’s begin</p>

<p>This is what our application looks like:</p>
<a href='http://www.kensodev.com/2010/02/01/jquery-and-updatepanels-asp-net/post_2/' rel='attachment wp-att-337'><img alt='' class='aligncenter size-medium wp-image-337' height='150' src='http://www.kensodev.com/wp-content/uploads/2010/02/post_2-300x150.png' title='Mockup' width='300' /></a>
<p>What do we have here?</p>

<p>We have an UpdatePanel containing a grid with data from the server and a client-side button.</p>

<p>This client-side button has an event attached to it with jQuery like so: <script src='http://gist.github.com/291760.js?file=jquery_add_event_to_button.js' type='text/javascript' />Now, let’s explain what’s happening.</p>

<p>When the UpdatePanel fires an update event, all of the content inside it will be replace, but, with replacing this content all of the DOM data attached to it will also be disposed.</p>

<p>So, when we try to click the button after an UpdatePanel update the event will not be fired. To avoid this, jQuery offers a “live” event So, we will use the code like this<script src='http://gist.github.com/291764.js?file=jquery_live_event.js' type='text/javascript' /></p>

<p>This will solve the problem for you.</p>

<p>Questions, comments?</p>

<p>Feel free</p>
      
    <img src="http://feeds.feedburner.com/~r/KensoDev-en/~4/sKHW_TJDqMk" height="1" width="1"/>

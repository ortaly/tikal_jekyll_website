---
layout: post
title: RTMP being blocked by firewalls - Flash media server
created: 1338394544
author: avit
permalink: /rtmp-being-blocked-firewalls-flash-media-server
tags:
- Ruby
- web
---
<a href='http://www.kensodev.com/2010/02/19/rtmp-being-blocked-by-firewalls-flash-media-server/fms-logo/' rel='attachment wp-att-360'><img alt='' class='alignleft size-thumbnail wp-image-360' height='150' src='http://www.kensodev.com/wp-content/uploads/2010/02/FMS.logo_-150x150.jpg' title='Flash media server logo' width='150' /></a>
<p>Now, if you have users working behind a firewall, they probably can’t get passed it’s restrictions and they will (in most cases) be blocked and unable to see your application / video.</p>

<p>If you are working on a server like WebOrb (I’m working with it) then the data will also be blocked, and that is a bug issue.</p>

<p>Today we’re going to solve the problem together. Here’s a way to solve it. <!--more--></p>

<p>Well, let’s first talk a bit more about RTMP, before ditching it and moving on.</p>

<p>With flash media server you can use RTMP over a few ports (1935, 80). 1935 will probably always be blocked, because it is not a known port and even simple routers often block it.</p>

<p>Port 80 makes things a bit more complicated, you have to make FMS listen to a specific IP or your web-server (if on the same server) will not work.</p>

<p>So, first rule is always to use port 80, this is one way to make more users be able to connect to your application, watch your videos and interact with your service.</p>

<p>The connection is being made like so:</p>

<p>rtmp://your_ip_address:80/app_name</p>

<p>DO NOT use any type of arrays of ports, simply use port 80. If the client can’t connect to RTMP on port 80, he will not be able to connect on RTMP no matter the port you are using. <h2>So, What am I actually saying over here...?</h2> I’m saying you should only make 1 connection attempt, this attempt is on port 80 using RTMP - this should be your first choice. If the connection is unsuccessful, you should move the connection to use RTMPT, which is RTMP encapsulated over HTTP. Firewalls will not block this connection, because it makes RTMP “hide” behind HTTP traffic on port 80.</p>

<p>The connection is made practically the same way:</p>

<p>rtmpt://your_ip_address:80/app_name <h2>Why not use RTMPT at all times?</h2> You should not use RTMPT at all times. because there’s a performance issue, there is an overhead on top of each packet sent. <h2>Why not go through all the possible ports with RTMP first, Why only 80?</h2> In most cases, firewalls will block every port (but 80), the timeouts the user will have to go through will be very long before he will finally be redirected to RTMPT.</p>

<p>I will post some code on how to fallback more efficiently later on this week, this post was actually inspired from a client’s solution I did this week during a consulting session.</p>

<p>Good luck!</p>
      
    <img src="http://feeds.feedburner.com/~r/KensoDev-en/~4/OAZQ2dtEbrU" height="1" width="1"/>

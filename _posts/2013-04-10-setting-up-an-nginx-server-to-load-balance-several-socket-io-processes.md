---
layout: post
title: Setting up an Nginx server to load balance several socket.io processes
created: 1365610677
author: assafg
permalink: /js/setting-nginx-server-load-balance-several-socketio-processes
tags:
- JS
- nginx
- javascript node nodejs express webrtc socket.io
---
<p>An important challenge when setting out to use Socket.io in a heavily loaded environment is making sure it can scale well. As you may know it is fairly simple to set up a cluster of nodejs (socket servers) using RedisStore (for more information checkout this <a href="https://github.com/dshaw/socket.io-announce/tree/master/examples/stock-quotes">example</a>).</p>
<p>Once I had N processes (each listening on a different port on a single machine) - the main challenge was to set up a good load balancer in front. My first attempt a few months ago was not very successful and left me a bit frustrated. I focused on Nginx since it seems to be one of the best software load balancers and I really wanted to check it out. Unfortunately at the time it didn&#39;t have integral support for socket proxying so all my clients fell back to XHR which was not cool :( . Other tasks forced me to leave it unsolved...</p>
<p>Today I finally got a chance to get back to it. First thing I noticed is that as of Nginx v1.3.13 it supports websockets (<a href="http://nginx.com/news/nginx-websockets.html">http://nginx.com/news/nginx-websockets.html</a>) so no more home made solutions and hacks!</p>
<p>After some fiddling I got it to work. This may have been even easier if I had any experience with configuring Nginx and known what I was doing :). Bottom line - its working and here is the relevant configuration added to Nginx config:</p>
<p>....&nbsp;</p>
<p>#inside http directive<br />
	upstream my.server.com {<br />
	&nbsp; &nbsp; &nbsp; &nbsp; # 4 instances of NodeJS</p>
<p>&nbsp; &nbsp; &nbsp; &nbsp; server my.server.com:8881;<br />
	&nbsp; &nbsp; &nbsp; &nbsp; server my.server.com:8882;<br />
	&nbsp; &nbsp; &nbsp; &nbsp; server my.server.com:8883;<br />
	&nbsp; &nbsp; &nbsp; &nbsp; server my.server.com:8884;</p>
<div>
	&nbsp; &nbsp; }</div>
<div>
	&nbsp; &nbsp;&nbsp;</div>
<div>
	&nbsp; &nbsp; map $http_upgrade $connection_upgrade {</div>
<div>
	&nbsp; &nbsp; &nbsp; &nbsp; default upgrade;</div>
<div>
	&nbsp; &nbsp; &nbsp; &nbsp; &#39;&#39; &nbsp; &nbsp; &nbsp;close;</div>
<div>
	&nbsp; &nbsp; }</div>
<div>
	&nbsp;</div>
<div>
	&nbsp; &nbsp; server {</div>
<div>
	&nbsp; &nbsp; &nbsp; &nbsp; listen 80;</div>
<div>
	&nbsp; &nbsp; &nbsp; &nbsp; server_name my.server.com;</div>
<div>
	&nbsp; &nbsp; &nbsp; &nbsp; location / {</div>
<div>
	&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; proxy_pass http://my.server.com;</div>
<div>
	&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; proxy_http_version 1.1;</div>
<div>
	&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; proxy_set_header Upgrade $http_upgrade;</div>
<div>
	&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; proxy_set_header Connection $connection_upgrade;</div>
<div>
	&nbsp; &nbsp; &nbsp; &nbsp; }&nbsp;</div>
<div>
	&nbsp; &nbsp; }</div>
<div>
	.....</div>
<p>&nbsp;</p>
<p>That&#39;s it - just replace my.server.com with your own domain and you should be done!</p>
<p>&nbsp;</p>
<h3>
	<strong>**** UPDATE ****</strong></h3>
<p>To test the configuration&nbsp;<span style="font-size: 9pt; font-family: Arial, sans-serif;">mentioned&nbsp;</span>above&nbsp;I created a Java client that connects via socket to emulate heavy loads on the . I used&nbsp;<a href="https://github.com/Gottox/socket.io-java-client">this Java implementation of socket.io client</a>&nbsp;to do the actual&nbsp;<span style="font-size: 9pt; font-family: Arial, sans-serif;">communication</span>.</p>
<p>I stumbled into some&nbsp;<span style="font-size: 9pt; font-family: Arial, sans-serif;">weird behaviors&nbsp;</span>&nbsp;(on a very strong Win7 development machine):</p>
<ol>
	<li>
		No matter how many nodes I created the Nginx server stops accepting connections at ~511 concurrent client threads. The client gets<em>&nbsp;java.net.SocketException: Connection reset</em></li>
	<li>
		The connections are not balanced correctly - in a 4 nodes configuration: 2 nodes get 2 connections while the others get ~250.</li>
</ol>
<p>I will be performing further inquiries and keep updating.</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<h3>
	<strong>**** UPDATE 2 ****</strong></h3>
<p>Further investigation suggests that this is related to:</p>
<ol>
	<li>
		Nginx on Windows sucks :)</li>
	<li>
		max clients = worker_processes * worker_connections / 4 in a reverse proxy configuration (Browsers open 2 connections and the server manages a connection to the browser and a connection to the backend - hence 4)</li>
</ol>
<p>According to section 2 I only get to 511 concurrent (I&#39;m using a Java client so it only opens one connection to the server).&nbsp;<span style="font-size: 9pt; font-family: Arial, sans-serif;">According&nbsp;</span>to section 1 I&nbsp;<span style="font-size: 9pt; font-family: Arial, sans-serif;">haven&#39;t been</span>&nbsp;able to increase the number by playing with the configuration.</p>
<p>Testing the configuration on Linux should create a better picture.</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>

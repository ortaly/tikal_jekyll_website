---
layout: post
title: Mongrel2 - The next-generation Web-Server
created: 1285179405
author: udib
permalink: /js/mongrel2-next-generation-web-server
tags:
- JS
- web_server
- websockets
- Python
- async
---
<p>&nbsp;The author of Mongrel, Zed Shaw, just released a new web-server - <a href="http://mongrel2.org/home">Mongrel2</a> - which is completely programming-language-agnostic &amp; supports many types of communication protocols besides HTTP (Flash Sockets, WebSockets &amp;c). The nice thing is the simple idea behind it: when receiving a request, it parses it, decides which back-end should handle it &amp; then invokes the back-end via async messaging - using 0MQ - or via sync call - using TCP-IP. This means it can work with back-ends written in any programming-language, &amp; in both synchronous &amp; asynchronous protocols.</p>
<p>&nbsp;</p>
<p>The 1st version was released this month.&nbsp;Read here an early announce about it:&nbsp;</p>
<p>&nbsp;<a href="http://sheddingbikes.com/posts/1276761301.html">Mongrel2 announcement</a></p>
<p>&nbsp;</p>
<p>&amp; also check out a&nbsp;<a href="http://thechangelog.com/post/1087757312/episode-0-3-4-mongrel2-guitar-and-more-with-zed-shaw">great interview with its author</a>.</p>
<p>&nbsp;</p>
<p>&nbsp;</p>

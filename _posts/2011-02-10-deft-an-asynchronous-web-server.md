---
layout: post
title: Deft - an asynchronous web server
created: 1297321311
author: ittayd
permalink: /java/deft-asynchronous-web-server
tags:
- JAVA
- deft
---
<p>Deft is an open source web server (licensed under <a href="http://www.apache.org/licenses/LICENSE-2.0.html">Apache version 2</a>). Deft was intitially inspired by <a href="http://github.com/facebook/tornado">facebook/tornado</a>.<br />
Deft is a single threaded, asynchronous, event driven high performance web server running on the JVM.</p>
<p>&nbsp;</p>
<p><i>* Specialized and optimized for thousands of simultaneous connections.</i> (<a href="http://en.wikipedia.org/wiki/C10k_problem">C10k</a>) (<a href="http://blog.urbanairship.com/blog/2010/08/24/c500k-in-action-at-urban-airship/">C500k</a>)<br />
<i>* Using pure Java NIO</i> (<a href="http://download.oracle.com/javase/6/docs/api/java/nio/package-summary.html">java.nio</a> &amp; <a href="http://download.oracle.com/javase/6/docs/api/java/nio/channels/package-summary.html">java.nio.channels</a>)<br />
*<i> Asynchronous (nonblocking I/O)</i></p>
<p>&nbsp;</p>
<p>.... By annotating the get method with the <i>org.deftserver.web.Asynchronous</i> annotation you tell Deft that the <br />
request is not finished when the get method returns.</p>
<p>&nbsp;</p>
<p>&nbsp;</p>

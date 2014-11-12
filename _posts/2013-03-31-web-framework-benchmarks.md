---
layout: post
title: Web Framework Benchmarks
created: 1364690705
author: ittayd
permalink: /java/web-framework-benchmarks
tags:
- JAVA
---
<p><a href="http://www.techempower.com/blog/2013/03/28/framework-benchmarks/">This article</a> compares the performance of ~20 web frameworks. The tests are json serialization performance and querying a result from the database (one per request and multiple per request).</p>
<p>Even though all disclaimers about such tests apply, it is still interesting to read (and besides, if we don&#39;t compare frameworks this way, what have we left?).</p>
<p>Some interesting things I saw (again, taking this with a grain of salt that applies to all such generic comparisons):</p>
<ul>
	<li>
		Some of the Java frameworks rank higher on the multiple-queries-per-request test than other tests. Maybe the reason is that Java&#39;s better database integration pulls them up in such cases.</li>
	<li>
		I was disappointed by node.js performance. While I expected JavaScript to be slower, the database access tests are supposed to target node&#39;s sweet spot where the main performance bottleneck is the database and for which node.js is supposed to be tuned.</li>
	<li>
		Play!&#39;s evented I/O probably doesn&#39;t work as well as advertised... (taking this</li>
	<li>
		Ruby frameworks need some work...</li>
	<li>
		If you want to use scripted languages, consider PHP, Clojure, Groovy.</li>
</ul>

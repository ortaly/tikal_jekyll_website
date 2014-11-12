---
layout: post
title: Vert.x vs node.js simple HTTP benchmarks
created: 1336633297
author: ittayd
permalink: /vertx-vs-nodejs-simple-http-benchmarks
tags:
- JAVA
---
<p><a href="http://vertx.io/">vert.x </a>is an asynchronous server for web development similar to the model of node.js. you can write code in java, javascript, ruby or groovy.</p>
<p>&nbsp;</p>
<p>In the linked article, a micro benchmark is performed to compare vert.x to node.js. the test was done by the people behind vert.x.</p>
<p>&nbsp;</p>
<p>According to the test results, vert.x is twice faster than node.js, while offering a simpler model to utilize all cores as the JVM&nbsp;natively uses all cores while node.js requires a 'cluster' module to launch sub processes per-core.</p>
<p>&nbsp;</p>
<p>While microbenchmarks can always be misleading, it is an example that there's no reason to switch to a new ecosystem in order to gain performance. I&nbsp;also like the fact that vert.x supports both java and javascript. I'm not sure about the details, but is may suggest the ability for core business logic to be written in&nbsp;Java and interact with other libraries / frameworks, code that needs to run on both the server and client (e.g., validations) can be written in javascript.</p>

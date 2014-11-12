---
layout: post
title: Node.JS Best Practices And More - My Two Cents
created: 1410870505
author: dror
permalink: node-js-best-practices-and-more-my-two-cents
tags:
- JS
---
<p>During the last few months I&#39;ve been working mostly on Node.JS projects so I&#39;ve been reading and trying new things all the time.</p>

<p>Following a couple of blog posts that I&#39;ve read recently about Node.JS best practices and things you shouldn&#39;t do in Node.JS (links will follow soon) I wanted to add a couple of more points that I&#39;ve gathered along the way.</p>

<p>Node.JS best practices:&nbsp;<a href="http://blog.risingstack.com/node-js-best-practices/">http://blog.risingstack.com/node-js-best-practices/</a></p>

<p>7 things yout should stop doing in Node.JS: <a href="http://webapplog.com/seven-things-you-should-stop-doing-with-node-js/">http://webapplog.com/seven-things-you-should-stop-doing-with-node-js/</a>&nbsp;</p>

<p><strong>To &quot;Forever&quot; or not to &quot;Forever&quot;?</strong></p>

<p>There&#39;s a paradigm I&#39;ve noticed in Node.JS that the server should stay &quot;live&quot; forever, this in turn mean that critical error may be &quot;swallowed&quot; by a mehcnism like &quot;Forever&quot;. A nice different approcahes may be found here:</p>

<p>* Handle un-expected errors in your Node.JS server by letting it crush and then restarting it:&nbsp;<a href="http://shapeshed.com/uncaught-exceptions-in-node/">http://shapeshed.com/uncaught-exceptions-in-node/</a></p>

<p><strong>Child Process</strong></p>

<p>Node.JS runs on a single thread but there are ways to spawn some of it&#39;s activities into child processes. I recently developed an extention to the project I&#39;m working on that spawns all the network activities into a child process, thus, improving the overwhole efficiency of the server.</p>

<p>* Move tasks into child process:&nbsp;<a href="http://www.andygup.net/node-js-moving-intensive-tasks-to-a-child-process/">http://www.andygup.net/node-js-moving-intensive-tasks-to-a-child-process/</a></p>

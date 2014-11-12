---
layout: post
title: Spring AOP Proxy Self Access
created: 1291203151
author: zvika
permalink: /java/spring-aop-proxy-self-access
tags:
- JAVA
- Spring
---
<p>&nbsp;While reading &quot;AspectJ In Action, 2nd Ed&quot;, I ran across the following method of accessing an advised aop proxy from within the proxied class while still activating the aspect functionality:</p>
<p>&nbsp;</p>
<pre title="code" class="brush: java;">
AopContext.currentProxy()</pre>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>That's it. Barely worth a post, I know, but may come as great help if you ever used Spring's AOP Wrapping (transactions, caching, ...) and needed to make a self-bound call that should go through the AOP interceptors.</p>

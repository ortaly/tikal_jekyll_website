---
layout: post
title: Doing transactional work in Spring service using @PostConstruct method
created: 1248851131
author: zvika
permalink: /java/doing-transactional-work-spring-service-using-postconstruct-method
tags:
- JAVA
- Spring
---
<p>Apparently, the <strong>@PostConstruct</strong> idiom in Spring / JSE isn't that well defined: If you have a service class annotated with <strong>@Transactional</strong> and a method defined as <strong>@PostConstruct</strong> tries to do transactional work (calling on DAOs, for instance), it will fail due to non existing transaction in context, sad as true. </p>
<br />
<p>Yeah, you <em>could</em> add some <em>boolean init</em> member and check it on every invocation of every service method, perhaps even via an interceptor, but why not use a new annotation that causes a method to get called after the object is fully initialized? </p>
<p>&nbsp;</p>
<p>Well, high time to meet <strong>@PostInitialize</strong>. It'll do just that. Written by jbaruch, published on <a href="http://forum.springsource.org/showthread.php?p=252616#post252616">Spring forums</a> and patched by yours truely:</p>
<p>&nbsp;</p>
<p>http://forum.springsource.org/showthread.php?p=252616#post252616</p>
<p>&nbsp;</p>

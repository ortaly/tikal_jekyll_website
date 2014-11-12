---
layout: post
title: Asynchronous Servlets – Jetty continuation
created: 1282575670
permalink: asynchronous-servlets-jetty-continuation
tags:
- JAVA
- JettyContinuation
- Asynchronous Servlets
- Scala
---
<p>Here are 2 useful links which explain this feature and have some examples:<br />
http://wiki.eclipse.org/Jetty/Feature/Continuations<br />
http://docs.codehaus.org/display/JETTY/Continuations : see How it works section.</p>
<p>I use the eclipse version org.eclipse.jetty --&gt; jetty-continuation in one of my client's projects and find it a very useful, powerful and reliable.</p>
<p>You can manage: timeouts, suspending a request, completing implementations, resuming a request, initial phase, adding continuation listeners or just handling the requests in a simple servlet without listeners and only by checking isComplete,isInitial etc...</p>

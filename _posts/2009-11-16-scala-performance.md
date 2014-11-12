---
layout: post
title: 'scala performance '
created: 1258359530
author: ittayd
permalink: /java/scala-performance
tags:
- JAVA
- jvm scala performance
- Scala
---
<p>Since version 6 update 14, the JVM has a feature called escape analysis: http://java.sun.com/javase/6/webnotes/6u14.html#hotspot14.0-G1-6u14. If the JVM sees that an object is created just for the scope of a single method (e.g., StringBuilder), it can decide not to create it and instead use the fields as local variables.</p>
<p>&nbsp;</p>
<p>This is good for Java, but especially for Scala, since many of Scala's features are implemented by creating wrapper objects (implicit conversions, call-by-name). Performance improves from 11% (http://blog.juma.me.uk/2008/12/17/objects-with-no-allocation-overhead/). Some people suggest a 25% improvement in performance</p>

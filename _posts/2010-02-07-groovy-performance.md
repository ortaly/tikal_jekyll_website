---
layout: post
title: groovy++ performance
created: 1265572950
author: ittayd
permalink: /java/groovy-performance
tags:
- JAVA
- Groovy
---
<p><a href="http://stronglytypedblog.blogspot.com/2010/02/java-vs-scala-vs-groovy-vs-groovy.html">http://stronglytypedblog.blogspot.com/2010/02/java-vs-scala-vs-groovy-vs-groovy.html</a></p>
<p>&nbsp;</p>
<p>The blog post compares the performance of quicksort implemented in Java, Scala, Groovy and Groovy++.&nbsp;</p>
<p>&nbsp;</p>
<p>(Groovy++ is an effort to create a statically typed variant of Groovy, so that dynamic and static programming can be mixed).</p>
<p>&nbsp;</p>
<p>Bottom line: Scala and Java compare in performance, Groovy is 512 times slower and Groovy++ is only 42 times slower. This is obviously just a micro-benchmark, but I don't see how manipulating any other sort of data will make the difference in performance smaller.&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;Update: It turns out that using the shift operator instead of division dramatically improves groovy++ performance:&nbsp;<span class="Apple-style-span" style="line-height: 19px; font-size: 12px; "><a href="http://stronglytypedblog.blogspot.com/2010/02/groovy-performance-now-were-talkin.html">http://stronglytypedblog.blogspot.com/2010/02/groovy-performance-now-were-talkin.html</a>. bottom line, groovy++ is only 50% slower than Java/Scala after this improvement. &nbsp;Looks promising!, although I hate the idea that choosing the wrong way of implementing a line of code can cause performance to degrade so significantly.&nbsp;</span></p>

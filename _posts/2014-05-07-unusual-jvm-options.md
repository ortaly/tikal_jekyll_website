---
layout: post
title: Unusual JVM options
created: 1399472019
author: andrew
permalink: unusual-jvm-options
tags:
- JAVA
- java JVM performance tuning
---
<p>How many JVM options did you use ever? If you run &quot;java&quot; without arguments, it will show you a couple of dozens of command line options. But even some very&nbsp;popular options, like -Xmx are not listed there. Let me introduce you to a magic command which can&nbsp;surprise you. Run this ...</p>

<p>$ java -XX:+AggressiveOpts -XX:+UnlockDiagnosticVMOptions -XX:+UnlockExperimentalVMOptions -XX:+PrintFlagsFinal</p>

<p>... and you will see about 800 options, most of which you probably never heard about. I found this command, trying to control the behaviour of &quot;java.lang.OutOfMemoryError: GC overhead limit exceeded&quot; exception. Oracle documentation states, that it is thrown when GC takes 98% of time and frees only 2% of memory. I wanted to kill the process earlier, and to use&nbsp;-XX:+HeapDumpOnOutOfMemoryError to investigate the situation. So the full list revealed&nbsp;GCTimeLimit and&nbsp;GCHeapFreeLimit, for example.</p>

<p>I also found the following blog post with some descriptions of exotic options:&nbsp;<a href="http://stas-blogspot.blogspot.co.il/2011/07/most-complete-list-of-xx-options-for.html">http://stas-blogspot.blogspot.co.il/2011/07/most-complete-list-of-xx-options-for.html</a>. Of course, it is still a good idea to check what your JVM supports, using the command that I have shown earlier.</p>

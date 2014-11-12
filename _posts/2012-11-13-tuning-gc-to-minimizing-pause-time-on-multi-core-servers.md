---
layout: post
title: Tuning GC to minimizing pause time on multi-core servers
created: 1352813144
author: admin
permalink: /tuning-gc-minimizing-pause-time-multi-core-servers
tags:
- Incubator
- first-tag
---
<p>Parallel GC is not the default settings of the HotSpot JVM, if you don&#39;t use parallel GC, the system will not scale well on multiple CPU cores.</p>
<p>You can optimize for throughput or for response time.</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>Parallel GC is not the default settings of the HotSpot JVM, if you don&#39;t use parallel GC, the system will not scale well on multiple CPU cores.</p>
<p>You can optimize for throughput or for response time.</p>
<p>If you are running high-end servers with SLAs on response time, you have to avoid GC stop-the-world pauses, by passing those flags to the JVM: -XX:+UseParNewGC -XX:+UseConcMarkSweepGC -XX:+CMSIncrementalMode -XX:+CMSIncrementalPacing -XX:+CMSParallelRemarkEnabled -XX:+CMSPermGenSweepingEnabled -XX:+CMSClassUnloadingEnabled -XX:+DisableExplicitGC</p>
<p>references: <a href="http://java.sun.com/docs/hotspot/gc5.0/gc_tuning_5.html" title="http://java.sun.com/docs/hotspot/gc5.0/gc_tuning_5.html">http://java.sun.com/docs/hotspot/gc5.0/gc_tuning_5.html</a> <a href="http://www.ibm.com/developerworks/java/library/j-jtp11253/" title="http://www.ibm.com/developerworks/java/library/j-jtp11253/">http://www.ibm.com/developerworks/java/library/j-jtp11253/</a> <a href="http://www.ja-sig.org/wiki/display/UPC/uPortal+Heap+Tuning" title="http://www.ja-sig.org/wiki/display/UPC/uPortal+Heap+Tuning">http://www.ja-sig.org/wiki/display/UPC/uPortal+Heap+Tuning</a></p>
<p>&nbsp;</p>
<p>&nbsp;</p>

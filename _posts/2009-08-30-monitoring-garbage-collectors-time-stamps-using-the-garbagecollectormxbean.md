---
layout: post
title: Monitoring Garbage Collector's time stamps using the GarbageCollectorMXBean
created: 1251640286
author: elad
permalink: /java/monitoring-garbage-collectors-time-stamps-using-garbagecollectormxbean
tags:
- JAVA
- Garbage Collector
- MXBean
---
<p><span id="1251639677609S" style="display: none;">&nbsp;</span></p>
<div>This post shows how to print to the GC log a summary of minor and full garbage collections:</div>
<div><a href="http://robertmaldon.blogspot.com/2007/09/more-human-friendly-java-gc-timestamps.html ">http://robertmaldon.blogspot.com/2007/09/more-human-friendly-java-gc-timestamps.html</a></div>
<div>&nbsp;</div>
<div>It's done by creating a thread that uses the <a href="http://java.sun.com/j2se/1.5.0/docs/api/java/lang/management/GarbageCollectorMXBean.html">GarbageCollectorMXBean.</a></div>
<div>The result of this thread is printing to the GC log (each pre-defined time) a summary of the minor and full collections that were performed in that time.</div>
<div>&nbsp;</div>
<div>For example, the following line:</div>
<div>
<div><em>2007-09-28 17:03:59,037 [84.80] Minor GC x 6, 22 millisecs</em></div>
</div>
<div>represents 6 minor collections that took 22 milliseconds.</div>
<p>&nbsp;</p>
<p><span id="1251639677635E" style="display: none;">&nbsp;</span></p>
<p>&nbsp;</p>

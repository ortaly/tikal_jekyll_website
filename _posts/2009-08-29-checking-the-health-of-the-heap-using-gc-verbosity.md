---
layout: post
title: Checking the health of the heap using GC verbosity
created: 1251544703
author: elad
permalink: /java/checking-health-heap-using-gc-verbosity
tags:
- JAVA
- young generation
- tenured
- old generation
- GC
- Garbage Collection
---
<p><span id="1293620841035S" style="display: none;">&nbsp;</span></p>
<div><span id="1293620512509S" style="display: none;">&nbsp;</span><span id="1293619942702S" style="display: none;">&nbsp;</span></div>
<div>In order to check the health of the heap, we can read the garbage collections logs.</div>
<div>&nbsp;</div>
<div>this can be done by adding the following start-up options to the JVM:</div>
<div>-verbose:gc -Xlogger:gc.log -XX:+PrintGCDetails</div>
<div>&nbsp;</div>
<div>there are two interesting issues to learn from this output regarding the GC process which I'll show in this post:</div>
<div>1) how much time the GC takes</div>
<div>2) how much bytes were tenured (moved from the young generation to the old generation after the GC)</div>
<div>&nbsp;</div>
<div>Here's one log entry that describing a minor GC, and I'll explain its structure:</div>
<div>&nbsp;</div>
<div><strong>11.970: [GC 11.970: [DefNew: 93248K-&gt;4863K(104896K), 0.0289958 secs] 98507K-&gt;10122K(1036992K), 0.0290992 secs]<br />
</strong></div>
<div>&nbsp;</div>
<p>1. let's start with the DefNew (which is the young generation):</p>
<div>[DefNew: <strong>93248</strong>K-&gt;<strong>4863</strong>K(<strong>104896</strong>K), 0.0289958 secs]<strong> </strong></div>
<div>DefNew space - the entire young generation (Eden, From, To).</div>
<div>its capacity before the GC was 93248K.</div>
<div>its capacity after the GC is 4863K.</div>
<div>its total (maximal) capacity is 104896K.<br />
the young generation shrank from 93248K to 4863Kb in 0.0289958 secs.<br />
&nbsp;</div>
<p>2. and now we'll go to the entire heap:</p>
<div><strong>98507</strong>K-&gt;<strong>10122</strong>K(<strong>1036992</strong>K), 0.0290992 secs]<br />
the entire used heap (young + old generations) changed from 98507K to 10122K, from a total available heap of 1036992K.<br />
&nbsp;</div>
<div>3. calculate the number of bytes that were tenured as a result of this GC<br />
the entire heap size before the GC was 98507K, of which the young generation occupied 93248K.<br />
this means the old generation occupied the remaining 5259K.<br />
after the GC, the entire heap size was 10122K, of which the young generation occupied 4863K.<br />
this leaves 5259K to the old generation.<br />
&nbsp;</div>
<div>therefore, no data was tenured as a result of this GC, because the capacity of the old generation before and after the GC remains the same.</div>
<div>this means that no bytes were moved from the young generation to the old generation.</div>
<p><span id="1293619942035E" style="display: none;"> </span><span id="1293620512827E" style="display: none;">&nbsp;</span></p>
<p>&nbsp;</p>
<p><span id="1293620841247E" style="display: none;">&nbsp;</span></p>
<p>&nbsp;</p>

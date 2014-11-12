---
layout: post
title: 'Garbage Collection: Serial vs. Parallel vs. Concurrent-Mark-Sweep'
created: 1264606805
author: elad
permalink: /java/garbage-collection-serial-vs-parallel-vs-concurrent-mark-sweep
tags:
- JAVA
- Garbage Collection
- GC
- parallel
- CMS
- Concurrent-Mark-Sweep
---
<p><span id="1264605690078S" style="display: none;">&nbsp;</span></p>
<div>what's the difference between the serial, parallel and CMS (Concurrent-Mark-Sweep) collectors?</div>
<div>&nbsp;</div>
<div>first of all, let's take a look which collectors operate on the young generation and which on the tenured (old) generation:</div>
<div>&nbsp;</div>
<ul>
    <li>the following collectors operate on the young generation:</li>
</ul>
<div>-XX:+UseSerialGC<br />
-XX:+UseParallelGC<br />
-XX:+UseParNewGC</div>
<div>&nbsp;</div>
<ul>
    <li><u> </u>the following collectors operate on the old generation:</li>
</ul>
<div>-XX:+UseParallelOldGC<br />
-XX:+UseConcMarkSweepGC</div>
<div>&nbsp;</div>
<ul>
    <li>what's the difference between the Serial and the Parallel collector?</li>
</ul>
<div>both the serial and parallel collectors cause a stop-the-world during the GC.<br />
so what's the difference between them?<br />
a serial collector is a default copying collector which uses only one GC thread for the GC operation, while a parallel collector uses multiple GC threads for the GC operation.</div>
<div>&nbsp;</div>
<ul>
    <li>what's the difference between the Parallel and the CMS collector?</li>
</ul>
<div>the CMS performs the following steps (all made by only one GC thread):<br />
- initial mark<br />
- concurrent marking<br />
- remark<br />
- concurrent sweeping</div>
<div>&nbsp;</div>
<p>there are two differences between a parallel and a CMS collectors:</p>
<div>1) the parallel uses multiple GC threads, while the CMS uses only one.<br />
2) the parallel is a 'stop-the-world' collector, while the CMS stops the world only during the initial mark and remark phases.<br />
during the concurrent marking and sweeping phases, the CMS thread runs along with the application's threads.</div>
<div>&nbsp;</div>
<ul>
    <li>if you wish to combine both parallelism and concurrency in your GC, you can use the following:</li>
</ul>
<div>-XX:UserParNewGC for the new generation (multiple GC threads)<br />
-XX:+UseConcMarkSweepGC for the old generation (one GC thread, freezes the JVM only during the initial mark and remark phases)</div>
<p>&nbsp;</p>

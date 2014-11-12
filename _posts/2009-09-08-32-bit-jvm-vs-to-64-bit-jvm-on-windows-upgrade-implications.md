---
layout: post
title: 32-bit JVM vs. to 64-bit JVM on Windows - upgrade implications
created: 1252401705
author: elad
permalink: /java/32-bit-jvm-vs-64-bit-jvm-windows-upgrade-implications
tags:
- JAVA
- upgrade to 64-bit
- 64-bit JVM
- 32-bit JVM
---
This post discusses the reasons for moving to 64-bit VM and the performance characteristics of 64-bit machine vs. 32-bit VMs<br />
It's based on the HotSpot VM FAQ (http://java.sun.com/developer/technicalArticles/Programming/HPROF.html) .<br />
<br />
On a 32-bit Windows systems, the maximum heap size per Java VM process ranges between 1.5 to 1.6 GB (in practice).<br />
You can see the explanation here: 32-bit Windows and JVM virtual memory limit (http://sinewalker.wordpress.com/2007/03/04/32-bit-windows-and-jvm-virtual-memory-limit/)<br />
<br />
If your application requires a larger heap, you should use a 64-bit VM. The primary advantage of running Java in a 64-bit environment is the larger address space.<br />
This allows for a larger Java heap size and an increased maximum number of Java Threads.<br />
It's important to note that 64-bit implementation doesn't mean that that built-in Java types (such as integers) are doubled in size from 32 to 64.<br />
<br />
However, addressing larger amounts of memory come with a small performance loss in 64-bit VMs (compared to a 32-bit VM) because every reference takes 8 bytes instead of 4.<br />
Loading these extra 4 bytes per reference impacts the memory usage, which causes slightly slower execution (depending on how many pointers get loaded during the Java program's execution).<br />
<br />
64-bit Java implementation enables to create and use more Java objects, thus breaking the 1.5-1.6 GB heap limit we have in 32 bit.<br />
However, this additional heap must be garbage collected at various points in your application's life span.<br />
This additional GC can cause large pauses in your Java application if you don't take this into consideration.<br />
<br />
The Hotspot VM has a number of GC implementations which are targeted at Java applications with large heaps.<br />
Sun recommends to enable either the Parallel or Concurrent garbage collectors when running with heaps larger than 2 GB.<br />
<br />
These collectors attempt to minimize the overhead of collection time by either of the following:<br />
-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; collecting garbage concurrent with the execution of your Java application<br />
-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; utilizing multiple CPUs during collections

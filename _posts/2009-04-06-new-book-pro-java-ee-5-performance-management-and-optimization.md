---
layout: post
title: 'New Book: Pro Java EE 5 Performance Management and Optimization'
created: 1239030558
author: peterk
permalink: /java/new-book-pro-java-ee-5-performance-management-and-optimization
tags:
- JAVA
---
<HTML>
<HEAD>
	<META HTTP-EQUIV="CONTENT-TYPE" CONTENT="text/html; charset=utf-8">
	<TITLE></TITLE>
	<META NAME="GENERATOR" CONTENT="OpenOffice.org 3.0  (Linux)">
	<META NAME="CREATED" CONTENT="20090824;12033800">
	<META NAME="CHANGED" CONTENT="20090824;12101300">
	<STYLE TYPE="text/css">
	<!--
		@page { margin: 0.79in }
		P { margin-bottom: 0.08in }
	-->
	</STYLE>
</HEAD>
<BODY LANG="en-US" DIR="LTR">
<P>Ok, here we go, nobody is interested in the garbage collection,
who, for the Pointer sake, needs that GC?</P>
<P>&nbsp;That is the question.</P>
<P>That was pretty much my mode and mood when I started a new book of
Steven Haines “Pro Java EE 5 Performance Management and
Optimization”.</P>
<P><STRONG>And reality p u n c h e d !&nbsp; me right in my face dear
buddies…</STRONG></P>
<P>It occurred, that default GC parameters are never, almost never
set up right and optimal in enterprise large boxes! It is also
occurred, that 80% gain in performance may be reached by tuning of 3
simple VM start parameters. But what punched me more than anything
else is a complete (you have no idea, <STRONG>HOW COMPLETE</STRONG>)
difference between SUN VM and IBM VM (you may be not aware yet, but
Websphere is kinda on square wheels…).</P>
<P>More concrete : IBM VM is not &quot;generations&quot; based, like
Sun's one. It's different entirely.</P>
<P>So here are several practical tips for starter, for the rest of
things, please address the book:</P>
<OL TYPE=A>
	<LI><P>It is nice to monitor your GC from time to time, the VM
	argument for that is: -verbose:gc<BR>There are a lot of additional
	parameters that allow you set up a log with different levels of
	severity. This log is very helpful!!!</P>
	<LI><P>Once you have “Full GC” time very long in your logs, you
	should be alerted, during that period system literally sucks:
	nothing is moving. Start your tuning there.</P>
	<LI><P>The close to best parameters of SUN VM . (this may vary and
	depend on concrete case, but in general) (Suppose you have the
	ability with your concrete hardware architecture and OS to provide
	1024 Mb for the java process – that is the Windows on 32 bit
	wheels case):<BR>Your almost optimal GC parameters are:<BR>-Xmx<STRONG>1024</STRONG>m
	–Xms<STRONG>1024</STRONG>M –XX:MaxNewSize=448m –XX:NewSize=448m
	–XX:SurvivorRatio=6.<BR>Why? Details are in the book, but in
	general you better initialize your entire heap from the beginning
	and make an Eden/SurvivorSpace ratio==8, that is why
	SurvivorRatio=6! Why 6??!!! For the pointer sake, I just said 8!
	Because Survivor space in GC has actually 2 sub spaces. 2+6 makes
	it. :) Do not mind a little mathematical gap :)</P>
	<P>Last thing: Eden size must be less than half of Xmx!( 448m thing)</P>

<P>	You yet not terrified enough? &nbsp;OK, here it comes:</P>
<P>	IBM VM will crash very frequently with such perfect and “optimal
configuration”!!!</P>
<P STYLE="margin-bottom: 0in">	IBM should never be with equal Xmx and
Xms! Otherwise it will start GC only when 	maximum heap is reached.
That is what most CEOs see in their very bad dreams!<BR>	Xms should
be estimated like a space that application occupies, when started
(Not yet work on 	full speed).</P>
</OL>
<OL TYPE=A START=4>
	<LI><P>On IBM you have no choice but have good maximum heap. If your
	system most of the time on more than 70% of full memory capacity,
	you have to increase maximum. Practical advice: buy a 64bit monster
	and install a Penguin. Some finer tuning may bring you to ideal 70%
	load all the time.<BR><BR>Now to real life:</P>
	<LI><P>It helps! Really! I had an experiment in my Websphere
	overloaded and it gave me like 20% gain in
	CPU time. I assume it is because of GC improved, at least I had not
	changed anything else.&nbsp;</P>
	<P></P>
</OL>
<P><BR><BR>
</P>
</BODY>
</HTML>

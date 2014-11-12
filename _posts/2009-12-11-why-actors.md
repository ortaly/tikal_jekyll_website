---
layout: post
title: Why actors?
created: 1260562232
author: ittayd
permalink: /java/why-actors
tags:
- JAVA
- Actors
---
<p>
<meta http-equiv="CONTENT-TYPE" content="text/html; charset=utf-8">
<meta name="GENERATOR" content="OpenOffice.org 3.1  (Linux)"> 	<style type="text/css">
	<!--
		@page { margin: 0.79in }
		P { margin-bottom: 0.08in }
		A:link { so-language: zxx }
	-->
	</style>   </meta>
</meta>
</p>
<p style="margin-bottom: 0in;">The actors model is a programming model that makes it easy to reason about highly concurrent applications. It occurred to me that I've never read an article that explains why this model is better than the traditional model of threads and locks. So I thought I'd write my opinion on this.</p>
<p style="margin-bottom: 0in;">&nbsp;</p>
<p style="margin-bottom: 0in;">First, actors are an abstraction. At the end, code is run on a traditional CPU and OS and so it uses threads and locks. Actors just let us, the developers, forget about these details, like OO where objects don't really exist at the machine level.</p>
<p style="margin-bottom: 0in;">&nbsp;</p>
<p style="margin-bottom: 0in;">I want to present my thoughts in the form of an evolution of an architecture. Beginning with a traditional way of programming.</p>
<p style="margin-bottom: 0in;">&nbsp;</p>
<p style="margin-bottom: 0in;">We have an object with some data structure to store information. Since the object may be used by different threads, the first thing to do <span style="background: transparent none repeat scroll 0% 0%; -moz-background-clip: border; -moz-background-origin: padding; -moz-background-inline-policy: continuous;">is to use</span> a synchronized data structure. Now, if we have several data members that are manipulated, then we need to synchronize the whole object. We may try to make synchronization only when required. The problem is that this is error prone and it is hard to create scenarios that expose the bugs.</p>
<p style="margin-bottom: 0in;">&nbsp;</p>
<p style="margin-bottom: 0in;">An approach that lets us to quickly develop the features we want <span style="background: transparent none repeat scroll 0% 0%; -moz-background-clip: border; -moz-background-origin: padding; -moz-background-inline-policy: continuous;">is to make all methods of the object synchronized (lock on the object)</span>. Then, the next level is a subsystem where an operation involves several objects. As before, we need a single entry point that is synchronized. So we create a facade for the subsystem. When we do that we need to also make sure none of the objects that are modified by the subsystem are shared by other subsystems. Since if there are such objects, they will be modified without going through our facade.</p>
<p style="margin-bottom: 0in;">&nbsp;</p>
<p style="margin-bottom: 0in;">So far, so well. But lets consider more complex scenarios. Imagine subsystem A wants to call a method from the facade of subsystem B. Using a straight method call might not be good. The reason is that subsystem B is in itself concurrent and so not all operations are synchronous. Or maybe we want a thread pool. One option is to return a <a href="http://java.sun.com/j2se/1.5.0/docs/api/java/util/concurrent/Future.html">Future</a> for the result. The problem here is that to get the value of the future the caller must use either locks or check several times until a result is ready. In the first case, this means the caller's thread is locked, which negates uses of thread pools. In the second, it is hard to come up with a solution that frees the thread (not a busy loop).</p>
<p style="margin-bottom: 0in;">&nbsp;</p>
<p style="margin-bottom: 0in;">Another approach then is to ask subsystem B to call a method of subsystem A when there is a result. This is all fine, but who guarantees no other subsystem will call any of subsystem A's method while it waits for the result.</p>
<p style="margin-bottom: 0in;">&nbsp;</p>
<p style="margin-bottom: 0in;">Such scenarios become more and more complex as the number of subsystems grow.</p>
<p style="margin-bottom: 0in;">&nbsp;</p>
<p style="margin-bottom: 0in;">Enter actors. An actor is a facade to a subsystem that works not through method invocation, but by listening to incoming messages. An actor only handles one message at a time. An important aspect of actors is that the actor does not have to handle messages via the order they arrived. Instead, an actor works in a loop (usually) and in each iteration selects the messages to receive. Other messages just wait (in what is called a mailbox) until the actor decides to receive them.</p>
<p style="margin-bottom: 0in;">&nbsp;</p>
<p style="margin-bottom: 0in;">So how do we solve the scenario of receiving result from subsystem B? In pseudo code, this looks like:</p>
<p style="margin-bottom: 0in;"><i>	loop { </i></p>
<p style="margin-bottom: 0in;"><i>&nbsp;&nbsp;&nbsp;		wait on messages</i></p>
<p style="margin-bottom: 0in;"><i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; message arrived that requires contacting B</i></p>
<p style="margin-bottom: 0in;"><i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; do some work</i></p>
<p style="margin-bottom: 0in;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <i>send message to B</i></p>
<p style="margin-bottom: 0in;"><i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; wait for return message from B</i></p>
<p style="margin-bottom: 0in;"><i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; finish work</i></p>
<p style="margin-bottom: 0in;"><i>	}</i></p>
<p style="margin-bottom: 0in;">&nbsp;</p>
<p style="margin-bottom: 0in; font-style: normal;">While waiting for a return message from B, any other message that is received just waits in the mailbox. Of course, we assume the result from B arrives quickly enough. If that is not the case, then a solution can be:</p>
<p style="margin-bottom: 0in; font-style: normal;"><i>loop {</i></p>
<p style="margin-bottom: 0in;"><i>&nbsp;&nbsp;		wait on messages</i></p>
<p style="margin-bottom: 0in;"><i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; message arrived that requires contacting B</i></p>
<p style="margin-bottom: 0in;"><i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; do some work</i></p>
<p style="margin-bottom: 0in;"><i>&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; package partial result in object P</i></p>
<p style="margin-bottom: 0in;"><i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; send message M(P) to B. B will return the result with P</i></p>
<p style="margin-bottom: 0in;"><i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; message with result and P arrives</i></p>
<p style="margin-bottom: 0in;"><i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; finish work</i></p>
<p style="margin-bottom: 0in;"><i>	}</i></p>
<p style="margin-bottom: 0in;">&nbsp;</p>
<p style="margin-bottom: 0in; font-style: normal;">In this case, the actor continues to receive messages and finishes work one the result from B arrives.</p>
<p style="margin-bottom: 0in; font-style: normal;">&nbsp;</p>
<p style="margin-bottom: 0in; font-style: normal;">I hope I have convinced you that the actor model allows to more easily write concurrent applications. Of course, thread/lock based application can also work and may even be more efficient, but the time it will take to write it (and debug) will be much longer (meaning, some features will be dropped) and hidden races will more likely be there on release.</p>
<p style="margin-bottom: 0in; font-style: normal;">&nbsp;</p>
<p style="margin-bottom: 0in; font-style: normal;">Actors provide more benefits:</p>
<ul>
    <li>
    <p style="margin-bottom: 0in;"><span style="font-style: normal;">Actors 	do not control the thread in which they execute and so it is easy to 	use them with thread pools. This means better control over 	utilization of system resources and avoiding thrashing and on the 	other hand the ability to make some subsystem more prioritized than 	others</span></p>
    </li>
    <li>
    <p style="margin-bottom: 0in;"><span style="font-style: normal;">Once 	each subsystem is presented with an actor, it is easy to detect when 	unrecoverable errors (uncought exceptions) occur.  Other actors can 	then be notified and take action (e.g., restart the subsystem).</span></p>
    </li>
</ul>
<ul>
    <li>
    <p style="margin-bottom: 0in;"><span style="font-style: normal;">Since 	communication is by message passing, actors need not be in the same 	application space. An application using actors can put them on 	different machines, sending messages over the network. This means 	creating a distributed, fault tolerant system is easier.</span></p>
    </li>
</ul>
<p style="margin-bottom: 0in;"><i>			</i></p>
<p style="margin-bottom: 0in;"><i>		</i></p>
<p>&nbsp;</p>

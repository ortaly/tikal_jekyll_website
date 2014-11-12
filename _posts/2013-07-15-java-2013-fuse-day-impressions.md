---
layout: post
title: Java 2013 fuse day Impressions
created: 1373874266
author: lior.perry
permalink: java-2013-fuse-day-impressions
tags:
- JAVA
- Akka
---
<h1 dir="LTR">
	Java 2013 fuse day Impressions<span dir="RTL">:</span></h1>
<p dir="LTR">&nbsp;</p>
<p dir="LTR">During the fuse day our java group was learning to use Akka framework for creating a multiplayer snake online game</p>
<p dir="LTR">Prior to selecting akka as the main study feature of this fuse day I&#39;ve given a short lecture about the concepts of Actor-based solution to concurrency development<span dir="RTL">.</span></p>
<p dir="LTR">What is Akka ?!</p>
<p dir="LTR">Well &nbsp;- akka aims to be the platform for the next-generation, event-driven, scalable, and fault-tolerant architectures on the JVM<span dir="RTL">.</span></p>
<p dir="LTR">Akka in a nutshell</p>
<p dir="LTR">One of the core features of Akka is an implementation of the Actor model. It alleviates the developer from having to deal with explicit locking and thread management. Using the Actor model raises the abstraction level and provides a better platform for building correct concurrent and scalable applications<span dir="RTL">.</span></p>
<h2 dir="LTR">
	&nbsp;</h2>
<h2 dir="LTR">
	Actors in akka<span dir="RTL">:</span></h2>
<p dir="LTR">&nbsp;</p>
<h4 dir="LTR">
	Actors<span dir="RTL">:</span></h4>
<p dir="LTR" style="margin-left:.25in;">&middot;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Simple and high-level abstractions for concurrency and parallelism<span dir="RTL">.</span></p>
<p dir="LTR" style="margin-left:.25in;">&middot;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Asynchronous, non-blocking and highly performant event-driven programming model<span dir="RTL">.</span></p>
<p dir="LTR" style="margin-left:.25in;">&middot;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Very lightweight event-driven processes (approximately 2.7 million actors per GB RAM<span dir="RTL">).</span></p>
<p dir="LTR">&nbsp;</p>
<h4 dir="LTR">
	Fault Tolerance:</h4>
<p dir="LTR" style="margin-left:.25in;">&middot;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Supervisor hierarchies with &quot;let-it-crash&quot; semantics (parent actor supervising child actors<span dir="RTL">(</span>.</p>
<p dir="LTR" style="margin-left:.25in;">&middot;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Supervisor hierarchies can span over multiple JVMs to provide truly fault-tolerant systems<span dir="RTL">.</span></p>
<p dir="LTR" style="margin-left:.25in;">&middot;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Excellent for writing highly fault-tolerant systems that self-heal and never stop<span dir="RTL">.</span></p>
<p dir="LTR">&nbsp;</p>
<h4 dir="LTR">
	Location Transparency:</h4>
<p dir="LTR" style="margin-left:.25in;">&middot;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Everything in Akka is designed to work in a distributed environment: all interactions between actors use pure message passing and everything is asynchronous<span dir="RTL">.</span></p>
<p dir="LTR">&nbsp;</p>
<p dir="LTR">Akka &amp; Scala</p>
<p dir="LTR">Akka was developed in scala &amp; has a java counterpart API for the non-scala developers, the Java API covers most of the akka features<span dir="RTL">.</span></p>
<p dir="LTR">&nbsp;</p>
<p dir="LTR">Fuse Day &amp; Team preparations</p>
<p dir="LTR">Learning Curve</p>
<p dir="LTR">Since learning both akka &amp; scala in a single day is not feasible we decided to concentrate on akka main features with java<span dir="RTL">.</span></p>
<p dir="LTR">To make the day efficient and productive I&#39;ve prepared a maven based working skeleton for facilitate the java-akka server side .</p>
<p dir="LTR">See git-hub repository https://github.com/tikalk/fuse-jun13-akka-java.git</p>
<p dir="LTR">&nbsp;</p>
<p dir="LTR">Our team was responsible for making the concurrent multiplayer code that would interact with the browser via Play-framework web-sockets and activate the scala based API to calculate positions<span dir="RTL">;</span></p>
<p dir="LTR">Game Architecture</p>
<p dir="LTR">The &quot;Game Architecture&quot; was as follows<span dir="RTL">:</span></p>
<p dir="LTR" style="margin-left:.5in;">Play framework was to send async messages to the root game actor<span dir="RTL">:</span></p>
<p dir="LTR" style="margin-left:.5in;"><span dir="RTL">&nbsp;&nbsp; ** </span>indicating&nbsp; user registration</p>
<p dir="LTR" style="margin-left:.5in;"><span dir="RTL">&nbsp;&nbsp; ** </span>start game</p>
<p dir="LTR" style="margin-left:.5in;"><span dir="RTL">&nbsp;&nbsp; ** </span>end&nbsp; game</p>
<p dir="LTR" style="margin-left:.5in;"><span dir="RTL">&nbsp;&nbsp; ** </span>user move request</p>
<p dir="LTR">&nbsp;</p>
<p dir="LTR">The server side actors:</p>
<p dir="LTR"><span dir="RTL">&nbsp;** </span>GameMaster - root actor parent of all actors holding the state of the game</p>
<p dir="LTR"><span dir="RTL">&nbsp;** </span>User - representing each concurrent user</p>
<p>&nbsp;</p>
<p dir="LTR">&nbsp;</p>
<p dir="LTR">The Heartbeat:</p>
<p dir="LTR">The snake game is time based and therefore we created a scheduler for ticking the game&#39;s heartbeat<span dir="RTL">.</span></p>
<p dir="LTR">On each heartbeat<span dir="RTL">:</span></p>
<p dir="LTR" style="margin-left:.5in;"><span dir="RTL">&nbsp; * </span>root actor:</p>
<p dir="LTR" style="margin-left:.5in;"><span dir="RTL">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ** </span>gathers the players move requests</p>
<p dir="LTR" style="margin-left:.5in;"><span dir="RTL">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ** </span>calls scala API for game board positions calculations</p>
<p dir="LTR" style="margin-left:.5in;"><span dir="RTL">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ** </span>callback the play for UI drawing for the web players</p>
<p dir="LTR">&nbsp;</p>
<p dir="LTR">We also have async events arriving from the players with move requests<span dir="RTL">;</span></p>
<p dir="LTR">On each player move request<span dir="RTL">:</span></p>
<p dir="LTR" style="margin-left:.5in;"><span dir="RTL">* </span>user actor<span dir="RTL">:</span></p>
<p dir="LTR" style="margin-left:.5in;"><span dir="RTL">&nbsp;&nbsp; ** </span>change internal state representing the last move request</p>
<p dir="LTR">&nbsp;</p>
<h2 dir="LTR">
	Akka Key components<span dir="RTL">:</span></h2>
<p dir="LTR">&nbsp;</p>
<p dir="LTR">The project consisted of the next main akka components<span dir="RTL">:</span></p>
<p dir="LTR">&nbsp; system-actor -&nbsp; responsible for managing actors</p>
<p dir="LTR">&nbsp; even-bus&nbsp; -&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; responsible for pub/sub communications between actors</p>
<p dir="LTR">&nbsp; scheduler -&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; responsible for heartbeat timing of the game</p>
<p dir="LTR">&nbsp;</p>
<p dir="LTR"><em>// init master and initial user-actors</em></p>
<p dir="LTR"><strong>public</strong> <strong>void</strong> <strong>init</strong><strong>()</strong> <strong>{</strong></p>
<p dir="LTR">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <em>// Create an Akka system</em></p>
<p dir="LTR">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; system <strong>=</strong> ActorSystem<strong>.</strong>create<strong>(</strong>&quot;SnakeGame&quot;<strong>);</strong></p>
<p dir="LTR">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <em>// system scheduler</em></p>
<p dir="LTR">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>final</strong> Scheduler scheduler <strong>=</strong> system<strong>.</strong>scheduler<strong>();</strong></p>
<p dir="LTR">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <em>// get event stream</em></p>
<p dir="LTR">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>final</strong> EventStream eventStream <strong>=</strong> system<strong>.</strong>eventStream<strong>();</strong></p>
<p dir="LTR">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; master <strong>=</strong> system<strong>.</strong>actorOf<strong>(new</strong> Props<strong>().</strong>withCreator<strong>((</strong>Creator<strong>)new</strong> GameMaster<strong>.</strong>MasterCreator<strong>(</strong>scheduler<strong>,</strong> eventStream<strong>,</strong> callback<strong>)),</strong> &quot;master&quot;<strong>);</strong></p>
<p dir="LTR">&nbsp;</p>
<p dir="LTR">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <em>// resigter event bus master messages</em></p>
<p dir="LTR">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; eventStream<strong>.</strong>subscribe<strong>(</strong>master<strong>,</strong> Register<strong>.</strong>class<strong>);</strong></p>
<p dir="LTR">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; eventStream<strong>.</strong>subscribe<strong>(</strong>master<strong>,</strong> StartGame<strong>.</strong>class<strong>);</strong></p>
<p dir="LTR">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; eventStream<strong>.</strong>subscribe<strong>(</strong>master<strong>,</strong> Tick<strong>.</strong>class<strong>);</strong></p>
<p dir="LTR"><strong>}</strong></p>
<p dir="LTR">&nbsp;</p>
<p dir="LTR"><em>This code shows the initiation of actor system and root actor creation</em></p>
<p dir="LTR">&nbsp;</p>
<p dir="LTR">&nbsp;</p>
<p dir="LTR">The next code shows the User actor receive call api<span dir="RTL">:</span></p>
<pre dir="LTR">
@Override</pre>
<pre dir="LTR">
<strong>public</strong> <strong>void</strong> <strong>onReceive</strong><strong>(</strong>Object message<strong>)</strong> <strong>throws</strong> Exception <strong>{</strong></pre>
<pre dir="LTR">
&nbsp;&nbsp;&nbsp;log<strong>.</strong>debug<strong>(</strong>&quot;user &quot; <strong>+</strong> getSelf<strong>().</strong>path<strong>()</strong> <strong>+</strong> &quot; receive message [&quot; <strong>+</strong> message <strong>+</strong> &quot;] &quot;<strong>);</strong></pre>
<pre dir="LTR">
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>if</strong> <strong>(</strong>message <strong>instanceof</strong> MoveSnake<strong>.</strong>Direction<strong>)</strong> <strong>{</strong></pre>
<pre dir="LTR">
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>this</strong><strong>.</strong>direction <strong>=</strong> <strong>(</strong>MoveSnake<strong>.</strong>Direction<strong>)</strong> message<strong>;</strong></pre>
<pre dir="LTR">
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>}</strong> <strong>else</strong> <strong>if</strong> <strong>(</strong>message <strong>instanceof</strong> GetSnakePosition<strong>)</strong> <strong>{</strong></pre>
<pre dir="LTR">
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; getSender<strong>().</strong>tell<strong>(</strong><strong>new</strong> SnakePosition<strong>(</strong>register<strong>,</strong>location<strong>,</strong>snakeLength<strong>,</strong>direction<strong>),</strong> getSelf<strong>());</strong></pre>
<pre dir="LTR">
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>}</strong> <strong>else</strong> <strong>if</strong> <strong>(</strong>message <strong>instanceof</strong> Terminated<strong>)</strong> <strong>{</strong></pre>
<pre dir="LTR">
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;getContext<strong>().</strong>stop<strong>(</strong>getSelf<strong>());</strong></pre>
<pre dir="LTR">
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;log<strong>.</strong>info<strong>(</strong>&quot;user &quot; <strong>+</strong> getSelf<strong>().</strong>path<strong>()</strong> <strong>+</strong> &quot; Terminated &quot;<strong>);</strong></pre>
<pre dir="LTR">
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>}</strong> <strong>else</strong> <strong>{</strong></pre>
<pre dir="LTR">
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;unhandled<strong>(</strong>message<strong>);</strong></pre>
<pre dir="LTR">
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>}</strong></pre>
<pre dir="LTR">
&nbsp;&nbsp;<strong>}</strong></pre>
<p dir="LTR">&nbsp;</p>
<p dir="LTR">In this example Its simple to see that the actor is changing his internal state or reacting to events<span dir="RTL">.</span></p>
<h4 dir="LTR">
	Akka Pub/Sub</h4>
<p dir="LTR">We also used akka&#39;s pub/sub api which is a simple form of multicast event to multiple subscribers based on selective message type registration<span dir="RTL">.</span></p>
<h4 dir="LTR">
	&nbsp;</h4>
<h4 dir="LTR">
	The Ask Pattern</h4>
<p dir="LTR">Another interesting feature we&#39;ve used in our game is the &quot;ask&quot; pattern; this pattern help us wait on multiple actors to respond for a specific request<span dir="RTL">:</span></p>
<pre dir="LTR">
Map<strong>&lt;</strong>Player<strong>,</strong> String<strong>&gt;</strong> moves <strong>=</strong> <strong>new</strong> HashMap<strong>&lt;</strong>Player<strong>,</strong> String<strong>&gt;();</strong></pre>
<pre dir="LTR">
<strong>for</strong> <strong>(</strong>ActorRef userActorRef <strong>:</strong> usersActorRefs<strong>)</strong> <strong>{</strong></pre>
<pre dir="LTR">
Timeout timeout <strong>=</strong> <strong>new</strong> Timeout<strong>(</strong>Duration<strong>.</strong>create<strong>(</strong>100<strong>,</strong> &nbsp;TimeUnit<strong>.</strong>MILLISECONDS<strong>));</strong></pre>
<pre dir="LTR">
Future<strong>&lt;</strong>Object<strong>&gt;</strong> future <strong>=</strong> Patterns<strong>.</strong>ask<strong>(</strong>userActorRef<strong>,</strong> <strong>new</strong> GetSnakePosition<strong>(),</strong> &nbsp;timeout<strong>);</strong></pre>
<pre dir="LTR">
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>try</strong> <strong>{</strong></pre>
<pre dir="LTR">
SnakePosition snakePosition <strong>=</strong> <strong>(</strong>SnakePosition<strong>)</strong> Await<strong>.</strong>result<strong>(</strong>future<strong>,</strong> timeout<strong>.</strong>duration<strong>());</strong></pre>
<pre dir="LTR">
moves<strong>.</strong>put<strong>(</strong><strong>new</strong> Player<strong>(</strong>snakePosition<strong>.</strong>getUser<strong>().</strong>getName<strong>()),</strong> snakePosition<strong>.</strong>getDirection<strong>().</strong>name<strong>());</strong></pre>
<pre dir="LTR">
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>}</strong> <strong>catch</strong> <strong>(</strong>Exception e<strong>)</strong> <strong>{</strong></pre>
<pre dir="LTR">
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; e<strong>.</strong>printStackTrace<strong>();</strong></pre>
<pre dir="LTR">
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>}</strong></pre>
<pre dir="LTR">
<strong>}</strong></pre>
<p dir="LTR">&nbsp;</p>
<p dir="LTR">In this example we create a &quot;blocking barrier&quot; on the actor&#39;s response so that we can aggregate their response to a single state - in this case our users game-board moves<span dir="RTL">.</span></p>
<h3 dir="LTR">
	&nbsp;</h3>
<h3 dir="LTR">
	During the Day</h3>
<p dir="LTR">First we started by a short review and introduction of the skeleton components and how/what we should attempt to achieve this day<span dir="RTL">; </span></p>
<p dir="LTR">Second we started running and playing around with akka&#39;s events and actor to get familiar with the code and ideas<span dir="RTL">.</span></p>
<p dir="LTR">Soon enough people stated coding and we completed our tasks, most of our issues concerned integrating with the other groups (Play &amp; Scala) and selecting implementation for the game&#39;s specific behavior<span dir="RTL">. </span></p>
<p dir="LTR">&nbsp;</p>
<h3 dir="LTR">
	In conclusion<span dir="RTL">:</span></h3>
<p dir="LTR" style="margin-left:.25in;">&middot;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; We showed that writing concurrent code is very simple using akka &amp; its actors model - once you get its concept</p>
<p dir="LTR" style="margin-left:.25in;">&middot;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Most of our application&#39;s use cases are well within akka&#39;s examples and patterns</p>
<p dir="LTR" style="margin-left:.25in;">&middot;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; We can use the code we&#39;ve created as a basis for future study and concurrent game platform development</p>
<p dir="LTR" style="margin-left:.25in;">&middot;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; It is important to continue studying additional concurrency development concepts (apart from the standard java threading) and do a full day course on akka</p>
<p dir="LTR">&nbsp;</p>
<p dir="LTR">&nbsp;Lior</p>

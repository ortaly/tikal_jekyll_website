---
layout: post
title: Comparing performance of Scala's standard actors with Akka
created: 1260600196
author: ittayd
permalink: /java/comparing-performance-scalas-standard-actors-akka
tags:
- JAVA
- Actors
- Scala
---
<p style="margin-bottom: 0in;">I wanted to compare the performance of Scala's standard <a href="http://www.scala-lang.org/node/242">actors</a> with that of <a href="http://wiki.github.com/jboner/akka">Akka</a>'s.</p>
<p style="margin-bottom: 0in;">&nbsp;</p>
<p style="margin-bottom: 0in;">UPDATE 13/12/09: Akka's performance has improved after I submitted my results to them. It is now 2-3 times faster than Scala's standard actors.</p>
<p style="margin-bottom: 0in;">&nbsp;</p>
<p style="margin-bottom: 0in;">To those unfamiliar with the concept of actors, it is a programming model where subsystems communicate via messages between actors and do not share state. Each subsystem handles one message at a time. This model simplifies developing concurrent systems since you no longer need to reason about threads and locks and also unifies local and remote computing.</p>
<p style="margin-bottom: 0in;">&nbsp;</p>
<p style="margin-bottom: 0in;">Scala's standard library provides a very powerful actor abstraction, using the power of the language. Akka's implementation has a more simplistic model that is supposed to be faster. Akka also provides mechanisms for transaction handling, supervision trees and more. I didn't need all of those, so the choice was based on the actors performance.</p>
<p style="margin-bottom: 0in;">&nbsp;</p>
<p style="margin-bottom: 0in;">I borrowed a test from <a href="http://shootout.alioth.debian.org/">http://shootout.alioth.debian.org/</a> . The tests simulates N animals (chameneos) where 2 random pairs meet in a mall, exchange colors and then go on to meet others M times. Obviously exchanging colors is not a very intensive task, so most processing goes on matching the animals and in the actor's case this means passing and receiving messages.</p>
<p style="margin-bottom: 0in;">&nbsp;</p>
<p style="margin-bottom: 0in;">If you'll go to the <a href="http://shootout.alioth.debian.org/u32q/benchmark.php?test=chameneosredux&amp;lang=all&amp;box=1">results</a> of the test in the shootout site, you'll see the best result is achieved by C/C++, Haskell, go, Java and Scala close behind. This is understandable, because for such a simple use case, the higher level of development efficiency provided by the various languages is not accounted for nor is debugging time taken to debug complex concurrency scenarios. However, the Scala implementation is not even actor based, it is a regular thread/lock based implementation. The actor based implementation is way behind, close to Erlang. Another interesting note is that dynamic languages fall behind the static typed languages.  Again, for me this doesn't mean much as such benchmarks cannot model real-life development.</p>
<p style="margin-bottom: 0in;">&nbsp;</p>
<p style="margin-bottom: 0in;">OK, after this short analysis, back to the subject. Since we chose Scala as our implementation language for its advanced features and the JVM ecosystem, my concern was comparing JVM based implementations. Out of the Java based implementations, <a href="http://kilim.malhar.net/">Kilim</a> stood out as doing something different than a simple OO implementation. Unfortunately, Kilim cannot be used with Scala (since it expects all involved objects to be annotated and programming in Scala means creating a lot of function objects behind the scenes). So I chose to focus on Scala based implementations since they use Scala's features to provide a more usable API.</p>
<p style="margin-bottom: 0in;">&nbsp;</p>
<p style="margin-bottom: 0in;">So I took one of the Scala implementations of the chameneos test (BTW, it is not one of those presented in the results page of the shootout site) and modified it to work with Akka's actors. Then I timed both with increasing number of meetings.</p>
<p style="margin-bottom: 0in;">&nbsp;</p>
<p style="margin-bottom: 0in;">Notes: I built with the -optimise flag and used the JVM flag -XX:+DoEscapeAnalysis. I ran the benchmarks twice to load any files to the buffer cache. The scale of the graph is logarithmic.</p>
<p style="margin-bottom: 0in;">&nbsp;</p>
<p style="margin-bottom: 0in;">&nbsp;</p>
<p>
<meta content="text/html; charset=utf-8" http-equiv="CONTENT-TYPE">
<meta content="OpenOffice.org 3.1  (Linux)" name="GENERATOR"> 	<style type="text/css">
		<!-- 
		BODY,DIV,TABLE,THEAD,TBODY,TFOOT,TR,TH,TD,P { font-family:"Arial"; font-size:x-small }
		 -->
	</style>
<table cols="3" cellspacing="0" border="0" rules="NONE" frame="VOID">
    <colgroup><col width="87" /><col width="87" /><col width="87" /></colgroup>
    <tbody>
        <tr>
            <td bgcolor="#cccccc" align="LEFT" width="87" height="18" style="border-right: 1px solid rgb(0, 0, 0); border-bottom: 1px solid rgb(0, 0, 0);">#</td>
            <td bgcolor="#cccccc" align="LEFT" width="87" style="border-bottom: 1px solid rgb(0, 0, 0);">scala</td>
            <td bgcolor="#cccccc" align="LEFT" width="87" style="border-bottom: 1px solid rgb(0, 0, 0);">akka</td>
        </tr>
        <tr>
            <td bgcolor="#cccccc" align="RIGHT" height="18" sdnum="1033;" sdval="1" style="border-right: 1px solid rgb(0, 0, 0);">1</td>
            <td align="RIGHT" sdnum="1033;" sdval="0.409">0.41</td>
            <td align="RIGHT" sdnum="1033;" sdval="0.877">0.88</td>
        </tr>
        <tr>
            <td bgcolor="#cccccc" align="RIGHT" height="18" sdnum="1033;" sdval="10" style="border-right: 1px solid rgb(0, 0, 0);">10</td>
            <td align="RIGHT" sdnum="1033;" sdval="0.438">0.44</td>
            <td align="RIGHT" sdnum="1033;" sdval="0.721">0.72</td>
        </tr>
        <tr>
            <td bgcolor="#cccccc" align="RIGHT" height="18" sdnum="1033;" sdval="100" style="border-right: 1px solid rgb(0, 0, 0);">100</td>
            <td align="RIGHT" sdnum="1033;" sdval="0.421">0.42</td>
            <td align="RIGHT" sdnum="1033;" sdval="0.866">0.87</td>
        </tr>
        <tr>
            <td bgcolor="#cccccc" align="RIGHT" height="18" sdnum="1033;" sdval="1000" style="border-right: 1px solid rgb(0, 0, 0);">1000</td>
            <td align="RIGHT" sdnum="1033;" sdval="0.631">0.63</td>
            <td align="RIGHT" sdnum="1033;" sdval="1.203">1.2</td>
        </tr>
        <tr>
            <td bgcolor="#cccccc" align="RIGHT" height="18" sdnum="1033;" sdval="10000" style="border-right: 1px solid rgb(0, 0, 0);">10000</td>
            <td align="RIGHT" sdnum="1033;" sdval="1.497">1.5</td>
            <td align="RIGHT" sdnum="1033;" sdval="2.243">2.24</td>
        </tr>
        <tr>
            <td bgcolor="#cccccc" align="RIGHT" height="18" sdnum="1033;" sdval="100000" style="border-right: 1px solid rgb(0, 0, 0);">100000</td>
            <td align="RIGHT" sdnum="1033;" sdval="2.367">2.37</td>
            <td align="RIGHT" sdnum="1033;" sdval="4.699">4.7</td>
        </tr>
        <tr>
            <td bgcolor="#cccccc" align="RIGHT" height="18" sdnum="1033;" sdval="1000000" style="border-right: 1px solid rgb(0, 0, 0);">1000000</td>
            <td align="RIGHT" sdnum="1033;" sdval="12.786">12.79</td>
            <td align="RIGHT" sdnum="1033;" sdval="34.355">34.36</td>
        </tr>
        <tr>
            <td bgcolor="#cccccc" align="RIGHT" height="18" sdnum="1033;" sdval="10000000" style="border-right: 1px solid rgb(0, 0, 0);">10000000</td>
            <td align="RIGHT" sdnum="1033;" sdval="104.339">104.34</td>
            <td align="RIGHT" sdnum="1033;" sdval="307.553">307.55</td>
        </tr>
    </tbody>
</table>
</meta>
</meta>
</p>
<p style="margin-bottom: 0in;">&nbsp;</p>
<p>&nbsp;</p>
<p>
<meta http-equiv="CONTENT-TYPE" content="text/html; charset=utf-8">
<meta name="GENERATOR" content="OpenOffice.org 3.1  (Linux)">                     </meta>
</meta>
</p>
<p style="margin-bottom: 0in;">&nbsp;</p>
<p style="margin-bottom: 0in;"><img width="344" height="272" alt="" src="/files/upload/14/bench_0.png" /></p>
<p style="margin-bottom: 0in;">&nbsp;</p>
<p style="margin-bottom: 0in;">Observations:</p>
<ul>
    <li>
    <p style="margin-bottom: 0in;">The Akka version came out more 	awkward. While Scala allows to use 'react' to receive messages in a 	very flexible way, Akka enforces one to implement a method for 	receiving messages. Things like sending a message then waiting for a 	response, are more awkward.</p>
    </li>
    <li>
    <p style="margin-bottom: 0in;">Don't trust hype. Akka prouds 	itself for being event based and so much more efficient, this is not 	true. Nor it's more restrictive model offer more efficiency (at 	least in the current implementation)</p>
    </li>
    <li>
    <p style="margin-bottom: 0in;">Both benchmarks utilized only one 	core. I assume this is because the actual work being done was so 	little that the kernel chose CPU affinity over multi-core.</p>
    </li>
</ul>
<p style="margin-bottom: 0in;">&nbsp;</p>
<p style="margin-bottom: 0in;">I've contacted Akka's creator with these results. Will update with any new findings</p>
<p style="margin-bottom: 0in;">&nbsp;</p>
<p style="margin-bottom: 0in;">You can find the source code (very little of it) in <a href="http://github.com/ittayd/scala-actors-benchmarks/">here</a></p>
<p style="margin-bottom: 0in;">&nbsp;</p>
<p style="margin-bottom: 0in;">&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>

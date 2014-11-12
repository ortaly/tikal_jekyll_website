---
layout: post
title: Application freezes - too many full GC's
created: 1262702254
author: elad
permalink: /java/application-freezes-too-many-full-gcs
tags:
- JAVA
- jvm
- Full GC
- Distributed RMI
---
<p><span style="display: none;" id="1262702351595S">&nbsp;</span></p>
<div>If you're using RMI in your application, your JVM is likely to perform too many unnecessary full GC's.<br />
This causes your application to freeze for too long and may cause for serious performance problems.<br />
<br />
Why is that? <br />
By default, RMI calls System.gc() once every minute. this forces a major collection (full GC) to occur.<br />
a full GC is a collection of type &quot;Stop The World&quot;,<em> </em>which means the JVM freezes until the GC is over.<br />
<br />
Note that telling the JVM to perform a full GC every minute isn't needed, since your JVM knows by itself when to perform a full GC.<br />
But not only it isn't needed, it also causes your application to freeze for an amount of time ranging from several ms. to a full second <br />
(depending on your heap settings and application load).<br />
<br />
In order to avoid unnecessary freezes in your application, you have two options:<br />
<br />
1) Disable completely the option to call System.gc() from the code, by using the following JVM parameter:<br />
<strong>-XX:+DisableExplicitGC</strong><br />
<br />
2) Set the RMI garbage collection intervals (in this example, the RMI collection will occur once an hour):<br />
<strong>-Dsun.rmi.dgc.client.gcInteraval</strong>=3600000<br />
<strong>-Dsun.rmi.dgc.server.gcInterval</strong>=3600000<br />
<br />
To conclude: by default, if you're using RMI on Sun JVM, the JVM performs a full GC once a minute.<br />
This can cause performance problem due to the freezes caused by the full GC.<br />
In order to avoid that, you can either disable explicit calls to System.gc(), or tune the RMI GC to perform in a predefined interval.<br />
&nbsp;</div>
<p><span style="display: none;" id="1262702352461E">&nbsp;</span></p>

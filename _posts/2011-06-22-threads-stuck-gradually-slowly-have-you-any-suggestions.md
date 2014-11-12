---
layout: post
title: Threads stuck, gradually, slowly...Have you any suggestions?
created: 1308745565
author: peterk
permalink: /java/threads-stuck-gradually-slowlyhave-you-any-suggestions
tags:
- JAVA
- java thread
---
<p>Hi!</p>
<p>&nbsp;</p>
<p>Java 5 threading here.</p>
<p>&nbsp;</p>
<p>I have an Executer with 10 threads, </p>
<p>&nbsp;</p>
<p>threads are busy in e-mail sending tasks execution.</p>
<p>&nbsp;</p>
<p>Gradually (1 thread in 5 hours) threads stuck in TIMED_WAITING state, from which they never revoked,</p>
<p>&nbsp;</p>
<p>example of thread state is here, taken by jconsole:</p>
<p>&nbsp;</p>
<pre title="code" class="brush: java;">
Name: pool-4-thread-1
State: TIMED_WAITING on java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject@3125fe1
Total blocked: 0  Total waited: 7,609

Stack trace: 
 sun.misc.Unsafe.park(Native Method)
java.util.concurrent.locks.LockSupport.parkNanos(LockSupport.java:198)
java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject.awaitNanos(AbstractQueuedSynchronizer.java:2025)
java.util.concurrent.ArrayBlockingQueue.poll(ArrayBlockingQueue.java:342)
com.idi.mailer.executor.impl.ResultsQueue.pull(ResultsQueue.java:66)
com.idi.mailer.executor.impl.SerialMailExecutor$FinalizerTask.run(SerialMailExecutor.java:466)
java.util.concurrent.ThreadPoolExecutor$Worker.runTask(ThreadPoolExecutor.java:886)
java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:908)
java.lang.Thread.run(Thread.java:662)
</pre>
<p>&nbsp;</p>
<p>Gradually all 10 threads get into that state.</p>
<p>&nbsp;</p>
<p>They are not using common resources. They are not waiting each other. No locks possible.</p>
<p>&nbsp;</p>
<p>What I do now to fix the matter, I recognize the failure at the end and restart the entire executer.</p>
<p>&nbsp;</p>
<p>It looks like a VM bug, because I looked into similar posts and all they end up in some VM problem...</p>
<p>&nbsp;</p>
<p>Have you any idea?</p>
<p>&nbsp;</p>
<p>Thanks.</p>
<p>&nbsp;</p>
<p>Peter.</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>

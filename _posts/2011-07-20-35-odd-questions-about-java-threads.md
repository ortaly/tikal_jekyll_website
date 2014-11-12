---
layout: post
title: 35 odd questions about Java threads
created: 1311189940
permalink: 35-odd-questions-about-java-threads
tags:
- JAVA
- threads
---
<p>Feel free to add your own.</p>
<p>&nbsp;</p>
<p><br />
0- Unrealted warmup question:</p>
<p>Will the folowing code compile?</p>
<pre title="code" class="brush: java;">
import java.util.ArrayList; 
/**
 * Created by IntelliJ IDEA.
 * User: sk
 * Date: 7/20/11
 * To change this template use File | Settings | File Templates.
 */
public class Test {

    public &lt;ArrayList&gt; ArrayList strangeMethod(){        
        return null;
    }
</pre>
<p>&nbsp;</p>
<p><br />
1-How does one generate a Thread dump?<br />
<br />
2-What is the default (stack) memory allocated for each thread on a JVM on a 64 bit Windows operation system?<br />
<br />
3-What is the most probable runtime error when running a JVM with 500 threads and setting JAVA_OPTIONS =&quot;-Xss10m&quot; ?<br />
(same as 3 only with &quot;-Xss64k&quot;)<br />
<br />
4-Given a thread dump how does one detect a deadlock?<br />
<br />
5- What does the following command do:</p>
<pre title="code" class="brush: java;">
Collections.synchronizedSet(new HashSet());   </pre>
<p><br />
6-Provide an example for using the following code snippet:<br />
&nbsp;</p>
<pre title="code" class="brush: java;">
private ThreadLocal tc= new ThreadLocal(); </pre>
<p><br />
<br />
7-What can you conclude given the following stack trace of a single thread:<br />
&nbsp;</p>
<pre title="code" class="brush: java;">
at java.util.concurrent.locks.LockSupport.park(LockSupport.java:156)</pre>
<p><br />
<br />
8-Under which circumstances would you opt to create your own ThreadFactory?<br />
<br />
9-Can you suggest a scenario in which the following code is useful?<br />
&nbsp;</p>
<pre title="code" class="brush: java;">
private static final ExecutorService pool = Executors.newScheduledThreadPool(13,new UsefulThreadFactory());

    static class UsefulThreadFactory implements ThreadFactory {
        AtomicInteger threadCount = new AtomicInteger(1);

        public  Thread newThread(Runnable r) {
            Thread t = new Thread(r);
            t.setName(&quot;UsefulThreadFactory-ThreadPool[&quot; + threadCount.getAndIncrement() + &quot;]&quot;);
            return t;
        }
    }
</pre>
<p><br />
10-What is the use of a CyclicBarrier?<br />
<br />
11-Given:</p>
<pre title="code" class="brush: java;">
private  CyclicBarrier barrier;

try
            {
                barrier.await();
            } catch (InterruptedException ex)
            {
                ex.printStackTrace();
            } catch (BrokenBarrierException ex)
            {
                ex.printStackTrace();
            }
</pre>
<p><br />
Under which circumstances will we reach the second Exception (e.g. BrokenBarrierException)?<br />
<br />
12- Use a CountDownLatch to coordinate the start of N threads.<br />
<br />
13- Given class A in , and two static methods static Syncronized void foo() and static Syncronized&nbsp; void bar(), can you invoke both methods concurrently from two different threads? if no, which object is being locked?<br />
<br />
14- describe precisely what would be the effect of invoking:</p>
<pre title="code" class="brush: java;">
setDaemon(boolean isDaemon);</pre>
<p><br />
On a thread. <br />
<br />
15-Assuming an 64bit Linux OS kernel with 2GB RAM and 8 CPU's out of which 500m are allocated/reserved to the kernel itself, and given the following JAVA_OPTS passed as a parameter to the JVM, will a JVM be successfully created?&nbsp;</p>
<p>&nbsp;</p>
<pre title="code" class="brush: php;">
-XX:PermSize=512m -Xms1g -Xmx1g -XX:NewSize=256m -XX:MaxNewSize=756m -XX:SurvivorRatio=6 -XX:GCTimeRatio=2 -XX:ParallelGCThreads=8 -XX:+UseParNewGC -XX:MaxGCPauseMillis=2000 -XX:+DisableExplicitGC
</pre>
<p><br />
16- What does the following command do:</p>
<pre title="code" class="brush: php;">
jstack [-l] &lt;pid&gt;</pre>
<p><br />
17-Can you disable garbage collection in java?<br />
<br />
18- What is the distributed RMI garbage collector?<br />
<br />
19-What does the following command do?</p>
<pre title="code" class="brush: java;">
jstat -gcutil -t &lt;pid&gt; 1s 30</pre>
<p><br />
20- What is the use of the following code?<br />
&nbsp;</p>
<pre title="code" class="brush: java;">
ThreadMXBean threadMXBean =ManagementFactory.getThreadMXBean();</pre>
<p><br />
21- Is this a blocking call?</p>
<pre title="code" class="brush: java;">
Thread.sleep(500)</pre>
<p><br />
22-How can you block a thread?<br />
<br />
23- Given the following declaration, behind the scenes,how many threads can be queued if all the threads are currently busy serving requests?<br />
&nbsp;</p>
<pre title="code" class="brush: java;">
ExecutorService pool = Executors.newFixedThreadPool(3);</pre>
<p><br />
24-What is the use of a RejectedExecutionHandler?<br />
<br />
25- Are the operations on ArrayBlockingQueue/ LinkedBlockingQueue thread safe?<br />
<br />
26-When would you opt using a CompletionService whreas using an ExecutorService?<br />
<br />
27- What are the benefits of ConcurrentHashMap over a regular synchronized HashMap if any?<br />
<br />
28- What is a thread-local variable?<br />
<br />
29- How do you AVOID sharing a variable between threads?<br />
<br />
30-Can you infer the usage for the following declaration?<br />
&nbsp;</p>
<pre title="code" class="brush: java;">
private ConcurrentMap&lt;Integer, FutureTask&lt;Action&gt;&gt;    cache   = new ConcurrentHashMap&lt;Integer, FutureTask&lt;Action&gt;&gt;();</pre>
<p><br />
<br />
31-Explain what is a Java binary mutex<br />
<br />
32-Suggest a way to create a non-blocking thread in Java using a Callable&lt;T&gt; .<br />
<br />
33-Suggest a way to create a blocking thread in Java using a Runnable.<br />
<br />
34-Suggest a way to synchronize access to a BlockingQueue without using the synchronized keyword<br />
<br />
35-Explain what is an AtomicInteger and how to use it.<br />
<br />
&nbsp;</p>

---
layout: post
title: Scala actors thread pool pitfall
created: 1299101849
author: ittayd
permalink: /incubator/scala-actors-thread-pool-pitfall
tags:
- Incubator
- Scala
- scala actors
---
<p>The thread pool used by the Scala actors may not work liike you think it should, causing actors to starve.</p>
<p>&nbsp;</p>
<p>To see why, lets first define a utility method to measure how long an actor takes to act. We take a timestamp, then create an actor that just prints to the console how many milliseconds passed since the timestamp</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<pre class="brush: scala;" title="code">
import scala.actors.Actor._

def timeActor = {
    val start = System.currentTimeMillis
    actor {println(&quot;Took: &quot; + (System.currentTimeMillis - start))}
}</pre>
<p>&nbsp;</p>
<p>Testing it:</p>
<pre class="brush: plain;" title="code">
scala&gt; timeActor
Took: 2
res49: scala.actors.Actor = scala.actors.Actor$$anon$1@18e905</pre>
<p>&nbsp;</p>
<p>We see the actor ran within 2 milliseconds.</p>
<p>&nbsp;</p>
<p>Now lets throw some more actors that just block and see how much the actor took:</p>
<pre class="brush: plain;" title="code">
scala&gt; for (_ &lt;- 1 to 4) actor{Thread.sleep(5000)}; timeActor

scala&gt; Took: 0</pre>
<p>&nbsp;</p>
<p>Not much surprise here either.</p>
<p>&nbsp;</p>
<p>Next I run 8 actors:</p>
<pre class="brush: plain;" title="code">
scala&gt; for (_ &lt;- 1 to 8) actor{Thread.sleep(5000)}; timeActor

scala&gt; Took: 5000

</pre>
<p>Oops. Why did it take 5 seconds to run?&nbsp;</p>
<p>&nbsp;</p>
<p>If you look in scala.actors.scheduler.ThreadPoolConfig you might be tempted to set actors.maxPoolSize to some large value. This will not change the result of the above test. In fact, if the property is not set, then ThreadPoolConfig#maxPoolSize returns 256</p>
<p>&nbsp;</p>
<p>What is happening here?&nbsp;</p>
<p>&nbsp;</p>
<p>The secret is the type of scheduler used. On Sun / Apple JVM&nbsp;version 1.6 the scheduler is a ForkJoinScheduler. This scheduler uses ForkJoinPool from the upcoming(?)&nbsp;jdk7 which tries to maintain a fixed set of concurrently running threads set by setParallelism. ForkJoinScheduler uses ThreadPoolConfig#corePoolSize to set this property. corePoolSize is by default twice the number of cpus. In my case 2 *&nbsp;4 ==&gt;&nbsp;8</p>
<p>&nbsp;</p>
<p>What this means is that no more than 8 threads will run concurrently.</p>
<p>&nbsp;</p>
<p>For CPU intensive tasks, this is a good thing, since it means your CPUs won't be thrashed by many threads causing context switching and cache misses.</p>
<p>&nbsp;</p>
<p>However, if your threads are blocking on IO, waiting for a service, etc. Then ForkJoinPool has now way of knowing they are not really working. All tasks will just wait for them to finish. Note that if an actor waits on another actor with the !? method, then the scheduler knows the actor is blocked and the fork-join pool will create another thread to maintain the level of parallelism.</p>
<p>&nbsp;</p>
<p>What is the lesson?&nbsp;Never block inside actors if they use ForkJoinScheduler.</p>
<p>&nbsp;</p>
<p>Alternatives are:&nbsp;</p>
<ol>
    <li>set the actors.enableForkJoin system property to false. This may not be good, as explained above.</li>
    <li>or, use a diffent scheduler for actors that may block. You can choose between ResizableThreadPoolScheduler that uses a ThreadPoolExecutor, or ExecutorScheduler which is initialized with an ExecutorService instance.</li>
</ol>
<p>&nbsp;</p>
<p>To demonstrate the second approach:</p>
<pre class="brush: scala;" title="code">
object ActorThatBlocks {
  lazy val scheduler = {
    val s = new ResizableThreadPoolScheduler(false)
    s.start()
    s
  }	
	
  def actorThatBlocks(body: =&gt; Unit): Actor = {
    val a = new ActorThatBlocks {
      def act() = body
    }
    a.start()
    a
  }
}
  
trait ActorThatBlocks extends Actor{
  override def scheduler = ActorThatBlocks.scheduler
}

</pre>
<p>And lets test this:</p>
<pre class="brush: plain;" title="code">
scala&gt; for (_ &lt;- 1 to 8) actorThatBlocks{Thread.sleep(5000)}; timeActor
Took: 1
</pre>
<p>&nbsp;</p>
<p>Note one cavet:&nbsp;if inside an ActorThatBlocks you will use the 'actor' method to create an anonymous class actor, it will use the same scheduler, and not the ForkJoinScheduler. A workaround is to create a actorThatDoesNotBlock method...</p>

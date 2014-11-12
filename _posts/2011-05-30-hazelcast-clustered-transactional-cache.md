---
layout: post
title: HazelCast - clustered transactional cache
created: 1306763598
permalink: hazelcast-clustered-transactional-cache
tags:
- JAVA
- java cache hazelcast
---
<p>In my recent quest for a clustered transactional cache I came across <a href="http://www.hazelcast.com">Hazelcast</a>.</p>
<p>Hazelcast is a distribute cache implementaion written in java, it has a distributed implementation of java.util for Map, List, Set.</p>
<p>it also has some neat distributed Queue, Topic, Executer implementations.</p>
<p>since the header of this post consists on distributed transactional cache I will not talk about those neat features (they are not transactional).</p>
<p>&nbsp;</p>
<p>the idea of Hazecast is to be easy to work with, hide the distribution details and support a large scale.</p>
<p>following the documentation, hazelcast has only one jar, consiting with it's small footprint and ease of use.</p>
<p>in order to start working with the cache, you will need to create a hazelcase.xml configuration file or work with the default one that is attached to the hazelcast jar.</p>
<p>I decided I'm going to make things the hard way and try and configure it by myself. I'm happy to say that it was a good expirience. there are a few way of loading you configuration file, through classpath, file system, memory or url loaders.</p>
<p>I worked with the file system loader as follows -</p>
<pre class="brush: java;" title="code">
Config config = new FileSystemXmlConfig(new File(&quot;C:/playground/cache/hazelcast/target/classes/hazelcast.xml&quot;));
HazelcastInstance instance = Hazelcast.newHazelcastInstance(config);</pre>
<p>&nbsp;</p>
<p>and that's it.</p>
<p>the tests were done on a single machine.</p>
<p>I ran a producer and listener(same configuration), and instatly I had a cluster that replicates each action.</p>
<p>&nbsp;</p>
<p>now for the real question, how does it work with transactions?</p>
<p>&nbsp;</p>
<p>Hazelcast has it's own transaction support, with the same notion of begin, commit, and rollback.</p>
<p>according to the <a href="http://www.hazelcast.com/documentation.jsp#JEEIntegration">documentation </a>it can be adjusted to work with user transactions. I have't tried the J2EE integration since the basic hazelcast transaction support was suitable for my needs.</p>
<p>&nbsp;</p>
<p>after adding the transaction support my producer looked as follows -</p>
<pre title="code" class="brush: java;">
package hazelcast.demo;

import java.io.FileNotFoundException;

import com.hazelcast.core.Transaction;

 
public class HCProducer extends HCBasicRunnable {
 
	public HCProducer() throws FileNotFoundException
	{
		super();
	}

	@Override
	public void run()
	{
		int i = 0;
		String value = &quot;val-&quot;;
	
		Transaction txn = instance.getTransaction();
		txn.begin();
		
		while (true)
		{
	        map.put(Integer.toString(++i), value + i);
	        System.out.println(&quot;put in map &quot; + i);
	        
			if (i % 5 == 0)
			{
				System.out.println(&quot;commit transaction&quot;);
				txn.commit();
				
				System.out.println(&quot;start new transaction&quot;);
				txn = instance.getTransaction();
				txn.begin();
			}
	        
	        try
			{
				Thread.sleep(1500);
			}
			catch (InterruptedException e)
			{
				e.printStackTrace();
			}
		}
	}

    public static void main(String[] args) throws FileNotFoundException {
    	(new Thread(new HCProducer())).start();
    }
} 



</pre>
<p>and the listener as follows -</p>
<p>&nbsp;</p>
<pre title="code" class="brush: java;">
package hazelcast.demo;

import java.io.FileNotFoundException;
import java.util.HashMap;
import java.util.Set;

public class HCListener extends HCBasicRunnable
{

	public HCListener() throws FileNotFoundException
	{
		super();
	}

	@Override
	public void run()
	{
		while (true)
		{
	            try
		    {
		       Thread.sleep(5000);
		    }
		    catch (InterruptedException e)
		    {
		       e.printStackTrace();
		    }
                }

	}

    public static void main(String[] args) throws FileNotFoundException {
    	(new Thread(new HCListener())).start();
    }

}
</pre>
<p>&nbsp;</p>
<p>and that was it. now I had a full blown transctional cluster.</p>
<p>now there's always a catch, right?</p>
<p>when running some load test I found out that calling &quot;map.get&quot; consums too much time, about 0.001 sec per call. since my application requires lots of calls this is not something I could ignore.</p>
<p>according to hazecast team this is a known issue and an expected behaviour since hazelcast was built to work as a distributed cache, and not a replication. I did some digging and found this <a href="http://groups.google.com/group/hazelcast/browse_thread/thread/3e877736f14e547d/ae9db87d8a3b172d?lnk=gst&amp;q=performance#ae9db87d8a3b172d">amuzing but resonse on the hazelcast group</a></p>
<p>still, I needed better performance. apparantly those guys know what they're doing, and for that they have the <a href="http://www.hazelcast.com/documentation.jsp#MapNearCache">&quot;Near Cache&quot;</a> feature.</p>
<p>I updated my configuration and now I had a full blown transactional distributed cache with high performance on read actions.</p>
<p>&nbsp;</p>
<p>I must say that after expienecing with the latest EHCache versions, I was happy to find an open source that it performs to its documentation...</p>
<p>I think that hazelcast is excelent in what it does. it's very easy to configure, use and deploy.</p>
<p>it lacks in documentation, especially on the configuration part (couldn't find how to configure a topic, still managed to anyhow).</p>
<p>since it's still new, it also lacks in web buzz. I couldn't find too much articles and &quot;howto&quot; tutrials. but I'm guessing that will change in the near future.</p>
<p>&nbsp;</p>
<p>to sum things up, I can't say that hazelcast will cause EHcache or JbossCache to &quot;bite the dust&quot;, but I'm willing to bet that it will take a nice bite in the distributed cache market.</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>

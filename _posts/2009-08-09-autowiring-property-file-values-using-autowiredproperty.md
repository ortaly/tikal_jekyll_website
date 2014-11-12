---
layout: post
title: Autowiring Property File Values Using @AutowiredProperty
created: 1249794534
author: zvika
permalink: /java/autowiring-property-file-values-using-autowiredproperty
tags:
- JAVA
- Spring
---
<p>Just recently, I was writing a little Spring-enabled http sampler (my next post), and I needed to introduce some values (hostname, port, ping url) from an outside configuration file. As I automatically used PropertyPlaceholderConfigurer (better known as &lt;context:property-placeholder location=&quot;classpath:...&quot; /&gt;), I noticed that only part of my problem was solved: the values taken from the configuration file could ONLY be injected into beans declared in my applicationContext.xml! This means that if I wanted to use Spring annotations for declaring beans (which I do), I had to write an &quot;Adapter Beans&quot;, &quot;Configuration Bean&quot; or whatever name you want to call it... The Configuration bean would be declared in the xml file, and I'll @Autowire it to whatever other bean that needs that configuration... For every new property introduced anywhere in my application, I would need to add getter and a setter, which would be now visible throughout the application (not a problem for a small app', but still)... pain in the neck... Then I thought: what if I could @Autowire property file values the same way I autowired other beans?<br />
&nbsp;<br />
Eager to start and inspired by the <a href="http://www.tikalk.com/java/doing-transactional-work-spring-service-using-postconstruct-method">last annotation modification brain surgery</a> that showed me how easy it is, in practice and not only in theory, to add custom annotation and then post-process them, I nearly sat down to start writing some code, when I found <a href="http://forum.springsource.org/showthread.php?t=55183">that very problem with the very solution on the Spring forums</a>, again. Hurray!<br />
&nbsp;<br />
This allowed me to write my code brieflier than ever, using:</p>
<p><pre class="brush: java;">  
@Service 
public class LatencySampler {

          @Autowired
          protected MBeanServerConnection conn;

          @AutowiredProperty(name=&quot;ping.url&quot;)
          protected String pingUrl;

           // ...  
}  </pre></p>
<p><br />
... with a config.properties similar to:</p>
<p><pre class="brush: java;"> 

probee.hostname=hostsforever.com  
probee.jmx.port=8086 
ping.url=https://www.hostsforever.com/ping.jsp 

</pre></p>
<br/><br/><p>Go'on, check it out on: <a href="http://forum.springsource.org/showthread.php?t=55183">http://forum.springsource.org/showthread.php?t=55183</a><br />
&nbsp;</p>

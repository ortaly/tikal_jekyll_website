---
layout: post
title: Multithreading queries with hibernate & spring
created: 1376834085
author: chaim.turkel
permalink: /multithreading-queries-hibernate-spring
tags:
- JAVA
- Hibernate
- threads
- session
---
<div class="MsoNormal">
	There are times that we have a process that needs to run multiple requests from the db, and then with the result of all of them, to combine the results in a specific way. Of course you can run each query sequentially, but to boost performance you want to run them in parallel. <o:p></o:p></div>
<div class="MsoNormal">
	At first this seems simple since you just need to run each query in a separate thread using a callable, and then wait on the future results to get them (for a good article on thread and concurrency see: <a href="http://www.vogella.com/articles/JavaConcurrency/article.html">http://www.vogella.com/articles/JavaConcurrency/article.html</a>). &nbsp;<o:p></o:p></div>
<div class="MsoNormal">
	As we will see this approach has a lot of problems, and does not work simply with hibernate.<o:p></o:p></div>
<h2>
	Session and Threads<o:p></o:p></h2>
<div class="MsoNormal">
	The problem is what information do you pass to the thread, and what is the result from the thread. The first na&iuml;ve thought was to create the query object in the main thread (so the thread can be generic and not deal with the query and parameters), and then pass to each new thread the query. Then all the thread needs to do is call query.uniqueResult() or query.list() and return the result. <o:p></o:p></div>
<div class="MsoNormal">
	The problem with this approach is that hibernate session is not thread safe (<a href="http://www.javalobby.org/java/forums/t104442.html">http://www.javalobby.org/java/forums/t104442.html</a><span class="MsoHyperlink">, </span><a href="http://pveentjer.wordpress.com/2007/02/19/sharing-hibernate-entities-between-threads/">http://pveentjer.wordpress.com/2007/02/19/sharing-hibernate-entities-between-threads/</a>), so you cannot share the session between threads. Hibernate to simplify the implementation assumes that all queries run on a thread are using the same session. This means that you are not allowed to pass the session between threads.<o:p></o:p></div>
<div class="MsoNormal">
	So the next option is to pass the dao to the thread and then call a specific function on the dao. This makes more sense from a design point of view since this is the default design of a service layer application. In a web app, each request has it&rsquo;s own thread, and then the calls to the dao are all stateless and will have their own session per thread that is created by hibernate. <o:p></o:p></div>
<div class="MsoNormal">
	The downside to this solution is that we do not have a generic way to run queries asynchronous. A possible solution is to pass a reference to the dao, and an object that describes the function and parameters, and the within the thread to use reflection to find the function and to call it with the parameters sent.<o:p></o:p></div>
<h2>
	Transactions<o:p></o:p></h2>
<div class="MsoNormal">
	The next part that you need to think about is transactions. By default each thread will have its own transaction (needs to be defined by annotations or xml). It is not simple to have transactions cross threads and is not considered to be a good design practice. But if for whatever reason you must have it, global JTA is the way to go.<o:p></o:p></div>
<h2>
	Results<o:p></o:p></h2>
<div class="MsoNormal">
	The next part that needs to be taken into consideration is the result from the thread. The problem is that if we return the entity as is, and it has lazy objects, accessing these objects on the main thread will cause a Hibernate Lazy Load Exception. Since hibernate tries to load the data from the database when there is a lazy proxy, and the call to the object is from a different thread, hibernate cannot load the information and a lazy exception is thrown (for more information see <a href="http://blog.xebia.com/2009/02/07/hibernate-and-multi-threading/">http://blog.xebia.com/2009/02/07/hibernate-and-multi-threading/</a>). <o:p></o:p></div>
<div class="MsoNormal">
	There are multiple ways to solve this issue. One is to use dto&rsquo;s and convert the entity to a pojo and then it will not be associated with hibernate session. Another solution is to use an open source lib by tikal (<a href="http://tikalk.com/chop-hibernate-lazy-associations">http://tikalk.com/chop-hibernate-lazy-associations</a>) that will chop any entities and replace the proxies by a null according to an aop pointcut. <o:p></o:p></div>
<div class="MsoNormal">
	&nbsp;</div>
<h2>
	Summary:<o:p></o:p></h2>
<div class="MsoNormal">
	What seemed like a simple idea in the beginning to run multiple queries in multiple threads, although a need sometimes, the implementation must be carefully done to take into account all the issues raised above.<o:p></o:p></div>
<div class="MsoNormal">
	&nbsp;</div>
<div class="MsoNormal">
	&nbsp;</div>
<br />
<div class="MsoNormal">
	&nbsp;</div>

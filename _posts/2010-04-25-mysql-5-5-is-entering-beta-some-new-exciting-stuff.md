---
layout: post
title: MySQL 5.5 is entering beta; some new exciting stuff.
created: 1272181883
permalink: mysql-5-5-is-entering-beta-some-new-exciting-stuff
tags:
- DevOps
- MySQL
---
<p>It&lsquo;s been a long time, from my point of view, since MySQL was out with something exciting.<br />
Since version 5.0 back in 2005 we mainly saw bug fixes. Version 6.0 is in development for years and I am not sure if it heads anywhere <br />
(see the following <a href="http://www.sdtimes.com/blog/post/2009/10/08/Has-MySQL-60-Been-Canceled.aspx">post</a>). So the following new <a href="http://dev.mysql.com/tech-resources/articles/introduction-to-mysql-55.html">article </a>from MySQL was very encouraging.</p>
<!--break-->
<p>Below is a partial feature that I found interesting. <br />
1. <strong>InnoDB Becomes Default Storage Engine and InnoDB improvemts:</strong> <br />
well it&rsquo;s about time; why spend so match time on writing new storage engines!<br />
I guess the acquiring of MySQL by Oracle had some benefits. <br />
2.<strong> Semi-Synchronous Replication and Replication Heartbeat:</strong><br />
You can choose to have commits on the master node wait until at least one slave has logged the relevant events for the transaction. You can configure the heartbeat period. If the message is not received, the master knows that the slave node has failed. This will not spare the use of third-party heartbeat solutions but can improve the reliability of replication. <br />
3. <strong>Performance Schema:</strong></p>
<p>The Performance Schema feature involves an optional schema, named performance_schema, with tables that you can query to see intimate details of low-level MySQL performance. Well this is not new it was called the profiler back in 5.1 but I guess that now it will be more mature<br />
&nbsp;</p>

---
layout: post
title: Tuning big java heap and linux huge pages
created: 1294742938
author: shalom
permalink: /devops/tuning-big-java-heap-and-linux-huge-pages
tags:
- JAVA
- Java jvm heap hugepage
---
<p>I recently had to run a jvm with large heap size, without getting into technical details we need the jvm to carry about 25G of cached memory that we load on stratup, so we want to start the jvm with 30G of minimum and maximum memory.&nbsp; we have a 64G 16DC machine running centos 5.5. the machine is running both our application on tomcat and a postgresql database.</p>
<p>what ever we did we couldn&#39;t start the jvm with more then 25G with -Xms25g -Xmx25g, apparently the jvm needs contiguous memory blocks, and even with 64G physical memory the OS can&#39;t find 30G of contiguous memory,although free -m shows that there are more then 45G available. we even tried starting the machine without postgresql on startup and then try to allocate the jvm heap but it didn&#39;t help, 25G is the maximum we could do. and we tried it with sum jvm, ibm and jrockit, they all behave the same way.</p>
<p>one solution suggested in <a href="http://www.tikalk.com/alm/forums/cant-start-tomcat-centos-with-large-memory">this</a> post was to increase the swap area, it did the job and after adding a large swap file we could allocate 30G and even 40G heap size. but this will be swapable memory which could hurt performance really bad, we wanted to have a non swapable memory.</p>
<p>So we decided to drop the swap file and use a linux kernel feature called &#39;<a href="http://linuxgazette.net/155/krishnakumar.html">Huge Pages</a>&#39;, available since 2.6.18. (find more about it <a href="http://yong321.freeshell.org/oranotes/HugePages.txt">here</a> and <a href="http://devresources.linux-foundation.org/dev/robustmutexes/src/fusyn.hg/Documentation/vm/hugetlbpage.txt">here</a> and <a href="http://unixfoo.blogspot.com/2007/10/hugepages.html">here</a>).</p>
<p>Huge pages is about allocating larger memory pages then the default 4k, a page size is hardware+arch dependent and in our machine its 2M. You usually see Huge Pages used by heavy weight servers like oracle, mysql and WebSphere.</p>
<p>But whats more relevant to us is that you can ask the linux kernel to reserve a certain amount of huge pages to be used by applications that explicitly ask the OS to use huge pages, this memory will not be available to other applications. and the best thing is that huge pages are not swapable and always reside in physical memory. this sounds good especially that our application needs to keep a large amount of memory for as long as it lives.</p>
<p>&nbsp;</p>
<p>I&#39;m not going to explain how to setup huge page support, you can find good howto <a href="http://andrigoss.blogspot.com/2008/02/jvm-performance-tuning.html">here</a> , <a href="http://www.oracle.com/technetwork/java/ism-139376.html">here</a> and <a href="http://www.cyberciti.biz/tips/linux-hugetlbfs-and-mysql-performance.html">here</a> and this is a <a href="http://www.peuss.de/node/67">calculator</a>.</p>
<p>&nbsp;</p>
<p>so because we wanted to be able to allocate 30G for the jvm we configured the kernel to reserve 17920 huge pages , our page size is 2M so we have 35G of huge pages reserved.</p>
<p>&nbsp;</p>
<p>then add a jvm argument -XX:+UseLargePages, and we can now start the jvm with 30G or more of heap size with no problem.</p>
<p>&nbsp;</p>
<p>after starting the jvm this is our huge page info:</p>
<p>[root@localhost ~]# cat /proc/meminfo |grep Huge<br />
	HugePages_Total: 17920<br />
	HugePages_Free:&nbsp;&nbsp; 9156<br />
	HugePages_Rsvd:&nbsp;&nbsp; 7365<br />
	Hugepagesize:&nbsp;&nbsp;&nbsp;&nbsp; 2048 kB<br />
	&nbsp;</p>
<p>The problem is that now there is no memory available to start any application, even &#39;java -version&#39; will fail to allocate memory unless you start it like:&nbsp; java -Xms12m -Xmx12m -XX:+UseLargePages -XX:LargePageSizeInBytes=2m -version</p>
<p>&nbsp;</p>
<p>Now we are going on tuning this jvm for best performance, I will be happy to hear your ideas and I&nbsp;will continue editing this post as we improve our large heap jvm performance.</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>

---
layout: post
title: Why and How Netflix Adopted NoSQL Databases
created: 1296687674
author: lior.kanfi
permalink: "/incubator/why-and-how-netflix-adopted-nosql-databases"
tags:
- Incubator
- HBase
- cassandra
- SimpleDB
---
<p><img alt="" src="http://rww.readwriteweb.netdna-cdn.com/cloud/assets_c/2010/12/database_symbol_1210-thumb-150x150-25704.jpg" /> <a href="http://netflix.com/">Netflix</a> Director of Cloud and Systems Infrastructure Yury Izrailevsky <a href="http://techblog.netflix.com/2011/01/nosql-at-netflix.html">explains</a>  how and why Netflix migrated some of its systems to NoSQL. &quot;In the  distributed world governed by Eric Brewer's CAP theorem , high  availability (a.k.a. better customer experience) usually trumps strong  consistency,&quot; he writes. &quot; There is little room for vertical scalability  or single points of failure.&quot;</p>
<p>Netflix uses three NoSQL tools: SimpleDB, HBase and Cassandra. &quot;The  reason why we use multiple NoSQL solutions is because each one is best  suited for a specific set of use cases,&quot; Izrailevsky writes. He writes  that the learning curve has been steep and re-architecting the company's  systems has been difficult but &quot;the scalability, availability and  performance advantages of the NoSQL persistence model are evident and  are paying for themselves already, and will be central to our long-term  cloud strategy.&quot;</p>
<p>&nbsp;</p>
<p>http://www.readwriteweb.com/hack/2011/01/how-netflix-adopted-nosql.php?utm_source=feedburner&amp;utm_medium=feed&amp;utm_campaign=Feed%3A+readwriteweb%2Fhack+%28ReadWriteHack%29</p>

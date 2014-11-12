---
layout: post
title: distributed transactional cache
created: 1290930973
permalink: distributed-transactional-cache
tags:
- JAVA
- cache
---
<p>A customer I&nbsp;work for is in need for a distributed transactional cache.</p>
<p>Hibernate+EHCache is not an option since Hibernate is not the only persistence framework we use. we also have Spring JDBCTemplate and pure JDBC.</p>
<p>&nbsp;</p>
<p>what we need is an easily distributed cache, with a transaction support. meaning the distributed cache is updated on transaction commit, or returns to its pre-transaction state on transaction rollback.</p>
<p>so far i didnt find anything usefull, any ideas?</p>

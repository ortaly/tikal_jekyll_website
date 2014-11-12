---
layout: post
title: Hibernate second level cache collection eviction
created: 1237971361
permalink: hibernate-second-level-cache-collection-eviction
tags:
- JAVA
- Hibernate
- second level cahce
---
<p>Hi,<br />
<br />
In our application we have a JSF tree which displays the hierarchy of our entities. Whenever the relationship between parent and child is changed in the database, we immediately synchronize the state with the tree.<br />
<br />
We recently added EhCache as our second level cache implementation, both for Entities and Collections. It turns out that even if you add a new entity that is involved in a parent child relationship, the Collection that resides in the cache will NOT be updates and so you will have a dirty version.In our case that resulted in a tree that does not reflect the true stat of the DB.<br />
<br />
What needs to be done is to use the session factory to evict to parent entity and then to evict the collection from the cache. Only then will it be updated again and reflect the true state of the DB. I followed the code suggested here:<br />
<br />
http://jaitechwriteups.blogspot.com/2006/08/evict-collection-from-hibernate-second.html<br />
<br />
And using a SEAM observer to handle the event.<br />
<br />
If someone (Yanai ...) has a better solution , please speak up.<br />
&nbsp;</p>

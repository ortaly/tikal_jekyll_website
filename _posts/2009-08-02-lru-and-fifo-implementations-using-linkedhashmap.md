---
layout: post
title: LRU and FIFO implementations using LinkedHashMap
created: 1249205329
author: elad
permalink: /java/lru-and-fifo-implementations-using-linkedhashmap
tags:
- JAVA
- LRU
- LinkedHashMap
- FIFO
---
<p>Not many knows, but the LinkedHashMap class allows you to implement both an LRU and FIFO queues almost without coding! <br />
Here's how it's done:<br />
&nbsp;<br />
Instantiating LinkedHashMap with the 3rd parameter passed as true in this c'tor:<br />
public LinkedHashMap(int initialCapacity,<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; float loadFactor,<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; boolean accessOrder)<br />
<br />
causes the map to become an LRU map. That's because the map is ordered by access-order.<br />
But passing the 3rd parameter as false makes it a FIFO, because the map is ordered by insertion order.<br />
So if you want to use it as an FIFO, do the following:<br />
HashMap&nbsp; map = new LinkedHashMap(0, 0.75F, false)<br />
<br />
And if you want to use it as a LRU, use the following class that extends the LinkedHashMap class and overrides its removeEldestEntry method:<br />
&nbsp; <br />
private class LRUMap&lt;K, V&gt; extends LinkedHashMap&lt;K, V&gt;<br />
{<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; private int maxCapacity;<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; public LRUMap(int maxCapacity)<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; super(0, 0.75F, true);<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; this.maxCapacity = maxCapacity;<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }<br />
<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; @Override<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; protected boolean removeEldestEntry(Map.Entry&lt;K, V&gt; eldest)<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; return size() &gt;= this.maxCapacity;<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }<br />
}</p>
<p><br />
Note that in the c'tor of the LRU class, a bollean true flag is passed, unlike in the FIFO example, where false is passed.</p>

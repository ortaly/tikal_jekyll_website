---
layout: post
title: Mapping BLOBs in DB2 9 with Hibernate/JPA
created: 1297158462
author: avim
permalink: /java/mapping-blobs-db2-9-hibernatejpa
tags:
- JAVA
- progressive streaming
- ORM
- Materialize
- JPA
- JDBC
- InputStream
- Hibernate
- DB2
- byte[]
- BLOB
- '7006'
- '301'
---
<p>Working with Hibernate and DB2 9, if you have a byte[] member in your entity which is supposed to be mapped to a BLOB column, you'll probably get:</p>
<pre class="brush: java;" title="code">
ERROR [org.hibernate.util.JDBCExceptionReporter] - &lt;DB2 SQL Error: SQLCODE=-301, SQLSTATE=07006, SQLERRMC=2, DRIVER=3.61.75&gt;
ERROR [org.hibernate.event.def.AbstractFlushingEventListener] - &lt;Could not synchronize database state with session&gt;
org.hibernate.exception.SQLGrammarException: could not insert...
</pre>
<p>Which in general means wrong data type!</p>
<p>After throwing lots of hooks into the sea of Google &amp; IBM, I came up with this one - thanks to Steve for his excellent fish <img alt="" src="http://www.tikalk.com/sites/all/modules/fckeditor/fckeditor/editor/images/smiley/msn/regular_smile.gif" /></p>
<p><a href="http://www.badlildog.com/words/?p=60">www.badlildog.com/words/</a></p>
<p>Which gave me a very good starting point. Noticing byte[] is mapped by hibernate to org.hibernate.type.</p>
<p><strong>Materialized</strong></p>
<p>BlobType,</p>
<p>I tried modifying the mapping by explicitly specifying the type as blob or binary (Hibernate specific)</p>
<pre class="brush: java;" title="code">
@Type(type=&quot;blob&quot;)
</pre>
<p>or changing the member type to Byte[], InputStream or even java.sql.Blob (which is a bad practice anyway). Well, the exception was gone, but, for some reason, the actual binary data was not inserted to the DB!</p>
<p>So getting back to steve's post, the only solution wich worked for me was overriding the connection's progressive streaming behaviour by adding the following property to the connection url:</p>
<pre class="brush: java;" title="code">
fullyMaterializeInputStreams=true;</pre>
<p>Hope this will save you a couple of fishing hours <img alt="" src="http://www.tikalk.com/sites/all/modules/fckeditor/fckeditor/editor/images/smiley/msn/wink_smile.gif" /></p>
<p>P.S. - Make sure you're using the latest DB2 JDBC driver, since the version shipped with your DB2 might contain some bugs...</p>
<p>Some resources and background:</p>
<p><a href="http://publib.boulder.ibm.com/infocenter/db2luw/v9/topic/com.ibm.db2.udb.apdv.java.doc/doc/cjvjdlob.htm">publib.boulder.ibm.com/infocenter/db2luw/v9/topic/com.ibm.db2.udb.apdv.java.doc/doc/cjvjdlob.htm</a></p>
<p><a href="http://publib.boulder.ibm.com/infocenter/db2luw/v9/topic/com.ibm.db2.udb.apdv.java.doc/doc/rjvdsprp.htm">publib.boulder.ibm.com/infocenter/db2luw/v9/topic/com.ibm.db2.udb.apdv.java.doc/doc/rjvdsprp.htm</a></p>
<p><a href="http://publib.boulder.ibm.com/infocenter/db2luw/v9r7/topic/com.ibm.db2.luw.messages.sql.doc/doc/msql00301n.html">publib.boulder.ibm.com/infocenter/db2luw/v9r7/topic/com.ibm.db2.luw.messages.sql.doc/doc/msql00301n.html</a></p>

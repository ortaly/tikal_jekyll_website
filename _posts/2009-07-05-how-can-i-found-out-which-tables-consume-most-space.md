---
layout: post
title: How can I found out which tables consume most space?
created: 1246778706
permalink: how-can-i-found-out-which-tables-consume-most-space
tags:
- JAVA
- MySQL
---
<p>Following a question I got from one of community members</p>
<p>&nbsp;</p>
<p><em>&quot;Do you now a fast way to find out, on a large mysql db, which tables consume most space?&quot;</em><br />
<br />
Since MySQL 5.0 a new virtual schema was added to the MySQL database INFORMATION_SCHEMA (apart to the well known mysql schema).</p>
<p>INFORMATION_SCHEMA is the information database, the place that stores information about all the other databases that the MySQL server maintains.<br />
<br />
One may query the&nbsp; information schema to get the table side, for example list the top 10 largest tables.<br />
&nbsp;</p>
<p><pre class="brush: sql">
SELECT  TABLE_SCHEMA,TABLE_NAME,DATA_LENGTH
FROM  INFORMATION_SCHEMA.TABLES WHERE
TABLE_SCHEMA <> 'information_schema' and TABLE_SCHEMA <>'mysql'
ORDER BY DATA_LENGTH DESC LIMIT 10
 

 

+--------------+---------------+-------------+
| TABLE_SCHEMA | TABLE_NAME    | DATA_LENGTH | 
+--------------+---------------+-------------+ 
| test         | archive       |   847440000 | 
| world        | City          |      273293 | 
| world        | Country       |       62379 | 
| world        | CountryLanguag|       38376 | 
| test         | engine2       |       16384 | 
| test         | aduit         |        4590 | 
| test         | test          |          49 | 
| test         | engine        |           0 | 
+--------------+---------------+-------------+
</pre></p>
<p>[root@haimr test]# ll | grep archive<br />
-rw-rw---- 1 mysql mysql&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 8622 2009-07-02 17:15 archive.frm<br />
-rw-rw---- 1 mysql mysql <strong>847440000</strong> 2009-07-05 08:40 archive.MYD<br />
-rw-rw---- 1 mysql mysql 435197952 2009-07-05 08:40 archive.MYI<br />
&nbsp;</p>

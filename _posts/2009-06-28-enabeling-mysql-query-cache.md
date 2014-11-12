---
layout: post
title: Enabeling MySQL Query Cache
created: 1246177603
author: udid
permalink: /java/enabeling-mysql-query-cache
tags:
- JAVA
- MySQL
- cache
---
<p>MySQL (5.5) query cahce is disabled by default (size is 0).</p>
<!--break-->
<p>&nbsp;</p>
<p>mysql&gt; SHOW VARIABLES LIKE '%query_cache%';<br />
| have_query_cache&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | YES&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | <br />
| query_cache_limit&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | 1048576&nbsp; | <br />
| query_cache_min_res_unit&nbsp;&nbsp;&nbsp;&nbsp; | 4096&nbsp;&nbsp;&nbsp;&nbsp; | <br />
| query_cache_size&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | 0 | <br />
| query_cache_type&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | ON&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | <br />
| query_cache_wlock_invalidate | OFF&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | <br />
6 rows in set (0.06 sec)</p>
<p>&nbsp;</p>
<p>To enable is you should set a size, e.g. 20MB</p>
<p>mysql&gt; SET GLOBAL query_cache_size=20000000;<br />
Query OK, 0 rows affected (0.00 sec)</p>
<p>&nbsp;</p>
<p>learn more:<br />
http://www.databasejournal.com/features/mysql/article.php/3110171/MySQLs-Query-Cache.htm<br />
&nbsp;</p>

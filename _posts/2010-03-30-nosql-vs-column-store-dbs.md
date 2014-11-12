---
layout: post
title: NoSQL vs. column-store DBs
created: 1269941306
author: udid
permalink: /devops/nosql-vs-column-store-dbs
tags:
- DevOps
- OLAP
- nosql
- Database
- column-store
- Databases
---
<p>Large scale analysis solution must be able to provide very fast response time (&lt;1sec) to some complex queries which are typically structured from a large fact table which is joined to many dimension tables and grouped-by them.</p>
<p>&nbsp;</p>
<p>Using standard SQL databases such as MySQL InnoDB (as well as leading commercial vendors) will result in poor performance even when correct indexes are set up since in many case the database will be forced to perform unnecessary full table scans which will kill the performance if dimension tables are large.</p>
<p>&nbsp;</p>
<p>The solution in this case would be to leverage a column-store database such as <a href="http://www.infobright.org/">InfoBright</a> or <a href="http://www.luciddb.org/">LucidDB</a> (many other exist) which are storing and indexing the data columns rather than the data rows. Column-stores have good bulk-load performance and great query performance, which makes them ideal for analytic purposes using an R-OLAP engine such as <a href="http://mondrian.pentaho.org/documentation/olap.php">Mondrian</a> which are capable of translating multi-dimensional queries in <a href="http://en.wikipedia.org/wiki/MultiDimensional_eXpressions">MDX</a> syntax to SQL queries. Their weakness is in poor update performance which is not a problem in the context of data-warehousing and analysis.</p>
<p>&nbsp;</p>
<p>Column-stores are SQL complaint and differ from NoSQL data-stores (<a href="http://dbmsmusings.blogspot.com/2010/03/distinguishing-two-major-types-of_29.html">read  more</a>). Most NoSQL database are not suited to handle massive multi-dimensional kind of analysis but some projects such as Apache's <a href="http://hadoop.apache.org/hive/">Hive</a> over Hadoop are targeting to further optimize NoSQL to support those needs.</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>

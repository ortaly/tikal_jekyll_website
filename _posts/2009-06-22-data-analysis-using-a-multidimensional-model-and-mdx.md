---
layout: post
title: Data analysis using a multidimensional model and MDX
created: 1245707583
author: udid
permalink: "/java/data-analysis-using-multidimensional-model-and-mdx"
tags:
- JAVA
- OLAP
- Mondrian
- MDX
---
<p>
<meta http-equiv="CONTENT-TYPE" content="text/html; charset=utf-8">
<title></title>
<meta name="GENERATOR" content="OpenOffice.org 2.4  (Linux)"> 	<style type="text/css">
	<!--
		@page { size: 8.5in 11in; margin: 0.79in }
		P { margin-bottom: 0.08in }
	-->
	</style> </meta>
</meta>
</p>
<p>Almost all mature database applications reaches a point when it needs to start reporting back statistical and aggregated data. The data about past behavior is usually kept in a transaction history log table and you will be tempted to write some fancy SQL that selects the records in a specific timeslot and then GROUPBY type, or country, or whatever while COUNTing, SUMming and AVGing on some values like profit or whatever make sense to your company.</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>Well, there's a better way !&nbsp;</p>
<!--break-->
<p>For the purpose of aggregating records, the most robust approach is to use a Multidimensional model (a.k.a OLAP).</p>
<p>&nbsp;</p>
<p>It is usually quite simple to transform the data into a multidimensional datamart or to build it on top of the existing tables, once it is there it becomes simple to generate smart views of the data using MDX.</p>
<p>&nbsp;</p>
<p>The best thing about it, is that it is a foundation for additional cool software such as Pivot tables, Flash charts, Dashboards and Reports.</p>
<p>&nbsp;</p>
<p>Now some links:</p>
<p>Pivot table: http://en.wikipedia.org/wiki/Pivot_table</p>
<p>Open Source (R)OLAP Engine: http://mondrian.pentaho.org/</p>
<p>MDX: http://en.wikipedia.org/wiki/Multidimensional_Expressions</p>
<p>MDX Essentials Series: http://www.databasejournal.com/features/mssql/article.php/1495511/MDX-at-First-Glance-Introduction-to-SQL-Server-MDX-Essentials.htm</p>

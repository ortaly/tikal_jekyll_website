---
layout: post
title: Scala Intergrated Query - a database query dsl for scala
created: 1308731537
author: ittayd
permalink: /incubator/scala-intergrated-query-database-query-dsl-scala
tags:
- Incubator
- Scala
- scala query
---
<p>http://code.google.com/p/scala-integrated-query/ (note the link to slides)</p>
<p>&nbsp;</p>
<p>This package allows to create typesafe queries that get compiled into an efficient set of sql queries. This means that code such as:</p>
<pre title="code" class="brush: scala;">
(for( n &lt;- nation ) yield {
  val cs =
    for( c &lt;- customer;
      if c.nationkey == n.nationkey
    ) yield c
  (n, cs)
}).fromDb</pre>
<p>&nbsp;</p>
<p>Executes only 2 SQL&nbsp;queries.&nbsp; Even though there is a nested loop (the code iterates all nations and for each nation finds all customers of that nation)</p>
<p>&nbsp;</p>
<p>I&nbsp;like the fusion it creates where on the one hand you work with regular objects and on the other, you don't get n+1 queries. </p>
<p>&nbsp;</p>
<p>This is done based on a new effort called virtualized scala (https://github.com/TiarkRompf/scala-virtualized/)&nbsp;that allows creating DSLs that don't execute code directly but instead return an expression tree (or AST) that can then be analyzed and optimized. In this case the resulting tree is analyzed to find the optimal queries that will allow to satisfy it (namely, getting all nations and all customers and iterating on the results). Other use cases for scala-virtualized are creating DSLs to work on data structures where the result can be optimized to work in parallel. The scala virtualized effort is backed by a 2.3 euro grant. </p>

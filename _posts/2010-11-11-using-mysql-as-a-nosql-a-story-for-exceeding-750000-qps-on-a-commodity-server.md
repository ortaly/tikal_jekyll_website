---
layout: post
title: 'Using MySQL as a NoSQL - A story for exceeding 750,000 qps on a commodity
  server '
created: 1289460110
author: ittayd
permalink: /incubator/using-mysql-nosql-story-exceeding-750000-qps-commodity-server
tags:
- Incubator
- MySQL
---
<p>http://yoshinorimatsunobu.blogspot.com/2010/10/using-mysql-as-nosql-story-for.html</p>
<p>&nbsp;</p>
<p>A very interesting article as to how to gain high performance from mysql by not going through sql parsing. It seems that if the database fits in memory, then the parsing of the sql statements creates a very high overhead on the overall query handling. The author of the article created a plugin for mysql that accepts PK&nbsp;queries in a much simpler format and therfore does not incur the parsing overhead. He got to benchmark results that are better than memcached. </p>
<p>&nbsp;</p>
<p>I&nbsp;wonder if using stored procedures for the query only (that is, without processing the results) will also create such gains?</p>

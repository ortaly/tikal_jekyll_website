---
layout: post
title: Sum Distinct Aggreration in a multi-dimensional model
created: 1248947503
author: udid
permalink: /java/sum-distinct-aggreration-multi-dimensional-model
tags:
- JAVA
- Pentaho
- OSBI
- OLAP
- Mondrian
---
<p>I am working with a multi-dimensional star-schema</p>
<p>http://en.wikipedia.org/wiki/Star_schema</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>and I need a special aggregation function to sum without duplicates</p>
<p>see http://forums.pentaho.org/showthread.php?t=71116</p>
<p>&nbsp;</p>
<p>I can see how this is done with SQL but not sure what is the best approch to implement it with Mondrian.</p>
<p>&nbsp;</p>
<p><strong>UPDATE: </strong>I was able to create the measure with relativly simle MDX. Code is attached.</p>
<p>&nbsp;</p>

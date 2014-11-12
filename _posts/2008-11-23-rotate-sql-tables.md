---
layout: post
title: Rotate SQL tables
created: 1227451462
permalink: rotate-sql-tables
tags:
- JAVA
- Databases
- sql
---
<p>&nbsp;I need rotate a relative big table (~100K rows)</p><p>The source table:</p><table width="200" border="1" cellpadding="1" cellspacing="1"><tbody><tr><td>id</td><td>env</td><td>date</td></tr><tr><td>1</td><td>yahoo</td><td>1/1/3</td></tr><tr><td>2</td><td>igoogle</td><td>1/1/4</td></tr><tr><td>3</td><td>vista</td><td>1/2/4</td></tr><tr><td>4</td><td>igoogle</td><td>1/1/2</td></tr><tr><td>5</td><td>iphone</td><td>12/12/02</td></tr></tbody></table><p>&nbsp;</p><p>Target table or query result set must be:</p><table width="200" border="1" cellpadding="1" cellspacing="1"><tbody><tr><td>&nbsp;</td><td>&nbsp;</td><td>iphone</td><td>igoogle</td><td>yahoo</td><td>vista</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>1</td><td>2</td><td>1</td><td>1</td></tr></tbody></table><p>&nbsp;</p><p>I need (in single SELECT) count rows grouping by 'env' and create result as shown before.</p><p>Any ideas?</p><p>&nbsp;</p>

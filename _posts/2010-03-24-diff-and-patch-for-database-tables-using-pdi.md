---
layout: post
title: diff and patch for database tables using PDI
created: 1269470589
author: udid
permalink: "/java/diff-and-patch-database-tables-using-pdi"
tags:
- JAVA
- pdi
- OSBI
- Databases
---
<p>Pentaho Data Integration (Kettle) has two cool steps that can &quot;diff&quot; and &quot;patch&quot; database tables.</p>
<p>&nbsp;</p>
<p>They can be usefull when you need to sync two tables across databases and would not want to &quot;drop-and-load&quot; the entire table each time or when you have a large update and you want to take updates and inserts from batch files.</p>
<p>&nbsp;</p>
<p>The diff step allow you to sync two tables (might be on different databases) by selecting all rows from both tables, comparing them to each other (you can specify the key-fields and the compare operator) and marking each row as identical/changed/new/deleted.</p>
<p>&nbsp;</p>
<p>The merge step will run updates/inserts/deletes against the second table so at the end it would be identical to the first table.</p>
<p>&nbsp;</p>
<p><img alt="" src="http://wiki.pentaho.com/download/attachments/13177839/synchronize-after-merge.png" /></p>
<p>By adding a filter to remove deletes after the diff, the program will only create updates/inserts resulting in batch updating.</p>
<p>&nbsp;</p>
<p>http://wiki.pentaho.com/display/EAI/Synchronize+after+merge</p>

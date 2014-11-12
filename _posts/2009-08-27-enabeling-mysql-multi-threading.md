---
layout: post
title: Enabeling MySQL multi threading
created: 1251333591
author: udid
permalink: /java/enabeling-mysql-multi-threading
tags:
- JAVA
- MySQL
- performance
---
<p>Does anyone know what is the default number of threads in MySQL?</p>
<p>&nbsp;</p>
<!--break-->
<p>Looks like it is 1.</p>
<p>&nbsp;</p>
<p>My server has 4 dual core CPUs, so I'll add to my.cfg</p>
<p>thread_concurrency = 8

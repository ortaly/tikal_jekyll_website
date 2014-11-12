---
layout: post
title: Migration of cache
created: 1344701392
author: artiom
permalink: /migration-cache
tags:
- JAVA
- java cache infinispan
- cache
- infinispan
---
<p>There is a messaging application that currently uses cache (infinispan) to persit its data. Infinispan relies on java serialiazation to serialize the data. The problem with this approach is that as far as I know there will be a problem during upgrade.</p>
<p>&nbsp;</p>
<p>Therefore I'm looking for an alternative persistence solution. The requirements are following:</p>
<p>&nbsp;</p>
<p>The applicatioin loads all the data at startup, thefore &quot;read&quot; efficiency is less important. Ammount of data is currently thousands of records which can become in the future 100,000. Asynchronic &quot;writes&quot; are highly preferable. The solution must be free. Scalable solutions are prefered.</p>

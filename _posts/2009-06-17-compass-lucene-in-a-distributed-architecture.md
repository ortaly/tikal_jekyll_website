---
layout: post
title: Compass / Lucene in a distributed architecture
created: 1245224828
permalink: compass-lucene-in-a-distributed-architecture
tags:
- JAVA
- lucene
- Compass
---
<p>A client is logging massive amounts of data using Compass running on a JBoss instance, running on a patched Linux OS.</p>
<p>Assuming:</p>
<p>1-The application is stateless, e.g. there are multiple JBoss instances writing compass logs, without clustering/session replication/passivation/fail over or whatever</p>
<p>2-We have N such servers,</p>
<p>3-The logs must be analyzed to produce a single output based on all the logs on the N servers&nbsp; and displayable on the management console.</p>
<p>4-Due to security restrictions, it is not possible or not feasible to use a single shared folder for all servers' Compass output/</p>
<p>5-Communication between servers is only possible via Hessian over SSL.</p>
<p>&nbsp;</p>
<p>What would be your preferred course of action in this case?</p>
<p>&nbsp;</p>
<p>I was inspecting:</p>
<p>http://www.kimchy.org/compasslucene-and-datagrids/</p>
<p>&nbsp;</p>
<p>Has anyone sucessfully attempted to implement this solution?</p>

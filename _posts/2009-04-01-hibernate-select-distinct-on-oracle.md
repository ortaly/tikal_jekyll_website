---
layout: post
title: Hibernate, Select DISTINCT on Oracle
created: 1238569879
permalink: hibernate-select-distinct-on-oracle
tags:
- JAVA
- Hibernate
- hibernate oracle
---
<p>Is there a way to define columns for SELECT DISTINCT object in HQL?</p>
<p>For example I execute next HQL - SELECT DISTINCT g FROM Group g;</p>
<p>Problem is&nbsp; - table GROUP contains BLOB field and Oracle doesn't like include BLOBs to DISTINCT request.</p>
<p>How can I exclude some fields from real SQL request ?</p>

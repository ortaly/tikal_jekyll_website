---
layout: post
title: ' how to config oralce-ds.xml for realize the oracle rac fast connection faiover'
created: 1276506642
permalink: how-to-config-oralce-ds-xml-for-realize-the-oracle-rac-fast-connection-faiover
tags:
- JAVA
- oracle
- rac
- fast connection failover
---
<p>I'm not clear on how to enable Fast Connection Failover with JBoss. Basically FCF is configurable&nbsp; by OracleDataSource.setFastConnectionFailoverEnabled(true); on a DataSource instance before retrieving any connections from that instance. But standart JBoss datasource xml&nbsp;configuration doesn't provide such settings.</p>

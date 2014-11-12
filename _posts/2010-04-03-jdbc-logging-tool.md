---
layout: post
title: JDBC Logging Tool
created: 1270323463
author: dmitri
permalink: /java/jdbc-logging-tool
tags:
- JAVA
- JDBC Logging Tool jdbclog
- Logging
- JDBC
---
<p>JDBC calls tracing tool named <a href="http://code.google.com/p/jdbcdslog/">jdbclog</a></p>
<p>&nbsp;</p>
<p>Features include:</p>
<ul>
    <li>can be attached on Connection, Driver  or DataSource(XA,Pooling) levels</li>
    <li>can log bind parameters for  PreparedStatement and CallableStatement calls</li>
    <li>can log result of  queries from ResultSet objects</li>
    <li>can log queries execution time</li>
    <li>logging  engine agnostic (thanks to SLF4J, you can use most of popular logging  libraries like log4j, apache common logging, java logging or simple  printing to System.out)</li>
</ul>

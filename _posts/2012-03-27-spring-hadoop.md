---
layout: post
title: spring-hadoop
created: 1332858347
permalink: spring-hadoop
tags:
- JAVA
- Spring
- Hadoop
---
<p>Hi,<br />
<br />
I have a working hadoop process.<br />
<br />
I would like to migrate it to spring framework using spring hadoop.<br />
<br />
I have a few questions.<br />
<br />
<br />
1. How does hadoop child procesess instatiate spring application context, Is the xml uploaded to distributed   <br />
cache?<br />
<br />
2. configureReducerTypesIfPossible() at JobFactoryBean  is not implemented, how does reducerKey and <br />
value types determined?<br />
<br />
3. How can I determine job properties like org.apache.hadoop.mapreduce.JobContext.setNumReduc  eTasks() , <br />
If they are not in spring-hadoop.xsd ?</p>
<p>&nbsp;</p>
<p>Thanks<br />
<br />
<br />
<br />
<br />
4.I would like to determine parameter 'input-path' dynamically at runtime, What is the recommened <br />
approcah?</p>

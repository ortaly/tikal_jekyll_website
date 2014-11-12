---
layout: post
title: Time-Based Data Aggregation with Cassandra
created: 1341495012
author: zvika
permalink: /time-based-data-aggregation-cassandra
tags:
- JAVA
- cassandra
---
<p>For collecting time-based data, for example, such that is streamed from single or multiple resource monitors including CPU, disk usage etc., data volumes can pretty quickly become daunting and unusable even with the most modern relational database.</p>
<p>In such cases, using a NoSQL DB may be a good idea. Modeling the data isn't as trivial as inserting each new time-based sample into a new row - rather, the recommended model is actually aggregating the data horizontally by adding new columns whose name is the collection timestamp and the value is the measured metric.</p>
<p>Below is a summary of all resources I've used to develop a solution for the problem of this type using Cassandra DB - for some reason they were not easy to gather, hoping this summary may help whoever is implementing a solution for a similar problem.</p>
<p>&nbsp;</p>
<ol>
    <li>Basic Time Series with Cassandra:<br />
    <a href="http://rubyscale.com/blog/2011/03/06/basic-time-series-with-cassandra/">http://rubyscale.com/blog/2011/03/06/basic-time-series-with-cassandra/</a></li>
    <li>Modeling Time Series Data on top of Cassandra:<br />
    <a href="http://engineering.rockmelt.com/post/17229017779/modeling-time-series-data-on-top-of-cassandra">http://engineering.rockmelt.com/post/17229017779/modeling-time-series-data-on-top-of-cassandra</a></li>
    <li>Cassandra Developer Center :: Advanced Time Series with Cassandra<br />
    <a href="http://www.datastax.com/dev/blog/advanced-time-series-with-cassandra">http://www.datastax.com/dev/blog/advanced-time-series-with-cassandra<br />
    </a><span style="color: rgb(102, 102, 102); "><a href="http://www.datastax.com/dev/blog/advanced-time-series-with-cassandra"><br />
    </a></span></li>
    <li><span style="color: rgb(102, 102, 102); ">Also, it is probably a good idea to read about Cassandra's Time UUIDs, which you will need to use as column names, explained in:<br />
    </span><a href="http://wiki.apache.org/cassandra/FAQ#working_with_timeuuid_in_java">http://wiki.apache.org/cassandra/FAQ#working_with_timeuuid_in_java<br type="_moz" />
    </a><a href="http://stackoverflow.com/questions/2614195/in-cassandra-terminology-what-is-timeuuid">http://stackoverflow.com/questions/2614195/in-cassandra-terminology-what-is-timeuuid</a></li>
    <li>Lastly, if using Hector as Cassandra driver (recommended), it probably makes more sense to use its&nbsp;<a href="http://hector-client.github.com/hector//source/content/API/core/1.0-1/me/prettyprint/cassandra/utils/TimeUUIDUtils.html">me.prettyprint.cassandra.utils.TimeUUIDUtils</a></li>
</ol>
<p>&nbsp;</p>
<p>Hopefully, a more concrete code example will soon follow soon...</p>
<p>&nbsp;</p>

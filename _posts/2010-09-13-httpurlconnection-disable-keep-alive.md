---
layout: post
title: HttpURLConnection - disable keep alive
created: 1284407348
permalink: httpurlconnection-disable-keep-alive
tags:
- JAVA
- HTTP
---
<p>I thought to share with you a simple http connection sense and a solution to a very annoying problem which wasn't so simple to find its source.<br />
This problem/bug occurred once in a while, approx once to 10K requests.<br />
short description of the system: i built an application server that have workers for various services, these workers create http requests to the server in order to get jobs, these jobs are sent to the workers in the response using JSON and so on..<br />
The bug: some client requests were lost in stress test.<br />
The solution: after connecting using HttpURLConnection to the server, it isn't enough just to close the BufferedReader and the DataOutputStream<br />
&nbsp;&nbsp;&nbsp; for example:&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;</p>
<pre title="code" class="brush: java;">
if(reader!=null) reader.close();
if(output != null) output.close();</pre>
<p>it is essential to disconnect the connection it self:</p>
<pre title="code" class="brush: java;">
if(connection != null) connection.disconnect();</pre>
<p>but also to disable the keep alive (before connecting)</p>
<pre title="code" class="brush: java;">
connection.setRequestProperty(&quot;Connection&quot;, &quot;close&quot;);</pre>
<p>if the connection will not be disconnected, the server can use the same connection twice, so requests can be over-ridded, the keep alive is disabled also for preventing reusing connections.<br />
Hope it helped and will save someone some time.</p>

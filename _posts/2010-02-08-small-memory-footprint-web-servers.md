---
layout: post
title: Small memory footprint web servers?
created: 1265635332
permalink: small-memory-footprint-web-servers
tags:
- DevOps
- jvm
- web server
---
<p>HI,</p>
<p>For a web services POC using Spring + CXF I am testing Jetty in a OS environment which has limited resources (such as total RAM of 512 MB), runs a .Net application and has to run a Java servlet container. </p>
<p>&nbsp;</p>
<p>At present Jetty has the following JVM parameters: </p>
<p>&nbsp;-Xms15M -Xmx15M -XX:MaxPermSize=16M and the Xss (stack size per thread) is the default. </p>
<p>&nbsp;</p>
<p>While load testing with ab (Apache benchmark), I was able to lower the heap size to 15MB however the perm zise can not be lowered to&nbsp; less than 16MB.&nbsp; </p>
<p>The scenario tested was with 50,000 requests over 10 threads, the size of each request is 10k.&nbsp; </p>
<p>&nbsp;</p>
<p>Questions:</p>
<p>Has anyone had any good experience with other small memory footprint web server? I used Winston before for running hudson, but is it being utilized in production environments? </p>
<p>&nbsp;</p>
<p>Thanks,</p>
<p>&nbsp;</p>
<p>Shlomo.</p>
<p>&nbsp;</p>
<p>&nbsp;</p>

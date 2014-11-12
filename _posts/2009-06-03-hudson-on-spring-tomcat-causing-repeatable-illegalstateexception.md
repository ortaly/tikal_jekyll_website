---
layout: post
title: Hudson on spring tomcat causing repeatable IllegalStateException
created: 1244059527
author: shalom
permalink: /java/hudson-spring-tomcat-causing-repeatable-illegalstateexception
tags:
- JAVA
- Hudson
- hudson tomcat spring
---
<p>reported by one of our customers a very irritating behaviore of Hudson on spring tc server:</p>
<p>&nbsp;</p>
<p class="MsoNormal"><span style="font-size: 10pt; font-family: &quot;Georgia&quot;,&quot;serif&quot;;">We&rsquo;re using Hudson (<b>1.292, 1.306-1.309</b>) and it started to cause IllegalStateException to be thrown very frequently (every couple of seconds).<o:p></o:p></span></p>
<p class="MsoNormal"><span style="font-size: 10pt; font-family: &quot;Georgia&quot;,&quot;serif&quot;;"><o:p>&nbsp;</o:p></span></p>
<p class="MsoNormal"><span style="font-size: 10pt; font-family: &quot;Georgia&quot;,&quot;serif&quot;;">It starts doing so when opened in certain browsers &ndash; at first, I thought it only happens with <b>Firefox 3.5 Beta 4</b>, <o:p></o:p></span></p>
<p class="MsoNormal"><span style="font-size: 10pt; font-family: &quot;Georgia&quot;,&quot;serif&quot;;">but then it was happening with <b>3.0.10</b> as well (even in a safe mode and reinstalled from scratch!). <o:p></o:p></span></p>
<p class="MsoNormal"><span style="font-size: 10pt; font-family: &quot;Georgia&quot;,&quot;serif&quot;;">Chrome <b>3.0.182.3</b> was safe to use most of the time but once it also caused Hudson to start throwing this exception <o:p></o:p></span></p>
<p class="MsoNormal"><span style="font-size: 10pt; font-family: &quot;Georgia&quot;,&quot;serif&quot;;">every couple of seconds.<o:p></o:p></span></p>
<p class="MsoNormal"><span style="font-size: 10pt; font-family: &quot;Georgia&quot;,&quot;serif&quot;;"><o:p>&nbsp;</o:p></span></p>
<p class="MsoNormal"><span style="font-size: 10pt; font-family: &quot;Georgia&quot;,&quot;serif&quot;;">So far <b>IE8</b> is doing well and I didn&rsquo;t see it causing Hudson to go crazy like that. It still throws a couple of exceptions (all the same)<o:p></o:p></span></p>
<p class="MsoNormal"><span style="font-size: 10pt; font-family: &quot;Georgia&quot;,&quot;serif&quot;;">but at least it doesn&rsquo;t start to do so in a cycle.<o:p></o:p></span></p>
<p>&nbsp;</p>
<p><span style="font-size: 10pt; font-family: &quot;Georgia&quot;,&quot;serif&quot;;"><o:p></o:p></span> <span style="font-size: 10pt; font-family: &quot;Georgia&quot;,&quot;serif&quot;;">The machine is Windows 2008 Enterprise SP2, 64 bit. It&rsquo;s a virtual server</span></p>
<p>&nbsp;</p>
<p>there are many reports on the exception bellow but we can't figure out what to relate it to,</p>
<p>any idea is welcome.</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>and this is the exception trace</p>
<p>&nbsp;</p>
<p>Exception:<br />
java.lang.IllegalStateException: Cannot create a session after the response has been committed <br />
&nbsp;&nbsp;&nbsp; at org.apache.catalina.connector.Request.doGetSession(Request.java:2313) <br />
&nbsp;&nbsp;&nbsp; at org.apache.catalina.connector.Request.getSession(Request.java:2074) <br />
&nbsp;&nbsp;&nbsp; at org.apache.catalina.connector.RequestFacade.getSession(RequestFacade.java:833) <br />
&nbsp;&nbsp;&nbsp; at org.acegisecurity.context.HttpSessionContextIntegrationFilter.storeSecurityContextInSession(HttpSessionContextIntegrationFilter.java:391) <br />
&nbsp;&nbsp;&nbsp; at org.acegisecurity.context.HttpSessionContextIntegrationFilter.doFilter(HttpSessionContextIntegrationFilter.java:264) <br />
&nbsp;&nbsp;&nbsp; at hudson.security.HttpSessionContextIntegrationFilter2.doFilter(HttpSessionContextIntegrationFilter2.java:66) <br />
&nbsp;&nbsp;&nbsp; at hudson.security.ChainedServletFilter$1.doFilter(ChainedServletFilter.java:87) <br />
&nbsp;&nbsp;&nbsp; at hudson.security.ChainedServletFilter.doFilter(ChainedServletFilter.java:76) <br />
&nbsp;&nbsp;&nbsp; at hudson.security.HudsonFilter.doFilter(HudsonFilter.java:155) <br />
&nbsp;&nbsp;&nbsp; at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:235) <br />
&nbsp;&nbsp;&nbsp; at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:206) <br />
&nbsp;&nbsp;&nbsp; at org.apache.catalina.core.StandardWrapperValve.invoke(StandardWrapperValve.java:233) <br />
&nbsp;&nbsp;&nbsp; at org.apache.catalina.core.StandardContextValve.invoke(StandardContextValve.java:191) <br />
&nbsp;&nbsp;&nbsp; at org.apache.catalina.authenticator.AuthenticatorBase.invoke(AuthenticatorBase.java:433) <br />
&nbsp;&nbsp;&nbsp; at org.apache.catalina.core.StandardHostValve.invoke(StandardHostValve.java:128) <br />
&nbsp;&nbsp;&nbsp; at org.apache.catalina.valves.ErrorReportValve.invoke(ErrorReportValve.java:102) <br />
&nbsp;&nbsp;&nbsp; at org.apache.catalina.core.StandardEngineValve.invoke(StandardEngineValve.java:109) <br />
&nbsp;&nbsp;&nbsp; at org.apache.catalina.connector.CoyoteAdapter.service(CoyoteAdapter.java:293) <br />
&nbsp;&nbsp;&nbsp; at org.apache.coyote.http11.Http11Processor.process(Http11Processor.java:847) <br />
&nbsp;&nbsp;&nbsp; at org.apache.coyote.http11.Http11Protocol$Http11ConnectionHandler.process(Http11Protocol.java:583) <br />
&nbsp;&nbsp;&nbsp; at org.apache.tomcat.util.net.JIoEndpoint$SocketProcessor.run(JIoEndpoint.java:361) <br />
&nbsp;&nbsp;&nbsp; at java.util.concurrent.ThreadPoolExecutor$Worker.runTask(ThreadPoolExecutor.java:886) <br />
&nbsp;&nbsp;&nbsp; at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:908) <br />
&nbsp;&nbsp;&nbsp; at java.lang.Thread.run(Thread.java:619)</p>

---
layout: post
title: Problem reporting event to Syslog with Log4j
created: 1250415386
permalink: problem-reporting-event-to-syslog-with-log4j
tags:
- JAVA
- log4j
---
<p>Did anybody tried this ?</p>
<p>I have configured the Log4j to write to Syslog. Syslog service is up and running, but nothing is printed into syslog.</p>
<p>Here is my log4j.xml</p>
<p>&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot; ?&gt;<br />
&lt;!DOCTYPE log4j:configuration SYSTEM &quot;log4j.dtd&quot;&gt;<br />
<br />
&lt;log4j:configuration xmlns:log4j=&quot;http://jakarta.apache.org/log4j/&quot;&gt;<br />
<br />
&lt;appender name=&quot;syslog&quot; class=&quot;org.apache.log4j.net.SyslogAppender&quot;&gt;<br />
&nbsp;&nbsp;&nbsp;&nbsp; &lt;param name=&quot;SyslogHost&quot; value=&quot;127.0.0.1&quot;/&gt; <br />
&nbsp;&nbsp;&nbsp;&nbsp; &lt;param name=&quot;Facility&quot; value=&quot;USER&quot;/&gt; <br />
&nbsp;&nbsp;&nbsp; &lt;param name=&quot;Threshold&quot; value=&quot;INFO&quot;/&gt;<br />
&nbsp;&nbsp;&nbsp;&nbsp; &lt;param name=&quot;FacilityPrinting&quot; value=&quot;true&quot;/&gt; <br />
&nbsp;&nbsp;&nbsp;&nbsp; &lt;layout class=&quot;org.apache.log4j.PatternLayout&quot;&gt;<br />
&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &lt;param name=&quot;ConversionPattern&quot; value=&quot;%t %5r %-5p %-21d{yyyyMMdd [HH]mm:ss,SSS} %c{2} [%x] %m %n&quot;/&gt;<br />
&nbsp;&nbsp;&nbsp;&nbsp; &lt;/layout&gt;<br />
&lt;/appender&gt;<br />
&nbsp;<br />
&nbsp; &lt;appender name=&quot;console&quot; class=&quot;org.apache.log4j.ConsoleAppender&quot;&gt;<br />
&nbsp;&nbsp;&nbsp; &lt;param name=&quot;Target&quot; value=&quot;System.out&quot;/&gt;<br />
&nbsp;&nbsp;&nbsp; &lt;param name=&quot;Threshold&quot; value=&quot;INFO&quot;/&gt;<br />
&nbsp;&nbsp;&nbsp; &lt;layout class=&quot;org.apache.log4j.PatternLayout&quot;&gt;<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;param name=&quot;ConversionPattern&quot; value=&quot;%-5p %t %c{1} - %m%n&quot;/&gt;<br />
&nbsp;&nbsp;&nbsp; &lt;/layout&gt;<br />
&nbsp; &lt;/appender&gt;<br />
<br />
&nbsp; &lt;logger name=&quot;com.clearforest&quot;&gt;<br />
&nbsp;&nbsp;&nbsp; &lt;level value=&quot;INFO&quot;/&gt;<br />
&nbsp;&nbsp;&nbsp; &lt;appender-ref ref=&quot;syslog&quot; /&gt;<br />
&nbsp;&nbsp;&nbsp; &lt;appender-ref ref=&quot;console&quot; /&gt;<br />
&nbsp; &lt;/logger&gt;<br />
<br />
&nbsp; &lt;root&gt;<br />
&nbsp;&nbsp;&nbsp; &lt;level value=&quot;info&quot;/&gt;<br />
&nbsp;&nbsp;&nbsp; &lt;appender-ref ref=&quot;syslog&quot; /&gt;<br />
&nbsp; &lt;/root&gt;<br />
&lt;/log4j:configuration&gt;</p>

---
layout: post
title: When to use Tomcat CATALINA_OPTS instead of JAVA_OPTS
created: 1308578626
author: roni
permalink: /java/when-use-tomcat-catalinaopts-instead-javaopts
tags:
- JAVA
---
<p>We have an environment with the follwing elements:</p>
<ul>
    <li>Apache Tomcat Version 6.0.29</li>
    <li>JMX technology</li>
    <li>Web application</li>
</ul>
<p>Every time we stop the tomcat server using the standrd shutdown.sh script it was failed, the tomcat process remains alive and the following exception was thrown:</p>
<p><em>Error: Exception thrown by the agent : java.rmi.server.ExportException: Port already in use: 7004; nested exception is: java.net.BindException: Address already in use</em></p>
<p>We know that 7004 is our JMX remote port, but it was not clear why the tomcat shutdown requires to bind this port.</p>
<p>After some research we found out that when tomcat starts, port 7004 (in this example) is bound. For shutdown, another jvm is launched and gets the same jmx parameters. Therefore, it tries to bind to port 7004, too, fails and shuts the jvm down. The shutdown procedure and thus tomcat is still running.</p>
<p>The problem is actually wider because each JAVA_OPTS property is also being used also when shutting down, and in most cases this is not the behavior we might expect. Think we would like to extend the VM memory, we probably don't want the shutdown to start a second VM with that memory size.</p>
<p>Tomcat community has been released a fix for this issue from tomcat 5.5.21 onwards and it called CATALINA_OPTS.</p>
<p>All we need is to undersatnd how to use it properly. Properties that will be set to CATALINA_OPTS will be apply to start and rub but not stop, JAVA_OPTS will apply to all three.</p>
<p>For example in our case we need to set the JMX remote port to CATALINA_OPTS and not to JAVA_OPTS:</p>
<p><em>export CATALINA_OPTS=&quot;$CATALINA_OPTS -Dcom.sun.management.jmxremote.port=7004&quot;</em></p>
<p>After using this method the tomcat shutdown process is working smoothly.</p>

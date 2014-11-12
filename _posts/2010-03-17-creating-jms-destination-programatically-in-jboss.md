---
layout: post
title: Creating JMS destination programatically in JBoss
created: 1268858647
author: yanai
permalink: /java/creating-jms-destination-programatically-jboss
tags:
- JAVA
- JMS JBoss dynamic queue
---
<p>
<meta http-equiv="CONTENT-TYPE" content="text/html; charset=utf-8">
<meta name="GENERATOR" content="OpenOffice.org 3.1  (Linux)"> 	<style type="text/css">
	<!--
		<a href="http://twitter.com/page">@page</a> { margin: 0.79in }
		P { margin-bottom: 0.08in }
		A:link { so-language: zxx }
	-->
	</style>   </meta>
</meta>
</p>
<p style="margin-bottom: 0in;">One of our clients wanted to create a queue programaticly in JBoss environment. JMS provides a mechanism to create temporary queue using javax.jms.Session api. However the spec states that &ldquo;<i><b>&quot;The physical creation of queues is an administrative task and is not to be initiated by the JMS API. The one exception is the creation of temporary queues, which is accomplished with the </b></i><code><i><b>createTemporaryQueue</b></i></code><i><b> method. &quot;.  </b></i></p>
<p style="margin-bottom: 0in;"><span style="font-style: normal;"><span style="font-weight: normal;">Nevertheless, the customer wanted its queue to be not &ldquo;temporary&rdquo; (due to internal constraints). Constructing non-temporary queue can be done with JBoss specific management api. JBoss can use three different JMS providers (depend on which JBoss version you use). The latest and greatest is <a href="http://www.jboss.org/hornetq">HornetQ</a> - its manual it is explained how to do it - <a href="http://hornetq.sourceforge.net/docs/hornetq-2.0.0.GA/user-manual/en/html/management.html#d0e5385">Please read here</a>. Nonetheless,  <a href="http://www.jboss.org/jbossmessaging/">JBoss-Messaging</a> also provides such api - <a href="http://www.jboss.org/file-access/default/members/jbossmessaging/freezone/docs/usermanual-2.0.0.beta4/html/management.html#d0e4429">Please see here</a>.</span></span></p>
<p>&nbsp;</p>

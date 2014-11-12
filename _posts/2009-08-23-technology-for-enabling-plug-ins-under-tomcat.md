---
layout: post
title: Technology for enabling Plug-ins under Tomcat
created: 1251030631
author: zvika
permalink: /java/technology-enabling-plug-ins-under-tomcat
tags:
- JAVA
- OSGi
---
<p>hi,</p>
<p>&nbsp;</p>
<p>My client is looking for a framework that will enable her to write and deploy plugins on its system.</p>
<p>Had the runtime environment been JBoss, I would've picked MBeans, but since they are using Tomcat, that is not an option.</p>
<p>At some stage the idea of using OSGi has been brought up. However, transforming the entire system to be OSGi based seem to mean a lot for production site. On the other hand, OSGi features such as classloading domains, restricted module dependency etc. all may be useful in the future. Their question is: What does it mean using OSGi as a part of an application? Does it require changing the entire runtime from grounds up or can it be used only for one,&nbsp; specific subsystem? can it be used only for loading plugin bundles instead of the entire app? are there any in-avoidable transition sosts (i.e. build, execution scripts, etc.) ?</p>
<p>&nbsp;</p>
<p>thanks,</p>
<p>Zvika</p>
<p>&nbsp;</p>

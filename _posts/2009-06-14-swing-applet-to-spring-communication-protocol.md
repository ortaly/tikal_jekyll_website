---
layout: post
title: Swing-Applet to Spring communication protocol
created: 1245004281
author: shalom
permalink: /java/swing-applet-spring-communication-protocol
tags:
- JAVA
- Spring
---
<p>We have a Swing Applet client that needs to communicate with a Spring/hibernate application running on tomcat, the requirements are pretty standard , passing data objects through and forth, considering firewalls and performance. <br />
the current implementation is soap with axis 1 (that has some limitations on transmitting hibernate objects and proxies,have to set null on proxies before sending them with axis).</p>
<p>what would you consider as a replacement to soap/axis? Rest? RMI? Spring remoting?</p>

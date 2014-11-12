---
layout: post
title: Getting local host via InetAddress.getLocalHost() under Linux
created: 1297089623
author: zvika
permalink: /java/getting-local-host-inetaddressgetlocalhost-under-linux
tags:
- JAVA
- Linux
---
<p>Hi,</p>
<p>&nbsp;</p>
<p>Whatever I do, Linux machines in my project throw an exception when calling java.net.InetAddress.getLocalHost().</p>
<p>Googling about it confirmed there's an issue here, ancient as the moon, but I could not find any solution. </p>
<p>This nasty behavior hinders initialization of ehcache and execution of jmeter tests, just to name a few places. </p>
<p>I stopped using it from my code altogether, but some code that uses it (as these two examples) resides in my 3rd party libraries.</p>
<p>&nbsp;</p>
<p>Does anybody know of a fix to this issue? whether java-based or network configuration, any suggestion is welcome...</p>
<p>&nbsp;</p>
<p>Thanks!</p>
<p>Zvika</p>
<p>&nbsp;</p>

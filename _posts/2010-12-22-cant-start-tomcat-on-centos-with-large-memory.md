---
layout: post
title: can't start tomcat on centos with large memory
created: 1293020893
author: shalom
permalink: /devops/cant-start-tomcat-centos-large-memory
tags:
- DevOps
- jvm centos linux
---
<p>We are trying to run tomcat 5 with 30G&nbsp;memeory: -Xms30G -Xmx30G, running on centos 5 64bit with 64G memory and 24 CPUs.</p>
<p>we know that the jvm requires contiguous memory, before starting tomcat 'free -m' shows there are 40G available.</p>
<p>what ever we do we can't start the jvm with more then 26G, beyond that it complains on &quot;Cannot allocate memory for initial java heap&quot;.</p>
<p>any idea will be helpfull.</p>
<p>&nbsp;</p>

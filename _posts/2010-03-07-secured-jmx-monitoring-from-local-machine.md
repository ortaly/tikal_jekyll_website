---
layout: post
title: secured JMX monitoring from local machine
created: 1267973642
author: shalom
permalink: /devops/secured-jmx-monitoring-local-machine
tags:
- DevOps
- jmx
- jconsole
---
<p>Hi<br />
We have a customer request for secured JMX monitoring ,a nd they are very strict on security.<br />
the requirenments are:<br />
JMX agaent can be accessed from the local machine only using tools like Nagios or jmxterm.<br />
should be password protected.<br />
should not expose any open post on the local network.<br />
<br />
if we configure JMX with jmi connector and password authentication the the rmi port is available on the local network and a clever hacker can break it. of course one solution can be to block this port with a local firewal or some other way to block the port for access from outside the machine.<br />
<br />
if we use the Attach API to start and access the JMX agent the password authentication is not available.<br />
<br />
so the question is: what is the way to enablr JMX monitoring from the local machine only with password authentication and no port exposed to the local network.<br />
<br />
Thanks.</p>

---
layout: post
title: Calling a web service with self-signed SSL certificate
created: 1245595362
author: zvika
permalink: /java/calling-web-service-self-signed-ssl-certificate
tags:
- JAVA
- ssl
---
<p>&nbsp;</p>
<p>Say you want to invoke a remote web service deployed on a server that requires SSL. Say, the maintainers of the server couldn't (ot could not be bothered) getting a real, shiny, authetic, SSL certificate signed by a real CA. Or - more likely - let's say you are the one developing the service and the service consumer, and you don't have a valid certificate for each of your development machines (as you may know, ssl certificates are specific to a machine). </p>
<p><strong>Problem</strong>: your http client used to access the service will never pass the ssl handshake. </p>
<p><strong>Solution</strong>: see here: <a href="http://devcentral.f5.com/weblogs/joe/archive/2005/07/06/1345.aspx">http://devcentral.f5.com/weblogs/joe/archive/2005/07/06/1345.aspx</a> for a real life saver</p>

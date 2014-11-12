---
layout: post
title: Publish a WebService from a POJA with Java 6
created: 1244670556
author: zvika
permalink: "/java/publish-webservice-poja-java-6"
tags:
- JAVA
- Java 6
---
<p>An article demonstrating a neat Java 6 SE feature: publishing a SOAP web service from a standalone application. This may be quite useful for prototyping, testing, building slim gateways that expose a WS on the outside and connect to an internal JVM process on the inside without the need for a full blown container. How can this be done? using the magical @WebService annotation and a call to Endpoint.publish(url, serviceObj). Ooops! I've ruined the surprise.</p>
<p>&nbsp;</p>
<p>See: <a href="http://technology.amis.nl/blog/5560/publish-a-webservice-from-a-poja-plain-old-java-application-that-is-out-of-the-container-using-endpoint-class">http://technology.amis.nl/blog/5560/publish-a-webservice-from-a-poja-plain-old-java-application-that-is-out-of-the-container-using-endpoint-class</a></p>

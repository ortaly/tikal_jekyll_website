---
layout: post
title: Exposing Spring services over http - need recommendations
created: 1297175998
author: shalom
permalink: /java/exposing-spring-services-over-http-need-recommendations
tags:
- JAVA
- java spring resteasy jersey jaxrs
---
<p>Hi</p>
<p>We have a spring 3 application running on tomcat and secured with spring security (form login). the spring beans are exposed with HttpInvoker and our native client is a java applet. using HttpInvoker from the java applet is seamless, when calling the applet page, if a user is not authenticated spring security redirect to a login jsp. from now on the java plugin on the client side knows how to put the http session id on the http header for every HttpInvoker call.</p>
<p>Now, we want to expose some of our services in a more friendly way then HttpInvoker and of course REST/JSON is the first thing that comes in mind because our future clients could be written in any language, most probably .net clients.</p>
<p>So we'd like to hear experienced recommendations of what's the best REST framework to integrate with spring and spring security, is it resteasy, jersey,CXF,restlet, spring mvc.</p>
<p>Thank you.</p>
<p>&nbsp;</p>

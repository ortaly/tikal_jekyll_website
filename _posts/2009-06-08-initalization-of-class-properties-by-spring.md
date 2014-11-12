---
layout: post
title: Initalization of Class properties by Spring
created: 1244471102
permalink: initalization-of-class-properties-by-spring
tags:
- JAVA
---
<p>I need to initialize a property of a class , which contains a path to a folder.</p>
<p>I used this property within the default constructor of the class.</p>
<p>it seems that Spring does not initialize this property before it executes the constructor, thus i get a crash with NullPointerException.</p>
<p>&nbsp;</p>
<p>Alternatively i need to get a relative path to that Sprin bean, which runs under Tomcat. Had this been a Servlet, there would be no problem to get relative path. But how do i achieve same result with Spring ?</p>
<p>&nbsp;</p>

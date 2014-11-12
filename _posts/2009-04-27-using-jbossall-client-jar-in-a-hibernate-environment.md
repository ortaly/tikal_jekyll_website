---
layout: post
title: Using jbossall-client jar in a Hibernate environment
created: 1240867101
author: zvika
permalink: "/java/using-jbossall-client-jar-hibernate-environment"
tags:
- JAVA
- jmx
- jboss
- Hibernate
---
<p>hi,</p>
<p>While working on a web app which included a Hibernate module,&nbsp; I had to write a JMX client that communicates with another server instence.</p>
<p>After writing the client (using JBoss's RMIAdaptor), I wanted to test it, so I started adding JBoss dependencies to my project's pom.xml. At about the the 5th one, I stopped and reverted to the one jar that is supposed to rule them all: jbossclient-all.jar. While running the test, however, I got:</p>
<p><strong>java.lang.NoSuchMethodError: org.hibernate.cfg.ExtendedMappings.getReflectionManager()Lorg/hibernate/reflection/ReflectionManager;</strong></p>
<p>Indeed, the above jar contained some Hibernate classes (Hibernate classes? in a client jar? wtf?) - which were probably the reason for the graceful(not) behavior. My question: has anyone tackled this issue before? has anyone written jboss-specific JMX code and had to resolve the dependency issues?</p>
<p>&nbsp;</p>
<p>cheers,</p>
<p>&nbsp;</p>

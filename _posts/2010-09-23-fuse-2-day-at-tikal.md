---
layout: post
title: 'Fuse #2 day at Tikal'
created: 1285272869
author: yanai
permalink: /java/fuse-2-day-tikal
tags:
- JAVA
- Fuse REST
---
<p><style type="text/css">p { margin-bottom: 0.08in; }</style></p>
<p style="margin-bottom: 0in;">I would like to give a short overview about what we did in the second Fuse day at Tikal, took place on Sptember 5th. Naturally, I will concentrate on the Java group activity this day, and its integration with other groups. I will describe shortly the objectives and what we achieved (also what we didn't achieve).</p>
<p style="margin-bottom: 0in;">In this Fuse we decided to &ldquo;eat our own dog food&rdquo; and use common and proven Java technologies, the same ones that serve most of Tikal customers,  rather than going with cutting edge ones. We also wanted to create something valuable, which provides more motivation to complete the project within a limited time &ndash; one day of work. We decided to take the TimeTracker software that is used by Tikal employees and convert it from a LAMP application to modern Java application. We wanted to use the same RDBMS used by the current application, and rewrite the application, so there will be no schema changes.</p>
<p style="margin-bottom: 0in;">The last requirement was that the interface will be used both by Flex , CLI and thin HTNL5 web clients, so we decided to use REST over HTTP protocol.</p>
<p style="margin-bottom: 0in;">The steps that we followed are. Here are the technical steps that we followed:</p>
<ol>
    <li>
    <p style="margin-bottom: 0in;">Choose the technologies &ndash; We 	used JPA2 /Hibernate as persistence layer. Spring 3 as our 	Dependency Injection and application framework, and RESTEasy as our 	JAX-RS REST provider implementation..</p>
    </li>
    <li>
    <p style="margin-bottom: 0in;">Design the object model &ndash; This 	was done as reverse engineer from the existing DB schema.</p>
    </li>
    <li>
    <p style="margin-bottom: 0in;">Map the created classes as 	entities mapped to the DB tables &ndash; this was done using JPA2 	annotations.</p>
    </li>
    <li>
    <p style="margin-bottom: 0in;">Build DAO interface layer -  This 	layer was thin and was implementation agnostic.</p>
    </li>
    <li>
    <p style="margin-bottom: 0in;">Implement JPA2 implementation 	behind the created interface. As mentioned, we used Hibernate as 	JPA2 vendor.</p>
    </li>
    <li>
    <p style="margin-bottom: 0in;">Create a service interface and 	implementation &ndash; This layer was transactional, and used the DAO 	interfaces to access the DB.</p>
    </li>
    <li>
    <p style="margin-bottom: 0in;">Provide REST interface using the 	standard JAX-RS using RESTEasy vendor. We used JSON as a format for 	our data, and we used JAXB annotations to map the domain model to 	JSON.</p>
    </li>
    <li>
    <p style="margin-bottom: 0in;">Provide a web layer that will 	assemble all artifacts and third parties into a standard web folder. 	This folder was deployed within Tomcat web server.</p>
    </li>
    <li>
    <p style="margin-bottom: 0in;">Create pom.xml file and use Maven2 	as our build engine.</p>
    </li>
</ol>
<p style="margin-bottom: 0in;">Using the plan above the implementation was strait forward. The only part that we had to coordinate with other team was the exact REST interface. This included both the URL and input/output data payload. It was NOT an easy task, since different people had different views for how this api should look like. REST is loosely coupled and does NOT dictate any standard, it just provide an architecture for building the application. The design and implementation for the interface was up to us . However, we finally set it up, and got a working application. On the last hour we integrated it with the Flex team, so we could see the application with nice GUI.</p>
<p style="margin-bottom: 0in;">&nbsp;</p>
<p style="margin-bottom: 0in;"><strong>Conclusions</strong></p>
<p style="margin-bottom: 0in;">Comparing Java to other technologies used in the Fuse day, it take more time to kick off a simple application, but within a one day of work you can have a simple end-to-end application with minimal REST api. We noted that design a &ldquo;right&rdquo; REST interface is NOT trivial, and you have to treat it carefully when you declare the interfaces and data types. People in the team who were NOT familiar with the technologies, had the chance to build and deploy a simple web application that use a common and widespread technologies by our customers. The created artifact was a working server (Tomcat) with the required api, but we feel its NOT &ldquo;production ready&rdquo; yet. An essential is we need to provide is authentication and authorization, and we need to QA it before we deploy it as a real service for Tikal employees</p>
<p>&nbsp;</p>

---
layout: post
title: Maven War Plugin picking multiple version of the same SNAPSHOT jars
created: 1275557554
author: zvika
permalink: /devops/maven-war-plugin-picking-multiple-version-same-snapshot-jars
tags:
- DevOps
- maven-war-plugin
---
<p>some of my web project's dependencies are other modules from the same app, that are not a part of the build, yet (legacy, haven't had time to mavenize them yet). So we use our Nexus installation and deploy these dependencies to it. Everything seems to work fine, but when creating the WAR, duplicate versions of these jars are included in the WAR, with different names, for example:</p>
<p>&nbsp;</p>
<p>586179 Thu Jun 03 10:40:34 IDT 2010 WEB-INF/lib/semantic-server-3.01-<strong>20100601.112610-1</strong>.jar<br />
586179 Thu Jun 03 12:13:56 IDT 2010 WEB-INF/lib/semantic-server-3.01-SNAPSHOT.jar</p>
<p>&nbsp;</p>
<p>obviously, this has something to do with the snapshot mechanism... </p>
<p>has anyone seen this behavior? how can I make sure only one jar is taken?</p>
<p>&nbsp;</p>
<p>thanks!</p>
<p>&nbsp;</p>
<p>attachments:</p>
<p>1. project pom (pom.xml) </p>
<p>2. parent pom (pom_0.xml)</p>

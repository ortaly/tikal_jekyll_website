---
layout: post
title: Maven2 on Eclipse Error - The specified user settings file does not exist
created: 1271627100
author: liorb
permalink: "/maven2-eclipse-error-specified-user-settings-file-does-not-exist"
tags:
- Flex Java
---
If you get this, simply create a new settings.xml under the specified path and paste the following<br /><br /><pre style="font-family: Andale Mono,Lucida Console,Monaco,fixed,monospace; color: rgb(0, 0, 0); background-color: rgb(238, 238, 238); font-size: 12px; border: 1px dashed rgb(153, 153, 153); line-height: 14px; padding: 5px; overflow: auto; width: 100%;"><code><settings xmlns="http://maven.apache.org/SETTINGS/1.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"<br />xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0 http://maven.apache.org/xsd/settings-1.0.0.xsd"><br /></settings><br /></code></pre><br />This seems to be a known issue with some of the M2Eclipse releases

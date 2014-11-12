---
layout: post
title: Why Installing Maven dependencies with the generatePom option is a good idea
created: 1297265100
author: liorb
permalink: /why-installing-maven-dependencies-generatepom-option-good-idea
tags:
- Flex Java
---
<a onblur="try {parent.deselectBloggerImageGracefully();} catch(e) {}" href="http://3.bp.blogspot.com/-UqgobYP1ZcM/TVb5Q1QL7SI/AAAAAAAAALw/OzdzSIbMYK8/s1600/mavenlogo_builtby_w.gif"><img style="float: left; margin: 0pt 10px 10px 0pt; cursor: pointer; width: 120px; height: 40px;" src="http://3.bp.blogspot.com/-UqgobYP1ZcM/TVb5Q1QL7SI/AAAAAAAAALw/OzdzSIbMYK8/s400/mavenlogo_builtby_w.gif" alt="" id="BLOGGER_PHOTO_ID_5572915656485760290" border="0" /></a>I recently noticed my project's Maven build takes ages to complete. Looking more closely I found out that on each build, Maven was trying to download a number of Poms from all declared repositories, waiting for a response from these repositories took some time and made my build process much longer. All the mentioned dependencies were ones I had to install locally on my local repository for licensing reasons.<br /><br />So what's happening here? When you skip <span style="font-weight: bold; font-style: italic;">-DgeneratePom=true</span> while installing a local dependency, Maven will obviously not create a pom.xml for the dependency. Each time you build, Maven will try to download the dependency pom. I removed all problematic dependencies and installed again in the following method:<br /><pre style="font-family: Andale Mono,Lucida Console,Monaco,fixed,monospace; color: rgb(0, 0, 0); background-color: rgb(238, 238, 238); font-size: 12px; border: 1px dashed rgb(153, 153, 153); line-height: 14px; padding: 5px; overflow: auto; width: 95%;"><code>mvn install:install-file -Dfile=<path-to-file> -DgroupId=<group-id><br />-DartifactId=<artifact-id> -Dversion=<version> -Dpackaging=<packaging><br /><span style="font-weight: bold;">-DgeneratePom=true</span><br /></code></pre>

---
layout: post
title: maven-copy-plugin is now available at Maven Central repository
created: 1337548684
author: liya
permalink: /maven-copy-plugin-now-available-maven-central-repository
tags:
- DevOps
- maven
---
<p>While building with maven we often need to perform different kind of actions that were very simple with an old uncle Ant, but can become messy and complicated with Maven: copy files, directories, dependencies, filtering text, creating your &quot;runtime' environment, and new tasks like attaching additional artifacts and etc.</p>
<p>To solve it we need to use a bunch of plugins like <a href="http://maven.apache.org/plugins/maven-antrun-plugin/">maven-antrun-plugin</a>, <a href="http://maven.apache.org/plugins/maven-assembly-plugin/">maven-assembly-plugin</a>, <a href="http://maven.apache.org/plugins/maven-dependency-plugin/">maven-dependency-plugin</a>, <a href="http://mojo.codehaus.org/build-helper-maven-plugin">build-helper-maven-plugin</a>.</p>
<p><a href="http://evgeny-goldin.com/wiki/Maven-copy-plugin">maven-copy-plugin</a> can be a powerful replacements for all those. The configuration syntax is quite simple and clear, lots of configuration options and supported features, well written documentation.</p>
<p>Lately, the new version (0.2.5) was released and it also became available at <a href="http://search.maven.org/#search|ga|1|com.github.goldin">Maven Central repo</a>.</p>
<p>It now works with Maven 3 only and fully supports Java 7.</p>
<p>See full list of changes <a href="http://evgeny-goldin.com/wiki/Maven-plugins#v0.2.5.2C_May_15.2C_2012">here</a></p>

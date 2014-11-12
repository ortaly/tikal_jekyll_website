---
layout: post
title: Maven 3 to support parallel builds
created: 1284318675
author: ittayd
permalink: /devops/maven-3-support-parallel-builds
tags:
- DevOps
- maven build
---
<p>http://java.dzone.com/articles/more-new-cool-features-maven-3</p>
<p>&nbsp;</p>
<p>Maven 3 has the (new and somewhat experimental) ability to analyze  your project structure, and the dependencies between your modules, to  figure out which modules can be built in parallel. This has major  performance implications for larger multi-module projects - the <a target="_blank" href="https://cwiki.apache.org/confluence/display/MAVEN/Parallel+builds+in+Maven+3">documentation</a> reports typical speed increases of 20-50%.</p>

---
layout: post
title: An important fix in matrix build with multiple nodes in Hudson-ci release 1.376
created: 1284319807
author: hagzag
permalink: /devops/important-fix-matrix-build-multiple-nodes-hudson-ci-release-1376
tags:
- DevOps
- Hudson
---
<p>Those of you using the greatest and latest might of noticed a  regression in matrix configuration running on multiple nodes in a  nutshell this job type has the ability to execute the same build with a  configuration matrix - and run the build in parallel (if you have slaves  attached).</p>
<p>&nbsp;</p>
<p>Since 1.373 these builds could not be tied to multiple nodes see <a href="http://issues.hudson-ci.org/browse/HUDSON-7281">HUDSON-7281 for details</a> in any case avoid this issue by installing the latest war: <a href="http://ftp.osuosl.org/pub/hudson/war/1.376/hudson.war">1.376</a>.</p>

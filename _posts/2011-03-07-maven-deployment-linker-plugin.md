---
layout: post
title: Maven Deployment Linker - plugin
created: 1299505177
author: hagzag
permalink: /devops/maven-deployment-linker-plugin
tags:
- DevOps
- Hudson
---
<p>This plugin does somthing so simple yet very useful instead of archiving artifact it will list the deployments performed at build time to the Maven Proxy you are running regardless to the proxy vendor (Archiva, Artifactory or Nexus).</p>
<p>&nbsp;</p>
<p>All you need to do in your maven build is select 1 checkbox:</p>
<p><img hspace="5" height="46" border="0" align="middle" width="372" vspace="5" alt="Link to maven deployments" src="/files/upload/29/link2m2deploy.png" /></p>
<p>You can also filter artifacts with regex.</p>
<p>&nbsp;</p>
<p>The result is:</p>
<p><img hspace="5" height="91" border="0" align="middle" width="429" vspace="5" alt="artifacts" src="/files/upload/29/artifacts.png" /></p>
<p>And the status bar shows:</p>
<p><img hspace="5" height="13" border="0" align="middle" width="614" vspace="5" alt="" src="/files/upload/29/statusbar.png" /></p>

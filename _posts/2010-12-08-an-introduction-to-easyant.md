---
layout: post
title: An Introduction to EasyAnt
created: 1291811853
author: lior.kanfi
permalink: /devops/introduction-easyant
tags:
- DevOps
- ant ivy
---
<p><a href="http://www.easyant.org/doc/">EasyAnt</a>, a new build system based on Apache Ant and Apache Ivy</p>
<p><br />
<strong>Concepts</strong><br />
This section will walk you through basic concepts of EasyAnt.</p>
<ol type="1" style="margin-top: 0in;">
    <li>Phases: An EasyAnt build process is typically split up into multiple  phases, similar to Maven. Each phase has a distinct purpose, and  functionality. Technically, a phase is very similar to a target. These  are the points of difference from a regular target:
    <ol type="a" style="margin-top: 0in;">
        <li>A phase has no body. It does not contain any build logic. It only  exposes a hook where you can plugin your additional build logic. A phase  will execute at a particular point of time during the build. If you  want to add any additional logic at this point, you can assign your  target to a phase, and it is guaranteed to execute in the assigned  phase.</li>
        <li>However, if there are (which most likely there will always be)  multiple targets associated with a particular phase, then the order of  execution of these targets is not fixed or guaranteed.</li>
    </ol>
    </li>
    <li>Build Types: A build type is a defined import of set of build  plugins. Each of these plugins defines a set of functionalities in form  of targets and hooks them to different build phases. So, when a build  type is invoked, it simply invokes the entire set of targets (/phases)  sequentially, resulting in the complete build. There are a set of such  standard build types that come packaged with EasyAnt. E.g.  build-webapp-java. You can also write your own build type.</li>
    <li>Build Plugins: A piece of functionality that can be plugged into or  removed from your build. This plugin could actually perform a piece of  your regular build, e.g. compile java classes during build of a complete  war. Or, do a utility action, e.g. deploy your built web application  onto a packaged Jetty server!&quot;</li>
</ol>

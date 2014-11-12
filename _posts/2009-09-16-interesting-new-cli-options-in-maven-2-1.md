---
layout: post
title: 'interesting new cli options in maven 2.1 '
created: 1253089769
author: ittayd
permalink: /devops/interesting-new-cli-options-maven-21
tags:
- DevOps
---
<p>Maven 2.1 introduced new options to the command line that allow faster builds in some cases</p>
<p>&nbsp;</p>
<ul>
    <li>-rf,--resume-from &lt;arg&gt;: Resume reactor from specified project. This means if the build fails at some project you can resume from that, instead of going through the build of the projects that precede it in the reactor</li>
    <li>-pl,--projects &lt;arg&gt;: Build specified reactor projects instead of all projects (comman separated list). This is useful if you changed only some projects and with to build only those.</li>
    <li>-amd,--also-make-dependents: When using the -pl option, also make the projects that the specified projects depend on. This is useful if the product has independent module sets and some common ones. You specify the projects in the module set and projects from the common code also gets build to make sure everything is up to date</li>
    <li>-am,--also-make: When using the -pl option, also make the projects that depend on the specified projects. This is useful when changing a common module to make sure all modules that depend on it are also up to date.</li>
</ul>
<p>&nbsp;</p>
<p>These features were already available in Maven 2.0 with the <a href="http://maven.apache.org/plugins/maven-reactor-plugin/">maven reactor plugin</a>. You can read there how to use it. An additional feature not introduced to the core is&nbsp; <a href="http://maven.apache.org/plugins/maven-reactor-plugin/make-scm-changes-mojo.html">reactor:make-scm-changes</a> which will build all projects that were changed locally according to the scm and all the projects that depend on them</p>
<p>&nbsp;</p>

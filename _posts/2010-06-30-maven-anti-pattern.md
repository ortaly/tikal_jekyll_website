---
layout: post
title: Maven Anti Pattern
created: 1277885715
permalink: maven-anti-pattern
tags:
- DevOps
- Maven Java
---
<p>Recently i came across a strange application of Maven. In fact it seems so appalling and ridiculous, so i decided to share as anti pattern for Maven usage.</p>
<p>Consider the following</p>
<p>1. There is an old product which us being build with Ant.</p>
<p>2. Product is a platform and provides infrastructure for more add ons.</p>
<p>3. New software is being developed as a plugin, implementing an interface of the infrastructure.</p>
<p>4. New software is developed using Maven.</p>
<p>So at this point there is a question - how the platform should be passed to Maven repository so that new software would be able to create dependencies on that platform.</p>
<p>&nbsp;</p>
<p>The solution for that problem was creative - Automated POM generation at while deploying a JAR to repository.</p>
<p>GREAT - all of problems are solved, no code to change or to add.</p>
<p>&nbsp;</p>
<p>And now the winner - so the platform appears in Maven repository under some artifact, something like : platform:platform:1.0.</p>
<p>And new plugin for the platform will use this artiact id as a dependency.</p>
<p>And once you want to use some platform feature, which has dependency to some 3rd party software you will get a compile error.</p>
<p>????</p>
<p>Indded, after all that is what Maven is for. Each artifact should know its dependencies and versions of those dependencies.</p>
<p>&nbsp;</p>
<p>It turns out that autogeneration of a POM <strong>does not know how to generate dependencies</strong>. As a result you get an artifact, without its dependencies.</p>
<p>In order to solve this problem, new plugin for the platform MUST add to plugin POM dependencies of the platform.</p>
<p>&nbsp;</p>
<p>In my opinion this is a great example of how NOT to use Maven. Come on - its fairly easy to write a few POMs with dependencies, rather then doing crapy products.</p>

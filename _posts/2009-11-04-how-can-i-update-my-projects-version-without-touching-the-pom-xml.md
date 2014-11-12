---
layout: post
title: How can I update my projects version without touching the pom.xml
created: 1257350466
author: keren
permalink: /devops/how-can-i-update-my-projects-version-without-touching-pomxml
tags:
- DevOps
---
<p>I have several project. Some are depending on other and some are standalone. All projects are at&nbsp; starteam.</p>
<p><br />
Every week I'm running build only for the projects that changed from the latest build. and I'm increasing the artifacts versions.</p>
<p>The question is - how can I manage my projects versions without manually updating  the pom files?</p>
<p>&nbsp;</p>
<p>&nbsp;- Today I'm checking out the pom files - update the project version, update the dependencies versions and create new artifacts with the correct build order.</p>
<p>- I thought to create a parent project and inherited from it. Then I can hold all projects versions in the parent pom and I have only one file to manage. In order not to update the projects pom with the parent version I'll set the parent version as SNAPSHOT. The problem occur when I'm updating the parent pom in order to run the weekly build. If a user will build it's local project after I've update the parent pom he will get the new pom and his local build will failed. (versions issues)</p>

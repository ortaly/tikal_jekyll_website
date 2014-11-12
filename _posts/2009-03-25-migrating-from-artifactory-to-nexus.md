---
layout: post
title: Migrating from Artifactory to Nexus
created: 1237997724
author: lior.kanfi
permalink: /devops/migrating-artifactory-nexus
tags:
- DevOps
- Nexus
- Artifactory
- Maven2
---
<p>&quot;We frequently encounter users that have started using Artifactory and, while they are keen on using Nexus, it's not very easy to migrate from Artifactory and configure Nexus as a drop-in replacement. We noticed this pattern, and decided to create a Nexus Migration Plugin that will allow existing Artifactory users to take an Artifactory backup ZIP and restore all groups, repositories, users, and permissions to a Nexus instance. In this post, I'll walk you through the process, and I'll point you at the new <a href="http://www.sonatype.com/books/nexus-book/reference/artifactory.html">Appendix we added to the Nexus book</a> that covers the Nexus Migration Plugin.&quot;</p>

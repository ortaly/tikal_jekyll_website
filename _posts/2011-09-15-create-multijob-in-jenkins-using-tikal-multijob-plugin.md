---
layout: post
title: Create Multijob in Jenkins using Tikal Multijob Plugin
created: 1316095215
author: roni
permalink: /java/forums/create-multijob-jenkins-using-tikal-multijob-plugin
tags:
- JAVA
- tikal
- plugin
- multijob
- jenkins
- Community Tikal
---
<p>A new multijob plugin was created by Tikal ALM team.</p>
<p style="line-height: 21px; ">Using this job you can add full hierarchy of Jenkins jobs that will be executed in&nbsp;sequence or in parallel.</p>
<p style="line-height: 21px; ">When creating new Jenkins job you have an option to create&nbsp;<em>MultiJob</em>&nbsp;project. This job can define in the Build section phases that contains one job or more. All jobs belong to one phase will be executed in&nbsp;parallel (if there are enough executors on the node), and all jobs in phase 2 will be executed only after jobs in phase 1 are completed etc.</p>
<p>For example we create MultiJob project called jenkins-multijob-inherent that contains 3 multijob phases:</p>
<p><img alt="" height="239" src="/files/jenkins1(1).png" width="640" /></p>
<p>This job manages the building and deployment of the Tikal multijob plugin at phase 1. Afterwards it downloads the snapshot version of jenkins and packs it again with Tikal multijob plugin that was created at phase 1. Finally at phase 3 it deploys the jenkins with the multijob plugin to a deployment machine, runs automatically Selenium tests to check the product and shutdown&nbsp;jenkins. Here is a snapshot of the phases section:</p>
<p><img alt="" height="308" src="/files/jenkins2(1).png" width="641" /></p>
<p>You can also see an hierarchical view of the multijob poject:</p>
<p><img alt="" height="118" src="/files/jenkins3.png" width="638" /></p>

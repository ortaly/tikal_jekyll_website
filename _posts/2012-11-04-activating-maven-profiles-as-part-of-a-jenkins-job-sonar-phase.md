---
layout: post
title: 'Activating Maven profiles as part of a Jenkins-job Sonar phase '
created: 1352014796
author: yorammi
permalink: /devops/activating-maven-profiles-part-jenkins-job-sonar-phase
tags:
- DevOps
- Sonar
- maven
- jenkins
---
<p><u><strong>Problem description</strong></u>:</p>
<p>We have a Jenkins job that runs a maven build that activates certain maven-profiles (maven <strong>Goals and option</strong><strong>s </strong>in my case: <em>clean install -U -P all,runtime</em>). The same job activates <strong>Sonar</strong> plugin as a post-build action. Running the Sonar on the job without pointing to a certain maven profiles assumes that there aren't any instead of passing the same profiles to the Sonar plugin.</p>
<p>&nbsp;<img src="/files/MavenProperties.png" width="401" height="137" alt="" /></p>
<p><u><strong>Solution</strong></u>:&nbsp;</p>
<p>In the job Sonar configuration (Post-build actions/Sonar/Advanced...) add a&nbsp;<strong>--activate-profiles</strong> switch to the 'Additional properties' setting (in my case:&nbsp;<em>--activate-profiles all,runtime</em>)</p>
<p><img src="/files/SonarProperties.png" width="701" height="216" alt="" /></p>

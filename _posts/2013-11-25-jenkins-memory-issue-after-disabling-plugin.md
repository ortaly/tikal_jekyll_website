---
layout: post
title: Jenkins memory issue after disabling plugin
created: 1385378611
author: itai
permalink: jenkins-memory-issue-after-disabling-plugin
tags:
- DevOps
- Jenkins
---
<div style="color: rgb(34, 34, 34); font-family: arial; font-size: small; line-height: normal;">
<div>Recently we upgrade few plugins in jenkins and we suffered from unexpected behaviour .</div>

<div>&nbsp;</div>

<div>Because of this we disabled and downgrade some of the plugins .</div>

<div>&nbsp;</div>

<div>After this changing we started suffer from memory issue in jenkins.</div>

<div>&nbsp;</div>

<div>In few hours of work the jenkins increase is heap to the maximum and jenkins stop response.</div>

<div>&nbsp;</div>

<div>We analyzed Jenkins &nbsp;heap dump ,using &quot;Eclipse Memory Analyzer&quot; &nbsp;we found the suspect is hudson.diagnosis.OldDataMonitor the description of this object by jenkins javaDoc&nbsp;&quot;Tracks whether any data structure changes were corrected when loading XML, that could be resaved to migrate that data to the new format.&quot;</div>

<div>&nbsp;</div>

<div>We understood we should clean all jobs config.xml from old data&nbsp;</div>

<div>&nbsp;</div>

<div>Jenkins have feature to do it &quot;Manage Jenkins&quot; --&gt; &quot;Manage Old Data&quot; --&gt; &quot;Discard Old Data&quot;</div>

<div>&nbsp;</div>

<div>Jenkins have related bug for this issue&nbsp;<a href="https://issues.jenkins-ci.org/browse/JENKINS-19544" style="color: rgb(17, 85, 204);">https://issues.jenkins-ci.org/browse/JENKINS-19544</a></div>

<div>&nbsp;</div>

<div>&nbsp;</div>
</div>

<div style="color: rgb(34, 34, 34); font-family: arial; font-size: small; line-height: normal;">&nbsp;</div>

---
layout: post
title: Job Configuration change introduced in hudson 1.372
created: 1282057660
author: hagzag
permalink: /devops/job-configuration-change-introduced-hudson-1372
tags:
- DevOps
- Hudson
---
<p>Yesterday I upgraded hudson to the greatest an latest which was a seamless upgrade.</p>
<p>A very obvious change in the Job configuration form was added instead of &quot;<strong>Tie Build to a node</strong>&quot;:</p>
<p><img width="533" height="34" src="/files/upload/29/old-slave-daialog_0.png" alt="old_slave_selection_dialog" /></p>
<p>There is now <strong>&quot;Restrict where this project can be run&quot;</strong>:</p>
<p><img width="553" height="211" src="/files/upload/29/new-slave-daialog_0.png" alt="new__slave_selection_dialog" /></p>
<p>&nbsp;</p>
<p>The disadvantage in this feature is if you want to a build to a node you need to know its name / node group name prior to the actual configuration. The Advantage of this feature is you can be more specific in where you want you build to run and with a large number of slaves this is quite important, <strong>Please note</strong>: &quot;old&quot; jobs aren't affected of this change.</p>

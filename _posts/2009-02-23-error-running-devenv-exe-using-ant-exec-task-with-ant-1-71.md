---
layout: post
title: 'Error running devenv.exe using ant exec task with Ant 1.71 '
created: 1235408076
author: liya
permalink: /devops/error-running-devenvexe-using-ant-exec-task-ant-171
tags:
- DevOps
- Ant
- build ant
---
<p>Trying to rewrite the post..</p>
<p>I spent a half day on trying to make it work - a simple ant target to run devenv.exe (command line that builds visual studio solution) using &lt;exec&gt; task on Windows (of cause).<br />
I used the latest Ant 1.7.1, and i kept getting error like 'Cannot run program', any environment settings did not help.<br />
The only thing that worked was switching to Ant 1.6.5.</p>
<p>The truth is i didn't try to find explanations, but i believe it's just a bug in the latest Ant.</p>

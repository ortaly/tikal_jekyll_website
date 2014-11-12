---
layout: post
title: Spring batch :Restart a job and then start next job automatically
created: 1358151589
permalink: spring-batch-restart-a-job-and-then-start-next-job-automatically
tags:
- JAVA
- Spring
- spring-batch
---
<p><span style="color: rgb(0, 0, 0); font-family: Arial, 'Liberation Sans', 'DejaVu Sans', sans-serif; line-height: 18px;">I need to create a recovery pattern.</span></p>
<p><span style="color: rgb(0, 0, 0); font-family: Arial, 'Liberation Sans', 'DejaVu Sans', sans-serif; line-height: 18px;"> In my pattern I can launch a job only on a given time window.</span></p>
<p><span style="color: rgb(0, 0, 0); font-family: Arial, 'Liberation Sans', 'DejaVu Sans', sans-serif; line-height: 18px;"> In case the job fails, it will only be restarted on the next time window and when finish I would like to start the schedule job that was planned in advance for this window. </span></p>
<p>&nbsp;</p>
<p><span style="color: rgb(0, 0, 0); font-family: Arial, 'Liberation Sans', 'DejaVu Sans', sans-serif; line-height: 18px;">The only different between jobs is the time window parameters.</span></p>
<p style="margin-bottom: 1em; border: 0px; vertical-align: baseline; clear: both; word-wrap: break-word; color: rgb(0, 0, 0); font-family: Arial, 'Liberation Sans', 'DejaVu Sans', sans-serif; line-height: 18px;">I thought about JobExecutionDecider with conjunction with JobExplorer or overriding a Joblauncher. But all seems too intrusive.</p>
<p style="margin-bottom: 1em; border: 0px; vertical-align: baseline; clear: both; word-wrap: break-word; color: rgb(0, 0, 0); font-family: Arial, 'Liberation Sans', 'DejaVu Sans', sans-serif; line-height: 18px;"><span style="background-color: transparent; font-size: 14px; line-height: 18px;">I failed to found an example that match my needs any Ideas will be most welcome.</span></p>
<p>&nbsp;</p>

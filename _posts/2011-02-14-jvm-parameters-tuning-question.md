---
layout: post
title: JVM parameters tuning question.
created: 1297697050
author: oleg
permalink: /java/jvm-parameters-tuning-question
tags:
- JAVA
---
<p>I using IntelliJ 9 (Client's choice)</p>
<p>Some project running just fine from the IDE with following parameters :</p>
<p>&nbsp;<span style="color: rgb(255, 0, 0); ">-server -Xmx1024M -XX:SoftRefLRUPolicyMSPerMB=5000 -enableassertions -DLOG_TO_CONSOLE=true &nbsp;-DenableP4Edit=true -DcreateGolden=true -DuseServerEmulator=REMOTE -DuseAgentEmulator=REMOTE -DcleanDatabase=true &nbsp;-XX:+HeapDumpOnOutOfMemoryError &nbsp;-XX:MaxPermSize=128m -XX:HeapDumpPath=oom.hprof</span></p>
<p>But when I trying to change max memory to <span style="color: rgb(255, 0, 0); ">-Xmx1500M</span>&nbsp;- it fails to load.&nbsp;</p>
<p>I have windows 32 with 3G physical memory jdk1.6.0_22.</p>
<p>&nbsp;</p>
<p>Any suggestion why it's happening or how to fix it?</p>

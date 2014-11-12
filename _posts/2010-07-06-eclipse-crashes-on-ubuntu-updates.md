---
layout: post
title: Eclipse crashes on Ubuntu updates
created: 1278400932
author: yanai
permalink: /java/eclipse-crashes-ubuntu-updates
tags:
- JAVA
- Ubuntu Eclipse Crash
---
<p>After a regular update my Ubuntu (Lucid), sudnly both Eclipse 3.5 and Eclipse 3.6 staretd crashing upon auto-complete on Java code. <a href="https://bugs.eclipse.org/bugs/show_bug.cgi?id=308731">This bug</a> gives more details, but apperantly all you need to do is install&nbsp;<span style="font-family: monospace; line-height: 18px; font-size: small; white-space: pre-wrap;">xulrunner-1.9.2 </span>and run your Eclipse with</p>
<p>eclipse -vmargs  -Dorg.eclipse.swt.browser.XULRunnerPath=/usr/bin/xulrunner</p>
<p>&nbsp;</p>
<p>Hope it will save you some time with this annoying bug.</p>
<p>&nbsp;</p>

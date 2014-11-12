---
layout: post
title: JBoss 5 starts slowly
created: 1235635348
permalink: jboss-5-starts-slowly
tags:
- JAVA
- jboss
---
<p>JBoss 5 starts very slowly.</p><p>As we can see from the part of log - it takes about 1 min to pass these four lines.</p><p>Sometimes 1 min can grow to several minutes.</p><p>09:50:43,819 INFO&nbsp; [ProfileServiceImpl] Loaded profile: ProfileImpl@17035c6{key=org.jboss.profileservice.spi.ProfileKey@f9d9dd27[domain=default,server=defa<br />ult,name=worklight]}<br /><strong>09:50:52,413 INFO&nbsp; [WebService] Using RMI server codebase: http://nimrod-desk:8083/<br />09:51:10,758 INFO&nbsp; [NativeServerConfig] JBoss Web Services - Stack Native Core<br />09:51:10,758 INFO&nbsp; [NativeServerConfig] 3.0.4.SP1<br />09:51:49,916 INFO&nbsp; [MailService] Mail Service bound to java:/Mail</strong></p><p>Any ideas ?</p>

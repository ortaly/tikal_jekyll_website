---
layout: post
title: Java FTP transfer
created: 1275907746
permalink: java-ftp-transfer
tags:
- JAVA
---
<p>I need to implement the following requirement</p>
<p>1. Asynchronious java API that does FTP transfer</p>
<p>2. Limit amount of simultaneous&nbsp;transfers to X, which is configurable.</p>
<p>3. Manage incoming java API&nbsp;calls, so that if amount of transfers exceeds X i would keep queue of incoming requests and process them once connection is available.</p>
<p>4. Ability to get transfer status, while transferring through separate API&nbsp;call.</p>
<p>Note - the whole thing is stateless.</p>
<p>&nbsp;</p>
<p>Basically it is a messaging scenario, but without any messaging infrastructure. Thus manuall Java/Threads implementation.</p>
<p>&nbsp;</p>
<p>Questions.</p>
<p>1. Is there some sort of framework that can provide such funtionality (thread management)?</p>
<p>2. Any suggestions on how to implement this manually ?</p>
<p>Thanks</p>

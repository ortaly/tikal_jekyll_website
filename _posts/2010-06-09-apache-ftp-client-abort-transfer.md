---
layout: post
title: Apache FTP Client - abort transfer
created: 1276100367
author: admin
permalink: /java/forums/apache-ftp-client-abort-transfer
tags:
- JAVA
---
<p>I am using Apache FTP client to do the FTP transfer. The trasnfer runs in a thread.</p>
<p>I am running another thread for timeout.&nbsp;Once timeout occures i need to terminate transfer if not finished.</p>
<p>For some reason FTPClient.abort doesn&#39;t work.</p>
<p>I found some discussion on that issue and tried to override the abort method - it didn&#39;t help.</p>
<p><a href="http://apache-commons.680414.n4.nabble.com/Net-FTPClient-abort-problem-td739542.html">http://apache-commons.680414.n4.nabble.com/Net-FTPClient-abort-problem-td739542.html</a></p>
<p>&nbsp;</p>
<p>I tried to &quot;stop&quot; thread - that didn&#39;t work either.</p>
<p>&nbsp;</p>
<p>Any suggestions ?</p>
<p>Thank you in advance.</p>

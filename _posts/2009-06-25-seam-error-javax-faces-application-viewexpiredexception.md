---
layout: post
title: 'Seam error: javax.faces.application.ViewExpiredException '
created: 1245916053
permalink: seam-error-javax-faces-application-viewexpiredexception
tags:
- JAVA
- seam
- HTTP session time out
- conversation time out
---
<p>For one of our clients, I am trying to test a seam application so that the session time out is 24 hours across Seam, Tomact and Apache. However, with my current settings, the error mentioned above is thrown before 24 hours have passed between sucessive visits to the application. I altered the folowing values:</p>
<p>&nbsp;</p>
<p>connectionTimeout=&quot;86400000&quot; in server.xml&nbsp; (mili seconds, equals 24 hours) <br />
<br />
conversation-timeout=&quot;86400000&quot; in components.xml (mili seconds, equals 24 hours) <br />
<br />
&lt;session-timeout&gt;1440 in web.xml (minutes, equals 24 hours)</p>
<p>&nbsp;</p>
<p>worker.node1.socket_timeout=86400&nbsp; in worker.properties for mod_jk (seconds, equals 24 hours)</p>
<p>&nbsp;</p>
<p>&lt;max-bean-life&gt;86400&lt;/max-bean-life&gt; in standardjbosss.xml </p>
<p>&nbsp;</p>
<p>Does anyone see a problem here?</p>

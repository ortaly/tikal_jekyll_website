---
layout: post
title: SSH Tunneling to PostgreSQL.
created: 1407486466
author: olga
permalink: ssh-tunneling-to-postgresql
tags:
- JAVA
- ssl
- PostgreSQL
---
<p>I am going to talk about PostgreSQL, but the idea is the same for the whole spectrum of data bases. &nbsp;&nbsp;</p>

<p>Imagine that you would like to debug your staging machine which is deployed on Amazon and use an Amazon&#39;s DB service. In case of the well configured security level, the access to your DB from the external world should be forbidden.&nbsp;</p>

<p>Therefore for your remote debugging you have two options: to open your DB connection and shoot yourself in the foot in terms of security or to open the ssh tunneling and sleep safely.&nbsp;</p>

<p>Format of SSH tunneling:</p>

<pre style="margin-bottom: 0in;">
<strong>ssh -l login_name -L [bind_address:]port:host:hostport hostname -N  </strong></pre>

<p style="margin-bottom: 0in">Example of usage:</p>

<pre style="margin-bottom: 0in;">
<strong>ssh -l superUser -L 63333:xxx.xxx.us-west-2.rds.amazonaws.com:5432 shell.foo.com -N</strong></pre>

<p style="margin-bottom: 0in">&nbsp;</p>

<p style="margin-bottom: 0in"><span style="line-height: 1.6em;">Where:</span></p>

<p style="margin-bottom: 0in"><strong>63333</strong> : the new port</p>

<p style="margin-bottom: 0in"><strong>xxx.xxx.us-west-2.rds.amazonaws.com</strong> : remote DB machine</p>

<p style="margin-bottom: 0in"><strong>5432</strong> : default port</p>

<p style="margin-bottom: 0in"><strong>-N</strong> : keeps the pipe open</p>

<p style="margin-bottom: 0in">&nbsp;</p>

<p style="margin-bottom: 0in"><span style="line-height: 1.6em;">In case of successful executing the pipe is still open the prompt shouldn&#39;t return to you.</span></p>

<p style="margin-bottom: 0in"><span style="line-height: 1.6em;">Now, you are able to connect to the DB but on port 63333.</span></p>

<p style="margin-bottom: 0in"><strong>For Hibernate users:</strong></p>

<p style="margin-bottom: 0in">In addition, I would recommend you add:</p>

<pre style="margin-bottom: 0in;">
<strong>config.setProperty(&quot;hibernate.temp.use_jdbc_metadata_defaults&quot;,&quot;false&quot;);</strong></pre>

<p style="margin-bottom: 0in"><span style="line-height: 1.6em;">to your hibernate config in order to accelerate the boot of the application. Otherwise, the application loading could take few very long minutes. &nbsp;</span></p>

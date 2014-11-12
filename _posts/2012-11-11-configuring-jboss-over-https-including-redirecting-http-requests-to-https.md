---
layout: post
title: Configuring JBoss over HTTPS including redirecting HTTP requests to HTTPS
created: 1352618212
author: yorammi
permalink: configuring-jboss-over-https-including-redirecting-http-requests-to-https
tags:
- DevOps
- ssl
- jboss
- https
---
<p><strong><u>Issue to resolve</u></strong>:</p>
<p>&nbsp;It is common that a project that have a JBoss web server started as using the default HTTP connection and suddently a customer demand that the server will work over HTTPS on a secure port and protocol (SSL). Since the code is built (sometimes hardcoded) for accessing HTTP and the old port (usually 8080) it is not a trivial issue to resolve.</p>
<p>Here&#39;s a list of requirements to resolve:</p>
<p>- Both HTTP and HTTPS connections should be valid since we need to get HTTP requests and redirect it to HTTPS - closing the HTTP connection will result with unhandled requests</p>
<p>- Redirect each HTTP request directed to the server to the HTTPS protocol with the proper port</p>
<p>Please notice that this has been needed and tested only for JBoss 4.2.3 so I didn&#39;t tested it on any other JBoss version.</p>
<p>&nbsp;</p>
<p><u><strong>Configuration of HTTPS and HTTP connections</strong></u>:</p>
<p>Edit the server.xml file (located in the /deploy/jboss-web.deployer folder).</p>
<p>The default file have by default only the HTTP connection enabled and the HTTPS connection commented out therefore you&#39;ll probably need only to enable (remove the comment brackets) the HTTPS connection.</p>
<p>You&#39;ll need to create a certificate file or get one from your customer.</p>
<p>For creating one goto the JDK bin folder, run the keytool script and follow the interactive instructions.</p>
<p>The resulting section of the file should therefore look like this:</p>
<hr />
<div>
	<span style="font-size: smaller;">&nbsp;<strong> &nbsp; &nbsp;&lt;Connector port=&quot;8080&quot; address=&quot;${jboss.bind.address}&quot; &nbsp; &nbsp;</strong></span></div>
<div>
	&nbsp;</div>
<div>
	<span style="font-size: smaller;"><strong>&nbsp; &nbsp; &nbsp; &nbsp;maxThreads=&quot;250&quot; maxHttpHeaderSize=&quot;8192&quot;</strong></span></div>
<div>
	<span style="font-size: smaller;"><strong>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;emptySessionPath=&quot;true&quot; protocol=&quot;HTTP/1.1&quot;</strong></span></div>
<div>
	<span style="font-size: smaller;"><strong>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;enableLookups=&quot;false&quot; redirectPort=&quot;8443&quot; acceptCount=&quot;100&quot;</strong></span></div>
<div>
	<span style="font-size: smaller;"><strong>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;connectionTimeout=&quot;20000&quot; disableUploadTimeout=&quot;true&quot; /&gt;</strong></span></div>
<div>
	&nbsp;</div>
<div>
	<span style="font-size: smaller;"><strong>&nbsp;&nbsp; &nbsp;&lt;Connector port=&quot;8443&quot; protocol=&quot;HTTP/1.1&quot; SSLEnabled=&quot;true&quot;</strong></span></div>
<div>
	<span style="font-size: smaller;"><strong>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;maxThreads=&quot;150&quot; scheme=&quot;https&quot; secure=&quot;true&quot;</strong></span></div>
<div>
	<span style="font-size: smaller;"><strong>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;clientAuth=&quot;false&quot; sslProtocol=&quot;TLS&quot; strategy=&quot;ms&quot;</strong></span></div>
<div>
	<span style="font-size: smaller;"><strong>&nbsp; keystoreFile=&quot;${jboss.server.home.dir}/conf/&lt;certificate file name&gt;&quot;</strong></span></div>
<div>
	<span style="font-size: smaller;"><strong>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;keystorePass=&quot;&lt;cerificate password&gt;&quot;</strong></span></div>
<div>
	<span style="font-size: smaller;"><strong>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;truststoreFile=&quot;${jboss.server.home.dir}/conf/</strong></span><strong style="font-size: 10px;">&lt;certificate file name&gt;</strong><strong style="font-size: smaller;">&quot;</strong></div>
<div>
	<span style="font-size: smaller;"><strong>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;truststorePass=&quot;</strong></span><strong style="font-size: 10px;">&lt;cerificate password&gt;</strong><strong style="font-size: smaller;">&quot;/&gt;</strong></div>
<hr />
<div>
	&nbsp;</div>
<div>
	<strong><u>Redirect solution</u></strong>:</div>
<p>For redirecting the HTTP requests to the HTTPS connection, insert the following tag into the &lt;web-app&gt; tag of each web.xml file that is located in the WEB-INF sub-folder of each of your JBoss server WAR files/folders. Please notice that this must be done in each of the WAR archives!</p>
<hr />
<div>
	<span style="font-size: smaller;"><strong>&nbsp; &lt;security-constraint&gt;</strong></span></div>
<div>
	<span style="font-size: smaller;"><strong>&lt;web-resource-collection&gt;</strong></span></div>
<div>
	<span style="font-size: smaller;"><strong>&lt;web-resource-name&gt;SUCTR&lt;/web-resource-name&gt;</strong></span></div>
<div>
	<span style="font-size: smaller;"><strong>&lt;url-pattern&gt;/*&lt;/url-pattern&gt; &nbsp; &nbsp; &nbsp;</strong></span></div>
<div>
	<span style="font-size: smaller;"><strong>&lt;/web-resource-collection&gt;</strong></span></div>
<div>
	<span style="font-size: smaller;"><strong>&lt;user-data-constraint&gt;</strong></span></div>
<div>
	<span style="font-size: smaller;"><strong>&lt;transport-guarantee&gt;CONFIDENTIAL&lt;/transport-guarantee&gt;</strong></span></div>
<div>
	<span style="font-size: smaller;"><strong>&lt;/user-data-constraint&gt;</strong></span></div>
<div>
	<span style="font-size: smaller;"><strong>&nbsp; &lt;/security-constraint&gt;</strong></span></div>
<hr />
<p>&nbsp;</p>
<p>Also, based on this link:&nbsp;<a href="http://www.jboss.org/jbossweb/modules/rewrite.html">www.jboss.org/jbossweb/modules/rewrite.html</a>&nbsp;I&#39;ve added the following line to server.xml file in both &lt;Host&gt; and &lt;Engine&gt; tags:</p>
<p>&nbsp;</p>
<div>
	<span style="color: rgb(0, 0, 0); font-family: Courier, 'Courier New', monospace; font-size: 11px; line-height: 16px; white-space: pre;">&lt;Valve className=&quot;org.jboss.web.rewrite.RewriteValve&quot; /&gt;</span></div>
<div>
	&nbsp;</div>
<div>
	<span style="color: rgb(0, 0, 0); font-family: Courier, 'Courier New', monospace; font-size: 11px; line-height: 16px; white-space: pre;">-------</span></div>
<div>
	&nbsp;</div>
<div>
	<span style="color: rgb(0, 0, 0); font-family: Courier, 'Courier New', monospace; font-size: 11px; line-height: 16px; white-space: pre;">Yoram Michaeli</span></div>
<div>
	<span style="color: rgb(0, 0, 0); font-family: Courier, 'Courier New', monospace; font-size: 11px; line-height: 16px; white-space: pre;">Tikal Knowledge</span></div>
<div>
	&nbsp;</div>
<div>
	&nbsp;</div>

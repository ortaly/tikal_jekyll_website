---
layout: post
title: Jenkins-SVN integration bugs and workarounds
created: 1368453166
author: timor.raiman
permalink: jenkins-svn-integration-bugs-and-workarounds
tags:
- DevOps
---
<p><span style="font-size: 12px;">Recently I&#39;ve had to setup Jenkins to build from an https-exposed SVN repo on a Windows slave. I&#39;ll describe two gutcha&#39;s:</span></p>
<div>
	<div align="center">
		<hr align="center" noshade="noshade" size="2" width="100%" />
	</div>
	<p>Right off the start, the build fails at checkout:</p>
	<pre>
<span style="font-size: 8px;">Unable to access&nbsp;<a href="https://mydtisvn0001.isr.hp.com/rg0202/tsg-bto-apps-qtp/trunk/" target="_blank">https://mysrv/repo/trunk/</a>&nbsp;: svn: E175002: OPTIONS /repo/trunk failed&nbsp;</span></pre>
	<pre>
<span style="font-size: 8px;">org.tmatesoft.svn.core.SVNException: svn: E175002: OPTIONS /repo/trunk failed</span></pre>
	<pre>
<span style="font-size: 8px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; at org.tmatesoft.svn.core.internal.io.dav.http.HTTPConnection.request(HTTPConnection.java:379)</span></pre>
	<pre>
<span style="font-size: 8px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; at org.tmatesoft.svn.core.internal.io.dav.http.HTTPConnection.request(HTTPConnection.java:364)</span></pre>
	<pre>
<span style="font-size: 8px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; at org.tmatesoft.svn.core.internal.io.dav.http.HTTPConnection.request(HTTPConnection.java:352)</span></pre>
	<pre>
<span style="font-size: 8px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; at org.tmatesoft.svn.core.internal.io.dav.DAVConnection.performHttpRequest(DAVConnection.java:708)</span></pre>
	<pre>
<span style="font-size: 8px;">...</span></pre>
	<pre>
<span style="font-size: 8px;">Caused by: org.tmatesoft.svn.core.SVNException: svn: <strong>E175002</strong>: OPTIONS request failed on &#39;/repo/trunk&#39;</span></pre>
	<pre>
<span style="font-size: 8px;">svn: E175002: Received fatal alert: bad_record_mac</span></pre>
	<p>...</p>
	<p>After some googling,&nbsp;<a href="http://stackoverflow.com/questions/12625614/jenkins-not-able-to-use-svn-credentials-or-download-new-plugins-new-versions">this post</a>&nbsp;provides the basis for the solution.</p>
	<p>The part about&nbsp;-Dsvnkit.http.sslProtocols=&quot;SSLv3&quot;&nbsp;is correct; however, it is not possible to set this option via the windows service properties. What was in fact needed, was:<br />
		<strong>edit</strong><strong>&nbsp;$JENKINS_HOME/jenkins-slave.xml</strong><strong>&nbsp;config file</strong>&nbsp;like so:</p>
	<p><span style="font-family: 'courier new', courier, monospace;">&lt;executable&gt;C:\Program Files\Java\jre6\bin\java.exe&lt;/executable&gt;<br />
		&lt;arguments&gt;-Xrs -jar &quot;%BASE%\slave.jar&quot; -jnlpUrl http://.../slave-agent.jnlp -secret ...fd&lt;/arguments&gt;</span></p>
	<p>Should become:</p>
	<p><span style="font-family: 'courier new', courier, monospace;">&lt;executable&gt;C:\Program Files\Java\jre6\bin\java.exe&lt;/executable&gt;<br />
		<span style="font-size: 12px;">&lt;arguments&gt;-Xrs&nbsp;</span><strong style="font-size: 12px;">-Dsvnkit.http.sslProtocols=&quot;SSLv3&quot;&nbsp;</strong><span style="font-size: 12px;">-jar &quot;%BASE%\slave.jar&quot; -jnlpUrl http://.../slave-agent.jnlp -secret ...fd&lt;/arguments&gt;</span></span></p>
	<p>&nbsp;</p>
	<p>Note that the&nbsp;-D...&nbsp;comes before the&nbsp;-jar.</p>
	<div align="center">
		<hr align="center" noshade="noshade" size="2" width="100%" />
	</div>
	<p>Now, this (almost) works, but we are still missing the<strong>&nbsp;https svn privileges login + password</strong>&nbsp;(which I&#39;ve entered squarely at the nice but utterly ineffective Jenkins gui&nbsp;<a href="https://myjenkins:8080/scm/SubversionSCM/enterCredential">https://myjenkins:8080/scm/SubversionSCM/enterCredential</a>):</p>
	<pre>
<span style="font-size: 8px;"><strong>19:48:52</strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; at org.tmatesoft.svn.core.<wbr />internal.wc2.<wbr />SvnOperationRunner.run(<wbr />SvnOperationRunner.java:20)</span></pre>
	<pre>
<span style="font-size: 8px;"><strong>19:48:52</strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; at org.tmatesoft.svn.core.wc2.<wbr />SvnOperationFactory.run(<wbr />SvnOperationFactory.java:1235)</span></pre>
	<pre>
<span style="font-size: 8px;"><strong>19:48:52</strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; at org.tmatesoft.svn.core.wc2.<wbr />SvnOperation.run(SvnOperation.<wbr />java:291)</span></pre>
	<pre>
<span style="font-size: 8px;"><strong>19:48:52</strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; at org.tmatesoft.svn.core.wc.<wbr />SVNUpdateClient.doCheckout(<wbr />SVNUpdateClient.java:777)</span></pre>
	<pre>
<span style="font-size: 8px;"><strong>19:48:52</strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; at hudson.scm.subversion.<wbr />CheckoutUpdater$1.perform(<wbr />CheckoutUpdater.java:99)</span></pre>
	<pre>
<span style="font-size: 8px;"><strong>19:48:52</strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ... 18 more</span></pre>
	<pre>
<span style="font-size: 8px;"><strong>19:48:52</strong> Caused by: org.tmatesoft.svn.core.<wbr />SVNCancelException: svn: E200015<strong>: No credential to try. Authentication failed</strong></span></pre>
	<pre>
<span style="font-size: 8px;"><strong>19:48:52</strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; at org.tmatesoft.svn.core.<wbr />internal.wc.SVNErrorManager.<wbr />cancel(SVNErrorManager.java:<wbr />37)</span></pre>
	<pre>
<span style="font-size: 8px;"><strong>19:48:52</strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; at org.tmatesoft.svn.core.<wbr />internal.wc.SVNErrorManager.<wbr />cancel(SVNErrorManager.java:<wbr />32)</span></pre>
	<pre>
<span style="font-size: 8px;"><strong>19:48:52</strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; at org.tmatesoft.svn.core.<wbr />internal.wc.<wbr />DefaultSVNAuthenticationManage<wbr />r.getFirstAuthentication(<wbr />DefaultSVNAuthenticationManage<wbr />r.java:185)</span></pre>
	<p>Jenkins svn plugin uses svnkit, which relies on svn credential caching. On a linux slave, to remedy this, one has to perform an svn checkout under the user running Jenkins (usually jenkins). After this, the credentials would be stored in an access-restricted file at the Jenkins user&rsquo;s home directory &nbsp;($JENKINS_HOME). But I&rsquo;m running this from a Windows slave &ndash; things are not as they would appear. The Jenkins service was configured by default to run as the system user, so no matter how many checkout any normal user performs, the data is just not available to the sytem user. In short, this is what was done (credit&nbsp;<strong>Gil Shinar</strong>):</p>
	<p>1)&nbsp;&nbsp;&nbsp;&nbsp; Login to the machine with an administrator user (we had&nbsp;<span style="font-family: 'courier new', courier, monospace;">emea\almtoolsbuild</span>, but one could also just create a&nbsp;<span style="font-family: 'courier new', courier, monospace;">jenkins&nbsp;</span>user)</p>
	<p>2)&nbsp;&nbsp;&nbsp;&nbsp; Run&nbsp;<span style="font-family: 'courier new', courier, monospace;">svn checkout&nbsp;<a href="https://mydtisvn0001.isr.hp.com/rg0202/tsg-bto-apps-qtp/trunk/" target="_blank">https://mysrv/repo/trunk/</a></span></p>
	<p>3)&nbsp;&nbsp;&nbsp;&nbsp; When the first https certificate request arrives, answer with a &quot;p&quot; (permanant).</p>
	<p>4)&nbsp;&nbsp;&nbsp;&nbsp; When prompted about storing un-encrypted password, answer &ldquo;yes&rdquo;&nbsp;&nbsp;&nbsp;<em>/ sorry</em></p>
	<p>5)&nbsp;&nbsp;&nbsp;&nbsp; Through the windows services window configure the jenkins slave service to run as the user in (1), in our case,&nbsp;<span style="font-family: 'courier new', courier, monospace;">emea\almtoolsbuild</span><br />
		&nbsp;(right click the jenkins service -&gt; properties -&gt; logon tab)</p>
	<p>6)&nbsp;&nbsp;&nbsp;&nbsp; Restart the service so the correct logon will take effect</p>
	<hr />
	<p>&nbsp;</p>
	<p>&nbsp;</p>
	<p>Only after all this, the SVN checkout finally worked and Jenkins could go on to do the building.&nbsp;</p>
	<p>&nbsp;</p>
</div>
<p>&nbsp;</p>

---
layout: post
title: MultiJob 1.9 released
created: 1366014822
author: hagzag
permalink: /devops/multijob-19-released
tags:
- DevOps
- multijob
- hudson jenkins
---
<p>Hi All,</p>
<p>With many thanks to Community members:&nbsp;Kiall Mac Innes,&nbsp;Roni Licht &amp; the remaining ALM team we have released the <strong>1.9 version</strong> late last week with the following bug fixes:</p>
<ul style="font-size: 13px; line-height: 17.328125px; color: rgb(0, 0, 0); font-family: Helvetica, Arial, sans-serif;">
	<li>
		Fixed&nbsp;<a class="external-link" href="https://issues.jenkins-ci.org/browse/JENKINS-15648" rel="nofollow">JENKINS-15648</a>&nbsp;-&nbsp;Multi Job plugins stops when sub job fails or aborted also when the &quot;Mark phase as successful&quot; is set as always continue&nbsp;</li>
	<li>
		Fixed&nbsp;<a class="external-link" href="https://issues.jenkins-ci.org/browse/JENKINS-17068" rel="nofollow">JENKINS-17068</a>&nbsp;-&nbsp;Subprojects aren&#39;t stop when stopping multijob project</li>
	<li>
		Fixed&nbsp;<a class="external-link" href="https://issues.jenkins-ci.org/browse/JENKINS-17070" rel="nofollow">JENKINS-17070</a>&nbsp;-&nbsp;Missing times with multiconfiguration projects</li>
	<li>
		Fixed&nbsp;<a class="external-link" href="https://issues.jenkins-ci.org/browse/JENKINS-17254" rel="nofollow">JENKINS-17254</a>&nbsp;-&nbsp;Multijob view last succes / last failure columns shows status instead of #of days/hours since</li>
	<li>
		Fixed&nbsp;<a class="external-link" href="https://issues.jenkins-ci.org/browse/JENKINS-17284" rel="nofollow">JENKINS-17284</a>&nbsp;- Jenkins cant display multijob view graphically if a job in phase not exists&nbsp;</li>
	<li>
		Fixed&nbsp;<a class="external-link" href="https://issues.jenkins-ci.org/browse/JENKINS-17153" rel="nofollow">JENKINS-17153</a>&nbsp;-&nbsp;Dependency on parameterized-trigger should not be optional?</li>
	<li>
		Fixed&nbsp;<a class="external-link" href="https://issues.jenkins-ci.org/browse/JENKINS-16048" rel="nofollow">JENKINS-16048</a>&nbsp;-&nbsp;MultiJob Detailed Table is missing when non valid MultiJob phase exits</li>
	<li>
		Fixed&nbsp;<a class="external-link" href="https://issues.jenkins-ci.org/browse/JENKINS-14604" rel="nofollow">JENKINS-14604</a>&nbsp;/&nbsp;<a class="external-link" href="https://issues.jenkins-ci.org/browse/JENKINS-13078" rel="nofollow">JENKINS-13078</a>&nbsp;-&nbsp;Multijob Plugin looses a hierarchical view at the multijob project page when it has upstream project(s)</li>
	<li>
		Fixed&nbsp;<a class="external-link" href="https://issues.jenkins-ci.org/browse/JENKINS-17535" rel="nofollow">JENKINS-17535</a>&nbsp;-&nbsp;Provide env vars detailing triggered builds&nbsp;﻿(thanks Kiall Mac Innes)</li>
</ul>
<p>All fixed issues documented in <a href="http://wiki.jenkins-ci.org">wiki.jenkins-ci.org</a> &amp; <a href="http://issues.jenkins-ci.org">issues.jenkins-ci.org</a> - please <strong>vote on issues your vote matters</strong> !!!</p>
<p>Worth noting MultiJob plugin now has two <strong>plug-in dependencies</strong> which will be automatically installed the <a href="https://wiki.jenkins-ci.org/display/JENKINS/EnvInject+Plugin">EnvInject</a>&nbsp;&amp; <a href="https://wiki.jenkins-ci.org/display/JENKINS/Parameterized+Trigger+Plugin">Parameterized trigger plugins</a></p>
<p>&nbsp;</p>
<p>See you on the graph ...</p>
<p>&nbsp;</p>
<p><img alt="mj graph" img="" src="http://chart.apis.google.com/chart?cht=lc&amp;chxl=1:%7C04%7C05%7C06%7C07%7C08%7C09%7C10%7C11%7C12%7C01%7C02%7C03%7C2:%7CMonth&amp;chxp=2,50&amp;chxr=0,0,1226%7C1,0,12&amp;chxs=1,676767,12&amp;chxt=y,x,x&amp;chs=300x225&amp;chds=0,1226&amp;chd=t:180,242,278,362,489,614,780,891,909,1033,1141,1226&amp;chg=10,-1,0,0&amp;chls=4&amp;chco=d24939&amp;chtt=jenkins-multijob-plugin+-+installations" /></p>
<p>HP</p>

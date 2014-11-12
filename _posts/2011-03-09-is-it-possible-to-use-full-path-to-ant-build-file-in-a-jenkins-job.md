---
layout: post
title: is it possible to use full path to ant build file in a Jenkins job?
created: 1299701751
author: shalom
permalink: /devops/it-possible-use-full-path-ant-build-file-jenkins-job
tags:
- DevOps
- jenkins hudson ant
---
<p>I'm trying to create a Jenkins job that:</p>
<ul>
    <li>execute an ant file on the local file system, ant will execute jmeter tests.</li>
    <li>Performance plugin to create graphs from the jmeter reports.</li>
</ul>
<p>but I can't find a way to make Jenkins find the build file, my job has only an ant build step, no SCM checkout:</p>
<p>the ant configuration contains only the full path to my ant file:</p>
<p>/home/shalom/dev/dev-otho/automation/stress/build.xml</p>
<p>&nbsp;</p>
<p>but I keep getting this from Jenkins</p>
<pre>
Started by user anonymous
FATAL: Unable to find build script at /home/shalom/dev/dev-otho/automation/stress/build.xml
<a class="lowkey" href="http://stacktrace.hudson-labs.org/search?query=Finished">Finished</a>: FAILURE
</pre>
<p>&nbsp;</p>
<p>same thing happens when i try to setup the full path to jmeter reports in Performance Plugin:</p>
<pre>
Performance: Recording JMeter reports '/home/shalom/dev/dev-otho/automation/stress/results/*.jtl'
Performance: no JMeter files matching '/home/shalom/dev/dev-otho/automation/stress/results/*.jtl' have been found. Has the report generated?. Setting Build to FAILURE
Finished: FAILURE
</pre>
<p>if I&nbsp;add SCM checkout and execute the ant file from Jenkins workspace then it works. but I don't need to checkout, just to use the working copy on the local machine.</p>
<p>It seems like Jenkins can't use full paths.</p>
<p>&nbsp;</p>
<p>Appreciate any help.</p>
<p>Thanks</p>

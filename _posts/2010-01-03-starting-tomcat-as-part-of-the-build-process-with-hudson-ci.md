---
layout: post
title: Starting Tomcat as part of the build process with HUDSON-CI
created: 1262555650
author: hagzag
permalink: /devops/starting-tomcat-part-build-process-hudson-ci
tags:
- DevOps
- Continuous Integration
- Hudson
---
<p>In one of my previous projects I needed to deploy 2 Tomcat servers as part of the build process, this could be done by profiling the parent project with a Deploy life cycle although we wanted to avoid errors due to miss use - therefore leave this task for a continues integration server - you guessed right - HUDSON.</p>
<!--break-->
<p>My test consisted on completing two build life cycles of <em><strong>mvn clean install</strong> </em>then collect three wars, deploy into a remote Tomcat webapps dir, set some spring.properties and start both Tomcats.</p>
<p>&nbsp;&nbsp;</p>
<p>So this task seemed quite simple for Hudson to be able to execute, my recipe was:</p>
<ol>
    <li>A parametrised build - which will set the remote tomcat home &amp; remote db variables (passed in spring.properties within wars) [<a href="#figure1">see example scrrenshot below</a>]</li>
    <li>A hudson slave instance (so I will build directly on the remote host)</li>
    <li><a href="http://wiki.hudson-ci.org//display/HUDSON/M2+Extra+Steps+Plugin">The m2 extras steps plugin</a></li>
</ol>
<p>&nbsp;</p>
<p>After running the build about half a dozen times I learned that Hudson is killing those Tomcats as soon as the build is successful - this seemed odd.</p>
<p>&nbsp;</p>
<p>The build consisted of deploying 3 war files into webapps dir, taking tomcat down, overriding spring.properties files in each war and then start two tomcats instances so new setting are effective.</p>
<p>On the remote machine during build time, <em>netstat</em> showed that services are up and unning, in addition to Hudson's build log wchich showed all wars were copied and all spring.properties files are in place - so what could be the issue here?</p>
<p>&nbsp;</p>
<p>At some point it occurred to me - and seemed almost natural that these services should be killed, because they are forked / sub processes of Hudson, and therefore will not continue &quot;living&quot; once there parent process is dead.</p>
<p>So still how do you solve this?</p>
<p>&nbsp;</p>
<p>The solution was to pass an argument to Hudson called BUILD_ID with a default value of dontkillme which solved the issue.</p>
<p>you can read about this - it will probably save you some time if your in the same situation see: http://issues.hudson-ci.org/browse/HUDSON-2729?page=com.atlassian.jira.plugin.system.issuetabpanels:all-tabpanel</p>
<p>&nbsp;</p>
<p><u>Although according to the above link</u>:</p>
<pre>
&quot;This is fixed in 1.283.</pre>
<div class="action-body">
<pre>
The side effect of this is that if someone has been intentionally spawning
processes, those will be killed, too. This is based on environment variables, so
to work around this, you can spawn processes with one of the environment
variables different from what Hudson sets. For example,
BUILD_ID=dontKillMe catalina.sh start
will start Tomcat in such a way that it'll escape the killing.&quot;
 </pre>
<p>I am running on 1.338 and this is still an issue - but, I was performing the build via slave, which might complicate the issue. For it is not only a sub process of Hudson, but a &quot;sub-process of a sub-process&quot; - now, if you recall I am running a parametrised build so I set the BUILD_ID=dontkillme as a default parameter to this build, and I solved this issue.</p>
</div>
<p>&nbsp;</p>
<p><strong>Hope you find this useful.<img alt="" src="/sites/all/modules/fckeditor/fckeditor/editor/images/smiley/msn/wink_smile.gif" /></strong></p>
<p>&nbsp;</p>
<p>Paremtized build example:</p>
<p><a name="figure1"><img border="0" align="left" width="801" vspace="10" hspace="10" height="574" alt="Hudson CI parameters" src="/files/upload/29/Screenshot-1.png" /></a></p>

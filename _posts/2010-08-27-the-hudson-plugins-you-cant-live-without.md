---
layout: post
title: The hudson plugins you can't live without
created: 1282915829
author: hagzag
permalink: /devops/hudson-plugins-you-cant-live-without
tags:
- DevOps
- Hudson
---
<p>As a big fan of hudson-ci I would like to take a note of the most commonly used hudson plug-ins (at least by me) needed in order to maintain a good build environment.</p>
<p>This list was collected as part of my experience in the last couple of years. I am sure your may differ then mine mine :).</p>
<p>&nbsp;</p>
<p><span style="font-size: 14px; font-weight: bold; color: rgb(0, 0, 0); font-style: normal; font-family: Georgia;" class="subTitle">Setenv plugin</span></p>
<p>The <a style="color: rgb(128, 0, 0); text-decoration: underline; font-weight: normal;" href="http://wiki.hudson-ci.org/display/HUDSON/Setenv+Plugin">The Setenv plugin</a>  lets you set environment variables for a job upon build execution. During migration from CruiseControl I found this plugin extremely useful, for I could provide the imported script the exact environment it had on the CC machine without the need to change a thing in the build's logic / parameters, this also applied to the following recommended plugin:</p>
<p>&nbsp;</p>
<p><span style="font-size: 14px; font-weight: bold; color: rgb(0, 0, 0); font-style: normal; font-family: Georgia;" class="subTitle">Parameterized Trigger plugin</span></p>
<p>The <a style="color: rgb(128, 0, 0); text-decoration: underline; font-weight: normal;" href="http://wiki.hudson-ci.org/display/HUDSON/Parameterized+Trigger+Plugin">Parameterized Trigger</a>  plugin lets you add parameters to your build jobs that users enter when  they trigger a build. This a very useful plugin for release or deployment  automation, for example, where you want to enter the version number (or  label) you want to release or deploy. The biggest feature of this plugin is the default value so even automatic / SCM triggers get a default value to execute silently.</p>
<p>&nbsp;</p>
<p><img hspace="5" height="90" width="90" vspace="5" border="0" align="left" alt="cygwin logo" src="/files/upload/1/small_cygwin-logo.jpg" /><span style="font-size: 14px; font-weight: bold; color: rgb(0, 0, 0); font-style: normal; font-family: Georgia;" class="subTitle">Cygpath plugin</span><strong><br />
</strong></p>
<p>The <a href="http://wiki.hudson-ci.org/display/HUDSON/Cygpath+Plugin">Cygpath Plugin</a> <span class="smalltext">for a *nix oriented guy as myself, this was a great help, all our &quot;special&quot; shell script do not have to be re-written when we are running builds on Windows nodes - and yest we have too ... :)</span></p>
<p><span class="smalltext">The Cygpath gave me the </span><span class="smalltext">opportunity</span><span class="smalltext"> to share tools between linux and windows machines this gave us the ability to maintain one tool repository for all our slave regardless of </span><span class="smalltext">their</span><span class="smalltext"> architecture.</span></p>
<p>And did I forget to say all you need it to enable this and automatically every batch executed on a windows slave will automatically use Cygwin ? from Cygpath wiki:</p>
<p>- You install Cygwin on all the Windows slaves</p>
<p>- Jobs on Hudson that assume Unix environment can now run on all the slaves (including Windows ones)</p>
<p>- In the system configuration, you use Unix paths for all your tools.</p>
<p>&nbsp;</p>
<p><span style="font-size: 14px; font-weight: bold; color: rgb(0, 0, 0); font-style: normal; font-family: Georgia;" class="subTitle">Promoted Builds plugin</span><a href="http://wiki.hudson-ci.org/display/HUDSON/Promoted+Builds+Plugin"><strong><br />
</strong><img hspace="5" height="56" width="61" vspace="5" border="0" align="left" src="/files/upload/1/promotion.png" alt="Promotion" /></a><a href="http://wiki.hudson-ci.org/display/HUDSON/Promoted+Builds+Plugin">Definitely</a><a href="http://wiki.hudson-ci.org/display/HUDSON/Promoted+Builds+Plugin"> the </a><a href="http://search.twitter.com/search?q=%231">#1</a> plugin on the list here - this plugin enables you to do almost anything you can do in a certain Job but run it as a promotion task - if you wish to promote you build to your QA team for testing, or if you want to tag it in SVN or Deploy your artifacts to a maven repository, this is the plugin you &quot;cannot live without&quot;. Without this plugin you will need to configure a seperate job or Bach Task (see <a href="http://wiki.hudson-ci.org/display/HUDSON/Batch+Task+Plugin">batch tasks plugin</a> for more details) for every task you want to perform on your build - which makes managing hudson job a nightmare ...</p>
<p><span style="font-size: 14px; font-weight: bold; color: rgb(0, 0, 0); font-style: normal; font-family: Georgia;" class="subTitle"><br />
</span></p>
<p><a style="color: rgb(128, 0, 0); text-decoration: underline; font-weight: normal;" href="http://www.atlassian.com/software/clover/"><img hspace="5" height="76" width="80" vspace="5" border="0" align="left" src="/files/upload/1/logo-clover.png" alt="Clover logo" /><span style="font-size: 14px; font-weight: bold; color: rgb(0, 0, 0); font-style: normal; font-family: Georgia;" class="subTitle">Clover plugin</span></a></p>
<p><a style="color: rgb(128, 0, 0); text-decoration: underline; font-weight: normal;" href="http://www.atlassian.com/software/clover/">Clover</a> is a non-free code coverage tool which is the commercial alternative to Cobertura Emma etc, the Hudson <a style="color: rgb(128, 0, 0); text-decoration: underline; font-weight: normal;" href="http://wiki.hudson-ci.org/display/HUDSON/Clover+Plugin">Clover</a>  plugin is an amazing add on which integrates Clover reports and Historical reports into the build flow, which I found extremely helpful. Try configuring Clover to generate historical reports and then publish them to some third-party web server for viewing - this has made Clover integration a breeze, the challenge is even bigger with a distributed build environment which Hudson &amp;&nbsp;Clover plugin have overcome.</p>
<p><img height="323" width="580" src="/files/upload/1/CloverSS.jpg" alt="Clover in Job" /></p>
<p>If you don't have Clover, as mentioned above - the <a style="color: rgb(128, 0, 0); text-decoration: underline; font-weight: normal;" href="http://wiki.hudson-ci.org/display/HUDSON/Cobertura+Plugin">Cobertura</a> and <a style="color: rgb(128, 0, 0); text-decoration: underline; font-weight: normal;" href="http://wiki.hudson-ci.org/display/HUDSON/Emma+Plugin">Emma</a> plugins are great too which will also integrate with:</p>
<p>&nbsp;</p>
<p><span style="font-size: 14px; font-weight: bold; color: rgb(0, 0, 0); font-style: normal; font-family: Georgia;" class="subTitle"><br />
</span></p>
<p><img hspace="5" height="54" width="100" vspace="5" border="0" align="left" src="/files/upload/1/sonar_0.png" alt="" /><span style="font-size: 14px; font-weight: bold; color: rgb(0, 0, 0); font-style: normal; font-family: Georgia;" class="subTitle">Sonar plugin</span></p>
<p>Although I am only &quot;P.O.C ing&quot; Sonar+Hudson+Clover, The <a style="color: rgb(128, 0, 0); text-decoration: underline; font-weight: normal;" href="http://wiki.hudson-ci.org/display/HUDSON/Sonar+plugin">Sonar</a> plugin made it trivial to integrate hudson projects with Sonar. <a style="color: rgb(128, 0, 0); text-decoration: underline; font-weight: normal;" href="http://sonar.codehaus.org/">Sonar</a>  is a powerful open source code quality metrics reporting tool, which  displays code quality metrics for multiple projects in a variety of ways  on a centralized web location.</p>
<p>For Maven based builds you do not even need to change a line of code in order to get sonar to work which made this module a <a href="http://search.twitter.com/search?q=%232">#2</a> on my &quot;can't live without plugins&quot;.</p>
<p>&nbsp;</p>
<p><span class="subTitle" style="font-size: 14px; font-weight: bold; color: rgb(0, 0, 0); font-style: normal; font-family: Georgia;">Sectioned View plugin</span><a style="color: rgb(128, 0, 0); text-decoration: underline; font-weight: normal;" href="http://wiki.hudson-ci.org/display/HUDSON/Setenv+Plugin"><span style="font-size: 14px; font-weight: bold; color: rgb(0, 0, 0); font-style: normal; font-family: Georgia;" class="subTitle"> <br />
</span></a></p>
<p><a href="http://wiki.hudson-ci.org/display/HUDSON/Sectioned+View+Plugin">Sectioned view</a> gives you the ability to create a &quot;Dashboard view&quot; for your job(s) / project(s) - it is quite feature rich if you take a look at it's configuration and it is very simple to comprehend. A great example is taken from the plugins wiki page see:</p>
<p><img height="507" width="580" border="0" src="/files/upload/1/sectioned.png" alt="Section view scrrenshot" /></p>
<p>&nbsp;</p>
<p><span style="font-size: 14px; font-weight: bold; color: rgb(0, 0, 0); font-style: normal; font-family: Georgia;" class="subTitle">Nested Views plugin<br />
</span></p>
<p><a href="http://wiki.hudson-ci.org/display/HUDSON/Nested+View+Plugin">Nested view</a>s another View type which allows grouping job views into multiple levels instead of one big list of tabs - this is quite useful and the only disadvantage is you can have both a view and jobs in the same page it's either a nested view or a list of views - but I presume it will sure be included.</p>
<p>&nbsp;</p>
<p><span style="font-size: 14px; font-weight: bold; color: rgb(0, 0, 0); font-style: normal; font-family: Georgia;" class="subTitle">Sheleve Project plugin</span></p>
<p><span id="title-text">If you ever wanted to Hide a jo you are working on and you also would like to prevent it from being triggered by mistake this is the plugin for you. I often find my self setting up a job and it becomes a work in progress so hiding it to a later time is a great help - this plugin does just that.<br />
</span></p>
<p>&nbsp;</p>
<p><span style="font-size: 14px; font-weight: bold; color: rgb(0, 0, 0); font-style: normal; font-family: Georgia;" class="subTitle">Bugzilla &amp; Jira plugins </span>(&amp;&nbsp;there or others I presume)</p>
<p><img hspace="5" height="90" width="90" vspace="5" border="0" align="left" alt="Bugzilla logo" src="/files/upload/1/bugzilla.png" />Well the fact I need both in the same Hudson cluster and I can still have them work side by side was really important. In order for this plugin to serve you well your CM team has to some extra work on your SCM side, that done you got yourself a link directly into your bug tracking system - the latest versions, query <a href="http://wiki.hudson-ci.org/display/HUDSON/Bugzilla+Plugin">Bugzilla</a> &amp; <a href="http://wiki.hudson-ci.org/display/HUDSON/JIRA+Plugin">Jira</a> and can display the Bug details.</p>
<p>&nbsp;</p>
<p>&nbsp;</p>

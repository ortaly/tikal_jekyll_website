---
layout: post
title: Running a shell command from a certain folder in the Jenkins' dynamic parameter
  script
created: 1396537471
author: gil
permalink: running-a-shell-command-from-a-certain-folder-in-the-jenkins-dynamic-parameter-script
tags:
- Incubator
- DevOps
---
<p>I used the Jenkins&#39; Dynamic parameter in order to generate date for a job but that is very easy to do.</p>

<p>What I needd to do latley is to get an application version using the javaScript&#39;s package manager&#39;s command npm or in other words, some shell command.</p>

<p>While googling, I have found that the way to run a shell command is as follows:</p>

<p><strong>&quot;&lt;shell command&gt;&quot;.execute().text</strong>. Problem was, I could only run the NPM command from the root of the JavaScript project and that wasn&#39;t my jenkins job&#39;s workspace so I needed to change folder into that folder first and that didn&#39;t work: <strong>&quot;cd &lt;folder&gt;&quot;.execute()</strong>. To overcome this issue I fould the following solution:</p>

<p><b style="color: rgb(34, 34, 34); font-family: arial, sans-serif; line-height: normal;">&quot;&lt;some shell command&gt;&quot;.execute(null, new File(&quot;&lt;path to where you want to run the command from&gt;&quot;)).text</b></p>

<p>&nbsp;</p>

<p><font color="#222222" face="arial, sans-serif"><span style="line-height: normal;">The above overload of the execute function uses two parameters. The first one is irrelevant for this topic and the second one is actually what I needed. It sets the command to run under that path.&nbsp;</span></font></p>

<p>&nbsp;</p>

<p><font color="#222222" face="arial, sans-serif"><span style="line-height: normal;">Hope that helps someone.</span></font></p>

<p>&nbsp;</p>

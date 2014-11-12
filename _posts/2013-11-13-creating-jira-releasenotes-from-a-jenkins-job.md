---
layout: post
title: 'Creating Jira ReleaseNotes from a Jenkins job '
created: 1384359902
author: gil
permalink: /devops/creating-jira-releasenotes-jenkins-job
tags:
- DevOps
- jira jenkins shell scripting
---
<p>I got an interesting task from my customer. He wanted me to generate a ReleaseNotes.html file automatically from a Jenkins job&#39;s build.</p>

<p>First, I tried to make the Jira&#39;s plugin&nbsp;<span style="color: rgb(0, 0, 0); font-family: Verdana, Helvetica, 'sans serif'; font-size: 11px; line-height: normal;"><span style="font-size:12px;">Generate Release Notes feature to work. The <a href="https://wiki.jenkins-ci.org/display/JENKINS/JIRA+Plugin">Jira plugin&#39;s wiki</a>&nbsp;is quite strait forward but it did not work for me.</span></span></p>

<p><span style="color: rgb(0, 0, 0); font-family: Verdana, Helvetica, 'sans serif'; font-size: 11px; line-height: normal;"><span style="font-size:12px;">After consulting with one of my team mates and trying some things we have found out that the problem only occures if the build is running on windows slaves.</span></span></p>

<p><span style="color: rgb(0, 0, 0); font-family: Verdana, Helvetica, 'sans serif'; font-size: 11px; line-height: normal;"><span style="font-size:12px;">On Linux slave, I have echoed the JiraReleaseNotes parameter and got one long line with all the data. It was some progress but still wasn&#39;t the end of my task. I still had to create a formatted html out of this long line.</span></span></p>

<p><span style="color: rgb(0, 0, 0); font-family: Verdana, Helvetica, 'sans serif'; font-size: 11px; line-height: normal;"><span style="font-size:12px;">Then I started to try and parse this long line in shell script with no success. When googling on &quot;split string&quot; in a shell script, the only way is using the &quot;tr&quot; command but the tr command only replaces charachters in string and that wasn&#39;t enough to split the lines because running in a loop over the splitted lines resulted in splitting the long line into spaces. It means that every space became a new line.&nbsp;</span></span></p>

<p><span style="color: rgb(0, 0, 0); font-family: Verdana, Helvetica, 'sans serif'; font-size: 11px; line-height: normal;"><span style="font-size:12px;">I then thought of&nbsp;another sulotion that might work. Redirect each tr command to a file and then parse the file line by line. </span></span><span style="font-size:12px;">Surprisingly</span><span style="color: rgb(0, 0, 0); font-family: Verdana, Helvetica, 'sans serif'; font-size: 11px; line-height: normal;"><span style="font-size:12px;">&nbsp;it did work (Don&#39;t ask me why because I have no idea). My script consisted of 4 &quot;while read line&quot; loops but it works&nbsp;:-)</span></span></p>

<p><span style="color: rgb(0, 0, 0); font-family: Verdana, Helvetica, 'sans serif'; font-size: 11px; line-height: normal;"><span style="font-size:12px;">Here is the script:</span></span></p>

<p>&nbsp; retVal=&quot;false&quot;</p>

<p>&nbsp; contains() {<br />
&nbsp; &nbsp; string=&quot;$1&quot;<br />
&nbsp; &nbsp; substring=&quot;$2&quot;<br />
&nbsp; &nbsp; if test &quot;${string#*$substring}&quot; != &quot;$string&quot;<br />
&nbsp; &nbsp; then<br />
&nbsp; &nbsp; &nbsp; &nbsp; retVal=&quot;true&quot; &nbsp; # $substring is in $string<br />
&nbsp; &nbsp; else<br />
&nbsp; &nbsp; &nbsp; &nbsp; retVal=&quot;false&quot; &nbsp; &nbsp;# $substring is not in $string<br />
&nbsp; &nbsp; fi<br />
&nbsp; }</p>

<p>&nbsp;#&nbsp;JiraReleaseNotes is the environment variable that holds the long line of issues</p>

<p>&nbsp; echo $JiraReleaseNotes &gt; 1.txt</p>

<p>&nbsp; if [ -f 2.txt ]<br />
&nbsp; then<br />
&nbsp; &nbsp; rm -f 2.txt<br />
&nbsp; fi<br />
&nbsp; while read LINE<br />
&nbsp; do<br />
&nbsp; &nbsp; &nbsp; &nbsp; echo &quot;$LINE&quot; | tr &quot;#&quot; &quot;\n&quot; &gt; 2.txt<br />
&nbsp; done &lt; 1.txt</p>

<p>&nbsp; if [ -f 3.txt ]<br />
&nbsp; then<br />
&nbsp; &nbsp; rm -f 3.txt<br />
&nbsp; fi<br />
&nbsp; while read LINE<br />
&nbsp; do<br />
&nbsp; &nbsp; &nbsp; &nbsp; echo &quot;$LINE&quot; | tr &quot;[&quot; &quot;\n&quot; &gt;&gt; 3.txt<br />
&nbsp; done &lt; 2.txt</p>

<p>&nbsp; if [ -f 4.txt ]<br />
&nbsp; then<br />
&nbsp; &nbsp; rm -f 4.txt<br />
&nbsp; fi<br />
&nbsp; while read LINE<br />
&nbsp; do<br />
&nbsp; &nbsp; &nbsp; &nbsp; echo &quot;$LINE&quot; | tr &quot;]&quot; &quot;\n&quot; &gt;&gt; 4.txt<br />
&nbsp; done &lt; 3.txt</p>

<p>&nbsp;# APP_VERSION is the Jira version of the APP being generated from the Jira Release Number Parameter</p>

<p>&nbsp; echo &quot; &nbsp; &nbsp; &nbsp; &nbsp;Release Notes - Applications - APP - Version ${APP_VERSION}&quot; &gt; ReleaseNotes.html<br />
&nbsp; while read LINE<br />
&nbsp; do<br />
&nbsp; &nbsp; &nbsp; &nbsp; contains &quot;$LINE&quot; &quot;Bug&quot;<br />
&nbsp; &nbsp; &nbsp; &nbsp; ret1=$retVal<br />
&nbsp; &nbsp; &nbsp; &nbsp; contains &quot;$LINE&quot; &quot;Story&quot;<br />
&nbsp; &nbsp; &nbsp; &nbsp; ret2=$retVal</p>

<p>&nbsp; &nbsp; &nbsp; &nbsp; # Project is the project in the Jira<br />
&nbsp; &nbsp; &nbsp; &nbsp; contains &quot;$LINE&quot; &quot;PROJECT-&quot;<br />
&nbsp; &nbsp; &nbsp; &nbsp; ret3=$retVal<br />
&nbsp; &nbsp; &nbsp; &nbsp; if [ $ret1 == &quot;true&quot; -o $ret2 == &quot;true&quot; ]<br />
&nbsp; &nbsp; &nbsp; &nbsp; then<br />
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; echo &quot;&lt;/ul&gt;&quot; &gt;&gt; ReleaseNotes.html<br />
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; echo &quot;&lt;h2&gt; &nbsp; &nbsp; &nbsp; &nbsp;$LINE&quot; &gt;&gt; ReleaseNotes.html<br />
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; echo &quot;&lt;/h2&gt;&quot; &gt;&gt; ReleaseNotes.html<br />
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; echo &quot;&lt;ul&gt;&quot; &gt;&gt; ReleaseNotes.html<br />
&nbsp; &nbsp; &nbsp; &nbsp; elif [ $ret3 == &quot;true&quot; ]<br />
&nbsp; &nbsp; &nbsp; &nbsp; then</p>

<p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; # URL is the address of your Jira server<br />
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; echo -n &quot;&lt;li&gt;[&lt;a href=&#39;http://URL:8080/browse/$LINE&#39;&gt;$LINE&lt;/a&gt;] - &nbsp; &nbsp; &nbsp; &nbsp; &quot; &gt;&gt; ReleaseNotes.html<br />
&nbsp; &nbsp; &nbsp; &nbsp; else<br />
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; echo $LINE &gt;&gt; ReleaseNotes.html<br />
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; echo &quot;&lt;/li&gt;&quot; &gt;&gt; ReleaseNotes.html<br />
&nbsp; &nbsp; &nbsp; &nbsp; fi<br />
&nbsp; done &lt; 4.txt<br />
&nbsp; echo &quot;&lt;/ul&gt;&quot; &gt;&gt; ReleaseNotes.html</p>

<p>&nbsp;</p>

<p>I can&#39;t tell if this script will work for any kind of Jira input or Jira version and I&#39;m not sure if it&#39;ll fit the HTML format that you need but I think that it is a good start.</p>

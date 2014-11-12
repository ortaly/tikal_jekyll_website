---
layout: post
title: Jenkins – Branches
created: 1398772976
author: chaim.turkel
permalink: jenkins-branches
tags:
- DevOps
- jenkins
- DevOps
- scm
- branches
---
<p>We have an application that to fully test it with different phases we would need about 15 jobs (see the following post for simplification of jobs: <span class="MsoHyperlink">http://javaandroidandrest.blogspot.com/2014/03/jenkins-multijob-plugin.html)</span>.&nbsp; The problem with this is that once you branch your trunk version you do not want to duplicate all jobs.</p>

<p>One solution for this problem is to use the &ldquo;Job Generator Plugin&rdquo; (<a href="https://wiki.jenkins-ci.org/display/JENKINS/Job+Generator+Plugin">https://wiki.jenkins-ci.org/display/JENKINS/Job+Generator+Plugin</a>). With this plugin you create a template job, and every time you run it, it will create a new job for you and based on the template values and insert the relevant parameters. This is a nice plugin to save the duplicate job and then update with all parameters, but in the end you have all jobs duplicated, and if you find a bug in the job, you need to update it for all duplications.</p>

<p>I decided to go in a different direction. I created my base of jobs that will work with any version of my application (trunk or branches). The only difference between jobs of different branches is the location in the SCM and the location on the disk of the build machine (we need to have separate workspaces for each branch). There are sometimes other parameters like which version of java to compile with, but as you will see all of this is not an issue.</p>

<p>The first plugin that we need to add is &ldquo;EnvInject Plugin&rdquo; (<a href="https://wiki.jenkins-ci.org/display/JENKINS/EnvInject+Plugin">https://wiki.jenkins-ci.org/display/JENKINS/EnvInject+Plugin</a>). This plugin will allow us to inject values to parameters in the job based on a properties file.</p>

<p><a href="http://1.bp.blogspot.com/-kvf8l1_RetE/U1-M3WiKXPI/AAAAAAAALRs/fCrJ63IBBsc/s1600/envplugin.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="235" src="http://1.bp.blogspot.com/-kvf8l1_RetE/U1-M3WiKXPI/AAAAAAAALRs/fCrJ63IBBsc/s1600/envplugin.png" width="400" /></a></p>

<p>&nbsp;</p>

<p><!--[if gte vml 1]><v:shapetype
 id="_x0000_t75" coordsize="21600,21600" o:spt="75" o:preferrelative="t"
 path="m@4@5l@4@11@9@11@9@5xe" filled="f" stroked="f">
 <v:stroke joinstyle="miter"/>
 <v:formulas>
  <v:f eqn="if lineDrawn pixelLineWidth 0"/>
  <v:f eqn="sum @0 1 0"/>
  <v:f eqn="sum 0 0 @1"/>
  <v:f eqn="prod @2 1 2"/>
  <v:f eqn="prod @3 21600 pixelWidth"/>
  <v:f eqn="prod @3 21600 pixelHeight"/>
  <v:f eqn="sum @0 0 1"/>
  <v:f eqn="prod @6 1 2"/>
  <v:f eqn="prod @7 21600 pixelWidth"/>
  <v:f eqn="sum @8 21600 0"/>
  <v:f eqn="prod @7 21600 pixelHeight"/>
  <v:f eqn="sum @10 21600 0"/>
 </v:formulas>
 <v:path o:extrusionok="f" gradientshapeok="t" o:connecttype="rect"/>
 <o:lock v:ext="edit" aspectratio="t"/>
</v:shapetype><v:shape id="Picture_x0020_1" o:spid="_x0000_i1030" type="#_x0000_t75"
 style='width:390.75pt;height:230.25pt;visibility:visible;mso-wrap-style:square'>
 <v:imagedata src="file:///C:\Users\Chaimt\AppData\Local\Temp\msohtmlclip1\01\clip_image001.png"
  o:title=""/>
</v:shape><![endif]--><!--[if !vml]--><!--[endif]--></p>

<p>I create a properties file per version and per OS (I run some of the jobs on different OS&rsquo;s for validation).</p>

<p>The value of my property file can be something like (trunk.windows.properties):</p>

<p><span style="color: #00b0f0; font-size: 8.0pt; line-height: 115%;">#March 26 2014<o:p></o:p></span></p>

<p><span style="color: #00b0f0; font-size: 8.0pt; line-height: 115%;">JAVA_HOME=D:\ins\java\jdk1.7.0_40<o:p></o:p></span></p>

<p><span style="color: #00b0f0; font-size: 8.0pt; line-height: 115%;">PERFORCE_MAP=//depot/Foundation/dev<o:p></o:p></span></p>

<p><span style="color: #00b0f0; font-size: 8.0pt; line-height: 115%;">MY_VERSION=trunk<o:p></o:p></span></p>

<p><span style="color: #00b0f0; font-size: 8.0pt; line-height: 115%;">APP_VERSION=current-SNAPSHOT<o:p></o:p></span></p>

<p><span style="color: #00b0f0; font-size: 8.0pt; line-height: 115%;">BASE_DIR=D:\Perforce_WS\<o:p></o:p></span></p>

<p><span style="font-size: 10.0pt; line-height: 115%;">and for linux (trunk.linux.properties):<o:p></o:p></span></p>

<p><span style="color: #00b0f0; font-size: 8.0pt; line-height: 115%;">#March 26 2014<o:p></o:p></span></p>

<p><span style="color: #00b0f0; font-size: 8.0pt; line-height: 115%;">JAVA_HOME=/usr/java/jdk1.7.0_40/<o:p></o:p></span></p>

<p><span style="color: #00b0f0; font-size: 8.0pt; line-height: 115%;">PERFORCE_MAP=//depot/Foundation/dev<o:p></o:p></span></p>

<p><span style="color: #00b0f0; font-size: 8.0pt; line-height: 115%;">MY_VERSION=trunk<o:p></o:p></span></p>

<p><span style="color: #00b0f0; font-size: 8.0pt; line-height: 115%;">APP_VERSION=current-SNAPSHOT<o:p></o:p></span></p>

<p><span style="color: #00b0f0; font-size: 8.0pt; line-height: 115%;">BASE_DIR=/fnduser3/fnd/dev/<o:p></o:p></span></p>

<p><span style="font-size: 10.0pt; line-height: 115%;">What is nice about this plugin is that the property files all need to sit only on the master machine, and Jenkins will copy the file to each slave and inject the properties at the beginning of the job. So in the end I have two files per branch (one for each OS) and in the file I put the different values of the parameters. You need to remember to parameterize the workspace per version, so that you can run the same job in parallel for different versions, and for easy debugging of the workspace.<o:p></o:p></span></p>

<p><span style="font-size: 10.0pt; line-height: 115%;">So now all my jobs are version agnostic. What I need is to pass into the job is the version that I need (I have a job per OS since there might be different settings in the job per OS [the parameter file is per version]). To pass the parameter I add a parameter to the build (</span><a href="https://wiki.jenkins-ci.org/display/JENKINS/Parameterized+Build"><span style="font-size: 10.0pt; line-height: 115%;">https://wiki.jenkins-ci.org/display/JENKINS/Parameterized+Build</span></a><span style="font-size: 10.0pt; line-height: 115%;">), my default is trunk since this is the most used value. <o:p></o:p></span></p>

<p>&nbsp;</p>

<p><a href="http://2.bp.blogspot.com/-CACtSQIh05c/U1-M4BE1_EI/AAAAAAAALSA/_3uup42A_b0/s1600/paramplugin.png" imageanchor="1" style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;"><img border="0" height="138" src="http://2.bp.blogspot.com/-CACtSQIh05c/U1-M4BE1_EI/AAAAAAAALSA/_3uup42A_b0/s1600/paramplugin.png" width="640" /></a></p>

<p>&nbsp;</p>

<p>&nbsp;</p>

<p><!--[if gte vml 1]><v:shape
 id="Picture_x0020_2" o:spid="_x0000_i1029" type="#_x0000_t75" style='width:468pt;
 height:102pt;visibility:visible;mso-wrap-style:square'>
 <v:imagedata src="file:///C:\Users\Chaimt\AppData\Local\Temp\msohtmlclip1\01\clip_image003.png"
  o:title=""/>
</v:shape><![endif]--><!--[if !vml]--><!--[endif]--><span style="font-size: 10.0pt; line-height: 115%;"><o:p></o:p></span></p>

<p>&nbsp;</p>

<p>&nbsp;</p>

<p>&nbsp;</p>

<p><span style="font-size: 10.0pt; line-height: 115%;">The only part of the job that cannot be parameterized is the SCM since we need to poll the SCM for changes. So what we need to do is create a watcher job per branch. If you have different builds based on SCM path then you will need a watcher per path.<o:p></o:p></span></p>

<p><span style="font-size: 10.0pt; line-height: 115%;">Each watcher will poll the SCM and when it detects a change it will then trigger the generic job, and pass into the job the parameter for the version of the build. The generic job will then inject all parameters based on the property file and run the job.<o:p></o:p></span></p>

<p><span style="font-size: 10.0pt; line-height: 115%;">To summarize: we have a watcher job per version (polls SCM), which then triggers the version agnostic jobs and injects the current version running. The job then injects all parameters relevant to the version from the properties file.<o:p></o:p></span></p>

<p><span style="font-size: 10.0pt; line-height: 115%;">But now we have the issue of debugging. All works fine and the one of the version agnostic jobs fails. Yes I can have a look in the log and find the version according to the injected properties file:<o:p></o:p></span></p>

<p>&nbsp;</p>

<p><a href="http://1.bp.blogspot.com/-AziSrNMM3Io/U1-M3a4vq4I/AAAAAAAALRk/kafetNZ_kQg/s1600/console.png" imageanchor="1" style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;"><img border="0" height="160" src="http://1.bp.blogspot.com/-AziSrNMM3Io/U1-M3a4vq4I/AAAAAAAALRk/kafetNZ_kQg/s1600/console.png" width="640" /></a></p>

<p>&nbsp;</p>

<p>&nbsp;</p>

<p><!--[if gte vml 1]><v:shape
 id="Picture_x0020_3" o:spid="_x0000_i1028" type="#_x0000_t75" style='width:468pt;
 height:117pt;visibility:visible;mso-wrap-style:square'>
 <v:imagedata src="file:///C:\Users\Chaimt\AppData\Local\Temp\msohtmlclip1\01\clip_image005.png"
  o:title=""/>
</v:shape><![endif]--><!--[if !vml]--><!--[endif]--><span style="font-size: 10.0pt; line-height: 115%;"><o:p></o:p></span></p>

<p>&nbsp;</p>

<p>&nbsp;</p>

<p>&nbsp;</p>

<p>&nbsp;</p>

<p><span style="font-size: 10.0pt; line-height: 115%;">But this is not nice. So we will need another plugin &ndash; &ldquo;Build Name Setter&rdquo; (<a href="https://wiki.jenkins-ci.org/display/JENKINS/Build+Name+Setter+Plugin">https://wiki.jenkins-ci.org/display/JENKINS/Build+Name+Setter+Plugin</a>). This plugin will allow us to change the name of the run once it starts running. So we can configure all the version agnostics jobs:<o:p></o:p></span></p>

<p>&nbsp;</p>

<p>&nbsp;</p>

<p><a href="http://4.bp.blogspot.com/-MdOeJEJRouQ/U1-M4XkjFyI/AAAAAAAALR4/EU6botySiMo/s1600/setnameplugin.png" imageanchor="1" style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;"><img border="0" height="224" src="http://4.bp.blogspot.com/-MdOeJEJRouQ/U1-M4XkjFyI/AAAAAAAALR4/EU6botySiMo/s1600/setnameplugin.png" width="640" /></a></p>

<p>&nbsp;</p>

<p>&nbsp;</p>

<p><!--[if gte vml 1]><v:shape
 id="Picture_x0020_4" o:spid="_x0000_i1027" type="#_x0000_t75" style='width:468pt;
 height:164.25pt;visibility:visible;mso-wrap-style:square'>
 <v:imagedata src="file:///C:\Users\Chaimt\AppData\Local\Temp\msohtmlclip1\01\clip_image007.png"
  o:title=""/>
</v:shape><![endif]--><!--[if !vml]--><!--[endif]--><span style="font-size: 10.0pt; line-height: 115%;"><o:p></o:p></span></p>

<p>&nbsp;</p>

<p>&nbsp;</p>

<p>&nbsp;</p>

<p>&nbsp;</p>

<p>&nbsp;</p>

<p>&nbsp;</p>

<p><span style="font-size: 10.0pt; line-height: 115%;">What this will do is to rename the current job and add the version to the name of the job. This way in the history of each version agnostic job you can easily see which versions have run and passed and which have failed:<o:p></o:p></span></p>

<p>&nbsp;</p>

<p><a href="http://4.bp.blogspot.com/-06MFwSEYILo/U1-M3zlhmSI/AAAAAAAALSE/D-1qoIGW5i8/s1600/history.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="280" src="http://4.bp.blogspot.com/-06MFwSEYILo/U1-M3zlhmSI/AAAAAAAALSE/D-1qoIGW5i8/s1600/history.png" width="400" /></a></p>

<p>&nbsp;</p>

<p>&nbsp;</p>

<p>&nbsp;</p>

<p><!--[if gte vml 1]><v:shape
 id="Picture_x0020_5" o:spid="_x0000_i1026" type="#_x0000_t75" style='width:231pt;
 height:162pt;visibility:visible;mso-wrap-style:square'>
 <v:imagedata src="file:///C:\Users\Chaimt\AppData\Local\Temp\msohtmlclip1\01\clip_image009.png"
  o:title=""/>
</v:shape><![endif]--><!--[if !vml]--><!--[endif]--><span style="font-size: 10.0pt; line-height: 115%;"><o:p></o:p></span></p>

<p>&nbsp;</p>

<p><span style="font-size: 10.0pt; line-height: 115%;">Once all jobs are running fine we sometimes want to have the compiled artifacts in a link of the job. This works fine in our case, but it is not very nice, since you need to go to the history of the version agnostic job to find the right version and then get the artifact. To overcome this issue we will use the &ldquo;Copy Artifact Plugin&rdquo; (<a href="https://wiki.jenkins-ci.org/display/JENKINS/Copy+Artifact+Plugin">https://wiki.jenkins-ci.org/display/JENKINS/Copy+Artifact+Plugin</a>). This will allow us to copy artifacts from one job to another. So on your watcher jobs, you can copy all artifacts from the other jobs, put them all in an archive folder and then share them in the watcher job.<o:p></o:p></span></p>

<p>&nbsp;</p>

<p><a href="http://3.bp.blogspot.com/-dGM3lKV6c5E/U1-M3VsOmFI/AAAAAAAALRo/SMYgrXMwAP4/s1600/copyartifactplugin.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="278" src="http://3.bp.blogspot.com/-dGM3lKV6c5E/U1-M3VsOmFI/AAAAAAAALRo/SMYgrXMwAP4/s1600/copyartifactplugin.png" width="400" /></a></p>

<p>&nbsp;</p>

<p>&nbsp;</p>

<p>&nbsp;</p>

<p><!--[if gte vml 1]><v:shape
 id="Picture_x0020_7" o:spid="_x0000_i1025" type="#_x0000_t75" style='width:399.75pt;
 height:279pt;visibility:visible;mso-wrap-style:square'>
 <v:imagedata src="file:///C:\Users\Chaimt\AppData\Local\Temp\msohtmlclip1\01\clip_image011.png"
  o:title=""/>
</v:shape><![endif]--><!--[if !vml]--><!--[endif]--><span style="font-size: 10.0pt; line-height: 115%;"><o:p></o:p></span></p>

<p>&nbsp;</p>

<p>&nbsp;</p>

<p>&nbsp;</p>

<p>&nbsp;</p>

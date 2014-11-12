---
layout: post
title: Maven Profiles - per module
created: 1393417199
author: chaim.turkel
permalink: maven-profiles-per-module
tags:
- DevOps
---
<h1>Maven Profiles<o:p></o:p></h1>

<h2>Activation per module<o:p></o:p></h2>

<div class="MsoNormal">Maven profiles are very powerful (<a href="http://maven.apache.org/guides/introduction/introduction-to-profiles.html">http://maven.apache.org/guides/introduction/introduction-to-profiles.html</a>).<o:p></o:p></div>

<div class="MsoNormal">One of the hardest parts of maven, in my opinion, for someone coming from a programing background, is that the flow of maven is not a method call.<o:p></o:p></div>

<div class="MsoNormal">In a lot of cases we would like to create a batch process (group of plugins) that do something, and then invoke them in different modules. So what you would expect to do is to create a profile with all the plugins that you want, and then to active it on a module level.<o:p></o:p></div>

<div class="MsoNormal">For instance a simple example is to download all dependencies of the project to the target directory. In this case we will define the profile in the parent pom as follows:<o:p></o:p></div>

<div class="MsoNormal" style="background-color: white; background-position: initial initial; background-repeat: initial initial; margin-bottom: 0.0001pt;"><span style="font-family: 'Courier New'; font-size: 10pt;">&lt;profile&gt;<o:p></o:p></span></div>

<div class="MsoNormal" style="background-color: white; background-position: initial initial; background-repeat: initial initial; margin-bottom: 0.0001pt;"><span style="font-family: 'Courier New'; font-size: 10pt;">&nbsp; &lt;id&gt;trace&lt;/id&gt;<o:p></o:p></span></div>

<div class="MsoNormal" style="background-color: white; background-position: initial initial; background-repeat: initial initial; margin-bottom: 0.0001pt;"><span style="font-family: 'Courier New'; font-size: 10pt;">&nbsp; &lt;build&gt;<o:p></o:p></span></div>

<div class="MsoNormal" style="background-color: white; background-position: initial initial; background-repeat: initial initial; margin-bottom: 0.0001pt;"><span style="font-family: 'Courier New'; font-size: 10pt;">&nbsp;&nbsp;&nbsp; &lt;plugins&gt;<o:p></o:p></span></div>

<div class="MsoNormal" style="background-color: white; background-position: initial initial; background-repeat: initial initial; margin-bottom: 0.0001pt;"><span style="font-family: 'Courier New'; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &lt;plugin&gt;<o:p></o:p></span></div>

<div class="MsoNormal" style="background-color: white; background-position: initial initial; background-repeat: initial initial; margin-bottom: 0.0001pt;"><span style="font-family: 'Courier New'; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;artifactId&gt;maven-dependency-plugin&lt;/artifactId&gt;<o:p></o:p></span></div>

<div class="MsoNormal" style="background-color: white; background-position: initial initial; background-repeat: initial initial; margin-bottom: 0.0001pt;"><span style="font-family: 'Courier New'; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;groupId&gt;org.apache.maven.plugins&lt;/groupId&gt;<o:p></o:p></span></div>

<div class="MsoNormal" style="background-color: white; background-position: initial initial; background-repeat: initial initial; margin-bottom: 0.0001pt;"><span style="font-family: 'Courier New'; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;executions&gt;<o:p></o:p></span></div>

<div class="MsoNormal" style="background-color: white; background-position: initial initial; background-repeat: initial initial; margin-bottom: 0.0001pt;"><span style="font-family: 'Courier New'; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &lt;execution&gt;<o:p></o:p></span></div>

<div class="MsoNormal" style="background-color: white; background-position: initial initial; background-repeat: initial initial; margin-bottom: 0.0001pt;"><span style="font-family: 'Courier New'; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;phase&gt;package&lt;/phase&gt;<o:p></o:p></span></div>

<div class="MsoNormal" style="background-color: white; background-position: initial initial; background-repeat: initial initial; margin-bottom: 0.0001pt;"><span style="font-family: 'Courier New'; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;goals&gt;<o:p></o:p></span></div>

<div class="MsoNormal" style="background-color: white; background-position: initial initial; background-repeat: initial initial; margin-bottom: 0.0001pt;"><span style="font-family: 'Courier New'; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &lt;goal&gt;copy-dependencies&lt;/goal&gt;<o:p></o:p></span></div>

<div class="MsoNormal" style="background-color: white; background-position: initial initial; background-repeat: initial initial; margin-bottom: 0.0001pt;"><span style="font-family: 'Courier New'; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;/goals&gt;<o:p></o:p></span></div>

<div class="MsoNormal" style="background-color: white; background-position: initial initial; background-repeat: initial initial; margin-bottom: 0.0001pt;"><span style="font-family: 'Courier New'; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;configuration&gt;<o:p></o:p></span></div>

<div class="MsoNormal" style="background-color: white; background-position: initial initial; background-repeat: initial initial; margin-bottom: 0.0001pt;"><span style="font-family: 'Courier New'; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &lt;outputDirectory&gt;${project.build.directory}/lib&lt;/outputDirectory&gt;<o:p></o:p></span></div>

<div class="MsoNormal" style="background-color: white; background-position: initial initial; background-repeat: initial initial; margin-bottom: 0.0001pt;"><span style="font-family: 'Courier New'; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;/configuration&gt;<o:p></o:p></span></div>

<div class="MsoNormal" style="background-color: white; background-position: initial initial; background-repeat: initial initial; margin-bottom: 0.0001pt;"><span style="font-family: 'Courier New'; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &lt;/execution&gt;<o:p></o:p></span></div>

<div class="MsoNormal" style="background-color: white; background-position: initial initial; background-repeat: initial initial; margin-bottom: 0.0001pt;"><span style="font-family: 'Courier New'; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;/executions&gt;<o:p></o:p></span></div>

<div class="MsoNormal" style="background-color: white; background-position: initial initial; background-repeat: initial initial; margin-bottom: 0.0001pt;"><span style="font-family: 'Courier New'; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &lt;/plugin&gt;<o:p></o:p></span></div>

<div class="MsoNormal" style="background-color: white; background-position: initial initial; background-repeat: initial initial; margin-bottom: 0.0001pt;"><span style="font-family: 'Courier New'; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&lt;/plugins&gt;<o:p></o:p></span></div>

<div class="MsoNormal" style="background-color: white; background-position: initial initial; background-repeat: initial initial; margin-bottom: 0.0001pt;"><span style="font-family: 'Courier New'; font-size: 10pt;">&nbsp; &lt;/build&gt;<o:p></o:p></span></div>

<div class="MsoNormal" style="background-color: white; background-position: initial initial; background-repeat: initial initial; margin-bottom: 0.0001pt;"><span style="font-family: 'Courier New'; font-size: 10pt;">&lt;/profile&gt;<o:p></o:p></span></div>

<div class="MsoNormal" style="background-color: white; background-position: initial initial; background-repeat: initial initial; margin-bottom: 0.0001pt;">&nbsp;</div>

<div class="MsoNormal">Now the problem is that when I invoke this profile it will be active on all modules. In this case it might be nice, but what if I have multiple modules and want to invoke the profile from only some of the modules.<o:p></o:p></div>

<div class="MsoNormal">This is where profile activation comes in. There is an option to activate a profile based on a system parameter like:<o:p></o:p></div>

<div class="MsoNormal" style="background-color: white; background-position: initial initial; background-repeat: initial initial; margin-bottom: 0.0001pt;"><span style="font-family: 'Courier New'; font-size: 10pt;">&nbsp; &lt;profile&gt;<o:p></o:p></span></div>

<div class="MsoNormal" style="background-color: white; background-position: initial initial; background-repeat: initial initial; margin-bottom: 0.0001pt;"><span style="font-family: 'Courier New'; font-size: 10pt;">&nbsp;&nbsp;&nbsp; &lt;activation&gt;<o:p></o:p></span></div>

<div class="MsoNormal" style="background-color: white; background-position: initial initial; background-repeat: initial initial; margin-bottom: 0.0001pt;"><span style="font-family: 'Courier New'; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;property&gt;<o:p></o:p></span></div>

<div class="MsoNormal" style="background-color: white; background-position: initial initial; background-repeat: initial initial; margin-bottom: 0.0001pt;"><span style="font-family: 'Courier New'; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;name&gt;debug&lt;/name&gt;<o:p></o:p></span></div>

<div class="MsoNormal" style="background-color: white; background-position: initial initial; background-repeat: initial initial; margin-bottom: 0.0001pt;"><span style="font-family: 'Courier New'; font-size: 10pt;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;/property&gt;<o:p></o:p></span></div>

<div class="MsoNormal" style="background-color: white; background-position: initial initial; background-repeat: initial initial; margin-bottom: 0.0001pt;"><span style="font-family: 'Courier New'; font-size: 10pt;">&nbsp;&nbsp;&nbsp; &lt;/activation&gt;<o:p></o:p></span></div>

<div class="MsoNormal" style="background-color: white; background-position: initial initial; background-repeat: initial initial; margin-bottom: 0.0001pt;"><span style="font-family: 'Courier New'; font-size: 10pt;">&nbsp; &lt;/profile&gt;<o:p></o:p></span></div>

<div class="MsoNormal">&nbsp;</div>

<div class="MsoNormal">This will activate the profile if the system property of &ldquo;debug&rdquo; exists. Of course you can also add the option to check the value of the parameter:<o:p></o:p></div>

<pre style="background: white;">
&nbsp; &lt;profile&gt;<o:p></o:p></pre>

<pre style="background: white;">
&nbsp;&nbsp;&nbsp; &lt;activation&gt;<o:p></o:p></pre>

<pre style="background: white;">
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;property&gt;<o:p></o:p></pre>

<pre style="background: white;">
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;name&gt;environment&lt;/name&gt;<o:p></o:p></pre>

<pre style="background: white;">
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;value&gt;test&lt;/value&gt;<o:p></o:p></pre>

<pre style="background: white;">
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;/property&gt;<o:p></o:p></pre>

<pre style="background: white;">
&nbsp;&nbsp;&nbsp; &lt;/activation&gt;<o:p></o:p></pre>

<pre style="background: white;">
&nbsp;&nbsp;&nbsp; ...<o:p></o:p></pre>

<pre style="background: white;">
&nbsp; &lt;/profile&gt;<o:p></o:p></pre>

<div class="MsoNormal">&nbsp;</div>

<div class="MsoNormal">What is missing is that this feature only works with system parameters and not maven parameters. So you cannot set a parameter per module with a different value, and have maven evaluate it.<o:p></o:p></div>

<div class="MsoNormal">Another issue that you must always remember: when running maven, maven will compile the pom and create an effective pom (you can run mvn &ldquo;effective-pom&rdquo; to view it) and then run it. This means that you cannot do any manipulation during runtime that will affect the run of maven.<o:p></o:p></div>

<h2>Solution &ndash; files<o:p></o:p></h2>

<div class="MsoNormal">The solution that I found to run profiles per module is the use of file activation. Let&rsquo;s say that I have some test modules. Sometimes I want to run a tomcat before running the tests and others not (just junit). In the standard way I will need to create a &ldquo;tomcat&rdquo; profile in each pom, and copy all the code that configures and deploys the pom.<o:p></o:p></div>

<div class="MsoNormal">I want to write the profile once in the parent pom, and then activate it only in those modules that need it. To do this I create the profile in the parent pom, and add the following activation:<o:p></o:p></div>

<pre style="background: white;">
&lt;profile&gt;<o:p></o:p></pre>

<pre style="background: white;">
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;id&gt;tomcat&lt;/id&gt;<o:p></o:p></pre>

<pre style="background: white;">
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;activation&gt;<o:p></o:p></pre>

<pre style="background: white;">
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;file&gt;<o:p></o:p></pre>

<pre style="background: white;">
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;exists&gt;profile.tomcat.active&lt;/exists&gt;<o:p></o:p></pre>

<pre style="background: white;">
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;/file&gt;<o:p></o:p></pre>

<pre style="background: white;">
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &lt;/activation&gt;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <o:p></o:p></pre>

<pre style="background: white;">
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ...<o:p></o:p></pre>

<pre style="background: white;">
&lt;/profile&gt;<o:p></o:p></pre>

<pre style="background: white;">
<o:p>&nbsp;</o:p></pre>

<div class="MsoNormal">Now for each module that I want to activate this profile, I need to have the file profile.tomcat.active in the pom directory. This will activate the profile, and the file needs to be there before you run the maven command, so you cannot copy it during the maven run.<o:p></o:p></div>

<p>&nbsp;</p>

<div class="MsoNormal">This can also be used in a Jenkins scenario, where in the Jenkins job before running the maven, you add the files or delete them and the run the maven via Jenkins.<o:p></o:p></div>

<p>&nbsp;</p>

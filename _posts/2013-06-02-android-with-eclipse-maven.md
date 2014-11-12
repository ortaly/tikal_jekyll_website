---
layout: post
title: Android with Eclipse + Maven
created: 1370184517
author: timor
permalink: /devops/android-eclipse-maven
tags:
- DevOps
- maven android eclipse
---
<p>&nbsp;</p>
<h1 class="title" style="font-size: x-large; margin-bottom: 1ex; text-align: center; color: rgb(0, 0, 0); font-family: 'Times New Roman';">
	Android with Eclipse + Maven</h1>
<div class="standard" style="margin-bottom: 2ex; color: rgb(0, 0, 0); font-family: 'Times New Roman'; font-size: medium;">
	I have been working on Continuous Integration for a multi-module&nbsp;<em>Android</em>&nbsp;project, using&nbsp;<em>Maven&nbsp;</em>as build engine and&nbsp;<em>Jenkins</em>&nbsp;as the&nbsp;<em>CI Orchestrator</em>. Very soon I found out that besides getting the whole CI thing to work, it is not trivial to do this while letting the developers continue to use their Eclipse setups as smoothly as they were used to before Maven was in the picture.</div>
<div class="standard" style="margin-bottom: 2ex; color: rgb(0, 0, 0); font-family: 'Times New Roman'; font-size: medium;">
	The setup for just getting the Eclipse project to compile by Maven is not trivial itself (I will dedicate a separate post to that); but it basically consists of writing a&nbsp;<code class="flex_code">pom.xml</code>, deploying a copy of the Android SDK with at least one platform available, and pointing Maven to the SDK through the&nbsp;<code class="flex_code">ANDROID_HOME</code>&nbsp;environment variable. Of course, in the pom.xml the actual build is tied to the&nbsp;<em>android-maven-plugin</em>&#39;s life cycle (remember&nbsp;<code class="flex_code">&lt;extensions&gt;true&lt;/extensions&gt;</code>, as well as&nbsp;<code class="flex_code">&lt;extractDuplicates&gt;true&lt;/extractDuplicates&gt;</code>&nbsp;if you have dependencies to jars which bring in conflicting&nbsp;<code class="flex_code">index.html</code>&nbsp;files).</div>
<div class="standard" style="margin-bottom: 2ex; color: rgb(0, 0, 0); font-family: 'Times New Roman'; font-size: medium;">
	After all that&#39;s done, and the pom.xml mentions all of the dependencies the developers used to have in their local libs folder, the apk can be built with Maven (<code class="flex_code">mvn clean install</code>), deployed to device (<code class="flex_code">mvn android:deploy</code>), tested etc... - all with Maven. So, this makes life possible for the CI Server (for testing, we equipped it with an attached physical Android device). Now, what about the developers?</div>
<div class="standard" style="margin-bottom: 2ex; color: rgb(0, 0, 0); font-family: 'Times New Roman'; font-size: medium;">
	If it was me, I would just go on running mvn from the command line. Even so, what about debugging?</div>
<h2 class="section_" style="font-size: x-large; margin-top: 1.3ex; margin-bottom: 0.7ex; color: rgb(0, 0, 0); font-family: 'Times New Roman';">
	The Starting Point</h2>
<div class="standard" style="margin-bottom: 2ex; color: rgb(0, 0, 0); font-family: 'Times New Roman'; font-size: medium;">
	Let me recap the first working configuration:</div>
<ol class="enumerate" style="margin-top: 0.7ex; margin-bottom: 0.7ex; margin-left: 3ex; color: rgb(0, 0, 0); font-family: 'Times New Roman'; font-size: medium;">
	<li class="enumerate_item">
		&nbsp;Android SDK</li>
	<li class="enumerate_item">
		&nbsp;Android eclipse plugin (ADT)</li>
	<li class="enumerate_item">
		&nbsp;Original Eclipse Android Project</li>
</ol>
<div class="standard" style="margin-bottom: 2ex; color: rgb(0, 0, 0); font-family: 'Times New Roman'; font-size: medium;">
	And to &ldquo;mavenize&rdquo; the project:</div>
<ol class="enumerate_resume" style="margin-top: 0.7ex; margin-bottom: 0.7ex; margin-left: 3ex; color: rgb(0, 0, 0); font-family: 'Times New Roman'; font-size: medium;">
	<li class="enumerate_resume_item">
		&nbsp;Maven pom.xml file (more on crafting one for android).</li>
	<li class="enumerate_resume_item">
		&nbsp;Apk source code moved from<code class="flex_code">&nbsp;${basedir}/src</code>&nbsp;to&nbsp;<code class="flex_code">${basedir}/src/main/java</code>, were Maven expects to find it by convention</li>
</ol>
<div class="standard" style="margin-bottom: 2ex; color: rgb(0, 0, 0); font-family: 'Times New Roman'; font-size: medium;">
	At this point, it is possible to build the project from the command line by running&nbsp;<code class="flex_code">mvn clean install</code>.</div>
<h2 class="section_" style="font-size: x-large; margin-top: 1.3ex; margin-bottom: 0.7ex; color: rgb(0, 0, 0); font-family: 'Times New Roman';">
	Initial Maven Support Under Eclipse</h2>
<div class="standard" style="margin-bottom: 2ex; color: rgb(0, 0, 0); font-family: 'Times New Roman'; font-size: medium;">
	As an initial attempt to standardize developer&#39;s environments with the Maven build:</div>
<ol class="enumerate_resume" style="margin-top: 0.7ex; margin-bottom: 0.7ex; margin-left: 3ex; color: rgb(0, 0, 0); font-family: 'Times New Roman'; font-size: medium;">
	<li class="enumerate_resume_item">
		&nbsp;Install the eclipse plugin for maven support (m2e)</li>
	<li class="enumerate_resume_item">
		&nbsp;Delete the eclipse project and re-import it into eclipse as an &ldquo;Existing Maven Project&rdquo; (this step will be effectively undone below)</li>
</ol>
<div class="standard" style="margin-bottom: 2ex; color: rgb(0, 0, 0); font-family: 'Times New Roman'; font-size: medium;">
	Now, the project can be viewed in Eclipse, with a whole bunch of errors (the generated sources are not available at this point), yet it can be built through the menu&nbsp;<code class="flex_code">RunAs &ndash;&gt; Maven clean install</code>. It can even be deployed and launched on the device by adding&nbsp;<code class="flex_code">android:run</code>&nbsp;and&nbsp;<code class="flex_code">android:deploy</code>&nbsp;Maven targets. I was even able to debug it through eclipse by setting a couple of special debug flags in maven, which cause the apk to wait for a debugger connection before beginning its Android lifecycle. In this case, the eclipse debugger had to be told separately to connect to local host port 8071 (or so) where adb had opened its socket for the Apk session on the device.</div>
<div class="standard" style="margin-bottom: 2ex; color: rgb(0, 0, 0); font-family: 'Times New Roman'; font-size: medium;">
	As you can probably see, this is all very awkward.</div>
<div class="standard" style="margin-bottom: 2ex; color: rgb(0, 0, 0); font-family: 'Times New Roman'; font-size: medium;">
	As an initial fix I did:</div>
<ol class="enumerate_resume" style="margin-top: 0.7ex; margin-bottom: 0.7ex; margin-left: 3ex; color: rgb(0, 0, 0); font-family: 'Times New Roman'; font-size: medium;">
	<li class="enumerate_resume_item">
		&nbsp;Add&nbsp;<code class="flex_code">target/generated-sources/r</code>&nbsp;to the build source path</li>
</ol>
<div class="standard" style="margin-bottom: 2ex; color: rgb(0, 0, 0); font-family: 'Times New Roman'; font-size: medium;">
	This makes it possible for eclipse to see the R.xxx stuff, but only after manually building the maven android plugin target generate-sources. (Which does get called automatically during a full mvn clean install). Still, debugging remains the awkward two-step process as above.</div>
<h2 class="section_" style="font-size: x-large; margin-top: 1.3ex; margin-bottom: 0.7ex; color: rgb(0, 0, 0); font-family: 'Times New Roman';">
	Doing it The Right Way</h2>
<div class="standard" style="margin-bottom: 2ex; color: rgb(0, 0, 0); font-family: 'Times New Roman'; font-size: medium;">
	Now, at this point it was obvious that I&#39;d have to go back and read all the&nbsp;<a href="http://www.nofluffjuststuff.com/blog/john_smart/2010/10/android_development_with_maven">fine documentation</a>&nbsp;I&#39;ve glanced at but have put in the &#39;to read&#39; bucket.</div>
<div class="standard" style="margin-bottom: 2ex; color: rgb(0, 0, 0); font-family: 'Times New Roman'; font-size: medium;">
	As it turns out, what I have originally done was to drop the Android project and replace it with a Maven project. Which so far, to me, have been two irreconcilable project types.</div>
<div class="standard" style="margin-bottom: 2ex; color: rgb(0, 0, 0); font-family: 'Times New Roman'; font-size: medium;">
	Enter the&nbsp;<em><a href="http://rgladwell.github.io/m2e-android/">M2E Android Connector</a></em>, which is an Eclipse plugin which makes it possible for the Android Eclipse plugin (ADT) to comprehend Maven dependencies, using the Maven Eclipse plugin. In other words, it lets Maven and Android plugins talk to each other in Eclipse.</div>
<div class="standard" style="margin-bottom: 2ex; color: rgb(0, 0, 0); font-family: 'Times New Roman'; font-size: medium;">
	Installing this plugin, I&#39;ve also run into a few stumbling blocks:</div>
<ol class="enumerate" style="margin-top: 0.7ex; margin-bottom: 0.7ex; margin-left: 3ex; color: rgb(0, 0, 0); font-family: 'Times New Roman'; font-size: medium;">
	<li class="enumerate_item">
		&nbsp;The&nbsp;<em>M2E Android Connector</em>&nbsp;is only available from&nbsp;<em>Android Marketplace</em>; therefore as in my case, if you have Eclipse Classic installed, the Marketplace plugin needs to be added</li>
	<li class="enumerate_item">
		&nbsp;For me, the M2E Android Connector threw a strange error, something about &ldquo;error activating bundle com.android.ide.eclipse.adt&rdquo;. This was fixed by updating to the most recent version of the eclipse android plugin (ADT).</li>
	<li class="enumerate_item">
		&nbsp;In turn, now with the most recent ADT, the generated sources (under&nbsp;<code class="flex_code">gen</code>&nbsp;this time) would not be generated in any Android project, even with no maven interaction. As it turned out, this newer ADT had a dependency on the most recent Android SDK. (200M+ download). Go figure. Spent about a day figuring this out. Perhaps should have been smarter &ndash; every ADT version appears to depend on the most recent SDK release. I&#39;m planning to have our Jenkins watch for new SDK releases and download them automatically so we could have an experimental CI pipeline.</li>
</ol>
<div class="standard" style="margin-bottom: 2ex; color: rgb(0, 0, 0); font-family: 'Times New Roman'; font-size: medium;">
	To sum up, this is the final configuration:</div>
<ol class="enumerate" style="margin-top: 0.7ex; margin-bottom: 0.7ex; margin-left: 3ex; color: rgb(0, 0, 0); font-family: 'Times New Roman'; font-size: medium;">
	<li class="enumerate_item">
		&nbsp;Android SDK&nbsp;<em>(<strong>mind the ADT&#39;s dependency version</strong>)</em></li>
	<li class="enumerate_item">
		&nbsp;Android eclipse plugin (ADT)</li>
	<li class="enumerate_item">
		&nbsp;Original Eclipse Android Project, with sources moved from&nbsp;<code class="flex_code">${basedir}/src</code>&nbsp;to&nbsp;<code class="flex_code">${basedir}/src/main/java</code></li>
	<li class="enumerate_item">
		&nbsp;This should be an Android Project to begin with (re-import it as such, if previously deleted, as I did)</li>
	<li class="enumerate_item">
		&nbsp;Convert the project to Maven by&nbsp;<code class="flex_code">Rightclick -&gt; Configure -&gt; Convert to Maven Project</code></li>
	<li class="enumerate_item">
		&nbsp;Create a&nbsp;<code class="flex_code">pom.xml</code>&nbsp;file correctly for the android maven plugin (the above step creates an dumb jar, pom or war pom.xml)</li>
</ol>
<div class="standard" style="margin-bottom: 2ex; color: rgb(0, 0, 0); font-family: 'Times New Roman'; font-size: medium;">
	Now, the project will have two personalities &ndash; Android and Maven. The generated sources will be generated twice - under&nbsp;<code class="flex_code">gen</code>&nbsp;by the Android plugin and under&nbsp;<code class="flex_code">target/generated-sources/r</code>&nbsp;by the maven plugin. It is the ones under&nbsp;<code class="flex_code">gen</code>&nbsp;that you want eclipse to work with when it checks your code for errors. Also, in the Libraries tab of the Java Build Path properties screen, there should appear the<em>Maven Dependencies</em>&nbsp;entry, which will let you automagically have the jars declared as dependencies in pom.xml linked into your final apk. This is what should be remembered:</div>
<ol class="enumerate" style="margin-top: 0.7ex; margin-bottom: 0.7ex; margin-left: 3ex; color: rgb(0, 0, 0); font-family: 'Times New Roman'; font-size: medium;">
	<li class="enumerate_item">
		&nbsp;<code class="flex_code">Project Properties -&gt; Java Build Path -&gt; Source</code>:
		<ul class="itemize" style="margin-top: 0.7ex; margin-bottom: 0.7ex; margin-left: 3ex;">
			<li class="itemize_item">
				&nbsp;<code class="flex_code">src/main/java</code></li>
			<li class="itemize_item">
				&nbsp;<code class="flex_code">gen</code></li>
			<li class="itemize_item">
				&nbsp;<code class="flex_code">src/test/java</code>&nbsp;(optional)</li>
		</ul>
	</li>
	<li class="enumerate_item">
		&nbsp;<code class="flex_code">Project Properties -&gt; Java Build Path -&gt; Libraries</code>:
		<ul class="itemize" style="margin-top: 0.7ex; margin-bottom: 0.7ex; margin-left: 3ex;">
			<li class="itemize_item">
				&nbsp;<code class="flex_code">Maven Dependencies</code></li>
			<li class="itemize_item">
				&nbsp;Android Stuff</li>
			<li class="itemize_item">
				&nbsp;No other external jars! Should be all handled through Maven</li>
		</ul>
	</li>
</ol>
<div class="standard" style="margin-bottom: 2ex; color: rgb(0, 0, 0); font-family: 'Times New Roman'; font-size: medium;">
	This is it. Hope this helps someone.</div>

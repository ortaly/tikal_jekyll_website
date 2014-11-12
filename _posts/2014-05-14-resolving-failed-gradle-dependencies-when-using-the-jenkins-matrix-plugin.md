---
layout: post
title: Resolving failed Gradle dependencies when using the Jenkins Matrix Plugin
created: 1400061311
author: gilad
permalink: "/devops/resolving_failed_gradle_dependencies"
tags:
- DevOps
- jenkins
- Artifactory
- gradle
- Matrix Plugin
- Dependencies
---
<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-0c88f0f5-fa23-28d6-4a29-41e1f871ee41"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; font-weight: bold; text-decoration: underline; vertical-align: baseline; white-space: pre-wrap;">The issue:</span></span></p>

<p>&nbsp;</p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-0c88f0f5-fa23-28d6-4a29-41e1f871ee41"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">I was asked to by a customer &nbsp;to run multiple builds of a Java project, each dependant of a different set of main product Jars </span></span></p>

<p>&nbsp;</p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-0c88f0f5-fa23-28d6-4a29-41e1f871ee41"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">The Jars were loaded to Artifactory with a specific version level naming convention </span></span></p>

<p>&nbsp;</p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-0c88f0f5-fa23-28d6-4a29-41e1f871ee41"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">The Jenkins installation has the following Plugins installed:</span></span></p>

<ul style="margin-top:0pt;margin-bottom:0pt;">
	<li dir="ltr" style="list-style-type: disc; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; font-weight: bold; vertical-align: baseline;">
	<p dir="ltr" style="line-height: 2; margin-top: 10pt; margin-bottom: 8pt;"><span style="font-size:11px;"><span id="docs-internal-guid-0c88f0f5-fa23-28d6-4a29-41e1f871ee41"><a href="https://wiki.jenkins-ci.org/display/JENKINS/Artifactory+Plugin" style="text-decoration:none;"><span style="color: rgb(210, 73, 57); background-color: transparent; font-weight: bold; vertical-align: baseline; white-space: pre-wrap;">Artifactory Plugin</span></a></span></span></p>
	</li>
	<li dir="ltr" style="list-style-type: disc; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; font-weight: bold; vertical-align: baseline;">
	<p dir="ltr" style="line-height: 2; margin-top: 10pt; margin-bottom: 8pt;"><span style="font-size:11px;"><span id="docs-internal-guid-0c88f0f5-fa23-28d6-4a29-41e1f871ee41"><a href="https://wiki.jenkins-ci.org/display/JENKINS/Gradle+Plugin" style="text-decoration:none;"><span style="color: rgb(210, 73, 57); background-color: transparent; font-weight: bold; vertical-align: baseline; white-space: pre-wrap;">Gradle Plugin</span></a></span></span></p>
	</li>
	<li dir="ltr" style="list-style-type: disc; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; font-weight: bold; vertical-align: baseline;">
	<p dir="ltr" style="line-height: 2; margin-top: 10pt; margin-bottom: 8pt;"><span style="font-size:11px;"><span id="docs-internal-guid-0c88f0f5-fa23-28d6-4a29-41e1f871ee41"><a href="https://wiki.jenkins-ci.org/display/JENKINS/Matrix+Project+Plugin" style="text-decoration:none;"><span style="color: rgb(210, 73, 57); background-color: transparent; font-weight: bold; vertical-align: baseline; white-space: pre-wrap;">Matrix Project Plugin</span></a></span></span></p>
	</li>
</ul>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-0c88f0f5-fa23-28d6-4a29-41e1f871ee41"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">The Jenkins job running the single build of the Java Project against the latest Jars had a </span><span style="font-size: 11px; font-family: 'Courier New'; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">build.gradle </span><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">script with these dependencies:</span></span></p>

<p>&nbsp;</p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-0c88f0f5-fa23-28d6-4a29-41e1f871ee41"><span style="font-size: 11px; font-family: 'Courier New'; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">repositories {</span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-0c88f0f5-fa23-28d6-4a29-41e1f871ee41"><span style="font-size: 11px; font-family: 'Courier New'; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&nbsp;&nbsp; &nbsp;</span><span style="font-size: 11px; font-family: 'Courier New'; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">maven {</span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-0c88f0f5-fa23-28d6-4a29-41e1f871ee41"><span style="font-size: 11px; font-family: 'Courier New'; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&nbsp;&nbsp; &nbsp;</span><span style="font-size: 11px; font-family: 'Courier New'; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&nbsp;&nbsp; &nbsp;</span><span style="font-size: 11px; font-family: 'Courier New'; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">url &#39;http://10.0.0.82:8081/artifactory/ext-repo&#39;</span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-0c88f0f5-fa23-28d6-4a29-41e1f871ee41"><span style="font-size: 11px; font-family: 'Courier New'; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&nbsp;&nbsp; &nbsp;</span><span style="font-size: 11px; font-family: 'Courier New'; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&nbsp;&nbsp; &nbsp;</span><span style="font-size: 11px; font-family: 'Courier New'; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">url &#39;http://10.0.0.82:8081/artifactory/libs-release-local&#39;</span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-0c88f0f5-fa23-28d6-4a29-41e1f871ee41"><span style="font-size: 11px; font-family: 'Courier New'; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&nbsp;&nbsp; &nbsp;</span><span style="font-size: 11px; font-family: 'Courier New'; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">}</span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-0c88f0f5-fa23-28d6-4a29-41e1f871ee41"><span style="font-size: 11px; font-family: 'Courier New'; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">}</span></span></p>

<p>&nbsp;</p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-0c88f0f5-fa23-28d6-4a29-41e1f871ee41"><span style="font-size: 11px; font-family: 'Courier New'; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">dependencies {</span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-0c88f0f5-fa23-28d6-4a29-41e1f871ee41"><span style="font-size: 11px; font-family: 'Courier New'; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&nbsp;&nbsp; &nbsp;</span><span style="font-size: 11px; font-family: 'Courier New'; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">compile group: &#39;javax&#39;, name: &#39;servlet-api&#39;, version: &#39;3.0&#39;</span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-0c88f0f5-fa23-28d6-4a29-41e1f871ee41"><span style="font-size: 11px; font-family: 'Courier New'; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&nbsp;&nbsp; &nbsp;</span><span style="font-size: 11px; font-family: 'Courier New'; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">compile group: &#39;com.google.guava&#39;, name: &#39;guava&#39;, version: &#39;12.0.1&#39;</span><span style="font-size: 11px; font-family: 'Courier New'; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&nbsp;&nbsp; &nbsp;</span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;text-indent: 36pt;"><span id="docs-internal-guid-0c88f0f5-fa23-28d6-4a29-41e1f871ee41"><span style="font-size: 11px; font-family: 'Courier New'; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">compile group: &#39;product_api&#39;, name: &#39;product_api&#39;, version: &#39;7.0.+&#39;</span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-0c88f0f5-fa23-28d6-4a29-41e1f871ee41"><span style="font-size: 11px; font-family: 'Courier New'; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&nbsp;&nbsp; &nbsp;</span><span style="font-size: 11px; font-family: 'Courier New'; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">compile group: &#39;product&#39;, name: &#39;product&#39;, version: &#39;7.0.+&#39;</span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-0c88f0f5-fa23-28d6-4a29-41e1f871ee41"><span style="font-size: 11px; font-family: 'Courier New'; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">}</span></span></p>

<p><br />
&nbsp;</p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-0c88f0f5-fa23-28d6-4a29-41e1f871ee41"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">And the build ran smoothly</span></span></p>

<p>&nbsp;</p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-0c88f0f5-fa23-28d6-4a29-41e1f871ee41"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">But when running the parameterized build script with these dependencies:</span></span></p>

<p>&nbsp;</p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-0c88f0f5-fa23-28d6-4a29-41e1f871ee41"><span style="font-size: 11px; font-family: 'Courier New'; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">repositories {</span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-0c88f0f5-fa23-28d6-4a29-41e1f871ee41"><span style="font-size: 11px; font-family: 'Courier New'; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&nbsp;&nbsp; &nbsp;</span><span style="font-size: 11px; font-family: 'Courier New'; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">maven {</span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-0c88f0f5-fa23-28d6-4a29-41e1f871ee41"><span style="font-size: 11px; font-family: 'Courier New'; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&nbsp;&nbsp; &nbsp;</span><span style="font-size: 11px; font-family: 'Courier New'; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&nbsp;&nbsp; &nbsp;</span><span style="font-size: 11px; font-family: 'Courier New'; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">url &#39;http://10.0.0.82:8081/artifactory/ext-repo&#39;</span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-0c88f0f5-fa23-28d6-4a29-41e1f871ee41"><span style="font-size: 11px; font-family: 'Courier New'; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&nbsp;&nbsp; &nbsp;</span><span style="font-size: 11px; font-family: 'Courier New'; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&nbsp;&nbsp; &nbsp;</span><span style="font-size: 11px; font-family: 'Courier New'; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">url &#39;http://10.0.0.82:8081/artifactory/libs-release-local&#39;</span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-0c88f0f5-fa23-28d6-4a29-41e1f871ee41"><span style="font-size: 11px; font-family: 'Courier New'; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&nbsp;&nbsp; &nbsp;</span><span style="font-size: 11px; font-family: 'Courier New'; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">}</span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-0c88f0f5-fa23-28d6-4a29-41e1f871ee41"><span style="font-size: 11px; font-family: 'Courier New'; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">}</span></span></p>

<p>&nbsp;</p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-0c88f0f5-fa23-28d6-4a29-41e1f871ee41"><span style="font-size: 11px; font-family: 'Courier New'; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">dependencies {</span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-0c88f0f5-fa23-28d6-4a29-41e1f871ee41"><span style="font-size: 11px; font-family: 'Courier New'; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&nbsp;&nbsp; &nbsp;</span><span style="font-size: 11px; font-family: 'Courier New'; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">compile group: &#39;javax&#39;, name: &#39;servlet-api&#39;, version: &#39;3.0&#39;</span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-0c88f0f5-fa23-28d6-4a29-41e1f871ee41"><span style="font-size: 11px; font-family: 'Courier New'; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&nbsp;&nbsp; &nbsp;</span><span style="font-size: 11px; font-family: 'Courier New'; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">compile group: &#39;com.google.guava&#39;, name: &#39;guava&#39;, version: &#39;12.0.1&#39;</span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-0c88f0f5-fa23-28d6-4a29-41e1f871ee41"><span style="font-size: 11px; font-family: 'Courier New'; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&nbsp;&nbsp; &nbsp;</span><span style="font-size: 11px; font-family: 'Courier New'; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">compile group: &#39;product&#39;, name: &#39;product&#39;, version: &quot;$System.env.HOTFIX_VER&quot;</span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-0c88f0f5-fa23-28d6-4a29-41e1f871ee41"><span style="font-size: 11px; font-family: 'Courier New'; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&nbsp;&nbsp; &nbsp;</span><span style="font-size: 11px; font-family: 'Courier New'; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">compile group: &#39;product&#39;, name: &#39;product_api&#39;, version: &quot;$System.env.HOTFIX_VER&quot;</span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-0c88f0f5-fa23-28d6-4a29-41e1f871ee41"><span style="font-size: 11px; font-family: 'Courier New'; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">}</span></span></p>

<p>&nbsp;</p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-0c88f0f5-fa23-28d6-4a29-41e1f871ee41"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">The <span style="font-family:courier new,courier,monospace;">servlet-api</span> and <span style="font-family:courier new,courier,monospace;">guava</span> were nowhere to be found:</span></span></p>

<p>&nbsp;</p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-0c88f0f5-fa23-28d6-4a29-41e1f871ee41"><span style="font-size: 11px; font-family: 'Courier New'; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">FAILURE: Build failed with an exception.</span></span></p>

<p>&nbsp;</p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-0c88f0f5-fa23-28d6-4a29-41e1f871ee41"><span style="font-size: 11px; font-family: 'Courier New'; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">* What went wrong:</span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-0c88f0f5-fa23-28d6-4a29-41e1f871ee41"><span style="font-size: 11px; font-family: 'Courier New'; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">Could not resolve all dependencies for configuration &#39;:compile&#39;.</span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-0c88f0f5-fa23-28d6-4a29-41e1f871ee41"><span style="font-size: 11px; font-family: 'Courier New'; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&gt; Could not find javax:servlet-api:3.0.</span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-0c88f0f5-fa23-28d6-4a29-41e1f871ee41"><span style="font-size: 11px; font-family: 'Courier New'; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&nbsp;Required by:</span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-0c88f0f5-fa23-28d6-4a29-41e1f871ee41"><span style="font-size: 11px; font-family: 'Courier New'; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:7.0-hf-1.5-1310:1.0.0.37-SNAPSHOT</span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-0c88f0f5-fa23-28d6-4a29-41e1f871ee41"><span style="font-size: 11px; font-family: 'Courier New'; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&gt; Could not find com.google.guava:guava:12.0.1.</span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-0c88f0f5-fa23-28d6-4a29-41e1f871ee41"><span style="font-size: 11px; font-family: 'Courier New'; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&nbsp;Required by:</span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-0c88f0f5-fa23-28d6-4a29-41e1f871ee41"><span style="font-size: 11px; font-family: 'Courier New'; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:7.0-hf-1.5-1310:1.0.0.37-SNAPSHOT</span></span></p>

<p>&nbsp;</p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-0c88f0f5-fa23-28d6-4a29-41e1f871ee41"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; font-weight: bold; text-decoration: underline; vertical-align: baseline; white-space: pre-wrap;">Root cause:</span></span></p>

<p>&nbsp;</p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-0c88f0f5-fa23-28d6-4a29-41e1f871ee41"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">A </span><span style="font-size: 12px; font-family: Consolas; color: rgb(0, 0, 0); background-color: transparent; font-weight: bold; vertical-align: baseline; white-space: pre-wrap;">free-style software project </span><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">Jenkins Job is not a </span><span style="font-size: 12px; font-family: Consolas; color: rgb(0, 0, 0); background-color: transparent; font-weight: bold; vertical-align: baseline; white-space: pre-wrap;">multi-configuration project </span><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">Jenkins Job. </span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-0c88f0f5-fa23-28d6-4a29-41e1f871ee41"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">While a </span><span style="font-size: 12px; font-family: Consolas; color: rgb(0, 0, 0); background-color: transparent; font-weight: bold; vertical-align: baseline; white-space: pre-wrap;">free-style software project </span><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">Jenkins Job incorporates the Artifcatory Plugin the </span><span style="font-size: 12px; font-family: Consolas; color: rgb(0, 0, 0); background-color: transparent; font-weight: bold; vertical-align: baseline; white-space: pre-wrap;">multi-configuration project </span><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">Jenkins Job does not, and so, the </span><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; font-weight: bold; vertical-align: baseline; white-space: pre-wrap;">Resolution Repository </span><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">setting is </span><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; font-weight: bold; vertical-align: baseline; white-space: pre-wrap;">missing</span><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">:</span></span></p>

<p><br />
&nbsp;</p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-0c88f0f5-fa23-28d6-4a29-41e1f871ee41"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;"><img height="168px;" src="https://lh4.googleusercontent.com/Z2wLh9q3bB21JGg4G-ZDCDDbigw3kpKDWb-BFCGaSQpRS2O8TEcxQIGc0MB-jUQd3nw0FEc1fgi76TG3_Sv0VIOSMBL7tRr4tqZPHGznEz-tpOo5ePh_9_Tao5tUm9s2Cw" style="border: none; transform: rotate(0.00rad); -webkit-transform: rotate(0.00rad);" width="624px;" /></span></span></p>

<p>&nbsp;</p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-0c88f0f5-fa23-28d6-4a29-41e1f871ee41"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; font-weight: bold; text-decoration: underline; vertical-align: baseline; white-space: pre-wrap;">Solution:</span></span></p>

<p>&nbsp;</p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-0c88f0f5-fa23-28d6-4a29-41e1f871ee41"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">In order to workaround the issue, the solution is to have the resolution done in the build.gradle file - specifying where the Jars can be found using &nbsp;</span><span style="font-size: 11px; font-family: 'Courier New'; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">artifactUrls </span><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">in the </span><span style="font-size: 11px; font-family: 'Courier New'; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">repositories</span><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;"> definitions</span></span></p>

<p>&nbsp;</p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-0c88f0f5-fa23-28d6-4a29-41e1f871ee41"><span style="font-size: 11px; font-family: 'Courier New'; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">repositories {</span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-0c88f0f5-fa23-28d6-4a29-41e1f871ee41"><span style="font-size: 11px; font-family: 'Courier New'; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&nbsp;&nbsp; &nbsp;</span><span style="font-size: 11px; font-family: 'Courier New'; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">maven {</span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-0c88f0f5-fa23-28d6-4a29-41e1f871ee41"><span style="font-size: 11px; font-family: 'Courier New'; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&nbsp;&nbsp; &nbsp;</span><span style="font-size: 11px; font-family: 'Courier New'; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&nbsp;&nbsp; &nbsp;</span><span style="font-size: 11px; font-family: 'Courier New'; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">url &#39;http://10.0.0.82:8081/artifactory/ext-repo&#39;</span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-0c88f0f5-fa23-28d6-4a29-41e1f871ee41"><span style="font-size: 11px; font-family: 'Courier New'; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&nbsp;&nbsp; &nbsp;</span><span style="font-size: 11px; font-family: 'Courier New'; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&nbsp;&nbsp; &nbsp;</span><span style="font-size: 11px; font-family: 'Courier New'; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">url &#39;http://10.0.0.82:8081/artifactory/libs-release-local&#39;</span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-0c88f0f5-fa23-28d6-4a29-41e1f871ee41"><span style="font-size: 11px; font-family: 'Courier New'; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&nbsp;&nbsp; &nbsp;</span><span style="font-size: 11px; font-family: 'Courier New'; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&nbsp;&nbsp; &nbsp;</span><span style="font-size: 11px; font-family: 'Courier New'; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">artifactUrls &quot;http://10.0.0.82:8081/artifactory/ext-repo&quot;</span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-0c88f0f5-fa23-28d6-4a29-41e1f871ee41"><span style="font-size: 11px; font-family: 'Courier New'; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&nbsp;&nbsp; &nbsp;</span><span style="font-size: 11px; font-family: 'Courier New'; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&nbsp;&nbsp; &nbsp;</span><span style="font-size: 11px; font-family: 'Courier New'; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">artifactUrls &quot;http://10.0.0.82:8081/artifactory/lib-release-local&quot;</span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-0c88f0f5-fa23-28d6-4a29-41e1f871ee41"><span style="font-size: 11px; font-family: 'Courier New'; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">&nbsp;&nbsp; &nbsp;</span><span style="font-size: 11px; font-family: 'Courier New'; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">}</span></span></p>

<p dir="ltr" style="line-height:1.15;margin-top:0pt;margin-bottom:0pt;"><span id="docs-internal-guid-0c88f0f5-fa23-28d6-4a29-41e1f871ee41"><span style="font-size: 11px; font-family: 'Courier New'; color: rgb(0, 0, 0); background-color: transparent; vertical-align: baseline; white-space: pre-wrap;">}</span></span></p>

<p>&nbsp;</p>

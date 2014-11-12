---
layout: post
title: Why Does Gradle Upload to The Wrong Repo?
created: 1371136428
author: timor
permalink: why-does-gradle-upload-to-the-wrong-repo
tags:
- DevOps
- gradle maven repo artifact
---
<h1 class="title" style="font-size: x-large; margin-bottom: 1ex; text-align: center; color: rgb(0, 0, 0); font-family: 'Times New Roman';">
	Why Does Gradle Upload to The Wrong Repo?</h1>
<div class="standard" style="margin-bottom: 2ex; color: rgb(0, 0, 0); font-family: 'Times New Roman'; font-size: medium;">
	Have been struggling with this for a few hours. Despite correctly setting up the upload repo in&nbsp;<code class="flex_code">build.gradle</code>, gradle kept trying to upload to our public repo, which we use for mirroring other repos.</div>
<div class="standard" style="margin-bottom: 2ex; color: rgb(0, 0, 0); font-family: 'Times New Roman'; font-size: medium;">
	<code class="flex_code">build.gradle</code>:</div>
<div class="standard" style="margin-bottom: 2ex; color: rgb(0, 0, 0); font-family: 'Times New Roman'; font-size: medium;">
	<div class="float float-listings">
		<pre>
<code class="flex_code">...
uploadArchives{
	repositories{
		mavenDeployer{
			repository(url:&quot;http://mydtbld0028.isr.hp.com:8081/nexus/content/repositories/releases/&quot;){
				authentication(userName: &quot;deployment&quot;, password: &quot;deployment123&quot;)
			}
		}
	}
}
...</code></pre>
	</div>
</div>
<div class="standard" style="margin-bottom: 2ex; color: rgb(0, 0, 0); font-family: 'Times New Roman'; font-size: medium;">
	And after&nbsp;<code class="flex_code">$gradle uploadArchives:</code></div>
<div class="standard" style="margin-bottom: 2ex; color: rgb(0, 0, 0); font-family: 'Times New Roman'; font-size: medium;">
</div>
<div class="float float-listings" style="color: rgb(0, 0, 0); font-family: 'Times New Roman'; font-size: medium;">
	<pre>
:compileJava UP-TO-DATE
:compileGroovy UP-TO-DATE
:processResources UP-TO-DATE
:classes UP-TO-DATE
:jar UP-TO-DATE
:uploadArchivesUploading: org/openbakery/xcodePlugin/0.8.1/xcodePlugin-0.8.1.jar to repository remote at https://mydtbld0028.isr.hp.com:8081/nexus/content/repositories/releases/
Error transferring file
 FAILED

FAILURE: Build failed with an exception.

* What went wrong:
Execution failed for task &#39;:uploadArchives&#39;.
&gt; Could not publish configuration &#39;archives&#39;
   &gt; Error deploying artifact &#39;org.openbakery:xcodePlugin:jar&#39;: Error deploying artifact: Error transferring file

* Try:
Run with --stacktrace option to get the stack trace. Run with --info or --debug option to get more log output.

BUILD FAILED

Total time: 11.67 secs</pre>
</div>
<div class="standard" style="margin-bottom: 2ex; color: rgb(0, 0, 0); font-family: 'Times New Roman'; font-size: medium;">
	Clearly, the wrong repo, which is not even mentioned anywhere in the gradle configuration anywhere on the system is used. After struggling with this, deleting various gradle cache file, discovered that in fact, gradle uses maven configuration in the maven plugin, which it accesses through the&nbsp;<code class="flex_code">M2_HOME</code>&nbsp;environment variable. As described in&nbsp;<a href="http://forums.gradle.org/gradle/topics/why_does_maven_deployer_ignore_the_specified_repository">this post</a>.</div>
<div class="standard" style="margin-bottom: 2ex; color: rgb(0, 0, 0); font-family: 'Times New Roman'; font-size: medium;">
	I confirm the result and the<strong>&nbsp;pledge to document this behavior in gradle documentation</strong>.</div>

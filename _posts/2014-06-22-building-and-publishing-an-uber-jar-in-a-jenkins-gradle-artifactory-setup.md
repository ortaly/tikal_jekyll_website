---
layout: post
title: Building and Publishing an Uber jar in a Jenkins-Gradle-Artifactory setup
created: 1403432709
author: gilad
permalink: building-and-publishing-an-uber-jar-in-a-jenkins-gradle-artifactory-setup
tags:
- DevOps
---
<h1><span style="font-size:12px;">Introduction</span></h1>

<p><span style="font-size:12px;">Assuming you have a Jenkins-Gradle-Artifactory system set up correctly and you in fact have a Java project being compiled, built and published to Artiafactory correctly, there is a chance you would like to build an Uber jar, in the case of one of our customers this in Uber jar was required to include all the Build ouputs (in this case in was two jars: product.jar &amp; product-api.jar) and all the dependent jars</span></p>

<h1><span style="font-size:12px;">Building the Uber jar</span></h1>

<p><span style="font-size:12px;">To build the uber jar all you need is an additional task like so:</span></p>

<p><span style="font-size:12px;"><span style="font-family:courier new,courier,monospace;">task uberJar(type: Jar, group:&#39;Extra Jars&#39;, description: &#39;Assembles a single \&#39;uber\&#39; jar archive containing the main classes along with all its dependencies.&#39;) {<br />
&nbsp;&nbsp; &nbsp;classifier = &#39;uber&#39;&nbsp;&nbsp; &nbsp;<br />
&nbsp;&nbsp; &nbsp;from files(sourceSets.main.output.classesDir)<br />
&nbsp;&nbsp; &nbsp;from(configurations.runtime.collect { it.isDirectory() ? it : zipTree(it) }) {<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;//exclude all META-INF that may appear in any dependant jar<br />
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;exclude &quot;META-INF/**&quot;<br />
&nbsp;&nbsp; &nbsp;}<br />
}</span></span></p>

<p><span style="font-size:12px;"><font face="arial, helvetica, sans-serif">The </font><span style="font-family: 'courier new', courier, monospace;">sourceSets.main.output.classesDir</span><font face="arial, helvetica, sans-serif">&nbsp; will bring in all the Build output jars , and the </font><span style="font-family: 'courier new', courier, monospace;">configurations.runtime.collect</span><font face="arial, helvetica, sans-serif">&nbsp; will bring in all the dependecies&nbsp;</font></span></p>

<h1><span style="font-size:12px;"><font face="arial, helvetica, sans-serif">Making sure the Uber jar is published to Artifactory</font></span></h1>

<p><span style="font-size:12px;"><font face="arial, helvetica, sans-serif">While the Artifactory-Jenkins plugin Configuration basic setup, specfically the&nbsp;</font>Publish artifacts to Artifactory section enables Publishing of the default jars packaged,&nbsp;other jars (e.g. with classifiers, like <span style="font-family:courier new,courier,monospace;">javadocs</span> and in our case <span style="font-family:courier new,courier,monospace;">uber</span> jar) are ignored.</span></p>

<p><span style="font-size:12px;">To ensure the product-uber.jar is published do the following:</span></p>

<ol>
	<li><span style="font-size:12px;">Add the following to the main section in build.gradle:</span>

	<p><span style="font-size:12px;"><strong><span style="font-family:courier new,courier,monospace;">&nbsp;&nbsp; &nbsp;configurations {<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;published<br />
	&nbsp;&nbsp; &nbsp;}<br />
	&nbsp;&nbsp; &nbsp;artifactory {<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;publish {<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;defaults {<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;publishConfigs(&#39;published&#39;)<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;}<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;}<br />
	&nbsp;&nbsp; &nbsp;}</span></strong></span></p>

	<p><span style="font-size:12px;"><strong><span style="font-family:courier new,courier,monospace;">&nbsp;&nbsp; &nbsp;artifacts {<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;published jar<br />
	&nbsp;&nbsp; &nbsp;}</span></strong></span></p>
	</li>
	<li>
	<p><span style="font-size:12px;">And the following (in <strong>bold</strong>) to the Uber task:<br />
	<span style="font-family:courier new,courier,monospace;">task uberJar(type: Jar, group:&#39;Extra Jars&#39;, description: &#39;Assembles a single \&#39;uber\&#39; jar archive containing the main classes along with all its dependencies.&#39;) {<br />
	&nbsp;&nbsp; &nbsp;classifier = &#39;uber&#39;<br />
	&nbsp;&nbsp; &nbsp;from files(sourceSets.main.output.classesDir)<br />
	&nbsp;&nbsp; &nbsp;from(configurations.runtime.collect { it.isDirectory() ? it : zipTree(it) }) {<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;//exclude all META-INF that may appear in any dependant jar<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;exclude &quot;META-INF/**&quot;<br />
	&nbsp;&nbsp; &nbsp;}<br />
	<strong>&nbsp;&nbsp; &nbsp;artifacts {<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;published uberJar<br />
	&nbsp;&nbsp; &nbsp;}</strong><br />
	}</span></span></p>
	</li>
	<li>
	<p><span style="font-size:12px;"><span style="line-height: 1.6em;">The Artifcatory-Gradle script auto-created during the Build of the Jenkins job will take care of Publishing to Artifactory</span></span></p>
	</li>
</ol>

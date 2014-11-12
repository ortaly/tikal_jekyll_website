---
layout: post
title: Jenkins multijob plugin
created: 1395322196
author: chaim.turkel
permalink: /jenkins-multijob-plugin
tags:
- DevOps
---
<p>My assumption is that you are familiar with continuous integration concepts (<a href="http://en.wikipedia.org/wiki/Continuous_integration">http://en.wikipedia.org/wiki/Continuous_integration</a>), and we use Jenkins (<a href="http://jenkins-ci.org/">http://jenkins-ci.org/</a>) as our build machine.</p>

<p>I would like to describe our use of the Jenkins multijob (<a href="https://wiki.jenkins-ci.org/display/JENKINS/Multijob+Plugin">https://wiki.jenkins-ci.org/display/JENKINS/Multijob+Plugin</a>). I think this plugin simplifies a lot of hassles.</p>

<h2>Development phases</h2>

<p>In every project you usually have the following stages during development:</p>

<p>Phase I: Build the product and run unit tests</p>

<p>Phase II: Deploy the product to a testing/integration environment</p>

<p>Phase III: Only if all tests in previous phases passed then deploy artifacts to the nexus server.</p>

<p>Phase IV: Create installation.</p>

<p>Depending on the topology of the computers phase I and II can be done on the same computer or on different computers.</p>

<p>The problem is that I don&rsquo;t actually want to deploy my artifacts to the nexus until the integration tests pass. The reason for this is that there might be other teams in the company that have dependencies on these artifacts (snapshot) and then they might get an invalid version if the integration tests fail.</p>

<p>In the case that all phases are run on the same physical machine the solution is fairly easy. We can run each phase in a different job, and since they are all on the same machine we can then use the local .m2 repository to get the artifact for phase II from phase I, and then in a separate job to deploy the artifacts from phase I after phase III passes.</p>

<p>In the case of multiple machines there is no simple solution except to use new artifactId&rsquo;s and then the first phase will deploy to nexus so that the next phases can get the artifacts, and in the end at phase III deploy with a new artifactId.</p>

<p>&nbsp;</p>

<h2>Jenkins job: upstream/downstream</h2>

<p>Jenkins has two mechanisms for triggering jobs. You can trigger a job after you (downstream) or you can configure yourself after another job (upstream), see <a href="https://wiki.jenkins-ci.org/display/JENKINS/Terminology">https://wiki.jenkins-ci.org/display/JENKINS/Terminology</a>.</p>

<p>Once you have multiple jobs attached it is very hard to visualize what is happening, though you can use the dependency graph to see all the connections.</p>

<p>To understand the complexity of multiple Jenkins jobs I will describe our system build that has about 20 jobs for a single version.</p>

<p>We are creating a web service platform. &nbsp;</p>

<p><u>The first</u> phase a team will create wsdl&rsquo;s for the web services (wsdl first). The wsdl&rsquo;s are created will an internal tool, so there is a job to build the wsdl&rsquo;s and validate them according to internal rules.</p>

<p><u>The second</u> team creates the tools for the design team and a platform for the web services that a <u>third team</u> will use to actually implement the web services.</p>

<p>In the end there is an installation package that is build.</p>

<p>Since the second team creates the tools and web service platform, we need all modules to work on both windows and linux so we want to run the jobs on both windows and linux.</p>

<p>Jobs:</p>

<ul>
	<li>Core team
	<ul>
		<li>sdk compile</li>
		<li>ntegration test (mock web services)</li>
		<li>deploy</li>
	</ul>
	</li>
	<li>Design team
	<ul>
		<li>wsdl&rsquo;s validation with sdk</li>
		<li>deploy wsdls</li>
	</ul>
	</li>
	<li>Implementation Team
	<ul>
		<li>Import wsdl</li>
		<li>Compile application</li>
		<li>Integration tests (real web services)</li>
		<li>Build installation</li>
		<li>Deploy</li>
	</ul>
	</li>
</ul>

<p>We need to create a job for each built above. Then we need to chain them all. Some of the jobs can run in parallel (windows | linux , design | implementation). With the regular jobs in jenkins this is difficult, and very hard to maintain. It is hard to know where to add new jobs and what the building blocks are.</p>

<p>Using multijob plugin we can create blocks as written above. The structure of multijob allows us to define which jobs are parallel and which are synchronic. &nbsp;Example for a multijob to build the core on windows:</p>

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
</v:shapetype><v:shape id="Picture_x0020_1" o:spid="_x0000_i1026" type="#_x0000_t75"
 style='width:249pt;height:191.25pt;visibility:visible;mso-wrap-style:square'>
 <v:imagedata src="file:///C:\Users\Chaimt\AppData\Local\Temp\msohtmlclip1\01\clip_image001.png"
  o:title=""/>
</v:shape><![endif]--><!--[if !vml]--><!--[endif]--></p>

<p>I have another multijob that looks the same for linux.</p>

<p><a href="http://1.bp.blogspot.com/-laPdzR6y4Ok/UyrpU9lAZCI/AAAAAAAAKpY/rXlkBkOmZgc/s1600/windowsjob.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="245" src="http://1.bp.blogspot.com/-laPdzR6y4Ok/UyrpU9lAZCI/AAAAAAAAKpY/rXlkBkOmZgc/s1600/windowsjob.png" width="320" /></a></p>

<p>A full view of our build will look like:</p>

<p><a href="http://4.bp.blogspot.com/-_sHXc3OEn0A/UyrpWdzia_I/AAAAAAAAKpk/Q56PL8miPGI/s1600/fulljob.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="640" src="http://4.bp.blogspot.com/-_sHXc3OEn0A/UyrpWdzia_I/AAAAAAAAKpk/Q56PL8miPGI/s1600/fulljob.png" width="472" /></a></p>

<p>&nbsp;</p>

<p><!--[if gte vml 1]><v:shape
 id="Picture_x0020_4" o:spid="_x0000_i1025" type="#_x0000_t75" style='width:468pt;
 height:634.5pt;visibility:visible;mso-wrap-style:square'>
 <v:imagedata src="file:///C:\Users\Chaimt\AppData\Local\Temp\msohtmlclip1\01\clip_image003.png"
  o:title=""/>
</v:shape><![endif]--><!--[if !vml]--><!--[endif]--></p>

<p>Once the build starts, it will create two parallel jobs, one for windows, and once for linux (each one has 3 jobs). Only when both finish successfully will the next phase of design and implementation run (also in parallel).</p>

<p>Other advantages of the multijob:</p>

<p>You can easily add triggers after the building blocks like emails.</p>

<p>Visualization of the process is easy and non-technical people understand the process.</p>

<p>How does the console of the multijob look like (I added the timestamp plugin also):</p>

<p><a href="http://2.bp.blogspot.com/-ACHUeQHLIcI/UyrrkqxRTFI/AAAAAAAAKps/HfsnPvZq_q0/s1600/console.JPG" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="404" src="http://2.bp.blogspot.com/-ACHUeQHLIcI/UyrrkqxRTFI/AAAAAAAAKps/HfsnPvZq_q0/s1600/console.JPG" width="640" /></a></p>

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
</v:shapetype><v:shape id="Picture_x0020_5" o:spid="_x0000_i1025" type="#_x0000_t75"
 style='width:468pt;height:297.75pt;visibility:visible;mso-wrap-style:square'>
 <v:imagedata src="file:///C:\Users\Chaimt\AppData\Local\Temp\msohtmlclip1\01\clip_image001.png"
  o:title=""/>
</v:shape><![endif]--><!--[if !vml]--><!--[endif]--></p>

<p>The multijob plugin is still in development stages, and the features that I would like to see added are:</p>

<ul>
	<li>Option to start build from job in the middle.</li>
	<li>Canceling multijob should cancel all children</li>
	<li>Defining which phases that fail the main build if they fail</li>
</ul>

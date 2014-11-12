---
layout: post
title: VS 2011 Full IntelliSense With Large JavaScript Application
created: 1331383800
author: menny
permalink: /vs-2011-full-intellisense-large-javascript-application
tags:
- .NET
---
<p>As of writing these word VS 2011 is in consumer preview stage (Beta).<br />
<h1>The Goal</h1>
<p>In order to build a large JavaScript application that can scale easily you need to distribute your code into modules and place each module in a separate file. Unlike JavaScript compilers, we humans need this structure for the sake of sanity. 
<p>If we break a JavaScript application into multiple files we can easily loose IntelliSense and have performance issues when loading many files in runtime. We can easily get around this with 3 strategies:
<ul>
<li>On <strong>release</strong> compile everything into a single file
<li>On <strong>debug</strong> remain with the file structure and load modules on demand. debug inside VS your specific files like a “normal” C# application.
<li>On <strong>design time</strong> have full IntelliSense inside a module that have dependencies to other modules</li>
</ul>
<p>In order to achieve that you can easily add references to each module/file telling VS to load specific files, but that will only work in design time so we need to leverage this capability to something more suitable.<br />
<h1>The Details</h1>
<p><em><font color="#666666">I have only a concept and only tested it in VS2011 since there are many JavaScript improvements like loading file asynch, and automatic IntelliSense build without the need to hit ctrl+shift+J. This may work in VS2010, to be honest I don’t see a reason why not?</font></em>
<p>So here is what I got:
<p><a href="http://www.onemenny.com/blog/wp-content/uploads/2012/03/clip_image001.png"><img style="background-image: none; border-right-width: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="clip_image001" border="0" alt="clip_image001" src="http://www.onemenny.com/blog/wp-content/uploads/2012/03/clip_image001_thumb.png" width="200" height="244"></a>
<p>Basically this is a vanilla solution structure with some helpers. My Script folder contains <a href="http://jquery.com/">JQuery</a> and <a href="http://requirejs.org/">RequireJS</a> as <a href="http://nuget.org/">NuGet</a> packages.
<p>My index.html is as follows:</p>
<p><a href="http://www.onemenny.com/blog/wp-content/uploads/2012/03/clip_image003.jpg"><img style="background-image: none; border-right-width: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="clip_image003" border="0" alt="clip_image003" src="http://www.onemenny.com/blog/wp-content/uploads/2012/03/clip_image003_thumb.jpg" width="455" height="252"></a>
<p>So I’ve defined a global namespace and set to it my configuration value to multiple files like so: OM.debugConfig = “multiple files”;
<p>Then my ajaxController just defines a module under OM.Communication namespace
<p><a href="http://www.onemenny.com/blog/wp-content/uploads/2012/03/clip_image004.png"><img style="background-image: none; border-right-width: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="clip_image004" border="0" alt="clip_image004" src="http://www.onemenny.com/blog/wp-content/uploads/2012/03/clip_image004_thumb.png" width="438" height="286"></a>
<p>Now, I want to have full IntelliSense on other modules, like my commonHelper module, that will be aware to my ajaxController
<p><a href="http://www.onemenny.com/blog/wp-content/uploads/2012/03/clip_image005.png"><img style="background-image: none; border-right-width: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="clip_image005" border="0" alt="clip_image005" src="http://www.onemenny.com/blog/wp-content/uploads/2012/03/clip_image005_thumb.png" width="465" height="566"></a>
<p>So what’s going on here?
<ol>
<li>I’ve added a VS reference to require.js (/// <reference path=”../../Scripts/require.js” />) now VS knows about require.js lib
<li>I’ve defined my dependencies in the following manner:
<ol>
<li><u>if (!OM.debugConfig) – [Visual Studio as Interpreter]<br /></u>the !OM.debugConfig is not defined (falsy). This is the case when vs tries to build its IntelliSense when you work on that specific file. So the folders to look for my modules are relative to my current file position
<li><u>if (OM.debugConfig === “multiple files”) – [Browser as Interpreter] </u><br />the OM.debugConfig === “multiple files” is only defined in runtime (remember my index.html where I defined the OM.debugConfig = “multiple files”;) which now tells my browser where are my files. This enables me to have breakpoints inside VS in order to debug my application as a “normal” C# app for instance.
<li><u>if (OM.debugConfig === “single file”) – [Browser as Interpreter] </u><br />the OM.debugConfig === “single file” can also be defined for instance in indexRelease.html, that will reference a single compiled file for all of my modules similar to what I’ve done <a href="http://www.onemenny.com/blog/the-best-javascript-ide/">here</a> with T4 template compilation of my scripts. </li>
</ol>
</li>
</ol>
<p>here is the runtime (FireBug DOM)</p>
<p><a href="http://www.onemenny.com/blog/wp-content/uploads/2012/03/image2.png"><img style="background-image: none; border-right-width: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="image" border="0" alt="image" src="http://www.onemenny.com/blog/wp-content/uploads/2012/03/image_thumb2.png" width="432" height="307"></a></p>
<p>This is only a POC, I’m sure this concept can help achieve much robust architecture.</p>

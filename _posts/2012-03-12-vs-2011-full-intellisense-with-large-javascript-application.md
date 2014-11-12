---
layout: post
title: VS 2011 Full IntelliSense With Large JavaScript Application
created: 1331584799
author: menny
permalink: /vs-2011-full-intellisense-large-javascript-application
tags:
- .NET
- .Net Open Source
- Visual Studio
---
<div class="entry-content">
<p>As of writing these word VS 2011 is in consumer preview stage (Beta).</p>
<h1>The Goal</h1>
<p>In order to build a large JavaScript application that can scale  easily you need to distribute your code into modules and place each  module in a separate file. Unlike JavaScript compilers, we humans need  this structure for the sake of sanity.&nbsp;</p>
<p>&nbsp;</p>
<p>If we break a JavaScript application into multiple files we can  easily loose IntelliSense and have performance issues when loading many  files in runtime. We can easily get around this with 3 strategies:</p>
<p>&nbsp;</p>
<ul>
    <li>On <strong>release</strong> compile everything into a single file</li>
    <li>On <strong>debug</strong> remain with the file structure and load modules on demand. debug inside VS your specific files like a &ldquo;normal&rdquo; C# application.</li>
    <li>On <strong>design time</strong> have full IntelliSense inside a module that have dependencies to other modules</li>
</ul>
<p>&nbsp;</p>
<p>In order to achieve that you can easily add references to each  module/file telling VS to load specific files, but that will only work  in design time so we need to leverage this capability to something more  suitable.</p>
<h1>&nbsp;</h1>
<h1>The Details</h1>
<p><em><font color="#666666">I have only a concept and only tested it in  VS2011 since there are many JavaScript improvements like loading file  asynch, and automatic IntelliSense build without the need to hit  ctrl+shift+J. This may work in VS2010, to be honest I don&rsquo;t see a reason  why not?</font></em></p>
<p>&nbsp;</p>
<p>So here is what I got:</p>
<p><a href="http://www.onemenny.com/blog/wp-content/uploads/2012/03/clip_image001.png"><img width="200" height="244" border="0" src="/files/clip_image001_thumb.png" alt="clip_image001" title="clip_image001" style="background-image: none; border-width: 0px; padding-left: 0px; padding-right: 0px; display: inline; padding-top: 0px;" /></a></p>
<p>&nbsp;</p>
<p>Basically this is a vanilla solution structure with some helpers. My Script folder contains <a href="http://jquery.com/">JQuery</a> and <a href="http://requirejs.org/">RequireJS</a> as <a href="http://nuget.org/">NuGet</a> packages.</p>
<p>&nbsp;</p>
<p>My index.html is as follows:</p>
<p><a href="http://www.onemenny.com/blog/wp-content/uploads/2012/03/clip_image003.jpg"><img border="0" src="/files/clip_image003_thumb.jpg" alt="clip_image003" title="clip_image003" style="background-image: none; border-right-width: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" /></a></p>
<p>&nbsp;</p>
<p>So I&rsquo;ve defined a global namespace and set to it my configuration  value to multiple files like so: OM.debugConfig = &ldquo;multiple files&rdquo;;</p>
<p>Then my ajaxController just defines a module under OM.Communication namespace</p>
<p>&nbsp;</p>
<p><a href="http://www.onemenny.com/blog/wp-content/uploads/2012/03/clip_image004.png"><img border="0" src="/files/clip_image004_thumb.png" alt="clip_image004" title="clip_image004" style="background-image: none; border-right-width: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" /></a></p>
<p>&nbsp;</p>
<p>Now, I want to have full IntelliSense on other modules, like my commonHelper module, that will be aware to my ajaxController</p>
<p>&nbsp;</p>
<p><a href="http://www.onemenny.com/blog/wp-content/uploads/2012/03/clip_image005.png"><img border="0" src="/files/clip_image005_thumb.png" alt="clip_image005" title="clip_image005" style="background-image: none; border-right-width: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" /></a></p>
<p>&nbsp;</p>
<p>So what&rsquo;s going on here?</p>
<ol>
    <li>I&rsquo;ve added a VS reference to require.js (/// &lt;reference  path=&rdquo;../../Scripts/require.js&rdquo; /&gt;) now VS knows about require.js lib</li>
    <li>I&rsquo;ve defined my dependencies in the following manner:
    <ol>
        <li><u>if (!OM.debugConfig) &ndash; [Visual Studio as Interpreter]<br />
        </u>the  !OM.debugConfig is not defined (falsy). This is the case when vs tries  to build its IntelliSense when you work on that specific file. So the  folders to look for my modules are relative to my current file position</li>
        <li><u>if (OM.debugConfig === &ldquo;multiple files&rdquo;) &ndash; [Browser as Interpreter] </u><br />
        the  OM.debugConfig === &ldquo;multiple files&rdquo; is only defined in runtime  (remember my index.html where I defined the OM.debugConfig = &ldquo;multiple  files&rdquo;;) which now tells my browser where are my files. This enables me  to have breakpoints inside VS in order to debug my application as a  &ldquo;normal&rdquo; C# app for instance.</li>
        <li><u>if (OM.debugConfig === &ldquo;single file&rdquo;) &ndash; [Browser as Interpreter] </u><br />
        the  OM.debugConfig === &ldquo;single file&rdquo; can also be defined for instance in  indexRelease.html, that will reference a single compiled file for all of  my modules similar to what I&rsquo;ve done <a href="http://www.onemenny.com/blog/the-best-javascript-ide/">here</a> with T4 template compilation of my scripts.</li>
    </ol>
    </li>
</ol>
<p>&nbsp;</p>
<p>here is the runtime (FireBug DOM)</p>
<p><a href="http://www.onemenny.com/blog/wp-content/uploads/2012/03/image2.png"><img border="0" src="/files/image_thumb2(1).png" alt="image" title="image" style="background-image: none; border-right-width: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" /></a></p>
<p>&nbsp;</p>
<p>This is only a POC, I&rsquo;m sure this concept can help achieve much robust architecture.</p>
</div>

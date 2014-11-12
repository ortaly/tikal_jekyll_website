---
layout: post
title: Solving Visual Studio 2008 SP1 Java Script IntelliSense Support  Problem
created: 1252378605
permalink: solving-visual-studio-2008-sp1-java-script-intellisense-support-problem
tags:
- .NET
- jQuery
- .Net Open Source
- ASP.NET
- Visual Studio
---
<p>Visual Studio 2008 support Java Script IntelliSense. It does so by using a &quot;-vsdoc.js&quot; file, which is saved together with the &quot;original&quot; &quot;.js&quot; file. For example, if you're using JQuery, and use <strong>jquery-1.3.2.min.js</strong> file, you can put a <strong>jquery-1.3.2.min-vsdoc.js</strong> file just next to it (available from <a href="http://docs.jquery.com/Downloading_jQuery#Download_jQuery">JQuery download page</a>), and that's it.</p>
<p>&nbsp;</p>
<p>Unfortunately, this may not work, and all you get is: &quot;Error updating JScript IntelliSense:  Object doesn't support this property or method&quot;.</p>
<p>&nbsp;</p>
<p>One of the things may cause this issue is a bug in Visual Studio. If you're using Visual Studio 2008 SP1 (like I do), <a href="http://code.msdn.microsoft.com/KB958502">there's a patch you can install</a> that adds JScript Editor support for &ldquo;-vsdoc.js&rdquo; IntelliSense documentation files.</p>
<p>&nbsp;</p>
<p>If this still doesn't work, make sure the ".js" file, and the "-vsdoc.js" file share the same name.</p>

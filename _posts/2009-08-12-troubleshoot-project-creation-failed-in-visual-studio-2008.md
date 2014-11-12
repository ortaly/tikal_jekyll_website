---
layout: post
title: Troubleshoot "Project Creation Failed" in Visual Studio 2008
created: 1250060848
permalink: troubleshoot-project-creation-failed-in-visual-studio-2008
tags:
- .NET
- Visual Studio
---
<p>Installing external VS add-ons may be risky - it may break Visual Studio and make it unusable.</p>
<p>&nbsp;</p>
<p>It happened to me twice: my VS 2008 was broke in a way that I was unable to create new projects, or even new classes. I would think a simple solution is easy to find, but I found myself reading recommendations for hand-fixing the Windows registry.</p>
<p>&nbsp;</p>
<p>The problem I had was related to TemplateWizardInterface, which was added when I installed the Guidance Automation Extensions (GAX). Installing new add-on re-create the problem. So, here's a real easy solution:</p>
<ol>
    <li>Close Visual Studio</li>
    <li>Open the file C:\Program Files\Microsoft Visual Studio 9.0\Common7\IDE\devenv.exe.config in a text editor (notepad, notepad++, notepad 2, etc.)</li>
    <li>Search for the string &quot;Microsoft.VisualStudio.TemplateWizardInterface&quot;.</li>
    <li>Comment out the whole dependentAssembly element that contains it. Now it should like like this:</li>
</ol>
<p>
<p>&nbsp;&nbsp; &nbsp; &nbsp;&lt;!--dependentAssembly&gt;</p>
<p>&nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&lt;assemblyIdentity name=&quot;Microsoft.VisualStudio.TemplateWizardInterface&quot; publicKeyToken=&quot;b03f5f7f11d50a3a&quot; culture=&quot;neutral&quot; /&gt;</p>
<p>&nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&lt;bindingRedirect oldVersion=&quot;0.0.0.0-8.9.9.9&quot; newVersion=&quot;9.0.0.0&quot; /&gt;</p>
<p>&nbsp;&nbsp; &nbsp; &nbsp;&lt;/dependentAssembly--&gt;</p>
</p>
<p>&nbsp;</p>
<p>Thats it.</p>

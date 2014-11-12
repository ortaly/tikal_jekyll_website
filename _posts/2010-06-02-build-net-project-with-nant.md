---
layout: post
title: Build .NET Project with NAnt
created: 1275497743
author: igorz
permalink: /net/build-net-project-nant
tags:
- .NET
- NAnt
- MSBuild
- .Net Open Source
---
<p>Since <a href="http://nant.sourceforge.net/">NAnt</a> comes with <a href="http://sourceforge.net/projects/nant/files/nant/0.90/">NAnt 0.90</a> release I was interested to use it with my project <a href="http://www.izwebfilemanager.com/default.aspx">IZWebFileManage.</a></p>
<p>&nbsp;</p>
<p>At first look it is powerful tool allows me easy to build project, run tests and package release.  The first task was&quot;build&quot; of course.</p>
<p>&nbsp;</p>
<p>For such purpose NAnt offers <span style="font-weight: bold; font-style: italic;">&lt;csc&gt;</span> <span style="font-style: italic; font-weight: bold;"><csc></csc></span> task, but using this task I have to declare output type, list of source files, resources etc. It is quite good if you are using Notepad or any other (not Visual Studio) IDE, but I (and I believe most of .NET developers)  use Visual Studio and have *.csproj file.</p>
<p>&nbsp;</p>
<p>Is there a way to build VS project with NAnt? Yes, you may find it in <a href="http://nantcontrib.sourceforge.net/">NAntContrib</a>. It provides <span style="font-weight: bold; font-style: italic;">&lt;msbuild&gt;</span> <span style="font-style: italic; font-weight: bold;"><msbuild></msbuild></span> task. But problem is that NAntContrib is quite out of date.  The last release is on 2006/10/15 and I am not sure it supports NAnt 0.90 and VS 2008</p>
<p>&nbsp;</p>
<p>Is there alternative way to build *.csproj? Yes - msbuild command line! NAnt has <span style="font-weight: bold; font-style: italic;">&lt;exec&gt;</span> <span style="font-weight: bold; font-style: italic;"><exec></exec></span> task which run any command line you want.  There is my Default.build file:  <!-- code formatted by http://manoli.net/csharpformat/ --></p>
<p>&nbsp;</p>
<pre class="csharpcode"><span class="kwrd">&lt;?</span><span class="html">xml</span> <span class="attr">version</span><span class="kwrd">=&quot;1.0&quot;</span> ?<span class="kwrd">&gt;</span>
<span class="kwrd">&lt;</span><span class="html">project</span> <span class="attr">name</span><span class="kwrd">=&quot;IZWebFileManager&quot;</span> <span class="attr">default</span><span class="kwrd">=&quot;build&quot;</span> <span class="attr">        xmlns</span><span class="kwrd">=&quot;http://nant.sf.net/schemas/nant.xsd&quot;</span><span class="kwrd">&gt;</span>

<span class="kwrd">&lt;</span><span class="html">property</span> <span class="attr">name</span><span class="kwrd">=&quot;project.config&quot;</span> <span class="attr">value</span><span class="kwrd">=&quot;Debug&quot;</span> <span class="kwrd">/&gt;</span>

<span class="kwrd">&lt;</span><span class="html">target</span> <span class="attr">name</span><span class="kwrd">=&quot;clean&quot;</span><span class="kwrd">&gt;</span>
    <span class="kwrd">&lt;</span><span class="html">exec</span> <span class="attr">program</span><span class="kwrd">=&quot;${framework::get-framework-directory(framework::get-target-framework())}\msbuild.exe&quot;</span>
              <span class="attr">commandline</span><span class="kwrd">='/t:Clean /p:Configuration=${project.config} /p:Platform=&quot;AnyCPU&quot; /v:n'</span>
                <span class="attr">workingdir</span><span class="kwrd">=&quot;.&quot;</span> <span class="kwrd">/&gt;</span>
<span class="kwrd">&lt;/</span><span class="html">target</span><span class="kwrd">&gt;</span>

<span class="kwrd">&lt;</span><span class="html">target</span> <span class="attr">name</span><span class="kwrd">=&quot;version&quot;</span><span class="kwrd">&gt;</span>
<span class="kwrd">&lt;/</span><span class="html">target</span><span class="kwrd">&gt;</span>

<span class="kwrd">&lt;</span><span class="html">target</span> <span class="attr">name</span><span class="kwrd">=&quot;build&quot;</span> <span class="attr">depends</span><span class="kwrd">=&quot;clean, version&quot;</span><span class="kwrd">&gt;</span>
    <span class="kwrd">&lt;</span><span class="html">exec</span> <span class="attr">program</span><span class="kwrd">=&quot;${framework::get-framework-directory(framework::get-target-framework())}\msbuild.exe&quot;</span>
              <span class="attr">commandline</span><span class="kwrd">='/t:Build /p:Configuration=${project.config} /p:Platform=&quot;AnyCPU&quot; /v:n'</span>
                <span class="attr">workingdir</span><span class="kwrd">=&quot;.&quot;</span> <span class="kwrd">/&gt;</span>
<span class="kwrd">&lt;/</span><span class="html">target</span><span class="kwrd">&gt;</span>

<span class="kwrd">&lt;/</span><span class="html">project</span><span class="kwrd">&gt;</span></pre>
<p>&nbsp;</p>
<p>I place Default.build file near to *.csproj file and msbuild find it by default, so there is no need to mention name of project file explicitly.</p>
<p>&nbsp;</p>
<p>Run build using command line:</p>
<p>&gt;nant build</p>
<p>&nbsp;</p>
<p>P.S. After a while I figured out <span style="font-weight: bold; font-style: italic;">&lt;solution</span><span style="font-style: italic;"><span style="font-weight: bold;">&gt; </span></span>task. Looks like that is what I need to run msbuild with NAnt. I will discover it...</p>

---
layout: post
title: Introducing Horn - package management system for .Net
created: 1252747525
author: andrew
permalink: /net/introducing-horn-package-management-system-net
tags:
- .NET
- DevOps build
- .Net Open Source
---
<p>I was looking for a build system similar to maven for .Net. A standard tool for building project is MSBuild which is heavily influenced by Ant. While it is&nbsp; easy to create build scripts for small project, it does not manage the packages as effectively as maven.</p>
<p>&nbsp;</p>
<p>Today I came over Horn. It was inspired by both Maven and portage (build system of Gentoo linux). This is an example of a build script:</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<pre>
   1: install cap:
   2:     description &quot;The Capgemini Belgian .NET framework&quot;
   3:     get_from svn(&quot;https://scm-coconet.capgemini.com/svn/repos/belgianadf&quot;)
   4:     build_with msbuild, buildfile(&quot;Capgemini.Adf/trunk/Capgemini.Adf.sln&quot;), FrameworkVersion35                
   5:  
   6:     with:
   7:         tasks clean,release,platformNet35
   8:  
   9:     shared_library &quot;Capgemini.Adf/trunk/References&quot;
  10:     build_root_dir &quot;bin/net-3.5/release&quot;        
  11:     
  12: dependencies:
  13:     depend &quot;castle.tools&quot;        &gt;&gt; &quot;Castle.Core&quot;    
  14:     depend &quot;castle.tools&quot;         &gt;&gt; &quot;Castle.DynamicProxy2&quot;
  15:     depend &quot;castle.windsor&quot;      &gt;&gt; &quot;Castle.MicroKernel&quot;
  16:     depend &quot;castle.windsor&quot;      &gt;&gt; &quot;Castle.Windsor&quot;    
  17:     depend &quot;nhibernate&quot;             &gt;&gt; &quot;2.1&quot; &gt;&gt; &quot;NHibernate&quot;     
  18:     depend &quot;nhibernate&quot;             &gt;&gt; &quot;2.1&quot; &gt;&gt; &quot;NHibernate.ByteCode.Castle&quot;
  19:     depend &quot;nhibernate&quot;          &gt;&gt; &quot;2.1&quot; &gt;&gt; &quot;Iesi.Collections&quot;
  20:     depend &quot;nhibernate.caches&quot;   &gt;&gt; &quot;NHibernate.Caches.SysCache&quot;
  21:     depend &quot;fluentnhibernate&quot;    &gt;&gt; &quot;FluentNHibernate&quot;
  22:     depend @log4net              &gt;&gt; &quot;1.2.10&quot; &gt;&gt;  &quot;log4net&quot;    
  23:     depend &quot;automapper&quot;             &gt;&gt; &quot;AutoMapper&quot;
  24:     depend &quot;moq&quot;                &gt;&gt; &quot;Moq&quot;
</pre>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>As you see, it's very declarative. The versions of the packages are defined clearly, and are can be easily managed from one place.</p>
<p>&nbsp;</p>
<p>Read more about this promising framework here: <a href="http://thesoftwaresimpleton.blogspot.com/2009/03/horn-package-management-system.html">http://thesoftwaresimpleton.blogspot.com/2009/03/horn-package-management-system.html</a></p>

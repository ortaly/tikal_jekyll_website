---
layout: post
title: Using TypeScript with an existing ASP.NET project.
created: 1357105560
author: igorz
permalink: /net/blog/using-typescript-existing-aspnet-project
tags:
- .NET
- .Net Open Source
---
<p><a href="http://www.typescriptlang.org/">TypeScript</a>&nbsp;looks very powerful for me, and I want to use it with all my ASP.NET projects. But I found it is not trivial to add support of TypeScript to an existing project. After installing <a href="http://www.microsoft.com/en-us/download/details.aspx?id=34790">TypeScript for Visual Studio 2012</a>&nbsp;I was able to add new TypeScript file (*.ts) to the project, but any changes in the *.ts file did not affect it&#39;s output *.js file. Seemed like TypeScript compiler doesn&#39;t work for me. It was strange, because I found it works perfect in test project created from TypeScriptHTMLApp template.<br />
	<br />
	After comparing *.cspoj files I found the difference - there is an &quot;magic&quot; build step has done to compile *.ts files in TypeScriptHTMLApp template:</p>
<br />
<br />
<div class="separator" style="clear: both; text-align: center;">
	<a href="http://4.bp.blogspot.com/-UvcIfRPeHsw/UOPKNCmJHbI/AAAAAAAAUA0/71J92T4ga5M/s1600/2013-01-02_07h46_40.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="144" src="http://4.bp.blogspot.com/-UvcIfRPeHsw/UOPKNCmJHbI/AAAAAAAAUA0/71J92T4ga5M/s640/2013-01-02_07h46_40.png" width="640" /></a></div>
<br />
<br />
<br />
<p>I just added this lines in my existing project&#39;s *.csproj file and it works fine now.<br />
	<br />
	Later I found the same answer in <a href="http://stackoverflow.com/questions/12680486/how-do-i-add-typescript-to-an-existing-asp-net-mvc-project">Stack Overflow</a>. (Should I&#39;ve searched there for an answer first? :))<br />
	&nbsp;</p>
<div>
	&nbsp;</div>

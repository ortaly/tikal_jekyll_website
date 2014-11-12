---
layout: post
title: '.Net technologies blueprint: .NET frameworks & IDE'
created: 1263975333
author: igorz
permalink: /net/net-technologies-blueprint-net-frameworks-ide
tags:
- .NET
- IDE
- blueprint
- .NET frameworks
---
<p>1.0 obsolete<br />
1.1 VS 2003<br />
&nbsp; * win 2003 has built in<br />
</p>
<p><br />
2.0 (sp1) VS 2005/8/(?)10<br />
3.0 WPF, WCF, WF, VS 2005/8/(?)10<br />
3.5 (sp1) Linq, C#3.5, Entity fw..., sp1: System.Web.Abstraction, Sys.Web.Routing. VS 2008/(?)10<br />
&nbsp; * win 2008 has built in<br />
&nbsp; * the same runtime<br />
&nbsp; * upgrade is convinient (not risky , backward compat)<br />
</p>
<p><br />
4.0 VS 2010<br />
&nbsp; * new machine.config, mscorlib, runtime<br />
&nbsp; * C#4.0, ASP.NET 4.0<br />
&nbsp; * upgrade might be risky, requeres changes in web.config.<br />
<br />
<a href="http://mono-project.com/FAQ:_General">mono </a><br />
&nbsp; * integration with VS<br />
&nbsp; * MonoDev<br />
&nbsp; * The Mono API today is somewhere in between .NET 2.0 and .NET 3.5, <br />
&nbsp; * cross platform</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>we recommend:<br />
<br />
VS 2008/.NET 3.5 <br />
&nbsp; * C# 3.5<br />
&nbsp; * all-in-one technologies. <br />
&nbsp; * upgrade from .NET 2.0 does not require any code change<br />
<br />
MONO for cross platform only.<br />
<br />
VS 2010/.NET 4.0 - in the future.</p>

---
layout: post
title: 'ASP.NET MVC 3 Extensionless URLs on IIS 7 classic mode '
created: 1297922513
author: igorz
permalink: /net/aspnet-mvc-3-extensionless-urls-iis-7-classic-mode
tags:
- .NET
- IIS 7
- ASP.NET MVC
- ASP.NET 4.0
- .Net Open Source
---
<p>Prior ASP.NET 4.0, the only way to handle extensionless URLs was setting <span style="font-weight: bold;">runAllManagedModulesForAllRequests=&rdquo;true&rdquo;</span>  (IIS 7 integrated mode) or mapping a wildcard (IIS 6 and IIS 7 in  classic mode). That impacts the performance of static requests (HTML,  JPG, GIF, CSS, JS, etc), because a all requests are handled by ASP.NET  and runs application pipeline with all attached modules.<br />
<br />
ASP.NET v4.0 provides a better way to enable extensionless URLs routing.<br />
There  is a new feature that allows extensionless URLs to be directed into  managed code, without a wildcard mapping or setting  runAllManagedModulesForAllRequests=&rdquo;true&rdquo;.<br />
Because of this feature  all static resources requests are not longer handled by ASP.NET, and  consequentially, they are no longer suffered by performance impact.<br />
<br />
It works by default on IIS 6. You may read more about this feature on IIS 6 <a href="http://haacked.com/archive/2010/12/22/asp-net-mvc-3-extensionless-urls-on-iis-6.aspx">here</a> .<br />
<br />
But IIS 7 surprises a lot! It does not support this feature by default, and I spend an hours to find solution.<br />
<br />
The solution is called IIS 7 QFE and steps to download it can be found at <a href="http://support.microsoft.com/kb/980368">http://support.microsoft.com/kb/980368</a>.<br />
<br />
I don't know why they did not supply this with .NET 4 installation, they know it better.</p>

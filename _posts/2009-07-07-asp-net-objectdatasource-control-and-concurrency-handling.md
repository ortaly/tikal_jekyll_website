---
layout: post
title: ASP.NET ObjectDataSource Control and Concurrency Handling
created: 1246945881
permalink: asp-net-objectdatasource-control-and-concurrency-handling
tags:
- .NET
- VB.NET
- ASP.NET
---
<p>ASP.NET data source controls sever are used within an ASP.NET pages, and use them to connect to a data source, such as SQL Server, XML files, etc. It then allows us to bind to it a UI control, such as a GridView. They are extremely easy to use on one hand, but they&rsquo;re not being used in a real world scenario, since they bring us back (almost) to the &ldquo;old world&rdquo; 2-tiers application architecture, in which the client directly connects to the data source.</p>
<p>&nbsp;</p>
<!--break-->
<p>One data source control should be used is the <a href="http://msdn.microsoft.com/en-us/library/9a4kyhcx.aspx" target="_blank">ObjectDataSource</a>, which enable us to connect to an object on the server, provide a name of a method, and that&rsquo;s about it&hellip;</p>
<p>&nbsp;</p>
<p>But what about concurrency? What happens when more than user tries to update the same record in the data store?</p>
<p>&nbsp;</p>
<p>I would like to recommend two complimentary solutions I found at Visual Studio Magazine (though using VB.NET) one for <a href="http://visualstudiomagazine.com/articles/2008/07/16/handling-data-contention-with-optimistic-concurrency.aspx" target="_blank">Concurrency Handling</a> and one for <a href="http://visualstudiomagazine.com/articles/2009/05/26/handling-concurrency-with-objectdatasource.aspx" target="_blank">Concurrency Handling with ObjectDataSource</a>. Combine the solutions in these two articles can save you a lot of time, not to mention many lines of un-readable code.</p>

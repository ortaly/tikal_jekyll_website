---
layout: post
title: Entity Framework (EF) is now open source
created: 1342970669
author: menny
permalink: /entity-framework-ef-now-open-source
tags:
- .NET
---
<p>Microsoft are dedicated to their new way and <a href="http://blogs.msdn.com/b/adonet/archive/2012/07/19/entity-framework-and-open-source.aspx">just declared</a> EF (now version 4.1) as open source. EF is not the only product making this move, since last Decembers we saw Azure SDK, ASP.NET MVC, Web API and Razor all fall to the same bucket.
<p>The license seems more attractive then NHibernate offer: ASL 2.0 vs LGPL.
<p>Microsoft still has to prove this commitment as it’s still early to see how the community adoption will take place. Most of the avant garde feature still comes for the existing open source software like NHibernate even though version 5 will support enums, spatial data types, table-valued function support and some serious performance improvements.
<p>Enums for instance does not exist in NHibernate but Spatial data types are.
<p>It’s good to see MS backing their projects, and the truth is that most large scale open source projects have a commercial back behind them – sad as it is, this is life.
<p>The road map for version 6 already exists as stated on their blog:
<ul>
<ul>
<li><b>Task-based async</b> – Allowing EF to take advantage of .NET 4.5. async support with async queries, updates, etc.
<li><b>Stored Procedures & Functions in Code First</b> – Allow mapping to stored procs and database functions using the Code First APIs.
<li><b>Custom Code First conventions</b> – Allowing custom conventions to be written and registered with Code First.</li>
</ul>
</ul>
<p>You can read SctottGu’s enouncement <a href="http://weblogs.asp.net/scottgu/archive/2012/07/19/entity-framework-and-open-source.aspx">here</a></p>
<h1> </h1>
<h1>A little background:</h1>
<p>When the first version of EF was released the community startled because of its poorness against other ORM at that time (NHibernate mostly). The EF team decided then to open a WIKI and discuss its development progress with whoever wanted. Not much after the EF blog was opened with detailed description of new feature and the User Voice was carefully harvested for community feedback.
<p>About a month ago the EF blog was moved to the new windows 8 platform style. To make a long story short – they were always listening and this move is pretty much the next logical step for the team.</p>

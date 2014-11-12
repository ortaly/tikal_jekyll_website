---
layout: post
title: '.Net technologies blueprint: data access'
created: 1260882349
author: andrew
permalink: /net/net-technologies-blueprint-data-access
tags:
- .NET
- blueprint; data access
---
<p><span class="Apple-style-span" style="font-family: Helvetica, Verdana, Arial, Helvetica, sans-serif; font-size: medium; line-height: normal; color: rgb(0, 0, 0); ">1. ADO.Net is outdated and cumbersome - will recommend it only for tiny projects with weak developers not able to master new and more sophisticated technologies.</span></p>
<p><span class="Apple-style-span" style="color: rgb(0, 0, 0); font-family: Helvetica; font-size: medium; line-height: normal; "><br />
So the modern approach to Data Access is ORM (Object-Relational Mapping)<br />
<br />
2. Entity Framework<br />
- easy for beginner<br />
- GUI builder and drag-and-drop generators in Visual Studio<br />
- positive experience on using it with small well-structured database<br />
- bad feedbacks on using this ORM on big tables, which were not designed from scratch: bad database layout is automatically copied into code<br />
- limited customization<br />
- significantly slower than LINQ or NHibernate<br />
3. LINQ<br />
- not easy for beginner, requires understanding of advanced C# language features<br />
- is suitable also for non-relational data access (XML for example)<br />
- drag and drop and intellisense supported for existing database<br />
- other database support may be limited (mysql, etc)<br />
4. NHibernate<br />
- excellent support of different DB vendors, with no or little changes in code<br />
- can be used when DB still does not exist and auto-generate database according to code<br />
- powerful customization abilities - when existing DB schema is messy, classes still can be created in a clean way<br />
- performance - faster than LINQ in write, slower in read<br />
- good community, sometimes better than MS support according to feedbacks<br />
- easier to understand than LINQ, but no built-in VS support<br />
- very familiar for developers with Java background</span></p>
<p>&nbsp;</p>

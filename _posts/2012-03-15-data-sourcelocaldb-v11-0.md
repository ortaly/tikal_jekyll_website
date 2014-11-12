---
layout: post
title: Data Source=(LocalDb)\v11.0;
created: 1331835599
author: menny
permalink: /data-sourcelocaldbv110
tags:
- .NET
---
<p>LocalDB was introduced in SQL Server 2012 CTP3. It’s basically a new version of SQL Express, with same functionality, dedicated to developers. So you don’t need to install any SQL server. If you have installed SQL 2012 or Visual Studio 11 then you already have it, and it runs over .Net 4 or higher. If you are using Visual Studio 11 and have been playing with the new EntityFramework and MVC, you can see it on the default connection string.
<p>When you start a debug session the LocalDB starts on a different process with a clean instance of SQL. When you stop the debug session, it stops. And this is quite fun since <strong>you get a full local dedicated database per debug session </strong>started and stopes by VS. The LocalDB also support Database as a file during the connection process letting the developers work on local MDF/LDF file.
<p><a href="http://www.onemenny.com/blog/wp-content/uploads/2012/03/clip_image002.jpg"><img style="background-image: none; border-bottom: 0px; border-left: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top: 0px; border-right: 0px; padding-top: 0px" title="clip_image002" border="0" alt="clip_image002" src="http://www.onemenny.com/blog/wp-content/uploads/2012/03/clip_image002_thumb.jpg" width="460" height="213"></a>
<p><a href="http://blogs.msdn.com/b/sqlexpress/archive/2011/07/12/introducing-localdb-a-better-sql-express.aspx">Here is the high level overview:</a>
<ol>
<li>LocalDB uses the same sqlservr.exe as the regular SQL Express and other editions of SQL Server. The application is using the same client-side providers (ADO.NET, ODBC, PDO and others) to connect to it and operates on data using the same T-SQL language as provided by SQL Express.
<li>LocalDB is installed once on a machine (per major SQL Server version). Multiple applications can start multiple LocalDB processes, but they are all started from the same sqlservr.exe executable file from the same disk location.
<li>LocalDB doesn’t create any database services; LocalDB processes are started and stopped automatically when needed. The application is just connecting to “Data Source=(localdb)\v11.0″ and LocalDB process is started as a child process of the application. A few minutes after the last connection to this process is closed the process shuts down.
<li>LocalDB connections support AttachDbFileName property, which allows developers to specify a database file location. LocalDB will attach the specified database file and the connection will be made to it.</li>
</ol>
<p>If you have an instance of SQL Server 2008 or Visual Studio 2010 than you cannot connect to this database. You can only connect using SQL 2012 or VS 11 (I’m sure there are some hack <a href="http://blogs.msdn.com/b/sqlexpress/archive/2011/10/27/net-framework-4-now-supports-localdb.aspx">if you insist</a>).
<p><a href="http://www.onemenny.com/blog/wp-content/uploads/2012/03/clip_image003.png"><img style="background-image: none; border-bottom: 0px; border-left: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top: 0px; border-right: 0px; padding-top: 0px" title="clip_image003" border="0" alt="clip_image003" src="http://www.onemenny.com/blog/wp-content/uploads/2012/03/clip_image003_thumb.png" width="244" height="185"></a>
<p>You can download LocalDB from <a href="http://www.microsoft.com/betaexperience/pd/SQLEXPCTAV2/enus/default.aspx">this page</a>. And as I mentioned above – get the full functionality of SQL Express (Linq, XML, ADO .Net, Spatial Types, SP, T-SQL). It will only work with local connections, does not run on mobile devices and the DB size is limited to 10GB (1 CPU).</p>

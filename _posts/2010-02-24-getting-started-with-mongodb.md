---
layout: post
title: Getting started with MongoDB
created: 1267006364
author: igorz
permalink: /net/getting-started-mongodb
tags:
- .NET
- MongoDB
- Databases
- c#
- .Net Open Source
- nosql
- Document-oriented database
---
<p>Michael wrote in his <a href="http://www.tikalk.com/net/mongodb-with-c">post </a>about beauty of MongoDB.</p>
<p>I tried to run a couple lines of code and found it very easy to get started with.</p>
<p>There are steps to get there:</p>
<p>&nbsp;</p>
<p>1. Download <a href="http://www.mongodb.org/display/DOCS/Downloads">binaries</a>. I&nbsp; used version 1.2.3 for Win32</p>
<p>2. Create the data folder C:\data\db</p>
<p>3. Run mongod.exe</p>
<p>&nbsp;</p>
<p>At this step you have MongoDB running.</p>
<p>&nbsp;</p>
<p>4. Download <a href="http://github.com/samus/mongodb-csharp/downloads">C# driver</a></p>
<p>5. Create a console application with Visual Studio</p>
<p>6. Add references to driver's dlls</p>
<p>&nbsp;</p>
<p>Now you are ready to write code.</p>
<p>&nbsp;</p>
<p>I just copies a lines of code from Michale's post into Main method and added console output:</p>
<p>&nbsp;</p>
<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Console.WriteLine(&quot;Create DB:&quot;);</p>
<p>&nbsp;</p>
<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Mongo mongo = new Mongo();</p>
<p>&nbsp;</p>
<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; mongo.Connect();</p>
<p>&nbsp;</p>
<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; IMongoCollection postsTbl = mongo.getDB(&quot;BlogDB&quot;).GetCollection(&quot;Posts&quot;);</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Console.WriteLine(&quot;Insert data:&quot;);</p>
<p>&nbsp;</p>
<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Document post = new Document();</p>
<p>&nbsp;</p>
<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; post[&quot;Tittle&quot;] = &quot;Tittle1&quot;;</p>
<p>&nbsp;</p>
<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; post[&quot;Timestamp&quot;] = DateTime.Now;</p>
<p>&nbsp;</p>
<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; postsTbl.Insert(post);</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Console.WriteLine(&quot;Queries:&quot;);</p>
<p>&nbsp;</p>
<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Document spec = new Document();</p>
<p>&nbsp;</p>
<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; spec[&quot;Tittle&quot;] = &quot;Tittle1&quot;;</p>
<p>&nbsp;</p>
<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Document myPost = postsTbl.FindOne(spec);</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Console.WriteLine(&quot;Title: &quot; + myPost[&quot;Title&quot;]);</p>
<p>&nbsp;</p>
<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Console.WriteLine(&quot;Timestamp: &quot; + myPost[&quot;Timestamp&quot;]);</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Console.ReadLine();</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>Finally run the programm.</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>

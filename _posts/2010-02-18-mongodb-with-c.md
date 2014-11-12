---
layout: post
title: MongoDB with C#
created: 1266506107
permalink: mongodb-with-c
tags:
- .NET
- nosql
- Document-oriented database
- MongoDB
- Databases
- .Net Open Source
---
<p>&nbsp;</p>
<p>Modern projects need to manipulate with huge data amount, as result the necessity of high scalability and &nbsp;high performance is very actual and always grows.</p>
<p>RDBMS databases cannot supply ultimate solution and alternative concepts like in NoSQL systems look very interesting.</p>
<p>&nbsp;</p>
<p>The first interesting option is key-value stores like Google Big Table or Cassandra&nbsp;that provide fast and extremely large-scale solution but you can forget the comfort work with SQL queries like in RDBMS databases. &nbsp;</p>
<p>&nbsp;</p>
<p>Another option that tries to combine between advantages of RDBMS databases and key-values stores &nbsp;is document-oriented databases like MonogDB.</p>
<p>&nbsp;</p>
<p>MongoDB is development by commercial company as open-source project written in C++.</p>
<p>There are a lot of documentation, tutorials and samples on project site.&nbsp;</p>
<p>&nbsp;</p>
<p>MongoDB itself is a scalable, high-performance, schema-free, document-oriented database&nbsp;</p>
<p>that supports dynamic queries in JSON-style format, indexes, replication, sharding, MapReduce.</p>
<p>&nbsp;</p>
<p>MonogDB provides interface based on native drivers that exist for most environments: C, C++,Java,Python,Ruby...</p>
<p>&nbsp;</p>
<p>For working with MonogoDB from Dot.Net there is open-source project mongodb-csharp that has in addition LINQ capability.</p>
<p>&nbsp;</p>
<p>Create DB and Insert data:</p>
<p><strong>Mongo mongo = new Mongo();</strong></p>
<p><strong>mongo.Connect();</strong></p>
<p><strong>IMongoCollection postsTbl = mongo.getDB(&quot;BlogDB&quot;).GetCollection(&quot;Posts&quot;);</strong></p>
<p><strong>&nbsp;</strong></p>
<p><strong>Document post = new Document();</strong></p>
<p><strong>post[&quot;Tittle&quot;] = &quot;Tittle1&quot;;</strong></p>
<p><strong>post[&quot;Timestamp&quot;] = DateTime.Now;</strong></p>
<p><strong>postsTbl.Insert(post);</strong></p>
<p>&nbsp;</p>
<div>Queries:</div>
<p><strong>Document spec = new Document();</strong></p>
<p><strong>spec[&quot;Tittle&quot;] = &quot;Tittle1&quot;;</strong></p>
<p><strong>Document myPost = postsTbl.FindOne(spec);</strong></p>
<p>&nbsp;</p>
<p>or with LINQ</p>
<p>&nbsp;</p>
<p><strong>IMongoQuery query = postsTbl.AsQueryable();</strong></p>
<p><strong>var docs = query.Where(doc =&gt; doc[&quot;Tittle&quot;] == &quot;Tittle 1&quot;);</strong></p>
<p>&nbsp;</p>
<p>References:</p>
<p>Project site: http://www.mongodb.org/</p>
<p>Mongodb-csharp - A driver written in c# to connect to MongoDB: http://github.com/samus/mongodb-csharp</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>

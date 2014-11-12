---
layout: post
title: 'MongoDB with NoRM '
created: 1274005938
permalink: mongodb-with-norm
tags:
- .NET
- .Net Open Source
- Databases
- Document-oriented database
- MongoDB
---
<p>One more .Net driver&nbsp;&nbsp;for connecting to MongoDB - NoRM - open-source library managed on GitHub.</p>
<p>Speciality of this project in linkage of .Net types and document model of MongoDB.</p>
<p>With NoRM very easy to manipulate with .Net type without necessity to copy them to/from documents for saving/resolving in/from DB like&nbsp; MongoDB-CSharp Driver.</p>
<p>&nbsp;</p>
<p><strong>NoRM Home</strong>&nbsp;<a href="http://wiki.github.com/atheken/NoRM/">http://wiki.github.com/atheken/NoRM/</a></p>
<p>Sample</p>
<p>&nbsp;</p>
<pre title="code" class="brush: csharp;">
    var coll = (new Mongo(connString)).GetCollection&lt;Product&gt;();

    //create a new object to be added to the collection
    var obj = new Product();
    obj._id = ObjectId.NewObjectID();
    obj.Title = &quot;Shoes&quot;;

    //save the object
    coll.Insert(obj);

    //find the object
    var obj2 = coll.FindOne(new { _id = obj._id}).First();</pre>
<p>&nbsp;</p>

---
layout: post
title: MongoDB – What about cross reference queries ?
created: 1306325612
author: yanai
permalink: /java/mongodb-–-what-about-cross-reference-queries
tags:
- JAVA
- MongoDB NoSQL Join limitation
---
<p>
<meta http-equiv="CONTENT-TYPE" content="text/html; charset=utf-8">
<meta name="GENERATOR" content="OpenOffice.org 3.3  (Unix)">       </meta>
</meta>
</p>
<p style="margin-bottom: 0cm">
<meta http-equiv="CONTENT-TYPE" content="text/html; charset=utf-8">
<meta name="GENERATOR" content="OpenOffice.org 3.3  (Unix)">     </meta>
</meta>
</p>
<p style="margin-bottom: 0cm">Disclaimer &ndash; This post does NOT contain code, since its about architecting the DB model for the application.</p>
<p style="margin-bottom: 0cm">&nbsp;</p>
<p style="margin-bottom: 0cm"><a href="http://www.mongodb.org/"><u>MongoDB</u> </a>is great document database, and we use it in one of Tikal's customers, taking advantage (among other advantages) of its &ldquo;schema-less&rdquo; functionality. This schema-less is considered more flexible than the standard RDBMS, since you don't have to define your schema in advance. As I described <a href="http://www.tikalk.com/java/mongodb-spring-and-rest-&ndash;-trio-jee-dynamic-data-access">in <u>my previous post</u></a>, I used this schema-less to resolve the &ldquo;dynamic model&rdquo; requirement for the customer. But...While, evaluating the MongoDB I encountered a important limitation &ndash; &ldquo;cross reference&rdquo; queries. I'll try to explain the problem using an example.</p>
<p style="margin-bottom: 0cm">&nbsp;</p>
<p style="margin-bottom: 0cm">Lets say your model contains two entities : Person and Car. Lets assume for the simplicity that a person can have many car, but a car can be associated with only one person (<a href="http://download.oracle.com/javaee/6/api/"><u>@OneToMany in JPA</u></a> world). This will be reflected in RDBMS in two tables accordingly &ldquo;persons&rdquo; table and &ldquo;cars&rdquo; table. The &ldquo;cars&rdquo; table will also have a foreign-key on a column &ldquo;person_id&rdquo; pointing the associated person and posing a constraint and index in the RDBMS. This simple schema enables us to run SQL for both sides of the relations and apply &ldquo;cross-reference &ldquo; queries. For example we can return all cars for adults (age&gt;25) for modern cars (created after 2009) ordered by the car's color and then (secondary order) by the car model. All you need to do for this kind of queries is do &ldquo;<a href="http://en.wikipedia.org/wiki/Join_(SQL)"><u>join</u></a>&rdquo; query and then you can apply both criteria and ordering on your query. Assume that your DB contains many persons and cars so, and you need to rerun only the first 20 results. Almost all RDBMS can handle this retirement easily without any burden on the application. So far so good, but lets see what happens in MongoDB...</p>
<p style="margin-bottom: 0cm">&nbsp;</p>
<p style="margin-bottom: 0cm">MongoDB anatomy is around the notion of documents. Documents are aggregated within collections. You can apply queries on a collection to get back your desired documents accordingly. How would you apply the above model with MongoDB?</p>
<p style="margin-bottom: 0cm">&nbsp;</p>
<p style="margin-bottom: 0cm">Well, we have (at least) two options. The first option is to create a separate collection for the cars and a separate collections for the persons. Nevertheless, this design is turned to be limited in both functionality and performance. MongoDB has no notion of &ldquo;join&rdquo; between collections. So in order to apply this design, you will have to put a &ldquo;person_id&rdquo; reference in the car document. This reference can be used for simple cases, when you have a car and you want to get back the associated person. But our use case is more complicated - We want to &ldquo;cross&rdquo; the collection and apply a criteria on the persons documents and on the cars document and orderer the data (again, on both collections) at the same query. Yes...you are right &ndash; it will NOT go this way...</p>
<p style="margin-bottom: 0cm">&nbsp;</p>
<p style="margin-bottom: 0cm">Lets consider the second option &ndash; Lets put the cars data inside the persons documents. This means that we'll have only one collection &ndash; person collection. MongoDB support this, since you can put array f data inside a document. This demoralization is actually encouraged by MongoDB ,and can boost performance for some use cases, when you want to filter queries from both entities. However there is a limitation in MongoDB &ndash; When you query a collection, you always get back the top level of the document (persons in our case) as your result. This means you can NOT order the results according to the car's model, and the results will NOT reflect our requirement.</p>
<p style="margin-bottom: 0cm">&nbsp;</p>
<p style="margin-bottom: 0cm">I had a correspondence with <a href="http://www.10gen.com/"><u>10gen</u></a>, the company behind MongoDB. Following their suggestion, I <a href="https://jira.mongodb.org/browse/SERVER-3073"><u>opened a new JIRA on it</u>.</a> I also tried to look on other document databases like <a href="http://couchdb.apache.org/"><u>CouchDB</u></a> and <u> <a href="http://en.wikipedia.org/wiki/XML_database">XML databases</a>.</u> They all lack this functionality &ndash; they all miss the cross reference queries. MongoDB is flexible in many cases as RDBMS, and I hope the will close this gap also in future versions.</p>
<p style="margin-bottom: 0cm">&nbsp;</p>
<p style="margin-bottom: 0cm">In summary, MongoDB is a great an flexible database. Maybe the most flexible/function-rich from all NoSQL databases. However the lack of cross reference functionality has no descent answer. I wish they will resolve it soon.</p>
<p>&nbsp;</p>

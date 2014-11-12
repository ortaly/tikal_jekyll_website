---
layout: post
title: MongoDB with .Net
created: 1269252251
author: andrew
permalink: /net/mongodb-net
tags:
- .NET
---
<p>We had a first fuse day in .Net group and I'd like to summarize our findings.</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>The task was to create a non-SQL data access provider for an existing .Net application. We chose to use MongoDB for the database and BlogEngine for the application.</p>
<p>&nbsp;</p>
<p>The first thing we discovered, that there is someone who started the very same effort FOUR hours ago! We looked at what he had so far, and for our relief, he only had empty skeletons of a few classes:&nbsp;http://nosqlproviders.codeplex.com/sourcecontrol/network/Show?projectName=NoSqlProviders&amp;changeSetId=eebb73802e88#BlogEngine.MongoDbProvider%2fMongoDbProvider.cs</p>
<p>&nbsp;</p>
<p>So we made a solution with the following projects: BlogEngine itself, our new project for the provider, and a project for unit tests.</p>
<p>&nbsp;</p>
<p>The data access layer in BlogEngine is separated by BlogProvider&nbsp;interface. So we started with an empty class to implement methods one by one.</p>
<p>&nbsp;</p>
<p>During the work we used intensively sources of two existing providers: DbBlogProvider&nbsp;and XmlBlogProvider.</p>
<p>&nbsp;</p>
<p>The idea of partial class used in XmlBlogProvider was looking useful for our fuse day, as we could work on partial classes in parallel teams. So we just used the same filenames as XmlBlogProvider and implemented the methods using both existing providers as an example of what should be done. To check our new methods we created simple unit tests.</p>
<p>&nbsp;</p>
<p>We really wanted to come up with at least partially working blog engine in the end of the day, so we started the engine with our provider and saw which method throws &quot;not implemented&quot; exception first. After implementing that method, we surely enough got the next not implemented exception, and so on.</p>
<p>&nbsp;</p>
<p>It became clear, that the job can be done fairly easy. The result of our 1 day work in 2 teams (with one person on keyboard in each team) is that we had about 20% of methods implemented, and some of the methods we just copied from XML provider to make the site running for the sake of demonstration. My optimistic estimation is that the remaining job would take about 40 hours.</p>
<p>&nbsp;</p>
<p>The resulting code is available in a &quot;MongoDB&quot; fork of BlogEngine project:&nbsp;http://blogengine.codeplex.com/SourceControl/network</p>
<p>&nbsp;</p>

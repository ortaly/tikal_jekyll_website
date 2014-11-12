---
layout: post
title: Using C# Dynamic with MongoDB
created: 1271233249
permalink: using-c-dynamic-with-mongodb
tags:
- .NET
- MongoDB
- Databases
- .Net Open Source
- Document-oriented database
---
<p>Nice example of using Dynamic in manipulation with&nbsp; MongoDB-CSharp document</p>
<p>&nbsp;</p>
<p>Instead</p>
<pre title="code" class="brush: csharp;">
Document post = new Document(); 
post[&quot;Published&quot;] = DateTime.UtcNow; 
DateTime published = ((DateTime)mongo_post[&quot;Published&quot;]).ToLocalTime();</pre>
<p>&nbsp;</p>
<p>With Dynamic</p>
<pre title="code" class="brush: csharp;">
dynamic post = new Document(); 
post.Published = DateTime.UtcNow; 
DateTime published = mongo_post.Published.ToLocalTime();</pre>
<p>&nbsp;</p>
<p>Dynamic document implementation&nbsp;<a href="http://www.box.net/shared/knqqd9jn9k">http://www.box.net/shared/knqqd9jn9k</a></p>
<p>&nbsp;</p>
<p>Thanks to&nbsp;Scott Watermasysk&nbsp;<a style="color: rgb(51, 51, 153); margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; text-decoration: none; " href="http://scottw.com/mongodb-dynamics">http://scottw.com/mongodb-dynamics</a></p>
<p><code>&nbsp;</code></p>

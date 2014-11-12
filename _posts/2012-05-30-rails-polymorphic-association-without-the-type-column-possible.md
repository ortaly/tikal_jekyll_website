---
layout: post
title: Rails polymorphic association without the type column, possible?
created: 1338394544
author: avit
permalink: /rails-polymorphic-association-without-type-column-possible
tags:
- Ruby
- web
---
<p>These last two weeks has been very hard on me, this post will describe why and how you can help me</p>

<p>Around two weeks ago, I started doing heavy database optimizations on the <a href='http://gogobot.com'>Gogobot</a> website, after a discussion with a DBA from <a href='http://www.percona.com/'>Percona</a>.</p>

<p>Changing the database schema of such a big app is not easy let me tell you, you need to make sure you break nothing, write more tests, unit and integration.</p>

<p>I found out many things about Rails, ActiveRecord and mysql during those 2 weeks, I found creative ways to save many GB on the tables size and on the index size. (posts coming up, I promise).</p>

<p>Now, one of the things (very first things) the DBA mentioned was that the use of polymorphic associations is not recommended in mysql.</p>

<p>Since when you use it, you need two columns item_id, item_type (in most cases).</p>

<p>item_type is a string “Hotel”, “User” etc… and since this is UTF-8 it’s actually taking up lots of space on the row size and on the index size.</p>

<p>Because of mysql limitations, when your row is too big, mysql will fall back to disk, and this is a very bad thing (VERY!)</p>

<p>What he suggested was to move to an enum column in mysql and just have all of our type in the enum, this way you can save lots of time on the query (like 50%) and the index will be much smaller, which will also result in querying straight from the index (if you use the right queries).</p>

<h3 id='to_make_a_long_story_short'>To make a long story short.</h3>

<p>Rails doesn’t support mysql enum column (and boy did it take energy to find out) and for some reason even using the <a href='https://github.com/electronick/enum_column'>enum_column_3</a> gem had errors when dumping the schema to the schema.rb file.</p>

<h3 id='some_air_thinking_time'>Some air, thinking time…</h3>

<p>At Gogobot, we have unique id’s for each object, no model has the same range of id’s as another model, from the id I can have the model type, I don’t need the class name.</p>

<p>We made it so we can simplify API calls and not use a composite id.</p>

<p>Now, we have that, so I was wondering if I could leverage that into using it in the polymorphic associations.</p>

<p>I started going through the AR code, but this is an open call for all you Rails experts out there, can you suggest a solution for this situation?</p>

<p>Comments?</p>

<p>I would love a discussion on that as well…</p>

<p>Thanks</p>
      
    <img src="http://feeds.feedburner.com/~r/KensoDev-en/~4/RYuJBP1Desg" height="1" width="1"/>

---
layout: post
title: Get information about all your mysql database tables with a single query
created: 1338394544
author: avit
permalink: /get-information-about-all-your-mysql-database-tables-single-query
tags:
- Ruby
- web
---
<p>I am working on tweaking our database these days, doing tons of work on making the queries faster, making sure the users are not being delayed by infrastructure stuff.</p>

<p>One piece of info I wanted was to get a quick birds eye view of all the tables I have in the database, how many rows, what is the avg row length (for index purpose), size in MB and the size of the index in MB.</p>

<p>All you need to do is exeucute this query (set the DB name to your database name and you are done).</p>
<notextile><div class='CodeRay'>
  <div class='code'><pre><span class='class'>set</span> <span class='variable'>@database</span>=<span class='string'><span class='delimiter'>'</span><span class='content'>db_name</span><span class='delimiter'>'</span></span>;
<span class='class'>select</span> table_name, 
                <span class='directive'>engine</span>, 
                row_format, 
                table_rows, 
                avg_row_length, 
                (data_length+index_length)/<span class='integer'>1024</span>/<span class='integer'>1024</span> <span class='keyword'>as</span> total_size, 
                (index_length)/<span class='integer'>1024</span>/<span class='integer'>1024</span> <span class='keyword'>as</span> index_size 
        <span class='keyword'>from</span> 
                information_schema.tables 
        <span class='keyword'>where</span> 
                table_schema=<span class='variable'>@database</span> 
        <span class='keyword'>order</span> <span class='keyword'>by</span> 
                <span class='integer'>6</span> <span class='directive'>desc</span>;</pre></div>
</div>
</notextile>
<p>As always, I would love your feedback</p>
      
    <img src="http://feeds.feedburner.com/~r/KensoDev-en/~4/lOOZrNdA7mw" height="1" width="1"/>

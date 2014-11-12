---
layout: post
title: Hibernate setMaxResults on join tables
created: 1356617411
author: chaim.turkel
permalink: /java/blog/hibernate-setmaxresults-join-tables
tags:
- JAVA
- Hibernate
---
<p>&nbsp;<b><span style="font-size:10.0pt;line-height:107%;
font-family:Consolas;color:black">The problem</span></b><span style="font-size:
10.0pt;line-height:107%;font-family:Consolas;color:black">:</span></p>
<p class="MsoNormal"><span style="font-size:10.0pt;line-height:107%;font-family:
Consolas;color:black">Let&rsquo;s say I have a class: Author that has children of multiple books. I would like to retrieve the authors and books, but only want to retrieve the first 10 authors.<o:p></o:p></span></p>
<p class="MsoNormal"><span style="font-size:10.0pt;line-height:107%;font-family:
Consolas;color:black">The hibernate api for this is to use the setMaxResults function. <o:p></o:p></span></p>
<p class="MsoNormal"><span style="font-size:10.0pt;line-height:107%;font-family:
Consolas;color:black">The na&iuml;ve thought would be that if I set the setMaxResults to 10, I will get 10 authors, but this is not true. Since all hibernate commands in the end are sql statements, what the setMaxResults does is to add a LIMIT/TOP (depending on the database) to the sql statement. What then happens is if you have a join in your query like we do, you will not get 10 authors, but actually you will get 10 books (maybe only 5 authors).<o:p></o:p></span></p>
<p class="MsoNormal"><span style="font-size:10.0pt;line-height:107%;font-family:
Consolas;color:black">&nbsp;</span></p>
<p class="MsoNormal"><b><span style="font-size:10.0pt;line-height:107%;
font-family:Consolas;color:black">Solution, Option One</span></b><span style="font-size:10.0pt;line-height:107%;font-family:Consolas;color:black">:<o:p></o:p></span></p>
<p class="MsoNormal"><span style="font-size:10.0pt;line-height:107%;font-family:
Consolas;color:black">The simple solution for this is to create two sql statements. One that will retrieve the first 10 authors id&rsquo;s according to the criteria you want (including on the books). Then add the id&rsquo;s to a basic search and fetch the books with the authors.<o:p></o:p></span></p>
<p class="MsoNormal"><span style="font-size:10.0pt;line-height:107%;font-family:
Consolas;color:black">&nbsp;</span></p>
<p class="MsoNormal"><b><span style="font-size:10.0pt;line-height:107%;
font-family:Consolas;color:black">Solution, Option Two</span></b><span style="font-size:10.0pt;line-height:107%;font-family:Consolas;color:black">:<o:p></o:p></span></p>
<p class="MsoNormal"><span style="font-size:10.0pt;line-height:107%;font-family:
Consolas;color:black">If you need to create the join and fetch already in the query stage, but you only want to retrieve the first 10 records that have unique authors. The next solution I propose for this is to use a cursor. Using a standard query will return all records from the db to the application. Using a cursor you can iterate over the records without bringing them all to the client. Cursors lock the db for more time, but give the option to iterate over the records without retrieving them all. To do this you call .scroll() on the query object or criteria and get a ScrollableResults object. If you are only iterating of the list use the ScrollMode.FORWARD_ONLY option to use less memory and speed the process. <o:p></o:p></span></p>
<p class="MsoNormal"><span style="font-size:10.0pt;line-height:107%;font-family:
Consolas;color:black">Note: you need to make sure that your database supports this, since some databases like mysql fake it and bring the whole data to the client (</span><a href="http://stackoverflow.com/questions/2826319/using-hibernates-scrollableresults-to-slowly-read-90-million-records"><span style="font-size:10.0pt;line-height:107%;font-family:Consolas">http://stackoverflow.com/questions/2826319/using-hibernates-scrollableresults-to-slowly-read-90-million-records</span></a><span style="font-size:10.0pt;line-height:107%;font-family:Consolas;color:black">)<o:p></o:p></span></p>
<p class="MsoNormal"><span style="font-size:10.0pt;line-height:107%;font-family:
Consolas;color:black">&nbsp;</span></p>
<p class="MsoNormal"><b><span style="font-size:10.0pt;line-height:107%;
font-family:Consolas;color:black">Pagination</span></b><span style="font-size:
10.0pt;line-height:107%;font-family:Consolas;color:black">:<o:p></o:p></span></p>
<p class="MsoNormal"><span style="font-size:10.0pt;line-height:107%;font-family:
Consolas;color:black">Some queries use a pagination scheme to get data. The standard way is to call setFirstResult. <o:p></o:p></span></p>
<p class="MsoNormal"><span style="font-size:10.0pt;line-height:107%;font-family:
Consolas;color:black">In the first solution, you need to add the setFirstResult to the query on the id&rsquo;s, and not the query with the fetch.<o:p></o:p></span></p>
<p class="MsoNormal"><span style="font-size:10.0pt;line-height:107%;font-family:
Consolas;color:black">In the second solution this won&rsquo;t work since we are back to the problem that we are counting the rows by ourselves so the setFirstResult won&rsquo;t work either in hibernate query or scroll.<o:p></o:p></span></p>
<p class="MsoNormal"><b><span style="font-size:10.0pt;line-height:107%;
font-family:Consolas;color:black">&nbsp;</span></b></p>
<p class="MsoNormal"><b><span style="font-size:10.0pt;line-height:107%;
font-family:Consolas;color:black">Dialect solution</span></b><span style="font-size:10.0pt;line-height:107%;font-family:Consolas;color:black">:<o:p></o:p></span></p>
<p class="MsoNormal"><span style="font-size:10.0pt;line-height:107%;font-family:
Consolas;color:black">Currently solutions to this issue is on the dialect of the specific database. For example sql server has a row count feature where you can define the field that the sql will add the row count field (a column that has an integer of count according to another field- <a href="http://msdn.microsoft.com/en-us/library/ms186734.aspx">http://msdn.microsoft.com/en-us/library/ms186734.aspx</a>). Then on this field you can use the standard hibernate setMaxResults and setFirstResult.<o:p></o:p></span></p>
<p class="MsoNormal"><span style="font-size:10.0pt;line-height:107%;font-family:
Consolas;color:black">&nbsp;</span></p>
<p class="MsoNormal"><span style="font-size:10.0pt;line-height:107%;font-family:
Consolas;color:black">&nbsp;</span></p>
<p>&nbsp;</p>

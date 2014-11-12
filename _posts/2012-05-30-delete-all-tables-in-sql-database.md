---
layout: post
title: Delete all tables in sql database
created: 1338394544
author: avit
permalink: /delete-all-tables-sql-database
tags:
- Ruby
- web
---
<p>Hi all,</p>

<p>Recently I encountered a bizarre request, I had to delete all the tables from an <a href='http://www.kensodev.com/tag/sql/' target='_blank' title='Sql'>Sql</a> database. The reason is even more bizarre. The client had a system auto creating them without making sure if they exist first. Ao, I had to write some code to first delete all the tables.</p>

<p>I thought maybe other people like me may encounter the same issue, so I wrote some code for it.</p>

<p>The code can either print out the Drop statements for each table or execute it.</p>

<p>Good luck!</p>

<p>Tested on sql server 2005 <pre class='markdown-html-error' style='border: solid 3px red; background-color: pink'>REXML could not parse this XML/HTML: 
<div id="codeSnippetWrapper" style="border: 1px solid silver; padding: 4px; font-size: 8pt; margin: 20px 0px 10px; overflow: auto; width: 97.5%; cursor: text; direction: ltr; max-height: 200px; line-height: 12pt; font-family: &apos;Courier New&apos;,courier,monospace; background-color: #f4f4f4; text-align: left;">
<div id="codeSnippet" style="padding: 0px; font-size: 8pt; overflow: visible; width: 100%; color: black; direction: ltr; border-style: none; line-height: 12pt; font-family: &apos;Courier New&apos;,courier,monospace; background-color: #f4f4f4; text-align: left;">
<pre style="padding: 0px; font-size: 8pt; margin: 0em; overflow: visible; width: 100%; color: black; direction: ltr; border-style: none; line-height: 12pt; font-family: &apos;Courier New&apos;,courier,monospace; background-color: white; text-align: left;"><span id="lnum1" style="color: #606060;">   1:</span> <span style="color: #0000ff;">DECLARE</span> @dropSql nvarchar(1000)</pre>
<!--CRLF-->
<pre style="padding: 0px; font-size: 8pt; margin: 0em; overflow: visible; width: 100%; color: black; direction: ltr; border-style: none; line-height: 12pt; font-family: &apos;Courier New&apos;,courier,monospace; background-color: #f4f4f4; text-align: left;"><span id="lnum2" style="color: #606060;">   2:</span> <span style="color: #0000ff;">DECLARE</span> DropSequence <span style="color: #0000ff;">CURSOR</span> <span style="color: #0000ff;">LOCAL</span> FAST_FORWARD</pre>
<!--CRLF-->
<pre style="padding: 0px; font-size: 8pt; margin: 0em; overflow: visible; width: 100%; color: black; direction: ltr; border-style: none; line-height: 12pt; font-family: &apos;Courier New&apos;,courier,monospace; background-color: white; text-align: left;"><span id="lnum3" style="color: #606060;">   3:</span></pre>
<!--CRLF-->
<pre style="padding: 0px; font-size: 8pt; margin: 0em; overflow: visible; width: 100%; color: black; direction: ltr; border-style: none; line-height: 12pt; font-family: &apos;Courier New&apos;,courier,monospace; background-color: #f4f4f4; text-align: left;"><span id="lnum4" style="color: #606060;">   4:</span> <span style="color: #0000ff;">FOR</span></pre>
<!--CRLF-->
<pre style="padding: 0px; font-size: 8pt; margin: 0em; overflow: visible; width: 100%; color: black; direction: ltr; border-style: none; line-height: 12pt; font-family: &apos;Courier New&apos;,courier,monospace; background-color: white; text-align: left;"><span id="lnum5" style="color: #606060;">   5:</span>     <span style="color: #0000ff;">SELECT</span></pre>
<!--CRLF-->
<pre style="padding: 0px; font-size: 8pt; margin: 0em; overflow: visible; width: 100%; color: black; direction: ltr; border-style: none; line-height: 12pt; font-family: &apos;Courier New&apos;,courier,monospace; background-color: #f4f4f4; text-align: left;"><span id="lnum6" style="color: #606060;">   6:</span>         N<span style="color: #006080;">&apos;DROP TABLE &apos;</span> + QUOTENAME(TABLE_SCHEMA) + N<span style="color: #006080;">&apos;.&apos;</span> + QUOTENAME(TABLE_NAME)</pre>
<!--CRLF-->
<pre style="padding: 0px; font-size: 8pt; margin: 0em; overflow: visible; width: 100%; color: black; direction: ltr; border-style: none; line-height: 12pt; font-family: &apos;Courier New&apos;,courier,monospace; background-color: white; text-align: left;"><span id="lnum7" style="color: #606060;">   7:</span>     <span style="color: #0000ff;">FROM</span></pre>
<!--CRLF-->
<pre style="padding: 0px; font-size: 8pt; margin: 0em; overflow: visible; width: 100%; color: black; direction: ltr; border-style: none; line-height: 12pt; font-family: &apos;Courier New&apos;,courier,monospace; background-color: #f4f4f4; text-align: left;"><span id="lnum8" style="color: #606060;">   8:</span>         INFORMATION_SCHEMA.TABLES</pre>
<!--CRLF-->
<pre style="padding: 0px; font-size: 8pt; margin: 0em; overflow: visible; width: 100%; color: black; direction: ltr; border-style: none; line-height: 12pt; font-family: &apos;Courier New&apos;,courier,monospace; background-color: white; text-align: left;"><span id="lnum9" style="color: #606060;">   9:</span>     <span style="color: #0000ff;">WHERE</span></pre>
<!--CRLF-->
<pre style="padding: 0px; font-size: 8pt; margin: 0em; overflow: visible; width: 100%; color: black; direction: ltr; border-style: none; line-height: 12pt; font-family: &apos;Courier New&apos;,courier,monospace; background-color: #f4f4f4; text-align: left;"><span id="lnum10" style="color: #606060;">  10:</span>         TABLE_TYPE = <span style="color: #006080;">&apos;BASE TABLE&apos;</span></pre>
<!--CRLF-->
<pre style="padding: 0px; font-size: 8pt; margin: 0em; overflow: visible; width: 100%; color: black; direction: ltr; border-style: none; line-height: 12pt; font-family: &apos;Courier New&apos;,courier,monospace; background-color: white; text-align: left;"><span id="lnum11" style="color: #606060;">  11:</span>             <span style="color: #0000ff;">AND</span></pre>
<!--CRLF-->
<pre style="padding: 0px; font-size: 8pt; margin: 0em; overflow: visible; width: 100%; color: black; direction: ltr; border-style: none; line-height: 12pt; font-family: &apos;Courier New&apos;,courier,monospace; background-color: #f4f4f4; text-align: left;"><span id="lnum12" style="color: #606060;">  12:</span>         OBJECTPROPERTY(OBJECT_ID(QUOTENAME(TABLE_SCHEMA) + N<span style="color: #006080;">&apos;.&apos;</span> + QUOTENAME(TABLE_NAME)), <span style="color: #006080;">&apos;IsMSShipped&apos;</span>) = 0</pre>
<!--CRLF-->
<pre style="padding: 0px; font-size: 8pt; margin: 0em; overflow: visible; width: 100%; color: black; direction: ltr; border-style: none; line-height: 12pt; font-family: &apos;Courier New&apos;,courier,monospace; background-color: white; text-align: left;"><span id="lnum13" style="color: #606060;">  13:</span></pre>
<!--CRLF-->
<pre style="padding: 0px; font-size: 8pt; margin: 0em; overflow: visible; width: 100%; color: black; direction: ltr; border-style: none; line-height: 12pt; font-family: &apos;Courier New&apos;,courier,monospace; background-color: #f4f4f4; text-align: left;"><span id="lnum14" style="color: #606060;">  14:</span>     <span style="color: #0000ff;">OPEN</span> DropSequence</pre>
<!--CRLF-->
<pre style="padding: 0px; font-size: 8pt; margin: 0em; overflow: visible; width: 100%; color: black; direction: ltr; border-style: none; line-height: 12pt; font-family: &apos;Courier New&apos;,courier,monospace; background-color: white; text-align: left;"><span id="lnum15" style="color: #606060;">  15:</span>     <span style="color: #0000ff;">WHILE</span> 1 = 1</pre>
<!--CRLF-->
<pre style="padding: 0px; font-size: 8pt; margin: 0em; overflow: visible; width: 100%; color: black; direction: ltr; border-style: none; line-height: 12pt; font-family: &apos;Courier New&apos;,courier,monospace; background-color: #f4f4f4; text-align: left;"><span id="lnum16" style="color: #606060;">  16:</span>         <span style="color: #0000ff;">BEGIN</span></pre>
<!--CRLF-->
<pre style="padding: 0px; font-size: 8pt; margin: 0em; overflow: visible; width: 100%; color: black; direction: ltr; border-style: none; line-height: 12pt; font-family: &apos;Courier New&apos;,courier,monospace; background-color: white; text-align: left;"><span id="lnum17" style="color: #606060;">  17:</span>             <span style="color: #0000ff;">FETCH</span> <span style="color: #0000ff;">NEXT</span> <span style="color: #0000ff;">FROM</span> DropSequence <span style="color: #0000ff;">INTO</span> @dropSql</pre>
<!--CRLF-->
<pre style="padding: 0px; font-size: 8pt; margin: 0em; overflow: visible; width: 100%; color: black; direction: ltr; border-style: none; line-height: 12pt; font-family: &apos;Courier New&apos;,courier,monospace; background-color: #f4f4f4; text-align: left;"><span id="lnum18" style="color: #606060;">  18:</span></pre>
<!--CRLF-->
<pre style="padding: 0px; font-size: 8pt; margin: 0em; overflow: visible; width: 100%; color: black; direction: ltr; border-style: none; line-height: 12pt; font-family: &apos;Courier New&apos;,courier,monospace; background-color: white; text-align: left;"><span id="lnum19" style="color: #606060;">  19:</span>                 <span style="color: #0000ff;">IF</span> <span style="color: #cc6633;">@@FETCH_STATUS</span> &lt;&gt; 0 <span style="color: #0000ff;">BREAK</span></pre>
<!--CRLF-->
<pre style="padding: 0px; font-size: 8pt; margin: 0em; overflow: visible; width: 100%; color: black; direction: ltr; border-style: none; line-height: 12pt; font-family: &apos;Courier New&apos;,courier,monospace; background-color: #f4f4f4; text-align: left;"><span id="lnum20" style="color: #606060;">  20:</span>                     <span style="color: #0000ff;">RAISERROR</span> (@dropSql , 0, 1) <span style="color: #0000ff;">WITH</span> NOWAIT</pre>
<!--CRLF-->
<pre style="padding: 0px; font-size: 8pt; margin: 0em; overflow: visible; width: 100%; color: black; direction: ltr; border-style: none; line-height: 12pt; font-family: &apos;Courier New&apos;,courier,monospace; background-color: white; text-align: left;"><span id="lnum21" style="color: #606060;">  21:</span></pre>
<!--CRLF-->
<pre style="padding: 0px; font-size: 8pt; margin: 0em; overflow: visible; width: 100%; color: black; direction: ltr; border-style: none; line-height: 12pt; font-family: &apos;Courier New&apos;,courier,monospace; background-color: #f4f4f4; text-align: left;"><span id="lnum22" style="color: #606060;">  22:</span>             --<span style="color: #0000ff;">EXEC</span>(@dropSql )</pre>
<!--CRLF-->
<pre style="padding: 0px; font-size: 8pt; margin: 0em; overflow: visible; width: 100%; color: black; direction: ltr; border-style: none; line-height: 12pt; font-family: &apos;Courier New&apos;,courier,monospace; background-color: white; text-align: left;"><span id="lnum23" style="color: #606060;">  23:</span>             <span style="color: #0000ff;">PRINT</span> @dropSql</pre>
<!--CRLF-->
<pre style="padding: 0px; font-size: 8pt; margin: 0em; overflow: visible; width: 100%; color: black; direction: ltr; border-style: none; line-height: 12pt; font-family: &apos;Courier New&apos;,courier,monospace; background-color: #f4f4f4; text-align: left;"><span id="lnum24" style="color: #606060;">  24:</span>         <span style="color: #0000ff;">END</span></pre>
<!--CRLF-->
<pre style="padding: 0px; font-size: 8pt; margin: 0em; overflow: visible; width: 100%; color: black; direction: ltr; border-style: none; line-height: 12pt; font-family: &apos;Courier New&apos;,courier,monospace; background-color: white; text-align: left;"><span id="lnum25" style="color: #606060;">  25:</span></pre>
<!--CRLF-->
<pre style="padding: 0px; font-size: 8pt; margin: 0em; overflow: visible; width: 100%; color: black; direction: ltr; border-style: none; line-height: 12pt; font-family: &apos;Courier New&apos;,courier,monospace; background-color: #f4f4f4; text-align: left;"><span id="lnum26" style="color: #606060;">  26:</span> <span style="color: #0000ff;">CLOSE</span> DropSequence</pre>
<!--CRLF-->
<pre style="padding: 0px; font-size: 8pt; margin: 0em; overflow: visible; width: 100%; color: black; direction: ltr; border-style: none; line-height: 12pt; font-family: &apos;Courier New&apos;,courier,monospace; background-color: white; text-align: left;"><span id="lnum27" style="color: #606060;">  27:</span> <span style="color: #0000ff;">DEALLOCATE</span> DropSequence</pre>
<!--CRLF--></pre></p>
<pre class='markdown-html-error' style='border: solid 3px red; background-color: pink'>REXML could not parse this XML/HTML: 
</div></pre><pre class='markdown-html-error' style='border: solid 3px red; background-color: pink'>REXML could not parse this XML/HTML: 
</div></pre>
      
    <img src="http://feeds.feedburner.com/~r/KensoDev-en/~4/tanw5dCRZrk" height="1" width="1"/>

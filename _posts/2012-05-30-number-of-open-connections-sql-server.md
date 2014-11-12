---
layout: post
title: Number of open connections SQL server
created: 1338394544
author: avit
permalink: /number-open-connections-sql-server
tags:
- Ruby
- web
---
<p>Hi all,</p>

<p>Normally, when you’re coding on a website or a system you’re probably using connection to an <a href='http://www.kensodev.com/tag/sql-server/' target='_blank' title='Sql Server'>SQL server</a> database.</p>

<p>When you are the coder or you are a consultant coming to a company to check the code or the server or anything else for that matter, you sometimes need to check the number of connections that are open right now.</p>

<p>This can be done to check the quality of the code regarding connections. If the code does not close the connections, eventually the server will close the pool and the website will no longer work. I have seen people solving that by upping the number of allowed open connections. That of course is not the solution (not the best solution).</p>

<p>OK, so if you are like me and you are running 1-9 servers that are dedicated to you, each running dozens or hundreds of DB’s, this is an absolutely great method to catch a glimpse on whats going on with your connections.</p>

<p>Run this code on your server and see what happens: <pre class='markdown-html-error' style='border: solid 3px red; background-color: pink'>REXML could not parse this XML/HTML: 
<div id="codeSnippetWrapper" style="border: 1px solid silver; margin: 20px 0px 10px; padding: 4px; overflow: auto; text-align: left; line-height: 12pt; background-color: #f4f4f4; width: 97.5%; font-family: &apos;Courier New&apos;,courier,monospace; direction: ltr; max-height: 200px; font-size: 8pt; cursor: text;">
<div id="codeSnippet" style="border-style: none; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: #f4f4f4; width: 100%; font-family: &apos;Courier New&apos;,courier,monospace; direction: ltr; color: black; font-size: 8pt;">
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: white; width: 100%; font-family: &apos;Courier New&apos;,courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum1" style="color: #606060;"> 1:</span> <span style="color: #0000ff;">SELECT</span> DB_NAME(dbid) <span style="color: #0000ff;">as</span> <span style="color: #006080;">&apos;DbNAme&apos;</span>, <span style="color: #0000ff;">COUNT</span>(dbid) <span style="color: #0000ff;">as</span> <span style="color: #006080;">&apos;Connections&apos;</span> <span style="color: #0000ff;">from</span> master.dbo.sysprocesses <span style="color: #0000ff;">with</span> (nolock)</pre>
&nbsp;
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: #f4f4f4; width: 100%; font-family: &apos;Courier New&apos;,courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum2" style="color: #606060;"> 2:</span> <span style="color: #0000ff;">WHERE</span> dbid &gt; 0</pre>
&nbsp;
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: white; width: 100%; font-family: &apos;Courier New&apos;,courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum3" style="color: #606060;"> 3:</span> <span style="color: #0000ff;">GROUP</span> <span style="color: #0000ff;">BY</span> dbid</pre>
&nbsp;</pre></p>
<pre class='markdown-html-error' style='border: solid 3px red; background-color: pink'>REXML could not parse this XML/HTML: 
</div></pre><pre class='markdown-html-error' style='border: solid 3px red; background-color: pink'>REXML could not parse this XML/HTML: 
</div></pre>
<p>This code will display a list of all the databases on your server with the open connections on each of them.</p>

<p>For security reasons I can’t show the entire result set, but here’s a sneak peak:</p>
<a href='http://www.kensodev.com/wp-content/uploads/2009/06/622200965136PM.png'><img alt='6-22-2009 6-51-36 PM' border='0' height='94' src='http://www.kensodev.com/wp-content/uploads/2009/06/622200965136PM_thumb.png' style='display: inline; border: 0px;' title='6-22-2009 6-51-36 PM' width='240' /></a>
<p>** This was checked on SQL server 2005/2008 both express and full versions.</p>

<p>Good luck!</p>
      
    <img src="http://feeds.feedburner.com/~r/KensoDev-en/~4/f46Kndhlg68" height="1" width="1"/>

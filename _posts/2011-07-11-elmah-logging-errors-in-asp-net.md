---
layout: post
title: ELMAH - Logging errors in ASP.NET
created: 1310367976
author: igorz
permalink: /net/elmah-logging-errors-aspnet
tags:
- .NET
- .Net Open Source
- ASP.NET
---
<p>Catching and logging unhandled exceptions is one of the first tasks in developing an ASP.NET application.</p>
<p>Typically you put code which handles exceptions into Global.asax:</p>
<div style="clear: both; text-align: center;" class="separator">&nbsp;<a style="margin-left: 1em; margin-right: 1em;" imageanchor="1" href="http://2.bp.blogspot.com/-ipWa6qQZZ5Y/ThqIpbl-bCI/AAAAAAAALJ0/Sq5N2y7lTGI/s1600/2011-07-11+08h21_52.png"><img border="0" src="http://2.bp.blogspot.com/-ipWa6qQZZ5Y/ThqIpbl-bCI/AAAAAAAALJ0/Sq5N2y7lTGI/s1600/2011-07-11+08h21_52.png" alt="" /></a></div>
<p>The are many ways to report an error: you may write it into a database, send an email or store it in memory.&nbsp; I got tired of copying such code from one app to another and finally found a component that allows me to handle errors in a code-less way. It is <a href="http://code.google.com/p/elmah/">ELMAH</a></p>
<p>ELMAH provides an HttpModule which does exactly the same work that I previously used to do.<br />
All I need is to configure its behavior in Web.config.</p>
<p><b>Installing ELMAH</b></p>
<p>The easiest way to install ELMAH is using <a href="http://nuget.codeplex.com/">NuGet</a>.<br />
I am not familiar with the command line and always prefer a graphic UI, so I used its this one:</p>
<div style="clear: both; text-align: center;" class="separator"><a style="margin-left: 1em; margin-right: 1em;" imageanchor="1" href="http://3.bp.blogspot.com/-u9zLfT3dYC8/ThqNKW8w8iI/AAAAAAAALJ4/pc-m_GCJnsw/s1600/2011-07-11+08h41_13.png"><img width="640" height="393" border="0" src="http://3.bp.blogspot.com/-u9zLfT3dYC8/ThqNKW8w8iI/AAAAAAAALJ4/pc-m_GCJnsw/s640/2011-07-11+08h41_13.png" alt="" /></a></div>
<p>Search for ELMAH package:</p>
<div style="clear: both; text-align: center;" class="separator"><a style="clear: left; float: left; margin-bottom: 1em; margin-right: 1em;" imageanchor="1" href="http://1.bp.blogspot.com/-VMm0O09zJlo/ThqOWGhSWVI/AAAAAAAALJ8/WjmGTsSEFU4/s1600/2011-07-11+08h45_56.png"><img width="640" height="360" border="0" src="http://1.bp.blogspot.com/-VMm0O09zJlo/ThqOWGhSWVI/AAAAAAAALJ8/WjmGTsSEFU4/s640/2011-07-11+08h45_56.png" alt="" /></a></div>
<p>Select ELMAH, click '<i>Install</i>' - that's it.</p>
<p><b>ELMAH in action</b></p>
<p>Any time you have an unhandled exception you see the &quot;yellow screen of death&quot;:</p>
<p>&nbsp;</p>
<div style="clear: both; text-align: center;" class="separator"><a style="margin-left: 1em; margin-right: 1em;" imageanchor="1" href="http://1.bp.blogspot.com/-o-0Ay5LQ800/ThqRcNGBBII/AAAAAAAALKA/rfiz1SEf0_Y/s1600/2011-07-11+08h57_12.png"><img width="640" height="460" border="0" src="http://1.bp.blogspot.com/-o-0Ay5LQ800/ThqRcNGBBII/AAAAAAAALKA/rfiz1SEf0_Y/s640/2011-07-11+08h57_12.png" alt="" /></a></div>
<p>&nbsp;</p>
<p>At the same time the ELMAH module has captured this exception along with all related data and gives you simple web access to the recent errors logged (by default at /elmah.axd)</p>
<div style="clear: both; text-align: center;" class="separator"><a style="margin-left: 1em; margin-right: 1em;" imageanchor="1" href="http://2.bp.blogspot.com/-vOyIdtgLSqg/ThqR6uHOEQI/AAAAAAAALKE/CD40r-5an2Y/s1600/2011-07-11+08h57_26.png"><img width="640" height="212" border="0" src="http://2.bp.blogspot.com/-vOyIdtgLSqg/ThqR6uHOEQI/AAAAAAAALKE/CD40r-5an2Y/s640/2011-07-11+08h57_26.png" alt="" /></a></div>
<div style="clear: both; text-align: center;" class="separator"><a style="margin-left: 1em; margin-right: 1em;" imageanchor="1" href="http://4.bp.blogspot.com/-UZbzsDYtWrk/ThqR8Jy8IfI/AAAAAAAALKI/IXTRxY9vR9Q/s1600/2011-07-11+08h57_59.png"><img width="551" height="640" border="0" src="http://4.bp.blogspot.com/-UZbzsDYtWrk/ThqR8Jy8IfI/AAAAAAAALKI/IXTRxY9vR9Q/s640/2011-07-11+08h57_59.png" alt="" /></a></div>
<p><b>Configuration</b></p>
<p>By default ELMAH stores logs in memory, but it supports XML and database storages.<br />
Go back to the NuGet package manager and select one of these additional packages: 'ELMA on XML Log', 'ELMA on MS Sql Server Compact', 'ELMAH on MongoDB', etc.</p>
<p>The selected storage appears in <elmah> sections in Web.config:</elmah></p>
<div style="clear: both; text-align: center;" class="separator"><a style="margin-left: 1em; margin-right: 1em;" imageanchor="1" href="http://2.bp.blogspot.com/-fVFAY5B13iA/ThqWNBl8HKI/AAAAAAAALKM/H8IXaO8Bwfg/s1600/2011-07-11+09h19_52.png"><img border="0" src="http://2.bp.blogspot.com/-fVFAY5B13iA/ThqWNBl8HKI/AAAAAAAALKM/H8IXaO8Bwfg/s1600/2011-07-11+09h19_52.png" alt="" /></a></div>
<p>I assume that it is possible to implement a custom logger by deriving the <i>Elmah.ErrorLog </i>class</p>
<p><b>Log an expected exception</b></p>
<p>ELMAH allows to log<b> </b>any exception from your code.</p>
<p>For example if you have a code flow which might throw an exception and you gracefully handle it (e.g. with a <i>try/catch</i> block). Such a swallowed exception will not be propagated and logged by the ELMAH module. For such a case ELMAH provides the <i>ErrorSignal</i> API:</p>
<div style="clear: both; text-align: center;" class="separator"><a style="margin-left: 1em; margin-right: 1em;" imageanchor="1" href="http://3.bp.blogspot.com/-jZoiI5uy1eY/ThqZfS4si7I/AAAAAAAALKU/XghdRpApblI/s1600/2011-07-11+09h34_28.png"><img border="0" src="http://3.bp.blogspot.com/-jZoiI5uy1eY/ThqZfS4si7I/AAAAAAAALKU/XghdRpApblI/s1600/2011-07-11+09h34_28.png" alt="" /></a></div>
<p><b>More features</b></p>
<p><b>&nbsp;</b>ELMAH has a lot more features, which are not part of this short overview. You can:</p>
<ul>
    <li>Filter unwanted exceptions, programmatically and via configuration.</li>
    <li>Get a digest RSS feed that lists errors by day and up to last 15 days.&nbsp;</li>
    <li>Send error notifications as tweets to Twitter.</li>
    <li>Send an e-mail notification of each error at the time it occurs.&nbsp;</li>
    <li>and <a href="http://code.google.com/p/elmah/">more</a>...</li>
</ul>

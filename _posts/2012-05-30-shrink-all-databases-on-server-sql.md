---
layout: post
title: Shrink all databases on server (sql)
created: 1338394544
author: avit
permalink: /shrink-all-databases-server-sql
tags:
- Ruby
- web
---
<a href='http://www.kensodev.com/2010/01/16/shrink-all-databases-on-server-sql/istock_000010274670xsmall/' rel='attachment wp-att-302'><img alt='Database server' class='alignleft size-thumbnail wp-image-302' height='150' src='http://www.kensodev.com/wp-content/uploads/2010/01/iStock_000010274670XSmall-150x150.jpg' title='Database server' width='150' /></a>
<p>About a month ago, I got a call from a client of mine saying he has 2 database servers, each holding about 150 databases.</p>

<p>The servers were both SQL Server 2008, he had 2 HD’s with 74GB each and there was absolutely no space on any of them.</p>

<p>After a short research I found that the backup files were absolutely huge and fill the disk up to a point that the server had no space to store any more data and the website connected to that database crashed.</p>

<p>Without going too much into details why these things happen (bad programming) I will give you a method to fix this.</p>

<p>It is recommended to backup your databases to an external HD before doing this, this way you will have the full backup at all times. <!--more--></p>

<p>Simply run this script, your databases (all of them) will shrink the log file, creating more room on the HD for you to use.</p>

<p>Good luck</p>
<script src='http://gist.github.com/267427.js' />
      
    <img src="http://feeds.feedburner.com/~r/KensoDev-en/~4/0QwGRiRIG-8" height="1" width="1"/>

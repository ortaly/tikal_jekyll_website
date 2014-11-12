---
layout: post
title: How to push large size working copy into a git repository
created: 1362915859
author: gil
permalink: /devops/how-push-large-size-working-copy-git-repository
tags:
- DevOps
- git
---
<p>While working with GIT I have encountered something I haven&#39;t dealt with in SVN.</p>
<p>I had a very big working copy with very big files (up to 1 GB of size). The total size of the working copy was 10 GB.</p>
<p>After long time investigating and trial and error, I have found out that GIT cannot handle big chunks of data to be pushed so I have tried to add/commit/push only half of the data and then only quarter&nbsp;and so on. Till I got to a point that I have tried to push one file with the size of 800 MB and couldn&#39;t.</p>
<p>The error message of both command line and using tortoise SVN on a windows machine was:</p>
<p><strong>fatal: Out of memory, realloc failed&nbsp;</strong></p>
<p>While on linux machine the error message was:</p>
<p><b style="font-family: arial, sans-serif; font-size: 13px;">PUT &lt;SHA1&gt;&nbsp;failed, aborting (22/500)</b></p>
<p>&nbsp;</p>
<p><font face="arial, sans-serif" size="2">After some more googling I have found that there&#39;s a git client configuration that allows configurable size of chunks to be pushed to the remote repostory. This configuration is part of the .git/config file. Configuration is as follows:</font></p>
<p><b style="font-family: arial, sans-serif; font-size: 13px;">[http]</b></p>
<div style="font-family: arial, sans-serif; font-size: 13px;">
	<b>&nbsp; &nbsp; &nbsp;postBuffer = 629145600</b></div>
<div style="font-family: arial, sans-serif; font-size: 13px;">
	&nbsp;</div>
<div style="font-family: arial, sans-serif; font-size: 13px;">
	The above sets the maximum size of a chunk to be pushed to 6 GB. After the above configuration I have managed to push my working copy in two chunks of 5 GB each.</div>

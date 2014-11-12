---
layout: post
title: Find truncated string (paths) in SQL server
created: 1338394544
author: avit
permalink: /find-truncated-string-paths-sql-server
tags:
- Ruby
- web
---
<p>I recently encountered a strange bug on a database of a client, which I designed. The “bug” was that the paths he entered into the database got truncated, because it was too long of a string. I made the field length at 250 chars and he needed more.</p>

<p>The problem was he already submitted quite some data into the database and could not remember where the paths were extra long. So, I needed to find it for him so he could re-submit those.</p>

<p>I scratched my head for a couple of minutes on how can I find those truncated strings, it could be quite difficult, because it’s a path to an MP3 file, I found a way to do it with a simple T-SQL script.</p>

<p>What I did was to simply find all of the song-paths that did not have an “.mp3” at the end.</p>

<p>This is the script:</p>

<p><span>sql</span> SELECT layerID, layerName, mp3FileUrl FROM appLayers WHERE ( mp3FileUrl NOT LIKE ‘%.mp3’ ) <span>/sql</span></p>

<p>An example result /Maximum_Basof_Nipol/Od_Paam/Acc Gtr Chorus St 2.m</p>
      
    <img src="http://feeds.feedburner.com/~r/KensoDev-en/~4/2EkGX6PUnPM" height="1" width="1"/>

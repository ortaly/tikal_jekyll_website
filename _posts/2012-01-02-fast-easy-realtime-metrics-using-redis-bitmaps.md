---
layout: post
title: ' Fast, easy, realtime metrics using Redis bitmaps'
created: 1325494381
author: dor
permalink: /fast-easy-realtime-metrics-using-redis-bitmaps
tags:
- Incubator
- performance redis stats nosql
---
<blockquote>
<p>&nbsp;<span style="background-image: initial; background-attachment: initial; background-origin: initial; background-clip: initial; color: rgb(51, 51, 51); font-family: Verdana, Arial, Helvetica, sans-serif; font-size: 13px; line-height: 23px; ">At&nbsp;</span><a href="http://www.getspool.com/" target="_blank" style="color: rgb(29, 156, 172); text-decoration: underline; background-image: initial; background-attachment: initial; background-origin: initial; background-clip: initial; border-top-width: 0px; border-right-width: 0px; border-bottom-width: 0px; border-left-width: 0px; border-style: initial; border-color: initial; border-image: initial; font-size: 13px; outline-width: 0px; outline-style: initial; outline-color: initial; vertical-align: baseline; font-family: Verdana, Arial, Helvetica, sans-serif; line-height: 23px; ">Spool</a><span style="color: rgb(51, 51, 51); font-family: Verdana, Arial, Helvetica, sans-serif; font-size: 13px; line-height: 23px; ">, we calculate our key metrics in real time. Traditionally, metrics are performed by a batch job (running hourly, daily, etc.). Redis backed bitmaps allow us to perform such calculations in realtime and are extremely space efficient. In a simulation of 128 million users, a typical metric such as &ldquo;daily unique users&rdquo; takes less than 50 ms on a MacBook Pro and only takes 16 MB of memory. Spool doesn&rsquo;t have 128 million users yet but it&rsquo;s nice to know our approach will scale. We thought we&rsquo;d share how we do it, in case other startups find our approach useful.</span></p>
</blockquote>

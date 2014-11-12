---
layout: post
title: Re-Queue failed jobs with Resque
created: 1338394544
author: avit
permalink: /re-queue-failed-jobs-resque
tags:
- Ruby
- web
---
<p>I have been working with resque for about 1-2 months now, while migrating an application from rails 2 to rails 3, I have switched from Delayed Jobs almost completely.</p>

<p>Sometimes, your workers / jobs fail and you need to re-queue them.</p>

<p>The trick is to requeue the job and remove it from the failed stats, this way, if it will fail again, the next time you re-queue the job will not be executed twice.</p>

<p>Here’s the code (from a rake task I have)</p>
<div class='highlight'><pre><code class='ruby'><span class='p'>(</span><span class='no'>Resque</span><span class='o'>::</span><span class='no'>Failure</span><span class='o'>.</span><span class='n'>count</span><span class='o'>-</span><span class='mi'>1</span><span class='p'>)</span><span class='o'>.</span><span class='n'>downto</span><span class='p'>(</span><span class='mi'>0</span><span class='p'>)</span><span class='o'>.</span><span class='n'>each</span> <span class='p'>{</span><span class='o'>|</span><span class='n'>i</span><span class='o'>|</span>
  <span class='k'>begin</span>
    <span class='no'>Resque</span><span class='o'>::</span><span class='no'>Failure</span><span class='o'>.</span><span class='n'>requeue</span><span class='p'>(</span><span class='n'>i</span><span class='p'>)</span>
    <span class='no'>Resque</span><span class='o'>::</span><span class='no'>Failure</span><span class='o'>.</span><span class='n'>remove</span><span class='p'>(</span><span class='n'>i</span><span class='p'>)</span>
  <span class='k'>rescue</span> <span class='no'>Exception</span> <span class='o'>=></span> <span class='n'>e</span>
    <span class='nb'>puts</span> <span class='n'>e</span>
  <span class='k'>end</span>
<span class='p'>}</span>
<span class='nb'>sleep</span><span class='p'>(</span><span class='mi'>5</span><span class='o'>.</span><span class='n'>minutes</span><span class='p'>)</span>
</code></pre>
</div>
<p>I have this rake running every X minutes and requeing failed tasks. If a task keeps failing, then I can check the code in depth and check what the problem is, but sometimes it’s just failing due to HTTP error or something else not related to the code.</p>

<p>Hope this helps.</p>

<p>Drop me a line if it does or you have questions and comments.</p>
      
    <img src="http://feeds.feedburner.com/~r/KensoDev-en/~4/0Evw5H5RV3A" height="1" width="1"/>

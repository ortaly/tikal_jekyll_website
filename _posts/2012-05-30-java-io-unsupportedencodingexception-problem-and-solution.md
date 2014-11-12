---
layout: post
title: java.io.UnsupportedEncodingException problem & solution
created: 1338394544
author: avit
permalink: /javaiounsupportedencodingexception-problem-solution
tags:
- Ruby
- web
---
<p>As a <a href='http://www.kensodev.com/2011/09/17/kill-all-resque-workers-with-a-single-command/' target='_blank' title='web developer'>web developer</a>, I’m working on lots of things. Today, while working on a windows machine and trying to run an ANT task and then run JBoss to test my build, I encountered this error:</p>
<div class='highlight'><pre><code class='bash'>java.io.UnsupportedEncodingException: cp1255
</code></pre>
</div>
<p>After quite some time of Googling and finding nothing, I remembered I changed my regional settings on the machine to use Hebrew as the locale. This appeared to be a mistake. Once I changed the locale back to English (USA) everything got back to normal and worked absolutely fine (as always).</p>

<p>So, the conclusion is: When you get this error, verify that the machine you are using is set to English Locale and not other locales.</p>

<p>Hope this saves you some time, I know I pulled more then a couple of hairs to find out what is causing this issue.</p>
      
    <img src="http://feeds.feedburner.com/~r/KensoDev-en/~4/bM33grFPuLM" height="1" width="1"/>

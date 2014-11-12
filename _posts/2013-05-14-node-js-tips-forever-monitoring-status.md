---
layout: post
title: Node.js tips, forever monitoring status
created: 1368517346
author: shachari
permalink: node-js-tips-forever-monitoring-status
tags:
- JS
- nodejs
- forever
- bash
---
<p>If you using <a href="https://github.com/nodejitsu/forever">forever </a>to ensuring that a given script runs continuously you probably know that there is no option to check if specific app is already running or not.</p>
<p>simplest solution we are using is simply to grep the &#39;forever list&#39;</p>
<p><em>&gt;&gt; forever list | grep $APP_FILE | wc -l | sed -e &#39;s/1/App Running/&#39; | sed -e &#39;s/0/App not started/&#39;</em></p>
<p>Additional tip: When starting monitoring with forever use full path to your server.js file.</p>

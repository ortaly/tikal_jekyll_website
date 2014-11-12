---
layout: post
title: Copy files from remote server to your local box
created: 1338394544
author: avit
permalink: /copy-files-remote-server-your-local-box
tags:
- Ruby
- web
---
<p>I work a lot with remote servers (as any developer working with production).</p>

<p>Sometimes, I want to download a file from the remote server to my local box, this includes log files, maybe some mysql backup or generally any other file.</p>

<p>I can’t copy the file to an HTTP accessible location and download since all of the servers are behind a load balancer and it will probably get to a 404.</p>

<p>To copy a file from a remote server to my local box I use this</p>

<p><div class='highlight'><pre><code class='bash'>scp <span class='o'>{</span>username<span class='o'>}</span>@<span class='o'>{</span>server_address<span class='o'>}</span>:<span class='o'>{</span>file_location<span class='o'>}</span> .
</code></pre>
</div></p>

<p>Sometimes your server requires a key file</p>

<p><div class='highlight'><pre><code class='bash'>scp -i <span class='o'>{</span>key_file_location<span class='o'>}</span> <span class='o'>{</span>username<span class='o'>}</span>@<span class='o'>{</span>server_address<span class='o'>}</span>:<span class='o'>{</span>file_location<span class='o'>}</span> .
</code></pre>
</div></p>

<p>For the times when you need something quick, just to download a log file and continue with it, this works out great.</p>
      
    <img src="http://feeds.feedburner.com/~r/KensoDev-en/~4/y-_SdJNpCH8" height="1" width="1"/>

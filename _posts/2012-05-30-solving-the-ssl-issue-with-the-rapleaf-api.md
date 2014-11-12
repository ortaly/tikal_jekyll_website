---
layout: post
title: Solving the SSL issue with the Rapleaf API
created: 1338394544
author: avit
permalink: /solving-ssl-issue-rapleaf-api
tags:
- Ruby
- web
---
<p>While working with the <a href='https://www.rapleaf.com/'>Rapleaf</a> API, I encountered some major issues with SSL on production and staging servers.</p>

<p>Discarding what I did, the application just couldn’t get through to the external service using SSL and kept giving me errors regarding SSL communication.</p>

<p>After reading the Rapleaf gem documentation I found that you should reference your certificate file, this “telling” the service where your certificate file is.</p>

<p>I am working with Amazon EC2 for deployment of my application, both for production and for staging, I had some trouble finding the file, so I executed a unix command and found the files in no time.</p>

<p>Here’s how you find the file:</p>
<div class='highlight'><pre><code class='bash'>find / -name <span class='s1'>'*.pem'</span>
</code></pre>
</div>
<p>Once you find the file, you just create the API instance and refer to it’s path like so:</p>

<p><div class='highlight'><pre><code class='ruby'><span class='vi'>@api</span> <span class='o'>=</span> <span class='no'>RapleafApi</span><span class='o'>::</span><span class='no'>Api</span><span class='o'>.</span><span class='n'>new</span><span class='p'>(</span><span class='s2'>"YOUR_API_KEY"</span><span class='p'>,</span> <span class='ss'>:timeout</span> <span class='o'>=></span> <span class='mi'>10</span><span class='p'>,</span> <span class='ss'>:ca_file</span> <span class='o'>=></span> <span class='s2'>"path_to_pem_file"</span><span class='p'>)</span>
</code></pre>
</div></p>

<p>Have fun!</p>
      
    <img src="http://feeds.feedburner.com/~r/KensoDev-en/~4/dGovIPN9Rr8" height="1" width="1"/>

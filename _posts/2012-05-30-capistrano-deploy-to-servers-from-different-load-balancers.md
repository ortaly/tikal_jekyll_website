---
layout: post
title: Capistrano - Deploy to servers from different load balancers
created: 1338394544
author: avit
permalink: /capistrano-deploy-servers-different-load-balancers
tags:
- Ruby
- web
---
<p>As I posted back on March 14th, I work at Gogobot, an app that connects you with your friends all over the world and helps you plan your next new travel.</p>

<p>At Gogobot we are working with Capistrano to deploy our production and to our staging servers.</p>

<p>Recently, we changed out architecture and we now have user facing production servers (where you see the pages coming from) and backend servers that run delayed_jobs, resque, photos uploading and many more things that have no business in affecting the load of the user experience.</p>

<p>So, of course we did not want to deploy twice, once for the http servers and once for the backed servers, so I changed the deploy script.</p>

<p>The important thing to understand is that due to loads, we don’t just write the server DNS’s in the deploy script, we change the number of servers constantly so we want to do it very dynamically and just grab the servers from the load balancer that it’s attached to.</p>

<p>For example, if we have 100 servers on the front end and 50 servers on the backend, we will deploy to 150 servers and tomorrow that number can change, and we will need no change in the deploy script.</p>

<p>This is the deploy script part that handles the servers:</p>
<div class='highlight'><pre><code class='ruby'><span class='k'>def</span> <span class='nf'>fetch_from_ec2</span>
    <span class='nb'>require</span> <span class='s1'>'right_aws'</span>
    <span class='n'>instances_for_deploy</span> <span class='o'>=</span> <span class='o'>[]</span>

    <span class='o'>[</span><span class='n'>backend_load_balancer</span><span class='p'>,</span> <span class='n'>aws_load_balancer</span><span class='o'>].</span><span class='n'>each</span> <span class='k'>do</span> <span class='o'>|</span><span class='n'>load_balancer</span><span class='o'>|</span>
      <span class='n'>payload</span> <span class='o'>=</span> <span class='n'>elb</span><span class='o'>.</span><span class='n'>describe_load_balancers</span><span class='p'>(</span><span class='n'>load_balancer</span><span class='p'>)</span>
      <span class='n'>instances</span> <span class='o'>=</span> <span class='n'>aws</span><span class='o'>.</span><span class='n'>describe_instances</span> <span class='n'>payload</span><span class='o'>.</span><span class='n'>first</span><span class='o'>[</span><span class='ss'>:instances</span><span class='o'>]</span>
      <span class='n'>instances_for_deploy</span> <span class='o'>+=</span> <span class='n'>instances</span><span class='o'>.</span><span class='n'>collect</span><span class='p'>{</span><span class='o'>|</span><span class='n'>instance</span><span class='o'>|</span> <span class='n'>instance</span><span class='o'>[</span><span class='ss'>:dns_name</span><span class='o'>]</span> <span class='k'>if</span> <span class='p'>(</span><span class='n'>instance</span><span class='o'>[</span><span class='ss'>:aws_state</span><span class='o'>]</span> <span class='o'>==</span> <span class='s1'>'running'</span><span class='p'>)}</span>
    <span class='k'>end</span>
    <span class='n'>instances_for_deploy</span>
<span class='k'>end</span>
</code></pre>
</div>
<p>This is the target of capistrano:</p>
<div class='highlight'><pre><code class='ruby'><span class='n'>role</span> <span class='ss'>:app</span> <span class='k'>do</span>
  <span class='no'>ENV</span><span class='o'>[</span><span class='s1'>'TARGET'</span><span class='o'>]</span> <span class='o'>||</span> <span class='n'>fetch_from_ec2</span>
<span class='k'>end</span>
</code></pre>
</div>
<p>So, if there’s an ENV variable defined called ‘TARGET’ the script will only deploy to this server, if not, it will deploy to all of the servers from the load balancers.</p>

<p>Now, in the production.rb in your deploy folder, all you need is to define the load balancer names:</p>
<div class='highlight'><pre><code class='ruby'><span class='n'>set</span> <span class='ss'>:aws_load_balancer</span><span class='p'>,</span> <span class='s2'>"prod-load-balancer-name"</span>
<span class='n'>set</span> <span class='ss'>:backend_load_balancer</span><span class='p'>,</span> <span class='s2'>"backend-load-balancer-name"</span>
</code></pre>
</div>
      
    <img src="http://feeds.feedburner.com/~r/KensoDev-en/~4/xS4GKzVPo4c" height="1" width="1"/>

---
layout: post
title: Foursquare live updates with the Push API using rails.
created: 1338394544
author: avit
permalink: /foursquare-live-updates-push-api-using-rails
tags:
- Ruby
- web
---
<p>Recently, I have been working extensively with the Foursquare API, also contributing to the open source <a href='http://www.github.com/kensodev/foursquare2'>foursquare2</a> gem.</p>

<p>While working on these features, I got a sneak peak preview to the new push API through Foursquare. Until I got that, I needed to pull checkins for each user, which was a slow and unefficient process.</p>

<p>Facebook had this feature for a while that for every checkin a user has, the application (he authorized) get a push notification to a callback URL – this is highly effective and more streamlined process.</p>

<p>So, <a href='http://www.kensodev.com/tag/foursquare/'>Foursquare</a> added it and like I said, I was happy to get a sneak peak to it.</p>

<p>Since it has no documentation yet, adding it to the application was not as smooth as I am used to, so I thought I would post the code for it on my blog, so you will have it easier then me :-)</p>

<p>Foursquare posts the json for the checkin to your controller with no parameter, so you need to use the post body in order to read it.</p>

<p>Here’s the controller code:</p>
<div class='highlight'><pre><code class='ruby'><span class='k'>class</span> <span class='nc'>FsRealtimeController</span> <span class='o'><</span> <span class='no'>ApplicationController</span>
  <span class='n'>protect_from_forgery</span> <span class='ss'>:except</span> <span class='o'>=></span> <span class='s1'>'post'</span>

  <span class='k'>def</span> <span class='nf'>post</span>
    <span class='n'>posted_json</span> <span class='o'>=</span> <span class='n'>request</span><span class='o'>.</span><span class='n'>body</span><span class='o'>.</span><span class='n'>read</span>

    <span class='k'>if</span> <span class='n'>posted_json</span><span class='o'>.</span><span class='n'>blank?</span>
      <span class='n'>render</span> <span class='ss'>:nothing</span> <span class='o'>=></span> <span class='kp'>true</span>
      <span class='k'>return</span>
    <span class='k'>end</span>

    <span class='n'>parsed_json</span> <span class='o'>=</span> <span class='no'>JSON</span><span class='o'>.</span><span class='n'>parse</span><span class='p'>(</span><span class='n'>posted_json</span><span class='o'>.</span><span class='n'>to_s</span><span class='p'>)</span>

   <span class='c1'># Do whatever you want with the parsed json</span>

    <span class='n'>render</span> <span class='ss'>:nothing</span> <span class='o'>=></span> <span class='kp'>true</span>
  <span class='k'>end</span>
<span class='k'>end</span>
</code></pre>
</div>
<p>The typical json will look something like this:</p>
<div class='highlight'><pre><code class='javascript'><span class='p'>{</span>
<span class='s2'>"checkin"</span><span class='o'>:</span> <span class='p'>{</span>
<span class='s2'>"createdAt"</span><span class='o'>:</span> <span class='mi'>1298129668</span><span class='p'>,</span>
<span class='s2'>"id"</span><span class='o'>:</span> <span class='s2'>"4d5fe304d7206ea8e90aeef1"</span><span class='p'>,</span>
<span class='s2'>"shout"</span><span class='o'>:</span> <span class='s2'>"#4sqhackathon"</span><span class='p'>,</span>
<span class='s2'>"timeZone"</span><span class='o'>:</span> <span class='s2'>"America/New_York"</span><span class='p'>,</span>
<span class='s2'>"type"</span><span class='o'>:</span> <span class='s2'>"checkin"</span><span class='p'>,</span>
<span class='s2'>"venue"</span><span class='o'>:</span> <span class='p'>{</span>
<span class='s2'>"categories"</span><span class='o'>:</span> <span class='p'>[</span>
<span class='p'>{</span>
<span class='s2'>"icon"</span><span class='o'>:</span> <span class='s2'>"http://foursquare.com/img/categories/building/default.png"</span><span class='p'>,</span>
<span class='s2'>"id"</span><span class='o'>:</span> <span class='s2'>"4bf58dd8d48988d125941735"</span><span class='p'>,</span>
<span class='s2'>"name"</span><span class='o'>:</span> <span class='s2'>"Tech Startup"</span><span class='p'>,</span>
<span class='s2'>"parents"</span><span class='o'>:</span> <span class='p'>[</span>
<span class='s2'>"Home / Work / Other"</span><span class='p'>,</span>
<span class='s2'>"Corporate / Office"</span>
<span class='p'>],</span>
<span class='s2'>"primary"</span><span class='o'>:</span> <span class='kc'>true</span>
<span class='p'>}</span>
<span class='p'>],</span>
<span class='s2'>"contact"</span><span class='o'>:</span> <span class='p'>{</span>
<span class='s2'>"twitter"</span><span class='o'>:</span> <span class='s2'>"gnrlassembly"</span>
<span class='p'>},</span>
<span class='s2'>"id"</span><span class='o'>:</span> <span class='s2'>"4c5c076c7735c9b6af0e8b72"</span><span class='p'>,</span>
<span class='s2'>"location"</span><span class='o'>:</span> <span class='p'>{</span>
<span class='s2'>"address"</span><span class='o'>:</span> <span class='s2'>"902 Broadway, 4th Floor"</span><span class='p'>,</span>
<span class='s2'>"city"</span><span class='o'>:</span> <span class='s2'>"New York"</span><span class='p'>,</span>
<span class='s2'>"crossStreet"</span><span class='o'>:</span> <span class='s2'>"btw 20th and 21st"</span><span class='p'>,</span>
<span class='s2'>"lat"</span><span class='o'>:</span> <span class='mf'>40.739197437761383</span><span class='p'>,</span>
<span class='s2'>"lng"</span><span class='o'>:</span> <span class='o'>-</span><span class='mf'>73.989760279655457</span><span class='p'>,</span>
<span class='s2'>"postalCode"</span><span class='o'>:</span> <span class='s2'>"10010"</span><span class='p'>,</span>
<span class='s2'>"state"</span><span class='o'>:</span> <span class='s2'>"NY"</span>
<span class='p'>},</span>
<span class='s2'>"name"</span><span class='o'>:</span> <span class='s2'>"General Assembly"</span><span class='p'>,</span>
<span class='s2'>"stats"</span><span class='o'>:</span> <span class='p'>{</span>
<span class='s2'>"checkinsCount"</span><span class='o'>:</span> <span class='mi'>1357</span><span class='p'>,</span>
<span class='s2'>"usersCount"</span><span class='o'>:</span> <span class='mi'>557</span>
<span class='p'>},</span>
<span class='s2'>"todos"</span><span class='o'>:</span> <span class='p'>{</span>
<span class='s2'>"count"</span><span class='o'>:</span> <span class='mi'>0</span>
<span class='p'>},</span>
<span class='s2'>"verified"</span><span class='o'>:</span> <span class='kc'>false</span>
<span class='p'>}</span>
<span class='p'>},</span>
<span class='s2'>"user"</span><span class='o'>:</span> <span class='p'>{</span>
<span class='s2'>"firstName"</span><span class='o'>:</span> <span class='s2'>"Neil"</span><span class='p'>,</span>
<span class='s2'>"gender"</span><span class='o'>:</span> <span class='s2'>"male"</span><span class='p'>,</span>
<span class='s2'>"homeCity"</span><span class='o'>:</span> <span class='s2'>"New York, NY"</span><span class='p'>,</span>
<span class='s2'>"id"</span><span class='o'>:</span> <span class='s2'>"2097"</span><span class='p'>,</span>
<span class='s2'>"lastName"</span><span class='o'>:</span> <span class='s2'>"Sanchala"</span><span class='p'>,</span>
<span class='s2'>"photo"</span><span class='o'>:</span> <span class='s2'>"http://playfoursquare.s3.amazonaws.com/userpix_thumbs/0QYGOJMDGLTJOOQG.jpg"</span><span class='p'>,</span>
<span class='s2'>"relationship"</span><span class='o'>:</span> <span class='s2'>"self"</span>
<span class='p'>}</span>
<span class='p'>}</span>
</code></pre>
</div>
<p>You can find some more details <a href='https://github.com/foursquare/hackathon/wiki/Foursquare-Push-API'>here</a> (json from the link).</p>
      
    <img src="http://feeds.feedburner.com/~r/KensoDev-en/~4/PhX_TUfpzz4" height="1" width="1"/>

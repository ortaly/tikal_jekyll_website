---
layout: post
title: Use token instead of id in paperclip's path
created: 1338394544
author: avit
permalink: /use-token-instead-id-paperclips-path
tags:
- Ruby
- web
---
<p>I have been using paperclip in more then a couple of applications that I’m developing now, I really like it and it gives me the flexibility that I require.</p>

<p><span>caption id=”” align=”alignnone” width=”500” caption=”Url with Token example”</span><a href='http://www.flickr.com/photos/51960246@N07/5267932629/' title='Screen-shot-2010-12-17-at-12.57 by KensoDev, on Flickr'><img alt='Screen-shot-2010-12-17-at-12.57' height='232' src='http://farm6.static.flickr.com/5204/5267932629_ec11d80ab8.jpg' width='500' /></a><span>/caption</span></p>

<p>A couple of days ago, I wanted the path of the file to include a token instead of the id of  a user class.</p>

<p>This was my code before the change:</p>
<div class='highlight'><pre><code class='ruby'>  <span class='n'>has_attached_file</span> <span class='ss'>:avatar</span><span class='p'>,</span>
    <span class='ss'>:styles</span> <span class='o'>=&</span><span class='n'>gt</span><span class='p'>;</span>
    <span class='p'>{</span>
      <span class='ss'>:tiny</span> <span class='o'>=&</span><span class='n'>gt</span><span class='p'>;</span> <span class='o'>&</span><span class='n'>quot</span><span class='p'>;</span><span class='mi'>48</span><span class='n'>x48</span><span class='o'>&</span><span class='n'>gt</span><span class='p'>;</span><span class='o'>&</span><span class='n'>quot</span><span class='p'>;,</span>
      <span class='ss'>:preview</span> <span class='o'>=&</span><span class='n'>gt</span><span class='p'>;</span> <span class='o'>&</span><span class='n'>quot</span><span class='p'>;</span><span class='mi'>175</span><span class='n'>x175</span><span class='o'>&</span><span class='n'>gt</span><span class='p'>;</span><span class='o'>&</span><span class='n'>quot</span><span class='p'>;,</span>
      <span class='ss'>:large</span> <span class='o'>=&</span><span class='n'>gt</span><span class='p'>;</span> <span class='o'>&</span><span class='n'>quot</span><span class='p'>;</span><span class='mi'>300</span><span class='n'>x300</span><span class='o'>&</span><span class='n'>gt</span><span class='p'>;</span><span class='o'>&</span><span class='n'>quot</span><span class='p'>;,</span>
      <span class='ss'>:huge</span> <span class='o'>=&</span><span class='n'>gt</span><span class='p'>;</span> <span class='o'>&</span><span class='n'>quot</span><span class='p'>;</span><span class='mi'>500</span><span class='n'>x500</span><span class='o'>&</span><span class='n'>gt</span><span class='p'>;</span><span class='o'>&</span><span class='n'>quot</span><span class='p'>;</span>
    <span class='p'>},</span>
    <span class='ss'>:storage</span> <span class='o'>=&</span><span class='n'>gt</span><span class='p'>;</span> <span class='ss'>:s3</span><span class='p'>,</span>
    <span class='ss'>:s3_credentials</span> <span class='o'>=&</span><span class='n'>gt</span><span class='p'>;</span> <span class='o'>&</span><span class='n'>quot</span><span class='p'>;</span><span class='c1'>#{RAILS_ROOT}/config/s3.yml&quot;,</span>
    <span class='ss'>:path</span> <span class='o'>=&</span><span class='n'>gt</span><span class='p'>;</span> <span class='o'>&</span><span class='n'>quot</span><span class='p'>;</span><span class='ss'>:class</span><span class='o'>/</span><span class='ss'>:attachment</span><span class='o'>/</span><span class='ss'>:id</span><span class='o'>/</span><span class='ss'>:style</span><span class='o'>.</span><span class='ss'>:extension</span><span class='o'>&</span><span class='n'>quot</span><span class='p'>;,</span>
    <span class='ss'>:bucket</span> <span class='o'>=&</span><span class='n'>gt</span><span class='p'>;</span> <span class='s1'>'lopsum'</span><span class='p'>,</span>
    <span class='ss'>:default_url</span> <span class='o'>=&</span><span class='n'>gt</span><span class='p'>;</span> <span class='o'>&</span><span class='n'>quot</span><span class='p'>;</span><span class='o'>/</span><span class='n'>images</span><span class='o'>/</span><span class='n'>photo01</span><span class='o'>.</span><span class='n'>jpg</span><span class='o'>&</span><span class='n'>quot</span><span class='p'>;</span>
</code></pre>
</div>
<p>Notice that the path parameter includes the id of the user, this was not the requirement, because if this in an id parameter then the URL’s will be very easy to resolve and I of course don’t want that for user privacy.</p>

<p>I don’t want anyone to change the URL and get to the other profile images easily.</p>

<p>So, I needed a token which will be a random string for each user and I wanted that to be included in the path. This way, no one can tell the other paths in the system (it’s harder, a lot harder).</p>

<p>So, first thing first, I added this code to the user model:</p>
<div class='highlight'><pre><code class='ruby'>  <span class='n'>validates_presence_of</span> <span class='ss'>:token</span>

  <span class='kp'>protected</span>
    <span class='k'>def</span> <span class='nf'>before_validation_on_create</span>
      <span class='nb'>self</span><span class='o'>.</span><span class='n'>token</span> <span class='o'>=</span> <span class='nb'>rand</span><span class='p'>(</span><span class='mi'>36</span><span class='o'>**</span><span class='mi'>10</span><span class='p'>)</span><span class='o'>.</span><span class='n'>to_s</span><span class='p'>(</span><span class='mi'>36</span><span class='p'>)</span><span class='o'>.</span><span class='n'>upcase</span> <span class='k'>if</span> <span class='nb'>self</span><span class='o'>.</span><span class='n'>new_record?</span> <span class='ow'>and</span> <span class='nb'>self</span><span class='o'>.</span><span class='n'>token</span><span class='o'>.</span><span class='n'>nil?</span>
    <span class='k'>end</span>
</code></pre>
</div>
<p>I used a random code, you can of course use MD5 of the date or whatever you may want, just replace this code:</p>
<div class='highlight'><pre><code class='ruby'><span class='nb'>rand</span><span class='p'>(</span><span class='mi'>36</span><span class='o'>**</span><span class='mi'>10</span><span class='p'>)</span><span class='o'>.</span><span class='n'>to_s</span><span class='p'>(</span><span class='mi'>36</span><span class='p'>)</span><span class='o'>.</span><span class='n'>upcase</span>
</code></pre>
</div>
<p>Now that I have a token saved in the database I changed the image saving code to this:</p>
<div class='highlight'><pre><code class='ruby'>  <span class='n'>has_attached_file</span> <span class='ss'>:avatar</span><span class='p'>,</span>
    <span class='ss'>:styles</span> <span class='o'>=&</span><span class='n'>gt</span><span class='p'>;</span>
    <span class='p'>{</span>
      <span class='ss'>:tiny</span> <span class='o'>=&</span><span class='n'>gt</span><span class='p'>;</span> <span class='o'>&</span><span class='n'>quot</span><span class='p'>;</span><span class='mi'>48</span><span class='n'>x48</span><span class='o'>&</span><span class='n'>gt</span><span class='p'>;</span><span class='o'>&</span><span class='n'>quot</span><span class='p'>;,</span>
      <span class='ss'>:preview</span> <span class='o'>=&</span><span class='n'>gt</span><span class='p'>;</span> <span class='o'>&</span><span class='n'>quot</span><span class='p'>;</span><span class='mi'>175</span><span class='n'>x175</span><span class='o'>&</span><span class='n'>gt</span><span class='p'>;</span><span class='o'>&</span><span class='n'>quot</span><span class='p'>;,</span>
      <span class='ss'>:large</span> <span class='o'>=&</span><span class='n'>gt</span><span class='p'>;</span> <span class='o'>&</span><span class='n'>quot</span><span class='p'>;</span><span class='mi'>300</span><span class='n'>x300</span><span class='o'>&</span><span class='n'>gt</span><span class='p'>;</span><span class='o'>&</span><span class='n'>quot</span><span class='p'>;,</span>
      <span class='ss'>:huge</span> <span class='o'>=&</span><span class='n'>gt</span><span class='p'>;</span> <span class='o'>&</span><span class='n'>quot</span><span class='p'>;</span><span class='mi'>500</span><span class='n'>x500</span><span class='o'>&</span><span class='n'>gt</span><span class='p'>;</span><span class='o'>&</span><span class='n'>quot</span><span class='p'>;</span>
    <span class='p'>},</span>
    <span class='ss'>:storage</span> <span class='o'>=&</span><span class='n'>gt</span><span class='p'>;</span> <span class='ss'>:s3</span><span class='p'>,</span>
    <span class='ss'>:s3_credentials</span> <span class='o'>=&</span><span class='n'>gt</span><span class='p'>;</span> <span class='o'>&</span><span class='n'>quot</span><span class='p'>;</span><span class='c1'>#{RAILS_ROOT}/config/s3.yml&quot;,</span>
    <span class='ss'>:path</span> <span class='o'>=&</span><span class='n'>gt</span><span class='p'>;</span> <span class='o'>&</span><span class='n'>quot</span><span class='p'>;</span><span class='ss'>:class</span><span class='o'>/</span><span class='ss'>:attachment</span><span class='o'>/</span><span class='ss'>:token</span><span class='o'>/</span><span class='ss'>:style</span><span class='o'>.</span><span class='ss'>:extension</span><span class='o'>&</span><span class='n'>quot</span><span class='p'>;,</span>
    <span class='ss'>:bucket</span> <span class='o'>=&</span><span class='n'>gt</span><span class='p'>;</span> <span class='s1'>'lopsum'</span><span class='p'>,</span>
    <span class='ss'>:default_url</span> <span class='o'>=&</span><span class='n'>gt</span><span class='p'>;</span> <span class='o'>&</span><span class='n'>quot</span><span class='p'>;</span><span class='o'>/</span><span class='n'>images</span><span class='o'>/</span><span class='n'>photo01</span><span class='o'>.</span><span class='n'>jpg</span><span class='o'>&</span><span class='n'>quot</span><span class='p'>;</span>
</code></pre>
</div>
<p>This code did not work, the path only included the word :token but without the actual token from the database. <h2>So, how can you fix this?</h2> You need to add an initializer for paperclip.</p>

<p>You add a file called<em> paperclip.rb</em> into the<em> config/initializers</em> folder</p>

<p>You paste in this code:</p>
<div class='highlight'><pre><code class='ruby'><span class='no'>Paperclip</span><span class='o'>.</span><span class='n'>interpolates</span> <span class='ss'>:token</span> <span class='k'>do</span> <span class='o'>|</span><span class='n'>attachment</span><span class='p'>,</span> <span class='n'>style</span><span class='o'>|</span>
  <span class='n'>attachment</span><span class='o'>.</span><span class='n'>instance</span><span class='o'>.</span><span class='n'>token</span>
<span class='k'>end</span>
</code></pre>
</div>
<p>This will “tokenize” your user avatar path.</p>
      
    <img src="http://feeds.feedburner.com/~r/KensoDev-en/~4/JVaJ8nLUArk" height="1" width="1"/>

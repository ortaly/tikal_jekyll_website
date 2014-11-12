---
layout: post
title: Use before_destroy on a model with paperclip
created: 1338394544
author: avit
permalink: /use-beforedestroy-model-paperclip
tags:
- Ruby
- web
---
<p>I have an application that I’m working on, this application has a demand that I will show the total files and the file total size inside a project. Here is my model:</p>
<a href='http://www.flickr.com/photos/51960246@N07/5323289774/' title='Screen shot 2011-01-04 at 10.15.18 AM by KensoDev, on Flickr'><img alt='Screen shot 2011-01-04 at 10.15.18 AM' height='400' src='http://farm6.static.flickr.com/5201/5323289774_a6c335fc1b.jpg' width='375' /></a>
<p>Of course I have the option of using joins and so on and then calculating the file size, but because every project has many folders and every folder has many attachments this seems a bit off and not straight forward.</p>

<p>This is absolutely not the Rails way of doing things, so what I added a couple of fields inside the project model and here is what my model looked like after the change:</p>
<a href='http://www.flickr.com/photos/51960246@N07/5323294436/' title='Screen shot 2011-01-04 at 10.18.59 AM by KensoDev, on Flickr'><img alt='Screen shot 2011-01-04 at 10.18.59 AM' height='432' src='http://farm6.static.flickr.com/5004/5323294436_2c7702d32d.jpg' width='428' /></a>
<p>Now, I have straight forward fields inside my model, and the database work is very light, fast and straight forward. I added an observer for the attachment model, just to update the count and the total file size in the project model.</p>

<p>Here’s my observer’s code:</p>
<div class='highlight'><pre><code class='ruby'><span class='k'>class</span> <span class='nc'>AttachmentObserver</span> <span class='o'>&</span><span class='n'>lt</span><span class='p'>;</span> <span class='no'>ActiveRecord</span><span class='o'>::</span><span class='no'>Observer</span>
  <span class='n'>observe</span> <span class='ss'>:attachment</span>

  <span class='k'>def</span> <span class='nf'>after_create</span><span class='p'>(</span><span class='n'>record</span><span class='p'>)</span>
    <span class='n'>project</span> <span class='o'>=</span> <span class='n'>record</span><span class='o'>.</span><span class='n'>project</span>
    <span class='k'>if</span> <span class='n'>project</span>
      <span class='n'>project</span><span class='o'>.</span><span class='n'>increment!</span><span class='p'>(</span><span class='ss'>:file_count</span><span class='p'>,</span> <span class='mi'>1</span><span class='p'>)</span>
      <span class='n'>project</span><span class='o'>.</span><span class='n'>increment!</span><span class='p'>(</span><span class='ss'>:file_size</span><span class='p'>,</span> <span class='n'>record</span><span class='o'>.</span><span class='n'>sketch_file_size</span><span class='p'>)</span> <span class='k'>unless</span> <span class='n'>record</span><span class='o'>.</span><span class='n'>sketch_file_size</span><span class='o'>.</span><span class='n'>nil?</span>
    <span class='k'>end</span>
    <span class='k'>return</span> <span class='kp'>true</span>
  <span class='k'>end</span>

  <span class='k'>def</span> <span class='nf'>before_destroy</span><span class='p'>(</span><span class='n'>record</span><span class='p'>)</span>
    <span class='n'>project</span> <span class='o'>=</span> <span class='n'>record</span><span class='o'>.</span><span class='n'>project</span>
    <span class='k'>if</span> <span class='n'>project</span>
      <span class='n'>project</span><span class='o'>.</span><span class='n'>decrement!</span><span class='p'>(</span><span class='ss'>:file_count</span><span class='p'>,</span> <span class='mi'>1</span><span class='p'>)</span>
      <span class='n'>project</span><span class='o'>.</span><span class='n'>decrement!</span><span class='p'>(</span><span class='ss'>:file_size</span><span class='p'>,</span> <span class='n'>record</span><span class='o'>.</span><span class='n'>sketch_file_size</span><span class='p'>)</span> <span class='k'>unless</span> <span class='n'>record</span><span class='o'>.</span><span class='n'>sketch_file_size</span><span class='o'>.</span><span class='n'>nil?</span>
    <span class='k'>end</span>
    <span class='k'>return</span> <span class='kp'>true</span>
  <span class='k'>end</span>
<span class='k'>end</span>
</code></pre>
</div>
<p>I added the observer to the application configuration.</p>

<p>Now, everything seemed to be working fine on create, when I deleted a model (deleted an attachment) I got a nil exception on the skecth_file_size property. The problem is that the paperclip plugin deleted the sketch file before my callback and so prevented me from using it.</p>

<p>This required a patch to the paperclip plugin.</p>

<p>Inside the paperclip plugin there’s a file called paperclip.rb Ffor me, it was line 242, I changed it from before_destroy to after_destory like so:</p>
<div class='highlight'><pre><code class='ruby'><span class='n'>after_destroy</span> <span class='ss'>:destroy_attached_files</span>
</code></pre>
</div>
<p>Now, also in attachment.rb (also in paperclip plugin)</p>

<p>For me it was line 335:</p>
<div class='highlight'><pre><code class='ruby'><span class='k'>unless</span> <span class='n'>instance</span><span class='o'>.</span><span class='n'>frozen?</span>
  <span class='n'>instance_write</span><span class='p'>(</span><span class='ss'>:file_name</span><span class='p'>,</span> <span class='kp'>nil</span><span class='p'>)</span>
  <span class='n'>instance_write</span><span class='p'>(</span><span class='ss'>:content_type</span><span class='p'>,</span> <span class='kp'>nil</span><span class='p'>)</span>
  <span class='n'>instance_write</span><span class='p'>(</span><span class='ss'>:file_size</span><span class='p'>,</span> <span class='kp'>nil</span><span class='p'>)</span>
  <span class='n'>instance_write</span><span class='p'>(</span><span class='ss'>:updated_at</span><span class='p'>,</span> <span class='kp'>nil</span><span class='p'>)</span>
<span class='k'>end</span>
</code></pre>
</div>
<p>This worked like a charm and now my callback works, updating the model of the project as the files are adding and deleting, I don’t have to do complicated joins to get simple data.</p>

<p>Here’s how it looks in my application now:</p>
<a href='http://www.flickr.com/photos/51960246@N07/5323306412/' title='Screen shot 2011-01-04 at 10.26.28 AM by KensoDev, on Flickr'><img alt='Screen shot 2011-01-04 at 10.26.28 AM' height='136' src='http://farm6.static.flickr.com/5083/5323306412_e3b98bc477.jpg' width='311' /></a>
<p>This is the code I use to make it happen:</p>
<div class='highlight'><pre><code class='ruby'>  <span class='o'>&</span><span class='n'>lt</span><span class='p'>;</span><span class='n'>h2</span><span class='o'>&</span><span class='n'>gt</span><span class='p'>;</span>
    <span class='o'>&</span><span class='n'>lt</span><span class='p'>;</span><span class='sx'>%= @project.name %&gt;</span>
<span class='sx'>  &lt;/h2&gt;&lt;em&gt;&lt;%=</span> <span class='o'>&</span><span class='n'>quot</span><span class='p'>;</span><span class='c1'>#{@project.file_count} files, #{number_to_human_size(@project.file_size)}&quot;%&gt;&lt;/em&gt;</span>
</code></pre>
</div>
      
    <img src="http://feeds.feedburner.com/~r/KensoDev-en/~4/G_rk-SOF1Kk" height="1" width="1"/>

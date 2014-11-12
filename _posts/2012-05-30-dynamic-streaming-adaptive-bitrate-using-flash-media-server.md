---
layout: post
title: Dynamic streaming (Adaptive bitrate) using Flash media Server
created: 1338394544
author: avit
permalink: /dynamic-streaming-adaptive-bitrate-using-flash-media-server
tags:
- Ruby
- web
---
<a href='http://www.kensodev.com/2010/04/15/dynamic-streamin-adaptive-bitrate-using-flash-media-server/fms/' rel='attachment wp-att-418'><img alt='' class='alignleft size-thumbnail wp-image-418' height='150' src='http://www.kensodev.com/wp-content/uploads/2010/04/fms-150x150.png' title='Flash Media Server' width='150' /></a>
<p>Video can be downloaded (progressive download) to the client like YouTube or can be streamed to him.</p>

<p>I won’t discuss the pro’s & con’s of streaming and progressive. We’ll only be discussing streaming in this post.</p>

<p>So, What is the post worthy problem we have when streaming video to the client?</p>

<p>Continue reading and find out. <!--more-->When streaming video, you usually encode your video in a certain bitrate. This bitrate will work well in certain computers and won’t work well in others. Why is that?</p>

<p>That’s because each of your users has a different connection thus being capable to receive a limited amount of bytes streamed to him. So, you always have to find the “sweet spot” where you deliver a video that looks good and also light enough to fit a wider range of network connection speeds.</p>

<p>That is of course a problem, becuase sometimes you want to stream hiQuality video and audio (HD) and you can’t, because some of your users won’t be able to watch it smoothly. Well, this is a problem we will solve here in this post.</p>
<a href='http://www.kensodev.com/tag/flash-media-server/' target='_blank' title='Flash media server'>Flash media server</a>
<p>That way, you can create several encodes to the same source movie and supply a movie best fit to the user cosuming it.</p>

<p>Another obvious advantage of this approach is the way it skips on top of the movie, when you skip to a further point in the movie, you are actually being supplied a different movie from the lowest quality to the highest.</p>

<p>So, how is it done, first, let’s create a flash file (I’m using flash CS4). <p style='text-align: center;'><a href='http://www.kensodev.com/wp-content/uploads/2010/04/Screen-shot-2010-04-15-at-9.37.06-PM.png' rel='facebox'><img alt='' class='aligncenter size-medium wp-image-419' height='171' src='http://www.kensodev.com/wp-content/uploads/2010/04/Screen-shot-2010-04-15-at-9.37.06-PM-300x171.png' title='New flash file (Adaptive bitrate) dynamic streaming' width='300' /></a></p> Now, we will create (by dragging and dropping from the components panel) an FLVPlayback control.</p>

<p>We will give it the same dimensions as the movie itself so it will fill the entire surface.</p>

<p>Now, we will give the player an instance name of “flvPlayer”</p>

<p>So, we have a movie, we have an FLVPlayback control, we called it “flvPlayer”.</p>

<p>We will create another layer, called “action script” and we will create this code inside.</p>
<div class='highlight'><pre><code class='actionscript'><span class='kd'>import</span> <span class='nx'>fl</span><span class='p'>.</span><span class='nx'>video</span><span class='p'>.</span><span class='o'>*;</span>
<span class='nx'>VideoPlayer</span><span class='p'>.</span><span class='nx'>iNCManagerClass</span> <span class='o'>=</span> <span class='nx'>NCManagerDynamicStream</span><span class='o'>;</span>
<span class='nx'>flvPlayer</span><span class='p'>.</span><span class='nx'>source</span> <span class='o'>=</span> <span class='o'>&</span><span class='nx'>quot</span><span class='o'>;</span><span class='nx'>dynamicStream</span><span class='p'>.</span><span class='nx'>smil</span><span class='o'>&</span><span class='nx'>quot</span><span class='o'>;;</span>
</code></pre>
</div>
<p>OK, so as we can see, we created a pointer to a file called “dynamicStream.smil”, this is a special file (XML format).</p>

<p>This file details the following: <ul>
	<li>FMS Url</li>
	<li>Files you have encoded and a network speed in correlation</li>
</ul> The file looks like this:</p>

<p><span>xml</span> <smil> <head> <meta base="rtmp://your_fms_location/vod/" /> </head> <body> <switch> <video src="mp4:erets7_03_vod1_300.mp4" system-bitrate="300000"/> <video src="mp4:erets7_03_vod1_500.mp4" system-bitrate="500000"/> <video src="mp4:erets7_03_vod1_800.mp4" system-bitrate="800000"/> </switch> </body> </smil> <span>/xml</span></p>

<p>Now, when we put this file on our web-server, the user will get the file it can receive and play, not slower, not faster, just the perfect file for him.</p>

<p>NO buffering, NO waiting, NO frustration, smooth, cool and fast user experience.</p>

<p>Good luck!</p>

<p>You can download the complete solution from here: <span>download id=”3”</span></p>
      
    <img src="http://feeds.feedburner.com/~r/KensoDev-en/~4/z0l06oPegI4" height="1" width="1"/>

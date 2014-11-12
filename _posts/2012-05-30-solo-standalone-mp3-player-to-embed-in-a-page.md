---
layout: post
title: Solo standalone mp3 player to embed in a page
created: 1338394544
author: avit
permalink: /solo-standalone-mp3-player-embed-page
tags:
- Ruby
- web
---
<p>Client’s request: <blockquote><span style='color: #000000;'> </span>
I want an mp3 player on my website (html), a kind of player which the user can’t pause or stop the song, also I want it to work in all browsers with no problem.</blockquote> After explaining to him this is not very common and urged him to think it over, he insisted and I had to do what he asked me to.</p>

<p>Because of the cross-browser need, I had to use Flash/Flex for this job, but I also wanted to make this as reusable as possible for other project or for distribution as a component which I think a lot will want to use.</p>

<p>So, the plan was a very small player 100x20 (px), white background to blend in with the website.</p>
<a href='http://www.kensodev.com/wp-content/uploads/2009/04/20090430-0036.png'><img alt='2009-04-30_0036' border='0' height='169' src='http://www.kensodev.com/wp-content/uploads/2009/04/20090430-0036-thumb.png' style='display: inline; border: 0px;' title='2009-04-30_0036' width='244' /></a>
<p>I didn’t want to hard code the mp3 into the file, because this client is using a CMS application and he wanted to replace the file occasionally.</p>

<p>Opened up flex and started writing some code.</p>
<div class='highlight'><pre><code class='actionscript'><span class='o'>&</span><span class='nx'>lt</span><span class='o'>;?</span><span class='nx'>xml</span> <span class='nx'>version</span><span class='o'>=&</span><span class='nx'>quot</span><span class='o'>;</span><span class='mf'>1.0</span><span class='o'>&</span><span class='nx'>quot</span><span class='o'>;</span> <span class='nx'>encoding</span><span class='o'>=&</span><span class='nx'>quot</span><span class='o'>;</span><span class='nx'>utf</span><span class='o'>-</span><span class='mi'>8</span><span class='o'>&</span><span class='nx'>quot</span><span class='o'>;?&</span><span class='nx'>gt</span><span class='o'>;</span>
<span class='o'>&</span><span class='nx'>lt</span><span class='o'>;</span><span class='nx'>mx</span><span class='o'>:</span><span class='nx'>Application</span>
     <span class='nx'>xmlns</span><span class='o'>:</span><span class='nx'>mx</span><span class='o'>=&</span><span class='nx'>quot</span><span class='o'>;</span><span class='nx'>http</span><span class='o'>://</span><span class='nx'>www</span><span class='p'>.</span><span class='nx'>adobe</span><span class='p'>.</span><span class='nx'>com</span><span class='sr'>/2006/m</span><span class='nx'>xml</span><span class='o'>&</span><span class='nx'>quot</span><span class='o'>;</span>
     <span class='nx'>layout</span><span class='o'>=&</span><span class='nx'>quot</span><span class='o'>;</span><span class='nx'>absolute</span><span class='o'>&</span><span class='nx'>quot</span><span class='o'>;</span>
     <span class='nx'>width</span><span class='o'>=&</span><span class='nx'>quot</span><span class='o'>;</span><span class='mi'>100</span><span class='o'>&</span><span class='nx'>quot</span><span class='o'>;</span>
     <span class='nx'>height</span><span class='o'>=&</span><span class='nx'>quot</span><span class='o'>;</span><span class='mi'>20</span><span class='o'>&</span><span class='nx'>quot</span><span class='o'>;</span>
     <span class='nx'>creationComplete</span><span class='o'>=&</span><span class='nx'>quot</span><span class='o'>;</span><span class='nx'>init</span><span class='p'>()</span><span class='o'>&</span><span class='nx'>quot</span><span class='o'>;</span>
     <span class='nx'>color</span><span class='o'>=&</span><span class='nx'>quot</span><span class='o'>;</span><span class='err'>#</span><span class='nx'>FFFFFF</span><span class='o'>&</span><span class='nx'>quot</span><span class='o'>;</span>
     <span class='nx'>backgroundColor</span><span class='o'>=&</span><span class='nx'>quot</span><span class='o'>;</span><span class='err'>#</span><span class='nx'>FFFFFF</span><span class='o'>&</span><span class='nx'>quot</span><span class='o'>;</span> <span class='nx'>backgroundAlpha</span><span class='o'>=&</span><span class='nx'>quot</span><span class='o'>;</span><span class='mf'>0.0</span><span class='o'>&</span><span class='nx'>quot</span><span class='o'>;&</span><span class='nx'>gt</span><span class='o'>;</span>
     <span class='o'>&</span><span class='nx'>lt</span><span class='o'>;</span><span class='nx'>mx</span><span class='o'>:</span><span class='nx'>Script</span><span class='o'>&</span><span class='nx'>gt</span><span class='o'>;</span>
         <span class='o'>&</span><span class='nx'>lt</span><span class='o'>;!</span><span class='p'>[</span><span class='nx'>CDATA</span><span class='p'>[</span>
             <span class='kd'>import</span> <span class='nx'>mx</span><span class='p'>.</span><span class='nx'>controls</span><span class='p'>.</span><span class='nx'>Alert</span><span class='o'>;</span>
             <span class='kd'>import</span> <span class='nx'>mx</span><span class='p'>.</span><span class='nx'>messaging</span><span class='p'>.</span><span class='nx'>Channel</span><span class='o'>;</span>

             <span class='kd'>private</span> <span class='kd'>function</span> <span class='nx'>init</span><span class='p'>()</span><span class='o'>:</span><span class='nx'>void</span><span class='p'>{</span>
                 <span class='k'>var</span> <span class='nx'>flashVars</span><span class='o'>:</span><span class='nb'>Object</span> <span class='o'>=</span> <span class='nx'>Application</span><span class='p'>.</span><span class='nx'>application</span><span class='p'>.</span><span class='nx'>parameters</span><span class='o'>;</span>
                 <span class='k'>var</span> <span class='nx'>mp3FileName</span><span class='o'>:</span><span class='nb'>String</span> <span class='o'>=</span> <span class='nx'>flashVars</span><span class='p'>.</span><span class='nx'>mp3FileName</span><span class='o'>;</span>
                 <span class='k'>if</span><span class='p'>(</span><span class='nx'>mp3FileName</span><span class='o'>!=&</span><span class='nx'>quot</span><span class='o'>;&</span><span class='nx'>quot</span><span class='o'>;</span><span class='p'>)</span>
                 <span class='p'>{</span>
                     <span class='nx'>playMp3File</span><span class='p'>(</span><span class='nx'>mp3FileName</span><span class='p'>);</span>
                 <span class='p'>}</span>
             <span class='p'>}</span>
             <span class='kd'>private</span> <span class='kd'>function</span> <span class='nx'>playMp3File</span><span class='p'>(</span><span class='nx'>mp3</span><span class='o'>:</span><span class='nb'>String</span><span class='p'>)</span><span class='o'>:</span><span class='nx'>void</span><span class='p'>{</span>
                 <span class='k'>var</span> <span class='nx'>snd</span><span class='o'>:</span><span class='nb'>Sound</span> <span class='o'>=</span> <span class='k'>new</span> <span class='nb'>Sound</span><span class='p'>(</span><span class='k'>new</span> <span class='nb'>URLRequest</span><span class='p'>(</span><span class='nx'>mp3</span><span class='p'>));</span>
                 <span class='k'>var</span> <span class='nx'>channel</span><span class='o'>:</span><span class='nb'>SoundChannel</span> <span class='o'>=</span> <span class='nx'>snd</span><span class='p'>.</span><span class='nx'>play</span><span class='p'>();</span>
             <span class='p'>}</span>
         <span class='p'>]]</span><span class='o'>&</span><span class='nx'>gt</span><span class='o'>;</span>
    <span class='o'>&</span><span class='nx'>lt</span><span class='o'>;/</span><span class='nx'>mx</span><span class='o'>:</span><span class='nx'>Script</span><span class='o'>&</span><span class='nx'>gt</span><span class='o'>;</span>
<span class='o'>&</span><span class='nx'>lt</span><span class='o'>;/</span><span class='nx'>mx</span><span class='o'>:</span><span class='nx'>Application</span><span class='o'>&</span><span class='nx'>gt</span><span class='o'>;</span>
</code></pre>
</div>
<p>As you can see, the entire application is about 29 lines of code. <h3>Code explaination</h3> 1. I declared an object that excepts the parameters passed into the FlashObject in the flashVars tag.</p>

<ol>
<li>Checked if the param passed in is not empty and filled a Sound class with this mp3 and whallah –> Start playing.</li>
</ol>

<p>This is what the HTML embedding of this SWF inside the HTML looks like:</p>

<p><span>js</span> WriteFlashObj(‘/SoloPlayer.swf’, ‘100px’, ‘20px’, true, ‘mp3FileName={pageFileName}’, ‘SoloPlayer’); <span>/js</span></p>

<p>That’s it.</p>

<p>It works like a charm.</p>

<p>If you want the source code or the final SWF file, please contact me through the <a href='http://www.kensodev.com/contact-avi-tzurel/' title='Contact Avi Tzurel'>contact</a> page of this website, I will email it to you with no problem.</p>
<!--
.csharpcode, .csharpcode pre
{
font-size: small;
color: black;
font-family: consolas, "Courier New", courier, monospace;
background-color: #ffffff;
/*white-space: pre;*/
}
.csharpcode pre { margin: 0em; }
.csharpcode .rem { color: #008000; }
.csharpcode .kwrd { color: #0000ff; }
.csharpcode .str { color: #006080; }
.csharpcode .op { color: #0000c0; }
.csharpcode .preproc { color: #cc6633; }
.csharpcode .asp { background-color: #ffff00; }
.csharpcode .html { color: #800000; }
.csharpcode .attr { color: #ff0000; }
.csharpcode .alt
{
background-color: #f4f4f4;
width: 100%;
margin: 0em;
}
.csharpcode .lnum { color: #606060; } -->
      
    <img src="http://feeds.feedburner.com/~r/KensoDev-en/~4/dJIhcE99uFo" height="1" width="1"/>

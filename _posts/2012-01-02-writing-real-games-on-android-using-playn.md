---
layout: post
title: Writing real games on Android using PlayN
created: 1325501681
author: aviy
permalink: /writing-real-games-android-using-playn
tags:
- JAVA
- PlayN
- gwt
- Box2D
---
<p>&nbsp;<span style="font-size: 11px; ">&nbsp;﻿I would like to share with you a personal project that i have been working on in the last three months.&nbsp;</span></p>
<div style="font-size: 11px; line-height: 17px; ">
<p style="line-height: 21px; ">&nbsp;</p>
<p style="line-height: 21px; ">This project was done after reading and about PlayN and seeing this video : http://www.google.com/events/io/2011/sessions/kick-ass-game-programming-with-google-web-toolkit.html.</p>
<p style="line-height: 21px; ">&nbsp;</p>
<p style="line-height: 21px; ">I wanted to do a small game for Android using PlayN.</p>
<p style="line-height: 21px; ">&nbsp;</p>
<p style="line-height: 21px; ">I have determine that since this kind of my &quot;Hello World game&quot; ,I set the following objectives for sucess:</p>
<p style="line-height: 21px; ">&nbsp;</p>
<p style="line-height: 21px; ">1. Include real physics engine.&nbsp;</p>
<p style="line-height: 21px; ">2. look fine, considering that no real designer worked on my images and graphics.</p>
<p style="line-height: 21px; ">3. will be easy use.</p>
<p style="line-height: 21px; ">4. and last but not least, my 7 year old son will play with it, and won't get bored.</p>
<p style="line-height: 21px; ">&nbsp;</p>
<p style="line-height: 21px; ">So I finally done this and it is now on the Andotid Market ( its not &quot;Angry birds&quot; :-) but I like the result.</p>
<p style="line-height: 21px; ">The process was enjoyable &nbsp;but also much more complicated than I expected, it seems that writing kids game is not an easy task at all.</p>
<p style="line-height: 21px; ">&nbsp;</p>
<p style="line-height: 21px; ">But in general i say that the PlayN is still in progress and not fully functional,&nbsp;but it is doable once you understand the basics. &nbsp;</p>
<p style="line-height: 21px; ">&nbsp;</p>
<p style="line-height: 21px; ">I will try write something more detailed about the process in my next post.</p>
<p style="line-height: 21px; ">but &nbsp;bare&nbsp;in mind these issues:</p>
<p style="line-height: 21px; ">&nbsp;</p>
<p style="line-height: 21px; ">1. Don't try to draw graphics in the state update and versa.&nbsp;</p>
<p style="line-height: 21px; ">2. Make sure check your game constantly on real device. (i didn't do this at first and it caused me lot of problems.)</p>
<p style="line-height: 21px; ">3. use cahce to load Image once and reuse them, this can cause lot of performace issues.</p>
<p style="line-height: 21px; ">4. on game pause make sure clear the cache, somehow the cache is corruped after pasue.</p>
<p style="line-height: 21px; ">5. In additon to the game loop lifecycle there is the Box2D engine that you need to learn. there aren't many java exmples so you need to check some flash exampels.</p>
<p style="line-height: 21px; ">&nbsp;</p>
<p style="line-height: 21px; ">anyone want to see the resualt you can find it here :</p>
<p style="line-height: 21px; "><a href="https://market.android.com/details?id=com.idrosh.games.android.free">https://market.android.com/details?id=com.idrosh.games.android.free</a></p>
<p style="line-height: 21px; ">&nbsp;</p>
<p style="line-height: 21px; ">Enjoy, Avi</p>
<p style="line-height: 21px; ">&nbsp;</p>
<p style="line-height: 21px; ">&nbsp;</p>
<p style="line-height: 21px; ">&nbsp;</p>
<p style="line-height: 21px; ">&nbsp;</p>
<p style="line-height: 21px; ">&nbsp;</p>
<p style="line-height: 21px; ">&nbsp;</p>
</div>

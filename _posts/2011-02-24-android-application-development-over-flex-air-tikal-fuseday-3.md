---
layout: post
title: 'Android application development over Flex/AIR - Tikal FuseDay #3'
created: 1298557539
author: sefi
permalink: /js/android-application-development-over-flexair-tikal-fuseday-3
tags:
- JS
- hero
- Fuseday
- Flex 4.5
- Android
- air 2.5
---
<p style="text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><span style="font-size: 12pt;">I have been fooling around with the Hero SDK, AIR 2.5 and Burrito combo for a few months now, but never did something that has real value - it was always some small scale projects, no real-life situations. See related session I lead on Tikal's flex group <a href="../../../../../../../events/flex-group-meeting-air-25-and-mobile">here</a>.</span></p>
<!--break-->
<p style="text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><span style="font-size: 12pt;">This Fuse day, I decided to implement a simple RSS reader dedicated to Tikal's community site. These were familiar grounds, and I quickly accomplished a simple Android application that connects to the site RSS feeds and displays a synopsis, it took about 4 hours to implement and I was encouraged with how fast it went.</span></p>
<p style="text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;">&nbsp;</p>
<p style="text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><span style="font-size: 12pt;">When I came to the point where I wanted to add some more advanced features, like local RSS item caching, things started to crumble.</span></p>
<p style="text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><span style="font-size: 12pt;">Since the RSS returns only the last 10 items, I wanted to create a local items cache, have it updated in the background every interval and have the application load items from that cache instead of directly from the RSS feed.</span></p>
<p style="text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><span style="font-size: 12pt;">This means a few things:</span></p>
<ul type="disc">
    <li style="margin-right: 0cm; margin-left: 36pt; text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><span style="font-size: 12pt;">I want it to run on system load</span></li>
    <li style="margin-right: 0cm; margin-left: 36pt; text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><span style="font-size: 12pt;">I want it to prevent the OS      from closing it</span></li>
    <li style="margin-right: 0cm; margin-left: 36pt; text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><span style="font-size: 12pt;">I want it to poll the RSS feed      periodically and update the local cache</span><br />
    &nbsp;</li>
</ul>
<p style="text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><span style="font-size: 12pt;">Android OS controls the running state of apps in the background, and can close them to free up memory. Hence, it's not guaranteed that your application will run forever. Unfortunately, Adobe does not yet provide the APIs to allow implementation as a service (or a widget) and it felt like I crashed into a roadblock. Had it been an enterprise application or something my business depends on in real life, it would have been a real disaster.</span></p>
<p style="text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;">&nbsp;</p>
<p style="text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><span style="font-size: 12pt;">This lead me to the conclusion that for small scale projects, Flex for Android is great. It offers really fast development and &quot;time to market&quot;, as well as all the power of the Flash runtime, animations and the ability to deploy on multiple platforms. But for some larger scale projects that require functionality not provided by Adobe or that you can't say if you will need it or not in early stages of the project, then native is the only way to go. The last thing you want is for your development process to stall because you have to wait for Adobe to provide a missing API.</span></p>
<p style="text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;">&nbsp;</p>
<p style="text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><span style="font-size: 12pt;">Below is a summary of the pros and cons, as I see them.</span></p>
<ul>
    <li><span style="font-size: 12pt;">Flex PROs</span>
    <ul>
        <li><span style="font-size: 12pt;">Write once, deploy everywhere</span></li>
        <li><span style="font-size: 12pt;">Fast coding</span></li>
        <li><span style="font-size: 12pt;">Visually pleasing</span></li>
        <li><span style="font-size: 12pt;">Harness the full power of Flas</span></li>
    </ul>
    </li>
    <li><span style="font-size: 12pt;">Flex CONs</span>
    <ul>
        <li><span style="font-size: 12pt;">Limited to the APIs provided by Adobe</span></li>
        <li><span style="font-size: 12pt;">Must have AIR runtime install</span></li>
    </ul>
    </li>
    <li><span style="font-size: 12pt;">Native PROs</span>
    <ul>
        <li><span style="font-size: 12pt;">Access to all device APIs</span></li>
    </ul>
    </li>
    <li><span style="font-size: 12pt;">Native CONs</span>
    <ul>
        <li><span style="font-size: 12pt;">Write once, deploy once</span></li>
        <li><span style="font-size: 12pt;">Use native L&amp;F</span></li>
        <li><span style="font-size: 12pt;">Know multiple languages to support multiple platforms</span></li>
        <li><span style="font-size: 12pt;">Work hard to achieve effects and advanced graphics</span></li>
    </ul>
    </li>
</ul>
<p style="text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;">&nbsp;</p>
<p style="text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;"><span style="font-size: 12pt;">To sum-up, I started the day with great optimism and by the end of the day I was cautiously pessimistic. My feeling is that while it's a good idea, it is not yet 'there' and I'm not sure it will ever get 'there'. <br />
Chances are that Adobe will always be at least one step behind what the different OSs have to offer and you will always have to wait until the APIs you require are supplied and you have no control over the priorities.</span></p>
<p style="text-align: left; line-height: normal; direction: ltr; unicode-bidi: embed;">&nbsp;</p>
<p>&nbsp;Below you can find the source code for the app</p>
<p>&nbsp;</p>

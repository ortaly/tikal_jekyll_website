---
layout: post
title: 60 Seconds Architecture – Graphite
created: 1413805465
author: chaim.turkel
permalink: 60-seconds-architecture-graphite
tags:
- JAVA
- Java
- graphite
- architecture
---
<div align="center" class="MsoNormal" style="text-align: center;">60 Seconds Architecture &ndash; Graphite<o:p></o:p></div>

<div class="MsoTocHeading">Contents<o:p></o:p><span style="color: windowtext; font-size: 11.0pt; line-height: 107%; mso-ascii-font-family: Calibri; mso-ascii-theme-font: minor-latin; mso-bidi-font-family: Arial; mso-bidi-language: HE; mso-bidi-theme-font: minor-bidi; mso-fareast-font-family: Calibri; mso-fareast-theme-font: minor-latin; mso-hansi-font-family: Calibri; mso-hansi-theme-font: minor-latin;"><w:sdtpr></w:sdtpr></span></div>

<div class="MsoToc1" style="margin-left:64px"><!--[if supportFields]><span
 style='mso-element:field-begin'></span><span
 style='mso-spacerun:yes'> </span>TOC \o &quot;1-3&quot; \n \h \z \u <span
 style='mso-element:field-separator'></span><![endif]-->Overview</div>

<div class="MsoToc1" style="margin-left:64px">Data</div>

<div class="MsoToc1" style="margin-left:64px">Graphite Components</div>

<div class="MsoToc1" style="margin-left:64px">Carbon</div>

<div class="MsoToc1" style="margin-left:64px">Whisper</div>

<div class="MsoToc1" style="margin-left:64px">Carbon-Cache</div>

<div class="MsoToc1" style="margin-left:64px">Carbon-Rely</div>

<div class="MsoToc1" style="margin-left:64px">Web API</div>

<div class="MsoToc1" style="margin-left:64px">Performance boost</div>

<div class="MsoToc1" style="margin-left:64px">Clustering Graphite</div>

<div class="MsoToc1" style="margin-left:64px">High Availability</div>

<div class="MsoToc1" style="margin-left:64px">Open Issues with graphite</div>

<div class="MsoToc1" style="margin-left:64px">Ramp Up</div>

<div class="MsoToc1" style="margin-left:64px">Debugging</div>

<div class="MsoToc1" style="margin-left:64px">Eat your own dog food</div>

<div class="MsoToc1" style="margin-left:64px">Debugging techniques</div>

<div class="MsoToc1" style="margin-left:64px">Multi tenet</div>

<div class="MsoToc1" style="margin-left:64px">Events</div>

<h1><u>Overview</u></h1>

<p>Graphite is an end to end solution for storing, analyzing and aggregating timed data. There are many other tools out there. The familiar ones are CACTI (<a href="http://www.cacti.net/">http://www.cacti.net/</a>), RRDTools (<a href="http://oss.oetiker.ch/rrdtool/">http://oss.oetiker.ch/rrdtool/</a>) and others.</p>

<p>Graphite has taken the solution to a new level on the architectural plain. Graphite is not only a database solution but it is a full application solution, including web interface, security, clustering and more. For a more in-depth overview of graphite see <a href="https://graphite.readthedocs.org/en/latest/overview.html">https://graphite.readthedocs.org/en/latest/overview.html</a>.</p>

<p>So what type of information do you want to store in this database?</p>

<p>Answer: anything. You can use graphite to save metrics on anything. Depending on your application, you can monitor your cpu, disk&hellip; You can sent ticks from your app to notify process progress, and then monitor the speed in graphite.</p>

<div class="MsoListParagraphCxSpFirst" style="mso-list: l1 level1 lfo2; text-indent: -.25in;">&nbsp;</div>

<ul>
	<li><span style="text-indent: -0.25in;">You can even send Windows Performance counters to graphite: </span><a href="http://www.hodgkins.net.au/mswindows/using-powershell-to-send-metrics-graphite/" style="text-indent: -0.25in;">http://www.hodgkins.net.au/mswindows/using-powershell-to-send-metrics-graphite/</a></li>
	<li><span style="text-indent: -0.25in;">Want to monitor you storm server no problem: </span><a href="http://www.michael-noll.com/blog/2013/11/06/sending-metrics-from-storm-to-graphite/" style="text-indent: -0.25in;">http://www.michael-noll.com/blog/2013/11/06/sending-metrics-from-storm-to-graphite/</a></li>
	<li><span style="text-indent: -0.25in;">Are you using logstash to analyze your logs, sent those also to graphite: </span><a href="http://logstash.net/docs/1.2.0/outputs/graphite" style="text-indent: -0.25in;">http://logstash.net/docs/1.2.0/outputs/graphite</a></li>
	<li><span style="text-indent: -0.25in;">Are you using sensu to monitor you farm: </span><a href="http://www.joemiller.me/2013/12/07/sensu-and-graphite-part-2/" style="text-indent: -0.25in;">http://www.joemiller.me/2013/12/07/sensu-and-graphite-part-2/</a><span style="text-indent: -0.25in;">.</span></li>
	<li><span style="text-indent: -0.25in;">As you can see it is all a matter of your imagination.</span></li>
</ul>

<h1><u>Data</u></h1>

<p>So what is and what isn&rsquo;t graphite. Graphite does not do the actual collection of the data (if you need tools for this, see <a href="https://graphite.readthedocs.org/en/latest/tools.html">https://graphite.readthedocs.org/en/latest/tools.html</a>). Graphite supplies the option to store data and to query the data. Since the data that you store can be very large, graphite has a built in option for retention. Per metric you can decide what the resolution is and for how long you will keep it. So for example you can define</p>

<div class="MsoNormal" style="background: #F2F2F2; mso-background-themecolor: background1; mso-background-themeshade: 242;"><span style="color: #943634; mso-themecolor: accent2; mso-themeshade: 191;">retentions = 10s:14d</span>

<p>&nbsp;</p>
</div>

<div class="MsoNormal" style="margin-bottom: 0.0001pt;">&nbsp;</div>

<p>This will save the data every 10sec for 14 days (for more info see <a href="http://graphite.readthedocs.org/en/latest/config-carbon.html#storage-schemas-conf">http://graphite.readthedocs.org/en/latest/config-carbon.html#storage-schemas-conf</a>).</p>

<p>This way you also don&rsquo;t have to worry about deleting old data from the database, as is the case in most time based solutions.</p>

<p>Once you have defined the retention of your data, you can then define an aggregation function for your data. This way you can keep your raw data up to a month, but you can then keep a daily average for the next year. The basic aggregation functions that are supported are: average,&nbsp;sum,&nbsp;min,&nbsp;max, and&nbsp;last.</p>

<p>Graphite aggregation also supports combining multiple metrics into a new one via the aggregation definition which will save process time later on (the request of data will not need to use the aggregation function when retrieving the data).</p>

<h1><u>Graphite Components</u></h1>

<p>The basic components of the graphite server are:</p>

<div class="MsoListParagraphCxSpFirst" style="margin-bottom: 0.0001pt; text-indent: -0.25in;">&nbsp;</div>

<ul>
	<li><span style="font-family: Symbol; text-indent: -0.25in;"><span style="font-family: 'Times New Roman'; font-size: 7pt; font-stretch: normal;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span></span><b style="text-indent: -0.25in;"><span style="font-family: ArialMT; mso-ascii-font-family: ArialMT; mso-bidi-language: AR-SA;">carbon</span></b><span style="font-family: ArialMT; text-indent: -0.25in;"> </span><span style="text-indent: -0.25in;">&ndash;</span><span style="font-family: ArialMT; text-indent: -0.25in;"> daemons that listen for time-series data over the network using multiple protocols.</span></li>
	<li><span style="font-family: Symbol; text-indent: -0.25in;"><span style="font-family: 'Times New Roman'; font-size: 7pt; font-stretch: normal;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span></span><b style="text-indent: -0.25in;"><span style="font-family: ArialMT; mso-ascii-font-family: ArialMT; mso-bidi-language: AR-SA;">whisper</span></b><span style="font-family: ArialMT; text-indent: -0.25in;"> </span><span style="text-indent: -0.25in;">&ndash;</span><span style="font-family: ArialMT; text-indent: -0.25in;"> database library for storing time-series data</span></li>
	<li><span style="font-family: Symbol; text-indent: -0.25in;"><span style="font-family: 'Times New Roman'; font-size: 7pt; font-stretch: normal;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span></span><b style="text-indent: -0.25in;"><span style="font-family: ArialMT; mso-ascii-font-family: ArialMT; mso-bidi-language: AR-SA;">graphite web </span></b><span style="font-family: ArialMT; text-indent: -0.25in;">- application that renders graphs using a simple url api</span></li>
</ul>
<!--[if !supportLists]-->

<p>&nbsp;</p>

<h2><u>Carbon</u></h2>

<p>&nbsp;</p>

<p>The carbon daemon support two main protocols: plaintext, pickle.</p>

<p>Plaintext is a simple TCP socket that receives data in the format of:</p>

<div class="MsoNormal" style="background: #F2F2F2; mso-background-themecolor: background1; mso-background-themeshade: 242;"><span style="color: #943634; mso-themecolor: accent2; mso-themeshade: 191;">&lt;metric&nbsp;path&gt;&nbsp;&lt;metric&nbsp;value&gt;&nbsp;&lt;metric&nbsp;timestamp&gt;. </span>

<p>&nbsp;</p>
</div>

<p><u>Pickle</u> is a python format for encoding strings of the following format:</p>

<div class="MsoNormal" style="background: #F2F2F2; margin-bottom: .0001pt; margin-bottom: 0in; mso-background-themecolor: background1; mso-background-themeshade: 242;"><span style="color: #943634; mso-themecolor: accent2; mso-themeshade: 191;">[(path, (timestamp, value)), ...]</span>

<p>&nbsp;</p>
</div>

<p>&nbsp;</p>

<p>This format allows for inserting many timestamps of the same metric in an efficient way.</p>

<p>Although not documented but also the plaintext supports sending multiple metrics in the same TCP packet with a new line separator.</p>

<p>Many implementations of these protocols can be found in the internet for multiple languages.</p>

<p>&nbsp;</p>

<h2><u>Whisper</u></h2>

<p>Whisper is not an actual database, but is a library that is optimized to write time based files. Each metric is written to its own file. Each file is a fixed size based on the retention rule. This way the writing to the file is optimized (location for each metric in the file, based on timestamp is know in advance). This means that the allocation of the file is done on the first metric that is sent for this file (a utility to help calculate the file size based on retention can be found at: <a href="https://gist.github.com/jjmaestro/5774063">https://gist.github.com/jjmaestro/5774063</a>).</p>

<p>The folder structure is very convenient. If your metric is a.b.c, then you will have a file named &ldquo;c.wsp&rdquo; in a folder of &ldquo;b&rdquo; in a folder of &rdquo;a&rdquo;. For what every reason, if you wish to remove the metric data, you just need to delete the file.</p>

<p>Since the whole architecture of graphite is like Lego blocks, any part can be changed. So if you want to implement your own database library, you can go and do it (see <a href="http://graphite.readthedocs.org/en/latest/storage-backends.html">http://graphite.readthedocs.org/en/latest/storage-backends.html</a>).</p>

<p>For an example of it (and an in-depth article on whisper) see <a href="http://www.inmobi.com/blog/2014/01/24/extending-graphites-mileage">http://www.inmobi.com/blog/2014/01/24/extending-graphites-mileage</a>.</p>

<p>&nbsp;</p>

<h2><u>Carbon-Cache</u></h2>

<p>Since graphite is designed for high rate writing, obviously the IO will be the bottle neck. To solve this, graphite has added the carbon cache. All writes and reads go through the cache. The cache will persist the metrics to disk after a configurable interval. The cache holds a queue per whisper file, so that writing will be optimized and written in one block.</p>

<p>In the carbon.conf file you can configure multiple options to fine tune your graphite performance. An important entry is the following:</p>

<div class="MsoNormal" style="background: #F2F2F2; margin-bottom: .0001pt; margin-bottom: 0in; mso-background-themecolor: background1; mso-background-themeshade: 242;"><span style="color: #943634; mso-themecolor: accent2; mso-themeshade: 191;">MAX_UPDATES_PER_SECOND = 500</span>

<p>&nbsp;</p>
</div>

<p>This entry will define the updates per second to the disk. The less writes to the disk the better performance, but it comes with the risk of losing data in case of crash.</p>

<p>For fine tuning see the following article: <a href="http://mike-kirk.blogspot.co.il/2013_12_01_archive.html">http://mike-kirk.blogspot.co.il/2013_12_01_archive.html</a>.</p>

<p><u>Configuration example</u>:</p>

<div class="MsoNormal" style="background: #F2F2F2; margin-bottom: .0001pt; margin-bottom: 0in; mso-background-themecolor: background1; mso-background-themeshade: 242;"><span style="color: #943634; mso-themecolor: accent2; mso-themeshade: 191;">&nbsp;[cache]</span>

<p>&nbsp;</p>
</div>

<div class="MsoNormal" style="background: #F2F2F2; margin-bottom: .0001pt; margin-bottom: 0in; mso-background-themecolor: background1; mso-background-themeshade: 242;"><span style="color: #943634; mso-themecolor: accent2; mso-themeshade: 191;">LINE_RECEIVER_INTERFACE = 127.0.0.1</span>

<p>&nbsp;</p>
</div>

<div class="MsoNormal" style="background: #F2F2F2; margin-bottom: .0001pt; margin-bottom: 0in; mso-background-themecolor: background1; mso-background-themeshade: 242;"><span style="color: #943634; mso-themecolor: accent2; mso-themeshade: 191;">LINE_RECEIVER_PORT = 2003</span>

<p>&nbsp;</p>
</div>

<div class="MsoNormal" style="background: #F2F2F2; margin-bottom: .0001pt; margin-bottom: 0in; mso-background-themecolor: background1; mso-background-themeshade: 242;"><span style="color: #943634; mso-themecolor: accent2; mso-themeshade: 191;">PICKLE_RECEIVER_INTERFACE = 127.0.0.1</span>

<p>&nbsp;</p>
</div>

<div class="MsoNormal" style="background: #F2F2F2; margin-bottom: .0001pt; margin-bottom: 0in; mso-background-themecolor: background1; mso-background-themeshade: 242;"><span style="color: #943634; mso-themecolor: accent2; mso-themeshade: 191;">PICKLE_RECEIVER_PORT = 2004</span>

<p>&nbsp;</p>
</div>

<div class="MsoNormal" style="background: #F2F2F2; margin-bottom: .0001pt; margin-bottom: 0in; mso-background-themecolor: background1; mso-background-themeshade: 242;"><span style="color: #943634; mso-themecolor: accent2; mso-themeshade: 191;">CACHE_QUERY_INTERFACE = 0.0.0.0</span>

<p>&nbsp;</p>
</div>

<div class="MsoNormal" style="background: #F2F2F2; margin-bottom: .0001pt; margin-bottom: 0in; mso-background-themecolor: background1; mso-background-themeshade: 242;"><span style="color: #943634; mso-themecolor: accent2; mso-themeshade: 191;">CACHE_QUERY_PORT = 7002</span>

<p>&nbsp;</p>
</div>

<div class="MsoNormal" style="margin-bottom: .0001pt; margin-bottom: 0in;">&nbsp;</div>

<h2><u>Carbon-Rely</u></h2>

<p>Since the architecture is that each metric has its own life cycle, we can store metrics on different machines, or for performance we might have more than one cache (see section on performance boost and high availability).</p>

<p><u>Configuration example</u>:</p>

<div class="MsoNormal" style="background: #F2F2F2; margin-bottom: .0001pt; margin-bottom: 0in; mso-background-themecolor: background1; mso-background-themeshade: 242;"><span style="color: #943634; mso-themecolor: accent2; mso-themeshade: 191;">[relay]</span>

<p>&nbsp;</p>
</div>

<div class="MsoNormal" style="background: #F2F2F2; margin-bottom: .0001pt; margin-bottom: 0in; mso-background-themecolor: background1; mso-background-themeshade: 242;"><span style="color: #943634; mso-themecolor: accent2; mso-themeshade: 191;">LINE_RECEIVER_INTERFACE = 0.0.0.0</span>

<p>&nbsp;</p>
</div>

<div class="MsoNormal" style="background: #F2F2F2; margin-bottom: .0001pt; margin-bottom: 0in; mso-background-themecolor: background1; mso-background-themeshade: 242;"><span style="color: #943634; mso-themecolor: accent2; mso-themeshade: 191;">LINE_RECEIVER_PORT = 2003</span>

<p>&nbsp;</p>
</div>

<div class="MsoNormal" style="background: #F2F2F2; margin-bottom: .0001pt; margin-bottom: 0in; mso-background-themecolor: background1; mso-background-themeshade: 242;"><span style="color: #943634; mso-themecolor: accent2; mso-themeshade: 191;">PICKLE_RECEIVER_INTERFACE = 0.0.0.0</span>

<p>&nbsp;</p>
</div>

<div class="MsoNormal" style="background: #F2F2F2; margin-bottom: .0001pt; margin-bottom: 0in; mso-background-themecolor: background1; mso-background-themeshade: 242;"><span style="color: #943634; mso-themecolor: accent2; mso-themeshade: 191;">PICKLE_RECEIVER_PORT = 2004</span>

<p>&nbsp;</p>
</div>

<div class="MsoNormal" style="background: #F2F2F2; margin-bottom: .0001pt; margin-bottom: 0in; mso-background-themecolor: background1; mso-background-themeshade: 242;"><span style="color: #943634; mso-themecolor: accent2; mso-themeshade: 191;">RELAY_METHOD = consistent-hashing </span>

<p>&nbsp;</p>
</div>

<div class="MsoNormal" style="background: #F2F2F2; margin-bottom: .0001pt; margin-bottom: 0in; mso-background-themecolor: background1; mso-background-themeshade: 242;"><span style="color: #943634; mso-themecolor: accent2; mso-themeshade: 191;">DESTINATIONS = 127.0.0.1:2014:1, 127.0.0.1:2024:2 </span>

<p>&nbsp;</p>
</div>

<p>&nbsp;</p>

<h2><u>Web API</u></h2>

<p>Graphite uses Python Django web application with a REST API that can be queried to generate graphs as images, or return raw data in various formats (csv, json). The main user interface can be used as a work area to compose URLs for metrics retrieval.</p>

<p>The web api, can read from either the whisper file or the carbon-cache so that it can access data that has not yet been persisted.</p>

<p>The Web API has the option to display a GUI dashboard, or to retrieve the data via REST interface.</p>

<p>Getting data from graphite is as simple as:</p>

<div class="MsoNormal" style="background: #F2F2F2; margin-bottom: .0001pt; margin-bottom: 0in; mso-background-themecolor: background1; mso-background-themeshade: 242;"><span style="color: #943634; mso-themecolor: accent2; mso-themeshade: 191;">http://graphite/render?target=app.numUsers&amp;format=json</span>

<p>&nbsp;</p>
</div>

<p>&nbsp;</p>

<p>There are of course many options that include getting multiple metrics with wildcards. Defining time period for metrics. Choosing the format of the reply (json, png, csv, raw). Applying functions to metrics before retrieval, and many more. For more information see documentation at: <a href="http://graphite.readthedocs.org/en/latest/render_api.html">http://graphite.readthedocs.org/en/latest/render_api.html</a>.</p>

<p>If you want to enhance your dashboards, have a look at this open source graph editor: <a href="http://grafana.org/">http://grafana.org/</a>.</p>

<p>&nbsp;</p>

<h1><u>Performance boost</u></h1>

<p>To boost the performance of graphite, it is recommended to create a carbon-cache per cpu core. This way the machine can handle more metrics at the same time. You will need to configure a port per carbon-cache (actually 2, one for plaintext and one for pickle). This is a problem since our clients do not want to be aware of this layer in the architecture. To solve this graphite uses the carbon-rely. The client needs to see only the carbon-rely, and then the relay will send the metrics to the different carbon-cache.</p>

<p>&nbsp;</p>

<div class="separator" style="clear: both; text-align: center;"><a href="http://1.bp.blogspot.com/-OIBnl3dnu-s/VES1MNVJxUI/AAAAAAAARdA/csvIhJiWz5c/s1600/1Capture.JPG" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="288" src="http://1.bp.blogspot.com/-OIBnl3dnu-s/VES1MNVJxUI/AAAAAAAARdA/csvIhJiWz5c/s1600/1Capture.JPG" width="320" /></a></div>

<p>&nbsp;</p>

<div align="center" class="MsoNormal" style="text-align: center;"><!--[if mso & !supportInlineShapes & supportFields]><span
style='mso-element:field-begin;mso-field-lock:yes'></span><span
style='mso-spacerun:yes'> </span>SHAPE <span
style='mso-spacerun:yes'> </span>\* MERGEFORMAT <span style='mso-element:field-separator'></span><![endif]--><!--[if gte vml 1]><v:group
 id="Group_x0020_10" o:spid="_x0000_s1052" style='width:202.85pt;height:197.2pt;
 mso-position-horizontal-relative:char;mso-position-vertical-relative:line'
 coordsize="25762,25046" o:gfxdata="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
Yy1ZXGtmykEUly0GYj4QJfAOCel/sP9R4TP7BUNvqCO+D70VwccLzQzSBrL6gh08kG6QljiGwckS
bTJpVta16eikvZZt1uc86eZyTzhba3aWeL+is/PhzBXn1OJ5Ojv1sONrS1vpaojsyRIF0jQ7yJjA
lH3J2sUJGgfVjgdfkyDQ9+AKvkd5QKtpWk3T4Ao+MsGwZL8Mdbz0IqPAc0vJMfWMUs8wjYzSyCjN
jALDWfoNJqO0oFPpzybw2U7/eCj7QgITXPpFJWuqzue+zb8AAAD//wMAUEsDBBQABgAIAAAAIQCc
ZkZBuwAAACQBAAAqAAAAY2xpcGJvYXJkL2RyYXdpbmdzL19yZWxzL2RyYXdpbmcxLnhtbC5yZWxz
hI/NCsIwEITvgu8Q9m7SehCRJr2I0KvUBwjJNi02PyRR7Nsb6EVB8LIws+w3s037sjN5YkyTdxxq
WgFBp7yenOFw6y+7I5CUpdNy9g45LJigFdtNc8VZ5nKUxikkUigucRhzDifGkhrRykR9QFc2g49W
5iKjYUGquzTI9lV1YPGTAeKLSTrNIXa6BtIvoST/Z/thmBSevXpYdPlHBMulFxagjAYzB0pXZ501
LV2BiYZ9/SbeAAAA//8DAFBLAQItABQABgAIAAAAIQC75UiUBQEAAB4CAAATAAAAAAAAAAAAAAAA
AAAAAABbQ29udGVudF9UeXBlc10ueG1sUEsBAi0AFAAGAAgAAAAhAK0wP/HBAAAAMgEAAAsAAAAA
AAAAAAAAAAAANgEAAF9yZWxzLy5yZWxzUEsBAi0AFAAGAAgAAAAhADJ9yY2eBQAAuyEAAB8AAAAA
AAAAAAAAAAAAIAIAAGNsaXBib2FyZC9kcmF3aW5ncy9kcmF3aW5nMS54bWxQSwECLQAUAAYACAAA
ACEAnE5eIeIGAAA6HAAAGgAAAAAAAAAAAAAAAAD7BwAAY2xpcGJvYXJkL3RoZW1lL3RoZW1lMS54
bWxQSwECLQAUAAYACAAAACEAnGZGQbsAAAAkAQAAKgAAAAAAAAAAAAAAAAAVDwAAY2xpcGJvYXJk
L2RyYXdpbmdzL19yZWxzL2RyYXdpbmcxLnhtbC5yZWxzUEsFBgAAAAAFAAUAZwEAABgQAAAAAA==
">
 <v:shapetype id="_x0000_t122" coordsize="21600,21600" o:spt="122" path="m21597,19450v-225,-558,-750,-1073,-1650,-1545c18897,17605,17585,17347,16197,17260v-1500,87,-2700,345,-3787,645c11472,18377,10910,18892,10800,19450v-188,515,-750,1075,-1613,1460c8100,21210,6825,21425,5400,21597,3937,21425,2700,21210,1612,20910,675,20525,150,19965,,19450l,2147v150,558,675,1073,1612,1460c2700,3950,3937,4165,5400,4337,6825,4165,8100,3950,9187,3607v863,-387,1425,-902,1613,-1460c10910,1632,11472,1072,12410,600,13497,300,14697,85,16197,v1388,85,2700,300,3750,600c20847,1072,21372,1632,21597,2147xe">
  <v:stroke joinstyle="miter"/>
  <v:path o:connecttype="custom" o:connectlocs="10800,2147;0,10800;10800,19450;21600,10800"
   textboxrect="0,4337,21600,17260"/>
 </v:shapetype><v:shape id="Flowchart_x003a__x0020_Punched_x0020_Tape_x0020_11"
  o:spid="_x0000_s1053" type="#_x0000_t122" style='position:absolute;left:8905;
  width:11768;height:6122;visibility:visible;mso-wrap-style:square;
  v-text-anchor:middle' o:gfxdata="UEsDBBQABgAIAAAAIQDw94q7/QAAAOIBAAATAAAAW0NvbnRlbnRfVHlwZXNdLnhtbJSRzUrEMBDH
74LvEOYqbaoHEWm6B6tHFV0fYEimbdg2CZlYd9/edD8u4goeZ+b/8SOpV9tpFDNFtt4puC4rEOS0
N9b1Cj7WT8UdCE7oDI7ekYIdMayay4t6vQvEIrsdKxhSCvdSsh5oQi59IJcvnY8TpjzGXgbUG+xJ
3lTVrdTeJXKpSEsGNHVLHX6OSTxu8/pAEmlkEA8H4dKlAEMYrcaUSeXszI+W4thQZudew4MNfJUx
QP7asFzOFxx9L/lpojUkXjGmZ5wyhjSRJQ8YKGvKv1MWzIkL33VWU9lGfl98J6hz4cZ/uUjzf7Pb
bHuj+ZQu9z/UfAMAAP//AwBQSwMEFAAGAAgAAAAhADHdX2HSAAAAjwEAAAsAAABfcmVscy8ucmVs
c6SQwWrDMAyG74O9g9G9cdpDGaNOb4VeSwe7CltJTGPLWCZt376mMFhGbzvqF/o+8e/2tzCpmbJ4
jgbWTQuKomXn42Dg63xYfYCSgtHhxJEM3Elg372/7U40YalHMvokqlKiGBhLSZ9aix0poDScKNZN
zzlgqWMedEJ7wYH0pm23Ov9mQLdgqqMzkI9uA+p8T9X8hx28zSzcl8Zy0Nz33r6iasfXeKK5UjAP
VAy4LM8w09zU50C/9q7/6ZURE31X/kL8TKv1x6wXNXYPAAAA//8DAFBLAwQUAAYACAAAACEAMy8F
nkEAAAA5AAAAEAAAAGRycy9zaGFwZXhtbC54bWyysa/IzVEoSy0qzszPs1Uy1DNQUkjNS85PycxL
t1UKDXHTtVBSKC5JzEtJzMnPS7VVqkwtVrK34+UCAAAA//8DAFBLAwQUAAYACAAAACEAwhW7AL8A
AADbAAAADwAAAGRycy9kb3ducmV2LnhtbERPTYvCMBC9L/gfwgje1rQrLlKNIoKweFBWvXgbmzEt
NpPQRK3/3ggLe5vH+5zZorONuFMbascK8mEGgrh0umaj4HhYf05AhIissXFMCp4UYDHvfcyw0O7B
v3TfRyNSCIcCFVQx+kLKUFZkMQydJ07cxbUWY4KtkbrFRwq3jfzKsm9psebUUKGnVUXldX+zCqKs
x9aMz6fd9mb0Zun9KOeTUoN+t5yCiNTFf/Gf+0en+Tm8f0kHyPkLAAD//wMAUEsBAi0AFAAGAAgA
AAAhAPD3irv9AAAA4gEAABMAAAAAAAAAAAAAAAAAAAAAAFtDb250ZW50X1R5cGVzXS54bWxQSwEC
LQAUAAYACAAAACEAMd1fYdIAAACPAQAACwAAAAAAAAAAAAAAAAAuAQAAX3JlbHMvLnJlbHNQSwEC
LQAUAAYACAAAACEAMy8FnkEAAAA5AAAAEAAAAAAAAAAAAAAAAAApAgAAZHJzL3NoYXBleG1sLnht
bFBLAQItABQABgAIAAAAIQDCFbsAvwAAANsAAAAPAAAAAAAAAAAAAAAAAJgCAABkcnMvZG93bnJl
di54bWxQSwUGAAAAAAQABAD1AAAAhAMAAAAA
" fillcolor="#4f81bd [3204]" strokecolor="#243f60 [1604]" strokeweight="2pt">
  <v:textbox>
   <![if !mso]>
   <table cellpadding=0 cellspacing=0 width="100%">
<tr>
     <td><![endif]>
     <div>
     <p class=MsoNormal align=center style='text-align:center'>
Carbon- Rely</p></p>
</div>
<![if !mso]></td>
    </tr>
</table>
<![endif]></v:textbox>
 </v:shape><v:shapetype id="_x0000_t121" coordsize="21600,21600" o:spt="121"
  path="m4321,l21600,r,21600l,21600,,4338xe">
  <v:stroke joinstyle="miter"/>
  <v:path gradientshapeok="t" o:connecttype="rect" textboxrect="0,4321,21600,21600"/>
 </v:shapetype><v:shape id="Flowchart_x003a__x0020_Card_x0020_12" o:spid="_x0000_s1054"
  type="#_x0000_t121" style='position:absolute;left:13835;top:10177;width:11927;
  height:5248;visibility:visible;mso-wrap-style:square;v-text-anchor:middle'
  o:gfxdata="UEsDBBQABgAIAAAAIQDw94q7/QAAAOIBAAATAAAAW0NvbnRlbnRfVHlwZXNdLnhtbJSRzUrEMBDH
74LvEOYqbaoHEWm6B6tHFV0fYEimbdg2CZlYd9/edD8u4goeZ+b/8SOpV9tpFDNFtt4puC4rEOS0
N9b1Cj7WT8UdCE7oDI7ekYIdMayay4t6vQvEIrsdKxhSCvdSsh5oQi59IJcvnY8TpjzGXgbUG+xJ
3lTVrdTeJXKpSEsGNHVLHX6OSTxu8/pAEmlkEA8H4dKlAEMYrcaUSeXszI+W4thQZudew4MNfJUx
QP7asFzOFxx9L/lpojUkXjGmZ5wyhjSRJQ8YKGvKv1MWzIkL33VWU9lGfl98J6hz4cZ/uUjzf7Pb
bHuj+ZQu9z/UfAMAAP//AwBQSwMEFAAGAAgAAAAhADHdX2HSAAAAjwEAAAsAAABfcmVscy8ucmVs
c6SQwWrDMAyG74O9g9G9cdpDGaNOb4VeSwe7CltJTGPLWCZt376mMFhGbzvqF/o+8e/2tzCpmbJ4
jgbWTQuKomXn42Dg63xYfYCSgtHhxJEM3Elg372/7U40YalHMvokqlKiGBhLSZ9aix0poDScKNZN
zzlgqWMedEJ7wYH0pm23Ov9mQLdgqqMzkI9uA+p8T9X8hx28zSzcl8Zy0Nz33r6iasfXeKK5UjAP
VAy4LM8w09zU50C/9q7/6ZURE31X/kL8TKv1x6wXNXYPAAAA//8DAFBLAwQUAAYACAAAACEAMy8F
nkEAAAA5AAAAEAAAAGRycy9zaGFwZXhtbC54bWyysa/IzVEoSy0qzszPs1Uy1DNQUkjNS85PycxL
t1UKDXHTtVBSKC5JzEtJzMnPS7VVqkwtVrK34+UCAAAA//8DAFBLAwQUAAYACAAAACEAyCNEab0A
AADbAAAADwAAAGRycy9kb3ducmV2LnhtbERPTYvCMBC9C/sfwix401RhRapRRHZhT4paPA/N2Bab
SclktfvvjSB4m8f7nOW6d626UZDGs4HJOANFXHrbcGWgOP2M5qAkIltsPZOBfxJYrz4GS8ytv/OB
bsdYqRTCkqOBOsYu11rKmhzK2HfEibv44DAmGCptA95TuGv1NMtm2mHDqaHGjrY1ldfjnzPQ8ndg
2pX7nRR4PjQn6b+iGDP87DcLUJH6+Ba/3L82zZ/C85d0gF49AAAA//8DAFBLAQItABQABgAIAAAA
IQDw94q7/QAAAOIBAAATAAAAAAAAAAAAAAAAAAAAAABbQ29udGVudF9UeXBlc10ueG1sUEsBAi0A
FAAGAAgAAAAhADHdX2HSAAAAjwEAAAsAAAAAAAAAAAAAAAAALgEAAF9yZWxzLy5yZWxzUEsBAi0A
FAAGAAgAAAAhADMvBZ5BAAAAOQAAABAAAAAAAAAAAAAAAAAAKQIAAGRycy9zaGFwZXhtbC54bWxQ
SwECLQAUAAYACAAAACEAyCNEab0AAADbAAAADwAAAAAAAAAAAAAAAACYAgAAZHJzL2Rvd25yZXYu
eG1sUEsFBgAAAAAEAAQA9QAAAIIDAAAAAA==
" fillcolor="#4f81bd [3204]" strokecolor="#243f60 [1604]" strokeweight="2pt">
  <v:textbox>
   <![if !mso]>
   <table cellpadding=0 cellspacing=0 width="100%">
<tr>
     <td><![endif]>
     <div>
     <p class=MsoNormal align=center style='text-align:center'>
Carbon- Cache</p></p>
</div>
<![if !mso]></td>
    </tr>
</table>
<![endif]></v:textbox>
 </v:shape><v:shapetype id="_x0000_t32" coordsize="21600,21600" o:spt="32"
  o:oned="t" path="m,l21600,21600e" filled="f">
  <v:path arrowok="t" fillok="f" o:connecttype="none"/>
  <o:lock v:ext="edit" shapetype="t"/>
 </v:shapetype><v:shape id="Straight_x0020_Arrow_x0020_Connector_x0020_13"
  o:spid="_x0000_s1055" type="#_x0000_t32" style='position:absolute;left:17413;
  top:5327;width:2147;height:3976;visibility:visible;mso-wrap-style:square'
  o:connectortype="straight" o:gfxdata="UEsDBBQABgAIAAAAIQD+JeulAAEAAOoBAAATAAAAW0NvbnRlbnRfVHlwZXNdLnhtbJSRzU7EIBDH
7ya+A+FqWqoHY0zpHqwe1Zj1AQhMW2I7EAbr7ts73e5ejGviEeb/8RuoN7tpFDMk8gG1vC4rKQBt
cB57Ld+3T8WdFJQNOjMGBC33QHLTXF7U230EEuxG0nLIOd4rRXaAyVAZIiBPupAmk/mYehWN/TA9
qJuqulU2YAbMRV4yZFO30JnPMYvHHV+vJAlGkuJhFS5dWpoYR29NZlI1o/vRUhwbSnYeNDT4SFeM
IdWvDcvkfMHR98JPk7wD8WpSfjYTYyiXaNkAweaQWFf+nbSgTlSErvMWyjYRL7V6T3DnSlz4wgTz
f/Nbtr3BfEpXh59qvgEAAP//AwBQSwMEFAAGAAgAAAAhAJYFM1jUAAAAlwEAAAsAAABfcmVscy8u
cmVsc6SQPWsDMQyG90L/g9He8yVDKSW+bIWsIYWuxtZ9kLNkJHNN/n1MoaVXsnWUXvQ8L9rtL2k2
C4pOTA42TQsGKXCcaHDwfnp7egGjxVP0MxM6uKLCvnt82B1x9qUe6ThlNZVC6mAsJb9aq2HE5LXh
jFSTniX5UkcZbPbh7Ae027Z9tvKbAd2KaQ7RgRziFszpmqv5DztNQVi5L03gZLnvp3CPaiN/0hGX
SvEyYHEQRb+WgktTy4G979380xuYCENh+aiOlfwnqfbvBnb1zu4GAAD//wMAUEsDBBQABgAIAAAA
IQAzLwWeQQAAADkAAAAUAAAAZHJzL2Nvbm5lY3RvcnhtbC54bWyysa/IzVEoSy0qzszPs1Uy1DNQ
UkjNS85PycxLt1UKDXHTtVBSKC5JzEtJzMnPS7VVqkwtVrK34+UCAAAA//8DAFBLAwQUAAYACAAA
ACEAKBscisQAAADbAAAADwAAAGRycy9kb3ducmV2LnhtbERPS2vCQBC+F/wPywi9lGajqQ+iqxRB
qqmXagseh+yYBLOzIbua9N93C4Xe5uN7znLdm1rcqXWVZQWjKAZBnFtdcaHg87R9noNwHlljbZkU
fJOD9WrwsMRU244/6H70hQgh7FJUUHrfpFK6vCSDLrINceAutjXoA2wLqVvsQrip5TiOp9JgxaGh
xIY2JeXX480o2CSz7Otp//I2xQP7dx7v9pPsrNTjsH9dgPDU+3/xn3unw/wEfn8JB8jVDwAAAP//
AwBQSwECLQAUAAYACAAAACEA/iXrpQABAADqAQAAEwAAAAAAAAAAAAAAAAAAAAAAW0NvbnRlbnRf
VHlwZXNdLnhtbFBLAQItABQABgAIAAAAIQCWBTNY1AAAAJcBAAALAAAAAAAAAAAAAAAAADEBAABf
cmVscy8ucmVsc1BLAQItABQABgAIAAAAIQAzLwWeQQAAADkAAAAUAAAAAAAAAAAAAAAAAC4CAABk
cnMvY29ubmVjdG9yeG1sLnhtbFBLAQItABQABgAIAAAAIQAoGxyKxAAAANsAAAAPAAAAAAAAAAAA
AAAAAKECAABkcnMvZG93bnJldi54bWxQSwUGAAAAAAQABAD5AAAAkgMAAAAA
" strokecolor="#4579b8 [3044]">
  <v:stroke endarrow="block"/>
 </v:shape><v:shape id="Straight_x0020_Arrow_x0020_Connector_x0020_14" o:spid="_x0000_s1056"
  type="#_x0000_t32" style='position:absolute;left:17413;top:15425;width:0;
  height:3183;visibility:visible;mso-wrap-style:square' o:connectortype="straight"
  o:gfxdata="UEsDBBQABgAIAAAAIQD+JeulAAEAAOoBAAATAAAAW0NvbnRlbnRfVHlwZXNdLnhtbJSRzU7EIBDH
7ya+A+FqWqoHY0zpHqwe1Zj1AQhMW2I7EAbr7ts73e5ejGviEeb/8RuoN7tpFDMk8gG1vC4rKQBt
cB57Ld+3T8WdFJQNOjMGBC33QHLTXF7U230EEuxG0nLIOd4rRXaAyVAZIiBPupAmk/mYehWN/TA9
qJuqulU2YAbMRV4yZFO30JnPMYvHHV+vJAlGkuJhFS5dWpoYR29NZlI1o/vRUhwbSnYeNDT4SFeM
IdWvDcvkfMHR98JPk7wD8WpSfjYTYyiXaNkAweaQWFf+nbSgTlSErvMWyjYRL7V6T3DnSlz4wgTz
f/Nbtr3BfEpXh59qvgEAAP//AwBQSwMEFAAGAAgAAAAhAJYFM1jUAAAAlwEAAAsAAABfcmVscy8u
cmVsc6SQPWsDMQyG90L/g9He8yVDKSW+bIWsIYWuxtZ9kLNkJHNN/n1MoaVXsnWUXvQ8L9rtL2k2
C4pOTA42TQsGKXCcaHDwfnp7egGjxVP0MxM6uKLCvnt82B1x9qUe6ThlNZVC6mAsJb9aq2HE5LXh
jFSTniX5UkcZbPbh7Ae027Z9tvKbAd2KaQ7RgRziFszpmqv5DztNQVi5L03gZLnvp3CPaiN/0hGX
SvEyYHEQRb+WgktTy4G979380xuYCENh+aiOlfwnqfbvBnb1zu4GAAD//wMAUEsDBBQABgAIAAAA
IQAzLwWeQQAAADkAAAAUAAAAZHJzL2Nvbm5lY3RvcnhtbC54bWyysa/IzVEoSy0qzszPs1Uy1DNQ
UkjNS85PycxLt1UKDXHTtVBSKC5JzEtJzMnPS7VVqkwtVrK34+UCAAAA//8DAFBLAwQUAAYACAAA
ACEAp/KE/sEAAADbAAAADwAAAGRycy9kb3ducmV2LnhtbERPS4vCMBC+C/sfwizsRTRd31SjLIL4
vPgCj0MztmWbSWmidv/9RhC8zcf3nMmsNoW4U+Vyywq+2xEI4sTqnFMFp+OiNQLhPLLGwjIp+CMH
s+lHY4Kxtg/e0/3gUxFC2MWoIPO+jKV0SUYGXduWxIG72sqgD7BKpa7wEcJNITtRNJAGcw4NGZY0
zyj5PdyMgnl3uDk3173lAHfst9xZrfubi1Jfn/XPGISn2r/FL/dKh/k9eP4SDpDTfwAAAP//AwBQ
SwECLQAUAAYACAAAACEA/iXrpQABAADqAQAAEwAAAAAAAAAAAAAAAAAAAAAAW0NvbnRlbnRfVHlw
ZXNdLnhtbFBLAQItABQABgAIAAAAIQCWBTNY1AAAAJcBAAALAAAAAAAAAAAAAAAAADEBAABfcmVs
cy8ucmVsc1BLAQItABQABgAIAAAAIQAzLwWeQQAAADkAAAAUAAAAAAAAAAAAAAAAAC4CAABkcnMv
Y29ubmVjdG9yeG1sLnhtbFBLAQItABQABgAIAAAAIQCn8oT+wQAAANsAAAAPAAAAAAAAAAAAAAAA
AKECAABkcnMvZG93bnJldi54bWxQSwUGAAAAAAQABAD5AAAAjwMAAAAA
" strokecolor="#4579b8 [3044]">
  <v:stroke endarrow="block"/>
 </v:shape><v:shape id="Flowchart_x003a__x0020_Card_x0020_15" o:spid="_x0000_s1057"
  type="#_x0000_t121" style='position:absolute;top:10177;width:11926;height:5248;
  visibility:visible;mso-wrap-style:square;v-text-anchor:middle' o:gfxdata="UEsDBBQABgAIAAAAIQDw94q7/QAAAOIBAAATAAAAW0NvbnRlbnRfVHlwZXNdLnhtbJSRzUrEMBDH
74LvEOYqbaoHEWm6B6tHFV0fYEimbdg2CZlYd9/edD8u4goeZ+b/8SOpV9tpFDNFtt4puC4rEOS0
N9b1Cj7WT8UdCE7oDI7ekYIdMayay4t6vQvEIrsdKxhSCvdSsh5oQi59IJcvnY8TpjzGXgbUG+xJ
3lTVrdTeJXKpSEsGNHVLHX6OSTxu8/pAEmlkEA8H4dKlAEMYrcaUSeXszI+W4thQZudew4MNfJUx
QP7asFzOFxx9L/lpojUkXjGmZ5wyhjSRJQ8YKGvKv1MWzIkL33VWU9lGfl98J6hz4cZ/uUjzf7Pb
bHuj+ZQu9z/UfAMAAP//AwBQSwMEFAAGAAgAAAAhADHdX2HSAAAAjwEAAAsAAABfcmVscy8ucmVs
c6SQwWrDMAyG74O9g9G9cdpDGaNOb4VeSwe7CltJTGPLWCZt376mMFhGbzvqF/o+8e/2tzCpmbJ4
jgbWTQuKomXn42Dg63xYfYCSgtHhxJEM3Elg372/7U40YalHMvokqlKiGBhLSZ9aix0poDScKNZN
zzlgqWMedEJ7wYH0pm23Ov9mQLdgqqMzkI9uA+p8T9X8hx28zSzcl8Zy0Nz33r6iasfXeKK5UjAP
VAy4LM8w09zU50C/9q7/6ZURE31X/kL8TKv1x6wXNXYPAAAA//8DAFBLAwQUAAYACAAAACEAMy8F
nkEAAAA5AAAAEAAAAGRycy9zaGFwZXhtbC54bWyysa/IzVEoSy0qzszPs1Uy1DNQUkjNS85PycxL
t1UKDXHTtVBSKC5JzEtJzMnPS7VVqkwtVrK34+UCAAAA//8DAFBLAwQUAAYACAAAACEAR8rcHb0A
AADbAAAADwAAAGRycy9kb3ducmV2LnhtbERPTYvCMBC9L/gfwgh7W1MFF6lGEVHYk6IWz0MztsVm
UjJRu/9+Iyx4m8f7nMWqd616UJDGs4HxKANFXHrbcGWgOO++ZqAkIltsPZOBXxJYLQcfC8ytf/KR
HqdYqRTCkqOBOsYu11rKmhzKyHfEibv64DAmGCptAz5TuGv1JMu+tcOGU0ONHW1qKm+nuzPQ8jYw
7cvDXgq8HJuz9NMoxnwO+/UcVKQ+vsX/7h+b5k/h9Us6QC//AAAA//8DAFBLAQItABQABgAIAAAA
IQDw94q7/QAAAOIBAAATAAAAAAAAAAAAAAAAAAAAAABbQ29udGVudF9UeXBlc10ueG1sUEsBAi0A
FAAGAAgAAAAhADHdX2HSAAAAjwEAAAsAAAAAAAAAAAAAAAAALgEAAF9yZWxzLy5yZWxzUEsBAi0A
FAAGAAgAAAAhADMvBZ5BAAAAOQAAABAAAAAAAAAAAAAAAAAAKQIAAGRycy9zaGFwZXhtbC54bWxQ
SwECLQAUAAYACAAAACEAR8rcHb0AAADbAAAADwAAAAAAAAAAAAAAAACYAgAAZHJzL2Rvd25yZXYu
eG1sUEsFBgAAAAAEAAQA9QAAAIIDAAAAAA==
" fillcolor="#4f81bd [3204]" strokecolor="#243f60 [1604]" strokeweight="2pt">
  <v:textbox>
   <![if !mso]>
   <table cellpadding=0 cellspacing=0 width="100%">
<tr>
     <td><![endif]>
     <div>
     <p class=MsoNormal align=center style='text-align:center'>
Carbon- Cache</p></p>
</div>
<![if !mso]></td>
    </tr>
</table>
<![endif]></v:textbox>
 </v:shape><v:shape id="Straight_x0020_Arrow_x0020_Connector_x0020_16" o:spid="_x0000_s1058"
  type="#_x0000_t32" style='position:absolute;left:9700;top:15425;width:0;
  height:3183;visibility:visible;mso-wrap-style:square' o:connectortype="straight"
  o:gfxdata="UEsDBBQABgAIAAAAIQD+JeulAAEAAOoBAAATAAAAW0NvbnRlbnRfVHlwZXNdLnhtbJSRzU7EIBDH
7ya+A+FqWqoHY0zpHqwe1Zj1AQhMW2I7EAbr7ts73e5ejGviEeb/8RuoN7tpFDMk8gG1vC4rKQBt
cB57Ld+3T8WdFJQNOjMGBC33QHLTXF7U230EEuxG0nLIOd4rRXaAyVAZIiBPupAmk/mYehWN/TA9
qJuqulU2YAbMRV4yZFO30JnPMYvHHV+vJAlGkuJhFS5dWpoYR29NZlI1o/vRUhwbSnYeNDT4SFeM
IdWvDcvkfMHR98JPk7wD8WpSfjYTYyiXaNkAweaQWFf+nbSgTlSErvMWyjYRL7V6T3DnSlz4wgTz
f/Nbtr3BfEpXh59qvgEAAP//AwBQSwMEFAAGAAgAAAAhAJYFM1jUAAAAlwEAAAsAAABfcmVscy8u
cmVsc6SQPWsDMQyG90L/g9He8yVDKSW+bIWsIYWuxtZ9kLNkJHNN/n1MoaVXsnWUXvQ8L9rtL2k2
C4pOTA42TQsGKXCcaHDwfnp7egGjxVP0MxM6uKLCvnt82B1x9qUe6ThlNZVC6mAsJb9aq2HE5LXh
jFSTniX5UkcZbPbh7Ae027Z9tvKbAd2KaQ7RgRziFszpmqv5DztNQVi5L03gZLnvp3CPaiN/0hGX
SvEyYHEQRb+WgktTy4G979380xuYCENh+aiOlfwnqfbvBnb1zu4GAAD//wMAUEsDBBQABgAIAAAA
IQAzLwWeQQAAADkAAAAUAAAAZHJzL2Nvbm5lY3RvcnhtbC54bWyysa/IzVEoSy0qzszPs1Uy1DNQ
UkjNS85PycxLt1UKDXHTtVBSKC5JzEtJzMnPS7VVqkwtVrK34+UCAAAA//8DAFBLAwQUAAYACAAA
ACEAOGy/EsIAAADbAAAADwAAAGRycy9kb3ducmV2LnhtbERPS2vCQBC+C/6HZQQvpW7qI5XoKkWQ
+rpoK3gcsmMSzM6G7Fbjv3eFgrf5+J4znTemFFeqXWFZwUcvAkGcWl1wpuD3Z/k+BuE8ssbSMim4
k4P5rN2aYqLtjfd0PfhMhBB2CSrIva8SKV2ak0HXsxVx4M62NugDrDOpa7yFcFPKfhTF0mDBoSHH
ihY5pZfDn1GwGHxujm/r4XeMO/Zb7q/Wo81JqW6n+ZqA8NT4l/jfvdJhfgzPX8IBcvYAAAD//wMA
UEsBAi0AFAAGAAgAAAAhAP4l66UAAQAA6gEAABMAAAAAAAAAAAAAAAAAAAAAAFtDb250ZW50X1R5
cGVzXS54bWxQSwECLQAUAAYACAAAACEAlgUzWNQAAACXAQAACwAAAAAAAAAAAAAAAAAxAQAAX3Jl
bHMvLnJlbHNQSwECLQAUAAYACAAAACEAMy8FnkEAAAA5AAAAFAAAAAAAAAAAAAAAAAAuAgAAZHJz
L2Nvbm5lY3RvcnhtbC54bWxQSwECLQAUAAYACAAAACEAOGy/EsIAAADbAAAADwAAAAAAAAAAAAAA
AAChAgAAZHJzL2Rvd25yZXYueG1sUEsFBgAAAAAEAAQA+QAAAJADAAAAAA==
" strokecolor="#4579b8 [3044]">
  <v:stroke endarrow="block"/>
 </v:shape><v:shapetype id="_x0000_t16" coordsize="21600,21600" o:spt="16"
  adj="5400" path="m@0,l0@0,,21600@1,21600,21600@2,21600,xem0@0nfl@1@0,21600,em@1@0nfl@1,21600e">
  <v:stroke joinstyle="miter"/>
  <v:formulas>
   <v:f eqn="val #0"/>
   <v:f eqn="sum width 0 #0"/>
   <v:f eqn="sum height 0 #0"/>
   <v:f eqn="mid height #0"/>
   <v:f eqn="prod @1 1 2"/>
   <v:f eqn="prod @2 1 2"/>
   <v:f eqn="mid width #0"/>
  </v:formulas>
  <v:path o:extrusionok="f" gradientshapeok="t" limo="10800,10800"
   o:connecttype="custom" o:connectlocs="@6,0;@4,@0;0,@3;@4,21600;@1,@3;21600,@5"
   o:connectangles="270,270,180,90,0,0" textboxrect="0,@0,@1,21600"/>
  <v:handles>
   <v:h position="topLeft,#0" switch="" yrange="0,21600"/>
  </v:handles>
  <o:complex v:ext="view"/>
 </v:shapetype><v:shape id="Cube_x0020_17" o:spid="_x0000_s1059" type="#_x0000_t16"
  style='position:absolute;left:6758;top:18606;width:14392;height:6440;
  visibility:visible;mso-wrap-style:square;v-text-anchor:middle' o:gfxdata="UEsDBBQABgAIAAAAIQDw94q7/QAAAOIBAAATAAAAW0NvbnRlbnRfVHlwZXNdLnhtbJSRzUrEMBDH
74LvEOYqbaoHEWm6B6tHFV0fYEimbdg2CZlYd9/edD8u4goeZ+b/8SOpV9tpFDNFtt4puC4rEOS0
N9b1Cj7WT8UdCE7oDI7ekYIdMayay4t6vQvEIrsdKxhSCvdSsh5oQi59IJcvnY8TpjzGXgbUG+xJ
3lTVrdTeJXKpSEsGNHVLHX6OSTxu8/pAEmlkEA8H4dKlAEMYrcaUSeXszI+W4thQZudew4MNfJUx
QP7asFzOFxx9L/lpojUkXjGmZ5wyhjSRJQ8YKGvKv1MWzIkL33VWU9lGfl98J6hz4cZ/uUjzf7Pb
bHuj+ZQu9z/UfAMAAP//AwBQSwMEFAAGAAgAAAAhADHdX2HSAAAAjwEAAAsAAABfcmVscy8ucmVs
c6SQwWrDMAyG74O9g9G9cdpDGaNOb4VeSwe7CltJTGPLWCZt376mMFhGbzvqF/o+8e/2tzCpmbJ4
jgbWTQuKomXn42Dg63xYfYCSgtHhxJEM3Elg372/7U40YalHMvokqlKiGBhLSZ9aix0poDScKNZN
zzlgqWMedEJ7wYH0pm23Ov9mQLdgqqMzkI9uA+p8T9X8hx28zSzcl8Zy0Nz33r6iasfXeKK5UjAP
VAy4LM8w09zU50C/9q7/6ZURE31X/kL8TKv1x6wXNXYPAAAA//8DAFBLAwQUAAYACAAAACEAMy8F
nkEAAAA5AAAAEAAAAGRycy9zaGFwZXhtbC54bWyysa/IzVEoSy0qzszPs1Uy1DNQUkjNS85PycxL
t1UKDXHTtVBSKC5JzEtJzMnPS7VVqkwtVrK34+UCAAAA//8DAFBLAwQUAAYACAAAACEATAz96sEA
AADbAAAADwAAAGRycy9kb3ducmV2LnhtbERPS4vCMBC+C/6HMAteZE0V1ke3UWRR8CT46GFvQzO2
pc2kNFlb/71ZELzNx/ecZNObWtypdaVlBdNJBII4s7rkXMH1sv9cgnAeWWNtmRQ8yMFmPRwkGGvb
8YnuZ5+LEMIuRgWF900spcsKMugmtiEO3M22Bn2AbS51i10IN7WcRdFcGiw5NBTY0E9BWXX+MwqO
X+PL4be+plHn5Gpa7VL0x1Sp0Ue//Qbhqfdv8ct90GH+Av5/CQfI9RMAAP//AwBQSwECLQAUAAYA
CAAAACEA8PeKu/0AAADiAQAAEwAAAAAAAAAAAAAAAAAAAAAAW0NvbnRlbnRfVHlwZXNdLnhtbFBL
AQItABQABgAIAAAAIQAx3V9h0gAAAI8BAAALAAAAAAAAAAAAAAAAAC4BAABfcmVscy8ucmVsc1BL
AQItABQABgAIAAAAIQAzLwWeQQAAADkAAAAQAAAAAAAAAAAAAAAAACkCAABkcnMvc2hhcGV4bWwu
eG1sUEsBAi0AFAAGAAgAAAAhAEwM/erBAAAA2wAAAA8AAAAAAAAAAAAAAAAAmAIAAGRycy9kb3du
cmV2LnhtbFBLBQYAAAAABAAEAPUAAACGAwAAAAA=
" fillcolor="#4f81bd [3204]" strokecolor="#243f60 [1604]" strokeweight="2pt">
  <v:textbox>
   <![if !mso]>
   <table cellpadding=0 cellspacing=0 width="100%">
<tr>
     <td><![endif]>
     <div>
     <p class=MsoNormal align=center style='text-align:center'>
Whisper files</p></p>
</div>
<![if !mso]></td>
    </tr>
</table>
<![endif]></v:textbox>
 </v:shape><v:shape id="Straight_x0020_Arrow_x0020_Connector_x0020_18" o:spid="_x0000_s1060"
  type="#_x0000_t32" style='position:absolute;left:8348;top:6122;width:4294;
  height:3182;flip:x;visibility:visible;mso-wrap-style:square' o:connectortype="straight"
  o:gfxdata="UEsDBBQABgAIAAAAIQD+JeulAAEAAOoBAAATAAAAW0NvbnRlbnRfVHlwZXNdLnhtbJSRzU7EIBDH
7ya+A+FqWqoHY0zpHqwe1Zj1AQhMW2I7EAbr7ts73e5ejGviEeb/8RuoN7tpFDMk8gG1vC4rKQBt
cB57Ld+3T8WdFJQNOjMGBC33QHLTXF7U230EEuxG0nLIOd4rRXaAyVAZIiBPupAmk/mYehWN/TA9
qJuqulU2YAbMRV4yZFO30JnPMYvHHV+vJAlGkuJhFS5dWpoYR29NZlI1o/vRUhwbSnYeNDT4SFeM
IdWvDcvkfMHR98JPk7wD8WpSfjYTYyiXaNkAweaQWFf+nbSgTlSErvMWyjYRL7V6T3DnSlz4wgTz
f/Nbtr3BfEpXh59qvgEAAP//AwBQSwMEFAAGAAgAAAAhAJYFM1jUAAAAlwEAAAsAAABfcmVscy8u
cmVsc6SQPWsDMQyG90L/g9He8yVDKSW+bIWsIYWuxtZ9kLNkJHNN/n1MoaVXsnWUXvQ8L9rtL2k2
C4pOTA42TQsGKXCcaHDwfnp7egGjxVP0MxM6uKLCvnt82B1x9qUe6ThlNZVC6mAsJb9aq2HE5LXh
jFSTniX5UkcZbPbh7Ae027Z9tvKbAd2KaQ7RgRziFszpmqv5DztNQVi5L03gZLnvp3CPaiN/0hGX
SvEyYHEQRb+WgktTy4G979380xuYCENh+aiOlfwnqfbvBnb1zu4GAAD//wMAUEsDBBQABgAIAAAA
IQAzLwWeQQAAADkAAAAUAAAAZHJzL2Nvbm5lY3RvcnhtbC54bWyysa/IzVEoSy0qzszPs1Uy1DNQ
UkjNS85PycxLt1UKDXHTtVBSKC5JzEtJzMnPS7VVqkwtVrK34+UCAAAA//8DAFBLAwQUAAYACAAA
ACEAQVgwgsQAAADbAAAADwAAAGRycy9kb3ducmV2LnhtbESPQU/DMAyF70j8h8hI3FgK0zpUlk0I
iQnttnXibBrTVDROSbKt26+fD0jcbL3n9z4vVqPv1ZFi6gIbeJwUoIibYDtuDezr94dnUCkjW+wD
k4EzJVgtb28WWNlw4i0dd7lVEsKpQgMu56HSOjWOPKZJGIhF+w7RY5Y1ttpGPEm47/VTUZTaY8fS
4HCgN0fNz+7gDXzVv3bmytpu4jSU5fnyOd8c1sbc342vL6Ayjfnf/Hf9YQVfYOUXGUAvrwAAAP//
AwBQSwECLQAUAAYACAAAACEA/iXrpQABAADqAQAAEwAAAAAAAAAAAAAAAAAAAAAAW0NvbnRlbnRf
VHlwZXNdLnhtbFBLAQItABQABgAIAAAAIQCWBTNY1AAAAJcBAAALAAAAAAAAAAAAAAAAADEBAABf
cmVscy8ucmVsc1BLAQItABQABgAIAAAAIQAzLwWeQQAAADkAAAAUAAAAAAAAAAAAAAAAAC4CAABk
cnMvY29ubmVjdG9yeG1sLnhtbFBLAQItABQABgAIAAAAIQBBWDCCxAAAANsAAAAPAAAAAAAAAAAA
AAAAAKECAABkcnMvZG93bnJldi54bWxQSwUGAAAAAAQABAD5AAAAkgMAAAAA
" strokecolor="#4579b8 [3044]">
  <v:stroke endarrow="block"/>
 </v:shape><w:wrap type="none"/>
 <w:anchorlock/>
</v:group><![endif]--><!--[if !vml]--><!--[endif]--><!--[if gte vml 1]><v:shapetype
 id="_x0000_t75" coordsize="21600,21600" o:spt="75" o:preferrelative="t"
 path="m@4@5l@4@11@9@11@9@5xe" filled="f" stroked="f">
 <v:stroke joinstyle="miter"/>
 <v:formulas>
  <v:f eqn="if lineDrawn pixelLineWidth 0"/>
  <v:f eqn="sum @0 1 0"/>
  <v:f eqn="sum 0 0 @1"/>
  <v:f eqn="prod @2 1 2"/>
  <v:f eqn="prod @3 21600 pixelWidth"/>
  <v:f eqn="prod @3 21600 pixelHeight"/>
  <v:f eqn="sum @0 0 1"/>
  <v:f eqn="prod @6 1 2"/>
  <v:f eqn="prod @7 21600 pixelWidth"/>
  <v:f eqn="sum @8 21600 0"/>
  <v:f eqn="prod @7 21600 pixelHeight"/>
  <v:f eqn="sum @10 21600 0"/>
 </v:formulas>
 <v:path o:extrusionok="f" gradientshapeok="t" o:connecttype="rect"/>
 <o:lock v:ext="edit" aspectratio="t"/>
</v:shapetype><![endif]--><!--[if mso & !supportInlineShapes & supportFields]><v:shape
 id="_x0000_i1028" type="#_x0000_t75" style='width:202.85pt;height:197.2pt'>
 <v:imagedata croptop="-65520f" cropbottom="65520f"/>
</v:shape><span style='mso-element:field-end'></span><![endif]-->
<p>&nbsp;</p>
</div>

<p>&nbsp;</p>

<p>Of course not only the writing layer has the option for caching, but the reading one does to. So you can configure the web api layer to use a memcache server to cache the results of REST requests. You should configure all web-api servers to use the same cache server so that cross rest requests will be cached as well (<a href="http://graphite.readthedocs.org/en/latest/config-local-settings.html">http://graphite.readthedocs.org/en/latest/config-local-settings.html</a>).</p>

<p>&nbsp;</p>

<p>&nbsp;</p>

<h1><u>Clustering Graphite</u></h1>

<p>So how does graphite scale out? As you can guess by the sections above we have all the building blocks we need. We will have many backend servers that will host the metrics whisper files. Each machine will have a carbon-cache per cpu. We will but another machine with a carbon-rely to route all metric requests to the machines. Also we will add another machine for the web-api interface.</p>

<p>&nbsp;</p>

<div class="separator" style="clear: both; text-align: center;"><a href="http://2.bp.blogspot.com/-9fHIHbxuLCc/VES1MF8RUZI/AAAAAAAARcw/qJQMCRi_s-w/s1600/2Capture.JPG" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="310" src="http://2.bp.blogspot.com/-9fHIHbxuLCc/VES1MF8RUZI/AAAAAAAARcw/qJQMCRi_s-w/s1600/2Capture.JPG" width="400" /></a></div>

<p>&nbsp;</p>

<div align="center" class="MsoNormal" style="text-align: center;"><!--[if mso & !supportInlineShapes & supportFields]><span
style='mso-element:field-begin;mso-field-lock:yes'></span><span
style='mso-spacerun:yes'> </span>SHAPE <span
style='mso-spacerun:yes'> </span>\* MERGEFORMAT <span style='mso-element:field-separator'></span><![endif]--><!--[if gte vml 1]><v:group
 id="Group_x0020_240" o:spid="_x0000_s1026" style='width:326.2pt;height:262.95pt;
 mso-position-horizontal-relative:char;mso-position-vertical-relative:line'
 coordsize="41425,33395" o:gfxdata="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
fcnaxQkaB9WOB1+TIND34Aq+R3lAq2laTdPgCj4ywbBkvwx1vPQio8BzS8kx9YxSzzCNjNLIKM2M
AsNZ+g0mo7SgU+nPJvDZTv94KPtCAhNc+kUla6rO577NvwAAAP//AwBQSwMEFAAGAAgAAAAhAJxm
RkG7AAAAJAEAACoAAABjbGlwYm9hcmQvZHJhd2luZ3MvX3JlbHMvZHJhd2luZzEueG1sLnJlbHOE
j80KwjAQhO+C7xD2btJ6EJEmvYjQq9QHCMk2LTY/JFHs2xvoRUHwsjCz7DezTfuyM3liTJN3HGpa
AUGnvJ6c4XDrL7sjkJSl03L2DjksmKAV201zxVnmcpTGKSRSKC5xGHMOJ8aSGtHKRH1AVzaDj1bm
IqNhQaq7NMj2VXVg8ZMB4otJOs0hdroG0i+hJP9n+2GYFJ69elh0+UcEy6UXFqCMBjMHSldnnTUt
XYGJhn39Jt4AAAD//wMAUEsBAi0AFAAGAAgAAAAhALvlSJQFAQAAHgIAABMAAAAAAAAAAAAAAAAA
AAAAAFtDb250ZW50X1R5cGVzXS54bWxQSwECLQAUAAYACAAAACEArTA/8cEAAAAyAQAACwAAAAAA
AAAAAAAAAAA2AQAAX3JlbHMvLnJlbHNQSwECLQAUAAYACAAAACEAdVIIs7sIAAAkVQAAHwAAAAAA
AAAAAAAAAAAgAgAAY2xpcGJvYXJkL2RyYXdpbmdzL2RyYXdpbmcxLnhtbFBLAQItABQABgAIAAAA
IQCcTl4h4gYAADocAAAaAAAAAAAAAAAAAAAAABgLAABjbGlwYm9hcmQvdGhlbWUvdGhlbWUxLnht
bFBLAQItABQABgAIAAAAIQCcZkZBuwAAACQBAAAqAAAAAAAAAAAAAAAAADISAABjbGlwYm9hcmQv
ZHJhd2luZ3MvX3JlbHMvZHJhd2luZzEueG1sLnJlbHNQSwUGAAAAAAUABQBnAQAANRMAAAAA
">
 <v:group id="Group_x0020_241" o:spid="_x0000_s1027" style='position:absolute;
  top:21309;width:18685;height:12086' coordsize="18685,12085" o:gfxdata="UEsDBBQABgAIAAAAIQCi+E9TBAEAAOwBAAATAAAAW0NvbnRlbnRfVHlwZXNdLnhtbJSRy07DMBBF
90j8g+UtShxYIISadEGAHSAoHzCyJ4lFYlseN7R/z7iPDaJIXdpzz5wre7HcTKOYMZL1rpbXZSUF
Ou2NdX0tP1dPxZ0UlMAZGL3DWm6R5LK5vFistgFJMO2olkNK4V4p0gNOQKUP6HjS+ThB4mPsVQD9
BT2qm6q6Vdq7hC4VKe+QzaLFDtZjEo8bvt43iTiSFA/7YHbVEkIYrYbETdXszC9LcTCUTO4yNNhA
V1xDqj8NeXJacOBe+WmiNSjeIKYXmLiGMpFUH/060AABOVj+vyp3najwXWc1lm2k5wx/ZPhY75TG
+G8XcT5X0DL2jvNxu9r9VfMDAAD//wMAUEsDBBQABgAIAAAAIQBsBtX+2AAAAJkBAAALAAAAX3Jl
bHMvLnJlbHOkkMFKAzEQhu+C7xDm7mbbg4g025vQa63gNSSz2eAmE2biat/eWBBc6c3jzM9838/s
9p9pVguyRMoGNl0PCrMjH3Mw8HJ6unsAJdVmb2fKaOCMAvvh9mZ3xNnWdiRTLKIaJYuBqdbyqLW4
CZOVjgrmlozEydY2ctDFujcbUG/7/l7zbwYMK6Y6eAN88FtQp3Np5j/sFB2T0Fg7R0nTOEZ3jao9
feQjLo1iOWA14FkuS8ala+VAX/du/ukNTO/lebIFX5tkZb9E8h01/08HvXro8AUAAP//AwBQSwME
FAAGAAgAAAAhADMvBZ5BAAAAOQAAABUAAABkcnMvZ3JvdXBzaGFwZXhtbC54bWyysa/IzVEoSy0q
zszPs1Uy1DNQUkjNS85PycxLt1UKDXHTtVBSKC5JzEtJzMnPS7VVqkwtVrK34+UCAAAA//8DAFBL
AwQUAAYACAAAACEAacfne8QAAADcAAAADwAAAGRycy9kb3ducmV2LnhtbESPQYvCMBSE78L+h/AW
vGlaVxepRhHZFQ8iqAvi7dE822LzUppsW/+9EQSPw8x8w8yXnSlFQ7UrLCuIhxEI4tTqgjMFf6ff
wRSE88gaS8uk4E4OlouP3hwTbVs+UHP0mQgQdgkqyL2vEildmpNBN7QVcfCutjbog6wzqWtsA9yU
chRF39JgwWEhx4rWOaW3479RsGmxXX3FP83udl3fL6fJ/ryLSan+Z7eagfDU+Xf41d5qBaNxDM8z
4QjIxQMAAP//AwBQSwECLQAUAAYACAAAACEAovhPUwQBAADsAQAAEwAAAAAAAAAAAAAAAAAAAAAA
W0NvbnRlbnRfVHlwZXNdLnhtbFBLAQItABQABgAIAAAAIQBsBtX+2AAAAJkBAAALAAAAAAAAAAAA
AAAAADUBAABfcmVscy8ucmVsc1BLAQItABQABgAIAAAAIQAzLwWeQQAAADkAAAAVAAAAAAAAAAAA
AAAAADYCAABkcnMvZ3JvdXBzaGFwZXhtbC54bWxQSwECLQAUAAYACAAAACEAacfne8QAAADcAAAA
DwAAAAAAAAAAAAAAAACqAgAAZHJzL2Rvd25yZXYueG1sUEsFBgAAAAAEAAQA+gAAAJsDAAAAAA==
">
  <v:group id="Group_x0020_242" o:spid="_x0000_s1028" style='position:absolute;
   width:18685;height:12085' coordsize="18685,12085" o:gfxdata="UEsDBBQABgAIAAAAIQCi+E9TBAEAAOwBAAATAAAAW0NvbnRlbnRfVHlwZXNdLnhtbJSRy07DMBBF
90j8g+UtShxYIISadEGAHSAoHzCyJ4lFYlseN7R/z7iPDaJIXdpzz5wre7HcTKOYMZL1rpbXZSUF
Ou2NdX0tP1dPxZ0UlMAZGL3DWm6R5LK5vFistgFJMO2olkNK4V4p0gNOQKUP6HjS+ThB4mPsVQD9
BT2qm6q6Vdq7hC4VKe+QzaLFDtZjEo8bvt43iTiSFA/7YHbVEkIYrYbETdXszC9LcTCUTO4yNNhA
V1xDqj8NeXJacOBe+WmiNSjeIKYXmLiGMpFUH/060AABOVj+vyp3najwXWc1lm2k5wx/ZPhY75TG
+G8XcT5X0DL2jvNxu9r9VfMDAAD//wMAUEsDBBQABgAIAAAAIQBsBtX+2AAAAJkBAAALAAAAX3Jl
bHMvLnJlbHOkkMFKAzEQhu+C7xDm7mbbg4g025vQa63gNSSz2eAmE2biat/eWBBc6c3jzM9838/s
9p9pVguyRMoGNl0PCrMjH3Mw8HJ6unsAJdVmb2fKaOCMAvvh9mZ3xNnWdiRTLKIaJYuBqdbyqLW4
CZOVjgrmlozEydY2ctDFujcbUG/7/l7zbwYMK6Y6eAN88FtQp3Np5j/sFB2T0Fg7R0nTOEZ3jao9
feQjLo1iOWA14FkuS8ala+VAX/du/ukNTO/lebIFX5tkZb9E8h01/08HvXro8AUAAP//AwBQSwME
FAAGAAgAAAAhADMvBZ5BAAAAOQAAABUAAABkcnMvZ3JvdXBzaGFwZXhtbC54bWyysa/IzVEoSy0q
zszPs1Uy1DNQUkjNS85PycxLt1UKDXHTtVBSKC5JzEtJzMnPS7VVqkwtVrK34+UCAAAA//8DAFBL
AwQUAAYACAAAACEAmRV5DMUAAADcAAAADwAAAGRycy9kb3ducmV2LnhtbESPT2vCQBTE7wW/w/IE
b3WT2IpEVxFR6UEK/gHx9sg+k2D2bciuSfz23UKhx2FmfsMsVr2pREuNKy0riMcRCOLM6pJzBZfz
7n0GwnlkjZVlUvAiB6vl4G2BqbYdH6k9+VwECLsUFRTe16mULivIoBvbmjh4d9sY9EE2udQNdgFu
KplE0VQaLDksFFjTpqDscXoaBfsOu/Uk3raHx33zup0/v6+HmJQaDfv1HISn3v+H/9pfWkHykcDv
mXAE5PIHAAD//wMAUEsBAi0AFAAGAAgAAAAhAKL4T1MEAQAA7AEAABMAAAAAAAAAAAAAAAAAAAAA
AFtDb250ZW50X1R5cGVzXS54bWxQSwECLQAUAAYACAAAACEAbAbV/tgAAACZAQAACwAAAAAAAAAA
AAAAAAA1AQAAX3JlbHMvLnJlbHNQSwECLQAUAAYACAAAACEAMy8FnkEAAAA5AAAAFQAAAAAAAAAA
AAAAAAA2AgAAZHJzL2dyb3Vwc2hhcGV4bWwueG1sUEsBAi0AFAAGAAgAAAAhAJkVeQzFAAAA3AAA
AA8AAAAAAAAAAAAAAAAAqgIAAGRycy9kb3ducmV2LnhtbFBLBQYAAAAABAAEAPoAAACcAwAAAAA=
">
   <v:rect id="Rectangle_x0020_243" o:spid="_x0000_s1029" style='position:absolute;
    width:18685;height:12085;visibility:visible;mso-wrap-style:square;
    v-text-anchor:middle' o:gfxdata="UEsDBBQABgAIAAAAIQDw94q7/QAAAOIBAAATAAAAW0NvbnRlbnRfVHlwZXNdLnhtbJSRzUrEMBDH
74LvEOYqbaoHEWm6B6tHFV0fYEimbdg2CZlYd9/edD8u4goeZ+b/8SOpV9tpFDNFtt4puC4rEOS0
N9b1Cj7WT8UdCE7oDI7ekYIdMayay4t6vQvEIrsdKxhSCvdSsh5oQi59IJcvnY8TpjzGXgbUG+xJ
3lTVrdTeJXKpSEsGNHVLHX6OSTxu8/pAEmlkEA8H4dKlAEMYrcaUSeXszI+W4thQZudew4MNfJUx
QP7asFzOFxx9L/lpojUkXjGmZ5wyhjSRJQ8YKGvKv1MWzIkL33VWU9lGfl98J6hz4cZ/uUjzf7Pb
bHuj+ZQu9z/UfAMAAP//AwBQSwMEFAAGAAgAAAAhADHdX2HSAAAAjwEAAAsAAABfcmVscy8ucmVs
c6SQwWrDMAyG74O9g9G9cdpDGaNOb4VeSwe7CltJTGPLWCZt376mMFhGbzvqF/o+8e/2tzCpmbJ4
jgbWTQuKomXn42Dg63xYfYCSgtHhxJEM3Elg372/7U40YalHMvokqlKiGBhLSZ9aix0poDScKNZN
zzlgqWMedEJ7wYH0pm23Ov9mQLdgqqMzkI9uA+p8T9X8hx28zSzcl8Zy0Nz33r6iasfXeKK5UjAP
VAy4LM8w09zU50C/9q7/6ZURE31X/kL8TKv1x6wXNXYPAAAA//8DAFBLAwQUAAYACAAAACEAMy8F
nkEAAAA5AAAAEAAAAGRycy9zaGFwZXhtbC54bWyysa/IzVEoSy0qzszPs1Uy1DNQUkjNS85PycxL
t1UKDXHTtVBSKC5JzEtJzMnPS7VVqkwtVrK34+UCAAAA//8DAFBLAwQUAAYACAAAACEAioLH1cQA
AADcAAAADwAAAGRycy9kb3ducmV2LnhtbESPzWrDMBCE74W8g9hAb40cNzTGiWJCoTT0UprkARZr
YzuxVkaSf5qnrwqFHoeZ+YbZFpNpxUDON5YVLBcJCOLS6oYrBefT21MGwgdkja1lUvBNHord7GGL
ubYjf9FwDJWIEPY5KqhD6HIpfVmTQb+wHXH0LtYZDFG6SmqHY4SbVqZJ8iINNhwXauzotabyduyN
Arv8DB+ncdUzje49a65le19nSj3Op/0GRKAp/If/2getIF09w++ZeATk7gcAAP//AwBQSwECLQAU
AAYACAAAACEA8PeKu/0AAADiAQAAEwAAAAAAAAAAAAAAAAAAAAAAW0NvbnRlbnRfVHlwZXNdLnht
bFBLAQItABQABgAIAAAAIQAx3V9h0gAAAI8BAAALAAAAAAAAAAAAAAAAAC4BAABfcmVscy8ucmVs
c1BLAQItABQABgAIAAAAIQAzLwWeQQAAADkAAAAQAAAAAAAAAAAAAAAAACkCAABkcnMvc2hhcGV4
bWwueG1sUEsBAi0AFAAGAAgAAAAhAIqCx9XEAAAA3AAAAA8AAAAAAAAAAAAAAAAAmAIAAGRycy9k
b3ducmV2LnhtbFBLBQYAAAAABAAEAPUAAACJAwAAAAA=
" fillcolor="#4f81bd [3204]" strokecolor="#243f60 [1604]" strokeweight="2pt"/>
   <v:shape id="Cube_x0020_244" o:spid="_x0000_s1030" type="#_x0000_t16"
    style='position:absolute;left:2067;top:5247;width:15425;height:5963;
    visibility:visible;mso-wrap-style:square;v-text-anchor:middle' o:gfxdata="UEsDBBQABgAIAAAAIQDw94q7/QAAAOIBAAATAAAAW0NvbnRlbnRfVHlwZXNdLnhtbJSRzUrEMBDH
74LvEOYqbaoHEWm6B6tHFV0fYEimbdg2CZlYd9/edD8u4goeZ+b/8SOpV9tpFDNFtt4puC4rEOS0
N9b1Cj7WT8UdCE7oDI7ekYIdMayay4t6vQvEIrsdKxhSCvdSsh5oQi59IJcvnY8TpjzGXgbUG+xJ
3lTVrdTeJXKpSEsGNHVLHX6OSTxu8/pAEmlkEA8H4dKlAEMYrcaUSeXszI+W4thQZudew4MNfJUx
QP7asFzOFxx9L/lpojUkXjGmZ5wyhjSRJQ8YKGvKv1MWzIkL33VWU9lGfl98J6hz4cZ/uUjzf7Pb
bHuj+ZQu9z/UfAMAAP//AwBQSwMEFAAGAAgAAAAhADHdX2HSAAAAjwEAAAsAAABfcmVscy8ucmVs
c6SQwWrDMAyG74O9g9G9cdpDGaNOb4VeSwe7CltJTGPLWCZt376mMFhGbzvqF/o+8e/2tzCpmbJ4
jgbWTQuKomXn42Dg63xYfYCSgtHhxJEM3Elg372/7U40YalHMvokqlKiGBhLSZ9aix0poDScKNZN
zzlgqWMedEJ7wYH0pm23Ov9mQLdgqqMzkI9uA+p8T9X8hx28zSzcl8Zy0Nz33r6iasfXeKK5UjAP
VAy4LM8w09zU50C/9q7/6ZURE31X/kL8TKv1x6wXNXYPAAAA//8DAFBLAwQUAAYACAAAACEAMy8F
nkEAAAA5AAAAEAAAAGRycy9zaGFwZXhtbC54bWyysa/IzVEoSy0qzszPs1Uy1DNQUkjNS85PycxL
t1UKDXHTtVBSKC5JzEtJzMnPS7VVqkwtVrK34+UCAAAA//8DAFBLAwQUAAYACAAAACEAbhoWP8MA
AADcAAAADwAAAGRycy9kb3ducmV2LnhtbESPQYvCMBSE74L/ITzBi2iquMtajSKi4ElYtQdvj+bZ
FpuX0kRb/70RBI/DzHzDLFatKcWDaldYVjAeRSCIU6sLzhScT7vhHwjnkTWWlknBkxyslt3OAmNt
G/6nx9FnIkDYxagg976KpXRpTgbdyFbEwbva2qAPss6krrEJcFPKSRT9SoMFh4UcK9rklN6Od6Pg
8DM47S/lOYkaJ2fj2zZBf0iU6vfa9RyEp9Z/w5/2XiuYTKfwPhOOgFy+AAAA//8DAFBLAQItABQA
BgAIAAAAIQDw94q7/QAAAOIBAAATAAAAAAAAAAAAAAAAAAAAAABbQ29udGVudF9UeXBlc10ueG1s
UEsBAi0AFAAGAAgAAAAhADHdX2HSAAAAjwEAAAsAAAAAAAAAAAAAAAAALgEAAF9yZWxzLy5yZWxz
UEsBAi0AFAAGAAgAAAAhADMvBZ5BAAAAOQAAABAAAAAAAAAAAAAAAAAAKQIAAGRycy9zaGFwZXht
bC54bWxQSwECLQAUAAYACAAAACEAbhoWP8MAAADcAAAADwAAAAAAAAAAAAAAAACYAgAAZHJzL2Rv
d25yZXYueG1sUEsFBgAAAAAEAAQA9QAAAIgDAAAAAA==
" fillcolor="#4f81bd [3204]" strokecolor="#243f60 [1604]" strokeweight="2pt">
    <v:textbox>
     <![if !mso]>
     <table cellpadding=0 cellspacing=0 width="100%">
<tr>
       <td><![endif]>
       <div>
       <p class=MsoNormal align=center style='text-align:center'>
Whisper</p></p>
</div>
<![if !mso]></td>
      </tr>
</table>
<![endif]></v:textbox>
   </v:shape></v:group><v:shape id="Snip_x0020_Diagonal_x0020_Corner_x0020_Rectangle_x0020_245"
   o:spid="_x0000_s1031" style='position:absolute;left:1669;top:1272;width:7236;
   height:3180;visibility:visible;mso-wrap-style:square;v-text-anchor:middle'
   coordsize="723569,318052" o:spt="100" o:gfxdata="UEsDBBQABgAIAAAAIQDw94q7/QAAAOIBAAATAAAAW0NvbnRlbnRfVHlwZXNdLnhtbJSRzUrEMBDH
74LvEOYqbaoHEWm6B6tHFV0fYEimbdg2CZlYd9/edD8u4goeZ+b/8SOpV9tpFDNFtt4puC4rEOS0
N9b1Cj7WT8UdCE7oDI7ekYIdMayay4t6vQvEIrsdKxhSCvdSsh5oQi59IJcvnY8TpjzGXgbUG+xJ
3lTVrdTeJXKpSEsGNHVLHX6OSTxu8/pAEmlkEA8H4dKlAEMYrcaUSeXszI+W4thQZudew4MNfJUx
QP7asFzOFxx9L/lpojUkXjGmZ5wyhjSRJQ8YKGvKv1MWzIkL33VWU9lGfl98J6hz4cZ/uUjzf7Pb
bHuj+ZQu9z/UfAMAAP//AwBQSwMEFAAGAAgAAAAhADHdX2HSAAAAjwEAAAsAAABfcmVscy8ucmVs
c6SQwWrDMAyG74O9g9G9cdpDGaNOb4VeSwe7CltJTGPLWCZt376mMFhGbzvqF/o+8e/2tzCpmbJ4
jgbWTQuKomXn42Dg63xYfYCSgtHhxJEM3Elg372/7U40YalHMvokqlKiGBhLSZ9aix0poDScKNZN
zzlgqWMedEJ7wYH0pm23Ov9mQLdgqqMzkI9uA+p8T9X8hx28zSzcl8Zy0Nz33r6iasfXeKK5UjAP
VAy4LM8w09zU50C/9q7/6ZURE31X/kL8TKv1x6wXNXYPAAAA//8DAFBLAwQUAAYACAAAACEAMy8F
nkEAAAA5AAAAEAAAAGRycy9zaGFwZXhtbC54bWyysa/IzVEoSy0qzszPs1Uy1DNQUkjNS85PycxL
t1UKDXHTtVBSKC5JzEtJzMnPS7VVqkwtVrK34+UCAAAA//8DAFBLAwQUAAYACAAAACEAEWvG6sIA
AADcAAAADwAAAGRycy9kb3ducmV2LnhtbESPS2vCQBSF9wX/w3AFd3WiaJHoKNUquHHho4vuLplr
Epq5EzK3Jv57RxC6PHznwVmsOlepGzWh9GxgNExAEWfelpwbuJx37zNQQZAtVp7JwJ0CrJa9twWm
1rd8pNtJchVLOKRooBCpU61DVpDDMPQ1cWRX3ziUKJtc2wbbWO4qPU6SD+2w5LhQYE2bgrLf058z
wH4t7jDa/nwd0bZC7eG721tjBv3ucw5KqJN/8ysdOYwnU3ieiUdALx8AAAD//wMAUEsBAi0AFAAG
AAgAAAAhAPD3irv9AAAA4gEAABMAAAAAAAAAAAAAAAAAAAAAAFtDb250ZW50X1R5cGVzXS54bWxQ
SwECLQAUAAYACAAAACEAMd1fYdIAAACPAQAACwAAAAAAAAAAAAAAAAAuAQAAX3JlbHMvLnJlbHNQ
SwECLQAUAAYACAAAACEAMy8FnkEAAAA5AAAAEAAAAAAAAAAAAAAAAAApAgAAZHJzL3NoYXBleG1s
LnhtbFBLAQItABQABgAIAAAAIQARa8bqwgAAANwAAAAPAAAAAAAAAAAAAAAAAJgCAABkcnMvZG93
bnJldi54bWxQSwUGAAAAAAQABAD1AAAAhwMAAAAA
" adj="-11796480,,5400" path="m,l670559,r53010,53010l723569,318052r,l53010,318052,,265042,,xe"
   fillcolor="#4f81bd [3204]" strokecolor="#243f60 [1604]" strokeweight="2pt">
   <v:stroke joinstyle="miter"/>
   <v:formulas/>
   <v:path arrowok="t" o:connecttype="custom" o:connectlocs="0,0;670559,0;723569,53010;723569,318052;723569,318052;53010,318052;0,265042;0,0"
    o:connectangles="0,0,0,0,0,0,0,0" textboxrect="0,0,723569,318052"/>
   <v:textbox>
    <![if !mso]>
    <table cellpadding=0 cellspacing=0 width="100%">
<tr>
      <td><![endif]>
      <div>
      <p class=MsoNormal align=center style='text-align:center'>
Cache</p></p>
</div>
<![if !mso]></td>
     </tr>
</table>
<![endif]></v:textbox>
  </v:shape><v:shape id="Snip_x0020_Diagonal_x0020_Corner_x0020_Rectangle_x0020_246"
   o:spid="_x0000_s1032" style='position:absolute;left:9859;top:1272;width:7236;
   height:3180;visibility:visible;mso-wrap-style:square;v-text-anchor:middle'
   coordsize="723569,318052" o:spt="100" o:gfxdata="UEsDBBQABgAIAAAAIQDw94q7/QAAAOIBAAATAAAAW0NvbnRlbnRfVHlwZXNdLnhtbJSRzUrEMBDH
74LvEOYqbaoHEWm6B6tHFV0fYEimbdg2CZlYd9/edD8u4goeZ+b/8SOpV9tpFDNFtt4puC4rEOS0
N9b1Cj7WT8UdCE7oDI7ekYIdMayay4t6vQvEIrsdKxhSCvdSsh5oQi59IJcvnY8TpjzGXgbUG+xJ
3lTVrdTeJXKpSEsGNHVLHX6OSTxu8/pAEmlkEA8H4dKlAEMYrcaUSeXszI+W4thQZudew4MNfJUx
QP7asFzOFxx9L/lpojUkXjGmZ5wyhjSRJQ8YKGvKv1MWzIkL33VWU9lGfl98J6hz4cZ/uUjzf7Pb
bHuj+ZQu9z/UfAMAAP//AwBQSwMEFAAGAAgAAAAhADHdX2HSAAAAjwEAAAsAAABfcmVscy8ucmVs
c6SQwWrDMAyG74O9g9G9cdpDGaNOb4VeSwe7CltJTGPLWCZt376mMFhGbzvqF/o+8e/2tzCpmbJ4
jgbWTQuKomXn42Dg63xYfYCSgtHhxJEM3Elg372/7U40YalHMvokqlKiGBhLSZ9aix0poDScKNZN
zzlgqWMedEJ7wYH0pm23Ov9mQLdgqqMzkI9uA+p8T9X8hx28zSzcl8Zy0Nz33r6iasfXeKK5UjAP
VAy4LM8w09zU50C/9q7/6ZURE31X/kL8TKv1x6wXNXYPAAAA//8DAFBLAwQUAAYACAAAACEAMy8F
nkEAAAA5AAAAEAAAAGRycy9zaGFwZXhtbC54bWyysa/IzVEoSy0qzszPs1Uy1DNQUkjNS85PycxL
t1UKDXHTtVBSKC5JzEtJzMnPS7VVqkwtVrK34+UCAAAA//8DAFBLAwQUAAYACAAAACEA4blYncIA
AADcAAAADwAAAGRycy9kb3ducmV2LnhtbESPS2vCQBSF90L/w3AL3ZmJUoKkGaUPC25cRNtFd5fM
NQlm7oTM1aT/3ikUXB6+8+AUm8l16kpDaD0bWCQpKOLK25ZrA1/Hz/kKVBBki51nMvBLATbrh1mB
ufUjl3Q9SK1iCYccDTQifa51qBpyGBLfE0d28oNDiXKotR1wjOWu08s0zbTDluNCgz29N1SdDxdn
gP2buP1i+/NRoh2Fxv33tLPGPD1Ory+ghCa5m//TkcPyOYO/M/EI6PUNAAD//wMAUEsBAi0AFAAG
AAgAAAAhAPD3irv9AAAA4gEAABMAAAAAAAAAAAAAAAAAAAAAAFtDb250ZW50X1R5cGVzXS54bWxQ
SwECLQAUAAYACAAAACEAMd1fYdIAAACPAQAACwAAAAAAAAAAAAAAAAAuAQAAX3JlbHMvLnJlbHNQ
SwECLQAUAAYACAAAACEAMy8FnkEAAAA5AAAAEAAAAAAAAAAAAAAAAAApAgAAZHJzL3NoYXBleG1s
LnhtbFBLAQItABQABgAIAAAAIQDhuVidwgAAANwAAAAPAAAAAAAAAAAAAAAAAJgCAABkcnMvZG93
bnJldi54bWxQSwUGAAAAAAQABAD1AAAAhwMAAAAA
" adj="-11796480,,5400" path="m,l670559,r53010,53010l723569,318052r,l53010,318052,,265042,,xe"
   fillcolor="#4f81bd [3204]" strokecolor="#243f60 [1604]" strokeweight="2pt">
   <v:stroke joinstyle="miter"/>
   <v:formulas/>
   <v:path arrowok="t" o:connecttype="custom" o:connectlocs="0,0;670559,0;723569,53010;723569,318052;723569,318052;53010,318052;0,265042;0,0"
    o:connectangles="0,0,0,0,0,0,0,0" textboxrect="0,0,723569,318052"/>
   <v:textbox>
    <![if !mso]>
    <table cellpadding=0 cellspacing=0 width="100%">
<tr>
      <td><![endif]>
      <div>
      <p class=MsoNormal align=center style='text-align:center'>
Cache</p></p>
</div>
<![if !mso]></td>
     </tr>
</table>
<![endif]></v:textbox>
  </v:shape></v:group><v:group id="Group_x0020_247" o:spid="_x0000_s1033"
  style='position:absolute;left:20514;top:21309;width:18685;height:12086'
  coordsize="18685,12085" o:gfxdata="UEsDBBQABgAIAAAAIQCi+E9TBAEAAOwBAAATAAAAW0NvbnRlbnRfVHlwZXNdLnhtbJSRy07DMBBF
90j8g+UtShxYIISadEGAHSAoHzCyJ4lFYlseN7R/z7iPDaJIXdpzz5wre7HcTKOYMZL1rpbXZSUF
Ou2NdX0tP1dPxZ0UlMAZGL3DWm6R5LK5vFistgFJMO2olkNK4V4p0gNOQKUP6HjS+ThB4mPsVQD9
BT2qm6q6Vdq7hC4VKe+QzaLFDtZjEo8bvt43iTiSFA/7YHbVEkIYrYbETdXszC9LcTCUTO4yNNhA
V1xDqj8NeXJacOBe+WmiNSjeIKYXmLiGMpFUH/060AABOVj+vyp3najwXWc1lm2k5wx/ZPhY75TG
+G8XcT5X0DL2jvNxu9r9VfMDAAD//wMAUEsDBBQABgAIAAAAIQBsBtX+2AAAAJkBAAALAAAAX3Jl
bHMvLnJlbHOkkMFKAzEQhu+C7xDm7mbbg4g025vQa63gNSSz2eAmE2biat/eWBBc6c3jzM9838/s
9p9pVguyRMoGNl0PCrMjH3Mw8HJ6unsAJdVmb2fKaOCMAvvh9mZ3xNnWdiRTLKIaJYuBqdbyqLW4
CZOVjgrmlozEydY2ctDFujcbUG/7/l7zbwYMK6Y6eAN88FtQp3Np5j/sFB2T0Fg7R0nTOEZ3jao9
feQjLo1iOWA14FkuS8ala+VAX/du/ukNTO/lebIFX5tkZb9E8h01/08HvXro8AUAAP//AwBQSwME
FAAGAAgAAAAhADMvBZ5BAAAAOQAAABUAAABkcnMvZ3JvdXBzaGFwZXhtbC54bWyysa/IzVEoSy0q
zszPs1Uy1DNQUkjNS85PycxLt1UKDXHTtVBSKC5JzEtJzMnPS7VVqkwtVrK34+UCAAAA//8DAFBL
AwQUAAYACAAAACEAiWLalMUAAADcAAAADwAAAGRycy9kb3ducmV2LnhtbESPT2vCQBTE74LfYXmC
t7qJf0t0FRGVHqRQLZTeHtlnEsy+Ddk1id++KxQ8DjPzG2a16UwpGqpdYVlBPIpAEKdWF5wp+L4c
3t5BOI+ssbRMCh7kYLPu91aYaNvyFzVnn4kAYZeggtz7KpHSpTkZdCNbEQfvamuDPsg6k7rGNsBN
KcdRNJcGCw4LOVa0yym9ne9GwbHFdjuJ983pdt09fi+zz59TTEoNB912CcJT51/h//aHVjCeLuB5
JhwBuf4DAAD//wMAUEsBAi0AFAAGAAgAAAAhAKL4T1MEAQAA7AEAABMAAAAAAAAAAAAAAAAAAAAA
AFtDb250ZW50X1R5cGVzXS54bWxQSwECLQAUAAYACAAAACEAbAbV/tgAAACZAQAACwAAAAAAAAAA
AAAAAAA1AQAAX3JlbHMvLnJlbHNQSwECLQAUAAYACAAAACEAMy8FnkEAAAA5AAAAFQAAAAAAAAAA
AAAAAAA2AgAAZHJzL2dyb3Vwc2hhcGV4bWwueG1sUEsBAi0AFAAGAAgAAAAhAIli2pTFAAAA3AAA
AA8AAAAAAAAAAAAAAAAAqgIAAGRycy9kb3ducmV2LnhtbFBLBQYAAAAABAAEAPoAAACcAwAAAAA=
">
  <v:group id="Group_x0020_248" o:spid="_x0000_s1034" style='position:absolute;
   width:18685;height:12085' coordsize="18685,12085" o:gfxdata="UEsDBBQABgAIAAAAIQCi+E9TBAEAAOwBAAATAAAAW0NvbnRlbnRfVHlwZXNdLnhtbJSRy07DMBBF
90j8g+UtShxYIISadEGAHSAoHzCyJ4lFYlseN7R/z7iPDaJIXdpzz5wre7HcTKOYMZL1rpbXZSUF
Ou2NdX0tP1dPxZ0UlMAZGL3DWm6R5LK5vFistgFJMO2olkNK4V4p0gNOQKUP6HjS+ThB4mPsVQD9
BT2qm6q6Vdq7hC4VKe+QzaLFDtZjEo8bvt43iTiSFA/7YHbVEkIYrYbETdXszC9LcTCUTO4yNNhA
V1xDqj8NeXJacOBe+WmiNSjeIKYXmLiGMpFUH/060AABOVj+vyp3najwXWc1lm2k5wx/ZPhY75TG
+G8XcT5X0DL2jvNxu9r9VfMDAAD//wMAUEsDBBQABgAIAAAAIQBsBtX+2AAAAJkBAAALAAAAX3Jl
bHMvLnJlbHOkkMFKAzEQhu+C7xDm7mbbg4g025vQa63gNSSz2eAmE2biat/eWBBc6c3jzM9838/s
9p9pVguyRMoGNl0PCrMjH3Mw8HJ6unsAJdVmb2fKaOCMAvvh9mZ3xNnWdiRTLKIaJYuBqdbyqLW4
CZOVjgrmlozEydY2ctDFujcbUG/7/l7zbwYMK6Y6eAN88FtQp3Np5j/sFB2T0Fg7R0nTOEZ3jao9
feQjLo1iOWA14FkuS8ala+VAX/du/ukNTO/lebIFX5tkZb9E8h01/08HvXro8AUAAP//AwBQSwME
FAAGAAgAAAAhADMvBZ5BAAAAOQAAABUAAABkcnMvZ3JvdXBzaGFwZXhtbC54bWyysa/IzVEoSy0q
zszPs1Uy1DNQUkjNS85PycxLt1UKDXHTtVBSKC5JzEtJzMnPS7VVqkwtVrK34+UCAAAA//8DAFBL
AwQUAAYACAAAACEA+P1O5sIAAADcAAAADwAAAGRycy9kb3ducmV2LnhtbERPy4rCMBTdC/MP4Q64
07S+GDpGERmHWYhgHRB3l+baFpub0sS2/r1ZCC4P571c96YSLTWutKwgHkcgiDOrS84V/J92oy8Q
ziNrrCyTggc5WK8+BktMtO34SG3qcxFC2CWooPC+TqR0WUEG3djWxIG72sagD7DJpW6wC+GmkpMo
WkiDJYeGAmvaFpTd0rtR8Ntht5nGP+3+dt0+Lqf54byPSanhZ7/5BuGp92/xy/2nFUxmYW04E46A
XD0BAAD//wMAUEsBAi0AFAAGAAgAAAAhAKL4T1MEAQAA7AEAABMAAAAAAAAAAAAAAAAAAAAAAFtD
b250ZW50X1R5cGVzXS54bWxQSwECLQAUAAYACAAAACEAbAbV/tgAAACZAQAACwAAAAAAAAAAAAAA
AAA1AQAAX3JlbHMvLnJlbHNQSwECLQAUAAYACAAAACEAMy8FnkEAAAA5AAAAFQAAAAAAAAAAAAAA
AAA2AgAAZHJzL2dyb3Vwc2hhcGV4bWwueG1sUEsBAi0AFAAGAAgAAAAhAPj9TubCAAAA3AAAAA8A
AAAAAAAAAAAAAAAAqgIAAGRycy9kb3ducmV2LnhtbFBLBQYAAAAABAAEAPoAAACZAwAAAAA=
">
   <v:rect id="Rectangle_x0020_249" o:spid="_x0000_s1035" style='position:absolute;
    width:18685;height:12085;visibility:visible;mso-wrap-style:square;
    v-text-anchor:middle' o:gfxdata="UEsDBBQABgAIAAAAIQDw94q7/QAAAOIBAAATAAAAW0NvbnRlbnRfVHlwZXNdLnhtbJSRzUrEMBDH
74LvEOYqbaoHEWm6B6tHFV0fYEimbdg2CZlYd9/edD8u4goeZ+b/8SOpV9tpFDNFtt4puC4rEOS0
N9b1Cj7WT8UdCE7oDI7ekYIdMayay4t6vQvEIrsdKxhSCvdSsh5oQi59IJcvnY8TpjzGXgbUG+xJ
3lTVrdTeJXKpSEsGNHVLHX6OSTxu8/pAEmlkEA8H4dKlAEMYrcaUSeXszI+W4thQZudew4MNfJUx
QP7asFzOFxx9L/lpojUkXjGmZ5wyhjSRJQ8YKGvKv1MWzIkL33VWU9lGfl98J6hz4cZ/uUjzf7Pb
bHuj+ZQu9z/UfAMAAP//AwBQSwMEFAAGAAgAAAAhADHdX2HSAAAAjwEAAAsAAABfcmVscy8ucmVs
c6SQwWrDMAyG74O9g9G9cdpDGaNOb4VeSwe7CltJTGPLWCZt376mMFhGbzvqF/o+8e/2tzCpmbJ4
jgbWTQuKomXn42Dg63xYfYCSgtHhxJEM3Elg372/7U40YalHMvokqlKiGBhLSZ9aix0poDScKNZN
zzlgqWMedEJ7wYH0pm23Ov9mQLdgqqMzkI9uA+p8T9X8hx28zSzcl8Zy0Nz33r6iasfXeKK5UjAP
VAy4LM8w09zU50C/9q7/6ZURE31X/kL8TKv1x6wXNXYPAAAA//8DAFBLAwQUAAYACAAAACEAMy8F
nkEAAAA5AAAAEAAAAGRycy9zaGFwZXhtbC54bWyysa/IzVEoSy0qzszPs1Uy1DNQUkjNS85PycxL
t1UKDXHTtVBSKC5JzEtJzMnPS7VVqkwtVrK34+UCAAAA//8DAFBLAwQUAAYACAAAACEA62rwP8QA
AADcAAAADwAAAGRycy9kb3ducmV2LnhtbESPUWvCMBSF3wf+h3CFvc1Uka1Wo8hgbOxlrPUHXJJr
W21uShJtt1+/DAQfD+ec73A2u9F24ko+tI4VzGcZCGLtTMu1gkP19pSDCBHZYOeYFPxQgN128rDB
wriBv+laxlokCIcCFTQx9oWUQTdkMcxcT5y8o/MWY5K+lsbjkOC2k4sse5YWW04LDfb02pA+lxer
wM2/4mc1LC9Mg3/P25Pufl9ypR6n434NItIY7+Fb+8MoWCxX8H8mHQG5/QMAAP//AwBQSwECLQAU
AAYACAAAACEA8PeKu/0AAADiAQAAEwAAAAAAAAAAAAAAAAAAAAAAW0NvbnRlbnRfVHlwZXNdLnht
bFBLAQItABQABgAIAAAAIQAx3V9h0gAAAI8BAAALAAAAAAAAAAAAAAAAAC4BAABfcmVscy8ucmVs
c1BLAQItABQABgAIAAAAIQAzLwWeQQAAADkAAAAQAAAAAAAAAAAAAAAAACkCAABkcnMvc2hhcGV4
bWwueG1sUEsBAi0AFAAGAAgAAAAhAOtq8D/EAAAA3AAAAA8AAAAAAAAAAAAAAAAAmAIAAGRycy9k
b3ducmV2LnhtbFBLBQYAAAAABAAEAPUAAACJAwAAAAA=
" fillcolor="#4f81bd [3204]" strokecolor="#243f60 [1604]" strokeweight="2pt"/>
   <v:shape id="Cube_x0020_250" o:spid="_x0000_s1036" type="#_x0000_t16"
    style='position:absolute;left:2067;top:5247;width:15425;height:5963;
    visibility:visible;mso-wrap-style:square;v-text-anchor:middle' o:gfxdata="UEsDBBQABgAIAAAAIQDw94q7/QAAAOIBAAATAAAAW0NvbnRlbnRfVHlwZXNdLnhtbJSRzUrEMBDH
74LvEOYqbaoHEWm6B6tHFV0fYEimbdg2CZlYd9/edD8u4goeZ+b/8SOpV9tpFDNFtt4puC4rEOS0
N9b1Cj7WT8UdCE7oDI7ekYIdMayay4t6vQvEIrsdKxhSCvdSsh5oQi59IJcvnY8TpjzGXgbUG+xJ
3lTVrdTeJXKpSEsGNHVLHX6OSTxu8/pAEmlkEA8H4dKlAEMYrcaUSeXszI+W4thQZudew4MNfJUx
QP7asFzOFxx9L/lpojUkXjGmZ5wyhjSRJQ8YKGvKv1MWzIkL33VWU9lGfl98J6hz4cZ/uUjzf7Pb
bHuj+ZQu9z/UfAMAAP//AwBQSwMEFAAGAAgAAAAhADHdX2HSAAAAjwEAAAsAAABfcmVscy8ucmVs
c6SQwWrDMAyG74O9g9G9cdpDGaNOb4VeSwe7CltJTGPLWCZt376mMFhGbzvqF/o+8e/2tzCpmbJ4
jgbWTQuKomXn42Dg63xYfYCSgtHhxJEM3Elg372/7U40YalHMvokqlKiGBhLSZ9aix0poDScKNZN
zzlgqWMedEJ7wYH0pm23Ov9mQLdgqqMzkI9uA+p8T9X8hx28zSzcl8Zy0Nz33r6iasfXeKK5UjAP
VAy4LM8w09zU50C/9q7/6ZURE31X/kL8TKv1x6wXNXYPAAAA//8DAFBLAwQUAAYACAAAACEAMy8F
nkEAAAA5AAAAEAAAAGRycy9zaGFwZXhtbC54bWyysa/IzVEoSy0qzszPs1Uy1DNQUkjNS85PycxL
t1UKDXHTtVBSKC5JzEtJzMnPS7VVqkwtVrK34+UCAAAA//8DAFBLAwQUAAYACAAAACEAlPiG4b4A
AADcAAAADwAAAGRycy9kb3ducmV2LnhtbERPuwrCMBTdBf8hXMFFNFVQtBpFRMFJ8NHB7dJc22Jz
U5po69+bQXA8nPdq05pSvKl2hWUF41EEgji1uuBMwe16GM5BOI+ssbRMCj7kYLPudlYYa9vwmd4X
n4kQwi5GBbn3VSylS3My6Ea2Ig7cw9YGfYB1JnWNTQg3pZxE0UwaLDg05FjRLqf0eXkZBafp4Hq8
l7ckapxcjJ/7BP0pUarfa7dLEJ5a/xf/3EetYDIN88OZcATk+gsAAP//AwBQSwECLQAUAAYACAAA
ACEA8PeKu/0AAADiAQAAEwAAAAAAAAAAAAAAAAAAAAAAW0NvbnRlbnRfVHlwZXNdLnhtbFBLAQIt
ABQABgAIAAAAIQAx3V9h0gAAAI8BAAALAAAAAAAAAAAAAAAAAC4BAABfcmVscy8ucmVsc1BLAQIt
ABQABgAIAAAAIQAzLwWeQQAAADkAAAAQAAAAAAAAAAAAAAAAACkCAABkcnMvc2hhcGV4bWwueG1s
UEsBAi0AFAAGAAgAAAAhAJT4huG+AAAA3AAAAA8AAAAAAAAAAAAAAAAAmAIAAGRycy9kb3ducmV2
LnhtbFBLBQYAAAAABAAEAPUAAACDAwAAAAA=
" fillcolor="#4f81bd [3204]" strokecolor="#243f60 [1604]" strokeweight="2pt">
    <v:textbox>
     <![if !mso]>
     <table cellpadding=0 cellspacing=0 width="100%">
<tr>
       <td><![endif]>
       <div>
       <p class=MsoNormal align=center style='text-align:center'>
Whisper</p></p>
</div>
<![if !mso]></td>
      </tr>
</table>
<![endif]></v:textbox>
   </v:shape></v:group><v:shape id="Snip_x0020_Diagonal_x0020_Corner_x0020_Rectangle_x0020_251"
   o:spid="_x0000_s1037" style='position:absolute;left:1669;top:1272;width:7236;
   height:3180;visibility:visible;mso-wrap-style:square;v-text-anchor:middle'
   coordsize="723569,318052" o:spt="100" o:gfxdata="UEsDBBQABgAIAAAAIQDw94q7/QAAAOIBAAATAAAAW0NvbnRlbnRfVHlwZXNdLnhtbJSRzUrEMBDH
74LvEOYqbaoHEWm6B6tHFV0fYEimbdg2CZlYd9/edD8u4goeZ+b/8SOpV9tpFDNFtt4puC4rEOS0
N9b1Cj7WT8UdCE7oDI7ekYIdMayay4t6vQvEIrsdKxhSCvdSsh5oQi59IJcvnY8TpjzGXgbUG+xJ
3lTVrdTeJXKpSEsGNHVLHX6OSTxu8/pAEmlkEA8H4dKlAEMYrcaUSeXszI+W4thQZudew4MNfJUx
QP7asFzOFxx9L/lpojUkXjGmZ5wyhjSRJQ8YKGvKv1MWzIkL33VWU9lGfl98J6hz4cZ/uUjzf7Pb
bHuj+ZQu9z/UfAMAAP//AwBQSwMEFAAGAAgAAAAhADHdX2HSAAAAjwEAAAsAAABfcmVscy8ucmVs
c6SQwWrDMAyG74O9g9G9cdpDGaNOb4VeSwe7CltJTGPLWCZt376mMFhGbzvqF/o+8e/2tzCpmbJ4
jgbWTQuKomXn42Dg63xYfYCSgtHhxJEM3Elg372/7U40YalHMvokqlKiGBhLSZ9aix0poDScKNZN
zzlgqWMedEJ7wYH0pm23Ov9mQLdgqqMzkI9uA+p8T9X8hx28zSzcl8Zy0Nz33r6iasfXeKK5UjAP
VAy4LM8w09zU50C/9q7/6ZURE31X/kL8TKv1x6wXNXYPAAAA//8DAFBLAwQUAAYACAAAACEAMy8F
nkEAAAA5AAAAEAAAAGRycy9zaGFwZXhtbC54bWyysa/IzVEoSy0qzszPs1Uy1DNQUkjNS85PycxL
t1UKDXHTtVBSKC5JzEtJzMnPS7VVqkwtVrK34+UCAAAA//8DAFBLAwQUAAYACAAAACEA64lWNMMA
AADcAAAADwAAAGRycy9kb3ducmV2LnhtbESPy2rDMBBF94H+g5hCd7FsQ0Nwopi2aaGbLPLoorvB
mtim1shYk9j9+6hQyPJy7oO7LifXqSsNofVsIEtSUMSVty3XBk7Hj/kSVBBki51nMvBLAcrNw2yN
hfUj7+l6kFrFEg4FGmhE+kLrUDXkMCS+J47s7AeHEuVQazvgGMtdp/M0XWiHLceFBnt6a6j6OVyc
Afav4nbZ+/d2j3YUGndf06c15ulxelmBEprkbv5PRw75cwZ/Z+IR0JsbAAAA//8DAFBLAQItABQA
BgAIAAAAIQDw94q7/QAAAOIBAAATAAAAAAAAAAAAAAAAAAAAAABbQ29udGVudF9UeXBlc10ueG1s
UEsBAi0AFAAGAAgAAAAhADHdX2HSAAAAjwEAAAsAAAAAAAAAAAAAAAAALgEAAF9yZWxzLy5yZWxz
UEsBAi0AFAAGAAgAAAAhADMvBZ5BAAAAOQAAABAAAAAAAAAAAAAAAAAAKQIAAGRycy9zaGFwZXht
bC54bWxQSwECLQAUAAYACAAAACEA64lWNMMAAADcAAAADwAAAAAAAAAAAAAAAACYAgAAZHJzL2Rv
d25yZXYueG1sUEsFBgAAAAAEAAQA9QAAAIgDAAAAAA==
" adj="-11796480,,5400" path="m,l670559,r53010,53010l723569,318052r,l53010,318052,,265042,,xe"
   fillcolor="#4f81bd [3204]" strokecolor="#243f60 [1604]" strokeweight="2pt">
   <v:stroke joinstyle="miter"/>
   <v:formulas/>
   <v:path arrowok="t" o:connecttype="custom" o:connectlocs="0,0;670559,0;723569,53010;723569,318052;723569,318052;53010,318052;0,265042;0,0"
    o:connectangles="0,0,0,0,0,0,0,0" textboxrect="0,0,723569,318052"/>
   <v:textbox>
    <![if !mso]>
    <table cellpadding=0 cellspacing=0 width="100%">
<tr>
      <td><![endif]>
      <div>
      <p class=MsoNormal align=center style='text-align:center'>
Cache</p></p>
</div>
<![if !mso]></td>
     </tr>
</table>
<![endif]></v:textbox>
  </v:shape><v:shape id="Snip_x0020_Diagonal_x0020_Corner_x0020_Rectangle_x0020_252"
   o:spid="_x0000_s1038" style='position:absolute;left:9859;top:1272;width:7236;
   height:3180;visibility:visible;mso-wrap-style:square;v-text-anchor:middle'
   coordsize="723569,318052" o:spt="100" o:gfxdata="UEsDBBQABgAIAAAAIQDw94q7/QAAAOIBAAATAAAAW0NvbnRlbnRfVHlwZXNdLnhtbJSRzUrEMBDH
74LvEOYqbaoHEWm6B6tHFV0fYEimbdg2CZlYd9/edD8u4goeZ+b/8SOpV9tpFDNFtt4puC4rEOS0
N9b1Cj7WT8UdCE7oDI7ekYIdMayay4t6vQvEIrsdKxhSCvdSsh5oQi59IJcvnY8TpjzGXgbUG+xJ
3lTVrdTeJXKpSEsGNHVLHX6OSTxu8/pAEmlkEA8H4dKlAEMYrcaUSeXszI+W4thQZudew4MNfJUx
QP7asFzOFxx9L/lpojUkXjGmZ5wyhjSRJQ8YKGvKv1MWzIkL33VWU9lGfl98J6hz4cZ/uUjzf7Pb
bHuj+ZQu9z/UfAMAAP//AwBQSwMEFAAGAAgAAAAhADHdX2HSAAAAjwEAAAsAAABfcmVscy8ucmVs
c6SQwWrDMAyG74O9g9G9cdpDGaNOb4VeSwe7CltJTGPLWCZt376mMFhGbzvqF/o+8e/2tzCpmbJ4
jgbWTQuKomXn42Dg63xYfYCSgtHhxJEM3Elg372/7U40YalHMvokqlKiGBhLSZ9aix0poDScKNZN
zzlgqWMedEJ7wYH0pm23Ov9mQLdgqqMzkI9uA+p8T9X8hx28zSzcl8Zy0Nz33r6iasfXeKK5UjAP
VAy4LM8w09zU50C/9q7/6ZURE31X/kL8TKv1x6wXNXYPAAAA//8DAFBLAwQUAAYACAAAACEAMy8F
nkEAAAA5AAAAEAAAAGRycy9zaGFwZXhtbC54bWyysa/IzVEoSy0qzszPs1Uy1DNQUkjNS85PycxL
t1UKDXHTtVBSKC5JzEtJzMnPS7VVqkwtVrK34+UCAAAA//8DAFBLAwQUAAYACAAAACEAG1vIQ8MA
AADcAAAADwAAAGRycy9kb3ducmV2LnhtbESPy2rDMBBF94H+g5hCd7FsQ0Nwopi2aaGbLPLoorvB
mtim1shYk9j9+6hQyPJy7oO7LifXqSsNofVsIEtSUMSVty3XBk7Hj/kSVBBki51nMvBLAcrNw2yN
hfUj7+l6kFrFEg4FGmhE+kLrUDXkMCS+J47s7AeHEuVQazvgGMtdp/M0XWiHLceFBnt6a6j6OVyc
Afav4nbZ+/d2j3YUGndf06c15ulxelmBEprkbv5PRw75cw5/Z+IR0JsbAAAA//8DAFBLAQItABQA
BgAIAAAAIQDw94q7/QAAAOIBAAATAAAAAAAAAAAAAAAAAAAAAABbQ29udGVudF9UeXBlc10ueG1s
UEsBAi0AFAAGAAgAAAAhADHdX2HSAAAAjwEAAAsAAAAAAAAAAAAAAAAALgEAAF9yZWxzLy5yZWxz
UEsBAi0AFAAGAAgAAAAhADMvBZ5BAAAAOQAAABAAAAAAAAAAAAAAAAAAKQIAAGRycy9zaGFwZXht
bC54bWxQSwECLQAUAAYACAAAACEAG1vIQ8MAAADcAAAADwAAAAAAAAAAAAAAAACYAgAAZHJzL2Rv
d25yZXYueG1sUEsFBgAAAAAEAAQA9QAAAIgDAAAAAA==
" adj="-11796480,,5400" path="m,l670559,r53010,53010l723569,318052r,l53010,318052,,265042,,xe"
   fillcolor="#4f81bd [3204]" strokecolor="#243f60 [1604]" strokeweight="2pt">
   <v:stroke joinstyle="miter"/>
   <v:formulas/>
   <v:path arrowok="t" o:connecttype="custom" o:connectlocs="0,0;670559,0;723569,53010;723569,318052;723569,318052;53010,318052;0,265042;0,0"
    o:connectangles="0,0,0,0,0,0,0,0" textboxrect="0,0,723569,318052"/>
   <v:textbox>
    <![if !mso]>
    <table cellpadding=0 cellspacing=0 width="100%">
<tr>
      <td><![endif]>
      <div>
      <p class=MsoNormal align=center style='text-align:center'>
Cache</p></p>
</div>
<![if !mso]></td>
     </tr>
</table>
<![endif]></v:textbox>
  </v:shape></v:group><v:shape id="Straight_x0020_Arrow_x0020_Connector_x0020_253"
  o:spid="_x0000_s1039" type="#_x0000_t32" style='position:absolute;left:9859;
  top:13835;width:19558;height:7475;flip:x;visibility:visible;mso-wrap-style:square'
  o:connectortype="straight" o:gfxdata="UEsDBBQABgAIAAAAIQD+JeulAAEAAOoBAAATAAAAW0NvbnRlbnRfVHlwZXNdLnhtbJSRzU7EIBDH
7ya+A+FqWqoHY0zpHqwe1Zj1AQhMW2I7EAbr7ts73e5ejGviEeb/8RuoN7tpFDMk8gG1vC4rKQBt
cB57Ld+3T8WdFJQNOjMGBC33QHLTXF7U230EEuxG0nLIOd4rRXaAyVAZIiBPupAmk/mYehWN/TA9
qJuqulU2YAbMRV4yZFO30JnPMYvHHV+vJAlGkuJhFS5dWpoYR29NZlI1o/vRUhwbSnYeNDT4SFeM
IdWvDcvkfMHR98JPk7wD8WpSfjYTYyiXaNkAweaQWFf+nbSgTlSErvMWyjYRL7V6T3DnSlz4wgTz
f/Nbtr3BfEpXh59qvgEAAP//AwBQSwMEFAAGAAgAAAAhAJYFM1jUAAAAlwEAAAsAAABfcmVscy8u
cmVsc6SQPWsDMQyG90L/g9He8yVDKSW+bIWsIYWuxtZ9kLNkJHNN/n1MoaVXsnWUXvQ8L9rtL2k2
C4pOTA42TQsGKXCcaHDwfnp7egGjxVP0MxM6uKLCvnt82B1x9qUe6ThlNZVC6mAsJb9aq2HE5LXh
jFSTniX5UkcZbPbh7Ae027Z9tvKbAd2KaQ7RgRziFszpmqv5DztNQVi5L03gZLnvp3CPaiN/0hGX
SvEyYHEQRb+WgktTy4G979380xuYCENh+aiOlfwnqfbvBnb1zu4GAAD//wMAUEsDBBQABgAIAAAA
IQAzLwWeQQAAADkAAAAUAAAAZHJzL2Nvbm5lY3RvcnhtbC54bWyysa/IzVEoSy0qzszPs1Uy1DNQ
UkjNS85PycxLt1UKDXHTtVBSKC5JzEtJzMnPS7VVqkwtVrK34+UCAAAA//8DAFBLAwQUAAYACAAA
ACEAuE6xz8QAAADcAAAADwAAAGRycy9kb3ducmV2LnhtbESPQWsCMRSE74L/ITzBm2aruC1bo0ih
UrzVlZ5fN6+bpZuXNYm69tc3guBxmJlvmOW6t604kw+NYwVP0wwEceV0w7WCQ/k+eQERIrLG1jEp
uFKA9Wo4WGKh3YU/6byPtUgQDgUqMDF2hZShMmQxTF1HnLwf5y3GJH0ttcdLgttWzrIslxYbTgsG
O3ozVP3uT1bBd3nUC5OXeufnLs+vf1/Pu9NWqfGo37yCiNTHR/je/tAKZos53M6kIyBX/wAAAP//
AwBQSwECLQAUAAYACAAAACEA/iXrpQABAADqAQAAEwAAAAAAAAAAAAAAAAAAAAAAW0NvbnRlbnRf
VHlwZXNdLnhtbFBLAQItABQABgAIAAAAIQCWBTNY1AAAAJcBAAALAAAAAAAAAAAAAAAAADEBAABf
cmVscy8ucmVsc1BLAQItABQABgAIAAAAIQAzLwWeQQAAADkAAAAUAAAAAAAAAAAAAAAAAC4CAABk
cnMvY29ubmVjdG9yeG1sLnhtbFBLAQItABQABgAIAAAAIQC4TrHPxAAAANwAAAAPAAAAAAAAAAAA
AAAAAKECAABkcnMvZG93bnJldi54bWxQSwUGAAAAAAQABAD5AAAAkgMAAAAA
" strokecolor="#4579b8 [3044]">
  <v:stroke endarrow="block"/>
 </v:shape><v:shape id="Straight_x0020_Arrow_x0020_Connector_x0020_254" o:spid="_x0000_s1040"
  type="#_x0000_t32" style='position:absolute;left:8428;top:14391;width:3657;
  height:6208;flip:x;visibility:visible;mso-wrap-style:square' o:connectortype="straight"
  o:gfxdata="UEsDBBQABgAIAAAAIQD+JeulAAEAAOoBAAATAAAAW0NvbnRlbnRfVHlwZXNdLnhtbJSRzU7EIBDH
7ya+A+FqWqoHY0zpHqwe1Zj1AQhMW2I7EAbr7ts73e5ejGviEeb/8RuoN7tpFDMk8gG1vC4rKQBt
cB57Ld+3T8WdFJQNOjMGBC33QHLTXF7U230EEuxG0nLIOd4rRXaAyVAZIiBPupAmk/mYehWN/TA9
qJuqulU2YAbMRV4yZFO30JnPMYvHHV+vJAlGkuJhFS5dWpoYR29NZlI1o/vRUhwbSnYeNDT4SFeM
IdWvDcvkfMHR98JPk7wD8WpSfjYTYyiXaNkAweaQWFf+nbSgTlSErvMWyjYRL7V6T3DnSlz4wgTz
f/Nbtr3BfEpXh59qvgEAAP//AwBQSwMEFAAGAAgAAAAhAJYFM1jUAAAAlwEAAAsAAABfcmVscy8u
cmVsc6SQPWsDMQyG90L/g9He8yVDKSW+bIWsIYWuxtZ9kLNkJHNN/n1MoaVXsnWUXvQ8L9rtL2k2
C4pOTA42TQsGKXCcaHDwfnp7egGjxVP0MxM6uKLCvnt82B1x9qUe6ThlNZVC6mAsJb9aq2HE5LXh
jFSTniX5UkcZbPbh7Ae027Z9tvKbAd2KaQ7RgRziFszpmqv5DztNQVi5L03gZLnvp3CPaiN/0hGX
SvEyYHEQRb+WgktTy4G979380xuYCENh+aiOlfwnqfbvBnb1zu4GAAD//wMAUEsDBBQABgAIAAAA
IQAzLwWeQQAAADkAAAAUAAAAZHJzL2Nvbm5lY3RvcnhtbC54bWyysa/IzVEoSy0qzszPs1Uy1DNQ
UkjNS85PycxLt1UKDXHTtVBSKC5JzEtJzMnPS7VVqkwtVrK34+UCAAAA//8DAFBLAwQUAAYACAAA
ACEAN6cpu8QAAADcAAAADwAAAGRycy9kb3ducmV2LnhtbESPQWsCMRSE70L/Q3iCN81q61ZWo5RC
pXirK55fN8/N4uZlm0Rd++ubQqHHYWa+YVab3rbiSj40jhVMJxkI4srphmsFh/JtvAARIrLG1jEp
uFOAzfphsMJCuxt/0HUfa5EgHApUYGLsCilDZchimLiOOHkn5y3GJH0ttcdbgttWzrIslxYbTgsG
O3o1VJ33F6vgs/zSc5OXeucfXZ7fv4/Pu8tWqdGwf1mCiNTH//Bf+10rmM2f4PdMOgJy/QMAAP//
AwBQSwECLQAUAAYACAAAACEA/iXrpQABAADqAQAAEwAAAAAAAAAAAAAAAAAAAAAAW0NvbnRlbnRf
VHlwZXNdLnhtbFBLAQItABQABgAIAAAAIQCWBTNY1AAAAJcBAAALAAAAAAAAAAAAAAAAADEBAABf
cmVscy8ucmVsc1BLAQItABQABgAIAAAAIQAzLwWeQQAAADkAAAAUAAAAAAAAAAAAAAAAAC4CAABk
cnMvY29ubmVjdG9yeG1sLnhtbFBLAQItABQABgAIAAAAIQA3pym7xAAAANwAAAAPAAAAAAAAAAAA
AAAAAKECAABkcnMvZG93bnJldi54bWxQSwUGAAAAAAQABAD5AAAAkgMAAAAA
" strokecolor="#4579b8 [3044]">
  <v:stroke endarrow="block"/>
 </v:shape><v:shape id="Straight_x0020_Arrow_x0020_Connector_x0020_255" o:spid="_x0000_s1041"
  type="#_x0000_t32" style='position:absolute;left:12085;top:14391;width:15824;
  height:6204;visibility:visible;mso-wrap-style:square' o:connectortype="straight"
  o:gfxdata="UEsDBBQABgAIAAAAIQD+JeulAAEAAOoBAAATAAAAW0NvbnRlbnRfVHlwZXNdLnhtbJSRzU7EIBDH
7ya+A+FqWqoHY0zpHqwe1Zj1AQhMW2I7EAbr7ts73e5ejGviEeb/8RuoN7tpFDMk8gG1vC4rKQBt
cB57Ld+3T8WdFJQNOjMGBC33QHLTXF7U230EEuxG0nLIOd4rRXaAyVAZIiBPupAmk/mYehWN/TA9
qJuqulU2YAbMRV4yZFO30JnPMYvHHV+vJAlGkuJhFS5dWpoYR29NZlI1o/vRUhwbSnYeNDT4SFeM
IdWvDcvkfMHR98JPk7wD8WpSfjYTYyiXaNkAweaQWFf+nbSgTlSErvMWyjYRL7V6T3DnSlz4wgTz
f/Nbtr3BfEpXh59qvgEAAP//AwBQSwMEFAAGAAgAAAAhAJYFM1jUAAAAlwEAAAsAAABfcmVscy8u
cmVsc6SQPWsDMQyG90L/g9He8yVDKSW+bIWsIYWuxtZ9kLNkJHNN/n1MoaVXsnWUXvQ8L9rtL2k2
C4pOTA42TQsGKXCcaHDwfnp7egGjxVP0MxM6uKLCvnt82B1x9qUe6ThlNZVC6mAsJb9aq2HE5LXh
jFSTniX5UkcZbPbh7Ae027Z9tvKbAd2KaQ7RgRziFszpmqv5DztNQVi5L03gZLnvp3CPaiN/0hGX
SvEyYHEQRb+WgktTy4G979380xuYCENh+aiOlfwnqfbvBnb1zu4GAAD//wMAUEsDBBQABgAIAAAA
IQAzLwWeQQAAADkAAAAUAAAAZHJzL2Nvbm5lY3RvcnhtbC54bWyysa/IzVEoSy0qzszPs1Uy1DNQ
UkjNS85PycxLt1UKDXHTtVBSKC5JzEtJzMnPS7VVqkwtVrK34+UCAAAA//8DAFBLAwQUAAYACAAA
ACEARKEj88cAAADcAAAADwAAAGRycy9kb3ducmV2LnhtbESPS2vDMBCE74H+B7GFXkIs16mT4loJ
JVDyaC95QY+LtbVNrZWx1MT591GgkOMwM98w+bw3jThR52rLCp6jGARxYXXNpYLD/mP0CsJ5ZI2N
ZVJwIQfz2cMgx0zbM2/ptPOlCBB2GSqovG8zKV1RkUEX2ZY4eD+2M+iD7EqpOzwHuGlkEscTabDm
sFBhS4uKit/dn1GwGE83x+H6ZTnBL/afnKzW6eZbqafH/v0NhKfe38P/7ZVWkKQp3M6EIyBnVwAA
AP//AwBQSwECLQAUAAYACAAAACEA/iXrpQABAADqAQAAEwAAAAAAAAAAAAAAAAAAAAAAW0NvbnRl
bnRfVHlwZXNdLnhtbFBLAQItABQABgAIAAAAIQCWBTNY1AAAAJcBAAALAAAAAAAAAAAAAAAAADEB
AABfcmVscy8ucmVsc1BLAQItABQABgAIAAAAIQAzLwWeQQAAADkAAAAUAAAAAAAAAAAAAAAAAC4C
AABkcnMvY29ubmVjdG9yeG1sLnhtbFBLAQItABQABgAIAAAAIQBEoSPzxwAAANwAAAAPAAAAAAAA
AAAAAAAAAKECAABkcnMvZG93bnJldi54bWxQSwUGAAAAAAQABAD5AAAAlQMAAAAA
" strokecolor="#4579b8 [3044]">
  <v:stroke endarrow="block"/>
 </v:shape><v:shape id="Straight_x0020_Arrow_x0020_Connector_x0020_256" o:spid="_x0000_s1042"
  type="#_x0000_t32" style='position:absolute;left:29419;top:13835;width:2547;
  height:6760;visibility:visible;mso-wrap-style:square' o:connectortype="straight"
  o:gfxdata="UEsDBBQABgAIAAAAIQD+JeulAAEAAOoBAAATAAAAW0NvbnRlbnRfVHlwZXNdLnhtbJSRzU7EIBDH
7ya+A+FqWqoHY0zpHqwe1Zj1AQhMW2I7EAbr7ts73e5ejGviEeb/8RuoN7tpFDMk8gG1vC4rKQBt
cB57Ld+3T8WdFJQNOjMGBC33QHLTXF7U230EEuxG0nLIOd4rRXaAyVAZIiBPupAmk/mYehWN/TA9
qJuqulU2YAbMRV4yZFO30JnPMYvHHV+vJAlGkuJhFS5dWpoYR29NZlI1o/vRUhwbSnYeNDT4SFeM
IdWvDcvkfMHR98JPk7wD8WpSfjYTYyiXaNkAweaQWFf+nbSgTlSErvMWyjYRL7V6T3DnSlz4wgTz
f/Nbtr3BfEpXh59qvgEAAP//AwBQSwMEFAAGAAgAAAAhAJYFM1jUAAAAlwEAAAsAAABfcmVscy8u
cmVsc6SQPWsDMQyG90L/g9He8yVDKSW+bIWsIYWuxtZ9kLNkJHNN/n1MoaVXsnWUXvQ8L9rtL2k2
C4pOTA42TQsGKXCcaHDwfnp7egGjxVP0MxM6uKLCvnt82B1x9qUe6ThlNZVC6mAsJb9aq2HE5LXh
jFSTniX5UkcZbPbh7Ae027Z9tvKbAd2KaQ7RgRziFszpmqv5DztNQVi5L03gZLnvp3CPaiN/0hGX
SvEyYHEQRb+WgktTy4G979380xuYCENh+aiOlfwnqfbvBnb1zu4GAAD//wMAUEsDBBQABgAIAAAA
IQAzLwWeQQAAADkAAAAUAAAAZHJzL2Nvbm5lY3RvcnhtbC54bWyysa/IzVEoSy0qzszPs1Uy1DNQ
UkjNS85PycxLt1UKDXHTtVBSKC5JzEtJzMnPS7VVqkwtVrK34+UCAAAA//8DAFBLAwQUAAYACAAA
ACEAtHO9hMYAAADcAAAADwAAAGRycy9kb3ducmV2LnhtbESPW2vCQBSE3wX/w3KEvohujDWW1FWK
IF7aF2/Qx0P2NAlmz4bsqum/7woFH4eZ+YaZLVpTiRs1rrSsYDSMQBBnVpecKzgdV4M3EM4ja6ws
k4JfcrCYdzszTLW9855uB5+LAGGXooLC+zqV0mUFGXRDWxMH78c2Bn2QTS51g/cAN5WMoyiRBksO
CwXWtCwouxyuRsFyPN2d+9vXdYJf7D853mwnu2+lXnrtxzsIT61/hv/bG60gniTwOBOOgJz/AQAA
//8DAFBLAQItABQABgAIAAAAIQD+JeulAAEAAOoBAAATAAAAAAAAAAAAAAAAAAAAAABbQ29udGVu
dF9UeXBlc10ueG1sUEsBAi0AFAAGAAgAAAAhAJYFM1jUAAAAlwEAAAsAAAAAAAAAAAAAAAAAMQEA
AF9yZWxzLy5yZWxzUEsBAi0AFAAGAAgAAAAhADMvBZ5BAAAAOQAAABQAAAAAAAAAAAAAAAAALgIA
AGRycy9jb25uZWN0b3J4bWwueG1sUEsBAi0AFAAGAAgAAAAhALRzvYTGAAAA3AAAAA8AAAAAAAAA
AAAAAAAAoQIAAGRycy9kb3ducmV2LnhtbFBLBQYAAAAABAAEAPkAAACUAwAAAAA=
" strokecolor="#4579b8 [3044]">
  <v:stroke endarrow="block"/>
 </v:shape><v:group id="Group_x0020_257" o:spid="_x0000_s1043" style='position:absolute;
  left:8428;width:32997;height:14391' coordsize="32997,14391" o:gfxdata="UEsDBBQABgAIAAAAIQCi+E9TBAEAAOwBAAATAAAAW0NvbnRlbnRfVHlwZXNdLnhtbJSRy07DMBBF
90j8g+UtShxYIISadEGAHSAoHzCyJ4lFYlseN7R/z7iPDaJIXdpzz5wre7HcTKOYMZL1rpbXZSUF
Ou2NdX0tP1dPxZ0UlMAZGL3DWm6R5LK5vFistgFJMO2olkNK4V4p0gNOQKUP6HjS+ThB4mPsVQD9
BT2qm6q6Vdq7hC4VKe+QzaLFDtZjEo8bvt43iTiSFA/7YHbVEkIYrYbETdXszC9LcTCUTO4yNNhA
V1xDqj8NeXJacOBe+WmiNSjeIKYXmLiGMpFUH/060AABOVj+vyp3najwXWc1lm2k5wx/ZPhY75TG
+G8XcT5X0DL2jvNxu9r9VfMDAAD//wMAUEsDBBQABgAIAAAAIQBsBtX+2AAAAJkBAAALAAAAX3Jl
bHMvLnJlbHOkkMFKAzEQhu+C7xDm7mbbg4g025vQa63gNSSz2eAmE2biat/eWBBc6c3jzM9838/s
9p9pVguyRMoGNl0PCrMjH3Mw8HJ6unsAJdVmb2fKaOCMAvvh9mZ3xNnWdiRTLKIaJYuBqdbyqLW4
CZOVjgrmlozEydY2ctDFujcbUG/7/l7zbwYMK6Y6eAN88FtQp3Np5j/sFB2T0Fg7R0nTOEZ3jao9
feQjLo1iOWA14FkuS8ala+VAX/du/ukNTO/lebIFX5tkZb9E8h01/08HvXro8AUAAP//AwBQSwME
FAAGAAgAAAAhADMvBZ5BAAAAOQAAABUAAABkcnMvZ3JvdXBzaGFwZXhtbC54bWyysa/IzVEoSy0q
zszPs1Uy1DNQUkjNS85PycxLt1UKDXHTtVBSKC5JzEtJzMnPS7VVqkwtVrK34+UCAAAA//8DAFBL
AwQUAAYACAAAACEADLtMScUAAADcAAAADwAAAGRycy9kb3ducmV2LnhtbESPQYvCMBSE78L+h/CE
vWlaF3WpRhFZlz2IoC6It0fzbIvNS2liW/+9EQSPw8x8w8yXnSlFQ7UrLCuIhxEI4tTqgjMF/8fN
4BuE88gaS8uk4E4OlouP3hwTbVveU3PwmQgQdgkqyL2vEildmpNBN7QVcfAutjbog6wzqWtsA9yU
chRFE2mw4LCQY0XrnNLr4WYU/LbYrr7in2Z7vazv5+N4d9rGpNRnv1vNQHjq/Dv8av9pBaPxFJ5n
whGQiwcAAAD//wMAUEsBAi0AFAAGAAgAAAAhAKL4T1MEAQAA7AEAABMAAAAAAAAAAAAAAAAAAAAA
AFtDb250ZW50X1R5cGVzXS54bWxQSwECLQAUAAYACAAAACEAbAbV/tgAAACZAQAACwAAAAAAAAAA
AAAAAAA1AQAAX3JlbHMvLnJlbHNQSwECLQAUAAYACAAAACEAMy8FnkEAAAA5AAAAFQAAAAAAAAAA
AAAAAAA2AgAAZHJzL2dyb3Vwc2hhcGV4bWwueG1sUEsBAi0AFAAGAAgAAAAhAAy7TEnFAAAA3AAA
AA8AAAAAAAAAAAAAAAAAqgIAAGRycy9kb3ducmV2LnhtbFBLBQYAAAAABAAEAPoAAACcAwAAAAA=
">
  <v:group id="Group_x0020_258" o:spid="_x0000_s1044" style='position:absolute;
   top:874;width:13755;height:13517' coordsize="13755,13517" o:gfxdata="UEsDBBQABgAIAAAAIQCi+E9TBAEAAOwBAAATAAAAW0NvbnRlbnRfVHlwZXNdLnhtbJSRy07DMBBF
90j8g+UtShxYIISadEGAHSAoHzCyJ4lFYlseN7R/z7iPDaJIXdpzz5wre7HcTKOYMZL1rpbXZSUF
Ou2NdX0tP1dPxZ0UlMAZGL3DWm6R5LK5vFistgFJMO2olkNK4V4p0gNOQKUP6HjS+ThB4mPsVQD9
BT2qm6q6Vdq7hC4VKe+QzaLFDtZjEo8bvt43iTiSFA/7YHbVEkIYrYbETdXszC9LcTCUTO4yNNhA
V1xDqj8NeXJacOBe+WmiNSjeIKYXmLiGMpFUH/060AABOVj+vyp3najwXWc1lm2k5wx/ZPhY75TG
+G8XcT5X0DL2jvNxu9r9VfMDAAD//wMAUEsDBBQABgAIAAAAIQBsBtX+2AAAAJkBAAALAAAAX3Jl
bHMvLnJlbHOkkMFKAzEQhu+C7xDm7mbbg4g025vQa63gNSSz2eAmE2biat/eWBBc6c3jzM9838/s
9p9pVguyRMoGNl0PCrMjH3Mw8HJ6unsAJdVmb2fKaOCMAvvh9mZ3xNnWdiRTLKIaJYuBqdbyqLW4
CZOVjgrmlozEydY2ctDFujcbUG/7/l7zbwYMK6Y6eAN88FtQp3Np5j/sFB2T0Fg7R0nTOEZ3jao9
feQjLo1iOWA14FkuS8ala+VAX/du/ukNTO/lebIFX5tkZb9E8h01/08HvXro8AUAAP//AwBQSwME
FAAGAAgAAAAhADMvBZ5BAAAAOQAAABUAAABkcnMvZ3JvdXBzaGFwZXhtbC54bWyysa/IzVEoSy0q
zszPs1Uy1DNQUkjNS85PycxLt1UKDXHTtVBSKC5JzEtJzMnPS7VVqkwtVrK34+UCAAAA//8DAFBL
AwQUAAYACAAAACEAfSTYO8MAAADcAAAADwAAAGRycy9kb3ducmV2LnhtbERPTWvCQBC9F/oflhF6
q5tYUiS6BpFaeghCVSi9DdkxCcnOhuyaxH/vHgSPj/e9zibTioF6V1tWEM8jEMSF1TWXCs6n/fsS
hPPIGlvLpOBGDrLN68saU21H/qXh6EsRQtilqKDyvkuldEVFBt3cdsSBu9jeoA+wL6XucQzhppWL
KPqUBmsODRV2tKuoaI5Xo+B7xHH7EX8NeXPZ3f5PyeEvj0mpt9m0XYHwNPmn+OH+0QoWSVgbzoQj
IDd3AAAA//8DAFBLAQItABQABgAIAAAAIQCi+E9TBAEAAOwBAAATAAAAAAAAAAAAAAAAAAAAAABb
Q29udGVudF9UeXBlc10ueG1sUEsBAi0AFAAGAAgAAAAhAGwG1f7YAAAAmQEAAAsAAAAAAAAAAAAA
AAAANQEAAF9yZWxzLy5yZWxzUEsBAi0AFAAGAAgAAAAhADMvBZ5BAAAAOQAAABUAAAAAAAAAAAAA
AAAANgIAAGRycy9ncm91cHNoYXBleG1sLnhtbFBLAQItABQABgAIAAAAIQB9JNg7wwAAANwAAAAP
AAAAAAAAAAAAAAAAAKoCAABkcnMvZG93bnJldi54bWxQSwUGAAAAAAQABAD6AAAAmgMAAAAA
">
   <v:shape id="Flowchart_x003a__x0020_Punched_x0020_Tape_x0020_259" o:spid="_x0000_s1045"
    type="#_x0000_t122" style='position:absolute;top:8507;width:9621;height:5010;
    visibility:visible;mso-wrap-style:square;v-text-anchor:middle' o:gfxdata="UEsDBBQABgAIAAAAIQDw94q7/QAAAOIBAAATAAAAW0NvbnRlbnRfVHlwZXNdLnhtbJSRzUrEMBDH
74LvEOYqbaoHEWm6B6tHFV0fYEimbdg2CZlYd9/edD8u4goeZ+b/8SOpV9tpFDNFtt4puC4rEOS0
N9b1Cj7WT8UdCE7oDI7ekYIdMayay4t6vQvEIrsdKxhSCvdSsh5oQi59IJcvnY8TpjzGXgbUG+xJ
3lTVrdTeJXKpSEsGNHVLHX6OSTxu8/pAEmlkEA8H4dKlAEMYrcaUSeXszI+W4thQZudew4MNfJUx
QP7asFzOFxx9L/lpojUkXjGmZ5wyhjSRJQ8YKGvKv1MWzIkL33VWU9lGfl98J6hz4cZ/uUjzf7Pb
bHuj+ZQu9z/UfAMAAP//AwBQSwMEFAAGAAgAAAAhADHdX2HSAAAAjwEAAAsAAABfcmVscy8ucmVs
c6SQwWrDMAyG74O9g9G9cdpDGaNOb4VeSwe7CltJTGPLWCZt376mMFhGbzvqF/o+8e/2tzCpmbJ4
jgbWTQuKomXn42Dg63xYfYCSgtHhxJEM3Elg372/7U40YalHMvokqlKiGBhLSZ9aix0poDScKNZN
zzlgqWMedEJ7wYH0pm23Ov9mQLdgqqMzkI9uA+p8T9X8hx28zSzcl8Zy0Nz33r6iasfXeKK5UjAP
VAy4LM8w09zU50C/9q7/6ZURE31X/kL8TKv1x6wXNXYPAAAA//8DAFBLAwQUAAYACAAAACEAMy8F
nkEAAAA5AAAAEAAAAGRycy9zaGFwZXhtbC54bWyysa/IzVEoSy0qzszPs1Uy1DNQUkjNS85PycxL
t1UKDXHTtVBSKC5JzEtJzMnPS7VVqkwtVrK34+UCAAAA//8DAFBLAwQUAAYACAAAACEA5vUg1sQA
AADcAAAADwAAAGRycy9kb3ducmV2LnhtbESPQWsCMRSE70L/Q3iF3jSrZaXdblakUCgeFLUXb6+b
1+zSzUvYRF3/vREEj8PMfMOUi8F24kR9aB0rmE4yEMS10y0bBT/7r/EbiBCRNXaOScGFAiyqp1GJ
hXZn3tJpF41IEA4FKmhi9IWUoW7IYpg4T5y8P9dbjEn2RuoezwluOznLsrm02HJaaNDTZ0P1/+5o
FUTZ5tbkv4fN+mj0aun965QPSr08D8sPEJGG+Ajf299awSx/h9uZdARkdQUAAP//AwBQSwECLQAU
AAYACAAAACEA8PeKu/0AAADiAQAAEwAAAAAAAAAAAAAAAAAAAAAAW0NvbnRlbnRfVHlwZXNdLnht
bFBLAQItABQABgAIAAAAIQAx3V9h0gAAAI8BAAALAAAAAAAAAAAAAAAAAC4BAABfcmVscy8ucmVs
c1BLAQItABQABgAIAAAAIQAzLwWeQQAAADkAAAAQAAAAAAAAAAAAAAAAACkCAABkcnMvc2hhcGV4
bWwueG1sUEsBAi0AFAAGAAgAAAAhAOb1INbEAAAA3AAAAA8AAAAAAAAAAAAAAAAAmAIAAGRycy9k
b3ducmV2LnhtbFBLBQYAAAAABAAEAPUAAACJAwAAAAA=
" fillcolor="#4f81bd [3204]" strokecolor="#243f60 [1604]" strokeweight="2pt">
    <v:textbox>
     <![if !mso]>
     <table cellpadding=0 cellspacing=0 width="100%">
<tr>
       <td><![endif]>
       <div>
       <p class=MsoNormal align=center style='text-align:center'>
Carbon-Rely</p></p>
</div>
<![if !mso]></td>
      </tr>
</table>
<![endif]></v:textbox>
   </v:shape><v:shape id="Cloud_x0020_260" o:spid="_x0000_s1046" style='position:absolute;
    left:477;width:13278;height:5009;visibility:visible;mso-wrap-style:square;
    v-text-anchor:middle' coordsize="43200,43200" o:spt="100" o:gfxdata="UEsDBBQABgAIAAAAIQDw94q7/QAAAOIBAAATAAAAW0NvbnRlbnRfVHlwZXNdLnhtbJSRzUrEMBDH
74LvEOYqbaoHEWm6B6tHFV0fYEimbdg2CZlYd9/edD8u4goeZ+b/8SOpV9tpFDNFtt4puC4rEOS0
N9b1Cj7WT8UdCE7oDI7ekYIdMayay4t6vQvEIrsdKxhSCvdSsh5oQi59IJcvnY8TpjzGXgbUG+xJ
3lTVrdTeJXKpSEsGNHVLHX6OSTxu8/pAEmlkEA8H4dKlAEMYrcaUSeXszI+W4thQZudew4MNfJUx
QP7asFzOFxx9L/lpojUkXjGmZ5wyhjSRJQ8YKGvKv1MWzIkL33VWU9lGfl98J6hz4cZ/uUjzf7Pb
bHuj+ZQu9z/UfAMAAP//AwBQSwMEFAAGAAgAAAAhADHdX2HSAAAAjwEAAAsAAABfcmVscy8ucmVs
c6SQwWrDMAyG74O9g9G9cdpDGaNOb4VeSwe7CltJTGPLWCZt376mMFhGbzvqF/o+8e/2tzCpmbJ4
jgbWTQuKomXn42Dg63xYfYCSgtHhxJEM3Elg372/7U40YalHMvokqlKiGBhLSZ9aix0poDScKNZN
zzlgqWMedEJ7wYH0pm23Ov9mQLdgqqMzkI9uA+p8T9X8hx28zSzcl8Zy0Nz33r6iasfXeKK5UjAP
VAy4LM8w09zU50C/9q7/6ZURE31X/kL8TKv1x6wXNXYPAAAA//8DAFBLAwQUAAYACAAAACEAMy8F
nkEAAAA5AAAAEAAAAGRycy9zaGFwZXhtbC54bWyysa/IzVEoSy0qzszPs1Uy1DNQUkjNS85PycxL
t1UKDXHTtVBSKC5JzEtJzMnPS7VVqkwtVrK34+UCAAAA//8DAFBLAwQUAAYACAAAACEAC0kqg8UA
AADcAAAADwAAAGRycy9kb3ducmV2LnhtbERPTWvCQBC9F/wPyxS8lLpJoEFSVymKRWxAaguttzE7
JsHsbJpdNf579yD0+Hjfk1lvGnGmztWWFcSjCARxYXXNpYLvr+XzGITzyBoby6TgSg5m08HDBDNt
L/xJ560vRQhhl6GCyvs2k9IVFRl0I9sSB+5gO4M+wK6UusNLCDeNTKIolQZrDg0VtjSvqDhuT0YB
/+bv+038NF6s9yv985Hv7PHvRanhY//2CsJT7//Fd/dKK0jSMD+cCUdATm8AAAD//wMAUEsBAi0A
FAAGAAgAAAAhAPD3irv9AAAA4gEAABMAAAAAAAAAAAAAAAAAAAAAAFtDb250ZW50X1R5cGVzXS54
bWxQSwECLQAUAAYACAAAACEAMd1fYdIAAACPAQAACwAAAAAAAAAAAAAAAAAuAQAAX3JlbHMvLnJl
bHNQSwECLQAUAAYACAAAACEAMy8FnkEAAAA5AAAAEAAAAAAAAAAAAAAAAAApAgAAZHJzL3NoYXBl
eG1sLnhtbFBLAQItABQABgAIAAAAIQALSSqDxQAAANwAAAAPAAAAAAAAAAAAAAAAAJgCAABkcnMv
ZG93bnJldi54bWxQSwUGAAAAAAQABAD1AAAAigMAAAAA
" adj="-11796480,,5400" path="m3900,14370c3629,11657,4261,8921,5623,6907,7775,3726,11264,3017,14005,5202,15678,909,19914,22,22456,3432,23097,1683,24328,474,25749,200v1564,-302,3126,570,4084,2281c31215,267,33501,-460,35463,690v1495,876,2567,2710,2855,4886c40046,6218,41422,7998,41982,10318v407,1684,349,3513,-164,5142c43079,17694,43520,20590,43016,23322v-670,3632,-2888,6352,-5612,6882c37391,32471,36658,34621,35395,36101v-1919,2249,-4691,2538,-6840,714c27860,39948,25999,42343,23667,43106v-2748,899,-5616,-633,-7187,-3840c12772,42310,7956,40599,5804,35472,3690,35809,1705,34024,1110,31250,679,29243,1060,27077,2113,25551,619,24354,-213,22057,-5,19704,239,16949,1845,14791,3863,14507v12,-46,25,-91,37,-137xem4693,26177nfc3809,26271,2925,25993,2160,25380t4768,9519nfc6573,35092,6200,35220,5820,35280t10658,3810nfc16211,38544,15987,37961,15810,37350m28827,34751nfc28788,35398,28698,36038,28560,36660m34129,22954nfc36133,24282,37398,27058,37380,30090m41798,15354nfc41473,16386,40978,17302,40350,18030m38324,5426nfc38379,5843,38405,6266,38400,6690m29078,3952nfc29267,3369,29516,2826,29820,2340m22141,4720nfc22218,4238,22339,3771,22500,3330m14000,5192nfc14472,5568,14908,6021,15300,6540m4127,15789nfc4024,15325,3948,14851,3900,14370e"
    fillcolor="#4f81bd [3204]" strokecolor="#243f60 [1604]" strokeweight="2pt">
    <v:stroke joinstyle="miter"/>
    <v:formulas/>
    <v:path arrowok="t" o:connecttype="custom" o:connectlocs="144248,303540;66392,294298;212945,404677;178889,409095;506482,453275;485950,433098;886052,402961;877845,425097;1049019,266167;1148944,348914;1284740,178040;1240233,209070;1177960,62918;1180296,77575;893767,45826;916574,27134;680545,54732;691580,38614;430316,60205;470274,75836;126851,183084;119874,166630"
     o:connectangles="0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0"
     textboxrect="0,0,43200,43200"/>
    <v:textbox>
     <![if !mso]>
     <table cellpadding=0 cellspacing=0 width="100%">
<tr>
       <td><![endif]>
       <div>
       <p class=MsoNormal align=center style='text-align:center'>
Data Input</p></p>
</div>
<![if !mso]></td>
      </tr>
</table>
<![endif]></v:textbox>
   </v:shape><v:shape id="Straight_x0020_Arrow_x0020_Connector_x0020_261"
    o:spid="_x0000_s1047" type="#_x0000_t32" style='position:absolute;left:5327;
    top:5009;width:1908;height:3504;flip:x;visibility:visible;mso-wrap-style:square'
    o:connectortype="straight" o:gfxdata="UEsDBBQABgAIAAAAIQD+JeulAAEAAOoBAAATAAAAW0NvbnRlbnRfVHlwZXNdLnhtbJSRzU7EIBDH
7ya+A+FqWqoHY0zpHqwe1Zj1AQhMW2I7EAbr7ts73e5ejGviEeb/8RuoN7tpFDMk8gG1vC4rKQBt
cB57Ld+3T8WdFJQNOjMGBC33QHLTXF7U230EEuxG0nLIOd4rRXaAyVAZIiBPupAmk/mYehWN/TA9
qJuqulU2YAbMRV4yZFO30JnPMYvHHV+vJAlGkuJhFS5dWpoYR29NZlI1o/vRUhwbSnYeNDT4SFeM
IdWvDcvkfMHR98JPk7wD8WpSfjYTYyiXaNkAweaQWFf+nbSgTlSErvMWyjYRL7V6T3DnSlz4wgTz
f/Nbtr3BfEpXh59qvgEAAP//AwBQSwMEFAAGAAgAAAAhAJYFM1jUAAAAlwEAAAsAAABfcmVscy8u
cmVsc6SQPWsDMQyG90L/g9He8yVDKSW+bIWsIYWuxtZ9kLNkJHNN/n1MoaVXsnWUXvQ8L9rtL2k2
C4pOTA42TQsGKXCcaHDwfnp7egGjxVP0MxM6uKLCvnt82B1x9qUe6ThlNZVC6mAsJb9aq2HE5LXh
jFSTniX5UkcZbPbh7Ae027Z9tvKbAd2KaQ7RgRziFszpmqv5DztNQVi5L03gZLnvp3CPaiN/0hGX
SvEyYHEQRb+WgktTy4G979380xuYCENh+aiOlfwnqfbvBnb1zu4GAAD//wMAUEsDBBQABgAIAAAA
IQAzLwWeQQAAADkAAAAUAAAAZHJzL2Nvbm5lY3RvcnhtbC54bWyysa/IzVEoSy0qzszPs1Uy1DNQ
UkjNS85PycxLt1UKDXHTtVBSKC5JzEtJzMnPS7VVqkwtVrK34+UCAAAA//8DAFBLAwQUAAYACAAA
ACEA6bxAnsQAAADcAAAADwAAAGRycy9kb3ducmV2LnhtbESPQUsDMRSE7wX/Q3iCt262FaOsTYsU
KtKbXfH83Dw3i5uXNUnbrb/eFAo9DjPzDbNYja4XBwqx86xhVpQgiBtvOm41fNSb6ROImJAN9p5J
w4kirJY3kwVWxh/5nQ671IoM4VihBpvSUEkZG0sOY+EH4ux9++AwZRlaaQIeM9z1cl6WSjrsOC9Y
HGhtqfnZ7Z2Gr/rXPFhVm22490qd/j4ft/tXre9ux5dnEInGdA1f2m9Gw1zN4HwmHwG5/AcAAP//
AwBQSwECLQAUAAYACAAAACEA/iXrpQABAADqAQAAEwAAAAAAAAAAAAAAAAAAAAAAW0NvbnRlbnRf
VHlwZXNdLnhtbFBLAQItABQABgAIAAAAIQCWBTNY1AAAAJcBAAALAAAAAAAAAAAAAAAAADEBAABf
cmVscy8ucmVsc1BLAQItABQABgAIAAAAIQAzLwWeQQAAADkAAAAUAAAAAAAAAAAAAAAAAC4CAABk
cnMvY29ubmVjdG9yeG1sLnhtbFBLAQItABQABgAIAAAAIQDpvECexAAAANwAAAAPAAAAAAAAAAAA
AAAAAKECAABkcnMvZG93bnJldi54bWxQSwUGAAAAAAQABAD5AAAAkgMAAAAA
" strokecolor="#4579b8 [3044]">
    <v:stroke endarrow="block"/>
   </v:shape></v:group><v:group id="Group_x0020_262" o:spid="_x0000_s1048"
   style='position:absolute;left:16697;width:16300;height:13914' coordsize="16299,13914"
   o:gfxdata="UEsDBBQABgAIAAAAIQCi+E9TBAEAAOwBAAATAAAAW0NvbnRlbnRfVHlwZXNdLnhtbJSRy07DMBBF
90j8g+UtShxYIISadEGAHSAoHzCyJ4lFYlseN7R/z7iPDaJIXdpzz5wre7HcTKOYMZL1rpbXZSUF
Ou2NdX0tP1dPxZ0UlMAZGL3DWm6R5LK5vFistgFJMO2olkNK4V4p0gNOQKUP6HjS+ThB4mPsVQD9
BT2qm6q6Vdq7hC4VKe+QzaLFDtZjEo8bvt43iTiSFA/7YHbVEkIYrYbETdXszC9LcTCUTO4yNNhA
V1xDqj8NeXJacOBe+WmiNSjeIKYXmLiGMpFUH/060AABOVj+vyp3najwXWc1lm2k5wx/ZPhY75TG
+G8XcT5X0DL2jvNxu9r9VfMDAAD//wMAUEsDBBQABgAIAAAAIQBsBtX+2AAAAJkBAAALAAAAX3Jl
bHMvLnJlbHOkkMFKAzEQhu+C7xDm7mbbg4g025vQa63gNSSz2eAmE2biat/eWBBc6c3jzM9838/s
9p9pVguyRMoGNl0PCrMjH3Mw8HJ6unsAJdVmb2fKaOCMAvvh9mZ3xNnWdiRTLKIaJYuBqdbyqLW4
CZOVjgrmlozEydY2ctDFujcbUG/7/l7zbwYMK6Y6eAN88FtQp3Np5j/sFB2T0Fg7R0nTOEZ3jao9
feQjLo1iOWA14FkuS8ala+VAX/du/ukNTO/lebIFX5tkZb9E8h01/08HvXro8AUAAP//AwBQSwME
FAAGAAgAAAAhADMvBZ5BAAAAOQAAABUAAABkcnMvZ3JvdXBzaGFwZXhtbC54bWyysa/IzVEoSy0q
zszPs1Uy1DNQUkjNS85PycxLt1UKDXHTtVBSKC5JzEtJzMnPS7VVqkwtVrK34+UCAAAA//8DAFBL
AwQUAAYACAAAACEA0qAlbMQAAADcAAAADwAAAGRycy9kb3ducmV2LnhtbESPQYvCMBSE7wv+h/AE
b2vayopUo4ioeJCFVUG8PZpnW2xeShPb+u/NwsIeh5n5hlmselOJlhpXWlYQjyMQxJnVJecKLufd
5wyE88gaK8uk4EUOVsvBxwJTbTv+ofbkcxEg7FJUUHhfp1K6rCCDbmxr4uDdbWPQB9nkUjfYBbip
ZBJFU2mw5LBQYE2bgrLH6WkU7Dvs1pN42x4f983rdv76vh5jUmo07NdzEJ56/x/+ax+0gmSawO+Z
cATk8g0AAP//AwBQSwECLQAUAAYACAAAACEAovhPUwQBAADsAQAAEwAAAAAAAAAAAAAAAAAAAAAA
W0NvbnRlbnRfVHlwZXNdLnhtbFBLAQItABQABgAIAAAAIQBsBtX+2AAAAJkBAAALAAAAAAAAAAAA
AAAAADUBAABfcmVscy8ucmVsc1BLAQItABQABgAIAAAAIQAzLwWeQQAAADkAAAAVAAAAAAAAAAAA
AAAAADYCAABkcnMvZ3JvdXBzaGFwZXhtbC54bWxQSwECLQAUAAYACAAAACEA0qAlbMQAAADcAAAA
DwAAAAAAAAAAAAAAAACqAgAAZHJzL2Rvd25yZXYueG1sUEsFBgAAAAAEAAQA+gAAAJsDAAAAAA==
">
   <v:shape id="Flowchart_x003a__x0020_Punched_x0020_Tape_x0020_263" o:spid="_x0000_s1049"
    type="#_x0000_t122" style='position:absolute;top:8905;width:9621;height:5009;
    visibility:visible;mso-wrap-style:square;v-text-anchor:middle' o:gfxdata="UEsDBBQABgAIAAAAIQDw94q7/QAAAOIBAAATAAAAW0NvbnRlbnRfVHlwZXNdLnhtbJSRzUrEMBDH
74LvEOYqbaoHEWm6B6tHFV0fYEimbdg2CZlYd9/edD8u4goeZ+b/8SOpV9tpFDNFtt4puC4rEOS0
N9b1Cj7WT8UdCE7oDI7ekYIdMayay4t6vQvEIrsdKxhSCvdSsh5oQi59IJcvnY8TpjzGXgbUG+xJ
3lTVrdTeJXKpSEsGNHVLHX6OSTxu8/pAEmlkEA8H4dKlAEMYrcaUSeXszI+W4thQZudew4MNfJUx
QP7asFzOFxx9L/lpojUkXjGmZ5wyhjSRJQ8YKGvKv1MWzIkL33VWU9lGfl98J6hz4cZ/uUjzf7Pb
bHuj+ZQu9z/UfAMAAP//AwBQSwMEFAAGAAgAAAAhADHdX2HSAAAAjwEAAAsAAABfcmVscy8ucmVs
c6SQwWrDMAyG74O9g9G9cdpDGaNOb4VeSwe7CltJTGPLWCZt376mMFhGbzvqF/o+8e/2tzCpmbJ4
jgbWTQuKomXn42Dg63xYfYCSgtHhxJEM3Elg372/7U40YalHMvokqlKiGBhLSZ9aix0poDScKNZN
zzlgqWMedEJ7wYH0pm23Ov9mQLdgqqMzkI9uA+p8T9X8hx28zSzcl8Zy0Nz33r6iasfXeKK5UjAP
VAy4LM8w09zU50C/9q7/6ZURE31X/kL8TKv1x6wXNXYPAAAA//8DAFBLAwQUAAYACAAAACEAMy8F
nkEAAAA5AAAAEAAAAGRycy9zaGFwZXhtbC54bWyysa/IzVEoSy0qzszPs1Uy1DNQUkjNS85PycxL
t1UKDXHTtVBSKC5JzEtJzMnPS7VVqkwtVrK34+UCAAAA//8DAFBLAwQUAAYACAAAACEASXHdgcUA
AADcAAAADwAAAGRycy9kb3ducmV2LnhtbESPwWrDMBBE74X+g9hCb7Uch4TiWAmhEAg9NDTJxbet
tZFNrZWw5MT9+6hQ6HGYmTdMtZlsL640hM6xglmWgyBunO7YKDifdi+vIEJE1tg7JgU/FGCzfnyo
sNTuxp90PUYjEoRDiQraGH0pZWhashgy54mTd3GDxZjkYKQe8JbgtpdFni+lxY7TQoue3lpqvo+j
VRBlt7Bm8VUfPkaj37fez2dcK/X8NG1XICJN8T/8195rBcVyDr9n0hGQ6zsAAAD//wMAUEsBAi0A
FAAGAAgAAAAhAPD3irv9AAAA4gEAABMAAAAAAAAAAAAAAAAAAAAAAFtDb250ZW50X1R5cGVzXS54
bWxQSwECLQAUAAYACAAAACEAMd1fYdIAAACPAQAACwAAAAAAAAAAAAAAAAAuAQAAX3JlbHMvLnJl
bHNQSwECLQAUAAYACAAAACEAMy8FnkEAAAA5AAAAEAAAAAAAAAAAAAAAAAApAgAAZHJzL3NoYXBl
eG1sLnhtbFBLAQItABQABgAIAAAAIQBJcd2BxQAAANwAAAAPAAAAAAAAAAAAAAAAAJgCAABkcnMv
ZG93bnJldi54bWxQSwUGAAAAAAQABAD1AAAAigMAAAAA
" fillcolor="#4f81bd [3204]" strokecolor="#243f60 [1604]" strokeweight="2pt">
    <v:textbox>
     <![if !mso]>
     <table cellpadding=0 cellspacing=0 width="100%">
<tr>
       <td><![endif]>
       <div>
       <p class=MsoNormal align=center style='text-align:center'>
WEB-API</p></p>
</div>
<![if !mso]></td>
      </tr>
</table>
<![endif]></v:textbox>
   </v:shape><v:shape id="Cloud_x0020_264" o:spid="_x0000_s1050" style='position:absolute;
    left:3021;width:13278;height:5009;visibility:visible;mso-wrap-style:square;
    v-text-anchor:middle' coordsize="43200,43200" o:spt="100" o:gfxdata="UEsDBBQABgAIAAAAIQDw94q7/QAAAOIBAAATAAAAW0NvbnRlbnRfVHlwZXNdLnhtbJSRzUrEMBDH
74LvEOYqbaoHEWm6B6tHFV0fYEimbdg2CZlYd9/edD8u4goeZ+b/8SOpV9tpFDNFtt4puC4rEOS0
N9b1Cj7WT8UdCE7oDI7ekYIdMayay4t6vQvEIrsdKxhSCvdSsh5oQi59IJcvnY8TpjzGXgbUG+xJ
3lTVrdTeJXKpSEsGNHVLHX6OSTxu8/pAEmlkEA8H4dKlAEMYrcaUSeXszI+W4thQZudew4MNfJUx
QP7asFzOFxx9L/lpojUkXjGmZ5wyhjSRJQ8YKGvKv1MWzIkL33VWU9lGfl98J6hz4cZ/uUjzf7Pb
bHuj+ZQu9z/UfAMAAP//AwBQSwMEFAAGAAgAAAAhADHdX2HSAAAAjwEAAAsAAABfcmVscy8ucmVs
c6SQwWrDMAyG74O9g9G9cdpDGaNOb4VeSwe7CltJTGPLWCZt376mMFhGbzvqF/o+8e/2tzCpmbJ4
jgbWTQuKomXn42Dg63xYfYCSgtHhxJEM3Elg372/7U40YalHMvokqlKiGBhLSZ9aix0poDScKNZN
zzlgqWMedEJ7wYH0pm23Ov9mQLdgqqMzkI9uA+p8T9X8hx28zSzcl8Zy0Nz33r6iasfXeKK5UjAP
VAy4LM8w09zU50C/9q7/6ZURE31X/kL8TKv1x6wXNXYPAAAA//8DAFBLAwQUAAYACAAAACEAMy8F
nkEAAAA5AAAAEAAAAGRycy9zaGFwZXhtbC54bWyysa/IzVEoSy0qzszPs1Uy1DNQUkjNS85PycxL
t1UKDXHTtVBSKC5JzEtJzMnPS7VVqkwtVrK34+UCAAAA//8DAFBLAwQUAAYACAAAACEAdHIsgMcA
AADcAAAADwAAAGRycy9kb3ducmV2LnhtbESPQWvCQBSE74L/YXmCF9GNUkVSVxFLi6ggVcH29sy+
JsHs2zS71fjvXUHocZiZb5jJrDaFuFDlcssK+r0IBHFidc6pgsP+vTsG4TyyxsIyKbiRg9m02Zhg
rO2VP+my86kIEHYxKsi8L2MpXZKRQdezJXHwfmxl0AdZpVJXeA1wU8hBFI2kwZzDQoYlLTJKzrs/
o4C/Nh+nbb8zfludlvq43nzb8+9QqXarnr+C8FT7//CzvdQKBqMXeJwJR0BO7wAAAP//AwBQSwEC
LQAUAAYACAAAACEA8PeKu/0AAADiAQAAEwAAAAAAAAAAAAAAAAAAAAAAW0NvbnRlbnRfVHlwZXNd
LnhtbFBLAQItABQABgAIAAAAIQAx3V9h0gAAAI8BAAALAAAAAAAAAAAAAAAAAC4BAABfcmVscy8u
cmVsc1BLAQItABQABgAIAAAAIQAzLwWeQQAAADkAAAAQAAAAAAAAAAAAAAAAACkCAABkcnMvc2hh
cGV4bWwueG1sUEsBAi0AFAAGAAgAAAAhAHRyLIDHAAAA3AAAAA8AAAAAAAAAAAAAAAAAmAIAAGRy
cy9kb3ducmV2LnhtbFBLBQYAAAAABAAEAPUAAACMAwAAAAA=
" adj="-11796480,,5400" path="m3900,14370c3629,11657,4261,8921,5623,6907,7775,3726,11264,3017,14005,5202,15678,909,19914,22,22456,3432,23097,1683,24328,474,25749,200v1564,-302,3126,570,4084,2281c31215,267,33501,-460,35463,690v1495,876,2567,2710,2855,4886c40046,6218,41422,7998,41982,10318v407,1684,349,3513,-164,5142c43079,17694,43520,20590,43016,23322v-670,3632,-2888,6352,-5612,6882c37391,32471,36658,34621,35395,36101v-1919,2249,-4691,2538,-6840,714c27860,39948,25999,42343,23667,43106v-2748,899,-5616,-633,-7187,-3840c12772,42310,7956,40599,5804,35472,3690,35809,1705,34024,1110,31250,679,29243,1060,27077,2113,25551,619,24354,-213,22057,-5,19704,239,16949,1845,14791,3863,14507v12,-46,25,-91,37,-137xem4693,26177nfc3809,26271,2925,25993,2160,25380t4768,9519nfc6573,35092,6200,35220,5820,35280t10658,3810nfc16211,38544,15987,37961,15810,37350m28827,34751nfc28788,35398,28698,36038,28560,36660m34129,22954nfc36133,24282,37398,27058,37380,30090m41798,15354nfc41473,16386,40978,17302,40350,18030m38324,5426nfc38379,5843,38405,6266,38400,6690m29078,3952nfc29267,3369,29516,2826,29820,2340m22141,4720nfc22218,4238,22339,3771,22500,3330m14000,5192nfc14472,5568,14908,6021,15300,6540m4127,15789nfc4024,15325,3948,14851,3900,14370e"
    fillcolor="#4f81bd [3204]" strokecolor="#243f60 [1604]" strokeweight="2pt">
    <v:stroke joinstyle="miter"/>
    <v:formulas/>
    <v:path arrowok="t" o:connecttype="custom" o:connectlocs="144248,303540;66392,294298;212945,404677;178889,409095;506482,453275;485950,433098;886052,402961;877845,425097;1049019,266167;1148944,348914;1284740,178040;1240233,209070;1177960,62918;1180296,77575;893767,45826;916574,27134;680545,54732;691580,38614;430316,60205;470274,75836;126851,183084;119874,166630"
     o:connectangles="0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0"
     textboxrect="0,0,43200,43200"/>
    <v:textbox>
     <![if !mso]>
     <table cellpadding=0 cellspacing=0 width="100%">
<tr>
       <td><![endif]>
       <div>
       <p class=MsoNormal align=center style='text-align:center'>
Client</p></p>
</div>
<![if !mso]></td>
      </tr>
</table>
<![endif]></v:textbox>
   </v:shape><v:shape id="Straight_x0020_Arrow_x0020_Connector_x0020_265"
    o:spid="_x0000_s1051" type="#_x0000_t32" style='position:absolute;left:6122;
    top:5009;width:3498;height:3901;flip:x;visibility:visible;mso-wrap-style:square'
    o:connectortype="straight" o:gfxdata="UEsDBBQABgAIAAAAIQD+JeulAAEAAOoBAAATAAAAW0NvbnRlbnRfVHlwZXNdLnhtbJSRzU7EIBDH
7ya+A+FqWqoHY0zpHqwe1Zj1AQhMW2I7EAbr7ts73e5ejGviEeb/8RuoN7tpFDMk8gG1vC4rKQBt
cB57Ld+3T8WdFJQNOjMGBC33QHLTXF7U230EEuxG0nLIOd4rRXaAyVAZIiBPupAmk/mYehWN/TA9
qJuqulU2YAbMRV4yZFO30JnPMYvHHV+vJAlGkuJhFS5dWpoYR29NZlI1o/vRUhwbSnYeNDT4SFeM
IdWvDcvkfMHR98JPk7wD8WpSfjYTYyiXaNkAweaQWFf+nbSgTlSErvMWyjYRL7V6T3DnSlz4wgTz
f/Nbtr3BfEpXh59qvgEAAP//AwBQSwMEFAAGAAgAAAAhAJYFM1jUAAAAlwEAAAsAAABfcmVscy8u
cmVsc6SQPWsDMQyG90L/g9He8yVDKSW+bIWsIYWuxtZ9kLNkJHNN/n1MoaVXsnWUXvQ8L9rtL2k2
C4pOTA42TQsGKXCcaHDwfnp7egGjxVP0MxM6uKLCvnt82B1x9qUe6ThlNZVC6mAsJb9aq2HE5LXh
jFSTniX5UkcZbPbh7Ae027Z9tvKbAd2KaQ7RgRziFszpmqv5DztNQVi5L03gZLnvp3CPaiN/0hGX
SvEyYHEQRb+WgktTy4G979380xuYCENh+aiOlfwnqfbvBnb1zu4GAAD//wMAUEsDBBQABgAIAAAA
IQAzLwWeQQAAADkAAAAUAAAAZHJzL2Nvbm5lY3RvcnhtbC54bWyysa/IzVEoSy0qzszPs1Uy1DNQ
UkjNS85PycxLt1UKDXHTtVBSKC5JzEtJzMnPS7VVqkwtVrK34+UCAAAA//8DAFBLAwQUAAYACAAA
ACEAlodGncQAAADcAAAADwAAAGRycy9kb3ducmV2LnhtbESPQUsDMRSE74L/ITyhNzdrS6NsmxYR
FOnNrnh+3bxulm5e1iRtt/56Iwg9DjPzDbNcj64XJwqx86zhoShBEDfedNxq+Kxf759AxIRssPdM
Gi4UYb26vVliZfyZP+i0Ta3IEI4VarApDZWUsbHkMBZ+IM7e3geHKcvQShPwnOGul9OyVNJhx3nB
4kAvlprD9ug07OpvM7eqNpsw80pdfr4eN8c3rSd34/MCRKIxXcP/7XejYarm8HcmHwG5+gUAAP//
AwBQSwECLQAUAAYACAAAACEA/iXrpQABAADqAQAAEwAAAAAAAAAAAAAAAAAAAAAAW0NvbnRlbnRf
VHlwZXNdLnhtbFBLAQItABQABgAIAAAAIQCWBTNY1AAAAJcBAAALAAAAAAAAAAAAAAAAADEBAABf
cmVscy8ucmVsc1BLAQItABQABgAIAAAAIQAzLwWeQQAAADkAAAAUAAAAAAAAAAAAAAAAAC4CAABk
cnMvY29ubmVjdG9yeG1sLnhtbFBLAQItABQABgAIAAAAIQCWh0adxAAAANwAAAAPAAAAAAAAAAAA
AAAAAKECAABkcnMvZG93bnJldi54bWxQSwUGAAAAAAQABAD5AAAAkgMAAAAA
" strokecolor="#4579b8 [3044]">
    <v:stroke endarrow="block"/>
   </v:shape></v:group></v:group><w:wrap type="none"/>
 <w:anchorlock/>
</v:group><![endif]--><!--[if !vml]--><!--[endif]--><!--[if mso & !supportInlineShapes & supportFields]><v:shape
 id="_x0000_i1027" type="#_x0000_t75" style='width:326.2pt;height:262.95pt'>
 <v:imagedata croptop="-65520f" cropbottom="65520f"/>
</v:shape><span style='mso-element:field-end'></span><![endif]-->
<p>&nbsp;</p>
</div>

<p>&nbsp;</p>

<p>So how does the system know which metrics are on which machines?</p>

<p>When configuring the relay we added the option: consistent-hashing. This will create a hash on the metric name, and will then know to send and retrieve each metric from the correct machine.</p>

<p>For more information see: <a href="http://grey-boundary.com/the-architecture-of-clustering-graphite/">http://grey-boundary.com/the-architecture-of-clustering-graphite/</a>.</p>

<p>As you can see the WEB-API does not use the carbon-relay, but knows itself to which cache to access. This is done so that we don&rsquo;t have the penalty of another hop.</p>

<p>Both processes need to go via the carbon-cache and not directly to the whisper since there can be data in the cache that has not been persisted yet.</p>

<p>&nbsp;</p>

<h1><u>High Availability</u></h1>

<p>Once you understand the cluster mode, to achieve high availability, what we need to do is make sure that each metric whisper is stored on more than one machine. This way if a machine goes down we still have our data. To do this on the relay definition we add update the configuration parameter REPLICATION_FACTOR=2. This will tell the relay to persist the metric to two machines. For example:</p>

<div class="MsoNormal" style="background: #F2F2F2; margin-bottom: .0001pt; margin-bottom: 0in; mso-background-themecolor: background1; mso-background-themeshade: 242;"><span style="color: #3a4145; font-family: &quot;Courier New&quot;; font-size: 12.0pt; line-height: 115%; mso-fareast-font-family: &quot;Times New Roman&quot;;">[</span><span style="color: #943634; mso-themecolor: accent2; mso-themeshade: 191;">relay]</span>

<p>&nbsp;</p>
</div>

<div class="MsoNormal" style="background: #F2F2F2; margin-bottom: .0001pt; margin-bottom: 0in; mso-background-themecolor: background1; mso-background-themeshade: 242;"><span style="color: #943634; mso-themecolor: accent2; mso-themeshade: 191;">LINE_RECEIVER_INTERFACE = 0.0.0.0</span>

<p>&nbsp;</p>
</div>

<div class="MsoNormal" style="background: #F2F2F2; margin-bottom: .0001pt; margin-bottom: 0in; mso-background-themecolor: background1; mso-background-themeshade: 242;"><span style="color: #943634; mso-themecolor: accent2; mso-themeshade: 191;">LINE_RECEIVER_PORT = 2003</span>

<p>&nbsp;</p>
</div>

<div class="MsoNormal" style="background: #F2F2F2; margin-bottom: .0001pt; margin-bottom: 0in; mso-background-themecolor: background1; mso-background-themeshade: 242;"><span style="color: #943634; mso-themecolor: accent2; mso-themeshade: 191;">PICKLE_RECEIVER_INTERFACE = 0.0.0.0</span>

<p>&nbsp;</p>
</div>

<div class="MsoNormal" style="background: #F2F2F2; margin-bottom: .0001pt; margin-bottom: 0in; mso-background-themecolor: background1; mso-background-themeshade: 242;"><span style="color: #943634; mso-themecolor: accent2; mso-themeshade: 191;">PICKLE_RECEIVER_PORT = 2004</span>

<p>&nbsp;</p>
</div>

<div class="MsoNormal" style="background: #F2F2F2; margin-bottom: .0001pt; margin-bottom: 0in; mso-background-themecolor: background1; mso-background-themeshade: 242;"><span style="color: #943634; mso-themecolor: accent2; mso-themeshade: 191;">RELAY_METHOD = consistent-hashing </span>

<p>&nbsp;</p>
</div>

<div class="MsoNormal" style="background: #F2F2F2; margin-bottom: .0001pt; margin-bottom: 0in; mso-background-themecolor: background1; mso-background-themeshade: 242;"><span style="color: #943634; mso-themecolor: accent2; mso-themeshade: 191;">REPLICATION_FACTOR = 2</span>

<p>&nbsp;</p>
</div>

<div class="MsoNormal" style="background: #F2F2F2; margin-bottom: .0001pt; margin-bottom: 0in; mso-background-themecolor: background1; mso-background-themeshade: 242;"><span style="color: #943634; mso-themecolor: accent2; mso-themeshade: 191;">DESTINATIONS = 127.0.0.1:2014:1, 127.0.0.1:2024:2</span>

<p>&nbsp;</p>
</div>

<p>&nbsp;</p>

<p>So depending on your needs and the number of computers you can define the replication factor to determine how many copies of your data you want. The consistent-hashing will be used by the relay to know on which machines reside the data.</p>

<p>For a detailed document on the architecture of graphite see:</p>

<div class="MsoNormal" style="text-indent: .5in;"><a href="http://www.aosabook.org/en/graphite.html">http://www.aosabook.org/en/graphite.html</a>

<p>&nbsp;</p>
</div>

<p>Clustering Graphite</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <a href="http://grey-boundary.com/the-architecture-of-clustering-graphite/">http://grey-boundary.com/the-architecture-of-clustering-graphite/</a></p>

<div class="MsoNormal" style="text-indent: .5in;"><a href="http://bitprophet.org/blog/2013/03/07/graphite/">http://bitprophet.org/blog/2013/03/07/graphite/</a>

<p>&nbsp;</p>
</div>

<p>&nbsp;</p>

<p>&nbsp;</p>

<h1><u>Open Issues with graphite</u></h1>

<h2><u>Ramp Up</u></h2>

<p>The IO is the biggest problem in a system like graphite. As we saw to minimize this graphite created the cache and rely and cluster mechanism. Still in the end once a new metric is sent to the server, graphite needs to create a new file with the size according to the retention.</p>

<p>There is a parameter:</p>

<div class="MsoNormal" style="margin-bottom: 0.0001pt;"><span style="font-family: &quot;Courrier New&quot;; font-size: 9.0pt; mso-bidi-font-family: &quot;Courrier New&quot;;">MAX_CREATES_PER_MINUTE = 50</span>

<p>&nbsp;</p>
</div>

<p>This will define how many new files are created per minute. The catch with this parameter, is that if you have a lot of new metrics, on the first of each metric graphite will create a file of the maximum length. This means writing a lot of data. What is not mentioned in the documentation is that any metrics that are not written will be lost. Meaning that if on the start of a new system I create more than 50 new metrics per minute, 50 will be created and the rest will be dropped. So in order to get all my metrics in, I need a ramp-up time. You need to continually send all the metrics, and then at a rate of 50 per minute will the metrics be created.</p>

<p>&nbsp;</p>

<h1><u>Debugging</u></h1>

<h2><u>Eat your own dog food</u></h2>

<p>Graphite saves a lot of information about itself in metrics that are saved in graphite.</p>

<p>For the carbon cache we have the following metrics:</p>

<p>&nbsp;</p>

<div class="separator" style="clear: both; text-align: center;"><a href="http://3.bp.blogspot.com/-O9NNdFf8Jos/VES1MJRAd2I/AAAAAAAARcs/WdIumSA6DXI/s1600/3Capture.JPG" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="400" src="http://3.bp.blogspot.com/-O9NNdFf8Jos/VES1MJRAd2I/AAAAAAAARcs/WdIumSA6DXI/s1600/3Capture.JPG" width="200" /></a></div>

<p>&nbsp;</p>

<div align="center" class="MsoNormal" style="text-align: center;"><!--[if gte vml 1]><v:shape id="Picture_x0020_1"
 o:spid="_x0000_i1026" type="#_x0000_t75" style='width:168pt;height:376.5pt;
 visibility:visible;mso-wrap-style:square'>
 <v:imagedata src="file:///C:\Users\Chaimt\AppData\Local\Temp\msohtmlclip1\01\clip_image003.png"
  o:title=""/>
</v:shape><![endif]--><!--[if !vml]--><!--[endif]-->
<p>&nbsp;</p>
</div>

<div align="center" class="MsoNormal" style="text-align: center;">&nbsp;</div>

<p>And for carbon relay we have the following:</p>

<p>&nbsp;</p>

<div class="separator" style="clear: both; text-align: center;"><a href="http://3.bp.blogspot.com/-GFhcGmdtKK0/VES1NAIjoXI/AAAAAAAARc4/A7gTQ8V_MFY/s1600/4Capture.JPG" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="400" src="http://3.bp.blogspot.com/-GFhcGmdtKK0/VES1NAIjoXI/AAAAAAAARc4/A7gTQ8V_MFY/s1600/4Capture.JPG" width="272" /></a></div>

<p>&nbsp;</p>

<div align="center" class="MsoNormal" style="text-align: center;"><!--[if gte vml 1]><v:shape id="Picture_x0020_2"
 o:spid="_x0000_i1025" type="#_x0000_t75" style='width:228.75pt;height:342.75pt;
 visibility:visible;mso-wrap-style:square'>
 <v:imagedata src="file:///C:\Users\Chaimt\AppData\Local\Temp\msohtmlclip1\01\clip_image004.png"
  o:title=""/>
</v:shape><![endif]--><!--[if !vml]--><!--[endif]-->
<p>&nbsp;</p>
</div>

<div align="center" class="MsoNormal" style="text-align: center;">&nbsp;</div>

<h2><u>Debugging techniques</u></h2>

<p>The first part, is once you send a new metric to graphite, you can check if the whisper file was created.</p>

<p>Next step: in the carbon.conf you have the following flags:</p>

<div class="MsoNormal" style="background: #F2F2F2; margin-bottom: .0001pt; margin-bottom: 0in; mso-background-themecolor: background1; mso-background-themeshade: 242;"><span style="color: #943634; mso-themecolor: accent2; mso-themeshade: 191;">LOG_UPDATES = log every whisper update</span>

<p>&nbsp;</p>
</div>

<div class="MsoNormal" style="background: #F2F2F2; margin-bottom: .0001pt; margin-bottom: 0in; mso-background-themecolor: background1; mso-background-themeshade: 242;"><span style="color: #943634; mso-themecolor: accent2; mso-themeshade: 191;">LOG_CACHE_HITS = log every chache update</span>

<p>&nbsp;</p>
</div>

<div class="MsoNormal" style="background: #F2F2F2; margin-bottom: .0001pt; margin-bottom: 0in; mso-background-themecolor: background1; mso-background-themeshade: 242;"><span style="color: #943634; mso-themecolor: accent2; mso-themeshade: 191;">LOG_CACHE_QUEUE_SORTS = True</span>

<p>&nbsp;</p>
</div>

<p>&nbsp;</p>

<p>To view the logs go to &nbsp;../storage/log. Here you should have three log folder: carbon-cache, carbon-relay, webapp. Under each one we have more folders per instance of application.</p>

<p>For example, debugging cache. Go to folder /storage/log/carbon-cache/carbon-cache-1. To debug your application sending metrics to graphite you can use listener.log. If there are any connection failures you should see them in this file. Also in case of invalid formats sent to graphite, you will see the error here.</p>

<h2><u>Multi-tenet</u></h2>

<p>If you need to use graphite for multiple customers, you can easily do this by adding a prefix to the metric name. You just need to remember that this is a solution on the application layer and not in graphite. So if you give a direct connection to the graphite, you cannot block the data per client.</p>

<h2><u>Events</u></h2>

<p>Graphite does have a simple mechanism for saving basic events. The basic structure of events is: when, what, data, tags. There is a dedicated GUI for viewing the events. You can also use the rest api to query events. The events are not the center of graphite and therefor do not have all the features that would be expected from an events system. So you if need to do anything more than a simple event you should look for a more robust system (like elasticsearch). For more information see:</p>

<p><a href="http://obfuscurity.com/2014/01/Graphite-Tip-A-Better-Way-to-Store-Events">http://obfuscurity.com/2014/01/Graphite-Tip-A-Better-Way-to-Store-Events</a></p>

<p>&nbsp;</p>

<h2><u>Hosting Graphite</u></h2>

<p>If your servers have access to the internet, and you do not want the hassle of setting up graphite and maintaining it, you can always go the hosting way.</p>

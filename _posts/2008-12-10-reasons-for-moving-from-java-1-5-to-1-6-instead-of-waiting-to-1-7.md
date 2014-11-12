---
layout: post
title: reasons for moving from java 1.5 to 1.6 instead of waiting to 1.7
created: 1228899368
author: elad
permalink: /java/reasons-moving-java-15-16-instead-waiting-17
tags:
- JAVA
- JSE7
- JSE6
---
<p><span style="display: none;" id="1249460656040S">&nbsp;</span></p>
<div>A client working with java 1.5 asked us what's better for him - moving to 1.6, or waiting until 1.7 comes.</div>
<div>I answered that I think it's better moving to 1.6 now than staying with 1.5 until 1.7 arrives, because of the following improvements that 1.6 offers (compared to 1.5):</div>
<div>&nbsp;</div>
<ol>
    <li><span>I/O performance (tested by ~4,000 concurrent socket connections): 125% improvement</span></li>
    <li><span>java-server benchmarks (VolanoMark, SPECjbb): between 60% - 75% improvement<br />
    </span></li>
    <li><span>Memory footprint: 10% lower<br />
    </span></li>
    <li><span>Application start-up time: 15% faster (due to an improved bootstrap CL)<br />
    </span><span> <br />
    </span></li>
</ol>
<div><span> you can see the java 6 performance white paper for the complete results - <br />
<a href="http://java.sun.com/performance/reference/whitepapers/6_performance.html" target="_blank" rel="nofollow"><span class="yshortcuts">http://java.sun.com/performance/reference/whitepapers/6_performance.html</span></a><br />
<br />
In conclusion - It seems upgrading to JSE6 is worth the effort, especially if you're looking for improved performance.</span></div>
<p>&nbsp;</p>
<p><span style="display: none;" id="1249460655870E">&nbsp;</span></p>

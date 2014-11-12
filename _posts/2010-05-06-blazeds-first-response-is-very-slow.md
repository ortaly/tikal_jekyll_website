---
layout: post
title: BlazeDS first response is VERY SLOW
created: 1273099312
permalink: blazeds-first-response-is-very-slow
tags:
- JS
- Flex3
- BlazeDS
---
<p>Hi everyone,</p>
<p>&nbsp;</p>
<p>I have a very strange an annoying problem:</p>
<p>I have an appliaction written in Flex 3, with BlazeDS 3.2 and Java in the backend.</p>
<p>I'm actually using a portal (liferay) to display portlets that contain Flex movies.</p>
<p>When I&nbsp;hit a refresh button on my page, all the Flex movies send a RemoteObject request to the server (using BlazeDS), which should go to java classes and invoke a method (standard BlazeDS usage I 'm guessing).</p>
<p>&nbsp;</p>
<p>I'm experiencing VERY slow response (<strong>14 minutes</strong>) on the first hit, while the following hits are much faster.</p>
<p>I've enabled the BlazeDS logging (logging level=&quot;All&quot;) and I&nbsp;also have debug prints coming from my java classes.</p>
<p>I&nbsp;also use the &quot;showBusyCursor&quot; attribute for the RemoteObject - so I can see indication of the request being sent from the flex movie.</p>
<p>&nbsp;</p>
<p>Here is what I&nbsp;see:</p>
<ol>
    <li>I hit the refresh button</li>
    <li>Each movie invokes a RemoteObject request</li>
    <li>I see a busy sign - in all the movies</li>
    <li>I see nothing in the log - no BlazeDS prints and no Java prints</li>
    <li>Wait 14 minutes or so</li>
    <li>I&nbsp;see BlazeDS&nbsp;prints followed by Java prints</li>
    <li>I see data populating my flex movies.</li>
</ol>
<p>&nbsp;</p>
<p>The really weird thing is that I&nbsp;have the same &quot;application&quot; installed in 4 different computers (on my laptop and in 3 other unix machines),</p>
<p>3 of these installations work well (good response times) and only 1 has the issue I'm describing.</p>
<p>&nbsp;</p>
<p>I've tried many things, but everything failed.</p>
<p>&nbsp;</p>
<p>I'd be really happy to get some advice on this.</p>
<p>&nbsp;</p>
<p>Thanks,</p>
<p>&nbsp;&nbsp;&nbsp;&nbsp; Sivan</p>

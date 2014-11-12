---
layout: post
title: Http post error during build invokation in Hudson 1.323
created: 1299131178
author: hagzag
permalink: /devops/http-post-error-during-build-invokation-hudson-1323
tags:
- DevOps
- hudson jenkins
- Hudson
- Continuous Integration
---
<p>One of my clients has come up with an http post erorr whilst trying to invoke a build.</p>
<p>&nbsp;</p>
<p>Taking a look at the logs reveiled than indeed that the form post action instatiating the job didnt complete - this was very wiered,</p>
<p>The fact is all connection to server was within the clients LAN, with a fast enough connection between the client &amp; server, which coulden't result in this type of error due to speed. (and yes on public instances you should expect the page to load 100% before you submit anything ...)</p>
<p>&nbsp;</p>
<p>Whilst connected to the client LAN trying to reproduce the issue, I discovered two things</p>
<p>1. This was hapening on any form with in hudson - for exmeple hudson &gt; manage hudson - which ruled out this is a specific plugin issue.</p>
<p>2. I saw the browser trying to communicate with jvnet.<em>com...</em> which is probably a url used to report usage statistics, so I went a long to check if that option is enabled (under hudson &gt; manage hudson) and it wasent.</p>
<p>&nbsp;</p>
<p>Considering the fact this instance has been running for over two yesrs or so It must be somthing external...&nbsp; that has changed </p>
<p>Googleing on the subject returned 0 results, now considering the split between Oracle(sun) &amp; Jenkins I presumed it could be related, thus I upgraded the hudson.war to a later release (still under the hudson naming) which solved the issue.</p>
<p>&nbsp;</p>
<p>Not a very scientific solution but still ... (quick &amp; clean)</p>

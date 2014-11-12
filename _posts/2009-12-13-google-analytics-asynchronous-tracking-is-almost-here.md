---
layout: post
title: Google Analytics - Asynchronous Tracking is almost here
created: 1260738242
author: hagzag
permalink: /java/google-analytics-asynchronous-tracking-almost-here
tags:
- JAVA
- Google Analytics
- google
- Asynchronous Tracking
---
<p>As of &nbsp;Tuesday, December 01, 2009 Google analytics supports&nbsp;Asynchronous Tracking.<br />
Quote from:&nbsp;<a href="http://code.google.com/apis/analytics/docs/tracking/asyncTracking.html">http://code.google.com/apis/analytics/docs/tracking/asyncTracking.html</a></p>
<p>&quot;<span class="Apple-style-span" style="font-family: Helvetica, Arial, sans-serif; line-height: 16px; font-size: small; color: rgb(0, 0, 0); ">Asynchronous Tracking is an alternative way to track website visitors with Google Analytics. Unlike a&nbsp;<a style="color: rgb(0, 0, 204); " href="/apis/analytics/docs/tracking/gaTrackingOverview.html#standardSetup">traditional installation</a>, asynchronous tracking optimizes how browsers load&nbsp;<code style="font-family: monospace; color: rgb(0, 112, 0); font-size: 10pt; ">ga.js</code>&nbsp;so its impact on user experience is minimized. It also allows you to put your Analytics snippet higher in the page without delaying subsequent content from rendering. The Asynchronous Tracking requires a different Analytics snippet and a different syntax for making tracking API calls.&quot;</span></p>
<p>&nbsp;</p>
<p>To those of you asking why this is so important ?, well Google Analytics has become a web statistics standard our days and Google Analytics functions in a way that on every page you are building (statically or dynamically) executes&nbsp;<em><strong>ga.js</strong></em> script, which is: yes you guest it <em><strong>google analytics javascript,</strong></em> this script may on busy sites (like ours for example) become a burden, when considering page generation / page load time.&nbsp;<span class="Apple-style-span" style="font-family: Helvetica, Arial, sans-serif; line-height: 16px; font-size: small; color: rgb(0, 0, 0); ">Asynchronous Tracking is supposed to solve all that by being able to load / push statistics after the page loads for the user.</span></p>
<p>&nbsp;</p>
<p>Sounds to good to be true? well yes:</p>
<p><span class="Apple-style-span" style="color: rgb(51, 51, 51); font-family: Arial, sans-serif; line-height: normal; font-size: 13px; ">&quot;The second half of the snippet provides the logic that loads the tracking code in parallel with other scripts on the page. It executes an anonymous function that dynamically creates a &lt;script&gt; element and sets the source with the proper protocol. As a result, most browsers will load the tracking code in parallel with other scripts on the page, thus reducing the web page load time. Note here the forward-looking use of the new HTML5 &quot;async&quot; attribute in this part of the snippet. While it creates the same effect as adding a &lt;script&gt; element to the DOM, it officially tells browsers that this script can be loaded asynchronously. <em><strong>Firefox 3.6 is the first browser to officially offer support for this new feature</strong></em>. If you're curious, here are more details on the official&nbsp;<a id="fl-v" target="_blank" title="HTML 5 async specification" href="http://www.whatwg.org/specs/web-apps/current-work/#attr-script-async">HTML5 async specification</a>.&quot;</span></p>
<p>&nbsp;</p>
<p>Read the full blog post by Google:&nbsp;<a href="http://googlecode.blogspot.com/2009/12/google-analytics-launches-asynchronous.html">http://googlecode.blogspot.com/2009/12/google-analytics-launches-asynchronous.html</a></p>

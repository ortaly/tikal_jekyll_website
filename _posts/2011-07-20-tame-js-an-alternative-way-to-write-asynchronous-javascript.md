---
layout: post
title: tame.js - an alternative way to write asynchronous javascript
created: 1311179194
author: ittayd
permalink: /js/tamejs-alternative-way-write-asynchronous-javascript
tags:
- JS
---
<p>http://tamejs.org/</p>
<p>&nbsp;</p>
<p>Tame.js allows you to write asynchronous Javascript in sequentail form. What it means is that when using functions that require callback functions, then instead of passing in an annonymous function, tame.js allows to write the callback logic after the function call. Tame.js then takes care of inverting the code. For those familiar, this is delimited-continuations for javascript.</p>
<p>&nbsp;</p>
<p>A code example explains it better. Here are code snippets from the site.</p>
<p>&nbsp;</p>
<p>First is a regular Javascript code for matching Angel and Buffy:</p>
<pre title="code" class="brush: jscript;">
handleVisit : function(angel, buffy) {
  getScore(angel, buffy, function(match_score) {
    getNextMatch(angel, function(next_match) {
      recordVisitAndGetInfo(angel, buffy, function(visit_info) {
        if (match_score &gt; 0.9 &amp;&amp; ! visit_info.last_visit) {
          sendVisitorEmail(angel, buffy);
        }
        doSomeFinalThings(match_score, next_match, visit_info);
      });
    });
  });
}</pre>
<p>&nbsp;</p>
<p>It calculates a score, once this is done it finds a match, when it is finished, it records the visit and gets some info and does some stuff with it.</p>
<p>&nbsp;</p>
<p>And here it is written using tame.js. It is a bit magical, you'll need to go to the tame.js site to get more explenation, just note how it looks more orderly:</p>
<pre title="code" class="brush: jscript;">
handleVisit : function(angel, buffy) {
	//
	// let's fire all 3 at once
	//
	twait {
		getScore (angel, buffy, mkevent(var score));
		getNextMatch (angel, buffy, mkevent(var next));
		recordVisitAndGetInfo (angel, buffy, mkevent(var vinfo));
	}

	//
	// they've called back, and now we have our data
	//
	if (score &gt; 0.9 &amp;&amp; ! vinfo.last_visit) {
		sendVisitorEmail(angel, buffy);
	}
	doSomeFinalThings(score, next, vinfo);
}</pre>
<p>&nbsp;</p>

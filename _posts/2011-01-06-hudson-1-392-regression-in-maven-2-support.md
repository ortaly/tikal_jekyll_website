---
layout: post
title: Hudson 1.392 - Regression in Maven 2  support
created: 1294330908
author: hagzag
permalink: /devops/hudson-1392-regression-maven-2-support
tags:
- DevOps
- Hudson
---
<p>Well we can't be too optimistic these days.</p>
<p>Hudson 1.392 was indeed promising with Maven 3 support which worked as I said like a charm &quot;out of the box&quot; - what I didn't notice at first was that Maven 2 projects using relative path declerations are now failing.</p>
<p>&nbsp;</p>
<p>A bug was opened today on the subject see: <a href="http://issues.hudson-ci.org/browse/HUDSON-8430">HUDSON-8430</a> .</p>
<p>After blaming poor usage of Maven and Relative Path I configured the same project working with Maven 2 as a Free style which worked - so back to hudson 1.391 ... (Until next week <img src="http://www.tikalk.com/sites/all/modules/fckeditor/fckeditor/editor/images/smiley/msn/wink_smile.gif" alt="" />).</p>
<p>&nbsp;</p>

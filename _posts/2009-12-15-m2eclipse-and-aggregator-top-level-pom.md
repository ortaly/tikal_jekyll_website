---
layout: post
title: m2eclipse and aggregator/top-level pom
created: 1260877797
author: shalom
permalink: /devops/m2eclipse-and-aggregatortop-level-pom
tags:
- DevOps
- m2eclipse aggregator maven top level pom
---
<p>&nbsp;if you are used to create a directory for aggregator pom files just because eclipse couldn't handle it otherwise, then the last&nbsp;<a href="http://m2eclipse.sonatype.org/index.html">m2eclipse</a> version can handle it, you just import -&gt; maven-project and choose the top level directory where the aggregator pom is, it now works as IDEA 8 did(but not as nice..).</p>
<p>&nbsp;</p>
<p>so now you can:</p>
<p>top-level-dir</p>
<p>&nbsp;&nbsp; &nbsp; &nbsp; pom.xml &nbsp;the parent pom<br />
&nbsp;&nbsp; &nbsp; &nbsp; d:module-1</p>
<p>&nbsp;&nbsp; &nbsp; &nbsp; d:module-2</p>
<p>&nbsp;</p>
<p>and not anymore:</p>
<p><span class="Apple-style-span" style="line-height: 19px; font-size: 12px; "> </span></p>
<p style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; font-size: 14px; font-weight: normal; line-height: 21px; ">top-level-dir</p>
<p style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; font-size: 14px; font-weight: normal; line-height: 21px; ">&nbsp;&nbsp; &nbsp; &nbsp; d:parent (where the parent pom is)<br />
&nbsp;&nbsp; &nbsp; &nbsp; d:module-1</p>
<p style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; font-size: 14px; font-weight: normal; line-height: 21px; ">&nbsp;&nbsp; &nbsp; &nbsp; d:module-2</p>
<p>&nbsp;</p>

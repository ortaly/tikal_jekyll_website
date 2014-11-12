---
layout: post
title: Modularization of Flex Applications – Conclusions
created: 1297085923
author: shair
permalink: /js/modularization-flex-applications-–-conclusions
tags:
- JS
- yakov fain
- Modularization
- flex
---
<p>Hey guys,</p>
<p>&nbsp;</p>
<p>Few notes I took from the Yakov Fain lecture that took place last week:</p>
<p>&nbsp;</p>
<p><strong>When loading modules:</strong> you don&rsquo;t have to load RSL in the main app, only link it as such to the module itself</p>
<p>&nbsp;</p>
<p><strong>Merge into Code</strong> &ndash; Yakov reminded us that in this linkage option, only classes I used will be compiled into the swf</p>
<p>&nbsp;</p>
<p><strong>Fonts slow the compilation &ndash; </strong>so always compile your css which embed the fonts as a separate SWF file, and load it dynamically.</p>
<p>&nbsp;</p>
<p><strong>Preloader as a flash content&nbsp; &ndash; </strong>In his book  &ldquo;Enterprise flex application&rdquo; he gives and example of using a flash  preloader swf who looks like the initial login page in your application,  and on the background he loads the rsls while the user verify his  details.</p>
<p>&nbsp;</p>
<p><strong>Sharing Events between modules </strong>- <a href="http://www.wannaknowflex.com/2011/02/modularization-of-flex-applications-conclusions/" target="_blank">details on my blog</a>...</p>
<p>&nbsp;</p>
<p>Enjoy&nbsp;!</p>
<p>Shai</p>

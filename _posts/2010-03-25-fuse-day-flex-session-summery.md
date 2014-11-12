---
layout: post
title: Fuse day - Flex session summery
created: 1269524372
permalink: fuse-day-flex-session-summery
tags:
- JS
- puremvc
- Fuse day
- Foundation
- flex
---
<p>Our first Fuse day concentrated on developing the basics of the <strong>Flex Foundation </strong>&ndash; An open source framework which incorporates common features for enterprise Flex applications, so that they can be activated in a &ldquo;push of a button&rdquo; style.</p>
<p>&nbsp;</p>
<p>The code can be found in GitHub: <a href="http://git@github.com:Tikal-Fuse/Flex-Foundation.git">git@github.com:Tikal-Fuse/Flex-Foundation.git</a></p>
<p>&nbsp;</p>
<p><u><strong>Objectives:</strong></u></p>
<p>We had 3 objectives for this day:<br />
<strong>1.POC </strong>- Developing the skeleton, along with a single feature as a Proof Of Concept.<br />
<strong>2.Multi framework support </strong>- Research the possibilities of using the code not only for PureMVC based application, but for other frameworks as well (I.e Cairngorm)<br />
<strong>3.Multi core support </strong>- Research the efforts required to make it support multi-core applications.</p>
<p>&nbsp;</p>
<p>A <strong>video&nbsp;</strong>of the opening presentation:<br />
<embed allowfullscreen="true" allowscriptaccess="always" height="359" width="450" type="application/x-shockwave-flash" src="http://blip.tv/play/grVLgc2WSQA"></embed></p>
<p>&nbsp;</p>
<p><u><strong>The Fuse day Experience:<br />
</strong></u>We split to 3 pairs, one for each task:</p>
<p>&nbsp;</p>
<p><strong>POC</strong> (<a href="http://www.tikalk.com/users/oren">Oren</a>, <a href="http://www.tikalk.com/users/nadav">Nadav</a>)</p>
<p>The Foundation skeleton was ready beforehand, along with a <a href="http://trac.puremvc.org/Demo_AS3_Flex_LoadupAsOrdered">sample application which uses the loadup utility</a>. The original sample uses quite a bit of code in order to use this utility, and we wanted to test the framework's ability to incorporate this utility into it's core, so that it can be used with minimal knowledge of it's interface.<br />
As the hours passed, the original code was gradually modified up to a point where any interaction with the utility itself was refactored out of the developer's hands and into the Foundation's core.</p>
<p>&nbsp;</p>
<p><u><strong>Multi Framewok support </strong></u>(<a href="http://www.tikalk.com/users/sefi">Sefi</a>, <a href="http://www.tikalk.com/users/yossis">Yossi</a>)<br />
A lot of brainstorming was involved around this issue. Mostly around feasibility issues, but also around marketing concerns (mainly, is it worth the effort). Can a common ground be found to meet various Flex frameworks? Can the Foundation be useful for no-framework applications?<br />
The first half of the day was all about discussions, while the second half was dedicated to writing a demo which will demonstrate using the same utility (logging) both for PureMVC and Cairngorm framework. (the code will be included soon as a zip file).</p>
<p>&nbsp;</p>
<p><strong><u>Multi Core Support </u></strong>(<a href="http://www.tikalk.com/users/shair">Shay</a>, <a href="http://www.tikalk.com/users/ilan">myself</a>)<br />
After some discussions on this issue, we took a look on the way that existing utilities support multicore.<br />
Turned out that the only effort involved to support multicore is to duplicate the single core code, and just change the import statements to use the multicore libraries. Sweet.</p>
<p>&nbsp;</p>
<p><u><strong>Achievements and conclusions:<br />
</strong></u><br />
<strong>POC</strong><br />
The final code of the POC includes the foundation's skeleton, with the loadup utility included, along with the loadup demo application, demonstrating the use of this utility.<br />
The original code which demonstrated registration to the utility, creating utility-specific wrappers etc. was all moved to the framework, leaving the developer with the single task of marking it's classes with the appropriate interface in order to allow the Foundation to perform all of this behind the scenes.</p>
<p>&nbsp;</p>
<p><strong>Multi Framewok support </strong><br />
The day ended with a working sample, partially demonstrating a very basic generic logger for both frameworks. However, the final conclusion is that achieving multi framework is possible but requires quite a lot of time investment, which we currently don't have.<br />
So we will currently support PureMVC framework based applications.</p>
<p>&nbsp;</p>
<p><strong>Multi Core Support </strong><br />
We came to the conclusion that supporting multicore is practically effortless.</p>
<p>&nbsp;</p>
<p><strong><u>Final words<br />
</u></strong>The day was extremely productive, not only with respect to achieving its goals, but also with the fact that all participants ended with the same vision.<br />
I personally had a lot of fun this day, and would like to thank all the organizers and participants.</p>
<p>&nbsp;</p>
<p>-Ilan<br />
&nbsp;</p>

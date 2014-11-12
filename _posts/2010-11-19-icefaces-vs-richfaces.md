---
layout: post
title: ICEfaces VS. RichFaces
created: 1290174293
author: admin
permalink: /java/icefaces-vs-richfaces
tags:
- JAVA
- ICEfaces RichFaces JSF ajax push portals portlets a4j javascript
---
<p><span style="font-size:12.0pt;
line-height:150%;font-family:&quot;Times New Roman&quot;,&quot;serif&quot;">ICEfaces forum</span> is really large, the support team is client oriented and they give a lot of effort into the community field.</p>
<p>&nbsp;</p>
<p><span style="font-size:12.0pt;
line-height:150%;font-family:&quot;Times New Roman&quot;,&quot;serif&quot;">ICEfaces seems to grow faster, side by side with JSF compared with</span> RichFaces. RichFaces 4 should work better with JSF2 because they gave a lot of effort into this, though it took them a long time to achieve this development release which isn&rsquo;t a stable one yet.</p>
<p>&nbsp;</p>
<p>With RichFaces, developers will find themselves writing more JavaScript, a4j and xhtml code, compared with ICEfaces which does all the process&#39;n&#39;refresh automatically through their partial submit mechanism (D2D). There is an issue of flexibility versus simplicity here, but one can still do everything with ICEfaces and write even JavaScript if you really need it. Writing with ICEfaces allows you to focus more on the server side. In ICEfaces the developer doesn&#39;t have to think about the partial updates in a page using special AJAX tags, but&nbsp;<span style="mso-spacerun:yes">&nbsp;</span>should be aware of how it is implemented. The Ajax bridge, D2D, ICEfaces extended request scope, these and more should be always on your mind when developing with ICEfaces. ICEfaces can be heavy and have memory leaks if it isn&rsquo;t being used correctly. As I see it, yes ICEfaces is simpler for the developers but I would recommend first to learn what ICEfaces does behind the scenes, through tutorials how their Ajax is working and their extended request scope and more...</p>
<p>&nbsp;</p>
<p>I do encounter some problems with compatibility; ICEfaces still has some bugs in Chrome, Safari or IE8 in some of their components.</p>
<p>&nbsp;</p>
<p>RichFaces Ajax is a bit more flexible. The ICEfaces partial submit frees you from having a look at what has to be updated and when. One can control the components that are participating in the partial submit but in some occasions you&#39;ll need to make some work around.</p>
<p>&nbsp;</p>
<p><span style="font-size:12.0pt;
line-height:150%;font-family:&quot;Times New Roman&quot;,&quot;serif&quot;">ICEfaces has a pure Ajax Push mechanism through their Ajax Bridge. This is a pure server push and can be a huge advantage for some projects. RichFaces push (&lt;a4j:push&gt;) periodically perform AJAX request to server, to simulate &#39;push&#39; data.</span></p>
<p>&nbsp;</p>
<p><span style="font-size:12.0pt;
line-height:150%;font-family:&quot;Times New Roman&quot;,&quot;serif&quot;">I must say that they are both really high quality frameworks</span> (JSF extensions) and have a lengthy component library. ICEfaces also has a good support in portlets. Beyond that, there are alternatives: GWT, Flex, Wicket, etc...</p>
<p>&nbsp;</p>
<p>Thanks,</p>
<p>Oded Keren&nbsp;</p>
<p class="MsoNormal" style="text-align:justify;line-height:150%;direction:ltr;
unicode-bidi:embed"><o:p></o:p></p>
<p>&nbsp;</p>

---
layout: post
title: 'A Fuse-day project story: LiveCast - a real-time, live and fun classroom '
created: 1356597625
author: avi.tshuva
permalink: /java/fuse-day-project-story-livecast-real-time-live-and-fun-classroom
tags:
- JAVA
- Fuse day
- html5 javascript
- node.js
- WebRTC
---
<p>&nbsp;<span style="font-family: 'Bitstream Charter', serif; ">In the last fuse day, the Javascript/Flex team partook upon itself to develop a system we named (temporary name &ndash; please forgive us for the non-original thought) LiveCast. LiveCast is actually a classroom for real-time e-learning, designed specifically for learning programming related stuff.</span></p>
<p style="margin-bottom: 0in">&nbsp;</p>
<p style="margin-bottom: 0in"><font face="Bitstream Charter, serif">At the heart of the system, there's a real-time bi-directional video/audio, shared syntax-aware text-editor, shared drawing canvas and a common text chat box. The sessions are recorded, so they could be replayed offline.</font></p>
<p style="margin-bottom: 0in">&nbsp;</p>
<p style="margin-bottom: 0in"><font face="Bitstream Charter, serif">We got the biggest and the best room in Tikal offices, but even that felt rather small, since we were about 12 people at the max... Yea, a real nuclear reactor of creativity; it was fun although crowded and challenging. We didn't do exactly pair-programming, but rather a triplet/quadruplet programming, which was nice, because of the educational value of watching someone else working on a technology that others (and someones he himself) never touched before &ndash; after all, that's the real purpose of this FUSE day.</font></p>
<p style="margin-bottom: 0in">&nbsp;</p>
<p style="margin-bottom: 0in"><font face="Bitstream Charter, serif">We broke down the mission into a few tasks, and formed groups around each of them:</font></p>
<p style="margin-bottom: 0in"><font face="Bitstream Charter, serif">- Backend</font></p>
<p style="margin-bottom: 0in"><font face="Bitstream Charter, serif">- Client layout and general logic</font></p>
<p style="margin-bottom: 0in"><font face="Bitstream Charter, serif">- Video/audio</font></p>
<p style="margin-bottom: 0in"><font face="Bitstream Charter, serif">- Text-Editor</font></p>
<p style="margin-bottom: 0in"><font face="Bitstream Charter, serif">- Canvas</font></p>
<p style="margin-bottom: 0in"><font face="Bitstream Charter, serif">The chat was left alone, for future development.</font></p>
<p style="margin-bottom: 0in">&nbsp;</p>
<p style="margin-bottom: 0in"><font face="Bitstream Charter, serif">The core technology we used was the <i>WebRTC</i>, that provided all our real-time communication needs, mainly the video, but also the canvas communication and later &ndash; the chat would use it as well. </font></p>
<p style="margin-bottom: 0in">&nbsp;</p>
<p style="margin-bottom: 0in"><font face="Bitstream Charter, serif">The layout, login logic etc. were rather basic and straight-forward html/css with the help of <i>bootstrap</i> ; the canvas painter was written from scratch using the HTML5 canvas API; the code-editor was a deployment of <i>CodeMirror</i> (some <i>backbone.js</i> was used for that)  and finally, the backend, was written in <i>node.js.</i><i> </i></font></p>
<p style="margin-bottom: 0in">&nbsp;</p>
<p style="margin-bottom: 0in"><font face="Bitstream Charter, serif">We used <i>github </i>for our git repository. It was fun looking at the branches graph after about eight hours &ndash; I never saw a such a tree growing so complicated so quickly, although we didn't have almost any difficulties merging etc., except for the Canvas group, which, by mistake, forked-out from our baseline instead of branch-out. Besides that, integration was not too problematic, although all in all, we did not finish &ndash; although we didn't expect to &ndash; yet we had in our hand a rather cool prototype at the end of a 10 hours day. </font></p>
<p style="margin-bottom: 0in">&nbsp;</p>
<p style="margin-bottom: 0in"><font face="Bitstream Charter, serif">For me, the main problem was the so ever tempting, decadent refreshments that the wonderful staff of Tikal were streaming to the front desk... yummy... I was shocked to find that I gained a whole kilo just in one and a half days!!! (self-control is a virtue, I keep reminding myself...)</font></p>
<p style="margin-bottom: 0in">&nbsp;</p>
<p style="margin-bottom: 0in"><font face="Bitstream Charter, serif">As an end note, i'd say that I learned that <i>WebRTC </i>is fun, easy, powerful and we'll probably see it a lot in many web applications in the near future. Combined with JS and NodeJS, building applications such as the one we did, is a real breeze. </font></p>
<p style="margin-bottom: 0in">&nbsp;</p>
<p style="margin-bottom: 0in">And the chat feature is still alone...waiting...</p>
<p style="margin-bottom: 0in">&nbsp;</p>
<p style="margin-bottom: 0in">Next: some code snippets from the projects....</p>
<p style="margin-bottom: 0in">&nbsp;</p>
<p>&nbsp;</p>

---
layout: post
title: Fade text in Flex application Part II
created: 1245762211
author: sefi
permalink: /js/fade-text-flex-application-part-ii
tags:
- JS
---
<p>In <a href="http://www.tikalk.com/flex/fade-text-flex-application-part-i" target="_blank">part 1</a>, we discussed ways to make text fade in/out. We did this in various ways, all of them used the showEffect and hideEffect effects.</p>
<p>These work, but only for text that is already displayed. Setting the visible property to true/false, makes the show/hide effects run.</p>
<p>However, when you add text at runtime and define showEffect and hideEffect, when the text is added to the displayList it is not considered as 'shown' and as a result the show effect does not run and the text simply appears with no effect.</p>
<p>&nbsp;</p>
<p>To make the text fade in when added to the displayList, you should also define a addedEffect. addedEffect is dispatched when the text is added to the displayList, so setting it to the showEffect will cause it to fade in as you would expect.</p>

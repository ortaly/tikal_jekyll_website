---
layout: post
title: Jquery 1.7 - A New Event API's
created: 1321369389
author: orenf
permalink: /jquery-17-new-event-apis
tags:
- JS
---
<p><a href="http://api.jquery.com/category/version/1.7/">Jquery 1.7</a> was out (about a +week ago).</p>
<p class="MsoNormal"><o:p></o:p></p>
<p class="MsoNormal">This version introduces new Event APIs for binding and unbinding events (both DOM and Custom).<o:p></o:p></p>
<p class="MsoNormal">The jquery team encourages using the new Event APIs rather than the old ones &ndash; bind/delegate/live.<o:p></o:p></p>
<p class="MsoNormal">The old ones are still there &ndash; but will be deprecated in a later version.<o:p></o:p></p>
<p class="MsoNormal"><o:p>&nbsp;</o:p></p>
<p class="MsoNormal">The &ldquo;on&rdquo; API documentation <a href="http://api.jquery.com/on/">page</a> (for binding events) is quite thorough and explains how to achieve the old apis (bind/delegate/live) with &ldquo;on&rdquo;.<o:p></o:p></p>
<p class="MsoNormal">Due to high usage of the &ldquo;delegation&rdquo; pattern, in this version, jquery team <a href="http://blog.jquery.com/2011/11/03/jquery-1-7-released/">says</a> they refactored its library for better &amp; faster performance on delegated events.<o:p></o:p></p>
<p class="MsoNormal"><o:p>&nbsp;</o:p></p>
<p class="MsoNormal">Converting your code to the new API should be quite easy, and the documentation <a href="http://api.jquery.com/on/">page</a>&nbsp;details easy and straight forward examples.</p>
<p class="MsoNormal"><o:p>&nbsp;</o:p></p>
<p>&nbsp;</p>

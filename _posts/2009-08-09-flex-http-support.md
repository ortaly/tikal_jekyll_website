---
layout: post
title: Flex HTTP Support
created: 1249798989
permalink: flex-http-support
tags:
- JS
- ASP.NET MVC
- ASP.NET
- .Net Open Source
---
<p>I'm having some hard times supporting a FLEX client trying to get XML over HTTP from a server of mine. I have a server implemented in ASP.NET MVC framework. It basically uses HTTP GET for data retrieval, and HTTP POST for data updates. I also use HTTP custom headers to determine the view to return to my clients, depending on the type of service.</p>
<!--break-->
<p>&nbsp;</p>
<p>One of the application clients consumes these over-HTTP services using a Flex client. From the information I got, I need to modify my request-response model, since Flex HTTP service has <a target="_blank" href="http://verveguy.blogspot.com/2008/07/truth-about-flex-httpservice.html">these limitations</a>.</p>
<p>&nbsp;</p>
<p>Did anyone come across these issues? Any workaround / suggestion?</p>

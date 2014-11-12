---
layout: post
title: Flex file does not load when using SSL
created: 1263505427
permalink: flex-file-does-not-load-when-using-ssl
tags:
- JS
- XML
- ssl
- flex
---
<p>Hi all,</p>
<p>&nbsp;</p>
<p>I wrote a flex application, using BlazeDS that was working just fine.</p>
<p>&nbsp;</p>
<p>Then I was asked to change my server to work with SSL.</p>
<p>&nbsp;</p>
<p>After I changed the server settings to run with SSL,<strong> the flex file just refuses to load</strong>, without any error.</p>
<p>&nbsp;</p>
<p>I started digging around and found some people who had the same problem and found a solution.</p>
<p>&nbsp;</p>
<p>I followed this article: <a href="http://blog.crankybit.com/flex-remoting-over-ssl/">http://blog.crankybit.com/flex-remoting-over-ssl/</a> but the solution did not work for me.</p>
<p>&nbsp;</p>
<p>In one of the forums, they recommended to install some kind of sniffer, and I installed IEWatch (<a href="http://www.iewatch.com/downloadie.aspx">http://www.iewatch.com/downloadie.aspx</a>),</p>
<p>where I found out that the GET request for the swf file gets an error back:</p>
<p>Method: GET</p>
<p>Status: (ERROR_INTERNET_UNABLE_TO_CACHE_FILE)</p>
<p>URL: https://localhost:8443/cf-dashboard</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>I also noticed that even though I&rsquo;ve added the : &lt;add-no-cache-headers&gt;false&lt;/add-no-cache-headers&gt;</p>
<p>&nbsp;</p>
<p>The HTTP response header still contained this:</p>
<p><strong>Pragma:&nbsp; No-cache<br />
Cache-Control:&nbsp; no-cache</strong></p>
<p>&nbsp;</p>
<p>When reviewing this: <a href="http://old.nabble.com/flex-application-is-not-loading-under-HTTPS-td19790768.html">http://old.nabble.com/flex-application-is-not-loading-under-HTTPS-td19790768.html</a> , I found this link: <a href="http://support.microsoft.com/kb/323308">http://support.microsoft.com/kb/323308</a></p>
<p>Made the required changes in the registry and ta-da! It works!</p>
<p>&nbsp;</p>
<p>The problem is, my application is deployed in a very large bank, and it will probably not be easy to convince them to change the registry for all their employees :(</p>
<p>&nbsp;</p>
<p>Does anyone have any other suggestion/solution?</p>

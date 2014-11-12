---
layout: post
title: Productivity Elsewhere
created: 1322987157
author: adi
permalink: /productivity-elsewhere
tags:
- Incubator
- Scala
- node.js
---
<p><span style="color: rgb(51, 51, 51); ">Enthusiasm is overrated. Developers who get religious with their programming language is something I can&rsquo;t understand... Religion, you know, blinds people...</span></p>
<div style="background-color: transparent; ">
<p><span style="color: rgb(51, 51, 51); ">&nbsp;</span></p>
</div>
<!--break-->
<div>
<p><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; text-decoration: none; vertical-align: baseline; white-space: pre-wrap; ">Take for example the following quote:</span><br />
<span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; text-decoration: none; vertical-align: baseline; white-space: pre-wrap; ">&ldquo;</span><span style="color: rgb(128, 128, 128); "><em><span style="font-size: 15px; font-family: Arial; background-color: transparent; text-decoration: none; vertical-align: baseline; white-space: pre-wrap; ">For testing a restful service API I was looking for a lean library, which would allow me to test CRUD operations of rest services with as little code as possible.</span><br />
</em></span></p>
<p><span style="color: rgb(128, 128, 128); "><em><br />
<span style="font-size: 15px; font-family: Arial; background-color: transparent; text-decoration: none; vertical-align: baseline; white-space: pre-wrap; ">My search led me to </span></em></span><span style="color: rgb(128, 128, 128); "><a href="http://dispatch.databinder.net/Dispatch.html"><em><span style="font-size: 15px; font-family: Arial; background-color: transparent; text-decoration: underline; vertical-align: baseline; white-space: pre-wrap; ">Dispatch</span></em></a><em><span style="font-size: 15px; font-family: Arial; background-color: transparent; text-decoration: none; vertical-align: baseline; white-space: pre-wrap; ">, which is a highly compact Scala DSL wrapper around Apache&rsquo;s reliable </span></em></span><span style="color: rgb(128, 128, 128); "><a href="http://hc.apache.org/httpcomponents-client-ga/"><em><span style="font-size: 15px; font-family: Arial; background-color: transparent; text-decoration: underline; vertical-align: baseline; white-space: pre-wrap; ">HttpClient</span></em></a><em><span style="font-size: 15px; font-family: Arial; background-color: transparent; text-decoration: none; vertical-align: baseline; white-space: pre-wrap; ">. This DSL, however, is not very well documented and rather hard to decipher due to it&rsquo;s heavy usage of symbolic method names but nevertheless highly appealing when understood.</span></em></span><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; text-decoration: none; vertical-align: baseline; white-space: pre-wrap; ">&rdquo; [more </span><a href="http://blog.xebia.com/2011/11/26/easy-breezy-restful-service-testing-with-dispatch-in-scala/"><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 153); background-color: transparent; text-decoration: underline; vertical-align: baseline; white-space: pre-wrap; ">here</span></a><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; text-decoration: none; vertical-align: baseline; white-space: pre-wrap; ">]</span></p>
<p>&nbsp;</p>
<p><br />
<span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; text-decoration: none; vertical-align: baseline; white-space: pre-wrap; ">To make a long story short - after spending time on deciphering the API the author went on spending some more on studying how to include it in his project and, yet, some more on wrapping it with his own code.</span></p>
<p>&nbsp;</p>
<p><br />
<span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; text-decoration: none; vertical-align: baseline; white-space: pre-wrap; ">Why would anyone go through this torture for testing a RESTful API? I&rsquo;ll leave it to you to dig up on the guy and discover the answer (hint - it relates to the first two lines of this entry).</span></p>
<p>&nbsp;</p>
<p><br />
<span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; text-decoration: none; vertical-align: baseline; white-space: pre-wrap; ">I don&rsquo;t know how long it took him to accomplish the task but I&rsquo;m pretty much sure it was longer than 5 minutes, which means at least five times longer than it took me to do the same with Node.js (one minute [for the mathematically challenged]):</span></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<ul>
    <li><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; text-decoration: none; vertical-align: baseline; white-space: pre-wrap; ">Open a browser [2 sec.]</span></li>
    <li><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; text-decoration: none; vertical-align: baseline; white-space: pre-wrap; ">Google node.js rest client [0.2 sec.]</span></li>
    <li><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; text-decoration: none; vertical-align: baseline; white-space: pre-wrap; ">Click on the first result link and get to &ldquo;restler&rdquo; github page [2.8 sec. (rounding up)]</span></li>
    <li><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; text-decoration: none; vertical-align: baseline; white-space: pre-wrap; ">Open terminal [1 sec]</span></li>
    <li><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; text-decoration: none; vertical-align: baseline; white-space: pre-wrap; ">$ npm install restler (installs restler locally) [2 sec.]</span></li>
    <li><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; text-decoration: none; vertical-align: baseline; white-space: pre-wrap; ">$ mate test.js (launch textmate) [1 sec]</span></li>
    <li><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; text-decoration: none; vertical-align: baseline; white-space: pre-wrap; ">Save the following code in test.js:</span></li>
</ul>
<pre title="code" class="brush: jscript;">
var sys = require('util'),
    	      rest = require('restler');
rest.get('http://www.tikalk.com').on('complete', function(data) {
  	  sys.puts(data);
});</pre>
<p><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; text-decoration: none; vertical-align: baseline; white-space: pre-wrap; "><span class="Apple-tab-span" style="white-space: pre; ">	</span></span>[2 sec]</p>
<p>&nbsp;</p>
</div>
<div>
<ul>
    <li><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; text-decoration: none; vertical-align: baseline; white-space: pre-wrap; ">$ node test (until complete) [2 sec]</span></li>
    <li><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; text-decoration: none; vertical-align: baseline; white-space: pre-wrap; ">Wait 47 seconds...</span></li>
</ul>
<p>&nbsp;</p>
<p><br />
<span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; text-decoration: none; vertical-align: baseline; white-space: pre-wrap; ">Viola! One minute.</span></p>
<p>&nbsp;</p>
<p><br />
<strong><span style="font-size: 15px; font-family: Arial; color: rgb(0, 0, 0); background-color: transparent; text-decoration: none; vertical-align: baseline; white-space: pre-wrap; ">...Productivity is, sometimes, elsewhere...</span></strong></p>
</div>
<p>&nbsp;</p>

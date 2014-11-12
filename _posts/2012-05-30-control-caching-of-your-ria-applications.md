---
layout: post
title: Control caching of your RIA applications
created: 1338394544
author: avit
permalink: /control-caching-your-ria-applications
tags:
- Ruby
- web
---
<p>For all of us working with RIA applications (<a href='http://www.kensodev.com/tag/flex/' title='Flex'>Flex</a>/<a href='http://www.kensodev.com/tag/flash/' title='Flash'>Flash</a>) we know the hell of having to worry about a user cache.</p>

<p>There’s actually a chance that a user won’t see the latest version of your application, the chances are actually quite high for that to happen.</p>

<p>Well, I have my own two methods that I use to control this. <h4>Method #1</h4> The first way to control this is by the use of a parameter attached to the file name. Lets say your file name is kenso.swf (original name I must say :-) ). If you try embedding it into the HTML you will found out it is being cached. If you update the file on the server, you won’t see the changes.</p>

<p>The solution for this is simply add a parameter to the file like so:<strong> kenso.swf?buildDate=29Jan2009</strong>, this will cache as a file, if you change the <strong>buildDate</strong> param you will see that the file is being pulled again from the server <h4>Method #2</h4> This method is what I call overkill, but I did found myself using it a couple of times in the past. I won’t get into code (unless you ask me to…), but the idea is this. There’s a service managing the builds of the application. Each build of the application has an ID embedded inside the code like so: <pre class='markdown-html-error' style='border: solid 3px red; background-color: pink'>REXML could not parse this XML/HTML: 
<div id="codeSnippetWrapper" style="border: 1px solid silver; margin: 20px 0px 10px; padding: 4px; overflow: auto; text-align: left; line-height: 12pt; background-color: #f4f4f4; width: 97.5%; font-family: &apos;Courier New&apos;,courier,monospace; direction: ltr; max-height: 200px; font-size: 8pt; cursor: text;">
<div id="codeSnippet" style="border-style: none; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: #f4f4f4; width: 100%; font-family: &apos;Courier New&apos;,courier,monospace; direction: ltr; color: black; font-size: 8pt;">
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: white; width: 100%; font-family: &apos;Courier New&apos;,courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum1" style="color: #606060;">   1:</span> <span style="color: #0000ff;">var</span> versionLabel:String = <span style="color: #006080;">"29Jan2009_01"</span>;</pre>
<!--CRLF--></pre></p>
<pre class='markdown-html-error' style='border: solid 3px red; background-color: pink'>REXML could not parse this XML/HTML: 
</div></pre><pre class='markdown-html-error' style='border: solid 3px red; background-color: pink'>REXML could not parse this XML/HTML: 
</div></pre><!-- .csharpcode, .csharpcode pre { 	font-size: small; 	color: black; 	font-family: consolas, "Courier New", courier, monospace; 	background-color: #ffffff; 	/*white-space: pre;*/ } .csharpcode pre { margin: 0em; } .csharpcode .rem { color: #008000; } .csharpcode .kwrd { color: #0000ff; } .csharpcode .str { color: #006080; } .csharpcode .op { color: #0000c0; } .csharpcode .preproc { color: #cc6633; } .csharpcode .asp { background-color: #ffff00; } .csharpcode .html { color: #800000; } .csharpcode .attr { color: #ff0000; } .csharpcode .alt  { 	background-color: #f4f4f4; 	width: 100%; 	margin: 0em; } .csharpcode .lnum { color: #606060; } -->
<p>OK, so now we have the version label in the application. All we have to do is create a service, set the final version expected there say <pre class='markdown-html-error' style='border: solid 3px red; background-color: pink'>REXML could not parse this XML/HTML: 
<div id="codeSnippetWrapper" style="border: 1px solid silver; margin: 20px 0px 10px; padding: 4px; overflow: auto; text-align: left; line-height: 12pt; background-color: #f4f4f4; width: 97.5%; font-family: &apos;Courier New&apos;,courier,monospace; direction: ltr; max-height: 200px; font-size: 8pt; cursor: text;">
<div id="codeSnippet" style="border-style: none; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: #f4f4f4; width: 100%; font-family: &apos;Courier New&apos;,courier,monospace; direction: ltr; color: black; font-size: 8pt;">
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: white; width: 100%; font-family: &apos;Courier New&apos;,courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum1" style="color: #606060;">   1:</span> <span style="color: #0000ff;">string</span> finalVersion = <span style="color: #006080;">"30Jan2009_09"</span>;</pre>
<!--CRLF--></pre></p>
<pre class='markdown-html-error' style='border: solid 3px red; background-color: pink'>REXML could not parse this XML/HTML: 
</div></pre><pre class='markdown-html-error' style='border: solid 3px red; background-color: pink'>REXML could not parse this XML/HTML: 
</div></pre>
<p>If the version passed into the service is not the latest, simply tell that to your user.</p>

<p>This process can be with or without a database, can be with ExternalInterface and the use of JavaScript, it can really be whatever you want.</p>

<p>I seriously recommend using the 1st way to do this unless you really want to make sure that the version your user is seeing is the latest.</p>
      
    <img src="http://feeds.feedburner.com/~r/KensoDev-en/~4/r-VKnNByIrE" height="1" width="1"/>

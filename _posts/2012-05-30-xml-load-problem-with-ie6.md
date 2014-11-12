---
layout: post
title: xml.load problem with IE6
created: 1338394544
author: avit
permalink: /xmlload-problem-ie6
tags:
- Ruby
- web
---
<img alt='Flash' class='alignleft size-thumbnail wp-image-214' height='150' src='http://www.kensodev.com/wp-content/uploads/2009/08/adobe_flash_1470_1470-150x150.jpg' title='Flash' width='150' />
<p>IE6 has been for a very long time an enemy for web developers because of the way it renders HTML and CSS.</p>

<p>Fortunately, Flash has always been a rescue for me, because I develop RIA as well as HTML websites I have always enjoyed the way flash is always the same with IE6 as with other browsers.</p>

<p>This has been the case until the first and persistent bug.<!--more--> <h3>The story</h3> I created a flash player for a client using XML to load the song list, the XML is rendered from server side data.</p>

<p>What was the problem? The problem was the XML object kept being null (undefined) even though the data came from the server. This problem appeared only in IE6, not in any other browser.</p>

<p>I dug my code quite a bit till I figured out the solution.</p>

<p>The “Response Header” for the file was not the right header and it was gZipped on demand.</p>

<p>So, how can you solve this you ask?</p>

<ol>
<li>
<p>remove the gZip from this file, filter it out from the gZip of the other website</p>
</li>

<li>
<p>create the exact same response header as in this image:</p>
</li>
</ol>
<a href='http://www.kensodev.com/wp-content/uploads/2009/08/31082009022339.png'><img alt='31-08-2009 02-23-39' border='0' height='462' src='http://www.kensodev.com/wp-content/uploads/2009/08/31082009022339_thumb.png' style='display: inline; margin-left: 0px; margin-right: 0px; border: 0px;' title='31-08-2009 02-23-39' width='492' /></a>
<p>Remove any other HTTP header and verify that the file is not being cached at any way.</p>

<p>As a validation I added a <strong><em>cacheKiller</em></strong> parameter at the end of the file call. <pre class='markdown-html-error' style='border: solid 3px red; background-color: pink'>REXML could not parse this XML/HTML: 
<div id="codeSnippetWrapper" style="border: 1px solid silver; margin: 20px 0px 10px; padding: 4px; overflow: auto; text-align: left; line-height: 12pt; background-color: #f4f4f4; width: 97.5%; font-family: &apos;Courier New&apos;,courier,monospace; direction: ltr; max-height: 200px; font-size: 8pt; cursor: text;">
<div id="codeSnippet" style="border-style: none; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: #f4f4f4; width: 100%; font-family: &apos;Courier New&apos;,courier,monospace; direction: ltr; color: black; font-size: 8pt;">
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: white; width: 100%; font-family: &apos;Courier New&apos;,courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum1" style="color: #606060;">   1:</span> <span style="color: #006080;">"player.asp?cacheKiller="</span>+Math.Random();</pre>
<!--CRLF--></pre></p>
<pre class='markdown-html-error' style='border: solid 3px red; background-color: pink'>REXML could not parse this XML/HTML: 
</div></pre><pre class='markdown-html-error' style='border: solid 3px red; background-color: pink'>REXML could not parse this XML/HTML: 
</div></pre>
      
    <img src="http://feeds.feedburner.com/~r/KensoDev-en/~4/-oUHtmJey6I" height="1" width="1"/>

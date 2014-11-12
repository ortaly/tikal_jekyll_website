---
layout: post
title: Retrieve tweets using jQuery
created: 1338394544
author: avit
permalink: /retrieve-tweets-using-jquery
tags:
- Ruby
- web
---
<img alt='Twitter Logo' class='alignleft size-thumbnail wp-image-211' height='150' src='http://www.kensodev.com/wp-content/uploads/2009/09/Twitter_256x256-150x150.png' title='Twitter Logo' width='150' />
<p>As many of you out there, I’m a <a href='http://www.twitter.com' target='_blank'>Twitter</a> user too. As most of you have, I too have spent quite some time reading the Twitter API and understanding it.</p>

<p>I stumbled upon a forum message (in Hebrew) asking how can you retrieve your (or anybody else’s) tweets using JavaScript only and no server side.<!--more--></p>

<p>Well, there’s a way to accomplish that and it is not that complicated at all.</p>

<p>Change the <strong>twitterUsername</strong> var in the code to fit your username or the username you want to retrieve, please notice I took the “text” property only but the jSON result returns many more like:</p>

<p>Application used, profile image, time and more.</p>

<p>Here’s the code, enjoy! <pre class='markdown-html-error' style='border: solid 3px red; background-color: pink'>REXML could not parse this XML/HTML: 
<div id="codeSnippetWrapper" style="border: 1px solid silver; margin: 20px 0px 10px; padding: 4px; overflow: auto; text-align: left; line-height: 12pt; background-color: #f4f4f4; width: 97.5%; font-family: &apos;Courier New&apos;,courier,monospace; direction: ltr; max-height: 200px; font-size: 8pt; cursor: text;">
<div id="codeSnippet" style="border-style: none; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: #f4f4f4; width: 100%; font-family: &apos;Courier New&apos;,courier,monospace; direction: ltr; color: black; font-size: 8pt;">
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: white; width: 100%; font-family: &apos;Courier New&apos;,courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum1" style="color: #606060;">   1:</span> <span style="color: #0000ff;">function</span> getuserTweets() {</pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: #f4f4f4; width: 100%; font-family: &apos;Courier New&apos;,courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum2" style="color: #606060;">   2:</span>     <span style="color: #0000ff;">var</span> twitterUsername = <span style="color: #006080;">&apos;KensoDev&apos;</span>;</pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: white; width: 100%; font-family: &apos;Courier New&apos;,courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum3" style="color: #606060;">   3:</span>     <span style="color: #0000ff;">var</span> twitCount = 50;</pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: #f4f4f4; width: 100%; font-family: &apos;Courier New&apos;,courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum4" style="color: #606060;">   4:</span>     $.getJSON(</pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: white; width: 100%; font-family: &apos;Courier New&apos;,courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum5" style="color: #606060;">   5:</span>         <span style="color: #006080;">&apos;http://search.twitter.com/search.json?callback=?&amp;rpp=&apos;</span> + twitCount + <span style="color: #006080;">&apos;&amp;q=from:&apos;</span> + twitterUsername,</pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: #f4f4f4; width: 100%; font-family: &apos;Courier New&apos;,courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum6" style="color: #606060;">   6:</span>         <span style="color: #0000ff;">function</span>(data) {</pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: white; width: 100%; font-family: &apos;Courier New&apos;,courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum7" style="color: #606060;">   7:</span>             $.each(data, <span style="color: #0000ff;">function</span>(i, userTweets) {</pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: #f4f4f4; width: 100%; font-family: &apos;Courier New&apos;,courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum8" style="color: #606060;">   8:</span>                 <span style="color: #0000ff;">for</span> (<span style="color: #0000ff;">var</span> tweet = 0; tweet &lt; userTweets.length; tweet++) {</pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: white; width: 100%; font-family: &apos;Courier New&apos;,courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum9" style="color: #606060;">   9:</span>                     <span style="color: #0000ff;">if</span> (userTweets[tweet].text !== undefined) {</pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: #f4f4f4; width: 100%; font-family: &apos;Courier New&apos;,courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum10" style="color: #606060;">  10:</span>                         $(<span style="color: #006080;">&apos;body&apos;</span>).append(<span style="color: #006080;">&apos;&lt;p&gt;&apos;</span> + userTweets[tweet].text + <span style="color: #006080;">&apos;&lt;/p&gt;&apos;</span>);</pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: white; width: 100%; font-family: &apos;Courier New&apos;,courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum11" style="color: #606060;">  11:</span>                     }</pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: #f4f4f4; width: 100%; font-family: &apos;Courier New&apos;,courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum12" style="color: #606060;">  12:</span>                 }</pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: white; width: 100%; font-family: &apos;Courier New&apos;,courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum13" style="color: #606060;">  13:</span>             });</pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: #f4f4f4; width: 100%; font-family: &apos;Courier New&apos;,courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum14" style="color: #606060;">  14:</span>         }</pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: white; width: 100%; font-family: &apos;Courier New&apos;,courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum15" style="color: #606060;">  15:</span>     );</pre>
<!--CRLF-->
<pre style="border-style: none; margin: 0em; padding: 0px; overflow: visible; text-align: left; line-height: 12pt; background-color: #f4f4f4; width: 100%; font-family: &apos;Courier New&apos;,courier,monospace; direction: ltr; color: black; font-size: 8pt;"><span id="lnum16" style="color: #606060;">  16:</span> }</pre>
<!--CRLF--></pre></p>
<pre class='markdown-html-error' style='border: solid 3px red; background-color: pink'>REXML could not parse this XML/HTML: 
</div></pre><pre class='markdown-html-error' style='border: solid 3px red; background-color: pink'>REXML could not parse this XML/HTML: 
</div></pre>
<p>You can of course change the tags being created, you can change the object the tags are being appended into, you can change the code to better suit your needs that’s for sure.</p>

<p>If you need any help feel free to comment on this post and I will help you as much as I can.</p>
      
    <img src="http://feeds.feedburner.com/~r/KensoDev-en/~4/WRRd1eqZqH0" height="1" width="1"/>

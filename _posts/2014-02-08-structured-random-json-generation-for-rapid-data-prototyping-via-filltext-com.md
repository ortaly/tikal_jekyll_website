---
layout: post
title: Structured random JSON generation for rapid data prototyping via filltext.com
created: 1391851140
author: nickolay
permalink: /structured-random-json-generation-rapid-data-prototyping-filltextcom
tags:
- JS
- JSON
- prototyping
- GET
- generator
- random
---
<p>I wish I had discovered <a href="http://www.filltext.com/">filltext.com</a> earlier, because it is really useful for rapid prototyping where your input is JSON.</p>

<p>There isn&#39;t much to show, other than an example: a GET request with this url: <a href="http://www.filltext.com/?rows=5&amp;pretty=true&amp;id={index}&amp;isActive={bool}&amp;categories=[&quot;foo&quot;,&quot;bar&quot;]&amp;fname={firstName}&amp;lname={lastName}&amp;address={streetAddress}&amp;email={email}&amp;uname={username}&amp;dob={date|1-1-1900,31-12-2000}">http://www.filltext.com/?rows=5&amp;pretty=true&amp;id={index}&amp;isActive={bool}&amp;categories=[&quot;foo&quot;,&quot;bar&quot;]&amp;fname={firstName}&amp;lname={lastName}&amp;address={streetAddress}&amp;email={email}&amp;uname={username}&amp;dob={date|1-1-1900,31-12-2000}</a> will yield a similarly structured response:</p>

<pre class="rteindent1">
[
    {
        &quot;id&quot;: 1,
        &quot;isActive&quot;: true,
        &quot;categories&quot;: &quot;bar&quot;,
        &quot;fname&quot;: &quot;Milind&quot;,
        &quot;lname&quot;: &quot;Darbonne&quot;,
        &quot;address&quot;: &quot;2406 Amet Rd&quot;,
        &quot;email&quot;: &quot;KBechtold@aliquam.net&quot;,
        &quot;uname&quot;: &quot;AMcinvale&quot;,
        &quot;dob&quot;: &quot;1979-10-27T15:47:49.274Z&quot;
    },
    {
        &quot;id&quot;: 2,
        &quot;isActive&quot;: false,
        &quot;categories&quot;: &quot;foo&quot;,
        &quot;fname&quot;: &quot;Toni&quot;,
        &quot;lname&quot;: &quot;Monroe&quot;,
        &quot;address&quot;: &quot;7379 Nunc Ct&quot;,
        &quot;email&quot;: &quot;ARioux@ipsum.org&quot;,
        &quot;uname&quot;: &quot;JPainter&quot;,
        &quot;dob&quot;: &quot;1919-01-16T10:44:08.136Z&quot;
    },
    {
        &quot;id&quot;: 3,
        &quot;isActive&quot;: false,
        &quot;categories&quot;: &quot;bar&quot;,
        &quot;fname&quot;: &quot;Anita&quot;,
        &quot;lname&quot;: &quot;Weatherly&quot;,
        &quot;address&quot;: &quot;934 Ac Rd&quot;,
        &quot;email&quot;: &quot;SEllingwood@in.org&quot;,
        &quot;uname&quot;: &quot;KKieser&quot;,
        &quot;dob&quot;: &quot;1996-10-08T06:45:10.782Z&quot;
    },
    {
        &quot;id&quot;: 4,
        &quot;isActive&quot;: true,
        &quot;categories&quot;: &quot;foo&quot;,
        &quot;fname&quot;: &quot;Wesley&quot;,
        &quot;lname&quot;: &quot;Glynn&quot;,
        &quot;address&quot;: &quot;4635 Amet Dr&quot;,
        &quot;email&quot;: &quot;SRussell@sed.com&quot;,
        &quot;uname&quot;: &quot;GEmerson&quot;,
        &quot;dob&quot;: &quot;1954-04-12T23:33:52.776Z&quot;
    },
    {
        &quot;id&quot;: 5,
        &quot;isActive&quot;: true,
        &quot;categories&quot;: &quot;foo&quot;,
        &quot;fname&quot;: &quot;Annabelle&quot;,
        &quot;lname&quot;: &quot;Lester&quot;,
        &quot;address&quot;: &quot;1577 Vestibulum Ln&quot;,
        &quot;email&quot;: &quot;GLaiuppa@id.org&quot;,
        &quot;uname&quot;: &quot;GHencmann&quot;,
        &quot;dob&quot;: &quot;1907-04-20T08:05:16.071Z&quot;
    }
]</pre>

<p>Which is very handy for rapid prototyping. And you have a bunch of complementing features - in addition to the data itself:</p>

<ul>
	<li>A long list of supported data types and formats.</li>
	<li>Request an error code from a wide variety.</li>
	<li>Get response as JSONP.</li>
	<li>Delay response to test handling of timeouts.</li>
</ul>

<p>The only limit is that rows must not exceed 1000, and that you shouldn&#39;t abuse this awesome service :). Full documentation and a video intro: <a href="http://www.filltext.com/">http://www.filltext.com/</a>.</p>

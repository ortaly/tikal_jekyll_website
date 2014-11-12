---
layout: post
title: How do search engines index AJAX sites?
created: 1287302000
author: ittayd
permalink: /java/how-do-search-engines-index-ajax-sites
tags:
- JAVA
- ajax
---
<p>Ever wondered how web crawlers index sites whos content is generated dynamically by AJAX?&nbsp;Or why Twitter and Facebook now have a '#!' in their URLs?</p>
<p>&nbsp;</p>
<p>The reason is how google works. When it sees a URL&nbsp;with a shabang in it, it &quot;uglifies&quot;&nbsp;the url, converting it into a slightly different one, which it then sends to the server. The server should then return a static HTML&nbsp;snapshot of the content of the dynamic page which the crawler indexes.</p>
<p>&nbsp;</p>
<p>See more here:&nbsp;http://code.google.com/web/ajaxcrawling/</p>

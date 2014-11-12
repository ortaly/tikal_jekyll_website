---
layout: post
title: 'Java2Dart Resource Leak #2'
created: 1361542302
author: oren.kleks
permalink: /java/blog/java2dart-resource-leak-2-0
tags:
- JAVA
- java dart leak error
---
<p><b id="internal-source-marker_0.7470967629924417"><span>In one of my </span><a href="java2dart-resource-leak"><span>previous post</span></a><span>, I mentioned resource leak handling. I missed the familiar &lsquo;finally&rsquo; language keyword.</span></b></p>
<p><b id="internal-source-marker_0.7470967629924417"><a href="http://news.dartlang.org/2013/02/new-streams-api-with-dart-milestone-3.html"><span>Dart milestone 3, was released last week</span></a><span>, and its cool. There is a new Stream API, and it addressed this issue nicely. The example that was provided:</span></b></p>
<pre class="java;" title="code">
Future&lt;bool&gt; writeFile(String data, File file) {
 return file.open(FileMode.WRITE)
   .then((io) =&gt; io.writeString(data))
   .then((io) =&gt; io.close())
   .then((io) =&gt; true)
   .catchError((error) =&gt; false);
}
</pre>
<p><b id="internal-source-marker_0.7470967629924417">Catch error is a great solution! No need in finally keyword.</b><br />
	&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>

---
layout: post
title: Garbage Collection and Memory Leaks - simple example
created: 1248082347
permalink: garbage-collection-and-memory-leaks-simple-example
tags:
- JS
- Flex memory leak
---
<p>&nbsp;</p>
<div style="margin: 0cm 0cm 10pt; direction: ltr; unicode-bidi: embed">Alex Harui wrote a <a href="http://blogs.adobe.com/aharui/2007/03/garbage_collection_and_memory.html">great post </a>regarding the techniques of detecting memory leaks using the Flex Builder memory profiler.</div>
<div style="margin: 0cm 0cm 10pt; direction: ltr; unicode-bidi: embed">I found the demo he used a bit too complicated (too many objects, too many memory leaks), so I created a simpler version for demonstrating the techniques.</div>
<div style="margin: 0cm 0cm 10pt; direction: ltr; unicode-bidi: embed">The idea &ndash; using the same code, once on a Person class, and once on a LeakyPerson class (which causes a memory leak).</div>
<div style="margin: 0cm 0cm 10pt; direction: ltr; unicode-bidi: embed">CreateDestry/CreateDestroyLeaky &ndash; demonstrates the create/destroy scenario</div>
<div style="margin: 0cm 0cm 10pt; direction: ltr; unicode-bidi: embed">Replace/ReplaceLeaky &ndash; demonstrates the replace current scenario.</div>
<div style="margin: 0cm 0cm 10pt; direction: ltr; unicode-bidi: embed">Attached is a screenshot of the various outputs of the projects, and the source files as well.</div>
<div style="margin: 0cm 0cm 10pt; direction: ltr; unicode-bidi: embed">&nbsp;I hope you'll find it useful,</div>
<div style="margin: 0cm 0cm 10pt; direction: ltr; unicode-bidi: embed">-Ilan</div>

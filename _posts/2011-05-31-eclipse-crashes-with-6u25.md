---
layout: post
title: Eclipse crashes with 6u25
created: 1306851112
author: avim
permalink: /js/eclipse-crashes-6u25
tags:
- JS
- eclipse java jvm crash 6u25 Native memory allocation (malloc) failed to allocate
  bytes for Chunk::new
---
<p>In case you've been experiencing frequent crashes like me despite every possible jvm/eclipse tuning, see:</p>
<p>http://jojava.blogspot.com/2011/05/jvm-crashes-with-6u25-c2-tiered.html</p>
<p>https://community.dynatrace.com/community/display/PUB/Jave+6+Update+25+produces+random+OutOfMemory+Errors+during+Hotspot+Compilation</p>
<p>http://bugs.sun.com/bugdatabase/view_bug.do?bug_id=7040769</p>
<p>http://bugs.sun.com/bugdatabase/view_bug.do?bug_id=7042582</p>
<p>http://www.oracle.com/technetwork/java/javase/6u25releasenotes-356444.html</p>
<p>Eclipse seems to be extremely sensitive to his issue...</p>
<p>&nbsp;</p>

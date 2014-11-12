---
layout: post
title: '"async" support in node.js'
created: 1317361205
author: ittayd
permalink: /async-support-nodejs
tags:
- Incubator
- node.js
---
<p>An extension to V8 that allows node.js programs to use continuations instead of callbacks. This allows linear code instead of nested. </p>
<p>E.g. Instead of:</p>
<pre title="code" class="brush: jscript;">
moo(1, 2, 3, function(a, b, c, d) {} );</pre>
<p>You can write</p>
<pre title="code" class="brush: jscript;">
await a, b, c, d = moo(1, 2, 3);
</pre>
<p>&nbsp;</p>
<p>&nbsp;</p>

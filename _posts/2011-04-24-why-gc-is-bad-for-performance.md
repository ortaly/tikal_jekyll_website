---
layout: post
title: Why GC is bad for performance
created: 1303649674
author: ittayd
permalink: /why-gc-bad-performance
tags:
- GC
---
<p>http://gcc.gnu.org/ml/gcc/2002-08/msg00552.html</p>
<p>&nbsp;</p>
<p>Linus Torvalds explains quite clearly why GC is a bad thing for performance, countering claims that modern GCs are faster than manual memory management. </p>
<p>&nbsp;</p>
<p>Of course, it depends on the programming domain of choice. In many cases, low-level performance is not worth the extra work required with manual memory management and sometimes by being able to write code faster, one is able to create better constructs that achieve better high level performance.</p>

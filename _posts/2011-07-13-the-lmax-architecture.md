---
layout: post
title: The LMAX Architecture
created: 1310526834
author: ittayd
permalink: /lmax-architecture
tags:
- architecture
---
<p>http://martinfowler.com/articles/lmax.html</p>
<p>&nbsp;</p>
<p>A long article about the architecture of the LMAX&nbsp;trading system which is able to process 6 million transactions per second. And it does that with single thread.</p>
<p>&nbsp;</p>
<p>The main datastructure they use (called a Disruptor)&nbsp;is open source:&nbsp;http://code.google.com/p/disruptor/</p>

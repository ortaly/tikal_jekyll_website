---
layout: post
title: UI Memory Leaks (WPF & Silverlight)
created: 1328907437
author: menny
permalink: /ui-memory-leaks-wpf-silverlight
tags:
- .NET
- .Net Open Source
- WPF
- Silverlight
- Prism
- memory leaks
- UI
---
<p>A good read about memory leaks in WPF and Silverlight. Most of the UI memory leaks are evolved around events registration with no unregistrating them which causes the GC not to collect objects.</p>
<p>&nbsp;</p>
<p>Here are the main causes:</p>
<p>&nbsp;</p>
<ol>
    <li>Event handlers to objects in parent windows</li>
    <li>Registering to events from static objects</li>
    <li>Using timers</li>
    <li>Data binding</li>
    <li>Changing the Text property of a text box (unlimited undo operations)</li>
</ol>
<p>&nbsp;</p>
<p>If you ever used a composite approach (like <a href="http://compositewpf.codeplex.com/">Prism</a>) and EventsAggregators you may have come to appreciate the <a href="http://msdn.microsoft.com/en-us/library/aa970850.aspx">weak event pattern</a> and the <a href="http://msdn.microsoft.com/en-us/library/system.weakreference.aspx">weak reference</a>.</p>
<p>&nbsp;</p>
<p>Anyway, here is a good read regarding these leaks: <br />
<a href="http://svetoslavsavov.blogspot.com/2010/05/memory-leaks-in-wpf-applications.html">Memory leaks with a demo app explained</a><br />
<a href="http://www.red-gate.com/products/dotnet-development/ants-memory-profiler/learning-memory-management/resources/WPF-Silverlight-Pitfalls.pdf">Red-Gate PDF memory management / profiling</a></p>

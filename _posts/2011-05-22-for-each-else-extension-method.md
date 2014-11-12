---
layout: post
title: for each - else extension method
created: 1306055200
author: ofir
permalink: /net/each-else-extension-method
tags:
- .NET
- C#; Extension methods; for each - else
- .Net Open Source
---
<p>Hi there,</p>
<div style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; font-family: Tahoma, Verdana, Arial, Helvetica, sans-serif; font-size: 75%; font-weight: normal; line-height: 160%; background-color: rgb(255, 255, 255); ">
<p style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; font-size: 14px; font-weight: normal; line-height: 21px; ">I've implemented nice foreach-else extention method to handle what happens if the loop does not hit.&nbsp;</p>
<pre title="code" class="brush: csharp;">
public static IEnumerable&lt;TSource&gt; Else&lt;TSource&gt;(this IEnumerable&lt;TSource&gt; source, Action @else)
{
    bool loopHit = false;
    foreach (var item in source)
    {
        loopHit = true;
        yield return item;
    }
    if ((loopHit == false) &amp;&amp; (@else != null))
    {
        @else();
    }
}</pre>
<p style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; font-size: 14px; font-weight: normal; line-height: 21px; ">Usage:</p>
<pre title="code" class="brush: csharp;" style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; ">
foreach (KeyValuePair item in GetPairs().Else(()=&gt;Console.WriteLine(&quot;No entry!!&quot;)))
{
    Console.WriteLine(&quot;{0}: {1}&quot;, item.Key, item.Value);
}</pre>
</div>
<p>Enjoy,</p>
<p>Ofir</p>

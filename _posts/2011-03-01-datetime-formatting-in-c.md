---
layout: post
title: DateTime formatting in C#
created: 1298961568
author: igorz
permalink: /net/datetime-formatting-c
tags:
- .NET
- formatting
- DateTime
- c#
- .Net Open Source
---
<p>I use a custom format to show DateTime to user: &quot;dd/MM/yyyy&quot;.</p>
<p>&nbsp;</p>
<pre>
var nowString = now.ToString(&quot;dd/MM/yyy&quot;);
</pre>
<p>&nbsp;</p>
<p>The reason, I use the custom formatting, is to be not depended on user regional settings.</p>
<p>So, no matter what user's locale is, I expect the same format for a date.</p>
<p>&nbsp;</p>
<p>But today I found that it does not work as I expect. On one of the target machines I got &quot;28.02.2011&quot; instead of expected &quot;28/02/2011&quot;.</p>
<p>Why slash (/) is replaced by dot (.)? Is format string not enough explicit.</p>
<p>&nbsp;</p>
<p>I got the answer on MSDN (RTFM!): The slash (/) is not a literal, but a pattern for the default date separator defined in DateTimeFormatInfo.DateSeparator. It has to be escaped (leading with back slash (\)), for being reproduced literally.</p>
<p>&nbsp;</p>
<p>I fix my format string to be @&quot;dd\/MM\/yyyy&quot;</p>
<p>&nbsp;</p>
<pre>
var nowString = now.ToString(@&quot;dd\/MM\/yyy&quot;);
</pre>
<p>&nbsp;</p>
<p>Now it works!</p>

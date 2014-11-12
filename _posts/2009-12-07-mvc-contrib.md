---
layout: post
title: MVC Contrib
created: 1260174070
author: igorz
permalink: /net/mvc-contrib
tags:
- .NET
- ASP.NET MVC
- .Net Open Source
---
<p><a href="http://www.codeplex.com/MVCContrib">This is the contrib project for the ASP.NET MVC framework.</a> This project adds additional functionality on top of the MVC Framework. These enhancements can increase your productivity using the MVC Framework. It is written in C#. Founded by Eric Hexter and Jeffrey Palermo.</p>
<p>&nbsp;</p>
<p>In the <a target="_blank" href="http://www.codeplex.com/MVCContrib">MvcContrib</a> project there is an HTML helper for putting data into a &lt;table&gt;. The syntax looks like this:</p>
<p>&nbsp;</p>
<pre><span style="background: rgb(255, 238, 98) none repeat scroll 0% 0%; -moz-background-clip: border; -moz-background-origin: padding; -moz-background-inline-policy: continuous;">&lt;%</span><span style="color: blue;">= </span>Html.Grid(item.Addresses)
            .Columns(column =&gt;
                {
                    column.For(a =&gt; a.City);
                    column.For(a =&gt; a.Country);
                    column.For(a =&gt; a.Street);   
                })
            .Attributes(style =&gt; <span style="color: rgb(163, 21, 21);">&quot;width:100%&quot;</span>)
            .Empty(<span style="color: rgb(163, 21, 21);">&quot;No mailing address present!&quot;</span>)
<span style="background: rgb(255, 238, 98) none repeat scroll 0% 0%; -moz-background-clip: border; -moz-background-origin: padding; -moz-background-inline-policy: continuous;">%&gt;<br /><br /></span></pre>
<p>Beautiful, don&rsquo;t you think?</p>
<pre>
&nbsp;</pre>

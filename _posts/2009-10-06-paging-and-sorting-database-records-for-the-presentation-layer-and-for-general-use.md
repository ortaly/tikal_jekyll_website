---
layout: post
title: Paging and Sorting Database Records for the Presentation Layer (and for general
  use...)
created: 1254855905
permalink: paging-and-sorting-database-records-for-the-presentation-layer-and-for-general-use
tags:
- .NET
---
<p>A very common feature, shared by many applications that show to the user grid with data drawn from the server, is paging and sorting.</p>
<p>&nbsp;</p>
<p>A very elegant and easy way for paging is demonstrated in&nbsp;<span class="Apple-style-span" style="font-size: 12px; line-height: 19px; "><a href="http://blogs.msdn.com/wriju/archive/2007/10/04/linq-to-sql-paging-data.aspx">http://blogs.msdn.com/wriju/archive/2007/10/04/linq-to-sql-paging-data.aspx</a>.</span></p>
<p>&nbsp;</p>
<p>As for sorting, this may be more complex, because the OrderBy extension method looks like:</p>
<p>System.Linq.Expressions.Expression&lt;Func&lt;T, TResult&gt;&gt; keySelector</p>
<p>&nbsp;</p>
<p>One very nice solution can be found in a <a href="http://msdn.microsoft.com/en-us/vcsharp/bb894665.aspx">CSharpSamples</a>, which contains many and very useful samples of code. One of them is the DynamicQuery project, which shows how build Linq queries dynamically. This helps us in our case to pass to our method the column name to sort by (instead of the intimidating&nbsp;System.Linq.Expressions.Expression&lt;Func&lt;T, TResult&gt;&gt; keySelector).</p>
<p>&nbsp;</p>
<p>A nice description of the&nbsp;DynamicQuery project can be found @:&nbsp;</p>
<p><a href="http://weblogs.asp.net/scottgu/archive/2008/01/07/dynamic-linq-part-1-using-the-linq-dynamic-query-library.aspx">http://weblogs.asp.net/scottgu/archive/2008/01/07/dynamic-linq-part-1-using-the-linq-dynamic-query-library.aspx</a>&nbsp;</p>

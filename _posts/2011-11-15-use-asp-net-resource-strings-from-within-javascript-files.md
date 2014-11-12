---
layout: post
title: 'Use ASP.NET Resource strings from within javascript files '
created: 1321343694
author: igorz
permalink: /use-aspnet-resource-strings-within-javascript-files
tags:
- .NET
- ASP.NET
- .Net Open Source
---
<p>It seems to be a common issue.</p>
<p><br />
ASP.NET allows you to use resource files (*.resx) to localize content of  pages (or views, if we are in context of ASP.NET MVC). All what you  need is to put resource files under <i>~/App_GlobalResources</i> folder and use either resource expression or<span style="color: #2b91af;">&nbsp;&nbsp;</span><i>HttpContext.GetGlobalResourceObject()</i> API to get a proper string. It is well <a href="http://msdn.microsoft.com/en-us/library/ms228208.aspx">documented on MSDN</a>. The only issue - this API is not accessible within static resources such JavaScript files.</p>
<p><br />
There are several solution already described by different people: Martin Normark's solution is <a href="http://martinnormark.com/making-your-asp-net-global-resource-files-work-in-javascript-intellisense-included">generating static JavaScript resource files on post-build</a>, Mads Kristensen suggest to <a href="http://madskristensen.net/post/Localize-text-in-JavaScript-files-in-ASPNET.aspx">localize text in JavaScript files by string replacing</a>, and finally Rick Strahl introduce <a href="http://www.west-wind.com/weblog/posts/2009/Apr/02/A-Localization-Handler-to-serve-ASPNET-Resources-to-JavaScript">a localization handler to serve ASP.NET resources to JavaScript.</a></p>
<p><br />
The last solution looks most elegant for me. Since I am working only  with global resources I just simplified his solution and ended up with  my own:</p>
<p>&nbsp;</p>
<pre style="background: none repeat scroll 0% 0% white; color: black; font-family: Consolas; font-size: 13px;">
&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: blue;">public</span>&nbsp;<span style="color: blue;">class</span>&nbsp;<span style="color: #2b91af;">JavaScriptResourceHandler</span>&nbsp;:&nbsp;<span style="color: #2b91af;">IHttpHandler</span>
&nbsp;&nbsp;&nbsp;&nbsp;{
 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: blue;">public</span>&nbsp;<span style="color: blue;">void</span>&nbsp;ProcessRequest(<span style="color: #2b91af;">HttpContext</span>&nbsp;context)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: blue;">var</span>&nbsp;requestedCulture&nbsp;=&nbsp;<span style="color: blue;">new</span>&nbsp;<span style="color: #2b91af;">CultureInfo</span>(context.Request.QueryString[<span style="color: #a31515;">&quot;locale&quot;</span>]);
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: blue;">var</span>&nbsp;classKey&nbsp;=&nbsp;context.Request.QueryString[<span style="color: #a31515;">&quot;classKey&quot;</span>];
 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: blue;">var</span>&nbsp;dictionary&nbsp;=&nbsp;ReadResources(classKey,&nbsp;requestedCulture);
 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: blue;">var</span>&nbsp;javaScriptSerializer&nbsp;=&nbsp;<span style="color: blue;">new</span>&nbsp;<span style="color: #2b91af;">JavaScriptSerializer</span>();
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: blue;">var</span>&nbsp;script&nbsp;=
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #a31515;">@&quot;</span>
<span style="color: #a31515;">if&nbsp;(typeof(Resources)&nbsp;==&nbsp;&quot;&quot;undefined&quot;&quot;)&nbsp;Resources&nbsp;=&nbsp;{};</span>
<span style="color: #a31515;">Resources.&quot;</span>&nbsp;+&nbsp;classKey&nbsp;+&nbsp;<span style="color: #a31515;">&quot;&nbsp;=&nbsp;&quot;</span>&nbsp;+
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;javaScriptSerializer.Serialize(dictionary)&nbsp;+&nbsp;<span style="color: #a31515;">&quot;;&quot;</span>;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;context.Response.ContentType&nbsp;=&nbsp;<span style="color: #a31515;">&quot;application/javascript&quot;</span>;
 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;context.Response.Expires&nbsp;=&nbsp;43200;&nbsp;<span style="color: green;">//&nbsp;30&nbsp;days</span>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;context.Response.Cache.SetLastModified(<span style="color: #2b91af;">DateTime</span>.UtcNow);
 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;context.Response.Write(script);
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}
 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: blue;">public</span>&nbsp;<span style="color: blue;">bool</span>&nbsp;IsReusable
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: blue;">get</span>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: blue;">return</span>&nbsp;<span style="color: blue;">false</span>;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}
 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: blue;">private</span>&nbsp;<span style="color: blue;">static</span>&nbsp;<span style="color: #2b91af;">Dictionary</span>&lt;<span style="color: blue;">object</span>&nbsp;,<span style="color: blue;">object</span>&gt;&nbsp;ReadResources(<span style="color: blue;">string</span>&nbsp;classKey,<span style="color: #2b91af;">  CultureInfo</span>&nbsp;requestedCulture&nbsp;)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: blue;">var</span>&nbsp;resourceManager&nbsp;=&nbsp;<span style="color: blue;">new</span>&nbsp;<span style="color: #2b91af;">ResourceManager</span>(<span style="color: #a31515;">&quot;Resources.&quot;</span>&nbsp;+&nbsp;classKey,<span style="color: #2b91af;">  Assembly</span>.Load(<span style="color: #a31515;">&quot;App_GlobalResources&quot;</span>));
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: blue;">using</span>&nbsp;(<span style="color: blue;">var</span>&nbsp;resourceSet&nbsp;= 
                resourceManager.GetResourceSet(<span style="color: #2b91af;">CultureInfo</span>.InvariantCulture,&nbsp;<span style="color: blue;">true</span>,&nbsp;<span style="color: blue;">true</span>))
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{
 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: blue;">return</span>&nbsp;resourceSet
                        .Cast&lt;<span style="color: #2b91af;">DictionaryEntry</span>&gt;()
                        .ToDictionary(x&nbsp;=&gt; x.Key,
                                   x&nbsp;=&gt; resourceManager.GetObject((<span style="color: blue;">string</span>)x.Key,&nbsp;requestedCulture));
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}
&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}
&nbsp;&nbsp;&nbsp;&nbsp;}</pre>
<pre style="background: none repeat scroll 0% 0% white; color: black; font-family: Consolas; font-size: 13px;">
&nbsp;</pre>
<p>The demo project running this code might be found at Googe Code:</p>
<p><a href="http://code.google.com/p/izlabs/source/browse/#svn%2Ftrunk%2FJavaScriptResourceHandler">http://code.google.com/p/izlabs/source/browse/#svn%2Ftrunk%2FJavaScriptResourceHandler</a></p>

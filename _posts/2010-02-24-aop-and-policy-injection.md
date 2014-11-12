---
layout: post
title: AOP & Policy Injection
created: 1267004960
permalink: aop-and-policy-injection
tags:
- .NET
- PostSharp
- Policy Injection
- Dot.Net Group Meeting
- c#
- AOP
---
<p>&nbsp;Summary of presentation &quot;AOP &amp; Policy Injection&quot; that was part of Dot.Net group meeting.</p>
<p>&nbsp;</p>
<p>Motivation:</p>
<ol>
    <li>Mixing of business logic with supported mechanisms like logging, transaction, security</li>
    <li>Code duplication</li>
    <li>Same implementation patterns without reuse</li>
    <li>Hard maintenance</li>
    <li>Lack of modularity&nbsp;</li>
</ol>
<p>&nbsp;</p>
<p>Aspect-oriented programming (AOP) concept:</p>
<p>Separate business logic (functional requirements) from supporting mechanisms (non-functional requirements) &nbsp;like security, exception handling, tracing, monitoring, transactions, caching, validation.</p>
<p>The way is to encapsulate &nbsp;supporting mechanisms into Aspects or Policies &nbsp;and to address them declaratively to business logic code.</p>
<p>&nbsp;</p>
<p>AOP implementation:</p>
<ol>
    <li>Post-build assembly modification - PostSharp</li>
    <li>Metaprogramming - Nemerle</li>
    <li>Proxies - Spring.Net, Castle, Policy Injection Application Block</li>
</ol>
<p>&nbsp;</p>
<p>PostSharp&nbsp;</p>
<p>Is framework for AOP implementation on .Net platform &nbsp;that is started as open-source project. Currently there are versions under open-source and commercial licenses.</p>
<p>Advantages - &nbsp;easy to start, very &ldquo;clean&rdquo; and intuitive code, no config files, debuggable</p>
<p>&nbsp;</p>
<p>Sample with PostSharp:</p>
<p>&nbsp;</p>
<p>Define aspect that measures the execution time</p>
<p>&nbsp;</p>
<p>&nbsp;&nbsp; &nbsp;public class StopWatchAttribute : OnMethodInvocationAspect</p>
<p>&nbsp;&nbsp; &nbsp;{</p>
<p>&nbsp;&nbsp; &nbsp; &nbsp; &nbsp;public override void OnInvocation(MethodInvocationEventArgs eventArgs)</p>
<p>&nbsp;&nbsp; &nbsp; &nbsp; &nbsp;{</p>
<p>&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Stopwatch stopwatch = Stopwatch.StartNew();</p>
<p>&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;try</p>
<p>&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{</p>
<p>&nbsp;</p>
<p>&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;eventArgs.ReturnValue = eventArgs.Method.Invoke(</p>
<p>&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;eventArgs.Instance,</p>
<p>&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;eventArgs.GetArgumentArray());</p>
<p>&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;}</p>
<p>&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;finally</p>
<p>&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{</p>
<p>&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;stopwatch.Stop();</p>
<p>&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Console.WriteLine(&quot;Measure of {0}.{1}: {2} msec&quot;,</p>
<p>&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;eventArgs.Method.ReflectedType.Name,</p>
<p>&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;eventArgs.Method.Name,</p>
<p>&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;stopwatch.ElapsedMilliseconds);</p>
<p>&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;}</p>
<p>&nbsp;&nbsp; &nbsp; &nbsp; &nbsp;}</p>
<p>&nbsp;&nbsp; &nbsp;}</p>
<p>&nbsp;</p>
<p>Address the aspect to function</p>
<p>&nbsp;</p>
<p>&nbsp;&nbsp;[StopWatchAttribute]</p>
<p>&nbsp;&nbsp;public static long CalculateFibonacci(long num)</p>
<p>&nbsp;&nbsp;{</p>
<p>&nbsp;&nbsp; &nbsp; &nbsp;&nbsp;Func&lt;long, long&gt; fib = null;</p>
<p>&nbsp;&nbsp; &nbsp; &nbsp; fib = (x) =&gt; x &gt; 1 ? fib(x - 1) + fib(x - 2) : x;</p>
<p>&nbsp;&nbsp; &nbsp; &nbsp; return&nbsp;&nbsp;fib(num);</p>
<p>&nbsp;&nbsp; }</p>
<p>&nbsp;</p>
<p>Summary:</p>
<p>AOP helps to increase modularity, reduce component coupling, reduce development and maintenance cost.</p>
<p>&nbsp;</p>
<p>Link to presentation&amp;code &nbsp;-</p>
<p>http://docs.google.com/a/tikalk.com/leaf?id=0ByN52fnEk8MJOWNkOTZlOGItMzQwMC00YTZlLTg2ZTItMjJmYjVhMGY3NTU2&amp;hl=en</p>
<p>&nbsp;</p>
<p>&nbsp;</p>

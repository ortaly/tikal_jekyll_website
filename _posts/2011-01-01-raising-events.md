---
layout: post
title: Raising events
created: 1293914657
author: ofir
permalink: /net/raising-events
tags:
- .NET
- Generics; EventHandler; Extension methods; C#
- .Net Open Source
---
<p>&nbsp;Hello all,</p>
<p>&nbsp;</p>
<p>When you use events in C# you declare an event:</p>
<p>public event EventHandler SomeEvent;</p>
<p>&nbsp;</p>
<p style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; font-size: 14px; font-weight: normal; line-height: 21px; ">&nbsp;</p>
<p style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; font-size: 14px; font-weight: normal; line-height: 21px; ">Do you like to repeat this code?</p>
<pre title="code" class="brush: csharp;">
if (SomeEvent != null)
{
	SomeEvent(this, EventArgs.Empty);
}</pre>
<p>FWI, this is not thread safe, you can see an example at MSDN:</p>
<p><a href="http://msdn.microsoft.com/en-us/library/db0etb8x.aspx">msdn.microsoft.com/en-us/library/db0etb8x.aspx</a></p>
<p>&nbsp;</p>
<p>Here some extension methods to stop repeating this.</p>
<pre title="code" class="brush: csharp;">
[DebuggerStepThrough]
public static void Raise&lt;T&gt;(this EventHandler&lt;T&gt; handler, object sender, T eventArgs) where T : EventArgs
{
    //Copy to a temporary variable to be thread-safe.
    EventHandler&lt;T&gt; temp = handler;
    if (temp != null)
    {
        temp(sender, eventArgs);
    }
}</pre>
<p>&nbsp;</p>
<pre title="code" class="brush: csharp;">
[DebuggerStepThrough]
public static void Raise&lt;T&gt;(this EventHandler&lt;T&gt; handler, object sender) where T : EventArgs
{
	handler.Raise(sender, default(T));
}

[DebuggerStepThrough]
public static void Raise&lt;T&gt;(this EventHandler&lt;T&gt; handler) where T : EventArgs
{
	handler.Raise(null);
}

[DebuggerStepThrough]
public static void Raise(this EventHandler handler, object sender, EventArgs eventArgs)
{
    //Copy to a temporary variable to be thread-safe.
    EventHandler temp = handler;
    if (temp != null)
    {
        temp(sender, eventArgs);
    }
}

[DebuggerStepThrough]
public static void Raise(this EventHandler handler, object sender)
{
    handler.Raise(sender, EventArgs.Empty);
}

[DebuggerStepThrough]
public static void Raise(this EventHandler handler)
{
    handler.Raise(null, EventArgs.Empty);
}</pre>
<p>&nbsp;</p>
<p>And now you can raise the event like so:</p>
<pre title="code" class="brush: csharp;">
SomeEvent.Raise(this);</pre>
<p>&nbsp;</p>
<p>Enjoy,</p>
<p>Ofir</p>

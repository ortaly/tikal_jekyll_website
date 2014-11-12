---
layout: post
title: GenericEventArgs
created: 1293805927
author: ofir
permalink: /net/genericeventargs
tags:
- .NET
- Generics EventArgs
- .Net Open Source
---
<p>&nbsp;Hello,</p>
<p>&nbsp;</p>
<p>You've probably encountered the need to create EventArgs' sub classes to pass in events you created.</p>
<p>For every event you needed to create different EventArgs class with some parameters.</p>
<p>&nbsp;</p>
<p>This come to reduce the classes and use some generic classes.</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<div>I've created 4 ActionEventArgs and 5 FuncEventArgs to mimic the Action and Func delegates.</div>
<div>ActionEventArgs containing 1 to 4 parameters passed in the EventArgs class.</div>
<div>FuncEventArgs containing Result and up to 4 parameters.</div>
<div>&nbsp;</div>
<div><strong>The Parameters are read only.</strong></div>
<div><strong>The Result can (and should) be modified by the event handl</strong><strong>er</strong>.</div>
<div>&nbsp;</div>
<div><span style="font-size: larger; "><strong>Action Event Args</strong></span></div>
<pre title="code" class="brush: csharp;">
public class ActionEventArgs&lt;T1&gt; : EventArgs
{
    public T1 Parameter1
    {
        get;
        private set;
    }

    public ActionEventArgs(T1 param)
    {
        Parameter1 = param;
    }
}</pre>
<div>&nbsp;</div>
<pre title="code" class="brush: csharp;">
public class ActionEventArgs&lt;T1, T2&gt; : ActionEventArgs&lt;T1&gt;
{
    public T2 Parameter2
    {
        get;
        private set;
    }

    public ActionEventArgs(T1 param1, T2 param2) : base(param1)
    {
        Parameter2 = param2;
    }
}</pre>
<div>&nbsp;</div>
<pre title="code" class="brush: csharp;">
public class ActionEventArgs&lt;T1, T2, T3&gt; : ActionEventArgs&lt;T1, T2&gt;
{
    public T3 Parameter3
    {
        get;
        private set;
    }

    public ActionEventArgs(T1 param1, T2 param2, T3 param3) : base(param1, param2)
    {
        Parameter3 = param3;
    }
}</pre>
<div>&nbsp;</div>
<pre title="code" class="brush: csharp;">
public class ActionEventArgs&lt;T1, T2, T3, T4&gt; : ActionEventArgs&lt;T1, T2, T3&gt;
{
    public T4 Parameter4
    {
        get;
        private set;
    }

    public ActionEventArgs(T1 param1, T2 param2, T3 param3, T4 param4) : base(param1, param2, param3)
    {
        Parameter4 = param4;
    }
}</pre>
<div>&nbsp;</div>
<div><strong><span style="font-size: larger; ">Func Event Args</span></strong></div>
<pre title="code" class="brush: csharp;">
public class FuncEventArgs&lt;TResult&gt; : EventArgs
{
    public TResult Result { get; set; }

    public FuncEventArgs()
    {
        Result = default(TResult);
    }
}</pre>
<div>&nbsp;</div>
<pre title="code" class="brush: csharp;">
public class FuncEventArgs&lt;T1, TResult&gt; : FuncEventArgs&lt;TResult&gt;
{
    public T1 Parameter1
    {
        get;
        private set;
    }

    public FuncEventArgs(T1 param) : base()
    {
        Parameter1 = param;
    }
}</pre>
<div>&nbsp;</div>
<pre title="code" class="brush: csharp;">
public class FuncEventArgs&lt;T1, T2, TResult&gt; : FuncEventArgs&lt;T1, TResult&gt;
{
    public T2 Parameter2
    {
        get;
        private set;
    }

    public FuncEventArgs(T1 param1, T2 param2) : base(param1)
    {
        Parameter2 = param2;
    }
}</pre>
<div>&nbsp;</div>
<pre title="code" class="brush: csharp;">
public class FuncEventArgs&lt;T1, T2, T3, TResult&gt; : FuncEventArgs&lt;T1, T2, TResult&gt;
{
    public T3 Parameter3
    {
        get;
        private set;
    }

    public FuncEventArgs(T1 param1, T2 param2, T3 param3) : base(param1, param2)
    {
        Parameter3 = param3;
    }
}</pre>
<div>&nbsp;</div>
<pre title="code" class="brush: csharp;">
public class FuncEventArgs&lt;T1, T2, T3, T4, TResult&gt; : FuncEventArgs&lt;T1, T2, T3, TResult&gt;
{
    public T4 Parameter4
    {
        get;
        private set;
    }

    public FuncEventArgs(T1 param1, T2 param2, T3 param3, T4 param4) : base(param1, param2, param3)
    {
        Parameter4 = param4;
    }
}</pre>
<div>&nbsp;</div>
<div><strong><span style="font-size: larger; ">Usage</span></strong></div>
<div>&nbsp;</div>
<div><strong>Declaring</strong>:</div>
<pre title="code" class="brush: csharp;">
public event EventHandler&lt;FuncEventArgs&lt;int, string, string&gt;&gt; ConvertRequest;</pre>
<div>&nbsp;</div>
<div><strong>Raise</strong>:</div>
<pre title="code" class="brush: csharp;">
// copy handler for thread safe
var tempHandler = ConvertRequest;
if (tempHandler != null)
{
	// prepare parameters
	var e = new FuncEventArgs&lt;int,string,string&gt;(10, &quot;Name&quot;);

	tempHandler(this, e);

	// get result from clients
	string s = e.Result;
}</pre>
<div>&nbsp;</div>
<div><strong>Register</strong>:</div>
<pre title="code" class="brush: csharp;">
ConvertRequest += new EventHandler&lt;FuncEventArgs&lt;int, string, string&gt;&gt;(OnConvertRequest);</pre>
<div>&nbsp;</div>
<div><strong>Handle</strong>:</div>
<pre title="code" class="brush: csharp;">
void OnConvertRequest(object sender, FuncEventArgs&lt;int, string, string&gt; e)
{
	e.Result = e.Parameter1.ToString() + e.Parameter2;
}</pre>
<div><br />
OfirEnjoy,</div>
<p>&nbsp;</p>

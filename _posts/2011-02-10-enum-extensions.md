---
layout: post
title: Enum Extensions
created: 1297352489
author: ofir
permalink: /net/enum-extensions
tags:
- .NET
- Extensions methods
- Enum
- c#
- .Net Open Source
---
<p>&nbsp;Here are some extension methods for Enum:</p>
<p>&nbsp;</p>
<p>Take this enum for example:</p>
<pre title="code" class="brush: csharp;">
public enum MyEnum
{
    None = 0,
    A = 1,
    B = 2,
    C = 4,
}
</pre>
<p>&nbsp;</p>
<p>1. Parse:</p>
<pre title="code" class="brush: csharp;">
/// &lt;summary&gt;
/// Converts the string representation of the name or numeric value of one or
/// more enumerated constants to an equivalent enumerated object
/// &lt;/summary&gt;
/// &lt;param name=&quot;value&quot;&gt;A string containing the name or value to convert&lt;/param&gt;
/// &lt;returns&gt;Enum whose value is represented by value&lt;/returns&gt;
public static T Parse&lt;T&gt;(string value) where T : struct
{
    return Parse&lt;T&gt;(value, false);
}

/// &lt;summary&gt;
/// Converts the string representation of the name or numeric value of one or
/// more enumerated constants to an equivalent enumerated object
/// &lt;/summary&gt;
/// &lt;param name=&quot;ignoreCase&quot;&gt;If true, ignore case; otherwise, regard case.&lt;/param&gt;
/// &lt;param name=&quot;value&quot;&gt;A string containing the name or value to convert&lt;/param&gt;
/// &lt;returns&gt;Enum whose value is represented by value&lt;/returns&gt;
private static T Parse&lt;T&gt;(string value, bool ignoreCase) where T : struct
{
    return (T)Enum.Parse(typeof(T), value, ignoreCase);
}
</pre>
<p>&nbsp;</p>
<pre><b><br /></b></pre>
<p>&nbsp;</p>
<p><strong>Usage</strong>:</p>
<pre title="code" class="brush: csharp;" style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; ">
MyEnum e = EnumExtension.Parse&lt;MyEnum&gt;(&quot;A&quot;);&nbsp;</pre>
<p>&nbsp;</p>
<p>2. TryParse:</p>
<pre title="code" class="brush: csharp;">
/// &lt;summary&gt;
/// Tries to convert the string representation of the name or numeric value of one or
/// more enumerated constants to an equivalent enumerated object.
/// If fails, set to default value
/// &lt;/summary&gt;
/// &lt;param name=&quot;value&quot;&gt;A string containing the name or value to convert&lt;/param&gt;
/// &lt;returns&gt;Enum whose value is represented by value&lt;/returns&gt;
public static T TryParse&lt;T&gt;(string value) where T : struct
{
    return TryParse(value, default(T));
}

/// &lt;summary&gt;
/// Tries to convert the string representation of the name or numeric value of one or
/// more enumerated constants to an equivalent enumerated object.
/// If fails, set to @default
/// &lt;/summary&gt;
/// &lt;param name=&quot;value&quot;&gt;A string containing the name or value to convert&lt;/param&gt;
/// &lt;param name=&quot;default&quot;&gt;The default value to set if fail.&lt;/param&gt;
/// &lt;returns&gt;Enum whose value is represented by value&lt;/returns&gt;
public static T TryParse&lt;T&gt;(string value, T @default) where T : struct
{
    return TryParse&lt;T&gt;(value, @default, false);
}

/// &lt;summary&gt;
/// Tries to convert the string representation of the name or numeric value of one or
/// more enumerated constants to an equivalent enumerated object.
/// If fails, set to @default
/// &lt;/summary&gt;
/// &lt;param name=&quot;value&quot;&gt;A string containing the name or value to convert&lt;/param&gt;
/// &lt;param name=&quot;default&quot;&gt;The default value to set if fail.&lt;/param&gt;
/// &lt;param name=&quot;ignoreCase&quot;&gt;If true, ignore case; otherwise, regard case.&lt;/param&gt;
/// &lt;returns&gt;Enum whose value is represented by value&lt;/returns&gt;
public static T TryParse&lt;T&gt;(string value, T @default, bool ignoreCase) where T : struct
{
    T retValue;
    try
    {
        retValue = Parse&lt;T&gt;(value, ignoreCase);
    }
    catch
    {
        retValue = @default;
    }
    return retValue;
}

</pre>
<p><strong>Usage:</strong></p>
<pre title="code" class="brush: csharp;">
MyEnum e = EnumExtension.TryParse&lt;MyEnum&gt;(&quot;X&quot;, MyEnum.None);
// e = MyEnum.None</pre>
<p>&nbsp;</p>
<p>3. IsFlaged: <em>Notice: uses reflection</em></p>
<pre title="code" class="brush: csharp;">
public static bool IsFlaged&lt;T&gt;(this T enumObj) where T : struct
{
	return typeof(T).GetCustomAttributes(typeof(FlagsAttribute), false).Length != 0;
}
</pre>
<p>&nbsp;</p>
<p>Usage:&nbsp;</p>
<pre title="code" class="brush: csharp;">
bool isFlaged = e.IsFlaged();
// isFlaged = false</pre>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>4. IsDefined:</p>
<pre title="code" class="brush: csharp;">
public static bool IsDefined&lt;T&gt;(this T enumObj) where T : struct
{
	return Enum.IsDefined(typeof(T), enumObj);
}
</pre>
<p>&nbsp;</p>
<p>Usage:</p>
<pre title="code" class="brush: csharp;">
MyEnum e = (MyEnum)3;
bool isDefined = e.IsDefined();
//isDefined = false
</pre>
<p>&nbsp;</p>
<p>Enjoy,</p>
<p>Ofir</p>
<p>&nbsp;</p>

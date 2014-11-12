---
layout: post
title: MultikeyDictionary
created: 1299600454
author: ofir
permalink: /net/multikeydictionary
tags:
- .NET
- .Net Open Source
- Multikey;Dictionary;Generics
---
<p>&nbsp;Hello,</p>
<p>&nbsp;</p>
<p>I've tried to use a three way dicrionary, and I found a simple solution for it.</p>
<p>&nbsp;</p>
<p>I needed a dictionary with 2 keys and a value, and using <span style="color: rgb(51, 102, 255); ">dictionary&lt;KeyValuePair&lt;&gt;&gt;</span> seemed wrong.</p>
<p>&nbsp;</p>
<p>I wanted something like so:</p>
<pre title="code" class="brush: csharp;">
dict[1,&quot;1&quot;] = false
dict[2,&quot;1&quot;] = true
dict[10000, &quot;something else&quot;] = true</pre>
<p>&nbsp;</p>
<p>At the start I tried to build a class with dictionary to dictionary member, it was hard to maintain.</p>
<p>But what was seemed wrong actualy was realy right&nbsp;<img alt="" src="http://www.tikalk.com/sites/all/modules/fckeditor/fckeditor/editor/images/smiley/msn/teeth_smile.gif" /></p>
<p>&nbsp;</p>
<p>I inherited from Dictionary&lt;KeyValuePair&lt;K1, K2&gt;, V&gt; and extended the class with indexer, add &amp; remove.</p>
<p>&nbsp;</p>
<pre title="code" class="brush: csharp;">
public class MultikeyDictionary&lt;K1, K2, V&gt; : Dictionary&lt;KeyValuePair&lt;K1, K2&gt;, V&gt;
{
    public V this[K1 index1, K2 index2]
    {
        get
        {
            return this[new KeyValuePair&lt;K1, K2&gt;(index1, index2)];
        }
        set
        {
            this[new KeyValuePair&lt;K1, K2&gt;(index1, index2)] = value;
        }
    }

    public bool Remove(K1 index1, K2 index2)
    {
        return base.Remove(new KeyValuePair&lt;K1,K2&gt;(index1, index2));
    }

    public void Add(K1 index1, K2 index2, V value)
    {
        base.Add(new KeyValuePair&lt;K1, K2&gt;(index1, index2), value);
    }
}</pre>
<p>&nbsp;</p>
<p>and I also create a 4 way dictionary using the same:</p>
<pre title="code" class="brush: csharp;">
public class MultikeyDictionary&lt;K1, K2, K3, V&gt; : MultikeyDictionary&lt;KeyValuePair&lt;K1, K2&gt;, K3, V&gt;
{
    public V this[K1 index1, K2 index2, K3 index3]
    {
        get
        {
            return base[new KeyValuePair&lt;K1, K2&gt;(index1, index2), index3];
        }
        set
        {
            base[new KeyValuePair&lt;K1, K2&gt;(index1, index2), index3] = value;
        }
    }

    public bool Remove(K1 index1, K2 index2, K3 index3)
    {
        return base.Remove(new KeyValuePair&lt;K1, K2&gt;(index1, index2), index3);
    }

    public void Add(K1 index1, K2 index2, K3 index3, V value)
    {
        base.Add(new KeyValuePair&lt;K1, K2&gt;(index1, index2), index3, value);
    }
}</pre>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>Enjoy,</p>
<p>Ofir</p>
<p>&nbsp;</p>

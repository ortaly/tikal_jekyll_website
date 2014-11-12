---
layout: post
title: Does every C# type derive from object?
created: 1249665408
author: andrew
permalink: /java/does-every-c-type-derive-object
tags:
- JAVA
- c#
---
<p>An important correction of wide-spread myth: every type in C# derives from object. To summarize, 3 types do not derive from object: unsafe pointer types, interfaces and generic types.</p>
<p>&nbsp;</p>
<p>The last two types are convertible to object, however. As any expression having interface type at compile type will have a runtime value representing by some instance, it is always convertible to object. Similar for generics. But it's incorrect to say interfaces derive from object as they cannot derive from a class, only from other interfaces.</p>
<p>&nbsp;</p>
<p>The full article is available at: <a href="http://blogs.msdn.com/ericlippert/archive/2009/08/06/not-everything-derives-from-object.aspx">http://blogs.msdn.com/ericlippert/archive/2009/08/06/not-everything-derives-from-object.aspx</a></p>

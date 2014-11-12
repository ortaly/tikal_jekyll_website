---
layout: post
title: Enough with the abuse of Scala for internal DSLs!
created: 1295523375
author: ittayd
permalink: /incubator/enough-abuse-scala-internal-dsls
tags:
- Incubator
- Scala
---
<p>I&nbsp;just read a comment in reddit where someone explained that Scala's feature that allows &quot;subj.method(obj)&quot; to be written as &quot;subj metohd obj&quot;&nbsp;is for writing DSLs. </p>
<p>&nbsp;</p>
<p>(Disclaimer:&nbsp;I&nbsp;don't know what were Martin Odersky's exact reasons for adding this feature)</p>
<p>&nbsp;</p>
<p>For me the primary reason is not DSLs. It is the simple fact that it makes the language more consistent. In Java, you can write 'x + y', but this is allowed only for special types (primitives and string). This is inconsistent. In scala, 'x + y' is allowed for all types. </p>
<p>&nbsp;</p>
<p>Now naturally, 'x + y' is more readable than x.plus(y), for the simple fact that all major languages support it, rather than insisting on plus(x, y) or x.plus(y). So if I&nbsp;add a complex number type, or a rational number type, I'd want to be able to use 'x + y'. And what if I want a new operator, e.g., ^, why must I&nbsp;write power(x, y) instead of the more readable x^y? I can because scala allows me to define method names containing symbols. </p>
<p>&nbsp;</p>
<p>So for mathematic like constructs this feature makes the language more consistent and code to be more readable (for examples that are not arithmetics, see scala's parser combinators). It can even be useful for alphanumeric method names (e.g, 'x or y')</p>
<p>&nbsp;</p>
<p>However, people tend to abuse it to be able to write something like &quot;obj must be equal to 2&quot;. Now this is fine as long as it is a &quot;cute&quot; one liner, but creating a whole DSL is plain wrong the reason is that this &quot;DSL&quot;&nbsp;must still conform to the scala syntax and so anyone using it must know Scala and then the superflous baggage that comes from trying to make such DSL is not worth the gains.</p>
<p>&nbsp;</p>
<p>Bottom line:&nbsp;Scala's &quot;subj meth obj&quot;&nbsp;feature is great. Just use it where appropriate. </p>

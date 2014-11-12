---
layout: post
title: Example of using dependent types in Scala to verify code at compile time
created: 1322580343
author: ittayd
permalink: /example-using-dependent-types-scala-verify-code-compile-time
tags:
- Incubator
- Scala
---
<p>Dependent types is a term that describes using values as types.&nbsp; This  means you can encode some properties of an object in its type. Once you  do that, it allows a type checker (a compiler)&nbsp;to verify that the  object (type) is used in a suitable way.</p>
<p>&nbsp;</p>
<p>For a trivial example, imagine that Scala's AnyRef would have been defined as:&nbsp;</p>
<pre title="code" class="brush: scala;">
AnyRef[Null &lt;: TBoolean]</pre>
<p>&nbsp;</p>
<p>Where TBoolean is:</p>
<pre title="code" class="brush: java;">
trait TBoolean
trait TTrue extends TBoolean
trait TFalse extends TBoolean</pre>
<p>&nbsp;</p>
<p>So we encode values 'true' and 'false' as types TTrue and TFalse</p>
<p>&nbsp;</p>
<p>Imagine further, that all classes would automatically be encoded this  way (the compiler could add the [Null &lt;:&nbsp;TBoolean] part to a class  definition)</p>
<p>&nbsp;</p>
<p>While imagining, we can also imagine the compiler is enhanced so that  if it sees 'null' as return value from a method returning Something, it  immediately infers the return type as Something[TTrue]</p>
<p>&nbsp;</p>
<p>Now if I&nbsp;define a method as:</p>
<pre title="code" class="brush: java;">
def workWithSomething(s: Something[TFalse]) = ...</pre>
<p>&nbsp;</p>
<p>Then trying to call it with a method that returns Something[TTrue] would fail at compile time.</p>
<p>&nbsp;</p>
<p>The result:&nbsp;No NullPointersException any more! (note:&nbsp;obviously, a  smarter thing would have to remove 'null' altogether from the language,  and use Option instead...)</p>
<p>&nbsp;</p>
<p>Here's another blog post that shows a concrete example without the need for compiler magic:&nbsp;<a href="http://raichoo.blogspot.com/2011/08/taste-of-dependent-types-in-scala.html">http://raichoo.blogspot.com/2011/08/taste-of-dependent-types-in-scala.html</a></p>

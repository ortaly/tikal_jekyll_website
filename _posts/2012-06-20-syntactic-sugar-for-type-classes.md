---
layout: post
title: Syntactic Sugar for Type Classes
created: 1340205443
author: ittayd
permalink: /syntactic-sugar-type-classes
tags:
- Scala
---
<p><a href="http://debasishg.blogspot.co.il/2010/06/scala-implicits-type-classes-here-i.html">Type classes</a> is IMHO one of the most important features of Scala. However, using them can be awkward:</p>
<p>&nbsp;</p>
<pre title="code" class="brush: scala;">
trait TypeClass[T] {
  def foo(t: T): Int
}

def foo[T: TypeClass](t: T) = implicitly[TypeClass[T]].foo(t)</pre>
<p>&nbsp;</p>
<p>Here's a way to make it a bit nicer to use. </p>
<p>&nbsp;</p>
<pre title="code" class="brush: java;">
trait TypeClassExt[T] {
  def foo: Int
}

trait TypeClass[T] extends (T =&gt; TypeClassExt[T]) {
  def foo(t: T): Int
  def apply(t: T) = 
    new TypeClassExt[T]{
      def foo = TypeClass.this.foo(t)
    }
  }

def foo[T: TypeClass](t: T) = t.foo
</pre>
<p>&nbsp;</p>
<p>HTH</p>

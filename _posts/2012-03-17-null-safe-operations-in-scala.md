---
layout: post
title: Null safe operations in scala
created: 1331966430
author: ittayd
permalink: /null-safe-operations-scala
tags:
- Incubator
- Scala
---
<p>(This is one of those posts where I'm pretty sure I'm reinventing  something that others already found. But for the sake of those who  haven't...)</p>
<p>&nbsp;</p>
<p>How many times have you used StringUtils.isEmpty(s)?&nbsp;Isn't the syntax  annoying?&nbsp;Plus, you need to know where to import it from. What about a  null collection?&nbsp;A class of your own that can have null instances?</p>
<p>&nbsp;</p>
<p>(For those that are now shouting 'you should use Option':&nbsp;don't worry, we'll get there)</p>
<p>&nbsp;</p>
<p>Lets start with just String:</p>
<p>&nbsp;</p>
<pre title="code" class="brush: scala;">
class SafeStringOps(s: String) {
  def safeIsEmpty = if (s == null) true else s.isEmpty
}

implicit def toSafeOps(s: String) = new SafeStringOps(s)</pre>
<p>&nbsp;</p>
<p>And then:</p>
<pre title="code" class="brush: shell;">
scala&gt; &quot;hi&quot;.safeIsEmpty
res1: Boolean = false

scala&gt; (null:String).safeIsEmpty
res2: Boolean = true</pre>
<p>&nbsp;</p>
<p>But this is just a pattern to something more general. What we need is  something to wrap instances in a presentation that is safe to use</p>
<p>&nbsp;</p>
<pre class="brush: scala;" title="code">
trait Safe[A, B] {
  def safeInstance(a: A): B
}

class SafeWrapper[A](a: A) {
  def safe[B](implicit ops: Safe[A, B]) = ops.safeInstance(a)
}

implicit def toSafeOps[A](a: A) = new SafeWrapper(a)

class SafeStringOps(s: String) {
  def issEmpty = if (s == null) true else s.isEmpty
}

implicit object SafeString extends Safe[String, SafeStringOps] {
   def safeInstance(s: String) = new SafeStringOps(s)
}
</pre>
<p>&nbsp;</p>
<pre class="brush: shell;" title="code">
scala&gt; (null:String).safe.isEmpty
res3: Boolean = true</pre>
<p>So when we call 'safe' on an instance, the compiler finds an implicit  instance of Safe and the type of the result of safe is the second type  parameter of Safe. So in the string example, safe returns a  SafeStringOps. This is called <a href="http://www.chuusai.com/2011/07/16/fundeps-in-scala/">functional dependencies</a>.</p>
<p>&nbsp;</p>
<p>The benefit with this schema is that the compiler will look for  'Safe' instances in companion objects of the related types. So if we  have a class MyClass, we can put the instance of Safe in its companion  object:</p>
<pre title="code" class="brush: scala;">
class MyClass {
  def isEmpty = false
}
  
object MyClass {
  class SafeMyClas(m: MyClass) {
    def isEmpty = if (m == null) true else m.isEmpty
  }
	
  implicit val safe = new Safe[MyClass, SafeMyClass] {
    def safeInstance(m: MyClass) = new SafeMyClass(m)
  }
}</pre>
<p>&nbsp;</p>
<p>Now creation of special classess and wrappers is a bit tedious. We can use the <a href="http://en.wikipedia.org/wiki/Null_Object_pattern">null object pattern</a>:&nbsp;</p>
<pre title="code" class="brush: scala;">
trait MyClassBase {
  def isEmpty: Boolean
}

class MyClass extends MyClassBase {
  def isEmpty = false
}

object MyClass {
  object NullMyClass extends MyClassBase {
    def isEmpty = true
  }
	
  implicit val safe = new Safe[MyClass, MyClassBase] {
    def safeInstance(m: MyClass) = if (m == null) NullMyClass else m
  }
}
</pre>
<p>Finally, as hinted at the beginning of the article, one should  normally not return null from methods and instead the return type should  be Option[X] for methods where there's a possibility of nothing to  return. So this pattern is good for dealing with Java APIs. However,  even with Options, we may need a behavior where we have a default  implementation of a method for a case when None is returned. The safe  mechanism can be used there also.</p>
<p>&nbsp;</p>
<pre title="code" class="brush: scala;">
class SafeOption[T &lt;: AnyRef, U](safe: Safe[T, U]) extends Safe[Option[T], U] {
  def safeInstance(o: Option[T]) = if (o == null || o.isEmpty) safe.safeInstance(null.asInstanceOf[T]) else safe.safeInstance(o.get)
}

implicit def toSafeOption[T &lt;: AnyRef, U](implicit safe: Safe[T, U]) = new SafeOption[T, U](safe)
</pre>
<p>&nbsp;</p>
<pre title="code" class="brush: shell;">
scala&gt; (None:Option[String]).safe.isEmpty
res4: Boolean = true
</pre>
<p>&nbsp;</p>

---
layout: post
title: Type safe builder in Scala using type constraints
created: 1289197465
author: ittayd
permalink: /java/type-safe-builder-scala-using-type-constraints
tags:
- JAVA
- Scala
---
<p>A type safe builder is a builder where the compiler helps detect missing pieces instead of discovering them at runtime.</p>
<p>&nbsp;</p>
<p>Take for example this simple builder:</p>
<pre class="brush: scala;" title="code">
class Builder private (i: Int) {
  def this() = this(-1)

  def withProperty(i: Int) = new Builder(i)
  
  def build = println(i)
}</pre>
<p>&nbsp;</p>
<p>The following usage errors will be detected at runtime only (and with complex builders will probably result in exceptions):</p>
<pre style="font-size: larger;font-family: Courier New;"><p>scala&gt; new Builder().build //withProperty not called</p><p>-1</p><p>&nbsp;</p><p>scala&gt; new Builder().withProperty(1).withProperty(2).build // withProperty called twice</p><p>2</p>&nbsp;</pre>
<p>With a typesafe builder, both of these pieces of code will fail at compile time</p>
<p>&nbsp;</p>
<p>To make the compiler help us, the fact of whether a builder is complete or not needs to be encoded as a type.&nbsp;</p>
<p>&nbsp;</p>
<p>First, encode types representing boolean instances:</p>
<pre title="code" class="brush: scala;">
sealed trait TBoolean
sealed trait TTrue extends TBoolean
sealed trait TFalse extends TBoolean</pre>
<p>&nbsp;</p>
<p>Now we can use this encoding in the generic type of the builder class:</p>
<pre title="code" class="brush: scala;">
class Builder[HasProperty &lt;: TBoolean]
</pre>
<p>&nbsp;</p>
<p>Now the compiler can distinguish a complete builder which is of type Builder[TTrue] from an uncomplete one which is of type Builder[TFalse]</p>
<p>&nbsp;</p>
<p>Going further, we create a builder first as Builder[TFalse] and then withProperty returns a Builder[TTrue]:</p>
<pre title="code" class="brush: scala;">
class Builder[HasProperty &lt;: TBoolean] private(i: Int) {
  protected def this() = this(-1)
  
  def withProperty(i: Int) = new Builder[TTrue](i)
  
  def build = println(i)
}

object Builder {
  def apply() = new Builder[TFalse]
}
</pre>
<p>&nbsp;</p>
<p>Still, the compiler will not cause any errors if build/withProperty are not used correctly.</p>
<p>&nbsp;</p>
<p>Here comes the main &quot;trick&quot;. We want the call to build to be compiled only if invoked on a Builder[TTrue]. How can we do that?&nbsp;The way is to use generalized type constraints.</p>
<p>&nbsp;</p>
<p>Type constraints are like the constraint 'HasProperty&nbsp;&lt;:&nbsp;TBoolean'. It means that HasProperty should be a subtype of TBoolean.&nbsp;The problem is they work only at the site of definition. Generalized type constraints allow to create a constraint on generic types defined earlier, in our case they allow a method such as build() to constrain HasProperty to be TTrue.</p>
<p>&nbsp;</p>
<p>How does it work?&nbsp;With implicit parameters. We create an implicit parameter that acts as evidence that HasProperty is TTrue. If HasProperty is TTrue, there is an instance that the compiler can find and so the call to build will be compile time safe. If HasProperty is TFalse, there is no such instance and the compiler will issue a warning.</p>
<p>&nbsp;</p>
<p>Fortunately for us, Predef already has support to easily define such type constraints. The type =:= defines that two types are actually the same. Here is its definition:</p>
<pre class="brush: scala;" title="code">
sealed abstract class =:=[From, To] extends (From =&gt; To)
object =:= {
  implicit def tpEquals[A]: A =:= A = new (A =:= A) {def apply(x: A) = x}
}</pre>
<p>&nbsp;</p>
<p>What this means is that we can encode a type as 'From =:= To' and there will be an implicit value available if From and To are actually the same type:</p>
<pre style="font-size: larger;font-family: Courier New;">
scala&gt; implicitly[Int =:= Int]
res42: =:=[Int,Int] = &lt;function1&gt;

scala&gt; implicitly[Int =:= Double]
&lt;console&gt;:8: error: could not find implicit value for parameter e: =:=[Int,Double]
       implicitly[Int =:= Double]
                 ^
</pre>
<pre style="font-size: larger;font-family: Courier New;">
&nbsp;&nbsp;
</pre>
<p>So The trick is to sprinkle type constraints on withProperty() and build() methods so that they work only on the right instances of Builder:</p>
<pre title="code" class="brush: scala;">
class Builder[HasProperty &lt;: TBoolean] private(i: Int) {
  protected def this() = this(-1)
  
  def withProperty(i: Int)(implicit ev: HasProperty =:= TFalse) = new Builder[TTrue](i)
  
  def build(implicit ev: HasProperty =:= TTrue) = println(i)
}

object Builder {
  def apply() = new Builder[TFalse]
}
</pre>
<p>&nbsp;</p>
<pre style="font-size: larger;font-family: Courier New;">
scala&gt; Builder().build
&lt;console&gt;:11: error: could not find implicit value for parameter ev: =:=[TFalse,TTrue]
       Builder().build
                 ^

scala&gt; Builder().withProperty(2).withProperty(3)
&lt;console&gt;:11: error: could not find implicit value for parameter ev: =:=[TTrue,TFalse]
       Builder().withProperty(2).withProperty(3)
                                             ^

scala&gt; Builder().withProperty(2).build
2
</pre>
<p>&nbsp;</p>
<p>Note that in Scala 2.8.1, there's an <a href="http://www.scala-lang.org/api/rc/scala/annotation/implicitNotFound.html">annotation</a> that can create more readable errors than the ones above</p>
<p>&nbsp;</p>
<p>Other articles on the subject: http://dcsobral.blogspot.com/2009/09/type-safe-builder-pattern.html,   http://blog.rafaelferreira.net/2008/07/type-safe-builder-pattern-in-scala.html  and  http://jim-mcbeath.blogspot.com/2009/09/type-safe-builder-in-scala-part-4.html.  Also note that using Scala's named arguments, one can use a method as a   builder:&nbsp;http://villane.wordpress.com/2010/03/05/taking-advantage-of-scala-2-8-replacing-the-builder/</p>
<p>&nbsp;</p>
<p>A more indepth explanation of generalized type constraints:&nbsp;http://debasishg.blogspot.com/2010/08/using-generalized-type-constraints-how.html</p>
<p>&nbsp;</p>

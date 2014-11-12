---
layout: post
title: Avoiding Nothing
created: 1281038397
author: ittayd
permalink: /java/avoiding-nothing
tags:
- JAVA
- Scala
---
<p>Sometimes Scala's compiler will infer the type Nothing for a generic type parameter which may cause an error during runtime. I show here a simple way to avoid that.</p>
<p>&nbsp;</p>
<p>The method follows the strategy in http://github.com/harrah/up/blob/master/Contains.scala (which presents a more generalized way of declaring type parameters which are required or excluded). The strategy is to cause an ambiguity for the compiler when Nothing is used which will cause it to error.</p>
<p>&nbsp;</p>
<p>First, a use case:&nbsp;Say I want to make working with Maps that contain multiple types a little easier, for example, working with a Map[String, Any]. Insted of a user needing to call map.get(key).asInstanceOf[Option[MyType]] , I&nbsp;want a method like map.getAs[MyType](key). The code:</p>
<pre class="brush: scala;" title="code">
class RichMap[K,V](map: MapLike[K,V,_]) {
    def getAs[T &lt;: V](key: K) = map.get(key).asInstanceOf[Option[T]]
    def as[T &lt;: V](key: K) = map(key).asInstanceOf[T]
}
implicit def toRichMap[K,V](map: MapLike[K,V,_]) = new RichMap[K, V](map)&nbsp;

</pre>
<p>The problem here is that now if the developer will forget the type parameter, and call map.getAs(key), the compiler will silently infer Nothing. Because of Scala's type inferencing, the return type may be used in such a way that the compiler will compile the whole expression, but at runtime will create a failure. For example:&nbsp;map.getAs(key) map {_.toString}. Here, in the call _.toString, the compile will add a cast of the value to scala.runtime.Nothing$ which will fail at runtime.</p>
<p>&nbsp;</p>
<p>What I&nbsp;want is for the following to work:</p>
<pre title="code" class="brush: scala;">
class RichMap[K,V](map: MapLike[K,V,_]) {
    def getAs[T &lt;: V : NotNothing](key: K) = map.get(key).asInstanceOf[Option[T]]
    def as[T &lt;: V : NotNothing](key: K) = map(key).asInstanceOf[T]
}
implicit def toRichMap[K,V](map: MapLike[K,V,_]) = new RichMap[K, V](map) 

</pre>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>The ': NotNothing' will insure a compile time error. It adds an implicit variable to the method signature of type NotNothing[T] which serves as evidence that T is not Nothing.</p>
<p>&nbsp;</p>
<p>Here's the code to do that:</p>
<pre class="brush: scala;" title="code">
sealed trait NotNothing[-T] // {override def toString = &quot;Not Nothing&quot;}

object NotNothing {
    implicit object notNothing extends NotNothing[Any]
    implicit object `\n The error is because the type parameter was resolved to Nothing` extends NotNothing[Nothing]
}</pre>
<p>&nbsp;</p>
<p>Before explaining the code, the odd thing is the long message between backticks in the second implicit object. This is actually a valid way in Scala to name things. Since the use of the object is through implicit parameters, this will be silently used by the compiler. But once a compilation error occurs (when Nothing is inferred), the compiler will print out the name which will serve to explain the origin of the error, that can otherwise be confusing.</p>
<p>&nbsp;</p>
<p>Explanation of the code: What it does is create a NotNothing type class ([1]) and also two instances. One that makes any value conform to the type class and the second conforms to just Nothing. So for any type, the first object is used. But when Nothing is inferred, the compiler has a choice of two objects and will therefore issue an error.</p>
<p>&nbsp;</p>
<p>Here is how it looks:</p>
<pre>
scala&gt; val m = Map(&quot;hello&quot; -&gt; &quot;world&quot;, &quot;bye&quot; -&gt; 0)
m: scala.collection.immutable.Map[java.lang.String,Any] = Map((hello,world), (bye,0))

scala&gt; m.getAs[Int](&quot;bye&quot;)
res2: Option[Int] = Some(0)

scala&gt; m.getAs(&quot;bye&quot;)
<console>:20: error: ambiguous implicit values:  both object  The error is because the type parameter was resolved to Nothing in object NotNothing of type object Foo.NotNothing. The error is because the type parameter was resolved to Nothing  and object notNothing in object NotNothing of type object Foo.NotNothing.notNothing  match expected type Foo.NotNothing[Nothing]        m.getAs(&quot;bye&quot;)               ^ </console></pre>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>[1] A type class is a marker class that can show how one type, T conforms to a general class of types. See http://dcsobral.blogspot.com/2010/06/implicit-tricks-type-class-pattern.html, other articles are also available via google</p>
